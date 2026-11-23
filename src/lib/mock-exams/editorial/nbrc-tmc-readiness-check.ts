import type { MockEditorialBundle } from "./types";
import { getMockExamConfig } from "../configs";
import { FREE_DIAGNOSTIC_QUESTIONS } from "../free-diagnostic";
import { MOCK_PASS_PRICE_USD } from "../mock-pass";

const CHECKED = "23 Nov 2026";
const SLUG = "nbrc-tmc-readiness-check";
const config = getMockExamConfig(SLUG)!;
const accessLine = `**${FREE_DIAGNOSTIC_QUESTIONS} questions free, no signup**, then the full **${config.questionCount}-question / ${config.durationMinutes}-minute** check on UniPrep Mock Pass ($${MOCK_PASS_PRICE_USD}, unlimited mocks)`;
const perTopic = config.topics.map((t) => `${t.label} (${t.questionCount ?? 0})`).join(", ");

export const nbrcTmcEditorial: MockEditorialBundle = {
  slug: SLUG,
  howToPrepare: `If you can still test before 31 Dec 2026, decide now whether you are sitting the TMC or waiting for the RT Examination. Take the free ${FREE_DIAGNOSTIC_QUESTIONS}-question start to find weak clinical areas, which carry into both exams, and drill them in the [NBRC Anki deck](/decks/nbrc-tmc-anki-deck). For the full transition timeline, read [what replaces the TMC](/blog/nbrc-tmc-to-rt-exam-2027).`,
  sections: [
    {
      heading: "When does the TMC end, and what replaces it?",
      paragraphs: [
        "The NBRC is replacing the Therapist Multiple-Choice (TMC) Examination and the Clinical Simulation Examination (CSE) with one **Respiratory Therapy (RT) Examination**.",
      ],
      bullets: [
        "**15 Dec 2026:** last date the NBRC accepts TMC applications.",
        "**31 Dec 2026:** last day to take the TMC.",
        "**1 Oct 2026:** RT Examination applications opened in the Practitioner Portal.",
        "**4 Jan 2027:** the RT Examination becomes available.",
        "**31 Dec 2027:** last day of the CSE, only for candidates who passed the TMC at the high cut score before 31 Dec 2026.",
        "**31 Dec 2026:** the CRT-to-Registry admission route also ends.",
      ],
    },
    {
      heading: "If you have already passed the TMC",
      paragraphs: [
        "**Passed at the high cut score before 31 Dec 2026:** you can still take the CSE through 31 Dec 2027 to earn the RRT, or take the RT Examination instead and pass at its high cut score.",
        "**Already a CRT:** scoring below the low cut on the RT Examination does not take away your CRT. You can retake the RT Examination as many times as needed to earn the RRT.",
        "The Credential Maintenance Program does not change, because it is based on credentials held, not exams taken.",
      ],
    },
    {
      heading: "How the RT Examination works",
      bullets: [
        "**Length:** 185 multiple-choice items, of which 160 are scored and 25 are pretest, in **4 hours**.",
        "**Two cut scores:** reach the low cut and you earn the **CRT**; reach the high cut and you earn the **RRT**. There is no separate CSE for new candidates.",
        "**Fee:** $360 for new applicants, $300 for repeat applicants.",
        "**Eligibility from 2027:** age 18 or older, and graduation with at least an associate degree from a CoARC-supported or accredited entry-into-practice respiratory therapy program, or the CSRT RRT credential.",
      ],
      paragraphs: [],
    },
    {
      heading: "What the RT Examination covers",
      paragraphs: [
        "The RT Detailed Content Outline (effective January 2027) splits the 160 scored items into two portions:",
      ],
      bullets: [
        "**Breadth of Knowledge (100 items):** Patient Data (25), Management of Devices and Patient Safety Procedures (25), and Initiation and Modification of Interventions (50), at recall, application and analysis levels.",
        "**Depth of Clinical Judgment (60 items):** adult cases (50), including chronic lung disease (17), medical conditions such as infection and ARDS (15), cardiovascular (5), pre- and post-operative care (5), trauma (4) and neurological or neuromuscular (4); and children (10), pediatric (4) and neonatal (6).",
        "**Within clinical judgment:** 20 information-gathering and 40 decision-making items; 46 set in a hospital and 14 outside one.",
        "**Whole exam:** 15–18 items involve neonatal or pediatric patients.",
      ],
    },
    {
      heading: "Retakes and attempts after the switch",
      paragraphs: [
        "Earlier TMC and CSE attempts **do not count** toward RT Examination attempts. You can take the RT Examination **three times**; after that, you wait at least **120 days** between attempts.",
      ],
    },
    {
      heading: "How to use this check before and after the change",
      paragraphs: [
        `This check follows the TMC outline areas: ${perTopic}. It overlaps the RT Breadth of Knowledge portion, but this is **not** an RT Examination simulation and does not reproduce the clinical-judgment case mix. The NBRC offers a free official RT practice exam and paid Self-Assessment Examinations for that.`,
        `Study your weakest area against the RT outline, then retake on a fresh draw. Access: ${accessLine}.`,
      ],
    },
    {
      heading: "What trips candidates during the transition",
      paragraphs: [],
      bullets: [
        "Applying for the TMC after 15 Dec 2026 or planning to sit it in January 2027.",
        "Assuming a high TMC cut keeps the CSE open indefinitely; the window closes on 31 Dec 2027.",
        "Studying only adult acute care when neonatal, pediatric and outside-hospital cases are specified in the new outline.",
      ],
    },
  ],
  faqs: [
    {
      question: "When is the last day to take the NBRC TMC?",
      answer:
        "31 Dec 2026. The last date to apply is 15 Dec 2026. The RT Examination replaces it from 4 Jan 2027 (NBRC, checked 23 Nov 2026).",
    },
    {
      question: "What is the NBRC RT Examination?",
      answer:
        "One exam replacing the TMC and CSE: 185 multiple-choice items (160 scored, 25 pretest) in 4 hours. The low cut score earns the CRT and the high cut score earns the RRT.",
    },
    {
      question: "Can I still take the CSE in 2027?",
      answer:
        "Only if you passed the TMC at the high cut score before 31 Dec 2026. The CSE stays available to you through 31 Dec 2027.",
    },
    {
      question: "Do my TMC attempts count toward the RT Examination?",
      answer:
        "No. Previous TMC and CSE attempts do not count. You can take the RT Examination three times, then wait at least 120 days between attempts.",
    },
    {
      question: "Will I lose my CRT if I score low on the RT Examination?",
      answer: "No. Existing CRTs keep the credential and can retake the RT Examination to earn the RRT.",
    },
    {
      question: "Is the UniPrep2Go NBRC check an RT Examination simulation?",
      answer: `No. It follows the TMC outline areas that overlap the RT Breadth of Knowledge portion. The free start is ${FREE_DIAGNOSTIC_QUESTIONS} questions; the full check is ${config.questionCount} questions in ${config.durationMinutes} minutes, with unlimited retakes on UniPrep Mock Pass ($${MOCK_PASS_PRICE_USD}, unlimited mocks).`,
    },
  ],
  sources: [
    {
      label: "NBRC — Respiratory Therapy Examination and FAQs",
      url: "https://www.nbrc.org/rt/",
      checked: CHECKED,
    },
    {
      label: "NBRC — Examination changes coming in 2027",
      url: "https://www.nbrc.org/examination-changes-coming-in-2027-new-details-added/",
      checked: CHECKED,
    },
    {
      label: "NBRC — RT Examination Detailed Content Outline, effective January 2027 (PDF)",
      url: "https://www.nbrc.org/wp-content/uploads/2025/10/NBRC-RT-Detailed-Content-Outline-January-2027.pdf",
      checked: CHECKED,
    },
  ],
};
