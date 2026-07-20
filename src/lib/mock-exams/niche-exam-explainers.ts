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
      "The NHA Certified Phlebotomy Technician (CPT) exam certifies blood-draw technicians who collect specimens, handle tubes, and follow safety and patient-ID protocols. It is a common entry credential for hospital and outpatient lab phlebotomy jobs.",
    administeredBy: "National Healthcareer Association (NHA)",
    examFaqs: [
      {
        question: "What is the NHA CPT phlebotomy exam?",
        answer:
          "It is NHA’s certification exam for phlebotomy technicians covering venipuncture, specimen handling, safety, and patient care.",
      },
    ],
    keywords: ["nha cpt practice test", "phlebotomy practice test", "certified phlebotomy technician exam"],
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
      "The Florida real estate salesperson exam is the state licensing test required (after pre-license education) to become a licensed sales associate in Florida. It covers real estate principles, Florida license law, and math. The Florida DBPR / testing vendor administers the official exam.",
    administeredBy: "Florida DBPR via the state’s exam vendor",
    examFaqs: [
      {
        question: "What is the Florida real estate exam?",
        answer:
          "It is Florida’s salesperson licensing exam. Candidates usually complete approved pre-license coursework, then pass the state exam before activating a license with a broker.",
      },
    ],
    keywords: [
      "florida real estate practice test",
      "florida real estate exam questions",
      "fl sales associate practice exam",
    ],
  }),
  "tx-real-estate-readiness-check": explainer({
    practiceTestName: "Texas Real Estate Practice Test",
    whatIsExam:
      "The Texas real estate salesperson exam is the licensing test for becoming a Texas sales agent after completing TREC-required education. It includes national real estate principles and Texas-specific law portions.",
    administeredBy: "Texas Real Estate Commission (TREC) via Pearson VUE",
    examFaqs: [
      {
        question: "What is the Texas real estate exam?",
        answer:
          "It is TREC’s salesperson licensing exam (national + state law sections) required to become a Texas real estate sales agent.",
      },
    ],
    keywords: ["texas real estate practice test", "trec practice exam", "texas sales agent practice test"],
  }),
  "ny-real-estate-readiness-check": explainer({
    practiceTestName: "New York Real Estate Practice Test",
    whatIsExam:
      "The New York real estate salesperson exam is the state licensing test after completing required qualifying education. It covers agency, contracts, finance, property ownership, and New York license law.",
    administeredBy: "New York Department of State via the exam vendor",
    examFaqs: [
      {
        question: "What is the New York real estate salesperson exam?",
        answer:
          "It is New York’s licensing exam for real estate salespersons, taken after completing state-required pre-license education hours.",
      },
    ],
    keywords: ["new york real estate practice test", "ny salesperson exam practice"],
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
};

export function getNicheExamExplainer(slug: string): NicheExamExplainer | null {
  return (
    nicheExamExplainers[slug] ??
    wave3ExamExplainers[slug] ??
    wave4ExamExplainers[slug] ??
    null
  );
}
