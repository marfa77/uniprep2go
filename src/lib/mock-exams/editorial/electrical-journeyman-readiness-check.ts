import type { MockEditorialBundle } from "./types";
import {
  FREE_DIAGNOSTIC_QUESTIONS,
  MOCK_PASS_PRICE_USD,
  mockAccessLine,
  requireMockConfig,
  topicLabel,
} from "./config-copy";

const CHECKED = "24 Nov 2026";
const SLUG = "electrical-journeyman-readiness-check";
const config = requireMockConfig(SLUG);

export const electricalJourneymanEditorial: MockEditorialBundle = {
  slug: SLUG,
  howToPrepare: `Start with your own state's licensing board: it sets the experience hours, the exam vendor and which edition of the National Electrical Code (NEC) you may bring. Take the free ${FREE_DIAGNOSTIC_QUESTIONS}-question start, then practise finding answers in the NEC quickly and drill articles and tables in the [journeyman electrician Anki deck](/decks/electrical-journeyman-anki-deck).`,
  sections: [
    {
      heading: "Who sets the journeyman electrician exam?",
      paragraphs: [
        "There is no national journeyman electrician exam. Each state (and in some places a city or county) licenses electricians, sets the experience requirement, and contracts a test vendor. What most exams share is the reference: they test the **National Electrical Code**, often as an open-book exam, plus electrical theory and calculations. Always check which NEC edition your board uses, because tables and article numbers change between editions.",
      ],
    },
    {
      heading: "Example: the Texas journeyman electrician exam",
      paragraphs: [
        "These facts are **Texas-only**, from the Texas Department of Licensing and Regulation (TDLR) and PSI's Texas candidate information bulletin. Other states differ.",
      ],
      bullets: [
        "**Experience:** at least **7,000 hours** of on-the-job training to apply for the exam; the full **8,000 hours** for the license. The application fee is **$30**, and you have one year from TDLR receiving your application to meet all requirements.",
        "**Two portions since 11 March 2025:** an **NEC Knowledge** portion of **59 items (3 unscored) in 130 minutes** and a **Calculations** portion of **26 items (2 unscored) in 110 minutes**. Unused time does not carry over between portions.",
        "**Passing score:** **70%** on each portion.",
        "**Fee:** **$78** for both portions; a retake is also $78. You can retake as many times as needed.",
        "**Open book:** you may bring a soft-bound copy of the NEC; loose-leaf, spiral-bound and ring-bound copies are not allowed. From **1 September 2026** the exams reference the **2026 NEC**.",
        "**Where:** PSI test sites across Texas, including Austin, Dallas, Houston, San Antonio and El Paso.",
      ],
    },
    {
      heading: "What the exam tests",
      paragraphs: [
        "In the Texas NEC Knowledge outline, the largest areas are branch circuits and conductors (10 items), wiring methods and materials (10), and equipment and devices (10), followed by services and separately derived systems, special occupancies, motors and generators, feeders, and renewable energy such as photovoltaics and EV chargers. The Calculations portion covers theory, service and load calculations, and related sizing. Unless a question says otherwise, conductors are copper.",
        "This check splits its questions evenly across four areas:",
      ],
      bullets: [
        `**${topicLabel(config, "nec")}:** definitions, Ohm's law and how the Code is organised.`,
        `**${topicLabel(config, "wiring")}:** raceways, cables, boxes and conductor fill.`,
        `**${topicLabel(config, "services")}:** service and feeder sizing, grounding and bonding, overcurrent protection.`,
        `**${topicLabel(config, "safety")}:** motor circuits, disconnects and safe work practice.`,
      ],
    },
    {
      heading: "A 4-week journeyman study plan",
      paragraphs: [
        `**Week 1:** Take the free ${FREE_DIAGNOSTIC_QUESTIONS}-question start. Tab your NEC by chapter and learn where the main tables live: conductor ampacity, conduit fill, box fill and grounding conductor sizing.`,
        "**Week 2:** Branch circuits, feeders and services: work load calculations step by step until you can set them up without notes.",
        "**Week 3:** Wiring methods, equipment and special occupancies. For each question you miss, find the article that answers it and write the article number on a card in the [Anki deck](/decks/electrical-journeyman-anki-deck).",
        `**Week 4:** Sit the full ${config.questionCount}-question / ${config.durationMinutes}-minute check twice on fresh draws, timing how long each Code look-up takes. Access: ${mockAccessLine(config)}.`,
      ],
    },
    {
      heading: "What trips journeyman candidates",
      paragraphs: [],
      bullets: [
        "Studying an older NEC edition than the one your board uses.",
        "Bringing a code book binding the test center does not allow.",
        "Spending too long searching the Code on early questions and running out of time.",
        "Treating calculations as an afterthought when, as in Texas, they are scored as their own portion.",
      ],
    },
  ],
  faqs: [
    {
      question: "Is the journeyman electrician exam the same in every state?",
      answer:
        "No. Each state (or local authority) sets its own experience rules, vendor, passing score and NEC edition. Most exams are based on the NEC.",
    },
    {
      question: "How many questions are on the Texas journeyman electrician exam?",
      answer:
        "Two portions: NEC Knowledge has 59 items (3 unscored) in 130 minutes, and Calculations has 26 items (2 unscored) in 110 minutes. Each needs 70% (PSI Texas bulletin and TDLR, checked 24 Nov 2026).",
    },
    {
      question: "Is the Texas journeyman exam open book?",
      answer:
        "Yes. You may use a soft-bound National Electrical Code; from 1 September 2026 the exams reference the 2026 NEC.",
    },
    {
      question: "How many hours do I need for a Texas journeyman license?",
      answer: "7,000 hours of on-the-job training to apply for the exam, and 8,000 hours for the license (TDLR).",
    },
    {
      question: "How much does the Texas journeyman electrician exam cost?",
      answer: "$78 for both portions, $78 for a retake, plus TDLR's $30 application fee.",
    },
    {
      question: "How long is the UniPrep2Go journeyman electrician practice test?",
      answer: `The free start is ${FREE_DIAGNOSTIC_QUESTIONS} questions. The full check is ${config.questionCount} questions in ${config.durationMinutes} minutes across NEC theory, wiring, services and safety. It is not a state exam. Unlimited retakes are on UniPrep Mock Pass ($${MOCK_PASS_PRICE_USD}, unlimited mocks).`,
    },
  ],
  sources: [
    {
      label: "TDLR — Electrician examinations",
      url: "https://www.tdlr.texas.gov/electricians/elecexam.htm",
      checked: CHECKED,
    },
    {
      label: "TDLR — Journeyman electrician license",
      url: "https://www.tdlr.texas.gov/electricians/apply/individuals/journeyman-electrician.htm",
      checked: CHECKED,
    },
    {
      label: "PSI — Texas electrician candidate information bulletin (PDF)",
      url: "https://test-takers.psiexams.com/api/content/bulletin/1682",
      checked: CHECKED,
    },
  ],
};
