#!/usr/bin/env python3
"""Audit several ops banks. Prints one summary line each plus JSON to /tmp."""

from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SLUGS = [
    "leben-in-deutschland-readiness-check",
    "naturalisation-francaise-readiness-check",
    "belgium-flanders-mo-readiness-check",
    "luxembourg-vivre-ensemble-readiness-check",
    "ccse-espana-readiness-check",
    "portugal-nacionalidade-readiness-check",
    "czech-citizenship-readiness-check",
    "denmark-indfoedsretsproeven-readiness-check",
    "norway-statsborgerproven-readiness-check",
    "leed-ap-bd-c-readiness-check",
]


def main() -> None:
    slugs = sys.argv[1:] or SLUGS
    rows = []
    for slug in slugs:
        raw = subprocess.check_output(
            [sys.executable, str(ROOT / "audit-one-bank.py"), "--slug", slug],
            text=True,
        )
        report = json.loads(raw)
        Path(f"/tmp/audit-{slug}.json").write_text(json.dumps(report, ensure_ascii=False, indent=2))
        rows.append(report)
        print(
            f"{report['slug']}\tn={report['n']}\tthin={report['thin_distractors']}\t"
            f"copies={report['explanation_copies_correct']}\tshort={report['short_explanations']}\t"
            f"collide={report['colliding_option_items']}\tverdict={report['verdict']}"
        )
    Path("/tmp/audit-batch-10.json").write_text(json.dumps(rows, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
