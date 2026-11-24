import type { DeckEditorialBundle } from "./types";

const CHECKED = "24 Nov 2026";

export const ncRealEstateDeckEditorial: DeckEditorialBundle = {
  slug: "nc-real-estate-anki-deck",
  mockSlug: "nc-real-estate-readiness-check",
  sections: [
    {
      heading: "What the North Carolina cards are built for",
      paragraphs: [
        "**North Carolina only.** North Carolina is a broker-only state: new licensees start as Provisional Brokers after the 75-hour Broker Prelicensing Course. The North Carolina Real Estate Commission (NCREC) says the licence exam, run by Pearson VUE, has **140 scored items**, 80 national and 60 state, plus 10 unscored pretest items, in **4½ hours**. You need **75** on each section, scored separately.",
        "The state section covers North Carolina-specific material: licence law, Commission rules, agency and disclosure duties, and how brokerage works under a broker-in-charge. The cards are tagged national or state, and each puts a rule or situation on the front and the North Carolina requirement on the back, so you can review the 60 state items' topics on their own. Once you pass, Provisional Brokers must work under a broker-in-charge and complete postlicensing education to keep an active licence, so the cards stay useful after the exam.",
      ],
    },
    {
      heading: "Studying inside your 180-day window",
      paragraphs: [
        "**Plan:** take the free start of the [North Carolina real estate practice test](/mock-exams/nc-real-estate-readiness-check) to see whether the national or state section is weaker. Add 15 to 20 new cards a day, starting with the weaker tag, and review every day.",
        "NCREC gives you **180 days** of exam eligibility. You must wait at least 10 calendar days after a failed attempt, but within the 180 days there is no limit on attempts, and if you pass one section you only retake the other. Plan your card schedule so you can sit both sections comfortably inside the window.",
      ],
    },
  ],
  sources: [
    { label: "NCREC — Licensing FAQs", url: "https://www.ncrec.gov/Licensing/Licensingfaq", checked: CHECKED },
    { label: "NCREC — Apply for a broker license", url: "https://www.ncrec.gov/Licensing/ApplyLicense", checked: CHECKED },
  ],
};
