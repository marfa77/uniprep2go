import type { DeckEditorialBundle } from "./types";

const CHECKED = "23 Nov 2026";

export const pcDeckEditorial: DeckEditorialBundle = {
  slug: "property-casualty-insurance-exam-anki-deck",
  mockSlug: "property-casualty-insurance-readiness-check",
  sections: [
    {
      heading: "What the P&C cards cover",
      paragraphs: [
        "Property and Casualty licensing exams are set by each state, but most combine a general section with a state-law section. These cards cover the general part, which is where most state outlines overlap:",
      ],
      bullets: [
        "**Property:** dwelling and homeowners forms, commercial property, and terms such as actual cash value, replacement cost and coinsurance.",
        "**Casualty:** commercial general liability, personal and business auto, and other liability coverages.",
        "**Policy structure:** declarations, insuring agreements, conditions, exclusions and endorsements.",
        "**General concepts:** risk, hazard, insurable interest and contract law.",
        "Your state's insurance law is not in the deck; study it from your state's candidate handbook.",
      ],
    },
    {
      heading: "How to use spaced repetition for the P&C exam",
      paragraphs: [
        "P&C questions usually describe a loss and ask whether and how a policy pays. Cards work best when each form has its own card for what it covers, what it excludes and who counts as an insured.",
        "**Plan:** take the free start of the [P&C practice test](/mock-exams/property-casualty-insurance-readiness-check), add 15–20 cards a day starting with homeowners and auto, and review daily. Practise coinsurance and deductible questions as worked examples alongside the cards.",
        "When a practice question trips you, turn it into a short loss scenario card: what happened, which policy section applies, and whether it is covered. Reviewing scenarios this way trains the same judgment the exam asks for, rather than isolated definitions.",
        "Exam structure, a worked Texas example and state differences are on the practice test page. Selling life or health products too? Add the [Life & Health deck](/decks/life-and-health-insurance-exam-anki-deck).",
      ],
    },
  ],
  sources: [
    { label: "Pearson VUE — Texas insurance licensing (content outlines)", url: "https://www.pearsonvue.com/us/en/tx/insurance.html", checked: CHECKED },
  ],
};
