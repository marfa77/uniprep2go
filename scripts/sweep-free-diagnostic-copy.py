"""One-off copy sweep: the free first attempt is now a 25-question diagnostic, not the full mock.

  python3 scripts/sweep-free-diagnostic-copy.py            # dry run: counts + samples
  python3 scripts/sweep-free-diagnostic-copy.py --write

Rewrites "free 60-question … mock/check" → "60-question … mock/check (free 25-question version)"
and "first mock free" → "free 25-question diagnostic". Title-case "N-Question" titles are untouched.
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
SUFFIX = f" (free {FREE_Q}-question version)"
FILES = [
    p
    for p in [*ROOT.glob("src/lib/**/*.ts"), *ROOT.glob("src/app/**/*.tsx"), *ROOT.glob("src/components/**/*.tsx"),
              ROOT / "src/data/gumroad/landing-copy.json"]
    if not p.name.endswith(".test.ts")
    and p.relative_to(ROOT).as_posix() not in SKIP
]

NOUN = r"(?:exam simulations?|simulations?|mock exams?|practice tests?|readiness checks?|mocks?|checks?|diagnostics?|tests?|quiz)"
FREE_N = re.compile(
    r"\b(?P<free>[Ff]ree) (?P<u>UniPrep2Go )?(?P<b>\*\*)?(?P<n>\d{2,3})"
    r"(?P<rest>-question[^.;,()\n\"`\]\[]{0,60}?\b" + NOUN + r"\b(?:\*\*)?)"
)
FREE_N_BARE = re.compile(r"\b(?P<free>[Ff]ree) (?P<u>UniPrep2Go )?(?P<b>\*\*)?(?P<n>\d{2,3})(?P<rest>-question(?:\*\*)?)")
FIRST_FREE = [
    (re.compile(r"first mock free in full"), f"free {FREE_Q}-question diagnostic"),
    (re.compile(r"First mock free"), f"Free {FREE_Q}-question diagnostic"),
    (re.compile(r"first mock free"), f"free {FREE_Q}-question diagnostic"),
]
NO_SIGNUP_COUNT = re.compile(r"(free \d+-question diagnostic), no signup: (\d+) timed questions")


def sub_free_n(match: re.Match) -> str:
    n = int(match["n"])
    if n <= FREE_Q:
        return match[0]
    return f"{match['u'] or ''}{match['b'] or ''}{match['n']}{match['rest']}{SUFFIX}"


def rewrite(text: str) -> str:
    text = FREE_N.sub(sub_free_n, text)
    text = FREE_N_BARE.sub(sub_free_n, text)
    for pattern, repl in FIRST_FREE:
        text = pattern.sub(repl, text)
    return NO_SIGNUP_COUNT.sub(r"\1, no signup; full mock: \2 timed questions", text)


def main():
    write = "--write" in sys.argv
    total = 0
    for path in FILES:
        before = path.read_text()
        after = rewrite(before)
        if before == after:
            continue
        changed = sum(1 for a, b in zip(before.splitlines(), after.splitlines()) if a != b)
        total += changed
        print(f"{changed:4} {path.relative_to(ROOT)}")
        if not write:
            for a, b in list(zip(before.splitlines(), after.splitlines())):
                if a != b:
                    i = next(i for i, (x, y) in enumerate(zip(a, b)) if x != y)
                    print("      -", a[max(0, i - 60): i + 110].strip())
                    print("      +", b[max(0, i - 60): i + 140].strip())
                    break
        else:
            path.write_text(after)
    print(f"lines changed: {total}{'' if write else ' (dry run)'}")


if __name__ == "__main__":
    main()
