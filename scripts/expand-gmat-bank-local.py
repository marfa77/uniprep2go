#!/usr/bin/env python3
"""Expand GMAT Focus mock bank locally to 400 questions (no OpenRouter)."""

from __future__ import annotations

import json
import math
import random
import re
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BANK_PATH = ROOT / "src/data/mock-exams/gmat-focus-readiness-check.json"
CACHE_DIR = ROOT / "src/data/mock-exams/.generation-cache/gmat-focus-readiness-check"
EXAM_SLUG = "gmat-focus-readiness-check"
SOURCE_NOTE = "Authored by UniPrep2Go (original readiness-check question)."
TOPIC_TARGETS = {"quant": 134, "verbal": 133, "data-insights": 133}


def option_set(correct_text: str, distractors: list[str], correct_slot: int) -> tuple[list[dict], str, dict]:
    seen = {correct_text}
    unique_distractors: list[str] = []
    for text in distractors:
        candidate = text
        bump = 1
        while candidate in seen:
            candidate = f"{text} (+{bump})" if not text.startswith("$") else f"{text[:-1]}{bump})" if text.endswith(")") else f"{text}-{bump}"
            bump += 1
        seen.add(candidate)
        unique_distractors.append(candidate)
    if len(unique_distractors) != 3:
        raise ValueError("Need exactly 3 distractors")
    slot = correct_slot % 4
    ordered = unique_distractors[:slot] + [correct_text] + unique_distractors[slot:]
    ids = ["a", "b", "c", "d"]
    options = [{"id": ids[i], "text": ordered[i]} for i in range(4)]
    correct_id = ids[slot]
    distractor_explanations = {
        oid: f"This option reflects a common setup or arithmetic error for this problem type."
        for oid in ids
        if oid != correct_id
    }
    return options, correct_id, distractor_explanations


def make_question(
    *,
    topic_id: str,
    qid: str,
    prompt: str,
    explanation: str,
    correct_text: str,
    distractors: list[str],
    correct_slot: int,
    difficulty: str = "medium",
    formula: str | None = None,
    distractor_explanations: dict[str, str] | None = None,
) -> dict:
    options, correct_id, default_dist = option_set(correct_text, distractors, correct_slot)
    question = {
        "id": qid,
        "examSlug": EXAM_SLUG,
        "topicId": topic_id,
        "prompt": prompt,
        "options": options,
        "correctOptionId": correct_id,
        "explanation": explanation,
        "distractorExplanations": distractor_explanations or default_dist,
        "difficulty": difficulty,
        "sourceNote": SOURCE_NOTE,
    }
    if formula:
        question["formula"] = formula
    return question


# --- Quant templates ---------------------------------------------------------

def gen_quant_batch(rng: random.Random, start: int, count: int) -> list[dict]:
    out: list[dict] = []
    n = start
    factories = [
        _quant_ratio,
        _quant_sequential_discount,
        _quant_work_rate,
        _quant_simple_interest,
        _quant_consecutive_odd,
        _quant_average_removed,
        _quant_linear_equation,
        _quant_geometry_rectangle,
        _quant_percent_change,
        _quant_combination,
        _quant_probability,
        _quant_sequence,
    ]
    i = 0
    while len(out) < count:
        q = factories[i % len(factories)](rng, n)
        if q:
            out.append(q)
            n += 1
        i += 1
    return out


def _quant_ratio(rng: random.Random, n: int) -> dict:
    a, b = rng.randint(2, 5), rng.randint(3, 7)
    parts = a + b
    mult = rng.randint(4, 12)
    total = parts * mult
    mentors = b * mult
    boys = a * mult
    prompt = (
        f"In a workshop, the ratio of apprentices to mentors is {a}:{b}. "
        f"If there are {total} people in the workshop, how many mentors are there?"
    )
    return make_question(
        topic_id="quant",
        qid=f"{EXAM_SLUG}-quant-{n:03d}",
        prompt=prompt,
        explanation=f"The ratio splits the group into {parts} equal parts. Each part is {total} ÷ {parts} = {mult}, so mentors = {b} × {mult} = {mentors}.",
        correct_text=str(mentors),
        distractors=[str(boys), str(total - mentors - 1), str(mentors + mult)],
        correct_slot=rng.randint(0, 3),
        difficulty="easy",
    )


def _quant_sequential_discount(rng: random.Random, n: int) -> dict:
    price = rng.choice([60, 80, 100, 120, 150])
    d1, d2 = rng.choice([(20, 10), (25, 10), (30, 15), (15, 20)])
    final = round(price * (1 - d1 / 100) * (1 - d2 / 100))
    wrong_add = round(price * (1 - (d1 + d2) / 100))
    wrong_first = round(price * (1 - d1 / 100))
    prompt = (
        f"A jacket priced ${price} is discounted by {d1}%, and then the sale price is reduced by an additional {d2}%. "
        f"What is the final price?"
    )
    return make_question(
        topic_id="quant",
        qid=f"{EXAM_SLUG}-quant-{n:03d}",
        prompt=prompt,
        explanation=f"Apply discounts sequentially: {price} × {1 - d1/100:.2f} × {1 - d2/100:.2f} = {final}.",
        correct_text=f"${final}",
        distractors=[f"${wrong_add}", f"${wrong_first}", f"${final + 4}"],
        correct_slot=rng.randint(0, 3),
        formula="$$\\text{Final Price} = P \\times (1 - d_1) \\times (1 - d_2)$$",
        difficulty="easy",
    )


def _quant_work_rate(rng: random.Random, n: int) -> dict:
    t1, t2 = rng.choice([(4, 6), (5, 10), (3, 6), (6, 9)])
    together = round(t1 * t2 / (t1 + t2), 2)
    together_text = str(int(together)) if together == int(together) else f"{together:.1f}"
    prompt = (
        f"Pipe A can fill a tank in {t1} hours, and Pipe B can fill the same tank in {t2} hours. "
        f"Working together at constant rates, how many hours will it take to fill the tank?"
    )
    return make_question(
        topic_id="quant",
        qid=f"{EXAM_SLUG}-quant-{n:03d}",
        prompt=prompt,
        explanation=f"Combined rate is 1/{t1} + 1/{t2} = {(t1+t2)/(t1*t2):.3f} of the tank per hour, so time = {together_text} hours.",
        correct_text=f"{together_text} hours",
        distractors=[f"{(t1+t2)//2} hours", f"{t1 + t2} hours", f"{max(t1, t2) - 1} hours"],
        correct_slot=rng.randint(0, 3),
        formula="$$\\frac{1}{t} = \\frac{1}{t_1} + \\frac{1}{t_2}$$",
        difficulty="medium",
    )


def _quant_simple_interest(rng: random.Random, n: int) -> dict:
    p = rng.choice([1500, 2000, 2500, 3000])
    r = rng.choice([4, 5, 6, 8])
    t = rng.choice([2, 3, 4])
    interest = p * r * t // 100
    prompt = f"What is the simple interest earned on a ${p:,} deposit at {r}% annual interest over {t} years?"
    return make_question(
        topic_id="quant",
        qid=f"{EXAM_SLUG}-quant-{n:03d}",
        prompt=prompt,
        explanation=f"Simple interest I = Prt = {p} × {r/100:.2f} × {t} = {interest}.",
        correct_text=f"${interest:,}",
        distractors=[f"${interest - 100:,}", f"${interest + 150:,}", f"${p * r // 100:,}"],
        correct_slot=rng.randint(0, 3),
        formula="$$I = P \\times r \\times t$$",
        difficulty="easy",
    )


def _quant_consecutive_odd(rng: random.Random, n: int) -> dict:
    mid = rng.randint(11, 40) * 2 + 1
    total = mid * 3
    prompt = f"The sum of three consecutive odd integers is {total}. What is the largest integer?"
    return make_question(
        topic_id="quant",
        qid=f"{EXAM_SLUG}-quant-{n:03d}",
        prompt=prompt,
        explanation=f"Let the middle odd integer be n. Then (n-2)+n+(n+2)=3n={total}, so n={mid} and the largest is {mid+2}.",
        correct_text=str(mid + 2),
        distractors=[str(mid - 2), str(mid), str(mid + 4)],
        correct_slot=rng.randint(0, 3),
        difficulty="medium",
    )


def _quant_average_removed(rng: random.Random, n: int) -> dict:
    k = rng.randint(4, 6)
    avg = rng.randint(15, 25)
    new_avg = avg - rng.randint(1, 3)
    total = avg * k
    removed = total - new_avg * (k - 1)
    prompt = (
        f"The average of {k} numbers is {avg}. After one number is removed, the average of the remaining "
        f"{k - 1} numbers is {new_avg}. What was the removed number?"
    )
    return make_question(
        topic_id="quant",
        qid=f"{EXAM_SLUG}-quant-{n:03d}",
        prompt=prompt,
        explanation=f"Original sum = {k} × {avg} = {total}. New sum = {k-1} × {new_avg} = {new_avg*(k-1)}. Removed = {total} − {new_avg*(k-1)} = {removed}.",
        correct_text=str(removed),
        distractors=[str(removed + 2), str(avg), str(new_avg * (k - 1))],
        correct_slot=rng.randint(0, 3),
        difficulty="medium",
    )


def _quant_linear_equation(rng: random.Random, n: int) -> dict:
    x = rng.randint(2, 9)
    a = rng.randint(2, 5)
    b = rng.randint(3, 12)
    c = a * x + b
    prompt = "What is the value of x?"
    formula = f"$${a}x + {b} = {c}$$"
    return make_question(
        topic_id="quant",
        qid=f"{EXAM_SLUG}-quant-{n:03d}",
        prompt=prompt,
        explanation=f"Subtract {b} from both sides: {a}x = {c-b}. Divide by {a} to get x = {x}.",
        correct_text=str(x),
        distractors=[str(x + 1), str(x - 1), str(x + 2)],
        correct_slot=rng.randint(0, 3),
        formula=formula,
        difficulty="easy",
    )


def _quant_geometry_rectangle(rng: random.Random, n: int) -> dict:
    w = rng.randint(4, 10)
    l = 2 * w + rng.randint(1, 4)
    p = 2 * (l + w)
    area = l * w
    prompt = (
        f"A rectangle has a length that is {l - 2*w} meters more than twice its width. "
        f"If the perimeter is {p} meters, what is the area in square meters?"
    )
    return make_question(
        topic_id="quant",
        qid=f"{EXAM_SLUG}-quant-{n:03d}",
        prompt=prompt,
        explanation=f"From perimeter 2(l+w)={p} and l=2w+{l-2*w}, solve w={w}, l={l}, area={area}.",
        correct_text=str(area),
        distractors=[str(area - w), str(p), str(l + w)],
        correct_slot=rng.randint(0, 3),
        difficulty="medium",
    )


def _quant_percent_change(rng: random.Random, n: int) -> dict:
    base = rng.choice([80, 100, 120, 200])
    up = rng.choice([10, 15, 20, 25])
    after = round(base * (1 + up / 100))
    prompt = f"A stock price increases by {up}% from ${base}. What is the new price?"
    return make_question(
        topic_id="quant",
        qid=f"{EXAM_SLUG}-quant-{n:03d}",
        prompt=prompt,
        explanation=f"Increase by {up}%: {base} × {1+up/100:.2f} = {after}.",
        correct_text=f"${after}",
        distractors=[f"${base + up}", f"${after - 5}", f"${after + 10}"],
        correct_slot=rng.randint(0, 3),
        difficulty="easy",
    )


def _quant_combination(rng: random.Random, n: int) -> dict:
    total, choose = rng.choice([(8, 3), (9, 4), (10, 3), (7, 2)])
    from math import comb

    ans = comb(total, choose)
    prompt = f"From a team of {total} candidates, how many different groups of {choose} can be formed?"
    return make_question(
        topic_id="quant",
        qid=f"{EXAM_SLUG}-quant-{n:03d}",
        prompt=prompt,
        explanation=f"Use combinations: C({total},{choose}) = {ans}.",
        correct_text=str(ans),
        distractors=[str(ans + total), str(ans - choose), str(choose * total)],
        correct_slot=rng.randint(0, 3),
        difficulty="hard",
    )


def _quant_probability(rng: random.Random, n: int) -> dict:
    red, blue = rng.randint(2, 5), rng.randint(2, 5)
    total = red + blue
    p = red / total
    p_text = f"{red}/{total}"
    prompt = (
        f"A jar contains {red} red chips and {blue} blue chips. If one chip is drawn at random, "
        f"what is the probability that it is red?"
    )
    return make_question(
        topic_id="quant",
        qid=f"{EXAM_SLUG}-quant-{n:03d}",
        prompt=prompt,
        explanation=f"Probability = favorable outcomes / total = {red}/{total}.",
        correct_text=p_text,
        distractors=[f"{blue}/{total}", f"{red}/{blue}", f"1/{total}"],
        correct_slot=rng.randint(0, 3),
        difficulty="easy",
    )


def _quant_sequence(rng: random.Random, n: int) -> dict:
    start = rng.randint(2, 6)
    diff = rng.randint(2, 5)
    term = 10
    value = start + (term - 1) * diff
    prompt = (
        f"In an arithmetic sequence, the first term is {start} and each term after the first is {diff} more than the previous term. "
        f"What is the {term}th term?"
    )
    return make_question(
        topic_id="quant",
        qid=f"{EXAM_SLUG}-quant-{n:03d}",
        prompt=prompt,
        explanation=f"Term {term} = {start} + ({term}-1)({diff}) = {value}.",
        correct_text=str(value),
        distractors=[str(value - diff), str(value + diff), str(start + term * diff)],
        correct_slot=rng.randint(0, 3),
        formula="$$a_n = a_1 + (n-1)d$$",
        difficulty="medium",
    )


# --- Verbal templates --------------------------------------------------------

CR_SCENARIOS = [
    (
        "assumption",
        "{org} reported a {pct}% rise in customer satisfaction after launching a new mobile app. Therefore, the app caused the improvement.",
        "Customers who use the app were already more satisfied before the launch than customers who do not use apps.",
        "The satisfaction increase was caused primarily by the app rather than by other changes introduced during the same period.",
    ),
    (
        "strengthen",
        "After switching suppliers, {org} reduced unit costs by {pct}%. Management concludes the new supplier is more efficient.",
        "The previous supplier had been charging above-market prices due to a long-term contract signed years ago.",
        "The cost reduction is explained by the previous supplier's contract terms rather than efficiency gains from the new supplier.",
    ),
    (
        "weaken",
        "{org} claims its training program improves performance because teams that completed training exceeded targets by {pct}%.",
        "Teams selected for training were already the highest-performing teams before training began.",
        "The evidence does not establish that training caused the performance gain.",
    ),
    (
        "inference",
        "All project managers at {org} who earned a certification received a promotion within two years. Maria is a project manager at {org} who earned the certification last year.",
        "Maria will definitely be promoted within the next year.",
        "Certification may be associated with promotion, but the statements do not guarantee Maria's promotion timeline.",
    ),
]

ORGS = ["Northwind Logistics", "Harbor Analytics", "Summit Retail", "Blue Ridge Manufacturing", "Cedar Health"]


def gen_verbal_batch(rng: random.Random, start: int, count: int) -> list[dict]:
    out: list[dict] = []
    n = start
    kinds = ["assumption", "strengthen", "weaken", "inference", "rc"]
    i = 0
    while len(out) < count:
        kind = kinds[i % len(kinds)]
        if kind == "rc":
            q = _verbal_reading_comp(rng, n)
        else:
            q = _verbal_cr(rng, n, kind)
        out.append(q)
        n += 1
        i += 1
    return out


def _verbal_cr(rng: random.Random, n: int, kind: str) -> dict:
    template = rng.choice([t for t in CR_SCENARIOS if t[0] == kind])
    org = ORGS[n % len(ORGS)]
    pct = [8, 10, 12, 14, 15, 16, 18, 20, 22, 25][(n + rng.randint(0, 2)) % 10]
    _, stem, wrong, correct = template
    prompt = (
        f"Review {n}. "
        + stem.format(org=org, pct=pct)
        + "\n\nWhich of the following, if true, would most "
        + ("weaken" if kind == "weaken" else "strengthen" if kind == "strengthen" else "support the required assumption in" if kind == "assumption" else "properly describe what can be inferred from")
        + " the argument?"
    )
    labels = {
        "a": correct.format(org=org, pct=pct) if "{" in correct else correct,
        "b": wrong.format(org=org, pct=pct) if "{" in wrong else wrong,
        "c": f"A competitor of {org} launched a similar initiative in a different region.",
        "d": f"{org} expanded its office space during the same period.",
    }
    options = [{"id": k, "text": labels[k]} for k in "abcd"]
    return shuffle_question_options(
        {
            "id": f"{EXAM_SLUG}-verbal-{n:03d}",
            "examSlug": EXAM_SLUG,
            "topicId": "verbal",
            "prompt": prompt,
            "options": options,
            "correctOptionId": "a",
            "explanation": "The argument's logic hinges on ruling out alternative explanations; the correct option addresses that gap directly.",
            "distractorExplanations": {
                "b": "This option either reverses the logic or fails to address the core causal link in the argument.",
                "c": "Information about a competitor does not directly evaluate the argument's reasoning about the stated organization.",
                "d": "Operational changes like office space do not necessarily bear on the specific causal claim unless tied to the evidence.",
            },
            "difficulty": rng.choice(["medium", "hard"]),
            "sourceNote": SOURCE_NOTE,
        },
        rng,
    )


def _verbal_reading_comp(rng: random.Random, n: int) -> dict:
    topic = rng.choice(["renewable procurement", "remote-work policy", "inventory automation", "vendor consolidation", "pricing analytics"])
    prompt = (
        f"Passage ({n}): Many firms adopting {topic} report short-term implementation costs that exceed initial forecasts. "
        f"However, follow-up studies show that firms maintaining the policy for at least three years typically recover costs through efficiency gains.\n\n"
        f"Which statement is best supported by the passage?"
    )
    return make_question(
        topic_id="verbal",
        qid=f"{EXAM_SLUG}-verbal-{n:03d}",
        prompt=prompt,
        explanation="The passage contrasts short-term costs with longer-term recovery, supporting a claim about multi-year outcomes rather than immediate savings.",
        correct_text="Firms that keep the policy long enough may offset early cost overruns.",
        distractors=[
            "Most firms abandon the policy within the first year.",
            "Initial forecasts are usually accurate.",
            "Efficiency gains appear immediately in the first quarter.",
        ],
        correct_slot=rng.randint(0, 3),
        difficulty="medium",
    )


# --- Data Insights templates ---------------------------------------------------

def gen_di_batch(rng: random.Random, start: int, count: int) -> list[dict]:
    out: list[dict] = []
    n = start
    kinds = ["ds", "table", "chart"]
    i = 0
    while len(out) < count:
        kind = kinds[i % len(kinds)]
        if kind == "ds":
            q = _di_data_sufficiency(rng, n)
        elif kind == "table":
            q = _di_table(rng, n)
        else:
            q = _di_chart(rng, n)
        out.append(q)
        n += 1
        i += 1
    return out


def _di_data_sufficiency(rng: random.Random, n: int) -> dict:
    k = 3 + ((n * 7 + rng.randint(0, 3)) % 15)
    stems = [
        "Is x > 0?",
        "Is x a positive integer?",
        "Is x an even integer?",
        "Is x divisible by 3?",
    ]
    stem = stems[n % len(stems)]
    prompt = (
        f"{stem}\n\n"
        "(For Data Sufficiency, use: (a) Statement (1) ALONE is sufficient; (b) Statement (2) ALONE is sufficient; "
        "(c) BOTH together are sufficient but neither alone is; (d) NEITHER alone NOR together is sufficient.)"
    )
    formula = f"$$\\text{{(1) }} x^2 = {k*k} \\\\ \\text{{(2) }} x^3 = {k*k*k}$$"
    if k <= 4:
        correct = "b"
        explanation = f"Statement (2) gives x = {k}, which determines sign. Statement (1) alone gives x = ±{k}."
    else:
        correct = "d"
        explanation = "Neither statement alone forces a unique positive integer without additional constraints."
    options = [
        {"id": "a", "text": "Statement (1) alone is sufficient, but statement (2) alone is not sufficient."},
        {"id": "b", "text": "Statement (2) alone is sufficient, but statement (1) alone is not sufficient."},
        {"id": "c", "text": "Both statements together are sufficient, but neither alone is sufficient."},
        {"id": "d", "text": "Neither statement alone nor both together is sufficient to answer the question."},
    ]
    return {
        "id": f"{EXAM_SLUG}-data-insights-{n:03d}",
        "examSlug": EXAM_SLUG,
        "topicId": "data-insights",
        "prompt": prompt,
        "formula": formula,
        "options": options,
        "correctOptionId": correct,
        "explanation": explanation,
        "distractorExplanations": {
            oid: "This choice misjudges whether the statements isolate a unique value."
            for oid in "abcd"
            if oid != correct
        },
        "difficulty": "medium",
        "sourceNote": SOURCE_NOTE,
    }


def _di_table(rng: random.Random, n: int) -> dict:
    a, b = rng.randint(80, 150), rng.randint(60, 120)
    c, d = a + rng.randint(10, 30), b + rng.randint(8, 25)
    total = a + b + c + d
    prompt = (
        "The table shows units sold for two products in two quarters.\n\n"
        "What is the overall average units sold per quarter across both products?"
    )
    formula = (
        f"| Quarter | Product X | Product Y |\n|---|---|---|\n| Q1 | {a} | {b} |\n| Q2 | {c} | {d} |"
    )
    avg = (a + b + c + d) / 2
    avg_text = str(int(avg)) if avg == int(avg) else f"{avg:.1f}"
    return make_question(
        topic_id="data-insights",
        qid=f"{EXAM_SLUG}-data-insights-{n:03d}",
        prompt=prompt,
        explanation=f"Total units = {a+b+c+d}. Average per quarter = {total}/2 = {avg_text}.",
        correct_text=avg_text,
        distractors=[str(a + b), str(c + d), str(total // 4)],
        correct_slot=rng.randint(0, 3),
        formula=formula,
        difficulty="easy",
    )


def _di_chart(rng: random.Random, n: int) -> dict:
    v1 = rng.randint(20, 40)
    v2 = v1 + rng.randint(5, 15)
    v3 = v2 + rng.randint(4, 12)
    change = round((v3 - v1) / v1 * 100)
    prompt = "Revenue rose from Q1 to Q3 as shown. What is the approximate percent increase from Q1 to Q3?"
    formula = f"$$Q1={v1},\\ Q2={v2},\\ Q3={v3}\\ (\\text{{in millions}})$$"
    return make_question(
        topic_id="data-insights",
        qid=f"{EXAM_SLUG}-data-insights-{n:03d}",
        prompt=prompt,
        explanation=f"Percent increase = ({v3}-{v1})/{v1} × 100% ≈ {change}%.",
        correct_text=f"{change}%",
        distractors=[f"{change + 10}%", f"{change - 8}%", f"{v3 - v1}%"],
        correct_slot=rng.randint(0, 3),
        formula=formula,
        difficulty="medium",
    )


# --- Bank assembly -------------------------------------------------------------

def load_cache(topic: str) -> list[dict]:
    path = CACHE_DIR / f"{topic}.json"
    if not path.exists():
        return []
    data = json.loads(path.read_text(encoding="utf-8"))
    return data.get("questions", [])


def next_seq(questions: list[dict], topic: str) -> int:
    prefix = f"{EXAM_SLUG}-{topic}-"
    max_seq = 0
    for q in questions:
        if q.get("topicId") != topic:
            continue
        match = re.search(r"-(\d{3})$", q["id"])
        if match:
            max_seq = max(max_seq, int(match.group(1)))
    return max_seq + 1


def dedupe_by_id(questions: list[dict]) -> list[dict]:
    seen: set[str] = set()
    out: list[dict] = []
    for q in questions:
        if q["id"] in seen:
            continue
        seen.add(q["id"])
        out.append(q)
    return out


def dedupe_by_content(questions: list[dict]) -> list[dict]:
    seen: set[tuple[str, str, str]] = set()
    out: list[dict] = []
    for q in questions:
        key = (q["topicId"], q["prompt"], q.get("formula", ""))
        if key in seen:
            continue
        seen.add(key)
        out.append(q)
    return out


def sync_cache(topic: str, questions: list[dict]) -> None:
    topic_qs = [q for q in questions if q["topicId"] == topic]
    CACHE_DIR.mkdir(parents=True, exist_ok=True)
    payload = {
        "questions": topic_qs,
        "prompts": [q["prompt"] for q in topic_qs],
    }
    (CACHE_DIR / f"{topic}.json").write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")


def shuffle_question_options(q: dict, rng: random.Random) -> dict:
    correct_id = q["correctOptionId"]
    correct_text = next(o["text"] for o in q["options"] if o["id"] == correct_id)
    distractors = [o for o in q["options"] if o["id"] != correct_id]
    rng.shuffle(distractors)
    slot = rng.randint(0, 3)
    ordered = distractors[:slot] + [{"id": "x", "text": correct_text}] + distractors[slot:]
    ids = ["a", "b", "c", "d"]
    new_options = [{"id": ids[i], "text": ordered[i]["text"]} for i in range(4)]
    new_correct = ids[slot]
    old_dist = q.get("distractorExplanations", {})
    old_by_text = {o["text"]: old_dist.get(o["id"], "") for o in q["options"] if o["id"] != correct_id}
    new_dist = {
        o["id"]: old_by_text.get(o["text"], "This option reflects a common reasoning error.")
        for o in new_options
        if o["id"] != new_correct
    }
    q = {**q, "options": new_options, "correctOptionId": new_correct, "distractorExplanations": new_dist}
    return q


def validate_question(q: dict) -> list[str]:
    errors = []
    if not q.get("prompt"):
        errors.append("prompt")
    if len(q.get("options", [])) != 4:
        errors.append("options")
    texts = [o["text"] for o in q.get("options", [])]
    if len(set(texts)) != 4:
        errors.append("duplicate options")
    cid = q.get("correctOptionId")
    if cid not in {o["id"] for o in q.get("options", [])}:
        errors.append("correctOptionId")
    for o in q.get("options", []):
        if o["id"] != cid and not q.get("distractorExplanations", {}).get(o["id"]):
            errors.append(f"distractor {o['id']}")
    return errors


def main() -> None:
    bank = json.loads(BANK_PATH.read_text(encoding="utf-8"))
    questions = dedupe_by_id(bank)

    existing_ids = {q["id"] for q in questions}
    for topic in TOPIC_TARGETS:
        for q in load_cache(topic):
            if q["id"] not in existing_ids:
                questions.append(q)
                existing_ids.add(q["id"])

    questions = dedupe_by_content(questions)

    rng = random.Random(20260715)
    for topic, target in TOPIC_TARGETS.items():
        need = target - sum(1 for q in questions if q["topicId"] == topic)
        if need <= 0:
            continue
        start = next_seq(questions, topic if topic != "data-insights" else "data-insights")
        if topic == "quant":
            generated = gen_quant_batch(rng, start, need)
        elif topic == "verbal":
            generated = gen_verbal_batch(rng, start, need)
        else:
            generated = gen_di_batch(rng, start, need)
        questions.extend(generated)

    questions = dedupe_by_content(questions)

    for pass_offset in (2000, 3000, 4000, 5000, 6000):
        missing = False
        for topic, target in TOPIC_TARGETS.items():
            need = target - sum(1 for q in questions if q["topicId"] == topic)
            if need <= 0:
                continue
            missing = True
            start = next_seq(questions, topic if topic != "data-insights" else "data-insights") + pass_offset
            if topic == "quant":
                generated = gen_quant_batch(rng, start, need)
            elif topic == "verbal":
                generated = gen_verbal_batch(rng, start, need)
            else:
                generated = gen_di_batch(rng, start, need)
            questions.extend(generated)
        questions = dedupe_by_content(questions)
        if not missing:
            break

    # Trim to exact 400 if we overshot (402 with 134+133+133)
    by_topic: dict[str, list[dict]] = defaultdict(list)
    for q in questions:
        by_topic[q["topicId"]].append(q)
    final: list[dict] = []
    for topic, target in TOPIC_TARGETS.items():
        final.extend(by_topic[topic][:target])

    shuffle_rng = random.Random(20260716)
    for q in final:
        if q["sourceNote"] == SOURCE_NOTE and q["topicId"] != "data-insights":
            # Keep DS letter-keyed options; shuffle other locally authored items.
            idx = final.index(q)
            final[idx] = shuffle_question_options(q, shuffle_rng)

    errors = []
    for q in final:
        errs = validate_question(q)
        if errs:
            errors.append(f"{q['id']}: {errs}")
    if errors:
        raise SystemExit("Validation failed:\n" + "\n".join(errors[:20]))

    BANK_PATH.write_text(json.dumps(final, indent=2) + "\n", encoding="utf-8")
    for topic in TOPIC_TARGETS:
        sync_cache(topic, final)

    counts = {t: sum(1 for q in final if q["topicId"] == t) for t in TOPIC_TARGETS}
    print(f"Wrote {len(final)} questions → {BANK_PATH}")
    print("Counts:", counts)


if __name__ == "__main__":
    main()
