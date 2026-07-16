import type { MockExamConfig, MockTopic } from "./types";

const nicheDisclaimer =
  "This is an independent readiness diagnostic from UniPrep2Go. It is not official exam-board material and does not award certification or guarantee a passing score.";

/** Compact niche mock: 60 scored items (4 × 15) — timed diagnostic, not a 200-card sale bank. */
const WAVE1_TOPIC_QUESTIONS = 15;
const WAVE1_SESSION_QUESTIONS = WAVE1_TOPIC_QUESTIONS * 4;

function fourTopics(
  topics: Array<{ id: string; label: string }>,
  targetPercent = 70,
): MockTopic[] {
  return topics.map((topic) => ({
    ...topic,
    questionCount: WAVE1_TOPIC_QUESTIONS,
    weightPercent: 25,
    targetPercent,
  }));
}

function readinessConfig(
  partial: Omit<MockExamConfig, "accessMode" | "passRule" | "disclaimer" | "lastUpdated" | "status"> & {
    status?: MockExamConfig["status"];
    passPercent?: number;
  },
): MockExamConfig {
  const { passPercent = 70, status = "live", ...rest } = partial;
  return {
    ...rest,
    accessMode: "free_demand_test",
    status,
    disclaimer: nicheDisclaimer,
    lastUpdated: "2026-07-16",
    passRule: {
      type: "readiness_check",
      passPercent,
      borderlinePercent: passPercent - 5,
      verdictLabels: {
        pass: "READINESS PASS",
        noPass: "NO PASS",
        borderline: "BORDERLINE RISK",
      },
    },
  };
}

/**
 * Wave 1 US niche mocks — text-only MCQ (no image/audio items).
 * Skipped from roadmap (need diagrams/strips): nha-cet-ekg, arrt-radiography, danb-rhs.
 */
export const wave1MockExamConfigs: MockExamConfig[] = [
  readinessConfig({
    slug: "cdl-general-knowledge-readiness-check",
    title: "CDL General Knowledge Readiness Check",
    shortTitle: "CDL General Knowledge",
    linkedDeckSlug: "cdl-general-knowledge-anki-deck",
    durationMinutes: 75,
    questionCount: WAVE1_SESSION_QUESTIONS,
    topics: fourTopics([
      { id: "vehicle-systems", label: "Vehicle systems & inspection" },
      { id: "safe-driving", label: "Safe driving & space management" },
      { id: "cargo", label: "Cargo securement & weight" },
      { id: "emergencies-rules", label: "Emergencies, hours & rules" },
    ]),
    officialSourceNote:
      "Readiness check aligned to FMCSA Commercial Driver's Manual general-knowledge topics. Not a state DMV or FMCSA exam.",
    description:
      "A free 60-question CDL General Knowledge readiness check with topic scoring across vehicle systems, safe driving, cargo, and rules — for CLP / Class A–B knowledge prep.",
    examBody: "State DMV / FMCSA",
    questionSourceNote: "Original UniPrep2Go local bank aligned to FMCSA handbook topics.",
  }),
  readinessConfig({
    slug: "nha-ccma-readiness-check",
    title: "NHA CCMA Clinical Medical Assistant Readiness Check",
    shortTitle: "NHA CCMA",
    linkedDeckSlug: "nha-ccma-anki-deck",
    durationMinutes: 60,
    questionCount: WAVE1_SESSION_QUESTIONS,
    topics: fourTopics([
      { id: "clinical-patient-care", label: "Clinical patient care" },
      { id: "phlebotomy-ekg", label: "Phlebotomy & EKG basics (text)" },
      { id: "safety-infection", label: "Safety & infection control" },
      { id: "admin-communication", label: "Admin, EHR & communication" },
    ]),
    officialSourceNote:
      "Readiness check mapped to NHA CCMA domain themes. Not an NHA certification exam.",
    description:
      "Free 60-question NHA CCMA readiness check with domain scoring for clinical medical assistant candidates.",
    examBody: "NHA",
    questionSourceNote: "Original UniPrep2Go local bank for CCMA knowledge domains.",
  }),
  readinessConfig({
    slug: "nremt-emt-readiness-check",
    title: "NREMT EMT Readiness Check",
    shortTitle: "NREMT EMT",
    linkedDeckSlug: "nremt-emt-anki-deck",
    durationMinutes: 60,
    questionCount: WAVE1_SESSION_QUESTIONS,
    topics: fourTopics([
      { id: "airway-respiration", label: "Airway, respiration & ventilation" },
      { id: "cardiology-resuscitation", label: "Cardiology & resuscitation" },
      { id: "trauma", label: "Trauma" },
      { id: "medical-ops", label: "Medical & EMS operations" },
    ]),
    officialSourceNote:
      "Readiness check aligned to NREMT EMT cognitive domains. Not an NREMT certification exam.",
    description:
      "Free 60-question NREMT EMT readiness check with topic scoring across airway, cardiology, trauma, and medical/ops.",
    examBody: "NREMT",
    questionSourceNote: "Original UniPrep2Go local bank for EMT cognitive topics.",
  }),
  readinessConfig({
    slug: "nha-cpt-phlebotomy-readiness-check",
    title: "NHA CPT Phlebotomy Technician Readiness Check",
    shortTitle: "NHA CPT Phlebotomy",
    linkedDeckSlug: "nha-cpt-phlebotomy-anki-deck",
    durationMinutes: 50,
    questionCount: WAVE1_SESSION_QUESTIONS,
    topics: fourTopics([
      { id: "circulatory-anatomy", label: "Circulatory system & anatomy" },
      { id: "collection-equipment", label: "Collection equipment & order of draw" },
      { id: "specimen-handling", label: "Specimen handling & processing" },
      { id: "safety-patient", label: "Safety, infection & patient care" },
    ]),
    officialSourceNote:
      "Readiness check mapped to NHA CPT phlebotomy themes. Not an NHA certification exam.",
    description:
      "Free 60-question NHA CPT phlebotomy readiness check with domain scoring for phlebotomy technician candidates.",
    examBody: "NHA",
    questionSourceNote: "Original UniPrep2Go local bank for CPT phlebotomy topics.",
  }),
  readinessConfig({
    slug: "fl-real-estate-readiness-check",
    title: "Florida Real Estate Sales Associate Readiness Check",
    shortTitle: "Florida Real Estate",
    linkedDeckSlug: "fl-real-estate-anki-deck",
    durationMinutes: 75,
    questionCount: WAVE1_SESSION_QUESTIONS,
    topics: fourTopics([
      { id: "license-law", label: "License law & FREC rules" },
      { id: "contracts-titles", label: "Contracts, titles & conveyances" },
      { id: "finance-appraisal", label: "Finance, appraisal & math" },
      { id: "property-practice", label: "Property, brokerage & practice" },
    ]),
    officialSourceNote:
      "Readiness check aligned to Florida DBPR / FREC sales associate knowledge areas. Not a state licensing exam.",
    description:
      "Free 60-question Florida real estate sales associate readiness check with topic scoring for FREC candidates.",
    examBody: "DBPR / Florida Real Estate Commission",
    questionSourceNote: "Original UniPrep2Go local bank for Florida RE topics.",
  }),
  readinessConfig({
    slug: "tx-real-estate-readiness-check",
    title: "Texas Real Estate Salesperson Readiness Check",
    shortTitle: "Texas Real Estate",
    linkedDeckSlug: "tx-real-estate-anki-deck",
    durationMinutes: 75,
    questionCount: WAVE1_SESSION_QUESTIONS,
    topics: fourTopics([
      { id: "license-law", label: "TRELA / TREC license law" },
      { id: "contracts-agency", label: "Contracts & agency" },
      { id: "finance-closing", label: "Finance, closing & math" },
      { id: "property-practice", label: "Property, land & practice" },
    ]),
    officialSourceNote:
      "Readiness check aligned to TREC salesperson knowledge areas. Not a Texas licensing exam.",
    description:
      "Free 60-question Texas real estate salesperson readiness check with topic scoring for TREC candidates.",
    examBody: "TREC",
    questionSourceNote: "Original UniPrep2Go local bank for Texas RE topics.",
  }),
  readinessConfig({
    slug: "aapc-cpc-readiness-check",
    title: "AAPC CPC Medical Coding Readiness Check",
    shortTitle: "AAPC CPC",
    linkedDeckSlug: "aapc-cpc-anki-deck",
    durationMinutes: 75,
    questionCount: WAVE1_SESSION_QUESTIONS,
    topics: fourTopics([
      { id: "coding-guidelines", label: "ICD-10-CM / CPT guidelines" },
      { id: "evaluation-management", label: "Evaluation & management" },
      { id: "surgery-anesthesia", label: "Surgery & anesthesia coding" },
      { id: "compliance-billing", label: "Compliance, HCPCS & billing" },
    ]),
    officialSourceNote:
      "Readiness check mapped to AAPC CPC knowledge domains (text scenarios; no code books required for this diagnostic). Not an AAPC certification exam.",
    description:
      "Free 60-question AAPC CPC readiness check with domain scoring for medical coding candidates.",
    examBody: "AAPC",
    questionSourceNote: "Original UniPrep2Go local bank for CPC concept/guideline topics.",
  }),
  readinessConfig({
    slug: "mblex-readiness-check",
    title: "MBLEx Massage Therapy Readiness Check",
    shortTitle: "MBLEx",
    linkedDeckSlug: "mblex-anki-deck",
    durationMinutes: 60,
    questionCount: WAVE1_SESSION_QUESTIONS,
    topics: fourTopics([
      { id: "anatomy-physiology", label: "Anatomy & physiology" },
      { id: "kinesiology", label: "Kinesiology & pathology" },
      { id: "assessment-treatment", label: "Client assessment & treatment" },
      { id: "ethics-business", label: "Ethics, laws & business" },
    ]),
    officialSourceNote:
      "Readiness check aligned to FSMTB MBLEx content outline themes. Not an FSMTB exam.",
    description:
      "Free 60-question MBLEx readiness check with topic scoring for massage therapy licensure candidates.",
    examBody: "FSMTB",
    questionSourceNote: "Original UniPrep2Go local bank for MBLEx topics.",
  }),
  readinessConfig({
    slug: "nha-cpct-readiness-check",
    title: "NHA CPCT/A Patient Care Technician Readiness Check",
    shortTitle: "NHA CPCT/A",
    linkedDeckSlug: "nha-cpct-anki-deck",
    durationMinutes: 60,
    questionCount: WAVE1_SESSION_QUESTIONS,
    topics: fourTopics([
      { id: "patient-care", label: "Patient care & ADLs" },
      { id: "safety-infection", label: "Safety & infection control" },
      { id: "phlebotomy-ekg", label: "Phlebotomy & EKG basics (text)" },
      { id: "professional-practice", label: "Professional practice & communication" },
    ]),
    officialSourceNote:
      "Readiness check mapped to NHA CPCT/A themes. Not an NHA certification exam.",
    description:
      "Free 60-question NHA CPCT/A readiness check with domain scoring for patient care technician candidates.",
    examBody: "NHA",
    questionSourceNote: "Original UniPrep2Go local bank for CPCT topics.",
  }),
  readinessConfig({
    slug: "nha-excpt-readiness-check",
    title: "NHA ExCPT Pharmacy Technician Readiness Check",
    shortTitle: "NHA ExCPT",
    linkedDeckSlug: "nha-excpt-anki-deck",
    durationMinutes: 75,
    questionCount: WAVE1_SESSION_QUESTIONS,
    topics: fourTopics([
      { id: "pharmacology", label: "Pharmacology & medications" },
      { id: "federal-law", label: "Federal requirements & law" },
      { id: "order-entry", label: "Order entry & prescriptions" },
      { id: "dispensing-practice", label: "Dispensing & sterile/nonsterile practice" },
    ]),
    officialSourceNote:
      "Readiness check mapped to NHA ExCPT themes (distinct from PTCB PTCE). Not an NHA certification exam.",
    description:
      "Free 60-question NHA ExCPT pharmacy technician readiness check with domain scoring.",
    examBody: "NHA",
    questionSourceNote: "Original UniPrep2Go local bank for ExCPT topics.",
  }),
  readinessConfig({
    slug: "nremt-paramedic-readiness-check",
    title: "NREMT Paramedic Readiness Check",
    shortTitle: "NREMT Paramedic",
    linkedDeckSlug: "nremt-paramedic-anki-deck",
    durationMinutes: 75,
    questionCount: WAVE1_SESSION_QUESTIONS,
    topics: fourTopics([
      { id: "airway-critical", label: "Airway & critical care" },
      { id: "cardiology", label: "Cardiology & ACLS concepts" },
      { id: "trauma-medical", label: "Trauma & medical emergencies" },
      { id: "ops-special", label: "Operations & special populations" },
    ]),
    officialSourceNote:
      "Readiness check aligned to NREMT Paramedic cognitive themes. Not an NREMT certification exam.",
    description:
      "Free 60-question NREMT Paramedic readiness check with topic scoring for advanced EMS candidates.",
    examBody: "NREMT",
    questionSourceNote: "Original UniPrep2Go local bank for Paramedic cognitive topics.",
  }),
  readinessConfig({
    slug: "danb-ice-readiness-check",
    title: "DANB ICE Infection Control Readiness Check",
    shortTitle: "DANB ICE",
    linkedDeckSlug: "danb-ice-anki-deck",
    durationMinutes: 45,
    questionCount: WAVE1_SESSION_QUESTIONS,
    topics: fourTopics([
      { id: "standard-precautions", label: "Standard precautions & PPE" },
      { id: "instrument-processing", label: "Instrument processing & sterilization" },
      { id: "environmental", label: "Environmental infection control" },
      { id: "occupational", label: "Occupational safety & regulations" },
    ]),
    officialSourceNote:
      "Readiness check mapped to DANB ICE infection-control themes. Not a DANB exam.",
    description:
      "Free 60-question DANB ICE infection control readiness check for dental assisting candidates.",
    examBody: "DANB",
    questionSourceNote: "Original UniPrep2Go local bank for ICE topics.",
  }),
  readinessConfig({
    slug: "crcst-readiness-check",
    title: "HSPA CRCST Sterile Processing Readiness Check",
    shortTitle: "CRCST",
    linkedDeckSlug: "crcst-anki-deck",
    durationMinutes: 60,
    questionCount: WAVE1_SESSION_QUESTIONS,
    topics: fourTopics([
      { id: "decontamination", label: "Decontamination & cleaning" },
      { id: "assembly-packaging", label: "Assembly & packaging" },
      { id: "sterilization", label: "Sterilization methods & monitoring" },
      { id: "storage-distribution", label: "Storage, distribution & quality" },
    ]),
    officialSourceNote:
      "Readiness check aligned to HSPA CRCST knowledge themes. Not an HSPA/IAHCSMM exam.",
    description:
      "Free 60-question CRCST sterile processing readiness check with domain scoring.",
    examBody: "HSPA (IAHCSMM)",
    questionSourceNote: "Original UniPrep2Go local bank for CRCST topics.",
  }),
  readinessConfig({
    slug: "nha-cmaa-readiness-check",
    title: "NHA CMAA Medical Administrative Assistant Readiness Check",
    shortTitle: "NHA CMAA",
    linkedDeckSlug: "nha-cmaa-anki-deck",
    durationMinutes: 50,
    questionCount: WAVE1_SESSION_QUESTIONS,
    topics: fourTopics([
      { id: "scheduling-front", label: "Scheduling & front office" },
      { id: "medical-records", label: "Medical records & HIPAA" },
      { id: "billing-coding-basics", label: "Billing & coding basics" },
      { id: "communication-ethics", label: "Communication & ethics" },
    ]),
    officialSourceNote:
      "Readiness check mapped to NHA CMAA themes. Not an NHA certification exam.",
    description:
      "Free 60-question NHA CMAA readiness check for medical administrative assistant candidates.",
    examBody: "NHA",
    questionSourceNote: "Original UniPrep2Go local bank for CMAA topics.",
  }),
  readinessConfig({
    slug: "ardms-spi-readiness-check",
    title: "ARDMS SPI Sonography Principles Readiness Check",
    shortTitle: "ARDMS SPI",
    linkedDeckSlug: "ardms-spi-anki-deck",
    durationMinutes: 75,
    questionCount: WAVE1_SESSION_QUESTIONS,
    topics: fourTopics([
      { id: "physics-basics", label: "Ultrasound physics basics" },
      { id: "transducers-beam", label: "Transducers & beam formation" },
      { id: "doppler-hemodynamics", label: "Doppler & hemodynamics" },
      { id: "artifacts-safety", label: "Artifacts, quality & safety" },
    ]),
    officialSourceNote:
      "Text/physics readiness check aligned to ARDMS SPI themes (no image interpretation items). Not an ARDMS exam.",
    description:
      "Free 60-question ARDMS SPI readiness check focused on ultrasound physics and instrumentation concepts.",
    examBody: "ARDMS",
    questionSourceNote: "Original UniPrep2Go local bank for SPI physics topics.",
  }),
  readinessConfig({
    slug: "nbstsa-cst-readiness-check",
    title: "NBSTSA CST Surgical Technologist Readiness Check",
    shortTitle: "NBSTSA CST",
    linkedDeckSlug: "nbstsa-cst-anki-deck",
    durationMinutes: 75,
    questionCount: WAVE1_SESSION_QUESTIONS,
    topics: fourTopics([
      { id: "perioperative", label: "Perioperative care" },
      { id: "asepsis-sterile", label: "Asepsis & sterile technique" },
      { id: "anatomy-surg", label: "Surgical anatomy & procedures" },
      { id: "equipment-safety", label: "Equipment, counts & safety" },
    ]),
    officialSourceNote:
      "Readiness check mapped to NBSTSA CST knowledge themes. Not an NBSTSA exam.",
    description:
      "Free 60-question CST surgical technologist readiness check with domain scoring.",
    examBody: "NBSTSA",
    questionSourceNote: "Original UniPrep2Go local bank for CST topics.",
  }),
  readinessConfig({
    slug: "vtne-readiness-check",
    title: "VTNE Veterinary Technician Readiness Check",
    shortTitle: "VTNE",
    linkedDeckSlug: "vtne-anki-deck",
    durationMinutes: 75,
    questionCount: WAVE1_SESSION_QUESTIONS,
    topics: fourTopics([
      { id: "pharmacy-pharm", label: "Pharmacy & pharmacology" },
      { id: "surgical-nursing", label: "Surgical nursing & anesthesia" },
      { id: "diagnostics", label: "Diagnostics & lab" },
      { id: "animal-care", label: "Animal care, dentistry & imaging" },
    ]),
    officialSourceNote:
      "Readiness check aligned to AAVSB VTNE domain themes. Not an AAVSB exam.",
    description:
      "Free 60-question VTNE readiness check with domain scoring for veterinary technician candidates.",
    examBody: "AAVSB",
    questionSourceNote: "Original UniPrep2Go local bank for VTNE topics.",
  }),
];

export const wave1MockSlugs = wave1MockExamConfigs.map((c) => c.slug);

export const WAVE1_SKIPPED_NEED_IMAGES = [
  "nha-cet-ekg",
  "arrt-radiography",
  "danb-rhs",
] as const;
