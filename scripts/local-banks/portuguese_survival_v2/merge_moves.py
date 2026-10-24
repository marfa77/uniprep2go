#!/usr/bin/env python3
"""Merge scene chunk JSONs → moves.json and print coverage."""
from __future__ import annotations

import json
import sys
from collections import Counter
from pathlib import Path

from validate_moves import SCENES, validate

ROOT = Path(__file__).resolve().parents[3]
TMP = ROOT / "tmp" / "portuguese-survival-v2"
OUT = TMP / "moves.json"
COVERAGE = TMP / "coverage.json"


def main() -> None:
    chunks = sorted(TMP.glob("out_*.json"))
    if not chunks:
        print("FAIL: no out_*.json in", TMP)
        sys.exit(1)
    rows: list[dict] = []
    for p in chunks:
        errs = validate(p)
        if errs:
            print("FAIL", p.name, len(errs))
            print("\n".join(errs[:40]))
            sys.exit(1)
        part = json.loads(p.read_text(encoding="utf-8"))
        rows.extend(part)
        print("OK", p.name, len(part))

    ids = [r["id"] for r in rows]
    if len(ids) != len(set(ids)):
        dup = [i for i, c in Counter(ids).items() if c > 1]
        print("FAIL duplicate ids:", dup[:20])
        sys.exit(1)

    by_scene: dict[str, Counter] = {s: Counter() for s in SCENES}
    for r in rows:
        by_scene[r["scene"]][r["type"]] += 1
        by_scene[r["scene"]]["total"] += 1

    cov = {
        s: {
            "say": by_scene[s]["say"],
            "hear": by_scene[s]["hear"],
            "repair": by_scene[s]["repair"],
            "total": by_scene[s]["total"],
        }
        for s in SCENES
    }
    cov["grand_total"] = len(rows)
    COVERAGE.write_text(json.dumps(cov, indent=2) + "\n", encoding="utf-8")
    OUT.write_text(json.dumps(rows, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("MERGED", len(rows), "→", OUT)
    print(json.dumps(cov, indent=2))


if __name__ == "__main__":
    main()
