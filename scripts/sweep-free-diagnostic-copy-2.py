"""Second pass of the free-diagnostic copy sweep: "Free X: 90 timed questions", "free check is 60 questions",
"free X check (60 questions, …)", "free X — 90 questions". Competitor banks and search-keyword strings are skipped.

  python3 scripts/sweep-free-diagnostic-copy-2.py            # dry run
  python3 scripts/sweep-free-diagnostic-copy-2.py --write
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FREE_Q = 25
SKIP = {
    "src/lib/mock-exams/free-diagnostic.ts",
    "src/lib/mock-exams/mock-access-faq.ts",
    "src/components/mock-exams/mock-exam-client.tsx",
}
FILES = [
    p
    for p in [*ROOT.glob("src/lib/**/*.ts"), *ROOT.glob("src/app/**/*.tsx"), *ROOT.glob("src/components/**/*.tsx"),
              ROOT / "src/data/gumroad/landing-copy.json"]
    if not p.name.endswith(".test.ts") and p.relative_to(ROOT).as_posix() not in SKIP
]
COMPETITOR = re.compile(r"\b(bank|banks|we found|series \d+ questions)\b", re.I)


def cap(text: str, upper: bool) -> str:
    return text[:1].upper() + text[1:] if upper else text


def big(n: str) -> bool:
    return int(n) > FREE_Q


COLON = re.compile(r"\b([Ff])ree ([^\":.()\n]{2,70}?)(?: — no signup)?: (\d{2,3}) (timed )?questions")
FREE_AND_TIMED = re.compile(r"\bis free and timed: (\d{2,3}) questions")
IS = re.compile(r"\bfree (check|mock) is (\d{2,3}) questions")
PAREN = re.compile(r"\b([Ff])ree ([^\"().:\n]{2,70}?) \((\d{2,3}) (timed )?questions([^)\n]*)\)")
DASH = re.compile(r"\b([Ff])ree ([^\".—\n]{2,70}?) — (\d{2,3}) questions")
SHORT_Q = re.compile(r"\bfree (\d{2,3})Q timed mock")


def rewrite(text: str) -> str:
    def colon(m):
        if not big(m[3]) or COMPETITOR.search(m[2]) or "-question" in m[2] or m[2].startswith("and "):
            return m[0]
        return f"{cap(m[2], m[1] == 'F')}: free {FREE_Q}-question diagnostic, full mock {m[3]} {m[4] or ''}questions"

    def is_(m):
        return m[0] if not big(m[2]) else f"{m[1]} (free {FREE_Q}-question version) is {m[2]} questions"

    def paren(m):
        if not big(m[3]) or COMPETITOR.search(m[2]):
            return m[0]
        return f"{cap(m[2], m[1] == 'F')} ({m[3]} {m[4] or ''}questions{m[5]}; free {FREE_Q}-question version)"

    def dash(m):
        if not big(m[3]) or COMPETITOR.search(m[2]):
            return m[0]
        return f"{cap(m[2], m[1] == 'F')} — {m[3]} questions (free {FREE_Q}-question version)"

    text = FREE_AND_TIMED.sub(
        lambda m: m[0] if not big(m[1]) else f"is timed: {m[1]} questions (free {FREE_Q}-question version)", text
    )
    text = COLON.sub(colon, text)
    text = IS.sub(is_, text)
    text = PAREN.sub(paren, text)
    text = DASH.sub(dash, text)
    return SHORT_Q.sub(lambda m: m[0] if not big(m[1]) else f"{m[1]}Q timed mock (free {FREE_Q}-question version)", text)


def main():
    write = "--write" in sys.argv
    total = 0
    for path in FILES:
        before = path.read_text()
        after = rewrite(before)
        if before == after:
            continue
        pairs = [(a, b) for a, b in zip(before.splitlines(), after.splitlines()) if a != b]
        total += len(pairs)
        print(f"{len(pairs):4} {path.relative_to(ROOT)}")
        if not write:
            for a, b in pairs[:2]:
                i = next(i for i, (x, y) in enumerate(zip(a, b)) if x != y)
                print("      -", a[max(0, i - 50): i + 110].strip())
                print("      +", b[max(0, i - 50): i + 150].strip())
        else:
            path.write_text(after)
    print(f"lines changed: {total}{'' if write else ' (dry run)'}")


if __name__ == "__main__":
    main()
