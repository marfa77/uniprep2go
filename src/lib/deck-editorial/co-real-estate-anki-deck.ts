import type { DeckEditorialBundle } from "./types";

const CHECKED = "24 Nov 2026";

export const coRealEstateDeckEditorial: DeckEditorialBundle = {
  slug: "co-real-estate-anki-deck",
  mockSlug: "co-real-estate-readiness-check",
  sections: [
    {
      heading: "What the Colorado cards are built for",
      paragraphs: [
        "**Colorado only.** The Colorado Division of Real Estate requires at least **168 hours** of qualifying education before the broker exam: Real Estate Law and Practice (48 hours), Colorado Contracts and Regulations (48), Trust Accounts and Record-Keeping (8), Current Legal Issues (8), Real Estate Closings (24) and Practical Applications (32). PSI is the exam vendor, and the exam has a state portion and a national portion.",
        "Colorado's courses lean heavily on state contracts, closings and trust accounts, and the state portion reflects that. The cards are tagged state or national, and each card puts a contract clause, closing step or rule on the front and the Colorado requirement on the back. Keep the course outlines beside you as you review: each card maps to one of the six required courses.",
      ],
    },
    {
      heading: "Studying with spaced repetition, in the right order",
      paragraphs: [
        "**Plan:** finish all your required coursework first. The Division says that if you take either exam portion before completing it, that portion is nullified and you must retake it before a licence is issued. Then take the free start of the [Colorado real estate practice test](/mock-exams/co-real-estate-readiness-check) to find your weaker portion.",
        "Add 15 to 20 new cards a day, starting with Colorado contracts and closings, the two biggest state courses, and review every day. In the final week, stop adding cards and take timed runs. Before you can hold an active licence you also need a background check and errors and omissions insurance, so start those alongside your study.",
      ],
    },
  ],
  sources: [
    { label: "Colorado DRE — Broker qualifying education", url: "https://dre.colorado.gov/division-programs/real-estate-broker/education/broker-qualifying-education", checked: CHECKED },
    { label: "Colorado DRE — Broker steps for initial licensure", url: "https://dre.colorado.gov/division-programs/real-estate-broker/licensing/broker-steps-for-initial-licensure", checked: CHECKED },
  ],
};
