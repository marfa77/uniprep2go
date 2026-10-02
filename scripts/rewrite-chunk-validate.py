"""Validate one parallel-writer chunk (bank patch or deck cards) against mock-bank-audit-standard. Exit 1 on any PROBLEM.

  python3 scripts/rewrite-chunk-validate.py bank <slug> <patch.json> <bank_chunk.json> <a,b,c,d quota>
  python3 scripts/rewrite-chunk-validate.py deck <work_dir> <cards.json> <deck_chunk.json>

Chunks come from scripts/rewrite-chunk-prep.py. A bank chunk item with "newTopicId" moves topics — the patch must set it.
Deck mode reads <work_dir>/deck_all_cards.txt to reject fronts that duplicate cards that are kept.
"""
import json
import re
import sys
from pathlib import Path

TEMPLATE = re.compile(r"(?i)not the best answer|the right answer is|answer to a different question|select the best answer|^on the [\w\s&+-]{2,40}(mock|exam|test)\b"
                      r"|n[’']est pas la bonne réponse|la bonne réponse est|semble plausible")
LETTER_REF = re.compile(r"(?i)\b(option|choice|answer|réponse|choix)\s+[abcd]\b|\([abcd]\)")
ABSOLUTE = re.compile(r"(?i)\b(always|never|only|all|none|guaranteed|toujours|jamais|uniquement|seulement|exclusivement|aucun|aucune)\b")
NUM = re.compile(r"^\s*[-+]?\$?\s*[\d,]+(\.\d+)?\s*%?\s*(million|billion|shares|points|days|years|months)?\s*$", re.I)
DEFINITION = re.compile(r"(?i)^what (is|are) (a |an |the )?[\w\-' ]{1,40}\?$")


def num(text):
    m = re.search(r"[-+]?[\d,]*\.?\d+", text.replace("$", ""))
    return float(m.group().replace(",", "")) if m else None


def words(text):
    return set(re.findall(r"[a-z0-9']+", text.lower()))


def check_bank(slug, patch_path, chunk_path, quota):
    problems = []
    patch = json.load(open(patch_path)).get(slug, {})
    chunk = json.load(open(chunk_path))
    ids = [c["id"] for c in chunk]
    missing = [i for i in ids if i not in patch]
    extra = [i for i in patch if i not in ids]
    if missing:
        problems.append(f"missing ids: {missing}")
    if extra:
        problems.append(f"ids not in this chunk: {extra}")
    keys = {"a": 0, "b": 0, "c": 0, "d": 0}
    longest = much_longer = not_except = 0
    prompts = []
    for item in chunk:
        qid = item["id"]
        q = patch.get(qid)
        if not q:
            continue
        if item.get("newTopicId") and q.get("topicId") != item["newTopicId"]:
            problems.append(f"{qid}: patch must set topicId {item['newTopicId']}")
        opts = q.get("options", {})
        key = q.get("correctOptionId")
        if sorted(opts) != ["a", "b", "c", "d"] or key not in opts:
            problems.append(f"{qid}: need options a-d and a valid correctOptionId")
            continue
        keys[key] += 1
        prompt = q.get("prompt", "")
        prompts.append(prompt)
        if len(prompt) < 40:
            problems.append(f"{qid}: prompt too short")
        if TEMPLATE.search(prompt):
            problems.append(f"{qid}: boilerplate wording in prompt")
        if re.search(r"\b(NOT|EXCEPT)\b", prompt):
            not_except += 1
        texts = [opts[k].strip() for k in "abcd"]
        if len({t.lower() for t in texts}) < 4:
            problems.append(f"{qid}: duplicate options")
        if any(re.search(r"(?i)\b(all|none|both) of the above\b", t) for t in texts):
            problems.append(f"{qid}: all/none/both of the above")
        lens = {k: len(opts[k]) for k in opts}
        if lens[key] >= max(lens.values()):
            longest += 1
        if all(lens[key] > 1.4 * lens[k] for k in opts if k != key):
            much_longer += 1
        if all(NUM.match(t) for t in texts):
            values = [num(t) for t in texts]
            if None not in values and values != sorted(values) and values != sorted(values, reverse=True):
                problems.append(f"{qid}: numeric options not in order {values}")
        expl = q.get("explanation", "")
        if len(expl) < 60:
            problems.append(f"{qid}: explanation under 60 chars")
        if TEMPLATE.search(expl) or LETTER_REF.search(expl):
            problems.append(f"{qid}: template wording or letter reference in explanation")
        notes = q.get("distractorExplanations", {})
        for k in opts:
            if k == key:
                continue
            note = notes.get(k, "")
            if len(note) < 40:
                problems.append(f"{qid}:{k} distractor note under 40 chars")
            if TEMPLATE.search(note) or LETTER_REF.search(note):
                problems.append(f"{qid}:{k} template wording or letter reference in note")
            if ABSOLUTE.search(opts[k]) and not ABSOLUTE.search(opts[key]):
                problems.append(f"{qid}:{k} absolute-word giveaway on a wrong option only")
        if key in notes:
            problems.append(f"{qid}: distractorExplanations must not include the key")
    n = len(ids)
    want = dict(zip("abcd", (int(x) for x in quota.split(","))))
    if keys != want:
        problems.append(f"key letters {keys} != quota {want}")
    if longest > 0.30 * n:
        problems.append(f"correct is (tied) longest in {longest}/{n} > 30%")
    if much_longer > 0.10 * n:
        problems.append(f"correct >40% longer than every distractor in {much_longer}/{n} > 10%")
    if not_except > max(1, 0.10 * n):
        problems.append(f"NOT/EXCEPT stems {not_except} > 10%")
    for i, a in enumerate(prompts):
        for b in prompts[i + 1:]:
            wa, wb = words(a), words(b)
            if len(wa & wb) / max(1, len(wa | wb)) >= 0.6:
                problems.append(f"near-duplicate prompts: {a[:60]} | {b[:60]}")
    return problems, f"{n} items · keys {keys} · longest-correct {longest}/{n}"


def check_deck(work_dir, cards_path, chunk_path):
    problems = []
    cards = json.load(open(cards_path))
    chunk = json.load(open(chunk_path))
    want = [c["row"] for c in chunk]
    got = [c.get("row") for c in cards]
    if sorted(got) != sorted(want):
        problems.append(f"rows mismatch: missing {sorted(set(want) - set(got))} extra {sorted(set(got) - set(want))}")
    kept = {}
    for line in (Path(work_dir) / "deck_all_cards.txt").read_text().splitlines():
        row, _, status, front = line.split("\t", 3)
        if status == "keep":
            kept[front.strip().lower()] = int(row)
    fronts = {}
    for c in cards:
        tag = f"row {c.get('row')}"
        front, back = c.get("front", "").strip(), c.get("back", "").strip()
        example, mistake = c.get("example", "").strip(), c.get("mistake", "").strip()
        if not c.get("term", "").strip():
            problems.append(f"{tag}: empty term")
        if not front.endswith("?") or len(front) < 25:
            problems.append(f"{tag}: front must be a question of 25+ chars")
        if DEFINITION.match(front):
            problems.append(f"{tag}: bare 'What is X?' definition front")
        if not 120 <= len(back) <= 420:
            problems.append(f"{tag}: back {len(back)} chars (need 120-420)")
        if len(example) < 40:
            problems.append(f"{tag}: example under 40 chars")
        if len(mistake) < 30:
            problems.append(f"{tag}: mistake under 30 chars")
        for label, value in (("front", front), ("back", back), ("example", example), ("mistake", mistake)):
            if "$$" in value or "\\" in value:
                problems.append(f"{tag}: LaTeX in {label}")
        formula = c.get("formula", "").strip()
        if formula and not (formula.startswith("$$") and formula.endswith("$$")):
            problems.append(f"{tag}: formula must be wrapped in $$...$$")
        low = front.lower()
        if low in kept:
            problems.append(f"{tag}: front duplicates kept card row {kept[low]}")
        if low in fronts:
            problems.append(f"{tag}: front duplicates row {fronts[low]} in this chunk")
        fronts[low] = c.get("row")
    return problems, f"{len(cards)} cards · avg back {sum(len(c.get('back', '')) for c in cards) / max(1, len(cards)):.0f}"


if __name__ == "__main__":
    mode = sys.argv[1]
    problems, summary = check_bank(*sys.argv[2:6]) if mode == "bank" else check_deck(*sys.argv[2:5])
    print(summary)
    for p in problems:
        print("PROBLEM:", p)
    print("OK" if not problems else f"{len(problems)} problems")
    sys.exit(1 if problems else 0)
