#!/usr/bin/env python3
"""Append IT Swiss civics mock 016–030 (clone DE expand with Italian text)."""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DE_SLUG = "swiss-citizenship-readiness-check"
IT_SLUG = "naturalizzazione-svizzera-readiness-check"
DE_BANK = ROOT / "src/data/mock-exams" / f"{DE_SLUG}.json"
IT_BANK = ROOT / "src/data/mock-exams" / f"{IT_SLUG}.json"
DATA = ROOT / "scripts/data/naturalizzazione-svizzera-expand-it-60.json"
SOURCE = (
    "Converted from Prep2Go Immigration app Naturalizzazione Svizzera deck "
    "(Q&A → MCQ with related/near-miss distractors)."
)


def suffix(de_id: str) -> str:
    return de_id.removeprefix(f"{DE_SLUG}-")


def main() -> None:
    if not DATA.is_file():
        raise SystemExit(f"missing {DATA}")
    overlays: dict[str, dict] = json.loads(DATA.read_text(encoding="utf-8"))
    de = json.loads(DE_BANK.read_text(encoding="utf-8"))
    de_extras = sorted(
        [q for q in de if int(q["id"].split("-")[-1]) >= 16],
        key=lambda q: q["id"],
    )
    if len(de_extras) != 60:
        raise SystemExit(f"expected 60 DE extras, got {len(de_extras)}")
    it = json.loads(IT_BANK.read_text(encoding="utf-8"))
    keep = [q for q in it if int(q["id"].split("-")[-1]) <= 15]
    if len(keep) != 60:
        raise SystemExit(f"expected 60 IT keepers, got {len(keep)}")
    added: list[dict] = []
    for de_q in de_extras:
        key = suffix(de_q["id"])
        if key not in overlays:
            raise SystemExit(f"missing overlay {key}")
        ov = overlays[key]
        it_id = f"{IT_SLUG}-{key}"
        options = []
        for o in de_q["options"]:
            oid = o["id"]
            text = ov["options"][oid]
            options.append({"id": oid, "text": text})
        added.append(
            {
                "id": it_id,
                "examSlug": IT_SLUG,
                "topicId": de_q["topicId"],
                "prompt": ov["prompt"],
                "options": options,
                "correctOptionId": de_q["correctOptionId"],
                "explanation": ov["explanation"],
                "distractorExplanations": ov["distractorExplanations"],
                "difficulty": de_q.get("difficulty", "medium"),
                "sourceNote": SOURCE,
            }
        )
    out = keep + added
    if len(out) != 120:
        raise SystemExit(f"expected 120, got {len(out)}")
    IT_BANK.write_text(json.dumps(out, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"wrote {len(out)} items to {IT_BANK.name}")


if __name__ == "__main__":
    main()
