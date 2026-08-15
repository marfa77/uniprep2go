#!/usr/bin/env python3
"""Enrich Gumroad building/academic Anki products: exam context, FAQ, sample screenshots."""

from __future__ import annotations

import argparse
import json
import re
import subprocess
import urllib.request
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
SPECS_PATH = ROOT / "src/data/building-deck-specs.json"
CATALOG_PATH = ROOT / "src/data/gumroad/building-anki-decks.json"
SAMPLES_DIR = ROOT / "public/samples"
TEST_PREP = "education/test-prep"

# Cold-traffic copy for Gumroad search / recommendations (no site context assumed).
EXAM_CONTEXT: dict[str, dict[str, str]] = {
    "cdcp-anki-deck": {
        "exam_name": "Certified Data Centre Professional — CDCP (EXIN / EPI)",
        "blurb": (
            "EXIN EPI CDCP is a foundational data-centre facility credential: 40 multiple-choice "
            "questions in 60 minutes with a 68% pass mark (27/40). Accredited EPI training is "
            "typically required before sitting the exam."
        ),
        "covers": (
            "This deck drills site/standards/building, power & EMF, cooling/water/thermal, "
            "fire/security/network, and operations MCQs with explanations on every card."
        ),
        "disclaimer": "EXIN / EPI",
    },
    "gre-anki-deck": {
        "exam_name": "GRE General Test (ETS)",
        "blurb": (
            "The GRE General Test is ETS's graduate admissions exam used by many master's, "
            "MBA, and PhD programs. Official section scores: Verbal Reasoning 130–170, "
            "Quantitative Reasoning 130–170, plus Analytical Writing 0–6."
        ),
        "covers": (
            "This deck drills Verbal Reasoning and Quantitative Reasoning MCQs "
            "(sentence equivalence, text completion, RC-style judgment, and Quant problem solving). "
            "Analytical Writing essays are not included."
        ),
        "disclaimer": "ETS",
    },
    "gmat-focus-anki-deck": {
        "exam_name": "GMAT Focus Edition (GMAC)",
        "blurb": (
            "The GMAT Focus Edition is GMAC's graduate management admissions exam "
            "(Quantitative Reasoning, Verbal Reasoning, and Data Insights; total score 205–805)."
        ),
        "covers": "This deck covers Quant, Verbal, and Data Insights style MCQ drills for daily spaced repetition.",
        "disclaimer": "GMAC",
    },
    "sat-anki-deck": {
        "exam_name": "Digital SAT (College Board)",
        "blurb": (
            "The Digital SAT is College Board's college admissions exam with two scored sections: "
            "Reading and Writing, and Math (total 400–1600)."
        ),
        "covers": "This deck drills Reading & Writing and Math skills aligned to Digital SAT section practice.",
        "disclaimer": "College Board",
    },
    "pmp-anki-deck": {
        "exam_name": "Project Management Professional — PMP (PMI)",
        "blurb": (
            "The PMP is PMI's project management certification exam based on the Exam Content Outline "
            "(People, Process, and Business Environment domains)."
        ),
        "covers": "This deck drills ECO-aligned scenario MCQs across People, Process, and Business Environment.",
        "disclaimer": "PMI",
    },
    "leed-ap-om-anki-deck": {
        "exam_name": "LEED AP Operations + Maintenance (GBCI / USGBC)",
        "blurb": (
            "LEED AP O+M is GBCI's specialty credential for existing-building operations and maintenance. "
            "Candidates typically need an active LEED Green Associate for the specialty-only path."
        ),
        "covers": (
            "This deck covers process/integrative planning, site & transportation, water, energy & atmosphere, "
            "and materials/IEQ for O+M performance-period style questions."
        ),
        "disclaimer": "USGBC / GBCI",
    },
    "leed-green-associate-anki-deck": {
        "exam_name": "LEED Green Associate (GBCI / USGBC)",
        "blurb": "LEED Green Associate is GBCI's foundational green-building credential.",
        "covers": "High-yield LEED GA domain drills for spaced repetition.",
        "disclaimer": "USGBC / GBCI",
    },
    "leed-ap-bd-c-anki-deck": {
        "exam_name": "LEED AP BD+C (GBCI / USGBC)",
        "blurb": "LEED AP Building Design + Construction is GBCI's specialty credential for design/construction projects.",
        "covers": "BD+C specialty domain drills for daily review.",
        "disclaimer": "USGBC / GBCI",
    },
    "well-ap-anki-deck": {
        "exam_name": "WELL Accredited Professional — WELL AP (IWBI / GBCI)",
        "blurb": (
            "WELL AP is IWBI’s credential for human health in the built environment (WELL Building Standard v2). "
            "GBCI administers the exam: 115 MCQ (100 scored + 15 unscored) in 2.5 hours, scaled pass 170 (125–200)."
        ),
        "covers": (
            "This deck drills Air, Water, Nourishment, Light, Movement, Thermal Comfort, Sound, Materials, "
            "Mind, Community, and WELL Certification / Portfolio process MCQs with explanations on every card."
        ),
        "disclaimer": "IWBI / GBCI",
    },
}


def build_faq(spec: dict, ctx: dict[str, str] | None) -> str:
    exam = ctx["exam_name"] if ctx else spec.get("deckName") or spec["deckLabel"]
    disclaimer = (ctx or {}).get("disclaimer") or spec.get("disclaimerOrg") or spec["deckLabel"]
    what_q = (
        f"<p><strong>What exam is this for?</strong><br>{ctx['blurb']}</p>"
        if ctx
        else f"<p><strong>What exam is this for?</strong><br>{exam} exam prep via spaced-repetition Anki flashcards.</p>"
    )
    covers = (
        f"<p><strong>What does the deck cover?</strong><br>{ctx['covers']}</p>" if ctx else ""
    )
    return f"""<hr><h2><strong>FAQ</strong></h2>
{what_q}
{covers}
<p><strong>Is there a free practice test?</strong><br>Yes — take the free timed readiness check at
<a href="https://uniprep2go.study/mock-exams/{spec['mockSlug']}">uniprep2go.study/mock-exams/{spec['mockSlug']}</a>
(same validated item bank as this deck).</p>
<p><strong>Is this official exam material?</strong><br>No. Independent study aid — not affiliated with, endorsed by, or sponsored by {disclaimer}.</p>
<p><strong>Does this guarantee I will pass?</strong><br>No. The deck improves retention and exam readiness; your results depend on how consistently you study.</p>
<p><strong>Can I use it on my phone?</strong><br>Yes. Import the <code>.apkg</code> on Anki desktop, then sync to AnkiMobile (iOS) or AnkiDroid (Android).</p>
<p><strong>What file format is delivered?</strong><br>Digital download: Anki-compatible <code>.apkg</code> file through Gumroad.</p>
<p><strong>Refunds?</strong><br>Digital download — all sales final.</p>"""


def token() -> str:
    return subprocess.run(
        ["gumroad", "auth", "token"], capture_output=True, text=True, check=True
    ).stdout.strip()


def build_tags(spec: dict) -> list[str]:
    label = spec["deckLabel"].lower()
    parts = re.split(r"[/\s]+", label)
    tags = [parts[0], "anki", "flashcards", "test prep"]
    if len(parts) > 1 and len(parts[1]) <= 18:
        tags.insert(1, parts[1])
    prefix = spec.get("tagPrefix", "")
    if prefix and prefix not in tags and len(prefix) <= 18:
        tags.insert(0, prefix)
    return [t[:20] for t in tags[:6]]


def sample_paths(spec: dict) -> list[Path]:
    slug = spec["deckSlug"]
    paths = [SAMPLES_DIR / f"{slug}-sample-{i}.webp" for i in range(1, 4)]
    return [p for p in paths if p.exists()]


def build_sample_section(spec: dict) -> str:
    """Fallback description note only.

    Gumroad strips <img> from the default description. Sample screenshots live in the
    custom landing page Sample cards section (see publish-building-gumroad-landings.py).
    Do not upload samples as product covers.
    """
    if not sample_paths(spec):
        return ""
    return """<hr><h2><strong>Sample cards</strong></h2>
<p>Real screenshots from the deck (question, four options, correct answer, and explanation) are shown on this product page in the Sample cards section.</p>"""


def build_description(spec: dict) -> str:
    count = spec["cardCount"]
    topics = list(spec["topics"].values())
    topic_items = "".join(f"<li>{t}</li>" for t in topics[:8])
    per_topic = count // max(len(topics), 1)
    ctx = EXAM_CONTEXT.get(spec["deckSlug"])
    exam_name = ctx["exam_name"] if ctx else (spec.get("deckName") or spec["deckLabel"])
    blurb = (
        f"<p><strong>Exam:</strong> {ctx['blurb']}</p><p>{ctx['covers']}</p>"
        if ctx
        else f"<p><strong>Exam:</strong> Prep for <strong>{exam_name}</strong> using spaced-repetition Anki flashcards.</p>"
    )
    samples = build_sample_section(spec)
    faq = build_faq(spec, ctx)
    disclaimer = (ctx or {}).get("disclaimer") or spec.get("disclaimerOrg") or spec["deckLabel"]
    return f"""<p><strong>{count} {spec['deckLabel']} Anki flashcards</strong> for the {exam_name} — MCQ format with explanations and distractor notes on every card.</p>
{blurb}
<p><strong>What's inside:</strong></p><ul>
<li>{count} high-yield MCQ cards (~{per_topic} per topic domain)</li>
{topic_items}
<li>Built from the same validated item bank as the free UniPrep2Go readiness check</li>
</ul>
<p><strong>Built for daily phone review.</strong> Import the .apkg into Anki desktop, sync to AnkiMobile or AnkiDroid, and run 15–25 cards per day between practice tests.</p>
<p>Also on UniPrep2Go: <a href="https://uniprep2go.study/decks/{spec['deckSlug']}">Anki deck page</a> · <a href="https://uniprep2go.study/mock-exams/{spec['mockSlug']}">free {spec['shortTitle']} check</a>.</p>
<p><em>Independent study aid. Not affiliated with or endorsed by {disclaimer}.</em></p>{samples}{faq}"""


def build_summary(spec: dict) -> str:
    ctx = EXAM_CONTEXT.get(spec["deckSlug"])
    topics = ", ".join(list(spec["topics"].values())[:3])
    if ctx:
        return f"{spec['cardCount']} Anki flashcards for the {ctx['exam_name']} — {topics}."
    return f"{spec['cardCount']} {spec['deckLabel']} Anki flashcards — {topics}."


def put_product(product_id: str, fields: dict[str, Any]) -> dict:
    auth = token()
    body = json.dumps(fields).encode()
    req = urllib.request.Request(
        f"https://api.gumroad.com/v2/products/{product_id}",
        data=body,
        method="PUT",
        headers={"Authorization": f"Bearer {auth}", "Content-Type": "application/json"},
    )
    with urllib.request.urlopen(req) as resp:
        return json.load(resp)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--slug", action="append", dest="slugs", help="Limit to deck slug(s)")
    args = parser.parse_args()

    specs = json.loads(SPECS_PATH.read_text(encoding="utf-8"))
    catalog = json.loads(CATALOG_PATH.read_text(encoding="utf-8"))
    results: list[str] = []

    for slug, record in catalog["products"].items():
        if args.slugs and slug not in args.slugs:
            continue
        product_id = record.get("gumroadProductId")
        if not product_id:
            results.append(f"SKIP  {slug} (no Gumroad id)")
            continue
        if slug not in specs:
            results.append(f"SKIP  {slug} (no spec)")
            continue
        spec = specs[slug]
        fields = {
            "name": spec["gumroadName"],
            "custom_permalink": spec["permalink"],
            "category": TEST_PREP,
            "tags": build_tags(spec),
            "description": build_description(spec),
        }
        try:
            resp = put_product(product_id, fields)
            if resp.get("success"):
                results.append(f"OK    {slug} (description)")
            else:
                results.append(f"FAIL  {slug}: {resp}")
        except Exception as exc:  # noqa: BLE001
            results.append(f"FAIL  {slug}: {exc}")

    print("\n".join(results))
    print(
        "\nNote: sample screenshots belong on the custom landing page — run "
        "scripts/publish-building-gumroad-landings.py (optionally --strip-sample-covers)."
    )


if __name__ == "__main__":
    main()
