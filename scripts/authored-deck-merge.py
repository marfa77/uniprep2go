"""Point-rewrite an authored finance deck CSV (CFA-schema) from rewritten card chunks, keeping shipped note GUIDs.

Run with the Anki Generator venv (needs genanki):
  "../Anki Generator/.venv/bin/python" scripts/authored-deck-merge.py \
      --csv "../Anki Generator/internal_deck_generator/Finance/series7_300_authored.csv" \
      --apkg tmp/s7/OLD_Series_7_FULL_300.apkg --model-id 1607392801 \
      --chunks tmp/s7/deck_out_d1.json tmp/s7/deck_out_d2.json tmp/s7/deck_out_d3.json [--write]

Chunk format: [{"row": <0-based CSV row>, "term", "front", "back", "formula", "example", "mistake"}, ...]
Every row gets a "Note GUID" column = the GUID of its note in the shipped .apkg, so rewritten cards update in place
on re-import. The deck pipeline must honor that column (cfa / ptcb / frm / finra pipelines do).
"""
import argparse
import csv
import html
import json
import re
import shutil
import sqlite3
import sys
import tempfile
import zipfile
from collections import Counter
from datetime import date
from pathlib import Path

GEN = Path(__file__).resolve().parents[2] / "Anki Generator" / "internal_deck_generator"
sys.path.insert(0, str(GEN))
from py.cfa_deck_pipeline import _plain_text_field, build_back_html, load_cards  # noqa: E402
from genanki.util import guid_for  # noqa: E402

FIELDS = {"term": "Term", "front": "Front (Question)", "back": "Back (Answer)", "formula": "Formula (LaTeX)",
          "example": "Example", "mistake": "Common Mistake"}
DEFINITION = re.compile(r"(?i)^what (is|are) (a |an |the )?[\w\-' ]{1,40}\?$")


def shipped_guids(apkg: Path) -> set:
    with tempfile.TemporaryDirectory() as tmp, zipfile.ZipFile(apkg) as zf:
        name = "collection.anki21" if "collection.anki21" in zf.namelist() else "collection.anki2"
        zf.extract(name, tmp)
        con = sqlite3.connect(Path(tmp) / name)
        guids = {g for (g,) in con.execute("select guid from notes")}
        con.close()
    return guids


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--csv", type=Path, required=True)
    ap.add_argument("--apkg", type=Path, required=True, help="the .apkg buyers currently have")
    ap.add_argument("--model-id", type=int, required=True)
    ap.add_argument("--chunks", nargs="+", type=Path, required=True)
    ap.add_argument("--min-back", type=int, default=120)
    ap.add_argument("--write", action="store_true")
    args = ap.parse_args()

    with args.csv.open(newline="", encoding="utf-8") as fh:
        reader = csv.DictReader(fh)
        fieldnames = list(reader.fieldnames)
        rows = [r for r in reader if (r.get("Front (Question)") or "").strip() or (r.get("Back (Answer)") or "").strip()]
    old_cards = load_cards(args.csv)
    assert len(old_cards) == len(rows), "CSV rows and loaded cards differ"

    shipped = shipped_guids(args.apkg)
    problems = []
    unmatched = 0
    for row, card in zip(rows, old_cards):
        if (row.get("Note GUID") or "").strip():
            continue
        back = build_back_html(card)
        candidates = (guid_for(args.model_id, _plain_text_field(card["front"]), back),
                      guid_for(args.model_id, html.escape(card["front"].strip(), quote=True), back))
        row["Note GUID"] = next((g for g in candidates if g in shipped), "")
        unmatched += not row["Note GUID"]

    rewritten = set()
    for chunk in args.chunks:
        for card in json.loads(chunk.read_text(encoding="utf-8")):
            i = card["row"]
            if i in rewritten:
                problems.append(f"row {i} rewritten twice")
            rewritten.add(i)
            for key, col in FIELDS.items():
                rows[i][col] = (card.get(key) or "").strip()

    for i in sorted(rewritten):
        r = rows[i]
        if len(r["Back (Answer)"]) < args.min_back:
            problems.append(f"row {i}: back under {args.min_back}")
        if not r["Front (Question)"].endswith("?"):
            problems.append(f"row {i}: front is not a question")
    for col in ("Front (Question)", "Back (Answer)"):
        dups = [k for k, v in Counter(r[col].strip().lower() for r in rows).items() if v > 1]
        if dups:
            problems.append(f"duplicate {col}: {dups[:3]}")
    guids = [r["Note GUID"] for r in rows if r["Note GUID"]]
    if len(guids) != len(set(guids)):
        problems.append("duplicate Note GUIDs")

    n = len(rows)
    print(f"{n} cards · rewritten {len(rewritten)} · shipped GUIDs kept {n - unmatched}/{n} · "
          f"back<{args.min_back} {sum(len(r['Back (Answer)']) < args.min_back for r in rows)} · "
          f"bare definition fronts {sum(bool(DEFINITION.match(r['Front (Question)'])) for r in rows)} · "
          f"avg back {sum(len(r['Back (Answer)']) for r in rows) / n:.0f}")
    print("sections", dict(Counter(r["Section"] for r in rows)))
    for p in problems:
        print("PROBLEM:", p)
    if problems or not args.write:
        sys.exit(1 if problems else 0)

    backup = args.csv.with_name(f"{args.csv.stem}.bak-{date.today().isoformat()}.csv")
    if not backup.exists():
        shutil.copy2(args.csv, backup)
    if "Note GUID" not in fieldnames:
        fieldnames.append("Note GUID")
    with args.csv.open("w", newline="", encoding="utf-8") as fh:
        writer = csv.DictWriter(fh, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)
    print(f"wrote {args.csv} (backup {backup.name})")


if __name__ == "__main__":
    main()
