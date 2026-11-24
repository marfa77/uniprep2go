import type { DeckEditorialBundle } from "./types";

const CHECKED = "24 Nov 2026";

export const ohRealEstateDeckEditorial: DeckEditorialBundle = {
  slug: "oh-real-estate-anki-deck",
  mockSlug: "oh-real-estate-readiness-check",
  sections: [
    {
      heading: "What the Ohio cards are built for",
      paragraphs: [
        "**Ohio only.** The Ohio Division of Real Estate and Professional Licensing requires four courses before the salesperson exam: Real Estate Principles and Practices (40 hours), Ohio Real Estate Law, including civil rights and fair housing (40 hours), Real Estate Appraisal (10 hours) and Real Estate Finance (10 hours). You apply with an **$81** fee and a state and FBI background check, and you must be sponsored by an Ohio broker.",
        "The exam has a **state** and a **national** portion, and you need a score of **70** on each. The cards are tagged the same way, and they follow the four courses, so Ohio licence law and civil rights cards sit in the state tag. Each card puts a rule or situation on the front and the Ohio requirement on the back.",
      ],
    },
    {
      heading: "Studying both portions with spaced repetition",
      paragraphs: [
        "**Plan:** take the free start of the [Ohio real estate practice test](/mock-exams/oh-real-estate-readiness-check) to see which portion is weaker. Add 15 to 20 new cards a day, starting with Ohio real estate law, the largest state course, and review every day. In the final week, stop adding cards and take timed runs.",
        "Once your application is accepted, the Division sends your details to the testing vendor, which sends you a candidate information bulletin with scheduling instructions. If you have not held a licence in the past four years, your courses must have been completed within the ten years before you apply, so check the dates on your certificates first.",
      ],
    },
  ],
  sources: [
    {
      label: "Ohio Department of Commerce — Requirements for an Ohio real estate salesperson's license",
      url: "https://com.ohio.gov/wps/portal/gov/com/divisions-and-programs/real-estate-and-professional-licensing/salespersons-and-brokers/guides-and-resources/requirements-for-an-ohio-real-estate-salespersons-license",
      checked: CHECKED,
    },
    {
      label: "Ohio Department of Commerce — Salespersons and brokers",
      url: "https://com.ohio.gov/wps/portal/gov/com/divisions-and-programs/real-estate-and-professional-licensing/salespersons-and-brokers",
      checked: CHECKED,
    },
  ],
};
