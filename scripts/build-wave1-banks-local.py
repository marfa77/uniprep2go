#!/usr/bin/env python3
"""Build Wave 1 niche mock banks locally (no OpenRouter)."""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "src/data/mock-exams"
SOURCE = "Original UniPrep2Go local bank (Wave 1)."

# (prompt, correct, [d1,d2,d3], explanation)
Seed = tuple[str, str, list[str], str]

BANKS: dict[str, dict[str, list[Seed]]] = {}


def opt(correct: str, distractors: list[str], slot: int):
    ids = ["a", "b", "c", "d"]
    ordered = distractors[:slot] + [correct] + distractors[slot:]
    options = [{"id": ids[i], "text": ordered[i]} for i in range(4)]
    correct_id = ids[slot]
    distractors_map = {
        oid: "Common distractor for this topic — review the keyed explanation."
        for oid in ids
        if oid != correct_id
    }
    return options, correct_id, distractors_map


def build_exam(exam_slug: str, topics: dict[str, list[Seed]]) -> list[dict]:
    questions: list[dict] = []
    for topic_id, seeds in topics.items():
        if len(seeds) < 10:
            raise SystemExit(f"{exam_slug}/{topic_id}: need at least 10 seeds, got {len(seeds)}")
        # Target ~16/topic (64 total). Allow 10–16 while banks fill out.
        if len(seeds) not in (10, 16):
            print(f"WARN {exam_slug}/{topic_id}: {len(seeds)} seeds (prefer 16)")
        for i, (prompt, correct, distractors, explanation) in enumerate(seeds, start=1):
            if len(distractors) != 3:
                raise SystemExit(f"{exam_slug}/{topic_id}/{i}: need 3 distractors")
            slot = (i - 1) % 4
            options, correct_id, dist_map = opt(correct, distractors, slot)
            # richer distractor notes from truncated wrong texts
            for oid, option in zip(["a", "b", "c", "d"], options):
                if oid == correct_id:
                    continue
                dist_map[oid] = f"Incorrect: {option['text'][:120]}"
            questions.append(
                {
                    "id": f"{exam_slug}-{topic_id}-{i:03d}",
                    "examSlug": exam_slug,
                    "topicId": topic_id,
                    "prompt": prompt,
                    "options": options,
                    "correctOptionId": correct_id,
                    "explanation": explanation,
                    "distractorExplanations": dist_map,
                    "difficulty": ["easy", "medium", "hard"][(i - 1) % 3],
                    "sourceNote": SOURCE,
                }
            )
    return questions


def register(exam_slug: str, topics: dict[str, list[Seed]]) -> None:
    BANKS[exam_slug] = topics


# ── CDL General Knowledge ──────────────────────────────────────────────────
register(
    "cdl-general-knowledge-readiness-check",
    {
        "vehicle-systems": [
            (
                "During a pre-trip inspection, which tire condition requires taking the vehicle out of service?",
                "A tire with tread depth below the FMCSA minimum for that axle position",
                [
                    "A tire with even wear across the tread",
                    "A tire inflated within placard pressure range",
                    "A spare tire stored with matching size markings",
                ],
                "FMCSA out-of-service criteria include insufficient tread depth and other tire defects that compromise control.",
            ),
            (
                "What is the primary purpose of checking the coupling system on a combination vehicle?",
                "Confirm the fifth wheel or pintle connection is locked and secure",
                [
                    "Measure fuel economy for the trip",
                    "Reset the ABS fault light after ignition",
                    "Verify cargo seal numbers for customs",
                ],
                "An unsecured coupling can separate the trailer — lock verification is a critical pre-trip item.",
            ),
            (
                "Low air pressure warning devices on air-brake vehicles must activate before pressure falls below about:",
                "60 psi (or the manufacturer's specified threshold near that range)",
                ["100 psi", "20 psi", "140 psi"],
                "Federal standards require a low-air warning before pressure drops to an unsafe level (commonly cited near 60 psi).",
            ),
            (
                "If the coolant temperature gauge climbs into the danger zone while climbing a grade, the safest first response is to:",
                "Stop safely, let the engine idle to cool, and diagnose overheating before continuing",
                [
                    "Shut off the engine immediately on the travel lane",
                    "Increase speed to force more airflow through the radiator",
                    "Add cold water to a hot pressurized radiator cap",
                ],
                "Overheating needs a controlled stop and cool-down; sudden shutdown or opening a hot system can worsen damage or injury.",
            ),
            (
                "Steering wheel play beyond manufacturer limits usually indicates:",
                "Worn steering components that can delay response in an emergency",
                [
                    "A correctly adjusted power-steering belt",
                    "Normal tire cupping from highway miles",
                    "An overcharged air suspension",
                ],
                "Excessive free play means the driver must turn farther before wheels respond — a safety defect.",
            ),
            (
                "Why should drivers drain air tanks on vehicles without automatic drains?",
                "To remove water and oil that can freeze or damage air-brake valves",
                [
                    "To reduce tire pressure for better traction",
                    "To bleed hydraulic clutch fluid",
                    "To reset the engine ECU after a fault",
                ],
                "Moisture and oil in air systems cause freezing and valve failure; manual draining keeps brakes reliable.",
            ),
            (
                "A red ABS malfunction lamp that stays on after the bulb check most likely means:",
                "The antilock brake system needs service; drive carefully and get it repaired",
                [
                    "ABS is working and no further attention is needed",
                    "You must immediately disconnect trailer air lines",
                    "Engine oil pressure is critically low",
                ],
                "A persistent ABS lamp indicates a fault. Conventional brakes may still work, but ABS protection may be lost.",
            ),
            (
                "When checking lights in a pre-trip, you should verify:",
                "Headlights, turn signals, brake lights, clearance lights, and reflectors function and are clean",
                [
                    "Only the left headlight on low beam",
                    "Interior dome light brightness only",
                    "Dashboard warning lamps with the key off",
                ],
                "Other road users rely on a full lighting system; dirty or dead lamps are inspection failures.",
            ),
            (
                "Slack adjusters that need frequent manual adjustment may indicate:",
                "Brakes out of adjustment or worn foundation brake parts",
                [
                    "Correct automatic slack adjuster operation",
                    "Overinflated steer tires",
                    "A stuck thermostat",
                ],
                "Frequent readjustment is a warning that brakes are not maintaining proper stroke/adjustment.",
            ),
            (
                "Cargo secured only by the trailer's side walls without proper tie-downs is generally:",
                "Unsafe — cargo must be secured to prevent shifting under braking and turns",
                [
                    "Acceptable if the trailer is enclosed",
                    "Required for bulk liquids only",
                    "Allowed when traveling under 45 mph",
                ],
                "Walls alone do not meet cargo securement standards; proper blocking/tie-downs are required.",
            ),
        ],
        "safe-driving": [
            (
                "The basic idea of managing space ahead is to:",
                "Keep enough following distance to stop safely for conditions",
                [
                    "Stay within one second of the vehicle ahead in traffic",
                    "Draft closely behind larger trucks to save fuel",
                    "Use the shoulder whenever traffic slows",
                ],
                "Stopping distance grows with speed and weight; adequate space is the core defensive habit.",
            ),
            (
                "When making a right turn in a long vehicle, you should typically:",
                "Turn wide as needed so the trailer does not off-track over the curb or into other lanes unsafely",
                [
                    "Hug the curb tightly from the start of the turn",
                    "Stop in the intersection until all traffic clears both ways",
                    "Use only the left lane for every right turn",
                ],
                "Off-tracking requires planning the turn path so the trailer clears curbs and other vehicles.",
            ),
            (
                "Double-clutching is used primarily to:",
                "Match engine RPM to gear speed when shifting a non-synchronized transmission",
                [
                    "Warm the clutch facing before a hill",
                    "Bypass ABS during panic braking",
                    "Increase turbo boost on downgrades",
                ],
                "Non-synchro transmissions need RPM matching; double-clutching helps smooth, damage-free shifts.",
            ),
            (
                "On a downgrade, the preferred braking method for heavy vehicles is usually:",
                "Select a safe gear before starting down and use controlled braking / engine braking as trained",
                [
                    "Ride the service brakes continuously from the top",
                    "Shift to neutral and coast to save fuel",
                    "Apply the parking brake lightly while moving",
                ],
                "Proper gear selection and controlled braking prevent brake fade; coasting in neutral is dangerous.",
            ),
            (
                "Hydroplaning risk increases when:",
                "Speed is high and tire tread cannot push water aside",
                [
                    "Tires are new and roads are completely dry",
                    "You drive slower than surrounding traffic in rain",
                    "ABS is fully functional on dry pavement",
                ],
                "Speed + water + worn tread reduce tire contact; slowing is the primary countermeasure.",
            ),
            (
                "If you must stop on the shoulder, you should:",
                "Activate hazard lights and use warning devices as required for your situation",
                [
                    "Leave the vehicle in the travel lane with no lights",
                    "Stand in the roadway to flag traffic personally",
                    "Turn off all lights to avoid distracting drivers",
                ],
                "Visibility and proper warning devices protect you and other road users during roadside stops.",
            ),
            (
                "Communicating your intentions means:",
                "Using signals, mirrors, and early lane positioning so others can predict your moves",
                [
                    "Relying on horn use instead of turn signals",
                    "Never changing lanes even when required",
                    "Flashing high beams continuously in city traffic",
                ],
                "Early, clear communication reduces surprise conflicts around large vehicles.",
            ),
            (
                "When entering a curve, you should generally:",
                "Slow to a safe speed before the curve, then accelerate gently after the apex as appropriate",
                [
                    "Brake hard in the middle of the curve",
                    "Enter as fast as possible and hope ABS corrects",
                    "Shift to neutral before the curve",
                ],
                "Braking hard mid-curve can destabilize a heavy vehicle; set speed before turn-in.",
            ),
            (
                "Night driving requires:",
                "Slower speeds and greater following distance because visibility is reduced",
                [
                    "The same following distance as bright midday",
                    "High beams at all times including when meeting traffic",
                    "No mirror checks because glare is worse",
                ],
                "Darkness shortens the distance you can see hazards; compensate with space and speed.",
            ),
            (
                "A common cause of rear underride crashes is:",
                "A following driver not seeing a slow or stopped truck in time",
                [
                    "Trucks always stopping on green lights",
                    "ABS preventing all rear-end collisions",
                    "Using four-way flashers only on freeways",
                ],
                "Poor visibility and inadequate space behind large vehicles contribute to underride crashes.",
            ),
        ],
        "cargo": [
            (
                "Cargo that is top-heavy should be loaded with attention to:",
                "Keeping the center of gravity as low and centered as practical",
                [
                    "Stacking the heaviest freight on the top deck only",
                    "Placing all weight behind the rear axle",
                    "Leaving gaps so air can cool the cargo",
                ],
                "A high center of gravity increases rollover risk in turns and on ramps.",
            ),
            (
                "Federal cargo securement rules generally require cargo to be secured so it will not:",
                "Leak, spill, blow off, fall from, or shift enough to affect stability",
                [
                    "Be visible from outside the trailer",
                    "Require a bill of lading",
                    "Exceed empty trailer weight",
                ],
                "Securement standards focus on preventing movement and loss of load in transit.",
            ),
            (
                "When covering a load with a tarp, you should ensure:",
                "The tarp is secured so it cannot flap loose and create a hazard",
                [
                    "The tarp is only tied at the front bulkhead",
                    "No tie-downs are used if the tarp is heavy",
                    "The tarp covers the license plate completely",
                ],
                "Loose tarps and straps become projectiles and inspection failures.",
            ),
            (
                "Overloading a trailer beyond its GVWR can:",
                "Damage components, lengthen stopping distance, and violate regulations",
                [
                    "Improve fuel economy on grades",
                    "Reduce tire heat automatically",
                    "Make ABS more effective",
                ],
                "Weight ratings exist for safety and legal compliance; overloads raise crash risk.",
            ),
            (
                "Liquid cargo in bulk tanks is especially hazardous because:",
                "Surge can shift weight and affect control during braking and turns",
                [
                    "Liquids never require placards",
                    "Tanks eliminate the need for securement",
                    "Surge always improves traction",
                ],
                "Liquid surge changes axle loads dynamically; drivers must manage speed and braking.",
            ),
            (
                "Blocking and bracing are used to:",
                "Prevent cargo from shifting forward, sideways, or rearward",
                [
                    "Increase trailer ride height",
                    "Cool refrigerated compartments",
                    "Replace required lights",
                ],
                "Blocking/bracing are primary securement methods for many commodity types.",
            ),
            (
                "If you discover cargo has shifted during a trip, you should:",
                "Stop in a safe place and resecure before continuing",
                [
                    "Accelerate to settle the load toward the rear",
                    "Ignore it if the trailer doors still close",
                    "Continue only on local roads",
                ],
                "A shifted load can tip or spill; resecure before travel resumes.",
            ),
            (
                "Bridge formula weight limits exist primarily to:",
                "Protect bridges and roadways by limiting concentrated axle loads",
                [
                    "Increase maximum trailer length nationwide",
                    "Eliminate the need for scale tickets",
                    "Allow unlimited steer-axle weight",
                ],
                "Spacing and axle group weights matter for bridge safety, not just total GVW.",
            ),
            (
                "Hazardous materials cargo generally requires the driver to:",
                "Follow placarding, shipping paper, and routing rules applicable to the material",
                [
                    "Hide placards in urban areas",
                    "Refuse all shipping papers for security",
                    "Disable ABS when loaded with hazmat",
                ],
                "HM rules cover identification, documentation, and safe transportation practices.",
            ),
            (
                "An unsecured fire extinguisher in the cab is a problem because:",
                "It can become a projectile and may not be usable in an emergency",
                [
                    "It increases tire pressure",
                    "It voids electronic logging",
                    "It cools the engine too quickly",
                ],
                "Safety equipment must be secured and accessible.",
            ),
        ],
        "emergencies-rules": [
            (
                "If your vehicle catches fire, a key priority is to:",
                "Get yourself and others to safety and use appropriate extinguishing methods if trained and safe",
                [
                    "Open trailer doors immediately on a cargo fire without assessing risk",
                    "Drive faster to blow the fire out",
                    "Pour water on every type of fire including fuel and electrical",
                ],
                "Life safety first; wrong extinguishing methods can spread certain fires.",
            ),
            (
                "Hours-of-service rules exist mainly to:",
                "Reduce fatigue-related crashes by limiting driving and on-duty time",
                [
                    "Maximize unpaid waiting time",
                    "Eliminate the need for rest breaks",
                    "Allow unlimited driving if paid by the mile",
                ],
                "HOS is a fatigue-management safety regulation.",
            ),
            (
                "When approaching a railroad crossing in a CMV, you should:",
                "Slow, look and listen, and never shift gears while on the tracks",
                [
                    "Race across if lights are flashing",
                    "Stop on the tracks if traffic ahead is backed up",
                    "Ignore crossbucks when the crossing looks clear from one side",
                ],
                "Rail crossings demand deliberate clearance; stalling on tracks is extremely dangerous.",
            ),
            (
                "If you are involved in a crash, you should generally:",
                "Protect the scene, check for injuries, and notify authorities as required",
                [
                    "Leave immediately to avoid paperwork",
                    "Move injured persons roughly without assessing",
                    "Admit full legal fault on the roadside",
                ],
                "Stabilize safety and follow reporting duties; legal admissions are for later processes.",
            ),
            (
                "Using a cellphone while driving a CMV is:",
                "Heavily restricted — hands-free rules and bans on handheld use apply under FMCSA rules",
                [
                    "Always allowed if you are owner-operator",
                    "Required for electronic logging",
                    "Safer than talking to a passenger",
                ],
                "Distracted driving rules limit phone use for commercial drivers.",
            ),
            (
                "Emergency triangles should be placed:",
                "According to the prescribed distances and patterns for the roadway type and situation",
                [
                    "Only behind the truck, never ahead",
                    "Inside the cab to keep them clean",
                    "At random distances based on preference",
                ],
                "Placement standards warn approaching traffic in time to stop.",
            ),
            (
                "Brake fade on a long downgrade is often caused by:",
                "Overheating brakes from continuous hard application",
                [
                    "Too much engine braking in low gear",
                    "Cold weather thickening gear oil",
                    "Overinflated trailer tires",
                ],
                "Heat reduces braking friction; proper gearing and technique prevent fade.",
            ),
            (
                "If ABS activates during hard braking, you should:",
                "Maintain firm pressure and steer as needed; do not pump the brakes",
                [
                    "Pump the brake pedal rapidly",
                    "Turn the key off while moving",
                    "Shift to neutral immediately",
                ],
                "ABS works by modulating pressure; pumping defeats the system.",
            ),
            (
                "A runaway vehicle ramp is designed to:",
                "Stop a vehicle that has lost braking ability on a downgrade",
                [
                    "Weigh trucks for bridge formula",
                    "Bypass weigh stations legally",
                    "Cool tires after a blowout",
                ],
                "Escape ramps use grade and arresting material to stop runaway CMVs.",
            ),
            (
                "Driving under the influence of alcohol or drugs in a CMV:",
                "Is illegal at lower BAC thresholds than for many non-CMV drivers and can end a CDL career",
                [
                    "Is allowed below 0.08 for all CDL holders nationwide without consequence",
                    "Only matters if there is a crash",
                    "Is permitted off-duty in the sleeper berth while the truck is moving",
                ],
                "CDL alcohol rules are strict; violations carry severe disqualifications.",
            ),
        ],
    },
)


def main() -> None:
    if not BANKS:
        raise SystemExit("No banks registered")
    for exam_slug, topics in BANKS.items():
        questions = build_exam(exam_slug, topics)
        path = OUT_DIR / f"{exam_slug}.json"
        path.write_text(json.dumps(questions, indent=2) + "\n", encoding="utf-8")
        counts: dict[str, int] = {}
        for q in questions:
            counts[q["topicId"]] = counts.get(q["topicId"], 0) + 1
        print(f"{exam_slug}: {len(questions)} ({counts})")


if __name__ == "__main__":
    main()
