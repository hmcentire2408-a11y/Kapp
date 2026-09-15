"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ContextPanel, { type ContextInfo } from "./ContextPanel";
import type { AssistantSegment, ChatTurn, Citation, UiMessage } from "@/lib/types";

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

/** Render one assistant turn: text runs, with a superscript per citation. */
function Answer({ segments }: { segments: AssistantSegment[] }) {
  const sources: { n: number; c: Citation }[] = [];
  let counter = 0;

  const body = segments.map((seg, i) => {
    const marks = seg.citations.map((c) => {
      counter += 1;
      sources.push({ n: counter, c });
      return counter;
    });
    return (
      <span key={i}>
        {seg.text}
        {marks.map((n) => (
          <sup
            className="cite"
            key={n}
            title={sources.find((s) => s.n === n)?.c.citedText}
          >
            [{n}]
          </sup>
        ))}
      </span>
    );
  });

  return (
    <>
      <div className="bubble">{body}</div>
      {sources.length > 0 && (
        <div className="sources">
          <h3>Sources</h3>
          {sources.map(({ n, c }) => (
            <div className="src" key={n}>
              <span className="num">[{n}]</span>
              <span className="q">
                “{c.citedText}”
                <i>{c.documentTitle ?? `document ${c.documentIndex}`}</i>
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default function Chat() {
  const [info, setInfo] = useState<ContextInfo | null>(null);
  const [messages, setMessages] = useState<UiMessage[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    fetch("/api/context")
      .then((r) => (r.status === 401 ? null : r.json()))
      .then((j) => {
        if (j === null) window.location.href = "/login";
        else setInfo(j);
      })
      .catch(() => setInfo(null));
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || busy) return;

    const history: ChatTurn[] = [
      ...messages
        .filter((m) => !m.error)
        .map((m) => ({ role: m.role, content: m.text })),
      { role: "user" as const, content: text },
    ];

    const userMsg: UiMessage = { id: uid(), role: "user", text };
    const botId = uid();
    const bot: UiMessage = {
      id: botId,
      role: "assistant",
      text: "",
      segments: [],
      thinking: "",
    };
    setMessages((m) => [...m, userMsg, bot]);
    setInput("");
    setBusy(true);

    // Text blocks arrive interleaved by index; keep segments keyed by index.
    const segs = new Map<number, AssistantSegment>();
    const order: number[] = [];
    const flush = () => {
      const segments = order.map((i) => segs.get(i)!).filter(Boolean);
      setMessages((m) =>
        m.map((x) =>
          x.id === botId
            ? { ...x, segments, text: segments.map((s) => s.text).join("") }
            : x,
        ),
      );
    };

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ history }),
      });

      if (!res.ok || !res.body) {
        const msg = await res.json().catch(() => ({ error: res.statusText }));
        setMessages((m) =>
          m.map((x) => (x.id === botId ? { ...x, error: msg.error } : x)),
        );
        setBusy(false);
        return;
      }

      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let buf = "";

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";

        for (const raw of lines) {
          if (!raw.trim()) continue;
          const ev = JSON.parse(raw);

          if (ev.type === "segment_start") {
            if (!segs.has(ev.index)) {
              segs.set(ev.index, { text: "", citations: [] });
              order.push(ev.index);
            }
          } else if (ev.type === "text") {
            if (!segs.has(ev.index)) {
              segs.set(ev.index, { text: "", citations: [] });
              order.push(ev.index);
            }
            segs.get(ev.index)!.text += ev.text;
            flush();
          } else if (ev.type === "citation") {
            segs.get(ev.index)?.citations.push(ev.citation);
            flush();
          } else if (ev.type === "thinking") {
            setMessages((m) =>
              m.map((x) =>
                x.id === botId ? { ...x, thinking: (x.thinking ?? "") + ev.text } : x,
              ),
            );
          } else if (ev.type === "usage") {
            setMessages((m) =>
              m.map((x) => (x.id === botId ? { ...x, usage: ev.usage } : x)),
            );
          } else if (ev.type === "error") {
            setMessages((m) =>
              m.map((x) => (x.id === botId ? { ...x, error: ev.message } : x)),
            );
          }
        }
      }
    } catch (err) {
      setMessages((m) =>
        m.map((x) =>
          x.id === botId ? { ...x, error: (err as Error).message } : x,
        ),
      );
    } finally {
      setBusy(false);
      taRef.current?.focus();
    }
  }, [input, busy, messages]);

  const blocked = (info?.errors.length ?? 0) > 0;

  return (
    <div className="shell">
      <ContextPanel info={info} />
      <main className="main">
        <div className="scroll" ref={scrollRef}>
          <div className="thread">
            {messages.length === 0 && (
              <div className="empty">
                {blocked ? (
                  <>Fix the errors in the left panel before asking anything.</>
                ) : (
                  <>
                    Ask about one component and get an answer about that
                    component. A full review happens only when you ask for one.
                    <br />
                    <br />
                    Your documents live under <code>Documents</code>. Kapp only
                    ever loads your file — never a classmate&rsquo;s.
                  </>
                )}
              </div>
            )}

            {messages.map((m) => (
              <div className={`turn ${m.role}`} key={m.id}>
                <div className="who">{m.role === "user" ? "You" : "Kapp"}</div>

                {m.thinking && m.thinking.trim() !== "" && (
                  <details className="think">
                    <summary>reasoning</summary>
                    <div className="body">{m.thinking}</div>
                  </details>
                )}

                {m.error ? (
                  <div className="err-box">{m.error}</div>
                ) : m.role === "assistant" ? (
                  m.segments && m.segments.length > 0 ? (
                    <Answer segments={m.segments} />
                  ) : (
                    <div className="bubble" style={{ color: "var(--ink-faint)" }}>
                      {busy ? "…" : ""}
                    </div>
                  )
                ) : (
                  <div className="bubble">{m.text}</div>
                )}

                {m.usage && (
                  <div className="usage">
                    in {m.usage.inputTokens} · out {m.usage.outputTokens} · cache
                    read {m.usage.cacheReadTokens} · cache write{" "}
                    {m.usage.cacheCreationTokens}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="composer">
          <div className="inner">
            <textarea
              ref={taRef}
              rows={2}
              value={input}
              placeholder={
                blocked ? "Blocked — see the left panel" : "Ask Kapp…"
              }
              disabled={blocked}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                  e.preventDefault();
                  void send();
                }
              }}
            />
            <button
              className="send"
              onClick={() => void send()}
              disabled={busy || blocked || !input.trim()}
            >
              {busy ? "…" : "Send"}
            </button>
          </div>
          <div className="hint">⌘↵ to send · one student per session</div>
        </div>
      </main>
    </div>
  );
}
