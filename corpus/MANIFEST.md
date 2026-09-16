# corpus/ — MANIFEST

Every document Kapp loads, what it is, and what was removed on the way in.

Source documents are personal to one student. **Scrubbing is not optional and is
not reversible from here** — `scripts/scrub_check.py` gates the directory against
`.denylist.local` plus structural path patterns, and must exit 0 before anything
is committed.

Titles below match the names used in `prompts/master-prompt.md` §1. If a title
changes here, change it there too.

| File | Title as the prompt names it | Tier | Provenance |
|---|---|---|---|
| `library/harvard-reading-procedures.md` | Harvard Reading Procedures, Class of 2023 | `H` | SFFA trial exhibit, recovered from a PDF archive. Text layer only. |
| `library/making-a-pecan-pie.md` | "Making a Pecan Pie" | `P` | Sukumar, Metoyer & He, CSCW 2018. **Findings digest with full citation — not the paper.** ACM copyright; this remote is public. |
| `library/ao-account-digest.md` | AO account digest | `W/A` | Digest of two pseudonymous former AOs. |
| `library/ao-counselor-talk.md` | Former-AO/counselor talk digest | `C` | **Claims digest, paraphrased — not the transcript.** A third party's own words; source marked for private use. |
| `library/readers-lens.md` | The Reader's Lens | `Method` | Essay evaluation method. |
| `library/activity-checker-lens.md` | Activity Checker Lens | `Method` | Activity/honors screens. |
| `library/conflicts-ledger.md` | Conflicts Ledger | `Method` | C1-C8 named contradictions with confidence levels. |
| `morganton/ncssm-profile-2025.md` | NCSSM 2025 residential profile | `Morganton` | Published school profile, OCR text layer. Durham + Morganton combined. |
| `morganton/morganton-outcomes.md` | Morganton outcome history | `Morganton` | Profile acceptance table plus counselor-platform decision history by class. |
| `morganton/morganton-decision-history.md` | Morganton counselor-platform decision history | `Morganton` | Counselor-platform panel readings. [EST] values are pixel estimates, never counts. |

## What was removed

**`library/harvard-reading-procedures.md`**
- dropped page-image pointer (1x)

**`library/making-a-pecan-pie.md`**
- replaced the full 1,204-line paper text with a 74-line findings digest plus citation (ACM copyright, public remote)

**`library/ao-account-digest.md`**
- Nothing. Scanned clean — no source-student content present.

**`library/ao-counselor-talk.md`**
- replaced the 819-line verbatim transcript with a 65-line paraphrased claims digest
- dropped promotional material, pricing, audience anecdotes, and identifying detail about the speaker's family and individual students

**`library/readers-lens.md`**
- de-personalised one possessive reference to the source student (1x)

**`library/activity-checker-lens.md`**
- removed §2, a worked-examples section built from the source student's own activity list (15 lines)
- removed source-repo path references (1 lines)

**`library/conflicts-ledger.md`**
- removed rule-budget line (1 lines)
- removed source-repo CLAUDE.md reference (1x)
- neutralised 'this applicant pool' (1x)
- removed source-repo command references (1x)

**`morganton/ncssm-profile-2025.md`**
- removed the whole transcript-commentary section, which named a recommender and cited course-by-course detail (28 lines)
- removed applicant class-rank citation (1x)
- removed 'Applicant comparison' SAT/AP paragraph
- removed 6 lines of source-repo file provenance

**`morganton/morganton-outcomes.md`**
- removed source-repo path references (7 lines)
- removed school-list framing that referenced the source student's own list (3x)
- neutralised a second school-list label (1x)
- relabelled applicant GPA-bin columns (1x)
- removed applicant GPA statement (1x)
- removed applicant attribution (1x)
- de-personalised bin discussion (1x)
- de-personalised closing clause (1x)
- cut three residual school-list sentences

**`morganton/morganton-decision-history.md`**
- rewrote 'Whose school is this?' — removed the prior-high-school discussion
- removed applicant attribution (1x)
- removed applicant GPA statement (1x)
- relabelled applicant GPA-bin columns (1x)
- de-personalised bin definition (1x)
- removed source-repo path references (1 lines)
- de-personalised remaining references (1x)

## Re-running the scrub

The copy was a one-shot script, not a committed tool: it encodes decisions about
specific passages in specific files and would not survive the sources changing.
To refresh a document, re-read the source, apply the removals listed above by
content rather than by line number, and re-run:

```bash
python3 scripts/scrub_check.py
```

A non-zero exit means something personal reached `corpus/`. Do not commit past it.
