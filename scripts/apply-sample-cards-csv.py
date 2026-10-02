"""Apply the 3 sample-card rewrites (cards.json from sample-cards-validate.py deck) to an authored deck CSV.

  python3 scripts/apply-sample-cards-csv.py <deck_work_dir> <shipped.apkg> [--write]

Rows are addressed like rewrite-chunk-prep.py (index among rows with a non-empty front). Every row whose
front matches exactly one note of the shipped .apkg gets that note's GUID in the "Note GUID" column, so
rewritten cards (and rows whose HTML escaping changed) update in place for buyers on re-import.
"""
import csv
import html
import json
import re
import shutil
import sqlite3
import sys
import tempfile
import zipfile
from collections import defaultdict
from pathlib import Path

FIELDS = {"front": "Front (Question)", "back": "Back (Answer)", "example": "Example",
          "mistake": "Common Mistake", "formula": "Formula (LaTeX)"}


def norm(text: str) -> str:
    return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", text))).strip().lower()


def shipped_guids(apkg: str) -> dict[str, list[str]]:
    with tempfile.TemporaryDirectory() as tmp:
        with zipfile.ZipFile(apkg) as zf:
            name = next(n for n in ("collection.anki21", "collection.anki2") if n in zf.namelist())
            zf.extract(name, tmp)
        con = sqlite3.connect(Path(tmp) / name)
        by_front = defaultdict(list)
        for guid, flds in con.execute("select guid, flds from notes"):
            by_front[norm(flds.split("\x1f")[0])].append(guid)
        con.close()
    return by_front


def main() -> None:
    work, apkg = Path(sys.argv[1]), sys.argv[2]
    write = "--write" in sys.argv
    csv_path = Path((work / "source_csv.txt").read_text().strip())
    cards = json.loads((work / "cards.json").read_text())
    chunk = {c["row"]: c for c in json.loads((work / "chunk.json").read_text())}

    with csv_path.open(newline="", encoding="utf-8") as fh:
        reader = csv.DictReader(fh)
        fieldnames = list(reader.fieldnames)
        rows = list(reader)
    if "Note GUID" not in fieldnames:
        fieldnames.append("Note GUID")
    data = [r for r in rows if (r.get("Front (Question)") or "").strip()]

    guids = shipped_guids(apkg)
    pinned = 0
    for r in data:
        hits = guids.get(norm(r["Front (Question)"]), [])
        if len(hits) == 1 and not (r.get("Note GUID") or "").strip():
            r["Note GUID"] = hits[0]
            pinned += 1

    for card in cards:
        row = data[card["row"]]
        orig = chunk[card["row"]]
        if row["Term"].strip() != orig["term"].strip() or row["Front (Question)"].strip() != orig["front"].strip():
            sys.exit(f"row {card['row']} no longer matches chunk.json ({row['Term']!r}) — re-run prep")
        if not (row.get("Note GUID") or "").strip():
            sys.exit(f"row {card['row']} ({row['Term']}) has no unique shipped note to pin its GUID")
        for key, column in FIELDS.items():
            if column in fieldnames:
                row[column] = (card.get(key) or "").strip()
        print(f"row {card['row']} [{row['Section']}] {row['Term']} → {row['Front (Question)']}")

    print(f"{csv_path.name}: {len(data)} rows · pinned GUIDs {pinned} · rewritten {len(cards)}")
    if not write:
        print("dry run — pass --write to save")
        return
    backup = csv_path.with_name(f"{csv_path.stem}.bak-2026-10-02-samples.csv")
    if not backup.exists():
        shutil.copy2(csv_path, backup)
    with csv_path.open("w", newline="", encoding="utf-8") as fh:
        writer = csv.DictWriter(fh, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)
    print(f"wrote {csv_path} (backup {backup.name})")


if __name__ == "__main__":
    main()
