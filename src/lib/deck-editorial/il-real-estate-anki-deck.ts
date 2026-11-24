import type { DeckEditorialBundle } from "./types";

const CHECKED = "24 Nov 2026";

export const ilRealEstateDeckEditorial: DeckEditorialBundle = {
  slug: "il-real-estate-anki-deck",
  mockSlug: "il-real-estate-readiness-check",
  sections: [
    {
      heading: "What the Illinois cards are built for",
      paragraphs: [
        "**Illinois only.** Illinois licenses brokers through the Department of Financial and Professional Regulation (IDFPR), and PSI runs the exam. PSI's Illinois candidate bulletin gives the broker exam in two portions: a **national portion of 100 items in 150 minutes**, with **70%** needed to pass, and a **state portion of 40 items in 90 minutes**, with **75%** needed. The broker exam fee is **$58**.",
        "The state portion carries the higher pass mark, so Illinois-specific rules matter most: licence law, agency and disclosure duties, and the rules for brokerage practice in Illinois. The cards are tagged national or state, and each card puts a rule or scenario on the front and the Illinois requirement on the back. Some national questions are scenario based, with options weighted by how complete the answer is, so cards that ask for the best next step help as much as definitions.",
      ],
    },
    {
      heading: "Studying both portions with spaced repetition",
      paragraphs: [
        "**Plan:** take the free start of the [Illinois real estate practice test](/mock-exams/il-real-estate-readiness-check). Add 15 to 20 new cards a day, starting with the state tag, and review every day so national topics stay fresh while you add Illinois rules.",
        "If you fail a portion, PSI says you only repeat the portion you failed, and your score report includes diagnostic information to show where to focus. After passing, you must apply to IDFPR within one year, or you lose the passing result. In the final week, stop adding cards and take timed runs at the real pace for each portion.",
      ],
    },
  ],
  sources: [
    { label: "IDFPR — Real estate", url: "https://idfpr.illinois.gov/profs/realest.html", checked: CHECKED },
    { label: "PSI — Illinois real estate candidate bulletin", url: "https://test-takers.psiexams.com/api/content/bulletin/4655", checked: CHECKED },
  ],
};
