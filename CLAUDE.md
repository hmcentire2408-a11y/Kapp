# Kapp — Shared Context for Claude Code Agents

Two Claude Code agents work in this repository **at the same time**, in the same working tree. Read this whole file before touching anything, then read `TASKS.md` to find your lane. This file is the stable context; `TASKS.md` is the live task board.

---

## 1. What Kapp is

Kapp is an **LLM college admissions evaluator** for **three seniors at NCSSM-Morganton** (North Carolina School of Science and Mathematics, Morganton campus; graduating class of 2027). It is a private tool, not a product: no scale, no billing, no public users.

A student uploads their own material (transcript, activities, essays, recommender notes, school list). Kapp reads it together with a fixed **research library** on how selective admissions offices actually read files, the **Morganton school context** (profile + outcome history), and a **school-fit dataset**, and responds as a top-tier private consultant would: grounded, specific, candid.

**Kapp does evaluation only.** No deadline tracking, no accountability tiers, no commitment check-ins. Those existed in the system Kapp was derived from and were deliberately dropped.

### Where it comes from

Kapp is a generalization of a single-student Claude Code system at `../college-apps-2027` (the **source repo**). That repo is **personal**: it contains one student's transcript, essays, private journal, family financial circumstances, and recommender notes. Kapp reuses its *method* and *research*, never its personal content. See §4.

### The core idea: fit over generic impressiveness

A standing project rule, and the main change from the source system:

> A student should not be predicted out of a set of schools (e.g., Harvard, Stanford) wholesale because they don't seem like "that sort of student" or don't seem impressive enough for the tier. Bias fit — evidence that the student's values and academic interests match what a **specific** school professes and looks for — over a generic perception of what impresses a tier.

In practice, Kapp:
- gives **school-specific** verdicts, never tier-level write-offs ("T20s are a reach for you");
- weighs documented fit (school's own words ↔ student's own evidence) above generic prestige signals;
- still reports academic and school-group context honestly, and still never quantifies odds.

Fit claims must cite both sides: the school's published language (from the fit dataset) and the student's file.

---

## 2. Architecture (planned)

```
system prompt (prompts/master-prompt.md)          ← static, cached
  + LIBRARY documents   (corpus/library/)         ← static, cached
  + MORGANTON documents (corpus/morganton/)       ← static, cached
  + SCHOOL FIT dataset  (data/school-fit/*.md)    ← static, cached
  + ONE student's documents                       ← per session
  + conversation                                  ← per turn
```

- **Model:** Claude Opus 5 (`claude-opus-5`), adaptive thinking, Anthropic SDK, Messages API with tool use. Citations enabled on document blocks so every claim maps to a quoted source passage.
- **Web verification:** enabled but deprioritized. Policy facts (deadlines, prompts, testing, aid, rec requirements) are never answered from model memory; verified live via web search/fetch restricted to official domains, or refused. Web search is for those facts only — never a general research path, and never used to re-derive what the cached corpus already covers.
- **Isolation:** exactly one student's documents per request. Never two. The three users are classmates applying to overlapping schools.
- **Stack: Next.js 15 (App Router) + Supabase**, in `web/`. Auth is Supabase email/password; data is Postgres with row-level security. See `web/README.md`.
- **Isolation is enforced in the database, not in app code.** Every table's RLS policy is `auth.uid() = user_id`; the server resolves identity with `supabase.auth.getUser()` (revalidates the JWT), never from a request parameter. Do not add a code path that takes a user id from the client.

---

## 3. Repository layout

```
CLAUDE.md                     this file (edit only with user approval)
TASKS.md                      live task board — each agent edits only its own section
prompts/
  master-prompt.md            the system prompt                          [owner: Agent A]
data/
  school-fit/                 fit dataset: JSON source → .xlsx + .md     [owner: Agent A]
scripts/
  build_fit.py                builds data/school-fit outputs             [owner: Agent A]
  scrub_check.py              denylist scan over corpus/                 [owner: Agent B]
web/                          Next.js app — auth, documents, chat        [owner: Agent A]
  supabase/schema.sql         tables + row-level security policies
  lib/context.ts              per-user context assembly
  lib/anthropic.ts            request construction, caching, tools
corpus/
  library/                    scrubbed research + method docs            [owner: Agent B]
  morganton/                  scrubbed school context                    [owner: Agent B]
  MANIFEST.md                 every corpus doc: tier, provenance, scrub log [owner: Agent B]
evals/
  students/                   FICTIONAL test students                    [owner: Agent B]
  cases.md                    test cases + pass criteria                 [owner: Agent B]
```

Directories that don't exist yet are created by their owner.

---

## 4. Privacy rules (hard)

1. **The source repo is read-only.** Never write to `../college-apps-2027`.
2. **Only the files listed in `TASKS.md` may be copied from the source repo**, and only after scrubbing. Never copy anything from its `applicant/`, `state/`, `planning/` (except the activity lens), `essays/` (except the essay lens), `data/`, `scripts/build_tracker.py`, `STATUS.md`, `UPDATE-PROMPT.md`, `college-tracker.xlsx`, or its `CLAUDE.md`.
3. **Scrubbing means removing** anything about the source-repo student: names of their teachers/recommenders, activities, honors, scores, GPA references phrased as "the applicant's", prior school, home town, finances, family events, school list ("confirmed 15", "near list"), and any path into their personal files (`applicant/…`, `state/…`, `planning/…`, `STATUS.md`). Keep the method, the data, and the Morganton-wide statistics.
4. **Nothing personal in git.** This repo has a GitHub remote (`hmcentire2408-a11y/Kapp`) visible to the other users. Agents do not commit or push; the user does.
5. **Fictional test students only.** Eval profiles must not be modeled on any of the three real users.

---

## 5. Evidence rules (apply to all work in this repo)

These carry over from the source system because they are what makes it trustworthy.

- **No external facts from memory.** School mission statements, values, admissions language, deadlines, prompts, policies: fetch the primary page, record the URL and the date (`verified_on`). If you can't verify, leave the field empty and say why in `notes`. **Empty beats wrong.**
- **Verbatim means verbatim.** A field marked as a quote must match the live page text (normalize whitespace and curly quotes only). Paraphrase or compiler commentary is labeled as such, never presented as the school's words.
- **Source hierarchy** (higher wins; say which you used): primary institutional pages → peer-reviewed research → the user's direct statements → practitioner accounts (hypotheses, never law) → model priors (labeled `[prior]`, never load-bearing). Volume does not promote a source.
- **Cohort base rates are not individual odds.** Never convert Morganton outcome data into a probability.
- **The student's words stay theirs.** Kapp marks up student prose; it never writes or rewrites essays. Don't build prompts, evals, or features that compose student prose.
- **Cite line numbers from files you actually opened**, not from memory or from this document — line numbers in the source repo drift.

---

## 6. Collaboration protocol

- **Stay in your lane.** Only create or edit files your agent owns (§3). If you need a change in the other agent's files, write a request under **Requests** in `TASKS.md` and keep going on something else.
- **`TASKS.md` is the handshake.** Mark a task `in progress` before starting, `done` with a one-line result when finished, `blocked` with the reason. Edit only your own section plus the Requests and Log sections (append-only).
- **Same working tree, no git operations.** Don't `git add`, commit, stash, checkout, reset, or clean — any of those can clobber the other agent's uncommitted work. The user handles git. (If the user wants isolation later: `git worktree add ../Kapp-b -b agent-b` after a first commit.)
- **Shared files** (`CLAUDE.md`, the top of `TASKS.md`): change only with the user's approval.
- **Interfaces between lanes** are defined in `TASKS.md` → Interfaces. If you need to change one, request it; don't silently change a format the other agent consumes.
- **Before finishing a session,** update your section of `TASKS.md` so the other agent (or a fresh session) can pick up cold.

---

## 7. Decisions already made (don't relitigate without new evidence)

| Date | Decision |
|---|---|
| 2026-09-15 | Kapp is evaluation-only; accountability/deadline machinery from the source repo is dropped. |
| 2026-09-15 | Three NCSSM-Morganton users; Morganton context carries over; no scale. |
| 2026-09-15 | Fit to a specific school's professed values is weighted above generic tier-level impressiveness. |
| 2026-09-15 | The fit dataset covers the T20 national universities as defined in the source repo's outcome model (`school-context/ncssm-outcomes-analysis-4yr.md:16-35`): Duke, Cornell, Columbia, Yale, Princeton, Penn, Johns Hopkins, Harvard, UC Berkeley, Vanderbilt, Stanford, Rice, Brown, Dartmouth, MIT, UCLA, Notre Dame, Caltech, Northwestern, UChicago. |
| 2026-09-15 | Fit dataset format follows the MVV template (Mission / Values / Who are their people? / Sources), extended with an admissions-office "what we look for" field, since the office that reads files is stronger evidence of admissions preference than a university-wide mission statement. |
| 2026-09-15 | Kapp never writes student prose. |
| 2026-09-15 | Web app stack is Next.js + Supabase; the choice is delegated to Agent A and is not a user decision. |
| 2026-09-15 | Web search is allowed but deprioritized — policy-fact verification only, never general research. |
| 2026-09-15 | Fit dataset stays at the T20; no expansion to LACs or in-state schools for now. |
| 2026-09-15 | The app is multi-user from the start: three students, separate logins, one student's file per session. Agent collaboration on the codebase is deferred and will be announced. |
| 2026-09-15 | Student documents live in Supabase Postgres under RLS, not on disk. No public sign-up; accounts are created in the Supabase dashboard. |

## 8. Open questions for the user

_None open._ Stack, web search and fit-dataset scope were all settled on 2026-09-15 — see §7. Don't reopen them without new evidence.
