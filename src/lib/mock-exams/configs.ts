import type { MockExamConfig } from "./types";

const financeDisclaimer =
  "This is an independent readiness diagnostic. It is not official FINRA, CFA Institute, or GARP exam material and does not guarantee an exam result.";

const servSafeDisclaimer =
  "This is an independent readiness diagnostic. It is not official ServSafe or National Restaurant Association exam material and does not guarantee an exam result.";

const ptcbDisclaimer =
  "This is an independent readiness diagnostic. It is not official PTCB, PTCE, NHA, FDA, or DEA exam material and does not guarantee certification.";

const gmatDisclaimer =
  "This is an independent readiness diagnostic. It is not official GMAC GMAT exam material and does not predict your official GMAT score.";

const satDisclaimer =
  "This is an independent readiness diagnostic. It is not official College Board SAT exam material and does not predict your official Digital SAT score.";

const epa608Disclaimer =
  "This is an independent readiness diagnostic. It is not official U.S. EPA Section 608 exam material and does not certify you to handle refrigerants.";

const bmsDisclaimer =
  "This is an independent readiness diagnostic. It is not official Tridium, BACnet International, ASHRAE, or manufacturer certification material and does not award any vendor credential.";

const usgbcDisclaimer =
  "This is an independent readiness diagnostic. It is not official USGBC or GBCI exam material and does not award LEED credentials.";

const wellDisclaimer =
  "This is an independent readiness diagnostic. It is not official IWBI or GBCI WELL AP exam material and does not award the WELL Accredited Professional credential.";

const aeeDisclaimer =
  "This is an independent readiness diagnostic. It is not official AEE CEM exam material and does not certify you as a Certified Energy Manager.";

const ashraeDisclaimer =
  "This is an independent readiness diagnostic. It is not official ASHRAE certification exam material and does not award ASHRAE credentials (BCxP, BEMP, BEAP, CHD, HBDP, HFDP, OPMP).";

const cdcpDisclaimer =
  "This is an independent readiness diagnostic. It is not official EXIN or EPI CDCP exam material and does not award the Certified Data Centre Professional credential.";

const neboshDisclaimer =
  "This is an independent readiness diagnostic. It is not official NEBOSH assessment material and does not award NEBOSH qualifications (IGC, NGC, or other certificates).";

const cfpsDisclaimer =
  "This is an independent readiness diagnostic. It is not official NFPA CFPS exam material and does not award the Certified Fire Protection Specialist credential.";

const ricsDisclaimer =
  "This is an independent readiness diagnostic. It is not official RICS APC assessment material and does not award MRICS chartered membership.";

const citizenshipDisclaimer =
  "This is an independent civics practice tool. It is not official USCIS test material and does not guarantee naturalization interview results.";

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
    status: "live",
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
      "A free 60-question CFA Level 1 readiness diagnostic with weighted topic scoring, answer review, and a linked Anki deck repair plan for weak topics.",
    examBody: "CFA Institute",
    lastUpdated: "2026-07-16",
  },
  {
    slug: "cfa-level-2-readiness-check",
    title: "CFA Level 2 Readiness Check",
    shortTitle: "CFA L2 Readiness",
    linkedDeckSlug: "cfa-level-2-anki-deck",
    status: "live",
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
      { id: "ethics", label: "Ethical and Professional Standards", questionCount: 6, weightPercent: 10, targetPercent: 70 },
      { id: "quant", label: "Quantitative Methods", questionCount: 6, weightPercent: 10, targetPercent: 70 },
      { id: "economics", label: "Economics", questionCount: 6, weightPercent: 10, targetPercent: 70 },
      { id: "fra", label: "Financial Statement Analysis", questionCount: 6, weightPercent: 10, targetPercent: 70 },
      { id: "corp-finance", label: "Corporate Issuers", questionCount: 6, weightPercent: 10, targetPercent: 70 },
      { id: "equity", label: "Equity Valuation", questionCount: 6, weightPercent: 10, targetPercent: 70 },
      { id: "fixed-income", label: "Fixed Income", questionCount: 6, weightPercent: 10, targetPercent: 70 },
      { id: "derivatives", label: "Derivatives", questionCount: 6, weightPercent: 10, targetPercent: 70 },
      { id: "alternatives", label: "Alternative Investments", questionCount: 6, weightPercent: 10, targetPercent: 70 },
      { id: "portfolio", label: "Portfolio Management", questionCount: 6, weightPercent: 10, targetPercent: 70 },
    ],
    officialSourceNote:
      "Readiness check sampled across CFA Level 2 topic weights with vignette-style application prompts. Not a full CFA Institute mock exam.",
    disclaimer: financeDisclaimer,
    description:
      "A 60-question CFA Level 2 readiness diagnostic with weighted topic scoring across all ten curriculum areas. Independent prep — not CFA Institute material.",
    examBody: "CFA Institute",
    lastUpdated: "2026-07-15",
  },
  {
    slug: "us-citizenship-readiness-check",
    title: "U.S. Citizenship Civics Readiness Check",
    shortTitle: "U.S. Citizenship Readiness",
    linkedDeckSlug: "us-citizenship-test-prep2go-app",
    status: "preview",
    accessMode: "free_demand_test",
    durationMinutes: 30,
    questionCount: 30,
    passRule: {
      type: "readiness_check",
      passPercent: 80,
      borderlinePercent: 70,
      verdictLabels: {
        pass: "READINESS PASS",
        noPass: "NO PASS",
        borderline: "BORDERLINE RISK",
      },
    },
    topics: [
      { id: "government", label: "American Government & Civics", questionCount: 10, weightPercent: 34, targetPercent: 80 },
      { id: "history", label: "American History", questionCount: 10, weightPercent: 33, targetPercent: 80 },
      { id: "geography", label: "Geography, Symbols & Holidays", questionCount: 10, weightPercent: 33, targetPercent: 80 },
    ],
    officialSourceNote:
      "Readiness check based on USCIS civics test themes (2025 pool). Not an official USCIS naturalization interview.",
    disclaimer: citizenshipDisclaimer,
    description:
      "A 30-question U.S. citizenship civics readiness check covering government, history, and geography — pairs with the Prep2Go Immigration app. Independent prep — not USCIS material.",
    examBody: "USCIS",
    lastUpdated: "2026-07-15",
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
    status: "live",
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
      "A free 60-question Series 7 readiness diagnostic built from UniPrep2Go deck content, with FINRA job-function weighted scoring, answer review, and a linked Anki deck repair plan.",
    examBody: "FINRA",
    lastUpdated: "2026-07-16",
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
  {
    slug: "ptcb-pharmacy-technician-mock",
    title: "PTCB Pharmacy Technician Mock Exam",
    shortTitle: "PTCB / PTCE Mock",
    linkedDeckSlug: "ptcb-pharmacy-technician-anki-deck",
    status: "live",
    accessMode: "free_demand_test",
    durationMinutes: 110,
    questionCount: 90,
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
        id: "medications",
        label: "Medications",
        questionCount: 32,
        weightPercent: 35,
        targetPercent: 70,
      },
      {
        id: "federal-requirements",
        label: "Federal Requirements",
        questionCount: 17,
        weightPercent: 19,
        targetPercent: 70,
      },
      {
        id: "patient-safety",
        label: "Patient Safety and Quality Assurance",
        questionCount: 21,
        weightPercent: 24,
        targetPercent: 70,
      },
      {
        id: "order-entry",
        label: "Order Entry and Processing",
        questionCount: 20,
        weightPercent: 22,
        targetPercent: 70,
      },
    ],
    officialSourceNote:
      "Modeled on the January 2026 PTCE outline: 90 questions, 110 minutes, domain weights (Medications 35%, Federal Requirements 18.75%, Patient Safety 23.75%, Order Entry 22.5%). Official PTCE pass is a scaled score of 1,400 — this mock uses a 70% diagnostic threshold.",
    disclaimer: ptcbDisclaimer,
    description:
      "A timed 90-question PTCB / PTCE mock with 2026 domain-weighted scoring, full question review, and a pass/no-pass readiness verdict before you drill the linked Anki deck.",
    examBody: "PTCB / PTCE",
    lastUpdated: "2026-07-15",
  },
  {
    slug: "gmat-focus-readiness-check",
    title: "GMAT Focus Readiness Check",
    shortTitle: "GMAT Focus Readiness",
    linkedDeckSlug: "gmat-focus-anki-deck",
    status: "preview",
    accessMode: "free_demand_test",
    durationMinutes: 90,
    questionCount: 45,
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
      {
        id: "quant",
        label: "Quantitative Reasoning",
        questionCount: 15,
        weightPercent: 33,
        targetPercent: 70,
      },
      {
        id: "verbal",
        label: "Verbal Reasoning",
        questionCount: 15,
        weightPercent: 34,
        targetPercent: 70,
      },
      {
        id: "data-insights",
        label: "Data Insights",
        questionCount: 15,
        weightPercent: 33,
        targetPercent: 70,
      },
    ],
    officialSourceNote:
      "Readiness check sampled across the three GMAT sections (Quant, Verbal, Data Insights) with equal section weights on the official 205–805 exam. Not a full GMAC practice test.",
    disclaimer: gmatDisclaimer,
    description:
      "A 45-question GMAT Focus readiness diagnostic with equal section scoring, pacing feedback, and full answer review. Independent prep aligned to GMAC section types.",
    examBody: "GMAC",
    lastUpdated: "2026-06-02",
    questionSourceNote:
      "Original UniPrep2Go questions authored for the GMAT Focus Edition readiness check (134 Quant, 133 Verbal, 133 Data Insights in the Anki bank; 45-question timed session).",
    ankiDeckCardCount: 400,
  },
  {
    slug: "sat-readiness-check",
    title: "Digital SAT Readiness Check",
    shortTitle: "SAT Readiness",
    linkedDeckSlug: "sat-anki-deck",
    status: "live",
    accessMode: "free_demand_test",
    durationMinutes: 70,
    questionCount: 49,
    passRule: {
      type: "readiness_check",
      passPercent: 70,
      borderlinePercent: 65,
      // Official SAT reports two section scores (RW + Math); both must clear target for a pass.
      requireAllTopicsAtTarget: true,
      verdictLabels: {
        pass: "READINESS PASS",
        noPass: "NO PASS",
        borderline: "BORDERLINE RISK",
      },
    },
    topics: [
      {
        id: "reading-and-writing",
        label: "Reading and Writing",
        questionCount: 27,
        weightPercent: 55,
        targetPercent: 70,
      },
      {
        id: "math",
        label: "Math",
        questionCount: 22,
        weightPercent: 45,
        targetPercent: 70,
      },
    ],
    officialSourceNote:
      "Modeled on the Digital SAT Suite: two scored sections — Reading and Writing (54 questions, 64 minutes) and Math (44 questions, 70 minutes) — combining to a 400–1600 total (200–800 each). This readiness check uses a 27+22 question sample with section-balanced scoring. Not a College Board practice test and not adaptive.",
    disclaimer: satDisclaimer,
    description:
      "A 49-question Digital SAT readiness diagnostic scored on the two official axes — Reading and Writing and Math — with pacing feedback and full answer review. Independent prep aligned to College Board section types.",
    examBody: "College Board",
    lastUpdated: "2026-07-16",
    questionSourceNote:
      "Original UniPrep2Go questions authored for the Digital SAT readiness check (175 Reading and Writing + 175 Math in the Anki bank; 49-question timed session).",
    ankiDeckCardCount: 342,
  },
  {
    slug: "epa-608-readiness-check",
    title: "EPA Section 608 HVAC Certification Readiness Check",
    shortTitle: "EPA 608 Readiness",
    linkedDeckSlug: "hvac-epa-608-anki-deck",
    status: "preview",
    accessMode: "free_demand_test",
    durationMinutes: 75,
    questionCount: 40,
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
      {
        id: "core",
        label: "Core (Clean Air Act, ozone, recovery, safety)",
        questionCount: 10,
        weightPercent: 25,
        targetPercent: 70,
      },
      {
        id: "type-1",
        label: "Type I — Small Appliances",
        questionCount: 10,
        weightPercent: 25,
        targetPercent: 70,
      },
      {
        id: "type-2",
        label: "Type II — High-Pressure Appliances",
        questionCount: 10,
        weightPercent: 25,
        targetPercent: 70,
      },
      {
        id: "type-3",
        label: "Type III — Low-Pressure Appliances",
        questionCount: 10,
        weightPercent: 25,
        targetPercent: 70,
      },
    ],
    officialSourceNote:
      "Readiness check sampled across EPA Section 608 Core plus Types I–III (25 questions per official section; 18/25 minimum to pass each). Not an EPA-approved certifying exam.",
    disclaimer: epa608Disclaimer,
    description:
      "A 40-question EPA 608 readiness diagnostic for HVAC technicians with section scoring across Core, Type I, Type II, and Type III. Independent prep aligned to federal refrigerant certification topics.",
    examBody: "U.S. EPA",
    lastUpdated: "2026-06-02",
    questionSourceNote:
      "Original UniPrep2Go questions (200-item bank, 50 per EPA section) authored via OpenRouter with Gemini cross-validation; each session samples 10 per section.",
  },
  {
    slug: "bms-bas-readiness-check",
    title: "BMS / BAS Building Automation Readiness Check",
    shortTitle: "BMS / BAS Readiness",
    linkedDeckSlug: "bms-building-automation-anki-deck",
    status: "preview",
    accessMode: "free_demand_test",
    durationMinutes: 75,
    questionCount: 40,
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
      {
        id: "bacnet-networking",
        label: "BACnet Protocol and Networking",
        questionCount: 10,
        weightPercent: 25,
        targetPercent: 70,
      },
      {
        id: "hvac-control",
        label: "HVAC Control Sequences and Plant Logic",
        questionCount: 10,
        weightPercent: 25,
        targetPercent: 70,
      },
      {
        id: "platform-ops",
        label: "Alarms, Trends, Schedules, and Operator Workflows",
        questionCount: 10,
        weightPercent: 25,
        targetPercent: 70,
      },
      {
        id: "integration-commissioning",
        label: "Integration, Commissioning, and Troubleshooting",
        questionCount: 10,
        weightPercent: 25,
        targetPercent: 70,
      },
    ],
    officialSourceNote:
      "Readiness check sampled across common BMS/BAS domains (BACnet, HVAC sequences, platform operations, commissioning). Not a Tridium Niagara TCP or manufacturer certification exam.",
    disclaimer: bmsDisclaimer,
    description:
      "A 40-question building automation readiness diagnostic for BMS technicians across BACnet, HVAC control logic, operator workflows, and commissioning. Question bank loading — independent prep, not vendor certification material.",
    examBody: "Building automation industry (BACnet / BAS)",
    lastUpdated: "2026-06-02",
    questionSourceNote:
      "Original UniPrep2Go questions (200-item bank, 50 per domain) authored via OpenRouter with Gemini cross-validation; each session samples 10 per domain.",
  },
  {
    slug: "leed-green-associate-readiness-check",
    title: "LEED Green Associate Readiness Check",
    shortTitle: "LEED GA Readiness",
    linkedDeckSlug: "leed-green-associate-anki-deck",
    status: "preview",
    accessMode: "free_demand_test",
    durationMinutes: 100,
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
      {
        id: "integrative-process",
        label: "Integrative Process and Project Context",
        questionCount: 10,
        weightPercent: 20,
        targetPercent: 70,
      },
      {
        id: "location-transportation",
        label: "Location and Transportation",
        questionCount: 10,
        weightPercent: 20,
        targetPercent: 70,
      },
      {
        id: "sites-water",
        label: "Sustainable Sites and Water Efficiency",
        questionCount: 10,
        weightPercent: 20,
        targetPercent: 70,
      },
      {
        id: "energy-atmosphere",
        label: "Energy and Atmosphere",
        questionCount: 10,
        weightPercent: 20,
        targetPercent: 70,
      },
      {
        id: "materials-ieq",
        label: "Materials, Resources, and Indoor Environmental Quality",
        questionCount: 10,
        weightPercent: 20,
        targetPercent: 70,
      },
    ],
    officialSourceNote:
      "Readiness check sampled across LEED Green Associate knowledge domains. Official GBCI exam: 100 questions, 2 hours, scaled pass score 170 (125–200 scale). Not USGBC exam material.",
    disclaimer: usgbcDisclaimer,
    description:
      "A 50-question LEED Green Associate readiness diagnostic across integrative process, location, sites, water, energy, materials, and IEQ. Question bank loading — independent prep, not USGBC material.",
    examBody: "USGBC / GBCI",
    lastUpdated: "2026-06-02",
    questionSourceNote:
      "Original UniPrep2Go questions (250-item bank, 50 per domain) authored via OpenRouter with Gemini cross-validation; each session samples 10 per domain.",
  },
  {
    slug: "leed-ap-bd-c-readiness-check",
    title: "LEED AP BD+C Readiness Check",
    shortTitle: "LEED AP BD+C Readiness",
    linkedDeckSlug: "leed-ap-bd-c-anki-deck",
    status: "preview",
    accessMode: "free_demand_test",
    durationMinutes: 100,
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
      {
        id: "process-location",
        label: "Integrative Process, Location, and Transportation",
        questionCount: 10,
        weightPercent: 20,
        targetPercent: 70,
      },
      {
        id: "sites-water",
        label: "Sustainable Sites and Water Efficiency",
        questionCount: 10,
        weightPercent: 20,
        targetPercent: 70,
      },
      {
        id: "energy-atmosphere",
        label: "Energy and Atmosphere",
        questionCount: 10,
        weightPercent: 20,
        targetPercent: 70,
      },
      {
        id: "materials-resources",
        label: "Materials and Resources",
        questionCount: 10,
        weightPercent: 20,
        targetPercent: 70,
      },
      {
        id: "indoor-environmental-quality",
        label: "Indoor Environmental Quality",
        questionCount: 10,
        weightPercent: 20,
        targetPercent: 70,
      },
    ],
    officialSourceNote:
      "Readiness check sampled for LEED AP Building Design + Construction (BD+C). Official specialty exam: 100 questions, 2 hours, scaled pass 170; requires active LEED Green Associate. Other AP specialties (O+M, ID+C, etc.) use separate exams.",
    disclaimer: usgbcDisclaimer,
    description:
      "A 50-question LEED AP BD+C readiness diagnostic for design and construction specialty credits and prerequisites. Question bank loading — independent prep, not USGBC material.",
    examBody: "USGBC / GBCI",
    lastUpdated: "2026-06-02",
    questionSourceNote:
      "Original UniPrep2Go questions (250-item bank, 50 per domain) authored via OpenRouter with Gemini cross-validation; each session samples 10 per domain.",
  },
  {
    slug: "well-ap-readiness-check",
    title: "WELL Accredited Professional (WELL AP) Readiness Check",
    shortTitle: "WELL AP Readiness",
    linkedDeckSlug: "well-ap-anki-deck",
    status: "preview",
    accessMode: "free_demand_test",
    durationMinutes: 100,
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
      {
        id: "air-water-nourishment",
        label: "Air, Water, and Nourishment",
        questionCount: 10,
        weightPercent: 20,
        targetPercent: 70,
      },
      {
        id: "light-movement-thermal",
        label: "Light, Movement, and Thermal Comfort",
        questionCount: 10,
        weightPercent: 20,
        targetPercent: 70,
      },
      {
        id: "sound-materials",
        label: "Sound and Materials",
        questionCount: 10,
        weightPercent: 20,
        targetPercent: 70,
      },
      {
        id: "mind-community",
        label: "Mind and Community",
        questionCount: 10,
        weightPercent: 20,
        targetPercent: 70,
      },
      {
        id: "well-certification-portfolio",
        label: "WELL Certification and Portfolio",
        questionCount: 10,
        weightPercent: 20,
        targetPercent: 70,
      },
    ],
    officialSourceNote:
      "Readiness check sampled across WELL v2 knowledge domains per IWBI exam specifications. Official GBCI exam: 115 questions (100 scored + 15 unscored pilot), 2.5 hours, scaled pass score 170 (125–200 scale). Closed book with embedded scenario and reference PDFs. Not IWBI exam material.",
    disclaimer: wellDisclaimer,
    description:
      "A 50-question WELL AP readiness diagnostic across WELL v2 concepts — air, water, nourishment, light, movement, materials, mind, community, and certification process. Question bank loading — independent prep, not IWBI material.",
    examBody: "IWBI / GBCI (International WELL Building Institute)",
    lastUpdated: "2026-06-02",
    questionSourceNote:
      "Original UniPrep2Go questions (250-item bank, 50 per domain) authored via OpenRouter with Gemini cross-validation; each session samples 10 per domain.",
  },
  {
    slug: "cem-readiness-check",
    title: "Certified Energy Manager (CEM) Readiness Check",
    shortTitle: "CEM Readiness",
    linkedDeckSlug: "cem-anki-deck",
    status: "preview",
    accessMode: "free_demand_test",
    durationMinutes: 50,
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
      {
        id: "policy-audits-economics",
        label: "Energy Policy, Audits, and Economics",
        questionCount: 10,
        weightPercent: 20,
        targetPercent: 70,
      },
      {
        id: "electrical-lighting",
        label: "Electrical Systems, Motors, and Lighting",
        questionCount: 10,
        weightPercent: 20,
        targetPercent: 70,
      },
      {
        id: "hvac-envelope-bas",
        label: "HVAC, Building Envelope, and BAS",
        questionCount: 10,
        weightPercent: 20,
        targetPercent: 70,
      },
      {
        id: "industrial-boiler-renewables",
        label: "Industrial, Boiler/Steam, and Renewables",
        questionCount: 10,
        weightPercent: 20,
        targetPercent: 70,
      },
      {
        id: "commissioning-espc",
        label: "Commissioning, ESPC, and M&V",
        questionCount: 10,
        weightPercent: 20,
        targetPercent: 70,
      },
    ],
    officialSourceNote:
      "Readiness check sized to AEE's 65-question self-evaluation format. Official CEM exam: 130 questions (120 scored + 10 pretest), 4 hours, open book, scaled pass score 700 (0–1040 scale). Not AEE exam material.",
    disclaimer: aeeDisclaimer,
    description:
      "A 65-question CEM readiness diagnostic across AEE Body of Knowledge domains including audits, HVAC, electrical systems, renewables, and performance contracting. Question bank loading — independent prep, not AEE material.",
    examBody: "AEE (Association of Energy Engineers)",
    lastUpdated: "2026-06-02",
    questionSourceNote:
      "Original UniPrep2Go questions (250-item bank, 50 per domain) authored via OpenRouter with Gemini cross-validation; each session samples 10 per domain.",
  },
  {
    slug: "ashrae-certifications-readiness-check",
    title: "ASHRAE Certifications Readiness Check",
    shortTitle: "ASHRAE Certifications Readiness",
    linkedDeckSlug: "ashrae-certifications-anki-deck",
    status: "preview",
    accessMode: "free_demand_test",
    durationMinutes: 100,
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
      {
        id: "bemp-modeling",
        label: "Building Energy Modeling (BEMP)",
        questionCount: 10,
        weightPercent: 20,
        targetPercent: 70,
      },
      {
        id: "beap-assessment",
        label: "Building Energy Assessment (BEAP)",
        questionCount: 10,
        weightPercent: 20,
        targetPercent: 70,
      },
      {
        id: "bcxp-commissioning",
        label: "Building Commissioning (BCxP)",
        questionCount: 10,
        weightPercent: 20,
        targetPercent: 70,
      },
      {
        id: "chd-hbdp-design",
        label: "HVAC Design and High-Performance Design (CHD / HBDP / HFDP)",
        questionCount: 10,
        weightPercent: 20,
        targetPercent: 70,
      },
      {
        id: "opmp-operations",
        label: "Operations and Performance Management (OPMP)",
        questionCount: 10,
        weightPercent: 20,
        targetPercent: 70,
      },
    ],
    officialSourceNote:
      "Readiness check sampled across ASHRAE ANSI-accredited certification domains. Most ASHRAE exams: 115 items (100 scored + 15 pretest), 2.5 hours; BCxP: 130 items (120 scored); HFDP: 2 hours. Pass scores vary by credential (verify at ashrae.org).",
    disclaimer: ashraeDisclaimer,
    description:
      "A 50-question ASHRAE certifications readiness diagnostic across BEMP, BEAP, BCxP, CHD/HBDP/HFDP, and OPMP knowledge areas. Question bank loading — independent prep, not ASHRAE exam material.",
    examBody: "ASHRAE",
    lastUpdated: "2026-06-02",
    questionSourceNote:
      "Original UniPrep2Go questions (250-item bank, 50 per domain) authored via OpenRouter with Gemini cross-validation; each session samples 10 per domain.",
  },
  {
    slug: "cdcp-readiness-check",
    title: "Certified Data Centre Professional (CDCP) Readiness Check",
    shortTitle: "CDCP Readiness",
    linkedDeckSlug: "cdcp-anki-deck",
    status: "preview",
    accessMode: "free_demand_test",
    durationMinutes: 50,
    questionCount: 50,
    passRule: {
      type: "readiness_check",
      passPercent: 68,
      borderlinePercent: 65,
      verdictLabels: {
        pass: "READINESS PASS",
        noPass: "NO PASS",
        borderline: "BORDERLINE RISK",
      },
    },
    topics: [
      {
        id: "site-standards-building",
        label: "Site, Standards, and Building",
        questionCount: 10,
        weightPercent: 20,
        targetPercent: 68,
      },
      {
        id: "power-emf-distribution",
        label: "Power Infrastructure and EMF",
        questionCount: 10,
        weightPercent: 20,
        targetPercent: 68,
      },
      {
        id: "cooling-water-thermal",
        label: "Cooling, Water, and Thermal Management",
        questionCount: 10,
        weightPercent: 20,
        targetPercent: 68,
      },
      {
        id: "fire-security-network",
        label: "Fire Protection, Security, and Network",
        questionCount: 10,
        weightPercent: 20,
        targetPercent: 68,
      },
      {
        id: "operations-management",
        label: "Data Centre Operations",
        questionCount: 10,
        weightPercent: 20,
        targetPercent: 68,
      },
    ],
    officialSourceNote:
      "Readiness check sized to the official EXIN EPI CDCP exam: 40 multiple-choice questions, 60 minutes, closed book, 68% pass mark (27/40). Facilities ~85%, Operations ~15%. Not EXIN or EPI exam material.",
    disclaimer: cdcpDisclaimer,
    description:
      "A 40-question CDCP readiness diagnostic across data centre facilities (power, cooling, fire, security) and operations. Question bank loading — independent prep, not EXIN or EPI material.",
    examBody: "EXIN / EPI (Enterprise Products Integration)",
    lastUpdated: "2026-06-02",
    questionSourceNote:
      "Original UniPrep2Go questions (250-item bank, 50 per domain) authored via OpenRouter with Gemini cross-validation; each session samples 10 per domain.",
  },
  {
    slug: "nebosh-readiness-check",
    title: "NEBOSH International General Certificate Readiness Check",
    shortTitle: "NEBOSH IGC Readiness",
    linkedDeckSlug: "nebosh-anki-deck",
    status: "preview",
    accessMode: "free_demand_test",
    durationMinutes: 100,
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
      {
        id: "hsm-systems-culture",
        label: "H&S Management Systems, Culture, and Monitoring",
        questionCount: 10,
        weightPercent: 20,
        targetPercent: 70,
      },
      {
        id: "health-ergonomics",
        label: "Physical, Psychological, and Musculoskeletal Health",
        questionCount: 10,
        weightPercent: 20,
        targetPercent: 70,
      },
      {
        id: "agents-workplace-hazards",
        label: "Chemical, Biological, and General Workplace Hazards",
        questionCount: 10,
        weightPercent: 20,
        targetPercent: 70,
      },
      {
        id: "equipment-fire-electricity",
        label: "Work Equipment, Fire, and Electricity",
        questionCount: 10,
        weightPercent: 20,
        targetPercent: 70,
      },
      {
        id: "gic2-risk-assessment",
        label: "Risk Assessment and Control (GIC2)",
        questionCount: 10,
        weightPercent: 20,
        targetPercent: 70,
      },
    ],
    officialSourceNote:
      "Readiness check sampled across NEBOSH IGC syllabus elements (GIC1 OBE + GIC2 practical). Official GIC1: 5-hour open-book scenario exam, 100 marks, 45% pass (grade Distinction/Credit/Pass from GIC1 only). Official GIC2: 4-hour practical risk assessment — pass standard in GIC2 guidance. Not NEBOSH assessment material.",
    disclaimer: neboshDisclaimer,
    description:
      "A 50-question NEBOSH IGC readiness diagnostic across management systems, workplace hazards, and risk assessment skills. Question bank loading — independent prep, not NEBOSH material.",
    examBody: "NEBOSH (National Examination Board in Occupational Safety and Health)",
    lastUpdated: "2026-06-02",
    questionSourceNote:
      "Original UniPrep2Go questions (250-item bank, 50 per domain) authored via OpenRouter with Gemini cross-validation; each session samples 10 per domain.",
  },
  {
    slug: "cfps-readiness-check",
    title: "Certified Fire Protection Specialist (CFPS) Readiness Check",
    shortTitle: "CFPS Readiness",
    linkedDeckSlug: "cfps-anki-deck",
    status: "preview",
    accessMode: "free_demand_test",
    durationMinutes: 80,
    questionCount: 80,
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
      {
        id: "fire-suppression",
        label: "Fire Suppression",
        questionCount: 10,
        weightPercent: 13,
        targetPercent: 70,
      },
      {
        id: "safety-built-environment",
        label: "Safety in the Built Environment",
        questionCount: 10,
        weightPercent: 13,
        targetPercent: 70,
      },
      {
        id: "detection-alarm",
        label: "Detection and Alarm",
        questionCount: 10,
        weightPercent: 13,
        targetPercent: 70,
      },
      {
        id: "fire-prevention-programs",
        label: "Fire Prevention: Programs, Materials, Processes, and Environments",
        questionCount: 10,
        weightPercent: 12,
        targetPercent: 70,
      },
      {
        id: "information-analysis",
        label: "Information and Analysis for Fire Protection and Fire Science",
        questionCount: 10,
        weightPercent: 12,
        targetPercent: 70,
      },
      {
        id: "facility-hazard-management",
        label: "Facility Fire Hazard Management",
        questionCount: 10,
        weightPercent: 12,
        targetPercent: 70,
      },
      {
        id: "organizing-fire-rescue",
        label: "Organizing for Fire and Rescue Services",
        questionCount: 10,
        weightPercent: 12,
        targetPercent: 70,
      },
      {
        id: "confining-fires",
        label: "Confining Fires",
        questionCount: 10,
        weightPercent: 13,
        targetPercent: 70,
      },
    ],
    officialSourceNote:
      "Readiness check half-length (50 questions / 90 minutes) weighted to NFPA CFPS exam blueprint. Official exam: 100 multiple-choice questions, 3 hours, open book (original print NFPA Fire Protection Handbook, 21st Edition only). NFPA reports pass/fail only — no published passing score. Not NFPA exam material.",
    disclaimer: cfpsDisclaimer,
    description:
      "A 50-question CFPS readiness diagnostic across NFPA's eight fire protection domains including suppression, detection, built environment safety, and hazard management. Question bank loading — independent prep, not NFPA material.",
    examBody: "NFPA (National Fire Protection Association)",
    lastUpdated: "2026-06-02",
    questionSourceNote:
      "Original UniPrep2Go questions (400-item bank, 50 per NFPA domain) authored via OpenRouter with Gemini cross-validation; each session samples 10 per domain.",
  },
  {
    slug: "mrics-readiness-check",
    title: "MRICS Assessment of Professional Competence Readiness Check",
    shortTitle: "MRICS / APC Readiness",
    linkedDeckSlug: "mrics-anki-deck",
    status: "preview",
    accessMode: "free_demand_test",
    durationMinutes: 100,
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
      {
        id: "mandatory-competencies",
        label: "Mandatory Competencies (Personal and Business Skills)",
        questionCount: 10,
        weightPercent: 20,
        targetPercent: 70,
      },
      {
        id: "ethics-rules-conduct",
        label: "Ethics, Rules of Conduct, and Professionalism Module",
        questionCount: 10,
        weightPercent: 20,
        targetPercent: 70,
      },
      {
        id: "core-technical-pathway",
        label: "Core Technical Competencies (Level 1 Knowledge)",
        questionCount: 10,
        weightPercent: 20,
        targetPercent: 70,
      },
      {
        id: "level2-level3-application",
        label: "Level 2 Application and Level 3 Reasoned Advice",
        questionCount: 10,
        weightPercent: 20,
        targetPercent: 70,
      },
      {
        id: "case-study-interview",
        label: "Case Study, Submission, and Final Interview",
        questionCount: 10,
        weightPercent: 20,
        targetPercent: 70,
      },
    ],
    officialSourceNote:
      "Readiness check for APC final assessment knowledge — not a substitute for written submission or interview. Official MRICS route: written summary of experience, 3,000-word case study, CPD record, Professionalism Module, then 60-minute final assessment interview (10-min presentation + questioning). No multiple-choice licensure exam. Not RICS assessment material.",
    disclaimer: ricsDisclaimer,
    description:
      "A 50-question MRICS/APC readiness diagnostic across mandatory competencies, ethics, technical pathway knowledge, and interview preparation. Question bank loading — independent prep, not RICS material.",
    examBody: "RICS (Royal Institution of Chartered Surveyors)",
    lastUpdated: "2026-06-02",
    questionSourceNote:
      "Original UniPrep2Go questions (250-item bank, 50 per competency area) authored via OpenRouter with Gemini cross-validation; each session samples 10 per area.",
  },
  {
    slug: "mrics-quantity-surveying-readiness-check",
    title: "MRICS Quantity Surveying APC Readiness Check",
    shortTitle: "MRICS QS Readiness",
    linkedDeckSlug: "mrics-quantity-surveying-anki-deck",
    status: "preview",
    accessMode: "free_demand_test",
    durationMinutes: 100,
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
      {
        id: "commercial-cost-planning",
        label: "Commercial Management or Design Economics and Cost Planning",
        questionCount: 10,
        weightPercent: 20,
        targetPercent: 70,
      },
      {
        id: "quantification-measurement",
        label: "Quantification and Costing of Construction Works",
        questionCount: 10,
        weightPercent: 20,
        targetPercent: 70,
      },
      {
        id: "contracts-procurement",
        label: "Contract Practice and Procurement & Tendering",
        questionCount: 10,
        weightPercent: 20,
        targetPercent: 70,
      },
      {
        id: "project-finance-construction",
        label: "Project Finance and Construction Technology",
        questionCount: 10,
        weightPercent: 20,
        targetPercent: 70,
      },
      {
        id: "mandatory-ethics-optional",
        label: "Mandatory Competencies, Ethics, and Optional QS Skills",
        questionCount: 10,
        weightPercent: 20,
        targetPercent: 70,
      },
    ],
    officialSourceNote:
      "Readiness check for Quantity Surveying and Construction pathway APC knowledge. Official MRICS: six core competencies to Level 3 (including Commercial management OR Design economics and cost planning), two optional to Level 2, mandatory competencies, written submission, and 60-minute final interview — not a multiple-choice exam. Not RICS assessment material.",
    disclaimer: ricsDisclaimer,
    description:
      "A 50-question MRICS Quantity Surveying readiness diagnostic across QS core competencies — cost planning, measurement, contracts, procurement, project finance, and ethics. Question bank loading — independent prep, not RICS material.",
    examBody: "RICS — Quantity Surveying and Construction pathway",
    lastUpdated: "2026-06-02",
    questionSourceNote:
      "Original UniPrep2Go questions (250-item bank, 50 per competency area) authored via OpenRouter with Gemini cross-validation; each session samples 10 per area.",
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
