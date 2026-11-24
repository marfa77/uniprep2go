import type { DeckEditorialBundle } from "./types";

const CHECKED = "24 Nov 2026";

export const ardmsSpiDeckEditorial: DeckEditorialBundle = {
  slug: "ardms-spi-anki-deck",
  mockSlug: "ardms-spi-readiness-check",
  sections: [
    {
      heading: "What the SPI cards are built for",
      paragraphs: [
        "The SPI exam is the physics and instrumentation exam behind every ARDMS credential: about 110 multiple-choice questions, scored on a 300–700 scale, with 555 needed to pass. Inteleos lists what it assesses, from the physics of ultrasound and clinical safety to transducers, image optimisation and Doppler.",
        "Physics questions turn on relationships: what happens to resolution when frequency changes, why an artifact appears, how the Doppler shift depends on angle. The cards put a change or an observation on the front and the effect and the reason on the back, so you practise reasoning through a relationship, not just recalling a definition. Formula cards ask you to state the formula and what each term means, then apply it to a simple worked example.",
      ],
    },
    {
      heading: "Studying SPI with spaced repetition",
      paragraphs: [
        "**Plan:** take the free start of the [SPI practice test](/mock-exams/ardms-spi-readiness-check) to find your weakest area. Add 15 to 20 new cards a day, starting with wave parameters and propagation, because transducers, resolution and Doppler all build on them. Review every day, and when a card keeps failing, go back to the underlying relationship rather than memorising the answer.",
        "In the final week, stop adding cards and take timed runs at the real pace: the exam gives you a little over two hours for its roughly 110 questions. Remember that SPI and your specialty exam must be passed within five years of each other, in either order, and that after a failed attempt Inteleos requires a 60-day wait before you can retake the exam.",
      ],
    },
  ],
  sources: [
    { label: "Inteleos — Sonography Principles and Instrumentation (SPI)", url: "https://www.inteleos.org/exam/sonography-principles-and-instrumentation/", checked: CHECKED },
  ],
};
