import type { MockEditorialBundle } from "./types";
import {
  FREE_DIAGNOSTIC_QUESTIONS,
  MOCK_PASS_PRICE_USD,
  mockAccessLine,
  requireMockConfig,
} from "./config-copy";

const CHECKED = "23 Nov 2026";
const SLUG = "enrolled-agent-readiness-check";
const config = requireMockConfig(SLUG);
const perTopic = config.topics.map((t) => `${t.label} (${t.questionCount ?? 0})`).join(", ");

export const enrolledAgentEditorial: MockEditorialBundle = {
  slug: SLUG,
  howToPrepare: `Get your PTIN first; it is step one of becoming an enrolled agent. Take the free ${FREE_DIAGNOSTIC_QUESTIONS}-question start to choose which SEE part to sit first (any order is allowed), then study that part's domains from PSI's Candidate Information Bulletin. Drill rules and thresholds in the [Enrolled Agent Anki deck](/decks/enrolled-agent-anki-deck).`,
  sections: [
    {
      heading: "SEE exam facts: parts, length, scoring and fee",
      paragraphs: [
        "The IRS sets the Special Enrollment Examination (SEE). From **1 March 2026** it is developed and delivered by **PSI Services**, replacing Prometric.",
      ],
      bullets: [
        "**Three parts**, all required, in any order: Part 1 Individuals, Part 2 Businesses, Part 3 Representation, Practices and Procedures.",
        "**Each part:** **100 multiple-choice questions** (85 scored, 15 unscored) in **3.5 hours**. Seat time is 4 hours, including a tutorial, a survey and two scheduled 10-minute breaks.",
        "**Scoring:** scaled from 200 to 800; **500 passes**. A passing score report shows a pass, not a number.",
        "**Fee:** **$317 per part**, paid when you schedule; not refundable or transferable. After passing all three parts, the enrollment application fee is $140.",
        "**Tax law tested:** the Internal Revenue Code, forms and publications as amended through 31 Dec 2025; questions relate to calendar year 2025 unless stated otherwise.",
        "**Remote testing:** currently only for candidates physically in the United States.",
      ],
    },
    {
      heading: "Testing windows, retakes and carryover",
      paragraphs: [
        "The SEE is generally offered from **1 May to the end of February**, with a blackout in **March and April**. The current domestic window runs **1 Jul 2026 to 28 Feb 2027**.",
        "Each part can be taken **four times per testing window**, with at least 24 hours between attempts at the same part; after four failed attempts, wait for the next window. A passed part carries over for **three years** from the date you passed it. Apply for enrollment within one year of passing your third part.",
        "**International candidates:** the IRS says scheduling and testing are delayed and a new start date has not been set. When it resumes, international testing will be remote-only with a proctor.",
      ],
    },
    {
      heading: "What each SEE part covers",
      paragraphs: ["Domains and scored question counts from PSI's Candidate Information Bulletin (revised 9 Oct 2026):"],
      bullets: [
        "**Part 1 — Individuals:** preliminary work with taxpayer data (14), income and assets (17), deductions and credits (17), taxation (15), advising the individual taxpayer (11), specialized returns for individuals (11).",
        "**Part 2 — Businesses:** business entities and considerations (30), business tax preparation (37), specialized returns and taxpayers (18).",
        "**Part 3 — Representation, Practices and Procedures:** practices and procedures (26), representation before the IRS (25), specific areas of representation (20), filing process (14).",
        `This check mixes all three parts: ${perTopic}.`,
      ],
    },
    {
      heading: "A study plan for your first SEE part",
      paragraphs: [
        `**Week 1:** Free ${FREE_DIAGNOSTIC_QUESTIONS}-question start. Many candidates start with the part closest to their daily work. Read that part's content outline in the bulletin and mark the domains you have never handled.`,
        "**Weeks 2–3:** Study the largest domains first: income, deductions and credits for Part 1; business tax preparation and entities for Part 2; practices, procedures and representation for Part 3. Drill thresholds and deadlines in the [Anki deck](/decks/enrolled-agent-anki-deck).",
        `**Week 4:** Sit the full ${config.questionCount}-question / ${config.durationMinutes}-minute check, review every explanation, and book the part while your three-year carryover clock is in mind. Access: ${mockAccessLine(config)}. Also weighing financial planning credentials? See the [CFP practice test](/mock-exams/cfp-certification-readiness-check).`,
      ],
    },
    {
      heading: "What trips SEE candidates",
      paragraphs: [],
      bullets: [
        "Studying current-year changes when the exam tests law as amended through 31 Dec 2025.",
        "Leaving the last part too late and losing an earlier pass to the three-year carryover limit.",
        "Planning to test in March or April, which is the blackout period.",
        "Underestimating Part 3, which tests procedure rules rather than calculations.",
      ],
    },
  ],
  faqs: [
    {
      question: "How many questions are on each part of the SEE?",
      answer:
        "100 multiple-choice questions per part, 85 scored and 15 unscored, in 3.5 hours (IRS Enrolled Agent FAQs, checked 23 Nov 2026).",
    },
    {
      question: "What is the passing score for the Enrolled Agent exam?",
      answer: "A scaled score of 500 on a scale from 200 to 800.",
    },
    {
      question: "How much does the SEE cost?",
      answer: "$317 per part, paid when you schedule. The enrollment application after passing costs $140.",
    },
    {
      question: "Who administers the SEE now?",
      answer: "PSI Services, since 1 March 2026. Prometric no longer develops or delivers the exam.",
    },
    {
      question: "Can I take the SEE outside the United States?",
      answer:
        "Not yet. The IRS says international scheduling and testing are delayed with no new start date. When it resumes, it will be remote with a proctor only.",
    },
    {
      question: "How long is the UniPrep2Go Enrolled Agent practice test?",
      answer: `The free start is ${FREE_DIAGNOSTIC_QUESTIONS} questions. The full check is ${config.questionCount} questions in ${config.durationMinutes} minutes across all three parts. Unlimited retakes are on UniPrep Mock Pass ($${MOCK_PASS_PRICE_USD}, unlimited mocks).`,
    },
  ],
  sources: [
    {
      label: "IRS — Enrolled agents frequently asked questions",
      url: "https://www.irs.gov/tax-professionals/enrolled-agents/enrolled-agents-frequently-asked-questions",
      checked: CHECKED,
    },
    {
      label: "IRS — Become an enrolled agent (PSI vendor change)",
      url: "https://www.irs.gov/tax-professionals/enrolled-agents/become-an-enrolled-agent",
      checked: CHECKED,
    },
    {
      label: "PSI — SEE Candidate Information Bulletin (revised 9 Oct 2026)",
      url: "https://test-takers.psigov.us/api/content/bulletin/12238",
      checked: CHECKED,
    },
  ],
};
