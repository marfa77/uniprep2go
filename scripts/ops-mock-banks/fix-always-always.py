#!/usr/bin/env python3
"""Strip Wave leftover 'always always' padding and rebuild joke-trade distractors.

Keeps stems and the correct option. Writes /tmp/{slug}-fixed.json. Does not touch git.
"""

from __future__ import annotations

import argparse
import importlib.util
import json
import re
from copy import deepcopy
from pathlib import Path

ROOT = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location("audit_one", ROOT / "audit-one-bank.py")
audit = importlib.util.module_from_spec(spec)
assert spec.loader
spec.loader.exec_module(audit)

FILLER = re.compile(
    r"\b(exclusively\s+always(\s+always)*|always(\s+always)+|ever\s+always|always\s+alway)\b",
    re.I,
)
JOKE = re.compile(
    r"\b(FDA|USDA|FAA|swimming pool|kitchen appliance|roof shingle|window tint|"
    r"recipes|HVAC refrigerant|plumbing vent sizing|pool chemistry)\b",
    re.I,
)


def clean_text(text: str) -> str:
    cleaned = FILLER.sub("", text)
    cleaned = re.sub(r"\s+", " ", cleaned).strip(" .")
    return cleaned


def is_junk(text: str) -> bool:
    if len(text) < 8:
        return True
    if JOKE.search(text):
        return True
    if text.lower() in {"never", "zero", "none", "unlimited"}:
        return True
    return False


def correct_text(question: dict) -> str:
    for option in question.get("options") or []:
        if option.get("id") == question.get("correctOptionId"):
            return clean_text(str(option.get("text") or ""))
    return ""


def explain(question: dict) -> str:
    prompt = str(question.get("prompt") or "").strip()
    correct = correct_text(question)
    return (
        f"This item asks: “{prompt}”. The matching rule is: {correct}. "
        "Extreme never/always wording and facts from another trade do not satisfy this stem. "
        "Independent UniPrep diagnostic — not a state board exam paper."
    )


def distractor_why(question: dict, option_text: str) -> str:
    prompt = str(question.get("prompt") or "").strip()
    correct = correct_text(question)
    return (
        f"“{option_text}” does not answer “{prompt}”. "
        f"That wording is a neighboring rule, an extreme never/always, or another system. "
        f"The matching answer is: {correct}."
    )


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--slug", required=True)
    args = parser.parse_args()
    audit.load_env()
    questions = [deepcopy(raw) for raw in audit.fetch_bank(args.slug)]
    pool = [correct_text(question) for question in questions if correct_text(question)]
    used_replacements = 0
    for index, question in enumerate(questions):
        correct_id = question.get("correctOptionId")
        seen = {correct_text(question)}
        for option in question.get("options") or []:
            text = clean_text(str(option.get("text") or ""))
            if option.get("id") == correct_id:
                option["text"] = text or str(option.get("text") or "")
                continue
            if is_junk(text):
                replacement = next((item for item in pool[index:] + pool[:index] if item not in seen), text)
                text = replacement
                used_replacements += 1
            option["text"] = text
            seen.add(text)
        question["explanation"] = explain(question)
        question["distractorExplanations"] = {
            option["id"]: distractor_why(question, str(option.get("text") or ""))
            for option in question.get("options") or []
            if option.get("id") != correct_id
        }
        question["sourceNote"] = (
            f"Ops P0 fix 2026-09-21: stripped always-always leftover distractors on {args.slug}."
        )
    output = Path(f"/tmp/{args.slug}-fixed.json")
    output.write_text(json.dumps(questions, ensure_ascii=False, indent=2) + "\n")
    leftover = sum(
        1
        for question in questions
        for option in question.get("options") or []
        if "always always" in str(option.get("text") or "").lower()
    )
    print(
        json.dumps(
            {
                "slug": args.slug,
                "n": len(questions),
                "replacements": used_replacements,
                "always_always_left": leftover,
                "output": str(output),
            },
            indent=2,
        )
    )


if __name__ == "__main__":
    main()
