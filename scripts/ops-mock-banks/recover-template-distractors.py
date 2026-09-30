#!/usr/bin/env python3
"""Restore pre-contamination distractors for ops items that carry the FDIC/securities boilerplate.

The boilerplate came from scripts/repair-definition-style-distractors-local.mjs (2026-08-06+).
For each contaminated item, walk git history of src/data/mock-exams/{slug}.json newest → oldest and
take the first version of the same question id whose options are clean and whose correct answer
text matches today's correct answer. Only the boilerplate option slots are replaced.

Input: /tmp/ops-all-banks.json ({slug: [questions]}) — dump of ops_get_mock_bank.
Output: /tmp/recover/{slug}.json (full bank, recovered items patched) + /tmp/recover/report.json
Usage: python3 scripts/ops-mock-banks/recover-template-distractors.py [slug ...]
"""

from __future__ import annotations

import copy
import json
import re
import subprocess
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]
OUT = Path("/tmp/recover")
BOILERPLATE = re.compile(
    r"identical to FDIC deposit insurance|eliminates all investment, legal, and regulatory risk"
    r"|no application in US securities, insurance, or licensing markets",
    re.I,
)
FALSE_NOTE = re.compile(r"This statement is false about the tested concept", re.I)
SOURCE_FILE = {"sie-quick-diagnostic": "sie-full-mock"}


def norm(text: str) -> str:
    return re.sub(r"\s+", " ", str(text or "")).strip().lower()


def correct_text(question: dict) -> str:
    return next(
        (o.get("text", "") for o in question.get("options") or [] if o.get("id") == question.get("correctOptionId")),
        "",
    )


def is_contaminated(question: dict) -> bool:
    return any(BOILERPLATE.search(str(o.get("text") or "")) for o in question.get("options") or [])


def history(path: str) -> list[str]:
    out = subprocess.run(
        ["git", "log", "--format=%H", "--", path], cwd=REPO, capture_output=True, text=True, check=True
    ).stdout
    return [line for line in out.splitlines() if line]


def load_at(sha: str, path: str) -> list[dict] | None:
    res = subprocess.run(["git", "show", f"{sha}:{path}"], cwd=REPO, capture_output=True, text=True)
    if res.returncode != 0:
        return None
    try:
        data = json.loads(res.stdout)
    except json.JSONDecodeError:
        return None
    return data if isinstance(data, list) else None


def recover_bank(slug: str, questions: list[dict], relaxed: bool = False) -> tuple[list[dict], dict]:
    path = f"src/data/mock-exams/{slug}.json"
    source = SOURCE_FILE.get(slug, slug)
    path = f"src/data/mock-exams/{source}.json"
    need = {q["id"]: q for q in questions if is_contaminated(q)}
    report = {"slug": slug, "contaminated": len(need), "recovered": 0, "relaxed_ids": [], "unrecovered_ids": []}
    if not need:
        return questions, report
    by_prompt = {norm(q.get("prompt")): qid for qid, q in need.items()}
    found: dict[str, dict] = {}
    relaxed_hits: set[str] = set()
    if (REPO / path).exists():
        for sha in history(path):
            if len(found) == len(need):
                break
            old = load_at(sha, path)
            if not old:
                continue
            for oq in old:
                if is_contaminated(oq):
                    continue
                old_distractors = [o for o in oq.get("options") or [] if o.get("id") != oq.get("correctOptionId")]
                if len(old_distractors) < 3:
                    continue
                qid = oq.get("id")
                if qid in need and qid not in found and norm(correct_text(oq)) == norm(correct_text(need[qid])):
                    found[qid] = oq
                    relaxed_hits.discard(qid)
                    continue
                if not relaxed:
                    continue
                target = qid if qid in need else by_prompt.get(norm(oq.get("prompt")))
                if not target or target in found:
                    continue
                current_correct = norm(correct_text(need[target]))
                if any(norm(o.get("text")) == current_correct for o in old_distractors):
                    continue
                found[target] = oq
                relaxed_hits.add(target)
    report["relaxed_ids"] = sorted(relaxed_hits)

    patched = []
    for q in questions:
        oq = found.get(q.get("id"))
        if not oq:
            if q.get("id") in need:
                report["unrecovered_ids"].append(q["id"])
            patched.append(q)
            continue
        nq = copy.deepcopy(q)
        present = {norm(o.get("text")) for o in nq["options"] if not BOILERPLATE.search(str(o.get("text") or ""))}
        pool = [
            o
            for o in oq["options"]
            if o.get("id") != oq.get("correctOptionId") and norm(o.get("text")) not in present
        ]
        old_notes = oq.get("distractorExplanations") or {}
        notes = dict(nq.get("distractorExplanations") or {})
        ok = True
        for opt in nq["options"]:
            if not BOILERPLATE.search(str(opt.get("text") or "")):
                continue
            if not pool:
                ok = False
                break
            src = pool.pop(0)
            opt["text"] = src["text"]
            note = old_notes.get(src.get("id"))
            if note and not FALSE_NOTE.search(note):
                notes[opt["id"]] = note
            else:
                notes.pop(opt["id"], None)
        if not ok:
            report["unrecovered_ids"].append(q["id"])
            patched.append(q)
            continue
        nq["distractorExplanations"] = notes
        report["recovered"] += 1
        patched.append(nq)
    return patched, report


def main() -> None:
    banks = json.loads(Path("/tmp/ops-all-banks.json").read_text())
    args = sys.argv[1:]
    relaxed = "--relaxed" in args
    slugs = [a for a in args if not a.startswith("--")] or sorted(banks)
    OUT.mkdir(exist_ok=True)
    reports = []
    for slug in slugs:
        patched, report = recover_bank(slug, banks[slug], relaxed=relaxed)
        if report["contaminated"]:
            (OUT / f"{slug}.json").write_text(json.dumps(patched, ensure_ascii=False, indent=2) + "\n")
            reports.append(report)
            print(
                f"{slug}\t{report['contaminated']}\t{report['recovered']}\t"
                f"{len(report['relaxed_ids'])}\t{len(report['unrecovered_ids'])}"
            )
    (OUT / "report.json").write_text(json.dumps(reports, ensure_ascii=False, indent=2))
    tot = sum(r["contaminated"] for r in reports)
    rec = sum(r["recovered"] for r in reports)
    print(f"# contaminated={tot} recovered={rec} unrecovered={tot - rec}", file=sys.stderr)


if __name__ == "__main__":
    main()
