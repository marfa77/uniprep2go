#!/usr/bin/env python3
"""Build the Luxembourg Vivre ensemble FR + EN .apkg files (one deck per language,
subdecks per official exam module, tags per topic, explanation on every card).

Requires genanki (use /usr/bin/python3 on this machine).

  /usr/bin/python3 scripts/local-banks/build_luxembourg_vivre_ensemble_apkg.py
  /usr/bin/python3 scripts/local-banks/build_luxembourg_vivre_ensemble_apkg.py --samples-dir tmp/lux-v3-samples
"""

from __future__ import annotations

import argparse
import html
import sys
from datetime import datetime
from pathlib import Path

import genanki

sys.path.insert(0, str(Path(__file__).resolve().parent))
from luxembourg_vivre_ensemble_cards import MODULE_LABEL, main as write_csvs, rows  # noqa: E402

VAULT = Path("/Users/pavelveselov/Projects/Anki Generator/out/prep2go_Luxembourg_Vivre_ensemble")
BASE_NAMES = {"fr": "prep2go_Luxembourg_Vivre_ensemble_FULL", "en": "prep2go_Luxembourg_Vivre_ensemble_EN_FULL"}
DECK_NAMES = {"fr": "prep2go · Luxembourg Vivre ensemble · FR", "en": "prep2go · Luxembourg Vivre ensemble · EN"}
MODEL_IDS = {"fr": 1829400501, "en": 1829400502}
DECK_ID_BASE = {"fr": 2059400200, "en": 2059400210}
UI = {
    "fr": {"key": "À retenir", "trap": "Piège fréquent", "module": "Module"},
    "en": {"key": "Key point", "trap": "Common trap", "module": "Module"},
}

CSS = """
.card { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  font-size: 17px; color: #1f2937; background: #f3f5f9; padding: 14px; text-align: left; }
.ve { max-width: 640px; margin: 0 auto; }
.ve-top { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 10px; }
.ve-badge { display: inline-block; padding: 3px 10px; border-radius: 999px; font-size: 12px;
  font-weight: 700; letter-spacing: .02em; background: #e0ecff; color: #1d4ed8; }
.ve-badge.lu { background: #ffe4e6; color: #be123c; }
.ve-badge.trap { background: #fef3c7; color: #b45309; }
.ve-q { background: #fff; border-radius: 12px; padding: 18px 20px; box-shadow: 0 2px 8px rgba(15,23,42,.08);
  font-size: 22px; font-weight: 650; line-height: 1.35; }
.ve-a { margin-top: 14px; background: #ecfdf3; border: 1px solid #bbf7d0; border-radius: 12px;
  padding: 14px 18px; font-size: 19px; font-weight: 650; color: #166534; line-height: 1.4; }
.ve-x { margin-top: 10px; background: #fff; border-left: 4px solid #6366f1; border-radius: 10px;
  padding: 12px 16px; font-size: 15px; line-height: 1.5; color: #374151; }
.ve-x b { display: block; font-size: 12px; text-transform: uppercase; letter-spacing: .06em; color: #4f46e5; margin-bottom: 4px; }
.nightMode .card, .night_mode .card { background: #111827; color: #e5e7eb; }
.nightMode .ve-q, .night_mode .ve-q, .nightMode .ve-x, .night_mode .ve-x { background: #1f2937; color: #e5e7eb; }
.nightMode .ve-a, .night_mode .ve-a { background: #052e16; color: #bbf7d0; border-color: #14532d; }
@media (max-width: 600px) { .ve-q { font-size: 19px; } .ve-a { font-size: 17px; } }
"""

FRONT = """<div class="ve">
<div class="ve-top"><span class="ve-badge lu">Vivre ensemble</span><span class="ve-badge">{{Module}}</span>{{Trap}}</div>
<div class="ve-q">{{Question}}</div>
</div>"""

BACK_TMPL = """<div class="ve">
<div class="ve-top"><span class="ve-badge lu">Vivre ensemble</span><span class="ve-badge">{{Module}}</span>{{Trap}}</div>
<div class="ve-q">{{Question}}</div>
<div class="ve-a">{{Answer}}</div>
<div class="ve-x"><b>%s · {{Topic}}</b>{{Explanation}}</div>
</div>"""


def build_model(lang: str) -> genanki.Model:
    return genanki.Model(
        MODEL_IDS[lang],
        f"prep2go Vivre ensemble ({lang.upper()})",
        fields=[{"name": n} for n in ("Question", "Answer", "Explanation", "Topic", "Module", "Trap")],
        templates=[{"name": "Card 1", "qfmt": FRONT, "afmt": BACK_TMPL % UI[lang]["key"]}],
        css=CSS,
    )


def note_fields(lang: str, r: dict) -> list[str]:
    trap = f'<span class="ve-badge trap">{UI[lang]["trap"]}</span>' if "piege" in r["tags"].split() else ""
    return [
        html.escape(r["front"]),
        html.escape(r["back"]),
        html.escape(r["explanation"]),
        html.escape(r["topic"]),
        html.escape(MODULE_LABEL[r["module"]][0 if lang == "fr" else 1]),
        trap,
    ]


def build(lang: str, out_dir: Path, stamp: str) -> Path:
    model = build_model(lang)
    data = rows(lang)
    idx = 0 if lang == "fr" else 1
    decks = {
        m: genanki.Deck(DECK_ID_BASE[lang] + 1 + m, f"{DECK_NAMES[lang]}::{MODULE_LABEL[m][idx]}")
        for m in MODULE_LABEL
    }
    for r in data:
        decks[r["module"]].add_note(genanki.Note(
            model=model,
            fields=note_fields(lang, r),
            tags=["vivre_ensemble", *r["tags"].split()],
            guid=genanki.guid_for("lux-vivre-ensemble", lang, r["front"]),
        ))
    out = out_dir / f"{BASE_NAMES[lang]}_{stamp}.apkg"
    genanki.Package(list(decks.values())).write_to_file(str(out))
    per = {MODULE_LABEL[m][idx]: len(d.notes) for m, d in decks.items()}
    print(f"{lang}: {len(data)} cards → {out}")
    for name, n in per.items():
        print(f"   {n:3d}  {name}")
    return out


SAMPLE_PAGE = """<!doctype html><html><head><meta charset="utf-8"><style>
body {{ margin: 0; background: #f3f5f9; }}
{css}
.card {{ width: 640px; padding: 22px; }}
.rev {{ display: flex; gap: 8px; justify-content: center; margin-top: 16px; }}
.rev span {{ font: 600 13px -apple-system, sans-serif; padding: 8px 14px; border-radius: 8px; background: #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,.12); }}
.rev .again {{ color: #dc2626; }} .rev .hard {{ color: #6b7280; }} .rev .good {{ color: #16a34a; }} .rev .easy {{ color: #2563eb; }}
</style></head><body><div class="card">{body}
<div class="rev"><span class="again">Again</span><span class="hard">Hard</span><span class="good">Good</span><span class="easy">Easy</span></div>
</div></body></html>"""


def render_samples(samples_dir: Path, picks: dict[str, list[str]]) -> None:
    samples_dir.mkdir(parents=True, exist_ok=True)
    for lang, fronts in picks.items():
        by_front = {r["front"]: r for r in rows(lang)}
        for i, front in enumerate(fronts, 1):
            f = note_fields(lang, by_front[front])
            body = (BACK_TMPL % UI[lang]["key"])
            for name, val in zip(("Question", "Answer", "Explanation", "Topic", "Module", "Trap"), f):
                body = body.replace("{{" + name + "}}", val)
            path = samples_dir / f"sample-{lang}-{i}.html"
            path.write_text(SAMPLE_PAGE.format(css=CSS, body=body), encoding="utf-8")
            print(f"sample {path}")


SAMPLE_PICKS = {
    "fr": [
        "Le Conseil d’État vote-t-il les lois ?",
        "Le vote est-il obligatoire au Luxembourg ?",
        "Le traité de Londres de 1867 a-t-il donné son indépendance au Luxembourg ?",
    ],
    "en": [
        "Does the Council of State pass laws?",
        "Is voting compulsory in Luxembourg?",
        "Did the 1867 Treaty of London give Luxembourg its independence?",
    ],
}


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--out-dir", default=str(VAULT))
    ap.add_argument("--samples-dir", default="")
    args = ap.parse_args()
    out_dir = Path(args.out_dir)
    sys.argv = [sys.argv[0], "--out-dir", str(out_dir)]
    write_csvs()
    stamp = datetime.now().strftime("%y%m%d-%H%M")
    for lang in ("fr", "en"):
        build(lang, out_dir, stamp)
    if args.samples_dir:
        render_samples(Path(args.samples_dir), SAMPLE_PICKS)


if __name__ == "__main__":
    main()
