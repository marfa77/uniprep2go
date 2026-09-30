#!/usr/bin/env python3
"""Spread correct-answer letters of fully rewritten patch items so a bank has no key bias.

Usage: python3 scripts/ops-mock-banks/rebalance-patch-keys.py PATCH.json [--bank /tmp/enrich/{slug}.json]
Only items that define every option (full rewrites) are permuted; texts, notes and
correctOptionId move together, so content is unchanged.
"""
import collections
import json
import sys
from pathlib import Path

LETTERS = ["a", "b", "c", "d"]


def main() -> None:
    path = Path(sys.argv[1])
    patches = json.loads(path.read_text())
    for slug, items in patches.items():
        bank_file = Path(f"/tmp/enrich/{slug}.json")
        counts = collections.Counter()
        rewritten = {i for i, p in items.items() if set(p.get("options", {})) >= set(LETTERS)}
        if bank_file.exists():
            for q in json.loads(bank_file.read_text()):
                if q["id"] not in rewritten:
                    counts[q["correctOptionId"]] += 1
        for item_id in sorted(rewritten):
            p = items[item_id]
            target = min(LETTERS, key=lambda l: (counts[l], LETTERS.index(l)))
            cur = p["correctOptionId"]
            if target != cur:
                opts = p["options"]
                opts[cur], opts[target] = opts[target], opts[cur]
                notes = p.get("distractorExplanations", {})
                notes[cur] = notes.pop(target)
                p["correctOptionId"] = target
            counts[target] += 1
        print(slug, dict(counts))
    path.write_text(json.dumps(patches, ensure_ascii=False, indent=2) + "\n")


if __name__ == "__main__":
    main()
