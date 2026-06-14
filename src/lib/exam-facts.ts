/**
 * Citable exam-fact layer for machine-readable outputs (.md, /api/facts, HTML).
 * Facts must be verifiable; omit fields rather than guess. Language decks have no profile.
 */

export type ExamFactsFields = {
  exam_name: string;
  administered_by: string;
  question_count?: string;
  scored_count?: string;
  time_limit?: string;
  scoring_scale?: string;
  passing_score?: string;
  delivery?: string;
  outline_effective_date?: string;
  verify_at_url: string;
};

export type DomainWeight = {
  domain: string;
  weight: string;
};

export type CandidateQA = {
  q: string;
  a: string;
};

export type OfficialSource = {
  label: string;
  url: string;
};

export type ExamFactsProfile = {
  examKey: string;
  pageHeading: string;
  intro: string;
  exam_facts: ExamFactsFields;
  official_sources?: OfficialSource[];
  domain_weights: DomainWeight[];
  whats_changed?: string[];
  high_yield_facts: string[];
  candidate_qa: CandidateQA[];
  trademark_note?: string;
};

const examProfiles: Record<string, ExamFactsProfile> = {
  ptce: {
    examKey: "ptce",
    pageHeading: "PTCB Pharmacy Technician Exam (PTCE) — 2026 Facts, Topics & Prep",
    intro:
      "The PTCE (Pharmacy Technician Certification Exam) is the certification exam administered by the Pharmacy Technician Certification Board (PTCB) in the United States. This page gives exam structure, the 2026 content outline, high-yield facts, and independent UniPrep2Go study products (not official PTCB material).",
    exam_facts: {
      exam_name: "Pharmacy Technician Certification Exam (PTCE)",
      administered_by: "Pharmacy Technician Certification Board (PTCB)",
      question_count: "90 multiple-choice (80 scored + 10 unscored pretest)",
      scored_count: "80",
      time_limit:
        "1 hour 50 minutes exam time (~2 hours total with 5-minute tutorial and 5-minute post-exam survey)",
      scoring_scale: "1,000–1,600 scaled score",
      passing_score: "1,400 scaled score",
      delivery:
        "In-person at Pearson VUE test centers nationwide (PTCE online proctoring suspended December 12, 2025)",
      outline_effective_date: "January 6, 2026",
      verify_at_url: "https://ptcb.org/credentials/certification/certified-pharmacy-technician/",
    },
    official_sources: [
      {
        label: "CPhT / PTCE exam overview",
        url: "https://ptcb.org/credentials/certification/certified-pharmacy-technician/",
      },
      {
        label: "PTCE Content Outline (effective January 6, 2026, v1.4)",
        url: "https://ptcb.org/wp-content/uploads/2025/07/PTCE-Content-Outline.pdf",
      },
      {
        label: "Pearson VUE — PTCE delivery (in-person only)",
        url: "https://www.pearsonvue.com/us/en/ptcb.html",
      },
    ],
    domain_weights: [
      { domain: "Medications", weight: "35.00%" },
      { domain: "Federal Requirements", weight: "18.75%" },
      { domain: "Patient Safety and Quality Assurance", weight: "23.75%" },
      { domain: "Order Entry and Processing", weight: "22.50%" },
    ],
    whats_changed: [
      "January 2026 outline weights: Medications 35%, Federal Requirements 18.75%, Patient Safety and Quality Assurance 23.75%, Order Entry and Processing 22.50% (PTCE Content Outline v1.4, August 2024).",
      "Federal Requirements increased from 12.5% and Medications decreased from 40% versus the pre-January 2026 PTCE content outline.",
      "Drug Supply Chain Security Act (DSCSA) traceability is listed under Federal Requirements (section 2.6) in the January 2026 outline.",
      "The January 2026 PTCE Content Outline does not include dedicated compounding or alligation knowledge areas.",
    ],
    high_yield_facts: [
      "DEA Schedule II drugs: no refills permitted; a new prescription is required each time (e.g., oxycodone, amphetamines, methylphenidate).",
      "DEA Schedules III–IV: up to 5 refills within 6 months if authorized.",
      "The five rights of medication safety: right patient, drug, dose, route, time.",
      "High-alert medications include insulin, anticoagulants, opioids, and chemotherapy agents.",
      "Refrigerated vaccine storage range: 2–8 °C with documented daily minimum and maximum temperatures.",
      "Days supply = quantity dispensed ÷ doses per day.",
      "IV flow rate (mL/hr) = total volume ÷ infusion time in hours.",
      "Percent strength: % w/v = grams per 100 mL; % w/w = grams per 100 g.",
      "Weight conversion: 1 kg = 2.2 lb (divide pounds by 2.2 for kilograms).",
      "DSCSA requires traceability of prescription drugs through the supply chain.",
    ],
    candidate_qa: [
      {
        q: "What score do you need to pass the PTCE?",
        a: "A scaled score of 1,400 on a 1,000–1,600 scale. Only 80 of the 90 questions are scored; 10 are unscored pretest items.",
      },
      {
        q: "How many questions is the PTCE and how long is it?",
        a: "90 multiple-choice questions in 1 hour 50 minutes of testing time.",
      },
      {
        q: "What are the PTCE knowledge domains for 2026?",
        a: "Medications (35%), Patient Safety and Quality Assurance (23.75%), Order Entry and Processing (22.5%), and Federal Requirements (18.75%).",
      },
      {
        q: "Is compounding still on the PTCE?",
        a: "The January 2026 PTCE Content Outline (effective January 6, 2026) does not include dedicated compounding or alligation knowledge areas.",
      },
      {
        q: "How is days supply calculated on the PTCE?",
        a: "Days supply = quantity dispensed ÷ doses per day.",
      },
    ],
    trademark_note:
      "PTCB® and PTCE® are registered marks of the Pharmacy Technician Certification Board.",
  },
  sie: {
    examKey: "sie",
    pageHeading: "FINRA SIE Exam — Facts, Topic Weights & Prep",
    intro:
      "The Securities Industry Essentials (SIE) is a FINRA qualification exam for candidates entering the U.S. securities industry. This page summarizes exam structure, official topic weights, and independent UniPrep2Go study products (not official FINRA material).",
    exam_facts: {
      exam_name: "Securities Industry Essentials (SIE)",
      administered_by: "FINRA",
      question_count: "75 multiple-choice",
      scored_count: "75",
      time_limit: "105 minutes",
      passing_score: "70% (pass/fail; no scaled score published)",
      delivery: "Computer-based at Prometric test centers",
      verify_at_url: "https://www.finra.org/registration-exams-ce/qualification-exams/securities-industry-essentials-exam-sie",
    },
    official_sources: [
      {
        label: "FINRA SIE exam overview",
        url: "https://www.finra.org/registration-exams-ce/qualification-exams/securities-industry-essentials-exam-sie",
      },
      {
        label: "FINRA SIE content outline (PDF)",
        url: "https://www.finra.org/sites/default/files/2022-06/SIE_Exam_Content_Outline.pdf",
      },
    ],
    domain_weights: [
      { domain: "Knowledge of Capital Markets", weight: "16%" },
      { domain: "Understanding Products and Their Risks", weight: "44%" },
      { domain: "Understanding Trading, Customer Accounts, and Prohibited Activities", weight: "31%" },
      { domain: "Overview of the Regulatory Framework", weight: "9%" },
    ],
    high_yield_facts: [
      "The SEC regulates securities markets and issuers; FINRA is the SRO overseeing broker-dealers and registered representatives.",
      "The MSRB writes rules for municipal securities dealers and municipal advisors.",
      "SIPC protects customer assets if a broker-dealer fails; it does not protect against market loss.",
      "A margin account lets a customer borrow from the broker to purchase securities; Reg T sets initial margin requirements.",
      "Market orders execute at the best available price; limit orders execute only at the specified price or better.",
      "Insider trading prohibitions apply to material nonpublic information about a security.",
      "The SIE is a prerequisite exam; passing it does not register a person with FINRA — a firm sponsorship is required for registration.",
    ],
    candidate_qa: [
      {
        q: "What score do you need to pass the SIE exam?",
        a: "FINRA reports SIE results as pass/fail. Candidates typically prepare for a 70% threshold on practice exams; verify current rules at finra.org.",
      },
      {
        q: "How many questions are on the SIE and how long is the exam?",
        a: "75 multiple-choice questions in 105 minutes.",
      },
      {
        q: "What topics does the SIE cover?",
        a: "Capital markets (16%), products and their risks (44%), trading and customer accounts (31%), and the regulatory framework (9%).",
      },
      {
        q: "Does passing the SIE register you as a representative?",
        a: "No. Passing the SIE is a prerequisite; you still need firm sponsorship and completion of a top-off exam (such as Series 7) for registration.",
      },
    ],
  },
  "series-7": {
    examKey: "series-7",
    pageHeading: "FINRA Series 7 Top-Off Exam — Facts, Job Functions & Prep",
    intro:
      "The Series 7 Top-Off (General Securities Representative) is a FINRA qualification exam for registered representatives. This page summarizes structure, job-function weights, and independent UniPrep2Go study products (not official FINRA material).",
    exam_facts: {
      exam_name: "Series 7 Top-Off (General Securities Representative)",
      administered_by: "FINRA",
      question_count: "125 multiple-choice",
      scored_count: "125",
      time_limit: "3 hours 45 minutes",
      passing_score: "Pass/fail; candidates typically prepare for ~72% on practice exams",
      delivery: "Computer-based at Prometric test centers",
      verify_at_url: "https://www.finra.org/registration-exams-ce/qualification-exams/series7-exam",
    },
    official_sources: [
      {
        label: "FINRA Series 7 exam overview",
        url: "https://www.finra.org/registration-exams-ce/qualification-exams/series7-exam",
      },
      {
        label: "FINRA Series 7 content outline (PDF)",
        url: "https://www.finra.org/sites/default/files/2022-06/Series_7_Exam_Content_Outline.pdf",
      },
    ],
    domain_weights: [
      { domain: "Seeks Business for the Broker-Dealer from Customers and Potential Customers", weight: "7%" },
      { domain: "Opens Accounts After Obtaining and Evaluating Customer Financial Profile and Investment Objectives", weight: "9%" },
      { domain: "Provides Customers with Information About Investments, Makes Recommendations, Transfers Assets, and Maintains Appropriate Records", weight: "73%" },
      { domain: "Obtains and Verifies Customer's Purchase and Sales Instructions and Agreements; Processes, Completes, and Confirm Transactions", weight: "11%" },
    ],
    high_yield_facts: [
      "Suitability requires that recommendations match a customer's investment profile, objectives, and risk tolerance.",
      "Registered representatives must disclose material conflicts of interest and compensation arrangements.",
      "Options strategies require approval levels matching customer experience and financial capacity.",
      "Mutual fund breakpoints reduce sales charges as purchase size increases.",
      "Municipal securities may be tax-exempt at the federal level and sometimes at state/local levels.",
      "A customer complaint must be reported to FINRA when certain thresholds are met; firms maintain a central log.",
    ],
    candidate_qa: [
      {
        q: "How many questions are on the Series 7 Top-Off?",
        a: "125 multiple-choice questions in 3 hours 45 minutes.",
      },
      {
        q: "What is the largest Series 7 job-function area?",
        a: "Providing investment information, recommendations, and maintaining records — 73% of the exam outline.",
      },
      {
        q: "Do you need to pass the SIE before Series 7?",
        a: "Yes. FINRA requires passing the SIE before the Series 7 Top-Off for new registrants.",
      },
    ],
  },
  "series-63": {
    examKey: "series-63",
    pageHeading: "NASAA Series 63 Exam — Facts, State Law Topics & Prep",
    intro:
      "The Series 63 (Uniform Securities Agent State Law Examination) is a NASAA state-law exam required for many U.S. securities agents. This page summarizes structure and topic areas; verify pass requirements with your state regulator (not official NASAA material).",
    exam_facts: {
      exam_name: "Uniform Securities Agent State Law Examination (Series 63)",
      administered_by: "NASAA (administered by FINRA)",
      question_count: "60 multiple-choice",
      scored_count: "60",
      time_limit: "75 minutes",
      passing_score: "72% in most states (verify with your state securities regulator)",
      delivery: "Computer-based at Prometric test centers",
      verify_at_url: "https://www.nasaa.org/exams/",
    },
    official_sources: [
      {
        label: "NASAA qualification exams",
        url: "https://www.nasaa.org/exams/",
      },
      {
        label: "Series 63 exam content (FINRA)",
        url: "https://www.finra.org/registration-exams-ce/qualification-exams/series63-exam",
      },
    ],
    domain_weights: [
      { domain: "Ethical Practices and Fiduciary Obligations", weight: "25%" },
      { domain: "Communications with Customers and the Public", weight: "20%" },
      { domain: "Agent Registration and Qualification", weight: "13%" },
      { domain: "Broker-Dealer Registration and Regulation", weight: "12%" },
      { domain: "Administrative Provisions and Remedies", weight: "12%" },
      { domain: "Securities Registration and Exemptions", weight: "9%" },
      { domain: "Investment Advisers and Representatives", weight: "9%" },
    ],
    high_yield_facts: [
      "The Uniform Securities Act (USA) is the model state law many jurisdictions adopt for securities regulation.",
      "Agents must register in each state where they conduct business, subject to de minimis exemptions.",
      "Fiduciary duty requires placing the customer's interest ahead of the agent's when giving advice.",
      "Advertising and sales literature must be fair, balanced, and not misleading.",
      "Administrative penalties can include fines, suspension, and revocation of registration.",
    ],
    candidate_qa: [
      {
        q: "How many questions are on the Series 63?",
        a: "60 multiple-choice questions in 75 minutes.",
      },
      {
        q: "What does the Series 63 test?",
        a: "State securities law, agent registration, ethical practices, communications, and investment adviser basics under the Uniform Securities Act framework.",
      },
      {
        q: "Is the Series 63 passing score the same in every state?",
        a: "Most states use 72%, but verify the current requirement with your state securities regulator before scheduling.",
      },
    ],
  },
  "life-health-insurance": {
    examKey: "life-health-insurance",
    pageHeading: "Life & Health Insurance License Exam — Facts & Prep",
    intro:
      "U.S. Life and Health insurance producer licensing exams are state-administered (often via PSI or Pearson VUE). Outlines vary by state; this page summarizes common topic areas and independent UniPrep2Go study products (not official state exam material).",
    exam_facts: {
      exam_name: "Life and Health Insurance Producer Licensing Exam",
      administered_by: "State insurance department (exam vendor varies by state)",
      question_count: "Varies by state; commonly 100–150 multiple-choice",
      time_limit: "Varies by state; commonly 2–3 hours",
      passing_score: "Varies by state; commonly 70%",
      delivery: "Computer-based at authorized testing centers",
      verify_at_url: "https://www.naic.org",
    },
    official_sources: [
      { label: "NAIC — state insurance regulation", url: "https://www.naic.org" },
      {
        label: "PSI insurance licensing exams (common vendor)",
        url: "https://test-takers.psiexams.com/insurance",
      },
    ],
    domain_weights: [
      { domain: "Health Insurance", weight: "~21%" },
      { domain: "Life Insurance Basics", weight: "~18%" },
      { domain: "Policy Provisions, Options, and Riders", weight: "~18%" },
      { domain: "General Insurance Concepts", weight: "~12%" },
      { domain: "Annuities", weight: "~11%" },
      { domain: "Taxation and Regulation", weight: "~11%" },
      { domain: "Disability and Long-Term Care", weight: "~9%" },
    ],
    high_yield_facts: [
      "An insurable interest must exist at the time of application for life insurance on another person.",
      "Whole life provides permanent coverage with a cash value component; term life provides coverage for a set period.",
      "The free-look period lets a policyowner cancel within a state-mandated window after delivery.",
      "Medicare Part A covers hospital insurance; Part B covers medical services; Part D covers prescription drugs.",
      "HMO plans require use of network providers; PPO plans allow out-of-network care at higher cost sharing.",
    ],
    candidate_qa: [
      {
        q: "What is on the Life and Health insurance license exam?",
        a: "Typical outlines cover life insurance basics, health insurance, policy provisions, annuities, disability, long-term care, and state regulation — exact weights vary by state.",
      },
      {
        q: "Is the insurance licensing exam the same in every state?",
        a: "No. Each state sets its outline, question count, and passing score; verify with your state Department of Insurance before scheduling.",
      },
    ],
  },
  "property-casualty-insurance": {
    examKey: "property-casualty-insurance",
    pageHeading: "Property & Casualty Insurance License Exam — Facts & Prep",
    intro:
      "U.S. Property and Casualty insurance producer licensing exams are state-administered. Outlines vary by state; this page summarizes common P&C topic areas and independent UniPrep2Go study products (not official state exam material).",
    exam_facts: {
      exam_name: "Property and Casualty Insurance Producer Licensing Exam",
      administered_by: "State insurance department (exam vendor varies by state)",
      question_count: "Varies by state; commonly 100–150 multiple-choice",
      time_limit: "Varies by state; commonly 2–3 hours",
      passing_score: "Varies by state; commonly 70%",
      delivery: "Computer-based at authorized testing centers",
      verify_at_url: "https://www.naic.org",
    },
    official_sources: [
      { label: "NAIC — state insurance regulation", url: "https://www.naic.org" },
      {
        label: "PSI insurance licensing exams (common vendor)",
        url: "https://test-takers.psiexams.com/insurance",
      },
    ],
    domain_weights: [
      { domain: "Dwelling and Homeowners Policies", weight: "~22%" },
      { domain: "Casualty and Liability", weight: "~18%" },
      { domain: "Personal and Commercial Auto", weight: "~15%" },
      { domain: "Property Insurance Basics", weight: "~14%" },
      { domain: "Commercial Property", weight: "~14%" },
      { domain: "General Insurance Concepts", weight: "~11%" },
      { domain: "Policy Conditions and Regulation", weight: "~6%" },
    ],
    high_yield_facts: [
      "Homeowners HO-3 is an open-perils policy on the dwelling and named-perils on personal property.",
      "Liability coverage pays for bodily injury and property damage the insured is legally obligated to pay.",
      "Collision covers vehicle impact damage; comprehensive covers non-collision losses such as theft and hail.",
      "Workers compensation provides medical and wage benefits for work-related injuries regardless of fault.",
      "An insurable interest and proximate cause are foundational concepts on P&C exams.",
    ],
    candidate_qa: [
      {
        q: "What is on the Property and Casualty insurance license exam?",
        a: "Typical outlines cover homeowners, auto, commercial property, general liability, workers compensation, and regulation — exact weights vary by state.",
      },
      {
        q: "Is the P&C licensing exam the same in every state?",
        a: "No. Each state sets its outline and passing score; verify with your state Department of Insurance.",
      },
    ],
  },
  "california-real-estate": {
    examKey: "california-real-estate",
    pageHeading: "California Real Estate Salesperson Exam — Facts & Prep",
    intro:
      "The California Department of Real Estate (DRE) salesperson exam qualifies candidates for a California real estate license. This page summarizes structure and topic areas and independent UniPrep2Go study products (not official DRE material).",
    exam_facts: {
      exam_name: "California Real Estate Salesperson Examination",
      administered_by: "California Department of Real Estate (DRE)",
      question_count: "150 multiple-choice (75 national + 75 state-specific)",
      scored_count: "150",
      time_limit: "3 hours 15 minutes",
      passing_score: "70% on both the national and California portions",
      delivery: "Computer-based at authorized testing centers",
      verify_at_url: "https://www.dre.ca.gov",
    },
    official_sources: [
      { label: "California DRE", url: "https://www.dre.ca.gov" },
      {
        label: "DRE salesperson exam reference book",
        url: "https://www.dre.ca.gov/files/pdf/ReferenceBook.pdf",
      },
    ],
    domain_weights: [
      { domain: "Real Estate Practice and Disclosures", weight: "~25%" },
      { domain: "Agency and Fiduciary Duties", weight: "~17%" },
      { domain: "Ownership, Land Use, and Property Rights", weight: "~15%" },
      { domain: "Valuation and Market Analysis", weight: "~14%" },
      { domain: "Contracts", weight: "~12%" },
      { domain: "Financing", weight: "~9%" },
      { domain: "Transfer of Property", weight: "~8%" },
    ],
    high_yield_facts: [
      "A California salesperson must work under a licensed broker; brokers may operate independently.",
      "Agency disclosure must be provided to buyers and sellers at first substantive contact.",
      "The Natural Hazard Disclosure (NHD) report covers zones such as flood, fire, and earthquake fault areas.",
      "Transfer Disclosure Statement (TDS) is required from the seller in most residential transactions.",
      "California community property law affects how married couples hold title.",
    ],
    candidate_qa: [
      {
        q: "How many questions are on the California real estate salesperson exam?",
        a: "150 multiple-choice questions (75 national and 75 California-specific) in 3 hours 15 minutes.",
      },
      {
        q: "What score is needed to pass the California real estate exam?",
        a: "70% on both the national and California portions.",
      },
    ],
  },
  servsafe: {
    examKey: "servsafe",
    pageHeading: "ServSafe Manager Certification Exam — Facts & Prep",
    intro:
      "The ServSafe Manager exam certifies food protection managers in the United States. This page summarizes exam structure and food-safety facts plus independent UniPrep2Go study products (not official ServSafe or National Restaurant Association material).",
    exam_facts: {
      exam_name: "ServSafe Food Protection Manager Certification Examination",
      administered_by: "National Restaurant Association (ServSafe program)",
      question_count: "90 multiple-choice",
      scored_count: "90",
      time_limit: "2 hours",
      passing_score: "75%",
      delivery: "Computer-based at approved test providers or online proctoring (where available)",
      verify_at_url: "https://www.servsafe.com",
    },
    official_sources: [
      { label: "ServSafe Manager certification", url: "https://www.servsafe.com/ServSafe-Manager" },
      {
        label: "ServSafe Manager exam facts (NRA)",
        url: "https://www.servsafe.com/ServSafe-Manager/Get-Certified",
      },
    ],
    domain_weights: [
      { domain: "Foodborne Microorganisms and Contamination", weight: "Exam domain" },
      { domain: "Foodborne Illness and Prevention", weight: "Exam domain" },
      { domain: "Personal Hygiene", weight: "Exam domain" },
      { domain: "Purchasing, Receiving, and Storage", weight: "Exam domain" },
      { domain: "Preparation, Cooking, and Serving", weight: "Exam domain" },
      { domain: "Facilities, Cleaning, and Sanitizing", weight: "Exam domain" },
      { domain: "Pest Management", weight: "Exam domain" },
      { domain: "Regulatory Compliance and HACCP", weight: "Exam domain" },
    ],
    high_yield_facts: [
      "The temperature danger zone for TCS food is 41°F to 135°F (5°C to 57°C).",
      "Cold TCS food must be held at 41°F (5°C) or below.",
      "Hot TCS food must be held at 135°F (57°C) or above.",
      "Cross-contamination is the transfer of pathogens from one surface or food to another.",
      "Sanitizing reduces pathogens on a cleaned surface to safe levels; cleaning must precede sanitizing.",
      "The internal cooking temperature for poultry is 165°F (74°C) for 15 seconds.",
      "HACCP is a systematic approach to identifying, evaluating, and controlling food safety hazards.",
    ],
    candidate_qa: [
      {
        q: "How many questions are on the ServSafe Manager exam?",
        a: "90 multiple-choice questions in 2 hours.",
      },
      {
        q: "What score do you need to pass ServSafe Manager?",
        a: "75% — verify current requirements at servsafe.com before scheduling.",
      },
      {
        q: "What is the food temperature danger zone?",
        a: "41°F to 135°F (5°C to 57°C) — the range where pathogens can grow quickly in TCS food.",
      },
    ],
  },
  "cfa-level-1": {
    examKey: "cfa-level-1",
    pageHeading: "CFA Level 1 Exam — Facts, Topic Weights & Prep",
    intro:
      "The CFA Level 1 exam is administered by CFA Institute for investment professionals. This page summarizes structure, 2025 topic weights, and independent UniPrep2Go study products (not official CFA Institute material).",
    exam_facts: {
      exam_name: "CFA Level 1",
      administered_by: "CFA Institute",
      question_count: "180 multiple-choice (two 90-question sessions)",
      scored_count: "180",
      time_limit: "4 hours 30 minutes total (two sessions with optional break)",
      passing_score: "No fixed passing score published; CFA Institute sets the MPS each cycle",
      delivery: "Computer-based at Prometric test centers",
      outline_effective_date: "2025 exam cycle topic weights",
      verify_at_url: "https://www.cfainstitute.org/programs/cfa-program/candidate-resources/level-i-exams",
    },
    official_sources: [
      {
        label: "CFA Level I exam overview",
        url: "https://www.cfainstitute.org/programs/cfa-program/candidate-resources/level-i-exams",
      },
      {
        label: "CFA Program curriculum and topic weights",
        url: "https://www.cfainstitute.org/programs/cfa-program/candidate-resources/level-i-exams",
      },
    ],
    domain_weights: [
      { domain: "Ethical and Professional Standards", weight: "15–20%" },
      { domain: "Quantitative Methods", weight: "6–9%" },
      { domain: "Economics", weight: "6–9%" },
      { domain: "Financial Statement Analysis", weight: "11–14%" },
      { domain: "Corporate Issuers", weight: "6–9%" },
      { domain: "Equity Investments", weight: "11–14%" },
      { domain: "Fixed Income", weight: "11–14%" },
      { domain: "Derivatives", weight: "5–8%" },
      { domain: "Alternative Investments", weight: "7–10%" },
      { domain: "Portfolio Management", weight: "8–12%" },
    ],
    high_yield_facts: [
      "Ethics and Professional Standards is heavily weighted and can determine pass/fail for borderline candidates.",
      "FIFO assumes the first units purchased are sold first; LIFO is not permitted under IFRS.",
      "Duration measures the sensitivity of a bond's price to a change in yield.",
      "The CAPM relates expected return to systematic risk (beta).",
      "Derivatives include forwards, futures, options, and swaps — each with distinct payoff profiles.",
    ],
    candidate_qa: [
      {
        q: "How many questions are on CFA Level 1?",
        a: "180 multiple-choice questions split across two 90-question sessions (4 hours 30 minutes total with optional break).",
      },
      {
        q: "What are the CFA Level 1 topic weights?",
        a: "Ten topics ranging from 5–8% (Derivatives) to 15–20% (Ethics); see cfainstitute.org for the current cycle.",
      },
      {
        q: "Is there a fixed passing score for CFA Level 1?",
        a: "No published cutoff. CFA Institute sets the minimum passing score (MPS) after each exam administration.",
      },
    ],
    trademark_note:
      "CFA® and Chartered Financial Analyst® are trademarks owned by CFA Institute.",
  },
  "frm-part-1": {
    examKey: "frm-part-1",
    pageHeading: "FRM Part 1 Exam — Facts, Topic Weights & Prep",
    intro:
      "FRM Part 1 is the first of two exams for the Financial Risk Manager certification administered by GARP. This page summarizes structure, topic weights, and independent UniPrep2Go study products (not official GARP material).",
    exam_facts: {
      exam_name: "Financial Risk Manager (FRM) Part 1",
      administered_by: "Global Association of Risk Professionals (GARP)",
      question_count: "100 multiple-choice",
      scored_count: "100",
      time_limit: "4 hours",
      passing_score: "No fixed passing score published; GARP sets the cutoff each cycle",
      delivery: "Computer-based at Pearson VUE test centers",
      verify_at_url: "https://www.garp.org/frm",
    },
    official_sources: [
      { label: "GARP FRM Program", url: "https://www.garp.org/frm" },
      {
        label: "FRM Part 1 learning objectives",
        url: "https://www.garp.org/frm/part-1",
      },
    ],
    domain_weights: [
      { domain: "Foundations of Risk Management", weight: "20%" },
      { domain: "Quantitative Analysis", weight: "20%" },
      { domain: "Financial Markets and Products", weight: "30%" },
      { domain: "Valuation and Risk Models", weight: "30%" },
    ],
    high_yield_facts: [
      "Value at Risk (VaR) estimates the maximum loss over a horizon at a given confidence level.",
      "Delta measures the sensitivity of an option's price to the underlying asset price.",
      "Credit risk is the risk of loss from a counterparty's failure to meet contractual obligations.",
      "Basel frameworks set capital requirements for banking institutions.",
      "Expected shortfall (CVaR) averages losses beyond the VaR threshold.",
    ],
    candidate_qa: [
      {
        q: "How many questions are on FRM Part 1?",
        a: "100 multiple-choice questions in 4 hours.",
      },
      {
        q: "What are the FRM Part 1 topic weights?",
        a: "Foundations of Risk Management (20%), Quantitative Analysis (20%), Financial Markets and Products (30%), Valuation and Risk Models (30%).",
      },
      {
        q: "Do you need to pass FRM Part 1 before Part 2?",
        a: "Yes. Candidates must pass Part 1 before Part 2 can be graded.",
      },
    ],
  },
  "cfa-level-2": {
    examKey: "cfa-level-2",
    pageHeading: "CFA Level 2 Exam — Facts, Topic Weights & Prep",
    intro:
      "The CFA Level 2 exam uses vignette-based item sets for investment professionals who passed Level 1. This page summarizes exam structure, topic weights, and independent UniPrep2Go study products (not official CFA Institute material).",
    exam_facts: {
      exam_name: "CFA Level 2",
      administered_by: "CFA Institute",
      question_count: "88 vignette-linked multiple-choice (22 item sets × 4 questions per session; 2 sessions)",
      scored_count: "88",
      time_limit: "4 hours 24 minutes total (two 132-minute sessions with optional break)",
      passing_score: "No fixed passing score published; CFA Institute sets the MPS each cycle",
      delivery: "Computer-based at Prometric test centers",
      outline_effective_date: "2025–2026 exam cycle topic weights",
      verify_at_url: "https://www.cfainstitute.org/programs/cfa-program/candidate-resources/level-ii-exams",
    },
    official_sources: [
      {
        label: "CFA Level II exam overview",
        url: "https://www.cfainstitute.org/programs/cfa-program/candidate-resources/level-ii-exams",
      },
    ],
    domain_weights: [
      { domain: "Ethical and Professional Standards", weight: "10–15%" },
      { domain: "Quantitative Methods", weight: "5–10%" },
      { domain: "Economics", weight: "5–10%" },
      { domain: "Financial Statement Analysis", weight: "10–15%" },
      { domain: "Corporate Issuers", weight: "5–10%" },
      { domain: "Equity Valuation", weight: "10–15%" },
      { domain: "Fixed Income", weight: "10–15%" },
      { domain: "Derivatives", weight: "5–10%" },
      { domain: "Alternative Investments", weight: "5–10%" },
      { domain: "Portfolio Management", weight: "10–15%" },
    ],
    high_yield_facts: [
      "Level 2 tests application in vignettes — formulas must be tied to a short case, not recalled in isolation.",
      "FCFF = NI + NCC + Int(1 − t) − FCInv − WCInv; FCFE = NI + NCC − FCInv − WCInv + Net Borrowing.",
      "Pension accounting (IFRS vs U.S. GAAP) and intercorporate investments are core FSA vignette topics.",
      "Arbitrage-free fixed income valuation and binomial trees appear frequently in fixed income item sets.",
      "Ethics at Level 2 emphasizes the Code and Standards applied to portfolio management and research conflicts.",
    ],
    candidate_qa: [
      {
        q: "How many questions are on CFA Level 2?",
        a: "88 multiple-choice questions grouped into 44 vignette item sets (22 per session, typically 4 questions per vignette).",
      },
      {
        q: "How long is the CFA Level 2 exam?",
        a: "Two 132-minute sessions (4 hours 24 minutes total), plus an optional break between sessions.",
      },
      {
        q: "What format is CFA Level 2?",
        a: "Vignette-based item sets — each mini-case has several linked multiple-choice questions; not standalone one-liners like Level 1.",
      },
      {
        q: "What are the CFA Level 2 topic weights?",
        a: "Ten topics; Financial Statement Analysis, Equity, Fixed Income, Portfolio Management, and Ethics are each 10–15%; Quant, Economics, Corporate Issuers, Derivatives, and Alternatives are 5–10%.",
      },
    ],
    trademark_note:
      "CFA® and Chartered Financial Analyst® are trademarks owned by CFA Institute.",
  },
  "cat4-level-d": {
    examKey: "cat4-level-d",
    pageHeading: "CAT4 Level D — Facts, Subtests & Prep (Year 7 / Grade 7)",
    intro:
      "CAT4 Level D is a cognitive abilities test from GL Assessment used for UK school admissions and benchmarking at ages 11:6–14:11. This page summarizes structure and subtests; independent UniPrep2Go materials cover four verbal and quantitative subtests only (not official GL Assessment material).",
    exam_facts: {
      exam_name: "Cognitive Abilities Test — Fourth Edition (CAT4) Level D",
      administered_by: "GL Assessment",
      question_count: "Multiple-choice across four batteries (exact count not published)",
      time_limit: "2 hours 15 minutes total (three 45-minute tests)",
      passing_score: "No pass/fail score; schools use Standard Age Scores (mean 100, SD 15) and stanines",
      delivery: "Paper or digital at participating schools (group administration)",
      outline_effective_date: "CAT4 Level D age band: 11 years 6 months to 14 years 11 months",
      verify_at_url: "https://www.gl-assessment.co.uk/products/cat4/",
    },
    official_sources: [
      {
        label: "GL Assessment CAT4 product page",
        url: "https://www.gl-assessment.co.uk/products/cat4/",
      },
    ],
    domain_weights: [
      { domain: "Verbal Reasoning — Verbal Classification", weight: "Verbal battery" },
      { domain: "Verbal Reasoning — Verbal Analogies", weight: "Verbal battery" },
      { domain: "Quantitative Reasoning — Number Analogies", weight: "Quantitative battery" },
      { domain: "Quantitative Reasoning — Number Series", weight: "Quantitative battery" },
      { domain: "Non-verbal Reasoning — Figure Classification & Matrices", weight: "Non-verbal battery (not in this product)" },
      { domain: "Spatial Ability — Figure Analysis & Recognition", weight: "Spatial battery (not in this product)" },
    ],
    whats_changed: [
      "CAT4 Level D targets students aged 11:6 to 14:11 (typically UK Year 7–9 / selective entry cohorts).",
      "Full CAT4 includes verbal, quantitative, non-verbal, and spatial batteries; this UniPrep2Go bundle covers the four verbal and quantitative subtests only.",
    ],
    high_yield_facts: [
      "Verbal analogies test word relationships (synonym, antonym, part-whole, category-member).",
      "Verbal classification groups words by a shared rule; the odd-one-out must break that rule.",
      "Number analogies require the same transformation between both pairs (e.g., ×2 then +1).",
      "Number series items follow a consistent rule across consecutive terms — check differences, ratios, and alternating patterns.",
      "CAT4 reports Standard Age Scores with a mean of 100 and standard deviation of 15 for age-normed comparison.",
    ],
    candidate_qa: [
      {
        q: "What age is CAT4 Level D for?",
        a: "Level D is designed for students aged 11 years 6 months to 14 years 11 months (commonly UK Year 7–9 selective entry).",
      },
      {
        q: "How long is the CAT4 test?",
        a: "Three tests of 45 minutes each — 2 hours 15 minutes total, plus practice examples that are not timed.",
      },
      {
        q: "What subtests are in CAT4 Level D?",
        a: "Four batteries: Verbal Reasoning (Classification, Analogies), Quantitative Reasoning (Number Analogies, Number Series), Non-verbal Reasoning, and Spatial Ability.",
      },
      {
        q: "Is there a passing score on CAT4?",
        a: "No universal pass mark. Schools interpret Standard Age Scores, stanines, and percentile ranks for admissions or placement.",
      },
    ],
    trademark_note: "CAT4 is a product of GL Assessment. Not affiliated with or endorsed by GL Assessment.",
  },
  "ib-biology-sl": {
    examKey: "ib-biology-sl",
    pageHeading: "IB Biology Standard Level — Exam Facts & Prep",
    intro:
      "IB Biology SL is assessed by the International Baccalaureate Organization through written papers and internal assessment. This page summarizes exam structure and syllabus themes plus independent UniPrep2Go study products (not official IBO material).",
    exam_facts: {
      exam_name: "IB Diploma Programme Biology — Standard Level",
      administered_by: "International Baccalaureate Organization (IBO)",
      question_count: "Paper 1: 30 MCQ; Paper 2: short-answer and extended response; Paper 3: practical/data questions",
      time_limit: "Paper 1: 45 min; Paper 2: 1 hr 15 min; Paper 3: 1 hr (SL)",
      passing_score: "Graded 1–7; grade boundaries set by IB each session",
      delivery: "School-administered IB examinations in May or November sessions",
      verify_at_url: "https://www.ibo.org/programmes/diploma-programme/curriculum/sciences/biology/",
    },
    official_sources: [
      {
        label: "IB Biology DP subject page",
        url: "https://www.ibo.org/programmes/diploma-programme/curriculum/sciences/biology/",
      },
    ],
    domain_weights: [
      { domain: "Unity and Diversity", weight: "Core theme" },
      { domain: "Form and Function", weight: "Core theme" },
      { domain: "Interaction and Interdependence", weight: "Core theme" },
      { domain: "Continuity and Change", weight: "Core theme" },
    ],
    high_yield_facts: [
      "Alpha-glucose forms starch and glycogen; beta-glucose forms cellulose with 1–4 glycosidic bonds.",
      "Cellulose microfibrils gain tensile strength from hydrogen bonding between parallel beta-glucose chains.",
      "Enzymes lower activation energy; rate depends on substrate concentration, temperature, and pH.",
      "DNA replication is semi-conservative; transcription produces mRNA from a DNA template.",
      "Photosynthesis light-dependent reactions occur in thylakoids; Calvin cycle in the stroma.",
    ],
    candidate_qa: [
      {
        q: "How is IB Biology SL assessed?",
        a: "Three written papers at SL (MCQ, structured/data response, and practical-style questions) plus internal assessment (IA) marked by teachers and moderated by IB.",
      },
      {
        q: "How long is IB Biology SL Paper 1?",
        a: "45 minutes for 30 multiple-choice questions (20% of final grade at SL).",
      },
      {
        q: "What is the difference between IB Biology SL and HL?",
        a: "HL includes additional topics, more Paper 2/3 time, and an extra HL-only Paper 3 section; SL covers shared core themes only.",
      },
    ],
    trademark_note:
      "International Baccalaureate and IB are registered trademarks of the International Baccalaureate Organization.",
  },
};

/** Deck slug → shared exam profile key. Language decks are omitted intentionally. */
const deckExamKeyMap: Record<string, string> = {
  "ptcb-pharmacy-technician-anki-deck": "ptce",
  "ptcb-study-guide-2026": "ptce",
  "sie-exam-anki-deck": "sie",
  "series-7-anki-deck": "series-7",
  "series-63-anki-deck": "series-63",
  "life-and-health-insurance-exam-anki-deck": "life-health-insurance",
  "property-casualty-insurance-exam-anki-deck": "property-casualty-insurance",
  "california-real-estate-exam-anki-deck": "california-real-estate",
  "servsafe-manager-anki-deck": "servsafe",
  "servsafe-manager-complete-study-guide": "servsafe",
  "cfa-level-1-anki-deck": "cfa-level-1",
  "cfa-level-1-formula-reference-2026": "cfa-level-1",
  "cfa-level-1-formula-deck": "cfa-level-1",
  "frm-part-1-anki-deck": "frm-part-1",
  "cfa-level-2-anki-deck": "cfa-level-2",
  "cfa-level-2-formula-reference-2026": "cfa-level-2",
  "cat4-level-d-anki-deck-printable-pdf": "cat4-level-d",
  "ib-biology-sl-anki-deck": "ib-biology-sl",
};

export function getExamFactsProfileForDeck(slug: string): ExamFactsProfile | null {
  const examKey = deckExamKeyMap[slug];
  if (!examKey) return null;
  return examProfiles[examKey] ?? null;
}

export function hasCitableExamLayer(slug: string): boolean {
  return getExamFactsProfileForDeck(slug) !== null;
}

/** All catalog slugs mapped to a citable exam-facts profile (language decks excluded). */
export function listCitableExamDeckSlugs(): string[] {
  return Object.keys(deckExamKeyMap);
}

export function buildExamFactsJson(profile: ExamFactsProfile) {
  return {
    exam_facts: profile.exam_facts,
    official_sources:
      profile.official_sources ??
      [{ label: "Verify at official source", url: profile.exam_facts.verify_at_url }],
    domain_weights: profile.domain_weights,
    whats_changed: profile.whats_changed ?? [],
    high_yield_facts: profile.high_yield_facts,
    candidate_qa: profile.candidate_qa,
    trademark_note: profile.trademark_note ?? null,
  };
}

function formatExamFactsBullet(key: string, value: string): string {
  const labels: Record<string, string> = {
    exam_name: "Exam name",
    administered_by: "Administered by",
    question_count: "Questions",
    scored_count: "Scored questions",
    time_limit: "Time",
    scoring_scale: "Scoring",
    passing_score: "Passing score",
    delivery: "Delivery",
    outline_effective_date: "Content outline effective",
    verify_at_url: "Verify current details at",
  };
  const label = labels[key] ?? key;
  if (key === "verify_at_url") {
    return `- ${label}: ${value}`;
  }
  return `- ${label}: ${value}`;
}

export function buildExamFactsMarkdownSection(profile: ExamFactsProfile): string {
  const facts = profile.exam_facts;
  const factLines = Object.entries(facts)
    .filter(([, value]) => Boolean(value))
    .map(([key, value]) => formatExamFactsBullet(key, value as string))
    .join("\n");

  const sourcesSection =
    profile.official_sources && profile.official_sources.length > 0
      ? `\nOfficial sources:\n${profile.official_sources.map((s) => `- ${s.label}: ${s.url}`).join("\n")}\n`
      : `\nVerify at: ${facts.verify_at_url}\n`;

  const weightsTable =
    profile.domain_weights.length > 0
      ? `## ${facts.exam_name} knowledge domains and weights\n\n| # | Knowledge domain | Weight |\n| --- | --- | ---: |\n${profile.domain_weights
          .map((row, index) => `| ${index + 1} | ${row.domain} | ${row.weight} |`)
          .join("\n")}\n`
      : "";

  const changedSection =
    profile.whats_changed && profile.whats_changed.length > 0
      ? `## What changed in the ${facts.exam_name.includes("PTCE") ? "2026 PTCE" : "current exam cycle"}\n\n${profile.whats_changed.map((line) => `- ${line}`).join("\n")}\n`
      : "";

  const highYieldSection =
    profile.high_yield_facts.length > 0
      ? `## High-yield ${facts.exam_name} facts (commonly tested)\n\n${profile.high_yield_facts.map((line) => `- ${line}`).join("\n")}\n`
      : "";

  const qaSection =
    profile.candidate_qa.length > 0
      ? `## Common ${facts.exam_name} candidate questions (Q&A)\n\n${profile.candidate_qa
          .map((item) => `### ${item.q}\n\n${item.a}`)
          .join("\n\n")}\n`
      : "";

  return `## ${facts.exam_name} exam facts\n\n${factLines}${sourcesSection}\n${weightsTable}${changedSection}${highYieldSection}${qaSection}`;
}
