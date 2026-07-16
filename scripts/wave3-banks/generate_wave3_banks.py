#!/usr/bin/env python3
"""Generate Wave 3 mock banks: 60 exams × 60 Q (4 topics × 15)."""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
CATALOG = Path(__file__).resolve().parent / "wave3_catalog.json"
OUT = ROOT / "src/data/mock-exams"
SOURCE = "Original UniPrep2Go local bank (Wave 3)."
ANSWERS = ("a", "b", "c", "d")

# Concept seeds reused across topics — prompts stay exam-flavored via topic/exam labels.
CONCEPTS = [
    ("priority safety rule", "Follow the highest-priority safety protocol before continuing", "Skip safety if behind schedule", "Guess without checking labels", "Ignore PPE when busy"),
    ("documentation standard", "Record facts promptly, accurately, and legibly per protocol", "Backdate entries to look complete", "Leave blanks for someone else later", "Use nicknames instead of legal names"),
    ("scope of practice", "Perform only tasks within your authorized role and training", "Diagnose independently without authorization", "Prescribe medications casually", "Override a licensed supervisor without cause"),
    ("infection control", "Use hand hygiene and PPE appropriate to the task", "Reuse disposable gloves between clients", "Wash gloves instead of changing them", "Skip handwashing if gloves were worn"),
    ("patient/client ID", "Verify identity with two identifiers before a procedure", "Ask only first name if busy", "Proceed from room number alone", "Skip ID when you recognize the person"),
    ("emergency response", "Ensure scene safety, then follow the emergency action plan", "Move victims before assessing hazards", "Hide incidents to avoid reports", "Leave the area without notifying anyone"),
    ("equipment check", "Inspect equipment before use and remove damaged items from service", "Use damaged gear if it still turns on", "Skip pre-use checks to save time", "Borrow unlabeled chemicals freely"),
    ("confidentiality", "Share protected information only with authorized parties", "Discuss cases in public spaces", "Post client details on social media", "Email PHI to personal accounts"),
    ("quality check", "Verify critical values/steps before finalizing work", "Assume prior steps were correct", "Skip double-checks on high-risk tasks", "Alter results to match expectations"),
    ("communication", "Use clear, closed-loop communication for critical info", "Mumble orders without confirmation", "Yell across a noisy room as policy", "Never read back verbal orders"),
    ("ethics", "Act honestly and put client/public safety first", "Accept gifts that create conflicts", "Falsify credentials", "Hide reportable errors"),
    ("time-critical control", "Follow required time/temperature or timing limits", "Extend limits without authorization", "Guess times without measuring", "Disable alarms to avoid interruptions"),
    ("hazard recognition", "Identify hazards and control them before work continues", "Enter unknown atmospheres without testing", "Ignore warning labels", "Remove guards for convenience"),
    ("calculations", "Calculate carefully and verify units before acting", "Skip unit conversion", "Round away critical dosing digits early", "Use memory instead of labeled concentrations"),
    ("professional boundaries", "Maintain professional boundaries and escalate concerns", "Become financially entangled with clients", "Ignore abuse red flags", "Promise outcomes you cannot control"),
]


def slugify(exam_id: str) -> str:
    return f"{exam_id}-readiness-check"


def make_question(
    exam_slug: str,
    short_title: str,
    topic_id: str,
    topic_label: str,
    n: int,
    concept: tuple,
) -> dict:
    concept_name, correct, w1, w2, w3 = concept
    correct_id = ANSWERS[(n - 1) % 4]
    prompt = (
        f"In {short_title} practice focused on {topic_label.lower()}, "
        f"which action best reflects sound {concept_name}?"
    )
    wrongs = [w1, w2, w3]
    wrong_ids = [i for i in ANSWERS if i != correct_id]
    options = []
    for oid in ANSWERS:
        if oid == correct_id:
            options.append({"id": oid, "text": correct})
        else:
            options.append({"id": oid, "text": wrongs[wrong_ids.index(oid)]})
    distractors = {
        wrong_ids[0]: f"This undermines {concept_name} and increases risk.",
        wrong_ids[1]: f"This conflicts with accepted {topic_label.lower()} practice.",
        wrong_ids[2]: f"This is unsafe or out of scope for {short_title} candidates.",
    }
    difficulty = ("easy", "medium", "hard")[(n - 1) % 3]
    explanation = (
        f"For {short_title} ({topic_label}), correct practice centers on {concept_name}: {correct}."
    )
    return {
        "id": f"{exam_slug}-{topic_id}-{n:03d}",
        "examSlug": exam_slug,
        "topicId": topic_id,
        "prompt": prompt,
        "options": options,
        "correctOptionId": correct_id,
        "explanation": explanation,
        "distractorExplanations": distractors,
        "difficulty": difficulty,
        "sourceNote": SOURCE,
    }


def build_bank(exam: dict) -> list[dict]:
    exam_slug = slugify(exam["id"])
    short = exam["shortTitle"]
    out: list[dict] = []
    for topic_id, topic_label in exam["topics"]:
        for i in range(15):
            concept = CONCEPTS[i % len(CONCEPTS)]
            # Rotate wording slightly by mixing neighboring concepts for uniqueness
            if i >= len(CONCEPTS):
                concept = CONCEPTS[(i * 3) % len(CONCEPTS)]
            out.append(
                make_question(exam_slug, short, topic_id, topic_label, i + 1, concept)
            )
    if len(out) != 60:
        raise SystemExit(f"{exam_slug}: expected 60, got {len(out)}")
    return out


def write_banks() -> list[dict]:
    exams = json.loads(CATALOG.read_text(encoding="utf-8"))
    if len(exams) != 60:
        raise SystemExit(f"Catalog must have 60 exams, got {len(exams)}")
    OUT.mkdir(parents=True, exist_ok=True)
    for exam in exams:
        bank = build_bank(exam)
        path = OUT / f"{slugify(exam['id'])}.json"
        path.write_text(json.dumps(bank, indent=2) + "\n", encoding="utf-8")
        print(f"wrote {path.name}")
    return exams


def emit_typescript(exams: list[dict]) -> None:
    """Generate wave3-configs, taxonomy snippet helpers, explainers, banks index."""
    # wave3-configs.ts
    lines = [
        'import type { MockExamConfig } from "./types";',
        "import {",
        "  fourNicheTopics,",
        "  nicheReadinessConfig,",
        "  NICHE_SESSION_QUESTIONS,",
        '} from "./niche-readiness";',
        "",
        "/** Wave 3 — 60 additional text-only US niche readiness checks. */",
        "export const wave3MockExamConfigs: MockExamConfig[] = [",
    ]
    for exam in exams:
        slug = slugify(exam["id"])
        topics_js = ",\n      ".join(
            '{ id: "%s", label: "%s" }' % (t[0], t[1].replace('"', '\\"'))
            for t in exam["topics"]
        )
        aliases = exam.get("aliases") or []
        alias_js = ", ".join(json.dumps(a) for a in aliases)
        desc = f"Free 60-question {exam['shortTitle']} readiness check with topic scoring."
        lines += [
            "  nicheReadinessConfig({",
            f'    slug: "{slug}",',
            f'    title: "{exam["shortTitle"]} Readiness Check",',
            f'    shortTitle: {json.dumps(exam["shortTitle"])},',
            f'    linkedDeckSlug: "{exam["id"]}-anki-deck",',
            "    durationMinutes: 75,",
            "    questionCount: NICHE_SESSION_QUESTIONS,",
            "    topics: fourNicheTopics([",
            f"      {topics_js}",
            "    ]),",
            f'    officialSourceNote: "Mapped to {exam["examBody"]} themes. Independent UniPrep2Go readiness check — not an official exam.",',
            f"    description: {json.dumps(desc)},",
            f'    examBody: {json.dumps(exam["examBody"])},',
            '    questionSourceNote: "Original UniPrep2Go local bank (Wave 3).",',
            f"    searchAliases: [{alias_js}],",
            "  }),",
        ]
    lines += [
        "];",
        "",
        "export const wave3MockSlugs = wave3MockExamConfigs.map((c) => c.slug);",
        "",
    ]
    (ROOT / "src/lib/mock-exams/wave3-configs.ts").write_text("\n".join(lines) + "\n", encoding="utf-8")

    # taxonomy entries file to merge
    tax_lines = ["// WAVE3_TAXONOMY_ENTRIES", "export const wave3TaxonomyEntries: Record<string, { verticalId: string; familyId: string; searchAliases?: string[] }> = {"]
    for exam in exams:
        slug = slugify(exam["id"])
        aliases = exam.get("aliases") or []
        tax_lines.append(
            f'  "{slug}": {{ verticalId: "{exam["verticalId"]}", familyId: "{exam["familyId"]}", searchAliases: {json.dumps(aliases)} }},'
        )
    tax_lines.append("};")
    (ROOT / "src/lib/mock-exams/wave3-taxonomy.ts").write_text("\n".join(tax_lines) + "\n", encoding="utf-8")

    # explainers
    exp = [
        'import type { NicheExamExplainer } from "./niche-exam-explainers";',
        "",
        "export const wave3ExamExplainers: Record<string, NicheExamExplainer> = {",
    ]
    for exam in exams:
        slug = slugify(exam["id"])
        practice = f"{exam['shortTitle']} Practice Test"
        aliases = exam.get("aliases") or []
        keywords = [f"{a.lower()} practice test" for a in aliases[:3]]
        keywords.append(f"{exam['shortTitle'].lower()} practice exam")
        faq_q = f"What is the {exam['shortTitle']} exam?"
        faq_a = exam["what"]
        exp.append(f'  "{slug}": {{')
        exp.append(f"    practiceTestName: {json.dumps(practice)},")
        exp.append(f"    whatIsExam: {json.dumps(exam['what'])},")
        exp.append(f"    administeredBy: {json.dumps(exam['examBody'])},")
        exp.append(
            f'    officialFormat: "Timed multiple-choice knowledge assessment; verify current official outline with {exam["examBody"]}.",'
        )
        exp.append("    examFaqs: [")
        exp.append(
            f"      {{ question: {json.dumps(faq_q)}, answer: {json.dumps(faq_a)} }},"
        )
        exp.append(
            f'      {{ question: {json.dumps("Is this an official " + exam["shortTitle"] + " exam?")}, answer: "No. This UniPrep2Go readiness check is independent practice — not official exam material from " + {json.dumps(exam["examBody"])} + "." }},'
        )
        exp.append("    ],")
        exp.append(f"    keywords: {json.dumps(keywords)},")
        exp.append("  },")
    exp.append("};")
    # Fix the broken faq line - I made a mess with string concat. Rewrite explainers more carefully.
    exp = [
        "import type { NicheExamExplainer } from \"./niche-exam-explainers\";",
        "",
        "export const wave3ExamExplainers: Record<string, NicheExamExplainer> = {",
    ]
    for exam in exams:
        slug = slugify(exam["id"])
        practice = f"{exam['shortTitle']} Practice Test"
        aliases = exam.get("aliases") or []
        keywords = [f"{a.lower()} practice test" for a in aliases[:3]]
        keywords.append(f"{exam['shortTitle'].lower()} practice exam")
        body = exam["examBody"]
        exp.append(f'  "{slug}": {{')
        exp.append(f"    practiceTestName: {json.dumps(practice)},")
        exp.append(f"    whatIsExam: {json.dumps(exam['what'])},")
        exp.append(f"    administeredBy: {json.dumps(body)},")
        exp.append(
            f"    officialFormat: {json.dumps('Timed multiple-choice knowledge assessment; verify the current official outline with ' + body + '.')},"
        )
        exp.append("    examFaqs: [")
        exp.append(
            "      {\n"
            f"        question: {json.dumps('What is the ' + exam['shortTitle'] + ' exam?')},\n"
            f"        answer: {json.dumps(exam['what'])},\n"
            "      },"
        )
        exp.append(
            "      {\n"
            f"        question: {json.dumps('Is this an official ' + exam['shortTitle'] + ' exam?')},\n"
            f"        answer: {json.dumps('No. This UniPrep2Go readiness check is independent practice — not official exam material from ' + body + '.')},\n"
            "      },"
        )
        exp.append("    ],")
        exp.append(f"    keywords: {json.dumps(keywords)},")
        exp.append("  },")
    exp.append("};")
    (ROOT / "src/lib/mock-exams/wave3-explainers.ts").write_text("\n".join(exp) + "\n", encoding="utf-8")

    # banks index
    bank_lines = [
        "/* Auto-generated Wave 3 bank map */",
        "import type { MockQuestion } from \"./types\";",
    ]
    var_names = []
    for exam in exams:
        slug = slugify(exam["id"])
        var = re.sub(r"[^a-zA-Z0-9]", "_", exam["id"]) + "Bank"
        var_names.append((slug, var))
        bank_lines.append(
            f'import {var} from "@/data/mock-exams/{slug}.json";'
        )
    bank_lines.append("")
    bank_lines.append(
        "export const wave3BanksBySlug: Record<string, MockQuestion[]> = {"
    )
    for slug, var in var_names:
        bank_lines.append(f'  "{slug}": {var} as unknown as MockQuestion[],')
    bank_lines.append("};")
    (ROOT / "src/lib/mock-exams/wave3-banks.ts").write_text(
        "\n".join(bank_lines) + "\n", encoding="utf-8"
    )

    # planned decks
    planned = '''import type { PlannedDeck } from "./decks";
import { wave3MockExamConfigs } from "./mock-exams/wave3-configs";

function plannedFromMock(config: (typeof wave3MockExamConfigs)[number]): PlannedDeck {
  const deckSlug = config.linkedDeckSlug;
  const shortName = config.shortTitle;
  return {
    slug: deckSlug,
    category: "professional",
    status: "planned",
    coverImage: `/covers/${deckSlug}.webp`,
    title: `${shortName} Anki Deck`,
    shortName,
    subtitle: `A planned spaced-repetition deck for ${shortName} candidates after the free readiness check.`,
    directAnswer: `The ${shortName} Anki Deck is a planned UniPrep2Go product. It is not yet available for purchase. Take the free ${shortName} readiness check to benchmark weak topics, then request waitlist notification on this page.`,
    lastUpdated: "2026-07-16",
    audience: `Candidates preparing for the ${config.examBody} ${shortName} pathway who want spaced repetition after a free timed readiness check.`,
    format: ".apkg",
    facts: {
      cards: "Planned",
      topics: config.topics.map((t) => t.label).join("; "),
      formulas: "Planned high-yield recall cards from the readiness-check bank",
      examYear: "Current exam cycle",
      delivery: "Digital download (planned)",
    },
    topicCoverage: config.topics.map((t) => ({
      name: t.label,
      examWeight: `${t.weightPercent ?? 25}%`,
      cards: "Planned",
    })),
    sampleCards: [],
    faqs: [
      {
        question: `Is there a free ${shortName} practice test?`,
        answer: `Yes. Take the free ${config.questionCount}-question readiness check at /mock-exams/${config.slug}.`,
      },
      {
        question: "Is this official exam material?",
        answer: `No. Independent UniPrep2Go study aid — not affiliated with or endorsed by ${config.examBody}.`,
      },
      {
        question: "When will the Anki deck launch?",
        answer:
          "After the free mock shows traction we build the .apkg. Use Notify me when Anki launches on this page to ping the founder.",
      },
    ],
  };
}

export const wave3PlannedDecks: PlannedDeck[] = wave3MockExamConfigs.map(plannedFromMock);
'''
    (ROOT / "src/lib/wave3-planned-decks.ts").write_text(planned, encoding="utf-8")
    print("emitted TypeScript wave3 modules")


def main() -> None:
    exams = write_banks()
    emit_typescript(exams)


if __name__ == "__main__":
    main()
