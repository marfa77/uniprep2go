#!/usr/bin/env python3
"""Emit Wave 4 waitlist TS modules from wave4_catalog.json (no question banks)."""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
CATALOG = Path(__file__).resolve().parent / "wave4_catalog.json"

MIN_WHAT = 400
MIN_WHO = 200
MIN_PREP = 200
MIN_FAQS = 6


def slugify(exam_id: str) -> str:
    return f"{exam_id}-readiness-check"


def validate(exams: list[dict]) -> None:
    if len(exams) != 50:
        raise SystemExit(f"Catalog must have 50 exams, got {len(exams)}")
    seen: set[str] = set()
    for exam in exams:
        eid = exam["id"]
        if eid in seen:
            raise SystemExit(f"Duplicate id {eid}")
        seen.add(eid)
        if len(exam["what"]) < MIN_WHAT:
            raise SystemExit(f"{eid}: what too short ({len(exam['what'])})")
        if len(exam["whoFor"]) < MIN_WHO:
            raise SystemExit(f"{eid}: whoFor too short")
        if len(exam["howToPrepare"]) < MIN_PREP:
            raise SystemExit(f"{eid}: howToPrepare too short")
        if len(exam["faqs"]) < MIN_FAQS:
            raise SystemExit(f"{eid}: need >={MIN_FAQS} faqs")
        if len(exam["topics"]) != 4:
            raise SystemExit(f"{eid}: need 4 topics")
        for topic in exam["topics"]:
            if len(topic) < 3 or len(topic[2]) < 40:
                raise SystemExit(f"{eid}: topic blurb too short for {topic}")


def emit_configs(exams: list[dict]) -> None:
    lines = [
        'import type { MockExamConfig } from "./types";',
        "import {",
        "  fourNicheTopics,",
        "  nicheWaitlistConfig,",
        "  NICHE_SESSION_QUESTIONS,",
        '} from "./niche-readiness";',
        "",
        "/** Wave 4 — 50 bankless waitlist niches (indexed SEO + notify CTA). */",
        "export const wave4MockExamConfigs: MockExamConfig[] = [",
    ]
    for exam in exams:
        slug = slugify(exam["id"])
        topics_js = ",\n      ".join(
            '{ id: "%s", label: "%s" }' % (t[0], t[1].replace('"', '\\"')) for t in exam["topics"]
        )
        aliases = exam.get("aliases") or []
        alias_js = ", ".join(json.dumps(a) for a in aliases)
        desc = (
            f"Free {exam['shortTitle']} practice test coming soon — exam guide, topic outline, "
            f"and notify when the timed readiness check launches."
        )
        lines += [
            "  nicheWaitlistConfig({",
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
            '    questionSourceNote: "Wave 4 waitlist — timed bank coming soon.",',
            f"    searchAliases: [{alias_js}],",
            "  }),",
        ]
    lines += [
        "];",
        "",
        "export const wave4MockSlugs = wave4MockExamConfigs.map((c) => c.slug);",
        "",
    ]
    (ROOT / "src/lib/mock-exams/wave4-configs.ts").write_text("\n".join(lines) + "\n", encoding="utf-8")


def emit_taxonomy(exams: list[dict]) -> None:
    lines = [
        'import type { MockExamTaxonomy } from "./types";',
        "",
        "export const wave4TaxonomyEntries: Record<string, MockExamTaxonomy> = {",
    ]
    for exam in exams:
        slug = slugify(exam["id"])
        aliases = exam.get("aliases") or []
        lines.append(
            f'  "{slug}": {{ verticalId: "{exam["verticalId"]}", familyId: "{exam["familyId"]}", searchAliases: {json.dumps(aliases)} }},'
        )
    lines.append("};")
    lines.append("")
    (ROOT / "src/lib/mock-exams/wave4-taxonomy.ts").write_text("\n".join(lines) + "\n", encoding="utf-8")


def emit_explainers(exams: list[dict]) -> None:
    lines = [
        'import type { NicheExamExplainer } from "./niche-exam-explainers";',
        "",
        "export const wave4ExamExplainers: Record<string, NicheExamExplainer> = {",
    ]
    for exam in exams:
        slug = slugify(exam["id"])
        practice = f"{exam['shortTitle']} Practice Test"
        aliases = exam.get("aliases") or []
        keywords = [f"{a.lower()} practice test" for a in aliases[:3]]
        keywords.append(f"{exam['shortTitle'].lower()} practice exam")
        topic_blurbs = [
            {"id": t[0], "label": t[1], "blurb": t[2]} for t in exam["topics"]
        ]
        faq_objs = [{"question": f["q"], "answer": f["a"]} for f in exam["faqs"]]
        lines.append(f'  "{slug}": {{')
        lines.append(f"    practiceTestName: {json.dumps(practice)},")
        lines.append(f"    whatIsExam: {json.dumps(exam['what'])},")
        lines.append(f"    administeredBy: {json.dumps(exam['examBody'])},")
        lines.append(f"    officialFormat: {json.dumps(exam['format'])},")
        lines.append(f"    whoFor: {json.dumps(exam['whoFor'])},")
        lines.append(f"    howToPrepare: {json.dumps(exam['howToPrepare'])},")
        lines.append(f"    topicBlurbs: {json.dumps(topic_blurbs)},")
        lines.append(f"    examFaqs: {json.dumps(faq_objs)},")
        lines.append(f"    keywords: {json.dumps(keywords)},")
        lines.append("  },")
    lines.append("};")
    lines.append("")
    (ROOT / "src/lib/mock-exams/wave4-explainers.ts").write_text("\n".join(lines) + "\n", encoding="utf-8")


def emit_planned_decks() -> None:
    planned = '''import type { PlannedDeck } from "./decks";
import { wave4MockExamConfigs } from "./mock-exams/wave4-configs";
import { getNicheExamExplainer } from "./mock-exams/niche-exam-explainers";

function plannedFromMock(config: (typeof wave4MockExamConfigs)[number]): PlannedDeck {
  const deckSlug = config.linkedDeckSlug;
  const shortName = config.shortTitle;
  const explainer = getNicheExamExplainer(config.slug);
  return {
    slug: deckSlug,
    category: "professional",
    status: "planned",
    coverImage: `/covers/${deckSlug}.webp`,
    title: `${shortName} Anki Deck`,
    shortName,
    subtitle: `A planned spaced-repetition deck for ${shortName} candidates — join the waitlist and study the free exam guide meanwhile.`,
    directAnswer:
      explainer?.whatIsExam ??
      `The ${shortName} Anki Deck is a planned UniPrep2Go product. It is not yet available for purchase. Use Notify me when Anki launches on this page, and study the linked readiness-check guide at /mock-exams/${config.slug}.`,
    lastUpdated: "2026-07-16",
    audience:
      explainer?.whoFor ??
      `Candidates preparing for the ${config.examBody} ${shortName} pathway who want spaced repetition after a free timed readiness check.`,
    format: ".apkg",
    facts: {
      cards: "Planned",
      topics: config.topics.map((t) => t.label).join("; "),
      formulas: "Planned high-yield recall cards aligned to the readiness-check topic outline",
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
        answer: `A free timed readiness check is coming soon at /mock-exams/${config.slug}. Use Notify me when this launches on the mock page.`,
      },
      {
        question: "Is this official exam material?",
        answer: `No. Independent UniPrep2Go study aid — not affiliated with or endorsed by ${config.examBody}.`,
      },
      {
        question: "When will the Anki deck launch?",
        answer:
          "After the free mock waitlist shows traction we build the .apkg. Use Notify me when Anki launches on this page to ping the founder on Telegram.",
      },
      {
        question: `Who is the ${shortName} Anki deck for?`,
        answer:
          explainer?.whoFor ??
          `Candidates studying for ${shortName} who want spaced repetition after a diagnostic mock.`,
      },
      {
        question: "How should I prepare while waiting?",
        answer:
          explainer?.howToPrepare ??
          `Review the official ${config.examBody} outline and the topic guide on the mock page, then notify for launch updates.`,
      },
    ],
  };
}

export const wave4PlannedDecks: PlannedDeck[] = wave4MockExamConfigs.map(plannedFromMock);
'''
    (ROOT / "src/lib/wave4-planned-decks.ts").write_text(planned, encoding="utf-8")


def main() -> None:
    exams = json.loads(CATALOG.read_text(encoding="utf-8"))
    validate(exams)
    emit_configs(exams)
    emit_taxonomy(exams)
    emit_explainers(exams)
    emit_planned_decks()
    print(f"emitted Wave 4 modules for {len(exams)} waitlist niches")


if __name__ == "__main__":
    main()
