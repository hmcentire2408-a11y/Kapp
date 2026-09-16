"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";
import {
  EMPTY_ACTIVITY,
  EMPTY_HONOR,
  EMPTY_INTAKE,
  EMPTY_RECOMMENDER,
  renderIntake,
  type IntakeData,
} from "@/lib/intake";

const STEPS = ["Academics", "Activities", "Honors", "Recommenders", "Context", "Review"];
const DRAFT_KEY = "kapp.intake.draft";

export default function IntakePage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [d, setD] = useState<IntakeData>(EMPTY_INTAKE);
  const [restored, setRestored] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = <K extends keyof IntakeData>(k: K, v: IntakeData[K]) =>
    setD((x) => ({ ...x, [k]: v }));

  // Draft autosave. The wizard is long enough that losing it to a closed tab is
  // a real cost. This is a per-browser convenience only — the file of record is
  // the database, and nothing here is shared or readable by anyone else.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        setD({ ...EMPTY_INTAKE, ...JSON.parse(raw) });
        setRestored(true);
      }
    } catch {
      // Private window, blocked storage — the wizard still works, just without
      // a draft.
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(d));
    } catch {
      /* ignore */
    }
  }, [d]);

  function clearDraft() {
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch {
      /* ignore */
    }
  }

  const docs = useMemo(() => renderIntake(d), [d]);

  async function submit() {
    setBusy(true);
    setError(null);
    for (const doc of docs) {
      const r = await fetch("/api/documents", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...doc, replaceByTitle: true }),
      });
      const j = await r.json();
      if (j.error) {
        setError(`${doc.title}: ${j.error}`);
        setBusy(false);
        return;
      }
    }
    clearDraft();
    router.push("/documents");
  }

  function Field({
    label, k, hint, area,
  }: { label: string; k: keyof IntakeData; hint?: string; area?: boolean }) {
    const v = d[k] as string;
    return (
      <label className="fld2">
        <span>{label}</span>
        {area ? (
          <textarea value={v} rows={3} onChange={(e) => set(k, e.target.value as never)} />
        ) : (
          <input value={v} onChange={(e) => set(k, e.target.value as never)} />
        )}
        {hint && <em>{hint}</em>}
      </label>
    );
  }

  return (
    <div className="docs-page wide">
      <Nav />
      <h1>Intake</h1>
      <p className="lede">
        What the evaluation actually needs. Nothing here is required — leave a
        field blank and Kapp treats it as not yet known, which is different from
        knowing there is nothing there. Everything saves to your documents.
      </p>

      {restored && (
        <div className="note warn" style={{ marginBottom: 16 }}>
          Restored an unsaved draft from this browser. It is not in your file
          until you save it on the Review step.{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              clearDraft();
              setD(EMPTY_INTAKE);
              setRestored(false);
            }}
          >
            Start over
          </a>
        </div>
      )}

      <div className="steps">
        {STEPS.map((s, i) => (
          <button
            key={s}
            className={`stepbtn${i === step ? " on" : ""}`}
            onClick={() => setStep(i)}
          >
            {i + 1}. {s}
          </button>
        ))}
      </div>

      {step === 0 && (
        <section className="panel">
          <div className="grid2">
            <Field label="Weighted GPA" k="gpaWeighted" />
            <Field label="Unweighted GPA" k="gpaUnweighted" />
            <Field label="Scale" k="scale" hint="e.g. 5.00 max, by course band" />
            <Field label="Class rank" k="rank" hint="or “not reported”" />
          </div>
          <Field label="Course rigor" k="rigor" area
            hint="Course levels taken, and what was available but not taken." />
          <Field label="Senior-year courses" k="seniorCourses" area />
          <Field label="Intended major / academic direction" k="intendedMajor" />
          <h3>Testing</h3>
          <div className="grid2">
            <Field label="SAT" k="sat" hint="composite and sections" />
            <Field label="ACT" k="act" />
          </div>
          <Field label="AP / IB scores" k="apScores" area hint="Subject and score." />
          <Field label="Other testing" k="otherTesting" />
        </section>
      )}

      {step === 1 && (
        <section className="panel">
          <p className="lede small">
            Describe what changed because you were there. The Activity Checker
            Lens screens for effort verbs standing in for results, so
            &ldquo;organized&rdquo; and &ldquo;proposed&rdquo; read weaker than what was
            adopted, created, or continued after you left.
          </p>
          {d.activities.map((a, i) => (
            <div className="rowcard" key={i}>
              <div className="grid2">
                <input placeholder="Position / role" value={a.position}
                  onChange={(e) => { const n=[...d.activities]; n[i]={...a,position:e.target.value}; set("activities",n); }} />
                <input placeholder="Organization" value={a.org}
                  onChange={(e) => { const n=[...d.activities]; n[i]={...a,org:e.target.value}; set("activities",n); }} />
              </div>
              <textarea rows={3} placeholder="What you did, and what changed because of it"
                value={a.description}
                onChange={(e) => { const n=[...d.activities]; n[i]={...a,description:e.target.value}; set("activities",n); }} />
              <div className="grid4">
                <input placeholder="Grades (9–12)" value={a.grades}
                  onChange={(e) => { const n=[...d.activities]; n[i]={...a,grades:e.target.value}; set("activities",n); }} />
                <input placeholder="Hrs/week" value={a.hoursPerWeek}
                  onChange={(e) => { const n=[...d.activities]; n[i]={...a,hoursPerWeek:e.target.value}; set("activities",n); }} />
                <input placeholder="Weeks/year" value={a.weeksPerYear}
                  onChange={(e) => { const n=[...d.activities]; n[i]={...a,weeksPerYear:e.target.value}; set("activities",n); }} />
                <input placeholder="Selectivity" value={a.selectivity}
                  onChange={(e) => { const n=[...d.activities]; n[i]={...a,selectivity:e.target.value}; set("activities",n); }} />
              </div>
              <div className="rowfoot">
                <label className="chk">
                  <input type="checkbox" checked={a.continuing}
                    onChange={(e) => { const n=[...d.activities]; n[i]={...a,continuing:e.target.checked}; set("activities",n); }} />
                  Plan to continue in college
                </label>
                {d.activities.length > 1 && (
                  <button className="ghost quiet"
                    onClick={() => set("activities", d.activities.filter((_,j)=>j!==i))}>Remove</button>
                )}
              </div>
            </div>
          ))}
          <button className="ghost" onClick={() => set("activities", [...d.activities, {...EMPTY_ACTIVITY}])}>
            + Add activity
          </button>
        </section>
      )}

      {step === 2 && (
        <section className="panel">
          <p className="lede small">
            Level is what a reader uses to place an award. &ldquo;Basis&rdquo; is how it
            was decided — a test score, a portfolio, a panel — because
            test-derived honors carry less weight at a school where scores are
            already high.
          </p>
          {d.honors.map((h, i) => (
            <div className="rowcard" key={i}>
              <div className="grid3">
                <input placeholder="Award title" value={h.title}
                  onChange={(e) => { const n=[...d.honors]; n[i]={...h,title:e.target.value}; set("honors",n); }} />
                <select value={h.level}
                  onChange={(e) => { const n=[...d.honors]; n[i]={...h,level:e.target.value as never}; set("honors",n); }}>
                  <option value="">Level…</option>
                  <option value="school">school</option>
                  <option value="regional">regional</option>
                  <option value="state">state</option>
                  <option value="national">national</option>
                  <option value="international">international</option>
                </select>
                <input placeholder="Grade received" value={h.grade}
                  onChange={(e) => { const n=[...d.honors]; n[i]={...h,grade:e.target.value}; set("honors",n); }} />
              </div>
              <input placeholder="How it was decided (test score, portfolio, panel, nomination…)"
                value={h.basis}
                onChange={(e) => { const n=[...d.honors]; n[i]={...h,basis:e.target.value}; set("honors",n); }} />
              {d.honors.length > 1 && (
                <div className="rowfoot">
                  <button className="ghost quiet"
                    onClick={() => set("honors", d.honors.filter((_,j)=>j!==i))}>Remove</button>
                </div>
              )}
            </div>
          ))}
          <button className="ghost" onClick={() => set("honors", [...d.honors, {...EMPTY_HONOR}])}>
            + Add honor
          </button>
        </section>
      )}

      {step === 3 && (
        <section className="panel">
          <p className="lede small">
            Letters are worth most when they add information rather than
            restating activities. What has each person actually watched you do?
          </p>
          {d.recommenders.map((r, i) => (
            <div className="rowcard" key={i}>
              <div className="grid2">
                <input placeholder="Name" value={r.name}
                  onChange={(e) => { const n=[...d.recommenders]; n[i]={...r,name:e.target.value}; set("recommenders",n); }} />
                <input placeholder="Role (subject teacher, counselor, mentor…)" value={r.role}
                  onChange={(e) => { const n=[...d.recommenders]; n[i]={...r,role:e.target.value}; set("recommenders",n); }} />
              </div>
              <div className="grid2">
                <input placeholder="Relationship and how long" value={r.relationship}
                  onChange={(e) => { const n=[...d.recommenders]; n[i]={...r,relationship:e.target.value}; set("recommenders",n); }} />
                <input placeholder="Course level taught" value={r.courseLevel}
                  onChange={(e) => { const n=[...d.recommenders]; n[i]={...r,courseLevel:e.target.value}; set("recommenders",n); }} />
              </div>
              <textarea rows={2} placeholder="What they would likely emphasise"
                value={r.likelyEmphasis}
                onChange={(e) => { const n=[...d.recommenders]; n[i]={...r,likelyEmphasis:e.target.value}; set("recommenders",n); }} />
              <textarea rows={2} placeholder="What it would corroborate elsewhere in the application"
                value={r.corroborates}
                onChange={(e) => { const n=[...d.recommenders]; n[i]={...r,corroborates:e.target.value}; set("recommenders",n); }} />
              {d.recommenders.length > 1 && (
                <div className="rowfoot">
                  <button className="ghost quiet"
                    onClick={() => set("recommenders", d.recommenders.filter((_,j)=>j!==i))}>Remove</button>
                </div>
              )}
            </div>
          ))}
          <button className="ghost" onClick={() => set("recommenders", [...d.recommenders, {...EMPTY_RECOMMENDER}])}>
            + Add recommender
          </button>
        </section>
      )}

      {step === 4 && (
        <section className="panel">
          <Field label="School list" k="schoolList" area
            hint="Where you are applying, and under which plan if decided." />
          <Field label="Circumstances relevant to how the record should be read" k="circumstances" area
            hint="Context that changes what the record means. What you did within the constraint is the evaluable part, not the constraint itself." />
          <Field label="Anything else" k="other" area />
        </section>
      )}

      {step === 5 && (
        <section className="panel">
          <p className="lede small">
            {docs.length === 0
              ? "Nothing filled in yet — go back and add something."
              : `${docs.length} document${docs.length === 1 ? "" : "s"} will be saved to your file. ` +
                "Re-running the intake revises these by title rather than adding duplicates."}
          </p>
          {docs.map((doc) => (
            <details className="revdoc" key={doc.title}>
              <summary>
                {doc.title} <em>{doc.classification}</em>
              </summary>
              <pre>{doc.body}</pre>
            </details>
          ))}
          {error && <div className="note err">{error}</div>}
          <div className="modal-actions" style={{ marginTop: 18 }}>
            <button className="send" disabled={busy || docs.length === 0} onClick={() => void submit()}>
              {busy ? "Saving…" : `Save ${docs.length} document${docs.length === 1 ? "" : "s"}`}
            </button>
          </div>
        </section>
      )}

      <div className="wizfoot">
        <button className="ghost" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
          Back
        </button>
        <button className="ghost" disabled={step === STEPS.length - 1} onClick={() => setStep((s) => s + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}
