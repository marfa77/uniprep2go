#!/usr/bin/env python3
"""Build Finland kansalaisuuskoe .apkg from the live mock bank JSON (120 MCQs).

Outputs:
  {ANKI_GENERATOR_ROOT}/out/wave/Finland_Kansalaisuuskoe_FULL_120.apkg  (wave gate / Gumroad wave)
  {ANKI_GENERATOR_ROOT}/out/prep2go_Finland_Kansalaisuuskoe/prep2go_Finland_Kansalaisuuskoe_FULL_{stamp}.apkg  (civic Gumroad)

  ANKI_GENERATOR_ROOT defaults to repo root when unset.

  python3 scripts/local-banks/build_finland_kansalaisuuskoe_apkg.py
"""

from __future__ import annotations

import html
import json
import os
from datetime import datetime
from pathlib import Path

import genanki

REPO = Path(__file__).resolve().parents[2]
ANKI_ROOT = Path(os.environ.get("ANKI_GENERATOR_ROOT", str(REPO)))
BANK_PATH = REPO / "src/data/mock-exams/finland-kansalaisuuskoe-readiness-check.json"

DECK_NAME = "UniPrep2Go · Finland Kansalaisuuskoe"
MODEL_ID = 1937801201
DECK_ID = 1937801202

TOPIC_TAGS = {
    "state-democracy": "valtio_ja_demokratia",
    "history-geo-eu": "historia_eu",
    "rights-society": "oikeudet",
    "services-extras": "palvelut",
}

CSS = """
.card { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  font-size: 17px; color: #1f2937; background: #f3f5f9; padding: 14px; text-align: left; }
.fi { max-width: 640px; margin: 0 auto; }
.fi-q { background: #fff; border-radius: 12px; padding: 18px 20px; box-shadow: 0 2px 8px rgba(15,23,42,.08);
  font-size: 20px; font-weight: 650; line-height: 1.4; }
.fi-a { margin-top: 14px; background: #ecfdf3; border: 1px solid #bbf7d0; border-radius: 12px;
  padding: 14px 18px; font-size: 18px; font-weight: 650; color: #166534; line-height: 1.4; }
.fi-x { margin-top: 10px; background: #fff; border-left: 4px solid #2563eb; border-radius: 10px;
  padding: 12px 16px; font-size: 15px; line-height: 1.5; color: #374151; }
.nightMode .card, .night_mode .card { background: #111827; color: #e5e7eb; }
.nightMode .fi-q, .night_mode .fi-q, .nightMode .fi-x, .night_mode .fi-x { background: #1f2937; color: #e5e7eb; }
.nightMode .fi-a, .night_mode .fi-a { background: #052e16; color: #bbf7d0; border-color: #14532d; }
"""

FRONT = """<div class="fi"><div class="fi-q">{{Front}}</div></div>"""
BACK = """<div class="fi">
<div class="fi-q">{{Front}}</div>
<div class="fi-a">{{Back}}</div>
{{#Explain}}<div class="fi-x">{{Explain}}</div>{{/Explain}}
</div>"""


def build_model() -> genanki.Model:
    return genanki.Model(
        MODEL_ID,
        "Finland Kansalaisuuskoe MCQ",
        fields=[{"name": "Front"}, {"name": "Back"}, {"name": "Explain"}],
        templates=[{"name": "Card 1", "qfmt": FRONT, "afmt": BACK}],
        css=CSS,
    )


def main() -> None:
    bank = json.loads(BANK_PATH.read_text(encoding="utf-8"))
    model = build_model()
    deck = genanki.Deck(DECK_ID, DECK_NAME)

    for item in bank:
        prompt = (item.get("prompt") or "").strip()
        if not prompt:
            continue
        correct_id = item.get("correctOptionId")
        options = item.get("options") or []
        correct_text = next(
            (o.get("text", "") for o in options if o.get("id") == correct_id),
            "",
        )
        if not correct_text:
            continue
        explanation = (item.get("explanation") or "").strip()
        topic = item.get("topicId") or "general"
        tags = ["finland_kansalaisuuskoe", "civics", TOPIC_TAGS.get(topic, topic)]
        deck.add_note(
            genanki.Note(
                model=model,
                fields=[
                    html.escape(prompt),
                    html.escape(correct_text),
                    html.escape(explanation),
                ],
                tags=tags,
                guid=genanki.guid_for("finland-kansalaisuuskoe", item.get("id", prompt)),
            )
        )

    count = len(deck.notes)
    if count != 120:
        raise SystemExit(f"Expected 120 cards, got {count}")

    wave_dir = ANKI_ROOT / "out" / "wave"
    wave_dir.mkdir(parents=True, exist_ok=True)
    wave_path = wave_dir / "Finland_Kansalaisuuskoe_FULL_120.apkg"
    genanki.Package(deck).write_to_file(str(wave_path))
    print(f"{count} cards → {wave_path}")

    civic_dir = ANKI_ROOT / "out" / "prep2go_Finland_Kansalaisuuskoe"
    civic_dir.mkdir(parents=True, exist_ok=True)
    stamp = datetime.now().strftime("%y%m%d-%H%M")
    civic_stamped = civic_dir / f"prep2go_Finland_Kansalaisuuskoe_FULL_{stamp}.apkg"
    genanki.Package(deck).write_to_file(str(civic_stamped))
    civic_pointer = civic_dir / "prep2go_Finland_Kansalaisuuskoe_FULL.apkg"
    civic_pointer.write_bytes(civic_stamped.read_bytes())
    print(f"{count} cards → {civic_stamped}")


if __name__ == "__main__":
    main()
