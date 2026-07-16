from __future__ import annotations

import json
from pathlib import Path

OUT = Path(__file__).resolve().parents[2] / "src/data/mock-exams"
SOURCE = "Original UniPrep2Go local bank (Wave 3 quality)."


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


def write_bank(slug: str, questions: list[dict]) -> None:
    assert len(questions) == 60, f"{slug}: expected 60, got {len(questions)}"
    topics: dict[str, int] = {}
    for q in questions:
        topics[q["topicId"]] = topics.get(q["topicId"], 0) + 1
        assert q["sourceNote"] == SOURCE
    assert all(v == 15 for v in topics.values()), topics
    path = OUT / f"{slug}.json"
    path.write_text(json.dumps(questions, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"{slug}: {len(questions)} ({dict(sorted(topics.items()))})")
