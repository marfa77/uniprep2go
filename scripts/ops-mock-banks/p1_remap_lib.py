"""Shared builder for ops remap rewrites."""

from __future__ import annotations

import json
from pathlib import Path

KEYS = "abcd"


def build(slug: str, rows: list[tuple[str, str, str, str, str, str, str]], exam: str) -> list[dict]:
    questions = []
    for index, (topic, prompt, correct, w1, w2, w3, why) in enumerate(rows):
        key = KEYS[index % 4]
        wrongs = [w1, w2, w3]
        options = []
        distractors: dict[str, str] = {}
        wi = 0
        for letter in KEYS:
            if letter == key:
                options.append({"id": letter, "text": correct})
            else:
                text = wrongs[wi]
                wi += 1
                options.append({"id": letter, "text": text})
                distractors[letter] = (
                    f"“{text}” does not answer “{prompt}”. That is a sibling-exam leftover "
                    f"or a neighboring rule. The matching answer is: {correct}."
                )
        questions.append(
            {
                "id": f"{slug}-{topic}-{index + 1:03d}",
                "examSlug": slug,
                "topicId": topic,
                "prompt": prompt,
                "options": options,
                "correctOptionId": key,
                "explanation": (
                    f"{why} This item asks: “{prompt}”. The matching answer is: {correct}. "
                    f"Independent UniPrep diagnostic — not an official {exam} paper."
                ),
                "distractorExplanations": distractors,
                "difficulty": "medium",
                "sourceNote": "Ops P1 rewrite 2026-09-21: replaced sibling-remap bank with credential-matched items.",
            }
        )
    if len(questions) != 60:
        raise SystemExit(f"{slug} has {len(questions)} questions")
    path = Path(f"/tmp/{slug}-fixed.json")
    path.write_text(json.dumps(questions, ensure_ascii=False, indent=2) + "\n")
    print(json.dumps({"slug": slug, "n": 60, "output": str(path)}))
    return questions
