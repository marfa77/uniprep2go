import type { MockEditorialBundle } from "./types";
import {
  FREE_DIAGNOSTIC_QUESTIONS,
  MOCK_PASS_PRICE_USD,
  mockAccessLine,
  requireMockConfig,
  topicLabel,
} from "./config-copy";

const CHECKED = "24 Nov 2026";
const SLUG = "california-real-estate-readiness-check";
const config = requireMockConfig(SLUG);

export const californiaRealEstateEditorial: MockEditorialBundle = {
  slug: SLUG,
  howToPrepare: `**California only.** Start with the free ${FREE_DIAGNOSTIC_QUESTIONS}-question start to see which of DRE's seven areas are weakest, then spend most of your time on practice and disclosures and on agency, which together are 42% of the salesperson exam. Drill California-specific rules in the [California real estate Anki deck](/decks/california-real-estate-exam-anki-deck).`,
  sections: [
    {
      heading: "How does the California DRE exam work?",
      paragraphs: [
        "**California only.** The California Department of Real Estate (DRE) runs its own licence exams instead of using a national testing company. DRE says the exams at its five centres (Fresno, La Palma, Oakland, Sacramento and San Diego) are currently electronic. You schedule through DRE eLicensing once your application is accepted, and DRE asks you to arrive 30 minutes early.",
      ],
      bullets: [
        "**Salesperson:** 150 multiple-choice questions in 3 hours; you need **70%** to pass. Exam fee **$100**.",
        "**Broker:** 200 multiple-choice questions in 4 hours; you need **75%** to pass. Exam fee **$150**.",
        "**Rescheduling:** $40 (salesperson) or $45 (broker). DRE fees are non-refundable under Business and Professions Code § 10207.",
      ],
    },
    {
      heading: "Where do the salesperson questions come from?",
      paragraphs: ["DRE publishes the share of the salesperson exam for each area:"],
      bullets: [
        "Practice of real estate and disclosures (including specialty areas): **25%**",
        "Laws of agency and fiduciary duties: **17%**",
        "Property ownership and land use controls and regulations: **15%**",
        "Property valuation and financial analysis: **14%**",
        "Contracts: **12%**",
        "Financing: **9%**",
        "Transfer of property: **8%**",
      ],
    },
    {
      heading: "What happens after the exam?",
      paragraphs: [
        "If you pass, DRE does not tell you your score. If you fail, you get your score and the percentage you scored in each subject area, which shows you exactly what to study before the retake.",
        "There is no limit on re-examinations within **two years** of filing your original application. Each costs the same as the first exam. Apply only after your failing result is released: DRE says a new application, fee or exam-change form sent before results are released forfeits the fee.",
      ],
    },
    {
      heading: "What this check covers",
      paragraphs: [
        "This check groups its questions into DRE's seven areas, weighted towards the largest ones:",
      ],
      bullets: [
        `**${topicLabel(config, "ca-practice")}** and **${topicLabel(config, "ca-agency")}**: disclosures, trust funds, agency relationships and fiduciary duties.`,
        `**${topicLabel(config, "ca-ownership")}** and **${topicLabel(config, "ca-valuation")}**: estates, zoning, appraisal approaches and market analysis.`,
        `**${topicLabel(config, "ca-contracts")}**, **${topicLabel(config, "ca-financing")}** and **${topicLabel(config, "ca-transfer")}**: contract elements, loans and lending law, deeds and escrow.`,
      ],
    },
    {
      heading: "A 4-week plan",
      paragraphs: [
        `**Week 1:** Free ${FREE_DIAGNOSTIC_QUESTIONS}-question start, then practice and disclosures every day; it is the largest area.`,
        "**Week 2:** Agency and fiduciary duties, plus property ownership and land use. Review California rules daily in the [Anki deck](/decks/california-real-estate-exam-anki-deck).",
        "**Week 3:** Valuation, contracts, financing and transfer. Keep each new term to one card and review the misses.",
        `**Week 4:** Sit the full ${config.questionCount}-question / ${config.durationMinutes}-minute check on fresh draws and review every miss by area. Access: ${mockAccessLine(config)}. For DRE test-centre logistics, see the [DRE test centres guide](/blog/california-real-estate-exam-dre-test-centers).`,
      ],
    },
  ],
  faqs: [
    {
      question: "How many questions are on the California real estate salesperson exam?",
      answer: `150 multiple-choice questions in 3 hours, with 70% needed to pass (California DRE, checked ${CHECKED}).`,
    },
    {
      question: "How is the broker exam different?",
      answer: "It has 200 questions in 4 hours, and you need 75% to pass. The exam fee is $150 instead of $100.",
    },
    {
      question: "Which topics carry the most weight?",
      answer: "Practice of real estate and disclosures (25%) and laws of agency and fiduciary duties (17%).",
    },
    {
      question: "Can I take the California real estate exam online?",
      answer: "No. DRE runs the exams electronically at its five centres in Fresno, La Palma, Oakland, Sacramento and San Diego.",
    },
    {
      question: "How many times can I retake it?",
      answer: "As often as you need within two years of your original application. Each re-examination costs the same as the first exam.",
    },
    {
      question: "How long is the UniPrep2Go California real estate practice test?",
      answer: `The free start is ${FREE_DIAGNOSTIC_QUESTIONS} questions. The full check is ${config.questionCount} questions in ${config.durationMinutes} minutes, weighted to DRE's areas; it is shorter than the 150-question DRE exam. Unlimited retakes are on UniPrep Mock Pass ($${MOCK_PASS_PRICE_USD}, unlimited mocks).`,
    },
  ],
  sources: [
    { label: "California DRE — Taking the exam", url: "https://www.dre.ca.gov/Examinees/TakingExam.html", checked: CHECKED },
    { label: "California DRE — Exam sites", url: "https://www.dre.ca.gov/examinees/ExamSites.html", checked: CHECKED },
    { label: "California DRE — Salesperson exam content", url: "https://www.dre.ca.gov/examinees/SalesExamContent.html", checked: CHECKED },
    { label: "California DRE — Fees", url: "https://www.dre.ca.gov/Licensees/Fees.html", checked: CHECKED },
  ],
};
