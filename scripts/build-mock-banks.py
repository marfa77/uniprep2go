#!/usr/bin/env python3
"""Build mock exam question banks from Anki Generator finance deck CSVs."""

from __future__ import annotations

import csv
import hashlib
import json
import os
import re
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FINANCE_DIR = Path(
    os.environ.get(
        "ANKI_GENERATOR_FINANCE_DIR",
        "/Users/pavelveselov/Projects/Anki Generator/internal_deck_generator/Finance",
    )
)
INSURANCE_DIR = FINANCE_DIR.parent / "Insurance"
REAL_ESTATE_DIR = FINANCE_DIR.parent / "RealEstate"
SERVSAFE_DIR = FINANCE_DIR.parent / "ServSafe"
OUT_DIR = ROOT / "src" / "data" / "mock-exams"

SIE_SECTION_TO_TOPIC = {
    "SIE-1": "capital-markets",
    "SIE-2": "products-risks",
    "SIE-3": "trading-accounts",
    "SIE-4": "regulatory-framework",
}

SIE_TOPIC_COUNTS = {
    "capital-markets": 12,
    "products-risks": 33,
    "trading-accounts": 23,
    "regulatory-framework": 7,
}

SERVSAFE_SECTION_TO_TOPIC = {
    "SAFE-FOOD": "foodborne-illness",
    "PATHOGENS": "foodborne-illness",
    "ALLERGENS": "foodborne-illness",
    "TIME-TEMP": "time-temperature",
    "ADVANCED-TEMP": "time-temperature",
    "PERSONAL-HYGIENE": "personal-hygiene-contamination",
    "FLOW-OF-FOOD": "personal-hygiene-contamination",
    "CLEAN-SANITIZE": "cleaning-storage",
    "RECEIVING-STORAGE": "cleaning-storage",
    "FACILITY-PEST": "cleaning-storage",
    "MANAGEMENT": "management-haccp",
    "REGULATORY-RECORDS": "management-haccp",
    "FOOD-DEFENSE": "management-haccp",
    "SPECIAL-PROCESS": "management-haccp",
    "SERVICE": "management-haccp",
}

SERVSAFE_TOPIC_COUNTS = {
    "foodborne-illness": 15,
    "time-temperature": 15,
    "personal-hygiene-contamination": 15,
    "cleaning-storage": 21,
    "management-haccp": 24,
}

CFA_SECTION_PREFIX_TO_TOPIC = {
    "ETHICS": "ethics",
    "QM": "quant",
    "ECON": "economics",
    "FRA": "fra",
    "CF": "corp-finance",
    "EQUITY": "equity",
    "FI": "fixed-income",
    "DERIV": "derivatives",
    "ALT": "alternatives",
    "PM": "portfolio",
}

CFA_TOPIC_WEIGHTS = {
    "ethics": 15,
    "quant": 6,
    "economics": 6,
    "fra": 11,
    "corp-finance": 6,
    "equity": 11,
    "fixed-income": 11,
    "derivatives": 5,
    "alternatives": 7,
    "portfolio": 8,
}

FRM_FILES_TO_TOPIC = {
    "frm_part1_foundations_ported.csv": "foundations",
    "frm_part1_p0_authored.csv": "foundations",
    "frm_part1_quant_ported.csv": "quant-analysis",
    "frm_part1_markets_ported.csv": "financial-markets",
    "frm_part1_p1_authored.csv": "financial-markets",
    "frm_part1_valuation_ported.csv": "valuation-models",
}

FRM_TOPIC_WEIGHTS = {
    "foundations": 20,
    "quant-analysis": 20,
    "financial-markets": 30,
    "valuation-models": 30,
}

GENERIC_BANKS = {
    "series-7-readiness-check": {
        "file": FINANCE_DIR / "series7_300_authored.csv",
        "total": 60,
        "section_to_topic": {
            "S7-F1": "s7-f1",
            "S7-F2": "s7-f2",
            "S7-F3": "s7-f3",
            "S7-F4": "s7-f4",
        },
        "weights": {"s7-f1": 7, "s7-f2": 9, "s7-f3": 73, "s7-f4": 11},
        "output": "series-7-preview.json",
    },
    "series-63-readiness-check": {
        "file": FINANCE_DIR / "series63_250_authored.csv",
        "total": 60,
        "section_to_topic": {
            "S63-AGENT": "s63-agent",
            "S63-BD": "s63-bd",
            "S63-ETHICS": "s63-ethics",
            "S63-COMM": "s63-comm",
            "S63-REMEDIES": "s63-remedies",
            "S63-SECURITIES": "s63-securities",
            "S63-IA": "s63-ia",
            "S63-IAR": "s63-iar",
        },
        "weights": {
            "s63-agent": 13,
            "s63-bd": 12,
            "s63-ethics": 25,
            "s63-comm": 20,
            "s63-remedies": 12,
            "s63-securities": 9,
            "s63-ia": 5,
            "s63-iar": 4,
        },
        "output": "series-63-preview.json",
    },
    "california-real-estate-readiness-check": {
        "file": REAL_ESTATE_DIR / "ca_salesperson_400_authored.csv",
        "total": 60,
        "section_to_topic": {
            "CA-PRACTICE": "ca-practice",
            "CA-AGENCY": "ca-agency",
            "CA-OWNERSHIP": "ca-ownership",
            "CA-VALUATION": "ca-valuation",
            "CA-CONTRACTS": "ca-contracts",
            "CA-FINANCING": "ca-financing",
            "CA-TRANSFER": "ca-transfer",
        },
        "weights": {
            "ca-practice": 25,
            "ca-agency": 17,
            "ca-ownership": 15,
            "ca-valuation": 14,
            "ca-contracts": 12,
            "ca-financing": 9,
            "ca-transfer": 8,
        },
        "output": "california-real-estate-preview.json",
    },
    "life-and-health-insurance-readiness-check": {
        "file": INSURANCE_DIR / "life_health_400_authored.csv",
        "total": 60,
        "section_to_topic": {
            "INS-HEALTH": "ins-health",
            "INS-LIFE-BASICS": "ins-life-basics",
            "INS-PROVISIONS": "ins-provisions",
            "INS-GENERAL": "ins-general",
            "INS-ANNUITIES": "ins-annuities",
            "INS-TAX-REGULATION": "ins-tax-regulation",
            "INS-DISABILITY-LTC": "ins-disability-ltc",
        },
        "weights": {
            "ins-health": 21,
            "ins-life-basics": 18,
            "ins-provisions": 18,
            "ins-general": 12,
            "ins-annuities": 11,
            "ins-tax-regulation": 11,
            "ins-disability-ltc": 9,
        },
        "output": "life-and-health-insurance-preview.json",
    },
    "property-casualty-insurance-readiness-check": {
        "file": INSURANCE_DIR / "property_casualty_400_authored.csv",
        "total": 60,
        "section_to_topic": {
            "PC-DWELLING-HOMEOWNERS": "pc-dwelling-homeowners",
            "PC-CASUALTY": "pc-casualty",
            "PC-AUTO": "pc-auto",
            "PC-PROPERTY-BASICS": "pc-property-basics",
            "PC-COMMERCIAL-PROPERTY": "pc-commercial-property",
            "PC-GENERAL": "pc-general",
            "PC-POLICY-REGULATION": "pc-policy-regulation",
        },
        "weights": {
            "pc-dwelling-homeowners": 22,
            "pc-casualty": 18,
            "pc-auto": 15,
            "pc-property-basics": 14,
            "pc-commercial-property": 14,
            "pc-general": 11,
            "pc-policy-regulation": 6,
        },
        "output": "property-casualty-insurance-preview.json",
    },
}


def stable_seed(text: str) -> int:
    digest = hashlib.sha256(text.encode("utf-8")).hexdigest()
    return int(digest[:16], 16)


def mulberry32(seed: int):
    state = seed

    def rng() -> float:
        nonlocal state
        state = (state + 0x6D2B79F5) & 0xFFFFFFFF
        t = state
        t = ((t ^ (t >> 15)) * (t | 1)) & 0xFFFFFFFF
        t ^= (t + ((t ^ (t >> 7)) * (t | 61))) & 0xFFFFFFFF
        return ((t ^ (t >> 14)) & 0xFFFFFFFF) / 4294967296

    return rng


def shuffle(items: list, seed_text: str) -> list:
    copy = list(items)
    rng = mulberry32(stable_seed(seed_text))
    for index in range(len(copy) - 1, 0, -1):
        swap = int(rng() * (index + 1))
        copy[index], copy[swap] = copy[swap], copy[index]
    return copy


def truncate(text: str, limit: int = 220) -> str:
    cleaned = re.sub(r"\s+", " ", text.strip())
    if len(cleaned) <= limit:
        return cleaned
    return cleaned[: limit - 1].rstrip() + "…"


def read_csv_rows(path: Path) -> list[dict[str, str]]:
    with path.open(newline="", encoding="utf-8") as handle:
        return list(csv.DictReader(handle))


def deck_row_to_card(row: dict[str, str], source_file: str) -> dict[str, str]:
    front = (row.get("Front (Question)") or row.get("Front") or "").strip()
    back = (row.get("Back (Answer)") or row.get("Back") or "").strip()
    formula = (row.get("Formula (LaTeX)") or row.get("Formula") or "").strip()
    example = (row.get("Example") or "").strip()
    mistake = (row.get("Common Mistake") or "").strip()
    section = (row.get("Section") or "").strip()
    term = (row.get("Term") or "").strip()
    card_id = f"{source_file}:{section}:{term}:{front[:40]}"
    return {
        "id_seed": card_id,
        "section": section,
        "term": term,
        "front": front,
        "back": back,
        "formula": formula,
        "example": example,
        "mistake": mistake,
        "source_file": source_file,
    }


def build_mcq(card: dict[str, str], topic_id: str, exam_slug: str, pool: list[dict[str, str]], question_index: int) -> dict:
    correct_text = truncate(card["back"])
    seen_texts = {correct_text}
    distractor_pool = []

    for other in pool:
        distractor_text = truncate(other["back"])
        if other["id_seed"] == card["id_seed"] or not distractor_text or distractor_text in seen_texts:
            continue
        seen_texts.add(distractor_text)
        distractor_pool.append(other)

    distractor_pool = shuffle(distractor_pool, f"{exam_slug}:{card['id_seed']}:distractors")
    distractors = distractor_pool[:3]

    while len(distractors) < 3:
        synthetic_text = f"None of the provided deck concepts correctly answer this prompt. ({len(distractors) + 1})"
        distractors.append({"back": synthetic_text, "mistake": "Selected a fallback option because not enough unique sibling cards were available."})

    option_candidates = [
        {"text": correct_text, "is_correct": True, "mistake": ""},
        {"text": truncate(distractors[0]["back"]), "is_correct": False, "mistake": distractors[0].get("mistake", "")},
        {"text": truncate(distractors[1]["back"]), "is_correct": False, "mistake": distractors[1].get("mistake", "")},
        {"text": truncate(distractors[2]["back"]), "is_correct": False, "mistake": distractors[2].get("mistake", "")},
    ]
    shuffled_options = shuffle(option_candidates, f"{exam_slug}:{card['id_seed']}:options")
    option_ids = ["a", "b", "c", "d"]
    options = [
        {"id": option_ids[index], "text": option["text"]}
        for index, option in enumerate(shuffled_options)
    ]
    correct_option = next(
        {"id": option_ids[index], "text": option["text"]}
        for index, option in enumerate(shuffled_options)
        if option["is_correct"]
    )

    explanation_parts = [card["back"]]
    if card["formula"]:
        explanation_parts.append(f"Formula: {card['formula']}")
    if card["example"]:
        explanation_parts.append(f"Example: {card['example']}")
    explanation = " ".join(explanation_parts)

    distractor_explanations = {}
    for option in options:
        if option["id"] == correct_option["id"]:
            continue
        source = next((item for item in shuffled_options if item["text"] == option["text"]), None)
        if source and source.get("mistake"):
            distractor_explanations[option["id"]] = source["mistake"]
        else:
            distractor_explanations[option["id"]] = "This option reflects a different deck concept and is not the best answer to the prompt."

    return {
        "id": f"{exam_slug}-{question_index:03d}",
        "examSlug": exam_slug,
        "topicId": topic_id,
        "prompt": card["front"],
        "formula": card["formula"] or None,
        "options": options,
        "correctOptionId": correct_option["id"],
        "explanation": explanation,
        "distractorExplanations": distractor_explanations,
        "difficulty": "medium",
        "sourceNote": f"From UniPrep2Go deck content ({card['source_file']}, {card['section']}).",
    }


def sample_cards(cards: list[dict[str, str]], count: int, seed: str) -> list[dict[str, str]]:
    if len(cards) <= count:
        return cards
    ordered = shuffle(cards, seed)
    return ordered[:count]


def load_sie_cards() -> dict[str, list[dict[str, str]]]:
    rows = read_csv_rows(FINANCE_DIR / "sie_300_authored.csv")
    grouped: dict[str, list[dict[str, str]]] = defaultdict(list)
    for row in rows:
        section = row.get("Section", "")
        topic = SIE_SECTION_TO_TOPIC.get(section)
        if not topic:
            continue
        grouped[topic].append(deck_row_to_card(row, "sie_300_authored.csv"))
    return grouped


def load_cfa_cards() -> dict[str, list[dict[str, str]]]:
    rows = read_csv_rows(FINANCE_DIR / "cfa_level1_complete.csv")
    grouped: dict[str, list[dict[str, str]]] = defaultdict(list)
    for row in rows:
        section = row.get("Section", "")
        prefix = section.split(" - ")[0].strip() if section else ""
        topic = CFA_SECTION_PREFIX_TO_TOPIC.get(prefix)
        if not topic:
            continue
        grouped[topic].append(deck_row_to_card(row, "cfa_level1_complete.csv"))
    return grouped


def load_frm_cards() -> dict[str, list[dict[str, str]]]:
    grouped: dict[str, list[dict[str, str]]] = defaultdict(list)
    for filename, topic in FRM_FILES_TO_TOPIC.items():
        path = FINANCE_DIR / filename
        if not path.exists():
            continue
        for row in read_csv_rows(path):
            grouped[topic].append(deck_row_to_card(row, filename))
    return grouped


def load_section_mapped_cards(path: Path, section_to_topic: dict[str, str]) -> dict[str, list[dict[str, str]]]:
    grouped: dict[str, list[dict[str, str]]] = defaultdict(list)
    if not path.exists():
        return grouped

    for row in read_csv_rows(path):
        topic = section_to_topic.get((row.get("Section") or "").strip())
        if not topic:
            continue
        grouped[topic].append(deck_row_to_card(row, path.name))

    return grouped


def build_bank(exam_slug: str, grouped: dict[str, list[dict[str, str]]], topic_counts: dict[str, int]) -> list[dict]:
    questions: list[dict] = []
    used_ids: set[str] = set()
    question_index = 1
    all_cards = [card for cards in grouped.values() for card in cards]

    for topic_id, count in topic_counts.items():
        pool = grouped.get(topic_id, [])
        selected = sample_cards(pool, count, f"{exam_slug}:{topic_id}")
        topic_pool = pool if pool else all_cards

        for card in selected:
            if card["id_seed"] in used_ids:
                continue
            questions.append(build_mcq(card, topic_id, exam_slug, topic_pool, question_index))
            used_ids.add(card["id_seed"])
            question_index += 1

    target_total = sum(topic_counts.values())
    if len(questions) < target_total:
        remaining = [card for card in all_cards if card["id_seed"] not in used_ids]
        remaining = sample_cards(remaining, target_total - len(questions), f"{exam_slug}:backfill")

        for card in remaining:
            source_topic = next(
                (topic_id for topic_id, cards in grouped.items() if any(item["id_seed"] == card["id_seed"] for item in cards)),
                next(iter(topic_counts)),
            )
            questions.append(build_mcq(card, source_topic, exam_slug, all_cards, question_index))
            used_ids.add(card["id_seed"])
            question_index += 1

    return questions


def weighted_counts(total: int, weights: dict[str, int]) -> dict[str, int]:
    weight_sum = sum(weights.values())
    raw = {topic: total * weight / weight_sum for topic, weight in weights.items()}
    counts = {topic: int(value) for topic, value in raw.items()}
    remainder = total - sum(counts.values())
    for topic in sorted(weights, key=lambda key: raw[key] - counts[key], reverse=True):
        if remainder <= 0:
            break
        counts[topic] += 1
        remainder -= 1
    return counts


def main() -> None:
    if not FINANCE_DIR.exists():
        raise SystemExit(f"Finance deck directory not found: {FINANCE_DIR}")

    OUT_DIR.mkdir(parents=True, exist_ok=True)

    sie_grouped = load_sie_cards()
    cfa_grouped = load_cfa_cards()
    frm_grouped = load_frm_cards()

    servsafe_grouped = load_section_mapped_cards(
        SERVSAFE_DIR / "servsafe_manager_300_authored.csv",
        SERVSAFE_SECTION_TO_TOPIC,
    )

    banks = {
        "sie-full-mock.json": build_bank("sie-full-mock", sie_grouped, SIE_TOPIC_COUNTS),
        "servsafe-manager-mock.json": build_bank(
            "servsafe-manager-mock",
            servsafe_grouped,
            SERVSAFE_TOPIC_COUNTS,
        ),
        "cfa-level-1-preview.json": build_bank(
            "cfa-level-1-readiness-check",
            cfa_grouped,
            weighted_counts(60, CFA_TOPIC_WEIGHTS),
        ),
        "frm-part-1-preview.json": build_bank(
            "frm-part-1-readiness-check",
            frm_grouped,
            weighted_counts(50, FRM_TOPIC_WEIGHTS),
        ),
    }

    for exam_slug, bank_config in GENERIC_BANKS.items():
        grouped = load_section_mapped_cards(bank_config["file"], bank_config["section_to_topic"])
        banks[bank_config["output"]] = build_bank(
            exam_slug,
            grouped,
            weighted_counts(bank_config["total"], bank_config["weights"]),
        )

    for filename, questions in banks.items():
        out_path = OUT_DIR / filename
        out_path.write_text(json.dumps(questions, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
        print(f"Wrote {len(questions)} questions -> {out_path.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
