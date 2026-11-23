import type { MockEditorialBundle } from "./types";
import { MOCK_PASS_PRICE_USD } from "../mock-pass";

const CHECKED = "23 Nov 2026";

export const sieFullMockEditorial: MockEditorialBundle = {
  slug: "sie-full-mock",
  howToPrepare:
    "Map weak FINRA sections with the free 25-question start, then study Products and Their Risks first (largest section), then Trading, Capital Markets, and Regulatory framework. Use the SIE Anki deck for terms; finish with FINRA’s free 75-question practice test.",
  dropDefaultFaqQuestions: [
    "is there a free finra sie practice test",
    "is the finra sie practice test free",
  ],
  sections: [
    {
      heading: "Who can take the SIE and what it costs",
      paragraphs: [
        "Anyone **18 or older** may sit the SIE — **no firm sponsor** required. Fee **$100**; passing results stay valid **four years**.",
        "Passing the SIE alone does not register you: you still need a **FINRA member firm** and a **qualification exam** (Series 6, 7, 22, 57, 79, 82, 86/87, 99, etc.).",
      ],
    },
    {
      heading: "How to enroll and where you can test",
      paragraphs: [
        "Create an account → enroll (card, ACH, or voucher) → schedule at a **Prometric test center or online**. Enrollment opens a **120-day testing window**.",
        "You receive **pass/fail immediately** after the exam, with performance feedback if you fail. **GI Bill reimbursement** may apply for eligible veterans.",
      ],
    },
    {
      heading: "Retake waiting periods change on 19 January 2027",
      paragraphs: [
        "**Today:** **30 days** after the 1st and 2nd fails; **180 days** after the 3rd or later fail within two years.",
        "**From 19 Jan 2027:** **15 days** and **60 days** respectively. New and open enrollments without an appointment adjust automatically. If you already scheduled a retake, FINRA may not shorten the window without cancelling — **rescheduling fees may apply**. Failing the SIE does **not** create a waiting period for Series 7. Fails older than two years do not count.",
      ],
    },
    {
      heading: "A 4-week SIE plan with this mock",
      paragraphs: [
        `**Week 0:** Free 25-question diagnostic. **Weeks 1–4 by FINRA section weight:** Products and Their Risks (33 scored items, 44%) first, then Trading/Accounts/Prohibited (23), Capital Markets (12), Regulatory (7). Drill the [SIE Anki deck](/decks/sie-exam-anki-deck). **Week 4:** Full **75-question timed mock** on Mock Pass ($${MOCK_PASS_PRICE_USD}), then FINRA’s [free 75-question practice test](https://www.finra.org/registration-exams-ce/qualification-exams/securities-industry-essentials-exam/practice-test).`,
      ],
    },
  ],
  faqs: [
    {
      question: "Is there a free FINRA SIE practice test?",
      answer: `Yes. FINRA publishes a free 75-question untimed practice test. On UniPrep2Go, start with **25 questions free, no signup**, then the full **75-question / 105-minute** mock on Mock Pass ($${MOCK_PASS_PRICE_USD}, unlimited mocks).`,
    },
    {
      question: "How much does the SIE cost and how long is it valid?",
      answer: "$100 per attempt; results valid four years (finra.org SIE page, checked 23 Nov 2026).",
    },
    {
      question: "Can I take the SIE online?",
      answer: "Yes — at a Prometric center or online proctored (finra.org, checked 23 Nov 2026).",
    },
    {
      question: "How long do I wait to retake the SIE?",
      answer:
        "30 days after the first two fails today; 15 days from 19 Jan 2027. 180 days after a third fail within two years today; 60 days from 19 Jan 2027 (FINRA Regulatory Notice 26-18, checked 23 Nov 2026).",
    },
    {
      question: "Do I need a sponsor for the SIE?",
      answer:
        "No for the SIE. Series 7 and other qualification exams require firm sponsorship (finra.org, checked 23 Nov 2026).",
    },
  ],
  sources: [
    {
      label: "FINRA — Securities Industry Essentials (SIE) exam",
      url: "https://www.finra.org/registration-exams-ce/qualification-exams/securities-industry-essentials-exam",
      checked: CHECKED,
    },
    {
      label: "FINRA Regulatory Notice 26-18 (retake waiting periods)",
      url: "https://www.finra.org/rules-guidance/notices/26-18",
      checked: CHECKED,
    },
    {
      label: "FINRA — SIE practice test",
      url: "https://www.finra.org/registration-exams-ce/qualification-exams/securities-industry-essentials-exam/practice-test",
      checked: CHECKED,
    },
  ],
  ctaAfterWeights:
    `Start with **25 free SIE questions** in FINRA's section mix, then take the full **75-question test** — unlimited with Mock Pass for $${MOCK_PASS_PRICE_USD}.`,
};