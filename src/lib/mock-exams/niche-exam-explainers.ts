/**
 * Exam-context SEO copy for niche mocks — “what is this certification?”
 * Used for visible H2 sections, meta, and informational FAQs.
 */

import { wave3ExamExplainers } from "./wave3-explainers";
import { wave4ExamExplainers } from "./wave4-explainers";

export type NicheExamExplainer = {
  /** Practice-test product name for H1 / titles */
  practiceTestName: string;
  /** 2–4 sentences: what the real exam/cert is */
  whatIsExam: string;
  /** Who runs it / where candidates take it */
  administeredBy: string;
  /** Official format note when publicly known */
  officialFormat?: string;
  /** Who should pursue this exam (SEO body) */
  whoFor?: string;
  /** Prep guidance while the timed bank is on the waitlist */
  howToPrepare?: string;
  /** Optional per-topic blurbs for outline sections */
  topicBlurbs?: Array<{ id: string; label: string; blurb: string }>;
  /** Informational PAA FAQs about the real exam (not the mock product) */
  examFaqs: Array<{ question: string; answer: string }>;
  keywords: string[];
};

function explainer(input: NicheExamExplainer): NicheExamExplainer {
  return input;
}

export const nicheExamExplainers: Partial<Record<string, NicheExamExplainer>> = {
  "cdl-general-knowledge-readiness-check": explainer({
    practiceTestName: "CDL General Knowledge Practice Test",
    whatIsExam:
      "The CDL General Knowledge exam is the written knowledge test required before you can get a Commercial Learner’s Permit (CLP) and later a Commercial Driver’s License (CDL) for Class A or Class B vehicles. It covers vehicle systems, safe driving, cargo, and hours-of-service style rules from the FMCSA Commercial Driver’s Manual — not the skills/road test. States administer the test through their DMV or equivalent; you typically must pass General Knowledge (and any required endorsement knowledge tests) before scheduling skills testing.",
    administeredBy: "State DMV / licensing agency, using FMCSA Commercial Driver’s Manual topics",
    officialFormat:
      "Written (or computer-based) multiple-choice knowledge test; length and pass score vary by state. Skills/road testing is separate after you hold a CLP.",
    examFaqs: [
      {
        question: "What is the CDL General Knowledge exam?",
        answer:
          "It is the core written knowledge test for a Commercial Learner’s Permit / CDL. It checks whether you understand commercial vehicle operation, safety, and cargo rules before you take the skills test.",
      },
      {
        question: "Is CDL General Knowledge the same as the skills test?",
        answer:
          "No. General Knowledge is a knowledge (written) exam. The CDL skills test (vehicle inspection, basic controls, and road test) is a separate step after you get a CLP and practice.",
      },
      {
        question: "Do I need HazMat or passenger endorsements for General Knowledge?",
        answer:
          "General Knowledge is the base test. Endorsements such as HazMat (H), Passenger (P), or School Bus (S) have their own knowledge tests if your job requires them.",
      },
    ],
    keywords: [
      "cdl general knowledge practice test",
      "cdl practice test free",
      "cdl general knowledge exam",
      "commercial drivers license practice test",
      "clp practice test",
      "fmcsa cdl practice questions",
    ],
  }),
  "cdl-hazmat-readiness-check": explainer({
    practiceTestName: "CDL HazMat Endorsement Practice Test",
    whatIsExam:
      "The CDL Hazardous Materials (H) endorsement knowledge test covers placarding, shipping papers, loading/unloading, and emergency response rules for hazmat loads. Passing it (plus TSA security threat assessment where required) lets a CDL holder add the H endorsement.",
    administeredBy: "State DMV + TSA security threat assessment for the H endorsement",
    examFaqs: [
      {
        question: "What is the CDL HazMat endorsement exam?",
        answer:
          "It is a knowledge test on hazardous materials rules for drivers who transport placarded hazmat. It is separate from CDL General Knowledge.",
      },
    ],
    keywords: ["cdl hazmat practice test", "hazmat endorsement practice test", "cdl h endorsement"],
  }),
  "cdl-passenger-readiness-check": explainer({
    practiceTestName: "CDL Passenger Endorsement Practice Test",
    whatIsExam:
      "The CDL Passenger (P) endorsement knowledge test covers safely loading, unloading, and transporting passengers in buses and similar vehicles. It is required (with skills testing) for many passenger-carrying CDL jobs.",
    administeredBy: "State DMV / CDL licensing agency",
    examFaqs: [
      {
        question: "What is the CDL passenger endorsement?",
        answer:
          "The P endorsement authorizes a CDL holder to drive vehicles designed to carry passengers, after passing the passenger knowledge test and related skills requirements.",
      },
    ],
    keywords: ["cdl passenger practice test", "cdl p endorsement practice test"],
  }),
  "cdl-school-bus-readiness-check": explainer({
    practiceTestName: "CDL School Bus Endorsement Practice Test",
    whatIsExam:
      "The School Bus (S) endorsement knowledge test covers student loading zones, railroad crossings, evacuation, and school-bus-specific safety rules. It is typically required along with a passenger endorsement for school bus drivers.",
    administeredBy: "State DMV / CDL licensing agency",
    examFaqs: [
      {
        question: "What is the CDL school bus endorsement?",
        answer:
          "The S endorsement is for drivers who operate school buses. States require a school-bus knowledge test (and skills testing) before adding it to a CDL.",
      },
    ],
    keywords: ["cdl school bus practice test", "school bus endorsement practice test"],
  }),
  "nha-ccma-readiness-check": explainer({
    practiceTestName: "NHA CCMA Practice Test",
    whatIsExam:
      "The NHA Certified Clinical Medical Assistant (CCMA) exam is a national certification for clinical medical assistants who perform patient care tasks such as vitals, injections, phlebotomy support, ECG, and rooming patients. It is administered by the National Healthcareer Association (NHA) and is widely used by clinics and employers as proof of clinical MA competency.",
    administeredBy: "National Healthcareer Association (NHA)",
    examFaqs: [
      {
        question: "What is the NHA CCMA certification?",
        answer:
          "CCMA is NHA’s clinical medical assistant credential. Passing the exam shows employers you can perform common clinical MA duties under provider supervision.",
      },
      {
        question: "Who should take the CCMA exam?",
        answer:
          "Medical assistant students and working MAs who need a nationally recognized clinical certification for ambulatory care roles.",
      },
    ],
    keywords: ["nha ccma practice test", "ccma practice exam", "clinical medical assistant practice test"],
  }),
  "nha-cpt-phlebotomy-readiness-check": explainer({
    practiceTestName: "NHA CPT Phlebotomy Practice Test",
    whatIsExam:
      "The NHA Certified Phlebotomy Technician (CPT) exam is a national certification for blood-draw technicians who perform venipuncture and capillary collections, identify patients, select tubes and order of draw, handle specimens, and follow infection-control and safety protocols. Hospitals, outpatient labs, and donor centers commonly list NHA CPT (or an equivalent national phlebotomy credential) in job requirements. The exam is knowledge-based; employers still train site-specific procedures after hire. Always confirm current domains, eligibility, and fees on the official NHA candidate materials before you register.",
    administeredBy: "National Healthcareer Association (NHA)",
    officialFormat:
      "Computer-based multiple-choice certification exam; confirm current length, pass score, and content outline with NHA before scheduling.",
    whoFor:
      "Phlebotomy students finishing approved training programs, medical assistants adding a dedicated blood-draw credential, and career changers targeting entry-level hospital or outpatient lab phlebotomy roles who need a timed diagnostic before the official NHA sitting.",
    howToPrepare:
      "Study circulatory anatomy, order of draw, additive tubes, specimen rejection criteria, and OSHA/bloodborne-pathogen safety from your program materials and the published NHA CPT outline. Drill patient-ID and labeling scenarios daily. Take this free UniPrep2Go timed readiness check once under quiet conditions, then repair weak domains with the linked Anki deck before exam day. Confirm eligibility and testing rules on NHA’s official site — this page is independent practice, not an NHA exam.",
    topicBlurbs: [
      {
        id: "circulatory-anatomy",
        label: "Circulatory system & anatomy",
        blurb:
          "Vein selection, arm anatomy cues, and circulatory basics that support safe venipuncture decisions.",
      },
      {
        id: "collection-equipment",
        label: "Collection equipment & order of draw",
        blurb:
          "Needle/gauge choices, tube additives, and order-of-draw sequences that prevent cross-contamination.",
      },
      {
        id: "specimen-handling",
        label: "Specimen handling & processing",
        blurb:
          "Labeling, transport, centrifugation cues, rejection criteria, and chain-of-custody habits labs expect.",
      },
      {
        id: "safety-patient",
        label: "Safety, infection & patient care",
        blurb:
          "Hand hygiene, PPE, sharps disposal, patient identification, fainting response, and communication under stress.",
      },
    ],
    examFaqs: [
      {
        question: "What is the NHA CPT phlebotomy exam?",
        answer:
          "It is NHA’s Certified Phlebotomy Technician certification exam for candidates who collect blood specimens. It covers circulatory basics, collection equipment, specimen handling, safety, and patient care — not a hospital skills check-off by itself.",
      },
      {
        question: "Is this free practice test the official NHA CPT exam?",
        answer:
          "No. UniPrep2Go hosts an independent timed readiness check with original practice questions. It is not affiliated with or endorsed by NHA and does not redistribute live NHA exam items.",
      },
      {
        question: "Who should take the NHA CPT certification?",
        answer:
          "Students completing phlebotomy training and job seekers who need a nationally recognized phlebotomy credential for hospital, clinic, or outpatient lab roles. Confirm whether your employer or state prefers NHA CPT or another national board.",
      },
      {
        question: "What topics are on the NHA CPT exam?",
        answer:
          "Expect circulatory anatomy, collection equipment and order of draw, specimen handling/processing, and safety/infection/patient-care scenarios. Verify current domain weights on NHA’s published outline.",
      },
      {
        question: "How should I prepare for NHA CPT?",
        answer:
          "Finish your program competencies, memorize order of draw and tube additives, practice patient-ID scripts, then take a timed diagnostic. Use the UniPrep2Go report to decide which Anki domains to drill daily before you schedule NHA.",
      },
      {
        question: "Is there a free NHA CPT / phlebotomy practice test?",
        answer:
          "Yes — this page offers a free timed UniPrep2Go NHA CPT phlebotomy readiness check with topic scoring and answer review. No signup wall for the practice session.",
      },
    ],
    keywords: [
      "nha cpt practice test",
      "phlebotomy practice test",
      "certified phlebotomy technician exam",
      "free nha cpt practice test",
      "nha phlebotomy practice exam",
      "cpt phlebotomy practice questions",
    ],
  }),
  "nha-cpct-readiness-check": explainer({
    practiceTestName: "NHA CPCT Practice Test",
    whatIsExam:
      "The NHA Certified Patient Care Technician / Assistant (CPCT/A) exam covers bedside care, vital signs, ECG basics, and phlebotomy-related skills for multi-skilled patient care roles in hospitals and clinics.",
    administeredBy: "National Healthcareer Association (NHA)",
    examFaqs: [
      {
        question: "What is the NHA CPCT certification?",
        answer:
          "CPCT/A certifies patient care technicians who combine nursing-assistant-style care with selected technical skills such as ECG and phlebotomy support.",
      },
    ],
    keywords: ["nha cpct practice test", "patient care technician practice test"],
  }),
  "nha-excpt-readiness-check": explainer({
    practiceTestName: "NHA ExCPT Practice Test",
    whatIsExam:
      "The NHA ExCPT (Exam for the Certification of Pharmacy Technicians) is an alternative national pharmacy technician certification pathway. It tests medications, federal requirements, patient safety, and order processing knowledge for pharmacy tech candidates.",
    administeredBy: "National Healthcareer Association (NHA)",
    examFaqs: [
      {
        question: "What is the NHA ExCPT exam?",
        answer:
          "ExCPT is NHA’s pharmacy technician certification exam — a competitor pathway to PTCB’s PTCE for many employers and state boards.",
      },
    ],
    keywords: ["nha excpt practice test", "excpt practice exam", "pharmacy technician practice test"],
  }),
  "nha-cmaa-readiness-check": explainer({
    practiceTestName: "NHA CMAA Practice Test",
    whatIsExam:
      "The NHA Certified Medical Administrative Assistant (CMAA) exam focuses on front-office medical admin: scheduling, EHR basics, insurance intake, medical terminology, and patient communication — not clinical procedures.",
    administeredBy: "National Healthcareer Association (NHA)",
    examFaqs: [
      {
        question: "What is the NHA CMAA certification?",
        answer:
          "CMAA certifies medical administrative assistants who run the front desk and administrative workflows in clinics and medical offices.",
      },
    ],
    keywords: ["nha cmaa practice test", "medical administrative assistant practice test"],
  }),
  "nha-cbcs-readiness-check": explainer({
    practiceTestName: "NHA CBCS Practice Test",
    whatIsExam:
      "The NHA Certified Billing and Coding Specialist (CBCS) exam covers medical billing, coding basics, claims, and reimbursement workflows for outpatient billing roles.",
    administeredBy: "National Healthcareer Association (NHA)",
    examFaqs: [
      {
        question: "What is the NHA CBCS exam?",
        answer:
          "CBCS is NHA’s billing and coding specialist certification for candidates who submit and manage medical claims.",
      },
    ],
    keywords: ["nha cbcs practice test", "billing and coding practice test"],
  }),
  "ccht-dialysis-readiness-check": explainer({
    practiceTestName: "CCHT Dialysis Practice Test",
    whatIsExam:
      "The Certified Clinical Hemodialysis Technician (CCHT) credential (Nephrology Nursing Certification Commission) validates dialysis technicians who set up machines, monitor treatments, and follow infection-control and patient-safety protocols in hemodialysis clinics.",
    administeredBy: "Nephrology Nursing Certification Commission (NNCC)",
    examFaqs: [
      {
        question: "What is the CCHT certification?",
        answer:
          "CCHT certifies clinical hemodialysis technicians who deliver dialysis treatments under nurse/provider direction.",
      },
    ],
    keywords: ["ccht practice test", "dialysis technician practice test", "hemodialysis practice exam"],
  }),
  "aama-cma-readiness-check": explainer({
    practiceTestName: "AAMA CMA Practice Test",
    whatIsExam:
      "The AAMA Certified Medical Assistant (CMA) exam is a long-standing national MA credential covering clinical and administrative domains. Many employers prefer or require CMA (AAMA) for medical assistant roles.",
    administeredBy: "American Association of Medical Assistants (AAMA)",
    examFaqs: [
      {
        question: "What is the AAMA CMA exam?",
        answer:
          "It is the Certified Medical Assistant exam from AAMA, testing clinical and administrative medical assisting knowledge.",
      },
    ],
    keywords: ["aama cma practice test", "cma aama practice exam", "certified medical assistant practice test"],
  }),
  "nbrc-tmc-readiness-check": explainer({
    practiceTestName: "NBRC TMC Practice Test",
    whatIsExam:
      "The Therapist Multiple-Choice (TMC) Examination from the National Board for Respiratory Care is the written exam path toward the CRT/RRT credentials for respiratory therapists. It covers patient data, troubleshooting, and interventions across respiratory care.",
    administeredBy: "National Board for Respiratory Care (NBRC)",
    examFaqs: [
      {
        question: "What is the NBRC TMC exam?",
        answer:
          "TMC is NBRC’s multiple-choice exam used in the respiratory therapy credentialing pathway (CRT/RRT).",
      },
    ],
    keywords: ["nbrc tmc practice test", "tmc exam practice", "respiratory therapy practice test"],
  }),
  "nremt-emt-readiness-check": explainer({
    practiceTestName: "NREMT EMT Practice Test",
    whatIsExam:
      "The NREMT EMT cognitive exam is the national certification test for Emergency Medical Technicians. It assesses airway, cardiology, trauma, medical emergencies, and EMS operations. Most U.S. states use NREMT (or accept it) for EMT licensure after you complete an approved EMT course.",
    administeredBy: "National Registry of Emergency Medical Technicians (NREMT)",
    examFaqs: [
      {
        question: "What is the NREMT EMT exam?",
        answer:
          "It is the national cognitive exam for EMT certification. Passing it (plus skills requirements set by your program/state) is how most candidates become nationally registered EMTs.",
      },
      {
        question: "Is NREMT the same as a state EMT license?",
        answer:
          "NREMT certification is national. Your state still issues the license/authorization to practice and may have extra requirements.",
      },
    ],
    keywords: ["nremt emt practice test", "emt practice test free", "nremt practice exam", "emt cognitive exam"],
  }),
  "nremt-paramedic-readiness-check": explainer({
    practiceTestName: "NREMT Paramedic Practice Test",
    whatIsExam:
      "The NREMT Paramedic cognitive exam is the national certification test for paramedics — a higher scope than EMT, including advanced airway, cardiology, pharmacology, and complex medical/trauma care.",
    administeredBy: "National Registry of Emergency Medical Technicians (NREMT)",
    examFaqs: [
      {
        question: "What is the NREMT Paramedic exam?",
        answer:
          "It is the national cognitive exam for paramedic certification after an accredited paramedic program.",
      },
    ],
    keywords: ["nremt paramedic practice test", "paramedic practice exam"],
  }),
  "aha-bls-provider-readiness-check": explainer({
    practiceTestName: "AHA BLS Practice Test",
    whatIsExam:
      "American Heart Association Basic Life Support (BLS) Provider training certifies healthcare providers in high-quality CPR, AED use, and team resuscitation for adults, children, and infants. Many clinical jobs require a current BLS Provider card.",
    administeredBy: "American Heart Association (AHA) Training Centers",
    examFaqs: [
      {
        question: "What is AHA BLS Provider?",
        answer:
          "BLS Provider is AHA’s CPR/AED certification course for healthcare professionals, completed through an authorized training center (skills + cognitive components).",
      },
    ],
    keywords: ["aha bls practice test", "bls cpr practice test", "basic life support practice exam"],
  }),
  "nnaap-cna-readiness-check": explainer({
    practiceTestName: "NNAAP CNA Practice Test",
    whatIsExam:
      "The National Nurse Aide Assessment Program (NNAAP) exam is used by many states to certify nurse aides / CNAs. It typically includes a written (or oral) knowledge test plus a skills demonstration. Passing lets you be listed on the state nurse aide registry.",
    administeredBy: "State nurse aide registry programs (often via Credentia / NNAAP)",
    examFaqs: [
      {
        question: "What is the NNAAP CNA exam?",
        answer:
          "It is the nurse aide certification exam used in many U.S. states — usually a knowledge test plus skills checklist for CNA registry placement.",
      },
    ],
    keywords: ["nnaap practice test", "cna practice test free", "nurse aide practice exam"],
  }),
  "nclex-pn-readiness-check": explainer({
    practiceTestName: "NCLEX-PN Practice Test",
    whatIsExam:
      "The NCLEX-PN is the National Council Licensure Examination for Practical/Vocational Nurses (LPN/LVN). Passing it is required for LPN/LVN licensure in the United States after completing an approved practical nursing program.",
    administeredBy: "NCSBN / Pearson VUE (NCLEX)",
    examFaqs: [
      {
        question: "What is the NCLEX-PN?",
        answer:
          "NCLEX-PN is the licensure exam for practical/vocational nurses. It uses computerized adaptive testing across nursing process and client-need categories.",
      },
    ],
    keywords: ["nclex pn practice test", "lpn practice test", "nclex-pn practice questions"],
  }),
  "fl-real-estate-readiness-check": explainer({
    practiceTestName: "Florida Real Estate Practice Test",
    whatIsExam:
      "The Florida real estate sales associate exam is the state licensing knowledge test required after approved pre-license education to become a licensed sales associate in Florida. It covers real estate principles and practices, Florida license law under FREC/DBPR rules, contracts and conveyances, finance and appraisal math, and brokerage practice. Candidates typically complete the 63-hour pre-license course (confirm current hours), pass the state exam through the designated vendor, then activate a license with a broker. Always verify outlines, fees, and scheduling on official Florida DBPR / FREC materials.",
    administeredBy: "Florida DBPR / Florida Real Estate Commission (FREC) via the state’s exam vendor",
    officialFormat:
      "Timed multiple-choice state licensing exam; confirm current length, cut score, and national/state structure with DBPR and the exam vendor.",
    whoFor:
      "Florida sales associate candidates who finished (or are finishing) FREC-approved pre-license coursework, plus out-of-state licensees preparing for Florida mutual recognition or state-portion requirements when applicable.",
    howToPrepare:
      "Master Florida license law, agency, contracts, and daily math (commission, proration, LTV) from your pre-license materials and the official candidate bulletin. Take this free UniPrep2Go timed Florida readiness check once, then drill weak FREC domains with the linked Anki deck. Do not treat this page as a substitute for required classroom hours or the official PSI/vendor exam.",
    topicBlurbs: [
      {
        id: "license-law",
        label: "License law & FREC rules",
        blurb: "Licensing, advertising, brokerage relationships, and FREC disciplinary themes Florida candidates must recall under time pressure.",
      },
      {
        id: "contracts-titles",
        label: "Contracts, titles & conveyances",
        blurb: "Offer/acceptance, contingencies, deeds, title concepts, and conveyance steps common on the salesperson exam.",
      },
      {
        id: "finance-appraisal",
        label: "Finance, appraisal & math",
        blurb: "Mortgage basics, appraisal concepts, and calculation sets (commission, proration, LTV) that sink unprepared candidates.",
      },
      {
        id: "property-practice",
        label: "Property, brokerage & practice",
        blurb: "Property types, land use, fair housing, and day-to-day brokerage practice judgments.",
      },
    ],
    examFaqs: [
      {
        question: "What is the Florida real estate exam?",
        answer:
          "It is Florida’s sales associate licensing exam after approved pre-license education. Passing is required before you can activate a license with a broker under DBPR/FREC rules.",
      },
      {
        question: "Is this free practice test the official FREC exam?",
        answer:
          "No. UniPrep2Go provides an independent timed diagnostic with original questions. It is not DBPR, FREC, or vendor exam material.",
      },
      {
        question: "Do I need the 63-hour course before the Florida exam?",
        answer:
          "Florida requires approved pre-license education before you sit for the exam — confirm the current hour requirement and course approval list with DBPR/FREC.",
      },
      {
        question: "What topics are on the Florida real estate salesperson exam?",
        answer:
          "Expect license law, contracts/titles, finance and appraisal math, and property/brokerage practice. Verify the current outline in the official candidate bulletin.",
      },
      {
        question: "How should I prepare for the Florida real estate exam?",
        answer:
          "Finish pre-license hours, drill Florida license-law flashcards and math sets daily, then take a timed mock. Use the UniPrep2Go topic report to prioritize Anki repair before you schedule the vendor exam.",
      },
      {
        question: "Is there a free Florida real estate practice test?",
        answer:
          "Yes — this page hosts a free timed UniPrep2Go Florida real estate readiness check with topic scoring and answer review.",
      },
    ],
    keywords: [
      "florida real estate practice test",
      "florida real estate exam questions",
      "fl sales associate practice exam",
      "free florida real estate practice test",
      "frec practice test",
    ],
  }),
  "tx-real-estate-readiness-check": explainer({
    practiceTestName: "Texas Real Estate Practice Test",
    whatIsExam:
      "The Texas real estate salesperson (sales agent) exam is the licensing knowledge test administered under the Texas Real Estate Commission (TREC) after you complete required qualifying education. The sitting typically includes a national real estate principles portion and a Texas-specific law portion covering TRELA, TREC rules, agency, contracts, finance/closing math, and property practice. Passing both portions (confirm current cut scores with TREC/Pearson VUE) is required before TREC can issue a sales agent license. Always verify education hours, exam fees, and outlines on official TREC materials.",
    administeredBy: "Texas Real Estate Commission (TREC) via Pearson VUE",
    officialFormat:
      "Computer-based multiple-choice exam with national and Texas law sections; confirm current question counts and passing scores with TREC / Pearson VUE.",
    whoFor:
      "Texas sales agent candidates who completed TREC-approved qualifying education, plus experienced agents refreshing before a retake. Also useful for out-of-state licensees facing Texas education or exam requirements when reciprocity does not fully waive testing.",
    howToPrepare:
      "Study the TREC candidate information bulletin, Texas contract forms themes, agency disclosure timing, and daily math sets. Take this free UniPrep2Go timed Texas readiness check under quiet conditions, then repair weak TRELA/TREC domains with the linked Anki deck. Confirm scheduling and identification rules on Pearson VUE — this page is independent practice only.",
    topicBlurbs: [
      {
        id: "license-law",
        label: "TRELA / TREC license law",
        blurb: "Licensing, TREC authority, advertising, trust money themes, and prohibited practices under Texas law.",
      },
      {
        id: "contracts-agency",
        label: "Contracts & agency",
        blurb: "Agency relationships, disclosure timing, and contract essentials Texas agents use in daily practice.",
      },
      {
        id: "finance-closing",
        label: "Finance, closing & math",
        blurb: "Financing instruments, closing costs, prorations, and calculation drills that appear on both national and state portions.",
      },
      {
        id: "property-practice",
        label: "Property, land & practice",
        blurb: "Ownership estates, land use, fair housing, and brokerage practice judgments for Texas sales agents.",
      },
    ],
    examFaqs: [
      {
        question: "What is the Texas real estate exam?",
        answer:
          "It is TREC’s salesperson/sales agent licensing exam (national principles plus Texas law) required after qualifying education before you can be licensed to practice in Texas.",
      },
      {
        question: "Is this free practice test the official TREC exam?",
        answer:
          "No. UniPrep2Go’s timed readiness check is independent practice with original questions — not TREC or Pearson VUE exam material.",
      },
      {
        question: "Who administers the Texas real estate license exam?",
        answer:
          "The Texas Real Estate Commission sets requirements; Pearson VUE typically delivers the computer-based exam. Verify current vendor details on TREC’s site.",
      },
      {
        question: "Do I need qualifying education before the Texas exam?",
        answer:
          "Yes — Texas requires TREC-approved qualifying education hours before exam eligibility. Confirm the current hour total and course list with TREC.",
      },
      {
        question: "What topics are on the Texas real estate salesperson exam?",
        answer:
          "Expect national principles (agency, contracts, ownership, finance/closing) plus Texas-specific TRELA/TREC license law, disclosures, and ethics rules.",
      },
      {
        question: "Is there a free Texas real estate practice test?",
        answer:
          "Yes — take the free UniPrep2Go timed Texas real estate readiness check on this page for topic scoring and answer review.",
      },
    ],
    keywords: [
      "texas real estate practice test",
      "trec practice exam",
      "texas sales agent practice test",
      "free texas real estate practice test",
      "trec salesperson practice questions",
    ],
  }),
  "ny-real-estate-readiness-check": explainer({
    practiceTestName: "New York Real Estate Practice Test",
    whatIsExam:
      "The New York real estate salesperson exam is the state licensing knowledge test taken after completing New York’s required qualifying education hours. It covers agency, contracts, finance, property ownership, fair housing, and New York Department of State license law. Passing is required before you can be licensed as a New York real estate salesperson and affiliate with a broker. Confirm current hour requirements, exam vendor, and outlines with NYDOS.",
    administeredBy: "New York Department of State via the designated exam vendor",
    officialFormat:
      "Timed multiple-choice licensing exam; confirm current length and cut score with NYDOS / the exam vendor.",
    whoFor:
      "New York salesperson candidates finishing approved qualifying education and licensees preparing for a retake who need a timed diagnostic before the official sitting.",
    howToPrepare:
      "Study NYDOS candidate materials, agency and fair-housing rules, and finance/closing math. Take this free UniPrep2Go timed New York readiness check, then drill weak domains with the linked Anki deck before exam day.",
    topicBlurbs: [
      {
        id: "license-law",
        label: "License law & DOS rules",
        blurb: "Licensing, advertising, and New York DOS regulatory themes tested on the salesperson exam.",
      },
      {
        id: "contracts-agency",
        label: "Contracts, agency & fair housing",
        blurb: "Agency duties, contract essentials, and fair-housing judgments New York candidates must apply quickly.",
      },
      {
        id: "finance-valuation",
        label: "Finance, valuation & closing",
        blurb: "Mortgage basics, valuation cues, closing math, and prorations.",
      },
      {
        id: "property-practice",
        label: "Property, land use & practice",
        blurb: "Ownership, land use, and day-to-day brokerage practice for New York salespersons.",
      },
    ],
    examFaqs: [
      {
        question: "What is the New York real estate salesperson exam?",
        answer:
          "It is New York’s licensing exam for real estate salespersons after state-required qualifying education, administered under NYDOS rules.",
      },
      {
        question: "Is this the official NYDOS exam?",
        answer:
          "No. UniPrep2Go offers independent timed practice only — not official New York Department of State exam material.",
      },
      {
        question: "Do I need qualifying education before the NY exam?",
        answer:
          "Yes — New York requires approved qualifying education hours before you can sit. Confirm current hours with NYDOS.",
      },
      {
        question: "What topics appear on the New York salesperson exam?",
        answer:
          "Agency, contracts, finance/valuation, property and land use, fair housing, and New York license law are common domains — verify the live outline with NYDOS.",
      },
      {
        question: "How should I prepare for the New York real estate exam?",
        answer:
          "Finish qualifying education, drill license-law and math flashcards, take a timed mock, then repair weak topics before scheduling the vendor exam.",
      },
      {
        question: "Is there a free New York real estate practice test?",
        answer:
          "Yes — this page hosts a free timed UniPrep2Go New York real estate readiness check with topic scoring.",
      },
    ],
    keywords: [
      "new york real estate practice test",
      "ny salesperson exam practice",
      "free new york real estate practice test",
      "nydos real estate practice exam",
    ],
  }),
  "aapc-cpc-readiness-check": explainer({
    practiceTestName: "AAPC CPC Practice Test",
    whatIsExam:
      "The AAPC Certified Professional Coder (CPC) exam is a leading medical coding certification for outpatient/physician coding. It tests CPT, ICD-10-CM, and HCPCS coding accuracy plus coding guidelines and compliance.",
    administeredBy: "AAPC",
    examFaqs: [
      {
        question: "What is the AAPC CPC exam?",
        answer:
          "CPC certifies professional medical coders, focusing on physician/outpatient coding with CPT, ICD-10-CM, and HCPCS.",
      },
    ],
    keywords: ["aapc cpc practice test", "cpc practice exam", "medical coding practice test"],
  }),
  "mblex-readiness-check": explainer({
    practiceTestName: "MBLEx Practice Test",
    whatIsExam:
      "The Massage & Bodywork Licensing Examination (MBLEx) is the common national licensing exam for massage therapists in most U.S. states. It covers anatomy, physiology, kinesiology, pathology, ethics, and massage application.",
    administeredBy: "Federation of State Massage Therapy Boards (FSMTB)",
    examFaqs: [
      {
        question: "What is the MBLEx?",
        answer:
          "MBLEx is the national massage therapy licensing exam used by most state boards for massage therapist licensure.",
      },
    ],
    keywords: ["mblex practice test", "massage therapy practice exam", "mblex practice questions"],
  }),
  "danb-ice-readiness-check": explainer({
    practiceTestName: "DANB ICE Practice Test",
    whatIsExam:
      "DANB’s Infection Control (ICE) exam is a dental assisting component exam on infection prevention, sterilization, and OSHA/CDC-style safety in dental settings. Many dental assistants take ICE as part of CDA or state requirements.",
    administeredBy: "Dental Assisting National Board (DANB)",
    examFaqs: [
      {
        question: "What is the DANB ICE exam?",
        answer:
          "ICE is DANB’s Infection Control exam for dental assistants, covering sterilization, PPE, and infection-prevention protocols.",
      },
    ],
    keywords: ["danb ice practice test", "dental infection control practice test"],
  }),
  "danb-gc-readiness-check": explainer({
    practiceTestName: "DANB GC Practice Test",
    whatIsExam:
      "DANB’s General Chairside (GC) exam covers clinical dental assisting chairside duties, instruments, materials, and patient care. It is a core component of the CDA pathway.",
    administeredBy: "Dental Assisting National Board (DANB)",
    examFaqs: [
      {
        question: "What is the DANB GC exam?",
        answer:
          "General Chairside (GC) is DANB’s exam on clinical chairside dental assisting knowledge.",
      },
    ],
    keywords: ["danb gc practice test", "general chairside practice test"],
  }),
  "nbdhe-readiness-check": explainer({
    practiceTestName: "NBDHE Practice Test",
    whatIsExam:
      "The National Board Dental Hygiene Examination (NBDHE) is the written board exam for dental hygiene licensure candidates in the United States, covering scientific basis for hygiene practice, clinical dental hygiene, and community health.",
    administeredBy: "Joint Commission on National Dental Examinations (JCNDE)",
    examFaqs: [
      {
        question: "What is the NBDHE?",
        answer:
          "NBDHE is the national written board exam dental hygiene graduates take as part of becoming a licensed dental hygienist (states also require clinical exams).",
      },
    ],
    keywords: ["nbdhe practice test", "dental hygiene board practice exam"],
  }),
  "crcst-readiness-check": explainer({
    practiceTestName: "CRCST Practice Test",
    whatIsExam:
      "The Certified Registered Central Service Technician (CRCST) credential from HSPA (formerly IAHCSMM) certifies sterile processing / central service technicians who clean, disinfect, sterilize, and store surgical instruments.",
    administeredBy: "Healthcare Sterile Processing Association (HSPA)",
    examFaqs: [
      {
        question: "What is the CRCST certification?",
        answer:
          "CRCST certifies sterile processing technicians who manage the instrument reprocessing cycle in hospitals and surgery centers.",
      },
    ],
    keywords: ["crcst practice test", "sterile processing practice test", "iahcsmm practice exam"],
  }),
  "nbstsa-cst-readiness-check": explainer({
    practiceTestName: "NBSTSA CST Practice Test",
    whatIsExam:
      "The Certified Surgical Technologist (CST) exam from NBSTSA certifies surgical technologists who scrub, set up sterile fields, and assist in the OR. Many employers and some states recognize CST as the standard surgical tech credential.",
    administeredBy: "National Board of Surgical Technology and Surgical Assisting (NBSTSA)",
    examFaqs: [
      {
        question: "What is the CST exam?",
        answer:
          "CST is NBSTSA’s certification exam for surgical technologists working in the operating room.",
      },
    ],
    keywords: ["cst practice test", "nbstsa practice exam", "surgical technologist practice test"],
  }),
  "ardms-spi-readiness-check": explainer({
    practiceTestName: "ARDMS SPI Practice Test",
    whatIsExam:
      "The Sonography Principles & Instrumentation (SPI) exam from ARDMS tests ultrasound physics and instrumentation. Most sonography specialty credentials require passing SPI plus a specialty exam (e.g., ABD, OB/GYN).",
    administeredBy: "ARDMS (American Registry for Diagnostic Medical Sonography)",
    examFaqs: [
      {
        question: "What is the ARDMS SPI exam?",
        answer:
          "SPI is the ultrasound physics and instrumentation exam required as part of most ARDMS sonographer credentials.",
      },
    ],
    keywords: ["ardms spi practice test", "ultrasound physics practice test", "spi exam practice"],
  }),
  "vtne-readiness-check": explainer({
    practiceTestName: "VTNE Practice Test",
    whatIsExam:
      "The Veterinary Technician National Examination (VTNE) is the national exam for veterinary technician / nurse licensure or credentialing in most U.S. jurisdictions and Canadian provinces.",
    administeredBy: "AAVSB (VTNE)",
    examFaqs: [
      {
        question: "What is the VTNE?",
        answer:
          "VTNE is the national board-style exam veterinary technician graduates take for state/provincial credentialing.",
      },
    ],
    keywords: ["vtne practice test", "veterinary technician practice exam"],
  }),
  "cosmetology-state-readiness-check": explainer({
    practiceTestName: "Cosmetology Practice Test",
    whatIsExam:
      "State cosmetology written exams (often NIC or state-specific) are required for cosmetology licensure. They cover infection control, hair care, chemical services, and state rules. A practical/skills exam is usually separate.",
    administeredBy: "State cosmetology boards (often NIC written exams)",
    examFaqs: [
      {
        question: "What is the cosmetology licensing exam?",
        answer:
          "Most states require a written theory exam and a practical exam before issuing a cosmetology license after school hours are complete.",
      },
    ],
    keywords: ["cosmetology practice test", "cosmetology state board practice exam"],
  }),
  "esthetician-state-readiness-check": explainer({
    practiceTestName: "Esthetician Practice Test",
    whatIsExam:
      "State esthetician / skin care written exams cover infection control, skin analysis, facial treatments, hair removal basics, and state laws. Candidates typically also complete a practical exam for licensure.",
    administeredBy: "State cosmetology / esthetics boards",
    examFaqs: [
      {
        question: "What is the esthetician licensing exam?",
        answer:
          "It is the state board exam (written + usually practical) required to become a licensed esthetician / skin care specialist.",
      },
    ],
    keywords: ["esthetician practice test", "esthetics state board practice exam"],
  }),
  "nasm-cpt-readiness-check": explainer({
    practiceTestName: "NASM CPT Practice Test",
    whatIsExam:
      "The NASM Certified Personal Trainer (CPT) exam certifies personal trainers using NASM’s OPT model. It is a widely recognized CPT credential for gym and online coaching careers.",
    administeredBy: "National Academy of Sports Medicine (NASM)",
    examFaqs: [
      {
        question: "What is the NASM CPT exam?",
        answer:
          "It is NASM’s personal trainer certification exam covering exercise science, assessments, program design, and OPT model concepts.",
      },
    ],
    keywords: ["nasm cpt practice test", "nasm practice exam", "personal trainer practice test"],
  }),
  "issa-cpt-readiness-check": explainer({
    practiceTestName: "ISSA CPT Practice Test",
    whatIsExam:
      "The ISSA Certified Personal Trainer exam certifies trainers through the International Sports Sciences Association. It covers anatomy, program design, nutrition basics, and client coaching.",
    administeredBy: "International Sports Sciences Association (ISSA)",
    examFaqs: [
      {
        question: "What is the ISSA CPT certification?",
        answer:
          "ISSA CPT is a personal trainer certification focused on exercise science and client program design for fitness professionals.",
      },
    ],
    keywords: ["issa cpt practice test", "issa practice exam"],
  }),
  "ace-cpt-readiness-check": explainer({
    practiceTestName: "ACE CPT Practice Test",
    whatIsExam:
      "The ACE Certified Personal Trainer exam from the American Council on Exercise is an NCCA-accredited CPT credential covering client assessments, program design, and behavior change coaching.",
    administeredBy: "American Council on Exercise (ACE)",
    examFaqs: [
      {
        question: "What is the ACE CPT exam?",
        answer:
          "ACE CPT is ACE’s personal trainer certification exam for fitness professionals seeking an accredited CPT credential.",
      },
    ],
    keywords: ["ace cpt practice test", "ace personal trainer practice exam"],
  }),
  "aswb-masters-readiness-check": explainer({
    practiceTestName: "ASWB Masters Practice Test",
    whatIsExam:
      "The ASWB Masters exam is used by most U.S. jurisdictions for LMSW / master’s-level social work licensure. It covers human development, assessment, intervention, ethics, and professional practice.",
    administeredBy: "Association of Social Work Boards (ASWB)",
    examFaqs: [
      {
        question: "What is the ASWB Masters exam?",
        answer:
          "It is the master’s-level social work licensing exam used for LMSW (or equivalent) licensure in most states.",
      },
    ],
    keywords: ["aswb masters practice test", "lmsw practice exam", "aswb practice questions"],
  }),
  "cda-childcare-readiness-check": explainer({
    practiceTestName: "CDA Childcare Practice Test",
    whatIsExam:
      "The Child Development Associate (CDA) Credential™ from the Council for Professional Recognition is a widely recognized early childhood credential. Candidates complete coursework, a portfolio, observation, and the CDA Exam.",
    administeredBy: "Council for Professional Recognition (CDA)",
    examFaqs: [
      {
        question: "What is the CDA credential?",
        answer:
          "CDA is a national early childhood credential verifying competency to work with young children in center-based, family child care, or home visitor settings.",
      },
    ],
    keywords: ["cda practice test", "child development associate practice exam"],
  }),
  "pest-control-applicator-readiness-check": explainer({
    practiceTestName: "Pest Control Applicator Practice Test",
    whatIsExam:
      "State pest control / pesticide applicator exams license technicians who apply pesticides commercially. Core topics usually include IPM, label comprehension, safety, and environmental protection; categories (structural, lawn, etc.) vary by state.",
    administeredBy: "State pesticide regulatory agencies",
    examFaqs: [
      {
        question: "What is a pest control applicator license exam?",
        answer:
          "It is the state exam required to become a licensed pesticide applicator for commercial pest control work; rules and categories differ by state.",
      },
    ],
    keywords: ["pest control applicator practice test", "pesticide applicator practice exam"],
  }),
  "ascp-mls-readiness-check": explainer({
    practiceTestName: "ASCP MLS Practice Test",
    whatIsExam:
      "The ASCP Board of Certification Medical Laboratory Scientist (MLS) exam certifies clinical lab scientists across blood bank, chemistry, hematology, microbiology, and lab operations.",
    administeredBy: "ASCP Board of Certification",
    examFaqs: [
      {
        question: "What is the ASCP MLS exam?",
        answer:
          "MLS (ASCP) is the primary national certification exam for medical laboratory scientists / clinical lab scientists.",
      },
    ],
    keywords: ["ascp mls practice test", "medical laboratory scientist practice exam"],
  }),
  "rd-exam-readiness-check": explainer({
    practiceTestName: "RD Exam Practice Test",
    whatIsExam:
      "The Registration Examination for Dietitians (RD exam) from CDR is required to become a Registered Dietitian Nutritionist (RDN) after completing ACEND-accredited education and supervised practice.",
    administeredBy: "Commission on Dietetic Registration (CDR)",
    examFaqs: [
      {
        question: "What is the RD / RDN exam?",
        answer:
          "It is CDR’s registration exam for dietitians — the final exam step to earn the RDN credential in the United States.",
      },
    ],
    keywords: ["rd exam practice test", "rdn practice exam", "dietitian registration exam practice"],
  }),
  "epa-608-readiness-check": explainer({
    practiceTestName: "EPA 608 Practice Test",
    whatIsExam:
      "EPA Section 608 certification is the U.S. Clean Air Act credential required for technicians who maintain, service, repair, or dispose of equipment that could release ozone-depleting refrigerants or many substitute refrigerants. The pathway includes a Core exam plus Type I (small appliances), Type II (high-pressure), and/or Type III (low-pressure) sections; Universal status requires Core plus all three types. Approved proctors deliver the official exam — UniPrep2Go is independent practice only. Always confirm current pass rules and refrigerant updates with EPA and your testing organization.",
    administeredBy: "U.S. Environmental Protection Agency (Section 608) via EPA-approved certifying organizations",
    officialFormat:
      "Closed-book multiple-choice sections (Core and Types I–III); the common prep target is at least 18 of 25 correct (72%) per section on the official exam — confirm live rules with your proctor.",
    whoFor:
      "HVAC/R apprentices, technicians, and trade students who must hold Section 608 before working on regulated refrigerant equipment, including candidates aiming for Universal certification.",
    howToPrepare:
      "Study recovery/recycle/reclaim definitions, evacuation levels, leak repair triggers, and cylinder safety from EPA-aligned study materials. Take this free timed UniPrep2Go EPA 608 readiness check covering Core and Types I–III domains, then drill missed sections with the linked Anki deck before you book an approved proctored exam.",
    topicBlurbs: [
      { id: "core", label: "Core", blurb: "Clean Air Act basics, ozone science, recovery/recycle/reclaim, and shared safety rules." },
      { id: "type-1", label: "Type I", blurb: "Small-appliance service, recovery equipment, and Type I procedural judgment." },
      { id: "type-2", label: "Type II", blurb: "High-pressure appliance service, leak repair, and Type II recovery practices." },
      { id: "type-3", label: "Type III", blurb: "Low-pressure chillers, rupture discs, purge units, and Type III evacuation themes." },
    ],
    examFaqs: [
      {
        question: "What is the EPA Section 608 exam?",
        answer:
          "It is the Clean Air Act certification for technicians who handle refrigerants in air-conditioning and refrigeration equipment. Core plus Type I–III sections lead to Universal certification when all are passed.",
      },
      {
        question: "Is this free practice test the official EPA 608 exam?",
        answer:
          "No. UniPrep2Go provides independent timed practice. Official Section 608 exams are delivered only by EPA-approved certifying organizations.",
      },
      {
        question: "What is Universal EPA 608 certification?",
        answer:
          "Universal typically means you passed Core plus Type I, Type II, and Type III. Confirm the exact combination your employer and proctor require.",
      },
      {
        question: "What topics are on EPA 608?",
        answer:
          "Core environmental rules plus type-specific service, recovery, leak repair, and evacuation practices for small, high-pressure, and low-pressure equipment.",
      },
      {
        question: "How should I prepare for EPA 608?",
        answer:
          "Study section by section, memorize critical pressures and recovery rules, take a timed diagnostic, then repair weak types with flashcards before the proctored sitting.",
      },
      {
        question: "Is there a free EPA 608 practice test?",
        answer:
          "Yes — this page hosts a free timed UniPrep2Go EPA 608 readiness check with topic scoring and answer review.",
      },
    ],
    keywords: [
      "epa 608 practice test",
      "free epa 608 practice test",
      "hvac 608 practice exam",
      "epa section 608 practice questions",
      "universal 608 practice test",
    ],
  }),
  "leed-green-associate-readiness-check": explainer({
    practiceTestName: "LEED Green Associate Practice Test",
    whatIsExam:
      "The LEED Green Associate (GA) exam from GBCI is the foundational LEED credential demonstrating green-building literacy across integrative process, location and transportation, sustainable sites, water efficiency, energy and atmosphere, materials and resources, indoor environmental quality, and project synergies. It is often the first step before specialty LEED AP exams such as BD+C. Confirm current candidate handbook details with GBCI/USGBC before registering.",
    administeredBy: "Green Business Certification Inc. (GBCI) / USGBC",
    officialFormat:
      "Computer-based multiple-choice exam (commonly 100 questions); confirm current length, timing, and scaled pass score with GBCI.",
    whoFor:
      "Architects, engineers, sustainability staff, students, and project team members who need a baseline LEED credential before project roles or LEED AP specialty exams.",
    howToPrepare:
      "Study the LEED GA candidate handbook credit categories, drill vocabulary and process questions, take this free UniPrep2Go timed LEED GA readiness check, then repair weak categories with the linked Anki deck before GBCI exam day.",
    topicBlurbs: [
      {
        id: "integrative-process",
        label: "Integrative process",
        blurb: "Early analysis and team coordination themes that appear throughout LEED GA.",
      },
      {
        id: "location-transportation",
        label: "Location & transportation",
        blurb: "LT credit intent, site selection, and transportation strategies at Associate level.",
      },
      {
        id: "sites-water",
        label: "Sites & water",
        blurb: "Sustainable sites and water-efficiency strategies commonly tested on LEED GA.",
      },
      {
        id: "energy-atmosphere",
        label: "Energy & atmosphere",
        blurb: "Energy performance, commissioning awareness, and atmosphere themes.",
      },
      {
        id: "materials-ieq",
        label: "Materials & IEQ",
        blurb: "Materials/resources choices and indoor environmental quality fundamentals.",
      },
    ],
    examFaqs: [
      {
        question: "What is the LEED Green Associate exam?",
        answer:
          "LEED GA is GBCI’s foundational LEED credential exam covering green-building principles and LEED rating-system literacy across major credit categories.",
      },
      {
        question: "Is this the official USGBC / GBCI exam?",
        answer:
          "No. UniPrep2Go offers independent practice only — not official USGBC or GBCI exam items.",
      },
      {
        question: "Do I need LEED GA before LEED AP BD+C?",
        answer:
          "LEED AP specialty credentials generally require LEED Green Associate as a prerequisite. Confirm the live pathway on GBCI’s site.",
      },
      {
        question: "What topics are on LEED GA?",
        answer:
          "Integrative process, location/transportation, sites, water, energy, materials, indoor environmental quality, and related LEED project concepts — verify weights in the candidate handbook.",
      },
      {
        question: "How should I prepare for LEED Green Associate?",
        answer:
          "Read the handbook, memorize credit intents and key metrics, take a timed mock, then drill missed categories with spaced repetition.",
      },
      {
        question: "Is there a free LEED Green Associate practice test?",
        answer:
          "Yes — take the free UniPrep2Go timed LEED GA readiness check on this page.",
      },
    ],
    keywords: [
      "leed green associate practice test",
      "free leed ga practice test",
      "leed ga exam questions",
      "leed green associate practice exam",
    ],
  }),
  "leed-ap-bd-c-readiness-check": explainer({
    practiceTestName: "LEED AP BD+C Practice Test",
    whatIsExam:
      "LEED AP Building Design and Construction (BD+C) is the specialty LEED credential for professionals applying LEED to design and construction projects. It goes beyond Green Associate literacy into credit application, documentation, and rating-system judgment for BD+C project types. Candidates generally must hold LEED GA first. Confirm prerequisites and handbook details with GBCI.",
    administeredBy: "Green Business Certification Inc. (GBCI) / USGBC",
    officialFormat:
      "Computer-based specialty exam; confirm current structure, timing, and scoring with GBCI.",
    whoFor:
      "LEED GA holders on design and construction teams — architects, engineers, consultants, and sustainability managers preparing for AP-level BD+C project responsibilities.",
    howToPrepare:
      "Study the LEED AP BD+C candidate handbook, practice credit scenarios (not just definitions), take this free UniPrep2Go timed readiness check, then repair weak credit categories with the linked Anki deck before GBCI registration.",
    topicBlurbs: [
      {
        id: "process-location",
        label: "Process & location",
        blurb: "Integrative process plus location/transportation judgment for BD+C projects.",
      },
      {
        id: "sites-water",
        label: "Sites & water",
        blurb: "Sustainable sites and water-efficiency credit application on design-construction jobs.",
      },
      {
        id: "energy-atmosphere",
        label: "Energy & atmosphere",
        blurb: "Energy performance and atmosphere credits at AP scenario depth.",
      },
      {
        id: "materials-resources",
        label: "Materials & resources",
        blurb: "MR credit application, documentation cues, and product selection tradeoffs.",
      },
      {
        id: "indoor-environmental-quality",
        label: "Indoor environmental quality",
        blurb: "IEQ strategies and documentation themes for occupied buildings.",
      },
    ],
    examFaqs: [
      {
        question: "What is the LEED AP BD+C exam?",
        answer:
          "It is GBCI’s LEED AP specialty exam for Building Design and Construction project application, documentation, and credit judgment beyond the Green Associate level.",
      },
      {
        question: "Is this free mock the official LEED AP exam?",
        answer:
          "No. UniPrep2Go provides independent timed practice — not official GBCI/USGBC exam material.",
      },
      {
        question: "Do I need LEED GA before BD+C?",
        answer:
          "Typically yes — LEED AP specialties require LEED Green Associate. Confirm current prerequisites with GBCI.",
      },
      {
        question: "How is LEED AP BD+C different from LEED GA?",
        answer:
          "GA tests green-building literacy; BD+C tests specialty application of LEED credits on design and construction projects, including documentation-oriented scenarios.",
      },
      {
        question: "How should I prepare for LEED AP BD+C?",
        answer:
          "Use the specialty handbook, practice scenario questions, take a timed diagnostic, and drill weak credit categories daily before exam day.",
      },
      {
        question: "Is there a free LEED AP BD+C practice test?",
        answer:
          "Yes — this page hosts a free timed UniPrep2Go LEED AP BD+C readiness check.",
      },
    ],
    keywords: [
      "leed ap bd+c practice test",
      "leed ap practice exam",
      "free leed ap bd+c practice test",
      "leed ap building design and construction",
    ],
  }),
  "nebosh-readiness-check": explainer({
    practiceTestName: "NEBOSH Practice Test",
    whatIsExam:
      "NEBOSH International General Certificate-style assessments evaluate health and safety management systems, workplace hazards, and risk-control thinking used by safety practitioners worldwide. Exact unit codes and assessment formats evolve — confirm your registration pathway (for example IG or successor structures) with NEBOSH before you book. UniPrep2Go’s readiness check is independent practice aligned to common IGC-style domains, not an official NEBOSH paper.",
    administeredBy: "NEBOSH (National Examination Board in Occupational Safety and Health)",
    officialFormat:
      "Official NEBOSH assessments use published unit formats (open-book / practical elements vary by qualification). Confirm your current syllabus with NEBOSH.",
    whoFor:
      "Safety officers, supervisors, and career changers preparing for NEBOSH International General Certificate-style qualifications who need a timed MCQ-style diagnostic on management systems and hazard control themes.",
    howToPrepare:
      "Study your enrolled NEBOSH syllabus, practice risk-assessment narratives, take this free UniPrep2Go timed readiness check for topic scoring, then repair weak hazard domains with the linked Anki deck. Always pair mocks with official learning materials from your accredited provider.",
    topicBlurbs: [
      {
        id: "hsm-systems-culture",
        label: "H&S management systems",
        blurb: "Policy, organization, culture, planning, and monitoring themes.",
      },
      {
        id: "health-ergonomics",
        label: "Health & ergonomics",
        blurb: "Physical, psychological, and musculoskeletal health risk themes.",
      },
      {
        id: "agents-workplace-hazards",
        label: "Agents & workplace hazards",
        blurb: "Chemical, biological, and general workplace hazard recognition.",
      },
      {
        id: "equipment-fire-electricity",
        label: "Equipment, fire & electricity",
        blurb: "Work equipment, fire, and electrical hazard control judgment.",
      },
      {
        id: "gic2-risk-assessment",
        label: "Risk assessment",
        blurb: "Structured risk assessment and control thinking used in GIC2-style practice.",
      },
    ],
    examFaqs: [
      {
        question: "What is the NEBOSH IGC-style exam?",
        answer:
          "NEBOSH International General Certificate pathways assess health and safety management and workplace risk control. Confirm your exact units and assessment method with NEBOSH.",
      },
      {
        question: "Is this an official NEBOSH exam?",
        answer:
          "No. UniPrep2Go provides independent practice only — not official NEBOSH assessment papers.",
      },
      {
        question: "Who should take a NEBOSH certificate?",
        answer:
          "Managers, supervisors, and safety practitioners who need a recognized international health and safety qualification for workplace roles.",
      },
      {
        question: "What topics appear on NEBOSH-style readiness checks?",
        answer:
          "Management systems, workplace hazards, risk control, and risk-assessment thinking — verify weights against your enrolled syllabus.",
      },
      {
        question: "How should I prepare for NEBOSH?",
        answer:
          "Follow your accredited course, practice structured risk assessments, take timed diagnostics, and repair weak topics with spaced repetition.",
      },
      {
        question: "Is there a free NEBOSH practice test?",
        answer:
          "Yes — take the free UniPrep2Go timed NEBOSH readiness check on this page.",
      },
    ],
    keywords: [
      "nebosh practice test",
      "nebosh igc practice exam",
      "free nebosh practice questions",
      "nebosh readiness check",
    ],
  }),
  "cfps-readiness-check": explainer({
    practiceTestName: "CFPS Practice Test",
    whatIsExam:
      "The Certified Fire Protection Specialist (CFPS) credential from NFPA recognizes professionals who apply fire protection principles across detection, alarm, suppression, and facility hazard management. The official exam is a multiple-choice assessment delivered through NFPA’s testing pathway (commonly Prometric). Confirm current handbook domains and eligibility with NFPA before registering. UniPrep2Go practice is independent and not NFPA exam material.",
    administeredBy: "National Fire Protection Association (NFPA)",
    officialFormat:
      "Computer-based multiple-choice professional certification exam; confirm current length and scoring with NFPA / the exam vendor.",
    whoFor:
      "Fire protection engineers, AHJ staff, facility risk managers, and safety professionals preparing for the CFPS credential who need a timed domain diagnostic before the official sitting.",
    howToPrepare:
      "Study the CFPS exam guide domains, practice scenario judgment across detection and suppression systems, take this free UniPrep2Go timed readiness check, then repair weak NFPA-aligned topics with the linked Anki deck.",
    topicBlurbs: [
      { id: "fire-suppression", label: "Fire suppression", blurb: "Water-based and special-hazard suppression concepts." },
      {
        id: "safety-built-environment",
        label: "Safety in the built environment",
        blurb: "Occupancy and built-environment fire safety judgment.",
      },
      { id: "detection-alarm", label: "Detection & alarm", blurb: "Detection devices, notification, and system reliability themes." },
      {
        id: "fire-prevention-programs",
        label: "Fire prevention programs",
        blurb: "Programs, materials, processes, and environments that reduce ignition risk.",
      },
      {
        id: "information-analysis",
        label: "Information & analysis",
        blurb: "Fire protection data, analysis, and fire-science information use.",
      },
      {
        id: "facility-hazard-management",
        label: "Facility hazard management",
        blurb: "Facility fire hazard management and inspection-oriented themes.",
      },
      {
        id: "organizing-fire-rescue",
        label: "Organizing fire & rescue",
        blurb: "Organizing for fire and rescue services and coordination themes.",
      },
      { id: "confining-fires", label: "Confining fires", blurb: "Compartmentation and confining-fire strategies." },
    ],
    examFaqs: [
      {
        question: "What is the CFPS exam?",
        answer:
          "CFPS is NFPA’s Certified Fire Protection Specialist exam covering fire protection principles used in detection, alarm, suppression, and facility hazard management.",
      },
      {
        question: "Is this free practice test the official CFPS exam?",
        answer:
          "No. UniPrep2Go provides independent timed practice — not official NFPA or Prometric exam items.",
      },
      {
        question: "Who should pursue CFPS?",
        answer:
          "Fire protection and safety professionals who want a recognized specialty credential spanning systems and facility hazard management.",
      },
      {
        question: "What topics are on CFPS?",
        answer:
          "Fire science, detection and alarm, suppression, and facility hazard management are common domains — confirm the live outline with NFPA.",
      },
      {
        question: "How should I prepare for CFPS?",
        answer:
          "Use the NFPA exam guide, drill scenario questions by domain, take a timed mock, then repair weak areas with spaced repetition.",
      },
      {
        question: "Is there a free CFPS practice test?",
        answer:
          "Yes — this page hosts a free timed UniPrep2Go CFPS readiness check.",
      },
    ],
    keywords: [
      "cfps practice test",
      "free cfps practice questions",
      "nfpa cfps practice exam",
      "certified fire protection specialist practice test",
    ],
  }),
  "mrics-readiness-check": explainer({
    practiceTestName: "MRICS APC Practice Test",
    whatIsExam:
      "MRICS membership via the Assessment of Professional Competence (APC) is RICS’s pathway for surveyors to demonstrate ethics, mandatory competencies, and pathway-specific technical judgment — culminating in a final assessment interview rather than a single multiple-choice license test. UniPrep2Go’s MRICS readiness check helps candidates rehearse competency-style application and ethics scenarios before interview evidence writing. Confirm current APC guides with RICS for your pathway.",
    administeredBy: "Royal Institution of Chartered Surveyors (RICS)",
    officialFormat:
      "APC structured training, written submissions, and final assessment interview (pathway-dependent). This UniPrep2Go check is an MCQ-style diagnostic aid, not the APC interview.",
    whoFor:
      "Surveyors and quantity-surveying candidates on RICS APC pathways who need timed practice on ethics, mandatory competencies, and technical application before final assessment.",
    howToPrepare:
      "Map your pathway competencies, draft Level 2/3 examples, take this free UniPrep2Go timed MRICS readiness check for judgment gaps, then repair weak competency themes with the linked Anki deck while you refine written APC evidence.",
    topicBlurbs: [
      {
        id: "mandatory-competencies",
        label: "Mandatory competencies",
        blurb: "Personal and business skills RICS expects across pathways.",
      },
      {
        id: "ethics-rules-conduct",
        label: "Ethics & rules of conduct",
        blurb: "RICS ethics, rules of conduct, and professionalism scenarios.",
      },
      {
        id: "core-technical-pathway",
        label: "Core technical competencies",
        blurb: "Pathway technical knowledge at Level 1 depth.",
      },
      {
        id: "level2-level3-application",
        label: "Level 2/3 application",
        blurb: "Application and reasoned advice judgment for APC evidence.",
      },
      {
        id: "case-study-interview",
        label: "Case study & interview",
        blurb: "Case study, submission, and final interview preparation themes.",
      },
    ],
    examFaqs: [
      {
        question: "What is the MRICS APC?",
        answer:
          "APC is RICS’s Assessment of Professional Competence pathway to MRICS membership, combining experience, written evidence, and a final assessment interview.",
      },
      {
        question: "Is this an official RICS assessment?",
        answer:
          "No. UniPrep2Go provides independent practice diagnostics — not official RICS APC materials or interview scripts.",
      },
      {
        question: "Who should use this MRICS readiness check?",
        answer:
          "APC candidates who want timed competency-style practice while preparing written submissions and interview examples.",
      },
      {
        question: "Does MRICS use a multiple-choice exam?",
        answer:
          "APC centers on structured assessment and interview. This MCQ readiness check is a UniPrep2Go study aid for judgment practice, not a substitute for APC.",
      },
      {
        question: "How should I prepare for MRICS APC?",
        answer:
          "Follow your RICS pathway guide, write competency examples, practice ethics scenarios, take a timed diagnostic, and refine interview evidence from weak topics.",
      },
      {
        question: "Is there a free MRICS practice test?",
        answer:
          "Yes — take the free UniPrep2Go timed MRICS readiness check on this page.",
      },
    ],
    keywords: [
      "mrics practice questions",
      "mrics apc practice test",
      "free mrics practice test",
      "rics apc practice exam",
    ],
  }),
  "california-real-estate-readiness-check": explainer({
    practiceTestName: "California Real Estate Practice Test",
    whatIsExam:
      "The California real estate salesperson exam is the state licensing knowledge test administered under the California Department of Real Estate (DRE) after required education. It covers practice and disclosures, agency, ownership and land use, valuation, contracts, financing, and transfer of property. Passing is required before DRE can issue a salesperson license. Confirm current outlines, education, and scheduling on official DRE materials.",
    administeredBy: "California Department of Real Estate (DRE)",
    officialFormat:
      "Timed multiple-choice licensing exam; confirm current question count and cut score with California DRE.",
    whoFor:
      "California salesperson candidates who completed required pre-license education and need a timed diagnostic before the official DRE exam.",
    howToPrepare:
      "Study the DRE salesperson outline domains, drill disclosure and agency scenarios, take this free UniPrep2Go timed California readiness check, then repair weak domains with the linked Anki deck.",
    topicBlurbs: [
      { id: "ca-practice", label: "Practice & disclosures", blurb: "California practice standards and disclosure timing." },
      { id: "ca-agency", label: "Agency", blurb: "Fiduciary duties and agency relationships under California rules." },
      { id: "ca-ownership", label: "Ownership & land use", blurb: "Property rights, estates, and land-use controls." },
      { id: "ca-valuation", label: "Valuation", blurb: "Market analysis and appraisal-related concepts." },
      { id: "ca-contracts", label: "Contracts", blurb: "Contract formation and contingency themes." },
      { id: "ca-financing", label: "Financing", blurb: "Loan instruments and California financing basics." },
      { id: "ca-transfer", label: "Transfer", blurb: "Deeds, title, and transfer of property steps." },
    ],
    examFaqs: [
      {
        question: "What is the California real estate exam?",
        answer:
          "It is California DRE’s salesperson licensing exam after required education, covering practice, agency, ownership, valuation, contracts, financing, and transfer.",
      },
      {
        question: "Is this the official California DRE exam?",
        answer:
          "No. UniPrep2Go provides independent timed practice only.",
      },
      {
        question: "Do I need education before the California exam?",
        answer:
          "Yes — California requires approved education before exam eligibility. Confirm current courses with DRE.",
      },
      {
        question: "What topics are on the California salesperson exam?",
        answer:
          "Practice/disclosures, agency, ownership/land use, valuation, contracts, financing, and transfer of property — verify weights with DRE.",
      },
      {
        question: "How should I prepare for the California real estate exam?",
        answer:
          "Finish required courses, drill disclosure and math-heavy domains, take a timed mock, then repair weak topics before scheduling DRE.",
      },
      {
        question: "Is there a free California real estate practice test?",
        answer:
          "Yes — take the free UniPrep2Go timed California real estate readiness check on this page.",
      },
    ],
    keywords: [
      "california real estate practice test",
      "california dre practice exam",
      "free california real estate practice test",
      "ca salesperson practice test",
    ],
  }),
};

export function getNicheExamExplainer(slug: string): NicheExamExplainer | null {
  return (
    nicheExamExplainers[slug] ??
    wave3ExamExplainers[slug] ??
    wave4ExamExplainers[slug] ??
    null
  );
}
