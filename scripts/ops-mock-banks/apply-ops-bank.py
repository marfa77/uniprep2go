#!/usr/bin/env python3
"""Upsert one rewritten bank into ops from /tmp JSON. Does not touch git."""

from __future__ import annotations

import argparse
import json
import os
import urllib.request
from collections import Counter
from pathlib import Path

THIN = ("Sounds plausible", "The correct choice", "matches this rule", "Klingt plausibel")
META_PATH = Path(__file__).resolve().parent / "bank-meta.json"


def load_env() -> None:
    path = Path("/Users/pavelveselov/Projects/uniprep2go/.env.local")
    if not path.exists():
        return
    for line in path.read_text().splitlines():
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, _, value = line.partition("=")
        os.environ.setdefault(key.strip(), value.strip().strip("'").strip('"'))


def uniquify(slug: str, questions: list[dict]) -> list[dict]:
    seen: dict[str, int] = {}
    out: list[dict] = []
    for index, question in enumerate(questions):
        base = str(question.get("id") or f"{slug}-{index}").strip()
        count = seen.get(base, 0) + 1
        seen[base] = count
        item = dict(question)
        if count > 1:
            item["id"] = f"{base}-dup{count}"
        out.append(item)
    return out


def smell(questions: list[dict]) -> tuple[dict[str, int], int, str]:
    key_bias: dict[str, int] = {}
    thin = 0
    for question in questions:
        key = str(question.get("correctOptionId") or "?")
        key_bias[key] = key_bias.get(key, 0) + 1
        blob = json.dumps(question.get("distractorExplanations") or {})
        if any(marker in blob for marker in THIN):
            thin += 1
    a_share = (key_bias.get("a", 0) / len(questions)) if questions else 0
    if thin >= max(1, len(questions) // 2) or a_share >= 0.85:
        tier = "P0"
    elif thin > 0 or a_share >= 0.45:
        tier = "P1"
    else:
        tier = "clean"
    return key_bias, thin, tier


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--slug", required=True)
    parser.add_argument("--input", required=True)
    parser.add_argument("--status", default="fixing")
    args = parser.parse_args()
    load_env()
    questions = uniquify(args.slug, json.loads(Path(args.input).read_text()))
    meta = json.loads(META_PATH.read_text()).get(args.slug, {}) if META_PATH.exists() else {}
    key_bias, thin, tier = smell(questions)
    payload = {
        "bank": {
            "slug": args.slug,
            "title": meta.get("title") or args.slug,
            "vertical": meta.get("vertical") or "",
            "family_id": meta.get("family_id") or "",
            "linked_deck_slug": meta.get("linked_deck_slug") or "",
            "session_question_count": str(meta.get("session_question_count") or ""),
            "last_updated": "2026-09-21",
            "review_status": args.status,
            "smell_tier": tier,
            "key_bias": key_bias,
            "thin_distractor_count": thin,
            "source_path": f"/tmp/{args.slug}-fixed.json",
            "audit_note": f"2026-09-21 Grok batch fix upsert ({args.status})",
        },
        "questions": questions,
    }
    url = (os.environ.get("PREP2GO_SUPABASE_URL") or os.environ["SUPABASE_URL"]).rstrip("/")
    key = os.environ.get("PREP2GO_SUPABASE_SERVICE_ROLE_KEY") or os.environ["SUPABASE_SERVICE_ROLE_KEY"]
    req = urllib.request.Request(
        f"{url}/rest/v1/rpc/ops_upsert_mock_bank",
        data=json.dumps({"payload": payload}).encode(),
        headers={
            "apikey": key,
            "Authorization": f"Bearer {key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    with urllib.request.urlopen(req) as resp:
        body = json.loads(resp.read().decode())
    print(
        json.dumps(
            {
                "upsert": body,
                "review_status": args.status,
                "smell_tier": tier,
                "thin": thin,
                "topics": dict(Counter(q.get("topicId") for q in questions)),
                "n": len(questions),
            },
            ensure_ascii=False,
            indent=2,
        )
    )


if __name__ == "__main__":
    main()
