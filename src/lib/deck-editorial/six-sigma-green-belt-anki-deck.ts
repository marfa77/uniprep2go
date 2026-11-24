import type { DeckEditorialBundle } from "./types";

const CHECKED = "24 Nov 2026";

export const sixSigmaGreenBeltDeckEditorial: DeckEditorialBundle = {
  slug: "six-sigma-green-belt-anki-deck",
  mockSlug: "six-sigma-green-belt-readiness-check",
  sections: [
    {
      heading: "What the Green Belt cards are built for",
      paragraphs: [
        "Several bodies award a Green Belt; ASQ's **Certified Six Sigma Green Belt (CSSGB)** is one of the best known. The computer-based exam has **110 questions, 100 scored and 10 unscored**, with **4 hours 18 minutes** of exam time, delivered by Prometric at a test centre or remotely. ASQ asks for **three years** of full-time, paid work in one or more Body of Knowledge areas, and the exam fee is **$483**, with $100 off the first attempt for ASQ members. IASSC runs a separate Green Belt exam with its own rules.",
        "The cards follow the DMAIC structure: define, measure, analyse, improve and control, plus team and project basics. Each card puts a tool, term or formula on the front and its use or result on the back: what a control chart signals, when to use a fishbone or Pareto chart, how process capability is read.",
      ],
    },
    {
      heading: "Open book still needs recall",
      paragraphs: [
        "ASQ exams are **open book**, but references must stay bound, and with about two and a half minutes per question you cannot look everything up. The cards are for the material you should know without searching, so your references are left for the occasional formula or table. ASQ allows only a basic, silent calculator, so practise the arithmetic on one.",
        "**Plan:** take the free start of the [Six Sigma Green Belt practice test](/mock-exams/six-sigma-green-belt-readiness-check) to find your weakest DMAIC phase. Add 15 to 20 new cards a day, starting there, and review every day. In the final week, stop adding cards and take timed runs with the references you will bring. ASQ tests in set windows with application deadlines, so check the next window before you plan your study weeks.",
      ],
    },
  ],
  sources: [
    { label: "ASQ — Certified Six Sigma Green Belt", url: "https://www.asq.org/cert/six-sigma-green-belt", checked: CHECKED },
    { label: "ASQ — Taking the exam FAQ", url: "https://www.asq.org/cert/faq/faq-taking-exam", checked: CHECKED },
  ],
};
