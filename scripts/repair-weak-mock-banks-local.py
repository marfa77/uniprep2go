#!/usr/bin/env python3
"""Local-only repairs for weak Wave-3 template banks (no LLM).

1) Rebuild 12 state RE mocks from Wave-4 national + state-law packs.
2) Remap sibling quality banks onto matching weak templates.
"""

from __future__ import annotations

import hashlib
import json
import sys
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "src/data/mock-exams"
sys.path.insert(0, str(ROOT / "scripts/wave4-banks"))

from _common import pack  # noqa: E402
from re_national import national_rows  # noqa: E402
from re_state_law import build_state_law  # noqa: E402

RE_SOURCE = "Original UniPrep2Go local bank (Wave 3 quality — repaired from template)."
REMAP_SOURCE = "Original UniPrep2Go local bank (Wave 3 quality — remapped from sibling bank)."

WAVE3_RE = [
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

REMAPS = [
    ("shrm-scp-readiness-check", "shrm-cp-readiness-check", {
        "people": "people", "organization": "organization", "workplace": "workplace", "leadership": "strategy",
    }),
    ("water-treatment-operator-1-readiness-check", "wastewater-operator-1-readiness-check", {
        "treatment": "process", "safety": "safety", "labs": "labs", "regs": "regs",
    }),
    ("series-65-readiness-check", "series-66-readiness-check", {
        "products": "products", "client": "recommendations", "ethics": "ethics", "economics": "state-law",
    }),
    ("series-65-readiness-check", "series-6-readiness-check", {
        "products": "products", "client": "suitability", "ethics": "regulations", "economics": "retirement",
    }),
    ("nasm-cpt-readiness-check", "acsm-cpt-readiness-check", {
        "assessment": "assessment", "program-design": "programming", "basics-anatomy": "science", "nutrition-biz": "behavior",
    }),
    ("nasm-cpt-readiness-check", "nsca-cpt-readiness-check", {
        "assessment": "assessment", "program-design": "program-design", "basics-anatomy": "technique", "nutrition-biz": "safety",
    }),
    ("nasm-cpt-readiness-check", "cscs-nsca-readiness-check", {
        "basics-anatomy": "exercise-sci", "nutrition-biz": "nutrition", "program-design": "program-design", "assessment": "organization",
    }),
    ("nremt-emt-readiness-check", "nremt-aemt-readiness-check", {
        "airway-respiration": "airway", "cardiology-resuscitation": "pharm", "medical-ops": "medical", "trauma": "trauma",
    }),
    ("shrm-scp-readiness-check", "phr-hrci-readiness-check", {
        "people": "talent", "organization": "employee-rel", "workplace": "comp-ben", "leadership": "compliance",
    }),
    ("aswb-masters-readiness-check", "aswb-bachelors-readiness-check", {
        "human-dev": "hgb", "assessment": "assessment", "practice": "intervention", "ethics": "ethics",
    }),
    ("aswb-masters-readiness-check", "aswb-clinical-readiness-check", {
        "assessment": "assessment", "human-dev": "diagnosis", "practice": "psychotherapy", "ethics": "ethics",
    }),
    ("servsafe-manager-mock", "servsafe-food-handler-readiness-check", {
        "foodborne-illness": "contamination",
        "personal-hygiene-contamination": "hygiene",
        "time-temperature": "time-temp",
        "cleaning-storage": "cleaning",
    }),
]


def load(slug: str) -> list[dict]:
    return json.loads((OUT / f"{slug}.json").read_text(encoding="utf-8"))


def write(slug: str, questions: list[dict], source: str) -> None:
    by: dict[str, list[dict]] = defaultdict(list)
    for q in questions:
        by[q["topicId"]].append(q)
    out: list[dict] = []
    for topic, items in by.items():
        for i, q in enumerate(items, 1):
            nq = dict(q)
            nq.update(
                id=f"{slug}-{topic}-{i:03d}",
                examSlug=slug,
                topicId=topic,
                sourceNote=source,
            )
            out.append(nq)
    (OUT / f"{slug}.json").write_text(
        json.dumps(out, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
    )
    print(f"{slug}: {len(out)} {dict(Counter(q['topicId'] for q in out))}")


def repair_re() -> None:
    for exam_id, state, commission, finance_topic, license_topic in WAVE3_RE:
        slug = f"{exam_id}-readiness-check"
        rows = national_rows()
        qs = []
        qs += pack(slug, "agency-law", rows["agency-law"])
        qs += pack(slug, "property-ownership", rows["property-ownership"])
        qs += pack(slug, finance_topic, rows["finance-closing"])
        qs += build_state_law(slug, state, commission, license_topic)
        write(slug, qs, RE_SOURCE)


def remap(src_slug: str, dst_slug: str, topic_map: dict[str, str], per_topic: int = 15) -> None:
    src = load(src_slug)
    by: dict[str, list[dict]] = defaultdict(list)
    for q in src:
        by[q["topicId"]].append(q)
    out: list[dict] = []
    for src_topic, dst_topic in topic_map.items():
        pool = list(by.get(src_topic, [])) + src
        seed = int(hashlib.sha256(f"{dst_slug}:{dst_topic}".encode()).hexdigest()[:8], 16)
        picked: list[dict] = []
        seen: set[str] = set()
        i = 0
        while len(picked) < per_topic and i < 10000:
            q = pool[(seed + i) % len(pool)]
            i += 1
            if q["prompt"] in seen:
                continue
            seen.add(q["prompt"])
            picked.append(dict(q, topicId=dst_topic))
        if len(picked) < per_topic:
            raise SystemExit(f"{dst_slug}/{dst_topic}: only {len(picked)}")
        out.extend(picked)
    write(dst_slug, out, REMAP_SOURCE)


def repair_unarmed() -> None:
    src = load("armed-security-officer-readiness-check")
    by: dict[str, list[dict]] = defaultdict(list)
    for q in src:
        by[q["topicId"]].append(q)

    def not_weapon(q: dict) -> bool:
        text = (q["prompt"] + " " + " ".join(o["text"] for o in q["options"])).lower()
        return not any(w in text for w in ("firearm", "weapon", "holster", "ammunition", "handgun"))

    out: list[dict] = []
    for topic in ("law", "patrol", "ethics"):
        out.extend(dict(q, topicId=topic) for q in by[topic][:15])
    emerg_pool = [q for q in src if not_weapon(q)]
    seen: set[str] = set()
    picked: list[dict] = []
    for q in emerg_pool:
        if q["prompt"] in seen:
            continue
        seen.add(q["prompt"])
        picked.append(dict(q, topicId="emergency"))
        if len(picked) == 15:
            break
    out.extend(picked)
    write("unarmed-security-officer-readiness-check", out, REMAP_SOURCE)


def repair_first_aid() -> None:
    aha = load("aha-bls-provider-readiness-check")
    out: list[dict] = []
    for topic in ("cpr", "bleeding", "medical", "injury"):
        seed = int(hashlib.sha256(f"first-aid:{topic}".encode()).hexdigest()[:8], 16)
        picked: list[dict] = []
        seen: set[str] = set()
        i = 0
        while len(picked) < 15 and i < 10000:
            q = aha[(seed + i) % len(aha)]
            i += 1
            if q["prompt"] in seen:
                continue
            seen.add(q["prompt"])
            picked.append(dict(q, topicId=topic))
        out.extend(picked)
    write("first-aid-cpr-readiness-check", out, REMAP_SOURCE)


def main() -> None:
    repair_re()
    for src, dst, mapping in REMAPS:
        remap(src, dst, mapping)
    repair_unarmed()
    repair_first_aid()
    print("local weak-bank repair complete")


if __name__ == "__main__":
    main()
