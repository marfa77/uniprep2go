#!/usr/bin/env python3
"""Harden citizenship readiness-check distractors (related / near-miss options).

Keeps each question's prompt + correct answer; rebuilds wrong options from the
source Prep2Go / Etsy Q&A pool using stem/shape/section affinity and light
near-miss mutations (number swaps, yes/no flips, same-frame confusions).
"""

from __future__ import annotations

import csv
import hashlib
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DOWNLOADS = Path(
    "/Users/pavelveselov/Projects/prep2go app/Prep2GoStudy — Etsy Downloads"
)
ANKI_OUT = Path("/Users/pavelveselov/Projects/Anki Generator/out")

# slug -> source CSV (Question/Answer or front/back)
SOURCES: dict[str, Path] = {
    "swiss-citizenship-readiness-check": DOWNLOADS / "swiss_einbuergerung_de_qa.csv",
    "naturalisation-suisse-readiness-check": DOWNLOADS / "swiss_naturalisation_fr_qa.csv",
    "naturalizzazione-svizzera-readiness-check": DOWNLOADS
    / "swiss_naturalizzazione_it_qa.csv",
    "leben-in-deutschland-readiness-check": ANKI_OUT
    / "prep2go_Leben_in_Deutschland/source.csv",
    "naturalisation-francaise-readiness-check": ANKI_OUT
    / "prep2go_Naturalisation_francaise/source.csv",
    "life-in-the-uk-readiness-check": ANKI_OUT / "prep2go_Life_in_the_UK/source.csv",
    "canadian-citizenship-readiness-check": ANKI_OUT
    / "prep2go_Canadian_Citizenship/source.csv",
    "australian-citizenship-readiness-check": ANKI_OUT
    / "prep2go_Australian_Citizenship/source.csv",
    "us-citizenship-readiness-check": ANKI_OUT / "prep2go_US_Citizenship/source.csv",
    "ccse-espana-readiness-check": DOWNLOADS / "ccse_espana_qa.csv",
    "czech-citizenship-readiness-check": DOWNLOADS / "czech_obcanstvi_qa.csv",
    "polish-citizenship-readiness-check": DOWNLOADS / "poland_obywatelstwo_qa.csv",
    "denmark-indfoedsretsproeven-readiness-check": DOWNLOADS
    / "denmark_indfoedsretsprove_qa.csv",
    "portugal-nacionalidade-readiness-check": DOWNLOADS / "portugal_nacionalidade_qa.csv",
    "norway-statsborgerproven-readiness-check": DOWNLOADS / "norway_statsborgerprove_qa.csv",
    "sweden-medborgarskapsprov-readiness-check": DOWNLOADS
    / "sweden_medborgarskapsprov_qa.csv",
    "belgium-flanders-mo-readiness-check": DOWNLOADS / "belgium_flanders_mo_qa.csv",
    "belgium-wallonie-citoyennete-readiness-check": DOWNLOADS
    / "belgium_wallonie_citoyennete_qa.csv",
    "luxembourg-vivre-ensemble-readiness-check": DOWNLOADS
    / "luxembourg_vivre_ensemble_qa.csv",
}

STEM_PATTERNS = [
    ("was_ist", re.compile(r"^(was ist|qu['’]est-ce|cos['’]è|cosa |what is|what are|welche|welcher|welches|quels?|quelles?|quali?|qual)\b", re.I)),
    ("how_many", re.compile(r"^(wie viele|wie lange|how many|how long|combien|comment|quanti|quanto|kolik|ile)\b", re.I)),
    ("yes_no", re.compile(r"^(können|kann|gibt es|ist |sind |can |do |does |is |are |peut|peuvent|existe|est-ce|possono|può|ano |ne |tak |czy )\b", re.I)),
    ("who", re.compile(r"^(wer |who |qui |chi |kdo |kto )\b", re.I)),
    ("where", re.compile(r"^(wo |where |où |dove |kde |gdzie )\b", re.I)),
    ("when", re.compile(r"^(wann |when |quand |quando |kdy |kiedy )\b", re.I)),
    ("which", re.compile(r"^(which |name one|name two|nenne|citez|indiquez)\b", re.I)),
]

TOKEN_RE = re.compile(r"[a-zàâäáåãæçéèêëíìîïñóòôöõœúùûüýÿßąćęłńóśźżěščřžýůúďťň]+", re.I)

YES_NO_FLIPS = [
    (re.compile(r"^(ja)\b", re.I), "Nein"),
    (re.compile(r"^(nein)\b", re.I), "Ja"),
    (re.compile(r"^(oui)\b", re.I), "Non"),
    (re.compile(r"^(non)\b", re.I), "Oui"),
    (re.compile(r"^(yes)\b", re.I), "No"),
    (re.compile(r"^(no)\b(?!,)", re.I), "Yes"),
    (re.compile(r"^(sì|si)\b", re.I), "No"),
    (re.compile(r"^(ano)\b", re.I), "Ne"),
    (re.compile(r"^(ne)\b", re.I), "Ano"),
    (re.compile(r"^(tak)\b", re.I), "Nie"),
    (re.compile(r"^(nie)\b", re.I), "Tak"),
]

# Light same-frame confusions that apply across several citizenship decks.
GENERIC_SWAPS = [
    # Swiss (kept)
    ("arbeitet, aber in einem Nachbarland wohnt", "wohnt, aber in einem Nachbarland arbeitet"),
    ("Bund (Eidgenossenschaft), Kantone (Stände) und Gemeinden", "Bund, Kantone und Bezirke"),
    ("Bund (Eidgenossenschaft), Kantone (Stände) und Gemeinden", "Bund und Kantone — ohne Gemeinden"),
    ("B1 mündlich und A2 schriftlich", "A2 mündlich und B1 schriftlich"),
    ("Mehrheit des Volkes und einer Mehrheit der Kantone", "Mehrheit des Volkes — ohne Ständemehr"),
    # US / EN civics
    ("legislative, executive, and judicial", "legislative and executive only"),
    ("the Constitution", "the Declaration of Independence"),
    ("the Bill of Rights", "the Articles of Confederation"),
    ("100", "50"),
    ("435", "100"),
    ("27", "10"),
    ("nine", "seven"),
    ("Speaker of the House", "President pro tempore"),
    # UK
    ("House of Commons", "House of Lords"),
    ("Magna Carta", "Bill of Rights 1689"),
    # CA / AU
    ("constitutional monarchy", "federal republic"),
    ("Governor General", "Prime Minister"),
    ("House of Representatives", "Senate"),
    # FR
    ("Assemblée nationale", "Sénat"),
    ("Président de la République", "Premier ministre"),
    # DE LiD-ish
    ("Bundesrat", "Bundestag"),
    ("Bundespräsident", "Bundeskanzler"),
    ("Grundgesetz", "Bürgerliches Gesetzbuch"),
]


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
    if re.match(r"^(ja|nein|oui|non|yes|no|s[ìi]|ano|ne|tak|nie)\b", low):
        return "yes_no"
    if re.search(r"\d", a):
        return "numeric"
    if len(a) <= 45 and "," not in a:
        return "short"
    if a.count(",") >= 2 or " and " in low or " und " in low or " et " in low:
        return "list"
    return "definition"


def jaccard(a: set[str], b: set[str]) -> float:
    if not a or not b:
        return 0.0
    return len(a & b) / len(a | b)


def opening_pattern(answer: str) -> str:
    words = TOKEN_RE.findall(answer.lower())
    return " ".join(words[:2]) if words else ""


def load_cards(path: Path) -> list[dict]:
    rows = list(csv.DictReader(path.open(encoding="utf-8", errors="replace")))
    cards = []
    for row in rows:
        question = (
            row.get("Question") or row.get("front") or row.get("Front") or ""
        ).strip()
        answer = (row.get("Answer") or row.get("back") or row.get("Back") or "").strip()
        section = (row.get("Section") or row.get("section") or "").strip()
        if not question or not answer:
            continue
        section_l = section.lower()
        q_l = question.lower()
        if section_l.startswith(("einführung", "introduction", "introduzione", "intro")):
            continue
        if q_l.startswith(("willkommen", "bienvenue", "benvenut", "welcome")):
            continue
        cards.append(
            {
                "section": section,
                "question": question,
                "answer": truncate(answer),
                "stem": stem_type(question),
                "shape": answer_shape(answer),
                "q_tokens": tokens(question),
                "a_tokens": tokens(answer),
            }
        )
    return cards


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
    if target.get("section") and candidate["section"] == target["section"]:
        score += 7.0
    elif target.get("section") and candidate["section"] and candidate["section"] != target["section"]:
        score -= 1.0

    score += 12.0 * jaccard(candidate["q_tokens"], target["q_tokens"])
    score += 3.0 * jaccard(candidate["a_tokens"], target["q_tokens"])
    if opening_pattern(candidate["answer"]) and opening_pattern(candidate["answer"]) == opening_pattern(
        target["answer"]
    ):
        score += 3.5
    len_ratio = min(len(candidate["answer"]), len(target["answer"])) / max(
        len(candidate["answer"]), len(target["answer"]), 1
    )
    score += 2.0 * len_ratio
    return score


def generate_near_misses(correct: str, pool: list[dict], section: str) -> list[str]:
    misses: list[str] = []
    text = correct

    for old, new in GENERIC_SWAPS:
        if old.lower() in text.lower():
            # case-sensitive replace on original occurrence
            idx = text.lower().find(old.lower())
            if idx >= 0:
                candidate = truncate(text[:idx] + new + text[idx + len(old) :])
                if candidate != truncate(text):
                    misses.append(candidate)

    for pattern, flip in YES_NO_FLIPS:
        if pattern.search(text):
            # Keep remainder after first word
            rest = re.sub(r"^\S+\s*", "", text, count=1).strip()
            candidate = truncate(f"{flip} {rest}".strip() if rest else flip)
            if candidate != truncate(text):
                misses.append(candidate)
            break

    numbers = sorted({m.group(0) for m in re.finditer(r"(?<![A-Za-z])\d{1,4}(?![A-Za-z])", correct)})
    preferred_small = ["2", "3", "4", "5", "7", "8", "9", "10", "12", "26", "50", "100", "435"]
    preferred_years = ["1066", "1215", "1689", "1776", "1787", "1789", "1848", "1867", "1901", "1918", "1945", "1971"]
    pool_numbers = []
    for card in pool:
        pool_numbers.extend(re.findall(r"(?<![A-Za-z])\d{1,4}(?![A-Za-z])", card["answer"]))
    for num in numbers:
        if len(num) >= 4:
            alts = [a for a in preferred_years + [n for n in pool_numbers if len(n) >= 4] if a != num]
        else:
            alts = [a for a in preferred_small + [n for n in pool_numbers if len(n) <= 3] if a != num]
        for alt in alts[:5]:
            candidate = truncate(
                re.sub(rf"(?<![A-Za-z]){re.escape(num)}(?![A-Za-z])", alt, text, count=1)
            )
            if candidate != truncate(text) and candidate not in misses:
                misses.append(candidate)
            if len(misses) >= 5:
                break
        if len(misses) >= 5:
            break

    opener = opening_pattern(correct)
    if opener:
        for card in pool:
            if section and card["section"] and card["section"] != section:
                # allow nearby only via opener match in same section primarily
                continue
            if opening_pattern(card["answer"]) != opener:
                continue
            if card["answer"] == truncate(correct):
                continue
            if card["shape"] == answer_shape(correct):
                misses.append(card["answer"])
            if len(misses) >= 6:
                break

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

    for text in generate_near_misses(target["answer"], pool, target.get("section", "")):
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
    for score, card in ranked:
        if len(chosen) >= 3:
            break
        text = card["answer"]
        if text in seen:
            continue
        if card["shape"] != target["shape"] and score < 12:
            continue
        if target.get("section") and card["section"] and card["section"] != target["section"] and score < 14:
            continue
        seen.add(text)
        chosen.append(text)

    if len(chosen) < 3:
        for key in ("stem", "section", None):
            for card in shuffle(pool, f"{exam_slug}:{qid}:fallback:{key}"):
                if key == "stem" and card["stem"] != target["stem"]:
                    continue
                if key == "section" and target.get("section") and card["section"] != target["section"]:
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
        filler = f"(Related concept — not the best answer.) ({len(chosen) + 1})"
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
    for card in pool:
        if n_prompt[:48] and n_prompt[:48] in normalize(card["question"]):
            return card
    return None


def explain_for_slug(slug: str) -> str:
    if "swiss" in slug or "suisse" in slug or "svizzera" in slug or "leben" in slug:
        return "Klingt plausibel im Staatskunde-Kontext, trifft aber nicht den richtigen Sachverhalt."
    if "francaise" in slug or "wallonie" in slug or "luxembourg" in slug or "portugal" in slug:
        return "Reste dans le contexte civique et paraît plausible, mais ne correspond pas au bon fait."
    if "svizzera" in slug or "naturalizzazione" in slug:
        return "Resta nel contesto civico e sembra plausibile, ma non è il fatto corretto."
    if "ccse" in slug or "espana" in slug:
        return "Suena plausible en el contexto cívico, pero no es la respuesta correcta."
    if "czech" in slug:
        return "Zní věrohodně v kontextu občanských znalostí, ale není to správná odpověď."
    if "polish" in slug:
        return "Brzmi wiarygodnie w kontekście wiedzy obywatelskiej, ale nie jest poprawną odpowiedzią."
    if "denmark" in slug:
        return "Lyder plausibelt i en borgerfaglig kontekst, men er ikke det rigtige svar."
    if "norway" in slug:
        return "Høres plausibelt ut i en samfunnskunnskapskontekst, men er ikke riktig svar."
    if "sweden" in slug:
        return "Låter rimligt i samhällskunskapskontext, men är inte rätt svar."
    if "flanders" in slug:
        return "Klinkt aannemelijk in een maatschappelijke context, maar is niet het juiste antwoord."
    return "Sounds plausible in a civics context, but is not the correct answer."


SOURCE_NOTES = {
    "swiss-citizenship-readiness-check": "Converted from Prep2Go Immigration app Einbürgerung Schweiz deck (Q&A → MCQ with related/near-miss distractors).",
    "naturalisation-suisse-readiness-check": "Converted from Prep2Go Immigration app Naturalisation Suisse deck (Q&A → MCQ with related/near-miss distractors).",
    "naturalizzazione-svizzera-readiness-check": "Converted from Prep2Go Immigration app Naturalizzazione Svizzera deck (Q&A → MCQ with related/near-miss distractors).",
    "leben-in-deutschland-readiness-check": "Converted from Prep2Go Immigration app Naturalization deck (Q&A → MCQ with related/near-miss distractors).",
    "naturalisation-francaise-readiness-check": "Converted from Prep2Go Immigration app Naturalization deck (Q&A → MCQ with related/near-miss distractors).",
    "life-in-the-uk-readiness-check": "Converted from Prep2Go Immigration app Naturalization deck (Q&A → MCQ with related/near-miss distractors).",
    "canadian-citizenship-readiness-check": "Converted from Prep2Go Immigration app Naturalization deck (Q&A → MCQ with related/near-miss distractors).",
    "australian-citizenship-readiness-check": "Converted from Prep2Go Immigration app Naturalization deck (Q&A → MCQ with related/near-miss distractors).",
    "us-citizenship-readiness-check": "Converted from Prep2Go Immigration app Naturalization deck (Q&A → MCQ with related/near-miss distractors).",
    "ccse-espana-readiness-check": "Converted from Prep2Go Immigration app CCSE (España) deck (Q&A → MCQ with related/near-miss distractors).",
    "czech-citizenship-readiness-check": "Converted from Prep2Go Immigration app Czech Citizenship deck (Q&A → MCQ with related/near-miss distractors).",
    "polish-citizenship-readiness-check": "Converted from Prep2Go Immigration app Polish Citizenship deck (Q&A → MCQ with related/near-miss distractors).",
    "denmark-indfoedsretsproeven-readiness-check": "Converted from Prep2Go Immigration app Denmark Indfødsretsprøven deck (Q&A → MCQ with related/near-miss distractors).",
    "portugal-nacionalidade-readiness-check": "Converted from Prep2Go Immigration app Portugal Nacionalidade deck (Q&A → MCQ with related/near-miss distractors).",
    "norway-statsborgerproven-readiness-check": "Converted from Prep2Go Immigration app Norway Statsborgerprøven deck (Q&A → MCQ with related/near-miss distractors).",
    "sweden-medborgarskapsprov-readiness-check": "Converted from Prep2Go Immigration app Sweden Medborgarskapsprov deck (Q&A → MCQ with related/near-miss distractors).",
    "belgium-flanders-mo-readiness-check": "Converted from Prep2Go Immigration app Belgium Flanders MO deck (Q&A → MCQ with related/near-miss distractors).",
    "belgium-wallonie-citoyennete-readiness-check": "Converted from Prep2Go Immigration app Belgium Wallonie Citoyenneté deck (Q&A → MCQ with related/near-miss distractors).",
    "luxembourg-vivre-ensemble-readiness-check": "Converted from Prep2Go Immigration app Luxembourg Vivre ensemble deck (Q&A → MCQ with related/near-miss distractors).",
}


def rebuild_bank(slug: str, csv_path: Path) -> dict:
    path = ROOT / "src/data/mock-exams" / f"{slug}.json"
    bank = json.loads(path.read_text(encoding="utf-8"))
    pool = load_cards(csv_path)
    if len(pool) < 10:
        raise RuntimeError(f"{slug}: pool too small ({len(pool)}) from {csv_path}")

    explain = explain_for_slug(slug)
    note = SOURCE_NOTES.get(slug)
    rebuilt = []
    for question in bank:
        correct = next(o["text"] for o in question["options"] if o["id"] == question["correctOptionId"])
        matched = find_card(question["prompt"], correct, pool)
        target = matched or {
            "section": "",
            "question": question["prompt"],
            "answer": truncate(correct),
            "stem": stem_type(question["prompt"]),
            "shape": answer_shape(correct),
            "q_tokens": tokens(question["prompt"]),
            "a_tokens": tokens(correct),
        }
        target = {
            **target,
            "answer": truncate(correct),
            "question": question["prompt"],
            "stem": stem_type(question["prompt"]),
            "shape": answer_shape(correct),
            "q_tokens": tokens(question["prompt"]),
            "a_tokens": tokens(correct),
        }

        distractors = pick_distractors(target, pool, slug, question["id"])
        option_payload = [{"text": truncate(correct), "correct": True}] + [
            {"text": d, "correct": False} for d in distractors
        ]
        shuffled = shuffle(option_payload, f"{slug}:{question['id']}:opts-v3")
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
                "difficulty": question.get("difficulty") or "medium",
                "sourceNote": note
                or question.get("sourceNote")
                or "Converted from Prep2Go Immigration app deck (Q&A → MCQ with related/near-miss distractors).",
            }
        )

    path.write_text(json.dumps(rebuilt, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return {"slug": slug, "count": len(rebuilt), "pool": len(pool)}


def main() -> None:
    import sys

    only = set(sys.argv[1:]) if len(sys.argv) > 1 else set(SOURCES)
    for slug, csv_path in SOURCES.items():
        if slug not in only:
            continue
        if not csv_path.exists():
            print(f"SKIP missing csv {slug}: {csv_path}")
            continue
        if not (ROOT / "src/data/mock-exams" / f"{slug}.json").exists():
            print(f"SKIP missing bank {slug}")
            continue
        stats = rebuild_bank(slug, csv_path)
        print(f"{stats['slug']}: {stats['count']}Q pool={stats['pool']}")


if __name__ == "__main__":
    main()
