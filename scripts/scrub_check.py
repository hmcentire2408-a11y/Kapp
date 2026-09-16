#!/usr/bin/env python3
"""Denylist scan over corpus/ and evals/ (TASKS.md B3).

Exits non-zero on any hit, so it can gate a commit. Reads the terms from
.denylist.local, which is gitignored: the list itself names the source
student and must never reach this remote.
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DENYLIST = ROOT / ".denylist.local"
SCAN_DIRS = ["corpus", "evals"]

# Paths into the source repo's personal files. These are structural, not
# name-based, so they are checked even when .denylist.local is absent.
PATH_PATTERNS = [
    r"\bapplicant/",
    r"\bstate/",
    r"\bplanning/",
    r"\bSTATUS\.md\b",
    r"\bUPDATE-PROMPT\b",
    r"the applicant's",
    r"this applicant's",
]


def load_terms() -> list[str]:
    if not DENYLIST.exists():
        print(
            f"WARNING: {DENYLIST.name} not found. Running structural checks only.\n"
            "         Ask the user for the file; do not reconstruct it.",
            file=sys.stderr,
        )
        return []
    terms = []
    for line in DENYLIST.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if line and not line.startswith("#"):
            terms.append(line)
    return terms


def scan() -> int:
    terms = load_terms()
    patterns = [(t, re.compile(re.escape(t), re.I)) for t in terms]
    patterns += [(p, re.compile(p, re.I)) for p in PATH_PATTERNS]

    files = [
        f
        for d in SCAN_DIRS
        for f in sorted((ROOT / d).rglob("*"))
        if f.is_file() and f.suffix in {".md", ".txt"}
    ]
    if not files:
        print("No files to scan (corpus/ and evals/ are empty).")
        return 0

    hits = 0
    for f in files:
        rel = f.relative_to(ROOT)
        for n, line in enumerate(f.read_text(encoding="utf-8").splitlines(), 1):
            for label, rx in patterns:
                if rx.search(line):
                    hits += 1
                    excerpt = line.strip()[:110]
                    print(f"{rel}:{n}: [{label}] {excerpt}")

    print(f"\nScanned {len(files)} file(s) against {len(patterns)} pattern(s).")
    if hits:
        print(f"FAIL — {hits} hit(s).")
        return 1
    print("PASS — no hits.")
    return 0


if __name__ == "__main__":
    sys.exit(scan())
