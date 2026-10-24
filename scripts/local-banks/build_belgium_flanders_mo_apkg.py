#!/usr/bin/env python3
"""Build Flanders MO .apkg from enriched source.csv (front/back/example).

Keeps Prep2Go Vocabulary field order so existing buyers' note GUIDs stay stable
when fronts are unchanged (genanki guid_for on front).

  /usr/bin/python3 scripts/local-banks/build_belgium_flanders_mo_apkg.py
"""

from __future__ import annotations

import argparse
import csv
import html
from datetime import datetime
from pathlib import Path

import genanki

VAULT = Path("/Users/pavelveselov/Projects/Anki Generator/out/prep2go_Belgium_Flanders_MO")
BASE_NAME = "prep2go_Belgium_Flanders_MO_FULL"
DECK_NAME = "prep2go · Belgium Flanders MO"
MODEL_ID = 1829400601
DECK_ID = 2059400300

CSS = """
.card { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  font-size: 17px; color: #1f2937; background: #f3f5f9; padding: 14px; text-align: left; }
.mo { max-width: 640px; margin: 0 auto; }
.mo-q { background: #fff; border-radius: 12px; padding: 18px 20px; box-shadow: 0 2px 8px rgba(15,23,42,.08);
  font-size: 22px; font-weight: 650; line-height: 1.35; }
.mo-a { margin-top: 14px; background: #ecfdf3; border: 1px solid #bbf7d0; border-radius: 12px;
  padding: 14px 18px; font-size: 19px; font-weight: 650; color: #166534; line-height: 1.4; }
.mo-x { margin-top: 10px; background: #fff; border-left: 4px solid #2563eb; border-radius: 10px;
  padding: 12px 16px; font-size: 15px; line-height: 1.5; color: #374151; }
.mo-x b { display: block; font-size: 12px; text-transform: uppercase; letter-spacing: .06em; color: #1d4ed8; margin-bottom: 4px; }
.nightMode .card, .night_mode .card { background: #111827; color: #e5e7eb; }
.nightMode .mo-q, .night_mode .mo-q, .nightMode .mo-x, .night_mode .mo-x { background: #1f2937; color: #e5e7eb; }
.nightMode .mo-a, .night_mode .mo-a { background: #052e16; color: #bbf7d0; border-color: #14532d; }
"""

FRONT = """<div class="mo"><div class="mo-q">{{Front}}</div></div>"""
BACK = """<div class="mo">
<div class="mo-q">{{Front}}</div>
<div class="mo-a">{{Back}}</div>
{{#ExamplesBlock}}<div class="mo-x"><b>Te onthouden</b>{{ExamplesBlock}}</div>{{/ExamplesBlock}}
</div>"""


def build_model() -> genanki.Model:
    # Field order matches Prep2Go Vocabulary so older imports map cleanly.
    return genanki.Model(
        MODEL_ID,
        "Flanders MO Civics",
        fields=[
            {"name": "Front"},
            {"name": "Image"},
            {"name": "Audio"},
            {"name": "Back"},
            {"name": "ExamplesBlock"},
            {"name": "FrequencyBlock"},
        ],
        templates=[{"name": "Card 1", "qfmt": FRONT, "afmt": BACK}],
        css=CSS,
    )


def load_rows(csv_path: Path) -> list[dict[str, str]]:
    with csv_path.open(encoding="utf-8") as f:
        return list(csv.DictReader(f))


def build(csv_path: Path, out_dir: Path, stamp: str) -> Path:
    model = build_model()
    deck = genanki.Deck(DECK_ID, DECK_NAME)
    rows = load_rows(csv_path)
    for r in rows:
        front = (r.get("front") or "").strip()
        back = (r.get("back") or "").strip()
        example = (r.get("example") or "").strip()
        if not front:
            continue
        deck.add_note(
            genanki.Note(
                model=model,
                fields=[
                    html.escape(front),
                    "",
                    "",
                    html.escape(back),
                    html.escape(example),
                    "",
                ],
                tags=["flanders_mo", "civics"],
                guid=genanki.guid_for("belgium-flanders-mo", front),
            )
        )
    out = out_dir / f"{BASE_NAME}_{stamp}.apkg"
    out_dir.mkdir(parents=True, exist_ok=True)
    genanki.Package(deck).write_to_file(str(out))
    # also refresh unstamped pointer
    pointer = out_dir / f"{BASE_NAME}.apkg"
    pointer.write_bytes(out.read_bytes())
    print(f"{len(rows)} cards → {out}")
    return out


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--csv", default=str(VAULT / "source.csv"))
    ap.add_argument("--out-dir", default=str(VAULT))
    args = ap.parse_args()
    stamp = datetime.now().strftime("%y%m%d-%H%M")
    build(Path(args.csv), Path(args.out_dir), stamp)


if __name__ == "__main__":
    main()
