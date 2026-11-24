import type { MockEditorialBundle } from "./types";
import {
  FREE_DIAGNOSTIC_QUESTIONS,
  MOCK_PASS_PRICE_USD,
  largestTopicsLine,
  mockAccessLine,
  requireMockConfig,
  topicLabel,
} from "./config-copy";

const CHECKED = "23 Nov 2026";
const SLUG = "servsafe-manager-mock";
const config = requireMockConfig(SLUG);
const target = config.passRule.passPercent;

export const servsafeManagerEditorial: MockEditorialBundle = {
  slug: SLUG,
  howToPrepare: `Check your state and local food safety rules first, since they decide whether training hours or a particular certificate is required. Take the free ${FREE_DIAGNOSTIC_QUESTIONS}-question start, then study temperatures, cross-contamination and HACCP, and drill numbers in the [ServSafe Manager Anki deck](/decks/servsafe-manager-anki-deck).`,
  sections: [
    {
      heading: "ServSafe Manager exam facts: questions, passing score and proctoring",
      paragraphs: [
        "The National Restaurant Association runs ServSafe. Passing the exam earns the **ServSafe Food Protection Manager Certification**, accredited by the ANSI National Accreditation Board (ANAB) under Conference for Food Protection (CFP) standards.",
      ],
      bullets: [
        "**Questions:** 90 multiple-choice questions, of which **10 are pilot questions** used for research and not scored.",
        "**Passing score:** **70% or higher**, which means at least **56 of the 80 scored questions** correct.",
        "**Proctoring:** the exam must be given under the supervision of a registered ServSafe Proctor. For a classroom exam the proctor must be physically present; a proctor giving it over Zoom or Skype makes the exam invalid, and self-proctoring is a security violation. Pearson VUE test centers and approved online proctoring are separate purchase options.",
        "**Formats and languages:** print and online exams. The print exam is offered in English, Spanish, Chinese, Korean, Japanese and Canadian French; the online exam in English and Spanish.",
        "**Course expiry:** unused online courses are valid for one year from purchase; a started Manager course must be finished within 90 days.",
      ],
    },
    {
      heading: "How many times you can retake the ServSafe Manager exam",
      paragraphs: [
        "You can retest only if you did not pass or your current certification is expiring, and each attempt needs a new exam purchase. You may take the exam **twice within 30 days**. If you fail the second attempt, wait **60 days** from your most recent attempt. No more than **four attempts in 12 months** are allowed, and every retest must be proctored.",
      ],
    },
    {
      heading: "What the ServSafe Manager exam covers",
      paragraphs: [
        "ServSafe does not publish per-topic question counts on its public pages. This check groups its items into five areas:",
      ],
      bullets: [
        `**${topicLabel(config, "foodborne-illness")}:** pathogens, symptoms, high-risk populations and how contamination happens.`,
        `**${topicLabel(config, "time-temperature")}:** the temperature danger zone, cooking, holding, cooling and reheating TCS food, and calibrating thermometers.`,
        `**${topicLabel(config, "personal-hygiene-contamination")}:** handwashing, glove use, illness exclusion and preventing cross-contact with allergens.`,
        `**${topicLabel(config, "cleaning-storage")}:** receiving and storage order, and cleaning versus sanitizing.`,
        `**${topicLabel(config, "management-haccp")}:** HACCP principles, active managerial control, inspections and training staff.`,
        `The largest blocks in this check are ${largestTopicsLine(config)}.`,
      ],
    },
    {
      heading: "A 2-week ServSafe Manager study plan",
      paragraphs: [
        `**Days 1–4:** Free ${FREE_DIAGNOSTIC_QUESTIONS}-question start, then foodborne illness and personal hygiene. Learn which symptoms and diagnoses require excluding a food handler versus restricting them.`,
        "**Days 5–9:** Time and temperature: write one table of minimum internal cooking temperatures, hot- and cold-holding limits and cooling steps, and drill it daily in the [Anki deck](/decks/servsafe-manager-anki-deck).",
        "**Days 10–12:** Receiving, storage, cleaning and sanitizing, then HACCP: practise naming the critical control point and the corrective action in short scenarios.",
        `**Days 13–14:** Sit the full ${config.questionCount}-question / ${config.durationMinutes}-minute mock. It passes at **${target}%**, a margin above ServSafe's 70%. Review every explanation and retake on a fresh draw. Access: ${mockAccessLine(config)}. For a topic-by-topic reading plan, see the [ServSafe Manager study guide](/blog/servsafe-manager-exam-study-guide-2026).`,
      ],
    },
    {
      heading: "What trips ServSafe Manager candidates",
      paragraphs: [],
      bullets: [
        "Mixing up cooking, holding and cooling temperatures, which are tested as exact numbers.",
        "Confusing cleaning with sanitizing, or storing raw meat above ready-to-eat food.",
        "Picking a reasonable action instead of the first or most important one in a scenario.",
        "Booking an exam without a registered proctor, which makes the result invalid.",
      ],
    },
  ],
  faqs: [
    {
      question: "How many questions are on the ServSafe Manager exam?",
      answer:
        "90 multiple-choice questions, of which 10 are unscored pilot questions, so 80 count toward your score (ServSafe FAQ, checked 23 Nov 2026).",
    },
    {
      question: "What score do I need to pass ServSafe Manager?",
      answer: "70% or higher: at least 56 of the 80 scored questions correct.",
    },
    {
      question: "How soon can I retake the ServSafe Manager exam?",
      answer:
        "You can take it twice within 30 days. After a second failed attempt you wait 60 days, and no more than four attempts are allowed in 12 months. Each retest needs a new exam purchase and a proctor.",
    },
    {
      question: "Can I take the ServSafe Manager exam online?",
      answer:
        "Yes, through ServSafe's approved online proctoring or at a Pearson VUE test center. A classroom proctor cannot give it remotely over Zoom or Skype.",
    },
    {
      question: "Is ServSafe Manager accredited?",
      answer:
        "Yes. The ServSafe Food Protection Manager Certification is accredited by ANAB under Conference for Food Protection standards. Check your state and local rules for what they accept.",
    },
    {
      question: "How long is the UniPrep2Go ServSafe Manager practice test?",
      answer: `The free start is ${FREE_DIAGNOSTIC_QUESTIONS} questions. The full mock is ${config.questionCount} questions in ${config.durationMinutes} minutes with a ${target}% readiness target. Unlimited retakes are on UniPrep Mock Pass ($${MOCK_PASS_PRICE_USD}, unlimited mocks).`,
    },
  ],
  sources: [
    {
      label: "ServSafe — Manager FAQs (questions, passing score, retakes)",
      url: "https://www.servsafe.com/ServSafe-Manager/FAQs",
      checked: CHECKED,
    },
    {
      label: "ServSafe — Get certified (proctoring, formats, languages)",
      url: "https://www.servsafe.com/ServSafe-Manager/Get-Certified",
      checked: CHECKED,
    },
    {
      label: "ServSafe — Manager program and ANAB-CFP accreditation",
      url: "https://www.servsafe.com/ServSafe-Manager",
      checked: CHECKED,
    },
  ],
};
