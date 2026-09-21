#!/usr/bin/env python3
"""Export ready ops banks to src/data/mock-exams when they differ from git.

Skips civic / naturalization. Usage:
  python3 scripts/ops-mock-banks/export-ready-to-git.py [--write] [slug ...]
If no slugs given, exports every ready non-civic bank listed in bank-meta.json
plus any extra slugs passed in.
"""

from __future__ import annotations

import argparse
import json
import os
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent
REPO = ROOT.parent.parent
BANK_DIR = REPO / "src/data/mock-exams"
META_PATH = ROOT / "bank-meta.json"

CIVIC_VERTICALS = {"citizenship"}
CIVIC_FAMILIES = {"citizenship", "naturalization"}
QUESTION_KEYS = (
    "id",
    "examSlug",
    "topicId",
    "prompt",
    "formula",
    "options",
    "correctOptionId",
    "explanation",
    "distractorExplanations",
    "difficulty",
    "sourceNote",
)


def load_env() -> None:
    path = REPO / ".env.local"
    if not path.exists():
        return
    for line in path.read_text().splitlines():
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, _, value = line.partition("=")
        os.environ.setdefault(key.strip(), value.strip().strip("'").strip('"'))


def is_civic(slug: str, meta: dict) -> bool:
    row = meta.get(slug) or {}
    if row.get("vertical") in CIVIC_VERTICALS:
        return True
    if row.get("family_id") in CIVIC_FAMILIES:
        return True
    markers = (
        "citizenship",
        "naturalisation",
        "naturalizzazione",
        "leben-in-deutschland",
        "ccse-espana",
        "nacionalidade",
        "indfoedsret",
        "statsborger",
        "medborgarskap",
        "kansalaisuus",
        "vivre-ensemble",
        "flanders-mo",
        "wallonie",
    )
    return any(marker in slug for marker in markers)


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
        payload = json.loads(resp.read().decode())
    if isinstance(payload, list):
        return payload
    if isinstance(payload, dict) and isinstance(payload.get("questions"), list):
        return payload["questions"]
    raise SystemExit(f"{slug}: unexpected ops payload {type(payload)}")


def normalize_question(question: dict) -> dict:
    item = {}
    for key in QUESTION_KEYS:
        if key not in question:
            continue
        value = question[key]
        if value is None or value == "":
            continue
        item[key] = value
    return item


def normalize_bank(questions: list[dict]) -> list[dict]:
    return [normalize_question(question) for question in questions]


def changed_ids(git_q: list[dict], ops_q: list[dict]) -> list[str]:
    git_map = {q.get("id"): normalize_question(q) for q in git_q}
    ops_map = {q.get("id"): normalize_question(q) for q in ops_q}
    ids = []
    for qid in sorted(set(git_map) | set(ops_map)):
        if git_map.get(qid) != ops_map.get(qid):
            ids.append(str(qid))
    return ids


def write_bank(path: Path, questions: list[dict]) -> None:
    path.write_text(json.dumps(normalize_bank(questions), ensure_ascii=False, indent=2) + "\n")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--write", action="store_true")
    parser.add_argument("slugs", nargs="*")
    args = parser.parse_args()
    load_env()
    meta = json.loads(META_PATH.read_text()) if META_PATH.exists() else {}
    slugs = args.slugs or sorted(meta)
    rows = []
    for slug in slugs:
        if is_civic(slug, meta):
            rows.append({"slug": slug, "status": "skip-civic"})
            continue
        ops = fetch_bank(slug)
        git_path = BANK_DIR / f"{slug}.json"
        git_q = json.loads(git_path.read_text()) if git_path.exists() else []
        ids = changed_ids(git_q, ops)
        if not ids and len(git_q) == len(ops):
            rows.append({"slug": slug, "status": "same", "n": len(ops)})
            continue
        deck = (meta.get(slug) or {}).get("linked_deck_slug") or ""
        row = {
            "slug": slug,
            "status": "changed",
            "n_ops": len(ops),
            "n_git": len(git_q),
            "changed": len(ids),
            "deck": deck,
        }
        rows.append(row)
        if args.write:
            write_bank(git_path, ops)
            row["wrote"] = str(git_path)
    print(json.dumps(rows, ensure_ascii=False, indent=2))
    changed = [row for row in rows if row["status"] == "changed"]
    print(
        f"# skip-civic={sum(1 for r in rows if r['status']=='skip-civic')} "
        f"same={sum(1 for r in rows if r['status']=='same')} "
        f"changed={len(changed)} write={args.write}",
        file=sys.stderr,
    )


if __name__ == "__main__":
    main()
