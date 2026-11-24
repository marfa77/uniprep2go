import type { DeckEditorialBundle } from "./types";

const CHECKED = "24 Nov 2026";

export const gaRealEstateDeckEditorial: DeckEditorialBundle = {
  slug: "ga-real-estate-anki-deck",
  mockSlug: "ga-real-estate-readiness-check",
  sections: [
    {
      heading: "What the Georgia cards are built for",
      paragraphs: [
        "**Georgia only.** The Georgia Real Estate Commission (GREC) requires the **75-hour Salesperson Prelicense Course** at an approved school before the exam, which PSI administers. The exam has a national portion and a Georgia state portion, covering topics such as Georgia laws and rules, real estate practice in Georgia, and finance and closing. The exam fee is **$175**, and PSI says it is forfeited if you do not test within one year of paying it.",
        "The state portion is where Georgia-specific rules decide the answer: licence law, brokerage relationships and practice under GREC rules. The cards are tagged national or state, and each puts a rule or situation on the front and the Georgia requirement on the back, so you can drill the portion you find harder.",
      ],
    },
    {
      heading: "Studying with spaced repetition, and after you pass",
      paragraphs: [
        "**Plan:** take the free start of the [Georgia real estate practice test](/mock-exams/ga-real-estate-readiness-check) to find your weaker portion. Add 15 to 20 new cards a day, starting with the state tag, and review every day. In the final week, stop adding cards and take timed runs.",
        "Plan beyond exam day too. GREC's licence fee is **$170**, which covers the first four years. Apply within three months of passing to avoid a doubled activation fee, and within twelve months at the latest, or you must retake the exam. In your first year as a salesperson you must also complete a **25-hour postlicense course**, or your licence lapses, so keep reviewing your cards after you pass.",
      ],
    },
  ],
  sources: [
    { label: "GREC — Obtaining a real estate license", url: "https://grec.state.ga.us/obtaining-a-license/real-estate/", checked: CHECKED },
    { label: "GREC — Education requirements", url: "https://grec.state.ga.us/licensed-professionals/education-requirements/real-estate/", checked: CHECKED },
    { label: "GREC — Real estate FAQ", url: "https://grec.state.ga.us/licensed-professionals/faq/real-estate/", checked: CHECKED },
    { label: "PSI — Georgia real estate candidate bulletin", url: "https://test-takers.psiexams.com/api/content/bulletin/4678", checked: CHECKED },
  ],
};
