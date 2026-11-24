import type { DeckEditorialBundle } from "./types";

const CHECKED = "23 Nov 2026";

export const cemDeckEditorial: DeckEditorialBundle = {
  slug: "cem-anki-deck",
  mockSlug: "cem-readiness-check",
  sections: [
    {
      heading: "What the CEM exam asks for, and where cards help",
      paragraphs: [
        "AEE's Certified Energy Manager exam is **open book and open notes**, runs **four hours**, needs a **minimum score of 700**, and covers **14 mandatory subject sections** from the CEM Body of Knowledge. A calculator is required. Open book does not mean slow is fine: cards are for the formulas, conversions and rules you should not have to look up.",
      ],
      bullets: [
        "**Energy accounting and economics:** simple payback, net present value, life-cycle cost and unit conversions.",
        "**Electrical power systems and motors, lighting, and HVAC and building envelope:** the core equations and typical efficiency measures.",
        "**Audits and instrumentation, building automation, boilers and steam, and industrial systems:** what each measure saves and how it is checked.",
        "**Rates and tariffs, codes and standards, performance contracting and M&V, renewables and storage:** definitions and decision rules.",
      ],
    },
    {
      heading: "A spaced-repetition plan around the CEM training",
      paragraphs: [
        "AEE requires CEM candidates to attend an approved training program, and the exam is taken at that training or by remote proctor. Start cards before the course so seminar time goes on problem solving, not first exposure.",
        "**Plan:** take the free start of the [CEM readiness check](/mock-exams/cem-readiness-check), add 20 cards a day from your weakest Body of Knowledge areas, and review daily. Build your printed binder from the same material, so cards and reference tabs match.",
        "Pair each formula card with its units on the back. Many CEM mistakes are unit slips, between Btu, therms and kWh or between demand and energy charges, rather than a wrong method.",
        "If you need to retest, AEE requires at least 60 days between attempts, so use that window for daily card reviews on the sections in your diagnostic report.",
      ],
    },
  ],
  sources: [
    { label: "AEE — CEM Candidate Handbook v2.15 (PDF)", url: "https://www.aeecenter.org/wp-content/uploads/2024/03/CEMHandbook-2.15.pdf", checked: CHECKED },
    { label: "AEE — Certified Energy Manager", url: "https://www.aeecenter.org/certifications/certifications/certified-energy-manager", checked: CHECKED },
  ],
};
