#!/usr/bin/env python3
"""Fix one ops bank. Factory civic (year virus + copy explanations) or LEED templates.

Does not touch git JSON. Writes /tmp/{slug}-fixed.json.
"""

from __future__ import annotations

import argparse
import json
import sys
from copy import deepcopy
from pathlib import Path

ROOT = Path(__file__).resolve().parent
sys.path.insert(0, str(ROOT))

import importlib.util

_spec = importlib.util.spec_from_file_location("civic_fix", ROOT / "fix-civic-bank.py")
civic = importlib.util.module_from_spec(_spec)
assert _spec.loader
_spec.loader.exec_module(civic)

VOICE = {
    "leben-in-deutschland-readiness-check": {
        "handbook": "Der Leben-in-Deutschland-Stoff",
        "honesty": "Dies ist ein unabhängiger Diagnostiktest, nicht der offizielle BAMF-Bogen (33 Fragen / 60 Minuten / 17 richtig).",
        "pick": "Wählen Sie die Option, die genau diesen Sachverhalt nennt. Benachbarte Institutionen, Rechte oder fremde Jahreszahlen gehören zu anderen Karten.",
        "year": "Die datierte Tatsache ist {year}, nicht eine Nachbarzahl und nicht 1066 / 1215 / 1689.",
        "other": "„{text}“ beantwortet eine andere Staatskunde-Frage, nicht: „{prompt}“. Richtig ist: {correct}.",
        "year_wrong": "{wrong} ist ein anderes Datum. Diese Frage verlangt {right} — {correct}.",
    },
    "naturalisation-francaise-readiness-check": {
        "handbook": "Le livret de l'examen civique",
        "honesty": "Diagnostic indépendant, pas l'examen civique officiel (40 questions / 45 minutes / 32/40).",
        "pick": "Choisissez l'option qui nomme ce fait. Les institutions, droits ou dates voisines appartiennent à d'autres cartes.",
        "year": "Le fait daté est {year}, pas une année voisine ni 1066 / 1215 / 1689.",
        "other": "« {text} » répond à une autre question civique, pas à : « {prompt} ». Le fait attendu est : {correct}.",
        "year_wrong": "{wrong} est une autre date. Cette question demande {right} — {correct}.",
    },
    "swiss-citizenship-readiness-check": {
        "handbook": "Der Einbürgerungsstoff der Schweiz",
        "honesty": "Unabhängiger Diagnostiktest, nicht die offizielle Einbürgerungsprüfung eines Kantons.",
        "pick": "Wählen Sie die Option, die genau diesen Sachverhalt nennt. Benachbarte Institutionen oder Rechte gehören zu anderen Karten.",
        "year": "Die datierte Tatsache ist {year}, nicht eine Nachbarzahl und nicht 1066 / 1215 / 1689.",
        "other": "„{text}“ beantwortet eine andere Staatskunde-Frage, nicht: „{prompt}“. Richtig ist: {correct}.",
        "year_wrong": "{wrong} ist ein anderes Datum. Diese Frage verlangt {right} — {correct}.",
    },
    "naturalisation-suisse-readiness-check": {
        "handbook": "Le livret de naturalisation suisse",
        "honesty": "Diagnostic indépendant, pas l'examen cantonal officiel.",
        "pick": "Choisissez l'option qui nomme ce fait. Les institutions ou droits voisins appartiennent à d'autres cartes.",
        "year": "Le fait daté est {year}, pas une année voisine ni 1066 / 1215 / 1689.",
        "other": "« {text} » répond à une autre question civique, pas à : « {prompt} ». Le fait attendu est : {correct}.",
        "year_wrong": "{wrong} est une autre date. Cette question demande {right} — {correct}.",
    },
    "naturalizzazione-svizzera-readiness-check": {
        "handbook": "Il materiale di naturalizzazione svizzera",
        "honesty": "Diagnostico indipendente, non l'esame cantonale ufficiale.",
        "pick": "Scegliete l'opzione che nomina questo fatto. Istituzioni o diritti vicini appartengono ad altre schede.",
        "year": "Il fatto datato è {year}, non un anno vicino né 1066 / 1215 / 1689.",
        "other": "«{text}» risponde a un'altra domanda civica, non a: «{prompt}». Il fatto corretto è: {correct}.",
        "year_wrong": "{wrong} è un'altra data. Questa domanda chiede {right} — {correct}.",
    },
    "ccse-espana-readiness-check": {
        "handbook": "El temario del CCSE",
        "honesty": "Diagnóstico independiente, no el CCSE oficial del Instituto Cervantes (25 preguntas / 45 minutos).",
        "pick": "Elija la opción que nombra ese hecho. Otras instituciones, derechos o fechas inglesas pertenecen a otras tarjetas.",
        "year": "El hecho fechado es {year}, no un año vecino ni 1066 / 1215 / 1689.",
        "other": "«{text}» responde a otra pregunta cívica, no a: «{prompt}». El hecho correcto es: {correct}.",
        "year_wrong": "{wrong} es otra fecha. Esta pregunta pide {right} — {correct}.",
    },
    "leed-ap-bd-c-readiness-check": {
        "handbook": "LEED BD+C",
        "honesty": "Independent readiness check, not a GBCI exam form.",
        "pick": "Pick the strategy that matches this credit's intent. Neighbouring credits do not satisfy this prompt.",
        "year": "The dated fact is {year}.",
        "other": "“{text}” is a different LEED strategy. It does not answer “{prompt}”. The matching strategy is: {correct}.",
        "year_wrong": "{wrong} is a different date. This item is asking for {right} — {correct}.",
    },
}


def voice_for(slug: str) -> dict[str, str]:
    if slug in VOICE:
        return VOICE[slug]
    if slug.startswith("leed-") or slug.startswith("well-ap"):
        base = dict(VOICE["leed-ap-bd-c-readiness-check"])
        base["handbook"] = "LEED / WELL"
        return base
    return VOICE.get(
        slug,
        {
            "handbook": "This civic handbook",
            "honesty": "Independent diagnostic, not the official exam paper.",
            "pick": "Pick the option that names that fact. Neighbouring institutions, rights, or dates belong to other cards.",
            "year": "The dated fact is {year}, not a neighbouring year.",
            "other": "“{text}” is a different civic fact. It does not answer “{prompt}”. The matching fact is: {correct}.",
            "year_wrong": "{wrong} is a different date. This question is asking for {right} — {correct}.",
        },
    )


def explain(question: dict, slug: str) -> str:
    prompt = str(question.get("prompt") or "").strip()
    correct = civic.correct_text(question)
    voice = voice_for(slug)
    years = civic.years_in(correct)
    year_note = f" {voice['year'].format(year=years[0])}" if years else ""
    return (
        f"{voice['handbook']} treats this prompt — “{prompt}” — as asking for this fact: {correct}."
        f"{year_note} {voice['pick']} {voice['honesty']}"
    )


def distractors(question: dict, slug: str) -> dict[str, str]:
    prompt = str(question.get("prompt") or "").strip()
    correct = civic.correct_text(question)
    voice = voice_for(slug)
    correct_years = civic.years_in(correct)
    out: dict[str, str] = {}
    for option in question["options"]:
        if option["id"] == question["correctOptionId"]:
            continue
        text = str(option.get("text") or "").strip()
        option_years = civic.years_in(text)
        if option_years and correct_years and option_years[0] != correct_years[0]:
            out[option["id"]] = voice["year_wrong"].format(
                wrong=option_years[0],
                right=correct_years[0],
                correct=correct,
            )
        else:
            out[option["id"]] = voice["other"].format(text=text, prompt=prompt, correct=correct)
    return out


def finalize(question: dict, slug: str) -> None:
    question["explanation"] = explain(question, slug)
    question["distractorExplanations"] = distractors(question, slug)
    question["sourceNote"] = (
        f"Rewritten in ops 2026-09-21 (Grok batch fix) from the imported {slug} bank: "
        "near-miss distractors, handbook explanations, year-virus removed."
    )


def fix_factory(questions: list[dict], slug: str) -> list[dict]:
    working = [deepcopy(raw) for raw in questions]
    for question in working:
        civic.rewrite_year_swap(question)
    for question in working:
        civic.rebuild_unrelated_distractors(question, working)
        civic.break_year_only_clones(question, working)
        finalize(question, slug)
    return working


def is_leed_template(question: dict) -> bool:
    blob = json.dumps(question.get("distractorExplanations") or {}) + str(question.get("explanation") or "")
    return "appropriate response because" in blob or "does not satisfy the requirement in this scenario" in blob


def fix_leed(questions: list[dict], slug: str) -> list[dict]:
    working = [deepcopy(raw) for raw in questions]
    for question in working:
        civic.rebuild_unrelated_distractors(question, working)
        finalize(question, slug)
    return working


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--slug", required=True)
    parser.add_argument("--input", required=True)
    parser.add_argument("--mode", choices=("factory", "leed", "auto"), default="auto")
    args = parser.parse_args()
    questions = json.loads(Path(args.input).read_text())
    mode = args.mode
    if mode == "auto":
        converted = sum(
            1
            for question in questions
            if "Converted from Prep2Go" in str(question.get("sourceNote") or "")
        )
        leed = sum(1 for question in questions if is_leed_template(question))
        if converted >= max(1, len(questions) // 2):
            mode = "factory"
        elif leed >= max(1, len(questions) // 2):
            mode = "leed"
        else:
            mode = "factory"
    fixed = fix_leed(questions, args.slug) if mode == "leed" else fix_factory(questions, args.slug)
    output = Path(f"/tmp/{args.slug}-fixed.json")
    output.write_text(json.dumps(fixed, ensure_ascii=False, indent=2) + "\n")
    report = civic.assert_clean(fixed)
    report["mode"] = mode
    report["output"] = str(output)
    print(json.dumps(report, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
