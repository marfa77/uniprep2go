#!/usr/bin/env python3
"""Replace Wave-3 template state RE banks with Wave-4 style national + state-law content."""

from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts/wave4-banks"))

from re_national import national_rows  # noqa: E402
from re_state_law import build_state_law  # noqa: E402
from _common import pack, write_bank  # noqa: E402

# Wave-3 template state RE mocks that still use "which action best reflects sound…" filler.
WAVE3_RE_STATES: list[tuple[str, str, str, str, str]] = [
    # exam_id, state, commission, finance_topic_id, license_topic_id
    ("az-real-estate", "Arizona", "Arizona Department of Real Estate", "finance-appraisal", "az-license-law"),
    ("ga-real-estate", "Georgia", "Georgia Real Estate Commission", "finance-closing", "ga-license-law"),
    ("il-real-estate", "Illinois", "IDFPR", "finance-math", "il-license-law"),
    ("oh-real-estate", "Ohio", "Ohio Division of Real Estate", "finance-appraisal", "oh-license-law"),
    ("pa-real-estate", "Pennsylvania", "Pennsylvania Real Estate Commission", "finance-closing", "pa-license-law"),
    ("nc-real-estate", "North Carolina", "NCREC", "finance-math", "nc-license-law"),
    ("va-real-estate", "Virginia", "Virginia DPOR", "finance-closing", "va-license-law"),
    ("wa-real-estate", "Washington", "Washington DOL", "finance-appraisal", "wa-license-law"),
    ("co-real-estate", "Colorado", "Colorado Real Estate Commission", "finance-closing", "co-license-law"),
    ("nj-real-estate", "New Jersey", "New Jersey Real Estate Commission", "finance-math", "nj-license-law"),
    ("ma-real-estate", "Massachusetts", "Massachusetts Board of Registration", "finance-closing", "ma-license-law"),
    ("mi-real-estate", "Michigan", "Michigan LARA", "finance-appraisal", "mi-license-law"),
]

SOURCE = "Original UniPrep2Go local bank (Wave 3 quality — repaired from template)."


def build_national(exam_slug: str, finance_topic: str) -> list[dict]:
    rows = national_rows()
    out: list[dict] = []
    out.extend(pack(exam_slug, "agency-law", rows["agency-law"]))
    out.extend(pack(exam_slug, "property-ownership", rows["property-ownership"]))
    # Reuse finance-closing stems under whatever finance topic id the config expects.
    out.extend(pack(exam_slug, finance_topic, rows["finance-closing"]))
    return out


def main() -> None:
    for exam_id, state, commission, finance_topic, license_topic in WAVE3_RE_STATES:
        slug = f"{exam_id}-readiness-check"
        qs = build_national(slug, finance_topic)
        qs += build_state_law(slug, state, commission, license_topic)
        write_bank(slug, qs)
        path = ROOT / "src/data/mock-exams" / f"{slug}.json"
        data = json.loads(path.read_text(encoding="utf-8"))
        for q in data:
            q["sourceNote"] = SOURCE
        path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
        print(f"repaired {slug}")


if __name__ == "__main__":
    main()
