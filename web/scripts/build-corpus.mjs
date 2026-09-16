/**
 * Bake the shared corpus into the bundle at build time.
 *
 * corpus/, prompts/ and data/ live at the repo root, outside web/. Reading them
 * with fs at request time works locally but not on a host that deploys only the
 * traced output of web/ — the files are simply absent, and the app would come up
 * looking healthy while telling every user the LIBRARY is empty.
 *
 * Emitting a JSON module instead makes the corpus a static import: it ships
 * because the bundler can see it. A missing source is a build failure here
 * rather than a silent degradation in production.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const WEB = path.resolve(here, "..");
const ROOT = path.resolve(WEB, "..");
const OUT = path.join(WEB, "generated", "corpus.json");

const read = (p) => fs.readFileSync(p, "utf8");

function frontMatterTitle(text, fallback) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (m) {
    const t = m[1].match(/^title:\s*(.+)$/m);
    if (t) return { title: t[1].trim(), body: text.slice(m[0].length).trim() };
  }
  return { title: fallback, body: text.trim() };
}

function titleFromName(file) {
  return path
    .basename(file)
    .replace(/\.(md|txt)$/, "")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function loadDir(dir, corpus) {
  let files;
  try {
    files = fs.readdirSync(dir).filter((f) => /\.(md|txt)$/.test(f)).sort();
  } catch {
    return [];
  }
  return files.map((f) => {
    const raw = read(path.join(dir, f));
    const { title, body } = frontMatterTitle(raw, titleFromName(f));
    return { title, corpus, path: path.relative(ROOT, path.join(dir, f)), text: body, chars: body.length };
  });
}

const prompt = path.join(ROOT, "prompts", "master-prompt.md");
if (!fs.existsSync(prompt)) {
  console.error(`\nFATAL: master prompt not found at ${prompt}`);
  process.exit(1);
}

const docs = [
  ...loadDir(path.join(ROOT, "corpus", "library"), "library"),
  ...loadDir(path.join(ROOT, "corpus", "morganton"), "morganton"),
];

const fitPath = path.join(ROOT, "data", "school-fit", "school-fit.md");
if (fs.existsSync(fitPath)) {
  const text = read(fitPath).trim();
  docs.push({
    title: "School Fit Dataset",
    corpus: "school-fit",
    path: path.relative(ROOT, fitPath),
    text,
    chars: text.length,
  });
}

const warnings = [];
if (!docs.some((d) => d.corpus === "library")) {
  warnings.push(
    "LIBRARY is empty — corpus/library/ has no documents. Kapp runs without it and must say so rather than reason from memory.",
  );
}
if (!docs.some((d) => d.corpus === "morganton")) {
  warnings.push(
    "MORGANTON is empty — corpus/morganton/ has no documents. Comparison-set claims cannot be grounded.",
  );
}
if (!docs.some((d) => d.corpus === "school-fit")) {
  warnings.push(
    "School-fit dataset missing. Run scripts/build_fit.py. Without it, fit claims must be declined.",
  );
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(
  OUT,
  JSON.stringify({ systemPrompt: read(prompt), docs, warnings, builtAt: new Date().toISOString() }),
);

const chars = docs.reduce((n, d) => n + d.chars, 0);
console.log(
  `corpus: ${docs.length} documents, ${(chars / 1000).toFixed(0)}k chars (~${Math.round(chars / 4 / 1000)}k tokens) -> generated/corpus.json`,
);
for (const w of warnings) console.warn(`  WARNING: ${w}`);
