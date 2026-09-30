#!/usr/bin/env python3
"""Upsert /tmp/enrich/{slug}.json banks into ops, keeping each bank's metadata and review_status.

Inputs:
  /tmp/enrich/changed.json   slugs to apply (from enrich-banks.py diff)
  /tmp/ops-bank-rows.json    current ops.mock_banks rows (title, status, …)
  /tmp/ops-bank-meta.json    registry metadata, used only where the ops row is blank
"""

from __future__ import annotations

import argparse
import importlib.util
import json
import sys
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location("apply_ops_bank", HERE / "apply-ops-bank.py")
base = importlib.util.module_from_spec(spec)
spec.loader.exec_module(base)

NOTE = "2026-09-30 enrichment: finance boilerplate distractors restored from git history, template notes stripped, truncations fixed"


def payload_for(slug: str, rows: dict, meta: dict) -> dict:
    row = rows[slug]
    fallback = meta.get(slug, {})
    questions = base.uniquify(slug, json.loads(Path(f"/tmp/enrich/{slug}.json").read_text()))
    key_bias, thin, tier = base.smell(questions)

    def pick(key: str) -> str:
        value = row.get(key)
        if value in (None, "") or (key == "title" and value == slug):
            value = fallback.get(key)
        return "" if value is None else str(value)

    return {
        "bank": {
            "slug": slug,
            "title": pick("title") or slug,
            "vertical": pick("vertical"),
            "family_id": pick("family_id"),
            "linked_deck_slug": pick("linked_deck_slug"),
            "session_question_count": pick("session_question_count"),
            "last_updated": "2026-09-30",
            "review_status": row["review_status"],
            "smell_tier": tier,
            "key_bias": key_bias,
            "thin_distractor_count": thin,
            "source_path": "scripts/ops-mock-banks/enrich-banks.py",
            "audit_note": NOTE,
        },
        "questions": questions,
    }


def post(payload: dict) -> dict:
    import os

    url = (os.environ.get("PREP2GO_SUPABASE_URL") or os.environ["SUPABASE_URL"]).rstrip("/")
    key = os.environ.get("PREP2GO_SUPABASE_SERVICE_ROLE_KEY") or os.environ["SUPABASE_SERVICE_ROLE_KEY"]
    req = urllib.request.Request(
        f"{url}/rest/v1/rpc/ops_upsert_mock_bank",
        data=json.dumps({"payload": payload}).encode(),
        headers={"apikey": key, "Authorization": f"Bearer {key}", "Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=120) as resp:
        return json.loads(resp.read().decode())


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("slugs", nargs="*")
    parser.add_argument("--write", action="store_true")
    args = parser.parse_args()
    base.load_env()
    rows = json.loads(Path("/tmp/ops-bank-rows.json").read_text())
    meta = json.loads(Path("/tmp/ops-bank-meta.json").read_text())
    slugs = args.slugs or json.loads(Path("/tmp/enrich/changed.json").read_text())
    payloads = [payload_for(s, rows, meta) for s in slugs]
    for p in payloads:
        b = p["bank"]
        if not b["vertical"] or b["title"] == b["slug"]:
            print("BLANK META", b["slug"], file=sys.stderr)
    if not args.write:
        print(json.dumps([{k: p["bank"][k] for k in ("slug", "title", "review_status", "smell_tier")} | {"n": len(p["questions"])} for p in payloads[:5]], indent=1))
        print(f"dry-run: {len(payloads)} banks")
        return

    def run(p: dict) -> tuple[str, str]:
        try:
            post(p)
            return p["bank"]["slug"], "ok"
        except Exception as exc:  # noqa: BLE001
            return p["bank"]["slug"], f"ERR {exc}"

    with ThreadPoolExecutor(max_workers=4) as pool:
        results = list(pool.map(run, payloads))
    bad = [r for r in results if r[1] != "ok"]
    print(f"applied {len(results) - len(bad)} / {len(results)}")
    for slug, err in bad:
        print(slug, err)


if __name__ == "__main__":
    main()
