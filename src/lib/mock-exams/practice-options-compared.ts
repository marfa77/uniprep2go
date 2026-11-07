/**
 * S5 — Free {exam} practice options compared.
 * Only rows with a verified public source + checked date. No guessed counts.
 */

export type PracticeOptionRow = {
  name: string;
  href: string;
  format: string;
  access: string;
  notes: string;
};

export type PracticeOptionsCompared = {
  mockSlug: string;
  examLabel: string;
  heading: string;
  checkedDate: string; // YYYY-MM-DD
  lead: string;
  rows: PracticeOptionRow[];
  sources: { label: string; url: string }[];
};

const TABLES: Record<string, PracticeOptionsCompared> = {
  "cfa-level-1-readiness-check": {
    mockSlug: "cfa-level-1-readiness-check",
    examLabel: "CFA Level I",
    heading: "Free CFA Level I practice options compared",
    checkedDate: "2026-10-24",
    lead:
      "Pages that rank for “CFA Level 1 practice test” mostly offer a full 180-question mock. UniPrep2Go is the shorter free diagnostic: 25 questions with no signup, then 60 timed questions and topic scores. Not CFA Institute material.",
    rows: [
      {
        name: "UniPrep2Go CFA Level 1 practice test",
        href: "/mock-exams/cfa-level-1-readiness-check",
        format: "25 free, no signup; full timed mock 60 questions / 90 minutes with topic scores",
        access: "Free start; Mock Pass for retakes",
        notes:
          "Independent diagnostic across all 10 Level I topics. Official Level I is 180 questions in two 135-minute sessions, three choices.",
      },
      {
        name: "Certus — free Level I mock",
        href: "https://certus.website/free-cfa-mock-exam",
        format: "180 questions, two sessions of 90, three choices; also a 15-question short start",
        access: "Free, no signup (page copy, checked 2026-10-24)",
        notes: "Full-length claim. We did not re-count the item bank.",
      },
      {
        name: "Studividend — free Level I mock",
        href: "https://studividend.com/free-cfa-level-1-mock-exam",
        format: "180 original questions, two sessions of 90 questions and 135 minutes",
        access: "Free, no account (page copy, checked 2026-10-24)",
        notes: "Full-length claim with on-page explanations and a topic score report.",
      },
      {
        name: "FinQuiz — free Level I mock",
        href: "https://www.finquiz.com/cfa/level-1/mock-exam/",
        format: "180 questions in two 90-question sessions",
        access: "Free account required (page copy, checked 2026-10-24)",
        notes: "One full-length mock before paid packs.",
      },
      {
        name: "CFA Institute — Level I sample questions (web)",
        href: "https://www.cfainstitute.org/programs/cfa-program/cfa-program-level-i-sample-questions",
        format: "10 on-page sample items (one per curriculum topic) + worked answers",
        access: "Free, public",
        notes: "Format familiarization; not a full-length timed mock.",
      },
      {
        name: "CFA Institute — extra Level I samples (form)",
        href: "https://www.cfainstitute.org/programs/cfa-program/cfa-program-level-i-sample-questions",
        format: "20 additional downloadable sample questions after form submit (30 total with on-page set)",
        access: "Free with form",
        notes: "Same public sample page; CFA Institute copy lists 10 + 20 via form.",
      },
      {
        name: "CFA Institute Learning Ecosystem practice + mock",
        href: "https://www.cfainstitute.org/programs/cfa-program/candidate-resources/mock-exam-and-practice-questions",
        format: "Curriculum-linked practice questions and official-style mock exam(s)",
        access: "Registered CFA Program candidates only",
        notes: "Closest official practice; not available without registration.",
      },
      {
        name: "CFA Institute Asset Classes quizzes",
        href: "https://interactive.cfainstitute.org/Asset-Classes-Quiz",
        format: "Short pre-assessment quizzes (Equities, Fixed Income, Derivatives, Alternatives)",
        access: "Free, public",
        notes: "Topic warm-ups, not a full Level I mock.",
      },
    ],
    sources: [
      {
        label: "CFA Institute — Level I sample questions",
        url: "https://www.cfainstitute.org/programs/cfa-program/cfa-program-level-i-sample-questions",
      },
      {
        label: "CFA Institute — mock exam and practice questions",
        url: "https://www.cfainstitute.org/programs/cfa-program/candidate-resources/mock-exam-and-practice-questions",
      },
      {
        label: "CFA Institute — Asset Classes Quiz",
        url: "https://interactive.cfainstitute.org/Asset-Classes-Quiz",
      },
      {
        label: "Certus — free CFA Level 1 mock",
        url: "https://certus.website/free-cfa-mock-exam",
      },
      {
        label: "Studividend — free CFA Level 1 mock",
        url: "https://studividend.com/free-cfa-level-1-mock-exam",
      },
      {
        label: "FinQuiz — CFA Level 1 mock exam",
        url: "https://www.finquiz.com/cfa/level-1/mock-exam/",
      },
    ],
  },
  "cfa-level-2-readiness-check": {
    mockSlug: "cfa-level-2-readiness-check",
    examLabel: "CFA Level II",
    heading: "Free CFA Level II practice options compared",
    checkedDate: "2026-10-24",
    lead:
      "The official Level II exam is 88 item-set questions in 22 vignettes. UniPrep2Go’s CFA Level 2 practice exam is 60 vignette questions (25 free, no signup). Not CFA Institute material.",
    rows: [
      {
        name: "UniPrep2Go CFA Level 2 practice exam",
        href: "/mock-exams/cfa-level-2-readiness-check",
        format: "25 free, no signup; full timed exam 60 vignette questions / 120 minutes with topic scores",
        access: "Free start; Mock Pass for retakes",
        notes:
          "Independent diagnostic across all 10 Level II topics. Official Level II is 88 items / 22 vignettes / 4 hours 24 minutes.",
      },
      {
        name: "CFA Institute — mock exam and practice questions",
        href: "https://www.cfainstitute.org/programs/cfa-program/candidate-resources/mock-exam-and-practice-questions",
        format: "Curriculum practice questions and official-style mocks in the Learning Ecosystem",
        access: "Registered CFA Program candidates only",
        notes: "Closest official practice. Level II Practice Pack adds paid mocks for registered candidates.",
      },
      {
        name: "300 Hours — free Level II mock",
        href: "https://300hours.com/free-cfa-level-2-mock-exam",
        format: "44 vignette questions, 2 hours 12 minutes, topic report after submit",
        access: "Free; the page asks for details before the result email (checked 2026-10-24)",
        notes: "Half an official sitting. Partner item sets, not CFA Institute material.",
      },
      {
        name: "UWorld — Level II mock exams",
        href: "https://finance.uworld.com/cfa/level-2/mock-exams/",
        format: "Paid mocks of 88 item-set questions each; the page lists 3 unique exams",
        access: "Paid (page copy, checked 2026-10-24)",
        notes: "Exam-length item sets. Not a free start.",
      },
    ],
    sources: [
      {
        label: "CFA Institute — Level II exam",
        url: "https://www.cfainstitute.org/programs/cfa-program/candidate-resources/level-ii-exam",
      },
      {
        label: "CFA Institute — mock exam and practice questions",
        url: "https://www.cfainstitute.org/programs/cfa-program/candidate-resources/mock-exam-and-practice-questions",
      },
      {
        label: "300 Hours — free CFA Level 2 mock",
        url: "https://300hours.com/free-cfa-level-2-mock-exam",
      },
      {
        label: "UWorld — CFA Level 2 mock exams",
        url: "https://finance.uworld.com/cfa/level-2/mock-exams/",
      },
    ],
  },
  "sie-full-mock": {
    mockSlug: "sie-full-mock",
    examLabel: "FINRA SIE",
    heading: "Free SIE practice options compared",
    checkedDate: "2026-10-23",
    lead:
      "FINRA’s free practice test matches official length but is untimed. UniPrep2Go is an independent timed diagnostic with topic scores — not FINRA exam material.",
    rows: [
      {
        name: "UniPrep2Go SIE full mock",
        href: "/mock-exams/sie-full-mock",
        format: "25Q free diagnostic; full timed mock 75Q / 105 min with topic scores",
        access: "Free start (no signup for the 25Q); Mock Pass for retakes",
        notes:
          "Independent diagnostic. Official SIE is 75 scored (+5 pretest) / 1h45 / pass 70 equated.",
      },
      {
        name: "UniPrep2Go SIE quick diagnostic",
        href: "/mock-exams/sie-quick-diagnostic",
        format: "25 timed questions / 35 minutes with topic scores",
        access: "Free timed start",
        notes: "Faster baseline before the 75Q mock; same product family, not FINRA material.",
      },
      {
        name: "FINRA — official SIE practice test",
        href: "https://www.finra.org/registration-exams-ce/qualification-exams/securities-industry-essentials-exam-sie-practice-test",
        format: "75 multiple-choice sample questions, untimed, feedback at the end",
        access: "Free on FINRA.org",
        notes:
          "Official format familiarization. FINRA says performance is not an absolute prediction of exam day.",
      },
      {
        name: "FINRA — SIE Content Outline (PDF)",
        href: "https://www.finra.org/sites/default/files/SIE_Content_Outline.pdf",
        format: "Official domain weights (12 / 33 / 23 / 7 scored items) — study map, not a quiz",
        access: "Free PDF",
        notes: "Blueprint for what to study; pair with a timed mock for pacing practice.",
      },
    ],
    sources: [
      {
        label: "FINRA — SIE practice test",
        url: "https://www.finra.org/registration-exams-ce/qualification-exams/securities-industry-essentials-exam-sie-practice-test",
      },
      {
        label: "FINRA — SIE exam overview",
        url: "https://www.finra.org/registration-exams-ce/qualification-exams/securities-industry-essentials-exam",
      },
      {
        label: "FINRA — SIE Content Outline (PDF)",
        url: "https://www.finra.org/sites/default/files/SIE_Content_Outline.pdf",
      },
    ],
  },
  "ptcb-pharmacy-technician-mock": {
    mockSlug: "ptcb-pharmacy-technician-mock",
    examLabel: "PTCE",
    heading: "PTCE practice options compared",
    checkedDate: "2026-10-31",
    lead:
      "PTCB sells two account tools. UniPrep2Go is the free timed diagnostic: 25 questions with no signup, then 90 questions in 110 minutes and domain scores. The official PTCE is 90 items (80 scored) in 1 hour 50 minutes, and the pass line is a scaled 1,400, not a percent. Not PTCB material.",
    rows: [
      {
        name: "UniPrep2Go PTCE practice test",
        href: "/mock-exams/ptcb-pharmacy-technician-mock",
        format: "25 free, no signup; full timed mock 90 questions / 110 minutes with domain scores",
        access: "Free start; Mock Pass for retakes",
        notes:
          "Independent diagnostic on the January 2026 outline, drawn from a 180-item bank. Readiness target is 70%. Official pass is scaled 1,400.",
      },
      {
        name: "PTCB — PTCE Practice Bank",
        href: "https://ptcb.org/official-ptcb-practice-tools/",
        format: "300+ retired PTCE questions and a 400-card study deck; the candidate sets the length, difficulty, and timer",
        access: "PTCB Account, $65, 90 days of unlimited use (PTCB page, checked 2026-10-31)",
        notes: "Not a single fixed-length mock. Access ends early if the candidate certifies during the 90 days.",
      },
      {
        name: "PTCB — Pre-PTCE",
        href: "https://ptcb.zendesk.com/hc/en-us/articles/9310795263757-At-a-Glance-PTCE-Practice-Bank",
        format: "90 questions in the look of the PTCE; one attempt, finished within 48 hours of starting",
        access: "PTCB Account, $29, 90-day authorization (PTCB help article, updated 2025-07-17, checked 2026-10-31)",
        notes: "PTCB tells candidates to use the Practice Bank first and the Pre-PTCE as the last check.",
      },
    ],
    sources: [
      {
        label: "PTCB — official practice tools",
        url: "https://ptcb.org/official-ptcb-practice-tools/",
      },
      {
        label: "PTCB — Practice Bank at a glance",
        url: "https://ptcb.zendesk.com/hc/en-us/articles/9310795263757-At-a-Glance-PTCE-Practice-Bank",
      },
    ],
  },
  "series-7-readiness-check": {
    mockSlug: "series-7-readiness-check",
    examLabel: "FINRA Series 7",
    heading: "Free Series 7 practice options compared",
    checkedDate: "2026-11-03",
    lead:
      "The official Series 7 is 130 questions (125 scored plus 5 unscored) in 3 hours 45 minutes, with an equated passing score of 72 and a $395 FINRA fee. UniPrep2Go is the shorter free diagnostic: 25 questions with no signup, then 60 timed questions and job-function scores. Not FINRA material.",
    rows: [
      {
        name: "UniPrep2Go Series 7 practice test",
        href: "/mock-exams/series-7-readiness-check",
        format: "25 free, no signup; full timed mock 60 questions / 90 minutes with job-function scores",
        access: "Free start; Mock Pass for retakes",
        notes:
          "Independent diagnostic drawn from a 120-item bank. Shorter than the 130-question sitting. Readiness target is 72.",
      },
      {
        name: "Achievable — free Series 7 practice exam",
        href: "https://achievable.me/exams/finra-series-7/free-practice-exam/",
        format: "125 questions, 3 hours 45 minutes, explanations after each answer",
        access: "Free, no price on the exam page (checked 2026-11-03)",
        notes:
          "Matches the 125 scored items and the official clock. A candidate also sees 5 unscored pretest items, which this free exam does not add.",
      },
      {
        name: "Kaplan — Series 7 packages",
        href: "https://www.kaplanfinancial.com/securities/series-7",
        format: "A Practice Exam that can be taken once, plus a SecuritiesPro QBank that builds exams of a length the candidate chooses",
        access: "Paid packages $139–$309, 5 months of online access (Kaplan page, checked 2026-11-03)",
        notes: "Kaplan does not publish how many questions are in that one-time Practice Exam.",
      },
      {
        name: "FINRA — Series 7 content outline",
        href: "https://www.finra.org/sites/default/files/2025-10/Series_7_Content_Outline.pdf",
        format: "Official map: 125 scored items across four functions, plus 5 unscored pretest items (130 on screen), 3 hours 45 minutes",
        access: "Free PDF",
        notes:
          "Study map, not a quiz. Passing score on the FINRA exam page is 72, equated, not a raw percent. Fee on that page is $395. SIE is a corequisite.",
      },
    ],
    sources: [
      {
        label: "FINRA — Series 7 exam",
        url: "https://www.finra.org/registration-exams-ce/qualification-exams/series7",
      },
      {
        label: "FINRA — Series 7 content outline (October 2025)",
        url: "https://www.finra.org/sites/default/files/2025-10/Series_7_Content_Outline.pdf",
      },
      {
        label: "Achievable — free Series 7 practice exam",
        url: "https://achievable.me/exams/finra-series-7/free-practice-exam/",
      },
      {
        label: "Kaplan — Series 7 exam prep",
        url: "https://www.kaplanfinancial.com/securities/series-7",
      },
    ],
  },
  "servsafe-manager-mock": {
    mockSlug: "servsafe-manager-mock",
    examLabel: "ServSafe Manager",
    heading: "ServSafe Manager practice options compared",
    checkedDate: "2026-11-04",
    lead:
      "The official ServSafe Manager exam is 90 multiple-choice questions (80 scored plus 10 unscored pilot) in 2 hours. UniPrep2Go is the free timed diagnostic: 25 questions with no signup, then 90 timed questions and food-safety topic scores. Not National Restaurant Association or ServSafe material.",
    rows: [
      {
        name: "UniPrep2Go ServSafe Manager practice test",
        href: "/mock-exams/servsafe-manager-mock",
        format: "25 free, no signup; full timed mock 90 questions / 120 minutes with topic scores",
        access: "Free start; Mock Pass for retakes",
        notes:
          "Independent diagnostic drawn from a 180-item bank. Official pass on the current ServSafe FAQ is 70% (56 of 80 scored); this mock uses a 75% UniPrep2Go readiness target. The older Examinee Handbook PDF still prints 75%.",
      },
      {
        name: "Effortless Math — free ServSafe Manager practice",
        href: "https://www.effortlessmath.com/servsafe-manager/",
        format: "90 original questions with explanations; suggested 120 minutes",
        access: "Free, no signup (page copy, checked 2026-11-04)",
        notes: "Independent study form. We did not re-count every item on the page.",
      },
      {
        name: "LineCheck Prep — free timed Manager run",
        href: "https://linecheckprep.com/",
        format: "One free full-length timed run: 90 questions, 80 scored, 120 minutes",
        access: "Free account, no card (homepage, checked 2026-11-04)",
        notes: "Claims FDA Food Code sourcing and a 70% (56/80) pass mark. Paid bank beyond the free run.",
      },
      {
        name: "ServSafe — Examinee Handbook (official map)",
        href: "https://www.servsafe.com/ServSafe/media/ServSafe/Documents/SSFS-Examinee-Handbook.pdf",
        format: "Official exam rules: 90 multiple-choice, 2 hours; handbook text still prints a 75% pass line",
        access: "Free PDF",
        notes:
          "Study map and examinee rules, not a practice quiz. Confirm the live pass mark on ServSafe Manager FAQs before you schedule — FAQ and handbook have disagreed.",
      },
    ],
    sources: [
      {
        label: "ServSafe Examinee Handbook (PDF)",
        url: "https://www.servsafe.com/ServSafe/media/ServSafe/Documents/SSFS-Examinee-Handbook.pdf",
      },
      {
        label: "ServSafe Manager Get Certified",
        url: "https://www.servsafe.com/ServSafe-Manager/Get-Certified",
      },
      {
        label: "Effortless Math — ServSafe Manager practice",
        url: "https://www.effortlessmath.com/servsafe-manager/",
      },
      {
        label: "LineCheck Prep",
        url: "https://linecheckprep.com/",
      },
    ],
  },
  "cdcp-readiness-check": {
    mockSlug: "cdcp-readiness-check",
    examLabel: "EXIN EPI CDCP",
    heading: "Free CDCP practice options compared",
    checkedDate: "2026-11-07",
    lead:
      "The official EXIN EPI CDCP exam is a fixed 40-question / 60-minute / 68% closed-book paper at the end of accredited EPI training — not a public infinite bank. Free third-party pages mostly offer untimed MCQ lists or large flashcard dumps. UniPrep2Go matches official length in the timed mock (25 free, then 40 in 60 minutes with topic scores) and pairs it with a 250-card ownable Anki deck from the same bank — independent prep, not EXIN or EPI material.",
    rows: [
      {
        name: "UniPrep2Go CDCP readiness check + Anki",
        href: "/mock-exams/cdcp-readiness-check",
        format: "25 free, no signup; full timed mock 40 questions / 60 minutes · 68% target · 5 topic scores",
        access: "Free start; Mock Pass for retakes; $9.99 / 250-card deck on Gumroad",
        notes:
          "250 unique MCQs in the bank (same as the Anki deck). Official form is 40Q/60m/68% — not a 100+ open bank.",
      },
      {
        name: "EXIN / EPI — CDCP preparation guide (official)",
        href: "https://www.epi-certification.com/uploads/file/exam%20prep/english_preparation_guide_cdcp_201706__.pdf",
        format: "Exam rules: 40 MCQ, 60 min, 68% pass, closed book; domain outline in PDF",
        access: "Free PDF",
        notes: "Exam sitting requires accredited EPI CDCP course — verify current edition on exin.com.",
      },
      {
        name: "EPI — 7-question facility quiz",
        href: "https://www.epi-ap.com/content/28/365/CDCP,_The_Leading_Globally_Recognised_Training_and_Certification_for_Data_Centre_Professionals",
        format: "Short ungraded quiz (7 items) on facility themes — no registration on EPI page copy",
        access: "Free on EPI site (checked 2026-11-07)",
        notes: "Awareness teaser, not a timed 40Q exam simulator.",
      },
      {
        name: "OpenExamPrep — EXIN CDCP practice",
        href: "https://open-exam-prep.com/practice/exin-cdcp",
        format: "Page claims 100+ question bank + interactive quiz; cites 40Q/60m/68% official spec",
        access: "Free start (page copy, checked 2026-11-07)",
        notes: "Independent — not EXIN-endorsed; confirm whether timed mode matches 40Q.",
      },
      {
        name: "ProctorReady — CDCP practice questions",
        href: "https://proctorready.com/cdcp/",
        format: "Untimed MCQ list with explanations (page shows 20+ stems, checked 2026-11-07)",
        access: "Free in browser",
        notes: "No timed 40-question session or topic report on the free page.",
      },
    ],
    sources: [
      { label: "EXIN EPI CDCP preparation guide (PDF)", url: "https://www.epi-certification.com/uploads/file/exam%20prep/english_preparation_guide_cdcp_201706__.pdf" },
      { label: "EPI CDCP overview", url: "https://www.epi-ap.com/content/28/365/CDCP,_The_Leading_Globally_Recognised_Training_and_Certification_for_Data_Centre_Professionals" },
      { label: "OpenExamPrep CDCP", url: "https://open-exam-prep.com/practice/exin-cdcp" },
      { label: "ProctorReady CDCP", url: "https://proctorready.com/cdcp/" },
    ],
  },
  "finland-kansalaisuuskoe-readiness-check": {
    mockSlug: "finland-kansalaisuuskoe-readiness-check",
    examLabel: "Kansalaisuuskoe (Finland 2027)",
    heading: "Free kansalaisuuskoe practice options compared",
    checkedDate: "2026-11-07",
    lead:
      "Finland’s official University of Helsinki learning package is still rolling out on migri.fi — third-party Finnish drills already compete on length and per-theme feedback. UniPrep2Go pairs a longer timed diagnostic (25 questions free with no signup, then 60 questions in 45 minutes from a 120-question bank with theme scores) with a matching 120-card Finnish Anki deck ($9 civic SKU when Gumroad checkout is live) — honest vs the Act’s valtaosa pass rule and provisional ~20–40 official MCQs.",
    rows: [
      {
        name: "UniPrep2Go kansalaisuuskoe readiness check",
        href: "/mock-exams/finland-kansalaisuuskoe-readiness-check",
        format: "25 free, no signup; full timed mock 60 questions / 45 minutes with four theme scores",
        access: "Free start; Mock Pass for retakes",
        notes:
          "Finnish stems; 120 unique questions (30 per theme); same bank as the 120-card Anki deck. Independent — not Migri material.",
      },
      {
        name: "Maahanmuuttovirasto — citizenship test overview",
        href: "https://migri.fi/kansalaisuuskoe",
        format: "Official pathway facts; full public question bank not published at check date",
        access: "Free information",
        notes: "Binding Q count, fee, and pass threshold may follow by decree — verify here.",
      },
      {
        name: "ENB Consulting — topic drills",
        href: "https://www.enb.fi/fi/tyokalut/kansalaisuuskoe-harjoitus/",
        format: "15 questions per theme (six themes on page copy), explanation after each answer",
        access: "Free, no account (page copy, checked 2026-11-07)",
        notes: "Independent study material — not official Migri items.",
      },
      {
        name: "Kansalaisuuskoulu",
        href: "https://kansalaisuuskoulu.fi/",
        format: "Free Finnish practice quiz with per-answer explanations and sources",
        access: "Free, no account (page copy, checked 2026-11-07)",
        notes: "Progressive study path; claims alignment with Migri topic list.",
      },
      {
        name: "Selkoraha — 20-question draw",
        href: "https://selkoraha.fi/fi/laskurit/kansalaisuuskoe-harjoitus",
        format: "20 MCQs drawn from a 40-question pool; practice pass line 75% on page",
        access: "Free in browser (checked 2026-11-07)",
        notes: "Shorter shuffle — official pass rule not published at check date.",
      },
      {
        name: "Kansalaisuuskurssi",
        href: "https://kansalaisuuskurssi.fi/",
        format: "Course waitlist + free practice (page copy); seven test cities listed",
        access: "Free practice without account (checked 2026-11-07)",
        notes: "Tracks Migri publishing timeline for 2026/2027.",
      },
    ],
    sources: [
      { label: "Migri — kansalaisuuskoe", url: "https://migri.fi/kansalaisuuskoe" },
      {
        label: "Migri — Citizenship Act change 2027",
        url: "https://migri.fi/-/kansalaisuuslaki-muuttuu-1.1.2027-suomessa-otetaan-kayttoon-kansalaisuuskoe",
      },
      { label: "ENB — kansalaisuuskoe harjoitus", url: "https://www.enb.fi/fi/tyokalut/kansalaisuuskoe-harjoitus/" },
      { label: "Kansalaisuuskoulu", url: "https://kansalaisuuskoulu.fi/" },
      { label: "Selkoraha — harjoitus", url: "https://selkoraha.fi/fi/laskurit/kansalaisuuskoe-harjoitus" },
      { label: "Kansalaisuuskurssi", url: "https://kansalaisuuskurssi.fi/" },
    ],
  },
};

export function getPracticeOptionsCompared(
  mockSlug: string,
): PracticeOptionsCompared | null {
  return TABLES[mockSlug] ?? null;
}
