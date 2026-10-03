"""Validate per-deck selling copy for Gumroad description + landing (and site deck page). Exit 1 on any PROBLEM.

  python3 scripts/landing-copy-validate.py <dir with <deckSlug>.json files> [<deckSlug> ...]

Schema (one file per deck):
  summary    80-160 chars   Gumroad summary line / meta description
  hook       150-450 chars  first paragraph: outcome first, names the exam and the card count
  examFacts  3-6 {label, value}; factsSource = official https URL (exam body / vendor); factsNote optional
  whoFor     100-350 chars
  whyThis    3-5 bullets, 40-220 chars each (honest differentiators)
  studyPlan  3-5 steps, 30-220 chars each
  faqs       5-7 {q, a}; q ends with "?", a 60-380 chars
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BANNED = re.compile(r"(?i)guarantee[ds]?\b|pass guarantee|100% pass|official (deck|material|question)s?\b(?! from)|endorsed by|waitlist|when the \.apkg ships|actual exam questions|real exam questions|brain ?dump")
SPECS = {}
for name in ("wave-deck-specs.json", "building-deck-specs.json"):
    path = ROOT / "src/data" / name
    if path.exists():
        SPECS.update(json.loads(path.read_text()))


def span(problems, tag, text, lo, hi):
    if not isinstance(text, str) or not lo <= len(text.strip()) <= hi:
        problems.append(f"{tag}: {len(text) if isinstance(text, str) else 'missing'} chars (need {lo}-{hi})")


def check(path: Path):
    slug = path.stem
    problems = []
    copy = json.loads(path.read_text())
    span(problems, "summary", copy.get("summary"), 80, 160)
    span(problems, "hook", copy.get("hook"), 150, 450)
    span(problems, "whoFor", copy.get("whoFor"), 100, 350)
    facts = copy.get("examFacts") or []
    if not 3 <= len(facts) <= 6 or not all(f.get("label") and f.get("value") for f in facts):
        problems.append("examFacts: need 3-6 {label, value}")
    src = copy.get("factsSource") or ""
    if not src.startswith("https://") or "uniprep2go" in src or "gumroad" in src:
        problems.append("factsSource: official https URL required")
    for key, lo, hi in (("whyThis", 40, 220), ("studyPlan", 30, 220)):
        items = copy.get(key) or []
        if not 3 <= len(items) <= 5:
            problems.append(f"{key}: need 3-5 items")
        for i, item in enumerate(items):
            span(problems, f"{key}[{i}]", item, lo, hi)
    faqs = copy.get("faqs") or []
    if not 5 <= len(faqs) <= 7:
        problems.append("faqs: need 5-7")
    for i, f in enumerate(faqs):
        if not (f.get("q") or "").strip().endswith("?"):
            problems.append(f"faqs[{i}].q must be a question")
        span(problems, f"faqs[{i}].a", f.get("a"), 60, 380)
    tags = copy.get("tags") or []
    if tags and not 3 <= len(tags) <= 8:
        problems.append("tags: need 3-8")
    for tag in tags:
        if len(tag) >= 20:
            problems.append(f"tag over Gumroad's 20-char limit: {tag!r}")
    if "title" in copy:
        span(problems, "title", copy.get("title"), 20, 100)
    if "inside" in copy:
        items = copy.get("inside") or []
        if not 3 <= len(items) <= 7:
            problems.append("inside: need 3-7 items")
        for i, item in enumerate(items):
            span(problems, f"inside[{i}]", item, 20, 260)
    if "factsHeading" in copy:
        span(problems, "factsHeading", copy.get("factsHeading"), 8, 60)
    if "disclaimer" in copy:
        span(problems, "disclaimer", copy.get("disclaimer"), 40, 300)
    if "samplesNote" in copy:
        span(problems, "samplesNote", copy.get("samplesNote"), 40, 260)
    blob = json.dumps(copy, ensure_ascii=False)
    for m in BANNED.finditer(blob):
        problems.append(f"banned claim: {m.group(0)!r}")
    spec = SPECS.get(slug) or ({"cardCount": copy["cardCount"]} if copy.get("cardCount") else None)
    if copy.get("noun") in ("bundle", "guide"):
        spec = None
    if spec and spec.get("cardCount"):
        count = str(spec["cardCount"])
        if count not in copy.get("hook", ""):
            problems.append(f"hook must state the real card count {count}")
        for n in re.findall(r"\b(\d{2,4})\s+(?:flash)?cards\b", blob):
            if n != count:
                problems.append(f"card count {n} != real {count}")
    return slug, problems


if __name__ == "__main__":
    folder = Path(sys.argv[1])
    slugs = sys.argv[2:] or [p.stem for p in sorted(folder.glob("*.json"))]
    bad = 0
    for slug in slugs:
        path = folder / f"{slug}.json"
        if not path.exists():
            print(f"{slug}: MISSING")
            bad += 1
            continue
        _, problems = check(path)
        print(f"{slug}: {'OK' if not problems else f'{len(problems)} problems'}")
        for p in problems:
            print("  PROBLEM:", p)
        bad += bool(problems)
    sys.exit(1 if bad else 0)
