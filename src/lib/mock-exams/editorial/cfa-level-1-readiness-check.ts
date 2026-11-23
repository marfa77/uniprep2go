import type { MockEditorialBundle } from "./types";
import { MOCK_PASS_PRICE_USD } from "../mock-pass";

const CHECKED = "23 Nov 2026";

const CFA_L1_2027_ROWS: MockEditorialBundle["weightTable"] = {
  heading: "CFA Level I topic weights for 2027 exams (what changed)",
  introParagraphs: [
    "From the 2027 exam cycle, CFA Institute retitled several topics and shifted weight bands. Quantitative Methods, Financial Statement Analysis, Equities, and Fixed Income now share the **11–14%** band — the same tier as each other, not a single ethics-heavy headline.",
    "Per-topic question counts on this check come from the live question bank at render time.",
  ],
  rows: [
    {
      topicIds: ["ethics"],
      labelAliases: ["Ethical and Professional Standards"],
      session: "1",
      officialWeight: "10–15%",
      priorOfficialWeight: "15–20%",
    },
    {
      topicIds: ["quant"],
      labelAliases: ["Quantitative Methods"],
      session: "1",
      officialWeight: "11–14%",
      priorOfficialWeight: "6–9%",
    },
    {
      topicIds: ["economics"],
      labelAliases: ["Economics"],
      session: "1",
      officialWeight: "6–9%",
    },
    {
      topicIds: ["fra"],
      labelAliases: ["Financial Statement Analysis"],
      session: "1",
      officialWeight: "11–14%",
    },
    {
      topicIds: ["corp-finance"],
      labelAliases: ["Corporate Finance", "Corporate Issuers"],
      session: "1",
      officialWeight: "6–9%",
    },
    {
      topicIds: ["equity"],
      labelAliases: ["Equities", "Equity Investments", "Equity Valuation"],
      session: "2",
      officialWeight: "11–14%",
    },
    {
      topicIds: ["fixed-income"],
      labelAliases: ["Fixed Income"],
      session: "2",
      officialWeight: "11–14%",
    },
    {
      topicIds: ["derivatives"],
      labelAliases: ["Derivatives and Risk Management", "Derivatives"],
      session: "2",
      officialWeight: "6–9%",
      priorOfficialWeight: "5–8%",
    },
    {
      topicIds: ["alternatives"],
      labelAliases: ["Alternative Investments"],
      session: "2",
      officialWeight: "6–9%",
      priorOfficialWeight: "7–10%",
    },
    {
      topicIds: ["portfolio"],
      labelAliases: ["Portfolio Construction", "Portfolio Management"],
      session: "2",
      officialWeight: "8–12%",
    },
  ],
  footnoteParagraphs: [
    "Official weights: CFA Institute Level I exam page (2027 table). Questions on this check: drawn from the configured session topic quotas for this mock.",
  ],
};

export const cfaLevel1Editorial: MockEditorialBundle = {
  slug: "cfa-level-1-readiness-check",
  replaceExamFactsDomainWeights: true,
  howToPrepare:
    "Use the free 25-question diagnostic to rank 2027 topic bands, then study the largest weights first (Quant, FSA, Equities, Fixed Income, Ethics). Pair curriculum readings with the CFA Level 1 Anki deck and full timed mocks before CFA Institute official tests.",
  weightTable: CFA_L1_2027_ROWS,
  sections: [
    {
      heading: "Level I exam format and question style",
      paragraphs: [
        "The Level I exam is **180 three-option multiple-choice questions** in **two 135-minute sessions** of 90 questions (~90 seconds each).",
        "Stems avoid except/true/false patterns; CFA Institute minimizes “not” where possible. All questions are equally weighted with **no penalty for wrong answers**.",
      ],
    },
    {
      heading: "Dates, fees and how often you can sit",
      paragraphs: [
        "Exams run **four times per year** (typically February, May, August, November). You may sit **at most twice per calendar year**, not in consecutive windows or within six months of each other.",
        "Level I fee is **USD 1,140 early / 1,490 standard**; the one-time enrollment fee was removed from 29 April 2025. Rescheduling within a window costs **USD 250**. Check the [current window on CFA Program dates and fees](https://www.cfainstitute.org/programs/cfa-program/dates-fees) before you register.",
      ],
    },
    {
      heading: "Results and the minimum passing score",
      paragraphs: [
        "Results arrive by email **within about 5–7 weeks** after the window closes: pass/fail, topic performance, and a scale score versus the minimum passing score (MPS).",
        "CFA Institute sets the MPS after significant curriculum or population changes and otherwise maintains it through equating — there is **no fixed published percentage**. UniPrep’s **70% readiness target** is a diagnostic bar, not the official pass mark. See [CFA exam results](https://www.cfainstitute.org/programs/cfa-program/candidate-resources/exam-results) and CFA Institute’s pass-rate methodology — we do not quote pass-rate percentages here.",
      ],
    },
    {
      heading: "Practical Skills Module (PSM)",
      paragraphs: [
        "You must complete **one PSM at each level** before CFA Institute releases exam results, and you cannot reuse the same module at another level.",
      ],
    },
    {
      heading: "A 12-week plan that uses this mock",
      paragraphs: [
        "**Week 0:** Free 25-question diagnostic. **Weeks 1–8:** Curriculum by 2027 weight — largest bands first — plus the [CFA Level 1 Anki deck](/decks/cfa-level-1-anki-deck). **Weeks 9–10:** Full **60-question timed runs** on Mock Pass, aiming for the 70% readiness target on every topic. **Weeks 11–12:** CFA Institute official mocks in the Learning Ecosystem, then a final UniPrep run.",
        "Successful candidates report **over 300 hours per level** on average (CFA Institute Level II preparation guidance applies to total study commitment per level).",
      ],
    },
  ],
  faqs: [
    {
      question: "Did the CFA Level 1 topic weights change for 2027?",
      answer:
        "Yes. Ethics is now 10–15% (was 15–20%); Quant is 11–14% (was 6–9%); Derivatives is 6–9% and renamed Derivatives and Risk Management; Corporate Issuers is Corporate Finance; Equities and Portfolio Management are Equities and Portfolio Construction — see the 2027 table on cfainstitute.org (checked 23 Nov 2026).",
    },
    {
      question: "How much does the CFA Level 1 exam cost?",
      answer:
        "USD 1,140 early / 1,490 standard; no enrollment fee; USD 250 to reschedule within a window (cfainstitute.org dates and fees, checked 23 Nov 2026).",
    },
    {
      question: "How many times a year can I take CFA Level 1?",
      answer:
        "Up to twice per calendar year, not in consecutive windows or within six months (CFA Institute, checked 23 Nov 2026).",
    },
    {
      question: "When do CFA Level 1 results come out and what is the passing score?",
      answer:
        "Typically within 5–7 weeks after the window; CFA Institute sets the MPS each cycle — not a fixed percent (cfainstitute.org exam results, checked 23 Nov 2026).",
    },
    {
      question: "What is the PSM requirement?",
      answer:
        "One Practical Skills Module per level before results are released; cannot repeat the same module at another level (cfainstitute.org, checked 23 Nov 2026).",
    },
  ],
  sources: [
    {
      label: "CFA Institute — Level I exam",
      url: "https://www.cfainstitute.org/programs/cfa-program/candidate-resources/level-i-exam",
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
    {
      label: "CFA Institute — exam results / MPS",
      url: "https://www.cfainstitute.org/programs/cfa-program/candidate-resources/exam-results",
      checked: CHECKED,
    },
  ],
  ctaAfterWeights: `See which 2027 topics you're weakest in. Take the **free 25-question diagnostic** (no signup); unlimited full mocks are **$${MOCK_PASS_PRICE_USD}** with Mock Pass.`,
};