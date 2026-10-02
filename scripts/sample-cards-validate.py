"""Validate the 3 selling-sample rewrites per deck (rewrite-chunk-validate rules + one-screenshot fit). Exit 1 on any PROBLEM.

  python3 scripts/sample-cards-validate.py bank <work_dir> <deckSlug>
      reads <work_dir>/plan.json, <deckSlug>.chunk.json (from sample-fix-prep.py) and <deckSlug>.patch.json
      ({mockSlug: {itemId: {topicId, difficulty, prompt, options, correctOptionId, explanation, distractorExplanations}}})
  python3 scripts/sample-cards-validate.py deck <deck_work_dir>
      reads deck_all_cards.txt, chunk.json (the 3 chosen rows copied from deck_d1.json) and cards.json
  python3 scripts/sample-cards-validate.py cross <work_dir>
      flags near-duplicate prompts between decks (e.g. the same scenario reused across states)
"""
import importlib.util
import json
import re
import sys
from pathlib import Path

_spec = importlib.util.spec_from_file_location("rcv", Path(__file__).with_name("rewrite-chunk-validate.py"))
rcv = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(rcv)

STALE = re.compile(r"(?i)learners who choose|exact mistake|the correct choice \(|matches this rule")


def check_bank(work: Path, deck: str):
    plan = json.loads((work / "plan.json").read_text())[deck]
    mock = plan["mockSlug"]
    patch_path = work / f"{deck}.patch.json"
    chunk_path = work / f"{deck}.chunk.json"
    problems, summary = rcv.check_bank(mock, patch_path, chunk_path, plan["quota"])
    patch = json.loads(patch_path.read_text())
    if list(patch) != [mock]:
        problems.append(f"patch top-level key must be exactly {mock!r}")
    items = patch.get(mock, {})
    originals = {q["id"]: q for q in json.loads(chunk_path.read_text())}
    for qid, q in items.items():
        orig = originals.get(qid)
        if not orig:
            continue
        if q.get("topicId") != orig["topicId"]:
            problems.append(f"{qid}: keep topicId {orig['topicId']}")
        if q.get("difficulty") not in ("easy", "medium", "hard"):
            problems.append(f"{qid}: difficulty must be easy|medium|hard")
        prompt = q.get("prompt", "")
        if not 80 <= len(prompt) <= 320:
            problems.append(f"{qid}: prompt {len(prompt)} chars (sample needs an 80-320 char scenario)")
        if rcv.DEFINITION.match(prompt):
            problems.append(f"{qid}: bare definition stem")
        for k, text in (q.get("options") or {}).items():
            if not 8 <= len(text) <= 130:
                problems.append(f"{qid}:{k} option {len(text)} chars (need 8-130)")
        expl = q.get("explanation", "")
        if not 120 <= len(expl) <= 420:
            problems.append(f"{qid}: explanation {len(expl)} chars (need 120-420)")
        notes = q.get("distractorExplanations") or {}
        for k, note in notes.items():
            if len(note) > 220:
                problems.append(f"{qid}:{k} distractor note {len(note)} chars (max 220)")
        blob = " ".join([prompt, expl, *notes.values(), *(q.get("options") or {}).values()])
        if STALE.search(blob):
            problems.append(f"{qid}: stale template wording")
        if len(blob) > 1500:
            problems.append(f"{qid}: {len(blob)} chars total — will not fit one screenshot (max 1500)")
    return problems, summary


def check_deck(work: Path):
    problems, summary = rcv.check_deck(work, work / "cards.json", work / "chunk.json")
    cards = json.loads((work / "cards.json").read_text())
    chunk = {c["row"]: c for c in json.loads((work / "chunk.json").read_text())}
    if len(cards) != 3:
        problems.append(f"need exactly 3 cards, got {len(cards)}")
    if len({c["section"] for c in chunk.values()}) < 3:
        problems.append("the 3 rows must come from 3 different sections")
    for c in cards:
        tag = f"row {c.get('row')}"
        orig = chunk.get(c.get("row"))
        if orig and c.get("term", "").strip() != orig["term"].strip():
            problems.append(f"{tag}: keep the term {orig['term']!r} (1:1 rewrite, same note GUID)")
        front, back = c.get("front", ""), c.get("back", "")
        if not 50 <= len(front) <= 230:
            problems.append(f"{tag}: front {len(front)} chars (sample needs a 50-230 char scenario question)")
        if len(back) > 380:
            problems.append(f"{tag}: back {len(back)} chars (max 380 to fit one screenshot)")
        total = sum(len(c.get(k, "")) for k in ("front", "back", "example", "mistake", "formula"))
        if total > 950:
            problems.append(f"{tag}: {total} chars total — will not fit one screenshot (max 950)")
    return problems, summary


def check_cross(work: Path):
    prompts = []
    for path in sorted(work.glob("*.patch.json")):
        for bank in json.loads(path.read_text()).values():
            prompts += [(path.name.split(".")[0], qid, q.get("prompt", "")) for qid, q in bank.items()]
    problems = []
    for i, (da, ia, a) in enumerate(prompts):
        for db, ib, b in prompts[i + 1:]:
            wa, wb = rcv.words(a), rcv.words(b)
            if da != db and len(wa & wb) / max(1, len(wa | wb)) >= 0.5:
                problems.append(f"near-duplicate across decks: {ia} | {ib}")
    return problems, f"{len(prompts)} prompts across {len(list(work.glob('*.patch.json')))} decks"


if __name__ == "__main__":
    mode = sys.argv[1]
    if mode == "bank":
        problems, summary = check_bank(Path(sys.argv[2]), sys.argv[3])
    elif mode == "deck":
        problems, summary = check_deck(Path(sys.argv[2]))
    else:
        problems, summary = check_cross(Path(sys.argv[2]))
    print(summary)
    for p in problems:
        print("PROBLEM:", p)
    print("OK" if not problems else f"{len(problems)} problems")
    sys.exit(1 if problems else 0)
