export type Wave3Explainer = {
  practiceTestName: string;
  whatIsExam: string;
  administeredBy: string;
  officialFormat?: string;
  whoFor?: string;
  howToPrepare?: string;
  topicBlurbs?: Array<{ id: string; label: string; blurb: string }>;
  examFaqs: Array<{ question: string; answer: string }>;
  keywords: string[];
};

export const wave3ExamExplainers: Record<string, Wave3Explainer> = {
  "az-real-estate-readiness-check": {
    practiceTestName: "Arizona Real Estate Practice Test",
    whatIsExam: "The Arizona real estate salesperson exam is the state licensing test after pre-license education. It covers national principles and Arizona-specific license law for becoming a licensed salesperson.",
    administeredBy: "Arizona Department of Real Estate",
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with Arizona Department of Real Estate.",
    examFaqs: [
      {
        question: "What is the Arizona Real Estate exam?",
        answer: "The Arizona real estate salesperson exam is the state licensing test after pre-license education. It covers national principles and Arizona-specific license law for becoming a licensed salesperson.",
      },
      {
        question: "Is this an official Arizona Real Estate exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from Arizona Department of Real Estate.",
      },
    ],
    keywords: ["arizona real estate practice test", "az re practice test", "arizona real estate practice exam"],
  },
  "ga-real-estate-readiness-check": {
    practiceTestName: "Georgia Real Estate Practice Test",
    whatIsExam: "The Georgia real estate salesperson exam licenses agents after approved coursework. It tests real estate principles plus Georgia Commission rules and license law.",
    administeredBy: "Georgia Real Estate Commission",
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with Georgia Real Estate Commission.",
    examFaqs: [
      {
        question: "What is the Georgia Real Estate exam?",
        answer: "The Georgia real estate salesperson exam licenses agents after approved coursework. It tests real estate principles plus Georgia Commission rules and license law.",
      },
      {
        question: "Is this an official Georgia Real Estate exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from Georgia Real Estate Commission.",
      },
    ],
    keywords: ["georgia real estate practice test", "ga re practice test", "georgia real estate practice exam"],
  },
  "il-real-estate-readiness-check": {
    practiceTestName: "Illinois Real Estate Practice Test",
    whatIsExam: "The Illinois real estate broker/salesperson licensing exam (pathway-dependent) tests national content and Illinois license law administered through IDFPR\u2019s exam vendor.",
    administeredBy: "IDFPR",
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with IDFPR.",
    examFaqs: [
      {
        question: "What is the Illinois Real Estate exam?",
        answer: "The Illinois real estate broker/salesperson licensing exam (pathway-dependent) tests national content and Illinois license law administered through IDFPR\u2019s exam vendor.",
      },
      {
        question: "Is this an official Illinois Real Estate exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from IDFPR.",
      },
    ],
    keywords: ["illinois real estate practice test", "il re practice test", "illinois real estate practice exam"],
  },
  "oh-real-estate-readiness-check": {
    practiceTestName: "Ohio Real Estate Practice Test",
    whatIsExam: "Ohio\u2019s real estate salesperson exam is required after pre-license education to become a licensed salesperson under the Ohio Division of Real Estate & Professional Licensing.",
    administeredBy: "Ohio Division of Real Estate",
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with Ohio Division of Real Estate.",
    examFaqs: [
      {
        question: "What is the Ohio Real Estate exam?",
        answer: "Ohio\u2019s real estate salesperson exam is required after pre-license education to become a licensed salesperson under the Ohio Division of Real Estate & Professional Licensing.",
      },
      {
        question: "Is this an official Ohio Real Estate exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from Ohio Division of Real Estate.",
      },
    ],
    keywords: ["ohio real estate practice test", "oh re practice test", "ohio real estate practice exam"],
  },
  "pa-real-estate-readiness-check": {
    practiceTestName: "Pennsylvania Real Estate Practice Test",
    whatIsExam: "The Pennsylvania real estate salesperson exam licenses candidates after Commission-required education, covering principles and Pennsylvania Real Estate Licensing and Registration Act topics.",
    administeredBy: "Pennsylvania Real Estate Commission",
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with Pennsylvania Real Estate Commission.",
    examFaqs: [
      {
        question: "What is the Pennsylvania Real Estate exam?",
        answer: "The Pennsylvania real estate salesperson exam licenses candidates after Commission-required education, covering principles and Pennsylvania Real Estate Licensing and Registration Act topics.",
      },
      {
        question: "Is this an official Pennsylvania Real Estate exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from Pennsylvania Real Estate Commission.",
      },
    ],
    keywords: ["pennsylvania real estate practice test", "pa re practice test", "pennsylvania real estate practice exam"],
  },
  "nc-real-estate-readiness-check": {
    practiceTestName: "North Carolina Real Estate Practice Test",
    whatIsExam: "The North Carolina real estate broker exam (provisional broker pathway) is administered for NCREC licensing after required education hours.",
    administeredBy: "NCREC",
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with NCREC.",
    examFaqs: [
      {
        question: "What is the North Carolina Real Estate exam?",
        answer: "The North Carolina real estate broker exam (provisional broker pathway) is administered for NCREC licensing after required education hours.",
      },
      {
        question: "Is this an official North Carolina Real Estate exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from NCREC.",
      },
    ],
    keywords: ["north carolina real estate practice test", "nc re practice test", "north carolina real estate practice exam"],
  },
  "va-real-estate-readiness-check": {
    practiceTestName: "Virginia Real Estate Practice Test",
    whatIsExam: "Virginia\u2019s real estate salesperson exam is the state licensing test after DPOR-approved education, covering national and Virginia-specific law.",
    administeredBy: "Virginia DPOR",
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with Virginia DPOR.",
    examFaqs: [
      {
        question: "What is the Virginia Real Estate exam?",
        answer: "Virginia\u2019s real estate salesperson exam is the state licensing test after DPOR-approved education, covering national and Virginia-specific law.",
      },
      {
        question: "Is this an official Virginia Real Estate exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from Virginia DPOR.",
      },
    ],
    keywords: ["virginia real estate practice test", "va re practice test", "virginia real estate practice exam"],
  },
  "wa-real-estate-readiness-check": {
    practiceTestName: "Washington Real Estate Practice Test",
    whatIsExam: "The Washington real estate broker exam licenses candidates through the Department of Licensing after required coursework.",
    administeredBy: "Washington DOL",
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with Washington DOL.",
    examFaqs: [
      {
        question: "What is the Washington Real Estate exam?",
        answer: "The Washington real estate broker exam licenses candidates through the Department of Licensing after required coursework.",
      },
      {
        question: "Is this an official Washington Real Estate exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from Washington DOL.",
      },
    ],
    keywords: ["washington real estate practice test", "wa re practice test", "washington real estate practice exam"],
  },
  "co-real-estate-readiness-check": {
    practiceTestName: "Colorado Real Estate Practice Test",
    whatIsExam: "Colorado\u2019s real estate broker exam is required for licensure under the Colorado Real Estate Commission after approved education.",
    administeredBy: "Colorado Real Estate Commission",
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with Colorado Real Estate Commission.",
    examFaqs: [
      {
        question: "What is the Colorado Real Estate exam?",
        answer: "Colorado\u2019s real estate broker exam is required for licensure under the Colorado Real Estate Commission after approved education.",
      },
      {
        question: "Is this an official Colorado Real Estate exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from Colorado Real Estate Commission.",
      },
    ],
    keywords: ["colorado real estate practice test", "co re practice test", "colorado real estate practice exam"],
  },
  "nj-real-estate-readiness-check": {
    practiceTestName: "New Jersey Real Estate Practice Test",
    whatIsExam: "The New Jersey real estate salesperson exam licenses agents after Commission-required classroom hours and fingerprinting requirements.",
    administeredBy: "New Jersey Real Estate Commission",
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with New Jersey Real Estate Commission.",
    examFaqs: [
      {
        question: "What is the New Jersey Real Estate exam?",
        answer: "The New Jersey real estate salesperson exam licenses agents after Commission-required classroom hours and fingerprinting requirements.",
      },
      {
        question: "Is this an official New Jersey Real Estate exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from New Jersey Real Estate Commission.",
      },
    ],
    keywords: ["new jersey real estate practice test", "nj re practice test", "new jersey real estate practice exam"],
  },
  "ma-real-estate-readiness-check": {
    practiceTestName: "Massachusetts Real Estate Practice Test",
    whatIsExam: "Massachusetts salesperson licensing requires approved education and passing the state real estate exam covering principles and MA license law.",
    administeredBy: "Massachusetts Board of Registration",
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with Massachusetts Board of Registration.",
    examFaqs: [
      {
        question: "What is the Massachusetts Real Estate exam?",
        answer: "Massachusetts salesperson licensing requires approved education and passing the state real estate exam covering principles and MA license law.",
      },
      {
        question: "Is this an official Massachusetts Real Estate exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from Massachusetts Board of Registration.",
      },
    ],
    keywords: ["massachusetts real estate practice test", "ma re practice test", "massachusetts real estate practice exam"],
  },
  "mi-real-estate-readiness-check": {
    practiceTestName: "Michigan Real Estate Practice Test",
    whatIsExam: "Michigan\u2019s real estate salesperson exam is administered for LARA licensing after required pre-license education.",
    administeredBy: "Michigan LARA",
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with Michigan LARA.",
    examFaqs: [
      {
        question: "What is the Michigan Real Estate exam?",
        answer: "Michigan\u2019s real estate salesperson exam is administered for LARA licensing after required pre-license education.",
      },
      {
        question: "Is this an official Michigan Real Estate exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from Michigan LARA.",
      },
    ],
    keywords: ["michigan real estate practice test", "mi re practice test", "michigan real estate practice exam"],
  },
  "cdl-air-brakes-readiness-check": {
    practiceTestName: "CDL Air Brakes Practice Test",
    whatIsExam: "The CDL air brakes knowledge test covers air brake system parts, dual systems, inspections, and safe use. Drivers of air-brake vehicles typically need this knowledge test (and skills where required).",
    administeredBy: "State DMV / FMCSA",
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with State DMV / FMCSA.",
    examFaqs: [
      {
        question: "What is the CDL Air Brakes exam?",
        answer: "The CDL air brakes knowledge test covers air brake system parts, dual systems, inspections, and safe use. Drivers of air-brake vehicles typically need this knowledge test (and skills where required).",
      },
      {
        question: "Is this an official CDL Air Brakes exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from State DMV / FMCSA.",
      },
    ],
    keywords: ["cdl air brakes practice test", "air brake endorsement practice test", "cdl air brakes practice exam"],
  },
  "cdl-combination-readiness-check": {
    practiceTestName: "CDL Combination Vehicles Practice Test",
    whatIsExam: "The CDL combination vehicles test covers tractor-trailer coupling, combination handling, and inspection topics needed for many Class A CDL pathways.",
    administeredBy: "State DMV / FMCSA",
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with State DMV / FMCSA.",
    examFaqs: [
      {
        question: "What is the CDL Combination Vehicles exam?",
        answer: "The CDL combination vehicles test covers tractor-trailer coupling, combination handling, and inspection topics needed for many Class A CDL pathways.",
      },
      {
        question: "Is this an official CDL Combination Vehicles exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from State DMV / FMCSA.",
      },
    ],
    keywords: ["cdl combination practice test", "class a combination practice test", "cdl combination vehicles practice exam"],
  },
  "cdl-doubles-triples-readiness-check": {
    practiceTestName: "CDL Doubles/Triples Practice Test",
    whatIsExam: "The doubles/triples (T) endorsement knowledge test covers pulling double or triple trailers, including coupling, handling, and inspection.",
    administeredBy: "State DMV / FMCSA",
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with State DMV / FMCSA.",
    examFaqs: [
      {
        question: "What is the CDL Doubles/Triples exam?",
        answer: "The doubles/triples (T) endorsement knowledge test covers pulling double or triple trailers, including coupling, handling, and inspection.",
      },
      {
        question: "Is this an official CDL Doubles/Triples exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from State DMV / FMCSA.",
      },
    ],
    keywords: ["cdl doubles practice test", "triples endorsement practice test", "t endorsement practice test", "cdl doubles/triples practice exam"],
  },
  "cdl-tankers-readiness-check": {
    practiceTestName: "CDL Tank Vehicles Practice Test",
    whatIsExam: "The tank vehicle (N) endorsement knowledge test covers liquid surge, baffled vs unbaffled tanks, and safe tanker driving practices.",
    administeredBy: "State DMV / FMCSA",
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with State DMV / FMCSA.",
    examFaqs: [
      {
        question: "What is the CDL Tank Vehicles exam?",
        answer: "The tank vehicle (N) endorsement knowledge test covers liquid surge, baffled vs unbaffled tanks, and safe tanker driving practices.",
      },
      {
        question: "Is this an official CDL Tank Vehicles exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from State DMV / FMCSA.",
      },
    ],
    keywords: ["cdl tanker practice test", "n endorsement practice test", "tank vehicles practice test", "cdl tank vehicles practice exam"],
  },
  "nclex-rn-readiness-check": {
    practiceTestName: "NCLEX-RN Practice Test",
    whatIsExam: "The NCLEX-RN is the National Council Licensure Examination for Registered Nurses. Passing it is required for RN licensure in the United States after an approved nursing program.",
    administeredBy: "NCSBN",
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with NCSBN.",
    examFaqs: [
      {
        question: "What is the NCLEX-RN exam?",
        answer: "The NCLEX-RN is the National Council Licensure Examination for Registered Nurses. Passing it is required for RN licensure in the United States after an approved nursing program.",
      },
      {
        question: "Is this an official NCLEX-RN exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from NCSBN.",
      },
    ],
    keywords: ["nclex-rn practice test", "rn license exam practice test", "nclex-rn practice exam"],
  },
  "medication-aide-readiness-check": {
    practiceTestName: "Medication Aide Practice Test",
    whatIsExam:
      "Medication aide / medication assistant exams certify nurse aides to administer certain medications in long-term care under nurse supervision. Many states use NCSBN’s MACE (typically 60 multiple-choice questions / 2 hours). Other states use their own form. This is not RN/LPN practice and not the NNAAP CNA exam.",
    administeredBy: "State boards of nursing / nurse-aide registries (NCSBN MACE where adopted)",
    officialFormat:
      "Typical MACE written: 60 questions / 2 hours (some outlines 50 scored + 10 pretest); pass set by NCSBN/state. UniPrep mock: 60 questions / 75 minutes / 70% diagnostic. Confirm your state handbook.",
    whoFor:
      "CNAs completing medication-aide training for LTC — not LPNs/RNs and not CNA-only NNAAP candidates.",
    howToPrepare:
      "Run this free timed check for a topic report, then repair weak rights/routes/safety/docs with the planned Anki waitlist and your state MACE/handbook. Skills/competency, if required, is separate.",
    examFaqs: [
      {
        question: "How many questions are on the medication aide exam?",
        answer:
          "Where a state uses MACE, the written exam is typically 60 questions in 2 hours. Some states differ. UniPrep’s free check is 60 questions / 75 minutes.",
      },
      {
        question: "Is this an official Medication Aide / MACE exam?",
        answer:
          "No. Independent UniPrep2Go practice — not NCSBN, Credentia, or a state board exam. Matching Anki is planned (waitlist).",
      },
      {
        question: "Can a medication aide start IVs or change doses?",
        answer:
          "No. Medication aides administer within authorized duties under nurse supervision. Hold parameters and out-of-scope requests go to the nurse — they do not independently change orders or start IVs.",
      },
    ],
    keywords: ["medication aide practice test", "mace practice test", "cma med aide practice test", "medication aide practice exam"],
  },
  "home-health-aide-readiness-check": {
    practiceTestName: "Home Health Aide Practice Test",
    whatIsExam:
      "Home health aide (HHA) competency checks confirm that aides can deliver personal care in a client’s home under a nurse-directed care plan. Typical domains include ADLs (bathing, dressing, toileting, feeding), home safety and infection control, observation/reporting of changes, and ethics/boundaries/privacy. Requirements are state-driven: many U.S. states require approved training hours plus a written and/or skills competency evaluation before working for a Medicare-certified home health agency. This UniPrep2Go page is an independent 60-question timed diagnostic (75 minutes, 70% readiness pass) — not a state board exam and not a substitute for your state’s official skills checklist.",
    administeredBy:
      "State health departments / approved HHA training programs (often aligned to federal home-health aide training themes for Medicare-certified agencies). Confirm your state board or training program outline.",
    officialFormat:
      "Official evaluations vary by state (written MCQ and/or skills demo). UniPrep mock: 60 multiple-choice questions, 75 minutes, 70% readiness pass with topic scoring — knowledge drill only, not the official skills lab.",
    whoFor:
      "Trainees and working HHAs preparing state competency or agency orientation quizzes; CNA→HHA transition candidates who need home-care framing (client home, care plan, reporting). Not a substitute for supervised skills practice.",
    howToPrepare:
      "Study your state/agency handbook for ADLs, infection control, body mechanics, vital-sign reporting thresholds, abuse reporting, and HIPAA. Practice skills in lab/clinical. Take this free timed diagnostic to find weak domains, then drill the linked Home Health Aide Anki waitlist when the .apkg ships.",
    topicBlurbs: [
      {
        id: "adls",
        label: "ADLs & personal care",
        blurb: "Bathing, dressing, toileting, feeding, mobility assistance, and person-centered dignity in the home.",
      },
      {
        id: "safety",
        label: "Home safety & infection",
        blurb: "Hand hygiene, PPE, body mechanics, fall prevention, and safe home environment basics.",
      },
      {
        id: "obs",
        label: "Observation & reporting",
        blurb: "What to watch for, what to document, and when to escalate to the nurse or supervisor.",
      },
      {
        id: "ethics",
        label: "Ethics & boundaries",
        blurb: "Privacy, abuse reporting, abandonment, gifts/loans, and professional limits in someone’s home.",
      },
    ],
    examFaqs: [
      {
        question: "What is the Home Health Aide exam?",
        answer:
          "Most states require HHA training plus a competency evaluation (written and/or skills) covering personal care, safety, observation, and ethics for aides working in client homes under a care plan. Exact format is state-specific.",
      },
      {
        question: "Is this an official Home Health Aide exam?",
        answer:
          "No. UniPrep2Go’s readiness check is independent timed practice — not a state board, CMS, or training-program official exam.",
      },
      {
        question: "Is the HHA test the same as the CNA exam?",
        answer:
          "They overlap on ADLs and safety, but HHA focuses on care in the client’s home under a home-health care plan. Do not assume a CNA written test is identical to your state’s HHA competency.",
      },
      {
        question: "How many questions are on this UniPrep2Go practice test?",
        answer:
          "60 multiple-choice questions in 75 minutes with a 70% readiness pass mark and topic scoring across ADLs, safety, observation, and ethics.",
      },
      {
        question: "Does New York (or my state) use this exact exam?",
        answer:
          "No. States set their own HHA training and competency rules. Use this diagnostic for themes, then verify hours, skills checklist, and testing vendor with your state program.",
      },
      {
        question: "Is there a Home Health Aide Anki deck?",
        answer:
          "A Home Health Aide Anki deck is planned on UniPrep2Go (waitlist). Use this free readiness check now to benchmark weak topics.",
      },
    ],
    keywords: [
      "home health aide practice test",
      "hha exam practice test",
      "home health aide practice exam",
      "free hha practice test",
      "home health aide competency test",
    ],
  },
  "rbt-behavior-technician-readiness-check": {
    practiceTestName: "RBT Practice Test",
    whatIsExam: "The Registered Behavior Technician (RBT) exam from BACB certifies paraprofessionals who implement behavior-analytic services under BCBA supervision.",
    administeredBy: "BACB",
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with BACB.",
    examFaqs: [
      {
        question: "What is the RBT exam?",
        answer: "The Registered Behavior Technician (RBT) exam from BACB certifies paraprofessionals who implement behavior-analytic services under BCBA supervision.",
      },
      {
        question: "Is this an official RBT exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from BACB.",
      },
    ],
    keywords: ["rbt practice test", "registered behavior technician practice test", "rbt practice exam"],
  },
  "amt-rma-readiness-check": {
    practiceTestName: "AMT RMA Practice Test",
    whatIsExam: "The AMT Registered Medical Assistant (RMA) exam certifies medical assistants in clinical and administrative domains as an alternative national MA credential.",
    administeredBy: "American Medical Technologists",
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with American Medical Technologists.",
    examFaqs: [
      {
        question: "What is the AMT RMA exam?",
        answer: "The AMT Registered Medical Assistant (RMA) exam certifies medical assistants in clinical and administrative domains as an alternative national MA credential.",
      },
      {
        question: "Is this an official AMT RMA exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from American Medical Technologists.",
      },
    ],
    keywords: ["rma practice test", "amt rma practice test", "registered medical assistant practice test", "amt rma practice exam"],
  },
  "ascp-mlt-readiness-check": {
    practiceTestName: "ASCP MLT Practice Test",
    whatIsExam:
      "The ASCP Board of Certification Medical Laboratory Technician exam, MLT(ASCP), is a 100-question computer-adaptive sitting (2 hours 30 minutes) with a scaled passing score of 400. It covers blood bank, chemistry, hematology, microbiology, urinalysis, immunology, and laboratory operations.",
    administeredBy: "ASCP Board of Certification",
    officialFormat:
      "Official MLT(ASCP): 100 CAT multiple-choice questions / 2 hours 30 minutes / scaled 400 (100–999). This UniPrep check is 60 questions / 75 minutes / 70% diagnostic (linear, not CAT). California-only MLT licensure is 80 questions / 2 hours. Not MLS.",
    whoFor:
      "MLT students and working technicians sitting national MLT(ASCP) — not MLS candidates and not phlebotomy-only PBT.",
    howToPrepare:
      "Run this free 60-question timed check for a topic report, then repair missed benches with the planned 60-card Anki waitlist and the official BOC content guideline. Add a full-length CAT-style bank before exam day.",
    examFaqs: [
      {
        question: "How many questions are on the ASCP MLT exam?",
        answer:
          "National MLT(ASCP) is 100 computer-adaptive questions in 2 hours 30 minutes. Pass is a scaled 400 (not a published percent). UniPrep’s free check is 60 questions / 75 minutes.",
      },
      {
        question: "Is this an official ASCP MLT exam?",
        answer:
          "No. This UniPrep2Go readiness check is independent practice — not official exam material from the ASCP Board of Certification. The matching Anki deck is planned (waitlist).",
      },
      {
        question: "Is MLT the same as MLS?",
        answer:
          "No. MLT is the technician credential. MLS(ASCP) is a separate scientist exam with different eligibility and a different content guideline.",
      },
    ],
    keywords: ["mlt practice test", "ascp mlt practice test", "medical lab technician practice test", "ascp mlt practice exam", "mlt ascp mock exam"],
  },
  "aapc-ccs-readiness-check": {
    practiceTestName: "AAPC / AHIMA CCS-style Coding Practice Test",
    whatIsExam: "Inpatient coding certifications (e.g., AHIMA CCS themes) test hospital coding knowledge including ICD-10-CM/PCS guidelines and compliance\u2014not a substitute for official board exams.",
    administeredBy: "AHIMA / inpatient coding themes",
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with AHIMA / inpatient coding themes.",
    examFaqs: [
      {
        question: "What is the AAPC / AHIMA CCS-style Coding exam?",
        answer: "Inpatient coding certifications (e.g., AHIMA CCS themes) test hospital coding knowledge including ICD-10-CM/PCS guidelines and compliance\u2014not a substitute for official board exams.",
      },
      {
        question: "Is this an official AAPC / AHIMA CCS-style Coding exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from AHIMA / inpatient coding themes.",
      },
    ],
    keywords: ["ccs practice test", "inpatient coding practice test", "ahima ccs practice test", "aapc / ahima ccs-style coding practice exam"],
  },
  "medical-scribe-readiness-check": {
    practiceTestName: "Medical Scribe Practice Test",
    whatIsExam:
      "Medical scribe competency checks cover clinical documentation (SOAP, HPI, ROS, scribe scope), medical terminology and chart abbreviations, EHR workflow (problem list, allergies, medication reconciliation, templates), and HIPAA privacy. There is no single national scribe licence — employers, training programs, and certifying bodies such as AHDPG (MSCE \u2192 AMSP/CMSP) and ACMSS each run their own path. This is a documentation and privacy exam, not a clinical-skills exam: scribes do not diagnose, treat, or perform procedures.",
    administeredBy: "Employer / training-program scribe competencies (AHDPG MSCE, ACMSS-style paths)",
    officialFormat:
      "Credentials vary. A common path, AHDPG\u2019s Medical Scribe Certification Exam (MSCE), is listed as ~100 questions / 75 minutes / 80% to pass / ~$185, leading to AMSP; CMSP additionally requires 200+ documented scribe hours \u2014 verify current rules with the certifying body. UniPrep\u2019s free check is a shorter 60-question / 75-minute / 70% diagnostic \u2014 not an official MSCE form and not an NHA CCMA or CMA (AAMA) clinical-assistant exam.",
    examFaqs: [
      {
        question: "What is on a medical scribe certification exam?",
        answer:
          "Documentation structure (SOAP, HPI elements, ROS, note integrity and scribe scope), medical terminology and clinical abbreviations, EHR workflow (problem list, allergy and medication entry, medication reconciliation, templates), and HIPAA privacy and compliance. Clinical hands-on skills are not in scope.",
      },
      {
        question: "How many questions is the MSCE and what is the pass score?",
        answer:
          "AHDPG lists its Medical Scribe Certification Exam (MSCE) as roughly 100 questions in 75 minutes with an 80% pass requirement (~$185), leading to the AMSP designation; CMSP adds a 200+ scribe-hour requirement. Confirm the current format with the certifying body before you register.",
      },
      {
        question: "Is this an official Medical Scribe certification exam?",
        answer:
          "No. This UniPrep2Go readiness check is an independent 60-question / 75-minute / 70% diagnostic with topic scoring — your first mock is free, with no signup. It is not AHDPG, ACMSS, or employer exam material, and it is not a full-length MSCE form.",
      },
      {
        question: "Is a medical scribe exam the same as CCMA or CMA?",
        answer:
          "No. NHA CCMA and CMA (AAMA) are clinical medical assistant credentials covering injections, phlebotomy, EKG, and other hands-on skills. Scribe competency exams test documentation, terminology, EHR workflow, and privacy \u2014 a scribe documents under the provider\u2019s direction and never diagnoses or authenticates a note alone.",
      },
      {
        question: "Do I need certification to work as a medical scribe?",
        answer:
          "Often not. Many employers hire and train scribes directly, while others prefer or require a certificate such as AHDPG AMSP/CMSP or an ACMSS-style credential. Check the specific job posting \u2014 this check is a readiness diagnostic for either route.",
      },
    ],
    keywords: [
      "medical scribe practice test",
      "medical scribe practice test free",
      "scribe certification practice test",
      "msce practice test",
      "medical scribe exam questions",
      "medical scribe anki",
    ],
  },
  "nremt-aemt-readiness-check": {
    practiceTestName: "NREMT AEMT Practice Test",
    whatIsExam: "The NREMT Advanced EMT cognitive exam certifies AEMTs with a scope between EMT and paramedic, including limited advanced airway and pharmacology.",
    administeredBy: "NREMT",
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with NREMT.",
    examFaqs: [
      {
        question: "What is the NREMT AEMT exam?",
        answer: "The NREMT Advanced EMT cognitive exam certifies AEMTs with a scope between EMT and paramedic, including limited advanced airway and pharmacology.",
      },
      {
        question: "Is this an official NREMT AEMT exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from NREMT.",
      },
    ],
    keywords: ["aemt practice test", "nremt aemt practice test", "advanced emt practice test", "nremt aemt practice exam"],
  },
  "physical-therapy-aide-readiness-check": {
    practiceTestName: "Physical Therapy Aide Practice Test",
    whatIsExam: "Physical therapy aide assessments cover assisting licensed PTs/PTAs with prep, transfers, and clinic safety\u2014scope is limited and state/employer-defined.",
    administeredBy: "Employer / state PT aide rules",
    officialFormat:
      "No national published Q-count or clock. UniPrep2Go session is a free 60-question / 75-minute knowledge diagnostic for aide-scope safety — not NPTE and not PTA.",
    examFaqs: [
      {
        question: "Is there a national Physical Therapy Aide exam?",
        answer:
          "No. Hiring and competency are employer- and state-specific. UniPrep’s free check is a 60-question / 75-minute knowledge diagnostic. Aides work under a PT or PTA and do not independently evaluate or progress a plan of care.",
      },
      {
        question: "Is this the NPTE or PTA exam?",
        answer:
          "No. The NPTE is for PT and PTA licensure. This check is aide-scope only. The matching Anki deck is planned, not a live product.",
      },
      {
        question: "Is this an official Physical Therapy Aide exam?",
        answer:
          "No. This UniPrep2Go readiness check is independent practice — not a license exam and not FSBPT material.",
      },
    ],
    keywords: ["pt aide practice test", "physical therapy aide practice test", "physical therapy aide practice exam"],
  },
  "aspt-phlebotomy-readiness-check": {
    practiceTestName: "ASPT Phlebotomy Practice Test",
    whatIsExam:
      "ASPT (American Society of Phlebotomy Technicians) certifies phlebotomy technicians on blood collection, tube handling, safety, and specimen processing. It is not NHA CPT and not ASCP PBT.",
    administeredBy: "ASPT",
    officialFormat:
      "Verify the current official item count, time, and pass rule at aspt.org. Third-party sites disagree (some say 100Q, others 150Q) — UniPrep does not invent those numbers. This page is a 60-question / 75-minute independent diagnostic.",
    examFaqs: [
      {
        question: "What is the ASPT Phlebotomy exam?",
        answer:
          "ASPT phlebotomy certification covers venipuncture, order of draw, safety, and specimen processing. Confirm the current official outline at aspt.org.",
      },
      {
        question: "Is ASPT the same as NHA CPT or ASCP PBT?",
        answer:
          "No. NHA CPT and ASCP PBT are different certifiers. ASCP PBT is a computer-adaptive exam (about 80 items / 2 hours). Pick the mock that matches the body you registered with.",
      },
      {
        question: "Is this an official ASPT Phlebotomy exam?",
        answer:
          "No. This UniPrep2Go readiness check is independent practice — not official exam material from ASPT. The matching Anki deck is planned, not a live product.",
      },
    ],
    keywords: ["aspt practice test", "phlebotomy technician practice test", "aspt phlebotomy practice exam"],
  },
  "abo-optician-readiness-check": {
    practiceTestName: "ABO Optician Practice Test",
    whatIsExam:
      "The ABO-NCLE National Opticianry Competency Exam (NOCE / ABO Basic) certifies spectacle-dispensing opticians on ophthalmic optics, lenses, fitting/dispensing, instruments, and related regulations — separate from the NCLE contact-lens exam.",
    administeredBy: "ABO-NCLE",
    officialFormat:
      "Official NOCE: typically 125 multiple-choice items in 2 hours (about 100 scored + pretest). Pass is criterion-referenced (Modified Angoff); ABO-NCLE does not publish a percent cut — verify the Basic Exam Handbook at abo-ncle.org. This UniPrep2Go session is a free 60-question / 75-minute diagnostic.",
    examFaqs: [
      {
        question: "What is the ABO Optician (NOCE) exam?",
        answer:
          "The ABO-NCLE NOCE (ABO Basic) is the national spectacle opticianry competency exam covering optics, lenses, fitting, instruments, and regulations. NCLE contact lenses are a separate exam.",
      },
      {
        question: "How many questions are on the official ABO NOCE?",
        answer:
          "Typically 125 multiple-choice questions in 2 hours, with about 100 scored. UniPrep’s free check is a shorter 60-question / 75-minute diagnostic.",
      },
      {
        question: "Is this an official ABO Optician exam?",
        answer:
          "No. This UniPrep2Go readiness check is independent practice — not official ABO-NCLE exam material.",
      },
    ],
    keywords: [
      "abo practice test",
      "optician exam practice test",
      "abo-ncle practice test",
      "abo optician practice exam",
      "NOCE practice test",
    ],
  },
  "acsm-cpt-readiness-check": {
    practiceTestName: "ACSM CPT Practice Test",
    whatIsExam:
      "The ACSM Certified Personal Trainer (ACSM-CPT) exam is an NCCA-accredited credential covering initial client consultation and assessment (~25%), exercise programming and implementation (~43%), exercise leadership and client education (~22%), and legal/professional responsibilities (~10%).",
    administeredBy: "American College of Sports Medicine (ACSM)",
    officialFormat:
      "Official ACSM-CPT: 135 multiple-choice items (120 scored + 15 unidentified pretest), 150 minutes seat time, scaled passing score 550 on a 200–800 scale (verify Candidate Handbook / FAQs at acsm.org). This UniPrep2Go session is a free 60-question timed diagnostic — shorter than the live form.",
    examFaqs: [
      {
        question: "What is the ACSM CPT exam?",
        answer:
          "The ACSM Certified Personal Trainer exam is an NCCA-accredited CPT credential covering assessment, programming, leadership/education, and professional responsibilities.",
      },
      {
        question: "How many questions are on the official ACSM-CPT exam?",
        answer:
          "135 items (120 scored + 15 pretest) in 150 minutes, with a scaled pass of 550 (200–800). Verify current details in the ACSM Candidate Handbook.",
      },
      {
        question: "Is this an official ACSM CPT exam?",
        answer:
          "No. This UniPrep2Go readiness check is independent practice — not official exam material from ACSM.",
      },
    ],
    keywords: ["acsm cpt practice test", "acsm personal trainer practice test", "acsm cpt practice exam"],
  },
  "nsca-cpt-readiness-check": {
    practiceTestName: "NSCA-CPT Practice Test",
    whatIsExam: "The NSCA-CPT certifies personal trainers through the National Strength and Conditioning Association with emphasis on safe program design.",
    administeredBy: "NSCA",
    officialFormat:
      "Official NSCA-CPT is 155 questions (140 scored + 15 pretest) in 3 hours with a scaled pass of 70, including 25–35 video/image items. Domain weights: consultation/assessment 23%, program planning 29%, program execution 36%, safety/legal 12%. This UniPrep2Go session is a free 60-question / 75-minute text-only diagnostic — shorter than the official sitting and without video items.",
    examFaqs: [
      {
        question: "How many questions are on the NSCA-CPT exam?",
        answer:
          "155 questions (140 scored + 15 pretest) in 3 hours, including 25–35 video/image items. Scaled pass is 70. UniPrep’s free check is 60 questions / 75 minutes with no video items.",
      },
      {
        question: "Is NSCA-CPT the same as CSCS?",
        answer:
          "No. CSCS is NSCA’s two-section strength-and-conditioning specialist exam. NSCA-CPT is the personal-trainer credential. NASM, ACE, and ACSM CPT exams are separate certifiers.",
      },
      {
        question: "Is this an official NSCA-CPT exam?",
        answer:
          "No. This UniPrep2Go readiness check is independent practice — not official exam material from NSCA. The matching Anki deck is planned, not a live product.",
      },
    ],
    keywords: ["nsca-cpt practice test", "nsca personal trainer practice test", "nsca-cpt practice exam"],
  },
  "precision-nutrition-l1-readiness-check": {
    practiceTestName: "Precision Nutrition L1 Practice Test",
    whatIsExam: "Precision Nutrition Level 1 is a nutrition coaching certification focused on behavior change and nutrition fundamentals for coaches (not an RDN credential).",
    administeredBy: "Precision Nutrition",
    officialFormat:
      "PN L1 is a Precision Nutrition coaching certification exam (not RDN, not CPT). There is no ETS-style published national Q-count used on this page. This UniPrep2Go session is a free 60-question / 75-minute coaching diagnostic.",
    examFaqs: [
      {
        question: "Is Precision Nutrition Level 1 the same as becoming an RDN?",
        answer:
          "No. RDN is a dietetics credential. PN L1 is coaching. UniPrep’s free check is 60 questions / 75 minutes.",
      },
      {
        question: "Is this a personal-trainer CPT exam?",
        answer:
          "No. NSCA-CPT, NASM, ACE, and ACSM CPT exams are separate. This check is PN L1 coaching scope.",
      },
      {
        question: "Is this an official Precision Nutrition L1 exam?",
        answer:
          "No. This UniPrep2Go readiness check is independent practice — not official exam material from Precision Nutrition. The matching Anki deck is planned.",
      },
    ],
    keywords: ["precision nutrition practice test", "pn level 1 practice test", "precision nutrition l1 practice exam"],
  },
  "cscs-nsca-readiness-check": {
    practiceTestName: "NSCA CSCS Practice Test",
    whatIsExam:
      "The NSCA Certified Strength and Conditioning Specialist (CSCS) credential is for professionals who design training programs for athletes. It is not a personal-trainer CPT (NASM, ACE, ACSM, or NSCA-CPT). Candidates typically need a bachelor’s degree and current CPR/AED, then must pass both CSCS exam sections.",
    administeredBy: "National Strength and Conditioning Association (NSCA)",
    officialFormat:
      "Official CSCS is two separately scored computer-based sections (verify the current handbook at nsca.com): Scientific Foundations — 80 scored + 15 pretest items in 1.5 hours (exercise science ~60%, sport psychology ~25%, nutrition ~15%); Practical/Applied — 110 scored + 15 pretest items in 2.5 hours (program design ~40%, exercise technique ~25%, program implementation ~20%, organization & administration ~15%), including 30–40 video/image items. Scaled pass is 70 or higher on each section. This UniPrep2Go session is a free 60-question / 75-minute text-only diagnostic — shorter than either official paper and without video items.",
    examFaqs: [
      {
        question: "What is the NSCA CSCS exam?",
        answer:
          "CSCS is NSCA’s strength-and-conditioning specialist exam for people who program training for athletes. It is two separately scored papers (Scientific Foundations and Practical/Applied). It is not NASM, ACE, ACSM, or NSCA-CPT personal-trainer certification.",
      },
      {
        question: "How many questions are on the official CSCS exam?",
        answer:
          "Two sections: Scientific Foundations has 95 items (80 scored + 15 pretest) in 1.5 hours; Practical/Applied has 125 items (110 scored + 15 pretest) in 2.5 hours. You must pass both (scaled score 70+ each). Verify at nsca.com before scheduling.",
      },
      {
        question: "Is CSCS the same as a personal trainer CPT exam?",
        answer:
          "No. CSCS is a strength-and-conditioning specialist credential. NASM-CPT, ACE CPT, ACSM-CPT, and NSCA-CPT are separate personal-trainer exams with different outlines. Use the mock that matches the certifier you registered with.",
      },
      {
        question: "Is this an official NSCA CSCS exam?",
        answer:
          "No. This UniPrep2Go readiness check is independent practice — not official exam material from NSCA. It is shorter than either official section and has no video items. The matching Anki deck is planned, not a live product.",
      },
    ],
    keywords: ["cscs practice test", "nsca cscs practice test", "strength coach practice test", "nsca cscs practice exam"],
  },
  "nail-technician-state-readiness-check": {
    practiceTestName: "Nail Technician Practice Test",
    whatIsExam: "State nail technician / manicurist written exams cover infection control, nail anatomy, and service procedures required for licensure (practical often separate).",
    administeredBy: "State cosmetology boards",
    officialFormat:
      "Official NIC National Nail Technology Theory is 110 items (100 scored) in 90 minutes. The practical/skills exam is separate. Passing scores are set by the state board (often scaled 75). This UniPrep2Go session is a free 60-question / 75-minute theory diagnostic — shorter than official theory and not Cosmetology or Barber Theory.",
    examFaqs: [
      {
        question: "How many questions are on the nail technician written exam?",
        answer:
          "Where a state uses NIC Nail Technology Theory, the written exam is 110 items (100 scored) in 90 minutes. UniPrep’s free check is 60 questions / 75 minutes. Confirm your state CIB. Practical is separate.",
      },
      {
        question: "Is nail technician theory the same as Cosmetology Theory?",
        answer:
          "No. NIC Cosmetology Theory is a different 110-item form. NIC Barber Theory is a 60-item form. Use the mock that matches the license you registered for.",
      },
      {
        question: "Is this an official Nail Technician exam?",
        answer:
          "No. This UniPrep2Go readiness check is independent practice — not NIC or state-board material. The matching Anki deck is planned, not a live product.",
      },
    ],
    keywords: ["nail tech exam practice test", "manicurist license practice test", "nail technician practice exam"],
  },
  "barber-state-readiness-check": {
    practiceTestName: "Barber Practice Test",
    whatIsExam:
      "Many states use NIC National Barber Theory for the written barber license: 60 items (50 scored) in 90 minutes covering scientific concepts, hair care/shaving, and related services. The practical/skills exam is separate. Passing scores are set by the state board (often scaled 75).",
    administeredBy: "State barber boards (often NIC theory + practical)",
    officialFormat:
      "Official NIC Barber theory: 60 items (50 scored) / 90 minutes. UniPrep mock: 60 questions / 75 minutes / 70% diagnostic, theory only. Some states (including California) use a different written form — read your CIB.",
    whoFor:
      "Barber students sitting a NIC-style written exam — not cosmetology theory (typically 110 items) and not the practical.",
    howToPrepare:
      "Run this free 60-question timed check, then repair infection-control, cutting/shaving, chemistry, and law misses. Add your state law packet and a practical kit drill before exam day.",
    examFaqs: [
      {
        question: "How many questions are on the NIC Barber theory exam?",
        answer:
          "Current NIC National Barber Theory: 60 items of which 50 are scored, 90 minutes. UniPrep’s free check is 60 questions / 75 minutes. Confirm your state CIB.",
      },
      {
        question: "Is this an official Barber exam?",
        answer:
          "No. Independent UniPrep2Go theory practice — not NIC or state-board material. Matching Anki is planned. Practical exam is separate.",
      },
    ],
    keywords: ["barber exam practice test", "barber license practice test", "nic barber theory practice", "barber practice exam"],
  },
  "aswb-bachelors-readiness-check": {
    practiceTestName: "ASWB Bachelors Practice Test",
    whatIsExam:
      "The ASWB Bachelors exam is the BSW-level social work licensing test used for titles such as LSW/LBSW in many jurisdictions. From 3 August 2026 it is 122 questions (110 scored + 12 pretest) in 4 hours on three content areas.",
    administeredBy: "Association of Social Work Boards (ASWB)",
    officialFormat:
      "Official from 3 August 2026: 122 questions / 4 hours / form-equated pass (generally about 66–78 of 110 scored). UniPrep mock: 60 questions / 75 minutes / 70% diagnostic. Not Masters and not Clinical/LCSW.",
    whoFor:
      "BSW graduates sitting LSW/LBSW-style licensure — not LCSW Clinical candidates.",
    howToPrepare:
      "Run this free timed generalist check, then repair HBSE, assessment, intervention, and ethics misses. Use the free ASWB Examination Guidebook and, if registered, ASWB’s paid official practice test for 4-hour stamina.",
    examFaqs: [
      {
        question: "How many questions are on the ASWB Bachelors exam?",
        answer:
          "From 3 August 2026: 122 questions (110 scored + 12 pretest) in 4 hours. UniPrep’s free check is 60 questions / 75 minutes.",
      },
      {
        question: "Is this an official ASWB Bachelors exam?",
        answer:
          "No. Independent UniPrep2Go practice — not ASWB material. Matching Anki is planned (waitlist).",
      },
      {
        question: "Is ASWB Bachelors the same as Clinical / LCSW?",
        answer:
          "No. Bachelors is BSW generalist. Clinical is the LCSW exam. Sit the category your board assigned.",
      },
    ],
    keywords: ["aswb bachelors practice test", "lsw exam practice test", "lbsw practice test", "aswb bachelors practice exam"],
  },
  "aswb-clinical-readiness-check": {
    practiceTestName: "ASWB Clinical Practice Test",
    whatIsExam:
      "The ASWB Clinical exam is the LCSW (or equivalent) licensing test. From 3 August 2026 it is 122 questions (110 scored + 12 pretest) in 4 hours on three content areas, with more application items.",
    administeredBy: "Association of Social Work Boards (ASWB)",
    officialFormat:
      "Official from 3 August 2026: 122 questions / 4 hours / form-equated pass (generally about 66–78 of 110 scored). UniPrep mock: 60 questions / 75 minutes / 70% diagnostic on clinical assessment, diagnosis concepts, psychotherapy, and ethics. Not Bachelors/LSW.",
    whoFor:
      "MSW graduates with required clinical hours sitting LCSW — not Bachelors/LSW candidates.",
    howToPrepare:
      "Run this free timed LCSW-level check, then repair weak domains. Pair with DSM-5-TR judgment, EBP matching, and the ASWB Guidebook. Official ASWB practice test is paid and for registered candidates.",
    examFaqs: [
      {
        question: "How many questions are on the ASWB Clinical exam?",
        answer:
          "From 3 August 2026: 122 questions (110 scored + 12 pretest) in 4 hours. UniPrep’s free check is 60 questions / 75 minutes.",
      },
      {
        question: "Is this an official ASWB Clinical exam?",
        answer:
          "No. Independent UniPrep2Go practice — not ASWB material. Matching Anki is planned (waitlist).",
      },
      {
        question: "Is ASWB Clinical the same as Bachelors / LSW?",
        answer:
          "No. Clinical is LCSW-level. Bachelors is BSW generalist. Do not mix banks or sit the wrong category.",
      },
    ],
    keywords: ["aswb clinical practice test", "lcsw exam practice test", "aswb clinical practice exam"],
  },
  "shrm-cp-readiness-check": {
    practiceTestName: "SHRM-CP Practice Test",
    whatIsExam: "The SHRM Certified Professional (SHRM-CP) exam certifies HR professionals on people, organization, and workplace knowledge with behavioral competencies.",
    administeredBy: "SHRM",
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with SHRM.",
    examFaqs: [
      {
        question: "What is the SHRM-CP exam?",
        answer: "The SHRM Certified Professional (SHRM-CP) exam certifies HR professionals on people, organization, and workplace knowledge with behavioral competencies.",
      },
      {
        question: "Is this an official SHRM-CP exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from SHRM.",
      },
    ],
    keywords: ["shrm-cp practice test", "shrm certified professional practice test", "shrm-cp practice exam"],
  },
  "phr-hrci-readiness-check": {
    practiceTestName: "PHR Practice Test",
    whatIsExam: "The HRCI Professional in Human Resources (PHR) exam certifies operational HR knowledge including talent, employee relations, and compliance.",
    administeredBy: "HRCI",
    officialFormat:
      "Official HRCI PHR is 90 scored + 25 pretest questions in 2 hours (plus about 30 minutes administration) with a scaled pass of 500 (100–700). This UniPrep2Go session is a free 60-question / 75-minute operational-HR diagnostic — not SPHR and not SHRM-CP.",
    examFaqs: [
      {
        question: "How many questions are on the PHR exam?",
        answer:
          "90 scored + 25 pretest in 2 hours, scaled pass 500. UniPrep’s free check is 60 questions / 75 minutes.",
      },
      {
        question: "Is PHR the same as SHRM-CP or SPHR?",
        answer:
          "No. PHR is HRCI’s operational HR exam. SPHR is a different HRCI exam. SHRM-CP is SHRM. Use the mock that matches the body you registered with.",
      },
      {
        question: "Is this an official PHR exam?",
        answer:
          "No. This UniPrep2Go readiness check is independent practice — not official exam material from HRCI. The matching Anki deck is planned, not a live product.",
      },
    ],
    keywords: ["phr practice test", "hrci phr practice test", "phr practice exam"],
  },
  "capm-readiness-check": {
    practiceTestName: "CAPM Practice Test",
    whatIsExam: "The PMI Certified Associate in Project Management (CAPM) exam is an entry project management certification based on PMI frameworks.",
    administeredBy: "PMI",
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with PMI.",
    examFaqs: [
      {
        question: "What is the CAPM exam?",
        answer: "The PMI Certified Associate in Project Management (CAPM) exam is an entry project management certification based on PMI frameworks.",
      },
      {
        question: "Is this an official CAPM exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from PMI.",
      },
    ],
    keywords: ["capm practice test", "pmi capm practice test", "capm practice exam"],
  },
  "six-sigma-green-belt-readiness-check": {
    practiceTestName: "Six Sigma Green Belt Practice Test",
    whatIsExam: "Six Sigma Green Belt exams (ASQ/IASSC-style) test DMAIC problem-solving, basic statistics, and process improvement tools.",
    administeredBy: "ASQ / IASSC-style bodies",
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with ASQ / IASSC-style bodies.",
    examFaqs: [
      {
        question: "What is the Six Sigma Green Belt exam?",
        answer: "Six Sigma Green Belt exams (ASQ/IASSC-style) test DMAIC problem-solving, basic statistics, and process improvement tools.",
      },
      {
        question: "Is this an official Six Sigma Green Belt exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from ASQ / IASSC-style bodies.",
      },
    ],
    keywords: ["six sigma green belt practice test", "cssgb practice test", "six sigma green belt practice exam"],
  },
  "enrolled-agent-readiness-check": {
    practiceTestName: "IRS Enrolled Agent Practice Test",
    whatIsExam: "The IRS Special Enrollment Examination (SEE) qualifies Enrolled Agents to represent taxpayers before the IRS across individuals, businesses, and representation topics. Since March 1, 2026 the exam is developed and delivered by PSI Services, replacing Prometric.",
    administeredBy: "IRS (delivered by PSI Services since March 1, 2026)",
    officialFormat: "Three parts — Individuals; Businesses; Representation, Practices and Procedures — each 100 multiple-choice questions (85 scored, 15 unscored) in 3.5 hours. Scaled score 200–800 with a passing score of 500, which replaced the old 105 on Prometric's 40–130 scale. PSI test centers or online proctoring, $317 per part; the 2026 window runs July 1, 2026 to February 28, 2027. All three parts must be passed within three years.",
    examFaqs: [
      {
        question: "What is the IRS Enrolled Agent exam?",
        answer: "The IRS Special Enrollment Examination (SEE) qualifies Enrolled Agents to represent taxpayers before the IRS across individuals, businesses, and representation topics.",
      },
      {
        question: "Is this an official IRS Enrolled Agent exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from IRS.",
      },
      {
        question: "What is the passing score on the Enrolled Agent exam?",
        answer: "A scaled score of 500 on a 200–800 scale for each part. Passing candidates see only a pass designation; failing candidates see a scaled score between 200 and 500 plus diagnostics. Guides that quote 105 describe the old Prometric scale used before March 2026.",
      },
      {
        question: "Who delivers the Enrolled Agent exam now?",
        answer: "PSI Services, since March 1, 2026 (previously Prometric). You schedule each part through PSI at a test center or by online proctoring; the fee is $317 per part.",
      },
    ],
    keywords: ["enrolled agent practice test", "ea exam practice test", "see practice test", "irs enrolled agent practice exam"],
  },
  "series-65-readiness-check": {
    practiceTestName: "Series 65 Practice Test",
    whatIsExam: "The Series 65 Uniform Investment Adviser Law Exam qualifies candidates as investment adviser representatives in many states.",
    administeredBy: "NASAA / FINRA delivery",
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with NASAA / FINRA delivery.",
    examFaqs: [
      {
        question: "What is the Series 65 exam?",
        answer: "The Series 65 Uniform Investment Adviser Law Exam qualifies candidates as investment adviser representatives in many states.",
      },
      {
        question: "Is this an official Series 65 exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from NASAA / FINRA delivery.",
      },
    ],
    keywords: ["series 65 practice test", "investment adviser exam practice test", "series 65 practice exam"],
  },
  "series-66-readiness-check": {
    practiceTestName: "Series 66 Practice Test",
    whatIsExam: "The Series 66 combines state investment adviser and agent law topics; often taken with Series 7 for dual registration pathways.",
    administeredBy: "NASAA / FINRA delivery",
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with NASAA / FINRA delivery.",
    examFaqs: [
      {
        question: "What is the Series 66 exam?",
        answer: "The Series 66 combines state investment adviser and agent law topics; often taken with Series 7 for dual registration pathways.",
      },
      {
        question: "Is this an official Series 66 exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from NASAA / FINRA delivery.",
      },
    ],
    keywords: ["series 66 practice test", "65+63 combo practice test", "series 66 practice exam"],
  },
  "series-6-readiness-check": {
    practiceTestName: "Series 6 Practice Test",
    whatIsExam: "The FINRA Series 6 licenses representatives to sell mutual funds and variable products (limited securities registration).",
    administeredBy: "FINRA",
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with FINRA.",
    examFaqs: [
      {
        question: "What is the Series 6 exam?",
        answer: "The FINRA Series 6 licenses representatives to sell mutual funds and variable products (limited securities registration).",
      },
      {
        question: "Is this an official Series 6 exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from FINRA.",
      },
    ],
    keywords: ["series 6 practice test", "investment company products practice test", "series 6 practice exam"],
  },
  "praxis-core-readiness-check": {
    practiceTestName: "Praxis Core Practice Test",
    whatIsExam: "Praxis Core Academic Skills for Educators tests reading, writing, and math skills often required for entry into teacher preparation programs.",
    administeredBy: "ETS",
    officialFormat:
      "Official Praxis Core is three separate ETS tests: Reading 5713 (56 selected-response / 85 minutes), Writing 5723 (40 selected-response + 2 essays / 100 minutes), Math 5733 (56 selected-response / 90 minutes). This UniPrep2Go session is a free combined 60-question / 75-minute selected-response diagnostic — not three sittings and not constructed-response essays.",
    examFaqs: [
      {
        question: "How many questions are on Praxis Core?",
        answer:
          "Three sittings: Reading 56 / 85 minutes, Writing 40 selected-response plus two essays / 100 minutes, Math 56 / 90 minutes. UniPrep’s free check is 60 selected-response questions in 75 minutes — not those three forms.",
      },
      {
        question: "Is this Praxis Special Education?",
        answer:
          "No. Special Education (often 5355) is a different content exam. This check is Core academic skills. The matching Anki deck is planned.",
      },
      {
        question: "Is this an official Praxis Core exam?",
        answer:
          "No. This UniPrep2Go readiness check is independent practice — not official exam material from ETS.",
      },
    ],
    keywords: ["praxis core practice test", "praxis i practice test", "praxis core practice exam"],
  },
  "parapro-readiness-check": {
    practiceTestName: "ParaPro Practice Test",
    whatIsExam:
      "The ETS ParaPro Assessment (1755) is a 90-question / 150-minute selected-response exam covering reading, writing, and math for instructional paraprofessionals. About two-thirds of items test basic skills and about one-third apply them in classroom contexts. Many districts use a 460 scaled cut — verify locally.",
    administeredBy: "ETS",
    officialFormat:
      "Official: 90 selected-response / 150 minutes. UniPrep2Go free check: 60 questions / 75 minutes with topic scoring — shorter diagnostic, not a full ETS form.",
    examFaqs: [
      {
        question: "What is the ParaPro exam?",
        answer:
          "The ETS ParaPro Assessment (1755) measures reading, writing, and math for instructional paraprofessionals — 90 questions in 150 minutes. Confirm your local passing score (often 460).",
      },
      {
        question: "Is this an official ParaPro exam?",
        answer:
          "No. This UniPrep2Go readiness check is independent practice — not official exam material from ETS. The linked Anki deck is planned, not a live Gumroad product yet.",
      },
    ],
    keywords: [
      "parapro practice test",
      "paraprofessional exam practice test",
      "parapro practice exam",
      "parapro anki",
      "ets parapro assessment 1755",
    ],
  },
  "unarmed-security-officer-readiness-check": {
    practiceTestName: "Unarmed Security Officer Practice Test",
    whatIsExam: "State unarmed security officer exams license guards to work site security. Topics typically include law, observation, emergencies, and ethics; rules vary by state.",
    administeredBy: "State security licensing boards",
    officialFormat:
      "Unarmed security exams are state-specific — no national published Q-count. This UniPrep2Go session is a free 60-question / 75-minute unarmed knowledge diagnostic. Firearm qualification and armed cards are separate.",
    examFaqs: [
      {
        question: "Is there a national unarmed security exam?",
        answer:
          "No. States set hours and written tests. UniPrep’s free check is 60 questions / 75 minutes of unarmed knowledge.",
      },
      {
        question: "Is this the armed guard exam?",
        answer:
          "No. This check is unarmed only. Range qualification is separate. The matching Anki deck is planned.",
      },
      {
        question: "Is this an official Unarmed Security Officer exam?",
        answer:
          "No. This UniPrep2Go readiness check is independent practice — not official exam material from a state board.",
      },
    ],
    keywords: ["security officer exam practice test", "unarmed guard card practice test", "unarmed security officer practice exam"],
  },
  "alcohol-server-readiness-check": {
    practiceTestName: "Alcohol Server Practice Test",
    whatIsExam: "Alcohol server / responsible beverage service exams certify bartenders and servers on ID checks, intoxication signs, and state alcohol service laws.",
    administeredBy: "State alcohol server / TIPS-style programs",
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with State alcohol server / TIPS-style programs.",
    examFaqs: [
      {
        question: "What is the Alcohol Server exam?",
        answer: "Alcohol server / responsible beverage service exams certify bartenders and servers on ID checks, intoxication signs, and state alcohol service laws.",
      },
      {
        question: "Is this an official Alcohol Server exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from State alcohol server / TIPS-style programs.",
      },
    ],
    keywords: ["alcohol server practice test", "tips practice test", "responsible beverage practice test", "alcohol server practice exam"],
  },
  "notary-public-readiness-check": {
    practiceTestName: "Notary Public Practice Test",
    whatIsExam: "State notary public exams (where required) test notarial acts, identification, journals, and prohibited practices for commissioned notaries.",
    administeredBy: "State notary commissioning offices",
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with State notary commissioning offices.",
    examFaqs: [
      {
        question: "What is the Notary Public exam?",
        answer: "State notary public exams (where required) test notarial acts, identification, journals, and prohibited practices for commissioned notaries.",
      },
      {
        question: "Is this an official Notary Public exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from State notary commissioning offices.",
      },
    ],
    keywords: ["notary exam practice test", "notary public practice test", "notary public practice exam"],
  },
  "forklift-operator-readiness-check": {
    practiceTestName: "Forklift Operator Practice Test",
    whatIsExam: "Forklift / powered industrial truck operator evaluations cover OSHA-aligned stability, inspection, and safe operation concepts used in employer certification programs.",
    administeredBy: "OSHA powered industrial trucks themes",
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with OSHA powered industrial trucks themes.",
    examFaqs: [
      {
        question: "What is the Forklift Operator exam?",
        answer: "Forklift / powered industrial truck operator evaluations cover OSHA-aligned stability, inspection, and safe operation concepts used in employer certification programs.",
      },
      {
        question: "Is this an official Forklift Operator exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from OSHA powered industrial trucks themes.",
      },
    ],
    keywords: ["forklift certification practice test", "pit operator practice test", "forklift operator practice exam"],
  },
  "osha-10-general-readiness-check": {
    practiceTestName: "OSHA 10 General Industry Practice Test",
    whatIsExam: "OSHA 10-hour General Industry outreach training covers hazard recognition for entry-level workers. This readiness check is cognitive practice, not an OSHA Outreach card.",
    administeredBy: "OSHA Outreach / general industry themes",
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with OSHA Outreach / general industry themes.",
    examFaqs: [
      {
        question: "What is the OSHA 10 General Industry exam?",
        answer: "OSHA 10-hour General Industry outreach training covers hazard recognition for entry-level workers. This readiness check is cognitive practice, not an OSHA Outreach card.",
      },
      {
        question: "Is this an official OSHA 10 General Industry exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from OSHA Outreach / general industry themes.",
      },
    ],
    keywords: ["osha 10 practice test", "osha 10 general industry practice test", "osha 10 general industry practice exam"],
  },
  "nate-core-readiness-check": {
    practiceTestName: "NATE Core Practice Test",
    whatIsExam: "NATE Core is the foundational HVAC/R knowledge exam often taken with specialty NATE exams for technician certification.",
    administeredBy: "NATE",
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with NATE.",
    examFaqs: [
      {
        question: "What is the NATE Core exam?",
        answer: "NATE Core is the foundational HVAC/R knowledge exam often taken with specialty NATE exams for technician certification.",
      },
      {
        question: "Is this an official NATE Core exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from NATE.",
      },
    ],
    keywords: ["nate core practice test", "hvac nate practice test", "nate core practice exam"],
  },
  "servsafe-food-handler-readiness-check": {
    practiceTestName: "ServSafe Food Handler Practice Test",
    whatIsExam: "ServSafe Food Handler is an entry food safety assessment for food workers covering contamination, personal hygiene, time/temperature control, and cleaning and sanitizing (distinct from ServSafe Manager).",
    administeredBy: "National Restaurant Association",
    officialFormat: "40-question multiple-choice assessment, non-proctored, with no time limit (most examinees finish within about 40 minutes); 75% (30 of 40) to pass, though some jurisdictions set a different score. Verify current rules at ServSafe.com.",
    examFaqs: [
      {
        question: "What is the ServSafe Food Handler exam?",
        answer: "ServSafe Food Handler is an entry food safety assessment for food workers covering contamination, personal hygiene, time/temperature control, and cleaning and sanitizing (distinct from ServSafe Manager).",
      },
      {
        question: "How many questions are on the ServSafe Food Handler assessment, and what score passes?",
        answer: "The official assessment has 40 multiple-choice questions, no time limit, and a 75% passing score (30 of 40); some jurisdictions set a different score. This UniPrep2Go check uses 60 questions with a 75-minute pacing timer and the same 75% target, so a pass here means you cleared the real bar with margin.",
      },
      {
        question: "Is this an official ServSafe Food Handler exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from National Restaurant Association.",
      },
    ],
    keywords: ["servsafe food handler practice test", "food handler card practice test", "servsafe food handler practice exam"],
  },
  "first-aid-cpr-readiness-check": {
    practiceTestName: "First Aid / CPR Cognitive Practice Test",
    whatIsExam: "First aid/CPR cognitive checks cover adult CPR/AED and common first aid emergencies. Skills cards still require in-person skills testing from an authorized provider.",
    administeredBy: "AHA / Red Cross-style first aid themes",
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with AHA / Red Cross-style first aid themes.",
    examFaqs: [
      {
        question: "What is the First Aid / CPR Cognitive exam?",
        answer: "First aid/CPR cognitive checks cover adult CPR/AED and common first aid emergencies. Skills cards still require in-person skills testing from an authorized provider.",
      },
      {
        question: "Is this an official First Aid / CPR Cognitive exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from AHA / Red Cross-style first aid themes.",
      },
    ],
    keywords: ["first aid practice test practice test", "cpr first aid practice test", "first aid / cpr cognitive practice exam"],
  },
  "mortgage-loan-originator-readiness-check": {
    practiceTestName: "SAFE MLO Practice Test",
    whatIsExam:
      "The SAFE Mortgage Loan Originator National Test with Uniform State Test content licenses residential MLOs through NMLS (plus any separate state component your state still requires).",
    administeredBy: "NMLS / CSBS (SAFE MLO)",
    officialFormat:
      "Official national test: 120 items (115 scored + 5 pretest) / 190 minutes / 75% pass (SAFE Act). Verify the NMLS MLO Testing Handbook. This UniPrep2Go session is a free 120-question / 120-minute / 70% readiness diagnostic — same item count, shorter clock, diagnostic cut.",
    examFaqs: [
      {
        question: "What is the SAFE MLO exam?",
        answer:
          "The SAFE MLO National Test with UST content is the NMLS national exam for residential mortgage loan originators. Some states still require additional state testing — confirm in NMLS.",
      },
      {
        question: "How many questions are on the official SAFE MLO national test?",
        answer:
          "120 items (115 scored + 5 unscored pretest) in 190 minutes, with a 75% passing score. UniPrep’s free check is 120 questions in 120 minutes with a 70% readiness target.",
      },
      {
        question: "Is this an official SAFE MLO exam?",
        answer:
          "No. This UniPrep2Go readiness check is independent practice — not official NMLS exam material.",
      },
    ],
    keywords: [
      "safe mlo practice test",
      "nmls exam practice test",
      "mortgage loan originator practice test",
      "safe mlo practice exam",
      "NMLS practice test",
    ],
  },
  "wastewater-operator-1-readiness-check": {
    practiceTestName: "Wastewater Operator Level 1 Practice Test",
    whatIsExam: "State wastewater operator certification exams (Level 1/entry) test treatment process knowledge, safety, sampling, and regulatory basics for plant operators.",
    administeredBy: "State wastewater operator boards",
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with State wastewater operator boards.",
    examFaqs: [
      {
        question: "What is the Wastewater Operator Level 1 exam?",
        answer: "State wastewater operator certification exams (Level 1/entry) test treatment process knowledge, safety, sampling, and regulatory basics for plant operators.",
      },
      {
        question: "Is this an official Wastewater Operator Level 1 exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from State wastewater operator boards.",
      },
    ],
    keywords: ["wastewater operator practice test", "ww operator exam practice test", "wastewater operator level 1 practice exam"],
  },
  "real-estate-appraiser-readiness-check": {
    practiceTestName: "Real Estate Appraiser Practice Test",
    whatIsExam: "Trainee/licensed appraiser exams (AQB national themes) cover USPAP concepts, valuation approaches, and appraisal reporting for state credentialing.",
    administeredBy: "AQB / state appraiser boards",
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with AQB / state appraiser boards.",
    examFaqs: [
      {
        question: "What is the Real Estate Appraiser exam?",
        answer: "Trainee/licensed appraiser exams (AQB national themes) cover USPAP concepts, valuation approaches, and appraisal reporting for state credentialing.",
      },
      {
        question: "Is this an official Real Estate Appraiser exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from AQB / state appraiser boards.",
      },
    ],
    keywords: ["appraiser exam practice test", "aqb national practice test", "real estate appraiser practice exam"],
  },
  "funeral-service-arts-readiness-check": {
    practiceTestName: "Funeral Service Arts Practice Test",
    whatIsExam: "The National Board Exam Arts section (The Conference) is part of funeral director/embalmer credentialing pathways in many states.",
    administeredBy: "The Conference (NBE)",
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with The Conference (NBE).",
    examFaqs: [
      {
        question: "What is the Funeral Service Arts exam?",
        answer: "The National Board Exam Arts section (The Conference) is part of funeral director/embalmer credentialing pathways in many states.",
      },
      {
        question: "Is this an official Funeral Service Arts exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from The Conference (NBE).",
      },
    ],
    keywords: ["nbe arts practice test", "funeral director exam practice test", "funeral service arts practice exam"],
  },
  "nabcep-associate-readiness-check": {
    practiceTestName: "NABCEP Associate Practice Test",
    whatIsExam: "The NABCEP PV Associate exam is an entry solar credential covering photovoltaic fundamentals, safety, and system applications.",
    administeredBy: "NABCEP",
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with NABCEP.",
    examFaqs: [
      {
        question: "What is the NABCEP Associate exam?",
        answer: "The NABCEP PV Associate exam is an entry solar credential covering photovoltaic fundamentals, safety, and system applications.",
      },
      {
        question: "Is this an official NABCEP Associate exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from NABCEP.",
      },
    ],
    keywords: ["nabcep associate practice test", "pv associate practice test", "nabcep associate practice exam"],
  },
  "veterinary-assistant-readiness-check": {
    practiceTestName: "Veterinary Assistant Practice Test",
    whatIsExam:
      "The NAVTA Approved Veterinary Assistant (AVA) designation is for graduates of a NAVTA-approved veterinary assistant program who pass the proprietary AVA exam administered through VetMedTeam. It covers restraint, nursing support, hospital procedures, pharmacy/office themes, and safety — under veterinary supervision. It is not the VTNE (veterinary technician national exam).",
    administeredBy: "NAVTA (exam platform: VetMedTeam)",
    officialFormat:
      "Official AVA exam (VetMedTeam): typically 100 multiple-choice questions / 150 minutes / 75% pass / $100 per attempt; requires a NAVTA-approved program code and an exam mentor/proctor. UniPrep’s free check is a shorter 60Q / 75 min diagnostic — not a full-length AVA form.",
    examFaqs: [
      {
        question: "What is the Veterinary Assistant / AVA exam?",
        answer:
          "NAVTA’s Approved Veterinary Assistant (AVA) exam certifies graduates of NAVTA-approved VA programs. VetMedTeam administers the exam (typically 100Q / 150 min / 75% / $100). Employer-only assistant competencies may differ — confirm which path your clinic expects.",
      },
      {
        question: "Is AVA the same as the VTNE?",
        answer:
          "No. AVA is the veterinary assistant designation. The VTNE (AAVSB) is the national exam for veterinary technicians / nurses — a different credential and outline.",
      },
      {
        question: "Is this an official Veterinary Assistant exam?",
        answer:
          "No. UniPrep2Go provides an independent 60-question / 75-minute diagnostic. The matching Anki deck is planned (waitlist). Not NAVTA or VetMedTeam material.",
      },
      {
        question: "Who can sit the official AVA exam?",
        answer:
          "Graduates of a NAVTA-approved veterinary assistant program with a program code and an approved exam mentor/proctor. Verify current rules at navta.net and VetMedTeam.",
      },
    ],
    keywords: [
      "veterinary assistant practice test",
      "ava practice test",
      "navta ava practice exam",
      "free veterinary assistant practice test",
      "veterinary assistant anki",
    ],
  },
};
