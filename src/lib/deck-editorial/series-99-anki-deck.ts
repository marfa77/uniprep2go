import type { DeckEditorialBundle } from "./types";

const CHECKED = "24 Nov 2026";

export const series99DeckEditorial: DeckEditorialBundle = {
  slug: "series-99-anki-deck",
  mockSlug: "series-99-readiness-check",
  sections: [
    {
      heading: "How the Series 99 cards follow FINRA's two job functions",
      paragraphs: [
        "The Series 99 (Operations Professional) has 50 items in 1 hour 30 minutes, a passing score of 68, and the SIE as its corequisite. FINRA splits the items across two job functions, and the cards are tagged the same way:",
      ],
      bullets: [
        "**Function 1, securities industry and broker-dealer operations (35 items):** customer onboarding and account data, funds movement and sweeps, receipt and delivery of securities, account transfers, settlement and fail control, segregation, possession and control, margin, stock loan, confirmations and statements, books and records.",
        "**Function 2, professional conduct and ethical considerations (15 items):** the conduct and ethics rules FINRA expects operations professionals to apply in their work.",
      ],
    },
    {
      heading: "Using spaced repetition for an operations exam",
      paragraphs: [
        "Operations questions turn on processes and deadlines: which step comes next, which record must be kept, which rule applies to a fail or a transfer. Cards that put a short situation on the front and the required action and rule on the back match how the exam asks.",
        "**Plan:** take the free start of the [Series 99 practice test](/mock-exams/series-99-readiness-check), then add 15–20 new cards a day from Function 1, which is 70% of the exam, and review daily. Build a separate small set for Function 2 and review it every day too, since conduct questions are quick points if the rules are fresh.",
        "In the last week, stop adding cards and take timed runs. If you have not passed the SIE yet, use the [SIE deck](/decks/sie-exam-anki-deck) first. FINRA's retake waits shorten on 19 Jan 2027 to 15 days after a first or second failure and 60 days after a third; details are on the practice test page.",
      ],
    },
  ],
  sources: [
    {
      label: "FINRA — Series 99 Operations Professional exam",
      url: "https://www.finra.org/registration-exams-ce/qualification-exams/series99",
      checked: CHECKED,
    },
  ],
};
