import type { MockEditorialBundle } from "./types";
import { MOCK_PASS_PRICE_USD } from "../mock-pass";

const CHECKED = "23 Nov 2026";

export const cfaLevel2Editorial: MockEditorialBundle = {
  slug: "cfa-level-2-readiness-check",
  howToPrepare:
    "Run the free 25-question vignette start, then block study by the 10–15% topic bands (Financial Statement Analysis, Equities, Fixed Income, Portfolio Construction, Ethics). Pair item-set practice with the Level 2 formula sheet and Anki deck; finish with CFA Institute mocks when registered.",
  sections: [
    {
      heading: "How Level II item sets work",
      paragraphs: [
        "Level II is **88 multiple-choice questions in 22 vignettes** across **two 132-minute sessions** (about 4 hours 24 minutes with an optional break). Each session has **11 item sets**; **20 sets are scored** and **2 are trial sets** that do not count.",
        "Topics are randomly distributed across sessions — each vignette opens with its topic and point value. Financial Statement Analysis items use **IFRS by default** unless U.S. GAAP is stated. There is **no penalty for guessing**; answer every question.",
      ],
    },
    {
      heading: "How to work a vignette in 12 minutes",
      paragraphs: [
        "Budget **about 12 minutes per item set** (132 minutes ÷ 11 sets per session). Read the **questions before the vignette**, underline the numbers you need, and avoid re-deriving formulas from scratch — keep the [CFA Level 2 formula sheet](/decks/cfa-level-2-formula-reference-2026) handy for lookup under time pressure.",
      ],
    },
    {
      heading: "Fees, windows and the PSM",
      paragraphs: [
        "Exam fees match Level I: **USD 1,140 early / USD 1,490 standard**, with **USD 250** to reschedule within a window. You may sit **up to twice per calendar year** with the same spacing rule as Level I (not consecutive windows, not within six months). Check current windows on the [CFA Program dates and fees tool](https://www.cfainstitute.org/programs/cfa-program/dates-fees).",
        "You must complete **one Practical Skills Module (PSM) per level** before CFA Institute releases results; the Level II PSM must differ from the one you used at Level I.",
      ],
    },
    {
      heading: "A 10-week Level II plan with this mock",
      paragraphs: [
        "CFA Institute notes that successful candidates report **over 300 hours** of study per level on average.",
        `**Week 0:** Free 25-question diagnostic. **Weeks 1–6:** Topic blocks weighted to the largest bands. **Weeks 7–8:** **60 vignette-question timed runs** on Mock Pass ($${MOCK_PASS_PRICE_USD}, unlimited mocks). **Weeks 9–10:** CFA Institute Learning Ecosystem mocks, then a final UniPrep run.`,
      ],
    },
  ],
  faqs: [
    {
      question: "How many item sets are scored on CFA Level 2?",
      answer: "20 of 22 item sets are scored; 2 trial sets do not count (cfainstitute.org Level II exam page, checked 23 Nov 2026).",
    },
    {
      question: "Does CFA Level 2 use IFRS or US GAAP?",
      answer:
        "IFRS unless the vignette states U.S. GAAP (CFA Institute Level II exam tips, checked 23 Nov 2026).",
    },
    {
      question: "How long should I spend per item set?",
      answer: "About 12 minutes per item set — 132 minutes per session divided across 11 sets.",
    },
    {
      question: "Do I need to complete a PSM for Level 2?",
      answer:
        "Yes — one PSM per level, and it must be different from the module completed at Level I (cfainstitute.org, checked 23 Nov 2026).",
    },
  ],
  sources: [
    {
      label: "CFA Institute — Level II exam",
      url: "https://www.cfainstitute.org/programs/cfa-program/candidate-resources/level-ii-exam",
      checked: CHECKED,
    },
    {
      label: "CFA Institute — dates and fees",
      url: "https://www.cfainstitute.org/programs/cfa-program/dates-fees",
      checked: CHECKED,
    },
    {
      label: "CFA Institute — pricing changes",
      url: "https://www.cfainstitute.org/about/press-room/2024/pricing-changes-for-cfa-program",
      checked: CHECKED,
    },
  ],
  ctaAfterWeights:
    `Try **25 free vignette questions**, no signup; then run **60 timed** with Mock Pass ($${MOCK_PASS_PRICE_USD}, unlimited mocks).`,
};