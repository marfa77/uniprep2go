import type { MockEditorialBundle } from "./types";
import {
  FREE_DIAGNOSTIC_QUESTIONS,
  MOCK_PASS_PRICE_USD,
  mockAccessLine,
  requireMockConfig,
  topicLabel,
} from "./config-copy";

const CHECKED = "24 Nov 2026";
const SLUG = "nremt-paramedic-readiness-check";
const config = requireMockConfig(SLUG);

export const nremtParamedicEditorial: MockEditorialBundle = {
  slug: SLUG,
  howToPrepare: `Clinical judgment is the largest part of the National Registry Paramedic exam, so practise reasoning through scenarios, not just recalling facts. Take the free ${FREE_DIAGNOSTIC_QUESTIONS}-question start, then work through the NREMT test plan area by area, weighting your time the way the test plan does.`,
  sections: [
    {
      heading: "What does the Paramedic exam look like?",
      paragraphs: ["The National Registry of Emergency Medical Technicians (NREMT) describes the Paramedic certification exam like this:"],
      bullets: [
        "**Computer adaptive:** the number and difficulty of questions vary by candidate, but the pass standard is the same for everyone.",
        "**Length:** between **110 and 150 questions**, of which **20** do not count towards your score, in **3 hours 30 minutes**.",
        "**Question types:** mostly multiple choice, plus multiple-response and technology-enhanced items, some linked to scenarios.",
        "**Scoring:** a scale of **100–1500**, with a passing point of **950**.",
        "**Where:** Pearson VUE test centres. **Fee:** **$175** per attempt.",
      ],
    },
    {
      heading: "What does the test plan cover?",
      paragraphs: ["NREMT's Paramedic test plan (in effect from 1 July 2024) weights the content like this:"],
      bullets: [
        "Clinical judgment: **34%–38%**",
        "Medical, obstetrics and gynaecology: **24%–28%**",
        "Cardiology and resuscitation: **10%–14%**",
        "Airway, respiration and ventilation: **8%–12%**",
        "EMS operations: **8%–12%**",
        "Trauma: **6%–10%**",
      ],
    },
    {
      heading: "Eligibility, psychomotor testing and retests",
      paragraphs: [
        "On the full education pathway you need current National Registry certification or a state licence at EMT level or higher, and a CAAHEP-accredited paramedic programme (or one with a CoAEMSP Letter of Review), completed within the past two years and verified by your programme director. Your Authorization to Test is valid for 90 days, so schedule promptly once it arrives.",
        "Since 1 July 2024 the Paramedic certification is a **single cognitive exam**: NREMT discontinued the ALS psychomotor exam. If you fail, you wait **15 days** before retesting. You have **six attempts**; after three failures you must complete remedial education before the fourth. Certification is renewed **every two years**. Rescheduling or cancelling through Pearson VUE costs $30, and a rescoring request costs $150 within 30 days of the exam.",
      ],
    },
    {
      heading: "What this check covers",
      paragraphs: ["This check groups its questions into four areas:"],
      bullets: [
        `**${topicLabel(config, "airway-critical")}:** airway management, ventilation and critical care decisions.`,
        `**${topicLabel(config, "cardiology")}:** rhythms, resuscitation and cardiac emergencies.`,
        `**${topicLabel(config, "trauma-medical")}:** trauma assessment and medical, obstetric and gynaecological emergencies.`,
        `**${topicLabel(config, "ops-special")}:** EMS operations and special populations.`,
      ],
    },
    {
      heading: "A 4-week plan",
      paragraphs: [
        `**Week 1:** Free ${FREE_DIAGNOSTIC_QUESTIONS}-question start, then medical and OB/GYN, the largest content area.`,
        "**Week 2:** Cardiology and resuscitation, then airway and ventilation; for each topic, practise what you would do first and why.",
        "**Week 3:** Trauma and EMS operations, plus mixed scenario sets for clinical judgment.",
        `**Week 4:** Sit the full ${config.questionCount}-question / ${config.durationMinutes}-minute check on fresh draws and review every miss. Access: ${mockAccessLine(config)}.`,
      ],
    },
  ],
  faqs: [
    {
      question: "How many questions are on the NREMT Paramedic exam?",
      answer: `Between 110 and 150 questions, 20 of which do not count towards your score, in 3 hours 30 minutes (NREMT, checked ${CHECKED}).`,
    },
    {
      question: "What score do I need to pass the NREMT Paramedic exam?",
      answer: "950 on a scale of 100–1500.",
    },
    {
      question: "Is there still a psychomotor exam?",
      answer: "No. NREMT discontinued the ALS psychomotor exam; since 1 July 2024 the Paramedic certification is a single cognitive exam.",
    },
    {
      question: "How much does the NREMT Paramedic exam cost?",
      answer: "$175 per attempt.",
    },
    {
      question: "What happens if I fail?",
      answer: "Wait 15 days to retest. You have six attempts, and remedial education is required after three failures.",
    },
    {
      question: "How long is the UniPrep2Go Paramedic practice test?",
      answer: `The free start is ${FREE_DIAGNOSTIC_QUESTIONS} questions. The full check is ${config.questionCount} questions in ${config.durationMinutes} minutes; it is not adaptive and is not NREMT material. Unlimited retakes are on UniPrep Mock Pass ($${MOCK_PASS_PRICE_USD}, unlimited mocks).`,
    },
  ],
  sources: [
    { label: "NREMT — Paramedic handbook: about the examination", url: "https://www.nremt.org/Handbooks/Paramedic/About-The-Examination", checked: CHECKED },
    { label: "NREMT — AEMT and Paramedic certification examinations", url: "https://www.nremt.org/Pages/Examinations/AEMT-and-Paramedic-Certification-Examinations", checked: CHECKED },
    { label: "NREMT — Paramedic full education program pathway", url: "https://nremt.org/Document/Paramedic-Full-Education-Program-Pathway", checked: CHECKED },
    { label: "NREMT — Paramedic handbook: certification process", url: "https://www.nremt.org/Handbooks/Paramedic/Certification-Process", checked: CHECKED },
  ],
};
