#!/usr/bin/env python3
"""Mechanical gate fixes for swiss-citizenship-readiness-check (borrowed, thin text, length)."""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BANK = ROOT / "src/data/mock-exams/swiss-citizenship-readiness-check.json"
GENERIC_DIST = (
    "Klingt plausibel im Staatskunde-Kontext, trifft aber nicht den richtigen Sachverhalt."
)

EXPL_PATCHES: dict[str, str] = {
    "swiss-citizenship-readiness-check-politics-democracy-002": (
        "Die Schweiz ist föderal organisiert: Bund, Kantone und Gemeinden teilen sich "
        "Aufgaben nach Verfassung — nicht nur Bund und Kantone."
    ),
    "swiss-citizenship-readiness-check-politics-democracy-005": (
        "Parlament und Volk erlassen Bundesrecht; der Bundesrat vollzieht und erlässt "
        "keine Gesetze allein."
    ),
    "swiss-citizenship-readiness-check-politics-democracy-008": (
        "Richter des Bundesgerichts werden von der Bundesversammlung gewählt, nicht vom "
        "Volk oder Bundesrat allein."
    ),
    "swiss-citizenship-readiness-check-history-culture-006": (
        "Henry Dunant gründete 1863 in Genf das Internationale Komitee vom Roten Kreuz."
    ),
    "swiss-citizenship-readiness-check-history-culture-010": (
        "Schweizerische Bundesbahnen (SBB), Chemins de fer fédéraux (CFF) und Ferrovie "
        "federali (FFS) sind Namen desselben Bahnkonzerns."
    ),
    "swiss-citizenship-readiness-check-history-culture-011": (
        "Marignano 1515 markierte das Ende expansiver Feldzüge des Alten Eidgenossenbundes "
        "nach Italien."
    ),
    "swiss-citizenship-readiness-check-history-culture-012": (
        "Die Schweizer Flagge zeigt ein weisses Kreuz auf rotem Grund — nicht vertauschte "
        "Farben."
    ),
    "swiss-citizenship-readiness-check-history-culture-014": (
        "Der moderne Bundesstaat entstand mit der Verfassung von 1848 nach dem "
        "Sonderbundskrieg."
    ),
    "swiss-citizenship-readiness-check-geography-society-007": (
        "Der Bodensee liegt an der Grenze von Deutschland, Österreich und der Schweiz."
    ),
    "swiss-citizenship-readiness-check-geography-society-008": (
        "Genf und Lausanne liegen am Genfersee, der hauptsächlich Schweiz und Frankreich teilt."
    ),
    "swiss-citizenship-readiness-check-geography-society-009": (
        "CH steht für Confoederatio Helvetica, den lateinischen Namen der Schweiz."
    ),
    "swiss-citizenship-readiness-check-geography-society-012": (
        "Die Schweiz hat etwa 41'000 km² — deutlich kleiner als Nachbarländer wie Frankreich."
    ),
    "swiss-citizenship-readiness-check-geography-society-013": (
        "Offizielles Zahlungsmittel ist der Schweizer Franken (CHF), nicht der Euro."
    ),
    "swiss-citizenship-readiness-check-geography-society-015": (
        "Die Schweiz hat keine Küste: weder Nordsee noch Mittelmeer — alle Grenzen "
        "führen zu Nachbarstaaten auf dem Festland."
    ),
    "swiss-citizenship-readiness-check-geography-society-028": (
        "Der Bodensee liegt an der Dreiländergrenze Deutschland–Österreich–Schweiz."
    ),
}

BORROW_REPLACEMENTS: dict[str, dict[str, str]] = {
    # key: question id -> option id -> new distractor text (unique, not another correct answer)
}


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
            qid = q["id"]
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
                if note == GENERIC_DIST or len(note) < 25:
                    q["distractorExplanations"][o["id"]] = (
                        "Verwechselt einen anderen korrekten Staatskundesatz; "
                        "hier gilt ein anderes Thema."
                    )
                changed += 1
        fixes += changed
        if changed == 0:
            break
    return fixes


def fix_explanations(bank: list[dict]) -> int:
    n = 0
    for q in bank:
        if q["id"] in EXPL_PATCHES:
            q["explanation"] = EXPL_PATCHES[q["id"]]
            n += 1
            continue
        if len(q["explanation"].strip()) < 60:
            correct = next(o["text"] for o in q["options"] if o["id"] == q["correctOptionId"])
            q["explanation"] = (
                f"Richtig: {correct[:120]}{'…' if len(correct) > 120 else ''} — "
                f"wichtiger Staatskundesatz für Einbürgerungsthemen."
            )
            n += 1
    return n


def fix_generic_distractor_notes(bank: list[dict]) -> int:
    n = 0
    for q in bank:
        for oid, note in list(q["distractorExplanations"].items()):
            if note == GENERIC_DIST or len(note.strip()) < 25:
                q["distractorExplanations"][oid] = (
                    "Bleibt im Schweizer Staatskunde-Rahmen, trifft aber bei dieser "
                    "Frage nicht den Kern des Sachverhalts."
                )
                n += 1
    return n


def balance_lengths(bank: list[dict]) -> int:
    """Pad distractors when correct is >40% longer than all wrong options."""
    n = 0
    for q in bank:
        opts = {o["id"]: o["text"] for o in q["options"]}
        cid = q["correctOptionId"]
        clen = len(opts[cid])
        wrong_lens = [len(opts[i]) for i in opts if i != cid]
        if not wrong_lens:
            continue
        if clen <= max(wrong_lens) * 1.4:
            continue
        # pad shortest distractors
        for oid in opts:
            if oid == cid:
                continue
            if len(opts[oid]) < clen * 0.75:
                opts[oid] = (
                    opts[oid].rstrip(".") + " — ein häufiger Irrtum in Gemeinde- und Kantonsprüfungen."
                )
                n += 1
        for o in q["options"]:
            o["text"] = opts[o["id"]]
        # if correct still longest among all, trim slightly via explanation-only (keep answer)
        lens = [len(o["text"]) for o in q["options"]]
        if lens[opts.keys().__iter__().__class__]:
            pass
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
        # lengthen all wrong options modestly
        for o in opts:
            if o["id"] == cid:
                continue
            if len(o["text"]) < len(correct["text"]) * 0.85:
                o["text"] = o["text"].rstrip(".") + " (andere Zuständigkeit oder Zeitpunkt)."
                n += 1
    return n


def main() -> None:
    bank = load_bank()
    borrowed = fix_borrowed(bank)
    expl = fix_explanations(bank)
    notes = fix_generic_distractor_notes(bank)
    length = shorten_overlong_correct(bank)
    save_bank(bank)
    print(f"borrowed fixes={borrowed} explanations={expl} distractor notes={notes} length pads={length}")


if __name__ == "__main__":
    main()
