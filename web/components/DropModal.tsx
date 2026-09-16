"use client";

import { useEffect, useState } from "react";
import { CLASSIFICATIONS, type Attachment, type Classification } from "@/lib/types";

export interface PendingDrop {
  name: string;
  body: string;
}

const HELP: Record<Classification, string> = {
  current: "The newest statement of fact. Wins on conflict.",
  historical: "An older snapshot. Never evidence of present ability or voice.",
  prospective: "Planned or in progress. Never described as done.",
  private: "Journal or brainstorm. Voice and interest only, never an application fact.",
};

export default function DropModal({
  drop,
  onCancel,
  onAttach,
}: {
  drop: PendingDrop;
  onCancel: () => void;
  onAttach: (a: Attachment, persist: boolean) => void;
}) {
  const [title, setTitle] = useState(drop.name.replace(/\.[^.]+$/, ""));
  const [classification, setClassification] = useState<Classification>("current");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onCancel();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onCancel]);

  const words = drop.body.trim().split(/\s+/).length;

  function go(persist: boolean) {
    setBusy(true);
    onAttach({ title: title.trim() || drop.name, classification, body: drop.body }, persist);
  }

  return (
    <div className="modal-back" onMouseDown={onCancel}>
      <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        <h2>Add “{drop.name}”</h2>
        <p className="modal-sub">
          {words.toLocaleString()} words · {(drop.body.length / 1000).toFixed(1)}k characters
        </p>

        <label className="fld">
          Title
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>

        <label className="fld">
          Classification
          <select
            value={classification}
            onChange={(e) => setClassification(e.target.value as Classification)}
          >
            {CLASSIFICATIONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <p className="modal-help">{HELP[classification]}</p>

        <pre className="preview">{drop.body.slice(0, 600)}
{drop.body.length > 600 ? "\n…" : ""}</pre>

        <div className="modal-actions">
          <button className="send" disabled={busy} onClick={() => go(true)}>
            Save to my documents
          </button>
          <button className="ghost" disabled={busy} onClick={() => go(false)}>
            Just this conversation
          </button>
          <button className="ghost quiet" disabled={busy} onClick={onCancel}>
            Cancel
          </button>
        </div>
        <p className="modal-fine">
          <b>Save</b> keeps it in your file — it loads into every future
          conversation. <b>Just this conversation</b> sends it with your next
          message and never writes it to the database.
        </p>
      </div>
    </div>
  );
}
