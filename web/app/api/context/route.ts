import { loadContext } from "@/lib/context";
import { effort, MODEL, webSearchEnabled } from "@/lib/anthropic";
import { displayNameFor, requireUser } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const user = await requireUser();
  if (!user) return Response.json({ error: "Not signed in." }, { status: 401 });

  const name = await displayNameFor(user.id);
  const status = await loadContext(user.id, name);
  const hasKey = Boolean(process.env.ANTHROPIC_API_KEY);

  return Response.json({
    ...status,
    email: user.email ?? null,
    model: MODEL,
    effort: effort(),
    webSearch: webSearchEnabled(),
    hasApiKey: hasKey,
    errors: hasKey
      ? status.errors
      : [
          ...status.errors,
          "ANTHROPIC_API_KEY is not set on the server. Add it to web/.env.local (local) or the host's environment variables (deployed).",
        ],
  });
}
