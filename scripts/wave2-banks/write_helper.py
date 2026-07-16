#!/usr/bin/env python3
"""Wave 2 mock-bank writer: 4 topics × 15 Q = 60."""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "src/data/mock-exams"
SOURCE = "Original UniPrep2Go local bank (Wave 2)."
ANSWERS = ("a", "b", "c", "d")


def make_q(exam_slug: str, topic_id: str, n: int, row: tuple, correct_id: str) -> dict:
    prompt, correct, wrongs, explanation, dist_notes, difficulty = row
    if len(wrongs) != 3 or len(dist_notes) != 3:
        raise SystemExit(f"Bad row {exam_slug}/{topic_id}/{n}")
    wrong_ids = [i for i in ANSWERS if i != correct_id]
    options = []
    for oid in ANSWERS:
        if oid == correct_id:
            options.append({"id": oid, "text": correct})
        else:
            options.append({"id": oid, "text": wrongs[wrong_ids.index(oid)]})
    distractors = {wid: dist_notes[i] for i, wid in enumerate(wrong_ids)}
    return {
        "id": f"{exam_slug}-{topic_id}-{n:03d}",
        "examSlug": exam_slug,
        "topicId": topic_id,
        "prompt": prompt,
        "options": options,
        "correctOptionId": correct_id,
        "explanation": explanation,
        "distractorExplanations": distractors,
        "difficulty": difficulty,
        "sourceNote": SOURCE,
    }


def build_bank(exam_slug: str, topics: dict[str, list]) -> list[dict]:
    out: list[dict] = []
    if len(topics) != 4:
        raise SystemExit(f"{exam_slug}: expected 4 topics, got {len(topics)}")
    for topic_id, rows in topics.items():
        if len(rows) != 15:
            raise SystemExit(f"{exam_slug}/{topic_id}: expected 15, got {len(rows)}")
        for i, row in enumerate(rows):
            out.append(make_q(exam_slug, topic_id, i + 1, row, ANSWERS[i % 4]))
    if len(out) != 60:
        raise SystemExit(f"{exam_slug}: expected 60, got {len(out)}")
    return out


def write_bank(exam_slug: str, topics: dict[str, list]) -> None:
    bank = build_bank(exam_slug, topics)
    path = OUT / f"{exam_slug}.json"
    path.write_text(json.dumps(bank, indent=2) + "\n", encoding="utf-8")
    counts = {}
    for q in bank:
        counts[q["topicId"]] = counts.get(q["topicId"], 0) + 1
        wrong = [x for x in ANSWERS if x != q["correctOptionId"]]
        for wid in wrong:
            if wid not in q["distractorExplanations"]:
                raise SystemExit(f"Missing distractor {wid} on {q['id']}")
        if q["correctOptionId"] in q["distractorExplanations"]:
            raise SystemExit(f"Correct in distractors on {q['id']}")
        if q["sourceNote"] != SOURCE:
            raise SystemExit(f"Bad sourceNote on {q['id']}")
    print(f"{path.name}: {len(bank)}", counts)
