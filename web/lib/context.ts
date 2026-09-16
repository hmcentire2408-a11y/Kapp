import corpus from "@/generated/corpus.json";
import { supabaseServer } from "./supabase/server";
import type { ContextStatus, Corpus, LoadedDoc } from "./types";

/**
 * The shared corpus is baked in at build time by scripts/build-corpus.mjs.
 * It lives at the repo root, outside web/, so reading it with fs at request
 * time works locally and fails silently on a host that deploys only web/'s
 * traced output. A static import ships with the bundle.
 */

/** Library + Morganton + school fit. Same bytes for every user. */
export function loadSharedCorpus(): { docs: LoadedDoc[]; warnings: string[] } {
  return {
    docs: corpus.docs as LoadedDoc[],
    warnings: [...corpus.warnings],
  };
}

/**
 * Load context for ONE authenticated user.
 *
 * `userId` must come from `requireUser()` (a verified JWT), never from a
 * client-supplied value. Row-level security is the backstop: the query below
 * runs as that user, so the database refuses rows belonging to anyone else
 * even if this code asked for them.
 */
export async function loadContext(
  userId: string,
  displayName: string,
): Promise<ContextStatus> {
  const { docs, warnings } = loadSharedCorpus();
  const errors: string[] = [];

  if (!corpus.systemPrompt) {
    errors.push(
      "Master prompt is empty in the generated corpus. Re-run `node scripts/build-corpus.mjs`.",
    );
  }

  const supabase = await supabaseServer();
  const { data, error } = await supabase
    .from("documents")
    .select("id, title, classification, body, updated_at")
    .eq("user_id", userId) // redundant with RLS, kept as an explicit assertion
    .order("created_at", { ascending: true });

  if (error) {
    errors.push(`Could not load your documents: ${error.message}`);
  } else if (!data || data.length === 0) {
    warnings.push(
      "You have no documents uploaded yet. Add them under Documents — a transcript, " +
        "activities and honors, essays, recommender notes, and your school list.",
    );
  } else {
    for (const row of data) {
      const text = (row.body ?? "").trim();
      docs.push({
        title: row.title,
        corpus: "student",
        path: `documents/${row.id}`,
        text,
        classification: row.classification,
        chars: text.length,
      });
    }
  }

  return {
    systemPromptChars: corpus.systemPrompt.length,
    docs,
    student: displayName,
    warnings,
    errors,
  };
}

/**
 * Fill the prompt's {{placeholders}}. {{TODAY}} changes once a day, so the
 * system prompt is rewritten daily and the cache rebuilt once per day.
 * Anything varying per request here would destroy caching entirely.
 */
export function buildSystemPrompt(studentName: string): string {
  const raw = corpus.systemPrompt;
  const today = new Date().toISOString().slice(0, 10);
  return raw.replaceAll("{{TODAY}}", today).replaceAll("{{STUDENT_NAME}}", studentName);
}
