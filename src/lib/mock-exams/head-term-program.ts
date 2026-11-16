import type { MockExamConfig } from "./types";
import { getExamFactsProfileForDeck } from "../exam-facts";

/** Bing week-2 head-term blocks — verified official facts checked 2026-11-16 (see officialFormatLines sources in code comments). */
export type MockHeadTermBlock = {
  /** Exact H2 text, e.g. "CDL general knowledge practice test" */
  h2: string;
  /** 2–3 sentence direct answer for AEO */
  answerParagraphs: string[];
  /** Question count / time / fee — only verified rows */
  officialFormatLines: string[];
  officialFormatSourceUrl: string;
  officialFormatVerifiedOn: string;
  faq: { question: string; answer: string };
};

export const HEAD_TERM_SLUGS = [
  "cdl-general-knowledge-readiness-check",
  "ptcb-pharmacy-technician-mock",
  "servsafe-manager-mock",
  "us-citizenship-readiness-check",
  "nnaap-cna-readiness-check",
  "epa-608-readiness-check",
  "nremt-emt-readiness-check",
  "aswb-bachelors-readiness-check",
  "parapro-readiness-check",
  "sie-full-mock",
] as const;

export type HeadTermMockSlug = (typeof HEAD_TERM_SLUGS)[number];

function factsLines(
  deckSlug: string,
  extra?: string[],
): { lines: string[]; url: string } | null {
  const profile = getExamFactsProfileForDeck(deckSlug);
  if (!profile) return null;
  const f = profile.exam_facts;
  const lines = [
    f.question_count ? `Questions: ${f.question_count}` : null,
    f.time_limit ? `Time: ${f.time_limit}` : null,
    f.passing_score ? `Pass: ${f.passing_score}` : null,
    ...(extra ?? []),
  ].filter((line): line is string => Boolean(line));
  if (lines.length === 0 || !f.verify_at_url) return null;
  return { lines, url: f.verify_at_url };
}

const headTermBySlug: Record<HeadTermMockSlug, MockHeadTermBlock> = {
  "cdl-general-knowledge-readiness-check": {
    h2: "CDL general knowledge practice test",
    answerParagraphs: [
      "This free CDL general knowledge practice test is a timed diagnostic aligned to FMCSA Commercial Driver’s Manual topics — vehicle inspection, safe driving, cargo, and hours-of-service rules.",
      "Your first run is 25 questions, no signup, with topic scoring. The full mock draws from a larger bank for retakes. Independent prep — not a state DMV exam.",
    ],
    officialFormatLines: factsLines("cdl-general-knowledge-anki-deck")?.lines ?? [
      "Questions: Typically ~50 in most states (verify your state CDL manual)",
      "Pass: Typically 80% (40 of 50) — confirm with your DMV",
    ],
    officialFormatSourceUrl:
      factsLines("cdl-general-knowledge-anki-deck")?.url ??
      "https://www.fmcsa.dot.gov/registration/commercial-drivers-license",
    officialFormatVerifiedOn: "2026-11-16",
    faq: {
      question: "What is a CDL general knowledge practice test?",
      answer:
        "A CDL general knowledge practice test quizzes the written knowledge required for a Commercial Learner’s Permit or CDL before skills testing. UniPrep2Go’s version is a free 25-question start with topic scores — not an official DMV sitting.",
    },
  },
  "ptcb-pharmacy-technician-mock": {
    h2: "PTCB practice test",
    answerParagraphs: [
      "This PTCB practice test follows the January 2026 PTCE outline with domain-weighted scoring across medications, federal requirements, patient safety, and order entry.",
      "Start free with 25 timed questions, no signup, then run the full 90-question mock on Mock Pass. Independent prep — not PTCB or Pearson VUE material.",
    ],
    officialFormatLines: factsLines("ptcb-pharmacy-technician-anki-deck")?.lines ?? [],
    officialFormatSourceUrl:
      factsLines("ptcb-pharmacy-technician-anki-deck")?.url ??
      "https://ptcb.org/credentials/certification/certified-pharmacy-technician/",
    officialFormatVerifiedOn: "2026-11-16",
    faq: {
      question: "What is a PTCB practice test?",
      answer:
        "A PTCB practice test simulates Pharmacy Technician Certification Exam (PTCE) themes before you sit at Pearson VUE. UniPrep2Go’s free start is 25 questions with topic scoring — not official PTCB items.",
    },
  },
  "servsafe-manager-mock": {
    h2: "ServSafe Manager practice test",
    answerParagraphs: [
      "This ServSafe Manager practice test covers food-safety manager duties — time/temperature, contamination, cleaning, and HACCP — with a free 25-question diagnostic and a full 90-question timed mock.",
      "Topic scores show which domains to drill in the linked ServSafe Manager Anki deck. Independent prep — not National Restaurant Association ServSafe exam material.",
    ],
    officialFormatLines: factsLines("servsafe-manager-anki-deck")?.lines ?? [],
    officialFormatSourceUrl:
      factsLines("servsafe-manager-anki-deck")?.url ??
      "https://www.servsafe.com/ServSafe-Manager/Get-Certified",
    officialFormatVerifiedOn: "2026-11-16",
    faq: {
      question: "What is a ServSafe Manager practice test?",
      answer:
        "A ServSafe Manager practice test rehearses the Certified Food Protection Manager knowledge areas before your proctored ServSafe sitting. UniPrep2Go offers a free 25-question diagnostic plus a 90-question timed mock with topic scoring.",
    },
  },
  "us-citizenship-readiness-check": {
    h2: "U.S. citizenship practice test",
    answerParagraphs: [
      "This U.S. citizenship practice test is a timed multiple-choice civics diagnostic — not the oral USCIS interview. It helps you find weak government, history, and integrated civics topics before you study the official USCIS question pool.",
      "The free start is 25 questions, no signup. Pair results with the U.S. Citizenship Anki bundle for daily recall. Independent prep — not USCIS material.",
    ],
    officialFormatLines: factsLines("us-citizenship-anki-deck")?.lines ?? [],
    officialFormatSourceUrl:
      factsLines("us-citizenship-anki-deck")?.url ??
      "https://www.uscis.gov/citizenship/find-study-materials-and-resources",
    officialFormatVerifiedOn: "2026-11-16",
    faq: {
      question: "What is a U.S. citizenship practice test?",
      answer:
        "A U.S. citizenship practice test rehearses USCIS civics themes. The official naturalization civics portion is oral at your interview (up to 20 questions on the 2025 test). UniPrep2Go’s page is a timed MCQ diagnostic with topic scoring — not the live interview.",
    },
  },
  "nnaap-cna-readiness-check": {
    h2: "CNA practice test",
    answerParagraphs: [
      "This CNA practice test targets NNAAP-style nurse-aide knowledge — ADLs, infection control, psychosocial care, and resident rights — with a free 25-question diagnostic and a timed full mock.",
      "Skills demonstrations are separate on the real NNAAP. Use topic scores to prioritize the linked CNA Anki deck. Independent prep — not Credentia exam material.",
    ],
    officialFormatLines: [
      // Credentia NNAAP handbook (NC example), checked 2026-11-16
      "Written exam: 70 multiple-choice (60 scored + 10 pretest)",
      "Time: 2 hours",
    ],
    officialFormatSourceUrl: "https://kb-ncna.credentia.com/en/article/exam-overview-updated",
    officialFormatVerifiedOn: "2026-11-16",
    faq: {
      question: "What is an NNAAP CNA practice test?",
      answer:
        "An NNAAP CNA practice test rehearses nurse-aide knowledge before the Credentia written/oral exam and separate skills evaluation. UniPrep2Go’s version is a free timed diagnostic with topic scoring — not the live NNAAP.",
    },
  },
  "epa-608-readiness-check": {
    h2: "EPA 608 practice test",
    answerParagraphs: [
      "This EPA 608 practice test drills Section 608 refrigerant handling rules — Core plus Type I–III topics — with a free 25-question start and a full timed mock.",
      "Real EPA 608 certification is proctored through approved organizations; this page is independent cognitive prep with topic scores. Not U.S. EPA exam material.",
    ],
    officialFormatLines: factsLines("hvac-epa-608-anki-deck")?.lines ?? [],
    officialFormatSourceUrl:
      factsLines("hvac-epa-608-anki-deck")?.url ??
      "https://www.epa.gov/section608/section-608-technician-certification",
    officialFormatVerifiedOn: "2026-11-16",
    faq: {
      question: "What is an EPA 608 practice test?",
      answer:
        "An EPA 608 practice test rehearses Clean Air Act refrigerant rules before your proctored Section 608 exam. UniPrep2Go’s free diagnostic scores Core and Type topics — it does not issue EPA certification.",
    },
  },
  "nremt-emt-readiness-check": {
    h2: "NREMT EMT practice test",
    answerParagraphs: [
      "This NREMT EMT practice test is a shorter timed diagnostic across airway, cardiology, trauma, medical, and EMS operations — not the adaptive Pearson VUE sitting.",
      "Start with 25 free questions, no signup, read topic scores, then drill the linked EMT Anki deck. Independent prep — not NREMT exam material.",
    ],
    officialFormatLines: [
      // nremt.org EMT examination specs + FAQ, checked 2026-11-16
      "Cognitive exam: CAT, 70–120 items, 2 hours",
      "Exam fee: $104 per attempt (NREMT)",
    ],
    officialFormatSourceUrl:
      "https://nremt.org/Pages/Examinations/EMR-and-EMT-Certification-Examinations",
    officialFormatVerifiedOn: "2026-11-16",
    faq: {
      question: "What is an NREMT EMT practice test?",
      answer:
        "An NREMT EMT practice test rehearses entry-level EMS cognitive themes before the national Registry exam. The official test is computer-adaptive at Pearson VUE. UniPrep2Go’s mock is a fixed-length diagnostic with topic scoring.",
    },
  },
  "aswb-bachelors-readiness-check": {
    h2: "ASWB practice test",
    answerParagraphs: [
      "This ASWB Bachelors practice test is a 60-question / 75-minute LSW-style diagnostic across human development, assessment, intervention, and ethics — not the 122-question 2026 sitting.",
      "Free 25-question start, no signup, with topic scoring. For LCSW Clinical, use the ASWB Clinical mock instead. Independent prep — not ASWB material.",
    ],
    officialFormatLines: factsLines("aswb-bachelors-anki-deck")?.lines ?? [],
    officialFormatSourceUrl:
      factsLines("aswb-bachelors-anki-deck")?.url ?? "https://www.aswb.org/2026exams/",
    officialFormatVerifiedOn: "2026-11-16",
    faq: {
      question: "What is an ASWB Bachelors practice test?",
      answer:
        "An ASWB Bachelors practice test rehearses LSW/LBSW exam themes. The official exam from 3 August 2026 is 122 questions in 4 hours. UniPrep2Go’s check is a shorter diagnostic with a free 25-question start.",
    },
  },
  "parapro-readiness-check": {
    h2: "ParaPro practice test",
    answerParagraphs: [
      "This ParaPro practice test covers ETS ParaPro reading, writing, and mathematics with a free 25-question diagnostic and a full timed mock.",
      "Passing scores are set by states and districts — confirm your employer’s cut score. Independent prep — not ETS exam material.",
    ],
    officialFormatLines: factsLines("parapro-anki-deck")?.lines ?? [],
    officialFormatSourceUrl:
      factsLines("parapro-anki-deck")?.url ??
      "https://www.ets.org/parapro/test-takers/about/prepare.htm.html",
    officialFormatVerifiedOn: "2026-11-16",
    faq: {
      question: "What is a ParaPro practice test?",
      answer:
        "A ParaPro practice test rehearses the ETS ParaPro Assessment (test code 1755) before you sit at a test center. UniPrep2Go’s version starts free with 25 timed questions and topic scoring.",
    },
  },
  "sie-full-mock": {
    h2: "SIE practice test",
    answerParagraphs: [
      "This SIE practice test is a FINRA-topic-weighted diagnostic: free 25 questions, then 75 scored-style questions in 105 minutes with a readiness report.",
      "Drill weak capital-markets and suitability domains in the linked SIE Anki deck after the mock. Independent prep — not FINRA exam material.",
    ],
    officialFormatLines: factsLines("sie-exam-anki-deck")?.lines ?? [],
    officialFormatSourceUrl:
      factsLines("sie-exam-anki-deck")?.url ??
      "https://www.finra.org/registration-exams-ce/qualification-exams/securities-industry-essentials-exam-sie",
    officialFormatVerifiedOn: "2026-11-16",
    faq: {
      question: "What is a SIE practice test?",
      answer:
        "A SIE practice test rehearses Securities Industry Essentials topics before the FINRA qualifying exam at Prometric. UniPrep2Go’s mock mirrors the 75 scored-question / 105-minute form with a free 25-question diagnostic first.",
    },
  },
};

export function getMockHeadTermBlock(slug: string): MockHeadTermBlock | null {
  if (!HEAD_TERM_SLUGS.includes(slug as HeadTermMockSlug)) {
    return null;
  }
  return headTermBySlug[slug as HeadTermMockSlug];
}

export function headTermFaqForSchema(config: MockExamConfig) {
  const block = getMockHeadTermBlock(config.slug);
  return block?.faq ?? null;
}