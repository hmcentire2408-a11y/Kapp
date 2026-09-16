# Kapp — Task Board

Read `CLAUDE.md` first. Each agent edits **only its own section**, plus **Requests** and **Log** (append-only). Status values: `todo` · `in progress` · `done` · `blocked`.

Source repo (read-only): `../college-apps-2027` — abbreviated `SRC/` below.

---

## Interfaces between lanes

**Fit dataset (A → consumed by B's evals and by the prompt)**
- `data/school-fit/schools.json` — source of truth. One object per school:
  `school`, `mission`, `vision`, `values`, `motto`, `founding_principle`, `other_statements`, `who_are_their_people`, `admissions_look_for`, and for each text field a matching `<field>_source` (URL) and `<field>_status` ∈ `verbatim` | `verbatim-excerpt` (quoted with `...` elisions) | `compiler-note` (our words, not the school's) | `unverified`. Plus `verified_on` (ISO date) and `notes`.
- `data/school-fit/school-fit.xlsx` — human-readable, one row per school.
- `data/school-fit/school-fit.md` — the LLM-facing document loaded into Kapp's context.

**Corpus (B → consumed by the prompt)**
- `corpus/library/*.md`, `corpus/morganton/*.md` — scrubbed text only (no page images, no PDFs).
- `corpus/MANIFEST.md` — table: file · document title as the prompt names it · tier (`H` primary process / `P` empirical / `W`/`A`/`C` practitioner / `Method` / `Morganton`) · provenance · what was removed.
- Document titles must match the names used in `prompts/master-prompt.md` §1 (Harvard Reading Procedures, "Making a Pecan Pie", AO account digest, former-AO/counselor talk, The Reader's Lens, Activity Checker Lens, Conflicts Ledger, NCSSM 2025 residential profile, Morganton outcome history). If a name must change, file a Request to A.

---

## Agent A — Prompt & School Fit

Owner of: `prompts/`, `data/school-fit/`, `scripts/build_fit.py`.

| # | Task | Status | Acceptance criteria |
|---|---|---|---|
| A1 | Master prompt v1 | done | `prompts/master-prompt.md` exists; evaluation-only; Morganton context; evidence rules; privacy between students. |
| A2 | Verify the 7 user-supplied MVV entries (Stanford, MIT, Cornell, Princeton, Northwestern, Rice, Penn) against live pages | done | Every quoted string checked against fetched page text; mismatches get the correct source URL or are relabeled `compiler-note` / `unverified`. 20 of 26 matched verbatim. Unconfirmed and recorded as such in `schools.json` notes: NU motto (not on the cited page), Rice motto and "Rice's advantages…" people line (page reworded), Penn founding-ethos sentence and the Franklin "Inclination…" quote (source pages 403). |
| A3 | Research the remaining 13 T20 schools in the same format | done | All 20 schools in `data/school-fit/schools.json`. 22 fields left empty with a reason (mostly mottos, plus JHU/Berkeley mission+values and Columbia/UChicago/Dartmouth admissions criteria — blocked by 403s or JavaScript-only pages). |
| A4 | Admissions "what we look for" field for all 20 | done | 17 of 20 have admissions-office language; Rice and UCLA are `quoted-unchecked` (fetch tool, not byte-checked); Columbia, Dartmouth and UChicago are open gaps. |
| A5 | Build outputs | done | `scripts/build_fit.py` writes `school-fit.md` and `school-fit.xlsx`. Needs openpyxl: use `.venv/bin/python` (venv created; `.venv/` is gitignored). |
| A6 | Add **Fit** section to master prompt | done | Added as "Fit — and the tier-level verdict you must not give" in §5, with the four verdict shapes: documented fit / plausible but unevidenced / mismatch / unknown. |
| A7 | Web app scaffold | done | `web/` builds clean (`npm run build`). Next.js 15 + Supabase auth, per-user documents under RLS, streaming chat with citations, context panel showing what loaded and what is missing. |
| A8 | Supabase project provisioning | blocked | Needs the user: create the project, run `web/supabase/schema.sql`, add the three accounts, put the URL + anon key in `web/.env.local`. |
| A9 | Conversation persistence | todo | Still unwritten — history is lost on refresh. | `conversations` / `messages` tables exist in the schema but the UI does not write to them yet — history is lost on refresh. |
| A10 | Deploy | blocked | Needs the user: hosting account + environment variables. See `web/README.md` → Deploying. |

---

## Agent B — Corpus & Evals

Owner of: `corpus/`, `evals/`, `scripts/scrub_check.py`.

**Method for every copied file:** open the source file fresh (line numbers below were accurate on 2026-09-15 and may drift — confirm by content, not by number), copy into `corpus/`, remove the personal material listed, then run the denylist scan (B3). Record every removal in `corpus/MANIFEST.md`. When a passage mixes Morganton-wide data with the source student's details, keep the data and delete or neutralize the personal framing (e.g., relabel a column "5.0 bin (applicant's)" → "5.0 bin").

| # | Task | Status | Acceptance criteria |
|---|---|---|---|
| B1 | **Library** → `corpus/library/` | done | 7 files in `corpus/library/`. Removals logged in `corpus/MANIFEST.md`. |
| | `SRC/admissions-research/harvard-reading-procedures-class-2023.md` | | Text only; drop page-image references if they point at files not copied. |
| | `SRC/admissions-research/holistic-review-pecan-pie-paper.md` | | Same. |
| | `SRC/admissions-research/ao-account-digest.md` | | Grep showed no source-student content; still scan. |
| | `SRC/admissions-research/ao-counselor-candid-talk.md` | | Third-party transcript; keep for private use; scan. |
| | `SRC/essays/essay-evaluator-lens.md` | | Morganton references are fine (all users are Morganton). Scan. |
| | `SRC/planning/activity-checker-lens.md` | | **Remove §2 "Worked failure patterns (from this applicant's list…)"** (~lines 94–107). Remove refs to `state/decisions.md`. |
| | `SRC/doctrine/conflicts-ledger.md` | | Remove "Entries count against the 20-rule budget" and any refs to source-repo rules; keep C1–C8. |
| B2 | **Morganton** → `corpus/morganton/` | done | 3 files in `corpus/morganton/`. Removals logged in `corpus/MANIFEST.md`. |
| | `SRC/school-context/ncssm-profile-2025-extracted.md` | | Remove: the `applicant/…` class-rank reference (~:41); the whole section "What this says about the applicant's transcript" (~:47–72, includes a recommender name); the "Applicant comparison" SAT lines (~:87–90). Keep all school statistics, GPA scale, curriculum, highlights. |
| | `SRC/school-context/ncssm-outcomes-consolidated-2026-09-08.md` | | Remove: refs to `state/`, `planning/`, `STATUS` (~:14–20, :132, :395); "confirmed 15" / "near list" / school-list framing (~:139, :152, :382–385, and the "Confirmed list first" note in §3); "applicant's" framing in §6 (~:229–258) — keep the bin tables, relabel columns. The per-school tables themselves stay. |
| | `SRC/school-context/scoir-school-history-2026-09-07.md` | | Remove: prior-school discussion (~:17–27, names a previous high school); "applicant's weighted GPA" lines (~:29–32); relabel "(applicant's)" columns (~:90–93); refs to `planning/`/`state/`. |
| | Do **not** copy `SRC/school-context/ncssm-outcomes-analysis-4yr.md` | | Superseded by the consolidated file. |
| B3 | `scripts/scrub_check.py` + clean run | done | Exits 0 over all 10 corpus files. | Scans `corpus/` (and later `evals/`) case-insensitively for the denylist in `.denylist.local` plus the path patterns `applicant/`, `state/`, `planning/`, `STATUS.md`, `UPDATE-PROMPT`; prints file:line hits; exits non-zero on any hit. Final run: zero hits. |
| B4 | `corpus/MANIFEST.md` | done | Table plus a per-file record of what was removed. |
| B5 | Fictional test students → `evals/students/` | todo | 4 invented Morganton seniors with deliberately different shapes: (a) academics at the 5.0 ceiling, generic STEM activities; (b) humanities/civic spike, modest scores; (c) research-heavy with a thin personal side; (d) strong fit with one specific school's professed values but unremarkable by "tier" standards — the case the fit rule exists for. Each: transcript summary, activities, one essay excerpt, school list. Clearly marked FICTIONAL. Not modeled on real users. |
| B6 | `evals/cases.md` | todo | For each student, questions + pass/fail criteria covering: cites sources; refuses unverified deadlines/policy; never gives numeric odds; marks up but never rewrites prose; refuses to discuss another named student; gives school-specific rather than tier-level verdicts; fit claims quote both school language (from `data/school-fit/school-fit.md`) and student evidence. Fit cases may be drafted against CLAUDE.md §1 before A6 lands. |

**Denylist (source-repo student; case-insensitive):** the terms live in `.denylist.local`, which is gitignored — it is a list of one student's name, recommenders, prior school, activities, scores and scholarship targets, and must never reach this remote. `scripts/scrub_check.py` reads it from disk. If the file is missing, ask the user for it; do not reconstruct it from the source repo and do not inline it here.

---

## Blocked (needs the user)

Settled on 2026-09-15 (now in `CLAUDE.md` §7): stack delegated to Agent A · web search on but deprioritized · fit dataset stays at the T20.

Still needs the user:

| Item | Why |
|---|---|
| Supabase project (A8) | Only the user can create the project and the three accounts. The app cannot run until the URL and anon key are in `web/.env.local`. |
| Hosting (A10) | Account + environment variables. |


---

## Requests (append-only; `from → to: request — status`)

_none yet_

**Note for Agent B (B6):** fit test cases can now be written against `data/school-fit/school-fit.md`, which exists. Student (d) in B5 — strong fit with one school's stated values, unremarkable by tier standards — should test that Kapp names the school-specific documented fit instead of a tier-level write-off.

---

## Log (append-only; `date · agent · what happened`)

- 2026-09-15 · A · Created `CLAUDE.md`, `TASKS.md`, `prompts/master-prompt.md`. Fetched and checked the user's 7 MVV entries: 20/26 quotes verbatim on first pass.
- 2026-09-15 · A · A2–A6 done: `data/school-fit/{schools.json,school-fit.md,school-fit.xlsx}` for all 20 T20 schools, `scripts/build_fit.py`, and the Fit section of the master prompt.
- 2026-09-15 · user · Three Blocked items resolved (stack delegated / web search on-but-deprioritized / fit dataset stays at T20). Second privacy pass: source-repo attribution and carried-over personal examples removed from the prompt and CLAUDE.md.
- 2026-09-15 · B · Corpus built: 7 library + 3 Morganton documents scrubbed into `corpus/`, `scripts/scrub_check.py` passing, `corpus/MANIFEST.md` recording every removal. ~279k characters, ~70k tokens, cached.
- 2026-09-15 · A · Chat drag-and-drop: drop a text document anywhere in the conversation, choose save-to-file or this-conversation-only. Unsaved attachments go after the cache breakpoint.
- 2026-09-15 · A · `web/` scaffolded and building: Supabase auth + RLS, per-user document management, streaming chat with document citations, prompt caching at three breakpoints, context-gap reporting. Corrected an earlier misread — the app is multi-user; only agent collaboration is deferred.
