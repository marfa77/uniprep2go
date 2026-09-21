#!/usr/bin/env python3
"""Mechanical + pattern audit of one ops mock bank. Prints JSON."""

from __future__ import annotations

import argparse
import json
import os
import re
import urllib.request
from collections import Counter, defaultdict
from pathlib import Path

THIN = (
    "Sounds plausible",
    "The correct choice",
    "matches this rule",
    "Klingt plausibel",
    "Semble plausible",
    "parece plausible",
    "the appropriate response because",
)
YES_NO = re.compile(r"\b(yes|no)\b", re.I)
POLICE = re.compile(r"report it to the police", re.I)
ILLEGAL = re.compile(r"\bit is illegal\b", re.I)
YEAR = re.compile(r"\b(1[0-9]{3}|[0-9]{1,3} AD)\b")


def load_env() -> None:
    path = Path("/Users/pavelveselov/Projects/uniprep2go/.env.local")
    if not path.exists():
        return
    for line in path.read_text().splitlines():
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, _, value = line.partition("=")
        os.environ.setdefault(key.strip(), value.strip().strip("'").strip('"'))


def fetch_bank(slug: str) -> list[dict]:
    url = (os.environ.get("PREP2GO_SUPABASE_URL") or os.environ["SUPABASE_URL"]).rstrip("/")
    key = os.environ.get("PREP2GO_SUPABASE_SERVICE_ROLE_KEY") or os.environ["SUPABASE_SERVICE_ROLE_KEY"]
    req = urllib.request.Request(
        f"{url}/rest/v1/rpc/ops_get_mock_bank",
        data=json.dumps({"p_slug": slug}).encode(),
        headers={
            "apikey": key,
            "Authorization": f"Bearer {key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read().decode())


def option_texts(question: dict) -> list[str]:
    return [str(option.get("text") or "") for option in question.get("options") or []]


def colliding_options(question: dict) -> list[str]:
    texts = option_texts(question)
    flags = []
    police = [text for text in texts if POLICE.search(text)]
    if len(police) >= 2:
        flags.append("duplicate-police-report")
    illegal = [text for text in texts if ILLEGAL.search(text)]
    if len(illegal) >= 2:
        flags.append("duplicate-illegal-clause")
    yes = sum(1 for text in texts if text.lower().startswith("yes"))
    no = sum(1 for text in texts if text.lower().startswith("no"))
    if yes and no and yes + no >= 3:
        flags.append("yes-no-polarity-pileup")
    years = []
    for text in texts:
        years.extend(YEAR.findall(text))
    if len(set(years)) >= 3 and len({re.sub(YEAR, "YEAR", text) for text in texts}) == 1:
        flags.append("year-swap-only-distractors")
    lowered = [text.lower() for text in texts]
    if len(set(lowered)) < len(lowered):
        flags.append("exact-duplicate-option")
    return flags


def topic_guess(prompt: str) -> str:
    p = prompt.lower()
    if any(word in p for word in ("king", "queen", "war", "battle", "roman", "viking", "tudor", "churchill", "empire", "magna", "hastings", "cromwell")):
        return "history"
    if any(word in p for word in ("parliament", "mp ", "prime minister", "vote", "election", "devolution", "house of")):
        return "government"
    if any(word in p for word in ("nhs", "bank holiday", "christmas", "sport", "pub", "eisteddfod")):
        return "everyday"
    if any(word in p for word in ("equal", "discriminat", "freedom", "religion", "value", "law")):
        return "values"
    return "unknown"


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--slug", required=True)
    args = parser.parse_args()
    slug = args.slug
    load_env()
    questions = fetch_bank(slug)
    topics = Counter(q.get("topicId") for q in questions)
    keys = Counter(q.get("correctOptionId") for q in questions)
    thin = 0
    expl_only_correct = 0
    colliding = []
    mistagged = []
    short_expl = 0
    sources = Counter()
    for question in questions:
        blob = json.dumps(question.get("distractorExplanations") or {})
        if any(marker in blob for marker in THIN):
            thin += 1
        expl = str(question.get("explanation") or "").strip()
        correct = next(
            (option.get("text") for option in question.get("options") or [] if option.get("id") == question.get("correctOptionId")),
            "",
        )
        if expl == str(correct or "").strip():
            expl_only_correct += 1
        if len(expl) < 80:
            short_expl += 1
        flags = colliding_options(question)
        if flags:
            colliding.append(
                {
                    "id": question.get("id"),
                    "prompt": question.get("prompt"),
                    "flags": flags,
                    "options": option_texts(question),
                    "correct": question.get("correctOptionId"),
                }
            )
        guess = topic_guess(str(question.get("prompt") or ""))
        if guess in {"history", "government", "everyday"} and question.get("topicId") == "values":
            mistagged.append(
                {
                    "id": question.get("id"),
                    "prompt": question.get("prompt"),
                    "tagged": question.get("topicId"),
                    "guess": guess,
                }
            )
        sources[str(question.get("sourceNote") or "")[:80]] += 1

    n = max(1, len(questions))
    blockers = []
    if thin >= n * 0.5:
        blockers.append(f"thin distractors {thin}/{len(questions)}")
    if expl_only_correct >= n * 0.5:
        blockers.append(f"explanation copies correct option {expl_only_correct}/{len(questions)}")
    if len(colliding) >= n * 0.5:
        blockers.append(f"colliding options {len(colliding)}/{len(questions)}")
    if thin:
        blockers.append(f"{thin} thin distractor items remain")
    if expl_only_correct:
        blockers.append(f"{expl_only_correct} explanations still copy the correct option")
    if short_expl:
        blockers.append(f"{short_expl} explanations shorter than 80 characters")
    if colliding:
        blockers.append(f"{len(colliding)} colliding-option items")
    if mistagged:
        blockers.append(f"{len(mistagged)} values items that look history/government")
    if thin >= n * 0.5 or expl_only_correct >= n * 0.5 or len(colliding) >= n * 0.5:
        verdict = "P0"
    elif thin or expl_only_correct or colliding or mistagged:
        verdict = "P1" if (thin or expl_only_correct or len(colliding) > 8) else "P2"
    else:
        verdict = "clean"
        blockers = []

    report = {
        "slug": slug,
        "n": len(questions),
        "topics": dict(topics),
        "key_bias": dict(keys),
        "thin_distractors": thin,
        "explanation_copies_correct": expl_only_correct,
        "short_explanations": short_expl,
        "colliding_option_items": len(colliding),
        "values_probably_mistagged": len(mistagged),
        "sources": dict(sources),
        "colliding_examples": colliding[:12],
        "mistag_examples": mistagged[:12],
        "verdict": verdict,
        "blockers": blockers,
    }
    print(json.dumps(report, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
