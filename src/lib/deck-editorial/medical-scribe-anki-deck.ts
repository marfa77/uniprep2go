import type { DeckEditorialBundle } from "./types";

const CHECKED = "24 Nov 2026";

export const medicalScribeDeckEditorial: DeckEditorialBundle = {
  slug: "medical-scribe-anki-deck",
  mockSlug: "medical-scribe-readiness-check",
  sections: [
    {
      heading: "What the medical scribe cards are built for",
      paragraphs: [
        "There is no single required scribe licence, and employers set their own rules, but one widely used credential is AHDPG's **Medical Scribe Certification Exam (MSCE)**. It has **100 multiple-choice and fill-in-the-blank questions** in **1 hour 15 minutes**, taken online with audio playback and no reference materials. AHDPG requires a score of **80 or higher** and reports results as pass or fail. Passing with fewer than 200 hours of documented scribe work earns the AMSP; with 200 hours you hold the CMSP.",
        "The cards cover what that exam and a first scribe shift both test: medical terminology and abbreviations, anatomy, the parts of a patient note, history and physical exam elements, and privacy rules. Each card puts a term, abbreviation or note element on the front and the meaning or correct placement on the back. Because some MSCE questions are fill-in-the-blank, the cards ask you to produce the term rather than pick it, which is the harder and more useful habit.",
      ],
    },
    {
      heading: "Studying at scribe pace with spaced repetition",
      paragraphs: [
        "**Plan:** take the free start of the [medical scribe practice test](/mock-exams/medical-scribe-readiness-check) to see which areas are weakest. Add 15 to 20 new cards a day, starting with terminology and abbreviations, since they come up in every note, and review every day.",
        "With 100 questions in 75 minutes you have well under a minute each, so in the final week stop adding cards and take timed runs. If you do not pass, AHDPG sets a 30-day wait and a full fee for each attempt, and the credential is valid for two years before you retake the current exam, so keep your cards in review after you pass.",
      ],
    },
  ],
  sources: [
    { label: "AHDPG — Medical Scribe Certification (MSCE)", url: "https://ahdpg.com/certification/medical-scribe/", checked: CHECKED },
    { label: "AHDPG — MSCE certification exam", url: "https://ahdpg.com/certification/medical-scribe/certification-exam/", checked: CHECKED },
  ],
};
