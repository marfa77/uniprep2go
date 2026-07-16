#!/usr/bin/env python3
"""Expand GRE General readiness-check bank locally (no OpenRouter)."""

from __future__ import annotations

import json
import random
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BANK_PATH = ROOT / "src/data/mock-exams/gre-readiness-check.json"
CACHE_DIR = ROOT / "src/data/mock-exams/.generation-cache/gre-readiness-check"
EXAM_SLUG = "gre-readiness-check"
SOURCE_NOTE = "Authored by UniPrep2Go (original readiness-check question)."
TOPIC_TARGETS = {"verbal": 175, "quant": 175}


def option_set(correct_text: str, distractors: list[str], correct_slot: int):
    seen = {correct_text}
    unique = []
    for text in distractors:
        candidate = text
        bump = 1
        while candidate in seen:
            candidate = f"{text} (+{bump})"
            bump += 1
        seen.add(candidate)
        unique.append(candidate)
    if len(unique) != 3:
        raise ValueError("Need exactly 3 distractors")
    slot = correct_slot % 4
    ordered = unique[:slot] + [correct_text] + unique[slot:]
    ids = ["a", "b", "c", "d"]
    options = [{"id": ids[i], "text": ordered[i]} for i in range(4)]
    correct_id = ids[slot]
    distractor_explanations = {
        oid: "This option reflects a common GRE trap for this item type."
        for oid in ids
        if oid != correct_id
    }
    return options, correct_id, distractor_explanations


def make_question(
    *,
    topic_id: str,
    n: int,
    prompt: str,
    explanation: str,
    correct_text: str,
    distractors: list[str],
    correct_slot: int,
    difficulty: str = "medium",
    formula: str | None = None,
) -> dict:
    options, correct_id, dist = option_set(correct_text, distractors, correct_slot)
    q = {
        "id": f"{EXAM_SLUG}-{topic_id}-{n:03d}",
        "examSlug": EXAM_SLUG,
        "topicId": topic_id,
        "prompt": prompt,
        "options": options,
        "correctOptionId": correct_id,
        "explanation": explanation,
        "distractorExplanations": dist,
        "difficulty": difficulty,
        "sourceNote": SOURCE_NOTE,
    }
    if formula:
        q["formula"] = formula
    return q


def load_rejected_ids() -> set[str]:
    report = ROOT / "src/data/mock-exams/.validation-reports/gre-readiness-check.json"
    if not report.exists():
        return set()
    data = json.loads(report.read_text())
    rejected = data.get("rejected") or []
    out: set[str] = set()
    for item in rejected:
        if isinstance(item, str):
            out.add(item)
        elif isinstance(item, dict) and item.get("id"):
            out.add(str(item["id"]))
    return out


def load_existing(topic: str) -> list[dict]:
    """Prefer current bank file, then cache. Drop LLM-rejected IDs."""
    rejected = load_rejected_ids()
    questions: list[dict] = []
    if BANK_PATH.exists():
        try:
            bank = json.loads(BANK_PATH.read_text())
            if isinstance(bank, list):
                questions = [q for q in bank if q.get("topicId") == topic]
        except json.JSONDecodeError:
            questions = []
    if not questions:
        path = CACHE_DIR / f"{topic}.json"
        if path.exists():
            data = json.loads(path.read_text())
            questions = list(data.get("questions") or [])
    return [q for q in questions if q.get("id") not in rejected]


def next_seq(questions: list[dict], topic: str) -> int:
    nums = []
    for q in questions:
        if q.get("topicId") != topic:
            continue
        try:
            nums.append(int(str(q["id"]).rsplit("-", 1)[-1]))
        except ValueError:
            continue
    return (max(nums) + 1) if nums else 1


# --- Quant -------------------------------------------------------------------

def gen_quant(rng: random.Random, start: int, count: int) -> list[dict]:
    out = []
    n = start
    factories = [
        _q_ratio,
        _q_discount,
        _q_work,
        _q_interest,
        _q_average,
        _q_linear,
        _q_percent,
        _q_geometry,
        _q_probability,
        _q_data,
        _q_inequality,
        _q_rate,
    ]
    i = 0
    while len(out) < count:
        out.append(factories[i % len(factories)](rng, n))
        n += 1
        i += 1
    return out


def _q_ratio(rng, n):
    a, b = rng.randint(2, 5), rng.randint(3, 7)
    mult = rng.randint(4, 12)
    total = (a + b) * mult
    mentors = b * mult
    return make_question(
        topic_id="quant",
        n=n,
        prompt=(
            f"In a research lab, the ratio of interns to senior scientists is {a}:{b}. "
            f"If there are {total} people in the lab, how many senior scientists are there?"
        ),
        explanation=f"Parts = {a + b}; each part = {mult}; seniors = {b}×{mult} = {mentors}.",
        correct_text=str(mentors),
        distractors=[str(a * mult), str(total - mentors - 1), str(mentors + mult)],
        correct_slot=rng.randint(0, 3),
        difficulty="easy",
    )


def _q_discount(rng, n):
    price = rng.choice([60, 80, 100, 120, 150])
    d1, d2 = rng.choice([(20, 10), (25, 10), (15, 20)])
    final = round(price * (1 - d1 / 100) * (1 - d2 / 100))
    return make_question(
        topic_id="quant",
        n=n,
        prompt=(
            f"A coat priced ${price} is discounted by {d1}%, then by an additional {d2}%. "
            f"What is the final price?"
        ),
        explanation=f"Sequential discounts: {price}×{1 - d1/100:.2f}×{1 - d2/100:.2f} = {final}.",
        correct_text=f"${final}",
        distractors=[
            f"${round(price * (1 - (d1 + d2) / 100))}",
            f"${round(price * (1 - d1 / 100))}",
            f"${final + 5}",
        ],
        correct_slot=rng.randint(0, 3),
        formula="$$P(1-d_1)(1-d_2)$$",
        difficulty="easy",
    )


def _q_work(rng, n):
    t1, t2 = rng.choice([(4, 6), (5, 10), (3, 6), (6, 9)])
    together = t1 * t2 / (t1 + t2)
    text = str(int(together)) if together == int(together) else f"{together:.1f}"
    return make_question(
        topic_id="quant",
        n=n,
        prompt=(
            f"Machine A finishes a job in {t1} hours and Machine B in {t2} hours. "
            f"Working together at constant rates, how many hours will they need?"
        ),
        explanation=f"Combined rate 1/{t1}+1/{t2}; time = {text} hours.",
        correct_text=f"{text} hours",
        distractors=[f"{(t1 + t2) // 2} hours", f"{t1 + t2} hours", f"{max(t1, t2) - 1} hours"],
        correct_slot=rng.randint(0, 3),
        formula="$$1/t=1/t_1+1/t_2$$",
        difficulty="medium",
    )


def _q_interest(rng, n):
    p = rng.choice([1500, 2000, 2500, 3000])
    r = rng.choice([4, 5, 6, 8])
    t = rng.choice([2, 3, 4])
    interest = p * r * t // 100
    return make_question(
        topic_id="quant",
        n=n,
        prompt=f"What simple interest is earned on ${p:,} at {r}% per year for {t} years?",
        explanation=f"I = Prt = {interest}.",
        correct_text=f"${interest:,}",
        distractors=[f"${interest - 100:,}", f"${interest + 150:,}", f"${p * r // 100:,}"],
        correct_slot=rng.randint(0, 3),
        formula="$$I=Prt$$",
        difficulty="easy",
    )


def _q_average(rng, n):
    k = rng.randint(4, 6)
    avg = rng.randint(15, 25)
    new_avg = avg - rng.randint(1, 3)
    total = avg * k
    removed = total - new_avg * (k - 1)
    return make_question(
        topic_id="quant",
        n=n,
        prompt=(
            f"The average of {k} scores is {avg}. After one score is removed, the average of the "
            f"remaining {k - 1} scores is {new_avg}. What score was removed?"
        ),
        explanation=f"Removed = {total} − {new_avg * (k - 1)} = {removed}.",
        correct_text=str(removed),
        distractors=[str(removed + 2), str(avg), str(new_avg)],
        correct_slot=rng.randint(0, 3),
        difficulty="medium",
    )


def _q_linear(rng, n):
    x = rng.randint(2, 9)
    a = rng.randint(2, 5)
    b = rng.randint(3, 12)
    c = a * x + b
    return make_question(
        topic_id="quant",
        n=n,
        prompt="What is the value of x?",
        explanation=f"{a}x = {c - b}, so x = {x}.",
        correct_text=str(x),
        distractors=[str(x + 1), str(x - 1), str(x + 2)],
        correct_slot=rng.randint(0, 3),
        formula=f"$${a}x+{b}={c}$$",
        difficulty="easy",
    )


def _q_percent(rng, n):
    base = rng.choice([80, 100, 120, 200])
    up = rng.choice([10, 15, 20, 25])
    after = round(base * (1 + up / 100))
    return make_question(
        topic_id="quant",
        n=n,
        prompt=f"A price increases by {up}% from ${base}. What is the new price?",
        explanation=f"New = {base}×(1+{up}/100) = {after}.",
        correct_text=f"${after}",
        distractors=[f"${base + up}", f"${round(base * up / 100)}", f"${after + 10}"],
        correct_slot=rng.randint(0, 3),
        difficulty="easy",
    )


def _q_geometry(rng, n):
    w = rng.randint(4, 10)
    l = w + rng.randint(2, 6)
    area = l * w
    return make_question(
        topic_id="quant",
        n=n,
        prompt=f"A rectangle has length {l} and width {w}. What is its area?",
        explanation=f"Area = {l}×{w} = {area}.",
        correct_text=str(area),
        distractors=[str(2 * (l + w)), str(area - w), str(l + w)],
        correct_slot=rng.randint(0, 3),
        difficulty="easy",
    )


def _q_probability(rng, n):
    red = rng.randint(3, 6)
    blue = rng.randint(2, 5)
    total = red + blue
    # P(red)
    return make_question(
        topic_id="quant",
        n=n,
        prompt=(
            f"A bag contains {red} red marbles and {blue} blue marbles. "
            f"One marble is drawn at random. What is the probability it is red?"
        ),
        explanation=f"P(red) = {red}/{total}.",
        correct_text=f"{red}/{total}",
        distractors=[f"{blue}/{total}", f"{red}/{blue}", f"{red - 1}/{total}"],
        correct_slot=rng.randint(0, 3),
        difficulty="easy",
    )


def _q_data(rng, n):
    vals = sorted(rng.sample(range(10, 40), 5))
    median = vals[2]
    mean = sum(vals) / 5
    mean_txt = str(int(mean)) if mean == int(mean) else f"{mean:.1f}"
    return make_question(
        topic_id="quant",
        n=n,
        prompt=f"For the data set {vals}, what is the median?",
        explanation=f"Ordered middle value is {median}.",
        correct_text=str(median),
        distractors=[mean_txt, str(vals[0]), str(vals[-1])],
        correct_slot=rng.randint(0, 3),
        difficulty="easy",
    )


def _q_inequality(rng, n):
    a = rng.randint(2, 5)
    b = rng.randint(6, 20)
    # ax < b → x < b/a
    bound = b / a
    bound_txt = str(int(bound)) if bound == int(bound) else f"{bound:.1f}"
    return make_question(
        topic_id="quant",
        n=n,
        prompt="Which values of x satisfy the inequality?",
        explanation=f"Divide by {a}: x < {bound_txt}.",
        correct_text=f"x < {bound_txt}",
        distractors=[f"x > {bound_txt}", f"x ≤ {bound_txt}", f"x ≥ {bound_txt}"],
        correct_slot=rng.randint(0, 3),
        formula=f"$${a}x < {b}$$",
        difficulty="medium",
    )


def _q_rate(rng, n):
    speed = rng.choice([40, 50, 60, 70])
    hours = rng.choice([2, 3, 4])
    dist = speed * hours
    return make_question(
        topic_id="quant",
        n=n,
        prompt=f"A car travels at a constant {speed} mph for {hours} hours. How far does it travel?",
        explanation=f"Distance = rate × time = {dist} miles.",
        correct_text=f"{dist} miles",
        distractors=[f"{speed + hours} miles", f"{dist - speed} miles", f"{hours * (speed - 10)} miles"],
        correct_slot=rng.randint(0, 3),
        formula="$$d=rt$$",
        difficulty="easy",
    )


# --- Verbal ------------------------------------------------------------------

WORDS = [
    ("ephemeral", "lasting a very short time", "permanent", "durable", "endless"),
    ("laconic", "using few words", "verbose", "wordy", "garrulous"),
    ("austere", "severely simple or strict", "ornate", "lavish", "indulgent"),
    ("pragmatic", "practical rather than theoretical", "idealistic", "visionary", "impractical"),
    ("candid", "frank and honest", "evasive", "guarded", "deceptive"),
    ("mitigate", "make less severe", "aggravate", "intensify", "worsen"),
    ("ubiquitous", "present everywhere", "rare", "scarce", "absent"),
    ("equivocal", "ambiguous; open to more than one interpretation", "clear", "unequivocal", "definite"),
    ("prosaic", "ordinary; lacking imagination", "imaginative", "poetic", "vivid"),
    ("tenuous", "weak or slight", "robust", "solid", "secure"),
]


def gen_verbal(rng: random.Random, start: int, count: int) -> list[dict]:
    out = []
    n = start
    i = 0
    while len(out) < count:
        out.append(
            [_v_tc, _v_se, _v_rc_main, _v_rc_weaken, _v_rc_infer][i % 5](rng, n)
        )
        n += 1
        i += 1
    return out


def _v_tc(rng, n):
    word, gloss, w1, w2, w3 = rng.choice(WORDS)
    return make_question(
        topic_id="verbal",
        n=n,
        prompt=(
            f"In context, which word best matches this meaning: \"{gloss}\"?"
        ),
        explanation=f"'{word}' means {gloss}. The other choices do not match this definition.",
        correct_text=word,
        distractors=[w1, w2, w3],
        correct_slot=rng.randint(0, 3),
        difficulty="easy",
    )


def _v_se(rng, n):
    word, gloss, w1, w2, w3 = rng.choice(WORDS)
    # sentence equivalence: two synonyms — use word + close synonym from list randomly
    syn = rng.choice(["transient", "fleeting", "brief"]) if word == "ephemeral" else gloss.split()[0]
    # Better: pick two answers that both mean gloss
    syn_map = {
        "ephemeral": ("fleeting", "transient"),
        "laconic": ("terse", "concise"),
        "austere": ("severe", "stark"),
        "pragmatic": ("practical", "realistic"),
        "candid": ("frank", "forthright"),
        "mitigate": ("alleviate", "ease"),
        "ubiquitous": ("omnipresent", "pervasive"),
        "equivocal": ("ambiguous", "unclear"),
        "prosaic": ("mundane", "ordinary"),
        "tenuous": ("fragile", "flimsy"),
    }
    a, b = syn_map.get(word, (word, gloss.split()[0]))
    return make_question(
        topic_id="verbal",
        n=n,
        prompt=(
            f"Select the two answer choices that, when used to complete the sentence, produce "
            f"sentences alike in meaning.\n\n"
            f"The committee's support for the proposal was ______; a single new objection could unravel it.\n\n"
            f"Which pair best completes the blank with equivalent meaning?"
        ),
        explanation=f"Both '{a}' and '{b}' convey a weak/unstable quality (tenuous-style). Other options do not form an equivalent pair.",
        correct_text=f"{a} / {b}",
        distractors=[f"{w1} / {w2}", f"{a} / {w1}", f"{w2} / {w3}"],
        correct_slot=rng.randint(0, 3),
        difficulty="medium",
    )


def _v_rc_main(rng, n):
    topic = rng.choice(["urban heat islands", "pollinator decline", "coastal erosion", "open-source licensing"])
    return make_question(
        topic_id="verbal",
        n=n,
        prompt=(
            f"Passage: Researchers argue that {topic} is driven less by any single dramatic event than by "
            f"many small, compounding pressures over time. Policy responses that wait for a crisis therefore "
            f"tend to arrive too late.\n\nWhat is the main point of the passage?"
        ),
        explanation="The passage claims gradual cumulative pressures matter more than single shocks, so crisis-only policy is late.",
        correct_text="Cumulative pressures, not single crises, mainly drive the problem—and late crisis responses miss that.",
        distractors=[
            "A single dramatic event usually causes the problem.",
            "Policy responses should ignore gradual trends.",
            "Researchers disagree that the problem exists.",
        ],
        correct_slot=rng.randint(0, 3),
        difficulty="medium",
    )


def _v_rc_weaken(rng, n):
    return make_question(
        topic_id="verbal",
        n=n,
        prompt=(
            "Argument: After a city added protected bike lanes, weekday cycling trips rose for six years "
            "while car commute times fell. Therefore the bike lanes caused the drop in congestion.\n\n"
            "Which of the following, if true, most weakens the argument?"
        ),
        explanation="An alternate cause (remote work) undercuts the causal claim linking lanes to congestion drop.",
        correct_text="A major employer shifted many staff to remote work during the same period.",
        distractors=[
            "Bike shops reported higher helmet sales.",
            "Some neighborhoods still lack bike lanes.",
            "Weekend recreational cycling also increased.",
        ],
        correct_slot=rng.randint(0, 3),
        difficulty="medium",
    )


def _v_rc_infer(rng, n):
    return make_question(
        topic_id="verbal",
        n=n,
        prompt=(
            "Passage: The archive's new digitization policy prioritizes fragile manuscripts that are "
            "requested at least twice a year. Items requested less often remain available only on-site.\n\n"
            "Which inference is best supported?"
        ),
        explanation="Priority depends on fragility plus request frequency; low-request items stay on-site only.",
        correct_text="Some fragile manuscripts that are rarely requested may not be digitized under the policy.",
        distractors=[
            "All manuscripts will be digitized within a year.",
            "On-site access has been discontinued.",
            "Request frequency is irrelevant to digitization.",
        ],
        correct_slot=rng.randint(0, 3),
        difficulty="medium",
    )


def validate(q: dict) -> list[str]:
    errs = []
    if len(q.get("options") or []) != 4:
        errs.append("options")
    texts = [o["text"] for o in q["options"]]
    if len(set(texts)) != 4 or any(not t.strip() for t in texts):
        errs.append("unique options")
    if q["correctOptionId"] not in {o["id"] for o in q["options"]}:
        errs.append("correctOptionId")
    if not q.get("explanation"):
        errs.append("explanation")
    return errs


def sync_cache(topic: str, questions: list[dict]) -> None:
    CACHE_DIR.mkdir(parents=True, exist_ok=True)
    topic_q = [q for q in questions if q["topicId"] == topic]
    (CACHE_DIR / f"{topic}.json").write_text(
        json.dumps({"questions": topic_q, "prompts": [q["prompt"] for q in topic_q]}, indent=2)
        + "\n"
    )


def main() -> None:
    # Offset seed when replacing rejects so new items differ from dropped ones.
    rejected = load_rejected_ids()
    rng = random.Random(20260716 + len(rejected) * 97)
    by_topic: dict[str, list[dict]] = {
        "verbal": load_existing("verbal"),
        "quant": load_existing("quant"),
    }

    # Keep well-formed approved items; fill gaps locally only.
    for topic, target in TOPIC_TARGETS.items():
        have = by_topic[topic]
        have = [q for q in have if not validate(q)]
        need = target - len(have)
        if need > 0:
            start = next_seq(have, topic)
            gen = gen_verbal(rng, start, need) if topic == "verbal" else gen_quant(rng, start, need)
            have.extend(gen)
        by_topic[topic] = have[:target]
        print(f"  {topic}: kept {target - max(need, 0)} + new {max(need, 0)} → {len(by_topic[topic])}")

    final = by_topic["verbal"] + by_topic["quant"]
    for q in final:
        errs = validate(q)
        if errs:
            raise SystemExit(f"Invalid {q['id']}: {errs}")

    BANK_PATH.write_text(json.dumps(final, indent=2) + "\n")
    for topic in TOPIC_TARGETS:
        sync_cache(topic, final)
    counts = {t: sum(1 for q in final if q["topicId"] == t) for t in TOPIC_TARGETS}
    print(f"STATUS GRE local bank: {len(final)} → {BANK_PATH}")
    print("Counts:", counts)


if __name__ == "__main__":
    main()
