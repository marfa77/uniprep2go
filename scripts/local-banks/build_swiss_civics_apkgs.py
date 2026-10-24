#!/usr/bin/env python3
"""Build DE/FR/IT Swiss civics .apkg from enriched source.csv (Te onthouden-style)."""

from __future__ import annotations

import argparse
import csv
import html
from datetime import datetime
from pathlib import Path

import genanki

VAULT = Path("/Users/pavelveselov/Projects/Anki Generator/out")
SPECS = {
    "de": {
        "folder": "prep2go_Einburgerung_Schweiz",
        "base": "prep2go_Einburgerung_Schweiz_FULL",
        "deck": "prep2go · Einbürgerung Schweiz",
        "key": "Merken",
        "model_id": 1829400701,
        "deck_id": 2059400400,
        "guid": "einburgerung-schweiz",
    },
    "fr": {
        "folder": "prep2go_Naturalisation_Suisse",
        "base": "prep2go_Naturalisation_Suisse_FULL",
        "deck": "prep2go · Naturalisation suisse",
        "key": "À retenir",
        "model_id": 1829400702,
        "deck_id": 2059400401,
        "guid": "naturalisation-suisse",
    },
    "it": {
        "folder": "prep2go_Naturalizzazione_Svizzera",
        "base": "prep2go_Naturalizzazione_Svizzera_FULL",
        "deck": "prep2go · Naturalizzazione svizzera",
        "key": "Da ricordare",
        "model_id": 1829400703,
        "deck_id": 2059400402,
        "guid": "naturalizzazione-svizzera",
    },
}

CSS = """
.card { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  font-size: 17px; color: #1f2937; background: #f3f5f9; padding: 14px; text-align: left; }
.ch { max-width: 640px; margin: 0 auto; }
.ch-q { background: #fff; border-radius: 12px; padding: 18px 20px; box-shadow: 0 2px 8px rgba(15,23,42,.08);
  font-size: 22px; font-weight: 650; line-height: 1.35; }
.ch-a { margin-top: 14px; background: #ecfdf3; border: 1px solid #bbf7d0; border-radius: 12px;
  padding: 14px 18px; font-size: 19px; font-weight: 650; color: #166534; line-height: 1.4; }
.ch-x { margin-top: 10px; background: #fff; border-left: 4px solid #dc2626; border-radius: 10px;
  padding: 12px 16px; font-size: 15px; line-height: 1.5; color: #374151; }
.ch-x b { display: block; font-size: 12px; text-transform: uppercase; letter-spacing: .06em; color: #b91c1c; margin-bottom: 4px; }
.nightMode .card, .night_mode .card { background: #111827; color: #e5e7eb; }
.nightMode .ch-q, .night_mode .ch-q, .nightMode .ch-x, .night_mode .ch-x { background: #1f2937; color: #e5e7eb; }
.nightMode .ch-a, .night_mode .ch-a { background: #052e16; color: #bbf7d0; border-color: #14532d; }
"""


def build_one(lang: str, stamp: str) -> Path:
    spec = SPECS[lang]
    folder = VAULT / spec["folder"]
    csv_path = folder / "source.csv"
    rows = list(csv.DictReader(csv_path.open(encoding="utf-8")))
    model = genanki.Model(
        spec["model_id"],
        f"Swiss Civics {lang.upper()}",
        fields=[
            {"name": "Front"},
            {"name": "Image"},
            {"name": "Audio"},
            {"name": "Back"},
            {"name": "ExamplesBlock"},
            {"name": "FrequencyBlock"},
        ],
        templates=[
            {
                "name": "Card 1",
                "qfmt": '<div class="ch"><div class="ch-q">{{Front}}</div></div>',
                "afmt": (
                    '<div class="ch"><div class="ch-q">{{Front}}</div>'
                    '<div class="ch-a">{{Back}}</div>'
                    '{{#ExamplesBlock}}<div class="ch-x"><b>'
                    + html.escape(spec["key"])
                    + "</b>{{ExamplesBlock}}</div>{{/ExamplesBlock}}</div>"
                ),
            }
        ],
        css=CSS,
    )
    deck = genanki.Deck(spec["deck_id"], spec["deck"])
    for r in rows:
        front = (r.get("front") or "").strip()
        if not front:
            continue
        deck.add_note(
            genanki.Note(
                model=model,
                fields=[
                    html.escape(front),
                    "",
                    "",
                    html.escape((r.get("back") or "").strip()),
                    html.escape((r.get("example") or "").strip()),
                    "",
                ],
                tags=["swiss_civics", lang],
                guid=genanki.guid_for(spec["guid"], front),
            )
        )
    out = folder / f"{spec['base']}_{stamp}.apkg"
    genanki.Package(deck).write_to_file(str(out))
    pointer = folder / f"{spec['base']}.apkg"
    pointer.write_bytes(out.read_bytes())
    vault = VAULT / "anki-decks" / out.name
    vault.parent.mkdir(parents=True, exist_ok=True)
    vault.write_bytes(out.read_bytes())
    print(f"{lang}: {len(rows)} → {out.name}")
    return out


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--lang", choices=["de", "fr", "it", "all"], default="all")
    args = ap.parse_args()
    stamp = datetime.now().strftime("%y%m%d-%H%M")
    langs = ["de", "fr", "it"] if args.lang == "all" else [args.lang]
    for lang in langs:
        build_one(lang, stamp)


if __name__ == "__main__":
    main()
