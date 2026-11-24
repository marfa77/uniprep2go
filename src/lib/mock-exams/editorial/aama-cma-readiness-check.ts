import type { MockEditorialBundle } from "./types";
import {
  FREE_DIAGNOSTIC_QUESTIONS,
  MOCK_PASS_PRICE_USD,
  mockAccessLine,
  requireMockConfig,
  topicLabel,
} from "./config-copy";

const CHECKED = "24 Nov 2026";
const SLUG = "aama-cma-readiness-check";
const config = requireMockConfig(SLUG);

export const aamaCmaEditorial: MockEditorialBundle = {
  slug: SLUG,
  howToPrepare: `Clinical competency is well over half of the scored exam, so weight your study the same way. Take the free ${FREE_DIAGNOSTIC_QUESTIONS}-question start, then spend most of your time on clinical workflow, infection control, procedures and pharmacology before moving to the general and administrative areas.`,
  sections: [
    {
      heading: "Who can sit the CMA (AAMA) exam?",
      paragraphs: [
        "The American Association of Medical Assistants says you must meet **one** of four routes: be a student or graduate of a medical assisting programme accredited by **CAAHEP** or **ABHES**; have been certified as a CMA (AAMA) before; be a medical assisting educator with at least **1,000 hours** in a postsecondary medical assisting programme; or meet the requirements of the Alternative Pathway.",
        "The application fee is **$125** for students and recent graduates (within 12 months of finishing the programme). For other routes it is **$125 for AAMA members and $250 for non-members**. Fees are non-refundable. Once AAMA approves you, the testing partner **PSI** emails you to schedule the exam at a test centre or with remote proctoring.",
      ],
    },
    {
      heading: "How is the exam structured?",
      paragraphs: [
        "The current content outline, effective through June 2027, says the exam has **200 multiple-choice questions**, of which **180 are scored** and **20 are pretest** questions that do not count. Pretest questions are mixed in and not identified, so answer every question carefully.",
        "The exam runs in **four 40-minute segments**. You can take three optional breaks between them, totalling 20 minutes (five, ten and five minutes); break time does not come out of your test time. A short tutorial before the start does not count either. No notes, calculators, phones or scratch paper are allowed in the testing room.",
      ],
    },
    {
      heading: "What do the 180 scored questions cover?",
      paragraphs: ["The outline splits the scored questions into three categories:"],
      bullets: [
        "**Clinical competency, 106 questions (59%):** clinical workflow (patient intake and discharge), safety and infection control, procedures and examinations, and pharmacology.",
        "**General, 38 questions (21%):** legal and ethical issues, and communication.",
        "**Administrative, 36 questions (20%):** billing, coding and insurance, and scheduling appointments and health information management.",
      ],
    },
    {
      heading: "Scoring, retakes and recertification",
      paragraphs: [
        "You get a pass or fail notice on screen when you finish, and an official score report by email about **24 hours** later. AAMA's current minimum passing score is a scaled **405**. The report shows your overall scaled score and bar graphs for the general, administrative and clinical areas, which helps you plan a retake if you need one.",
        "You may make up to **six attempts within 12 months** of your first attempt. There is no waiting period between attempts, but each one needs a new application and fee. A new outline applies to exams taken on or after July 2027, so check which one covers your test date. Once certified, you must **recertify every 60 months**, either by exam or with **60 continuing education units**, at least 30 of them AAMA CEUs, including 10 administrative, 10 clinical and 10 general.",
      ],
    },
    {
      heading: "What this check covers",
      paragraphs: ["This check samples the same three areas, grouped into four topics:"],
      bullets: [
        `**${topicLabel(config, "clinical")}:** vital signs, specimen collection, examinations and assisting with procedures.`,
        `**${topicLabel(config, "anatomy-pharm")}:** body systems and the drug knowledge behind the pharmacology questions.`,
        `**${topicLabel(config, "admin")}:** scheduling, records, billing, coding and insurance.`,
        `**${topicLabel(config, "law-ethics")}:** legal and ethical issues, communication, and infection control.`,
      ],
    },
    {
      heading: "A 4-week plan",
      paragraphs: [
        `**Week 1:** Free ${FREE_DIAGNOSTIC_QUESTIONS}-question start, then clinical workflow and infection control, since they open the largest category.`,
        "**Week 2:** Procedures, examinations and pharmacology. Write out drug classes and common abbreviations from memory.",
        "**Week 3:** Legal and ethical issues, communication, then billing, coding, insurance and scheduling.",
        `**Week 4:** Sit the full ${config.questionCount}-question / ${config.durationMinutes}-minute check on fresh draws, then practise at the real pace of 40-minute segments. Access: ${mockAccessLine(config)}. Comparing credentials? See the [NHA CCMA practice test](/mock-exams/nha-ccma-readiness-check).`,
      ],
    },
  ],
  faqs: [
    {
      question: "How many questions are on the CMA (AAMA) exam?",
      answer: `200 multiple-choice questions: 180 scored and 20 unscored pretest questions, under the content outline effective through June 2027 (checked ${CHECKED}).`,
    },
    {
      question: "How long is the CMA (AAMA) exam?",
      answer: "Four 40-minute segments, with three optional breaks between them totalling 20 minutes. Break time does not count against your test time.",
    },
    {
      question: "What is the passing score for the CMA (AAMA) exam?",
      answer: "AAMA's current minimum passing score is a scaled 405. You see pass or fail on screen and receive the official score report by email about 24 hours later.",
    },
    {
      question: "How much does the CMA (AAMA) exam cost?",
      answer: "$125 for students and graduates within 12 months of finishing their programme. Other candidates pay $125 as AAMA members or $250 as non-members. Fees are non-refundable.",
    },
    {
      question: "How many times can I retake the CMA (AAMA) exam?",
      answer: "Up to six attempts within 12 months of your first attempt, with no waiting period between them. Each attempt needs a new application and fee.",
    },
    {
      question: "How long is the UniPrep2Go CMA practice test?",
      answer: `The free start is ${FREE_DIAGNOSTIC_QUESTIONS} questions. The full check is ${config.questionCount} questions in ${config.durationMinutes} minutes, shorter than the real exam. Unlimited retakes are on UniPrep Mock Pass ($${MOCK_PASS_PRICE_USD}, unlimited mocks).`,
    },
  ],
  sources: [
    { label: "AAMA — CMA (AAMA) eligibility", url: "https://www.aama-ntl.org/certification/eligibility", checked: CHECKED },
    { label: "AAMA — Apply for the exam", url: "https://www.aama-ntl.org/certification/apply", checked: CHECKED },
    { label: "AAMA — Prepare for the exam", url: "https://www.aama-ntl.org/certification/prepare", checked: CHECKED },
    { label: "AAMA — Recertification", url: "https://www.aama-ntl.org/certification/recertification", checked: CHECKED },
    {
      label: "AAMA — CMA (AAMA) exam content outline (PDF)",
      url: "https://www.aama-ntl.org/docs/default-source/about-profession-and-credential/cma-exam/exam-content-outline-effective.pdf",
      checked: CHECKED,
    },
    {
      label: "AAMA — CMA (AAMA) exam application and policies (PDF)",
      url: "https://www.aama-ntl.org/docs/default-source/about-profession-and-credential/cma-exam/cma-aama-exam-app.pdf",
      checked: CHECKED,
    },
  ],
};
