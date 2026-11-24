import type { DeckEditorialBundle } from "./types";

const CHECKED = "24 Nov 2026";

export const rdExamDeckEditorial: DeckEditorialBundle = {
  slug: "rd-exam-anki-deck",
  mockSlug: "rd-exam-readiness-check",
  sections: [
    {
      heading: "What the RD exam cards are built for",
      paragraphs: [
        "The Commission on Dietetic Registration (CDR) runs the Registration Examination for Dietitians through Pearson VUE test centres. CDR's exam FAQ sets the minimum passing scaled score at 25 on a scale of 1 to 50. To be eligible, CDR requires a minimum of a graduate degree from a USDE-recognised accredited institution, plus ACEND-accredited coursework and supervised practice.",
        "The exam rewards applying nutrition science to a case: assessing a patient, choosing an intervention, calculating needs, or managing a foodservice operation. The cards put the situation, value or term on the front and the decision, formula or reference range on the back, so you practise recall in the form the exam asks for.",
      ],
    },
    {
      heading: "Studying for the RD exam with spaced repetition",
      paragraphs: [
        "CDR publishes the test specifications on its examination resources page, including a 2027–2031 RD test specification and expanded study outline. Check which specification applies to your test date before you weight your study.",
        "**Plan:** take the free start of the [RD exam practice test](/mock-exams/rd-exam-readiness-check). Add 15 to 20 new cards a day, starting with nutrition care for individuals and groups, and review every day so calculations and normal ranges stay automatic. In the final week, stop adding cards and sit full timed runs, reviewing every miss against the outline.",
        "Plan your attempts carefully: CDR's board set a lifetime limit of eight attempts, which applies to candidates who establish exam eligibility on or after 1 January 2027. CDR also offers a $350 voucher covering two test attempts.",
      ],
    },
  ],
  sources: [
    { label: "CDR — RD exam overview", url: "https://www.cdrnet.org/RDExamOverview", checked: CHECKED },
    { label: "CDR — RDN eligibility", url: "https://www.cdrnet.org/RDNeligibility", checked: CHECKED },
    { label: "CDR — Examination resources", url: "https://www.cdrnet.org/study", checked: CHECKED },
  ],
};
