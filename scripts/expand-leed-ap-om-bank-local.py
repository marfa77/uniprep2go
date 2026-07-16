#!/usr/bin/env python3
"""Expand LEED AP O+M readiness-check bank locally (no OpenRouter)."""

from __future__ import annotations

import json
import random
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BANK_PATH = ROOT / "src/data/mock-exams/leed-ap-om-readiness-check.json"
CACHE_DIR = ROOT / "src/data/mock-exams/.generation-cache/leed-ap-om-readiness-check"
EXAM_SLUG = "leed-ap-om-readiness-check"
SOURCE_NOTE = "Authored by UniPrep2Go (original readiness-check question)."

# Session weights × 5 → bank target 250
TOPIC_TARGETS = {
    "process-integrative": 50,
    "location-sites": 50,
    "water-efficiency": 50,
    "energy-atmosphere": 50,
    "materials-ieq": 50,
}


def option_set(correct_text: str, distractors: list[str], correct_slot: int):
    seen = {correct_text}
    unique = []
    for text in distractors:
        candidate = text
        bump = 1
        while candidate in seen:
            candidate = f"{text} (variant {bump})"
            bump += 1
        seen.add(candidate)
        unique.append(candidate)
    slot = correct_slot % 4
    ordered = unique[:slot] + [correct_text] + unique[slot:]
    ids = ["a", "b", "c", "d"]
    options = [{"id": ids[i], "text": ordered[i]} for i in range(4)]
    correct_id = ids[slot]
    distractor_explanations = {
        oid: "This choice misses the LEED O+M requirement or best practice for this credit path."
        for oid in ids
        if oid != correct_id
    }
    return options, correct_id, distractor_explanations


def make_question(
    *,
    topic_id: str,
    n: int,
    prompt: str,
    explanation: str,
    correct_text: str,
    distractors: list[str],
    correct_slot: int,
    difficulty: str = "medium",
) -> dict:
    options, correct_id, dist = option_set(correct_text, distractors, correct_slot)
    return {
        "id": f"{EXAM_SLUG}-{topic_id}-{n:03d}",
        "examSlug": EXAM_SLUG,
        "topicId": topic_id,
        "prompt": prompt,
        "options": options,
        "correctOptionId": correct_id,
        "explanation": explanation,
        "distractorExplanations": dist,
        "difficulty": difficulty,
        "sourceNote": SOURCE_NOTE,
    }


# --- Process / Integrative ---------------------------------------------------

def gen_process(rng: random.Random, count: int) -> list[dict]:
    out = []
    for i in range(1, count + 1):
        factory = [
            _p_recert,
            _p_performance,
            _p_commissioning,
            _p_team,
            _p_documentation,
        ][(i - 1) % 5]
        out.append(factory(rng, i))
    return out


def _p_recert(rng, n):
    years = rng.choice([3, 5])
    return make_question(
        topic_id="process-integrative",
        n=n,
        prompt=(
            f"An occupied office campus is pursuing LEED O+M recertification. "
            f"What best describes the typical performance period mindset?"
        ),
        explanation=(
            "O+M emphasizes ongoing operations data over a defined performance period, "
            "not one-time design compliance alone."
        ),
        correct_text="Collect and verify operational performance data over a defined performance period.",
        distractors=[
            "Submit only as-built drawings from original construction.",
            "Skip metering if the building is already occupied.",
            f"Wait {years} years after construction before any operations tracking.",
        ],
        correct_slot=rng.randint(0, 3),
    )


def _p_performance(rng, n):
    return make_question(
        topic_id="process-integrative",
        n=n,
        prompt=(
            "Facility managers want early alignment across energy, water, waste, and indoor air "
            "for an O+M submission. Which approach is most integrative?"
        ),
        explanation="Integrative process convenes cross-discipline owners of operations data before credit strategies freeze.",
        correct_text="Hold a cross-functional kickoff to map shared meters, baselines, and credit dependencies.",
        distractors=[
            "Assign each credit to a different vendor with no shared data plan.",
            "Document only energy, then address water after certification.",
            "Use marketing claims instead of measured performance.",
        ],
        correct_slot=rng.randint(0, 3),
    )


def _p_commissioning(rng, n):
    return make_question(
        topic_id="process-integrative",
        n=n,
        prompt="For existing-building operations, which commissioning focus is most appropriate?",
        explanation="Existing buildings emphasize ongoing commissioning / retro-commissioning of systems in use.",
        correct_text="Verify that operating systems meet current facility requirements and correct findings.",
        distractors=[
            "Commission only unfinished design drawings.",
            "Ignore BAS trends if operators say systems 'feel fine.'",
            "Defer all functional testing until after recertification.",
        ],
        correct_slot=rng.randint(0, 3),
    )


def _p_team(rng, n):
    role = rng.choice(["energy manager", "waste contractor", "IAQ consultant", "water utilities lead"])
    return make_question(
        topic_id="process-integrative",
        n=n,
        prompt=(
            f"Who should own day-to-day evidence for an O+M credit that depends on measured utility data "
            f"when the {role} sits outside the core project team?"
        ),
        explanation="Credit owners must include the people who control meters and logs; integrate them into the team.",
        correct_text="Bring the data owner into the project team with clear deliverables and review dates.",
        distractors=[
            "Guess values from similar buildings nearby.",
            "Leave the credit blank until GBCI asks questions.",
            "Substitute a brochure for measured data.",
        ],
        correct_slot=rng.randint(0, 3),
        difficulty="easy",
    )


def _p_documentation(rng, n):
    return make_question(
        topic_id="process-integrative",
        n=n,
        prompt="Which documentation habit best supports O+M credit review?",
        explanation="Reviewers need traceable performance-period evidence tied to the building and dates.",
        correct_text="Keep dated logs, meter reads, and policies aligned to the performance period.",
        distractors=[
            "Rely on undated photos without context.",
            "Submit vendor marketing PDFs only.",
            "Use data from a different campus building without disclosure.",
        ],
        correct_slot=rng.randint(0, 3),
        difficulty="easy",
    )


# --- Location & Sites --------------------------------------------------------

def gen_location(rng: random.Random, count: int) -> list[dict]:
    out = []
    for i in range(1, count + 1):
        factory = [_l_transit, _l_stormwater, _l_heat, _l_habitat, _l_alt_transport][(i - 1) % 5]
        out.append(factory(rng, i))
    return out


def _l_transit(rng, n):
    return make_question(
        topic_id="location-sites",
        n=n,
        prompt="Which site strategy most directly supports sustainable transportation for an occupied workplace?",
        explanation="Quality transit access and end-of-trip facilities encourage alternatives to single-occupancy vehicles.",
        correct_text="Improve pedestrian access to frequent transit and provide secure bike parking.",
        distractors=[
            "Add only reserved executive parking nearest the entrance.",
            "Remove sidewalks to expand drive lanes.",
            "Ban all visitor parking without offering alternatives.",
        ],
        correct_slot=rng.randint(0, 3),
    )


def _l_stormwater(rng, n):
    return make_question(
        topic_id="location-sites",
        n=n,
        prompt="An O+M team wants to reduce site runoff pollution. Which action is most aligned?",
        explanation="O+M site credits favor maintaining vegetated practices and reducing untreated runoff.",
        correct_text="Maintain bioretention areas and keep storm inlets clear of sediment and debris.",
        distractors=[
            "Pipe all roof water directly to the street without treatment.",
            "Seal every pervious surface with impermeable coating.",
            "Store chemicals outdoors uncovered near drains.",
        ],
        correct_slot=rng.randint(0, 3),
    )


def _l_heat(rng, n):
    return make_question(
        topic_id="location-sites",
        n=n,
        prompt="Which roof/site choice best helps reduce heat-island effects in operations?",
        explanation="High-SRI roofs and shade/vegetation reduce heat absorption on existing sites.",
        correct_text="Maintain a high-SRI roof coating and preserve mature shade trees in parking areas.",
        distractors=[
            "Repaint the roof dark charcoal for aesthetics only.",
            "Remove trees to maximize asphalt parking.",
            "Add only decorative gravel with no reflectance strategy.",
        ],
        correct_slot=rng.randint(0, 3),
    )


def _l_habitat(rng, n):
    return make_question(
        topic_id="location-sites",
        n=n,
        prompt="For site management supporting habitat, which practice is preferable?",
        explanation="Native/adaptive plantings and reduced chemical reliance support site ecology in O+M.",
        correct_text="Use native or adaptive plantings and minimize unnecessary pesticide use.",
        distractors=[
            "Convert all landscaping to invasive ornamentals.",
            "Apply broad-spectrum pesticides on a fixed weekly schedule regardless of need.",
            "Mow every vegetated buffer to bare soil.",
        ],
        correct_slot=rng.randint(0, 3),
        difficulty="easy",
    )


def _l_alt_transport(rng, n):
    stalls = rng.choice([2, 4, 6])
    return make_question(
        topic_id="location-sites",
        n=n,
        prompt=(
            f"A campus is adding {stalls} EV charging stations for O+M transportation credits. "
            f"What else should the team verify?"
        ),
        explanation="Chargers must be available for occupants/visitors as intended and documented during the performance period.",
        correct_text="Confirm stations are installed, powered, and accessible for intended users during the performance period.",
        distractors=[
            "Count planned chargers that are not yet installed.",
            "Locate chargers in a locked yard with no occupant access.",
            "Document only a purchase order without operation.",
        ],
        correct_slot=rng.randint(0, 3),
    )


# --- Water -------------------------------------------------------------------

def gen_water(rng: random.Random, count: int) -> list[dict]:
    out = []
    for i in range(1, count + 1):
        factory = [_w_meter, _w_fixtures, _w_irrigation, _w_cooling, _w_leak][(i - 1) % 5]
        out.append(factory(rng, i))
    return out


def _w_meter(rng, n):
    return make_question(
        topic_id="water-efficiency",
        n=n,
        prompt="Why is whole-building water metering critical for LEED O+M water strategies?",
        explanation="Meters establish usage baselines and track reductions over the performance period.",
        correct_text="They enable measured baselines and ongoing tracking of water use.",
        distractors=[
            "They eliminate the need for fixture standards.",
            "They replace all irrigation controls.",
            "They are only required for vacant buildings.",
        ],
        correct_slot=rng.randint(0, 3),
        difficulty="easy",
    )


def _w_fixtures(rng, n):
    return make_question(
        topic_id="water-efficiency",
        n=n,
        prompt="Which indoor plumbing upgrade most clearly supports potable water reduction?",
        explanation="Low-flow/high-efficiency fixtures reduce indoor potable demand when maintained correctly.",
        correct_text="Install and maintain WaterSense (or equivalent) high-efficiency fixtures where applicable.",
        distractors=[
            "Increase flush volumes to improve 'feel.'",
            "Disable sensor faucets so they run continuously.",
            "Ignore leaks if monthly bills look acceptable.",
        ],
        correct_slot=rng.randint(0, 3),
    )


def _w_irrigation(rng, n):
    return make_question(
        topic_id="water-efficiency",
        n=n,
        prompt="Which landscape irrigation practice best reduces outdoor water use?",
        explanation="Weather-based/smart controllers and efficient plantings cut outdoor potable irrigation.",
        correct_text="Use weather-based irrigation control and drought-tolerant plantings.",
        distractors=[
            "Irrigate at midday every day year-round.",
            "Water impermeable paving to keep it cool.",
            "Disable rain sensors on existing controllers.",
        ],
        correct_slot=rng.randint(0, 3),
    )


def _w_cooling(rng, n):
    return make_question(
        topic_id="water-efficiency",
        n=n,
        prompt="For cooling-tower water use, which O+M action is most appropriate?",
        explanation="Conductivity/blowdown controls and metering help optimize cycles of concentration safely.",
        correct_text="Meter tower makeup/blowdown and optimize cycles of concentration within water-treatment limits.",
        distractors=[
            "Maximize continuous blowdown with no controls.",
            "Ignore tower chemistry because energy meters exist.",
            "Use only potable water estimates with no logs.",
        ],
        correct_slot=rng.randint(0, 3),
        difficulty="hard",
    )


def _w_leak(rng, n):
    return make_question(
        topic_id="water-efficiency",
        n=n,
        prompt="A sudden spike appears on the domestic water meter overnight. Best first response?",
        explanation="Investigate leaks promptly; unexplained spikes undermine performance-period water claims.",
        correct_text="Investigate for leaks or unintended flows and correct them; document the finding.",
        distractors=[
            "Average the spike into last year's baseline silently.",
            "Wait until annual reporting to mention it.",
            "Turn off all meters to hide the anomaly.",
        ],
        correct_slot=rng.randint(0, 3),
        difficulty="easy",
    )


# --- Energy & Atmosphere -----------------------------------------------------

def gen_energy(rng: random.Random, count: int) -> list[dict]:
    out = []
    for i in range(1, count + 1):
        factory = [_e_meter, _e_benchmark, _e_re, _e_refrigerant, _e_ops][(i - 1) % 5]
        out.append(factory(rng, i))
    return out


def _e_meter(rng, n):
    return make_question(
        topic_id="energy-atmosphere",
        n=n,
        prompt="What is the primary O+M purpose of whole-building energy metering?",
        explanation="Energy meters support benchmarking, performance tracking, and credit documentation.",
        correct_text="Track actual energy use for benchmarking and performance-period reporting.",
        distractors=[
            "Replace the need for any operational schedules.",
            "Prove design intent without measured data.",
            "Only support marketing claims, not credits.",
        ],
        correct_slot=rng.randint(0, 3),
        difficulty="easy",
    )


def _e_benchmark(rng, n):
    return make_question(
        topic_id="energy-atmosphere",
        n=n,
        prompt="Which benchmarking practice aligns with LEED O+M energy performance?",
        explanation="Normalized, comparable energy metrics (e.g., ENERGY STAR Portfolio Manager style) support performance credits.",
        correct_text="Enter 12 months of utility data into a recognized benchmarking tool and track the score.",
        distractors=[
            "Estimate energy from square footage alone with no bills.",
            "Use a single winter month as the annual figure.",
            "Benchmark a different building and reuse the score.",
        ],
        correct_slot=rng.randint(0, 3),
    )


def _e_re(rng, n):
    return make_question(
        topic_id="energy-atmosphere",
        n=n,
        prompt="Which renewable energy approach is most defensible for O+M documentation?",
        explanation="Contracts and metered on-site generation must be attributable to the project for the period.",
        correct_text="Document on-site generation or qualifying RECs/contracts tied to the building for the performance period.",
        distractors=[
            "Claim neighbor rooftop PV without an agreement.",
            "Promise future panels with no purchase.",
            "Count fossil backup generators as renewable.",
        ],
        correct_slot=rng.randint(0, 3),
    )


def _e_refrigerant(rng, n):
    return make_question(
        topic_id="energy-atmosphere",
        n=n,
        prompt="For refrigerant management in existing buildings, which practice is preferred?",
        explanation="O+M emphasizes leak prevention, proper recovery, and preferential lower-impact refrigerants over time.",
        correct_text="Maintain leak detection/repair procedures and keep refrigerant inventories and service logs.",
        distractors=[
            "Vent refrigerants during service to speed repairs.",
            "Ignore manufacturer charge limits.",
            "Store empty cylinders unlabeled outdoors.",
        ],
        correct_slot=rng.randint(0, 3),
    )


def _e_ops(rng, n):
    schedule = rng.choice(["setback temperatures", "lighting schedules", "AHU optimal start"])
    return make_question(
        topic_id="energy-atmosphere",
        n=n,
        prompt=f"Operators want energy savings without capital retrofit. Which {schedule} action helps?",
        explanation="Tuning schedules and setpoints is a core O+M energy strategy when comfort requirements are still met.",
        correct_text="Implement and verify BAS schedules/setpoints that match actual occupancy.",
        distractors=[
            "Run all systems 24/7 'just in case.'",
            "Disable night setbacks permanently.",
            "Override schedules daily without logging why.",
        ],
        correct_slot=rng.randint(0, 3),
    )


# --- Materials / IEQ ---------------------------------------------------------

def gen_materials(rng: random.Random, count: int) -> list[dict]:
    out = []
    for i in range(1, count + 1):
        factory = [_m_waste, _m_purchasing, _m_iaq, _m_cleaning, _m_smoking][(i - 1) % 5]
        out.append(factory(rng, i))
    return out


def _m_waste(rng, n):
    return make_question(
        topic_id="materials-ieq",
        n=n,
        prompt="Which waste practice best supports O+M materials credits?",
        explanation="Ongoing diversion with measured streams (recycling, organics, etc.) is the O+M approach.",
        correct_text="Track ongoing waste streams and diversion rates over the performance period.",
        distractors=[
            "Haul everything to landfill without sorting for convenience.",
            "Report a one-day cleanout as the annual diversion rate.",
            "Exclude construction debris by mixing it into daily trash silently.",
        ],
        correct_slot=rng.randint(0, 3),
    )


def _m_purchasing(rng, n):
    return make_question(
        topic_id="materials-ieq",
        n=n,
        prompt="For ongoing purchasing, which policy aligns with LEED O+M?",
        explanation="Prefer products with recycled content, responsible sourcing, and low-emitting attributes as applicable.",
        correct_text="Adopt a purchasing policy prioritizing sustainable and low-emitting products where feasible.",
        distractors=[
            "Buy the cheapest option with no environmental criteria.",
            "Ban all documentation of product attributes.",
            "Purchase only for aesthetics regardless of VOC content in occupied spaces.",
        ],
        correct_slot=rng.randint(0, 3),
        difficulty="easy",
    )


def _m_iaq(rng, n):
    return make_question(
        topic_id="materials-ieq",
        n=n,
        prompt="Which IAQ action is most relevant for occupied-building operations?",
        explanation="O+M IAQ relies on ventilation performance, filtration, and pollutant source control during occupancy.",
        correct_text="Maintain outdoor air ventilation and filtration; investigate occupant IAQ complaints promptly.",
        distractors=[
            "Seal outdoor air intakes permanently to save energy.",
            "Ignore filter change schedules if pressure drop looks fine once.",
            "Store chemicals in corridors without secondary containment.",
        ],
        correct_slot=rng.randint(0, 3),
    )


def _m_cleaning(rng, n):
    return make_question(
        topic_id="materials-ieq",
        n=n,
        prompt="What should a green cleaning program emphasize for O+M?",
        explanation="Certified/safer products, training, and documented procedures reduce IAQ and chemical risks.",
        correct_text="Use safer cleaning products with staff training and written procedures.",
        distractors=[
            "Use the strongest solvents available for all surfaces.",
            "Skip SDS access for custodial staff.",
            "Mix incompatible chemicals to 'boost' performance.",
        ],
        correct_slot=rng.randint(0, 3),
        difficulty="easy",
    )


def _m_smoking(rng, n):
    return make_question(
        topic_id="materials-ieq",
        n=n,
        prompt="Which smoking policy best protects indoor environmental quality?",
        explanation="Prohibit smoking in the building and near entries/air intakes as required by LEED approaches.",
        correct_text="Prohibit smoking inside and within required distances of entries and outdoor air intakes.",
        distractors=[
            "Allow smoking in stairwells only.",
            "Permit smoking next to outdoor air intakes.",
            "Post no policy and rely on courtesy alone.",
        ],
        correct_slot=rng.randint(0, 3),
        difficulty="easy",
    )


def validate(q: dict) -> list[str]:
    errs = []
    if len(q.get("options") or []) != 4:
        errs.append("options")
    texts = [o["text"] for o in q["options"]]
    if len(set(texts)) != 4 or any(not t.strip() for t in texts):
        errs.append("unique")
    if q["correctOptionId"] not in {o["id"] for o in q["options"]}:
        errs.append("correct")
    if len((q.get("explanation") or "")) < 20:
        errs.append("explanation")
    return errs


def sync_cache(topic: str, questions: list[dict]) -> None:
    CACHE_DIR.mkdir(parents=True, exist_ok=True)
    topic_q = [q for q in questions if q["topicId"] == topic]
    (CACHE_DIR / f"{topic}.json").write_text(
        json.dumps({"questions": topic_q, "prompts": [q["prompt"] for q in topic_q]}, indent=2)
        + "\n"
    )


def main() -> None:
    rng = random.Random(20260716)
    generators = {
        "process-integrative": gen_process,
        "location-sites": gen_location,
        "water-efficiency": gen_water,
        "energy-atmosphere": gen_energy,
        "materials-ieq": gen_materials,
    }
    final: list[dict] = []
    for topic, target in TOPIC_TARGETS.items():
        qs = generators[topic](rng, target)
        for q in qs:
            errs = validate(q)
            if errs:
                raise SystemExit(f"Invalid {q['id']}: {errs}")
        final.extend(qs)
        sync_cache(topic, qs)

    BANK_PATH.write_text(json.dumps(final, indent=2) + "\n")
    counts = {t: sum(1 for q in final if q["topicId"] == t) for t in TOPIC_TARGETS}
    print(f"STATUS LEED O+M local bank: {len(final)} → {BANK_PATH}")
    print("Counts:", counts)


if __name__ == "__main__":
    main()
