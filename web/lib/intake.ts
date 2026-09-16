import type { Attachment } from "./types";

/**
 * Intake schema. The fields follow the "information to request" list in the
 * Evaluation Framework, because that is what the evaluation actually consumes:
 * rigor and rank context, scores, per-activity role/hours/impact, award level,
 * who is writing and what they have actually seen, and circumstances.
 *
 * Each section renders to its own document so it slots into the existing
 * per-user pipeline unchanged — no new tables, no new loader path.
 */

export interface Activity {
  position: string;
  org: string;
  description: string;
  grades: string;
  hoursPerWeek: string;
  weeksPerYear: string;
  selectivity: string;
  continuing: boolean;
}

export interface Honor {
  title: string;
  level: "school" | "regional" | "state" | "national" | "international" | "";
  grade: string;
  basis: string;
}

export interface Recommender {
  name: string;
  role: string;
  relationship: string;
  courseLevel: string;
  likelyEmphasis: string;
  corroborates: string;
}

export interface IntakeData {
  gpaWeighted: string;
  gpaUnweighted: string;
  scale: string;
  rank: string;
  rigor: string;
  seniorCourses: string;
  sat: string;
  act: string;
  apScores: string;
  otherTesting: string;
  activities: Activity[];
  honors: Honor[];
  recommenders: Recommender[];
  intendedMajor: string;
  schoolList: string;
  circumstances: string;
  other: string;
}

export const EMPTY_ACTIVITY: Activity = {
  position: "", org: "", description: "", grades: "",
  hoursPerWeek: "", weeksPerYear: "", selectivity: "", continuing: false,
};

export const EMPTY_HONOR: Honor = { title: "", level: "", grade: "", basis: "" };

export const EMPTY_RECOMMENDER: Recommender = {
  name: "", role: "", relationship: "", courseLevel: "",
  likelyEmphasis: "", corroborates: "",
};

export const EMPTY_INTAKE: IntakeData = {
  gpaWeighted: "", gpaUnweighted: "", scale: "", rank: "", rigor: "",
  seniorCourses: "", sat: "", act: "", apScores: "", otherTesting: "",
  activities: [{ ...EMPTY_ACTIVITY }],
  honors: [{ ...EMPTY_HONOR }],
  recommenders: [{ ...EMPTY_RECOMMENDER }],
  intendedMajor: "", schoolList: "", circumstances: "", other: "",
};

const has = (s: string) => s.trim().length > 0;

function kv(rows: [string, string][]): string {
  const live = rows.filter(([, v]) => has(v));
  if (live.length === 0) return "";
  return live.map(([k, v]) => `- **${k}:** ${v.trim()}`).join("\n");
}

/**
 * Render the intake into documents. Empty sections produce nothing — a blank
 * document would read to the evaluator as an assertion that there is nothing
 * there, which is different from not having been asked.
 */
export function renderIntake(d: IntakeData): Attachment[] {
  const docs: Attachment[] = [];

  const academics = kv([
    ["Weighted GPA", d.gpaWeighted],
    ["Unweighted GPA", d.gpaUnweighted],
    ["Scale", d.scale],
    ["Class rank", d.rank],
    ["Course rigor", d.rigor],
    ["Senior-year courses", d.seniorCourses],
    ["Intended major / academic direction", d.intendedMajor],
  ]);
  const testing = kv([
    ["SAT", d.sat],
    ["ACT", d.act],
    ["AP / IB scores", d.apScores],
    ["Other testing", d.otherTesting],
  ]);
  if (has(academics) || has(testing)) {
    docs.push({
      title: "Academic Record",
      classification: "current",
      body: [
        academics && `## Academics\n\n${academics}`,
        testing && `## Testing\n\n${testing}`,
      ].filter(Boolean).join("\n\n"),
    });
  }

  const acts = d.activities.filter((a) => has(a.position) || has(a.org));
  if (acts.length > 0) {
    docs.push({
      title: "Activities",
      classification: "current",
      body:
        "Entries as they would appear on the application.\n\n" +
        acts.map((a, i) => {
          const head = [a.position, a.org].filter(has).join(" — ");
          return [
            `### ${i + 1}. ${head}`,
            kv([
              ["Grades", a.grades],
              ["Hours/week", a.hoursPerWeek],
              ["Weeks/year", a.weeksPerYear],
              ["Selectivity or how the role was obtained", a.selectivity],
              ["Continuing in college", a.continuing ? "yes" : ""],
            ]),
            has(a.description) ? `\n${a.description.trim()}` : "",
          ].filter(Boolean).join("\n");
        }).join("\n\n"),
    });
  }

  const hons = d.honors.filter((h) => has(h.title));
  if (hons.length > 0) {
    docs.push({
      title: "Honors and Awards",
      classification: "current",
      body: hons.map((h) => {
        const bits = [h.level, h.grade].filter(has).join(", ");
        return `- **${h.title.trim()}**${bits ? ` (${bits})` : ""}${
          has(h.basis) ? ` — ${h.basis.trim()}` : ""
        }`;
      }).join("\n"),
    });
  }

  const recs = d.recommenders.filter((r) => has(r.name) || has(r.role));
  if (recs.length > 0) {
    docs.push({
      title: "Recommenders",
      classification: "current",
      body:
        "What each recommender has actually seen. This is the student's account of " +
        "the relationship, not the letter itself — treat it as expectation, not evidence " +
        "of what a letter will say.\n\n" +
        recs.map((r) => {
          const head = [r.name, r.role].filter(has).join(" — ");
          return `### ${head}\n\n${kv([
            ["Relationship and how long", r.relationship],
            ["Course level taught", r.courseLevel],
            ["Likely emphasis", r.likelyEmphasis],
            ["What it would corroborate in the application", r.corroborates],
          ])}`;
        }).join("\n\n"),
    });
  }

  const context = kv([
    ["School list", d.schoolList],
    ["Circumstances relevant to how the record should be read", d.circumstances],
    ["Anything else", d.other],
  ]);
  if (has(context)) {
    docs.push({
      title: "Additional Context",
      classification: "current",
      body: context,
    });
  }

  return docs;
}
