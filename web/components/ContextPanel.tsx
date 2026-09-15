"use client";

import Nav from "./Nav";
import type { ContextStatus, LoadedDoc } from "@/lib/types";

export interface ContextInfo extends ContextStatus {
  email: string | null;
  model: string;
  effort: string;
  webSearch: boolean;
  hasApiKey: boolean;
}

function Group({ label, docs }: { label: string; docs: LoadedDoc[] }) {
  if (docs.length === 0) return null;
  return (
    <>
      <h2>
        {label} · {docs.length}
      </h2>
      {docs.map((d) => (
        <div className="doc" key={d.path} title={d.path}>
          <span className="t">
            {d.title}
            {d.corpus === "student" && (
              <span className={`tag ${d.classification ?? "none"}`}>
                {d.classification ?? "unclassified"}
              </span>
            )}
          </span>
          <span className="n">{(d.chars / 1000).toFixed(1)}k</span>
        </div>
      ))}
    </>
  );
}

export default function ContextPanel({ info }: { info: ContextInfo | null }) {
  if (!info) {
    return (
      <aside className="rail">
        <Nav />
        <h1>Kapp</h1>
        <div className="sub">loading context…</div>
      </aside>
    );
  }

  const by = (c: LoadedDoc["corpus"]) => info.docs.filter((d) => d.corpus === c);
  const totalChars = info.docs.reduce((n, d) => n + d.chars, 0);

  return (
    <aside className="rail">
      <Nav />
      <h1>Kapp</h1>
      <div className="sub">{info.email ?? info.student}</div>

      {info.errors.map((e, i) => (
        <div className="note err" key={i}>
          {e}
        </div>
      ))}
      {info.warnings.map((w, i) => (
        <div className="note warn" key={i}>
          {w}
        </div>
      ))}

      <Group label="Library" docs={by("library")} />
      <Group label="Morganton" docs={by("morganton")} />
      <Group label="School fit" docs={by("school-fit")} />
      <Group label="Student" docs={by("student")} />

      <h2>Request</h2>
      <div className="meta">
        <div>
          <b>model</b> {info.model}
        </div>
        <div>
          <b>effort</b> {info.effort}
        </div>
        <div>
          <b>thinking</b> adaptive
        </div>
        <div>
          <b>web search</b> {info.webSearch ? "on (policy facts only)" : "off"}
        </div>
        <div>
          <b>citations</b> enabled
        </div>
        <div>
          <b>context</b> ~{Math.round(totalChars / 4 / 1000)}k tok ·{" "}
          {info.docs.length} docs
        </div>
      </div>
    </aside>
  );
}
