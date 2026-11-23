import type { DeckEditorialBundle } from "./types";

const CHECKED = "23 Nov 2026";

export const lhDeckEditorial: DeckEditorialBundle = {
  slug: "life-and-health-insurance-exam-anki-deck",
  mockSlug: "life-and-health-insurance-readiness-check",
  sections: [
    {
      heading: "What the Life & Health cards cover",
      paragraphs: [
        "Each state sets its own Life & Health exam, usually with a general section on life, annuities and health, and a separate state-law section. The cards cover the general part that state outlines share:",
      ],
      bullets: [
        "**Life insurance:** whole, universal and variable life, and the riders, provisions and options attached to them.",
        "**Annuities:** immediate and deferred, fixed, variable and indexed, accumulation and payout options.",
        "**Application and underwriting:** insurable interest, replacement, disclosures and policy delivery.",
        "**Health insurance:** policy types, provisions and clauses, social insurance, and tax treatment of premiums and benefits.",
        "State law is not in the deck; study it from your state's candidate handbook.",
      ],
    },
    {
      heading: "How to use spaced repetition for the Life & Health exam",
      paragraphs: [
        "Life & Health questions often turn on similar-sounding provisions: grace period versus reinstatement, or the incontestable clause versus the suicide clause. Cards that pair them side by side are the fastest way to stop mixing them up.",
        "**Plan:** take the free start of the [Life & Health practice test](/mock-exams/life-and-health-insurance-readiness-check), then add 15–20 cards a day starting with policy provisions and riders. Keep one card per rider with what it does and who benefits on the back.",
        "For annuities, keep one card each for the accumulation and payout phases and one per payout option, with who receives what if the annuitant dies. Health policy cards work best as short claim scenarios with the deciding provision on the back.",
        "Review daily until your exam date. Exam structure, a worked Texas example and state differences are on the practice test page; for property and casualty lines, see the [P&C deck](/decks/property-casualty-insurance-exam-anki-deck).",
      ],
    },
  ],
  sources: [
    { label: "Pearson VUE — Texas insurance licensing (content outlines)", url: "https://www.pearsonvue.com/us/en/tx/insurance.html", checked: CHECKED },
  ],
};
