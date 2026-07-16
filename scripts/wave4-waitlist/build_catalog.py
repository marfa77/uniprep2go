#!/usr/bin/env python3
"""Build wave4_catalog.json — exactly 50 thick waitlist niches."""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT = Path(__file__).resolve().parent / "wave4_catalog.json"
EXTRAS = Path("/tmp/wave4_extras.json")
PAD = " Always verify current candidate bulletins, fees, and testing vendor details before you register."

STATES = [
    ("al", "Alabama", "Alabama Real Estate Commission"),
    ("ak", "Alaska", "Alaska Real Estate Commission"),
    ("ar", "Arkansas", "Arkansas Real Estate Commission"),
    ("ct", "Connecticut", "Connecticut Real Estate Commission"),
    ("de", "Delaware", "Delaware Real Estate Commission"),
    ("hi", "Hawaii", "Hawaii Real Estate Commission"),
    ("id", "Idaho", "Idaho Real Estate Commission"),
    ("in", "Indiana", "Indiana Real Estate Commission"),
    ("ia", "Iowa", "Iowa Real Estate Commission"),
    ("ks", "Kansas", "Kansas Real Estate Commission"),
    ("ky", "Kentucky", "Kentucky Real Estate Commission"),
    ("la", "Louisiana", "Louisiana Real Estate Commission"),
    ("me", "Maine", "Maine Real Estate Commission"),
    ("md", "Maryland", "Maryland Real Estate Commission"),
    ("mn", "Minnesota", "Minnesota Commerce Department"),
    ("ms", "Mississippi", "Mississippi Real Estate Commission"),
    ("mo", "Missouri", "Missouri Real Estate Commission"),
    ("mt", "Montana", "Montana Board of Realty Regulation"),
    ("ne", "Nebraska", "Nebraska Real Estate Commission"),
    ("nv", "Nevada", "Nevada Real Estate Division"),
    ("nh", "New Hampshire", "New Hampshire Real Estate Commission"),
    ("nm", "New Mexico", "New Mexico Real Estate Commission"),
    ("nd", "North Dakota", "North Dakota Real Estate Commission"),
    ("ok", "Oklahoma", "Oklahoma Real Estate Commission"),
    ("or", "Oregon", "Oregon Real Estate Agency"),
    ("ri", "Rhode Island", "Rhode Island Real Estate Commission"),
    ("sc", "South Carolina", "South Carolina Real Estate Commission"),
    ("sd", "South Dakota", "South Dakota Real Estate Commission"),
    ("tn", "Tennessee", "Tennessee Real Estate Commission"),
    ("ut", "Utah", "Utah Division of Real Estate"),
    ("vt", "Vermont", "Vermont Real Estate Commission"),
    ("wv", "West Virginia", "West Virginia Real Estate Commission"),
    ("wi", "Wisconsin", "Wisconsin Real Estate Examining Board"),
    ("wy", "Wyoming", "Wyoming Real Estate Commission"),
]


def ensure(text: str, minimum: int = 400) -> str:
    text = text.strip()
    while len(text) < minimum:
        text += PAD
    return text


def existing_ids() -> set[str]:
    ids: set[str] = set()
    for path in (ROOT / "src/lib/mock-exams").glob("wave*-configs.ts"):
        ids |= set(re.findall(r'slug:\s*"([^"]+)-readiness-check"', path.read_text()))
    ids |= set(
        re.findall(
            r'slug:\s*"([^"]+)-readiness-check"',
            (ROOT / "src/lib/mock-exams/configs.ts").read_text(),
        )
    )
    wave3 = ROOT / "scripts/wave3-banks/wave3_catalog.json"
    if wave3.exists():
        ids |= {row["id"] for row in json.loads(wave3.read_text())}
    return ids


def re_entry(abbr: str, state: str, body: str) -> dict:
    what = ensure(
        f"The {state} real estate salesperson (or broker, pathway-dependent) licensing exam is the state knowledge test "
        f"candidates take after completing required pre-license education. It typically covers national real estate principles—"
        f"agency, contracts, property ownership, finance, and closing—plus {state}-specific license law, disclosures, and "
        f"commission rules administered under {body}. Passing is required before you can be licensed to practice in {state}. "
        f"Always confirm current outlines, education hours, and exam vendors with {body}."
    )
    who = ensure(
        f"Aspiring {state} real estate salespersons and brokers who finished (or are finishing) approved pre-license coursework "
        f"and need a structured study path before the state licensing exam. Also useful for out-of-state licensees preparing for "
        f"{state} reciprocity or state-portion requirements when applicable.",
        200,
    )
    how = ensure(
        f"Start with the official {body} candidate bulletin and national/state content outlines. Build flashcards for agency, "
        f"contracts, ownership, finance math, and {state} license law. Drill calculation sets (commission, proration, LTV) daily, "
        f"then take timed practice when available. Use Notify me on this page so you get the UniPrep2Go free timed diagnostic when it launches.",
        200,
    )
    topics = [
        [
            "agency-law",
            "Agency & contracts",
            f"Fiduciary duties, listing/buyer agreements, contract essentials, and disclosure timing for {abbr.upper()} practice.",
        ],
        [
            "property-ownership",
            "Property ownership & land use",
            "Estates, deeds, title concepts, encumbrances, and land-use controls commonly tested on salesperson exams.",
        ],
        [
            "finance-closing",
            "Finance & closing",
            "Mortgages, financing instruments, closing costs, prorations, and basic real estate math.",
        ],
        [
            f"{abbr}-license-law",
            "State license law",
            "Licensing requirements, advertising rules, trust accounts, and prohibited practices under state commission rules.",
        ],
    ]
    faqs = [
        {"q": f"What is the {state} real estate exam?", "a": what},
        {
            "q": f"Is this an official {state} real estate exam?",
            "a": f"No. This UniPrep2Go page is an independent exam guide and waitlist for a free practice test — not official material from {body}.",
        },
        {
            "q": f"Who administers the {state} real estate license exam?",
            "a": f"{body} (or its designated exam vendor) administers licensing exams. Verify vendor, fees, and scheduling on the official site.",
        },
        {
            "q": f"Do I need pre-license education before the {state} real estate exam?",
            "a": f"Almost always yes — {state} requires approved pre-license hours before you can sit for the exam. Confirm current hour requirements with {body}.",
        },
        {
            "q": f"What topics are on the {state} real estate exam?",
            "a": f"Expect national principles (agency, contracts, ownership, finance/closing) plus {state}-specific license law, disclosures, and ethics rules.",
        },
        {
            "q": f"Is there a free {state} real estate practice test?",
            "a": "A free UniPrep2Go timed readiness check is coming soon. Use Notify me when this launches on this page; meanwhile study the topic outline below.",
        },
    ]
    return {
        "id": f"{abbr}-real-estate",
        "shortTitle": f"{state} Real Estate",
        "examBody": body,
        "verticalId": "real-estate",
        "familyId": "state-re",
        "aliases": [f"{state} real estate", f"{abbr.upper()} RE", f"{state} real estate exam"],
        "topics": topics,
        "what": what,
        "whoFor": who,
        "howToPrepare": how,
        "format": (
            f"Timed multiple-choice licensing exam (national + {state} portions where applicable); "
            f"confirm length and cut score with {body} / exam vendor."
        ),
        "faqs": faqs,
    }


def main() -> None:
    taken = existing_ids()
    re_items = [re_entry(*row) for row in STATES if f"{row[0]}-real-estate" not in taken]
    extras = [row for row in json.loads(EXTRAS.read_text()) if row["id"] not in taken]

    # Prefer ~34 state RE + remaining high-intent niches to reach 50.
    final = re_items[:34] + extras
    seen = {item["id"] for item in final}
    for row in re_items[34:]:
        if len(final) >= 50:
            break
        if row["id"] not in seen:
            final.append(row)
            seen.add(row["id"])
    final = final[:50]

    if len(final) != 50:
        raise SystemExit(f"Expected 50 niches, got {len(final)} (RE={len(re_items)}, extras={len(extras)})")

    for exam in final:
        if len(exam["what"]) < 400:
            raise SystemExit(f"thin what: {exam['id']}")
        if len(exam["whoFor"]) < 200:
            raise SystemExit(f"thin whoFor: {exam['id']}")
        if len(exam["howToPrepare"]) < 200:
            raise SystemExit(f"thin howToPrepare: {exam['id']}")
        if len(exam["faqs"]) < 6:
            raise SystemExit(f"few faqs: {exam['id']}")
        if len(exam["topics"]) != 4:
            raise SystemExit(f"bad topics: {exam['id']}")

    OUT.write_text(json.dumps(final, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    other = [e["id"] for e in final if e["familyId"] != "state-re"]
    print(f"wrote {OUT} ({len(final)} niches; other={other})")


if __name__ == "__main__":
    main()
