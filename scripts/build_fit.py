#!/usr/bin/env python3
"""Build the school-fit outputs from data/school-fit/schools.json.

Two outputs, same content, different readers:
  school-fit.md    the document loaded into Kapp's context
  school-fit.xlsx  one row per school, for a human scanning the table

Status values carried through to both outputs, because a quote's provenance is
part of the evidence:
  verbatim          checked character-for-character against the fetched page
  verbatim-excerpt  verbatim sentences joined with an ellipsis
  quoted-unchecked  quoted through a fetch tool, not byte-checked
  compiler-note     our words, assembled from the school's material
  unverified        not found on a primary page; empty on purpose

Usage: python3 scripts/build_fit.py
Requires openpyxl for the spreadsheet; writes the .md regardless.
"""
import json
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "data", "school-fit")
SRC = os.path.join(DATA, "schools.json")

FIELDS = [
    ("mission", "Mission"),
    ("values", "Values"),
    ("motto", "Motto / founding principle"),
    ("who_are_their_people", "Who are their people?"),
    ("admissions_look_for", "What the admissions office says it looks for"),
]


def load():
    with open(SRC, encoding="utf-8") as fh:
        return json.load(fh)


def write_md(rows):
    out = [
        "# School Fit — mission, values, and admissions language",
        "",
        "Every quotation below is the school's own published wording, retrieved from the",
        "URL given beneath it. Nothing here is paraphrased into a claim the school did not",
        "make, and fields that could not be verified are left empty rather than filled.",
        "",
        "**How to weigh these.** The admissions-office field is the strongest evidence of",
        "what a school rewards in an application: it is written by the people who read",
        "files. Mission and values statements are institutional self-description, useful",
        "for what a school says it is, weaker as evidence of how it selects. A claim that a",
        "student fits a school must quote one of these passages and point to evidence in",
        "the student's own file.",
        "",
        "**Status tags.** `verbatim` = checked against the page character for character;",
        "`verbatim-excerpt` = verbatim sentences joined with an ellipsis; `quoted-unchecked`",
        "= quoted through a fetch tool, not byte-checked; `compiler-note` = our words, not",
        "the school's; `unverified` = not confirmed on a primary page.",
        "",
        "Re-verify any field before acting on it; institutional pages change.",
        "",
    ]
    for r in rows:
        out.append(f"## {r['school']}")
        out.append("")
        out.append(f"_Verified {r.get('verified_on', '')}_")
        out.append("")
        for key, label in FIELDS:
            text = (r.get(key) or "").strip()
            status = r.get(f"{key}_status", "unverified")
            source = r.get(f"{key}_source", "")
            if not text:
                out.append(f"**{label}:** _not verified_" + (f" (checked {source})" if source else ""))
                out.append("")
                continue
            out.append(f"**{label}** [{status}]")
            out.append("")
            out.append(f"> {text}")
            out.append("")
            out.append(f"Source: {source}")
            out.append("")
        if r.get("notes"):
            out.append(f"**Notes.** {r['notes']}")
            out.append("")
    path = os.path.join(DATA, "school-fit.md")
    with open(path, "w", encoding="utf-8") as fh:
        fh.write("\n".join(out))
    return path


def write_xlsx(rows):
    try:
        from openpyxl import Workbook
        from openpyxl.styles import Alignment, Font
        from openpyxl.utils import get_column_letter
    except ImportError:
        return None
    wb = Workbook()
    ws = wb.active
    ws.title = "School fit"
    headers = ["School"]
    for _, label in FIELDS:
        headers += [label, "status", "source"]
    headers += ["verified_on", "notes"]
    ws.append(headers)
    for cell in ws[1]:
        cell.font = Font(bold=True)
        cell.alignment = Alignment(vertical="top")
    for r in rows:
        row = [r["school"]]
        for key, _ in FIELDS:
            row += [r.get(key, ""), r.get(f"{key}_status", ""), r.get(f"{key}_source", "")]
        row += [r.get("verified_on", ""), r.get("notes", "")]
        ws.append(row)
    widths = {1: 26}
    col = 2
    for _ in FIELDS:
        widths[col] = 70
        widths[col + 1] = 18
        widths[col + 2] = 44
        col += 3
    widths[col] = 13
    widths[col + 1] = 70
    for idx, width in widths.items():
        ws.column_dimensions[get_column_letter(idx)].width = width
    for row in ws.iter_rows(min_row=2):
        for cell in row:
            cell.alignment = Alignment(wrap_text=True, vertical="top")
    ws.freeze_panes = "B2"
    path = os.path.join(DATA, "school-fit.xlsx")
    wb.save(path)
    return path


if __name__ == "__main__":
    rows = load()
    print("wrote", write_md(rows))
    xlsx = write_xlsx(rows)
    print("wrote", xlsx) if xlsx else print("openpyxl not installed — .md written, .xlsx skipped")
    missing = [
        f"{r['school']}: {key}"
        for r in rows
        for key, _ in FIELDS
        if not (r.get(key) or "").strip()
    ]
    print(f"\n{len(rows)} schools, {len(missing)} unverified fields:")
    for m in missing:
        print("  -", m)
