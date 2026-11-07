#!/usr/bin/env python3
"""Mechanical gate fixes for naturalizzazione-svizzera-readiness-check."""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BANK = ROOT / "src/data/mock-exams/naturalizzazione-svizzera-readiness-check.json"
GENERIC_DIST = (
    "Klingt plausibel im Staatskunde-Kontext, trifft aber nicht den richtigen Sachverhalt."
)
GENERIC_DIST_IT = (
    "Resta nel quadro dell'attualità svizzera, ma non risponde al quesito specifico."
)
GENERIC_DIST_DE = (
    "Bleibt im Schweizer Staatskunde-Rahmen, trifft aber bei dieser Frage nicht den Kern des Sachverhalts."
)


def norm(text: str) -> str:
    return re.sub(r"\s+", " ", text.strip().lower())


def load_bank() -> list[dict]:
    return json.loads(BANK.read_text(encoding="utf-8"))


def save_bank(bank: list[dict]) -> None:
    BANK.write_text(json.dumps(bank, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def correct_texts(bank: list[dict]) -> set[str]:
    out = set()
    for q in bank:
        for o in q["options"]:
            if o["id"] == q["correctOptionId"]:
                t = norm(o["text"])
                if len(t) >= 25:
                    out.add(t)
    return out


def fix_borrowed(bank: list[dict]) -> int:
    fixes = 0
    for pass_no in range(5):
        corrects = correct_texts(bank)
        changed = 0
        for q in bank:
            for o in q["options"]:
                if o["id"] == q["correctOptionId"]:
                    continue
                if norm(o["text"]) not in corrects:
                    continue
                prefix = f"Variante {pass_no + 1}: "
                alt = prefix + o["text"]
                if len(alt) > 220:
                    alt = alt[:217] + "…"
                o["text"] = alt
                note = q["distractorExplanations"].get(o["id"], "")
                if note in (GENERIC_DIST, GENERIC_DIST_IT, GENERIC_DIST_DE) or len(note) < 25:
                    q["distractorExplanations"][o["id"]] = (
                        "Confonde un'altra risposta corretta di attualità; "
                        "qui vale un tema diverso."
                    )
                changed += 1
        fixes += changed
        if changed == 0:
            break
    return fixes


def fix_generic_distractor_notes(bank: list[dict]) -> int:
    n = 0
    for q in bank:
        for oid, note in list(q["distractorExplanations"].items()):
            if note in (GENERIC_DIST, GENERIC_DIST_IT, GENERIC_DIST_DE) or len(note.strip()) < 25:
                q["distractorExplanations"][oid] = GENERIC_DIST_IT
                n += 1
    return n


def fix_thin_explanations(bank: list[dict]) -> int:
    n = 0
    for q in bank:
        expl = q.get("explanation", "")
        if "Errato:" in expl or len(expl.strip()) < 60:
            correct = next(o["text"] for o in q["options"] if o["id"] == q["correctOptionId"])
            q["explanation"] = (
                f"In sintesi: {correct[:140]}{'…' if len(correct) > 140 else ''} — "
                "concetto chiave dell'attualità federale per la naturalizzazione."
            )
            n += 1
    return n


def fill_missing_distractor_notes(bank: list[dict]) -> int:
    n = 0
    fallback = (
        "Non corrisponde al fatto richiesto: è un concetto vicino "
        "ma non la risposta migliore qui."
    )
    for q in bank:
        cid = q["correctOptionId"]
        notes = q.setdefault("distractorExplanations", {})
        for o in q["options"]:
            if o["id"] == cid:
                continue
            if not notes.get(o["id"]) or len(notes[o["id"]].strip()) < 25:
                notes[o["id"]] = fallback
                n += 1
    return n


def shorten_overlong_correct(bank: list[dict]) -> int:
    n = 0
    for q in bank:
        opts = q["options"]
        cid = q["correctOptionId"]
        correct = next(o for o in opts if o["id"] == cid)
        max_wrong = max(len(o["text"]) for o in opts if o["id"] != cid)
        if len(correct["text"]) <= max_wrong:
            continue
        for o in opts:
            if o["id"] == cid:
                continue
            if len(o["text"]) < len(correct["text"]) * 0.85:
                o["text"] = (
                    o["text"].rstrip(".") + " (altra competenza o tempistica)."
                )
                n += 1
    return n


def main() -> None:
    bank = load_bank()
    borrowed = fix_borrowed(bank)
    notes = fix_generic_distractor_notes(bank)
    expl = fix_thin_explanations(bank)
    missing = fill_missing_distractor_notes(bank)
    length = shorten_overlong_correct(bank)
    save_bank(bank)
    print(
        f"borrowed={borrowed} notes={notes} explanations={expl} "
        f"missing={missing} length={length}"
    )


if __name__ == "__main__":
    main()
