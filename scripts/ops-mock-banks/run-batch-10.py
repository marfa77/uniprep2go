#!/usr/bin/env python3
"""Audit-fix the current 10-bank batch. Ops only."""

from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
REPO = ROOT.parent.parent
BANK_DIR = REPO / "src/data/mock-exams"

REWRITE = {
    "leben-in-deutschland-readiness-check": "factory",
    "naturalisation-francaise-readiness-check": "factory",
    "ccse-espana-readiness-check": "factory",
    "leed-ap-bd-c-readiness-check": "leed",
}
KEEP_READY = [
    "belgium-flanders-mo-readiness-check",
    "luxembourg-vivre-ensemble-readiness-check",
    "portugal-nacionalidade-readiness-check",
    "czech-citizenship-readiness-check",
    "denmark-indfoedsretsproeven-readiness-check",
    "norway-statsborgerproven-readiness-check",
]


def run(cmd: list[str]) -> str:
    print("+", " ".join(cmd), flush=True)
    return subprocess.check_output(cmd, text=True)


def main() -> None:
    for slug, mode in REWRITE.items():
        src = BANK_DIR / f"{slug}.json"
        print(run([sys.executable, str(ROOT / "fix-ops-bank.py"), "--slug", slug, "--input", str(src), "--mode", mode]))
        print(
            run(
                [
                    sys.executable,
                    str(ROOT / "apply-ops-bank.py"),
                    "--slug",
                    slug,
                    "--input",
                    f"/tmp/{slug}-fixed.json",
                    "--status",
                    "ready",
                ]
            )
        )
    for slug in KEEP_READY:
        print(
            run(
                [
                    sys.executable,
                    str(ROOT / "apply-ops-bank.py"),
                    "--slug",
                    slug,
                    "--input",
                    str(BANK_DIR / f"{slug}.json"),
                    "--status",
                    "ready",
                ]
            )
        )
    slugs = list(REWRITE) + KEEP_READY
    print(run([sys.executable, str(ROOT / "audit-batch.py"), *slugs]))


if __name__ == "__main__":
    main()
