import type Anthropic from "@anthropic-ai/sdk";

/** Classification set at upload. Mirrors master-prompt.md §1. */
export type Classification =
  | "current"
  | "historical"
  | "prospective"
  | "private";

export const CLASSIFICATIONS: Classification[] = [
  "current",
  "historical",
  "prospective",
  "private",
];

export type Corpus = "library" | "morganton" | "school-fit" | "student";

export interface LoadedDoc {
  /** Title as the master prompt names it (TASKS.md B4 / MANIFEST). */
  title: string;
  /** Which body of material this belongs to. */
  corpus: Corpus;
  /** Path relative to the repo root, for the context panel only. */
  path: string;
  text: string;
  /** Student documents only. Undefined means unclassified — the prompt tells
   *  Kapp to ask before relying on it, so we surface it rather than guess. */
  classification?: Classification;
  chars: number;
}

/** What the context panel shows, and what /api/context returns. */
export interface ContextStatus {
  systemPromptChars: number;
  docs: LoadedDoc[];
  student: string | null;
  /** Non-fatal problems: missing corpus dirs, unclassified student docs. */
  warnings: string[];
  /** Fatal: the request should not be sent. */
  errors: string[];
}

export type UiRole = "user" | "assistant";

export interface Citation {
  citedText: string;
  documentTitle: string | null;
  documentIndex: number;
  startCharIndex?: number;
  endCharIndex?: number;
  startPageNumber?: number;
  endPageNumber?: number;
}

/** One text run in an assistant turn; cited runs carry their sources. */
export interface AssistantSegment {
  text: string;
  citations: Citation[];
}

export interface UiMessage {
  id: string;
  role: UiRole;
  /** User turns use plain text; assistant turns are segmented for citations. */
  text: string;
  segments?: AssistantSegment[];
  thinking?: string;
  usage?: {
    inputTokens: number;
    outputTokens: number;
    cacheReadTokens: number;
    cacheCreationTokens: number;
  };
  error?: string;
}

/**
 * A document dropped into the chat. `persist: false` means it is used for this
 * request only and is never written to the database — the user said "just for
 * now", so we do not quietly keep it.
 */
export interface Attachment {
  title: string;
  classification: Classification;
  body: string;
}

/** Wire format for /api/chat — history we replay to the model. */
export interface ChatTurn {
  role: UiRole;
  content: string;
}

export type ApiMessage = Anthropic.MessageParam;
