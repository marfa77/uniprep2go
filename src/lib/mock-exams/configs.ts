import type { MockExamConfig } from "./types";

const financeDisclaimer =
  "This is an independent readiness diagnostic. It is not official FINRA, CFA Institute, or GARP exam material and does not guarantee an exam result.";

const servSafeDisclaimer =
  "This is an independent readiness diagnostic. It is not official ServSafe or National Restaurant Association exam material and does not guarantee an exam result.";

export const mockExamConfigs: MockExamConfig[] = [
  {
    slug: "sie-full-mock",
    title: "FINRA SIE Full Mock Exam",
    shortTitle: "SIE Full Mock",
    linkedDeckSlug: "sie-exam-anki-deck",
    status: "live",
    accessMode: "free_demand_test",
    durationMinutes: 105,
    questionCount: 75,
    passRule: {
      type: "score_threshold",
      passPercent: 70,
      borderlinePercent: 68,
      verdictLabels: {
        pass: "PASS",
        noPass: "NO PASS",
        borderline: "BORDERLINE RISK",
      },
    },
    topics: [
      {
        id: "capital-markets",
        label: "Knowledge of Capital Markets",
        questionCount: 12,
        weightPercent: 16,
        targetPercent: 70,
      },
      {
        id: "products-risks",
        label: "Understanding Products and Their Risks",
        questionCount: 33,
        weightPercent: 44,
        targetPercent: 70,
      },
      {
        id: "trading-accounts",
        label: "Understanding Trading, Customer Accounts, and Prohibited Activities",
        questionCount: 23,
        weightPercent: 31,
        targetPercent: 70,
      },
      {
        id: "regulatory-framework",
        label: "Overview of the Regulatory Framework",
        questionCount: 7,
        weightPercent: 9,
        targetPercent: 70,
      },
    ],
    officialSourceNote:
      "Modeled on the FINRA SIE outline: 75 scored questions, 105 minutes, pass score 70%.",
    disclaimer: financeDisclaimer,
    description:
      "A timed 75-question SIE mock with topic-weighted scoring, full question review, and a pass/no-pass readiness verdict aligned to the official outline.",
    examBody: "FINRA",
    lastUpdated: "2026-06-01",
  },
  {
    slug: "cfa-level-1-readiness-check",
    title: "CFA Level 1 Readiness Check",
    shortTitle: "CFA L1 Readiness",
    linkedDeckSlug: "cfa-level-1-anki-deck",
    status: "preview",
    accessMode: "free_demand_test",
    durationMinutes: 90,
    questionCount: 60,
    passRule: {
      type: "readiness_check",
      passPercent: 70,
      borderlinePercent: 65,
      verdictLabels: {
        pass: "READINESS PASS",
        noPass: "NO PASS",
        borderline: "BORDERLINE RISK",
      },
    },
    topics: [
      { id: "ethics", label: "Ethical and Professional Standards", weightPercent: 15, targetPercent: 70 },
      { id: "quant", label: "Quantitative Methods", weightPercent: 8, targetPercent: 70 },
      { id: "economics", label: "Economics", weightPercent: 8, targetPercent: 70 },
      { id: "fra", label: "Financial Statement Analysis", weightPercent: 11, targetPercent: 70 },
      { id: "corp-finance", label: "Corporate Issuers", weightPercent: 6, targetPercent: 70 },
      { id: "equity", label: "Equity Investments", weightPercent: 11, targetPercent: 70 },
      { id: "fixed-income", label: "Fixed Income", weightPercent: 11, targetPercent: 70 },
      { id: "derivatives", label: "Derivatives", weightPercent: 8, targetPercent: 70 },
      { id: "alternatives", label: "Alternative Investments", weightPercent: 14, targetPercent: 70 },
      { id: "portfolio", label: "Portfolio Management", weightPercent: 8, targetPercent: 70 },
    ],
    officialSourceNote:
      "Readiness check sampled across CFA Level 1 topic weights. Not a full CFA Institute mock exam.",
    disclaimer: financeDisclaimer,
    description:
      "A 60-question CFA Level 1 readiness diagnostic with weighted topic scoring. Full question bank coming soon — request access to be notified.",
    examBody: "CFA Institute",
    lastUpdated: "2026-06-01",
  },
  {
    slug: "frm-part-1-readiness-check",
    title: "FRM Part 1 Readiness Check",
    shortTitle: "FRM Part 1 Readiness",
    linkedDeckSlug: "frm-part-1-anki-deck",
    status: "preview",
    accessMode: "free_demand_test",
    durationMinutes: 120,
    questionCount: 50,
    passRule: {
      type: "readiness_check",
      passPercent: 70,
      borderlinePercent: 65,
      verdictLabels: {
        pass: "READINESS PASS",
        noPass: "NO PASS",
        borderline: "BORDERLINE RISK",
      },
    },
    topics: [
      { id: "foundations", label: "Foundations of Risk Management", weightPercent: 20, targetPercent: 70 },
      { id: "quant-analysis", label: "Quantitative Analysis", weightPercent: 20, targetPercent: 70 },
      { id: "financial-markets", label: "Financial Markets and Products", weightPercent: 30, targetPercent: 70 },
      { id: "valuation-models", label: "Valuation and Risk Models", weightPercent: 30, targetPercent: 70 },
    ],
    officialSourceNote:
      "Readiness check aligned to FRM Part 1 topic weights. Not official GARP exam material.",
    disclaimer: financeDisclaimer,
    description:
      "A 50-question FRM Part 1 readiness diagnostic with weighted topic scoring. Full question bank coming soon — request access to be notified.",
    examBody: "GARP",
    lastUpdated: "2026-06-01",
  },
  {
    slug: "series-7-readiness-check",
    title: "Series 7 Readiness Check",
    shortTitle: "Series 7 Readiness",
    linkedDeckSlug: "series-7-anki-deck",
    status: "preview",
    accessMode: "free_demand_test",
    durationMinutes: 90,
    questionCount: 60,
    passRule: {
      type: "readiness_check",
      passPercent: 72,
      borderlinePercent: 68,
      verdictLabels: {
        pass: "READINESS PASS",
        noPass: "NO PASS",
        borderline: "BORDERLINE RISK",
      },
    },
    topics: [
      { id: "s7-f1", label: "Seeks Business for the Broker-Dealer", weightPercent: 7, targetPercent: 72 },
      { id: "s7-f2", label: "Opens Accounts After Evaluating Customer Profiles", weightPercent: 9, targetPercent: 72 },
      { id: "s7-f3", label: "Provides Investment Information and Recommendations", weightPercent: 73, targetPercent: 72 },
      { id: "s7-f4", label: "Obtains and Verifies Customer Instructions", weightPercent: 11, targetPercent: 72 },
    ],
    officialSourceNote:
      "Readiness check sampled from the Series 7 deck across FINRA job-function areas. Not a full official FINRA practice exam.",
    disclaimer: financeDisclaimer,
    description:
      "A 60-question Series 7 readiness diagnostic built from UniPrep2Go deck content, with weighted topic diagnosis and full question review.",
    examBody: "FINRA",
    lastUpdated: "2026-06-01",
  },
  {
    slug: "series-63-readiness-check",
    title: "Series 63 Readiness Check",
    shortTitle: "Series 63 Readiness",
    linkedDeckSlug: "series-63-anki-deck",
    status: "preview",
    accessMode: "free_demand_test",
    durationMinutes: 75,
    questionCount: 60,
    passRule: {
      type: "readiness_check",
      passPercent: 72,
      borderlinePercent: 68,
      verdictLabels: {
        pass: "READINESS PASS",
        noPass: "NO PASS",
        borderline: "BORDERLINE RISK",
      },
    },
    topics: [
      { id: "s63-agent", label: "Agent Registration and Qualification", weightPercent: 13, targetPercent: 72 },
      { id: "s63-bd", label: "Broker-Dealer State Registration", weightPercent: 12, targetPercent: 72 },
      { id: "s63-ethics", label: "Ethical Practices and Fiduciary Duties", weightPercent: 25, targetPercent: 72 },
      { id: "s63-comm", label: "Communications, Records, and Sales Practices", weightPercent: 20, targetPercent: 72 },
      { id: "s63-remedies", label: "Enforcement, Remedies, and Penalties", weightPercent: 12, targetPercent: 72 },
      { id: "s63-securities", label: "Securities and Exemptions", weightPercent: 9, targetPercent: 72 },
      { id: "s63-ia", label: "Investment Advisers", weightPercent: 5, targetPercent: 72 },
      { id: "s63-iar", label: "Investment Adviser Representatives", weightPercent: 4, targetPercent: 72 },
    ],
    officialSourceNote:
      "Readiness check sampled from the Series 63 deck across NASAA-style state law and ethics topics. Not official NASAA exam material.",
    disclaimer: financeDisclaimer,
    description:
      "A 60-question Series 63 readiness diagnostic built from UniPrep2Go deck content, with state-law topic diagnosis and full question review.",
    examBody: "NASAA",
    lastUpdated: "2026-06-01",
  },
  {
    slug: "california-real-estate-readiness-check",
    title: "California Real Estate Exam Readiness Check",
    shortTitle: "CA Real Estate Readiness",
    linkedDeckSlug: "california-real-estate-exam-anki-deck",
    status: "preview",
    accessMode: "free_demand_test",
    durationMinutes: 90,
    questionCount: 60,
    passRule: {
      type: "readiness_check",
      passPercent: 70,
      borderlinePercent: 66,
      verdictLabels: {
        pass: "READINESS PASS",
        noPass: "NO PASS",
        borderline: "BORDERLINE RISK",
      },
    },
    topics: [
      { id: "ca-practice", label: "Real Estate Practice and Disclosures", weightPercent: 25, targetPercent: 70 },
      { id: "ca-agency", label: "Agency and Fiduciary Duties", weightPercent: 17, targetPercent: 70 },
      { id: "ca-ownership", label: "Ownership, Land Use, and Property Rights", weightPercent: 15, targetPercent: 70 },
      { id: "ca-valuation", label: "Valuation and Market Analysis", weightPercent: 14, targetPercent: 70 },
      { id: "ca-contracts", label: "Contracts", weightPercent: 12, targetPercent: 70 },
      { id: "ca-financing", label: "Financing", weightPercent: 9, targetPercent: 70 },
      { id: "ca-transfer", label: "Transfer of Property", weightPercent: 8, targetPercent: 70 },
    ],
    officialSourceNote:
      "Readiness check sampled from the California Real Estate deck. Not official California DRE exam material.",
    disclaimer: financeDisclaimer,
    description:
      "A 60-question California real estate licensing readiness diagnostic built from UniPrep2Go deck content.",
    examBody: "California DRE",
    lastUpdated: "2026-06-01",
  },
  {
    slug: "life-and-health-insurance-readiness-check",
    title: "Life & Health Insurance Exam Readiness Check",
    shortTitle: "Life & Health Readiness",
    linkedDeckSlug: "life-and-health-insurance-exam-anki-deck",
    status: "preview",
    accessMode: "free_demand_test",
    durationMinutes: 90,
    questionCount: 60,
    passRule: {
      type: "readiness_check",
      passPercent: 70,
      borderlinePercent: 66,
      verdictLabels: {
        pass: "READINESS PASS",
        noPass: "NO PASS",
        borderline: "BORDERLINE RISK",
      },
    },
    topics: [
      { id: "ins-health", label: "Health Insurance", weightPercent: 21, targetPercent: 70 },
      { id: "ins-life-basics", label: "Life Insurance Basics", weightPercent: 18, targetPercent: 70 },
      { id: "ins-provisions", label: "Policy Provisions and Riders", weightPercent: 18, targetPercent: 70 },
      { id: "ins-general", label: "General Insurance Concepts", weightPercent: 12, targetPercent: 70 },
      { id: "ins-annuities", label: "Annuities", weightPercent: 11, targetPercent: 70 },
      { id: "ins-tax-regulation", label: "Taxation and Regulation", weightPercent: 11, targetPercent: 70 },
      { id: "ins-disability-ltc", label: "Disability and Long-Term Care", weightPercent: 9, targetPercent: 70 },
    ],
    officialSourceNote:
      "Readiness check sampled from the Life & Health Insurance deck. State licensing outlines vary.",
    disclaimer: financeDisclaimer,
    description:
      "A 60-question Life & Health insurance licensing readiness diagnostic built from UniPrep2Go deck content.",
    examBody: "State insurance licensing authorities",
    lastUpdated: "2026-06-01",
  },
  {
    slug: "property-casualty-insurance-readiness-check",
    title: "Property & Casualty Insurance Exam Readiness Check",
    shortTitle: "P&C Readiness",
    linkedDeckSlug: "property-casualty-insurance-exam-anki-deck",
    status: "preview",
    accessMode: "free_demand_test",
    durationMinutes: 90,
    questionCount: 60,
    passRule: {
      type: "readiness_check",
      passPercent: 70,
      borderlinePercent: 66,
      verdictLabels: {
        pass: "READINESS PASS",
        noPass: "NO PASS",
        borderline: "BORDERLINE RISK",
      },
    },
    topics: [
      { id: "pc-dwelling-homeowners", label: "Dwelling and Homeowners Policies", weightPercent: 22, targetPercent: 70 },
      { id: "pc-casualty", label: "Casualty and Liability", weightPercent: 18, targetPercent: 70 },
      { id: "pc-auto", label: "Personal and Commercial Auto", weightPercent: 15, targetPercent: 70 },
      { id: "pc-property-basics", label: "Property Insurance Basics", weightPercent: 14, targetPercent: 70 },
      { id: "pc-commercial-property", label: "Commercial Property", weightPercent: 14, targetPercent: 70 },
      { id: "pc-general", label: "General Insurance Concepts", weightPercent: 11, targetPercent: 70 },
      { id: "pc-policy-regulation", label: "Policy Conditions and Regulation", weightPercent: 6, targetPercent: 70 },
    ],
    officialSourceNote:
      "Readiness check sampled from the Property & Casualty Insurance deck. State licensing outlines vary.",
    disclaimer: financeDisclaimer,
    description:
      "A 60-question Property & Casualty insurance licensing readiness diagnostic built from UniPrep2Go deck content.",
    examBody: "State insurance licensing authorities",
    lastUpdated: "2026-06-01",
  },
  {
    slug: "servsafe-manager-mock",
    title: "ServSafe Manager Mock Exam",
    shortTitle: "ServSafe Manager Mock",
    linkedDeckSlug: "servsafe-manager-anki-deck",
    status: "live",
    accessMode: "free_demand_test",
    durationMinutes: 120,
    questionCount: 90,
    passRule: {
      type: "score_threshold",
      passPercent: 75,
      borderlinePercent: 72,
      verdictLabels: {
        pass: "PASS",
        noPass: "NO PASS",
        borderline: "BORDERLINE RISK",
      },
    },
    topics: [
      {
        id: "foodborne-illness",
        label: "Foodborne Illness and Contamination",
        questionCount: 15,
        targetPercent: 75,
      },
      {
        id: "time-temperature",
        label: "Time and Temperature Control",
        questionCount: 15,
        targetPercent: 75,
      },
      {
        id: "personal-hygiene-contamination",
        label: "Personal Hygiene and Cross-Contamination",
        questionCount: 15,
        targetPercent: 75,
      },
      {
        id: "cleaning-storage",
        label: "Cleaning, Sanitizing, Receiving, and Storage",
        questionCount: 21,
        targetPercent: 75,
      },
      {
        id: "management-haccp",
        label: "HACCP and Manager Responsibilities",
        questionCount: 24,
        targetPercent: 75,
      },
    ],
    officialSourceNote:
      "Modeled on the ServSafe Manager exam outline: 90 questions, 120 minutes, pass score 75%.",
    disclaimer: servSafeDisclaimer,
    description:
      "A timed 90-question ServSafe Manager mock with topic-weighted scoring, full question review, and a pass/no-pass readiness verdict aligned to the official exam format.",
    examBody: "ServSafe / National Restaurant Association",
    lastUpdated: "2026-06-02",
  },
];

/** Flagship live mock — used for homepage funnel defaults and LLM primary-product signals. */
export const primaryMockSlug = "sie-full-mock";

export function getPrimaryMock(): MockExamConfig {
  const config = getMockExamConfig(primaryMockSlug);
  if (!config) {
    throw new Error(`Primary mock config missing: ${primaryMockSlug}`);
  }
  return config;
}

export const primaryMock = getPrimaryMock();

export function getMockExamConfig(slug: string) {
  return mockExamConfigs.find((config) => config.slug === slug);
}

export function getLiveMockExams() {
  return mockExamConfigs.filter((config) => config.status === "live");
}

export function getAllMockExams() {
  return mockExamConfigs;
}

export function validateMockExamConfig(config: MockExamConfig) {
  const errors: string[] = [];

  if (config.topics.length === 0) {
    errors.push("At least one topic is required");
  }

  const countedTopics = config.topics.filter((topic) => typeof topic.questionCount === "number");

  if (countedTopics.length > 0) {
    const totalQuestions = countedTopics.reduce((sum, topic) => sum + (topic.questionCount ?? 0), 0);

    if (totalQuestions !== config.questionCount) {
      errors.push(
        `Topic question counts (${totalQuestions}) must equal questionCount (${config.questionCount})`,
      );
    }
  }

  const weightedTopics = config.topics.filter((topic) => typeof topic.weightPercent === "number");

  if (weightedTopics.length === config.topics.length) {
    const totalWeight = weightedTopics.reduce((sum, topic) => sum + (topic.weightPercent ?? 0), 0);

    if (totalWeight !== 100) {
      errors.push(`Topic weights must sum to 100 (got ${totalWeight})`);
    }
  }

  if (config.passRule.borderlinePercent && config.passRule.borderlinePercent >= config.passRule.passPercent) {
    errors.push("borderlinePercent must be lower than passPercent");
  }

  return errors;
}
