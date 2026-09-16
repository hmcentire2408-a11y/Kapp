import type Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import { buildRequest, client } from "@/lib/anthropic";
import { displayNameFor, requireUser } from "@/lib/supabase/server";
import type { Attachment, ChatTurn } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// Vercel caps this per plan: 60s on Hobby, 800s on Pro. Declaring more than the
// plan allows fails the build, so default to the value that works everywhere and
// raise it with KAPP_MAX_DURATION on a plan that permits it.
export const maxDuration = Number(process.env.KAPP_MAX_DURATION) || 60;


/** Map the SDK's citation union onto our flat shape. Location fields differ
 *  by citation type, so narrow rather than index into the union. */
function toCitation(c: Anthropic.Beta.BetaTextCitation) {
  const base = {
    citedText: "cited_text" in c ? c.cited_text : "",
    documentTitle: "document_title" in c ? (c.document_title ?? null) : null,
    documentIndex: "document_index" in c ? c.document_index : 0,
  };
  switch (c.type) {
    case "char_location":
      return { ...base, startCharIndex: c.start_char_index, endCharIndex: c.end_char_index };
    case "page_location":
      return { ...base, startPageNumber: c.start_page_number, endPageNumber: c.end_page_number };
    default:
      return base;
  }
}

/** Newline-delimited JSON. One event per line. */
function line(obj: unknown): Uint8Array {
  return new TextEncoder().encode(JSON.stringify(obj) + "\n");
}

export async function POST(req: NextRequest) {
  // Isolation starts here. The user id comes from a verified JWT, never from
  // the request body, so one student's session can only ever assemble their
  // own file (CLAUDE.md §2, master-prompt.md §7).
  const user = await requireUser();
  if (!user) {
    return new Response(JSON.stringify({ error: "Not signed in." }), {
      status: 401,
      headers: { "content-type": "application/json" },
    });
  }

  let history: ChatTurn[];
  let attachments: Attachment[] = [];
  try {
    const body = await req.json();
    history = body.history;
    attachments = Array.isArray(body.attachments) ? body.attachments : [];
    if (!Array.isArray(history) || history.length === 0) {
      throw new Error("history must be a non-empty array");
    }
  } catch (err) {
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      { status: 400, headers: { "content-type": "application/json" } },
    );
  }

  let params;
  try {
    ({ params } = await buildRequest(
      history,
      user.id,
      await displayNameFor(user.id),
      attachments,
    ));
  } catch (err) {
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      { status: 400, headers: { "content-type": "application/json" } },
    );
  }

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      // Index of the text block each segment came from, so citations attach
      // to the right run of text.
      let currentIndex = -1;
      try {
        const s = client().beta.messages.stream(params);

        for await (const event of s) {
          switch (event.type) {
            case "content_block_start": {
              currentIndex = event.index;
              if (event.content_block.type === "text") {
                controller.enqueue(line({ type: "segment_start", index: event.index }));
              }
              break;
            }
            case "content_block_delta": {
              const d = event.delta;
              if (d.type === "text_delta") {
                controller.enqueue(
                  line({ type: "text", index: event.index, text: d.text }),
                );
              } else if (d.type === "thinking_delta") {
                controller.enqueue(line({ type: "thinking", text: d.thinking }));
              } else if (d.type === "citations_delta") {
                controller.enqueue(
                  line({ type: "citation", index: event.index, citation: toCitation(d.citation) }),
                );
              }
              break;
            }
            case "content_block_stop":
              controller.enqueue(line({ type: "segment_stop", index: event.index }));
              break;
          }
        }

        const final = await s.finalMessage();

        // A refusal is HTTP 200 with stop_reason "refusal" — check it before
        // treating the turn as a normal answer.
        if (final.stop_reason === "refusal") {
          controller.enqueue(
            line({
              type: "error",
              message:
                "The request was declined by a safety classifier" +
                (final.stop_details && "category" in final.stop_details
                  ? ` (${(final.stop_details as { category?: string }).category})`
                  : "") +
                ". Server-side fallback was enabled; if you see this, the fallback did not produce a usable turn either.",
            }),
          );
        } else if (final.stop_reason === "max_tokens") {
          controller.enqueue(
            line({
              type: "error",
              message: "Response hit the 64k output cap and was truncated. Ask a narrower question.",
            }),
          );
        }

        controller.enqueue(
          line({
            type: "usage",
            usage: {
              inputTokens: final.usage.input_tokens,
              outputTokens: final.usage.output_tokens,
              cacheReadTokens: final.usage.cache_read_input_tokens ?? 0,
              cacheCreationTokens: final.usage.cache_creation_input_tokens ?? 0,
            },
          }),
        );
        controller.enqueue(line({ type: "done" }));
      } catch (err) {
        // Most-specific first: the SDK's typed errors carry a status code.
        const e = err as { status?: number; message?: string; name?: string };
        let message = e.message ?? "Unknown error";
        if (e.status === 401) {
          message = "Anthropic rejected the API key (401). Check ANTHROPIC_API_KEY in web/.env.local.";
        } else if (e.status === 429) {
          message = "Rate limited (429). Wait and retry.";
        } else if (e.status === 400) {
          message = `Bad request (400): ${message}`;
        } else if (e.status && e.status >= 500) {
          message = `Anthropic server error (${e.status}). Retry.`;
        }
        controller.enqueue(line({ type: "error", message }));
        controller.enqueue(line({ type: "done" }));
      } finally {
        void currentIndex;
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "content-type": "application/x-ndjson; charset=utf-8",
      "cache-control": "no-store",
      "x-accel-buffering": "no",
    },
  });
}
