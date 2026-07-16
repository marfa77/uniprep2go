type Wave3Explainer = {
  practiceTestName: string;
  whatIsExam: string;
  administeredBy: string;
  officialFormat?: string;
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
    whatIsExam: "Medication aide / medication assistant exams certify nurse aides authorized to administer certain medications in long-term care under nurse supervision. Rules vary by state.",
    administeredBy: "State nurse aide / medication aide boards",
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with State nurse aide / medication aide boards.",
    examFaqs: [
      {
        question: "What is the Medication Aide exam?",
        answer: "Medication aide / medication assistant exams certify nurse aides authorized to administer certain medications in long-term care under nurse supervision. Rules vary by state.",
      },
      {
        question: "Is this an official Medication Aide exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from State nurse aide / medication aide boards.",
      },
    ],
    keywords: ["medication aide practice test", "cma med aide practice test", "medication aide practice exam"],
  },
  "home-health-aide-readiness-check": {
    practiceTestName: "Home Health Aide Practice Test",
    whatIsExam: "Home health aide competency evaluations verify personal care, safety, and communication skills for aides working in client homes under a care plan.",
    administeredBy: "State / federal HHA training standards",
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with State / federal HHA training standards.",
    examFaqs: [
      {
        question: "What is the Home Health Aide exam?",
        answer: "Home health aide competency evaluations verify personal care, safety, and communication skills for aides working in client homes under a care plan.",
      },
      {
        question: "Is this an official Home Health Aide exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from State / federal HHA training standards.",
      },
    ],
    keywords: ["home health aide practice test", "hha exam practice test", "home health aide practice exam"],
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
    whatIsExam: "The ASCP Medical Laboratory Technician (MLT) exam certifies laboratory technicians across core clinical lab disciplines.",
    administeredBy: "ASCP Board of Certification",
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with ASCP Board of Certification.",
    examFaqs: [
      {
        question: "What is the ASCP MLT exam?",
        answer: "The ASCP Medical Laboratory Technician (MLT) exam certifies laboratory technicians across core clinical lab disciplines.",
      },
      {
        question: "Is this an official ASCP MLT exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from ASCP Board of Certification.",
      },
    ],
    keywords: ["mlt practice test", "ascp mlt practice test", "medical lab technician practice test", "ascp mlt practice exam"],
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
    whatIsExam: "Medical scribe competency checks cover documentation accuracy, medical terminology, EHR workflow, and HIPAA\u2014used by training programs and employers (credentials vary).",
    administeredBy: "Employer / ACMSS-style scribe competencies",
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with Employer / ACMSS-style scribe competencies.",
    examFaqs: [
      {
        question: "What is the Medical Scribe exam?",
        answer: "Medical scribe competency checks cover documentation accuracy, medical terminology, EHR workflow, and HIPAA\u2014used by training programs and employers (credentials vary).",
      },
      {
        question: "Is this an official Medical Scribe exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from Employer / ACMSS-style scribe competencies.",
      },
    ],
    keywords: ["medical scribe practice test", "scribe certification practice test", "medical scribe practice exam"],
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
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with Employer / state PT aide rules.",
    examFaqs: [
      {
        question: "What is the Physical Therapy Aide exam?",
        answer: "Physical therapy aide assessments cover assisting licensed PTs/PTAs with prep, transfers, and clinic safety\u2014scope is limited and state/employer-defined.",
      },
      {
        question: "Is this an official Physical Therapy Aide exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from Employer / state PT aide rules.",
      },
    ],
    keywords: ["pt aide practice test", "physical therapy aide practice test", "physical therapy aide practice exam"],
  },
  "aspt-phlebotomy-readiness-check": {
    practiceTestName: "ASPT Phlebotomy Practice Test",
    whatIsExam: "ASPT phlebotomy certification exams validate blood collection technique, tube handling, safety, and specimen processing for phlebotomy technicians.",
    administeredBy: "ASPT",
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with ASPT.",
    examFaqs: [
      {
        question: "What is the ASPT Phlebotomy exam?",
        answer: "ASPT phlebotomy certification exams validate blood collection technique, tube handling, safety, and specimen processing for phlebotomy technicians.",
      },
      {
        question: "Is this an official ASPT Phlebotomy exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from ASPT.",
      },
    ],
    keywords: ["aspt practice test", "phlebotomy technician practice test", "aspt phlebotomy practice exam"],
  },
  "abo-optician-readiness-check": {
    practiceTestName: "ABO Optician Practice Test",
    whatIsExam: "The ABO basic optician exam certifies knowledge of ophthalmic optics, lenses, fitting, and related regulations for dispensing opticians.",
    administeredBy: "American Board of Opticianry",
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with American Board of Opticianry.",
    examFaqs: [
      {
        question: "What is the ABO Optician exam?",
        answer: "The ABO basic optician exam certifies knowledge of ophthalmic optics, lenses, fitting, and related regulations for dispensing opticians.",
      },
      {
        question: "Is this an official ABO Optician exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from American Board of Opticianry.",
      },
    ],
    keywords: ["abo practice test", "optician exam practice test", "abo-ncle practice test", "abo optician practice exam"],
  },
  "acsm-cpt-readiness-check": {
    practiceTestName: "ACSM CPT Practice Test",
    whatIsExam: "The ACSM Certified Personal Trainer exam is an NCCA-accredited CPT credential covering assessment, programming, and exercise science.",
    administeredBy: "ACSM",
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with ACSM.",
    examFaqs: [
      {
        question: "What is the ACSM CPT exam?",
        answer: "The ACSM Certified Personal Trainer exam is an NCCA-accredited CPT credential covering assessment, programming, and exercise science.",
      },
      {
        question: "Is this an official ACSM CPT exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from ACSM.",
      },
    ],
    keywords: ["acsm cpt practice test", "acsm personal trainer practice test", "acsm cpt practice exam"],
  },
  "nsca-cpt-readiness-check": {
    practiceTestName: "NSCA-CPT Practice Test",
    whatIsExam: "The NSCA-CPT certifies personal trainers through the National Strength and Conditioning Association with emphasis on safe program design.",
    administeredBy: "NSCA",
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with NSCA.",
    examFaqs: [
      {
        question: "What is the NSCA-CPT exam?",
        answer: "The NSCA-CPT certifies personal trainers through the National Strength and Conditioning Association with emphasis on safe program design.",
      },
      {
        question: "Is this an official NSCA-CPT exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from NSCA.",
      },
    ],
    keywords: ["nsca-cpt practice test", "nsca personal trainer practice test", "nsca-cpt practice exam"],
  },
  "precision-nutrition-l1-readiness-check": {
    practiceTestName: "Precision Nutrition L1 Practice Test",
    whatIsExam: "Precision Nutrition Level 1 is a nutrition coaching certification focused on behavior change and nutrition fundamentals for coaches (not an RDN credential).",
    administeredBy: "Precision Nutrition",
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with Precision Nutrition.",
    examFaqs: [
      {
        question: "What is the Precision Nutrition L1 exam?",
        answer: "Precision Nutrition Level 1 is a nutrition coaching certification focused on behavior change and nutrition fundamentals for coaches (not an RDN credential).",
      },
      {
        question: "Is this an official Precision Nutrition L1 exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from Precision Nutrition.",
      },
    ],
    keywords: ["precision nutrition practice test", "pn level 1 practice test", "precision nutrition l1 practice exam"],
  },
  "cscs-nsca-readiness-check": {
    practiceTestName: "NSCA CSCS Practice Test",
    whatIsExam: "The NSCA Certified Strength and Conditioning Specialist (CSCS) exam certifies professionals who design training programs for athletes.",
    administeredBy: "NSCA",
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with NSCA.",
    examFaqs: [
      {
        question: "What is the NSCA CSCS exam?",
        answer: "The NSCA Certified Strength and Conditioning Specialist (CSCS) exam certifies professionals who design training programs for athletes.",
      },
      {
        question: "Is this an official NSCA CSCS exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from NSCA.",
      },
    ],
    keywords: ["cscs practice test", "nsca cscs practice test", "strength coach practice test", "nsca cscs practice exam"],
  },
  "nail-technician-state-readiness-check": {
    practiceTestName: "Nail Technician Practice Test",
    whatIsExam: "State nail technician / manicurist written exams cover infection control, nail anatomy, and service procedures required for licensure (practical often separate).",
    administeredBy: "State cosmetology boards",
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with State cosmetology boards.",
    examFaqs: [
      {
        question: "What is the Nail Technician exam?",
        answer: "State nail technician / manicurist written exams cover infection control, nail anatomy, and service procedures required for licensure (practical often separate).",
      },
      {
        question: "Is this an official Nail Technician exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from State cosmetology boards.",
      },
    ],
    keywords: ["nail tech exam practice test", "manicurist license practice test", "nail technician practice exam"],
  },
  "barber-state-readiness-check": {
    practiceTestName: "Barber Practice Test",
    whatIsExam: "State barber licensing written exams cover infection control, haircutting/shaving theory, chemicals, and state rules; skills exams are usually separate.",
    administeredBy: "State barber boards",
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with State barber boards.",
    examFaqs: [
      {
        question: "What is the Barber exam?",
        answer: "State barber licensing written exams cover infection control, haircutting/shaving theory, chemicals, and state rules; skills exams are usually separate.",
      },
      {
        question: "Is this an official Barber exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from State barber boards.",
      },
    ],
    keywords: ["barber exam practice test", "barber license practice test", "barber practice exam"],
  },
  "aswb-bachelors-readiness-check": {
    practiceTestName: "ASWB Bachelors Practice Test",
    whatIsExam: "The ASWB Bachelors exam is used for BSW-level social work licensure (e.g., LSW) in many jurisdictions.",
    administeredBy: "ASWB",
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with ASWB.",
    examFaqs: [
      {
        question: "What is the ASWB Bachelors exam?",
        answer: "The ASWB Bachelors exam is used for BSW-level social work licensure (e.g., LSW) in many jurisdictions.",
      },
      {
        question: "Is this an official ASWB Bachelors exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from ASWB.",
      },
    ],
    keywords: ["aswb bachelors practice test", "lsw exam practice test", "aswb bachelors practice exam"],
  },
  "aswb-clinical-readiness-check": {
    practiceTestName: "ASWB Clinical Practice Test",
    whatIsExam: "The ASWB Clinical exam is the clinical social work licensing exam used for LCSW (or equivalent) licensure in most U.S. jurisdictions.",
    administeredBy: "ASWB",
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with ASWB.",
    examFaqs: [
      {
        question: "What is the ASWB Clinical exam?",
        answer: "The ASWB Clinical exam is the clinical social work licensing exam used for LCSW (or equivalent) licensure in most U.S. jurisdictions.",
      },
      {
        question: "Is this an official ASWB Clinical exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from ASWB.",
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
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with HRCI.",
    examFaqs: [
      {
        question: "What is the PHR exam?",
        answer: "The HRCI Professional in Human Resources (PHR) exam certifies operational HR knowledge including talent, employee relations, and compliance.",
      },
      {
        question: "Is this an official PHR exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from HRCI.",
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
    whatIsExam: "The IRS Special Enrollment Examination (SEE) qualifies Enrolled Agents to represent taxpayers before the IRS across individuals, businesses, and representation topics.",
    administeredBy: "IRS",
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with IRS.",
    examFaqs: [
      {
        question: "What is the IRS Enrolled Agent exam?",
        answer: "The IRS Special Enrollment Examination (SEE) qualifies Enrolled Agents to represent taxpayers before the IRS across individuals, businesses, and representation topics.",
      },
      {
        question: "Is this an official IRS Enrolled Agent exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from IRS.",
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
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with ETS.",
    examFaqs: [
      {
        question: "What is the Praxis Core exam?",
        answer: "Praxis Core Academic Skills for Educators tests reading, writing, and math skills often required for entry into teacher preparation programs.",
      },
      {
        question: "Is this an official Praxis Core exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from ETS.",
      },
    ],
    keywords: ["praxis core practice test", "praxis i practice test", "praxis core practice exam"],
  },
  "parapro-readiness-check": {
    practiceTestName: "ParaPro Practice Test",
    whatIsExam: "The ParaPro Assessment measures reading, writing, and math skills for instructional paraprofessionals under ESSA-related requirements.",
    administeredBy: "ETS",
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with ETS.",
    examFaqs: [
      {
        question: "What is the ParaPro exam?",
        answer: "The ParaPro Assessment measures reading, writing, and math skills for instructional paraprofessionals under ESSA-related requirements.",
      },
      {
        question: "Is this an official ParaPro exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from ETS.",
      },
    ],
    keywords: ["parapro practice test", "paraprofessional exam practice test", "parapro practice exam"],
  },
  "unarmed-security-officer-readiness-check": {
    practiceTestName: "Unarmed Security Officer Practice Test",
    whatIsExam: "State unarmed security officer exams license guards to work site security. Topics typically include law, observation, emergencies, and ethics; rules vary by state.",
    administeredBy: "State security licensing boards",
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with State security licensing boards.",
    examFaqs: [
      {
        question: "What is the Unarmed Security Officer exam?",
        answer: "State unarmed security officer exams license guards to work site security. Topics typically include law, observation, emergencies, and ethics; rules vary by state.",
      },
      {
        question: "Is this an official Unarmed Security Officer exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from State security licensing boards.",
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
    whatIsExam: "ServSafe Food Handler is an entry food safety assessment for food workers covering contamination, hygiene, and time/temperature control (distinct from ServSafe Manager).",
    administeredBy: "National Restaurant Association",
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with National Restaurant Association.",
    examFaqs: [
      {
        question: "What is the ServSafe Food Handler exam?",
        answer: "ServSafe Food Handler is an entry food safety assessment for food workers covering contamination, hygiene, and time/temperature control (distinct from ServSafe Manager).",
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
    whatIsExam: "The SAFE Mortgage Loan Originator Test (national component + state where required) licenses MLOs through NMLS for residential mortgage origination.",
    administeredBy: "NMLS / SAFE MLO",
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with NMLS / SAFE MLO.",
    examFaqs: [
      {
        question: "What is the SAFE MLO exam?",
        answer: "The SAFE Mortgage Loan Originator Test (national component + state where required) licenses MLOs through NMLS for residential mortgage origination.",
      },
      {
        question: "Is this an official SAFE MLO exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from NMLS / SAFE MLO.",
      },
    ],
    keywords: ["safe mlo practice test", "nmls exam practice test", "mortgage loan originator practice test", "safe mlo practice exam"],
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
    whatIsExam: "Veterinary assistant assessments cover restraint, basic nursing support, hospital procedures, and safety for assistants working under veterinary supervision.",
    administeredBy: "NAVTA / employer VA competencies",
    officialFormat: "Timed multiple-choice knowledge assessment; verify the current official outline with NAVTA / employer VA competencies.",
    examFaqs: [
      {
        question: "What is the Veterinary Assistant exam?",
        answer: "Veterinary assistant assessments cover restraint, basic nursing support, hospital procedures, and safety for assistants working under veterinary supervision.",
      },
      {
        question: "Is this an official Veterinary Assistant exam?",
        answer: "No. This UniPrep2Go readiness check is independent practice \u2014 not official exam material from NAVTA / employer VA competencies.",
      },
    ],
    keywords: ["veterinary assistant practice test", "ava practice test", "veterinary assistant practice exam"],
  },
};
