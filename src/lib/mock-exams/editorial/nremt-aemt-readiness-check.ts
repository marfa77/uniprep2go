import type { MockEditorialBundle } from "./types";
import {
  FREE_DIAGNOSTIC_QUESTIONS,
  MOCK_PASS_PRICE_USD,
  mockAccessLine,
  requireMockConfig,
  topicLabel,
} from "./config-copy";

const CHECKED = "24 Nov 2026";
const SLUG = "nremt-aemt-readiness-check";
const config = requireMockConfig(SLUG);

export const nremtAemtEditorial: MockEditorialBundle = {
  slug: SLUG,
  howToPrepare: `Clinical judgment and medical emergencies make up most of the AEMT test plan, so practise working through scenarios step by step. Take the free ${FREE_DIAGNOSTIC_QUESTIONS}-question start, then study the test plan areas in order of weight, including the medications within the AEMT scope.`,
  sections: [
    {
      heading: "What does the AEMT exam look like?",
      paragraphs: ["The National Registry of Emergency Medical Technicians (NREMT) describes the Advanced EMT (AEMT) certification exam like this:"],
      bullets: [
        "**Length:** **135 questions**, of which **35** do not count towards your score, in **3 hours**.",
        "**Question types:** mostly multiple choice, plus multiple-response and technology-enhanced items, some linked to scenarios.",
        "**Scoring:** a scale of **100–1500**, with a passing point of **950**. Scores are reported only if you do not pass.",
        "**Where:** Pearson VUE test centres. **Fee:** **$159** per attempt.",
      ],
    },
    {
      heading: "What does the test plan cover?",
      paragraphs: ["NREMT's AEMT test plan weights the content like this:"],
      bullets: [
        "Clinical judgment: **31%–35%**",
        "Medical, obstetrics and gynaecology: **25%–29%**",
        "Cardiology and resuscitation: **11%–15%**",
        "Airway, respiration and ventilation: **9%–13%**",
        "Trauma: **7%–11%**",
        "EMS operations: **6%–10%**",
      ],
    },
    {
      heading: "Eligibility, psychomotor testing and retests",
      paragraphs: [
        "On the full education pathway you need current National Registry certification or a state licence at EMT level or higher, and a state-approved AEMT course completed within the past two years and verified by your programme director. Your Authorization to Test is valid for 90 days.",
        "Since 1 July 2024 the AEMT certification is **one exam, with no psychomotor exam**. If you fail, you wait **15 days** before retesting. You have **six attempts**; after three failures you must complete remedial education before the fourth. Certification is renewed **every two years**, by continuing education or by examination. Moving up later? See the [NREMT Paramedic practice test](/mock-exams/nremt-paramedic-readiness-check).",
      ],
    },
    {
      heading: "What trips AEMT candidates",
      paragraphs: [
        "With a third of the exam on clinical judgment, many questions describe a patient and ask what to do first, or next. Knowing a condition is not enough; you need to choose the right action at the right moment within the AEMT scope of practice.",
        "Rescheduling or cancelling through Pearson VUE costs $30, and a rescoring request costs $150 within 30 days of the exam, so book a date you can keep.",
      ],
      bullets: [
        "Choosing an intervention outside the AEMT scope.",
        "Skipping the primary assessment in a scenario that looks like a simple medical call.",
        "Mixing up medication indications and contraindications.",
      ],
    },
    {
      heading: "What this check covers",
      paragraphs: ["This check groups its questions into four areas:"],
      bullets: [
        `**${topicLabel(config, "airway")}:** airway management, oxygen and ventilation.`,
        `**${topicLabel(config, "pharm")}:** the medications within the AEMT scope, their indications and doses.`,
        `**${topicLabel(config, "medical")}:** medical, cardiac and obstetric emergencies.`,
        `**${topicLabel(config, "trauma")}:** trauma assessment and EMS operations.`,
      ],
    },
    {
      heading: "A 4-week plan",
      paragraphs: [
        `**Week 1:** Free ${FREE_DIAGNOSTIC_QUESTIONS}-question start, then medical and OB/GYN, the largest content area.`,
        "**Week 2:** Airway, then cardiology and resuscitation; learn the AEMT medications alongside the conditions they treat.",
        "**Week 3:** Trauma and EMS operations, then mixed scenario sets for clinical judgment.",
        `**Week 4:** Sit the full ${config.questionCount}-question / ${config.durationMinutes}-minute check on fresh draws and review every miss. Access: ${mockAccessLine(config)}.`,
      ],
    },
  ],
  faqs: [
    {
      question: "How many questions are on the NREMT AEMT exam?",
      answer: `135 questions, 35 of which do not count towards your score, in 3 hours (NREMT, checked ${CHECKED}).`,
    },
    {
      question: "What score do I need to pass the AEMT exam?",
      answer: "950 on a scale of 100–1500.",
    },
    {
      question: "Is there a psychomotor exam for AEMT?",
      answer: "No. Since 1 July 2024 the AEMT certification is one exam with no psychomotor exam.",
    },
    {
      question: "How much does the AEMT exam cost?",
      answer: "$159 per attempt.",
    },
    {
      question: "What happens if I fail the AEMT exam?",
      answer: "Wait 15 days to retest. You have six attempts, and remedial education is required after three failures.",
    },
    {
      question: "How long is the UniPrep2Go AEMT practice test?",
      answer: `The free start is ${FREE_DIAGNOSTIC_QUESTIONS} questions. The full check is ${config.questionCount} questions in ${config.durationMinutes} minutes; it is independent practice, not NREMT material. Unlimited retakes are on UniPrep Mock Pass ($${MOCK_PASS_PRICE_USD}, unlimited mocks).`,
    },
  ],
  sources: [
    { label: "NREMT — AEMT handbook: about the examination", url: "https://www.nremt.org/Handbooks/AEMT/About-The-Examination", checked: CHECKED },
    { label: "NREMT — AEMT and Paramedic certification examinations", url: "https://www.nremt.org/Pages/Examinations/AEMT-and-Paramedic-Certification-Examinations", checked: CHECKED },
    { label: "NREMT — AEMT full education program", url: "https://www.nremt.org/Document/AEMT-Full-Education-Program", checked: CHECKED },
    { label: "NREMT — AEMT handbook: certification process", url: "https://www.nremt.org/Handbooks/AEMT/Certification-Process", checked: CHECKED },
  ],
};
