#!/usr/bin/env python3
"""Generate all Wave 4 mock banks (50 × 60Q) and emit wave4-banks.ts."""

from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SYS_PATH = Path(__file__).resolve().parent
if str(SYS_PATH) not in sys.path:
    sys.path.insert(0, str(SYS_PATH))

from _common import write_bank  # noqa: E402
from re_national import build_national_for_slug  # noqa: E402
from re_state_law import STATES, build_state_law  # noqa: E402

NON_RE = [
    ("series_79", "series-79-readiness-check"),
    ("cfp_certification", "cfp-certification-readiness-check"),
    ("life_health_insurance", "life-health-insurance-readiness-check"),
    ("praxis_elementary", "praxis-elementary-education-readiness-check"),
    ("praxis_special_ed", "praxis-special-education-readiness-check"),
    ("water_treatment", "water-treatment-operator-1-readiness-check"),
    ("electrical_journeyman", "electrical-journeyman-readiness-check"),
    ("plumbing_journeyman", "plumbing-journeyman-readiness-check"),
    ("nremt_emr", "nremt-emr-readiness-check"),
    ("pharmacy_excpt", "pharmacy-technician-excpt-readiness-check"),
    ("armed_security", "armed-security-officer-readiness-check"),
    ("medical_billing", "medical-billing-specialist-readiness-check"),
    ("vtne", "veterinary-technician-vtne-readiness-check"),
    ("shrm_scp", "shrm-scp-readiness-check"),
    ("series_99", "series-99-readiness-check"),
    ("medicare_counseling", "medicare-counseling-readiness-check"),
]


def slug_to_import_name(slug: str) -> str:
    return re.sub(r"[^a-zA-Z0-9]", "_", slug.replace("-readiness-check", "")) + "Bank"


def emit_wave4_banks_ts(slugs: list[str]) -> None:
    lines = [
        "/* Auto-generated Wave 4 bank map — do not edit by hand; run scripts/wave4-banks/generate_wave4_banks.py */",
        'import type { MockQuestion } from "./types";',
    ]
    for slug in slugs:
        var = slug_to_import_name(slug)
        lines.append(f'import {var} from "@/data/mock-exams/{slug}.json";')
    lines.append("")
    lines.append("export const wave4BanksBySlug: Record<string, MockQuestion[]> = {")
    for slug in slugs:
        var = slug_to_import_name(slug)
        lines.append(f'  "{slug}": {var} as unknown as MockQuestion[],')
    lines.append("};")
    lines.append("")
    out = ROOT / "src/lib/mock-exams/wave4-banks.ts"
    out.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"wrote {out}")


def main() -> None:
    slugs: list[str] = []

    for mod_name, slug in NON_RE:
        mod = __import__(mod_name)
        qs = mod.build()
        write_bank(slug, qs)
        slugs.append(slug)

    for exam_id, state_name, commission, topic_id in STATES:
        slug = f"{exam_id}-readiness-check"
        qs = build_national_for_slug(slug)
        qs += build_state_law(slug, state_name, commission, topic_id)
        write_bank(slug, qs)
        slugs.append(slug)

    assert len(slugs) == 50, len(slugs)
    emit_wave4_banks_ts(slugs)
    print(f"Wave 4 banks ready: {len(slugs)}")


if __name__ == "__main__":
    main()
