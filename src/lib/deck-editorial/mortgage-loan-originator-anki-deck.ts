import type { DeckEditorialBundle } from "./types";

const CHECKED = "24 Nov 2026";

export const mloDeckEditorial: DeckEditorialBundle = {
  slug: "mortgage-loan-originator-anki-deck",
  mockSlug: "mortgage-loan-originator-readiness-check",
  sections: [
    {
      heading: "What the MLO cards are built for",
      paragraphs: [
        "Every state-licensed mortgage loan originator must pass the NMLS SAFE MLO Test with Uniform State Test content. NMLS says the SAFE Act sets the pass mark at 75% or better. The national test has 120 items, 115 of them scored and 5 unscored pre-test questions you cannot identify, in 190 minutes, and costs $110.",
        "Most of what the test asks is rules: which federal law applies, what a disclosure must contain and when, what an originator may or may not do. The cards put the rule or situation on the front and the requirement, the deadline or the prohibited act on the back, so you practise recalling the exact detail rather than recognising it.",
      ],
    },
    {
      heading: "Studying with spaced repetition for the SAFE test",
      paragraphs: [
        "**Plan:** take the free start of the [MLO practice test](/mock-exams/mortgage-loan-originator-readiness-check) to see which areas are weakest. Add 15 to 20 new cards a day, starting with federal law and disclosures, because those cards carry the most dates and thresholds, then move to mortgage products, origination and ethics. Review every day, and keep a short list of the cards you keep missing.",
        "Plan your test date with the retake rules in mind. NMLS says you wait 30 days after a first or second failed attempt and 180 days after every third, and you pay for a new enrolment each time. Candidates who pass cannot retake the test. In the last week, stop adding cards and sit full timed runs on fresh questions. The real test gives you about a minute and a half per item, so practise at that pace.",
      ],
    },
  ],
  sources: [
    {
      label: "NMLS — MLO Testing Handbook: overview and test specifications",
      url: "https://mortgage.nationwidelicensingsystem.org/knowledge/products/nmls/pubs/testingHbk/education/mlo_testing/mlo_test_guide/mlo_testing_hbk_intro-1.html",
      checked: CHECKED,
    },
    {
      label: "NMLS — MLO Testing Handbook: retaking a failed test",
      url: "https://mortgage.nationwidelicensingsystem.org/knowledge/products/nmls/pubs/testingHbk/education/mlo_testing/mlo_test_guide/mlo_testing_hbk_retake.html",
      checked: CHECKED,
    },
  ],
};
