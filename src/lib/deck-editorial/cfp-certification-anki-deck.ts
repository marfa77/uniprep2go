import type { DeckEditorialBundle } from "./types";

const CHECKED = "23 Nov 2026";

export const cfpDeckEditorial: DeckEditorialBundle = {
  slug: "cfp-certification-anki-deck",
  mockSlug: "cfp-certification-readiness-check",
  sections: [
    {
      heading: "How the CFP cards follow the Principal Knowledge Topics",
      paragraphs: [
        "CFP Board links every one of the 170 exam questions to its Principal Knowledge Topics. The cards are tagged the same way, with more cards where the exam weight is higher:",
      ],
      bullets: [
        "**Retirement Savings and Income Planning (18%) and Investment Planning (17%):** plan types, contribution and distribution rules, return and risk measures.",
        "**General Principles of Financial Planning (15%) and Tax Planning (14%):** the planning process, time value of money and tax treatment.",
        "**Risk Management and Insurance Planning (11%) and Estate Planning (10%):** policy types, coverage needs, transfer tools.",
        "**Professional Conduct and Regulation (8%) and Psychology of Financial Planning (7%):** the fiduciary standard and client behaviour.",
      ],
    },
    {
      heading: "Spaced repetition for a six-hour exam",
      paragraphs: [
        "The CFP exam is two 3-hour sections, mostly scenarios and case studies. Cards hold the limits, rules and formulas you need to recall without hesitation so your time goes on the scenario.",
        "**Plan:** take the free start of the [CFP practice test](/mock-exams/cfp-certification-readiness-check), then add 20–30 cards a day weighted to retirement, investments and general principles, which together are half the exam. Turn every missed case question into a card for the rule you misapplied.",
        "Put each contribution limit, income threshold or phase-out on its own card with the account type on the front, and review those daily in the last month; scenario questions often depend on one number being right. Pair formula cards with a short worked example.",
        "Keep reviews daily right up to your testing window. Exam format, 2027 dates and fees, and attempt limits are on the practice test page.",
      ],
    },
  ],
  sources: [
    { label: "CFP Board — what you'll be tested on", url: "https://www.cfp.net/certification-process/exam-requirement/about-the-cfp-exam/what-youll-be-tested-on", checked: CHECKED },
  ],
};
