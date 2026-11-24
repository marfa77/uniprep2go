import type { MockEditorialBundle } from "./types";
import {
  FREE_DIAGNOSTIC_QUESTIONS,
  MOCK_PASS_PRICE_USD,
  mockAccessLine,
  requireMockConfig,
  topicLabel,
} from "./config-copy";

const CHECKED = "24 Nov 2026";
const SLUG = "nnaap-cna-readiness-check";
const config = requireMockConfig(SLUG);

export const nnaapCnaEditorial: MockEditorialBundle = {
  slug: SLUG,
  howToPrepare: `Find your state's nurse aide candidate handbook first: the state decides who tests you, the fees and the rules. Take the free ${FREE_DIAGNOSTIC_QUESTIONS}-question start for the written knowledge side, practise every skill out loud with a partner, and drill terms in the [CNA Anki deck](/decks/nnaap-cna-anki-deck).`,
  sections: [
    {
      heading: "Who runs the NNAAP nurse aide exam?",
      paragraphs: [
        "The National Nurse Aide Assessment Program (NNAAP) is used by a number of states to test nurse aides. NCSBN says it no longer develops or owns the NNAAP content and directs questions about content and scheduling to **Credentia**, which processes applications, schedules and administers the exam for participating states. Each state still sets its own registry rules, fees and handbook, so check the handbook for the state where you will work.",
        "The NNAAP has two parts: a **knowledge exam** (or an oral version) and a **skills evaluation** performed in front of a nurse aide evaluator.",
      ],
    },
    {
      heading: "Example: the NNAAP in Tennessee",
      paragraphs: [
        "These facts are **Tennessee-only**, from Credentia's Tennessee NNAAP handbook for the Tennessee Health Facilities Commission. Other states differ.",
      ],
      bullets: [
        "**Knowledge exam:** multiple choice in **2 hours**, with a warning when 15 minutes remain; you need **75% or better** to pass. An oral version is available, read aloud by recorded voice online.",
        "**Skills evaluation:** **5 skills**. Hand hygiene is always one; the other four are random, and one of them is always a measurement skill (blood pressure, radial pulse, respirations or urinary output). You have **30 minutes** for all five, with a warning at 25 minutes.",
        "**Skills pass rule:** all **5 of 5** skills must be passed, including every Critical Element Step, and each skill has its own cut score. An RN Nurse Aide Evaluator runs the skills test.",
        "**Fees:** knowledge exam **$35** (test center or online), oral exam $35, skills exam **$87**; fees are paid when you schedule and are not refundable. Nursing homes that employ candidates must pay their nurse aides' NNAAP fees.",
        "**Deadline:** a newly trained candidate must pass both parts within **two years** of finishing training.",
      ],
    },
    {
      heading: "What the knowledge exam and this check cover",
      paragraphs: [
        "The knowledge exam tests what a nurse aide needs to give safe, respectful care. This check groups its questions into four areas:",
      ],
      bullets: [
        `**${topicLabel(config, "adls-safety")}:** bathing, feeding, toileting, positioning, transfers and fall prevention.`,
        `**${topicLabel(config, "infection-vitals")}:** hand hygiene, protective equipment, and taking and reporting vital signs.`,
        `**${topicLabel(config, "psychosocial")}:** communicating with residents, dementia care and emotional needs.`,
        `**${topicLabel(config, "role-rights")}:** residents' rights, scope of the nurse aide role, and what to report and to whom.`,
      ],
    },
    {
      heading: "A 3-week plan for both parts",
      paragraphs: [
        `**Week 1:** Free ${FREE_DIAGNOSTIC_QUESTIONS}-question start. Read your state handbook's skills list and practise hand hygiene and one measurement skill every day until each step is automatic.`,
        "**Week 2:** Knowledge areas: safety, infection control and residents' rights. Drill terms and normal ranges in the [Anki deck](/decks/nnaap-cna-anki-deck), and practise two new skills a day with a partner reading the steps.",
        `**Week 3:** Sit the full ${config.questionCount}-question / ${config.durationMinutes}-minute check on fresh draws, then run full timed skills sets of five, including the measurement skill. Access: ${mockAccessLine(config)}.`,
      ],
    },
    {
      heading: "What trips nurse aide candidates",
      paragraphs: [],
      bullets: [
        "Missing a Critical Element Step, which can fail a skill on its own.",
        "Rushing the measurement skill; read and record the value carefully, as the handbook describes.",
        "Running short of time across five skills.",
        "Studying another state's rules instead of your own handbook.",
      ],
    },
  ],
  faqs: [
    {
      question: "Who administers the NNAAP exam?",
      answer:
        "Credentia administers the NNAAP for participating states; NCSBN no longer develops or owns its content (NCSBN, checked 24 Nov 2026). Your state sets fees and registry rules.",
    },
    {
      question: "How many skills are on the NNAAP skills evaluation?",
      answer:
        "In Tennessee, five: hand hygiene plus four random skills, one of them a measurement skill. All five must be passed within 30 minutes (Credentia Tennessee handbook).",
    },
    {
      question: "What score do I need on the NNAAP knowledge exam?",
      answer: "In Tennessee, 75% or better. Check your own state's handbook for its rule.",
    },
    {
      question: "How much does the NNAAP cost?",
      answer:
        "It depends on the state. In Tennessee the knowledge exam is $35 and the skills exam $87, and employing nursing homes must pay their aides' fees.",
    },
    {
      question: "Can I take the NNAAP knowledge exam orally?",
      answer: "Yes, an oral version is offered; in Tennessee it is read by recorded voice for online exams.",
    },
    {
      question: "How long is the UniPrep2Go CNA practice test?",
      answer: `The free start is ${FREE_DIAGNOSTIC_QUESTIONS} questions. The full check is ${config.questionCount} questions in ${config.durationMinutes} minutes on the knowledge side only; it does not test skills. Unlimited retakes are on UniPrep Mock Pass ($${MOCK_PASS_PRICE_USD}, unlimited mocks).`,
    },
  ],
  sources: [
    {
      label: "NCSBN — NNAAP and MACE",
      url: "https://www.ncsbn.org/exams/nnaap-and-mace.page",
      checked: CHECKED,
    },
    {
      label: "Credentia — Tennessee NNAAP handbook: introduction",
      url: "https://kb-tn.credentia.com/en/article/introduction",
      checked: CHECKED,
    },
    {
      label: "Credentia — Tennessee NNAAP knowledge (or oral) examination",
      url: "https://kb-tn.credentia.com/en/article/the-nnaap-knowledge-or-oral-examination",
      checked: CHECKED,
    },
    {
      label: "Credentia — Tennessee skills evaluation",
      url: "https://kb-tn.credentia.com/en/article/the-skills-evaluation",
      checked: CHECKED,
    },
    {
      label: "Credentia — Tennessee exam fees",
      url: "https://kb-tn.credentia.com/en/article/exam-fees",
      checked: CHECKED,
    },
  ],
};
