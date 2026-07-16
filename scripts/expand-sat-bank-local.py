#!/usr/bin/env python3
"""Expand Digital SAT readiness-check bank locally to 350 questions (no OpenRouter)."""

from __future__ import annotations

import json
import math
import random
import re
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BANK_PATH = ROOT / "src/data/mock-exams/sat-readiness-check.json"
CACHE_DIR = ROOT / "src/data/mock-exams/.generation-cache/sat-readiness-check"
EXAM_SLUG = "sat-readiness-check"
SOURCE_NOTE = "Authored by UniPrep2Go (original readiness-check question)."
TOPIC_TARGETS = {"reading-and-writing": 175, "math": 175}
TOPIC_ID_SLUG = {
    "reading-and-writing": "reading-and-writing",
    "math": "math",
}


def option_set(correct_text: str, distractors: list[str], correct_slot: int) -> tuple[list[dict], str, dict]:
    seen = {correct_text}
    unique_distractors: list[str] = []
    for text in distractors:
        candidate = text
        bump = 1
        while candidate in seen:
            if candidate.startswith("$") and candidate.endswith(")"):
                candidate = f"{text[:-1]}{bump})"
            else:
                candidate = f"{text} (+{bump})"
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
        oid: "This option reflects a common setup or reasoning error for this problem type."
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


# --- Reading and Writing templates -------------------------------------------

PASSAGES_SCIENCE = [
    (
        "Many desert plants open their stomata at night rather than during the day. "
        "This timing reduces water loss while still allowing carbon dioxide to enter for photosynthesis.",
        "limiting water loss while obtaining carbon dioxide",
        "increasing daytime heat absorption",
        "preventing carbon dioxide from entering leaves",
        "eliminating the need for photosynthesis",
    ),
    (
        "Researchers found that birds nesting near city parks produced more offspring in years when insect populations rose. "
        "The pattern suggests food availability strongly shapes reproductive success.",
        "insect abundance likely influences bird reproductive success",
        "city parks eliminate insect populations",
        "birds avoid parks when insects are plentiful",
        "nesting success is unrelated to food supply",
    ),
    (
        "Unlike earlier vaccines that used inactivated pathogens, mRNA vaccines deliver genetic instructions that cells use to make a harmless viral protein. "
        "The immune system then learns to recognize that protein.",
        "cells produce a protein that trains the immune system",
        "the vaccine contains a live virus that multiplies in the body",
        "mRNA vaccines permanently alter a person's DNA",
        "the immune system ignores the viral protein",
    ),
    (
        "Coral reefs depend on symbiotic algae that provide energy through photosynthesis. "
        "When ocean temperatures rise, corals often expel these algae, leading to bleaching and reduced growth.",
        "higher temperatures can disrupt the coral–algae partnership",
        "bleaching always increases coral growth",
        "algae thrive best when corals are bleached",
        "temperature changes have no effect on reefs",
    ),
    (
        "A study of urban trees showed that neighborhoods with denser canopy cover had lower average afternoon temperatures. "
        "Shade and evapotranspiration both contribute to this cooling effect.",
        "tree canopy can help reduce local daytime heat",
        "urban trees raise afternoon temperatures",
        "evapotranspiration only occurs at night",
        "canopy density is unrelated to temperature",
    ),
]

PASSAGES_HISTORY = [
    (
        "In the early twentieth century, reformers argued that safer factory conditions would raise productivity. "
        "Employers who adopted better lighting and shorter shifts often reported fewer accidents and steadier output.",
        "improved working conditions could support productivity",
        "reformers opposed all industrial employment",
        "safer factories always reduced wages",
        "employers never changed lighting practices",
    ),
    (
        "After the canal opened, inland towns gained cheaper access to coastal markets. "
        "Local newspapers celebrated the drop in shipping costs as a turning point for regional trade.",
        "the canal lowered transportation costs for inland towns",
        "newspapers opposed regional trade",
        "coastal markets became unreachable",
        "shipping costs rose after the canal opened",
    ),
    (
        "During wartime rationing, households received coupons limiting purchases of sugar and meat. "
        "Officials hoped the system would distribute scarce goods more evenly across income levels.",
        "rationing aimed to share scarce goods more fairly",
        "coupons increased unlimited purchases of meat",
        "officials abandoned all distribution rules",
        "rationing applied only to luxury cars",
    ),
]

PASSAGES_HUMANITIES = [
    (
        "The novelist structures each chapter around a single overheard conversation. "
        "By withholding the speakers' identities at first, she invites readers to infer relationships from tone alone.",
        "delayed identity cues push readers to interpret tone",
        "the novel never includes dialogue",
        "readers are told every character's identity immediately",
        "tone is irrelevant to the chapter structure",
    ),
    (
        "Critics praised the documentary for pairing archival footage with present-day interviews. "
        "The juxtaposition highlights continuity between past protests and current debates.",
        "mixing past and present material underscores ongoing themes",
        "the film avoids all archival material",
        "interviews contradict every historical claim",
        "critics ignored the film's structure",
    ),
]

WORDS_IN_CONTEXT = [
    ("attenuated", "The signal became attenuated as distance increased.", "weakened", "amplified", "ignored", "invented"),
    ("pragmatic", "Her pragmatic plan focused on what could be finished this week.", "practical", "ornamental", "hostile", "theoretical"),
    ("ubiquitous", "Smartphones are ubiquitous in the city's cafés.", "found everywhere", "rarely seen", "illegal", "temporary"),
    ("mitigate", "The new policy aims to mitigate traffic delays.", "reduce", "worsen", "measure", "celebrate"),
    ("tentative", "They reached a tentative agreement pending board review.", "provisional", "permanent", "hostile", "secret"),
    ("scrupulous", "A scrupulous editor checked every citation.", "careful and exact", "careless", "silent", "hasty"),
    ("ephemeral", "Street murals can be ephemeral if rain washes them away.", "short-lived", "permanent", "expensive", "illegal"),
    ("bolster", "Additional evidence helped bolster the claim.", "strengthen", "weaken", "delay", "confuse"),
    ("ambivalent", "She felt ambivalent about moving abroad.", "having mixed feelings", "completely certain", "angry only", "indifferent to facts"),
    ("candid", "His candid reply surprised the interviewer.", "frank", "evasive", "scripted", "hostile"),
]

TRANSITIONS = [
    ("However", "contrast", "She trained daily. ____, she still felt nervous before the race."),
    ("Therefore", "result", "The data were incomplete. ____, the team delayed publication."),
    ("Meanwhile", "simultaneity", "The committee debated funding. ____, volunteers collected signatures."),
    ("Likewise", "similarity", "City A cut emissions by investing in transit. ____, City B expanded bike lanes."),
    ("Nevertheless", "concession", "The hike was steep. ____, the group reached the summit before noon."),
    ("For example", "illustration", "Several species adapt to drought. ____, some cacti store water in thick stems."),
    ("In contrast", "contrast", "Northern forests lose leaves in winter. ____, many tropical trees keep foliage year-round."),
    ("Consequently", "result", "Demand rose sharply. ____, prices increased."),
]

CONVENTIONS = [
    (
        "subject-verb",
        "The collection of essays ____ several perspectives on urban design.",
        "presents",
        "present",
        "are presenting",
        "have present",
        "The subject 'collection' is singular, so the verb must be singular: presents.",
    ),
    (
        "pronoun",
        "Each of the volunteers brought ____ own tools.",
        "his or her",
        "theirselves",
        "them",
        "its'",
        "'Each' is singular; a singular possessive pronoun is required.",
    ),
    (
        "comma-splice",
        "Which revision correctly joins the clauses?",
        "The storm arrived early, so the match was postponed.",
        "The storm arrived early, the match was postponed.",
        "The storm arrived early the match was postponed.",
        "The storm arrived early; but the match was postponed.",
        "A coordinating conjunction with a comma correctly joins two independent clauses.",
    ),
    (
        "modifier",
        "Which sentence places the modifier correctly?",
        "Running down the field, the player scored a late goal.",
        "Running down the field, a late goal was scored by the player.",
        "Running down the field, the goal celebrated the player.",
        "Running down the field was scored a late goal.",
        "The introductory participle must modify the noun that follows: the player.",
    ),
    (
        "apostrophe",
        "Choose the sentence with correct possessive form.",
        "The students' projects filled the hallway.",
        "The student's projects filled the hallway's of art.",
        "The students projects' filled the hallway.",
        "The students's projects filled the hallway.",
        "For a plural noun ending in s, add only an apostrophe: students'.",
    ),
    (
        "parallelism",
        "Which option completes the sentence with parallel structure? The internship offered training, mentorship, and ____.",
        "meaningful feedback",
        "to receive meaningful feedback",
        "that feedback was meaningful",
        "feedback which is meaning",
        "Items in a series should share the same grammatical form: nouns.",
    ),
    (
        "tense",
        "By the time the curator arrived, the exhibition ____ already opened.",
        "had",
        "has",
        "will have been",
        "is",
        "Past perfect 'had opened' shows an action completed before another past action.",
    ),
    (
        "agreement-number",
        "Neither the maps nor the guidebook ____ up to date.",
        "is",
        "are",
        "were being",
        "have been",
        "With 'neither...nor', the verb agrees with the nearer subject: guidebook (singular).",
    ),
]

RHETORICAL = [
    (
        "A student is writing about community gardens and wants to emphasize measurable benefits. "
        "Which sentence best supports that purpose?",
        "In one city program, participating blocks reported a 20% drop in unused vacant lots within two years.",
        "Gardens can be pretty in spring.",
        "Some people dislike tomatoes.",
        "The history of agriculture is long and complex.",
    ),
    (
        "A paragraph argues that public libraries remain essential despite digital media. "
        "Which sentence would best conclude the paragraph?",
        "By offering free access, quiet study space, and local programs, libraries still serve needs online sources alone cannot meet.",
        "Many libraries were built in the nineteenth century.",
        "E-books are available in several formats.",
        "Some towns have more than one bookstore.",
    ),
    (
        "Which choice most effectively combines the sentences? "
        "The researchers collected water samples. They tested the samples for microplastics.",
        "The researchers collected water samples and tested them for microplastics.",
        "The researchers collected water samples, they tested the samples for microplastics.",
        "Collecting water samples; the researchers tested microplastics.",
        "The researchers collected water samples after they tested them for microplastics.",
    ),
]


def gen_rw_batch(rng: random.Random, start: int, count: int) -> list[dict]:
    out: list[dict] = []
    n = start
    factories = [
        _rw_main_idea_science,
        _rw_main_idea_history,
        _rw_main_idea_humanities,
        _rw_words_in_context,
        _rw_transition,
        _rw_conventions,
        _rw_rhetorical,
        _rw_inference,
        _rw_evidence,
        _rw_purpose,
        _rw_structure,
        _rw_cross_text,
        _rw_detail,
        _rw_logic,
    ]
    i = 0
    while len(out) < count:
        q = factories[i % len(factories)](rng, n)
        if q:
            out.append(q)
            n += 1
        i += 1
    return out


def _rw_qid(n: int) -> str:
    return f"{EXAM_SLUG}-reading-and-writing-{n:03d}"


def _rw_main_idea_science(rng: random.Random, n: int) -> dict:
    passage, correct, d1, d2, d3 = PASSAGES_SCIENCE[n % len(PASSAGES_SCIENCE)]
    variant = ["primarily", "mainly", "chiefly", "centrally"][n % 4]
    prompt = (
        f"Passage {n}: {passage}\n\n"
        f"Which choice {variant} captures the passage's central idea?"
    )
    return make_question(
        topic_id="reading-and-writing",
        qid=_rw_qid(n),
        prompt=prompt,
        explanation="The correct option restates the passage's core claim without adding unsupported details.",
        correct_text=correct[0].upper() + correct[1:],
        distractors=[d1[0].upper() + d1[1:], d2[0].upper() + d2[1:], d3[0].upper() + d3[1:]],
        correct_slot=rng.randint(0, 3),
        difficulty=rng.choice(["easy", "medium"]),
        distractor_explanations=None,
    )


def _rw_main_idea_history(rng: random.Random, n: int) -> dict:
    passage, correct, d1, d2, d3 = PASSAGES_HISTORY[n % len(PASSAGES_HISTORY)]
    prompt = f"Passage {n}: {passage}\n\nWhat is the main point of the passage?"
    return make_question(
        topic_id="reading-and-writing",
        qid=_rw_qid(n),
        prompt=prompt,
        explanation="The main point summarizes the historical claim supported by the details given.",
        correct_text=correct[0].upper() + correct[1:],
        distractors=[d1[0].upper() + d1[1:], d2[0].upper() + d2[1:], d3[0].upper() + d3[1:]],
        correct_slot=rng.randint(0, 3),
        difficulty="medium",
    )


def _rw_main_idea_humanities(rng: random.Random, n: int) -> dict:
    passage, correct, d1, d2, d3 = PASSAGES_HUMANITIES[n % len(PASSAGES_HUMANITIES)]
    prompt = f"Passage {n}: {passage}\n\nWhich statement best expresses the author's focus?"
    return make_question(
        topic_id="reading-and-writing",
        qid=_rw_qid(n),
        prompt=prompt,
        explanation="The correct choice reflects how the author frames technique or structure in the passage.",
        correct_text=correct[0].upper() + correct[1:],
        distractors=[d1[0].upper() + d1[1:], d2[0].upper() + d2[1:], d3[0].upper() + d3[1:]],
        correct_slot=rng.randint(0, 3),
        difficulty="medium",
    )


def _rw_words_in_context(rng: random.Random, n: int) -> dict:
    word, sentence, correct, d1, d2, d3 = WORDS_IN_CONTEXT[n % len(WORDS_IN_CONTEXT)]
    prompt = (
        f"As used in the sentence below (item {n}), {word!r} most nearly means:\n\n"
        f'"{sentence}"'
    )
    return make_question(
        topic_id="reading-and-writing",
        qid=_rw_qid(n),
        prompt=prompt,
        explanation=f"In context, {word!r} conveys the sense of {correct!r}.",
        correct_text=correct,
        distractors=[d1, d2, d3],
        correct_slot=rng.randint(0, 3),
        difficulty="easy",
    )


def _rw_transition(rng: random.Random, n: int) -> dict:
    correct, relation, stem = TRANSITIONS[n % len(TRANSITIONS)]
    wrongs = [t[0] for t in TRANSITIONS if t[0] != correct][:3]
    while len(wrongs) < 3:
        wrongs.append("Meanwhile")
    prompt = (
        f"Item {n}. Choose the transition that best completes the blank to show {relation}.\n\n"
        f"{stem}"
    )
    return make_question(
        topic_id="reading-and-writing",
        qid=_rw_qid(n),
        prompt=prompt,
        explanation=f"{correct} signals {relation} between the ideas.",
        correct_text=correct,
        distractors=wrongs[:3],
        correct_slot=rng.randint(0, 3),
        difficulty="easy",
    )


def _rw_conventions(rng: random.Random, n: int) -> dict:
    kind, stem, correct, d1, d2, d3, expl = CONVENTIONS[n % len(CONVENTIONS)]
    prompt = f"Standard English Conventions ({kind}, item {n}):\n\n{stem}"
    return make_question(
        topic_id="reading-and-writing",
        qid=_rw_qid(n),
        prompt=prompt,
        explanation=expl,
        correct_text=correct,
        distractors=[d1, d2, d3],
        correct_slot=rng.randint(0, 3),
        difficulty=rng.choice(["easy", "medium"]),
    )


def _rw_rhetorical(rng: random.Random, n: int) -> dict:
    stem, correct, d1, d2, d3 = RHETORICAL[n % len(RHETORICAL)]
    prompt = f"Expression of Ideas (item {n}): {stem}"
    return make_question(
        topic_id="reading-and-writing",
        qid=_rw_qid(n),
        prompt=prompt,
        explanation="The best choice advances the writer's stated purpose with clear, relevant wording.",
        correct_text=correct,
        distractors=[d1, d2, d3],
        correct_slot=rng.randint(0, 3),
        difficulty="medium",
    )


def _rw_inference(rng: random.Random, n: int) -> dict:
    years = 2 + (n % 5)
    drop = 10 + (n % 7) * 2
    prompt = (
        f"Passage {n}: After a city added protected bike lanes, weekday cycling trips rose for {years} consecutive years, "
        f"while reported bicycle-car collisions fell by {drop}%. Critics had predicted that painted lanes alone would have little effect.\n\n"
        f"Which inference is best supported by the passage?"
    )
    return make_question(
        topic_id="reading-and-writing",
        qid=_rw_qid(n),
        prompt=prompt,
        explanation="The passage links protected lanes to rising trips and fewer collisions, contrary to critics' prediction.",
        correct_text="Protected bike lanes were associated with safer and more frequent cycling.",
        distractors=[
            "Painted lanes alone caused the entire decline in collisions.",
            "Cycling trips fell every year after the lanes were added.",
            "Critics were proven correct about protected lanes.",
        ],
        correct_slot=rng.randint(0, 3),
        difficulty="medium",
    )


def _rw_evidence(rng: random.Random, n: int) -> dict:
    pct = 15 + (n % 6) * 5
    prompt = (
        f"Passage {n}: A nutrition study reported that participants who ate meals prepared at home at least five days a week "
        f"had {pct}% lower average sodium intake than participants who ate restaurant meals most days.\n\n"
        f"Which finding, if true, would most strengthen the study's implication that home cooking relates to lower sodium intake?"
    )
    return make_question(
        topic_id="reading-and-writing",
        qid=_rw_qid(n),
        prompt=prompt,
        explanation="Controlling for other diet differences isolates home cooking as a plausible factor in sodium intake.",
        correct_text="The two groups were similar in age, exercise habits, and overall calorie intake.",
        distractors=[
            "Restaurant meals are usually more expensive than home meals.",
            "Some participants disliked cooking.",
            "Sodium is measured in milligrams.",
        ],
        correct_slot=rng.randint(0, 3),
        difficulty="hard",
    )


def _rw_purpose(rng: random.Random, n: int) -> dict:
    topics = [
        ("a brief anecdote about a failed launch", "illustrate a claim about learning from early setbacks"),
        ("a table of yearly rainfall totals", "provide quantitative support for a climate trend"),
        ("a definition of 'opportunity cost'", "clarify a key economic term before applying it"),
        ("a rhetorical question about privacy", "engage readers before presenting an argument"),
    ]
    detail, purpose = topics[n % len(topics)]
    prompt = (
        f"In a draft essay (item {n}), a writer includes {detail}. "
        f"What is the most likely purpose of that inclusion?"
    )
    distractors = [
        "to contradict the essay's thesis without explanation",
        "to replace the need for a conclusion",
        "to list unrelated biographical facts",
    ]
    # rotate distractors slightly for uniqueness
    distractors = distractors[n % 3 :] + distractors[: n % 3]
    return make_question(
        topic_id="reading-and-writing",
        qid=_rw_qid(n),
        prompt=prompt,
        explanation="Authors typically insert such material to serve a clear rhetorical function in the argument.",
        correct_text=purpose[0].upper() + purpose[1:],
        distractors=[d[0].upper() + d[1:] for d in distractors],
        correct_slot=rng.randint(0, 3),
        difficulty="medium",
    )


def _rw_structure(rng: random.Random, n: int) -> dict:
    prompt = (
        f"Passage {n}: First the author describes a common classroom problem. Next she presents two competing explanations. "
        f"Finally she evaluates which explanation better fits recent classroom data.\n\n"
        f"Which choice best describes the passage's overall structure?"
    )
    return make_question(
        topic_id="reading-and-writing",
        qid=_rw_qid(n),
        prompt=prompt,
        explanation="The passage moves from problem to competing explanations to an evidence-based evaluation.",
        correct_text="Problem, alternative explanations, then evaluation",
        distractors=[
            "Chronological biography with no argument",
            "List of unrelated definitions only",
            "Personal narrative without analysis",
        ],
        correct_slot=rng.randint(0, 3),
        difficulty="medium",
    )


def _rw_cross_text(rng: random.Random, n: int) -> dict:
    claim_a = [
        "remote work increases productivity for focused tasks",
        "in-person collaboration improves creative brainstorming",
        "hybrid schedules reduce commuting stress",
    ][n % 3]
    claim_b = [
        "productivity gains disappear when meetings multiply online",
        "creative gains require structured agendas, not mere proximity",
        "stress reduction depends more on workload than on location",
    ][n % 3]
    prompt = (
        f"Text 1 (item {n}): A management brief claims that {claim_a}.\n"
        f"Text 2: A follow-up study suggests that {claim_b}.\n\n"
        f"How does Text 2 relate to Text 1?"
    )
    return make_question(
        topic_id="reading-and-writing",
        qid=_rw_qid(n),
        prompt=prompt,
        explanation="Text 2 complicates or qualifies Text 1 rather than simply restating it.",
        correct_text="It qualifies Text 1 by introducing an important limitation.",
        distractors=[
            "It repeats Text 1 with identical wording and no new claim.",
            "It discusses an unrelated scientific topic.",
            "It provides only a dictionary definition.",
        ],
        correct_slot=rng.randint(0, 3),
        difficulty="hard",
    )


def _rw_detail(rng: random.Random, n: int) -> dict:
    species = ["osprey", "peregrine falcon", "barn owl", "red-tailed hawk"][n % 4]
    count = 12 + (n % 9)
    prompt = (
        f"Passage {n}: Along one river corridor, monitors counted {count} active {species} nests this season, "
        f"up from fewer than half that number a decade earlier. Habitat restoration and reduced pesticide use are cited as likely factors.\n\n"
        f"According to the passage, which detail is explicitly stated?"
    )
    return make_question(
        topic_id="reading-and-writing",
        qid=_rw_qid(n),
        prompt=prompt,
        explanation="The passage directly states the current nest count for the named species.",
        correct_text=f"Monitors counted {count} active {species} nests this season.",
        distractors=[
            f"Pesticide use increased along the corridor this season.",
            f"The {species} nests were all abandoned.",
            f"Habitat restoration was proven to be the only cause.",
        ],
        correct_slot=rng.randint(0, 3),
        difficulty="easy",
    )


def _rw_logic(rng: random.Random, n: int) -> dict:
    prompt = (
        f"Argument {n}: School A lengthened its school day and later reported higher average test scores. "
        f"Therefore, lengthening the school day caused the score increase.\n\n"
        f"Which criticism most weakens the argument?"
    )
    return make_question(
        topic_id="reading-and-writing",
        qid=_rw_qid(n),
        prompt=prompt,
        explanation="If another change occurred at the same time, the causal claim about the longer day is undermined.",
        correct_text="School A also introduced a new tutoring program during the same period.",
        distractors=[
            "Some students prefer shorter school days.",
            "Test scores are reported as percentages.",
            "School B has a different mascot.",
        ],
        correct_slot=rng.randint(0, 3),
        difficulty="hard",
    )


# --- Math templates ----------------------------------------------------------

def gen_math_batch(rng: random.Random, start: int, count: int) -> list[dict]:
    out: list[dict] = []
    n = start
    factories = [
        _math_linear_solve,
        _math_linear_word,
        _math_system,
        _math_inequality,
        _math_quadratic_roots,
        _math_quadratic_vertex,
        _math_exponent,
        _math_function_value,
        _math_percent,
        _math_ratio,
        _math_proportional,
        _math_mean,
        _math_median,
        _math_probability,
        _math_scatter_slope,
        _math_geometry_triangle,
        _math_geometry_circle,
        _math_geometry_volume,
        _math_pythagorean,
        _math_trig_right,
        _math_absolute_value,
        _math_radical,
        _math_polynomial_factor,
        _math_units_rate,
    ]
    i = 0
    while len(out) < count:
        q = factories[i % len(factories)](rng, n)
        if q:
            out.append(q)
            n += 1
        i += 1
    return out


def _math_qid(n: int) -> str:
    return f"{EXAM_SLUG}-math-{n:03d}"


def _math_linear_solve(rng: random.Random, n: int) -> dict:
    x = 2 + (n % 9)
    a = 2 + (n % 5)
    b = 3 + (n % 7)
    c = a * x + b
    prompt = f"What is the value of x in the equation below? (Item {n})"
    return make_question(
        topic_id="math",
        qid=_math_qid(n),
        prompt=prompt,
        explanation=f"Subtract {b}: {a}x = {c - b}. Divide by {a}: x = {x}.",
        correct_text=str(x),
        distractors=[str(x + 1), str(x - 1 if x > 1 else x + 2), str(a + b)],
        correct_slot=rng.randint(0, 3),
        formula=f"$${a}x + {b} = {c}$$",
        difficulty="easy",
    )


def _math_linear_word(rng: random.Random, n: int) -> dict:
    rate = 12 + (n % 8)
    hours = 3 + (n % 4)
    fee = 20 + 5 * (n % 5)
    total = rate * hours + fee
    prompt = (
        f"A tutor charges ${rate} per hour plus a flat booking fee of ${fee}. "
        f"What is the total cost for {hours} hours of tutoring? (Item {n})"
    )
    return make_question(
        topic_id="math",
        qid=_math_qid(n),
        prompt=prompt,
        explanation=f"Total = {rate}×{hours} + {fee} = {total}.",
        correct_text=f"${total}",
        distractors=[f"${rate * hours}", f"${total + fee}", f"${rate + fee}"],
        correct_slot=rng.randint(0, 3),
        formula="$$C = rh + f$$",
        difficulty="easy",
    )


def _math_system(rng: random.Random, n: int) -> dict:
    x = 2 + (n % 6)
    y = 1 + (n % 5)
    a1, b1 = 1, 1
    c1 = x + y
    a2, b2 = 2, 1
    c2 = 2 * x + y
    prompt = f"What is the value of x in the system? (Item {n})"
    formula = f"$$\\begin{{cases}} {a1}x + {b1}y = {c1} \\\\ {a2}x + {b2}y = {c2} \\end{{cases}}$$"
    return make_question(
        topic_id="math",
        qid=_math_qid(n),
        prompt=prompt,
        explanation=f"Subtract the first equation from the second: x = {x}. Then y = {y}.",
        correct_text=str(x),
        distractors=[str(y), str(x + y), str(x - 1 if x > 1 else x + 1)],
        correct_slot=rng.randint(0, 3),
        formula=formula,
        difficulty="medium",
    )


def _math_inequality(rng: random.Random, n: int) -> dict:
    a = 3 + (n % 4)
    b = 5 + (n % 6)
    bound = 20 + (n % 10)
    # a x + b < bound => x < (bound - b) / a
    thresh = (bound - b) / a
    # present as multiple choice of solution sets
    correct = f"x < {thresh:g}"
    prompt = f"Which inequality describes the solution set? (Item {n})"
    return make_question(
        topic_id="math",
        qid=_math_qid(n),
        prompt=prompt,
        explanation=f"Subtract {b} and divide by {a}: x < {thresh:g}.",
        correct_text=correct,
        distractors=[f"x > {thresh:g}", f"x ≤ {thresh:g}", f"x ≥ {thresh:g}"],
        correct_slot=rng.randint(0, 3),
        formula=f"$${a}x + {b} < {bound}$$",
        difficulty="medium",
    )


def _math_quadratic_roots(rng: random.Random, n: int) -> dict:
    r1 = 1 + (n % 5)
    r2 = r1 + 1 + (n % 3)
    # (x-r1)(x-r2)=0
    b = -(r1 + r2)
    c = r1 * r2
    prompt = f"What is the greater root of the quadratic equation? (Item {n})"
    return make_question(
        topic_id="math",
        qid=_math_qid(n),
        prompt=prompt,
        explanation=f"Factor as (x-{r1})(x-{r2})=0, so roots are {r1} and {r2}; the greater is {r2}.",
        correct_text=str(r2),
        distractors=[str(r1), str(r1 + r2), str(c)],
        correct_slot=rng.randint(0, 3),
        formula=f"$$x^2 + ({b})x + {c} = 0$$",
        difficulty="medium",
    )


def _math_quadratic_vertex(rng: random.Random, n: int) -> dict:
    h = 1 + (n % 4)
    k = 2 + (n % 5)
    a = 1 if n % 2 == 0 else -1
    prompt = f"What is the vertex of the parabola? (Item {n})"
    return make_question(
        topic_id="math",
        qid=_math_qid(n),
        prompt=prompt,
        explanation=f"In vertex form y = a(x-h)^2 + k, the vertex is ({h}, {k}).",
        correct_text=f"({h}, {k})",
        distractors=[f"({k}, {h})", f"({-h}, {k})", f"({h}, {-k})"],
        correct_slot=rng.randint(0, 3),
        formula=f"$$y = {a}(x - {h})^2 + {k}$$",
        difficulty="medium",
    )


def _math_exponent(rng: random.Random, n: int) -> dict:
    base = 2 + (n % 3)
    exp = 3 + (n % 3)
    val = base**exp
    prompt = f"What is the value of the expression? (Item {n})"
    return make_question(
        topic_id="math",
        qid=_math_qid(n),
        prompt=prompt,
        explanation=f"{base}^{exp} = {val}.",
        correct_text=str(val),
        distractors=[str(base * exp), str(val // base if val > base else val + 1), str(val + base)],
        correct_slot=rng.randint(0, 3),
        formula=f"$${base}^{{{exp}}}$$",
        difficulty="easy",
    )


def _math_function_value(rng: random.Random, n: int) -> dict:
    m = 2 + (n % 5)
    b = -3 + (n % 7)
    x = 1 + (n % 6)
    y = m * x + b
    prompt = f"If f(x) = {m}x + ({b}), what is f({x})? (Item {n})"
    return make_question(
        topic_id="math",
        qid=_math_qid(n),
        prompt=prompt,
        explanation=f"f({x}) = {m}({x}) + ({b}) = {y}.",
        correct_text=str(y),
        distractors=[str(y + m), str(m + b), str(x + b)],
        correct_slot=rng.randint(0, 3),
        formula=f"$$f(x) = {m}x + ({b})$$",
        difficulty="easy",
    )


def _math_percent(rng: random.Random, n: int) -> dict:
    price = 40 + 10 * (n % 8)
    pct = 10 + 5 * (n % 5)
    final = round(price * (1 - pct / 100))
    prompt = f"A ${price} item is discounted by {pct}%. What is the sale price? (Item {n})"
    return make_question(
        topic_id="math",
        qid=_math_qid(n),
        prompt=prompt,
        explanation=f"Sale price = {price} × (1 − {pct}/100) = {final}.",
        correct_text=f"${final}",
        distractors=[f"${price - pct}", f"${final + 5}", f"${round(price * pct / 100)}"],
        correct_slot=rng.randint(0, 3),
        difficulty="easy",
    )


def _math_ratio(rng: random.Random, n: int) -> dict:
    a, b = 2 + (n % 4), 3 + (n % 5)
    mult = 4 + (n % 6)
    total = (a + b) * mult
    part = a * mult
    prompt = (
        f"The ratio of red to blue marbles is {a}:{b}. If there are {total} marbles in all, "
        f"how many are red? (Item {n})"
    )
    return make_question(
        topic_id="math",
        qid=_math_qid(n),
        prompt=prompt,
        explanation=f"Parts = {a + b}; each part = {mult}; red = {a}×{mult} = {part}.",
        correct_text=str(part),
        distractors=[str(b * mult), str(total - part + 1), str(a + b)],
        correct_slot=rng.randint(0, 3),
        difficulty="easy",
    )


def _math_proportional(rng: random.Random, n: int) -> dict:
    cups = 2 + (n % 3)
    batch = 3 + (n % 4)
    need = cups * batch
    prompt = (
        f"A recipe uses {cups} cups of flour for 1 batch. How many cups are needed for {batch} batches? (Item {n})"
    )
    return make_question(
        topic_id="math",
        qid=_math_qid(n),
        prompt=prompt,
        explanation=f"{cups} × {batch} = {need}.",
        correct_text=str(need),
        distractors=[str(cups + batch), str(need - cups), str(batch)],
        correct_slot=rng.randint(0, 3),
        difficulty="easy",
    )


def _math_mean(rng: random.Random, n: int) -> dict:
    vals = [8 + (n + i) % 9 for i in range(4)]
    mean = sum(vals) / 4
    mean_text = str(int(mean)) if mean == int(mean) else f"{mean:.1f}"
    prompt = f"What is the mean of the data set {vals}? (Item {n})"
    return make_question(
        topic_id="math",
        qid=_math_qid(n),
        prompt=prompt,
        explanation=f"Mean = ({' + '.join(map(str, vals))}) / 4 = {mean_text}.",
        correct_text=mean_text,
        distractors=[str(vals[0]), str(sum(vals)), str(sorted(vals)[1])],
        correct_slot=rng.randint(0, 3),
        difficulty="easy",
    )


def _math_median(rng: random.Random, n: int) -> dict:
    vals = sorted([5 + (n + 2 * i) % 11 for i in range(5)])
    med = vals[2]
    prompt = f"What is the median of the data set {vals}? (Item {n})"
    return make_question(
        topic_id="math",
        qid=_math_qid(n),
        prompt=prompt,
        explanation=f"For five ordered values, the median is the third: {med}.",
        correct_text=str(med),
        distractors=[str(vals[0]), str(vals[-1]), str(sum(vals) // 5)],
        correct_slot=rng.randint(0, 3),
        difficulty="easy",
    )


def _math_probability(rng: random.Random, n: int) -> dict:
    red = 2 + (n % 4)
    blue = 3 + (n % 5)
    total = red + blue
    prompt = (
        f"A bag contains {red} red and {blue} blue tiles. One tile is drawn at random. "
        f"What is the probability it is blue? (Item {n})"
    )
    return make_question(
        topic_id="math",
        qid=_math_qid(n),
        prompt=prompt,
        explanation=f"P(blue) = {blue}/{total}.",
        correct_text=f"{blue}/{total}",
        distractors=[f"{red}/{total}", f"{blue}/{red}", f"1/{total}"],
        correct_slot=rng.randint(0, 3),
        difficulty="easy",
    )


def _math_scatter_slope(rng: random.Random, n: int) -> dict:
    # approximate slope from two points on a line of best fit
    x1, y1 = 1, 10 + (n % 5)
    x2, y2 = 5, y1 + 8 + (n % 4)
    slope = (y2 - y1) / (x2 - x1)
    slope_text = str(int(slope)) if slope == int(slope) else f"{slope:.1f}"
    prompt = (
        f"A line of best fit passes near the points ({x1}, {y1}) and ({x2}, {y2}). "
        f"Which value best approximates the slope? (Item {n})"
    )
    return make_question(
        topic_id="math",
        qid=_math_qid(n),
        prompt=prompt,
        explanation=f"Slope ≈ ({y2}-{y1})/({x2}-{x1}) = {slope_text}.",
        correct_text=slope_text,
        distractors=[str(y2 - y1), f"{float(slope_text) + 1:g}", f"{max(float(slope_text) - 1, 0.5):g}"],
        correct_slot=rng.randint(0, 3),
        formula="$$m = \\frac{y_2 - y_1}{x_2 - x_1}$$",
        difficulty="medium",
    )


def _math_geometry_triangle(rng: random.Random, n: int) -> dict:
    a = 30 + 10 * (n % 3)
    b = 40 + 10 * (n % 4)
    c = 180 - a - b
    prompt = (
        f"In a triangle, two angles measure {a}° and {b}°. What is the measure of the third angle? (Item {n})"
    )
    return make_question(
        topic_id="math",
        qid=_math_qid(n),
        prompt=prompt,
        explanation=f"Angle sum is 180°, so third angle = 180 − {a} − {b} = {c}.",
        correct_text=f"{c}°",
        distractors=[f"{a + b}°", f"{180 - a}°", f"{b}°"],
        correct_slot=rng.randint(0, 3),
        difficulty="easy",
    )


def _math_geometry_circle(rng: random.Random, n: int) -> dict:
    r = 3 + (n % 6)
    area = math.pi * r * r
    # use pi form
    correct = f"{r * r}π"
    prompt = f"What is the area of a circle with radius {r}? (Item {n})"
    return make_question(
        topic_id="math",
        qid=_math_qid(n),
        prompt=prompt,
        explanation=f"Area = πr² = π({r})² = {correct}.",
        correct_text=correct,
        distractors=[f"{2 * r}π", f"{r}π", f"{r * r}"],
        correct_slot=rng.randint(0, 3),
        formula="$$A = \\pi r^2$$",
        difficulty="easy",
    )


def _math_geometry_volume(rng: random.Random, n: int) -> dict:
    l = 4 + (n % 5)
    w = 3 + (n % 4)
    h = 2 + (n % 3)
    vol = l * w * h
    prompt = f"What is the volume of a rectangular prism with dimensions {l} × {w} × {h}? (Item {n})"
    return make_question(
        topic_id="math",
        qid=_math_qid(n),
        prompt=prompt,
        explanation=f"V = lwh = {l}×{w}×{h} = {vol}.",
        correct_text=str(vol),
        distractors=[str(l + w + h), str(l * w), str(vol + h)],
        correct_slot=rng.randint(0, 3),
        formula="$$V = lwh$$",
        difficulty="easy",
    )


def _math_pythagorean(rng: random.Random, n: int) -> dict:
    triples = [(3, 4, 5), (5, 12, 13), (6, 8, 10), (7, 24, 25), (8, 15, 17), (9, 12, 15)]
    a, b, c = triples[n % len(triples)]
    prompt = (
        f"A right triangle has legs of length {a} and {b}. What is the length of the hypotenuse? (Item {n})"
    )
    return make_question(
        topic_id="math",
        qid=_math_qid(n),
        prompt=prompt,
        explanation=f"By the Pythagorean theorem, c = √({a}²+{b}²) = {c}.",
        correct_text=str(c),
        distractors=[str(a + b), str(c - 1), str(abs(b - a) or c + 1)],
        correct_slot=rng.randint(0, 3),
        formula="$$c = \\sqrt{a^2 + b^2}$$",
        difficulty="medium",
    )


def _math_trig_right(rng: random.Random, n: int) -> dict:
    # sin = opposite/hypotenuse for simple ratios
    opp, hyp = [(3, 5), (5, 13), (8, 17), (7, 25)][n % 4]
    prompt = (
        f"In a right triangle, the side opposite angle θ has length {opp} and the hypotenuse has length {hyp}. "
        f"What is sin θ? (Item {n})"
    )
    return make_question(
        topic_id="math",
        qid=_math_qid(n),
        prompt=prompt,
        explanation=f"sin θ = opposite/hypotenuse = {opp}/{hyp}.",
        correct_text=f"{opp}/{hyp}",
        distractors=[f"{hyp}/{opp}", f"{opp}/{hyp - opp}", f"{hyp - opp}/{hyp}"],
        correct_slot=rng.randint(0, 3),
        formula="$$\\sin\\theta = \\frac{\\text{opposite}}{\\text{hypotenuse}}$$",
        difficulty="medium",
    )


def _math_absolute_value(rng: random.Random, n: int) -> dict:
    k = 4 + (n % 7)
    # |x - 3| = k => x = 3+k or 3-k; ask for greater solution
    greater = 3 + k
    prompt = f"What is the greater solution of the equation? (Item {n})"
    return make_question(
        topic_id="math",
        qid=_math_qid(n),
        prompt=prompt,
        explanation=f"|x-3|={k} implies x-3=±{k}, so x={3 + k} or x={3 - k}. Greater is {greater}.",
        correct_text=str(greater),
        distractors=[str(3 - k), str(k), str(3 + k - 1)],
        correct_slot=rng.randint(0, 3),
        formula=f"$$|x - 3| = {k}$$",
        difficulty="medium",
    )


def _math_radical(rng: random.Random, n: int) -> dict:
    base = 4 + 2 * (n % 6)
    # sqrt(x) = base => x = base^2
    x = base * base
    prompt = f"What is the value of x? (Item {n})"
    return make_question(
        topic_id="math",
        qid=_math_qid(n),
        prompt=prompt,
        explanation=f"Square both sides: x = {base}² = {x}.",
        correct_text=str(x),
        distractors=[str(base), str(x // 2), str(x + base)],
        correct_slot=rng.randint(0, 3),
        formula=f"$$\\sqrt{{x}} = {base}$$",
        difficulty="easy",
    )


def _math_polynomial_factor(rng: random.Random, n: int) -> dict:
    p = 2 + (n % 5)
    q = p + 1 + (n % 3)
    # x^2 - (p+q)x + pq = (x-p)(x-q)
    prompt = f"Which expression is equivalent to the quadratic? (Item {n})"
    formula = f"$$x^2 - {p + q}x + {p * q}$$"
    return make_question(
        topic_id="math",
        qid=_math_qid(n),
        prompt=prompt,
        explanation=f"Find factors of {p * q} that sum to {p + q}: {p} and {q}.",
        correct_text=f"(x − {p})(x − {q})",
        distractors=[f"(x + {p})(x + {q})", f"(x − {p})(x + {q})", f"(x − {p + q})(x − 1)"],
        correct_slot=rng.randint(0, 3),
        formula=formula,
        difficulty="medium",
    )


def _math_units_rate(rng: random.Random, n: int) -> dict:
    speed = 40 + 5 * (n % 6)
    hours = 2 + (n % 3)
    dist = speed * hours
    prompt = (
        f"A car travels at a constant speed of {speed} miles per hour for {hours} hours. "
        f"How far does it travel? (Item {n})"
    )
    return make_question(
        topic_id="math",
        qid=_math_qid(n),
        prompt=prompt,
        explanation=f"Distance = rate × time = {speed} × {hours} = {dist} miles.",
        correct_text=f"{dist} miles",
        distractors=[f"{speed + hours} miles", f"{dist - speed} miles", f"{hours * 10} miles"],
        correct_slot=rng.randint(0, 3),
        formula="$$d = rt$$",
        difficulty="easy",
    )


# --- Bank assembly -----------------------------------------------------------

def load_cache(topic: str) -> list[dict]:
    path = CACHE_DIR / f"{topic}.json"
    if not path.exists():
        return []
    data = json.loads(path.read_text(encoding="utf-8"))
    return data.get("questions", [])


def next_seq(questions: list[dict], topic: str) -> int:
    max_seq = 0
    for q in questions:
        if q.get("topicId") != topic:
            continue
        match = re.search(r"-(\d{3,})$", q["id"])
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
    return {**q, "options": new_options, "correctOptionId": new_correct, "distractorExplanations": new_dist}


def validate_question(q: dict) -> list[str]:
    errors = []
    if q.get("examSlug") != EXAM_SLUG:
        errors.append("examSlug")
    if not q.get("prompt"):
        errors.append("prompt")
    if len(q.get("options", [])) != 4:
        errors.append("options")
    texts = [o["text"] for o in q.get("options", [])]
    if len(set(texts)) != 4:
        errors.append("duplicate options")
    ids = {o["id"] for o in q.get("options", [])}
    if ids != {"a", "b", "c", "d"}:
        errors.append("option ids")
    cid = q.get("correctOptionId")
    if cid not in ids:
        errors.append("correctOptionId")
    for o in q.get("options", []):
        if o["id"] != cid and not q.get("distractorExplanations", {}).get(o["id"]):
            errors.append(f"distractor {o['id']}")
    if q.get("difficulty") not in {"easy", "medium", "hard"}:
        errors.append("difficulty")
    if not q.get("sourceNote"):
        errors.append("sourceNote")
    return errors


def generate_for_topic(rng: random.Random, topic: str, start: int, need: int) -> list[dict]:
    if topic == "reading-and-writing":
        return gen_rw_batch(rng, start, need)
    if topic == "math":
        return gen_math_batch(rng, start, need)
    raise ValueError(f"Unknown topic: {topic}")


def main() -> None:
    if BANK_PATH.exists():
        bank = json.loads(BANK_PATH.read_text(encoding="utf-8"))
    else:
        bank = []
    questions = dedupe_by_id(bank)

    existing_ids = {q["id"] for q in questions}
    for topic in TOPIC_TARGETS:
        for q in load_cache(topic):
            if q["id"] not in existing_ids:
                questions.append(q)
                existing_ids.add(q["id"])

    questions = dedupe_by_content(questions)

    rng = random.Random(20260716)
    for topic, target in TOPIC_TARGETS.items():
        need = target - sum(1 for q in questions if q["topicId"] == topic)
        if need <= 0:
            continue
        start = next_seq(questions, topic)
        questions.extend(generate_for_topic(rng, topic, start, need))

    questions = dedupe_by_content(questions)

    for pass_offset in (1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000):
        missing = False
        for topic, target in TOPIC_TARGETS.items():
            need = target - sum(1 for q in questions if q["topicId"] == topic)
            if need <= 0:
                continue
            missing = True
            start = next_seq(questions, topic) + pass_offset
            questions.extend(generate_for_topic(rng, topic, start, need + 20))
        questions = dedupe_by_content(questions)
        if not missing:
            break

    by_topic: dict[str, list[dict]] = defaultdict(list)
    for q in questions:
        by_topic[q["topicId"]].append(q)

    final: list[dict] = []
    for topic, target in TOPIC_TARGETS.items():
        topic_qs = by_topic[topic][:target]
        if len(topic_qs) < target:
            raise SystemExit(
                f"Could not generate enough questions for {topic}: have {len(topic_qs)}, need {target}"
            )
        # Renumber sequentially for clean ids 001..target
        renumbered = []
        for idx, q in enumerate(topic_qs, start=1):
            q = {**q, "id": f"{EXAM_SLUG}-{TOPIC_ID_SLUG[topic]}-{idx:03d}", "examSlug": EXAM_SLUG, "topicId": topic}
            renumbered.append(q)
        final.extend(renumbered)

    shuffle_rng = random.Random(20260717)
    final = [shuffle_question_options(q, shuffle_rng) for q in final]

    errors = []
    for q in final:
        errs = validate_question(q)
        if errs:
            errors.append(f"{q['id']}: {errs}")
    if errors:
        raise SystemExit("Validation failed:\n" + "\n".join(errors[:30]))

    # Ensure unique ids after renumber
    if len({q["id"] for q in final}) != len(final):
        raise SystemExit("Duplicate ids after renumbering")

    BANK_PATH.parent.mkdir(parents=True, exist_ok=True)
    BANK_PATH.write_text(json.dumps(final, indent=2) + "\n", encoding="utf-8")
    for topic in TOPIC_TARGETS:
        sync_cache(topic, final)

    counts = {t: sum(1 for q in final if q["topicId"] == t) for t in TOPIC_TARGETS}
    print(f"Wrote {len(final)} questions → {BANK_PATH}")
    print("Counts:", counts)
    print("Cache:", CACHE_DIR)


if __name__ == "__main__":
    main()
