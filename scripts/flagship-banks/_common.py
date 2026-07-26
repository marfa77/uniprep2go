#!/usr/bin/env python3
"""Helpers for flagship mock bank rebuilds."""

from __future__ import annotations

import json
import re
from pathlib import Path

OUT = Path(__file__).resolve().parents[2] / "src/data/mock-exams"
SOURCE = "Original UniPrep2Go local bank (flagship rebuild 2026-07)."

DRILL_RE = re.compile(r"\s*\(Drill\s*\d+\)\s*", re.I)
WHAT_IS_RE = re.compile(
    r"^What (?:is|are|does|do|must|should)\s+(.+?)\??$",
    re.I,
)
WHO_IS_RE = re.compile(r"^Who (?:is|are)\s+(.+?)\??$", re.I)
WHY_HOW_RE = re.compile(r"^(Why|How|When|Where)\s+(.+?)\??$", re.I)
TEMPLATE_STEM = "Which statement best reflects professional practice in this competency area"


def clean_prompt(prompt: str) -> str:
    return re.sub(r"\s+", " ", DRILL_RE.sub(" ", prompt)).strip()


def scenarioize(prompt: str, topic_label: str = "this exam topic") -> str:
    """Turn thin definition stems into applied stems without inventing new facts."""
    p = clean_prompt(prompt)
    if TEMPLATE_STEM in p:
        return p  # caller should replace these entirely

    # Already a solid applied / scenario stem (and not a thin definition)
    if len(p) >= 70 and not WHAT_IS_RE.match(p) and not WHO_IS_RE.match(p) and not WHY_HOW_RE.match(p):
        return p
    if (
        p.endswith("?")
        and len(p) >= 55
        and not WHAT_IS_RE.match(p)
        and not WHO_IS_RE.match(p)
        and not WHY_HOW_RE.match(p)
    ):
        return p

    # Keep grammar intact for must/should/does/do questions
    m_aux = re.match(r"^What (must|should|does|do)\s+(.+?)\??$", p, re.I)
    if m_aux:
        aux, rest = m_aux.group(1).lower(), m_aux.group(2).strip().rstrip("?")
        return f"In {topic_label}, what {aux} {rest}?"

    m = WHAT_IS_RE.match(p)
    if m:
        concept = m.group(1).strip().rstrip("?")
        return f"Which statement correctly describes {concept} as tested in {topic_label}?"
    m = WHO_IS_RE.match(p)
    if m:
        concept = m.group(1).strip().rstrip("?")
        return (
            f"In standard {topic_label} practice, which description correctly identifies "
            f"{concept}?"
        )
    m = WHY_HOW_RE.match(p)
    if m:
        kind, rest = m.group(1), m.group(2).strip().rstrip("?")
        return f"In {topic_label}, {kind.lower()} {rest}?"
    if p.endswith(":") and len(p) < 55:
        return f"{p.rstrip(':')} — which option is correct for {topic_label}?"
    if len(p) < 48:
        core = p.rstrip("?:").strip()
        if core.lower().startswith(("what ", "why ", "how ", "when ", "who ")):
            return f"In {topic_label}, {core[0].lower() + core[1:]}?"
        return f"Which statement best applies to {core} in {topic_label}?"
    return p


def rotate_options(question: dict, target_correct: str) -> dict:
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
    return [rotate_options(q, "abcd"[i % 4]) for i, q in enumerate(questions)]


def normalize_question(
    q: dict,
    *,
    exam_slug: str,
    topic_id: str,
    index: int,
    topic_label: str,
) -> dict:
    distractors = dict(q.get("distractorExplanations") or {})
    options = q["options"]
    correct = q["correctOptionId"]
    # Ensure distractor keys exist
    for opt in options:
        oid = opt["id"]
        if oid != correct and oid not in distractors:
            distractors[oid] = "This option does not match the correct concept for this item."
    prompt = scenarioize(q["prompt"], topic_label)
    return {
        "id": f"{exam_slug}-{topic_id}-{index:03d}",
        "examSlug": exam_slug,
        "topicId": topic_id,
        "prompt": prompt,
        "options": [{"id": o["id"], "text": o["text"]} for o in options],
        "correctOptionId": correct,
        "explanation": (q.get("explanation") or "").strip()
        or "See the correct option — it matches the standard definition used in practice exams.",
        "distractorExplanations": {
            k: distractors[k] for k in "abcd" if k != correct and k in distractors
        },
        "difficulty": q.get("difficulty") or "medium",
        "sourceNote": q.get("sourceNote") or SOURCE,
        **({"formula": q["formula"]} if q.get("formula") else {}),
    }


def write_bank(slug: str, questions: list[dict], expected: int) -> None:
    questions = balance_correct_positions(questions)
    assert len(questions) == expected, f"{slug}: expected {expected}, got {len(questions)}"
    prompts = [q["prompt"] for q in questions]
    assert len(set(prompts)) == len(prompts), f"{slug}: duplicate prompts remain"
    for q in questions:
        assert TEMPLATE_STEM not in q["prompt"], f"{slug}: template stem survived"
        assert "(Drill" not in q["prompt"], f"{slug}: drill label survived"
        assert q["examSlug"] == slug
    path = OUT / f"{slug}.json"
    path.write_text(json.dumps(questions, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"wrote {path.name}: {len(questions)} unique")


def load(slug: str) -> list[dict]:
    return json.loads((OUT / f"{slug}.json").read_text(encoding="utf-8"))
