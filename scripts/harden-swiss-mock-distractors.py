#!/usr/bin/env python3
"""Rebuild Swiss readiness-check distractors so wrong options stay on-topic.

Keeps each mock's prompt + correct answer; replaces random sibling-card
distractors with answers from related Prep2Go cards (same stem type / section).
"""

from __future__ import annotations

import csv
import hashlib
import json
import re
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DOWNLOADS = Path(
    "/Users/pavelveselov/Projects/prep2go app/Prep2GoStudy — Etsy Downloads"
)

BANKS = [
    {
        "slug": "swiss-citizenship-readiness-check",
        "csv": DOWNLOADS / "swiss_einbuergerung_de_qa.csv",
        "source_note": (
            "Converted from Prep2Go Immigration app Einbürgerung Schweiz deck "
            "(Q&A → MCQ with related in-deck distractors)."
        ),
    },
    {
        "slug": "naturalisation-suisse-readiness-check",
        "csv": DOWNLOADS / "swiss_naturalisation_fr_qa.csv",
        "source_note": (
            "Converted from Prep2Go Immigration app Naturalisation Suisse deck "
            "(Q&A → MCQ with related in-deck distractors)."
        ),
    },
    {
        "slug": "naturalizzazione-svizzera-readiness-check",
        "csv": DOWNLOADS / "swiss_naturalizzazione_it_qa.csv",
        "source_note": (
            "Converted from Prep2Go Immigration app Naturalizzazione Svizzera deck "
            "(Q&A → MCQ with related in-deck distractors)."
        ),
    },
]

SECTION_TO_TOPIC = {
    # DE
    "Politik & Institutionen": "politics-democracy",
    "Direkte Demokratie": "politics-democracy",
    "Geschichte": "history-culture",
    "Kultur & Alltag": "history-culture",
    "Geographie": "geography-society",
    "Sozialsystem": "geography-society",
    "Einbürgerungsverfahren": "naturalisation",
    # FR
    "Politique & institutions": "politics-democracy",
    "Démocratie directe": "politics-democracy",
    "Histoire": "history-culture",
    "Culture & vie quotidienne": "history-culture",
    "Géographie": "geography-society",
    "Système social": "geography-society",
    "Procédure de naturalisation": "naturalisation",
    # IT
    "Politica e istituzioni": "politics-democracy",
    "Democrazia diretta": "politics-democracy",
    "Storia": "history-culture",
    "Cultura e vita quotidiana": "history-culture",
    "Geografia": "geography-society",
    "Sistema sociale": "geography-society",
    "Procedura di naturalizzazione": "naturalisation",
}

STEM_PATTERNS = [
    ("was_ist", re.compile(r"^(was ist|qu['’]est-ce que|cos['’]è|cosa (è|sono))\b", re.I)),
    ("welche", re.compile(r"^(welche|welcher|welches|quels?|quelles?|quali?|qual[ei]?)\b", re.I)),
    ("wie_viele", re.compile(r"^(wie viele|wie lange|combien|comment|quanti|quanto|come)\b", re.I)),
    ("ja_nein", re.compile(r"^(können|kann|gibt es|ist |sind |peut|peuvent|existe|est-ce|possono|può|è vero)", re.I)),
    ("wer", re.compile(r"^(wer |qui |chi )\b", re.I)),
    ("wo", re.compile(r"^(wo |où |dove )\b", re.I)),
    ("wann", re.compile(r"^(wann |quand |quando )\b", re.I)),
]

DISTRACTOR_EXPLAIN = {
    "de": "Klingt plausibel und bleibt im Staatskunde-Kontext, trifft aber nicht den richtigen Sachverhalt.",
    "fr": "Reste dans le contexte civique et paraît plausible, mais ne correspond pas au bon fait.",
    "it": "Resta nel contesto di educazione civica e sembra plausibile, ma non è il fatto corretto.",
}

TOKEN_RE = re.compile(r"[a-zàâäáåãæçéèêëíìîïñóòôöõœúùûüýÿß]+", re.I)


def stable_rng(seed: str):
    h = hashlib.sha256(seed.encode("utf-8")).digest()
    state = int.from_bytes(h[:8], "big")

    def rng() -> float:
        nonlocal state
        state = (1664525 * state + 1013904223) & 0xFFFFFFFF
        return state / 0x100000000

    return rng


def shuffle(items: list, seed: str) -> list:
    copy = list(items)
    rng = stable_rng(seed)
    for i in range(len(copy) - 1, 0, -1):
        j = int(rng() * (i + 1))
        copy[i], copy[j] = copy[j], copy[i]
    return copy


def truncate(text: str, limit: int = 220) -> str:
    cleaned = re.sub(r"\s+", " ", text.strip())
    if len(cleaned) <= limit:
        return cleaned
    return cleaned[: limit - 1].rstrip() + "…"


def tokens(text: str) -> set[str]:
    return {t.lower() for t in TOKEN_RE.findall(text) if len(t) > 3}


def stem_type(question: str) -> str:
    q = question.strip()
    for name, pattern in STEM_PATTERNS:
        if pattern.search(q):
            return name
    return "other"


def answer_shape(answer: str) -> str:
    a = answer.strip()
    low = a.lower()
    if re.match(r"^(ja|nein|oui|non|s[ìi]|no)\b", low):
        return "yes_no"
    if re.search(r"\d", a):
        return "numeric"
    if len(a) <= 40 and "," not in a and " und " not in low and " et " not in low and " e " not in f" {low} ":
        return "short"
    if a.count(",") >= 2 or " und " in low or " et " in low:
        return "list"
    return "definition"


def jaccard(a: set[str], b: set[str]) -> float:
    if not a or not b:
        return 0.0
    return len(a & b) / len(a | b)


def load_cards(path: Path) -> list[dict]:
    rows = list(csv.DictReader(path.open(encoding="utf-8")))
    cards = []
    for row in rows:
        question = (row.get("Question") or "").strip()
        answer = (row.get("Answer") or "").strip()
        section = (row.get("Section") or "").strip()
        if not question or not answer:
            continue
        section_l = section.lower()
        if section_l.startswith(("einführung", "introduction", "introduzione")):
            continue
        q_l = question.lower()
        if q_l.startswith(("willkommen", "bienvenue", "benvenut")):
            continue
        cards.append(
            {
                "section": section,
                "topic": SECTION_TO_TOPIC.get(section, "politics-democracy"),
                "question": question,
                "answer": truncate(answer),
                "stem": stem_type(question),
                "shape": answer_shape(answer),
                "q_tokens": tokens(question),
                "a_tokens": tokens(answer),
            }
        )
    return cards


TOPIC_NEIGHBORS = {
    "politics-democracy": {"politics-democracy", "naturalisation"},
    "history-culture": {"history-culture", "geography-society"},
    "geography-society": {"geography-society", "naturalisation", "history-culture"},
    "naturalisation": {"naturalisation", "politics-democracy", "geography-society"},
}


def opening_pattern(answer: str) -> str:
    words = TOKEN_RE.findall(answer.lower())
    return " ".join(words[:2]) if words else ""


def score_candidate(target: dict, candidate: dict) -> float:
    if candidate["answer"] == target["answer"]:
        return -1e9
    if jaccard(candidate["a_tokens"], target["a_tokens"]) > 0.85:
        return -1e9

    score = 0.0
    if candidate["stem"] == target["stem"]:
        score += 8.0
    if candidate["shape"] == target["shape"]:
        score += 6.0
    if candidate["topic"] == target["topic"]:
        score += 7.0
    elif candidate["topic"] in TOPIC_NEIGHBORS.get(target["topic"], set()):
        score += 3.5
    else:
        score -= 2.0
    if candidate["section"] == target["section"]:
        score += 3.0

    score += 12.0 * jaccard(candidate["q_tokens"], target["q_tokens"])
    score += 3.0 * jaccard(candidate["a_tokens"], target["q_tokens"])
    if opening_pattern(candidate["answer"]) and opening_pattern(candidate["answer"]) == opening_pattern(
        target["answer"]
    ):
        score += 4.0
    len_ratio = min(len(candidate["answer"]), len(target["answer"])) / max(
        len(candidate["answer"]), len(target["answer"]), 1
    )
    score += 2.0 * len_ratio
    return score


def generate_near_misses(correct: str, pool: list[dict], topic: str) -> list[str]:
    """Plausible same-frame wrong answers (harder than unrelated card backs)."""
    misses: list[str] = []
    text = correct
    neighbor_topics = TOPIC_NEIGHBORS.get(topic, {topic})

    # Swap work/residence framing (Grenzgänger-style confusions).
    swaps = [
        ("arbeitet, aber in einem Nachbarland wohnt", "wohnt, aber in einem Nachbarland arbeitet"),
        ("travaille en Suisse mais habite", "habite en Suisse mais travaille"),
        ("lavora in Svizzera ma abita", "abita in Svizzera ma lavora"),
        ("in der Schweiz arbeitet, aber in einem Nachbarland wohnt", "in der Schweiz wohnt und dort auch arbeitet"),
        ("Nationalrat und der Ständerat", "Nationalrat und der Bundesrat"),
        ("Bund (Eidgenossenschaft), Kantone (Stände) und Gemeinden", "Bund, Kantone und Bezirke"),
        ("Bund (Eidgenossenschaft), Kantone (Stände) und Gemeinden", "Kantone, Gemeinden und Bezirke"),
        ("Confédération, cantons et communes", "Confédération, cantons et districts"),
        ("Confédération, cantons et communes", "cantons, communes et districts"),
        ("Confederazione, Cantoni e Comuni", "Confederazione, Cantoni e Distretti"),
        ("Confederazione, Cantoni e Comuni", "Cantoni, Comuni e Distretti"),
        ("10 Jahre", "5 Jahre"),
        ("10 ans", "5 ans"),
        ("10 anni", "5 anni"),
        ("B1 mündlich und A2 schriftlich", "A2 mündlich und B1 schriftlich"),
        ("B1 mündlich und A2 schriftlich", "B2 mündlich und B1 schriftlich"),
        ("B1 mündlich und A2 schriftlich", "A2 mündlich und A2 schriftlich"),
        ("B1 à l'oral et A2 à l'écrit", "A2 à l'oral et B1 à l'écrit"),
        ("B1 à l'oral et A2 à l'écrit", "B2 à l'oral et B1 à l'écrit"),
        ("B1 orale e A2 scritto", "A2 orale e B1 scritto"),
        ("B1 orale e A2 scritto", "B2 orale e B1 scritto"),
        ("Bund, Kantone und Bezirke", "Kantone, Gemeinden und Bezirke"),
        ("C-Bewilligung", "B-Bewilligung"),
        ("permis C", "permis B"),
        ("permesso C", "permesso B"),
        ("Mehrheit des Volkes und einer Mehrheit der Kantone", "Mehrheit des Volkes — ohne Ständemehr"),
        ("majorité du peuple et une majorité des cantons", "seulement une majorité du peuple"),
        ("maggioranza del popolo e una maggioranza dei Cantoni", "solo una maggioranza del popolo"),
        ("Bund (Eidgenossenschaft), Kantone (Stände) und Gemeinden", "Bund und Kantone — ohne Gemeinden"),
        ("Confédération, cantons et communes", "Confédération et cantons — sans les communes"),
        ("Confederazione, Cantoni e Comuni", "Confederazione e Cantoni — senza i Comuni"),
        ("Uri, Schwyz und Unterwalden", "Bern, Zürich und Luzern"),
        ("Uri, Schwyz et Unterwald", "Berne, Zurich et Lucerne"),
        ("Uri, Svitto e Untervaldo", "Berna, Zurigo e Lucerna"),
    ]
    for old, new in swaps:
        if old in text:
            candidate = truncate(text.replace(old, new, 1))
            if candidate != truncate(text):
                misses.append(candidate)

    # Standalone year/count confusions only (avoid turning B1 into B10).
    numbers = sorted({m.group(0) for m in re.finditer(r"(?<![A-Za-z])\d{1,4}(?![A-Za-z])", correct)})
    pool_numbers = []
    for card in pool:
        pool_numbers.extend(re.findall(r"(?<![A-Za-z])\d{1,4}(?![A-Za-z])", card["answer"]))
    # Prefer common Swiss civics distractor numbers.
    preferred_alts = ["5", "3", "8", "12", "26", "46", "1848", "1291", "1971"]
    for num in numbers:
        alts = [a for a in preferred_alts + pool_numbers if a != num]
        for alt in alts[:4]:
            candidate = truncate(re.sub(rf"(?<![A-Za-z]){re.escape(num)}(?![A-Za-z])", alt, text, count=1))
            if candidate != truncate(text) and candidate not in misses:
                misses.append(candidate)
            if len(misses) >= 5:
                break
        if len(misses) >= 5:
            break

    # Person-status confusions for Grenzgänger-like answers.
    if re.search(r"\b(eine person|une personne|una persona)\b", text, re.I):
        person_misses = [
            "Eine Person, die nur mit Touristenvisum vorübergehend in der Schweiz arbeitet.",
            "Eine Person mit C-Bewilligung, die ihren Wohnsitz und Arbeitsort in der Schweiz hat.",
            "Une personne qui séjourne temporairement en Suisse avec un visa de tourisme.",
            "Une personne au bénéfice d'un permis C qui habite et travaille en Suisse.",
            "Una persona che soggiorna temporaneamente in Svizzera con un visto turistico.",
            "Una persona con permesso C che abita e lavora in Svizzera.",
        ]
        if "Eine Person" in text:
            person_misses = [m for m in person_misses if m.startswith("Eine ")]
        elif "Une personne" in text or "une personne" in text.lower():
            person_misses = [m for m in person_misses if m.startswith("Une ")]
        elif "Una persona" in text or "una persona" in text.lower():
            person_misses = [m for m in person_misses if m.startswith("Una ")]
        for candidate in person_misses:
            if candidate != truncate(text) and candidate not in misses:
                misses.append(candidate)

    # Same opening + neighboring-topic definition confusions.
    opener = opening_pattern(correct)
    if opener and opener not in {"eine person", "une personne", "una persona"}:
        for card in pool:
            if card["topic"] not in neighbor_topics:
                continue
            if opening_pattern(card["answer"]) != opener:
                continue
            if card["answer"] == truncate(correct):
                continue
            if card["shape"] == answer_shape(correct):
                misses.append(card["answer"])
            if len(misses) >= 6:
                break

    # Deduplicate while preserving order.
    seen: set[str] = set()
    unique: list[str] = []
    for item in misses:
        if item in seen or item == truncate(correct):
            continue
        seen.add(item)
        unique.append(item)
    return unique


def pick_distractors(target: dict, pool: list[dict], exam_slug: str, qid: str) -> list[str]:
    chosen: list[str] = []
    seen = {target["answer"]}

    # Prefer crafted near-misses so every option stays in-frame.
    for text in generate_near_misses(target["answer"], pool, target["topic"]):
        if text in seen:
            continue
        seen.add(text)
        chosen.append(text)
        if len(chosen) == 3:
            break

    ranked = sorted(
        ((score_candidate(target, card), card) for card in pool),
        key=lambda item: item[0],
        reverse=True,
    )
    neighbors = TOPIC_NEIGHBORS.get(target["topic"], {target["topic"]})
    for score, card in ranked:
        if len(chosen) >= 3:
            break
        text = card["answer"]
        if text in seen:
            continue
        if card["shape"] != target["shape"] and score < 14:
            continue
        if card["topic"] not in neighbors and score < 16:
            continue
        seen.add(text)
        chosen.append(text)

    if len(chosen) < 3:
        for key in ("stem", "topic", None):
            for card in shuffle(pool, f"{exam_slug}:{qid}:fallback:{key}"):
                if key == "stem" and card["stem"] != target["stem"]:
                    continue
                if key == "topic" and card["topic"] != target["topic"]:
                    continue
                text = card["answer"]
                if text in seen:
                    continue
                seen.add(text)
                chosen.append(text)
                if len(chosen) == 3:
                    break
            if len(chosen) == 3:
                break

    while len(chosen) < 3:
        filler = f"Keine der anderen Antwortoptionen trifft auf diese Frage zu ({len(chosen) + 1})."
        if filler not in seen:
            chosen.append(filler)
            seen.add(filler)
    return chosen[:3]


def normalize(text: str) -> str:
    return re.sub(r"\s+", " ", text.strip().lower())


def find_card(prompt: str, correct: str, pool: list[dict]) -> dict | None:
    n_prompt = normalize(prompt)
    n_correct = normalize(correct)
    for card in pool:
        if normalize(card["question"]) == n_prompt:
            return card
    for card in pool:
        if normalize(card["answer"]) == n_correct:
            return card
    # Fuzzy: prompt containment
    for card in pool:
        if n_prompt[:40] and n_prompt[:40] in normalize(card["question"]):
            return card
    return None


def rebuild_bank(spec: dict) -> dict:
    path = ROOT / "src/data/mock-exams" / f"{spec['slug']}.json"
    bank = json.loads(path.read_text(encoding="utf-8"))
    pool = load_cards(spec["csv"])
    lang = (
        "de"
        if "swiss-citizenship" in spec["slug"]
        else "fr"
        if "suisse" in spec["slug"]
        else "it"
    )
    explain = DISTRACTOR_EXPLAIN[lang]

    rebuilt = []
    weak = 0
    for question in bank:
        correct = next(o["text"] for o in question["options"] if o["id"] == question["correctOptionId"])
        matched = find_card(question["prompt"], correct, pool)
        target = matched or {
            "section": "",
            "topic": question["topicId"],
            "question": question["prompt"],
            "answer": truncate(correct),
            "stem": stem_type(question["prompt"]),
            "shape": answer_shape(correct),
            "q_tokens": tokens(question["prompt"]),
            "a_tokens": tokens(correct),
        }
        # Keep bank answer text; prefer CSV section/topic for distractor affinity.
        target = {
            **target,
            "answer": truncate(correct),
            "question": question["prompt"],
            "stem": stem_type(question["prompt"]),
            "shape": answer_shape(correct),
            "q_tokens": tokens(question["prompt"]),
            "a_tokens": tokens(correct),
        }

        distractors = pick_distractors(target, pool, spec["slug"], question["id"])
        top_scores = [
            score_candidate(target, c)
            for c in pool
            if c["answer"] in distractors
        ]
        if not top_scores or max(top_scores) < 6:
            weak += 1

        option_payload = [{"text": truncate(correct), "correct": True}] + [
            {"text": d, "correct": False} for d in distractors
        ]
        shuffled = shuffle(option_payload, f"{spec['slug']}:{question['id']}:opts-v2")
        ids = ["a", "b", "c", "d"]
        options = [{"id": ids[i], "text": item["text"]} for i, item in enumerate(shuffled)]
        correct_id = next(ids[i] for i, item in enumerate(shuffled) if item["correct"])

        rebuilt.append(
            {
                **question,
                "options": options,
                "correctOptionId": correct_id,
                "explanation": truncate(correct, 400),
                "distractorExplanations": {
                    opt["id"]: explain for opt in options if opt["id"] != correct_id
                },
                "difficulty": "medium",
                "sourceNote": spec["source_note"],
            }
        )

    path.write_text(json.dumps(rebuilt, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return {"slug": spec["slug"], "count": len(rebuilt), "weak": weak, "pool": len(pool)}


def overlap_share(bank: list[dict]) -> float:
    off = tot = 0
    for q in bank:
        prompt_tokens = tokens(q["prompt"])
        correct = next(o["text"] for o in q["options"] if o["id"] == q["correctOptionId"])
        correct_shape = answer_shape(correct)
        for opt in q["options"]:
            if opt["id"] == q["correctOptionId"]:
                continue
            tot += 1
            # "on topic" if same shape OR shares tokens with prompt OR high stem family
            if answer_shape(opt["text"]) == correct_shape or tokens(opt["text"]) & prompt_tokens:
                continue
            off += 1
    return off / tot if tot else 0.0


def main() -> None:
    for spec in BANKS:
        stats = rebuild_bank(spec)
        bank = json.loads((ROOT / "src/data/mock-exams" / f"{spec['slug']}.json").read_text())
        print(
            f"{stats['slug']}: {stats['count']}Q pool={stats['pool']} "
            f"weakish={stats['weak']} offTopicShare={overlap_share(bank):.2f}"
        )
        # Spot-check Grenzgänger / equivalent
        sample = next((q for q in bank if "Grenzgänger" in q["prompt"] or "frontalier" in q["prompt"].lower() or "frontalier" in q["prompt"] or "frontalieri" in q["prompt"].lower() or "frontaliere" in q["prompt"].lower()), None)
        if sample:
            print("  sample:", sample["prompt"])
            for opt in sample["options"]:
                mark = "*" if opt["id"] == sample["correctOptionId"] else " "
                print(f"   {mark}{opt['id']}: {opt['text'][:100]}")


if __name__ == "__main__":
    main()
