import type { MockEditorialBundle } from "./types";
import {
  FREE_DIAGNOSTIC_QUESTIONS,
  MOCK_PASS_PRICE_USD,
  mockAccessLine,
  requireMockConfig,
  topicLabel,
} from "./config-copy";

const CHECKED = "24 Nov 2026";
const SLUG = "nebosh-readiness-check";
const config = requireMockConfig(SLUG);

export const neboshEditorial: MockEditorialBundle = {
  slug: SLUG,
  howToPrepare: `The NEBOSH IGC is not a multiple-choice exam, so use this check to test what you know, then practise writing scenario answers. Take the free ${FREE_DIAGNOSTIC_QUESTIONS}-question start, drill hazards and controls in the [NEBOSH Anki deck](/decks/nebosh-anki-deck), and work through your Learning Partner's past scenarios under time.`,
  sections: [
    {
      heading: "What is the NEBOSH International General Certificate?",
      paragraphs: [
        "The NEBOSH International General Certificate in Occupational Health and Safety (IGC) is NEBOSH's foundation qualification for managing health and safety and controlling common workplace hazards. NEBOSH reports more than 265,000 holders, and offers it in English, Arabic, Russian, Turkish, Portuguese, Spanish and French.",
        "It sits at **SCQF Level 6** with 11 SCQF credit points, which NEBOSH says is comparable to RQF Level 3. It has two units, **GIC1** and **GIC2**. You study through a NEBOSH Learning Partner, which also sets the course fee.",
      ],
    },
    {
      heading: "How is the IGC assessed?",
      paragraphs: [
        "The IGC is not a multiple-choice test. NEBOSH describes a **digital, scenario-based assessment**: you have **24 hours** from 11am UK time on the exam date to access, complete and submit it. You read a workplace scenario and answer questions about it in writing, applying what you know to that situation.",
        "NEBOSH publishes GIC1 exam dates roughly monthly in English, with some sittings in other languages. Results come about three months after the exam. Check the current syllabus guide and your Learning Partner for the details of each unit.",
      ],
    },
    {
      heading: "How should you use a multiple-choice check for a written exam?",
      paragraphs: [
        "A scenario answer is only as good as the knowledge behind it. If you cannot recall the hierarchy of control, the main duties of an employer, or the controls for a hazard, you cannot apply them to a scenario. This check tests that recall quickly across the syllabus, so you can see which areas need more work before you start practising written answers.",
        "Use the results to plan, not to predict your grade. Strong scores here mean you know the content; you still need to practise explaining it in the context of a scenario.",
      ],
    },
    {
      heading: "What this check covers",
      paragraphs: ["The questions are grouped into five areas that follow the IGC syllabus:"],
      bullets: [
        `**${topicLabel(config, "hsm-systems-culture")}:** why health and safety matters, management systems, roles and responsibilities, culture, and monitoring and review.`,
        `**${topicLabel(config, "health-ergonomics")}:** physical and psychological health, musculoskeletal risks and manual handling.`,
        `**${topicLabel(config, "agents-workplace-hazards")}:** chemical and biological agents, and general workplace hazards such as slips, falls and vehicles.`,
        `**${topicLabel(config, "equipment-fire-electricity")}:** work equipment, fire and electrical safety.`,
        `**${topicLabel(config, "gic2-risk-assessment")}:** identifying hazards, evaluating risk, choosing controls and recording findings.`,
      ],
    },
    {
      heading: "A 4-week plan",
      paragraphs: [
        `**Week 1:** Free ${FREE_DIAGNOSTIC_QUESTIONS}-question start, then management systems and culture. Write one short scenario answer at the end of the week.`,
        "**Week 2:** Health, ergonomics and hazardous agents. Drill terms and controls daily in the [Anki deck](/decks/nebosh-anki-deck).",
        "**Week 3:** Work equipment, fire, electricity and risk assessment. Practise one full scenario from your Learning Partner under time.",
        `**Week 4:** Sit the full ${config.questionCount}-question / ${config.durationMinutes}-minute check on fresh draws, review every miss, and finish with another timed scenario. Access: ${mockAccessLine(config)}. Comparing qualifications? See [NEBOSH IGC vs International Diploma](/blog/nebosh-igc-vs-international-diploma-employers).`,
      ],
    },
  ],
  faqs: [
    {
      question: "What level is the NEBOSH IGC?",
      answer: `SCQF Level 6 with 11 credit points, which NEBOSH says is comparable to RQF Level 3 (nebosh.org.uk, checked ${CHECKED}).`,
    },
    {
      question: "Is the NEBOSH IGC exam multiple choice?",
      answer: "No. NEBOSH describes a digital, scenario-based assessment that you access, complete and submit within 24 hours from 11am UK time on the exam date.",
    },
    {
      question: "How long do NEBOSH IGC results take?",
      answer: "NEBOSH says results come about three months after the exam.",
    },
    {
      question: "Which languages is the IGC offered in?",
      answer: "English, Arabic, Russian, Turkish, Portuguese, Spanish and French.",
    },
    {
      question: "How much does the NEBOSH IGC cost?",
      answer: "Fees are set by each NEBOSH Learning Partner, so ask the one you plan to study with.",
    },
    {
      question: "How long is the UniPrep2Go NEBOSH practice test?",
      answer: `The free start is ${FREE_DIAGNOSTIC_QUESTIONS} questions. The full check is ${config.questionCount} questions in ${config.durationMinutes} minutes, all multiple choice, testing knowledge across the syllabus; it is not the NEBOSH scenario assessment. Unlimited retakes are on UniPrep Mock Pass ($${MOCK_PASS_PRICE_USD}, unlimited mocks).`,
    },
  ],
  sources: [
    {
      label: "NEBOSH — International General Certificate",
      url: "https://www.nebosh.org.uk/qualifications/international-general-certificate/",
      checked: CHECKED,
    },
    {
      label: "NEBOSH — Level 6 International Diploma (next step after the IGC)",
      url: "https://www.nebosh.org.uk/qualifications/nebosh-level-6-international-diploma-for-occupational-health-and-safety-management-professionals",
      checked: CHECKED,
    },
  ],
};
