import type { DeckEditorialBundle } from "./types";

const CHECKED = "24 Nov 2026";

export const cchtDialysisDeckEditorial: DeckEditorialBundle = {
  slug: "ccht-dialysis-anki-deck",
  mockSlug: "ccht-dialysis-readiness-check",
  sections: [
    {
      heading: "What the CCHT cards are built for",
      paragraphs: [
        "The Nephrology Nursing Certification Commission (NNCC) runs the Certified Clinical Hemodialysis Technician (CCHT) exam: 150 questions in three hours, with a standard score of 95 needed to pass, which NNCC says means answering 74% of the questions correctly. It is computer based and available year-round, and the exam fee is $225. To be eligible you need a high school diploma or GED and a completed hemodialysis technician training programme with both classroom instruction and supervised clinical experience.",
        "Hemodialysis questions reward precise, safe practice: the principles of diffusion and ultrafiltration, machine checks, what a pressure alarm means, how water treatment is monitored, and how to respond to complications such as hypotension or cramping. The cards put a reading, alarm or patient sign on the front and the meaning and the right action on the back.",
      ],
    },
    {
      heading: "Studying for the CCHT with spaced repetition",
      paragraphs: [
        "**Plan:** take the free start of the [CCHT practice test](/mock-exams/ccht-dialysis-readiness-check) to find your weakest area. Add 15 to 20 new cards a day, starting with dialysis principles and machines, then patient care and complications, and review every day. Water treatment and infection control cards are worth daily review, because the details are easy to mix up.",
        "In the final week, stop adding cards and take timed runs at the real pace of a little over a minute per question. After you pass, NNCC requires recertification every three years with 3,000 hours of dialysis technician work and 30 hours of nephrology continuing education.",
      ],
    },
  ],
  sources: [
    { label: "NNCC — CCHT certification", url: "https://www.nncc-exam.org/certification/ccht", checked: CHECKED },
    { label: "NNCC — Recertification", url: "https://www.nncc-exam.org/recertification", checked: CHECKED },
  ],
};
