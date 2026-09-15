"use client";

import { useCallback, useEffect, useState } from "react";
import Nav from "@/components/Nav";
import { CLASSIFICATIONS, type Classification } from "@/lib/types";

interface DocRow {
  id: string;
  title: string;
  classification: Classification;
  body?: string;
  updated_at: string;
}

const HELP: Record<Classification, string> = {
  current: "The newest statement of fact. Wins on conflict.",
  historical: "An older snapshot. Never evidence of present ability or voice.",
  prospective: "Planned or in progress. Never described as done.",
  private: "Journals and brainstorms. Voice and interest only, never an application fact.",
};

export default function DocumentsPage() {
  const [docs, setDocs] = useState<DocRow[]>([]);
  const [title, setTitle] = useState("");
  const [classification, setClassification] = useState<Classification>("current");
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    const r = await fetch("/api/documents");
    const j = await r.json();
    if (j.documents) setDocs(j.documents);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const r = await fetch("/api/documents", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ title, classification, body }),
    });
    const j = await r.json();
    setBusy(false);
    if (j.error) {
      setError(j.error);
      return;
    }
    setTitle("");
    setBody("");
    await refresh();
  }

  async function remove(id: string) {
    await fetch(`/api/documents?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    await refresh();
  }

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setBody(await f.text());
    if (!title) setTitle(f.name.replace(/\.[^.]+$/, ""));
    e.target.value = "";
  }

  return (
    <div className="docs-page">
      <Nav />
      <h1>Your documents</h1>
      <p className="lede">
        Kapp reads only your file — never a classmate&rsquo;s. Every document
        carries a classification, because the prompt treats the four kinds as
        different evidence. Plain text or Markdown.
      </p>

      {docs.map((d) => (
        <div className="doc-row" key={d.id}>
          <span className="title">{d.title}</span>
          <span className={`tag ${d.classification}`}>{d.classification}</span>
          <span className="size">
            {new Date(d.updated_at).toISOString().slice(0, 10)}
          </span>
          <button title="Delete" onClick={() => void remove(d.id)}>
            ×
          </button>
        </div>
      ))}
      {docs.length === 0 && (
        <p className="lede" style={{ marginBottom: 0 }}>
          Nothing uploaded yet.
        </p>
      )}

      <form className="add" onSubmit={add}>
        <h2>Add a document</h2>
        <div className="row">
          <input
            type="text"
            placeholder="Title — e.g. Activities and Honors"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
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
        </div>
        <p className="lede" style={{ margin: "0 0 10px", fontSize: 12 }}>
          {HELP[classification]}
        </p>
        <textarea
          placeholder="Paste the document text…"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
        {error && <div className="note err">{error}</div>}
        <div className="actions">
          <button className="send" type="submit" disabled={busy}>
            {busy ? "Saving…" : "Add"}
          </button>
          <label className="file">
            or load a file{" "}
            <input type="file" accept=".md,.txt,.markdown" onChange={onFile} />
          </label>
        </div>
      </form>
    </div>
  );
}
