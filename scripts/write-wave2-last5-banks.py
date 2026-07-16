#!/usr/bin/env python3
"""Write complete 60Q Wave-2 banks for AAMA CMA, DANB GC, NBDHE, ASCP MLS, RD Exam."""
from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
sys.path.insert(0, str(ROOT))

from wave2_banks._common import write_bank  # noqa: E402
from wave2_banks.aama_cma import build as aama  # noqa: E402
from wave2_banks.danb_gc import build as danb  # noqa: E402
from wave2_banks.nbdhe import build as nbdhe  # noqa: E402
from wave2_banks.ascp_mls import build as ascp  # noqa: E402
from wave2_banks.rd_exam import build as rd  # noqa: E402


def main() -> None:
    banks = [
        ("aama-cma-readiness-check", aama()),
        ("danb-gc-readiness-check", danb()),
        ("nbdhe-readiness-check", nbdhe()),
        ("ascp-mls-readiness-check", ascp()),
        ("rd-exam-readiness-check", rd()),
    ]
    for slug, qs in banks:
        write_bank(slug, qs)
    print("TOTAL:", sum(len(qs) for _, qs in banks))


if __name__ == "__main__":
    main()
