#!/usr/bin/env python3
"""Rewrite one civic ops bank: year-virus, thin copy, mistags, known fact errors.

Writes /tmp/{slug}-fixed.json. Does not touch git JSON or Anki.
"""

from __future__ import annotations

import argparse
import json
import re
from collections import Counter
from copy import deepcopy
from pathlib import Path

VIRUS_YEARS = ("1066", "1215", "1689")
THIN = ("Sounds plausible", "The correct choice", "matches this rule")
YEAR_TOKEN = re.compile(r"\b(1[0-9]{3}|[1-9][0-9]{0,2}\s*AD|[1-9][0-9]{0,2}\s*BC)\b", re.I)
HANDBOOK = {
    "life-in-the-uk-readiness-check": (
        "Life in the UK handbook",
        "This is an independent diagnostic, not the official 24-question Home Office paper.",
    ),
    "canadian-citizenship-readiness-check": (
        "Discover Canada",
        "This is an independent diagnostic, not the official 20-question IRCC test.",
    ),
    "australian-citizenship-readiness-check": (
        "Our Common Bond",
        "This is an independent diagnostic, not the official Home Affairs 20-question test.",
    ),
    "us-citizenship-readiness-check": (
        "USCIS civics themes",
        "This is a timed MCQ diagnostic, not the oral USCIS interview.",
    ),
}

BOUDICCA_OPTIONS = [
    ("a", "A queen of the Iceni who led a revolt against Roman rule in about 60–61 AD"),
    ("b", "A queen of the Iceni who led a revolt against the Romans in 43 AD"),
    ("c", "A queen of the Iceni who led a revolt against the Romans in 410 AD"),
    ("d", "A queen of the Iceni who met Julius Caesar in 55 BC"),
]


def load_questions(path: Path) -> list[dict]:
    return json.loads(path.read_text())


def correct_text(question: dict) -> str:
    for option in question.get("options") or []:
        if option.get("id") == question.get("correctOptionId"):
            return str(option.get("text") or "").strip()
    return ""


def option_texts(question: dict) -> list[str]:
    return [str(option.get("text") or "") for option in question.get("options") or []]


def years_in(text: str) -> list[str]:
    return [match.group(1) for match in YEAR_TOKEN.finditer(text)]


def keep_virus_year(prompt: str, year: str) -> bool:
    p = prompt.lower()
    if year == "1066":
        return any(word in p for word in ("hastings", "william the conqueror", "norman conquest", "domesday"))
    if year == "1215":
        return "magna carta" in p or ("king john" in p and "charter" in p)
    if year == "1689":
        return any(word in p for word in ("bill of rights", "glorious revolution", "william and mary"))
    return False


def near_years(correct: int) -> list[int]:
    deltas = (-20, -11, -7, -5, -3, 3, 5, 7, 11, 14, 20, 25)
    out: list[int] = []
    for delta in deltas:
        year = correct + delta
        if year == correct or str(year) in VIRUS_YEARS:
            continue
        if 1 <= year <= 2025:
            out.append(year)
    return out[:3]


def roman_near_misses(correct_token: str) -> list[str]:
    token = correct_token.upper().replace(" ", "")
    pool = ["55 BC", "60 AD", "122 AD", "410 AD", "78 AD", "142 AD"]
    return [item for item in pool if item.upper().replace(" ", "") != token][:3]


def replace_year_token(text: str, old: str, new: str) -> str:
    return re.sub(rf"\b{re.escape(old)}\b", new, text, count=1)


def is_year_swap_set(texts: list[str]) -> bool:
    if len(texts) < 3:
        return False
    normalized = {YEAR_TOKEN.sub("YEAR", text) for text in texts}
    years = [year for text in texts for year in years_in(text)]
    return len(normalized) == 1 and len(set(years)) >= 3


def parse_year_int(token: str) -> int | None:
    match = re.search(r"(\d{1,4})", token)
    if not match:
        return None
    value = int(match.group(1))
    if "BC" in token.upper():
        return -value
    return value


def retag(slug: str, prompt: str, current: str) -> str:
    p = prompt.lower()
    if slug == "life-in-the-uk-readiness-check":
        if any(
            word in p
            for word in (
                "boudicca",
                "roman",
                "viking",
                "hastings",
                "william the conqueror",
                "domesday",
                "magna carta",
                "tudor",
                "henry",
                "elizabeth i",
                "civil war",
                "cromwell",
                "restoration",
                "glorious",
                "bill of rights 1689",
                "slavery abolition",
                "waterloo",
                "world war",
                "ww1",
                "ww2",
                "blitz",
                "churchill",
                "suffrag",
                "empire",
                "battle of",
                "agincourt",
                "armada",
                "gunpowder",
                "stuart",
                "yorkist",
                "lancaster",
                "black death",
                "edward",
                "wars of the roses",
                "hundred years",
                "brunel",
                "isambard",
                "victorian",
                "industrial",
            )
        ):
            return "history"
        if any(
            word in p
            for word in (
                "parliament",
                "prime minister",
                "house of commons",
                "house of lords",
                "mp ",
                "member of parliament",
                "election",
                "devolution",
                "holyrood",
                "senedd",
                "constituency",
                "speaker of",
                "cabinet",
                "first past",
            )
        ):
            return "government"
        if any(
            word in p
            for word in (
                "nhs",
                "bank holiday",
                "christmas",
                "easter",
                "patron saint",
                "eisteddfod",
                "pub",
                "sport",
                "capital of",
                "population",
                "weather",
                "food",
                "festival",
            )
        ):
            return "everyday"
        if any(word in p for word in ("principle", "value", "discriminat", "equal", "freedom of", "tolerance", "forced marriage", "jury")):
            return "values"
        return current if current in {"values", "history", "government", "everyday"} else "values"
    if slug == "canadian-citizenship-readiness-check":
        if any(word in p for word in ("right", "charter", "responsib", "vote", "jury", "tax", "freedom")) and "when did" not in p:
            if any(word in p for word in ("charter of rights", "fundamental freedom", "responsibility of citizenship", "equality right")):
                return "rights"
        if any(
            word in p
            for word in (
                "confederation",
                "champlain",
                "war of 1812",
                "vimy",
                "nunavut",
                "railway",
                "head tax",
                "persons case",
                "trudeau",
                "d-day",
                "juno",
                "klondike",
                "secord",
                "hudson",
                "meech",
                "patriat",
            )
        ):
            return "history"
        if any(word in p for word in ("parliament", "prime minister", "governor general", "mp", "senator", "election", "party", "how many seats")):
            return "government"
        if any(word in p for word in ("territor", "province", "capital", "maple", "beaver", "ocean", "region", "symbol", "flag")):
            return "symbols-geography"
        return current if current in {"history", "government", "rights", "symbols-geography"} else "history"
    if slug == "australian-citizenship-readiness-check":
        if any(
            word in p
            for word in (
                "first fleet",
                "australia day",
                "eureka",
                "gold rush",
                "aboriginal",
                "sorry",
                "rudd",
                "federation",
                "gallipoli",
                "anko",
                "women gain",
                "vote in",
            )
        ):
            return "history"
        if any(word in p for word in ("parliament", "prime minister", "governor-general", "election", "preferential", "senate", "house of representatives")):
            return "government"
        if any(word in p for word in ("state", "territor", "capital", "kangaroo", "wattle", "anzac", "outback", "great barrier")):
            return "australia"
        if any(word in p for word in ("value", "equal", "violence", "religion", "jury", "mate", "fair go", "freedom")):
            return "values"
        return current if current in {"values", "history", "government", "australia"} else "values"
    if slug == "us-citizenship-readiness-check":
        if any(
            word in p
            for word in (
                "declaration",
                "independence",
                "civil war",
                "lincoln",
                "washington",
                "madison",
                "hamilton",
                "eisenhower",
                "depression",
                "cold war",
                "world war",
                "slavery",
                "emancipation",
                "constitution was written",
                "13th",
                "14th",
                "15th",
                "19th amendment",
                "war of 1812",
            )
        ):
            return "history"
        if any(
            word in p
            for word in (
                "capital",
                "ocean",
                "river",
                "mountain",
                "statue of liberty",
                "flag",
                "star",
                "stripe",
                "holiday",
                "independence day",
                "thanksgiving",
                "border",
                "state that",
            )
        ):
            return "geography"
        if any(word in p for word in ("president", "congress", "senate", "house", "supreme court", "constitution", "amendment", "bill of rights", "branch", "speaker", "vice")):
            return "government"
        return current if current in {"government", "history", "geography"} else "government"
    return current


def enforce_topic_floors(questions: list[dict], floors: dict[str, int]) -> None:
    counts = Counter(question["topicId"] for question in questions)
    for question in questions:
        topic = question["topicId"]
        original = question.get("_originalTopic")
        if original and original != topic and counts[original] < floors.get(original, 0) and counts[topic] > floors.get(topic, 0):
            counts[topic] -= 1
            counts[original] += 1
            question["topicId"] = original
    for question in questions:
        question.pop("_originalTopic", None)


def patch_boudicca(question: dict) -> dict:
    question["options"] = [{"id": option_id, "text": text} for option_id, text in BOUDICCA_OPTIONS]
    question["correctOptionId"] = "a"
    question["topicId"] = "history"
    question["explanation"] = (
        "Boudicca was queen of the Iceni in what is now East Anglia. She led a revolt against Roman rule in about 60–61 AD, "
        "after the Claudian invasion of 43 AD. The handbook names her as the British resistance figure of that revolt — "
        "not the invasion year and not the later end of Roman Britain in 410 AD."
    )
    question["distractorExplanations"] = {
        "b": "43 AD is when Claudius invaded Britain, not when Boudicca rebelled.",
        "c": "410 AD is the conventional end of Roman administration in Britain, centuries after Boudicca.",
        "d": "Julius Caesar’s expeditions were in 55–54 BC. Boudicca lived under the later Claudian occupation.",
    }
    return question


def rewrite_year_swap(question: dict) -> None:
    texts = option_texts(question)
    if not is_year_swap_set(texts):
        # Still strip virus years from wrong options when the correct year is present.
        pass
    correct = correct_text(question)
    correct_years = years_in(correct)
    prompt = str(question.get("prompt") or "")
    replacements: list[str] = []
    if correct_years:
        token = correct_years[0]
        if "AD" in token.upper() or "BC" in token.upper():
            replacements = roman_near_misses(token)
        else:
            parsed = parse_year_int(token)
            replacements = [str(year) for year in near_years(parsed)] if parsed else []
    if not replacements:
        replacements = ["1914", "1945", "1965"]

    used = 0
    for option in question["options"]:
        if option["id"] == question["correctOptionId"]:
            continue
        text = str(option.get("text") or "")
        virus = next((year for year in years_in(text) if year in VIRUS_YEARS and not keep_virus_year(prompt, year)), None)
        tiny_ad = next((year for year in years_in(text) if re.fullmatch(r"[2-4]\s*AD", year, re.I)), None)
        old = virus or tiny_ad
        if not old:
            continue
        if used >= len(replacements):
            break
        option["text"] = replace_year_token(text, old, replacements[used])
        used += 1


def rewrite_yes_no_pileup(question: dict) -> bool:
    texts = option_texts(question)
    yes = sum(1 for text in texts if text.lower().startswith("yes"))
    no = sum(1 for text in texts if text.lower().startswith("no"))
    if not (yes and no and yes + no >= 3):
        return False
    prompt = str(question.get("prompt") or "").lower()
    correct = correct_text(question)
    if "violence" in prompt or "threat" in prompt:
        question["options"] = [
            {"id": "a", "text": "It is acceptable if it happens only in private"},
            {"id": "b", "text": "It is acceptable when used to change a political opinion"},
            {"id": "c", "text": "No — violence and intimidation are against the law"},
            {"id": "d", "text": "It is acceptable if nobody is physically injured"},
        ]
        question["correctOptionId"] = "c"
        return True
    if "jury" in prompt:
        question["options"] = [
            {"id": "a", "text": "Yes — eligible citizens can be required to serve on a jury"},
            {"id": "b", "text": "Jury service is always optional for citizens"},
            {"id": "c", "text": "Only lawyers and public servants can be called"},
            {"id": "d", "text": "Only permanent residents are called for jury service"},
        ]
        question["correctOptionId"] = "a"
        return True
    if "religion" in prompt or "official state religion" in prompt:
        question["options"] = [
            {"id": "a", "text": "Yes — Australia has no official state religion and protects freedom of religion"},
            {"id": "b", "text": "Australia has an official Christian state church"},
            {"id": "c", "text": "Religious practice is permitted only in private"},
            {"id": "d", "text": "Only Christian denominations are legally recognised"},
        ]
        question["correctOptionId"] = "a"
        return True
    # Generic: keep the correct clause, rewrite others without Yes/No prefixes.
    keep_id = question["correctOptionId"]
    keep_text = correct
    fillers = [
        "That rule applies only in some states, not nationwide",
        "That duty applies only to permanent residents, not citizens",
        "That freedom is reserved for government officials",
    ]
    new_options = []
    fill = 0
    for option in question["options"]:
        if option["id"] == keep_id:
            new_options.append({"id": option["id"], "text": keep_text})
        else:
            new_options.append({"id": option["id"], "text": fillers[fill % len(fillers)]})
            fill += 1
    question["options"] = new_options
    return True


def break_year_only_clones(question: dict, pool: list[dict]) -> None:
    """Date items keep two near-miss years plus one qualitative trap."""
    texts = option_texts(question)
    if not is_year_swap_set(texts):
        return
    correct = correct_text(question)
    template = YEAR_TOKEN.sub("YEAR", correct)
    qualitative = []
    for other in pool:
        if other.get("id") == question.get("id"):
            continue
        answer = correct_text(other)
        if not answer or answer == correct:
            continue
        if YEAR_TOKEN.sub("YEAR", answer) == template:
            continue
        if any(year in answer for year in VIRUS_YEARS) and not keep_virus_year(
            str(other.get("prompt") or ""),
            next((year for year in VIRUS_YEARS if year in answer), ""),
        ):
            continue
        qualitative.append(answer)
    if not qualitative:
        qualitative = ["A different event from the same civic handbook chapter"]
    for option in question["options"]:
        if option["id"] == question["correctOptionId"]:
            continue
        option["text"] = qualitative[0]
        break


def rebuild_unrelated_distractors(question: dict, pool: list[dict]) -> None:
    texts = option_texts(question)
    if is_year_swap_set(texts):
        return
    correct = correct_text(question)
    others = []
    for other in pool:
        if other.get("id") == question.get("id"):
            continue
        if other.get("topicId") != question.get("topicId"):
            continue
        answer = correct_text(other)
        if not answer or answer == correct:
            continue
        lowered = answer.lower()
        if lowered in {text.lower() for text in texts}:
            continue
        if lowered in correct.lower() or correct.lower() in lowered:
            continue
        if any(year in answer for year in VIRUS_YEARS) and not keep_virus_year(str(other.get("prompt") or ""), next((year for year in VIRUS_YEARS if year in answer), "")):
            continue
        others.append(answer)
    # Only rebuild when current distractors look like a random-card grab
    # (low token overlap with the correct answer and with each other).
    correct_tokens = set(re.findall(r"[a-z0-9]+", correct.lower()))
    weak = 0
    for text in texts:
        if text == correct:
            continue
        tokens = set(re.findall(r"[a-z0-9]+", text.lower()))
        if not tokens or len(correct_tokens & tokens) / max(1, len(correct_tokens | tokens)) < 0.15:
            weak += 1
    if weak < 2 or len(others) < 3:
        return
    picked: list[str] = []
    for answer in others:
        if answer in picked:
            continue
        picked.append(answer)
        if len(picked) == 3:
            break
    fill = 0
    for option in question["options"]:
        if option["id"] == question["correctOptionId"]:
            continue
        option["text"] = picked[fill]
        fill += 1


def explain(question: dict, slug: str) -> str:
    prompt = str(question.get("prompt") or "").strip()
    correct = correct_text(question)
    handbook, honesty = HANDBOOK[slug]
    special = {
        "who was boudicca": question.get("explanation") or "",
        "when did the romans invade britain": (
            "The Roman conquest of Britain began in 43 AD under Emperor Claudius. "
            "Caesar’s earlier landings (55–54 BC) were raids, not the lasting occupation. "
            "Hadrian’s Wall (from 122 AD) and the end of Roman rule (about 410 AD) are later handbook dates."
        ),
        "what is nunavut": (
            "Nunavut was created in 1999 as a territory and Inuit homeland, carved from the Northwest Territories. "
            "English medieval years such as 1066 or 1215 do not belong on this Discover Canada item. "
            f"{honesty}"
        ),
        "when was the declaration of independence adopted": (
            "Congress adopted the Declaration of Independence on July 4, 1776. "
            "1787 is the Constitution; 1789 is the new federal government; 1812 is a later war. "
            f"{honesty}"
        ),
    }
    key = re.sub(r"[^a-z0-9 ]+", "", prompt.lower()).strip()
    if key in special and special[key]:
        return special[key]
    years = years_in(correct)
    year_note = ""
    if years:
        year_note = f" The dated fact is {years[0]}, not a neighbouring year from another event."
    return (
        f"{handbook} treats this prompt — “{prompt}” — as asking for this fact: {correct}."
        f"{year_note} "
        f"Pick the option that names that fact. Neighbouring institutions, rights, or dates belong to other cards. {honesty}"
    )


def distractor_explanations(question: dict, slug: str) -> dict[str, str]:
    prompt = str(question.get("prompt") or "").strip()
    correct = correct_text(question)
    correct_years = years_in(correct)
    out: dict[str, str] = {}
    for option in question["options"]:
        if option["id"] == question["correctOptionId"]:
            continue
        text = str(option.get("text") or "").strip()
        option_years = years_in(text)
        if option_years and correct_years and option_years[0] != correct_years[0]:
            out[option["id"]] = (
                f"{option_years[0]} is a different date. This question is asking for {correct_years[0]} — {correct}."
            )
        elif text.lower().startswith("yes") or text.lower().startswith("no"):
            out[option["id"]] = (
                f"That polarity does not answer “{prompt}”. The handbook fact is: {correct}."
            )
        else:
            out[option["id"]] = (
                f"“{text}” is a different civic fact. It does not answer “{prompt}”. The matching fact is: {correct}."
            )
    return out


def finalize_source(question: dict) -> None:
    question["sourceNote"] = (
        "Prep2Go Naturalization Q&A, rewritten in ops 2026-09-21 (Grok civic fix): "
        "near-miss distractors, handbook explanations, year-virus removed."
    )


def fix_bank(questions: list[dict], slug: str) -> list[dict]:
    floors = {
        "life-in-the-uk-readiness-check": {"values": 15, "history": 15, "government": 15, "everyday": 15},
        "canadian-citizenship-readiness-check": {
            "history": 15,
            "government": 15,
            "rights": 15,
            "symbols-geography": 15,
        },
        "australian-citizenship-readiness-check": {"values": 15, "history": 15, "government": 15, "australia": 15},
        "us-citizenship-readiness-check": {"government": 10, "history": 10, "geography": 10},
    }[slug]

    working = []
    for raw in questions:
        question = deepcopy(raw)
        question["_originalTopic"] = question.get("topicId")
        prompt = str(question.get("prompt") or "")
        if "who was boudicca" in prompt.lower():
            working.append(patch_boudicca(question))
            finalize_source(question)
            continue
        if "victim of crime" in prompt.lower() or (
            "witness a crime" in prompt.lower() and "report it to the police" in correct_text(question).lower()
        ):
            question["options"] = [
                {"id": "a", "text": "Report it to the police (999 for emergency / 101 for non-emergency)"},
                {"id": "b", "text": "Wait to see whether the person apologises first"},
                {"id": "c", "text": "Only report it if there is an independent witness"},
                {"id": "d", "text": "Contact a solicitor before speaking to the police"},
            ]
            question["correctOptionId"] = "a"
            question["topicId"] = "values"
            question["explanation"] = (
                "If you are a victim or witness of crime in the UK, report it to the police — 999 in an emergency and 101 otherwise. "
                "Do not wait for an apology, a witness, or a solicitor first. "
                "This is a Life in the UK values/law item, not the official 24-question Home Office paper."
            )
            question["distractorExplanations"] = {
                "b": "An apology does not replace a police report.",
                "c": "You can and should report a crime even if nobody else saw it.",
                "d": "You may want legal advice later, but the first step is still to tell the police.",
            }
            finalize_source(question)
            working.append(question)
            continue
        question["topicId"] = retag(slug, prompt, str(question.get("topicId") or "values"))
        rewrite_yes_no_pileup(question)
        rewrite_year_swap(question)
        working.append(question)

    for question in working:
        prompt_l = str(question.get("prompt") or "").lower()
        if "who was boudicca" in prompt_l or "victim of crime" in prompt_l or "witness a crime" in prompt_l:
            continue
        rebuild_unrelated_distractors(question, working)
        break_year_only_clones(question, working)
        question["explanation"] = explain(question, slug)
        question["distractorExplanations"] = distractor_explanations(question, slug)
        finalize_source(question)

    enforce_topic_floors(working, floors)
    return working


def assert_clean(questions: list[dict]) -> dict:
    thin = 0
    copies = 0
    virus = 0
    short = 0
    for question in questions:
        blob = json.dumps(question.get("distractorExplanations") or {})
        if any(marker in blob for marker in THIN):
            thin += 1
        expl = str(question.get("explanation") or "").strip()
        if expl == correct_text(question):
            copies += 1
        if len(expl) < 80:
            short += 1
        prompt = str(question.get("prompt") or "")
        for option in question.get("options") or []:
            if option.get("id") == question.get("correctOptionId"):
                continue
            for year in VIRUS_YEARS:
                if year in str(option.get("text") or "") and not keep_virus_year(prompt, year):
                    virus += 1
    return {
        "n": len(questions),
        "topics": dict(Counter(q.get("topicId") for q in questions)),
        "thin": thin,
        "explanation_copies_correct": copies,
        "short_explanations": short,
        "virus_years_on_wrong_options": virus,
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--slug", required=True)
    parser.add_argument("--input", required=True)
    parser.add_argument("--output", default="")
    args = parser.parse_args()
    questions = fix_bank(load_questions(Path(args.input)), args.slug)
    output = Path(args.output or f"/tmp/{args.slug}-fixed.json")
    output.write_text(json.dumps(questions, ensure_ascii=False, indent=2) + "\n")
    report = assert_clean(questions)
    report["output"] = str(output)
    print(json.dumps(report, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
