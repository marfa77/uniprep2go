import type { MockEditorialBundle } from "./types";
import { MOCK_PASS_PRICE_USD, mockAccessLine, requireMockConfig, topicLabel } from "./config-copy";

const CHECKED = "24 Nov 2026";
const SLUG = "sie-quick-diagnostic";
const config = requireMockConfig(SLUG);

export const sieQuickDiagnosticEditorial: MockEditorialBundle = {
  slug: SLUG,
  howToPrepare: `Use this short check before you commit to a full study plan. If one of FINRA's four sections comes out clearly weaker, start there; when you are scoring consistently well here, move up to the [full SIE practice exam](/mock-exams/sie-full-mock), which runs the full 75-question length.`,
  sections: [
    {
      heading: "What is this quick check for?",
      paragraphs: [
        `This is a short diagnostic: ${config.questionCount} questions in ${config.durationMinutes} minutes, drawn across the four sections of FINRA's SIE content outline. It is built to answer one question quickly: which part of the SIE should you study first? It is not a pass/fail prediction, and it is not FINRA material.`,
        "The real SIE has **75 multiple-choice questions** in **1 hour 45 minutes**, with a passing score of **70**, and costs **$100**. FINRA says it is open to anyone aged 18 or older, association with a firm is not required, and results are valid for **four years**.",
      ],
    },
    {
      heading: "How are the SIE's 75 questions split?",
      paragraphs: ["FINRA's content outline allocates the questions like this:"],
      bullets: [
        `**${topicLabel(config, "capital-markets")}:** 16% (12 questions).`,
        `**${topicLabel(config, "products-risks")}:** 44% (33 questions), the largest section.`,
        `**${topicLabel(config, "trading-accounts")}:** 31% (23 questions).`,
        `**${topicLabel(config, "regulatory-framework")}:** 9% (7 questions).`,
      ],
    },
    {
      heading: "How should you read your result?",
      paragraphs: [
        "Look at the section breakdown, not just the total. A strong overall score can hide one weak section, and because products and their risks is 44% of the real exam, a gap there costs the most. If two sections are close, start with the larger one.",
        "With only a few questions per section on a short check, treat each section score as a direction, not a precise measure. Retake the quick check after a week of study on fresh draws and see whether the weak section has moved.",
      ],
    },
    {
      heading: "What comes after the SIE?",
      paragraphs: [
        "Passing the SIE alone does not let you do securities business. FINRA says you must also pass a qualification exam suited to your role, such as the Series 6, 7, 22, 57, 79, 82, 86/87 or 99, and you must be associated with a member firm to take one. See the [Series 7 practice test](/mock-exams/series-7-readiness-check) if that is your next step.",
        "If you fail, FINRA's retake waiting periods change on **19 January 2027**: 15 days after a first or second failed attempt (down from 30) and 60 days after a third (down from 180). See the [FINRA retake waiting period guide](/blog/finra-exam-retake-waiting-period-2027).",
      ],
    },
    {
      heading: "A 3-week plan from this check",
      paragraphs: [
        "**Week 1:** Take this quick check, then study your weakest section first, with daily review in the [SIE Anki deck](/decks/sie-exam-anki-deck).",
        "**Week 2:** Products and their risks every day, whatever your result: it is the largest section. Retake the quick check at the end of the week.",
        `**Week 3:** Move to the full-length [SIE practice exam](/mock-exams/sie-full-mock) under real timing. Access to this check: ${mockAccessLine(config)}.`,
      ],
    },
  ],
  faqs: [
    {
      question: "How many questions are on the real SIE exam?",
      answer: `75 multiple-choice questions in 1 hour 45 minutes, with a passing score of 70 (FINRA, checked ${CHECKED}).`,
    },
    {
      question: "Which SIE section is the largest?",
      answer: "Understanding Products and Their Risks: 44% of the exam, or 33 of 75 questions.",
    },
    {
      question: "Do I need to work for a firm to take the SIE?",
      answer: "No. FINRA says the SIE is open to anyone aged 18 or older, without association with a member firm.",
    },
    {
      question: "How long are SIE results valid?",
      answer: "Four years.",
    },
    {
      question: "How long do I wait after failing the SIE?",
      answer: "From 19 January 2027, 15 days after a first or second failed attempt and 60 days after a third.",
    },
    {
      question: "How long is the UniPrep2Go SIE quick diagnostic?",
      answer: `${config.questionCount} questions in ${config.durationMinutes} minutes across FINRA's four SIE sections. For full-length practice use the full SIE mock; unlimited retakes are on UniPrep Mock Pass ($${MOCK_PASS_PRICE_USD}, unlimited mocks).`,
    },
  ],
  sources: [
    {
      label: "FINRA — Securities Industry Essentials (SIE) exam",
      url: "https://www.finra.org/registration-exams-ce/qualification-exams/securities-industry-essentials-exam",
      checked: CHECKED,
    },
    { label: "FINRA — Regulatory Notice 26-18 (retake waiting periods)", url: "https://www.finra.org/rules-guidance/notices/26-18", checked: CHECKED },
  ],
};
