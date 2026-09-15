import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { supabaseServer } from "./supabase/server";
import type { ContextStatus, Corpus, LoadedDoc } from "./types";

/** Repo root — web/ lives one level down. */
export const ROOT = path.resolve(process.cwd(), "..");

const PROMPT_PATH = path.join(ROOT, "prompts", "master-prompt.md");
const FIT_PATH = path.join(ROOT, "data", "school-fit", "school-fit.md");

/** Shared, static corpora — identical for every user, so they cache once. */
const CORPUS_DIRS: { corpus: Corpus; dir: string; label: string }[] = [
  { corpus: "library", dir: path.join(ROOT, "corpus", "library"), label: "LIBRARY" },
  { corpus: "morganton", dir: path.join(ROOT, "corpus", "morganton"), label: "MORGANTON" },
];

function readIfPresent(p: string): string | null {
  try {
    return fs.readFileSync(p, "utf8");
  } catch {
    return null;
  }
}

function listMarkdown(dir: string): string[] {
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".md") || f.endsWith(".txt"))
      .sort(); // deterministic — a varying doc order silently breaks the cache
  } catch {
    return [];
  }
}

function titleFor(file: string, front: Record<string, unknown>): string {
  const t = front.title;
  if (typeof t === "string" && t.trim()) return t.trim();
  return path
    .basename(file)
    .replace(/\.(md|txt)$/, "")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Library + Morganton + school fit. Same bytes for all three users. */
export function loadSharedCorpus(): { docs: LoadedDoc[]; warnings: string[] } {
  const docs: LoadedDoc[] = [];
  const warnings: string[] = [];

  for (const { corpus, dir, label } of CORPUS_DIRS) {
    const files = listMarkdown(dir);
    if (files.length === 0) {
      warnings.push(
        `${label} is empty — ${path.relative(ROOT, dir)} has no documents yet ` +
          `(TASKS.md B1/B2 are still todo). Kapp runs without it and must say so ` +
          `rather than reason from memory.`,
      );
      continue;
    }
    for (const file of files) {
      const raw = readIfPresent(path.join(dir, file));
      if (raw === null) continue;
      const { data, content } = matter(raw);
      const text = content.trim();
      docs.push({
        title: titleFor(file, data),
        corpus,
        path: path.relative(ROOT, path.join(dir, file)),
        text,
        chars: text.length,
      });
    }
  }

  const fit = readIfPresent(FIT_PATH);
  if (fit === null) {
    warnings.push(
      `School-fit dataset missing at ${path.relative(ROOT, FIT_PATH)}. ` +
        `Run scripts/build_fit.py. Without it, fit claims must be declined.`,
    );
  } else {
    docs.push({
      title: "School Fit Dataset",
      corpus: "school-fit",
      path: path.relative(ROOT, FIT_PATH),
      text: fit.trim(),
      chars: fit.trim().length,
    });
  }

  return { docs, warnings };
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

  if (readIfPresent(PROMPT_PATH) === null) {
    errors.push(
      `Master prompt not found at ${path.relative(ROOT, PROMPT_PATH)}. Kapp cannot run without it.`,
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
    systemPromptChars: readIfPresent(PROMPT_PATH)?.length ?? 0,
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
  const raw = readIfPresent(PROMPT_PATH) ?? "";
  const today = new Date().toISOString().slice(0, 10);
  return raw.replaceAll("{{TODAY}}", today).replaceAll("{{STUDENT_NAME}}", studentName);
}
