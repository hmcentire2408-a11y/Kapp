import Anthropic from "@anthropic-ai/sdk";
import { buildSystemPrompt, loadContext } from "./context";
import type { Attachment, ChatTurn, ContextStatus, LoadedDoc } from "./types";

export const MODEL = process.env.KAPP_MODEL?.trim() || "claude-opus-5";

const EFFORTS = ["low", "medium", "high", "xhigh", "max"] as const;
type Effort = (typeof EFFORTS)[number];

export function effort(): Effort {
  const e = process.env.KAPP_EFFORT?.trim() as Effort | undefined;
  return e && EFFORTS.includes(e) ? e : "high";
}

export function webSearchEnabled(): boolean {
  return (process.env.KAPP_WEB_SEARCH?.trim() || "on") !== "off";
}

let cached: Anthropic | null = null;
export function client(): Anthropic {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error(
      "ANTHROPIC_API_KEY is not set. Copy web/.env.local.example to web/.env.local and add your key.",
    );
  }
  // Zero-arg constructor reads ANTHROPIC_API_KEY (or an `ant auth login` profile).
  cached ??= new Anthropic();
  return cached;
}

/** A document content block. Citations are all-or-none across a request. */
function docBlock(
  doc: LoadedDoc,
  cache: boolean,
): Anthropic.Beta.BetaContentBlockParam {
  const context =
    doc.corpus === "student"
      ? `STUDENT document. Classification: ${doc.classification ?? "UNCLASSIFIED — ask before relying on it"}.`
      : doc.corpus === "school-fit"
        ? "SCHOOL FIT dataset. Every field carries a source URL and a status tag; honour the tags."
        : `${doc.corpus.toUpperCase()} document.`;

  return {
    type: "document",
    source: { type: "text", media_type: "text/plain", data: doc.text },
    title: doc.title,
    context,
    citations: { enabled: true },
    ...(cache ? { cache_control: { type: "ephemeral", ttl: "1h" as const } } : {}),
  } as Anthropic.Beta.BetaContentBlockParam;
}

/**
 * Assemble the request in the order master-prompt.md §6 requires:
 *   system prompt -> LIBRARY -> MORGANTON -> SCHOOL FIT -> STUDENT -> conversation
 *
 * Cache breakpoints (max 4 per request, we use 3):
 *   1. the system prompt
 *   2. the last static document (library + morganton + fit)  — same for every student
 *   3. the last student document                             — same for every turn this session
 * Everything volatile (the questions) lands after all three.
 */
export async function buildRequest(
  history: ChatTurn[],
  userId: string,
  displayName: string,
  attachments: Attachment[] = [],
): Promise<{
  status: ContextStatus;
  params: Anthropic.Beta.MessageCreateParamsStreaming;
}> {
  const status = await loadContext(userId, displayName);
  if (status.errors.length > 0) {
    throw new Error(status.errors.join(" "));
  }
  if (history.length === 0 || history[0].role !== "user") {
    throw new Error("Conversation must start with a user message.");
  }

  const statics = status.docs.filter((d) => d.corpus !== "student");
  const studentDocs = status.docs.filter((d) => d.corpus === "student");

  const blocks: Anthropic.Beta.BetaContentBlockParam[] = [];
  statics.forEach((d, i) => blocks.push(docBlock(d, i === statics.length - 1)));
  studentDocs.forEach((d, i) =>
    blocks.push(docBlock(d, i === studentDocs.length - 1)),
  );

  // Documents dropped into this conversation but not saved. They are volatile,
  // so they go AFTER the last cache breakpoint — placing them earlier would
  // invalidate the whole cached prefix on every message.
  for (const a of attachments) {
    blocks.push({
      type: "document",
      source: { type: "text", media_type: "text/plain", data: a.body },
      title: a.title,
      context: `STUDENT document, attached to this conversation only and not saved. Classification: ${a.classification}.`,
      citations: { enabled: true },
    } as Anthropic.Beta.BetaContentBlockParam);
  }

  // Tell the model plainly what it is missing, so it can say so instead of
  // filling the gap from memory.
  if (status.warnings.length > 0) {
    blocks.push({
      type: "text",
      text:
        "CONTEXT GAPS (the app detected these; treat them as facts about what you were given):\n" +
        status.warnings.map((w) => `- ${w}`).join("\n"),
    });
  }

  blocks.push({ type: "text", text: history[0].content });

  const messages: Anthropic.Beta.BetaMessageParam[] = [
    { role: "user", content: blocks },
    ...history.slice(1).map((t) => ({ role: t.role, content: t.content })),
  ];

  const tools: Anthropic.Beta.BetaToolUnion[] = webSearchEnabled()
    ? [
        {
          type: "web_search_20260209",
          name: "web_search",
          // Deprioritized by decision (CLAUDE.md §7): policy-fact verification
          // only. The cap is a backstop for the prompt's own instruction.
          max_uses: 5,
        } as Anthropic.Beta.BetaToolUnion,
      ]
    : [];

  const params = {
    model: MODEL,
    max_tokens: 64000,
    system: [
      {
        type: "text",
        text: buildSystemPrompt(displayName),
        cache_control: { type: "ephemeral", ttl: "1h" },
      },
    ],
    messages,
    thinking: { type: "adaptive", display: "summarized" },
    output_config: { effort: effort() },
    ...(tools.length > 0 ? { tools } : {}),
    // Server-side fallback: if a safety classifier declines the request,
    // the server routes to an appropriate fallback model by refusal category
    // instead of handing back an unusable turn.
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
  } as unknown as Anthropic.Beta.MessageCreateParamsStreaming;

  return { status, params };
}
