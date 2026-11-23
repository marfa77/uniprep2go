import type { MockEditorialBundle } from "./types";
import {
  FREE_DIAGNOSTIC_QUESTIONS,
  MOCK_PASS_PRICE_USD,
  largestTopicsLine,
  mockAccessLine,
  requireMockConfig,
} from "./config-copy";

const CHECKED = "23 Nov 2026";
const SLUG = "rd-exam-readiness-check";
const config = requireMockConfig(SLUG);

export const rdExamEditorial: MockEditorialBundle = {
  slug: SLUG,
  howToPrepare: `Check which test specifications apply to your exam date: CDR's current outline runs through 31 Dec 2026, and a new one starts on 1 Jan 2027. Take the free ${FREE_DIAGNOSTIC_QUESTIONS}-question start, study the largest domain first, and drill terms and values in the [RD exam Anki deck](/decks/rd-exam-anki-deck).`,
  sections: [
    {
      heading: "RD exam facts: length, timing, scoring and fee",
      paragraphs: [
        "The Commission on Dietetic Registration (CDR) sets the Registration Examination for Dietitians, delivered by Pearson VUE. Approved candidates are authorized to test for one year at a time.",
      ],
      bullets: [
        "**Computer adaptive and variable length:** at least **125 questions** (100 scored + 25 pretest) and at most **145** (120 scored + 25 pretest). Pretest items look like scored ones, so answer everything.",
        "**Time:** **3 hours** of testing inside a 3.5-hour appointment (20-minute tutorial, 10-minute survey). If you don't answer at least 125 questions in 3 hours, the exam is scored as a fail.",
        "**No going back:** you cannot review or change earlier answers.",
        "**Scoring:** scaled from **1 to 50**; the minimum passing score is **25**. The number of correct answers needed varies by exam form.",
        "**Fee:** **$250**, paid by card when you book. An optional bundle of $350 includes a discounted retake voucher ($100 on its own for dietitians). Fees are not refunded if you fail or miss the appointment.",
        "**Booking:** at least 48 hours ahead; cancel online at least 48 hours before to get a refund.",
      ],
    },
    {
      heading: "What the RD exam covers, and what changes on 1 Jan 2027",
      paragraphs: [
        "**Through 31 Dec 2026 (2022–2026 specifications):** Principles of Dietetics 21%; Nutrition Care for Individuals and Groups 45%; Management of Food and Nutrition Programs and Services 21%; Foodservice Systems 13%. Questions test comprehension and application.",
        "**From 1 Jan 2027 (2027–2031 specifications, approved by CDR on 25 June 2025):** four renamed domains with new weights.",
      ],
      bullets: [
        "**Fundamentals of Dietetics Practice — 23%:** management and leadership, marketing and public relations, research applications, professional practice.",
        "**Community and Public Health Nutrition — 22%:** guidelines and policies, community needs assessment, programs and services.",
        "**Human Nutrition and Medical Nutrition Therapy — 40%:** nutrition and physiology fundamentals, screening and assessment, diagnosis, planning and intervention, monitoring and evaluation.",
        "**Food Science and Food Systems — 15%:** food science, menu development, and the flow of food from procurement to service.",
        `This check follows the current outline, led by ${largestTopicsLine(config)}.`,
      ],
    },
    {
      heading: "A 4-week RD exam plan on the CDR outline",
      paragraphs: [
        `**Week 1:** Take the free ${FREE_DIAGNOSTIC_QUESTIONS}-question start and confirm which specifications your test date falls under. Begin with nutrition care, the largest domain in both outlines: screening, assessment, diagnosis (PES statements), intervention and monitoring.`,
        "**Week 2:** Medical nutrition therapy by condition, plus calculations: energy and protein needs, tube feeding and parenteral nutrition. Drill formulas and normal values in the [Anki deck](/decks/rd-exam-anki-deck).",
        "**Week 3:** Management and foodservice: leadership, budgeting, quality improvement, menu planning, procurement, production and food safety. If you test in 2027, add community and public health nutrition, which becomes its own 22% domain.",
        `**Week 4:** Sit the full ${config.questionCount}-question / ${config.durationMinutes}-minute check twice on fresh draws, then review every explanation. Practise pacing: on the real exam, unanswered questions below the 125 minimum mean a fail. Access: ${mockAccessLine(config)}.`,
      ],
    },
    {
      heading: "What trips RD exam candidates",
      paragraphs: [],
      bullets: [
        "Studying from the wrong outline for your test date, especially around the 1 Jan 2027 switch.",
        "Running short of time and finishing under 125 questions, which is scored as a fail.",
        "Second-guessing earlier answers; the exam does not allow going back.",
        "Under-preparing calculations, which appear across nutrition care and foodservice.",
      ],
    },
  ],
  faqs: [
    {
      question: "How many questions are on the RD exam?",
      answer:
        "Between 125 and 145: 100 to 120 scored plus 25 unscored pretest questions, on a computer-adaptive exam with a 3-hour limit (CDR RD Exam Candidate Handbook, checked 23 Nov 2026).",
    },
    {
      question: "What score do I need to pass the RD exam?",
      answer: "A scaled score of 25 on a 1–50 scale. The number of correct answers needed varies by exam form.",
    },
    {
      question: "How much does the RD exam cost?",
      answer: "$250 per attempt. A $350 bundle includes a discounted retake voucher.",
    },
    {
      question: "Is the RD exam changing in 2027?",
      answer:
        "Yes. From 1 Jan 2027 CDR's new test specifications use four domains: Fundamentals of Dietetics Practice 23%, Community and Public Health Nutrition 22%, Human Nutrition and Medical Nutrition Therapy 40%, and Food Science and Food Systems 15%.",
    },
    {
      question: "Can I go back and change answers on the RD exam?",
      answer: "No. You cannot review previous questions or change previous responses.",
    },
    {
      question: "How long is the UniPrep2Go RD exam practice test?",
      answer: `The free start is ${FREE_DIAGNOSTIC_QUESTIONS} questions. The full check is ${config.questionCount} questions in ${config.durationMinutes} minutes on the current four domains. It is fixed-length, not adaptive. Unlimited retakes are on UniPrep Mock Pass ($${MOCK_PASS_PRICE_USD}, unlimited mocks).`,
    },
  ],
  sources: [
    {
      label: "CDR — RD Exam Candidate Handbook",
      url: "https://www.cdrnet.org/rd-handbook",
      checked: CHECKED,
    },
    {
      label: "CDR — RD Test Specifications and Study Outline, 1 Jan 2027 – 31 Dec 2031 (PDF)",
      url: "https://www.cdrnet.org/vault/2459/web//2027-2031%20RD%20Test%20Specifications%20and%20Expanded%20Study%20Outline.pdf",
      checked: CHECKED,
    },
    {
      label: "CDR — examination resources",
      url: "https://www.cdrnet.org/study",
      checked: CHECKED,
    },
  ],
};
