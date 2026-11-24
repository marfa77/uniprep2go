import type { MockEditorialBundle } from "./types";
import {
  FREE_DIAGNOSTIC_QUESTIONS,
  MOCK_PASS_PRICE_USD,
  mockAccessLine,
  requireMockConfig,
  topicLabel,
} from "./config-copy";

const CHECKED = "24 Nov 2026";
const SLUG = "nasm-cpt-readiness-check";
const config = requireMockConfig(SLUG);

export const nasmCptEditorial: MockEditorialBundle = {
  slug: SLUG,
  howToPrepare: `The NASM-CPT exam is closed book, so you need the OPT model and assessment steps in your head. Take the free ${FREE_DIAGNOSTIC_QUESTIONS}-question start, then work through the areas where you miss most, and remember to book within 180 days of purchase.`,
  sections: [
    {
      heading: "What is the NASM-CPT exam?",
      paragraphs: [
        "The National Academy of Sports Medicine (NASM) Certified Personal Trainer credential is accredited by the National Commission for Certifying Agencies (NCCA). NASM describes the exam like this:",
      ],
      bullets: [
        "**120 questions**: 100 scored and 20 unscored pretest items.",
        "**Two hours**, closed book and proctored.",
        "**Scaled passing score of 70**.",
        "Taken **in person or online**, proctored by PSI.",
        "You must take it within **180 days** of purchase.",
      ],
    },
    {
      heading: "What do you need before the exam?",
      paragraphs: [
        "NASM requires a **high school diploma or GED** and current **CPR and AED certification** before you sit the exam. Plan the CPR/AED course early so it does not delay your booking.",
      ],
    },
    {
      heading: "How do you keep the credential?",
      paragraphs: [
        "NASM-CPTs recertify **every two years** by earning **2.0 CEUs**, which NASM describes as about 20 hours of approved continuing education.",
      ],
    },
    {
      heading: "How should you study a closed-book trainer exam?",
      paragraphs: [
        "Most questions describe a client and ask what you would assess, which phase of training fits, or how to progress or regress an exercise. That means you need to apply the model, not just name its parts. Practise by taking a client description and working through assessment, phase selection and programme variables in order.",
        "The scenario format also rewards knowing why. If you know why a compensation pattern points to particular overactive and underactive muscles, you can answer variations you have never seen before.",
      ],
    },
    {
      heading: "Booking and test day",
      paragraphs: [
        "Book early: NASM says you must take the exam within 180 days of purchase. You can choose a PSI test centre or an online proctored session; either way the exam is closed book and you have two hours. Make sure your CPR and AED certification is in place before your date, because NASM requires it before the exam.",
      ],
    },
    {
      heading: "What this check covers",
      paragraphs: ["This check groups its questions into four areas:"],
      bullets: [
        `**${topicLabel(config, "basics-anatomy")}:** anatomy, physiology and the phases of the OPT model.`,
        `**${topicLabel(config, "assessment")}:** client intake, posture and movement assessments, and what compensations indicate.`,
        `**${topicLabel(config, "program-design")}:** acute variables, progression and choosing modalities.`,
        `**${topicLabel(config, "nutrition-biz")}:** nutrition basics, behaviour change and the business of training.`,
      ],
    },
    {
      heading: "A 6-week plan",
      paragraphs: [
        `**Weeks 1–2:** Free ${FREE_DIAGNOSTIC_QUESTIONS}-question start, then anatomy and the OPT model; book CPR/AED if you have not.`,
        "**Weeks 3–4:** Assessments and program design, worked through client scenarios.",
        "**Week 5:** Nutrition, behaviour change and professional practice.",
        `**Week 6:** Sit the full ${config.questionCount}-question / ${config.durationMinutes}-minute check on fresh draws and review every miss. Access: ${mockAccessLine(config)}.`,
      ],
    },
  ],
  faqs: [
    {
      question: "How many questions are on the NASM-CPT exam?",
      answer: `120 questions, 100 scored and 20 unscored pretest items, in two hours (NASM, checked ${CHECKED}).`,
    },
    {
      question: "What score do I need to pass the NASM-CPT exam?",
      answer: "A scaled score of 70.",
    },
    {
      question: "Can I take the NASM-CPT exam online?",
      answer: "Yes. NASM says it can be taken in person or online, proctored by PSI.",
    },
    {
      question: "Do I need CPR to take the NASM-CPT exam?",
      answer: "Yes. NASM requires CPR and AED certification before the exam, along with a high school diploma or GED.",
    },
    {
      question: "How do I recertify as a NASM-CPT?",
      answer: "Every two years, with 2.0 CEUs (about 20 hours of approved continuing education).",
    },
    {
      question: "How long is the UniPrep2Go NASM-CPT practice test?",
      answer: `The free start is ${FREE_DIAGNOSTIC_QUESTIONS} questions. The full check is ${config.questionCount} questions in ${config.durationMinutes} minutes; it is independent practice, not NASM material. Unlimited retakes are on UniPrep Mock Pass ($${MOCK_PASS_PRICE_USD}, unlimited mocks).`,
    },
  ],
  sources: [
    { label: "NASM — Become a personal trainer (CPT exam and FAQ)", url: "https://www.nasm.org/products/become-a-personal-trainer", checked: CHECKED },
    { label: "NASM — home", url: "https://www.nasm.org/", checked: CHECKED },
  ],
};
