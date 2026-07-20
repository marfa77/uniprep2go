from __future__ import annotations

import json
from pathlib import Path

OUT = Path(__file__).resolve().parents[2] / "src/data/mock-exams"
SOURCE = "Original UniPrep2Go local bank (Wave 4)."


def item(
    exam: str,
    topic: str,
    n: int,
    prompt: str,
    opts: dict[str, str],
    correct: str,
    explanation: str,
    distractors: dict[str, str],
    difficulty: str,
) -> dict:
    assert correct in "abcd"
    assert set(opts) == {"a", "b", "c", "d"}
    assert set(distractors) == set("abcd") - {correct}
    assert difficulty in {"easy", "medium", "hard"}
    return {
        "id": f"{exam}-{topic}-{n:03d}",
        "examSlug": exam,
        "topicId": topic,
        "prompt": prompt,
        "options": [{"id": k, "text": opts[k]} for k in "abcd"],
        "correctOptionId": correct,
        "explanation": explanation,
        "distractorExplanations": distractors,
        "difficulty": difficulty,
        "sourceNote": SOURCE,
    }


def pack(exam: str, topic: str, rows: list[tuple]) -> list[dict]:
    assert len(rows) == 15, f"{exam}/{topic}: expected 15, got {len(rows)}"
    return [item(exam, topic, i, *row) for i, row in enumerate(rows, 1)]


def _rotate_options(question: dict, target_correct: str) -> dict:
    """Move the correct option text onto target_correct (a/b/c/d) and remap distractors."""
    assert target_correct in "abcd"
    by_id = {opt["id"]: opt["text"] for opt in question["options"]}
    correct_text = by_id[question["correctOptionId"]]
    wrong_texts = [by_id[k] for k in "abcd" if k != question["correctOptionId"]]
    wrong_notes = [
        question["distractorExplanations"][k]
        for k in "abcd"
        if k != question["correctOptionId"]
    ]
    new_options = []
    new_distractors: dict[str, str] = {}
    wi = 0
    for oid in "abcd":
        if oid == target_correct:
            new_options.append({"id": oid, "text": correct_text})
        else:
            new_options.append({"id": oid, "text": wrong_texts[wi]})
            new_distractors[oid] = wrong_notes[wi]
            wi += 1
    return {
        **question,
        "options": new_options,
        "correctOptionId": target_correct,
        "distractorExplanations": new_distractors,
    }


def balance_correct_positions(questions: list[dict]) -> list[dict]:
    """Cycle correct answers across a/b/c/d so banks pass distribution checks."""
    return [_rotate_options(q, "abcd"[i % 4]) for i, q in enumerate(questions)]


def write_bank(slug: str, questions: list[dict]) -> None:
    questions = balance_correct_positions(questions)
    assert len(questions) == 60, f"{slug}: expected 60, got {len(questions)}"
    topics: dict[str, int] = {}
    positions: set[str] = set()
    for q in questions:
        topics[q["topicId"]] = topics.get(q["topicId"], 0) + 1
        positions.add(q["correctOptionId"])
        assert q["sourceNote"] == SOURCE
    assert all(v == 15 for v in topics.values()), topics
    assert len(positions) >= 2, f"{slug}: correct positions not distributed: {positions}"
    path = OUT / f"{slug}.json"
    path.write_text(json.dumps(questions, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"{slug}: {len(questions)} ({dict(sorted(topics.items()))})")
