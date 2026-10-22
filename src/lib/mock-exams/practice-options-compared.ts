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
    checkedDate: "2026-10-22",
    lead:
      "Official CFA Institute samples teach format; registered-candidate mocks live in the Learning Ecosystem. UniPrep2Go is an independent timed diagnostic with topic scores — not CFA Institute material.",
    rows: [
      {
        name: "UniPrep2Go CFA L1 readiness check",
        href: "/mock-exams/cfa-level-1-readiness-check",
        format: "25Q free diagnostic; full timed mock 60Q / 90 min with topic scores",
        access: "Free start (no signup for the 25Q); Mock Pass for retakes",
        notes:
          "Independent diagnostic across all 10 L1 topics. Official L1 is 180 MCQ in two 135-minute sessions (~4.5h content time).",
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
    ],
  },
};

export function getPracticeOptionsCompared(
  mockSlug: string,
): PracticeOptionsCompared | null {
  return TABLES[mockSlug] ?? null;
}
