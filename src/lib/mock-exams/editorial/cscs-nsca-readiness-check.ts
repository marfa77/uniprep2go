import type { MockEditorialBundle } from "./types";
import {
  FREE_DIAGNOSTIC_QUESTIONS,
  MOCK_PASS_PRICE_USD,
  mockAccessLine,
  requireMockConfig,
} from "./config-copy";

const CHECKED = "23 Nov 2026";
const SLUG = "cscs-nsca-readiness-check";
const config = requireMockConfig(SLUG);
const perTopic = config.topics.map((t) => `${t.label} (${t.questionCount ?? 0})`).join(", ");

export const cscsEditorial: MockEditorialBundle = {
  slug: SLUG,
  howToPrepare: `The CSCS has two separately scored sections, so prepare for each. Take the free ${FREE_DIAGNOSTIC_QUESTIONS}-question start to see whether the science or the coaching side is weaker, then spend most time on Program Design, the largest Practical/Applied domain. Drill terms and values in the [CSCS Anki deck](/decks/cscs-nsca-anki-deck).`,
  sections: [
    {
      heading: "CSCS exam facts: two sections, scoring and fees",
      paragraphs: [
        "The NSCA (National Strength and Conditioning Association) runs the Certified Strength and Conditioning Specialist (CSCS) exam.",
      ],
      bullets: [
        "**Scientific Foundations:** 80 scored plus 15 non-scored multiple-choice questions in **1.5 hours**.",
        "**Practical/Applied:** 110 scored plus 15 non-scored questions in **2.5 hours**, including **30–40 video and/or image items**.",
        "**Passing score:** a **scaled score of 70** or higher. You must pass **both sections**, and meet all other eligibility requirements, within **one year** of your first exam date.",
        "**Eligibility:** at least a bachelor's degree and a current CPR/AED certification.",
        "**Fees:** registration $340 for NSCA members or $475 for non-members. Retaking both sections costs the same; retaking one section is $250 for members or $385 for non-members.",
      ],
    },
    {
      heading: "What each CSCS section tests",
      paragraphs: ["Domains and scored question counts from the NSCA exam description:"],
      bullets: [
        "**Scientific Foundations:** Exercise Science 60% (48 questions): anatomy and physiology, biomechanics, bioenergetics, neuroendocrine physiology, adaptations and research basics. Sport Psychology 25% (20): motivation, motor learning and athlete mental health. Nutrition 15% (12): health, performance nutrition and supplements.",
        "**Practical/Applied:** Program Design 40% (44): needs analysis, exercise selection and order, intensity, volume, rest, progression and periodization. Exercise Technique 25% (28): resistance training, Olympic lifts, plyometrics, speed, agility and conditioning. Program Implementation 20% (22): coaching, testing and monitoring. Organization and Administration 15% (16): facility design, professional practice and litigation issues.",
        `This check samples both sides in four groups: ${perTopic}.`,
      ],
    },
    {
      heading: "A 4-week CSCS study plan",
      paragraphs: [
        `**Week 1:** Free ${FREE_DIAGNOSTIC_QUESTIONS}-question start, then Exercise Science: muscle physiology, energy systems and biomechanics. These underpin many Practical/Applied answers.`,
        "**Week 2:** Program Design. For each sport scenario, practise moving from a needs analysis to exercise choice, order, load, volume and rest. Drill load and rest ranges in the [Anki deck](/decks/cscs-nsca-anki-deck).",
        "**Week 3:** Exercise Technique and Program Implementation. Watch lifts and drills on video and name the fault you see, since the exam uses video and image items. Then cover test selection, order and interpretation.",
        `**Week 4:** Sport Psychology, Nutrition and Organization and Administration, then the full ${config.questionCount}-question / ${config.durationMinutes}-minute check twice on fresh draws. Access: ${mockAccessLine(config)}. Working with general fitness clients instead? Compare the [NSCA-CPT practice test](/mock-exams/nsca-cpt-readiness-check).`,
      ],
    },
    {
      heading: "What trips CSCS candidates",
      paragraphs: [],
      bullets: [
        "Preparing only for Scientific Foundations; the Practical/Applied section is longer and applies the science to programs.",
        "Memorizing load and rest tables without knowing which training goal each serves.",
        "Not practising with video or images, then meeting 30–40 of them on exam day.",
        "Letting the one-year window run out after passing just one section.",
      ],
    },
  ],
  faqs: [
    {
      question: "How many questions are on the CSCS exam?",
      answer:
        "Scientific Foundations has 80 scored plus 15 non-scored questions in 1.5 hours; Practical/Applied has 110 scored plus 15 non-scored in 2.5 hours (NSCA, checked 23 Nov 2026).",
    },
    {
      question: "What score do I need to pass the CSCS?",
      answer: "A scaled score of 70 or higher on each section. Both sections must be passed within one year of your first exam date.",
    },
    {
      question: "How much does the CSCS exam cost?",
      answer:
        "$340 for NSCA members or $475 for non-members. Retaking one section costs $250 or $385; retaking both costs the full registration fee.",
    },
    {
      question: "Who can take the CSCS?",
      answer: "Candidates with at least a bachelor's degree and a current CPR/AED certification.",
    },
    {
      question: "Does the CSCS have video questions?",
      answer: "Yes. The Practical/Applied section includes 30–40 video and/or image items across several domains.",
    },
    {
      question: "How long is the UniPrep2Go CSCS practice test?",
      answer: `The free start is ${FREE_DIAGNOSTIC_QUESTIONS} questions. The full check is ${config.questionCount} questions in ${config.durationMinutes} minutes across science and applied topics. Unlimited retakes are on UniPrep Mock Pass ($${MOCK_PASS_PRICE_USD}, unlimited mocks).`,
    },
  ],
  sources: [
    {
      label: "NSCA — CSCS exam description (sections, domains, scoring)",
      url: "https://www.nsca.com/cscs-exam-description/",
      checked: CHECKED,
    },
    {
      label: "NSCA — CSCS certification (requirements and fees)",
      url: "https://www.nsca.com/certification/cscs/",
      checked: CHECKED,
    },
  ],
};
