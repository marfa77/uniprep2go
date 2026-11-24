import type { DeckEditorialBundle } from "./types";

const CHECKED = "24 Nov 2026";

export const njRealEstateDeckEditorial: DeckEditorialBundle = {
  slug: "nj-real-estate-anki-deck",
  mockSlug: "nj-real-estate-readiness-check",
  sections: [
    {
      heading: "What the New Jersey cards are built for",
      paragraphs: [
        "**New Jersey only.** The New Jersey Real Estate Commission requires a **75-hour prelicensure course** at a licensed school before the licence exam, which PSI Services runs remotely or in person at PSI testing centres. Once licensed, a salesperson pays **$160** for the initial licence, and the licence term is two years.",
        "The cards follow the topics a New Jersey salesperson needs: licence law and Commission rules, agency and disclosure, contracts, finance and closings, and fair housing. Each card puts a rule, term or situation on the front and the New Jersey requirement or definition on the back, so you practise recalling the exact rule rather than recognising it among answer choices. Group the cards by the course units you are studying, so each night's review matches the week's lessons.",
      ],
    },
    {
      heading: "Studying with spaced repetition against New Jersey's deadline",
      paragraphs: [
        "**Plan:** take the free start of the [New Jersey real estate practice test](/mock-exams/nj-real-estate-readiness-check) to find your weakest topics. Add 15 to 20 new cards a day, starting with licence law and agency, and review every day. In the final week, stop adding cards and take timed runs.",
        "Watch the calendar. The Commission says every applicant must apply for the initial licence **within one year of completing the prelicensure course**, so plan your exam early enough to leave time for the application. The Commission's pages do not publish the exam's question count or pass mark; check the PSI candidate information for the current format before your test day.",
      ],
    },
  ],
  sources: [
    { label: "NJ Real Estate Commission — Licensing requirements", url: "https://www.nj.gov/dobi/division_rec/licensing/reclicrequire.htm", checked: CHECKED },
    { label: "NJ Real Estate Commission — FAQs", url: "https://www.nj.gov/dobi/division_rec/recfaqs.htm", checked: CHECKED },
    { label: "NJ Real Estate Commission — Fees", url: "https://www.nj.gov/dobi/division_rec/licensing/recfees.htm", checked: CHECKED },
  ],
};
