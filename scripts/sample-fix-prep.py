"""Pick the 3 weakest items (3 different topics) of a wave deck's mock bank for a sample-card rewrite.

  python3 scripts/sample-fix-prep.py <work_dir> [--skip=<topic suffix>] <deckSlug> [<deckSlug> ...]
      → <work_dir>/<deckSlug>.chunk.json  (3 current items; the rewrite keeps id, topicId and key letter)
      → <work_dir>/plan.json              (deckSlug → mockSlug, ids, key quota "a,b,c,d")

Validate writer output with scripts/sample-cards-validate.py bank.
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TEMPLATE = re.compile(r"(?i)learners who choose|the correct choice \(|matches this rule|not the best answer|exact mistake")
DEFINITION = re.compile(r"(?i)^(what (is|are)|which (term|statement) (best )?(describes|defines))\b")
ABSURD = re.compile(r"(?i)guaranteed|any unlicensed|federal income tax brackets|unrelated|no rules apply|ignore")


def weakness(q: dict) -> int:
    prompt = q.get("prompt", "")
    notes = " ".join((q.get("distractorExplanations") or {}).values())
    options = " ".join(o["text"] for o in q.get("options", []))
    score = 0
    score += 3 if len(prompt) < 70 else 0
    score += 3 if DEFINITION.search(prompt) or prompt.rstrip().endswith(":") else 0
    score += 2 * len(TEMPLATE.findall(notes + " " + q.get("explanation", "")))
    score += 3 * len(ABSURD.findall(options))
    score += 2 if len(q.get("explanation", "")) < 90 else 0
    return score


def main() -> None:
    work = Path(sys.argv[1])
    work.mkdir(parents=True, exist_ok=True)
    specs = json.loads((ROOT / "src/data/wave-deck-specs.json").read_text())
    plan_path = work / "plan.json"
    plan = json.loads(plan_path.read_text()) if plan_path.exists() else {}
    skip = [a.split("=", 1)[1] for a in sys.argv[2:] if a.startswith("--skip=")]
    for deck in (a for a in sys.argv[2:] if not a.startswith("--")):
        mock = specs[deck]["mockSlug"]
        bank = json.loads((ROOT / "src/data/mock-exams" / f"{mock}.json").read_text())
        bank = bank["questions"] if isinstance(bank, dict) else bank
        by_topic: dict[str, list[dict]] = {}
        for q in bank:
            if not any(q["topicId"].endswith(s) for s in skip):
                by_topic.setdefault(q["topicId"], []).append(q)
        worst = sorted(
            (max(items, key=weakness) for items in by_topic.values()),
            key=weakness,
            reverse=True,
        )[:3]
        # Samples show three different answer letters; pick the letters the rest of the bank uses least.
        rest = {k: 0 for k in "abcd"}
        for q in bank:
            if q not in worst:
                rest[q["correctOptionId"]] += 1
        letters = sorted("abcd", key=lambda k: (rest[k], k))[:3]
        keys = {k: int(k in letters) for k in "abcd"}
        (work / f"{deck}.chunk.json").write_text(json.dumps(worst, indent=1, ensure_ascii=False))
        plan[deck] = {
            "mockSlug": mock,
            "ids": [q["id"] for q in worst],
            "quota": ",".join(str(keys[k]) for k in "abcd"),
            "topics": specs[deck].get("topics") or {},
            "weakness": [weakness(q) for q in worst],
        }
        print(f"{deck}: {plan[deck]['ids']} quota {plan[deck]['quota']} weakness {plan[deck]['weakness']}")
    plan_path.write_text(json.dumps(plan, indent=1, ensure_ascii=False))


if __name__ == "__main__":
    main()
