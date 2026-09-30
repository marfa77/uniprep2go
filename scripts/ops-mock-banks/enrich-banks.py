#!/usr/bin/env python3
"""Mechanical enrichment of ops banks (no invented facts).

Per bank:
  1. take /tmp/recover/{slug}.json when present (FDIC boilerplate distractors restored from git history)
  2. restore option texts truncated with "…" from git history (prefix match)
  3. strip filler tails ("… always", "… forever") that only ever appear on wrong options
  4. drop template sentences from explanations / distractor notes
  5. when a wrong option is another item's correct answer, say so (English banks only)
  6. validate options

Input:  /tmp/ops-all-banks.json
Output: /tmp/enrich/{slug}.json + /tmp/enrich/report.json
Usage:  python3 scripts/ops-mock-banks/enrich-banks.py [slug ...]
"""

from __future__ import annotations

import copy
import json
import re
import subprocess
import sys
from collections import Counter
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]
RECOVER = Path("/tmp/recover")
OUT = Path("/tmp/enrich")
MANUAL_PATCHES = json.loads((Path(__file__).parent / "manual-patches-2026-09-30.json").read_text())
SOURCE_FILE = {"sie-quick-diagnostic": "sie-full-mock"}
NON_EN_MARKERS = (
    "leben-in-deutschland",
    "naturalisation-",
    "naturalizzazione",
    "swiss-citizenship",
    "ccse-espana",
    "belgium-",
    "luxembourg-",
    "portugal-",
    "czech-",
    "denmark-",
    "norway-",
    "sweden-",
    "finland-",
    "polish-",
)

DIST_FILLERS = [
    r"Learners who choose .*? instead of applying the rule in the stem\.?",
    r"This statement is false about .{0,160}? and does not match the correct definition\.?",
    r"That is a sibling-exam leftover or a neighboring rule\.?",
    r"This option does not (?:correctly answer|match) the (?:stem|tested concept)(?: \(.*?\))?\.?",
    r"That wording is a neighboring rule, an extreme never/always, or another system\.?",
    r"That is a neighboring process, the drinking-water/electrical sibling, or an extreme never/always\.?",
    r"This option reflects a common setup or reasoning error for this problem type\.?",
    r"This option reflects a common GRE trap for this item type\.?",
    r"This choice describes a different concept and does not correctly answer the question stem\.?",
    r"This option reflects a different deck concept and is not the best answer to the [^.]*\.?",
    r"^Incorrect:.*$",
]
EXPL_FILLERS = [
    r"The correct choice \(.*?\) is the one that matches this rule\.?",
    r"Pick the option that names that fact\.?",
    r"Neighbouring institutions, rights, or dates belong to other cards\.?",
    r"Wählen Sie die Option, die genau diesen Sachverhalt nennt\.?",
    r"Benachbarte Institutionen, Rechte oder fremde Jahreszahlen gehören zu anderen Karten\.?",
    r"Choisissez l'option qui nomme ce fait\.?",
    r"Les institutions, droits ou dates voisines appartiennent à d'autres cartes\.?",
    r"Les institutions ou droits voisins appartiennent à d'autres cartes\.?",
    r"Pick the strategy that matches this credit's intent\.?",
    r"Neighbouring credits do not satisfy this prompt\.?",
    r"This is the LEED Green Associate concept tested by the question\.?",
    r"Extreme never/always wording and facts from another trade do not satisfy this stem\.?",
    r"The marked answer is the only option that matches the tested rule or definition\.?",
]
DIST_RE = [re.compile(p, re.I | re.S | re.M) for p in DIST_FILLERS]
EXPL_RE = [re.compile(p, re.I | re.S) for p in EXPL_FILLERS]
JUNK_TAIL = re.compile(r"\s+(?:always|forever)\s*$", re.I)
DOUBLE_ALWAYS = re.compile(r"\balways always\b", re.I)
STEM_PREFIX = re.compile(r"^(?:On|For) the [^,]{2,60}, ", re.I)
STEM_SUFFIX = re.compile(r"\s*(?:Select|Choose) the best answer\.?$", re.I)


def norm(text: str) -> str:
    return re.sub(r"\s+", " ", str(text or "")).strip().lower()


def tidy(text: str) -> str:
    text = re.sub(r"\s+", " ", text).strip()
    text = re.sub(r"\s+([.,;:!?])", r"\1", text)
    text = re.sub(r"\.{2,}", ".", text)
    if text and text[-1] not in ".!?…)”\"'":
        text += "."
    return text


def strip_fillers(text: str, patterns: list[re.Pattern]) -> str:
    out = str(text or "")
    for pattern in patterns:
        out = pattern.sub(" ", out)
    out = re.sub(r"\s+", " ", out).strip()
    return tidy(out) if out else ""


def short_prompt(prompt: str, limit: int = 110) -> str:
    text = STEM_SUFFIX.sub("", STEM_PREFIX.sub("", str(prompt or "").strip())).strip()
    text = text[0].upper() + text[1:] if text else text
    if len(text) <= limit:
        return text
    cut = text[:limit].rsplit(" ", 1)[0]
    return cut.rstrip(",;:") + "…"


def clip_text(text: str, limit: int) -> str:
    text = text.strip().rstrip(".")
    if len(text) <= limit:
        return text
    return text[:limit].rsplit(" ", 1)[0].rstrip(",;:") + "…"


def clip_truncated(text: str) -> str:
    body = text.rstrip()[:-1].rstrip()
    if body.count("(") > body.count(")"):
        body = body[: body.rfind("(")].rstrip()
    if body.endswith((".", ")", "!", "?")):
        return body
    sentence = body.rfind(". ")
    if sentence >= len(body) * 0.4:
        return body[: sentence + 1]
    cut = max(body.rfind(", "), body.rfind("; "), body.rfind(": "))
    if cut >= len(body) * 0.5:
        return body[:cut].rstrip()
    return body.rsplit(" ", 1)[0].rstrip(",;:- ")


PTCB_BRANDS = {
    "alendronate": "Fosamax",
    "tamsulosin": "Flomax",
    "glipizide": "Glucotrol",
    "levofloxacin": "Levaquin",
    "gabapentin": "Neurontin",
    "levothyroxine": "Synthroid",
    "alprazolam": "Xanax",
    "allopurinol": "Zyloprim",
    "escitalopram": "Lexapro",
    "prednisone": "Deltasone",
    "fluticasone (inhaled)": "Flovent",
    "omeprazole": "Prilosec",
    "naproxen": "Naprosyn",
    "losartan": "Cozaar",
    "fluoxetine": "Prozac",
    "lorazepam": "Ativan",
    "pantoprazole": "Protonix",
    "nitrofurantoin": "Macrobid",
    "warfarin": "Coumadin",
    "hydrocodone/apap": "Norco",
    "metoprolol": "Lopressor",
}
PTCB_BRAND_Q = re.compile(r"what is a common brand name for (.+?)\?", re.I)


def normalize_ptcb_brand_items(bank: list[dict], stats: Counter) -> None:
    brand_of = dict(PTCB_BRANDS)
    for q in bank:
        m = PTCB_BRAND_Q.search(q.get("prompt") or "")
        cor = next((o for o in q["options"] if o["id"] == q["correctOptionId"]), None)
        if m and cor and not cor["text"].startswith("Generic:"):
            brand = re.split(r"\. Class:|\s\(tartrate", cor["text"])[0].strip().rstrip(".;")
            brand_of.setdefault(m.group(1).strip().lower(), brand)
    generic_of = {b.lower(): g for g, b in brand_of.items()}
    for q in bank:
        m = PTCB_BRAND_Q.search(q.get("prompt") or "")
        if not m:
            continue
        asked = m.group(1).strip()
        notes = q.setdefault("distractorExplanations", {})
        for o in q["options"]:
            text = o["text"]
            if text.startswith("Generic:"):
                generic = text[len("Generic:"):].split(". Class:")[0].strip()
                brand = brand_of.get(generic.lower())
                if not brand:
                    continue
                o["text"] = brand
                stats["ptcb_dump_option_replaced"] += 1
            else:
                o["text"] = re.split(r"\. Class:|\s\(tartrate", text)[0].strip().rstrip(".;")
            if o["id"] != q["correctOptionId"]:
                generic = generic_of.get(o["text"].lower())
                if generic:
                    label = re.sub(r"apap|tmp-smx", lambda x: x.group(0).upper(), generic[:1].upper() + generic[1:])
                    notes[o["id"]] = f"{o['text']} is a brand name for {label}, not {asked}."


SHORT_SEPS = (". ", ", ", "; ", ": ", " (", " — ")
ONLY_TAIL = re.compile(r"\s+(?:only|exclusively)\s*$", re.I)
WHICH_OPTION_STEM = re.compile(r"\s*—\s*which option is correct for [^?]+\?\s*$", re.I)


def content_words(text: str) -> set[str]:
    return {w for w in re.findall(r"[a-z0-9]+", text.lower()) if len(w) > 2}


def safe_only_strip(stripped: str, correct: str, options: list[dict]) -> bool:
    words = content_words(stripped)
    if len(stripped) < 3 or not words or words <= content_words(correct):
        return False
    return norm(stripped) not in {norm(o.get("text")) for o in options}


def short_correct(q: dict) -> bool:
    opts = q.get("options") or []
    cor = next((o for o in opts if o.get("id") == q.get("correctOptionId")), None)
    wrong = [len(str(o.get("text") or "")) for o in opts if o is not cor]
    return bool(cor and wrong) and len(str(cor.get("text") or "")) < 0.6 * (sum(wrong) / len(wrong))


def history_texts(source: str) -> list[str]:
    path = f"src/data/mock-exams/{source}.json"
    shas = subprocess.run(
        ["git", "log", "--format=%H", "--", path], cwd=REPO, capture_output=True, text=True
    ).stdout.split()
    seen: dict[str, None] = {}
    for sha in shas:
        res = subprocess.run(["git", "show", f"{sha}:{path}"], cwd=REPO, capture_output=True, text=True)
        if res.returncode:
            continue
        try:
            data = json.loads(res.stdout)
        except json.JSONDecodeError:
            continue
        for q in data if isinstance(data, list) else []:
            for opt in q.get("options") or []:
                text = str(opt.get("text") or "").strip()
                if text and not text.endswith("…"):
                    seen.setdefault(text, None)
    return list(seen)


def enrich_bank(slug: str, questions: list[dict], relaxed: set[str] | None = None) -> tuple[list[dict], dict]:
    relaxed = relaxed or set()
    english = not any(marker in slug for marker in NON_EN_MARKERS)
    stats = Counter()
    bank = copy.deepcopy(questions)

    truncated = any(str(o.get("text") or "").rstrip().endswith("…") for q in bank for o in q.get("options") or [])
    short = any(short_correct(q) for q in bank)
    index = history_texts(SOURCE_FILE.get(slug, slug)) if truncated or short else []

    for q in bank:
        cid = q.get("correctOptionId")
        cor = next((o for o in q.get("options") or [] if o.get("id") == cid), None)
        prompt = str(q.get("prompt") or "")
        fixed = WHICH_OPTION_STEM.sub("", prompt).rstrip()
        if fixed != prompt and len(fixed) >= 10:
            q["prompt"] = fixed if fixed.endswith(("?", ":", ".")) else fixed + ":"
            stats["stem_template_fixed"] += 1
        if index and cor and short_correct(q):
            base = str(cor.get("text") or "").strip().rstrip(".")
            fulls = [t for t in index if len(t) > len(base) + 3 and any(t.startswith(base + sep) for sep in SHORT_SEPS)]
            others = {norm(o.get("text")) for o in q["options"] if o is not cor}
            lead = re.split(r"\s(?:Formula|Example|Key note):", str(q.get("explanation") or ""))[0].strip()
            longest_wrong = max(len(str(o.get("text") or "")) for o in q["options"] if o is not cor)
            if len(base) >= 12 and 1 <= len(fulls) <= 3 and norm(fulls[0]) not in others:
                cor["text"] = fulls[0]
                stats["short_correct_restored"] += 1
            elif (
                len(base) >= 12
                and any(lead.startswith(base + sep) for sep in SHORT_SEPS)
                and len(lead) <= 1.3 * longest_wrong
                and norm(lead) not in others
            ):
                cor["text"] = lead
                stats["short_correct_from_explanation"] += 1
        for opt in q.get("options") or []:
            text = str(opt.get("text") or "")
            if text.rstrip().endswith("…") and index:
                prefix = text.rstrip()[:-1].rstrip()
                full = next((t for t in index if t.startswith(prefix) and len(t) > len(prefix) + 1), None)
                if full:
                    opt["text"] = full
                    stats["truncation_restored"] += 1
            if opt["text"].rstrip().endswith("…"):
                opt["text"] = clip_truncated(opt["text"])
                stats["truncation_clipped"] += 1
            if opt.get("id") != cid:
                new = DOUBLE_ALWAYS.sub("always", opt["text"])
                new = JUNK_TAIL.sub("", new).strip()
                if new != opt["text"] and len(new) >= 3:
                    opt["text"] = new
                    stats["junk_tail_stripped"] += 1
                stripped = ONLY_TAIL.sub("", opt["text"]).strip()
                if stripped != opt["text"] and cor and safe_only_strip(stripped, cor["text"], q["options"]):
                    opt["text"] = stripped
                    stats["only_tail_stripped"] += 1

    answers: dict[str, str] = {}
    answer_prefixes: dict[str, str] = {}
    for q in bank:
        correct = next((o for o in q.get("options") or [] if o.get("id") == q.get("correctOptionId")), None)
        if correct:
            key = norm(correct.get("text"))
            answers[key] = q.get("prompt") or ""
            if len(key) >= 45:
                answer_prefixes[key[:45]] = q.get("prompt") or ""

    def other_answer(text: str) -> str | None:
        key = norm(text)
        return answers.get(key) or (answer_prefixes.get(key[:45]) if len(key) >= 45 else None)

    for q in bank:
        cid = q.get("correctOptionId")
        expl = str(q.get("explanation") or "")
        new_expl = strip_fillers(expl, EXPL_RE)
        if new_expl != expl.strip():
            stats["explanation_template_removed"] += 1
        q["explanation"] = new_expl or tidy(expl)

        notes = dict(q.get("distractorExplanations") or {})
        own_prompt = norm(q.get("prompt"))
        cor_text = next((str(o.get("text") or "") for o in q.get("options") or [] if o.get("id") == cid), "")
        for opt in q.get("options") or []:
            oid = opt.get("id")
            if oid == cid:
                notes.pop(oid, None)
                continue
            before = str(notes.get(oid) or "")
            after = strip_fillers(before, DIST_RE) if before else ""
            other = other_answer(opt.get("text"))
            borrowed = q.get("id") in relaxed
            if english and other and norm(other) != own_prompt and (borrowed or not after):
                after = f"This is the answer to a different question (“{short_prompt(other)}”), not to this one."
                stats["cross_answer_note"] += 1
            elif borrowed and after:
                after = ""
                stats["borrowed_note_dropped"] += 1
            if after != before.strip():
                stats["distractor_note_changed"] += 1
            if not after:
                if english and cor_text:
                    after = f"Not the best answer here; the right answer is “{clip_text(cor_text, 140)}”."
                    stats["distractor_note_fallback"] += 1
                else:
                    after = before.strip()
                    stats["distractor_note_kept_non_en"] += 1
            if after:
                notes[oid] = after
            else:
                notes.pop(oid, None)
                if before:
                    stats["distractor_note_emptied"] += 1
        q["distractorExplanations"] = notes

    if slug == "ptcb-pharmacy-technician-mock":
        normalize_ptcb_brand_items(bank, stats)

    for q in bank:
        patch = MANUAL_PATCHES.get(slug, {}).get(q.get("id"))
        if not patch:
            continue
        for key in ("prompt", "explanation"):
            if key in patch:
                q[key] = patch[key]
        for o in q.get("options") or []:
            if o.get("id") in patch.get("options", {}):
                o["text"] = patch["options"][o["id"]]
        q.setdefault("distractorExplanations", {}).update(patch.get("distractorExplanations", {}))
        stats["manual_patch"] += 1

    problems = []
    for q in bank:
        opts = q.get("options") or []
        ids = [o.get("id") for o in opts]
        if q.get("correctOptionId") not in ids:
            problems.append(f"{q.get('id')}: correct id missing")
        if any(not str(o.get("text") or "").strip() for o in opts):
            problems.append(f"{q.get('id')}: empty option")
        if len({norm(o.get('text')) for o in opts}) < len(opts):
            problems.append(f"{q.get('id')}: duplicate option text")
        notes = q.get("distractorExplanations") or {}
        if any(o.get("id") != q.get("correctOptionId") and not notes.get(o.get("id")) for o in opts):
            problems.append(f"{q.get('id')}: missing distractor explanation")
        if not str(q.get("explanation") or "").strip():
            problems.append(f"{q.get('id')}: missing explanation")
    stats["problems"] = len(problems)
    return bank, {"slug": slug, **stats, "problem_examples": problems[:5]}


def main() -> None:
    banks = json.loads(Path("/tmp/ops-all-banks.json").read_text())
    slugs = sys.argv[1:] or sorted(banks)
    OUT.mkdir(exist_ok=True)
    recover_report = RECOVER / "report.json"
    relaxed_by_slug = (
        {r["slug"]: set(r.get("relaxed_ids") or []) for r in json.loads(recover_report.read_text())}
        if recover_report.exists()
        else {}
    )
    reports = []
    for slug in slugs:
        rec = RECOVER / f"{slug}.json"
        questions = json.loads(rec.read_text()) if rec.exists() else banks[slug]
        bank, report = enrich_bank(slug, questions, relaxed_by_slug.get(slug))
        report["recovered_input"] = rec.exists()
        (OUT / f"{slug}.json").write_text(json.dumps(bank, ensure_ascii=False, indent=2) + "\n")
        reports.append(report)
    (OUT / "report.json").write_text(json.dumps(reports, ensure_ascii=False, indent=2))
    total = Counter()
    for r in reports:
        for k, v in r.items():
            if isinstance(v, int) and not isinstance(v, bool):
                total[k] += v
    print(json.dumps(dict(total), indent=2))
    bad = [r for r in reports if r.get("problems")]
    for r in bad:
        print("PROBLEMS", r["slug"], r["problems"], r["problem_examples"][:3])


if __name__ == "__main__":
    main()
