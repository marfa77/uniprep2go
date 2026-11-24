import type { MockEditorialBundle } from "./types";
import {
  FREE_DIAGNOSTIC_QUESTIONS,
  MOCK_PASS_PRICE_USD,
  mockAccessLine,
  requireMockConfig,
  topicLabel,
} from "./config-copy";

const CHECKED = "24 Nov 2026";
const SLUG = "precision-nutrition-l1-readiness-check";
const config = requireMockConfig(SLUG);

export const precisionNutritionL1Editorial: MockEditorialBundle = {
  slug: SLUG,
  howToPrepare: `Work through the course chapter by chapter, using each chapter's knowledge check, and use the free ${FREE_DIAGNOSTIC_QUESTIONS}-question start here to find the areas to revisit before your exam attempt.`,
  sections: [
    {
      heading: "What is the PN Level 1 Nutrition Coaching Certification?",
      paragraphs: [
        "Precision Nutrition's Level 1 (PN L1) is a self-paced nutrition coaching course. Precision Nutrition describes it like this:",
      ],
      bullets: [
        "**No prerequisites** and **no deadlines**, with lifetime access to the course materials.",
        "**3 units and 21 chapters**: the Precision Nutrition approach (chapters 1–5), the science of nutrition (6–14), and working through the PN coaching process (15–21). Chapter 20 is new and covers coaching clients on GLP-1 medications.",
        "Each chapter has a narrated audio version and ends with a **knowledge check**.",
        "Most students spend **3–5 hours a week**.",
      ],
    },
    {
      heading: "How is it assessed?",
      paragraphs: [
        "Precision Nutrition says the course has built-in assessments and review materials, and that you get **3 additional attempts** at the exam if you need them. Its public pages do not give the number of questions, the passing score or whether the exam is open book, so this page does not quote them. Check your course dashboard for the current exam rules before you start.",
      ],
    },
    {
      heading: "Does it count for continuing education?",
      paragraphs: [
        "Precision Nutrition says PN L1 qualifies for continuing education credits with organisations including NASM, ACSM, ACE, AFAA, CIMSPA, CDR, CPTN, EREPs, ISSA, NBHWC and NSCA. It does not list the number of credits for each, so confirm with your own certifying body. Precision Nutrition also says its programmes are not officially accredited by national education boards.",
      ],
    },
    {
      heading: "What should you focus on?",
      paragraphs: [
        "The course is as much about coaching as about nutrition science. Expect to need both: the facts of energy balance, macronutrients and digestion, and the coaching process of assessing a client, choosing one small change, and adjusting based on how they respond. The scope of practice matters too: knowing what a coach should and should not do with a client's health conditions.",
      ],
    },
    {
      heading: "What this check covers",
      paragraphs: ["This check groups its questions into four areas:"],
      bullets: [
        `**${topicLabel(config, "coaching")}:** client assessment, communication and the coaching process.`,
        `**${topicLabel(config, "nutrition-sci")}:** energy balance, macronutrients, micronutrients and digestion.`,
        `**${topicLabel(config, "habits")}:** building habits and adjusting when a client stalls.`,
        `**${topicLabel(config, "scopes")}:** scope of practice, ethics and when to refer.`,
      ],
    },
    {
      heading: "A study plan alongside the course",
      paragraphs: [
        `**Start:** Free ${FREE_DIAGNOSTIC_QUESTIONS}-question start to see which areas need most attention.`,
        "**During the course:** finish each chapter's knowledge check before moving on, and keep notes on the coaching tools you would use with a real client.",
        `**Before your exam attempt:** sit the full ${config.questionCount}-question / ${config.durationMinutes}-minute check on fresh draws and review every miss against the relevant chapter. Access: ${mockAccessLine(config)}.`,
      ],
    },
  ],
  faqs: [
    {
      question: "Are there prerequisites for PN Level 1?",
      answer: `No. Precision Nutrition says there are no prerequisites and no deadlines, with lifetime access to the materials (checked ${CHECKED}).`,
    },
    {
      question: "How is the PN Level 1 course structured?",
      answer: "Three units and 21 chapters, each with an audio version and a knowledge check.",
    },
    {
      question: "How much time does PN Level 1 take?",
      answer: "Precision Nutrition says most students spend 3–5 hours a week, with no deadline.",
    },
    {
      question: "What if I fail the PN Level 1 exam?",
      answer: "Precision Nutrition says you get 3 additional attempts.",
    },
    {
      question: "Does PN Level 1 give continuing education credits?",
      answer: "Precision Nutrition says it qualifies for credits with NASM, ACSM, ACE, NSCA and others; check the number of credits with your certifying body.",
    },
    {
      question: "How long is the UniPrep2Go PN Level 1 practice test?",
      answer: `The free start is ${FREE_DIAGNOSTIC_QUESTIONS} questions. The full check is ${config.questionCount} questions in ${config.durationMinutes} minutes; it is independent practice, not Precision Nutrition material. Unlimited retakes are on UniPrep Mock Pass ($${MOCK_PASS_PRICE_USD}, unlimited mocks).`,
    },
  ],
  sources: [
    { label: "Precision Nutrition — Level 1 Nutrition Coaching Certification", url: "https://www.precisionnutrition.com/nutrition-certification-level-1-register-now/", checked: CHECKED },
    { label: "Precision Nutrition — Nutrition certifications", url: "https://www.precisionnutrition.com/nutrition-certification", checked: CHECKED },
  ],
};
