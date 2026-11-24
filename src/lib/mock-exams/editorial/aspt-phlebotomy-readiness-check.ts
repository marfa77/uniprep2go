import type { MockEditorialBundle } from "./types";
import {
  FREE_DIAGNOSTIC_QUESTIONS,
  MOCK_PASS_PRICE_USD,
  mockAccessLine,
  requireMockConfig,
  topicLabel,
} from "./config-copy";

const CHECKED = "24 Nov 2026";
const SLUG = "aspt-phlebotomy-readiness-check";
const config = requireMockConfig(SLUG);

export const asptPhlebotomyEditorial: MockEditorialBundle = {
  slug: SLUG,
  howToPrepare: `Contact ASPT early: applications close weeks before each exam date, and ASPT emails a study guide once you apply. Meanwhile, take the free ${FREE_DIAGNOSTIC_QUESTIONS}-question start, drill order of draw and tube additives in the [phlebotomy Anki deck](/decks/aspt-phlebotomy-anki-deck), and log your venipunctures and finger sticks for the application.`,
  sections: [
    {
      heading: "Who is ASPT?",
      paragraphs: [
        "The American Society of Phlebotomy Technicians (ASPT) was founded in 1983 and describes itself as the second oldest national certifying agency for phlebotomy. It runs its own phlebotomy certification exams, in person at scheduled sites and, for some candidates, online. ASPT also says it welcomes current members of NHA, ASCP and AMT.",
        "ASPT does not publish the number of questions, the time limit or the passing score on its exam pages, so this page does not quote them. Use ASPT's own study outline and information packet for the format of your exam.",
      ],
    },
    {
      heading: "How do you apply?",
      paragraphs: ["ASPT's exams page sets strict timing rules, so plan backwards from your exam date:"],
      bullets: [
        "Your application must reach ASPT **30 days** before the exam date; otherwise a **$25 late fee** applies, and nothing is accepted **less than three weeks** before the exam.",
        "Pay at least **4 weeks** ahead. ASPT no longer accepts walk-ins.",
        "Send **photo ID** with every fee submission, and include **venipuncture and finger-stick verification** (and a mounted EKG if you are applying for EKG).",
        "Applications sent by email carry a **$6** processing fee.",
        "ASPT emails a **study guide** after you apply, and members who apply receive a free official study outline.",
        "International exams cost **$400**, with a **$200** retake.",
      ],
    },
    {
      heading: "Online or in person?",
      paragraphs: [
        "In-person exams run at scheduled sites listed on ASPT's exams page. ASPT also offers online exams for phlebotomy and EKG and for medical assistants; its information packet says who qualifies. Online retakes are only for candidates who have **previously tested with ASPT**. Scores are not given by phone: ASPT emails them after **6 weeks**.",
      ],
    },
    {
      heading: "What this check covers",
      paragraphs: [
        "Whatever the exact ASPT format, the job knowledge is the same. This check groups its questions into four areas:",
      ],
      bullets: [
        `**${topicLabel(config, "venipuncture")}:** site selection, patient identification, needle and tourniquet technique, and complications.`,
        `**${topicLabel(config, "tubes")}:** tube colours and additives, and why the order of draw prevents carry-over.`,
        `**${topicLabel(config, "safety")}:** standard precautions, sharps, exposure response and patient safety.`,
        `**${topicLabel(config, "processing")}:** labelling, handling, centrifuging, transport and specimen rejection.`,
      ],
    },
    {
      heading: "Keeping your certification",
      paragraphs: ["ASPT certifications run on a calendar year:"],
      bullets: [
        "Certifications **expire on 31 December** each year.",
        "Renewal costs **$40**, submitted with a CEU quiz in ASPT's renewal window; the 2026 phlebotomy CEU quiz costs **$65** and is worth **6 CEUs**. Each extra certification adds $20, and a late fee of $30 applies.",
        "If you do not renew by 30 December, you need reinstatement or may have to retake the exam; a certification lapsed for **more than 3 years** means retaking the exam.",
      ],
    },
    {
      heading: "A 3-week plan",
      paragraphs: [
        `**Week 1:** Send your application and documentation, then take the free ${FREE_DIAGNOSTIC_QUESTIONS}-question start to find weak areas.`,
        "**Week 2:** Order of draw, tube additives and specimen handling every day with the [Anki deck](/decks/aspt-phlebotomy-anki-deck); work through ASPT's study guide when it arrives.",
        `**Week 3:** Sit the full ${config.questionCount}-question / ${config.durationMinutes}-minute check on fresh draws and review every miss. Access: ${mockAccessLine(config)}.`,
      ],
    },
  ],
  faqs: [
    {
      question: "How far ahead must I apply for an ASPT exam?",
      answer: `ASPT says applications must arrive 30 days before the exam date or a $25 late fee applies, and none are accepted less than three weeks before (aspt.org, checked ${CHECKED}).`,
    },
    {
      question: "How do I get my ASPT exam score?",
      answer: "By email after 6 weeks. ASPT does not give scores by phone.",
    },
    {
      question: "Can I take the ASPT exam online?",
      answer: "ASPT offers online exams for phlebotomy and EKG and for medical assistants; its information packet explains who qualifies. Online retakes are only for people who have tested with ASPT before.",
    },
    {
      question: "When does ASPT certification expire?",
      answer: "On 31 December each year. You renew for $40 with a CEU quiz during ASPT's renewal window.",
    },
    {
      question: "How many questions are on the ASPT phlebotomy exam?",
      answer: "ASPT does not publish this on its exam pages. Use the study outline and information packet ASPT sends you.",
    },
    {
      question: "How long is the UniPrep2Go phlebotomy practice test?",
      answer: `The free start is ${FREE_DIAGNOSTIC_QUESTIONS} questions. The full check is ${config.questionCount} questions in ${config.durationMinutes} minutes on core phlebotomy knowledge. It is independent, not ASPT material. Unlimited retakes are on UniPrep Mock Pass ($${MOCK_PASS_PRICE_USD}, unlimited mocks).`,
    },
  ],
  sources: [
    { label: "ASPT — home", url: "https://www.aspt.org/", checked: CHECKED },
    { label: "ASPT — exams and applications", url: "https://www.aspt.org/exams-2", checked: CHECKED },
    { label: "ASPT — online exams", url: "https://www.aspt.org/online-exams", checked: CHECKED },
    { label: "ASPT — renewal and CEU quizzes", url: "https://www.aspt.org/ceu", checked: CHECKED },
    { label: "ASPT — questions (FAQ)", url: "https://www.aspt.org/clients", checked: CHECKED },
  ],
};
