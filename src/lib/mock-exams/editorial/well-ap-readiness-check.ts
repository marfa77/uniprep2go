import type { MockEditorialBundle } from "./types";
import {
  FREE_DIAGNOSTIC_QUESTIONS,
  MOCK_PASS_PRICE_USD,
  mockAccessLine,
  requireMockConfig,
  topicLabel,
} from "./config-copy";

const CHECKED = "24 Nov 2026";
const SLUG = "well-ap-readiness-check";
const config = requireMockConfig(SLUG);

export const wellApEditorial: MockEditorialBundle = {
  slug: SLUG,
  howToPrepare: `IWBI recommends 2 to 3 months of preparation. Take the free ${FREE_DIAGNOSTIC_QUESTIONS}-question start to see which WELL concepts are weakest, work through IWBI's "Get to Know the WELL AP Exam" guide and the WELL Forum's free prep space, and drill feature intents in the [WELL AP Anki deck](/decks/well-ap-anki-deck).`,
  sections: [
    {
      heading: "What does the WELL AP exam look like?",
      paragraphs: [
        "The WELL Accredited Professional (WELL AP) exam from the International WELL Building Institute (IWBI) tests your understanding of the concepts and implementation practices of the WELL Building Standard. IWBI gives these figures:",
      ],
      bullets: [
        "**115 multiple-choice questions** in **2.5 hours** once you start.",
        "**Score range 125–200**; the minimum passing score is **170**.",
        "**11 domains:** all the WELL concepts, plus WELL Certification and WELL at scale.",
        "**Closed book**, but the exam embeds some content: text and tables from published reference materials listed in IWBI's \"Get to Know the WELL AP Exam\" resource, plus the reference list and exam specifications.",
        "Taken **online** with ProProctor or **in person** at a testing centre.",
      ],
    },
    {
      heading: "What does it cost?",
      paragraphs: [
        "IWBI lists **$299** for exam registration, or **$150** for college-level students, educators and recent graduates. Registration includes the WELL AP Handbook, basic study resources, and articles and webcasts. IWBI also sells optional study bundles at $369 and $489, and group pricing per person falls from $299 for 2 to 9 people to $164 for 101 or more.",
      ],
    },
    {
      heading: "How do you keep the credential?",
      paragraphs: [
        "IWBI says the WELL AP credential is valid for two years, during which you must earn **30 continuing education (CE) hours** to maintain it. Passing lets you join WELL projects as a consultant, project administrator or advisor.",
      ],
    },
    {
      heading: "What this check covers",
      paragraphs: [
        "This check groups the WELL concepts into five areas so you can see where to focus:",
      ],
      bullets: [
        `**${topicLabel(config, "air-water-nourishment")}:** indoor air quality, water quality and access, and healthy food environments.`,
        `**${topicLabel(config, "light-movement-thermal")}:** circadian and visual lighting, active design, and thermal comfort.`,
        `**${topicLabel(config, "sound-materials")}:** acoustics, and reducing exposure to hazardous materials.`,
        `**${topicLabel(config, "mind-community")}:** mental health support, and the community concept's policies and programmes.`,
        `**${topicLabel(config, "well-certification-portfolio")}:** how projects register, document, verify and certify, including WELL at scale.`,
      ],
    },
    {
      heading: "A 6-week plan",
      paragraphs: [
        `**Weeks 1–2:** Free ${FREE_DIAGNOSTIC_QUESTIONS}-question start, then read the WELL AP Handbook and IWBI's exam guide. Note which concepts you score lowest on.`,
        "**Weeks 3–4:** One or two concepts a day: intents first, then the features and what each requires. Add cards daily in the [Anki deck](/decks/well-ap-anki-deck).",
        "**Week 5:** Certification process and WELL at scale; practise reading the kind of reference tables the exam embeds.",
        `**Week 6:** Sit the full ${config.questionCount}-question / ${config.durationMinutes}-minute check on fresh draws and review every miss. Access: ${mockAccessLine(config)}. Comparing credentials? See [WELL AP vs Fitwel](/blog/well-ap-vs-fitwel-certification-2026).`,
      ],
    },
  ],
  faqs: [
    {
      question: "How many questions are on the WELL AP exam?",
      answer: `115 multiple-choice questions, with 2.5 hours to finish once you start (IWBI, checked ${CHECKED}).`,
    },
    {
      question: "What score do I need to pass the WELL AP exam?",
      answer: "170 on a score range of 125–200.",
    },
    {
      question: "Is the WELL AP exam open book?",
      answer: "No, it is closed book, but it embeds some text and tables from published reference materials, as IWBI's exam guide describes.",
    },
    {
      question: "How much does the WELL AP exam cost?",
      answer: "$299, or $150 for college-level students, educators and recent graduates.",
    },
    {
      question: "How do I maintain the WELL AP credential?",
      answer: "Earn 30 continuing education hours in the two years the credential is valid.",
    },
    {
      question: "How long is the UniPrep2Go WELL AP practice test?",
      answer: `The free start is ${FREE_DIAGNOSTIC_QUESTIONS} questions. The full check is ${config.questionCount} questions in ${config.durationMinutes} minutes across the WELL concepts; it is shorter than IWBI's 115-question exam and is not IWBI material. Unlimited retakes are on UniPrep Mock Pass ($${MOCK_PASS_PRICE_USD}, unlimited mocks).`,
    },
  ],
  sources: [
    { label: "IWBI — Explore the WELL AP exam", url: "https://www.wellcertified.com/well-ap-exam/", checked: CHECKED },
    { label: "IWBI — WELL AP (pricing and maintenance)", url: "https://www.wellcertified.com/well-ap/", checked: CHECKED },
  ],
};
