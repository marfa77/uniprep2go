import type { DeckEditorialBundle } from "./types";

const CHECKED = "24 Nov 2026";

export const leedApOmDeckEditorial: DeckEditorialBundle = {
  slug: "leed-ap-om-anki-deck",
  mockSlug: "leed-ap-om-readiness-check",
  sections: [
    {
      heading: "What the LEED AP O+M cards are built for",
      paragraphs: [
        "LEED AP O+M covers existing buildings: how a building that is already operating earns and keeps certification through performance, policies and ongoing measurement. USGBC requires a current LEED Green Associate credential, or passing that exam at the same time, and translation aids are available for the O+M exam.",
        "USGBC's specialty exam has 100 multiple-choice questions, and you need 170 out of 200 to pass; you can take it at a Prometric centre or from home with remote proctoring.",
        "Operations questions turn on what a building team measures, how often, and what policy or plan proves it. The cards put a credit or an operating situation on the front and the requirement, the performance period or the documentation on the back, so you practise the detail an O+M question hinges on.",
      ],
    },
    {
      heading: "Studying O+M with spaced repetition",
      paragraphs: [
        "USGBC says LEED v5 is available for O+M and that exams are now available for LEED v5. Confirm in the specialty candidate handbook which version your exam covers before you start, and study that version's cards.",
        "**Plan:** take the free start of the [LEED AP O+M practice test](/mock-exams/leed-ap-om-readiness-check). Begin with prerequisites and energy and water performance, which drive most operating decisions, then add the other categories. Add 15 to 20 new cards a day and review daily; in the last week, stop adding cards and take timed runs. If you still need the Green Associate, start with the [LEED Green Associate deck](/decks/leed-green-associate-anki-deck). After you pass, LEED APs report 30 continuing education hours every two years, 6 of them LEED-specific.",
      ],
    },
  ],
  sources: [
    { label: "USGBC — LEED AP with specialty", url: "https://www.usgbc.org/credentials/leed-ap", checked: CHECKED },
    { label: "USGBC — LEED credentials and maintenance", url: "https://www.usgbc.org/credentials", checked: CHECKED },
    { label: "USGBC — LEED v5", url: "https://www.usgbc.org/leed/v5", checked: CHECKED },
  ],
};
