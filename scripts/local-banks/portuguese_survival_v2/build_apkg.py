#!/usr/bin/env python3
"""Build Portuguese Survival v2 speaking-moves .apkg (genanki).

  /usr/bin/python3 scripts/local-banks/portuguese_survival_v2/build_apkg.py
"""
from __future__ import annotations

import argparse
import html
import json
import shutil
from datetime import datetime
from pathlib import Path

import genanki

ROOT = Path(__file__).resolve().parents[3]
MOVES = ROOT / "tmp" / "portuguese-survival-v2" / "moves.json"
VAULT = Path("/Users/pavelveselov/Projects/Anki Generator/out/prep2go_Portuguese_Survival_v2")
MEDIA = VAULT / "media"
GUMROAD_NAME = "Portuguese_Survival_PT_PT_Anki_Deck.apkg"

MODEL_ID = 1928401701
DECK_ID = 2159401400
DECK_NAME = "prep2go · Portuguese Survival (Day-1 speaking moves)"

CSS = """
.card { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  font-size: 17px; color: #1f2937; background: #f4f6f8; padding: 14px; text-align: left; }
.sv { max-width: 640px; margin: 0 auto; }
.sv-meta { font-size: 12px; letter-spacing: .04em; text-transform: uppercase; color: #64748b; margin-bottom: 10px; }
.sv-q { background: #fff; border-radius: 12px; padding: 18px 20px; box-shadow: 0 2px 8px rgba(15,23,42,.08);
  font-size: 20px; font-weight: 600; line-height: 1.4; }
.sv-a { margin-top: 14px; background: #ecfdf3; border: 1px solid #bbf7d0; border-radius: 12px;
  padding: 14px 18px; font-size: 20px; font-weight: 650; color: #166534; line-height: 1.4; white-space: pre-wrap; }
.sv-h { margin-top: 10px; background: #fff; border-left: 4px solid #0f766e; border-radius: 10px;
  padding: 12px 16px; font-size: 15px; line-height: 1.5; color: #374151; }
.sv-h b { display: block; font-size: 11px; text-transform: uppercase; letter-spacing: .06em; color: #0f766e; margin-bottom: 4px; }
.nightMode .card, .night_mode .card { background: #111827; color: #e5e7eb; }
.nightMode .sv-q, .night_mode .sv-q, .nightMode .sv-h, .night_mode .sv-h { background: #1f2937; color: #e5e7eb; }
.nightMode .sv-a, .night_mode .sv-a { background: #052e16; color: #bbf7d0; border-color: #14532d; }
"""

FRONT_TMPL = """<div class="sv">
<div class="sv-meta">{{TypeLabel}} · {{SceneLabel}}</div>
<div class="sv-q">{{Front}}</div>
</div>"""

BACK_TMPL = """<div class="sv">
<div class="sv-meta">{{TypeLabel}} · {{SceneLabel}}</div>
<div class="sv-q">{{Front}}</div>
<div class="sv-a">{{Back}}</div>
{{#Hint}}<div class="sv-h"><b>Hint</b>{{Hint}}</div>{{/Hint}}
{{Audio}}
</div>"""

SCENE_LABEL = {
    "foundations": "Foundations",
    "numbers_money_time": "Numbers · money · time",
    "directions": "Directions",
    "shop": "Shop",
    "health": "Health",
    "housing": "Housing",
    "transport": "Transport",
    "docs": "Documents",
    "social": "Social",
}
TYPE_LABEL = {"say": "Say", "hear": "Hear", "repair": "Repair"}


def build_model() -> genanki.Model:
    return genanki.Model(
        MODEL_ID,
        "prep2go Portuguese Survival Moves",
        fields=[
            {"name": "Front"},
            {"name": "Back"},
            {"name": "Hint"},
            {"name": "Audio"},
            {"name": "SceneLabel"},
            {"name": "TypeLabel"},
            {"name": "Id"},
        ],
        templates=[{"name": "Card 1", "qfmt": FRONT_TMPL, "afmt": BACK_TMPL}],
        css=CSS,
    )


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--out-name", default=None, help="apkg filename inside vault")
    args = ap.parse_args()

    rows = json.loads(MOVES.read_text(encoding="utf-8"))
    if not rows:
        raise SystemExit("empty moves.json")

    missing = [r["id"] for r in rows if not (MEDIA / f"{r['id']}.mp3").is_file()]
    if missing:
        raise SystemExit(f"missing audio for {len(missing)} moves e.g. {missing[:5]}")

    VAULT.mkdir(parents=True, exist_ok=True)
    # clean stray mkdir typo from scaffold
    stray = VAULT / "{media}"
    if stray.is_dir():
        shutil.rmtree(stray)

    model = build_model()
    stamp = datetime.now().strftime("%y%m%d-%H%M")
    deck = genanki.Deck(DECK_ID, f"{DECK_NAME} · {stamp}")
    media_files: list[str] = []

    for r in rows:
        aid = r["id"]
        mp3 = MEDIA / f"{aid}.mp3"
        media_files.append(str(mp3))
        note = genanki.Note(
            model=model,
            fields=[
                html.escape(r["front"]),
                html.escape(r["back"]),
                html.escape(r.get("hint") or ""),
                f"[sound:{aid}.mp3]",
                SCENE_LABEL.get(r["scene"], r["scene"]),
                TYPE_LABEL.get(r["type"], r["type"]),
                aid,
            ],
            tags=[r["scene"], r["type"], "survival_v2"],
            guid=genanki.guid_for("pt-survival-v2", aid),
        )
        deck.add_note(note)

    out_name = args.out_name or f"prep2go_Portuguese_Survival_v2_FULL_{stamp}.apkg"
    out = VAULT / out_name
    pkg = genanki.Package(deck)
    pkg.media_files = media_files
    pkg.write_to_file(str(out))

    # Stable name for Gumroad upload path
    stable = VAULT / GUMROAD_NAME
    shutil.copy2(out, stable)

    (VAULT / "MANIFEST.md").write_text(
        f"# Portuguese Survival v2\n\n"
        f"- cards: {len(rows)}\n"
        f"- built: {stamp}\n"
        f"- apkg: `{out.name}`\n"
        f"- gumroad file: `{GUMROAD_NAME}`\n",
        encoding="utf-8",
    )
    print(f"OK {len(rows)} → {out}")
    print(f"OK copy → {stable}")


if __name__ == "__main__":
    main()
