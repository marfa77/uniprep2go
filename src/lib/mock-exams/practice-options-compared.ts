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
          "Independent diagnostic. Official SIE is 75 scored (+10 pretest) / 1h45 / pass 70 equated.",
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
};

export function getPracticeOptionsCompared(
  mockSlug: string,
): PracticeOptionsCompared | null {
  return TABLES[mockSlug] ?? null;
}
