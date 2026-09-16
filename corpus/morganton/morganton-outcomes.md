---
title: Morganton outcome history
---

# NCSSM-Morganton admissions outcomes — consolidated

Built 2026-09-08. Merges three sources that previously sat in two files:

1. `school-context/ncssm-residential-profile-2025.pdf` → the "COLLEGE ACCEPTANCES
   & ENROLLMENTS FOR THE CLASSES OF 2023 THROUGH 2025" table, page 5. **Newly
   read for this document** — it is the table the old model was built from, and
   it had never been transcribed into the repo. (The file is a ZIP misnamed
   `.pdf`; see `school-context/ncssm-profile-2025-extracted.md:5-10`.)
2. `school-context/scoir-school-history-2026-09-07.md` — 21 counselor-platform
   screenshots, Morganton-only, per graduating class 2024/2025/2026.
3. `school-context/ncssm-outcomes-analysis-4yr.md` — the prior Poisson model.

numbers; it does not replace them on disk.

**Source-school identity is settled.** The counselor platform's "School data"
`[unverified]` block at `school-context/scoir-school-history-2026-09-07.md:17-27`
is stale and was never updated.

---

## 1. Sources and precision classes

Do not quote across classes.

| Tag | Meaning | Where |
|---|---|---|
| `[PROFILE]` | Printed count in the school's own profile. Exact as printed; self-reported upstream. | §7 table, and the profile columns of §3 |
| `[LABELED]` | Number printed inside the platform bar. Exact. | §5 |
| `[EST]` | Read off bar height against the y-axis. ±1 or worse; worse on stacked segments. Never a count. | §5, §6 |
| `[CAPTION]` | Printed footer "Applications with no GPA not shown: N Accepted, M Denied". Exact. | §6 |
| `[DERIVED]` | Computed here from the above. Arithmetic is reproducible; assumptions are named. | §2, §3, §4, §7 |

**Scope of each source.** The profile table pools **three Durham classes
(2023–2025) plus the first two Morganton classes (2024–2025)** — the profile
states this in its own footnote. It cannot be split by campus as printed. The
platform is **Morganton only, three classes (2024, 2025, 2026)**. So 2024 and
2025 appear in both sources; §2 does not pool them, it uses one to validate the
other.

---

## 2. The method correction — read this before using any number

The prior model fit a pooled Poisson on "~2 class-equivalents (total ≈ 76)"
with the half-width inflated ×1.4, and flags its own weakness: overdispersion
(φ≈2) "plus the Durham-drift contamination in the 2025 estimate ... you're
working off two observations, one of which is a **differenced quantity**"
(`school-context/ncssm-outcomes-analysis-4yr.md:7`). What that quantity was
differenced against is not recorded, and cannot be reconstructed from anything
in the repo — the model's inputs are `[unverified]`.

Three classes of direct Morganton observation now exist. They can be checked
against a second, simpler estimator built from the same profile table:

> **Equal-per-capita.** Assume Morganton and Durham students are admitted at
> the same per-student rate — the profile's own claim that "the admissions
> criteria and process are the same for both campuses"
> (`school-context/ncssm-profile-2025-extracted.md:21-22`). The table covers
> 3 × 340 (Durham) + 2 × 150 (Morganton) = **1,320 student-equivalents**.
> A Morganton class of ~150 is therefore `A × 150 / 1320`.

**The denominator checks out.** Total enrollments in the profile table sum to
**1,277** against 1,320 student-equivalents — 96.7%. Self-reported enrollment is
very nearly complete, which is what a class-size denominator of 1,320 predicts.
Total acceptances sum to 2,732 (~2.1 per student), which is low for this
population and indicates **acceptances are under-reported relative to
enrollments**. Every per-capita figure below is therefore a floor.

**Which estimator wins.** Across the nine T20 schools with direct platform
history:

| | expected admits/class, 9 schools |
|---|---|
| Old differenced model | 18.2 |
| Equal-per-capita from profile | 25.6 |
| **Observed, 3 Morganton classes** | **22.7** [17.6–28.7] |

Observed sits at **0.89 × per-capita** and well above the differenced model.
Since both the observed counts (unknown-censoring, §5) and the per-capita
figures (under-reported acceptances) are floors, the true ratio is nearer 1.0
than 0.89. **The differencing understated Morganton systematically; per-capita,
validated at ~0.9, is the better estimator for schools with no direct history.**
The old model's per-school figures should not be used where this file gives a
number.

---

## 3. Expected admits per Morganton class — merged estimate

`per-capita` and `best` are `[DERIVED]`. `observed` is the sum of AE + A from §5.
CI is exact Poisson on the 3-class total, no overdispersion inflation — the
inflation the old model applied was for Durham contamination, which direct
observation does not have.

| School | profile A / E | per-capita | observed 24/25/26 | observed mean [95% CI] | old model | **best estimate** | basis |
|---|---|---|---|---|---|---|---|
| Duke | 104 / 57 | 11.8 | 9 / 10 / 12 | 10.3 [7.0–14.7] | 6.0 | **10.3**, floor | observed |
| Yale | 18 / 13 | 2.0 | 2 / 2 / 4 | 2.7 [1.2–5.3] | 2.5 | **2.7** | observed |
| Columbia | 23 / 13 | 2.6 | 2 / 2 / 4 | 2.7 [1.2–5.3] | 2.5 | **2.7** | observed |
| Princeton | 14 / 5 | 1.6 | 2 / 1 / 3 | 2.0 [0.7–4.4] | 2.0 | **2.0** | observed |
| Penn | 20 / 14 | 2.3 | 0 / 2 / 2 | 1.3 [0.4–3.4] | 1.5 | **1.3** | observed |
| Harvard | 16 / 11 | 1.8 | 1 / 0 / 0 | 0.3 [0.0–1.9] | 1.3 | **0.3** | observed |
| Stanford | 14 / 11 | 1.6 | 2 / 1 / 1 | 1.3 [0.4–3.4] | 1.0 | **1.3** | observed |
| Brown | 10 / 1 | 1.1 | — | — | 0.9 | **1.1** | per-capita |
| Dartmouth | 10 / 6 | 1.1 | 1 / 2 / 0 | 1.0 [0.2–2.9] | 0.9 | **1.0** | observed |
| UChicago | 6 / 3 | 0.7 | 1 / 1 / 1 | 1.0 [0.2–2.9] | 0.5 | **1.0** | observed |
| Georgetown | 7 / 3 | 0.8 | 0 / 0 / 1 | 0.3 [0.0–1.9] | — | **0.8** | per-capita |
| Williams | 7 / 2 | 0.8 | 2 / — / — | *uninformative* | 0.8 | **0.8** | per-capita |
| **CMC** | **absent** | **—** | — | — | — | **no data** | — |
| UNC-Chapel Hill | 960 / 664 | 109 | — | — | — | **~109** | per-capita |
| NC State | 543 / 248 | 62 | — | — | — | **~62** | per-capita |
| Cornell | 33 / 17 | 3.8 | — | — | 2.5 | **3.8** | per-capita |
| Notre Dame | 8 / 5 | 0.9 | — | — | 0.7 | **0.9** | per-capita |
| GWU | 6 / 1 | 0.7 | — | — | — | **0.7** | per-capita |
| **William & Mary** | **absent** | **—** | — | — | — | **no data** | — |

Five rows need their basis explained rather than read off the widest column:

- **Georgetown** — observed is 1 admit in 5 logged applications across three
  years. n is too small to beat the profile; per-capita is used.
- **Williams** — 2025 and 2026 outcomes are **100% unknown** on the platform,
  so those are censored, not zeros. The observed mean is not computable and the
  "2 / 0 / 0" reading in the predecessor file must not be averaged. Per-capita
  is used. Williams is also the only school with no Acceptance-by-GPA tab and a
  standing HTTP 403 on every `williams.edu` fetch
- **Harvard** — the 2025 and 2026 zeros are *real*, not censored: those bars
  show 24 D / 3 U and 19 D / 2 U with no green segment at all. Small unknown
  counts, so the zeros survive. This is the one school where observation is
  both below per-capita and trustworthy.
- **CMC and William & Mary** — appear nowhere in the 98-college profile table
  (§7) and nowhere on the platform. Not "few admits": **no reported NCSSM
  acceptance across five class-equivalents.**

### The two tail findings

**Duke runs hot and is the only school that converts in volume.** 31 admits over
three classes against a modelled 6.0/class, and even that is a floor — 2024 had
46 unknowns in 86 logged applications. If those unknowns resolved at the same
rate as the known outcomes, 2024 alone would be ~19. Duke also **enrolls** more
NCSSM students than any school outside the UNC system — 57, against 25 for the
next (Georgia Tech) — on a 55% yield. Its nearest peer-tier volume is Cornell at
33 admits / 17 enrolled.

**Harvard runs cold.** ~1 admit in 2024, zero in 2025, zero in 2026 — against a
per-capita expectation of 1.8/class.
Three classes is not enough to call it a policy, and a Poisson at 1.8 produces
three consecutive near-zero years about 3% of the time, so this is suggestive,
not established.

## 4. Aggregate baskets

Same basket definitions as the old model (US News T20 ex-UNC-CH; top-20 LACs).
`[DERIVED]`, per Morganton class.

| Basket | old model | per-capita | **observation-anchored** |
|---|---|---|---|
| T20 national (20 schools) | 28 [17–39] | 41.6 | **37 [29–47]** |
| Top-20 LACs (8 schools) | 10 [5–17] | 6.0 | **6 — unvalidated** |
| Combined | 38 [26–50] | 47.6 | **~43 [33–54]** |

The observation-anchored row scales the observed 9-school rate (22.7/class) up
to the full basket by its per-capita share, and scales the Poisson interval with
it. It is a floor on both counts.

**The LAC row has no observational support at all.** The only LAC with platform
history is Williams, and Williams is censored. Per-capita says 6, the old model
said 10, and nothing in the data arbitrates. Treat the LAC basket as the least
reliable number in this file.

---

## 5. Observed decision history by graduating class — Morganton only

Transcribed from the counselor platform, `School data` view, Application history
panel. `AE` = Accepted and Enrolled, `A` = Accepted, `D` = Denied, `U` = Unknown.
All `[LABELED]` unless marked. Thin unlabeled green slivers are `~` `[EST]`.

| School | 2024 | 2025 | 2026 | admits 24/25/26 |
|---|---|---|---|---|
| Duke | 5 AE, 4 A, 31 D, 46 U | 4 AE, 6 A, 46 D, 10 U | 4 AE, 8 A, 37 D, 9 U | **9 / 10 / 12** |
| Yale | ~2 AE [EST], 23 D, 26 U | 2 A, 20 D, ~1 U [EST] | 4 AE, 18 D | ~2 / 2 / 4 |
| Princeton | 2 AE, 21 D, 21 U | ~1 AE [EST], 24 D, 3 U | 3 AE, 26 D | 2 / ~1 / 3 |
| Columbia | ~2 AE/A [EST], 10 D, 21 U | ~2 AE/A [EST], 18 D, 3 U | 3 AE, ~1 A [EST], 10 D, 4 U | ~2 / ~2 / ~4 |
| Penn | 17 D, 16 U — **no admits shown** | 2 AE, 26 D, 2 U | 2 AE, 17 D, 2 U | **0** / 2 / 2 |
| Harvard | ~1 AE [EST], 28 D, 22 U | 24 D, 3 U — **no green** | 19 D, 2 U — **no green** | ~1 / **0** / **0** |
| Stanford | 2 AE, 20 D, 28 U | ~1 AE/A [EST], 25 D | ~1 AE [EST], 15 D | 2 / ~1 / ~1 |
| Dartmouth | 1 AE, 4 D, 9 U | 2 AE, 6 D, 2 U | 4 D, 1 U — **no admits** | 1 / 2 / **0** |
| UChicago | 1 A, 2 D, 16 U | 1 AE, 3 D | 1 A, 6 D, 1 U | 1 / 1 / 1 |
| Georgetown | 1 D, 2 U | 1 D, 1 U | 1 AE, 2 D | 0 / 0 / 1 |
| Williams | 1 AE, 1 A, 2 U | 1 U | 2 U | 2 / *censored* / *censored* |

### Censoring — this is the binding limit on §3

Outcomes marked Unknown are not denials. They are unreported. Admits hide inside
them, so **every observed count is a floor**, and the floor is worst in 2024.
If unknowns resolved at the same rate as known outcomes in that class:

| School, 2024 | known / logged | observed admits | ceiling if unknowns resolve at the known rate |
|---|---|---|---|
| Duke | 40 / 86 (47%) | 9 | 19.4 |
| Yale | 23 / 49 (47%) | ~2 | 4.3 |
| Princeton | 23 / 44 (52%) | 2 | 3.8 |
| Columbia | 10 / 31 (32%) | ~2 | 6.2 |
| Penn | 17 / 33 (52%) | 0 | 0.0 |
| Harvard | 28 / 50 (56%) | ~1 | 1.8 |
| Stanford | 22 / 50 (44%) | 2 | 4.5 |
| Dartmouth | 5 / 14 (36%) | 1 | 2.8 |
| UChicago | 3 / 19 (16%) | 1 | 6.3 |

The ceiling assumption is aggressive in the other direction — students report
good news more reliably than bad, so unknowns skew toward denials and toward
students who never filed. The truth is inside each bracket, nearer the floor.

**Therefore: do not read a 2024 → 2026 trend.** Unknown share collapses to near
zero by 2026 at almost every school. Apparent improvement is a reporting-rate
artifact, not a change in outcomes.

---

## 6. Acceptance by weighted GPA — the top two bins

**Bin convention** : bins are
top-exclusive. `4.75 – 5.0` excludes 5.0; a student at exactly 5.0 falls in the
`5.0 – 5.25` bin, which is why a bin above the scale maximum is populated. The
The top populated bin is the 5.0 bin.txt:12`),
so **he is in the top populated bin at every school below.**

All bin counts `[EST]` unless noted. Lower bins omitted where uniformly denials.

| School | 4.75–5.0 bin | 5.0 bin  | no-GPA row [CAPTION] |
|---|---|---|---|
| Princeton | ~28 total, ~1 accepted + orange sliver | ~13 total, ~3 accepted | 3 A, 21 D |
| Stanford | ~28 total, ~1–2 accepted | ~10 total, ~1 accepted | 2 A, 20 D |
| Yale | ~28 total, **~6 accepted** | ~9 total, ~1 accepted | 1 A, 23 D |
| Penn | ~26 total, ~2 accepted | **10 total, 0 accepted** | **17 D, 0 A** |
| Columbia | ~20 total, ~3 accepted + 1 waitlist-accepted | ~8 total, ~2 accepted | 1 A, 10 D |
| Brown | **19 total, 0 accepted** | ~12 total, ~2 accepted | 2 A, 16 D |
| Dartmouth | ~9 total, ~2 accepted | **1 total, denied** | 1 A, 4 D |
| UChicago | ~6 total, 0 clean accepts, 1 waitlist-accepted | ~4 total, 0 clean accepts, ~1 waitlist-accepted | 1 A, 2 D |
| Georgetown | 3 total, 0 accepted | **1 total, accepted** | 1 D |
| Duke | finer bins; large green block across the top two, ~8 and ~8 accepted [EST] | see left | not captured in crop |
| Williams | **no Acceptance-by-GPA tab exists** — only Scattergram and Application history | — | — |

Bins below 4.75 are almost uniformly denials at every school, the exception
being Duke, which shows scattered waitlist activity down to ~4.4.

**What this says.** In the top GPA bin, the school's history is majority
denial everywhere — Penn 10 at 5.0 and zero admitted, Dartmouth 1 and denied,
Stanford ~1 of ~10, Princeton ~3 of ~13, Brown ~2 of ~12, Columbia ~2 of ~8.
**A maximal weighted GPA has no discriminating power left at this school.** That
is a statement about the transcript's marginal value, not about any individual student.

Two constraints on that reading: top-bin n is 1 to 13 at nine of eleven schools,
so a single decision moves any percentage by tens of points; and the GPA panels
pool 2024–2026 rather than splitting by class. Georgetown (5 applications
total), UChicago (~10), Dartmouth and Williams have **no usable GPA signal**.

---

## 7. Full profile acceptance table — all 98 colleges

`[PROFILE]`, page 5 of `school-context/ncssm-residential-profile-2025.pdf`,
verbatim counts. **Classes 2023–2025 Durham (3 classes) + 2024–2025 Morganton
(2 classes) combined; the profile does not split them.** "Data compiled through
student self-reporting and college correspondences."

`yield` = E/A. `Morg/class` is the equal-per-capita estimate from §2
(`A × 150 / 1320`), `[DERIVED]`, a floor because acceptances are under-reported.
This is the only source in the repo covering the long tail.

| College | A | E | yield | Morg/class |
|---|---|---|---|---|
| Amherst College | 5 | 1 | 20% | 0.6 |
| Appalachian State University | 30 | 6 | 20% | 3.4 |
| Barnard College | 4 | 4 | 100% | 0.5 |
| Bates College | 1 | 1 | 100% | 0.1 |
| Boston College | 2 | 1 | 50% | 0.2 |
| Boston University | 5 | 1 | 20% | 0.6 |
| Bowdoin College | 2 | 1 | 50% | 0.2 |
| Brown University | 10 | 1 | 10% | 1.1 |
| California Institute of Technology | 4 | 2 | 50% | 0.5 |
| Cardiff University | 2 | 1 | 50% | 0.2 |
| Carnegie Mellon University | 19 | 8 | 42% | 2.2 |
| Case Western Reserve University | 16 | 1 | 6% | 1.8 |
| Coastal Carolina University | 1 | 1 | 100% | 0.1 |
| Colgate University | 1 | 1 | 100% | 0.1 |
| College of the Atlantic | 1 | 1 | 100% | 0.1 |
| Columbia University | 23 | 13 | 57% | 2.6 |
| Cornell University | 33 | 17 | 52% | 3.8 |
| Dakota State University | 2 | 1 | 50% | 0.2 |
| Dartmouth College | 10 | 6 | 60% | 1.1 |
| Davidson College | 19 | 5 | 26% | 2.2 |
| Drexel University | 9 | 1 | 11% | 1.0 |
| Duke Kunshan University | 9 | 1 | 11% | 1.0 |
| Duke University | 104 | 57 | 55% | 11.8 |
| East Carolina University | 53 | 4 | 8% | 6.0 |
| Elizabeth City State University | 3 | 1 | 33% | 0.3 |
| Elizabethtown College | 1 | 1 | 100% | 0.1 |
| Elon University | 12 | 2 | 17% | 1.4 |
| Embry-Riddle Aeronautical University | 12 | 2 | 17% | 1.4 |
| Florida Atlantic University | 4 | 2 | 50% | 0.5 |
| Florida Institute of Technology | 5 | 1 | 20% | 0.6 |
| George Washington University | 6 | 1 | 17% | 0.7 |
| Georgetown University | 7 | 3 | 43% | 0.8 |
| Georgia Institute of Technology | 68 | 25 | 37% | 7.7 |
| Harvard University | 16 | 11 | 69% | 1.8 |
| Harvey-Mudd College | 1 | 1 | 100% | 0.1 |
| Haverford College | 2 | 1 | 50% | 0.2 |
| High Point University | 13 | 1 | 8% | 1.5 |
| Hollins University | 4 | 1 | 25% | 0.5 |
| Howard University | 13 | 2 | 15% | 1.5 |
| Johns Hopkins University | 17 | 5 | 29% | 1.9 |
| Liberty University | 2 | 1 | 50% | 0.2 |
| Massachusetts Institute of Technology | 9 | 7 | 78% | 1.0 |
| McGill University | 1 | 1 | 100% | 0.1 |
| Middlebury College | 1 | 1 | 100% | 0.1 |
| Mount Holyoke College | 3 | 1 | 33% | 0.3 |
| New York University | 16 | 4 | 25% | 1.8 |
| North Carolina A&T State University | 44 | 11 | 25% | 5.0 |
| North Carolina State University | 543 | 248 | 46% | 61.7 |
| Northwestern University | 4 | 3 | 75% | 0.5 |
| Pennsylvania State University | 15 | 1 | 7% | 1.7 |
| Princeton University | 14 | 5 | 36% | 1.6 |
| Purdue University | 25 | 1 | 4% | 2.8 |
| Rhodes College | 3 | 2 | 67% | 0.3 |
| Rice University | 12 | 4 | 33% | 1.4 |
| Rose Hulman Institute of Technology | 4 | 2 | 50% | 0.5 |
| Saint Joseph's University | 2 | 2 | 100% | 0.2 |
| Smith College | 4 | 1 | 25% | 0.5 |
| Spelman College | 7 | 1 | 14% | 0.8 |
| Stanford University | 14 | 11 | 79% | 1.6 |
| Swarthmore College | 3 | 2 | 67% | 0.3 |
| The Citadel | 1 | 1 | 100% | 0.1 |
| Tufts University | 3 | 1 | 33% | 0.3 |
| United States Air Force Academy | 1 | 1 | 100% | 0.1 |
| United States Naval Academy | 4 | 3 | 75% | 0.5 |
| University of Alabama at Birmingham | 4 | 1 | 25% | 0.5 |
| University of Alabama at Tuscaloosa | 7 | 2 | 29% | 0.8 |
| University of California Berkeley | 19 | 3 | 16% | 2.2 |
| University of California Los Angeles | 7 | 1 | 14% | 0.8 |
| University of Chicago | 6 | 3 | 50% | 0.7 |
| University of Colorado, Boulder | 15 | 2 | 13% | 1.7 |
| University of Delaware | 2 | 1 | 50% | 0.2 |
| University of Florida | 9 | 1 | 11% | 1.0 |
| University of Georgia | 4 | 1 | 25% | 0.5 |
| University of Illinois at Urbana-Champaign | 22 | 3 | 14% | 2.5 |
| University of Maryland, College Park | 10 | 1 | 10% | 1.1 |
| University of Michigan | 15 | 2 | 13% | 1.7 |
| University of North Carolina - Asheville | 21 | 4 | 19% | 2.4 |
| University of North Carolina - Chapel Hill | 960 | 664 | 69% | 109.1 |
| University of North Carolina - Charlotte | 88 | 11 | 12% | 10.0 |
| University of North Carolina - Greensboro | 13 | 2 | 15% | 1.5 |
| University of North Carolina - Wilmington | 29 | 6 | 21% | 3.3 |
| University of Notre Dame | 8 | 5 | 62% | 0.9 |
| University of Pennsylvania | 20 | 14 | 70% | 2.3 |
| University of South Carolina | 34 | 1 | 3% | 3.9 |
| University of South Florida-Main Campus | 3 | 1 | 33% | 0.3 |
| University of Southern California | 9 | 2 | 22% | 1.0 |
| University of Texas, Austin | 4 | 1 | 25% | 0.5 |
| University of Toledo | 1 | 1 | 100% | 0.1 |
| University of Tulsa | 1 | 1 | 100% | 0.1 |
| University of Virginia | 19 | 1 | 5% | 2.2 |
| Vanderbilt University | 18 | 5 | 28% | 2.0 |
| Wake Forest University | 41 | 4 | 10% | 4.7 |
| Washington & Lee University | 9 | 3 | 33% | 1.0 |
| Washington University in St. Louis | 5 | 1 | 20% | 0.6 |
| Wentworth Institute of Technology | 2 | 1 | 50% | 0.2 |
| Western Carolina University | 18 | 2 | 11% | 2.0 |
| Williams College | 7 | 2 | 29% | 0.8 |
| Yale University | 18 | 13 | 72% | 2.0 |

Totals: **A = 2,732, E = 1,277** against 1,320 student-equivalents.

Notable absences — no reported acceptance anywhere in five class-equivalents:
**Claremont McKenna** and **William & Mary**.
Also absent, checked by name against the OCR: Pomona and every other Claremont
college, Colby, Wesleyan, Emory, Michigan State. Absence means no *reported*
acceptance, not a zero admit rate — but for CMC it means the confirmed list
carries one school with no NCSSM outcome evidence of any kind.

---

## 8. What this file does and does not license

1. **These are cohort base rates. They are not individual probabilities.** No
   number here may be converted into one — CLAUDE.md Default 6, and C6 of
   `doctrine/conflicts-ledger.md` as recorded at
2. **Denominators are applications logged in the platform, not applications
   filed.** "Unknown" may include students who added a school to a list and
   never applied. This inflates 2024 denominators most.
3. **Two of the three sources are self-reported.** The profile table says so
   explicitly; the platform's unknown category is the same phenomenon. Both bias
   admits downward, neither biases them upward.
4. **The per-capita estimator assumes Morganton and Durham admit at equal
   per-student rates.** It is validated at 0.89 on nine schools with direct
   history, and the profile asserts identical admissions criteria and course
   rigor across campuses. It is not validated for LACs, for the long tail in §7,
   or for UNC-CH and NC State, whose in-state guarantee makes the mechanism
   different from a selective private.
5. **Three classes is a short record.** Morganton opened in 2022; 2024 is its
   first graduating class. Every per-school CI in §3 spans a factor of two or
   more, and Harvard's, Georgetown's and Williams' span everything.
6. **The Duke figure in §3 is the one number here that changed a conclusion.**
   6.0/class was the old model; 10.3 is observed and still a floor. Anything
   downstream that used 6.0 should be rechecked.
