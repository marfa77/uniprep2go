#!/usr/bin/env python3
"""Build all Wave 2 banks in this folder that expose main()."""

from __future__ import annotations

import importlib
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))

MODULES = [
    "nasm_cpt",
    "esthetician_state",
    "cdl_hazmat",
    "aswb_masters",
    "cdl_passenger",
    "issa_cpt",
    "ny_real_estate",
    "cda_childcare",
    "ace_cpt",
    "cdl_school_bus",
    "nbrc_tmc",
    "pest_control",
]


def main() -> None:
    for name in MODULES:
        mod = importlib.import_module(name)
        mod.main()


if __name__ == "__main__":
    main()
