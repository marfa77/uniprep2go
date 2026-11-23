import type { MockEditorialBundle } from "./types";
import { MOCK_PASS_PRICE_USD } from "../mock-pass";

const CHECKED = "23 Nov 2026";

export const frmPart1Editorial: MockEditorialBundle = {
  slug: "frm-part-1-readiness-check",
  howToPrepare:
    "Start with the free 25-question diagnostic on this page, then study GARP’s four Part I topics in order of weakness. Use the FRM Part 1 Anki deck for formulas between mock attempts; save GARP’s official practice exams for the week before your window.",
  sections: [
    {
      heading: "FRM Part I exam format and topics",
      paragraphs: [
        "GARP administers **100 equally weighted multiple-choice questions in 4 hours** at Pearson VUE test centers. All four topics appear on every sitting:",
        "Foundations of Risk Management; Quantitative Analysis; Financial Markets and Products; and Valuation and Risk Models. GARP does not publish a fixed percent passing score — results are pass/fail with quartile feedback after each window.",
      ],
    },
    {
      heading: "2027 exam windows and fees",
      paragraphs: [
        "Part I windows in 2027: **8–13 May**, **13–14 August** (AM sessions), and **13–18 November**. Exam fee is **USD 600 early / USD 800 standard**; new candidates pay a one-time **USD 400 enrollment fee**. May early registration opens **1 December**; standard opens **1 February**. August: early **1 March**, standard **1 May**. November: early **1 May**, standard **1 August**. Taxes apply; wire and ACH payments add USD 50. Check [GARP fees and payments](https://www.garp.org/frm/fees-payments) before you register.",
      ],
    },
    {
      heading: "From Part I to FRM certification",
      paragraphs: [
        "Pass Part I, then pass Part II **within four years**. You must submit **two years of relevant full-time work experience** within ten years of sitting Part II — experience can be gained before or after the exams. Results post on the GARP candidate portal **within eight weeks** of the window closing, as pass/fail plus quartile comparisons. [GARP pass rates](https://www.garp.org/frm/pass-rates) explain the methodology; GARP does not guarantee a fixed cutoff percentage.",
      ],
    },
    {
      heading: "How long to study, and a 10-week plan with this mock",
      paragraphs: [
        "GARP reports that candidates spend **about 240 hours** preparing for Part I on average, with a survey range from under 100 to more than 400 hours.",
        `**Week 0:** Free 25-question diagnostic on this page. **Weeks 1–6:** Read GARP books topic by topic; drill formulas in the [FRM Part 1 Anki deck](/decks/frm-part-1-anki-deck). **Weeks 7–8:** Full **50-question timed runs** with Mock Pass ($${MOCK_PASS_PRICE_USD}, unlimited mocks). **Weeks 9–10:** GARP official practice exams (included for registered candidates) and one final UniPrep run.`,
      ],
    },
  ],
  faqs: [
    {
      question: "When are the 2027 FRM Part I exams and what do they cost?",
      answer:
        "May 8–13, August 13–14 (AM), and November 13–18, 2027. USD 600 early / USD 800 standard per sitting, plus USD 400 one-time enrollment for new candidates (garp.org/frm/fees-payments, checked 23 Nov 2026).",
    },
    {
      question: "How long do I have to pass Part II after Part I?",
      answer: "Four years from your Part I pass date (GARP program-exams page, checked 23 Nov 2026).",
    },
    {
      question: "How many hours should I study for FRM Part I?",
      answer:
        "GARP cites about 240 hours on average, with a wide survey range below and above that (garp.org/frm/program-exams, checked 23 Nov 2026).",
    },
  ],
  sources: [
    {
      label: "GARP — FRM program and exams",
      url: "https://www.garp.org/frm/program-exams",
      checked: CHECKED,
    },
    {
      label: "GARP — FRM fees and payments (2027 windows)",
      url: "https://www.garp.org/frm/fees-payments",
      checked: CHECKED,
    },
  ],
  ctaAfterWeights:
    `Early registration for May 2027 opens 1 December. Check your weakest of the four Part I topics first with the [free 25-question mock](/mock-exams/frm-part-1-readiness-check).`,
};