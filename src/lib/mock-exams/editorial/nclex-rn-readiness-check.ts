import type { MockEditorialBundle } from "./types";
import {
  FREE_DIAGNOSTIC_QUESTIONS,
  MOCK_PASS_PRICE_USD,
  mockAccessLine,
  requireMockConfig,
} from "./config-copy";

const CHECKED = "23 Nov 2026";
const SLUG = "nclex-rn-readiness-check";
const config = requireMockConfig(SLUG);
const perTopic = config.topics.map((t) => `${t.label} (${t.questionCount ?? 0})`).join(", ");

export const nclexRnEditorial: MockEditorialBundle = {
  slug: SLUG,
  howToPrepare: `Take the free ${FREE_DIAGNOSTIC_QUESTIONS}-question start to see which Client Needs area is weakest. Study by test-plan category, practise prioritization with case studies, and drill medications and lab values in the [NCLEX-RN Anki deck](/decks/nclex-rn-anki-deck).`,
  sections: [
    {
      heading: "NCLEX-RN exam facts: length, time and how it ends",
      paragraphs: [
        "NCSBN (National Council of State Boards of Nursing) develops the NCLEX-RN; your nursing regulatory body decides when you are eligible. The **2026 RN Test Plan** applies from 1 April 2026 through 31 March 2029.",
      ],
      bullets: [
        "**Length:** at least **85** and at most **150** items, in a **five-hour** limit that includes all breaks.",
        "**Minimum-length exam:** 52 items from the eight Client Needs areas, 18 items in three clinical judgment case studies, and **15 unscored pretest items** you cannot tell apart from scored ones.",
        "**Adaptive (CAT):** each item is chosen from your ability estimate so far. The exam stops when the computer is 95% certain you are clearly above or below the passing standard.",
        "**At 150 items or out of time:** the result uses your final ability estimate. If time runs out before you answer the minimum number of items, you fail.",
        "**No going back:** once you confirm an answer and move on, you cannot return to it, and every item must be answered.",
        "**Fee:** $200 in the United States today; **$350 from 1 Feb 2027**. Registration fees are not refunded for any reason.",
      ],
    },
    {
      heading: "What the NCLEX-RN test plan covers",
      paragraphs: [
        "Items are spread across Client Needs categories in these ranges (2026 RN Test Plan):",
      ],
      bullets: [
        "**Safe and Effective Care Environment:** Management of Care 15–21%; Safety and Infection Prevention and Control 10–16%.",
        "**Health Promotion and Maintenance:** 6–12%. **Psychosocial Integrity:** 6–12%.",
        "**Physiological Integrity:** Basic Care and Comfort 6–12%; Pharmacological and Parenteral Therapies 13–19%; Reduction of Risk Potential 9–15%; Physiological Adaptation 11–17%.",
        "**Clinical judgment:** each six-item case study follows one client through recognize cues, analyze cues, prioritize hypotheses, generate solutions, take action and evaluate outcomes. About 10% of items are stand-alone clinical judgment items. Some formats give partial credit.",
        `This check groups items into four areas: ${perTopic}.`,
      ],
    },
    {
      heading: "A 4-week NCLEX-RN plan on the test plan",
      paragraphs: [
        `**Week 1:** Free ${FREE_DIAGNOSTIC_QUESTIONS}-question start, then Management of Care and Safety and Infection Prevention and Control: delegation, prioritization, consent, isolation precautions and error prevention.`,
        "**Week 2:** Pharmacological and Parenteral Therapies and Reduction of Risk Potential: high-alert medications, dosage calculation, IV therapy, lab values and diagnostic tests. Drill these daily in the [Anki deck](/decks/nclex-rn-anki-deck).",
        "**Week 3:** Physiological Adaptation, Basic Care and Comfort, Health Promotion and Psychosocial Integrity. For each case study you practise, write which cue mattered most and why.",
        `**Week 4:** Sit the full ${config.questionCount}-question / ${config.durationMinutes}-minute check twice on fresh draws and review every rationale. Access: ${mockAccessLine(config)}. Testing for practical nursing instead? See the [NCLEX-PN practice test](/mock-exams/nclex-pn-readiness-check).`,
      ],
    },
    {
      heading: "What trips NCLEX-RN candidates",
      paragraphs: [],
      bullets: [
        "Reading the number of items as a result. The exam can stop at 85 or run to 150 for a pass or a fail.",
        "Rushing early items, then running out of time before the minimum count.",
        "Choosing a correct action that is not the priority action for this client right now.",
        "Assuming a second item on the same topic means the first answer was wrong; NCSBN says not to.",
      ],
    },
  ],
  faqs: [
    {
      question: "How many questions are on the NCLEX-RN?",
      answer:
        "Between 85 and 150 items in up to five hours, including 15 unscored pretest items and three six-item case studies (2026 NCLEX-RN Test Plan, checked 23 Nov 2026).",
    },
    {
      question: "How does the NCLEX-RN decide when to stop?",
      answer:
        "It stops when the computer is 95% certain your ability is clearly above or below the passing standard. Otherwise, at 150 items or when time runs out, your final ability estimate decides.",
    },
    {
      question: "How much does the NCLEX cost?",
      answer:
        "$200 in the United States now. From 1 Feb 2027 the US fee becomes $350 (NCSBN). Fees are not refundable.",
    },
    {
      question: "Which NCLEX-RN categories are the largest?",
      answer:
        "Management of Care (15–21%) and Pharmacological and Parenteral Therapies (13–19%), followed by Physiological Adaptation (11–17%).",
    },
    {
      question: "Can I go back and change answers on the NCLEX?",
      answer:
        "Not after you confirm an answer and move to the next item. Every item must be answered before you can continue.",
    },
    {
      question: "How long is the UniPrep2Go NCLEX-RN practice test?",
      answer: `The free start is ${FREE_DIAGNOSTIC_QUESTIONS} questions. The full check is ${config.questionCount} questions in ${config.durationMinutes} minutes. It is fixed-length, not adaptive. Unlimited retakes are on UniPrep Mock Pass ($${MOCK_PASS_PRICE_USD}, unlimited mocks).`,
    },
  ],
  sources: [
    {
      label: "NCSBN — 2026 NCLEX-RN Test Plan (PDF)",
      url: "https://www.nclex.com/files/2026_rn_test-plan.pdf",
      checked: CHECKED,
    },
    {
      label: "NCSBN — NCLEX fees and payment (including the 1 Feb 2027 change)",
      url: "https://www.nclex.com/fees-payment.page",
      checked: CHECKED,
    },
    {
      label: "NCSBN — computerized adaptive testing",
      url: "https://www.nclex.com/computerized-adaptive-testing.page",
      checked: CHECKED,
    },
  ],
};
