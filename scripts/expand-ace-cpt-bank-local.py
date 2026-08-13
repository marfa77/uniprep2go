#!/usr/bin/env python3
"""Expand ACE CPT mock bank locally to 300 questions (75×4). No OpenRouter."""

from __future__ import annotations

import json
import re
import sys
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BANK_PATH = ROOT / "src/data/mock-exams/ace-cpt-readiness-check.json"
EXAM_SLUG = "ace-cpt-readiness-check"
SOURCE_NOTE = "Original UniPrep2Go local bank (Wave 2 ACE CPT 300)."
TOPIC_ORDER = ("client-interview", "program-design", "instruction", "professional")
TARGET_PER_TOPIC = 75
MIN_EXPLAIN_WORDS = 20
MIN_DISTRACTOR_WORDS = 12

FINANCE_RE = re.compile(
    r"FDIC|US securities|this concept always eliminates|investment, legal, and regulatory|"
    r"tax bracket|deposit insurance",
    re.I,
)
TEMPLATE_RE = re.compile(r"most accurate for the ACE CPT", re.I)
IDS = ("a", "b", "c", "d")

sys.path.insert(0, str(ROOT / "scripts/wave2-banks"))
from ace_cpt import topics as ORIGINAL_TOPICS  # noqa: E402
from ace_cpt_extra import EXTRA_TOPICS  # noqa: E402

ORIGINAL_TAILS = {
    "client-interview": [
        "Screening results guide clearance, referral, or program modification before any loading begins.",
        "The client must understand what will happen and can decline without pressure or guaranteed outcomes.",
        "Chest pain with exertion is a medical red flag; trainers stop activity and refer rather than diagnose.",
        "Written SMART goals make progress observable and keep behavior-change coaching concrete across weeks.",
        "Open history questions about meds, activity, and preferences inform safe individualization and privacy duties.",
        "True resting values need quiet seated rest; post-exercise or strained measures overestimate baseline heart rate.",
        "BMI screens weight relative to height but cannot separate muscle from fat or diagnose disease by itself.",
        "Motivational interviewing evokes the client's own reasons for change instead of arguing them into compliance.",
        "Blunted heart-rate response means RPE, talk-test, and symptoms become primary intensity guides under clinical advice.",
        "Girths and trained skinfolds track composition trends over time; they are not medical diagnostic tests.",
        "Correct cuff size, heart-level support, and quiet seated posture are required for a usable blood-pressure reading.",
        "Cigarette smoking is a major modifiable cardiovascular risk; high HDL is typically treated as protective.",
        "Trust and clarity in session one beat maximal testing, judgment, or supplement pitches before needs are known.",
        "Eating-disorder care belongs with qualified clinicians; trainers support safe movement inside an interdisciplinary plan.",
        "Talk-test zones approximate moderate versus vigorous effort when heart-rate technology is unavailable or unreliable.",
    ],
    "program-design": [
        "FITT-VP organizes frequency, intensity, time, type, volume, and progression so the prescription is complete.",
        "Public-health style aerobic plus twice-weekly strength targets are starting doses, then progressed to the client.",
        "Small planned increases in load or volume drive adaptation; identical easy work or huge jumps both fail.",
        "Novices need technique, compound patterns, and two to three full-body days—not daily one-rep peaking.",
        "Train the muscles, skills, and energy systems you want to improve; transfer across dissimilar tasks is limited.",
        "Macro, meso, and microcycles vary volume and intensity so fatigue is managed and performance can peak.",
        "A sustainable deficit plus resistance training and protein protects lean mass better than extreme restriction.",
        "Heavy strength sets need longer rest so bar speed and technique hold; circuit rest matches endurance goals.",
        "Deconditioned clients accumulate sustainable minutes before large doses of high-intensity interval work.",
        "SAID restates specificity: tissues and systems adapt to the demands you actually impose in training.",
        "Older adults benefit from strength, power, and balance with screening; unscreened max Olympic lifts are not day one.",
        "Supersets raise session density by pairing movements; they do not replace warm-up, protein, or medical tests.",
        "A deload reduces stress temporarily so recovery can catch up; it is not a week of daily max testing.",
        "Aerobic work helps blood pressure; breath-holding under heavy loads can spike pressure and needs caution.",
        "Do large multi-joint lifts while fresh when both compounds and isolation work are in the same session.",
    ],
    "instruction": [
        "Neutral spine, heels down, and knees tracking over toes are foundational squat safety cues under load.",
        "Spotting is preplanned, attentive, and close enough to rack the bar—phones and distance fail the role.",
        "Consented hands-on and practice reps build motor patterns; PDFs alone do not teach a squat or hinge.",
        "Novices improve with timely, specific cues; twenty simultaneous corrections a month later overwhelm learning.",
        "Raise temperature and rehearse the session's patterns before heavy loading; cold maxes raise injury risk.",
        "A dowel hinge drill teaches hip motion and spinal position before a heavy barbell deadlift is loaded.",
        "Regressions keep the pattern and a training stimulus while the client still lacks the full-skill capacity.",
        "Mirrors and video add external feedback; they never replace verbal safety cues or actual practice reps.",
        "Cable rows need scapular control and torso stiffness, not lumbar jerking or shrugged breath-holds.",
        "Group leaders demo, scan the room, and offer options so mixed abilities are coached without leaving anyone.",
        "Clean the pattern and address limiting mobility or stability before piling load onto a dysfunctional movement.",
        "A 360-degree brace supports the spine under load; dizziness from hyperventilation is not a bracing strategy.",
        "Incline or knee push-ups preserve horizontal pressing while trunk and scapular control are still developing.",
        "Cool-downs downshift intensity; they do not replace sleep, fluids, or ending the session with a new max.",
        "Sharp joint pain is a stop-or-modify signal; diagnosis and medication decisions stay with licensed clinicians.",
    ],
    "professional": [
        "ACE-certified trainers design exercise for apparently healthy or cleared clients; they do not diagnose or prescribe drugs.",
        "Undisclosed commissions bias recommendations; referrals, accurate notes, and CPR cards are ethical, not conflicts.",
        "Liability coverage manages residual claim risk; it never excuses skipped screening or unsafe supervision.",
        "Accurate confidential records support continuity and legal protection; lobby printouts and fake no-shows do not.",
        "Current CPR/AED certification plus a known facility emergency plan is a professional standard in fitness settings.",
        "Truthful marketing avoids outcome guarantees, stolen photos, and disease-cure claims that exceed trainer scope.",
        "Medical nutrition therapy belongs with dietitians and physicians; trainers offer general healthy-eating guidance only.",
        "Dating clients or hidden business deals impair objectivity; documentation and referrals are appropriate boundaries.",
        "Continuing education keeps the credential current and practice aligned with evolving safety evidence.",
        "Client safety and law outrank a manager's request to run a session the trainer knows is unsafe.",
        "Written fees, cancellations, and scope reduce disputes; secret weekly price changes invite conflict and mistrust.",
        "Inclusive communication and avoiding stereotypes improve adherence across cultures, languages, and body sizes.",
        "Client photos and weigh-ins need explicit consent; medical record numbers and default public stories are unethical.",
        "Harassment reporting protects the client; joining in, silencing, or shredding records is misconduct and may be illegal.",
        "Screening, progression, equipment checks, and emergency readiness stack together; waivers do not fix broken cables.",
    ],
}


def word_count(text: str) -> int:
    return len(text.split())


def ensure_words(text: str, extra: str, minimum: int) -> str:
    cleaned = " ".join(text.split())
    if word_count(cleaned) >= minimum:
        return cleaned
    extra_clean = " ".join(extra.split())
    merged = f"{cleaned.rstrip('. ')}. {extra_clean}".strip()
    if word_count(merged) >= minimum:
        return merged
    return f"{merged} Prefer the safer in-scope CPT decision."


# Rotate closers so thick distractor reasons are not identical spam across the bank.
DISTRACTOR_PADS: dict[str, list[str]] = {
    "client-interview": [
        "Screening answers beat appearance guesses before any loading starts.",
        "Consent and clearance must be clear before testing or programming.",
        "Red-flag symptoms need medical referral, not trainer diagnosis.",
        "Baseline measures require quiet rest, correct cuff size, and honesty.",
    ],
    "program-design": [
        "Progression should stay gradual and specific to the client's goal.",
        "Volume and intensity must match recovery capacity, not ego loads.",
        "Novices need technique and compounds before peaking schemes.",
        "Energy-system and movement specificity drive useful adaptation.",
    ],
    "instruction": [
        "Cues should fix the risky fault first, then refine polish details.",
        "Spotting and regressions protect the pattern under fatigue.",
        "Warm-ups rehearse the session lifts; cold maxes raise injury risk.",
        "Stop sharp joint pain; diagnosis stays with licensed clinicians.",
    ],
    "professional": [
        "Scope stays exercise coaching — not medical diagnosis or drug orders.",
        "Documentation, CPR readiness, and honest marketing are non-negotiable.",
        "Conflicts of interest and boundary violations undermine trust.",
        "Client safety and law outrank manager pressure or sales quotas.",
    ],
}


def option_set(
    correct_text: str,
    distractors: list[str],
    distractor_reasons: list[str],
    correct_slot: int,
) -> tuple[list[dict], str, dict[str, str]]:
    if len(distractors) != 3 or len(distractor_reasons) != 3:
        raise ValueError("Need exactly 3 distractors and 3 reasons")
    seen = {correct_text}
    unique_d: list[str] = []
    unique_r: list[str] = []
    for text, reason in zip(distractors, distractor_reasons):
        candidate = text
        bump = 1
        while candidate in seen:
            candidate = f"{text} (variant {bump})"
            bump += 1
        seen.add(candidate)
        unique_d.append(candidate)
        unique_r.append(reason)
    slot = correct_slot % 4
    ordered = unique_d[:slot] + [correct_text] + unique_d[slot:]
    options = [{"id": IDS[i], "text": ordered[i]} for i in range(4)]
    correct_id = IDS[slot]
    dist: dict[str, str] = {}
    for index, oid in enumerate(IDS):
        if oid == correct_id:
            continue
        distractor_index = index if index < slot else index - 1
        dist[oid] = unique_r[distractor_index]
    return options, correct_id, dist


def make_question(
    topic_id: str,
    n: int,
    row: tuple,
    correct_slot: int,
) -> dict:
    prompt, correct, wrongs, explanation, reasons, difficulty = row
    prompt = TEMPLATE_RE.sub("", prompt).replace("  ", " ").strip()
    if prompt.endswith("?"):
        pass
    explanation = ensure_words(
        explanation,
        "Apply this in session decisions rather than memorizing a slogan.",
        MIN_EXPLAIN_WORDS,
    )
    pads = DISTRACTOR_PADS[topic_id]
    thick_reasons = [
        ensure_words(reason, pads[i % len(pads)], MIN_DISTRACTOR_WORDS)
        for i, reason in enumerate(reasons)
    ]
    options, correct_id, dist = option_set(correct, list(wrongs), thick_reasons, correct_slot)
    blob = " ".join([prompt, correct, *wrongs, explanation, *thick_reasons])
    hit = FINANCE_RE.search(blob)
    if hit:
        raise SystemExit(f"Finance contaminant in {topic_id}-{n:03d}: {hit.group(0)}")
    if TEMPLATE_RE.search(prompt):
        raise SystemExit(f"Template stem survived in {topic_id}-{n:03d}")
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


def thicken_original(topic_id: str, rows: list[tuple]) -> list[tuple]:
    tails = ORIGINAL_TAILS[topic_id]
    if len(rows) != 15 or len(tails) != 15:
        raise SystemExit(f"{topic_id}: expected 15 originals")
    out = []
    for row, tail in zip(rows, tails):
        prompt, correct, wrongs, explanation, reasons, difficulty = row
        expl = ensure_words(explanation, tail, MIN_EXPLAIN_WORDS)
        pads = DISTRACTOR_PADS[topic_id]
        dist = [
            ensure_words(reason, pads[i % len(pads)], MIN_DISTRACTOR_WORDS)
            for i, reason in enumerate(reasons)
        ]
        out.append((prompt, correct, list(wrongs), expl, dist, difficulty))
    return out


def metrics(bank: list[dict]) -> dict:
    stems = [q["prompt"].strip().lower() for q in bank]
    answers = Counter(q["correctOptionId"] for q in bank)
    thin = [q["id"] for q in bank if word_count(q["explanation"]) < MIN_EXPLAIN_WORDS]
    thin_d = []
    for q in bank:
        for text in q["distractorExplanations"].values():
            if word_count(text) < MIN_DISTRACTOR_WORDS:
                thin_d.append(q["id"])
                break
    topics = Counter(q["topicId"] for q in bank)
    return {
        "n": len(bank),
        "unique_stems": len(set(stems)),
        "thin_explanations": len(thin),
        "thin_distractors": len(thin_d),
        "answers": dict(answers),
        "topics": dict(topics),
        "duplicate_stems": len(stems) - len(set(stems)),
    }


def main() -> None:
    bank: list[dict] = []
    global_i = 0
    for topic_id in TOPIC_ORDER:
        original = thicken_original(topic_id, ORIGINAL_TOPICS[topic_id])
        extra = EXTRA_TOPICS[topic_id]
        if len(extra) != 60:
            raise SystemExit(f"{topic_id}: extra count {len(extra)} != 60")
        rows = original + extra
        if len(rows) != TARGET_PER_TOPIC:
            raise SystemExit(f"{topic_id}: {len(rows)} != {TARGET_PER_TOPIC}")
        for n, row in enumerate(rows, start=1):
            bank.append(make_question(topic_id, n, row, global_i % 4))
            global_i += 1

    stats = metrics(bank)
    if stats["n"] != 300:
        raise SystemExit(stats)
    if stats["unique_stems"] != 300:
        raise SystemExit(f"Duplicate stems: {stats}")
    if stats["thin_explanations"] or stats["thin_distractors"]:
        raise SystemExit(f"Thin copy remains: {stats}")
    if stats["answers"] != {"a": 75, "b": 75, "c": 75, "d": 75}:
        raise SystemExit(f"Unbalanced answers: {stats}")
    if any(v != 75 for v in stats["topics"].values()):
        raise SystemExit(f"Unbalanced topics: {stats}")
    identical_closers = 0
    for q in bank:
        expl_last = q["explanation"].rstrip(".").split(". ")[-1]
        dist_lasts = [v.rstrip(".").split(". ")[-1] for v in q["distractorExplanations"].values()]
        if expl_last and all(d == expl_last for d in dist_lasts):
            identical_closers += 1
    if identical_closers:
        raise SystemExit(f"Identical expl/distractor closers: {identical_closers}")

    BANK_PATH.write_text(json.dumps(bank, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {BANK_PATH}")
    print(json.dumps(stats, indent=2))


if __name__ == "__main__":
    main()
