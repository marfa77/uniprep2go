/**
 * Long-form SEO copy for /mock-exams/v/[vertical] hubs.
 * Link lists alone are too thin for Google; each vertical gets unique Q&A-style body.
 */

import type { MockVerticalId } from "./types";

export type VerticalSeoCopy = {
  /** 60–120 word direct answer under the H1 */
  lead: string;
  /** Extra H2 sections rendered after the exam list */
  sections: Array<{ heading: string; body: string }>;
  faqs: Array<{ question: string; answer: string }>;
};

export const verticalSeoCopy: Partial<Record<MockVerticalId, VerticalSeoCopy>> = {
  building: {
    lead:
      "UniPrep2Go’s building certification path groups free timed readiness checks for HVAC refrigerant work (EPA Section 608), green-building credentials (LEED Green Associate, LEED AP BD+C, WELL AP), energy and safety pathways (CEM, NEBOSH, CFPS), surveying (MRICS), data-centre facilities (CDCP), and related project credentials. Each mock scores by topic, then links to an Anki deck for weak-domain repair — independent practice, not official USGBC, EPA, RICS, or NFPA material.",
    sections: [
      {
        heading: "Which building certifications belong here?",
        body:
          "Start with EPA 608 if you handle refrigerants, then LEED Green Associate for green-building literacy and LEED AP BD+C when you need credit-level design judgment. Pair NEBOSH or CFPS for occupational and fire-protection safety careers, MRICS for surveyor APC pathways, and CDCP / CEM / ASHRAE-oriented checks when your role is plant, energy, or data-centre operations. Use the free mock first so you know which domain cluster to drill before buying flashcards.",
      },
      {
        heading: "How to use these free building practice tests",
        body:
          "Take one timed readiness check under exam-like conditions, read the topic report, and only then open the matching Anki deck for spaced repetition on failed domains. Confirm current outlines, fees, and eligibility on the official certifier site linked from each mock page — UniPrep2Go does not sell official exam vouchers or redistribute live exam items.",
      },
    ],
    faqs: [
      {
        question: "What building certification practice tests are free on UniPrep2Go?",
        answer:
          "Free timed mocks include EPA 608, LEED Green Associate, LEED AP BD+C, WELL AP, NEBOSH, CFPS, MRICS, CDCP, CEM, BMS/BAS, and related building pathways listed on this hub — each with topic scoring and answer review.",
      },
      {
        question: "Are these official EPA, USGBC, or RICS exams?",
        answer:
          "No. UniPrep2Go readiness checks are independent study aids modeled on published public outlines. They are not affiliated with or endorsed by the U.S. EPA, USGBC/GBCI, RICS, NEBOSH, NFPA, or other certifiers.",
      },
      {
        question: "Should I take the mock or buy the Anki deck first?",
        answer:
          "Take the free mock first. The report shows which topics failed; the linked Anki deck is for daily repair of those gaps, not a substitute for official candidate handbooks.",
      },
    ],
  },
  trades: {
    lead:
      "This trades exam path collects free timed practice tests for licensed craft and utility careers — electrical journeyman NEC-style judgment, water treatment operator Class I fundamentals, plumbing journeyman themes, pest-control applicator knowledge, and related trade licenses. Each session is scored by domain so apprentices can see which code articles, process math, or safety rules still need drilling before a state or association sitting.",
    sections: [
      {
        heading: "Who these trade practice tests are for",
        body:
          "Apprentices finishing required hours, helpers moving to journeyman written exams, and utility trainees preparing for entry-level water operator certification benefit most. State boards set code years, open-book rules, and hour requirements — always verify your jurisdiction before you schedule. UniPrep2Go mocks are independent diagnostics, not official board exams.",
      },
      {
        heading: "How to study after a trades readiness check",
        body:
          "Use the topic report to prioritize NEC load calculations, grounding/bonding, treatment-process math, or code tables you missed. Repair those domains with the linked Anki deck (when available), then retake a timed session. Pair every study block with your official state handbook or adopted code cycle — flashcards alone are not enough for open-book code exams.",
      },
    ],
    faqs: [
      {
        question: "Which trade license practice tests does UniPrep2Go offer?",
        answer:
          "This hub lists free timed readiness checks such as electrical journeyman, water treatment operator Class I, plumbing journeyman, and related trade pathways — each with topic scoring and answer review.",
      },
      {
        question: "Are these official state board exams?",
        answer:
          "No. Practice questions are original UniPrep2Go items aligned to common published topics. Confirm adopted code years, fees, and eligibility with your state electrical, plumbing, or drinking-water operator board.",
      },
      {
        question: "Do I need my code book open during the mock?",
        answer:
          "Treat the UniPrep2Go session like your real sitting: if your board exam is open-book, practice with your tabbed NEC or plumbing code; if closed-book, time yourself without references. The mock does not replace official vendor software or board rules.",
      },
    ],
  },
  "real-estate": {
    lead:
      "UniPrep2Go’s real estate path highlights free timed salesperson readiness checks for major markets — Florida, Texas, California, and New York — plus additional state pages for candidates who need a diagnostic before TREC, DBPR/FREC, CalBRE/DRE, or NYDOS sittings. National principles (agency, contracts, finance, ownership) sit beside state license-law sections so you can see whether math or local law is the weak link.",
    sections: [
      {
        heading: "Indexable state spears vs the wider state list",
        body:
          "Google-facing priority on this site focuses on Florida, Texas, California, and New York salesperson pathways. Other state readiness checks remain available for practice and GEO citations but may be thinner in search. Always finish your state’s approved pre-license hours and confirm the current national/state outline with the commission before exam day.",
      },
      {
        heading: "How to use a real estate readiness check",
        body:
          "Sit the free timed mock once under quiet conditions, review missed contract and math items, then drill those domains daily. Pair the report with your pre-license course notes and the official candidate bulletin — UniPrep2Go does not issue licenses or redistribute PSI/Pearson VUE live items.",
      },
    ],
    faqs: [
      {
        question: "Which state real estate practice tests are free?",
        answer:
          "Start with Florida, Texas, California, and New York salesperson readiness checks on UniPrep2Go. Additional state pages exist for practice; confirm your commission’s outline and vendor before you book.",
      },
      {
        question: "Is this the official TREC / FREC / DRE exam?",
        answer:
          "No. These are independent timed diagnostics. Licensing exams are administered by each state’s commission and designated testing vendor.",
      },
    ],
  },
};

export function getVerticalSeoCopy(verticalId: MockVerticalId): VerticalSeoCopy | null {
  return verticalSeoCopy[verticalId] ?? null;
}
