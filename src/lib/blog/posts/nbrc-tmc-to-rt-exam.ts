import type { BlogPostDraft } from "../types";

const CHECKED = "23 Nov 2026";

export const nbrcTmcToRtExamPost: BlogPostDraft = {
  slug: "nbrc-tmc-to-rt-exam-2027",
  title: "NBRC TMC to RT Exam in 2027: What Changes and When",
  titleTag: "NBRC TMC to RT Exam 2027: Dates, CSE and Attempts",
  metaDescription:
    "The NBRC TMC ends 31 Dec 2026; the RT Examination starts 4 Jan 2027. Last dates, the CSE window, attempts, fees and 2027 eligibility, from NBRC.",
  publishedAt: "2026-11-23",
  eyebrow: "NBRC · Respiratory therapy credentials",
  clusterId: "nbrc",
  relatedSlugs: ["how-long-anki-decks-stay-current-exam-shelf-life"],
  intro:
    "**The NBRC is retiring the Therapist Multiple-Choice (TMC) Examination and, for new candidates, the Clinical Simulation Examination (CSE). From 4 January 2027 one Respiratory Therapy (RT) Examination awards both the CRT and the RRT.** If you are mid-way through the TMC and CSE path, the dates below decide what you can still do. Everything here comes from the NBRC's RT pages and the RT Detailed Content Outline, checked " +
    CHECKED +
    ". For timed practice on the clinical areas both exams share, use the [NBRC readiness check](/mock-exams/nbrc-tmc-readiness-check).",
  mockSlug: "nbrc-tmc-readiness-check",
  deckSlug: "nbrc-tmc-anki-deck",
  cta: {
    mockLabel: "Take the free NBRC readiness check",
    deckLabel: "NBRC Anki deck",
    summary:
      "Find weak clinical areas with the free [NBRC readiness check](/mock-exams/nbrc-tmc-readiness-check), then drill them with the [NBRC Anki deck](/decks/nbrc-tmc-anki-deck).",
  },
  sections: [
    {
      heading: "Key dates for the TMC-to-RT switch",
      blocks: [
        {
          type: "table",
          caption: "NBRC transition dates (nbrc.org/rt, checked " + CHECKED + ")",
          headers: ["Date", "What happens"],
          rows: [
            ["1 Oct 2026", "RT Examination applications open in the Practitioner Portal"],
            ["15 Dec 2026", "Last date the NBRC accepts TMC applications"],
            ["31 Dec 2026", "Last day to take the TMC; CRT-to-Registry admission route ends"],
            ["4 Jan 2027", "RT Examination available"],
            ["31 Dec 2027", "Last day of the CSE, only for those who passed the TMC at the high cut before 31 Dec 2026"],
          ],
        },
        {
          type: "p",
          text: "The Credential Maintenance Program does not change: it is based on credentials you hold, not on which exam you took.",
        },
      ],
    },
    {
      heading: "What happens if you have already taken the TMC?",
      blocks: [
        {
          type: "ul",
          items: [
            "**Passed the TMC at the high cut score before 31 Dec 2026:** you can take the CSE through 31 Dec 2027 to earn the RRT, or take the RT Examination and pass at its high cut score instead.",
            "**Passed at the low cut (you are a CRT):** you keep the CRT. Scoring below the low cut on the RT Examination does not remove it, and you can retake the RT Examination as often as needed to reach the RRT.",
            "**Relying on CRT-to-Registry admission:** that route ends on 31 Dec 2026. From 2027 you need to meet the new admission requirements below.",
          ],
        },
      ],
    },
    {
      heading: "How is the RT Examination different from the TMC and CSE?",
      blocks: [
        {
          type: "ul",
          items: [
            "**One exam, two cut scores:** reach the low cut for the CRT or the high cut for the RRT. New candidates no longer sit a separate CSE.",
            "**Length:** 185 multiple-choice items (160 scored, 25 pretest) in 4 hours.",
            "**Fee:** $360 for new applicants, $300 for repeat applicants.",
            "**Admission from 2027:** age 18 or older, plus at least an associate degree from a CoARC-supported or accredited entry-into-practice respiratory therapy program, or the CSRT RRT credential.",
          ],
        },
      ],
    },
    {
      heading: "What does the RT Examination cover?",
      blocks: [
        {
          type: "p",
          text: "The RT Detailed Content Outline (effective January 2027) divides the 160 scored items into two portions that are combined into one exam:",
        },
        {
          type: "table",
          caption: "RT Examination scored items by portion (NBRC Detailed Content Outline)",
          headers: ["Portion", "Area", "Items"],
          rows: [
            ["Breadth of Knowledge", "Patient Data", "25"],
            ["Breadth of Knowledge", "Management of Devices and Patient Safety Procedures", "25"],
            ["Breadth of Knowledge", "Initiation and Modification of Interventions", "50"],
            ["Depth of Clinical Judgment", "Adult cases (chronic lung disease, medical, cardiovascular, pre/post-operative, trauma, neuro)", "50"],
            ["Depth of Clinical Judgment", "Pediatric and neonatal cases", "10"],
          ],
        },
        {
          type: "p",
          text: "Clinical-judgment items split into 20 information-gathering and 40 decision-making items, with 46 set in a hospital and 14 outside one. Across the whole exam, 15 to 18 items involve neonatal or pediatric patients, and medical ethics items appear in both portions.",
        },
      ],
    },
    {
      heading: "How many attempts do you get after the switch?",
      blocks: [
        {
          type: "p",
          text: "Previous TMC and CSE attempts **do not count** toward the RT Examination. You may take the RT Examination three times; after that you must wait at least 120 days between attempts.",
        },
      ],
    },
    {
      heading: "How should you prepare now?",
      blocks: [
        {
          type: "steps",
          items: [
            {
              title: "Decide which exam you are sitting",
              body: "If you cannot apply by 15 Dec 2026 and test by 31 Dec 2026, plan for the RT Examination.",
            },
            {
              title: "Use the official practice tools",
              body: "The NBRC offers a free RT practice exam on the same software, and Self-Assessment Examinations sold through PSI's online store.",
            },
            {
              title: "Repair weak clinical areas",
              body: "The [NBRC readiness check](/mock-exams/nbrc-tmc-readiness-check) follows the TMC outline areas that overlap the RT Breadth of Knowledge portion. It is not an RT Examination simulation, but it shows which areas to drill in the [NBRC Anki deck](/decks/nbrc-tmc-anki-deck).",
            },
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      question: "What replaces the NBRC TMC exam?",
      answer:
        "The Respiratory Therapy (RT) Examination, available from 4 Jan 2027. One exam awards the CRT at the low cut score and the RRT at the high cut score.",
    },
    {
      question: "When is the last day to take the TMC?",
      answer: "31 Dec 2026. The NBRC stops accepting TMC applications on 15 Dec 2026.",
    },
    {
      question: "Is the CSE going away?",
      answer:
        "For new candidates, yes. Only people who pass the TMC at the high cut score before 31 Dec 2026 can still take the CSE, through 31 Dec 2027.",
    },
    {
      question: "How long is the RT Examination?",
      answer: "185 multiple-choice items, 160 scored and 25 pretest, in 4 hours.",
    },
    {
      question: "How much does the RT Examination cost?",
      answer: "$360 for new applicants and $300 for repeat applicants.",
    },
    {
      question: "Do my old TMC or CSE attempts count?",
      answer:
        "No. They do not count toward RT Examination attempts. You get three attempts, then a minimum 120-day wait between further attempts.",
    },
    {
      question: "Can I still use the CRT-to-Registry route in 2027?",
      answer:
        "No. It ends on 31 Dec 2026. From 2027, admission requires age 18+ and an associate degree or higher from a CoARC-supported or accredited entry-into-practice program, or the CSRT RRT credential.",
    },
  ],
  bottomLine:
    "Apply for the TMC by 15 Dec 2026 and test by 31 Dec 2026, or plan for the RT Examination from 4 Jan 2027. A high TMC cut keeps the CSE open only until the end of 2027. Sources: [NBRC RT Examination](https://www.nbrc.org/rt/), [Examination changes coming in 2027](https://www.nbrc.org/examination-changes-coming-in-2027-new-details-added/) and the [RT Detailed Content Outline](https://www.nbrc.org/wp-content/uploads/2025/10/NBRC-RT-Detailed-Content-Outline-January-2027.pdf), all checked " +
    CHECKED +
    ".",
};
