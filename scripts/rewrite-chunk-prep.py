"""Split a mock bank and/or an authored deck CSV into chunks for parallel rewrite writers.

  python3 scripts/rewrite-chunk-prep.py bank <slug> <work_dir> --group ethics,ia --group comm,agent ...
      → <work_dir>/bank_<n>.json per group (current items of those topics, by id)
  python3 scripts/rewrite-chunk-prep.py deck <csv> <work_dir> --chunks 3 [--min-back 120]
      → <work_dir>/deck_d<n>.json (cards failing the standard, contiguous by section) + deck_all_cards.txt

Topic names in --group match the topicId suffix ("ethics" matches "s63-ethics").
Validate writer output with scripts/rewrite-chunk-validate.py.
"""
import argparse
import csv
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DEFINITION = re.compile(r"(?i)^what (is|are) (a |an |the )?[\w\-' ]{1,40}\?$")


def prep_bank(args):
    bank = json.loads((ROOT / "src/data/mock-exams" / f"{args.slug}.json").read_text())
    for n, group in enumerate(args.group, 1):
        topics = group.split(",")
        items = [q for q in bank if q["topicId"].split("-", 1)[-1] in topics or q["topicId"] in topics]
        out = args.work_dir / f"bank_{n}.json"
        out.write_text(json.dumps(items, indent=1, ensure_ascii=False))
        print(f"{out.name}: {len(items)} items ({group})")


def prep_deck(args):
    with args.csv.open(newline="", encoding="utf-8") as fh:
        rows = [r for r in csv.DictReader(fh) if (r.get("Front (Question)") or "").strip()]
    lines, failing = [], []
    for i, r in enumerate(rows):
        front, back = r["Front (Question)"].strip(), r["Back (Answer)"].strip()
        bad = len(back) < args.min_back or bool(DEFINITION.match(front)) or not front.endswith("?")
        lines.append(f"{i}\t{r['Section']}\t{'REWRITE' if bad else 'keep'}\t{front}")
        if bad:
            failing.append({"row": i, "section": r["Section"], "term": r["Term"], "front": front, "back": back,
                            "formula": r.get("Formula (LaTeX)", ""), "example": r.get("Example", ""),
                            "mistake": r.get("Common Mistake", "")})
    (args.work_dir / "deck_all_cards.txt").write_text("\n".join(lines) + "\n")
    size = -(-len(failing) // args.chunks)
    for n in range(args.chunks):
        part = failing[n * size:(n + 1) * size]
        (args.work_dir / f"deck_d{n + 1}.json").write_text(json.dumps(part, indent=1, ensure_ascii=False))
        sections = sorted({c["section"] for c in part})
        print(f"deck_d{n + 1}.json: {len(part)} cards {sections}")
    print(f"{len(failing)}/{len(rows)} cards fail the standard")


def main():
    ap = argparse.ArgumentParser()
    sub = ap.add_subparsers(dest="mode", required=True)
    b = sub.add_parser("bank")
    b.add_argument("slug")
    b.add_argument("work_dir", type=Path)
    b.add_argument("--group", action="append", required=True)
    d = sub.add_parser("deck")
    d.add_argument("csv", type=Path)
    d.add_argument("work_dir", type=Path)
    d.add_argument("--chunks", type=int, default=3)
    d.add_argument("--min-back", type=int, default=120)
    args = ap.parse_args()
    args.work_dir.mkdir(parents=True, exist_ok=True)
    prep_bank(args) if args.mode == "bank" else prep_deck(args)


if __name__ == "__main__":
    main()
