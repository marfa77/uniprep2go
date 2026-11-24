import type { DeckEditorialBundle } from "./types";

const CHECKED = "24 Nov 2026";

export const asptPhlebotomyDeckEditorial: DeckEditorialBundle = {
  slug: "aspt-phlebotomy-anki-deck",
  mockSlug: "aspt-phlebotomy-readiness-check",
  sections: [
    {
      heading: "What the phlebotomy cards are built for",
      paragraphs: [
        "ASPT, the American Society of Phlebotomy Technicians, has certified phlebotomists since 1983. It sends a study guide once you apply, and members receive a free official study outline. ASPT does not publish its question count or passing score on its exam pages, so the cards focus on the knowledge every phlebotomy exam relies on.",
        "Most points in phlebotomy come from exact detail: the order of draw, which additive is in which tube and why it matters, how to identify a patient, and when a specimen must be rejected. The cards put a tube colour, a situation or a step on the front and the additive, the reason or the correct action on the back, so you can recall it under time pressure rather than just recognise it.",
      ],
    },
    {
      heading: "Studying with spaced repetition before your ASPT date",
      paragraphs: [
        "**Plan:** take the free start of the [ASPT phlebotomy practice test](/mock-exams/aspt-phlebotomy-readiness-check) to see which areas are weakest. Begin with order of draw and tube additives, then add venipuncture technique, safety and specimen processing. Add 15 to 20 new cards a day and review every day.",
        "ASPT's timing rules are strict: your application must reach ASPT 30 days before the exam date, or a late fee applies, and nothing is accepted less than three weeks before. Plan your card schedule backwards from that date, so your hardest cards are mature by exam week, and keep reviewing after you pass: ASPT certifications expire on 31 December each year, and renewal includes a continuing education quiz.",
      ],
    },
  ],
  sources: [
    { label: "ASPT — exams and applications", url: "https://www.aspt.org/exams-2", checked: CHECKED },
    { label: "ASPT — renewal and CEU quizzes", url: "https://www.aspt.org/ceu", checked: CHECKED },
    { label: "ASPT — home", url: "https://www.aspt.org/", checked: CHECKED },
  ],
};
