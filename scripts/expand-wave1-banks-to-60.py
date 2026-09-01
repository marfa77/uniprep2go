#!/usr/bin/env python3
"""Append Wave 1 bank questions 011–015 per topic (40 → 60). Preserves 001–010."""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "src/data/mock-exams"
SOURCE = "Original UniPrep2Go local bank (Wave 1)."
IDS = ["a", "b", "c", "d"]

# Seed: (prompt, correct, [w1,w2,w3], explanation, difficulty)
Seed = tuple[str, str, list[str], str, str]

EXPANSIONS: dict[str, dict[str, list[Seed]]] = {}


def reg(slug: str, topics: dict[str, list[Seed]]) -> None:
    for tid, seeds in topics.items():
        if len(seeds) != 5:
            raise SystemExit(f"{slug}/{tid}: need 5 seeds (011-015), got {len(seeds)}")
    EXPANSIONS[slug] = topics


def make_q(exam_slug: str, topic_id: str, n: int, seed: Seed) -> dict:
    prompt, correct, wrongs, explanation, difficulty = seed
    if len(wrongs) != 3:
        raise SystemExit(f"{exam_slug}/{topic_id}/{n}: need 3 wrongs")
    slot = (n - 1) % 4  # 011→c, 012→d, 013→a, 014→b, 015→c
    ordered = wrongs[:slot] + [correct] + wrongs[slot:]
    options = [{"id": IDS[i], "text": ordered[i]} for i in range(4)]
    correct_id = IDS[slot]
    dist = {
        oid: f"Incorrect: {opt['text']}"
        for oid, opt in zip(IDS, options)
        if oid != correct_id
    }
    return {
        "id": f"{exam_slug}-{topic_id}-{n:03d}",
        "examSlug": exam_slug,
        "topicId": topic_id,
        "prompt": prompt,
        "options": options,
        "correctOptionId": correct_id,
        "explanation": explanation,
        "distractorExplanations": dist,
        "difficulty": difficulty,
        "sourceNote": SOURCE,
    }


# ── 1. CDL General Knowledge ───────────────────────────────────────────────
reg(
    "cdl-general-knowledge-readiness-check",
    {
        "vehicle-systems": [
            (
                "What is the main reason to drain air tanks daily on many older air-brake systems?",
                "To remove water and oil that can freeze or damage valves",
                [
                    "To lower fuel taxes owed for the trip",
                    "To reset the electronic logging device",
                    "To increase governor cut-out pressure above 200 psi",
                ],
                "Moisture and oil collect in reservoirs; draining prevents freeze-ups and valve damage.",
                "easy",
            ),
            (
                "If the ABS malfunction lamp stays on after the bulb check, what should you do?",
                "Continue carefully and get the ABS repaired; still brake normally without pumping",
                [
                    "Disable the brakes on that axle immediately",
                    "Drive only in reverse until repaired",
                    "Pump the brake pedal continuously to clear the fault",
                ],
                "A lit ABS lamp means ABS may not work, but foundation brakes usually still function; seek repair.",
                "medium",
            ),
            (
                "Spring (parking/emergency) brakes typically apply when:",
                "Air pressure is lost or the parking control is set to apply them",
                [
                    "The fuel gauge drops below one-quarter tank",
                    "Cruise control is engaged",
                    "The trailer ABS lamp flashes once",
                ],
                "Spring brakes are held off by air pressure; loss of air or setting the control applies them.",
                "medium",
            ),
            (
                "During a pre-trip, play in the steering wheel that feels excessive most nearly indicates:",
                "A steering-system defect that may be out of service if beyond limits",
                [
                    "Normal tire wear that never needs reporting",
                    "A required increase in highway speed",
                    "That power steering fluid should be drained completely",
                ],
                "Excessive steering play can mean worn components and may meet out-of-service criteria.",
                "hard",
            ),
            (
                "What should you check regarding the exhaust system before a trip?",
                "That it is securely mounted and not leaking under the cab where fumes could enter",
                [
                    "That the muffler is painted bright colors",
                    "That exhaust pipes are blocked to quiet the engine",
                    "That catalytic converters are removed on all CMVs",
                ],
                "Exhaust leaks under/near the cab risk carbon monoxide exposure; mounts and leaks matter.",
                "easy",
            ),
        ],
        "safe-driving": [
            (
                "When space ahead closes suddenly in traffic, the safest first response is usually to:",
                "Release the accelerator and brake smoothly while scanning escape paths",
                [
                    "Swerve across multiple lanes without signaling",
                    "Close your eyes briefly to reset focus",
                    "Accelerate hard to intimidate the vehicle ahead",
                ],
                "Smooth speed reduction and escape-path scanning reduce crash risk better than abrupt panic moves.",
                "easy",
            ),
            (
                "Why is heavy vehicle braking distance longer than for cars in many conditions?",
                "Greater mass and heat buildup in brakes increase stopping distance",
                [
                    "CMVs are legally forbidden to use service brakes",
                    "ABS always doubles required distance",
                    "Mirrors eliminate the need to brake early",
                ],
                "Weight and brake heat mean CMVs need more distance; following distance must reflect that.",
                "medium",
            ),
            (
                "On a downgrade, which practice helps prevent brake fade?",
                "Select a safe low gear before the grade and use steady braking technique as trained",
                [
                    "Ride the brakes hard the entire grade in top gear",
                    "Turn off the engine to save fuel on the hill",
                    "Pump air brakes rapidly the whole way down",
                ],
                "Proper gear selection and controlled braking manage heat; riding brakes causes fade.",
                "medium",
            ),
            (
                "If you are being tailgated, a generally recommended response is to:",
                "Increase following distance ahead so you can brake more gradually",
                [
                    "Brake hard without warning to punish the tailgater",
                    "Stop in the travel lane until they pass",
                    "Flash high beams continuously while speeding up",
                ],
                "More space ahead lets you brake smoothly, reducing rear-end risk from a close follower.",
                "hard",
            ),
            (
                "When making a right turn in a long vehicle, you should be most careful about:",
                "Offtracking that can put the trailer over the curb or into other lanes",
                [
                    "Keeping the trailer wheels exactly on the centerline always",
                    "Turning as sharply as a passenger car from the leftmost lane",
                    "Ignoring pedestrians because trucks have right-of-way",
                ],
                "Trailers cut corners (offtrack); plan the turn and watch the path of the trailer tires.",
                "easy",
            ),
        ],
        "cargo": [
            (
                "What is a primary reason to inspect cargo securement during a trip?",
                "Vibration and shifting can loosen restraints after departure",
                [
                    "Federal rules forbid inspecting cargo after leaving the dock",
                    "Cargo never moves once the doors are closed",
                    "Only empty trailers require en-route checks",
                ],
                "Loads can settle or shift; en-route checks catch loosened tiedowns before failure.",
                "easy",
            ),
            (
                "Blocking and bracing are used mainly to:",
                "Prevent cargo from shifting forward, backward, or sideways",
                [
                    "Increase the truck’s legal weight rating automatically",
                    "Replace the need for any tiedowns on all loads",
                    "Cool refrigerated trailers more efficiently",
                ],
                "Blocking/bracing restrain movement; tiedowns and other devices may still be required.",
                "medium",
            ),
            (
                "For a high center-of-gravity load, which driving adjustment is most important?",
                "Reduce speed on curves and avoid abrupt steering or lane changes",
                [
                    "Take curves faster to stabilize the load with centrifugal force",
                    "Disable ABS so wheels can lock on turns",
                    "Fill fuel tanks only on one side of the truck",
                ],
                "Top-heavy loads raise rollover risk; slower, smoother inputs are essential.",
                "medium",
            ),
            (
                "If you discover a leaking hazardous materials package en route, you should generally:",
                "Follow emergency response guidance, protect people, and notify appropriate authorities as required",
                [
                    "Taste the material to identify the hazard class",
                    "Continue to the delivery and report only after unloading",
                    "Hose the spill into a storm drain immediately",
                ],
                "Hazmat releases require isolation, ERG/guidance use, and proper notification—not improvisation.",
                "hard",
            ),
            (
                "Overloading a CMV is dangerous mainly because it can:",
                "Increase stopping distance, stress tires/brakes, and raise crash and citation risk",
                [
                    "Improve fuel economy in all cases",
                    "Automatically upgrade your CDL class",
                    "Eliminate the need for pre-trip inspections",
                ],
                "Excess weight harms control systems and safety margins and can violate weight laws.",
                "easy",
            ),
        ],
        "emergencies-rules": [
            (
                "If your vehicle hydroplanes, you should:",
                "Ease off the accelerator and avoid hard braking or sharp steering until traction returns",
                [
                    "Steer violently left and right to dig into the water",
                    "Apply the parking brake immediately at highway speed",
                    "Accelerate to push water out from under the tires",
                ],
                "Hydroplaning needs gentle inputs until tires regain contact; abrupt controls worsen skids.",
                "easy",
            ),
            (
                "After a tire blowout, a recommended recovery sequence starts with:",
                "Holding the wheel firmly, staying off the brake initially, and easing to a safe stop",
                [
                    "Slamming both feet on the brake pedal instantly",
                    "Shifting to reverse while still at speed",
                    "Leaving the roadway without controlling the vehicle first",
                ],
                "Control the vehicle first; hard braking on a blowout can cause loss of control.",
                "medium",
            ),
            (
                "When must you stop at a railroad crossing as a CMV driver (general rule for certain vehicles/loads)?",
                "When required by law for your vehicle type/load, or when signals/gates/flaggers indicate a stop",
                [
                    "Only if you personally hear a train whistle",
                    "Never—CMVs always have crossing priority",
                    "Only during daylight hours",
                ],
                "Certain CMVs/placarded loads must stop; all drivers must obey active warnings and gates.",
                "medium",
            ),
            (
                "If you are involved in a crash, your first priorities typically include:",
                "Protect the scene, check for injuries, and notify authorities as required",
                [
                    "Moving all vehicles into traffic to keep schedules",
                    "Leaving immediately if the other driver seems unhurt",
                    "Arguing fault before any safety actions",
                ],
                "Life safety and scene protection come first; then required notifications and documentation.",
                "hard",
            ),
            (
                "Using a radar detector in a CMV is:",
                "Prohibited for CMVs under federal rules in interstate commerce",
                [
                    "Required equipment on all Class A vehicles",
                    "Allowed only above 70 mph",
                    "Mandatory when hauling hazmat",
                ],
                "Federal rules ban radar detectors in CMVs engaged in interstate commerce.",
                "easy",
            ),
        ],
    },
)

# ── 2. NHA CCMA ────────────────────────────────────────────────────────────
reg(
    "nha-ccma-readiness-check",
    {
        "clinical-patient-care": [
            (
                "When obtaining an adult blood pressure, the cuff bladder width should ideally be about:",
                "40% of the arm circumference",
                [
                    "10% of the arm circumference",
                    "90% of the arm circumference",
                    "Equal to the patient’s shoe size",
                ],
                "Correct cuff sizing (about 40% width / 80% length of circumference) improves accuracy.",
                "medium",
            ),
            (
                "A patient reports dizziness when sitting up after lying flat. The medical assistant should first:",
                "Support the patient, lower them safely if needed, and notify the provider per protocol",
                [
                    "Leave the room to finish charting elsewhere",
                    "Force the patient to stand for orthostatic testing alone",
                    "Give the patient a stimulant drink without orders",
                ],
                "Prevent falls and follow clinic protocol; do not leave a symptomatic patient unsupported.",
                "easy",
            ),
            (
                "Which action is appropriate when preparing a patient for a 12-lead ECG?",
                "Clean/dry skin as needed and place electrodes on correct anatomical landmarks",
                [
                    "Place all limb leads on the torso randomly",
                    "Ask the patient to hold a cell phone against the chest",
                    "Skip skin prep if lotion is present",
                ],
                "Proper skin prep and landmark placement reduce artifact and misdiagnosis risk.",
                "medium",
            ),
            (
                "Intramuscular injections in adults are commonly given at which preferred site when appropriate?",
                "Deltoid or ventrogluteal muscle per order and facility policy",
                [
                    "The ulnar artery",
                    "The subcutaneous tissue of the eyelid",
                    "Directly into a varicose vein",
                ],
                "IM sites such as deltoid/ventrogluteal are used when indicated; avoid unsafe locations.",
                "hard",
            ),
            (
                "Before administering a medication, the medical assistant should verify:",
                "The rights of medication administration (patient, drug, dose, route, time, documentation)",
                [
                    "Only the drug color compared to a phone photo",
                    "That a coworker guessed the dose",
                    "That the patient skipped identification checks to save time",
                ],
                "Medication rights and positive patient ID are core safety steps.",
                "easy",
            ),
        ],
        "phlebotomy-ekg": [
            (
                "The most common antecubital vein used for routine venipuncture is the:",
                "Median cubital vein",
                ["Femoral vein", "Jugular vein", "Saphenous vein"],
                "The median cubital vein is typically preferred for routine draws when accessible.",
                "easy",
            ),
            (
                "If a patient develops syncope during venipuncture, the assistant should:",
                "Remove the needle, protect the patient from injury, and follow emergency protocol",
                [
                    "Continue filling all tubes before intervening",
                    "Have the patient stand immediately",
                    "Apply a tourniquet to the neck",
                ],
                "Stop the procedure, prevent injury/fall, and follow syncope response steps.",
                "medium",
            ),
            (
                "On a normal ECG tracing, the QRS complex primarily represents:",
                "Ventricular depolarization",
                [
                    "Atrial repolarization only",
                    "SA node cooling",
                    "Pulmonary valve closure sound",
                ],
                "The QRS reflects ventricular depolarization; P wave is atrial depolarization.",
                "medium",
            ),
            (
                "Which lead placement error can cause significant ECG artifact or lead reversal patterns?",
                "Swapping right and left arm electrodes",
                [
                    "Using the correct V1–V6 landmarks",
                    "Asking the patient to lie still",
                    "Cleaning skin before electrode placement",
                ],
                "Limb lead reversal (e.g., RA/LA swap) produces characteristic abnormal patterns.",
                "hard",
            ),
            (
                "When labeling blood tubes, the safest practice is to label:",
                "At the bedside/immediately after collection with required patient identifiers",
                [
                    "In the lab break room hours later from memory",
                    "With only the collector’s nickname",
                    "Before calling the patient from the waiting room",
                ],
                "Immediate labeling with correct identifiers prevents misidentification errors.",
                "easy",
            ),
        ],
        "safety-infection": [
            (
                "Standard Precautions assume that:",
                "All blood and certain body fluids may be infectious",
                [
                    "Only patients with known diagnoses need gloves",
                    "Hand hygiene is optional if gloves are worn",
                    "Sharps may be recapped with two hands routinely",
                ],
                "Standard Precautions protect staff/patients regardless of known infection status.",
                "easy",
            ),
            (
                "The preferred first step after a needlestick injury is typically to:",
                "Wash the site with soap and water and report per exposure protocol immediately",
                [
                    "Hide the incident to avoid paperwork",
                    "Inject bleach into the wound",
                    "Continue seeing patients without reporting",
                ],
                "Immediate first aid and timely exposure reporting enable evaluation and prophylaxis.",
                "medium",
            ),
            (
                "Which statement about alcohol-based hand rub is correct when hands are not visibly soiled?",
                "It is often preferred for routine hand hygiene when appropriate",
                [
                    "It replaces the need for gloves with blood draws",
                    "It sterilizes instruments",
                    "It is never allowed in clinics",
                ],
                "ABHR is effective for routine hygiene when hands are not visibly soiled; wash if soiled.",
                "medium",
            ),
            (
                "A sterile field is considered contaminated if:",
                "An unsterile object touches it or it is left unattended improperly",
                [
                    "It is opened facing the provider as required",
                    "Packages remain intact within expiry",
                    "Only sterile gloves contact sterile items correctly",
                ],
                "Breaks in aseptic technique (touch, moisture, unattended field) contaminate the field.",
                "hard",
            ),
            (
                "Biohazard sharps containers should be replaced when they are:",
                "About three-quarters full or per facility policy",
                [
                    "Completely overflowing onto the floor",
                    "Empty after each single alcohol pad",
                    "Used to store food for staff",
                ],
                "Overfilled sharps containers increase stick risk; replace before overflow.",
                "easy",
            ),
        ],
        "admin-communication": [
            (
                "When scheduling a follow-up visit, the medical assistant should primarily document:",
                "Date/time, reason, and any prep instructions given to the patient",
                [
                    "Only the patient’s favorite color",
                    "Unverified diagnosis codes invented by the receptionist",
                    "Gossip about the patient’s family",
                ],
                "Accurate scheduling details and instructions support continuity and compliance.",
                "easy",
            ),
            (
                "Under HIPAA, discussing a patient’s case in a crowded elevator is:",
                "An inappropriate disclosure risk and should be avoided",
                [
                    "Required for quality improvement",
                    "Allowed if you whisper any name",
                    "Permitted when the patient is famous",
                ],
                "PHI must be safeguarded; public discussions risk unauthorized disclosure.",
                "medium",
            ),
            (
                "If a patient refuses a procedure after explanation, the assistant should:",
                "Respect the refusal, notify the provider, and document per policy",
                [
                    "Perform the procedure anyway to finish the schedule",
                    "Threaten to cancel insurance coverage personally",
                    "Delete the refusal from the record",
                ],
                "Informed refusal must be respected and documented; coercion is inappropriate.",
                "medium",
            ),
            (
                "Which telephone triage action is within typical MA scope when a patient reports chest pain?",
                "Follow protocol to escalate urgently / advise emergency care as directed by policy",
                [
                    "Diagnose a myocardial infarction definitively over the phone",
                    "Prescribe nitroglycerin without an order",
                    "Tell the patient to wait a week without guidance",
                ],
                "MAs use protocols to escalate emergencies; they do not independently diagnose/prescribe.",
                "hard",
            ),
            (
                "Correcting an error in a paper medical record typically requires:",
                "A single line through the error, initials/date, and correct entry—no obliteration",
                [
                    "Using white-out to hide the original text completely",
                    "Removing the page from the chart",
                    "Writing over the error until unreadable",
                ],
                "Errors are corrected transparently so the original entry remains legible.",
                "easy",
            ),
        ],
    },
)

# Remaining banks loaded from companion module to keep this file maintainable.
from expand_wave1_banks_data import EXTRA_EXPANSIONS  # type: ignore

for slug, topics in EXTRA_EXPANSIONS.items():
    reg(slug, topics)


def append_bank(slug: str) -> dict:
    path = OUT / f"{slug}.json"
    bank = json.loads(path.read_text())
    if len(bank) != 40:
        raise SystemExit(f"{slug}: expected 40 before expand, got {len(bank)}")
    existing = {q["id"] for q in bank}
    topics = EXPANSIONS[slug]
    for topic_id, seeds in topics.items():
        for i, seed in enumerate(seeds):
            n = 11 + i
            q = make_q(slug, topic_id, n, seed)
            if q["id"] in existing:
                raise SystemExit(f"duplicate id {q['id']}")
            # ensure 001-010 still present for topic
            for k in range(1, 11):
                need = f"{slug}-{topic_id}-{k:03d}"
                if need not in existing:
                    raise SystemExit(f"{slug}: missing preserved id {need}")
            bank.append(q)
            existing.add(q["id"])
    if len(bank) != 60:
        raise SystemExit(f"{slug}: expected 60 after expand, got {len(bank)}")
    by: dict[str, int] = {}
    for q in bank:
        by[q["topicId"]] = by.get(q["topicId"], 0) + 1
        if q.get("sourceNote") != SOURCE:
            raise SystemExit(f"{q['id']}: bad sourceNote")
    for tid, n in by.items():
        if n != 15:
            raise SystemExit(f"{slug}/{tid}: {n} != 15")
    path.write_text(json.dumps(bank, indent=2, ensure_ascii=False) + "\n")
    return by


def main() -> None:
    expected = [
        "cdl-general-knowledge-readiness-check",
        "nha-ccma-readiness-check",
        "nremt-emt-readiness-check",
        "nha-cpt-phlebotomy-readiness-check",
        "fl-real-estate-readiness-check",
        "tx-real-estate-readiness-check",
        "aapc-cpc-readiness-check",
        "mblex-readiness-check",
        "nha-cpct-readiness-check",
        "nha-excpt-readiness-check",
        "nremt-paramedic-readiness-check",
        "danb-ice-readiness-check",
        "crcst-readiness-check",
        "nha-cmaa-readiness-check",
        "ardms-spi-readiness-check",
        "nbstsa-cst-readiness-check",
        "vtne-readiness-check",
    ]
    if set(EXPANSIONS) != set(expected):
        missing = set(expected) - set(EXPANSIONS)
        extra = set(EXPANSIONS) - set(expected)
        raise SystemExit(f"bank set mismatch missing={missing} extra={extra}")
    print("| slug | total | per-topic |")
    print("|---|---:|---|")
    for slug in expected:
        by = append_bank(slug)
        topics = ", ".join(f"{k}={v}" for k, v in by.items())
        print(f"| {slug} | 60 | {topics} |")
    print(f"\nDone: {len(expected)} banks expanded to 60.")


if __name__ == "__main__":
    main()
