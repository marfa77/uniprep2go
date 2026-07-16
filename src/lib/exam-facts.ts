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
  gmat: {
    examKey: "gmat",
    pageHeading: "GMAT Exam — Focus Edition Facts, Sections & Prep",
    intro:
      "The GMAT is the graduate management admission test administered by GMAC for MBA and business master's programs. Since February 2024 the Focus Edition format is the only GMAT delivery. This page summarizes official structure and scoring; UniPrep2Go products are independent prep (not GMAC material).",
    exam_facts: {
      exam_name: "Graduate Management Admission Test (GMAT)",
      administered_by: "Graduate Management Admission Council (GMAC)",
      question_count: "64 questions total (21 Quantitative + 23 Verbal + 20 Data Insights)",
      scored_count: "64",
      time_limit: "2 hours 15 minutes test time (optional 10-minute break; section order is flexible)",
      scoring_scale: "Total score 205–805 (10-point intervals, ending in 5); section scores 60–90 each",
      passing_score: "No pass/fail score — schools set their own score expectations",
      delivery: "Computer-based at Pearson VUE test centers or online proctored (verify current options at mba.com)",
      outline_effective_date: "GMAT Focus Edition (legacy GMAT retired January 31, 2024)",
      verify_at_url: "https://www.mba.com/exams/gmat-exam/about/exam-structure",
    },
    official_sources: [
      {
        label: "GMAC — GMAT exam structure",
        url: "https://www.mba.com/exams/gmat-exam/about/exam-structure",
      },
      {
        label: "GMAC — GMAT scores",
        url: "https://www.mba.com/exams/gmat-exam/scores",
      },
      {
        label: "GMAC — GMAT exam overview",
        url: "https://www.mba.com/exams/gmat-exam",
      },
    ],
    domain_weights: [
      { domain: "Quantitative Reasoning", weight: "33% of total score (21 questions, 45 minutes)" },
      { domain: "Verbal Reasoning", weight: "33% of total score (23 questions, 45 minutes)" },
      { domain: "Data Insights", weight: "33% of total score (20 questions, 45 minutes)" },
    ],
    whats_changed: [
      "Legacy GMAT (AWA + IR + Quant + Verbal, 200–800 scale) was retired January 31, 2024; the Focus Edition is now the only GMAT format.",
      "Sentence Correction was removed from Verbal; Quant de-emphasizes geometry; Data Insights replaces standalone Integrated Reasoning and includes Data Sufficiency.",
      "Total score now ranges 205–805 with three equally weighted section scores (60–90 each).",
      "Test takers choose section order and may edit up to three answers per section (per GMAC delivery features — verify at mba.com).",
      "GMAC announced GMAT Superscore (best section scores across attempts) launching August 2026 — verify timing at mba.com/scores.",
    ],
    high_yield_facts: [
      "All three sections contribute equally to the total score — no Quant-only weighting as on the legacy exam.",
      "Data Insights allows an on-screen calculator; Quant and Verbal do not.",
      "Unanswered questions incur a score penalty — pacing to finish each section matters.",
      "Official scores typically arrive within 3–5 days with performance by content domain and question type on the score report.",
      "GMAT scores are valid for five years for most business school applications.",
      "Verbal tests Reading Comprehension and Critical Reasoning only (no Sentence Correction on Focus).",
    ],
    candidate_qa: [
      {
        q: "How long is the GMAT and how many questions are on it?",
        a: "64 questions in 2 hours 15 minutes: Quantitative Reasoning (21 q / 45 min), Verbal Reasoning (23 q / 45 min), and Data Insights (20 q / 45 min), plus an optional 10-minute break.",
      },
      {
        q: "What is a good GMAT score?",
        a: "There is no universal passing score. Total scores run 205–805; competitive MBA programs often cite medians in the 645–715 range, but requirements vary by school.",
      },
      {
        q: "What changed from the old GMAT to the Focus Edition?",
        a: "Shorter format, no AWA essay, Data Insights replaces IR, Sentence Correction removed, geometry reduced in Quant, and a 205–805 total score with three equal section weights.",
      },
    ],
    trademark_note:
      "GMAT is a registered trademark of the Graduate Management Admission Council (GMAC).",
  },
  "sat": {
    examKey: "sat",
    pageHeading: "Digital SAT — Sections, Scoring & Prep Facts",
    intro:
      "The Digital SAT is College Board's college admissions exam. It reports two section scores — Reading and Writing and Math — that combine to a 400–1600 total. This page summarizes official structure and scoring; UniPrep2Go products are independent prep (not College Board material).",
    exam_facts: {
      exam_name: "Digital SAT",
      administered_by: "College Board",
      question_count: "98 questions total (54 Reading and Writing + 44 Math)",
      scored_count: "98",
      time_limit: "2 hours 14 minutes (64 minutes Reading and Writing + 70 minutes Math, plus a 10-minute break)",
      scoring_scale: "Total 400–1600; section scores 200–800 each for Reading and Writing and Math",
      passing_score: "No pass/fail score — colleges set their own expectations; many still use section and total benchmarks",
      delivery: "Digital adaptive (Bluebook app) at test centers or school-day administrations — verify current options at satsuite.collegeboard.org",
      outline_effective_date: "Digital SAT Suite (international digital rollout complete; U.S. digital SAT from 2024)",
      verify_at_url: "https://satsuite.collegeboard.org/sat/whats-on-the-test/structure",
    },
    official_sources: [
      {
        label: "College Board — How the SAT is structured",
        url: "https://satsuite.collegeboard.org/sat/whats-on-the-test/structure",
      },
      {
        label: "College Board — Understanding SAT scores (PDF)",
        url: "https://satsuite.collegeboard.org/media/pdf/sat-sd-understanding-scores.pdf",
      },
      {
        label: "College Board — SAT Suite overview",
        url: "https://satsuite.collegeboard.org/sat",
      },
    ],
    domain_weights: [
      {
        domain: "Reading and Writing",
        weight: "Section score 200–800 (54 questions, 64 minutes; domains: Information and Ideas, Craft and Structure, Expression of Ideas, Standard English Conventions)",
      },
      {
        domain: "Math",
        weight: "Section score 200–800 (44 questions, 70 minutes; domains: Algebra, Advanced Math, Problem-Solving and Data Analysis, Geometry and Trigonometry)",
      },
    ],
    whats_changed: [
      "Paper SAT with separate Reading, Writing and Language, and Math (calculator / no-calculator) sections was replaced by the Digital SAT Suite.",
      "Scores still combine to 400–1600, but only two section scores are reported: Reading and Writing and Math.",
      "Each section uses two adaptive modules; Module 2 difficulty depends on Module 1 performance.",
      "Reading and Writing uses short passages with one question each; Math allows a built-in calculator throughout.",
      "College Board score reports also show performance across eight content domains inside the two sections.",
    ],
    high_yield_facts: [
      "Official scoring is two axes — Reading and Writing and Math — not a single blended percentage alone.",
      "Total score = Reading and Writing section score + Math section score (each 200–800).",
      "Content domains (four in RW, four in Math) appear on the score report for skills insight but are not separate section scores.",
      "Unanswered questions hurt — pacing to finish each module matters.",
      "Bluebook practice tests from College Board remain the closest full-length adaptive simulation.",
      "SAT scores are typically valid for five years for college applications (verify school policies).",
    ],
    candidate_qa: [
      {
        q: "How is the Digital SAT scored?",
        a: "You receive two section scores — Reading and Writing and Math — each from 200 to 800. They add up to a total score from 400 to 1600.",
      },
      {
        q: "How long is the Digital SAT and how many questions are on it?",
        a: "98 questions in 2 hours 14 minutes: Reading and Writing (54 questions, 64 minutes) and Math (44 questions, 70 minutes), plus a 10-minute break between sections.",
      },
      {
        q: "Is the Digital SAT adaptive?",
        a: "Yes. Each section has two modules. How you perform on Module 1 determines whether Module 2 is easier or harder.",
      },
    ],
    trademark_note:
      "SAT and College Board are trademarks of the College Board. UniPrep2Go is not affiliated with or endorsed by the College Board.",
  },
  "gre": {
    examKey: "gre",
    pageHeading: "GRE General Test — Sections, Scoring & Prep Facts",
    intro:
      "The GRE General Test is ETS's graduate admissions exam. It reports Verbal Reasoning and Quantitative Reasoning scores from 130–170 each, plus Analytical Writing from 0–6. This page summarizes official structure; UniPrep2Go products are independent prep (not ETS material).",
    exam_facts: {
      exam_name: "GRE General Test",
      administered_by: "ETS (Educational Testing Service)",
      question_count: "1 Analytical Writing task + 54 objective questions (27 Verbal + 27 Quantitative)",
      scored_count: "All Verbal and Quantitative questions contribute to section scores; Writing scored separately",
      time_limit: "1 hour 58 minutes total (Writing 30 min; Verbal 41 min across two sections; Quant 47 min across two sections)",
      scoring_scale: "Verbal 130–170; Quantitative 130–170; Analytical Writing 0–6 (half-point increments)",
      passing_score: "No pass/fail score — graduate programs set their own expectations for Verbal, Quant, and Writing",
      delivery: "Computer-delivered at test centers or at home (where offered) — verify current options at ets.org/gre",
      outline_effective_date: "Shorter GRE General Test format (from September 22, 2023)",
      verify_at_url: "https://www.ets.org/gre/test-takers/general-test/prepare/test-structure.html",
    },
    official_sources: [
      {
        label: "ETS — GRE General Test structure",
        url: "https://www.ets.org/gre/test-takers/general-test/prepare/test-structure.html",
      },
      {
        label: "ETS — Getting your GRE scores",
        url: "https://www.ets.org/gre/test-takers/general-test/scores/get-scores.html",
      },
      {
        label: "ETS — GRE General Test overview",
        url: "https://www.ets.org/gre/test-takers/general-test.html",
      },
    ],
    domain_weights: [
      {
        domain: "Verbal Reasoning",
        weight: "Section score 130–170 (27 questions across two adaptive sections: Text Completion, Sentence Equivalence, Reading Comprehension)",
      },
      {
        domain: "Quantitative Reasoning",
        weight: "Section score 130–170 (27 questions across two adaptive sections: arithmetic, algebra, geometry, data analysis; on-screen calculator)",
      },
      {
        domain: "Analytical Writing",
        weight: "Separate 0–6 score — one Analyze an Issue essay (30 minutes); not part of UniPrep2Go MCQ readiness check",
      },
    ],
    whats_changed: [
      "From September 22, 2023 the GRE General Test shortened to about 1 hour 58 minutes.",
      "Analytical Writing dropped from two tasks to one Analyze an Issue task.",
      "Verbal and Quant each use 12 + 15 question sections (27 total per measure) with section-level adaptive difficulty.",
      "Verbal and Quant score scales remain 130–170; Writing remains 0–6.",
    ],
    high_yield_facts: [
      "Official reportable MCQ axes are Verbal and Quant (130–170 each) — treat them as separate scores, not one blended percentage.",
      "Section 2 difficulty depends on Section 1 performance within each measure.",
      "No guessing penalty — answer every question.",
      "Analytical Writing is scored separately and is not included in MCQ practice banks.",
      "ETS PowerPrep remains the closest official full-length adaptive practice.",
    ],
    candidate_qa: [
      {
        q: "How is the GRE General Test scored?",
        a: "You receive Verbal and Quantitative scores from 130 to 170 each, plus an Analytical Writing score from 0 to 6. Programs usually review all three.",
      },
      {
        q: "How long is the GRE and how many questions are on it?",
        a: "About 1 hour 58 minutes: one 30-minute Issue essay, 27 Verbal questions (41 minutes), and 27 Quantitative questions (47 minutes).",
      },
      {
        q: "Is the GRE adaptive?",
        a: "Yes for Verbal and Quant — section-level adaptive. How you do on the first section of a measure affects the difficulty of the second section.",
      },
    ],
    trademark_note:
      "GRE® is a registered trademark of ETS. UniPrep2Go is not affiliated with or endorsed by ETS.",
  },
  "pmp": {
    examKey: "pmp",
    pageHeading: "PMP — Domains, Scoring & Prep Facts",
    intro:
      "The Project Management Professional (PMP) certification is administered by PMI. The 2026 Exam Content Outline organizes the exam into three domains — People, Process, and Business Environment — and PMI reports performance by domain. This page summarizes official structure; UniPrep2Go products are independent prep (not PMI exam material).",
    exam_facts: {
      exam_name: "Project Management Professional (PMP)",
      administered_by: "Project Management Institute (PMI)",
      question_count: "180 questions total (170 scored + 10 unscored pretest)",
      scored_count: "170",
      time_limit: "240 minutes (4 hours) with two 10-minute breaks under the July 2026 format",
      scoring_scale: "Domain performance levels across People, Process, and Business Environment (PMI does not publish a fixed percentage cut score)",
      passing_score: "No published fixed pass percentage — candidates must meet PMI's psychometric standard and review domain performance on the score report",
      delivery: "Computer-based testing at Pearson VUE centers or online proctored (verify current options at pmi.org)",
      outline_effective_date: "PMP Examination Content Outline 2026 (live from July 9, 2026)",
      verify_at_url: "https://www.pmi.org/certifications/project-management-pmp",
    },
    official_sources: [
      {
        label: "PMI — PMP certification overview",
        url: "https://www.pmi.org/certifications/project-management-pmp",
      },
      {
        label: "PMI — PMP Examination Content Outline 2026 (PDF)",
        url: "https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/new-pmp-examination-content-outline-2026.pdf",
      },
      {
        label: "PMI — Certification handbook",
        url: "https://www.pmi.org/certifications/certification-resources/handbook",
      },
    ],
    domain_weights: [
      {
        domain: "People",
        weight: "33% of exam items (leadership, team performance, conflict, stakeholder engagement)",
      },
      {
        domain: "Process",
        weight: "41% of exam items (delivery approach, planning, quality, risk, schedule, budget, changes)",
      },
      {
        domain: "Business Environment",
        weight: "26% of exam items (strategy alignment, compliance, benefits, governance, external factors)",
      },
    ],
    whats_changed: [
      "From July 9, 2026 the ECO rebalances domains to People 33%, Process 41%, Business Environment 26% (Business Environment rises sharply from 8%).",
      "Exam timing moves to 240 minutes with 170 scored and 10 pretest items (still 180 total).",
      "Approach mix shifts toward roughly 40% predictive and 60% adaptive/agile plus hybrid items across domains.",
      "PMBOK Guide 8th Edition supports the outline as a reference; the ECO remains the exam blueprint.",
    ],
    high_yield_facts: [
      "Study and diagnose by the three ECO domains — PMI reports domain performance, not a single public cut score.",
      "Business Environment is much heavier in 2026 — value delivery, compliance, and organizational strategy matter more than older outlines suggested.",
      "Predictive, agile, and hybrid approaches appear across all three domains rather than as a separate domain.",
      "Situational judgment dominates: choose the next best action that protects agreements, baselines, and value.",
      "Eligibility requires documented project leadership experience and 35 contact hours (or CAPM) — verify current rules at pmi.org.",
    ],
    candidate_qa: [
      {
        q: "How is the PMP exam scored?",
        a: "PMI uses a psychometric passing standard and reports performance by domain (People, Process, and Business Environment). There is no official published percentage cut score.",
      },
      {
        q: "What are the PMP domain weights in 2026?",
        a: "People 33%, Process 41%, and Business Environment 26% under the 2026 Exam Content Outline that went live July 9, 2026.",
      },
      {
        q: "How long is the PMP exam and how many questions are on it?",
        a: "180 questions in 240 minutes: 170 scored and 10 unscored pretest questions, with two 10-minute breaks under the July 2026 format.",
      },
    ],
    trademark_note:
      "PMP, PMI, and PMBOK are trademarks of the Project Management Institute. UniPrep2Go is not affiliated with or endorsed by PMI.",
  },
  "epa-608": {
    examKey: "epa-608",
    pageHeading: "EPA Section 608 Technician Certification — Facts, Types & Prep",
    intro:
      "EPA Section 608 certification is required under the Clean Air Act for HVAC technicians who maintain, service, repair, or dispose of equipment that could release refrigerants. This page summarizes the Core and Type I–III exam structure; UniPrep2Go products are independent prep (not U.S. EPA exam material).",
    exam_facts: {
      exam_name: "EPA Section 608 Technician Certification",
      administered_by: "U.S. Environmental Protection Agency (via EPA-approved certifying organizations)",
      question_count: "100 multiple-choice for Universal (25 Core + 25 Type I + 25 Type II + 25 Type III)",
      scored_count: "25 per section taken (sections scored independently)",
      time_limit: "Varies by certifying organization; many providers allow ~30 minutes per 25-question section",
      scoring_scale: "Percent correct per section (independent section scores)",
      passing_score: "Minimum 18 of 25 correct (72%) in each section taken; Core must pass for any certification",
      delivery: "Closed-book proctored exam at approved testing organizations (in-person or online proctored — verify with your certifier)",
      outline_effective_date: "Section 608 refrigerant management regulations (verify current AIM Act / HFC rules at epa.gov)",
      verify_at_url: "https://www.epa.gov/section608/technician-certification",
    },
    official_sources: [
      {
        label: "EPA — Section 608 technician certification",
        url: "https://www.epa.gov/section608/technician-certification",
      },
      {
        label: "EPA — Stationary Refrigeration and Air Conditioning",
        url: "https://www.epa.gov/section608",
      },
      {
        label: "EPA Section 608 preparatory manual (reference outline)",
        url: "https://www.epa.gov/section608/technician-certification",
      },
    ],
    domain_weights: [
      { domain: "Core", weight: "25 questions — ozone depletion, Clean Air Act, Montreal Protocol, recovery, safety, shipping" },
      { domain: "Type I (Small Appliances)", weight: "25 questions — appliances with ≤5 lb refrigerant (typically sealed systems)" },
      { domain: "Type II (High-Pressure)", weight: "25 questions — residential/commercial AC, heat pumps, high-pressure equipment" },
      { domain: "Type III (Low-Pressure)", weight: "25 questions — low-pressure centrifugal chillers and similar systems" },
    ],
    whats_changed: [
      "AIM Act (2020) and subsequent EPA rules phase down HFC production and consumption — verify current substitute refrigerant and leak-repair requirements at epa.gov.",
      "New flammable (A2L) refrigerants require additional safety training and handling rules beyond legacy CFC/HCFC/HFC content — confirm current EPA guidance before exam day.",
      "Section 608 certification does not expire, but technicians must follow current regulations regardless of original test date.",
    ],
    high_yield_facts: [
      "Venting refrigerant to the atmosphere is illegal — recovery is required before opening or disposing of systems.",
      "Core section must pass before any Type certification counts; Universal requires passing Core plus Types I, II, and III.",
      "Each section is graded independently: 18 correct out of 25 (72%) is the common passing threshold per section.",
      "Type I covers small appliances; Type II covers high-pressure systems; Type III covers low-pressure chillers.",
      "Recovery cylinders must be DOT-approved, labeled by refrigerant type, and not overfilled past 80% capacity by weight.",
      "Leak repair thresholds and timelines differ by system charge size — high-pressure commercial rules are heavily tested on Type II.",
    ],
    candidate_qa: [
      {
        q: "How many questions are on the EPA 608 Universal exam?",
        a: "100 multiple-choice questions total: 25 in Core, 25 in Type I, 25 in Type II, and 25 in Type III. Each section is scored separately.",
      },
      {
        q: "What score do you need to pass EPA 608?",
        a: "You need at least 18 of 25 correct (72%) in every section you take. Failing one section does not invalidate a passing score in another, but Core must pass for any certification.",
      },
      {
        q: "Does EPA 608 certification expire?",
        a: "EPA Section 608 technician certification does not expire, but you must comply with current refrigerant regulations and handling requirements.",
      },
    ],
  },
  "bms-bas": {
    examKey: "bms-bas",
    pageHeading: "Building Management System (BMS) / BAS — Facts, Credentials & Prep",
    intro:
      "Building Management Systems (BMS) and Building Automation Systems (BAS) control HVAC, lighting, and plant equipment in commercial buildings. There is no single U.S. federal BMS licensing exam — technicians typically combine protocol knowledge (BACnet), vendor platform training, and field commissioning experience. This page summarizes verifiable industry structure; UniPrep2Go products are independent prep (not Tridium or BACnet International certification material).",
    exam_facts: {
      exam_name: "Building Automation System (BAS / BMS) technician credentials",
      administered_by:
        "No unified national exam — common paths include Tridium Niagara 4 Technical Certification Program (TCP), manufacturer training (e.g., Siemens, Johnson Controls, Schneider), and BACnet International education",
      question_count:
        "Varies by credential (e.g., Tridium Niagara 4 TCP: 5-day course with practical final assessment on Day 5 — not a standalone multiple-choice licensure exam)",
      time_limit: "Varies by certifying organization (Niagara 4 TCP is typically a full-day practical lab exam after four training days)",
      scoring_scale: "Pass/fail or completion certificate per vendor program — no universal scaled score",
      passing_score: "No single passing score — employer and project requirements vary (verify with your training provider)",
      delivery: "Instructor-led training with hands-on labs; some providers offer remote proctored Niagara 4 TCP (verify with Tridium University or authorized partners)",
      outline_effective_date: "ASHRAE Standard 135-2024 (BACnet); ASHRAE Guideline 36 high-performance sequences (verify current edition at ashrae.org)",
      verify_at_url: "https://www.bacnetinternational.org/",
    },
    official_sources: [
      {
        label: "BACnet International — protocol and BTL product certification program",
        url: "https://www.bacnetinternational.org/",
      },
      {
        label: "BACnet Testing Laboratories (BTL) — product conformance listing",
        url: "https://btl.org/",
      },
      {
        label: "ASHRAE — Standard 135 (BACnet) and professional development",
        url: "https://www.ashrae.org/professional-development",
      },
      {
        label: "Tridium — Niagara platform training (verify TCP availability at Tridium University)",
        url: "https://www.tridium.com/",
      },
    ],
    domain_weights: [
      { domain: "BACnet protocol and networking", weight: "Objects, services, MS/TP, IP, BBMD, device profiles (B-ASC, B-BC, B-OWS, etc.)" },
      { domain: "HVAC control sequences", weight: "AHU/VAV/chiller/boiler logic, setpoints, PID, ASHRAE Guideline 36 sequences" },
      { domain: "BMS platform operations", weight: "Alarms, trends/histories, schedules, graphics, user roles, backups" },
      { domain: "Integration and commissioning", weight: "Point-to-point checkout, Modbus and multi-protocol drivers, troubleshooting, documentation" },
    ],
    whats_changed: [
      "ASHRAE published BACnet Standard 135-2024 — verify current revision for object definitions and networking features at ashrae.org.",
      "BACnet Secure Connect (BACnet/SC) adoption is increasing for IT-friendly building networks — confirm current deployment guidance at bacnetinternational.org.",
      "BTL (BACnet Testing Laboratories) certifies products, not individuals — job requirements often cite BTL-Listed devices plus vendor technician credentials.",
      "Tridium Niagara 4 remains a widely requested integration platform credential; TCP format and delivery vary by authorized training partner.",
    ],
    high_yield_facts: [
      "BACnet is ASHRAE Standard 135 — the open protocol for building automation interoperability; BTL Listing applies to products, not people.",
      "Common BACnet device profiles include B-ASC (application specific controller), B-AAC (advanced application controller), B-BC (building controller), and B-OWS (operator workstation).",
      "BBMD (BACnet Broadcast Management Device) enables BACnet/IP communication across IP subnets.",
      "COV (Change of Value) reporting reduces polling traffic compared with constant read requests.",
      "Niagara 4 TCP is a 5-day instructor-led program ending with a practical station-configuration assessment — not a generic multiple-choice licensure test.",
      "Commissioning includes verifying I/O mapping, alarm routing, sequence logic, and as-built documentation before turnover.",
    ],
    candidate_qa: [
      {
        q: "Is there one official BMS technician license exam in the United States?",
        a: "No single federal BAS/BMS license exists. Employers typically require vendor platform training (e.g., Tridium Niagara 4 TCP), manufacturer certifications, and demonstrated BACnet and HVAC controls competency.",
      },
      {
        q: "What is BTL certification — can a technician get BTL certified?",
        a: "BTL certifies BACnet products for protocol conformance, administered by BACnet International. Individuals are not BTL-certified; technicians work with BTL-Listed devices and pursue vendor or training credentials instead.",
      },
      {
        q: "What is Tridium Niagara 4 TCP?",
        a: "The Niagara 4 Technical Certification Program is a multi-day Tridium training path with hands-on labs and a practical final assessment, commonly requested for BMS integrator and controls engineer roles.",
      },
    ],
  },
  "leed-green-associate": {
    examKey: "leed-green-associate",
    pageHeading: "LEED Green Associate — Exam Facts, Domains & Prep",
    intro:
      "The LEED Green Associate credential from USGBC/GBCI demonstrates general knowledge of green building and LEED project support. This page summarizes official exam structure; UniPrep2Go products are independent prep (not USGBC exam material).",
    exam_facts: {
      exam_name: "LEED Green Associate",
      administered_by: "Green Business Certification Inc. (GBCI) / U.S. Green Building Council (USGBC)",
      question_count: "100 multiple-choice (includes unscored pretest items per GBCI policy — verify current handbook)",
      scored_count: "100-item form (pretest items not identified during exam)",
      time_limit: "2 hours test time (plus optional tutorial and survey at Prometric)",
      scoring_scale: "125–200 scaled score",
      passing_score: "170 scaled score (minimum competency threshold)",
      delivery: "Prometric test center or online remote proctored exam",
      outline_effective_date: "GBCI updates LEED professional exams annually (verify current LEED v4/v5 handbook at usgbc.org)",
      verify_at_url: "https://www.usgbc.org/credentials/leed-green-associate",
    },
    official_sources: [
      {
        label: "USGBC — LEED Green Associate credential",
        url: "https://www.usgbc.org/credentials/leed-green-associate",
      },
      {
        label: "GBCI — exam results and passing score",
        url: "https://support.usgbc.org/hc/en-us/articles/6826371188371-Exam-Results",
      },
      {
        label: "LEED Green Associate candidate handbook (USGBC GitBook)",
        url: "https://usgbc.gitbook.io/leed-candidate-handbooks/leed-green-associate-candidate-handbook",
      },
    ],
    domain_weights: [
      { domain: "LEED Process and Integrative Strategies", weight: "Project roles, certification process, integrative design" },
      { domain: "Location and Transportation", weight: "Site selection, transit, compact development" },
      { domain: "Sustainable Sites and Water Efficiency", weight: "Site management, stormwater, irrigation, water use reduction" },
      { domain: "Energy and Atmosphere", weight: "Energy performance, refrigerants, renewable energy, metering" },
      { domain: "Materials and Resources / Indoor Environmental Quality", weight: "Waste, materials, IAQ, lighting, acoustic and comfort concepts" },
    ],
    whats_changed: [
      "GBCI publishes annual exam updates; verify the current LEED Green Associate candidate handbook before scheduling.",
      "LEED v5 beta exams may delay score reporting — standard LEED v4 exams typically show scores immediately after completion (verify at support.usgbc.org).",
      "LEED Green Associates must complete 15 continuing education hours every 2 years to maintain the credential.",
    ],
    high_yield_facts: [
      "Passing score is 170 on a 125–200 scale for all GBCI LEED professional exams.",
      "LEED Green Associate is the prerequisite credential for LEED AP specialty exams.",
      "LEED AP combined exams require passing both Green Associate and specialty parts in the same application period.",
      "Three failed attempts within 12 months triggers a 90-day waiting period before re-registering (GBCI retake policy).",
      "Exam fee is typically $200 for USGBC members and $250 for non-members (verify current pricing at usgbc.org).",
    ],
    candidate_qa: [
      {
        q: "How many questions are on the LEED Green Associate exam?",
        a: "100 multiple-choice questions in a 2-hour period at Prometric (plus optional tutorial and survey time).",
      },
      {
        q: "What score do you need to pass the LEED Green Associate exam?",
        a: "A scaled score of 170 or higher on the 125–200 scale.",
      },
      {
        q: "Do I need experience to sit for the LEED Green Associate exam?",
        a: "No formal prerequisites — the credential is designed for professionals newer to LEED and green building.",
      },
    ],
    trademark_note:
      "LEED and USGBC are registered trademarks of the U.S. Green Building Council. GBCI is a registered trademark of Green Business Certification Inc.",
  },
  "leed-ap-om": {
    examKey: "leed-ap-om",
    pageHeading: "LEED AP O+M — Domains, Scoring & Prep Facts",
    intro:
      "LEED AP Operations + Maintenance is a GBCI specialty credential for professionals who improve performance of existing buildings through operations and maintenance. The specialty exam is 100 multiple-choice questions in 2 hours with a scaled passing score of 170/200. UniPrep2Go products are independent prep (not USGBC/GBCI material).",
    exam_facts: {
      exam_name: "LEED AP Operations + Maintenance (LEED AP O+M)",
      administered_by: "GBCI (Green Business Certification Inc.) / USGBC",
      question_count: "100 multiple-choice questions (specialty exam)",
      scored_count: "Includes scored items; unscored pretest items may appear",
      time_limit: "2 hours for the specialty exam",
      scoring_scale: "Scaled score out of 200",
      passing_score: "170 out of 200",
      delivery: "Prometric test center or online remote proctoring — verify current options at usgbc.org / gbci.org",
      outline_effective_date: "LEED AP O+M specialty; LEED v5 transition window in 2026 (verify current handbook for your test date)",
      verify_at_url: "https://www.usgbc.org/credentials/leed-ap",
    },
    official_sources: [
      {
        label: "USGBC — LEED AP with specialty",
        url: "https://www.usgbc.org/credentials/leed-ap",
      },
      {
        label: "USGBC — About the LEED AP with specialty exam",
        url: "https://support.usgbc.org/hc/en-us/articles/4404371728019-About-the-LEED-AP-with-specialty-exam",
      },
      {
        label: "USGBC — LEED v5 exam information",
        url: "https://support.usgbc.org/hc/en-us/articles/29656794179987-LEED-v5-exam-information",
      },
    ],
    domain_weights: [
      { domain: "LEED Process", weight: "~10 questions — MPRs, certification cycle, addenda, innovation/pilot" },
      { domain: "Integrative Process Planning and Assessments", weight: "~10 questions — CFR/O+M plan, resilience, human impact, worker safety" },
      { domain: "Location and Transportation", weight: "~8 questions — sustainable transportation performance, TDM, EVs, bike infrastructure" },
      { domain: "Sustainable Sites", weight: "~5 questions — heat island, light pollution, bird collision" },
      { domain: "Water Efficiency", weight: "~7 questions — metering, water use intensity, advanced metering" },
      { domain: "Energy and Atmosphere", weight: "~21 questions — energy monitoring, commissioning, refrigerants, GHG, renewables (heaviest domain)" },
      { domain: "Materials and Resources", weight: "~7 questions — waste diversion and reduction strategies" },
      { domain: "Indoor Environmental Quality", weight: "~17 questions — ventilation, IAQ, green cleaning, IPM, occupant experience" },
    ],
    whats_changed: [
      "LEED v5 commercial systems (including O+M) launched in 2025; LEED AP specialty exams transition toward v5 content through 2026 beta/final windows.",
      "O+M emphasizes performance periods, ongoing reporting, and existing-building operations rather than new-construction design credits.",
      "Energy and Atmosphere and Indoor Environmental Quality remain the heaviest specialty domains for O+M.",
    ],
    high_yield_facts: [
      "Specialty exam: 100 MCQ in 2 hours; scaled pass 170/200.",
      "Active LEED Green Associate is required for the specialty-only registration path.",
      "Study operations performance periods, metering, retro-/monitoring-based commissioning, waste diversion, and IAQ operations — not BD+C design modeling alone.",
      "Verify whether your test date is still v4-aligned or v5-aligned using the current GBCI/USGBC handbook.",
    ],
    candidate_qa: [
      {
        q: "What is the LEED AP O+M passing score?",
        a: "A scaled score of 170 out of 200 on the 100-question specialty exam.",
      },
      {
        q: "How is LEED AP O+M different from LEED AP BD+C?",
        a: "O+M focuses on operating and maintaining existing buildings. BD+C focuses on design and construction of new buildings and major renovations.",
      },
      {
        q: "Do I need LEED Green Associate first?",
        a: "Yes for the specialty-only path. Some candidates can sit a combined GA + AP exam where offered — confirm current GBCI options.",
      },
    ],
    trademark_note:
      "LEED® and USGBC® are trademarks of the U.S. Green Building Council. GBCI® is a trademark of Green Business Certification Inc. UniPrep2Go is not affiliated with or endorsed by USGBC or GBCI.",
  },
  "leed-ap-bd-c": {
    examKey: "leed-ap-bd-c",
    pageHeading: "LEED AP BD+C — Exam Facts, Credit Categories & Prep",
    intro:
      "LEED AP with specialty Building Design + Construction (BD+C) validates advanced knowledge of LEED for new construction and major renovation projects. Requires an active LEED Green Associate. UniPrep2Go products are independent prep (not USGBC material).",
    exam_facts: {
      exam_name: "LEED AP Building Design + Construction (BD+C)",
      administered_by: "Green Business Certification Inc. (GBCI) / U.S. Green Building Council (USGBC)",
      question_count: "100 multiple-choice specialty exam (LEED Green Associate required separately unless taking combined exam)",
      scored_count: "100-item specialty form",
      time_limit: "2 hours specialty exam time (4 hours 20 minutes total for combined GA + AP exam)",
      scoring_scale: "125–200 scaled score",
      passing_score: "170 scaled score on the specialty exam (and on GA if taking combined exam)",
      delivery: "Prometric test center or online remote proctored",
      outline_effective_date: "Annual GBCI exam updates; BD+C aligns to LEED rating system credits and prerequisites",
      verify_at_url: "https://www.usgbc.org/credentials/leed-ap-build-design-construction",
    },
    official_sources: [
      {
        label: "USGBC — LEED AP BD+C credential",
        url: "https://www.usgbc.org/credentials/leed-ap-build-design-construction",
      },
      {
        label: "GBCI — exam results and passing score",
        url: "https://support.usgbc.org/hc/en-us/articles/6826371188371-Exam-Results",
      },
      {
        label: "LEED AP BD+C candidate handbook (verify at USGBC credentials)",
        url: "https://www.usgbc.org/credentials",
      },
    ],
    domain_weights: [
      { domain: "Integrative Process, Location and Transportation", weight: "IP and LT credit categories" },
      { domain: "Sustainable Sites and Water Efficiency", weight: "SS and WE credits" },
      { domain: "Energy and Atmosphere", weight: "EA prerequisites and credits — heavily weighted study area" },
      { domain: "Materials and Resources", weight: "MR credits including EPDs, sourcing, and waste" },
      { domain: "Indoor Environmental Quality", weight: "IEQ credits — air quality, lighting, comfort" },
    ],
    whats_changed: [
      "Other LEED AP specialties (O+M, ID+C, Homes, ND) use separate exams — BD+C is for new construction and major renovation.",
      "Combined GA + AP exams require 170+ on both parts within the same application period.",
      "LEED APs must earn 30 continuing education hours every 2 years to maintain the credential (with GA maintenance requirements).",
    ],
    high_yield_facts: [
      "You must hold an active LEED Green Associate before earning LEED AP BD+C (unless passing both in one combined sitting).",
      "BD+C applies to new construction and major renovation of commercial and institutional buildings.",
      "Prerequisites (P) must be met before corresponding credits (C) can be earned on real LEED projects — exam questions test this logic.",
      "Minimum program requirements and rating system selection (e.g., LEED v4.1 BD+C) frame many exam scenarios.",
      "Regional priority and impact area concepts appear across multiple credit categories.",
    ],
    candidate_qa: [
      {
        q: "What is the difference between LEED Green Associate and LEED AP BD+C?",
        a: "Green Associate is the broad entry credential; LEED AP BD+C is an advanced specialty focused on design and construction projects.",
      },
      {
        q: "How long is the LEED AP BD+C exam?",
        a: "100 multiple-choice questions in 2 hours for the specialty-only exam.",
      },
      {
        q: "Are there other LEED AP specialties besides BD+C?",
        a: "Yes — O+M (operations), ID+C (interior), Homes, and ND (neighborhood) each have separate specialty exams.",
      },
    ],
    trademark_note:
      "LEED and USGBC are registered trademarks of the U.S. Green Building Council. GBCI is a registered trademark of Green Business Certification Inc.",
  },
  "well-ap": {
    examKey: "well-ap",
    pageHeading: "WELL Accredited Professional (WELL AP) — Exam Facts, Concepts & Prep",
    intro:
      "The WELL Accredited Professional (WELL AP) credential from IWBI demonstrates expertise in the WELL Building Standard and human health in the built environment. GBCI administers the exam on behalf of IWBI. UniPrep2Go products are independent prep (not IWBI exam material).",
    exam_facts: {
      exam_name: "WELL Accredited Professional (WELL AP)",
      administered_by: "Green Business Certification Inc. (GBCI) on behalf of the International WELL Building Institute (IWBI)",
      question_count: "115 multiple-choice (100 scored + 15 unscored pilot questions)",
      scored_count: "100",
      time_limit: "2 hours 30 minutes",
      scoring_scale: "125–200 scaled score",
      passing_score: "170 scaled score",
      delivery: "Prometric test centers or Prometric ProProctor remote proctoring (verify at wellcertified.com)",
      outline_effective_date: "WELL AP exam based on WELL Building Standard v2 (verify current candidate handbook at support.wellcertified.com)",
      verify_at_url: "https://support.wellcertified.com/hc/en-us/articles/25696901381015-WELL-AP-overview",
    },
    official_sources: [
      {
        label: "IWBI — WELL AP overview",
        url: "https://support.wellcertified.com/hc/en-us/articles/25696901381015-WELL-AP-overview",
      },
      {
        label: "IWBI — Get to know the WELL AP exam",
        url: "https://support.wellcertified.com/hc/en-us/articles/25696922685079-Get-to-know-the-WELL-AP-exam",
      },
      {
        label: "WELL AP candidate handbook (PDF)",
        url: "https://www.usgbc.org/sites/default/files/2023-02/WELL%20AP%20Candidate%20Handbook.pdf",
      },
    ],
    domain_weights: [
      { domain: "Air", weight: "11 scored questions" },
      { domain: "Water", weight: "9 scored questions" },
      { domain: "Nourishment", weight: "10 scored questions" },
      { domain: "Light", weight: "9 scored questions" },
      { domain: "Movement", weight: "7 scored questions" },
      { domain: "Thermal Comfort", weight: "7 scored questions" },
      { domain: "Sound", weight: "8 scored questions" },
      { domain: "Materials", weight: "9 scored questions" },
      { domain: "Mind", weight: "9 scored questions" },
      { domain: "Community", weight: "9 scored questions" },
      { domain: "WELL Certification and WELL Portfolio", weight: "12 scored questions" },
    ],
    whats_changed: [
      "WELL AP exam v2 includes a project scenario embedded in the exam session — not available before test day.",
      "A second embedded PDF provides selected WELL v2 reference tables; review 'Get to know the WELL AP exam' content before scheduling.",
      "Exam registration fee was reduced to $299 USD (verify current pricing at wellcertified.com).",
      "WELL APs must complete continuing education requirements to maintain the credential (verify current CE rules in the candidate handbook).",
      "After three unsuccessful exam attempts, candidates must wait 90 days before registering again.",
    ],
    high_yield_facts: [
      "Passing score is 170 on the 125–200 scale — same scaled scoring model as LEED professional exams.",
      "WELL Certification and Portfolio (12 questions) and Air (11 questions) are the highest-weight knowledge domains.",
      "Exam is closed book but includes embedded scenario and reference PDFs — know how to navigate them quickly.",
      "Cognitive levels tested: recall, application, and analysis — scenario-based questions require linking concepts to project context.",
      "No formal prerequisites, but IWBI recommends exposure to health and well-being in the built environment and prior WELL project experience.",
      "You have 12 months from registration to schedule and sit the exam via Prometric.",
    ],
    candidate_qa: [
      {
        q: "How many questions are on the WELL AP exam?",
        a: "115 multiple-choice questions in 2.5 hours — 100 scored plus 15 unscored pilot questions randomly distributed.",
      },
      {
        q: "What score do you need to pass the WELL AP exam?",
        a: "A scaled score of at least 170 on the 125–200 scale.",
      },
      {
        q: "Is the WELL AP exam open book?",
        a: "It is closed book, but the exam session includes embedded PDFs — a project scenario and selected WELL v2 reference material you can consult during the test.",
      },
      {
        q: "What is the difference between LEED AP and WELL AP?",
        a: "LEED AP credentials (USGBC/GBCI) focus on environmental sustainability and green building rating systems. WELL AP (IWBI/GBCI) focuses on human health and well-being in buildings via the WELL Building Standard — separate exams and credentials.",
      },
      {
        q: "What WELL v2 concepts are tested?",
        a: "Eleven knowledge domains: Air, Water, Nourishment, Light, Movement, Thermal Comfort, Sound, Materials, Mind, Community, plus WELL Certification and Portfolio process.",
      },
    ],
    trademark_note:
      "WELL, WELL AP, and IWBI are trademarks of the International WELL Building Institute. GBCI is a registered trademark of Green Business Certification Inc.",
  },
  cem: {
    examKey: "cem",
    pageHeading: "Certified Energy Manager (CEM) — Exam Facts, Body of Knowledge & Prep",
    intro:
      "The Certified Energy Manager (CEM) credential from the Association of Energy Engineers (AEE) recognizes expertise in optimizing energy use across facilities and industrial systems. This page summarizes official exam structure; UniPrep2Go products are independent prep (not AEE exam material).",
    exam_facts: {
      exam_name: "Certified Energy Manager (CEM)",
      administered_by: "Association of Energy Engineers (AEE)",
      question_count: "130 multiple-choice and true/false (120 scored + 10 unscored pretest items)",
      scored_count: "120",
      time_limit: "4 hours",
      scoring_scale: "0–1,040 scaled score",
      passing_score: "700 scaled score",
      delivery: "Proctored at AEE-approved seminars, testing centers, or remote proctoring (verify at aeecenter.org)",
      outline_effective_date: "U.S. CEM Body of Knowledge & Study Guide (verify current version at aeecenter.org)",
      verify_at_url: "https://www.aeecenter.org/certifications/certified-energy-manager",
    },
    official_sources: [
      {
        label: "AEE — Certified Energy Manager certification",
        url: "https://www.aeecenter.org/certifications/certified-energy-manager",
      },
      {
        label: "AEE — CEM Body of Knowledge & Study Guide (PDF)",
        url: "https://www.aeecenter.org/wp-content/uploads/2024/03/CEM-BodyofKnowledge_StudyGuide_1.7.pdf",
      },
      {
        label: "AEE — CEM certification handbook",
        url: "https://www.aeecenter.org/wp-content/uploads/2024/03/CEMHandbook-2.13.pdf",
      },
    ],
    domain_weights: [
      { domain: "Energy and Sustainability Policies, Codes, and Standards", weight: "6–8%" },
      { domain: "Energy Rates, Tariffs, and Supply Options", weight: "5–7%" },
      { domain: "Energy Audits and Instrumentation", weight: "7–11%" },
      { domain: "Energy Accounting and Economics", weight: "6–10%" },
      { domain: "Electrical Power Systems and Motors", weight: "7–11%" },
      { domain: "Lighting Systems", weight: "5–7%" },
      { domain: "HVAC Systems and Building Envelope", weight: "10–16%" },
      { domain: "Building Automation, Controls and AI Systems", weight: "6–10%" },
      { domain: "Energy Storage Systems", weight: "3–5%" },
      { domain: "Boiler and Steam Systems", weight: "4–6%" },
      { domain: "Distributed Generation & Renewable Energy", weight: "4–6%" },
      { domain: "Industrial Systems", weight: "6–8%" },
      { domain: "Operations, Maintenance and Commissioning", weight: "7–11%" },
      { domain: "ESPC and Measurement & Verification", weight: "3–5%" },
    ],
    whats_changed: [
      "AEE requires completion of an approved preparatory seminar (live, virtual, or self-paced) before sitting for the CEM exam — verify current requirements.",
      "CEM recertification is required every 3 years with continuing education and a maintenance fee.",
      "Exam is open book — printed references and notes in a binder allowed; computers and phones prohibited during the exam.",
    ],
    high_yield_facts: [
      "Passing score is 700 on a 0–1,040 scaled score — not a simple percentage.",
      "HVAC Systems and Building Envelope is the highest-weight subject area (up to 16% of scored content).",
      "No penalty for wrong answers — answer every question on the 130-item form.",
      "AEE offers a 65-question paid self-evaluation exam that mirrors half the official exam length (verify at aeecenter.org/cemresources).",
      "Non-programmable calculator permitted; programmable calculators and exam software on personal devices are prohibited.",
      "CEM application file must be completed within 3 years of passing the exam or the process restarts.",
    ],
    candidate_qa: [
      {
        q: "How many questions are on the CEM exam?",
        a: "130 questions in 4 hours — 120 scored plus 10 unscored pretest items randomly placed on the form.",
      },
      {
        q: "What score do you need to pass the CEM exam?",
        a: "A scaled score of at least 700 on the 0–1,040 scale.",
      },
      {
        q: "Is the CEM exam open book?",
        a: "Yes — open book and open notes with printed materials in a binder; verify prohibited items in the current AEE handbook.",
      },
    ],
  },
  "ashrae-certifications": {
    examKey: "ashrae-certifications",
    pageHeading: "ASHRAE Certifications — BCxP, BEMP, BEAP, CHD, HBDP, HFDP, OPMP Facts & Prep",
    intro:
      "ASHRAE offers seven ANSI-accredited personnel certification programs (ISO/IEC 17024) for building energy, commissioning, HVAC design, and operations professionals. Each credential has its own eligibility requirements, exam blueprint, and passing score. UniPrep2Go products are independent prep (not ASHRAE exam material).",
    exam_facts: {
      exam_name: "ASHRAE Personnel Certification Programs (BCxP, BEAP, BEMP, CHD, HBDP, HFDP, OPMP)",
      administered_by: "American Society of Heating, Refrigerating and Air-Conditioning Engineers (ASHRAE)",
      question_count:
        "Most exams: 115 multiple-choice (100 scored + 15 pretest); BCxP: 130 items (120 scored + 10 pretest); HFDP: same 115-item form with 2-hour time limit",
      scored_count: "100 (BCxP: 120 scored items)",
      time_limit: "2.5 hours for most exams; 2 hours for HFDP; BCxP uses extended form — verify candidate guidebook",
      scoring_scale: "Raw score out of scored items; pass point set per credential via Angoff methodology",
      passing_score:
        "Varies by credential — BCxP 83/120, BEAP 68/100, BEMP 69/100, CHD 70/100, HBDP 70/100, HFDP 72/100 (verify current FAQs at ashrae.org)",
      delivery: "Computer-based testing year-round through ASHRAE's exam provider (verify scheduling at ashrae.org)",
      outline_effective_date: "Each credential has a candidate guidebook and exam blueprint — verify current edition before scheduling",
      verify_at_url: "https://www.ashrae.org/professional-development/ashrae-certification/certification-faqs",
    },
    official_sources: [
      {
        label: "ASHRAE — Certification FAQs (exam format and passing scores)",
        url: "https://www.ashrae.org/professional-development/ashrae-certification/certification-faqs",
      },
      {
        label: "ASHRAE — Candidate guidebooks",
        url: "https://www.ashrae.org/professional-development/ashrae-certification/ashrae-certification-candidate-guidebooks",
      },
      {
        label: "ASHRAE — Official certification practice exams",
        url: "https://www.ashrae.org/professional-development/ashrae-certification/certification-exams/ashrae-certification-practice-exams",
      },
    ],
    domain_weights: [
      { domain: "BCxP — Building Commissioning Professional", weight: "Lead and manage commissioning processes (120 scored items, pass 83/120)" },
      { domain: "BEAP — Building Energy Assessment Professional", weight: "Assess building energy performance (100 scored, pass 68/100)" },
      { domain: "BEMP — Building Energy Modeling Professional", weight: "Energy modeling software, calibration, and interpretation (100 scored, pass 69/100)" },
      { domain: "CHD — Certified HVAC Designer", weight: "HVAC system design competency (100 scored, pass 70/100)" },
      { domain: "HBDP — High-Performance Building Design Professional", weight: "Integrated high-performance design (100 scored, pass 70/100)" },
      { domain: "HFDP — Healthcare Facility Design Professional", weight: "Healthcare HVAC and IEQ design (100 scored, pass 72/100, 2-hour exam)" },
      { domain: "OPMP — Operations and Performance Management Professional", weight: "Existing building operations and performance (100 scored — verify pass score at ashrae.org)" },
    ],
    whats_changed: [
      "All seven ASHRAE certification programs are accredited under ANSI/ISO/IEC 17024 — verify current ANAB listing at ashrae.org.",
      "BEMP exam content outline was updated with new tasks — an updated BEMP Study Guide was planned for Society Year 2025–26 (verify at ashrae.org).",
      "BCxP eligibility and PDH rules include updates for 2026 teaching credit limits — verify the current BCxP candidate guidebook.",
      "ASHRAE publishes 30-question official practice exams per credential ($49, one-time use) — not required for eligibility.",
    ],
    high_yield_facts: [
      "Most ASHRAE exams: 115 total items with 100 scored and 15 unidentified pretest questions interspersed throughout the form.",
      "BCxP is the exception: 130 items with 120 scored and 10 pretest items — highest pass threshold at 83/120.",
      "Cognitive levels tested: recall, application, and analysis — not memorization alone.",
      "Each credential has separate eligibility (education + years of experience) — verify the checklist in the candidate guidebook before applying.",
      "Certificants must earn Professional Development Hours (PDHs) to renew — requirements vary by credential (e.g., BCxP: 50 PDHs per 3-year cycle).",
      "ASHRAE Standard 90.1 (energy) and Guideline 36 (sequences of operation) underpin many exam blueprints across HBDP, OPMP, and BEMP.",
    ],
    candidate_qa: [
      {
        q: "How many ASHRAE personnel certifications are there?",
        a: "Seven ANSI-accredited programs: BCxP, BEAP, BEMP, CHD, HBDP, HFDP, and OPMP — each with a separate exam and eligibility requirements.",
      },
      {
        q: "How long are ASHRAE certification exams?",
        a: "Most exams allow 2.5 hours for 115 items (100 scored). HFDP allows 2 hours. Non-native English speakers may request an additional 30 minutes.",
      },
      {
        q: "What score do you need to pass the BEMP exam?",
        a: "69 correct out of 100 scored items (per ASHRAE certification FAQs — verify current pass points before scheduling).",
      },
    ],
    trademark_note:
      "ASHRAE is a registered trademark of the American Society of Heating, Refrigerating and Air-Conditioning Engineers.",
  },
  cdcp: {
    examKey: "cdcp",
    pageHeading: "Certified Data Centre Professional (CDCP) — Exam Facts, Domains & Prep",
    intro:
      "The EXIN EPI Certified Data Centre Professional (CDCP) credential validates foundational knowledge of data centre facility infrastructure and operations. Accredited training through an EPI authorized partner is required before sitting the exam. UniPrep2Go products are independent prep (not EXIN or EPI exam material).",
    exam_facts: {
      exam_name: "EXIN EPI Certified Data Centre Professional (CDCP)",
      administered_by: "EXIN (accredited by EPI — Enterprise Products Integration)",
      question_count: "40 multiple-choice",
      scored_count: "40",
      time_limit: "60 minutes",
      passing_score: "68% (27 of 40 correct)",
      delivery: "Computer-based or paper-based at end of accredited EPI CDCP training course (verify delivery route with your training partner)",
      outline_effective_date: "EXIN EPI CDCP preparation guide (verify current edition at exin.com)",
      verify_at_url: "https://www.exin.com/technologies-software/exin-epi-data-centre-management/certified-data-centre-professional",
    },
    official_sources: [
      {
        label: "EXIN — Certified Data Centre Professional",
        url: "https://www.exin.com/technologies-software/exin-epi-data-centre-management/certified-data-centre-professional",
      },
      {
        label: "EPI — CDCP preparation guide (PDF)",
        url: "https://www.epi-certification.com/uploads/file/exam%20prep/english_preparation_guide_cdcp_201706__.pdf",
      },
      {
        label: "EPI — Certified Data Centre Professional training",
        url: "https://www.epi-ap.com/services/1/3/4/Certified_Data_Centre_Professional_(CDCP)",
      },
    ],
    domain_weights: [
      { domain: "Facilities — Mission Critical Site, Standards, Location & Building", weight: "~7.5% (3 of 40 questions)" },
      { domain: "Facilities — Raised Floor, Lighting, Racks, and Network Infrastructure", weight: "~17.5% (7 of 40)" },
      { domain: "Facilities — Power Infrastructure", weight: "15% (6 of 40)" },
      { domain: "Facilities — Electro Magnetic Fields (EMF)", weight: "5% (2 of 40)" },
      { domain: "Facilities — Cooling Infrastructure", weight: "10% (4 of 40)" },
      { domain: "Facilities — Water Supply", weight: "2.5% (1 of 40)" },
      { domain: "Facilities — Fire Protection", weight: "15% (6 of 40)" },
      { domain: "Facilities — Physical Security, Safety, and Auxiliary Systems", weight: "12.5% (5 of 40)" },
      { domain: "Operations — Operational Considerations", weight: "15% (6 of 40)" },
    ],
    whats_changed: [
      "CDCP is part of the EXIN EPI Data Centre Training Framework — CDCS (specialist) and CDCE (expert) are higher tiers on the same pathway.",
      "Certificate validity is 3 years — recertification through EPI's recertification programme (verify current options at epi-ap.com).",
      "EXIN lists training as mandatory — candidates typically sit the exam immediately after the 2-day accredited CDCP course.",
      "An electronic dictionary is permitted during the exam; other electronic aids and open-book references are not.",
    ],
    high_yield_facts: [
      "Pass mark is 27 of 40 (68%) — closed book, 60 minutes.",
      "Facilities of the Data Centre accounts for ~85% of exam questions (34 of 40); Operations ~15% (6 of 40).",
      "Power Infrastructure (6 questions) and Fire Protection (6 questions) are the highest-weight subtopics on the facilities side.",
      "Standards referenced include TIA-942, Uptime Institute Tier classification, EN 50600 / ISO 22237, and ASHRAE TC 9.9 thermal guidelines.",
      "Hot aisle / cold aisle containment, free cooling, and CRAC/CRAH topologies are core cooling concepts.",
      "PUE (Power Usage Effectiveness) is the primary data centre energy efficiency metric.",
      "NFPA 75/76 and clean-agent suppression systems are common fire-protection knowledge areas.",
    ],
    candidate_qa: [
      {
        q: "How many questions are on the CDCP exam?",
        a: "40 multiple-choice questions in 60 minutes — all 40 are scored.",
      },
      {
        q: "What score do you need to pass the CDCP exam?",
        a: "68% — at least 27 correct answers out of 40.",
      },
      {
        q: "Is the CDCP exam open book?",
        a: "No. The exam is closed book. EXIN permits an (electronic) dictionary only.",
      },
      {
        q: "Do I need training before the CDCP exam?",
        a: "Yes. EXIN lists accredited EPI training as mandatory. The exam is typically taken at the end of the 2-day CDCP course.",
      },
      {
        q: "How long is the CDCP certificate valid?",
        a: "3 years. Recertify through EPI's recertification programme or progress to CDCS/CDCE credentials.",
      },
    ],
    trademark_note:
      "CDCP is a registered certification mark of EPI. EXIN is an independent exam and certification institute.",
  },
  nebosh: {
    examKey: "nebosh",
    pageHeading: "NEBOSH International General Certificate (IGC) — Exam Facts, Syllabus & Prep",
    intro:
      "NEBOSH (National Examination Board in Occupational Safety and Health) offers globally recognised occupational health and safety qualifications. The International General Certificate (IGC) is the flagship Level 3 qualification, assessed by Unit GIC1 (open-book examination) and Unit GIC2 (practical risk assessment). UniPrep2Go products are independent prep (not NEBOSH assessment material).",
    exam_facts: {
      exam_name: "NEBOSH International General Certificate in Occupational Health and Safety (IGC)",
      administered_by: "NEBOSH (delivered through accredited Learning Partners)",
      question_count:
        "GIC1: scenario-based open-book examination (100 marks); GIC2: practical workplace risk assessment — not multiple-choice",
      scored_count: "GIC1: 100 marks (qualification grade); GIC2: pass/refer only (does not affect Distinction/Credit/Pass grade)",
      time_limit: "GIC1: 5 hours; GIC2: 4 hours (verify with your Learning Partner)",
      passing_score:
        "GIC1: 45% provisional pass (45/100); grades — Distinction 75+, Credit 65–74, Pass 45–64. GIC2: pass standard in GIC2 guidance (verify at nebosh.org.uk)",
      delivery: "GIC1: remote open-book examination (OBE) via NEBOSH online platform; GIC2: practical submission per NEBOSH template",
      outline_effective_date: "IGC learner guide v1, specification June 2025, publication January 2026",
      verify_at_url: "https://www.nebosh.org.uk/qualifications/nebosh-international-general-certificate-in-occupational-health-and-safety/",
    },
    official_sources: [
      {
        label: "NEBOSH — International General Certificate (IGC)",
        url: "https://www.nebosh.org.uk/qualifications/nebosh-international-general-certificate-in-occupational-health-and-safety/",
      },
      {
        label: "NEBOSH — GIC learner guide (PDF, January 2026)",
        url: "https://www.nebosh.org.uk/documents/gic-syllabus-guide-for-learners/gic-learner-guide-v1.pdf",
      },
      {
        label: "NEBOSH — Where to study (accredited Learning Partners)",
        url: "https://www.nebosh.org.uk/qualifications/where-to-study/",
      },
    ],
    domain_weights: [
      { domain: "Element 1 — Why we should manage workplace health and safety", weight: "GIC1 OBE + GIC2 practical" },
      { domain: "Element 2 — How health and safety management systems work", weight: "GIC1 OBE + GIC2 practical (ISO 45001, ILO-OSH 2001)" },
      { domain: "Element 3 — Managing risk: people and processes", weight: "GIC1 OBE + GIC2 practical (culture, human factors, change, SSOW, PTW)" },
      { domain: "Element 4 — Health and safety monitoring and measuring", weight: "GIC1 OBE (incidents, audits, reviews)" },
      { domain: "Element 5 — Physical and psychological health", weight: "GIC1 OBE; hazards assessed in GIC2" },
      { domain: "Element 6 — Musculoskeletal health", weight: "GIC1 OBE; hazards assessed in GIC2" },
      { domain: "Element 7 — Chemical and biological agents", weight: "GIC1 OBE; hazards assessed in GIC2" },
      { domain: "Element 8 — General workplace issues", weight: "GIC1 OBE; hazards assessed in GIC2" },
      { domain: "Element 9 — Work equipment", weight: "GIC1 OBE; hazards assessed in GIC2" },
      { domain: "Element 10 — Fire", weight: "GIC1 OBE; hazards assessed in GIC2" },
      { domain: "Element 11 — Electricity", weight: "GIC1 OBE; hazards assessed in GIC2" },
      { domain: "Unit GIC2 — Risk assessment (5-step approach, hierarchy of control)", weight: "Practical assessment only — pass/refer" },
    ],
    whats_changed: [
      "The revised IGC syllabus (GIC1/GIC2 units) replaced the previous IG1/IG2 structure — learner guide published January 2026.",
      "GIC1 is a 5-hour open-book scenario examination marked out of 100; qualification grade (Distinction/Credit/Pass) is based on GIC1 only.",
      "GIC2 is a 4-hour practical risk assessment using the official NEBOSH template — pass/refer only, does not affect the qualification grade.",
      "You have five years from your first successful unit ('declaration date') to pass both units and complete the qualification.",
      "NEBOSH also offers National General Certificate (NGC), Construction, Fire, Environment, and Diploma qualifications — each with separate syllabuses and assessments.",
    ],
    high_yield_facts: [
      "GIC1 pass mark is 45% (45/100) — but aim higher; Distinction requires 75+ and Credit requires 65–74.",
      "GIC1 answers must be supported by evidence from the scenario — generic textbook answers without scenario linkage score poorly.",
      "Hierarchy of control: eliminate → substitute → engineering → administrative → PPE (last resort).",
      "ISO 45001 and ILO-OSH 2001 are the reference management system frameworks in the syllabus.",
      "GIC2 requires a suitable and sufficient risk assessment using the 5-step approach on a real or realistic workplace.",
      "IOSH Associate (AIOSH) and Tech IOSH membership routes open after achieving the IGC parchment.",
      "Contractor selection, monitoring, and management appear in both GIC1 and GIC2 assessments.",
    ],
    candidate_qa: [
      {
        q: "How is the NEBOSH IGC assessed?",
        a: "Two units: GIC1 (5-hour open-book scenario examination, 100 marks) and GIC2 (4-hour practical risk assessment). You must pass both within five years.",
      },
      {
        q: "What score do you need to pass NEBOSH GIC1?",
        a: "45% provisional pass (45 marks out of 100). Distinction is 75+, Credit is 65–74.",
      },
      {
        q: "Does GIC2 affect my NEBOSH grade?",
        a: "No. Qualification grade (Distinction/Credit/Pass) is based on GIC1 only. GIC2 is assessed as Pass or Refer.",
      },
      {
        q: "Is the NEBOSH IGC exam open book?",
        a: "GIC1 is an open-book examination (OBE) — you may use course notes and reference materials during the 5-hour sitting. GIC2 is a practical workplace risk assessment, not a closed-book MCQ test.",
      },
      {
        q: "What other NEBOSH qualifications exist?",
        a: "NEBOSH offers National General Certificate (NGC), Certificates in Construction Health and Safety, Fire Safety, Environmental Management, and the National/International Diploma — each with separate unit assessments.",
      },
    ],
    trademark_note:
      "NEBOSH is a registered trademark of The National Examination Board in Occupational Safety and Health.",
  },
  cfps: {
    examKey: "cfps",
    pageHeading: "Certified Fire Protection Specialist (CFPS) — Exam Facts, Domains & Prep",
    intro:
      "The Certified Fire Protection Specialist (CFPS) credential from NFPA recognizes expertise in fire protection, life safety, and fire science. The computer-based exam is open book and references the NFPA Fire Protection Handbook. UniPrep2Go products are independent prep (not NFPA exam material).",
    exam_facts: {
      exam_name: "Certified Fire Protection Specialist (CFPS)",
      administered_by: "National Fire Protection Association (NFPA) via Prometric test centers",
      question_count: "100 multiple-choice",
      scored_count: "100",
      time_limit: "3 hours",
      passing_score: "Not published by NFPA — results reported as Pass or Fail only (no percentage or scaled score)",
      delivery: "Computer-based at Prometric test centers worldwide (English; verify other languages at nfpa.org/cfps)",
      outline_effective_date: "Exam content aligned with NFPA Fire Protection Handbook, 21st Edition (exam updated June 2024)",
      verify_at_url: "https://www.nfpa.org/cfps",
    },
    official_sources: [
      {
        label: "NFPA — Certified Fire Protection Specialist (CFPS)",
        url: "https://www.nfpa.org/cfps",
      },
      {
        label: "NFPA — CFPS certification handbook (PDF)",
        url: "https://www.nfpa.org/-/media/project/storefront/catalog/files/certification/cfps/cfpshandbook.pdf",
      },
      {
        label: "NFPA — Fire Protection Handbook, 21st Edition",
        url: "https://www.nfpa.org/products/fire-protection-handbook-21st-edition",
      },
    ],
    domain_weights: [
      { domain: "Fire Suppression", weight: "22%" },
      { domain: "Safety in the Built Environment", weight: "16%" },
      { domain: "Detection and Alarm", weight: "14%" },
      { domain: "Fire Prevention: Programs, Materials, Processes, and Environments", weight: "12%" },
      { domain: "Information and Analysis for Fire Protection and Fire Science", weight: "9%" },
      { domain: "Facility Fire Hazard Management", weight: "9%" },
      { domain: "Organizing for Fire and Rescue Services", weight: "9%" },
      { domain: "Confining Fires", weight: "9%" },
    ],
    whats_changed: [
      "As of June 19, 2024, CFPS exam content reflects the NFPA Fire Protection Handbook, 21st Edition (2023), including new chapters on energy storage systems and cannabis facilities.",
      "Only an original print copy of the Fire Protection Handbook, 21st Edition is permitted in the exam room — electronic, photocopied, or loose pages are not allowed.",
      "Permanent adhesive tabs are allowed; sticky notes, flags, and paper clips are prohibited per NFPA handbook guidance.",
      "CFPS certification renewal is required every 3 years with 50 continuing education points and an annual maintenance fee (verify at nfpa.org).",
    ],
    high_yield_facts: [
      "Fire Suppression (22%) and Safety in the Built Environment (16%) together account for 38% of exam content — highest-weight domains.",
      "The exam is open book, but only the original printed 21st Edition Fire Protection Handbook — know how to navigate it quickly.",
      "NFPA does not publish the passing score; you receive Pass/Fail immediately with a domain diagnostic if you do not pass.",
      "Three eligibility pathways combine education and fire protection experience (from bachelor's + 2 years to high school + 6 years — verify current requirements).",
      "NFPA sells a practice examination with 100 retired questions — useful but not required for eligibility.",
      "Prometric delivers the exam; schedule through NFPA after application approval.",
    ],
    candidate_qa: [
      {
        q: "How many questions are on the CFPS exam?",
        a: "100 multiple-choice questions in 3 hours at a Prometric test center.",
      },
      {
        q: "What score do you need to pass the CFPS exam?",
        a: "NFPA does not publish a passing percentage or scaled score. Results are reported as Pass or Fail only.",
      },
      {
        q: "Is the CFPS exam open book?",
        a: "Yes — but only an original print copy of the NFPA Fire Protection Handbook, 21st Edition is permitted. Electronic copies and photocopies are not allowed.",
      },
      {
        q: "What reference book is required for CFPS?",
        a: "The NFPA Fire Protection Handbook, 21st Edition (2023). Exam content was updated in June 2024 to align with this edition.",
      },
      {
        q: "What are the CFPS exam domains?",
        a: "Eight domains: Fire Suppression (22%), Safety in the Built Environment (16%), Detection and Alarm (14%), Fire Prevention (12%), and four domains at 9% each (Information and Analysis, Facility Hazard Management, Organizing for Fire and Rescue, Confining Fires).",
      },
    ],
    trademark_note:
      "CFPS and NFPA are trademarks of the National Fire Protection Association.",
  },
  mrics: {
    examKey: "mrics",
    pageHeading: "MRICS — Assessment of Professional Competence (APC) Facts & Prep",
    intro:
      "MRICS (Member of the Royal Institution of Chartered Surveyors) is the chartered grade for land, property, construction, and infrastructure professionals. Qualification is through the RICS Assessment of Professional Competence (APC): written submissions and a final assessment interview — not a standalone multiple-choice exam. UniPrep2Go products are independent prep (not RICS assessment material).",
    exam_facts: {
      exam_name: "RICS Assessment of Professional Competence (APC) — MRICS chartered membership",
      administered_by: "Royal Institution of Chartered Surveyors (RICS)",
      question_count:
        "No multiple-choice exam — written submission (summary of experience + 3,000-word case study) plus 60-minute final assessment interview",
      time_limit:
        "Final assessment interview: 60 minutes (10-min case study presentation, 10-min presentation Q&A, 30-min technical competency questioning, 10-min mandatory/ethics questioning)",
      passing_score: "Competency-based pass/refer at final assessment — RICS does not publish a percentage score",
      delivery: "Written submission via RICS Assessment Platform; final interview in person or by video (verify current format at rics.org)",
      outline_effective_date: "APC Candidate Guide (June 2025, amended March 2026 — verify at rics.org)",
      verify_at_url: "https://www.rics.org/join-rics/rics-member-grades/chartered-member-mrics/assessment-of-professional-competence-apc",
    },
    official_sources: [
      {
        label: "RICS — Assessment of Professional Competence (APC)",
        url: "https://www.rics.org/join-rics/rics-member-grades/chartered-member-mrics/assessment-of-professional-competence-apc",
      },
      {
        label: "RICS — APC submissions and assessment",
        url: "https://www.rics.org/candidates/assessment-information/apc-submissions-assessment",
      },
      {
        label: "RICS — APC Candidate Guide (PDF, March 2026 amendment)",
        url: "https://www.rics.org/content/dam/ricsglobal/documents/join-rics/APC-Candidate-Guide_June-2025-amended-March-2026.pdf",
      },
    ],
    domain_weights: [
      { domain: "Mandatory competencies", weight: "Personal, interpersonal, and business skills common to all 22 sector pathways" },
      { domain: "Core technical competencies", weight: "Primary technical skills of your chosen sector pathway (Level 1–3)" },
      { domain: "Optional technical competencies", weight: "Additional pathway-specific skills selected from RICS competency list" },
      { domain: "Summary of experience", weight: "Mandatory competencies ~1,500 words; technical competencies ~3,000–4,000 words" },
      { domain: "Case study", weight: "3,000 words on a project within the last 24 months demonstrating Level 3 advice" },
      { domain: "CPD and Professionalism Module", weight: "48 hours CPD (12 months) or 96 hours (24-month structured training); Rules of Conduct module required" },
      { domain: "Final assessment interview", weight: "60 minutes — presentation, technical probing at Level 3, mandatory/ethics questioning" },
    ],
    whats_changed: [
      "From 1 January 2026, candidates may make up to five attempts to pass the RICS assessment (attempts before this date do not count toward the limit).",
      "Competencies are assessed at three levels: Level 1 (knowledge), Level 2 (application), Level 3 (reasoned advice) — interview questioning typically starts at Level 3.",
      "Ethics and Rules of Conduct questioning can result in automatic referral if answered unsatisfactorily — regardless of technical performance.",
      "22 sector pathways cover disciplines including building surveying, quantity surveying, commercial property, project management, valuation, and infrastructure (verify pathway guide at rics.org).",
    ],
    high_yield_facts: [
      "MRICS is not earned through a multiple-choice test — you must pass written submission review and the final assessment interview.",
      "Case study project must be no older than 24 months and demonstrate your personal Level 3 reasoned advice.",
      "Interview structure: 10-min presentation → 10-min presentation questions → 30-min technical competency questions → 10-min mandatory/ethics questions.",
      "Level 3 answers require reasoned advice backed by strong Level 1 knowledge — assessors probe from experience down to underlying theory.",
      "Structured training routes: APC 12 (12 months) or APC 24 (24 months) with diary/logbook; experienced routes may skip structured training with 10+ years and accredited degree.",
      "Proposer and seconder support is required as part of the submission process via the Assessment Platform.",
    ],
    candidate_qa: [
      {
        q: "Is there a multiple-choice exam for MRICS?",
        a: "No. MRICS qualification is through the APC: written submissions (summary of experience and case study) plus a 60-minute final assessment interview.",
      },
      {
        q: "What is the MRICS final assessment interview format?",
        a: "60 minutes total: 10-minute case study presentation, 10 minutes on the presentation, 30 minutes on technical competencies, and 10 minutes on mandatory competencies and ethics.",
      },
      {
        q: "How many APC attempts are allowed?",
        a: "From 1 January 2026, up to five attempts to pass. Earlier attempts do not count toward this limit (verify at rics.org).",
      },
      {
        q: "What CPD is required for APC submission?",
        a: "48 hours of CPD in the last 12 months (or 96 hours in 24 months if on a 24-month structured training route), plus completion of the RICS Professionalism Module.",
      },
      {
        q: "How many RICS sector pathways are there?",
        a: "22 sector pathways — you choose one based on your qualifications, experience, and job role (e.g., building surveying, quantity surveying, commercial property). Each has a pathway guide listing mandatory, core, and optional competencies.",
      },
    ],
    trademark_note:
      "MRICS and RICS are registered trademarks of the Royal Institution of Chartered Surveyors.",
  },
  "mrics-quantity-surveying": {
    examKey: "mrics-quantity-surveying",
    pageHeading: "MRICS Quantity Surveying — APC Pathway Facts & Prep",
    intro:
      "The RICS Quantity Surveying and Construction sector pathway leads to MRICS chartered membership through the Assessment of Professional Competence (APC). Candidates demonstrate six core technical competencies to Level 3, two optional competencies to Level 2, and mandatory competencies including Ethics at Level 3 — via written submission and a final assessment interview. UniPrep2Go products are independent prep (not RICS assessment material).",
    exam_facts: {
      exam_name: "RICS APC — Quantity Surveying and Construction pathway (MRICS)",
      administered_by: "Royal Institution of Chartered Surveyors (RICS)",
      question_count:
        "No multiple-choice exam — written submission (summary of experience + 3,000-word case study on a QS project) plus 60-minute final assessment interview",
      time_limit:
        "Final assessment interview: 60 minutes (10-min case study presentation + 50 minutes questioning on QS competencies and ethics)",
      passing_score: "Competency-based pass/refer — RICS does not publish a percentage score",
      delivery: "RICS Assessment Platform submission; final interview in person or by video (verify at rics.org)",
      outline_effective_date: "Quantity Surveying and Construction pathway guide (December 2025 — verify at rics.org/join-rics/sector-pathways)",
      verify_at_url: "https://www.rics.org/join-rics/sector-pathways",
    },
    official_sources: [
      {
        label: "RICS — Sector pathways (Quantity Surveying and Construction)",
        url: "https://www.rics.org/join-rics/sector-pathways",
      },
      {
        label: "RICS — Quantity Surveying and Construction pathway guide (PDF, December 2025)",
        url: "https://www.rics.org/content/dam/ricsglobal/documents/join-rics/QS-and-construction_December-2025.pdf",
      },
      {
        label: "RICS — Requirements and competencies guide (December 2025)",
        url: "https://www.rics.org/content/dam/ricsglobal/documents/join-rics/Requirements-and-competencies_December-2025.pdf",
      },
    ],
    domain_weights: [
      { domain: "Commercial management (of construction works) OR Design economics and cost planning", weight: "Core to Level 3 — choose one based on contracting vs consulting role" },
      { domain: "Construction technology and environmental services", weight: "Core to Level 3" },
      { domain: "Contract practice", weight: "Core to Level 3 (JCT, NEC, FIDIC per practice context)" },
      { domain: "Procurement and tendering", weight: "Core to Level 3" },
      { domain: "Project finance (control and reporting)", weight: "Core to Level 3" },
      { domain: "Quantification and costing (of construction works)", weight: "Core to Level 3 (measurement, BOQ, NRM/SMM conventions)" },
      { domain: "Optional competencies (two to Level 2)", weight: "e.g. Risk management, Contract administration, Programming and planning, Sustainability — verify pathway guide list" },
      { domain: "Mandatory competencies", weight: "Ethics to Level 3; Client care, Communication, H&S to Level 2; others to Level 1" },
    ],
    whats_changed: [
      "December 2025 pathway guide aligns MRICS QS requirements with the global Requirements and competencies structure.",
      "Contractors typically take Commercial management to Level 3; consultants typically take Design economics and cost planning to Level 3 — the other may be selected as an optional to Level 2.",
      "From 1 January 2026, up to five assessment attempts are permitted (earlier attempts do not count toward the limit).",
      "Case study must reflect a project within the last 24 months where you personally gave Level 3 reasoned advice.",
    ],
    high_yield_facts: [
      "Six core QS competencies all require Level 3 — interview questioning starts at Level 3 and probes down to Level 1 knowledge.",
      "Commercial management vs Design economics and cost planning is the key fork: contracting/commercial roles vs PQS/consulting cost planning.",
      "Contract practice covers standard forms (JCT, NEC, etc.) — know how your chosen form allocates risk, payment, and variations.",
      "Quantification and costing requires demonstrable measurement skills, pricing logic, and cost plan evolution from feasibility to final account.",
      "Ethics at mandatory Level 3 — unsatisfactory ethics answers can cause automatic referral regardless of technical performance.",
      "Two optional competencies to Level 2 — common choices include Risk management, Contract administration, and Programming and planning.",
    ],
    candidate_qa: [
      {
        q: "What are the MRICS Quantity Surveying core competencies?",
        a: "Six to Level 3: Commercial management OR Design economics and cost planning; Construction technology and environmental services; Contract practice; Procurement and tendering; Project finance (control and reporting); Quantification and costing.",
      },
      {
        q: "Should I choose Commercial management or Design economics and cost planning?",
        a: "Contracting/commercial environments typically choose Commercial management to Level 3. Consulting (public or private sector PQS) typically choose Design economics and cost planning to Level 3. The other can often be taken as an optional to Level 2.",
      },
      {
        q: "How many optional competencies do QS APC candidates need?",
        a: "Two optional competencies to Level 2, selected from the pathway list (e.g., Risk management, Contract administration, Capital allowances, Programming and planning — verify current guide).",
      },
      {
        q: "Is there a written exam for MRICS Quantity Surveying?",
        a: "No multiple-choice exam. You submit a summary of experience and 3,000-word case study, then attend a 60-minute final assessment interview.",
      },
      {
        q: "What mandatory competency level is required for Ethics?",
        a: "Level 3 for Ethics, Rules of Conduct and professionalism — the only mandatory competency at Level 3 across all pathways.",
      },
    ],
    trademark_note:
      "MRICS and RICS are registered trademarks of the Royal Institution of Chartered Surveyors.",
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
  "gmat-focus-anki-deck": "gmat",
  "sat-anki-deck": "sat",
  "pmp-anki-deck": "pmp",
  "gre-anki-deck": "gre",
  "hvac-epa-608-anki-deck": "epa-608",
  "bms-building-automation-anki-deck": "bms-bas",
  "leed-green-associate-anki-deck": "leed-green-associate",
  "leed-ap-bd-c-anki-deck": "leed-ap-bd-c",
  "leed-ap-om-anki-deck": "leed-ap-om",
  "well-ap-anki-deck": "well-ap",
  "cem-anki-deck": "cem",
  "ashrae-certifications-anki-deck": "ashrae-certifications",
  "cdcp-anki-deck": "cdcp",
  "nebosh-anki-deck": "nebosh",
  "cfps-anki-deck": "cfps",
  "mrics-anki-deck": "mrics",
  "mrics-quantity-surveying-anki-deck": "mrics-quantity-surveying",
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
