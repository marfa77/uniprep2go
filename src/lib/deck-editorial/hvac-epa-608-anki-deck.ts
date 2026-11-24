import type { DeckEditorialBundle } from "./types";

const CHECKED = "23 Nov 2026";

export const epa608DeckEditorial: DeckEditorialBundle = {
  slug: "hvac-epa-608-anki-deck",
  mockSlug: "epa-608-readiness-check",
  sections: [
    {
      heading: "What the EPA 608 cards cover in each test group",
      paragraphs: [
        "Every Section 608 test draws 25 questions from the Core group and 25 from each technical group you test for, and each group needs 70% on a closed-book test. The cards follow EPA's published test topics group by group:",
      ],
      bullets: [
        "**Core:** ozone depletion, the Clean Air Act and Montreal Protocol, the venting prohibition, substitute refrigerants and oils, recover / recycle / reclaim, recovery and evacuation, safety and shipping.",
        "**Type I:** small-appliance recovery requirements and field techniques—the deck groups these prompts so you can run a short daily queue before the Type I portion of a Universal test.",
        "**Type II:** leak detection, leak repair and recovery for high-pressure equipment, including the 15 lb and 200 lb thresholds.",
        "**Type III:** low-pressure leak detection, leak repair, recovery, recharging and safety cards, kept separate from Type II so chiller and centrifugal rules do not blend with high-side material during review.",
      ],
    },
    {
      heading: "Using spaced repetition before your 608 test",
      paragraphs: [
        "The 608 tests reward exact recall: dates, pressures, thresholds and which rule applies to which equipment. Spaced repetition fits that well, and a week of daily reviews is often enough to make the numbers stick.",
        "**Plan:** take the free start of the [EPA 608 practice test](/mock-exams/epa-608-readiness-check), then study Core first, since it counts on every test. Add the type groups you need and review daily. Because each group is scored separately, filter cards to any group that scores below 70% in practice.",
        "Pair each threshold with the equipment it applies to on the same card, for example a leak-repair rule with the appliance type and refrigerant charge, because many questions hinge on matching the right rule to the right system.",
        "Test format, passing scores and certification rules are on the practice test page. For a method to remember refrigerant numbers, see [how to memorize EPA 608 refrigerant numbers](/blog/memorize-epa-608-refrigerant-numbers-method).",
      ],
    },
  ],
  sources: [
    { label: "US EPA — Section 608 test topics", url: "https://www.epa.gov/section608/test-topics", checked: CHECKED },
    { label: "eCFR — Appendix D to Subpart F of Part 82", url: "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-82/subpart-F/appendix-Appendix%20D%20to%20Subpart%20F%20of%20Part%2082", checked: CHECKED },
  ],
};
