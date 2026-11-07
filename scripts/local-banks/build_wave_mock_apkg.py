#!/usr/bin/env python3
"""Build wave/building-style .apkg from a live mock bank JSON (MCQ → one card per item).

Uses wave-deck-specs.json for paths and counts.

  python3 scripts/local-banks/build_wave_mock_apkg.py --deck-slug ny-real-estate-anki-deck
  python3 scripts/local-banks/build_wave_mock_apkg.py --deck-slug enrolled-agent-anki-deck

Output: {ANKI_GENERATOR_ROOT}/out/wave/{filePrefix}_FULL_{cardCount}.apkg
"""

from __future__ import annotations

import argparse
import hashlib
import html
import json
import os
from pathlib import Path

import genanki

REPO = Path(__file__).resolve().parents[2]
ANKI_ROOT = Path(os.environ.get("ANKI_GENERATOR_ROOT", str(REPO)))
SPECS_PATH = REPO / "src/data/wave-deck-specs.json"


def stable_ids(slug: str) -> tuple[int, int]:
    h = hashlib.sha256(slug.encode()).hexdigest()
    model_id = int(h[:8], 16) & 0x7FFFFFFF
    deck_id = (int(h[8:16], 16) & 0x7FFFFFFF) | 1
    return model_id, deck_id


CSS = """
.card { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  font-size: 17px; color: #1f2937; background: #f3f5f9; padding: 14px; text-align: left; }
.up { max-width: 720px; margin: 0 auto; }
.up-q { background: #fff; border-radius: 12px; padding: 18px 20px; box-shadow: 0 2px 8px rgba(15,23,42,.08);
  font-size: 18px; font-weight: 650; line-height: 1.4; }
.up-a { margin-top: 14px; background: #ecfdf3; border: 1px solid #bbf7d0; border-radius: 12px;
  padding: 14px 18px; font-size: 17px; font-weight: 650; color: #166534; line-height: 1.4; }
.up-x { margin-top: 10px; background: #fff; border-left: 4px solid #2563eb; border-radius: 10px;
  padding: 12px 16px; font-size: 15px; line-height: 1.5; color: #374151; }
"""

FRONT = """<div class="up"><div class="up-q">{{Front}}</div></div>"""
BACK = """<div class="up">
<div class="up-q">{{Front}}</div>
<div class="up-a">{{Back}}</div>
{{#Explain}}<div class="up-x">{{Explain}}</div>{{/Explain}}
</div>"""


def build_model(model_id: int, label: str) -> genanki.Model:
    return genanki.Model(
        model_id,
        f"UniPrep2Go MCQ · {label}",
        fields=[{"name": "Front"}, {"name": "Back"}, {"name": "Explain"}],
        templates=[{"name": "Card 1", "qfmt": FRONT, "afmt": BACK}],
        css=CSS,
    )


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--deck-slug", required=True)
    args = parser.parse_args()

    specs = json.loads(SPECS_PATH.read_text(encoding="utf-8"))
    spec = specs.get(args.deck_slug)
    if not spec:
        raise SystemExit(f"Unknown deck slug: {args.deck_slug}")

    mock_slug = spec["mockSlug"]
    bank_path = REPO / f"src/data/mock-exams/{mock_slug}.json"
    bank = json.loads(bank_path.read_text(encoding="utf-8"))
    card_count = int(spec["cardCount"])
    if len(bank) < card_count:
        raise SystemExit(f"Bank {len(bank)} < spec cardCount {card_count}")

    model_id, deck_id = stable_ids(args.deck_slug)
    model = build_model(model_id, spec.get("deckLabel", args.deck_slug))
    deck = genanki.Deck(deck_id, f"UniPrep2Go · {spec.get('deckName', args.deck_slug)}")
    tag_prefix = spec.get("tagPrefix", "uniprep")

    use = bank[:card_count]
    for item in use:
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
        deck.add_note(
            genanki.Note(
                model=model,
                fields=[
                    html.escape(prompt),
                    html.escape(correct_text),
                    html.escape(explanation),
                ],
                tags=[tag_prefix, topic.replace("_", "-")],
                guid=genanki.guid_for(args.deck_slug, item.get("id", prompt)),
            )
        )

    n = len(deck.notes)
    if n != card_count:
        raise SystemExit(f"Built {n} notes, expected {card_count}")

    out_dir = ANKI_ROOT / "out" / "wave"
    out_dir.mkdir(parents=True, exist_ok=True)
    out_path = out_dir / f"{spec['filePrefix']}_FULL_{card_count}.apkg"
    genanki.Package(deck).write_to_file(str(out_path))
    print(f"{n} cards → {out_path}")


if __name__ == "__main__":
    main()
