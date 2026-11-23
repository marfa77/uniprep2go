import type { MockEditorialBundle } from "./types";
import {
  FREE_DIAGNOSTIC_QUESTIONS,
  MOCK_PASS_PRICE_USD,
  mockAccessLine,
  requireMockConfig,
  topicLabel,
} from "./config-copy";

const CHECKED = "23 Nov 2026";
const SLUG = "ace-cpt-readiness-check";
const config = requireMockConfig(SLUG);

export const aceCptEditorial: MockEditorialBundle = {
  slug: SLUG,
  howToPrepare: `Get your adult CPR/AED with a hands-on skills check sorted first; ACE requires it to sit. Take the free ${FREE_DIAGNOSTIC_QUESTIONS}-question start, then study ACE's exam content outline domain by domain and drill terms in the [ACE CPT Anki deck](/decks/ace-cpt-anki-deck).`,
  sections: [
    {
      heading: "ACE Personal Trainer exam facts: length, scoring and delivery",
      paragraphs: [
        "The American Council on Exercise (ACE) awards the Personal Trainer Certification after a certification exam delivered by Meazure Learning.",
      ],
      bullets: [
        "**Questions:** **150 multiple-choice**, of which **125 are scored** and **25 are experimental** items that do not count. About 10% of questions are video-based.",
        "**Time:** **3 hours**.",
        "**Scoring:** a scaled score from **200 to 800**; you pass at **500 or more**. You see your scaled score and pass/fail status as soon as you submit, and failing candidates get domain-level feedback.",
        "**Delivery:** at an in-person proctored test site or by Live Remote Proctoring through Meazure Learning's ProctorU platform. Remote candidates book within a 60-day eligibility window.",
        "**Eligibility:** at least 18, a high school diploma or equivalent, a current adult CPR/AED certification with a hands-on skills check, and a government-issued photo ID with signature.",
        "**Fees:** $499 for a first attempt, $249 for a retake within one year of the first attempt, $149 to reschedule. After a year, a retake costs the first-time fee again.",
      ],
    },
    {
      heading: "What the ACE CPT exam asks, and how this check covers it",
      paragraphs: [
        "ACE builds the exam from a job analysis of what personal trainers do, grouped into domains in its published exam content outline. Questions present client situations and ask what the trainer should do next, and some use video of movement or technique.",
        "This check splits its questions evenly across four areas so you can compare them on one report:",
      ],
      bullets: [
        `**${topicLabel(config, "client-interview")}:** health history, risk screening, goal setting and when to refer.`,
        `**${topicLabel(config, "program-design")}:** choosing exercises, intensity, volume and progression for a given client.`,
        `**${topicLabel(config, "instruction")}:** cueing, observing technique and keeping clients safe.`,
        `**${topicLabel(config, "professional")}:** scope of practice, ethics, legal responsibilities and running a training business.`,
      ],
    },
    {
      heading: "Keeping the certification after you pass",
      paragraphs: [
        "ACE certifications renew every two years. You need **20 hours (2.0 CECs)** of ACE-approved continuing education per two-year cycle, with no more than 10 hours (1.0 CEC) counted per year. On-time renewal for one credential costs $129, with higher late-renewal fees.",
      ],
    },
    {
      heading: "A 4-week ACE CPT study plan",
      paragraphs: [
        `**Week 1:** Free ${FREE_DIAGNOSTIC_QUESTIONS}-question start. Read ACE's exam content outline and mark the tasks you have not done with real clients.`,
        "**Week 2:** Screening and program design: health history, readiness questionnaires, assessments, and building a progression for different client goals.",
        "**Week 3:** Instruction and professional practice: cueing and spotting, common technique faults, scope of practice and legal duties. Watch movement videos and name the fault before reading the answer.",
        `**Week 4:** Sit the full ${config.questionCount}-question / ${config.durationMinutes}-minute check on fresh draws and review every explanation. Access: ${mockAccessLine(config)}. Comparing certifications? See the [NASM CPT practice test](/mock-exams/nasm-cpt-readiness-check).`,
      ],
    },
    {
      heading: "What trips ACE CPT candidates",
      paragraphs: [],
      bullets: [
        "Answering from personal gym habits instead of the client-centred approach the scenario describes.",
        "Not practising with video, then meeting video-based items on exam day.",
        "Booking the exam before the CPR/AED certification with a hands-on skills check is in place.",
        "Missing the one-year window for the discounted retake.",
      ],
    },
  ],
  faqs: [
    {
      question: "How many questions are on the ACE Personal Trainer exam?",
      answer: "150 multiple-choice questions, 125 scored and 25 experimental, in 3 hours (ACE Certification Handbook, checked 23 Nov 2026).",
    },
    {
      question: "What score do I need to pass the ACE CPT exam?",
      answer: "A scaled score of 500 or more on a 200–800 scale.",
    },
    {
      question: "Can I take the ACE exam online?",
      answer: "Yes. ACE offers Live Remote Proctoring through Meazure Learning, as well as in-person test sites.",
    },
    {
      question: "How much does the ACE Personal Trainer exam cost?",
      answer: "$499 for a first attempt and $249 for a retake within one year; rescheduling costs $149.",
    },
    {
      question: "What do I need before I can sit the ACE CPT exam?",
      answer:
        "Be at least 18, have a high school diploma or equivalent, hold a current adult CPR/AED certification with a hands-on skills check, and bring a government-issued photo ID with signature.",
    },
    {
      question: "How long is the UniPrep2Go ACE CPT practice test?",
      answer: `The free start is ${FREE_DIAGNOSTIC_QUESTIONS} questions. The full check is ${config.questionCount} questions in ${config.durationMinutes} minutes across four areas. Unlimited retakes are on UniPrep Mock Pass ($${MOCK_PASS_PRICE_USD}, unlimited mocks).`,
    },
  ],
  sources: [
    {
      label: "ACE — Certification and Recertification Handbook (PDF)",
      url: "https://contentcdn.eacefitness.com/assets/certification/pdfs/Certification-Exam-Candidate-Handbook.pdf",
      checked: CHECKED,
    },
    {
      label: "ACE — Personal Trainer Certification",
      url: "https://www.acefitness.org/fitness-certifications/personal-trainer-certification/",
      checked: CHECKED,
    },
    {
      label: "ACE — Schedule your exam (fees)",
      url: "https://www.acefitness.org/fitness-certifications/schedule-your-exam/",
      checked: CHECKED,
    },
    {
      label: "ACE — Recertification",
      url: "https://www.acefitness.org/fitness-certifications/recertification/",
      checked: CHECKED,
    },
  ],
};
