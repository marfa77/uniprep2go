import { getMockExamConfig } from "@/lib/mock-exams/configs";
import type { DeckEditorialBundle } from "./types";

const CHECKED = "23 Nov 2026";
const MOCK_SLUG = "nbrc-tmc-readiness-check";
const mock = getMockExamConfig(MOCK_SLUG)!;
const topicLabels = mock.topics.map((t) => t.label);

export const nbrcTmcDeckEditorial: DeckEditorialBundle = {
  slug: "nbrc-tmc-anki-deck",
  mockSlug: MOCK_SLUG,
  sections: [
    {
      heading: "What these cards cover on the new RT outline",
      paragraphs: [
        "The cards are written to the four TMC areas this deck shares with its readiness check. Each one maps onto part of the RT Examination's Breadth of Knowledge portion:",
      ],
      bullets: [
        `**${topicLabels[0]}** → RT outline *Patient Data*: blood gases, assessment findings, pulmonary function and imaging you have to interpret before acting.`,
        `**${topicLabels[1]}** → *Management of Devices and Patient Safety Procedures*: setting up, checking and troubleshooting equipment, and infection control.`,
        `**${topicLabels[2]}** → *Initiation and Modification of Interventions*, the largest Breadth area: ventilator and NIV changes, aerosol medications and airway care.`,
        `**${topicLabels[3]}** → the neonatal, pediatric and emergency cases that the RT outline also tests through its clinical-judgment portion.`,
        "Clinical-judgment case practice is not something flashcards replace; use the NBRC's free official RT practice exam for that format.",
      ],
    },
    {
      heading: "How to study for the RT Examination with spaced repetition",
      paragraphs: [
        "Cards work best for the facts you must recall instantly inside a longer scenario: normal values, alarm causes, settings and drug actions. Keep daily reviews short and steady rather than cramming one area at a time.",
        "**Week 1:** take the free start of the [NBRC readiness check](/mock-exams/nbrc-tmc-readiness-check) and suspend the cards for areas you already score well on. **Weeks 2–4:** about 20–30 new cards a day from your weakest area, plus reviews. **Final week:** stop adding cards, clear reviews daily, and switch your study time to full timed practice.",
        "Exam dates, the CSE window, attempts and fees are on the [readiness check page](/mock-exams/nbrc-tmc-readiness-check); the full timeline is in [NBRC TMC to RT exam in 2027](/blog/nbrc-tmc-to-rt-exam-2027).",
      ],
    },
  ],
  sources: [
    {
      label: "NBRC — RT Examination Detailed Content Outline, effective January 2027 (PDF)",
      url: "https://www.nbrc.org/wp-content/uploads/2025/10/NBRC-RT-Detailed-Content-Outline-January-2027.pdf",
      checked: CHECKED,
    },
    {
      label: "NBRC — Respiratory Therapy Examination",
      url: "https://www.nbrc.org/rt/",
      checked: CHECKED,
    },
  ],
};
