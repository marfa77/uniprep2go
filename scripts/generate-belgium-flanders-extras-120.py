#!/usr/bin/env python3
"""Generate wave-expand-120 extras for belgium-flanders-mo-readiness-check (016–030 × 4 topics)."""

from __future__ import annotations

import csv
import json
import random
import re
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CSV_PATH = Path(
    "/Users/pavelveselov/Projects/prep2go app/Prep2GoStudy — Etsy Downloads/belgium_flanders_mo_qa.csv"
)
BANK_PATH = ROOT / "src/data/mock-exams/belgium-flanders-mo-readiness-check.json"
OUT_PATH = ROOT / "scripts/wave-expand-120/belgium-flanders-mo-readiness-check.mjs"

TOPIC_MAP = {
    "Instellingen": "institutions-orientation",
    "Maatschappelijke oriëntatie": "institutions-orientation",
    "Participatie": "institutions-orientation",
    "Geschiedenis": "history-geo-eu",
    "Geografie": "history-geo-eu",
    "EU en internationaal": "history-geo-eu",
    "Rechten en plichten": "rights-nationality",
    "Nationaliteit": "rights-nationality",
    "Veiligheid en recht": "rights-nationality",
    "Werk en economie": "society-daily",
    "Onderwijs": "society-daily",
    "Gezondheid": "society-daily",
    "Dagelijks leven": "society-daily",
    "Cultuur en feesten": "society-daily",
    "Aanvullende feiten": "society-daily",
}

DIFFICULTIES = ["easy", "medium", "hard"]


def norm(text: str) -> str:
    return re.sub(r"\s+", " ", text.strip().lower())


def js_string(text: str) -> str:
    return json.dumps(text, ensure_ascii=False)


def load_bank_prompts() -> set[str]:
    bank = json.loads(BANK_PATH.read_text(encoding="utf-8"))
    return {norm(q["prompt"]) for q in bank}


def load_csv_rows() -> list[dict[str, str]]:
    with CSV_PATH.open(encoding="utf-8") as handle:
        return list(csv.DictReader(handle))


def pick_wrong(correct: str, pool: list[str], rng: random.Random) -> list[str]:
    candidates = [a for a in pool if norm(a) != norm(correct)]
    rng.shuffle(candidates)
    wrongs: list[str] = []
    seen = {norm(correct)}
    for candidate in candidates:
        key = norm(candidate)
        if key in seen:
            continue
        seen.add(key)
        wrongs.append(candidate)
        if len(wrongs) == 3:
            break
    while len(wrongs) < 3:
        wrongs.append(f"Geen van bovenstaande antwoorden ({len(wrongs) + 1})")
    return wrongs


def build_explanation(question: str, answer: str, hint: str) -> str:
    base = f"Het juiste antwoord is “{answer}”."
    if hint and hint not in {"Instellingen", "MO Vlaanderen · inburgering.be"}:
        return f"{base} Dit hoort bij het thema {hint} in maatschappelijke oriëntatie."
    if "?" in question:
        return f"{base} Lees de vraagstelling goed — dit is een kernfeit voor MO in Vlaanderen."
    return base


def build_distractor_note(wrong: str, correct: str) -> str:
    short_wrong = wrong[:80] + ("…" if len(wrong) > 80 else "")
    short_correct = correct[:60] + ("…" if len(correct) > 60 else "")
    return f"“{short_wrong}” is niet correct; het juiste antwoord is “{short_correct}”."


def main() -> None:
    rng = random.Random(42)
    bank_prompts = load_bank_prompts()
    rows = load_csv_rows()

    by_topic: dict[str, list[dict[str, str]]] = defaultdict(list)
    section_pool: dict[str, list[str]] = defaultdict(list)

    for row in rows:
        section = row["Section"]
        if section == "Introductie":
            continue
        topic_id = TOPIC_MAP.get(section)
        if not topic_id:
            continue
        answer = row["Answer"].strip()
        if answer:
            section_pool[section].append(answer)
        if norm(row["Question"]) in bank_prompts:
            continue
        by_topic[topic_id].append({**row, "topicId": topic_id})

    for topic_id, items in by_topic.items():
        rng.shuffle(items)
        by_topic[topic_id] = items[:15]
        if len(by_topic[topic_id]) != 15:
            raise SystemExit(f"{topic_id}: need 15 extras, got {len(by_topic[topic_id])}")

    topic_order = [
        "institutions-orientation",
        "history-geo-eu",
        "rights-nationality",
        "society-daily",
    ]

    lines = [
        "/** Belgium Flanders MO — questions 016–030 per topic (60 items) */",
        "export const extras = {",
    ]

    for topic_id in topic_order:
        lines.append(f'  "{topic_id}": [')
        for row in by_topic[topic_id]:
            section = row["Section"]
            pool = section_pool[section] or [a for answers in section_pool.values() for a in answers]
            correct = row["Answer"].strip()
            wrongs = pick_wrong(correct, pool, rng)
            explanation = build_explanation(row["Question"], correct, row.get("Hint", ""))
            dist_notes = [build_distractor_note(w, correct) for w in wrongs]
            difficulty = rng.choice(DIFFICULTIES)
            row_parts = [
                js_string(row["Question"]),
                js_string(correct),
                "[" + ", ".join(js_string(w) for w in wrongs) + "]",
                js_string(explanation),
                "[" + ", ".join(js_string(n) for n in dist_notes) + "]",
                js_string(difficulty),
            ]
            lines.append("    [" + ", ".join(row_parts) + "],")
        lines.append("  ],")

    lines.append("};")
    lines.append("")
    OUT_PATH.write_text("\n".join(lines), encoding="utf-8")
    print(f"Wrote {OUT_PATH}")


if __name__ == "__main__":
    main()
