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


def option_set(
    correct_text: str,
    distractors: list[str],
    distractor_reasons: list[str],
    correct_slot: int,
):
    if len(distractors) != 3 or len(distractor_reasons) != 3:
        raise ValueError("Each question needs exactly three distractors and explanations.")
    seen = {correct_text}
    unique = []
    unique_reasons = []
    for text, reason in zip(distractors, distractor_reasons):
        candidate = text
        bump = 1
        while candidate in seen:
            candidate = f"{text} (variant {bump})"
            bump += 1
        seen.add(candidate)
        unique.append(candidate)
        unique_reasons.append(reason)
    slot = correct_slot % 4
    ordered = unique[:slot] + [correct_text] + unique[slot:]
    ids = ["a", "b", "c", "d"]
    options = [{"id": ids[i], "text": ordered[i]} for i in range(4)]
    correct_id = ids[slot]
    distractor_explanations = {}
    for index, oid in enumerate(ids):
        if oid != correct_id:
            distractor_index = index if index < slot else index - 1
            distractor_explanations[oid] = unique_reasons[distractor_index]
    return options, correct_id, distractor_explanations


def make_question(
    *,
    topic_id: str,
    n: int,
    prompt: str,
    explanation: str,
    correct_text: str,
    distractors: list[str],
    distractor_reasons: list[str],
    correct_slot: int,
    difficulty: str = "medium",
) -> dict:
    options, correct_id, dist = option_set(
        correct_text, distractors, distractor_reasons, correct_slot
    )
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


# Each case produces five deliberately different operational decisions.  The
# cases are concrete O+M situations, rather than a small group of factories
# repeated until the topic target is reached.
Case = dict[str, object]

TOPIC_CASES: dict[str, list[Case]] = {
    "process-integrative": [
        {"site": "a downtown office", "focus": "the cross-functional kickoff", "action": "assign credit owners and map the energy, water, waste, and IAQ data each owner controls", "evidence": "a responsibility matrix with milestones and review dates", "risk": "letting independent consultants compile disconnected credit narratives"},
        {"site": "a university library", "focus": "the performance period", "action": "collect dated utility, purchasing, and operations records for the selected reporting period", "evidence": "source records whose dates and building address match the application", "risk": "substituting original construction documents for current operating data"},
        {"site": "a medical office building", "focus": "current facility requirements", "action": "document the owner’s comfort, ventilation, scheduling, and reliability requirements before testing systems", "evidence": "approved current facility requirements linked to operations goals", "risk": "testing equipment against obsolete design assumptions"},
        {"site": "a mixed-use tower", "focus": "retro-commissioning", "action": "test HVAC sequences, correct deficiencies, and verify the fixes with trend data", "evidence": "functional test results, issue logs, and closure verification", "risk": "accepting verbal assurances instead of functional verification"},
        {"site": "a warehouse", "focus": "ongoing commissioning", "action": "review BAS trends periodically and investigate persistent scheduling or simultaneous-heating-and-cooling faults", "evidence": "recurring trend-review records and corrective-action logs", "risk": "treating commissioning as a one-time project"},
        {"site": "a hotel", "focus": "occupant feedback", "action": "log comfort complaints, investigate patterns, and communicate resolved actions to occupants", "evidence": "dated complaint records tied to findings and responses", "risk": "discarding complaints once a work order is closed"},
        {"site": "a civic center", "focus": "staff training", "action": "train operators on the written operating plan and document attendance and competency", "evidence": "training materials, attendance records, and refresher schedule", "risk": "assuming a policy is implemented because it was emailed"},
        {"site": "a data center", "focus": "change management", "action": "evaluate energy, water, and IAQ effects before changing setpoints or equipment sequences", "evidence": "change-control records with expected impacts and post-change verification", "risk": "making undocumented overrides that obscure the operating baseline"},
        {"site": "a retail center", "focus": "tenant coordination", "action": "obtain tenant utility and waste information through documented data-sharing procedures", "evidence": "tenant data requests, submissions, and aggregation method", "risk": "estimating tenant consumption from leased area alone"},
        {"site": "a courthouse", "focus": "recertification readiness", "action": "use prior review comments and current performance data to identify gaps before submission", "evidence": "a gap register showing owner, action, and completion status", "risk": "copying the prior certification narrative without checking current operations"},
    ],
    "location-sites": [
        {"site": "an office campus", "focus": "bicycle access", "action": "maintain secure bicycle storage and a safe, connected pedestrian route to the building entrance", "evidence": "site photos, capacity records, and an access map", "risk": "counting bike racks located behind a locked service gate"},
        {"site": "a suburban call center", "focus": "transit access", "action": "document usable pedestrian access to nearby transit and communicate routes to occupants", "evidence": "a route map, transit schedule, and pedestrian-path photos", "risk": "claiming a transit stop that requires walking along an unsafe roadway"},
        {"site": "a hospital", "focus": "electric vehicles", "action": "keep charging stations powered, signed, and available to their intended users", "evidence": "installation photos, access policy, and operating records", "risk": "claiming chargers that were purchased but never energized"},
        {"site": "a school", "focus": "stormwater maintenance", "action": "inspect bioretention areas, remove sediment, and keep overflow paths functioning", "evidence": "inspection logs and maintenance work orders", "risk": "treating a planted basin as maintenance-free landscaping"},
        {"site": "a municipal building", "focus": "runoff pollution prevention", "action": "cover outdoor chemical storage and keep spill-response materials away from storm drains", "evidence": "site-management procedures and inspection records", "risk": "storing deicing chemicals uncovered beside a catch basin"},
        {"site": "a distribution center", "focus": "heat island reduction", "action": "preserve shaded parking and maintain reflective or vegetated roof surfaces", "evidence": "roof maintenance records and shaded-area site photos", "risk": "replacing shade trees with additional dark asphalt"},
        {"site": "a museum", "focus": "light pollution", "action": "aim exterior fixtures downward and use controls that limit unnecessary nighttime uplight", "evidence": "fixture inventory, photometric information, and control settings", "risk": "leaving façade floodlights on all night without a control strategy"},
        {"site": "a corporate park", "focus": "habitat management", "action": "use native or adapted plants and integrated pest management based on observed need", "evidence": "plant list, IPM plan, and pesticide application logs", "risk": "applying broad-spectrum pesticide on a fixed weekly schedule"},
        {"site": "a community college", "focus": "site restoration", "action": "protect vegetated buffers and repair erosion before sediment reaches waterways", "evidence": "erosion inspection reports and corrective-action photos", "risk": "mowing vegetated buffers to bare soil for easier maintenance"},
        {"site": "a downtown hotel", "focus": "parking management", "action": "prioritize shared parking and preferred spaces for low-emitting or carpool vehicles where provided", "evidence": "parking plan, signs, and enforcement records", "risk": "reserving the closest spaces solely for single-occupancy executive vehicles"},
    ],
    "water-efficiency": [
        {"site": "an office building", "focus": "whole-building metering", "action": "record whole-building water use regularly and investigate material deviations from the baseline", "evidence": "dated meter readings or utility bills with a trend analysis", "risk": "estimating annual water use from floor area without meter data"},
        {"site": "a hotel", "focus": "submetering", "action": "submeter cooling-tower makeup water to isolate a major process load", "evidence": "submeter data reconciled to the whole-building meter", "risk": "assuming all water beyond restroom use is irrigation"},
        {"site": "a university dormitory", "focus": "leak response", "action": "trace an overnight meter spike, repair the leak, and retain the repair record", "evidence": "alert, work order, repair invoice, and post-repair meter trend", "risk": "silently averaging the spike into the annual baseline"},
        {"site": "a convention center", "focus": "toilets and urinals", "action": "maintain high-efficiency fixtures and correct running valves promptly", "evidence": "fixture inventory, flush-volume documentation, and maintenance logs", "risk": "increasing flush volumes to reduce occasional double-flushing"},
        {"site": "a clinic", "focus": "lavatories", "action": "use compliant low-flow faucets with aerators or sensors adjusted for practical use", "evidence": "fixture flow-rate records and maintenance settings", "risk": "disabling sensor shutoffs so faucets run continuously"},
        {"site": "a manufacturing office", "focus": "irrigation controls", "action": "use weather-based controls, rain shutoff, and seasonal programming for landscape irrigation", "evidence": "controller settings, irrigation schedule, and rain-sensor inspection", "risk": "watering on a fixed daily schedule during rainy periods"},
        {"site": "a library", "focus": "plant selection", "action": "replace high-water turf areas with adapted planting and mulch to reduce irrigation demand", "evidence": "landscape plan, plant list, and irrigation-zone records", "risk": "watering paved plazas to reduce surface temperature"},
        {"site": "a laboratory building", "focus": "cooling towers", "action": "optimize cycles of concentration using conductivity control within water-treatment limits", "evidence": "makeup, blowdown, conductivity, and treatment-service records", "risk": "maximizing continuous blowdown regardless of water chemistry"},
        {"site": "a food-service building", "focus": "kitchen equipment", "action": "select and maintain efficient commercial dishwashing equipment and avoid unnecessary rinse flow", "evidence": "equipment specifications, operating settings, and maintenance records", "risk": "bypassing rinse controls to shorten staff waiting time"},
        {"site": "a recreation center", "focus": "alternative water", "action": "document the permitted source, treatment, and meter data for nonpotable water use", "evidence": "system diagram, approvals, treatment records, and separate meter logs", "risk": "counting untreated graywater use without documenting health safeguards"},
    ],
    "energy-atmosphere": [
        {"site": "an office tower", "focus": "energy benchmarking", "action": "enter complete utility data in a recognized benchmarking tool and review the normalized result", "evidence": "benchmarking report, utility bills, and building characteristics", "risk": "using one winter utility bill as the annual energy profile"},
        {"site": "a supermarket", "focus": "whole-building metering", "action": "maintain continuous whole-building energy data for performance tracking", "evidence": "utility account records or interval-meter exports for the reporting period", "risk": "substituting a design energy model for actual consumption"},
        {"site": "a university laboratory", "focus": "energy-use intensity", "action": "investigate increased EUI by checking operating hours, loads, and system trends", "evidence": "EUI trend, occupancy data, and diagnostic trend logs", "risk": "assuming higher EUI is acceptable because the floor area did not change"},
        {"site": "a hotel", "focus": "BAS schedules", "action": "align HVAC and lighting schedules with verified occupancy while maintaining required service", "evidence": "schedule screenshots, occupancy records, and post-change trend data", "risk": "running all air-handling units 24 hours a day as a default"},
        {"site": "a courthouse", "focus": "optimal start", "action": "use outdoor conditions and occupancy time to start HVAC only as early as needed", "evidence": "optimal-start settings and trend data showing occupied-time comfort", "risk": "starting HVAC at the same early time every day regardless of weather"},
        {"site": "a data center", "focus": "air management", "action": "maintain hot-aisle/cold-aisle separation and monitor inlet conditions", "evidence": "airflow-management plan and temperature trend records", "risk": "removing blanking panels because racks appear adequately cooled"},
        {"site": "a retail store", "focus": "lighting controls", "action": "verify daylight, occupancy, and time-clock controls operate after layout changes", "evidence": "control test records and updated lighting schedule", "risk": "leaving display lighting permanently overridden after an event"},
        {"site": "a hospital", "focus": "renewable energy", "action": "document attributable on-site generation or qualifying renewable-energy procurement for the period", "evidence": "production records or contract/REC documentation linked to the project", "risk": "claiming a neighboring building's solar output without an agreement"},
        {"site": "a cold-storage warehouse", "focus": "refrigerant management", "action": "maintain an equipment refrigerant inventory and repair leaks under documented procedures", "evidence": "charge inventory, leak logs, and service records", "risk": "venting refrigerant during service to speed up repairs"},
        {"site": "a civic theater", "focus": "demand response", "action": "maintain documented procedures to shed noncritical load during a demand-response event", "evidence": "enrollment records, test results, and event-performance data", "risk": "claiming demand response based only on a future participation intention"},
    ],
    "materials-ieq": [
        {"site": "an office campus", "focus": "ongoing waste", "action": "measure recurring landfill, recycling, and organics streams during the performance period", "evidence": "hauler tickets, stream weights, and diversion calculations", "risk": "reporting a one-day cleanout as the annual diversion rate"},
        {"site": "a hotel", "focus": "food waste", "action": "separate kitchen organics and track the destination with the waste hauler", "evidence": "collection records and organics weight tickets", "risk": "mixing organics into landfill trash after a busy service"},
        {"site": "a hospital", "focus": "durable goods purchasing", "action": "apply written sustainability criteria when purchasing furniture and equipment", "evidence": "purchasing policy, invoices, and product attribute documentation", "risk": "selecting products solely on first cost without recording attributes"},
        {"site": "a school", "focus": "consumable purchasing", "action": "track sustainable paper, janitorial, and facility consumables against the policy", "evidence": "purchase reports, product data, and policy calculations", "risk": "counting an unlabeled substitute product as environmentally preferable"},
        {"site": "a library", "focus": "green cleaning", "action": "use documented safer cleaning products, dilution control, training, and custodial procedures", "evidence": "product list, SDS access, training records, and dilution logs", "risk": "mixing concentrated chemicals by eye to make a stronger solution"},
        {"site": "a recreation center", "focus": "entryway systems", "action": "maintain walk-off mats and cleaning procedures that reduce tracked-in contaminants", "evidence": "mat locations, cleaning schedule, and maintenance records", "risk": "removing entry mats because they require periodic cleaning"},
        {"site": "a medical office", "focus": "ventilation", "action": "maintain outdoor-air delivery and investigate ventilation-related occupant complaints", "evidence": "ventilation verification, filter records, and complaint follow-up", "risk": "closing outdoor-air dampers permanently to save fan energy"},
        {"site": "a call center", "focus": "filtration", "action": "use and replace filters appropriate to the installed system and document pressure-drop checks", "evidence": "filter specifications, replacement records, and inspection logs", "risk": "using a lower-efficiency filter because it has less pressure drop"},
        {"site": "a courthouse", "focus": "tobacco smoke control", "action": "enforce the smoking policy inside and near entries, operable windows, and air intakes", "evidence": "policy, signage, and enforcement or inspection records", "risk": "allowing smoking directly beside an outdoor-air intake"},
        {"site": "a museum", "focus": "IAQ source control", "action": "store chemicals in ventilated, contained locations and respond to spills promptly", "evidence": "chemical inventory, storage inspections, and spill-response logs", "risk": "keeping open chemical containers in an occupied corridor"},
    ],
}


def gen_topic(topic_id: str, rng: random.Random, count: int) -> list[dict]:
    cases = TOPIC_CASES[topic_id]
    if count != len(cases) * 5:
        raise ValueError(f"{topic_id} requires five questions per authored case.")

    questions: list[dict] = []
    for case_index, case in enumerate(cases):
        site = str(case["site"])
        focus = str(case["focus"])
        action = str(case["action"])
        evidence = str(case["evidence"])
        risk = str(case["risk"])
        variants = [
            (
                f"At {site}, the O+M team is addressing {focus}. Which action is the strongest operational response?",
                action,
                [risk, "Wait until the end of the reporting period before deciding what to document.", "Use an undated supplier claim instead of site-specific operating evidence."],
                [
                    f"{risk.capitalize()} does not implement the {focus} strategy at the building.",
                    "Delaying action loses the contemporaneous records needed to demonstrate ongoing operations.",
                    "A supplier claim cannot verify how this building actually operated.",
                ],
            ),
            (
                f"What evidence would best substantiate {focus} for {site} during LEED O+M review?",
                evidence,
                ["A verbal statement from the facilities director.", "An undated photograph with no building identifier.", "A record from another building in the portfolio."],
                [
                    "A verbal statement is not traceable performance-period documentation.",
                    "Without a date and project connection, the photograph cannot substantiate the practice.",
                    "Portfolio data cannot be substituted for evidence from the applying building.",
                ],
            ),
            (
                f"Which proposed practice would most undermine {focus} at {site}?",
                risk,
                [action, f"Review {focus} records on a regular operating schedule.", f"Assign a facility staff member to retain {focus} documentation."],
                [
                    f"This is the documented operational practice that addresses {focus}.",
                    "Regular review supports continuous O+M implementation rather than undermining it.",
                    "Clear evidence ownership improves the completeness and traceability of the submission.",
                ],
            ),
            (
                f"During a site walk at {site}, an assessor asks how the team manages {focus}. What should the team be able to show?",
                f"That it carries out: {action}; and retains {evidence}.",
                [f"That it plans to address {focus} after certification.", "Only the building's original design drawings.", "A generic corporate sustainability brochure with no local records."],
                [
                    "A future plan does not demonstrate the required current operational practice.",
                    "Original drawings do not demonstrate how an existing building is currently operated.",
                    "Generic corporate materials do not prove implementation at this site.",
                ],
            ),
            (
                f"For {site}, which management decision best keeps {focus} defensible throughout the O+M performance period?",
                f"Make {action} part of normal operations and maintain {evidence}.",
                [risk, "Archive records only after the performance period closes.", "Rely on memory when compiling the application."],
                [
                    f"{risk.capitalize()} creates a direct gap in the {focus} strategy.",
                    "Evidence should be retained as work occurs so its dates and context remain verifiable.",
                    "Memory is not a reproducible record of building operations.",
                ],
            ),
        ]
        for variant_index, (prompt, correct, distractors, reasons) in enumerate(variants):
            questions.append(
                make_question(
                    topic_id=topic_id,
                    n=case_index * 5 + variant_index + 1,
                    prompt=prompt,
                    explanation=(
                        f"LEED O+M evaluates documented, ongoing performance. For {focus} at {site}, "
                        f"the team must implement the operational practice and retain traceable evidence."
                    ),
                    correct_text=correct,
                    distractors=distractors,
                    distractor_reasons=reasons,
                    correct_slot=rng.randint(0, 3),
                    difficulty="medium" if variant_index else "hard",
                )
            )
    return questions


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
    distractors = q.get("distractorExplanations") or {}
    wrong_ids = {o["id"] for o in q["options"]} - {q["correctOptionId"]}
    if set(distractors) != wrong_ids or any(len(text.strip()) < 25 for text in distractors.values()):
        errs.append("distractorExplanations")
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
    final: list[dict] = []
    for topic, target in TOPIC_TARGETS.items():
        qs = gen_topic(topic, rng, target)
        for q in qs:
            errs = validate(q)
            if errs:
                raise SystemExit(f"Invalid {q['id']}: {errs}")
        final.extend(qs)
        sync_cache(topic, qs)

    prompts = [q["prompt"] for q in final]
    if len(final) != 250 or len(set(prompts)) != 250:
        raise SystemExit(
            f"Bank must contain 250 unique prompts; got {len(final)} questions and "
            f"{len(set(prompts))} unique prompts."
        )
    BANK_PATH.write_text(json.dumps(final, indent=2) + "\n")
    counts = {t: sum(1 for q in final if q["topicId"] == t) for t in TOPIC_TARGETS}
    print(f"STATUS LEED O+M local bank: {len(final)} → {BANK_PATH}")
    print("Counts:", counts)


if __name__ == "__main__":
    main()
