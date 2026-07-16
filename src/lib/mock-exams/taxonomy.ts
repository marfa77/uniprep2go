import type { MockClusterImageType } from "./cluster-images";
import type { MockExamConfig, MockExamConfigDraft, MockExamTaxonomy, MockVerticalId } from "./types";
import { wave3TaxonomyEntries } from "./wave3-taxonomy";

export type MockVerticalDefinition = {
  id: MockVerticalId;
  label: string;
  description: string;
  imageType: MockClusterImageType;
  /** Short SEO phrase for H1 / meta */
  seoTitle: string;
};

export const MOCK_VERTICALS: MockVerticalDefinition[] = [
  {
    id: "transport",
    label: "CDL & commercial driving",
    description: "General knowledge and endorsement readiness checks for commercial drivers.",
    imageType: "transport",
    seoTitle: "Free CDL Practice Tests",
  },
  {
    id: "allied-health",
    label: "Allied health certifications",
    description: "NHA, AAMA, dialysis, respiratory, and pharmacy technician practice tests.",
    imageType: "allied-health",
    seoTitle: "Free Allied Health Practice Tests",
  },
  {
    id: "ems",
    label: "EMS & emergency care",
    description: "NREMT EMT and Paramedic readiness checks.",
    imageType: "ems",
    seoTitle: "Free NREMT Practice Tests",
  },
  {
    id: "cpr",
    label: "CPR & BLS",
    description: "AHA BLS provider-style readiness checks.",
    imageType: "cpr",
    seoTitle: "Free BLS & CPR Practice Tests",
  },
  {
    id: "nursing",
    label: "Nursing & nurse aide",
    description: "NNAAP CNA and NCLEX-PN readiness checks.",
    imageType: "nursing",
    seoTitle: "Free CNA & PN Practice Tests",
  },
  {
    id: "real-estate",
    label: "State real estate licensing",
    description: "Florida, Texas, New York, and California salesperson readiness checks.",
    imageType: "real-estate",
    seoTitle: "Free Real Estate Practice Tests",
  },
  {
    id: "health-admin",
    label: "Medical coding & admin",
    description: "AAPC CPC and medical coding practice tests.",
    imageType: "health-admin",
    seoTitle: "Free Medical Coding Practice Tests",
  },
  {
    id: "bodywork",
    label: "Massage therapy",
    description: "MBLEx readiness checks for massage therapy licensure.",
    imageType: "bodywork",
    seoTitle: "Free MBLEx Practice Tests",
  },
  {
    id: "beauty",
    label: "Cosmetology & esthetics",
    description: "State cosmetology and esthetician written readiness checks.",
    imageType: "beauty",
    seoTitle: "Free Cosmetology Practice Tests",
  },
  {
    id: "fitness",
    label: "Personal training",
    description: "NASM, ISSA, and ACE CPT practice tests.",
    imageType: "fitness",
    seoTitle: "Free CPT Practice Tests",
  },
  {
    id: "dental",
    label: "Dental assisting & hygiene",
    description: "DANB ICE/GC and NBDHE readiness checks.",
    imageType: "dental",
    seoTitle: "Free Dental Practice Tests",
  },
  {
    id: "surgical",
    label: "Surgical & sterile processing",
    description: "CRCST and NBSTSA CST readiness checks.",
    imageType: "surgical",
    seoTitle: "Free Sterile Processing & CST Practice Tests",
  },
  {
    id: "imaging",
    label: "Diagnostic imaging physics",
    description: "ARDMS SPI physics readiness checks.",
    imageType: "imaging",
    seoTitle: "Free ARDMS SPI Practice Tests",
  },
  {
    id: "lab",
    label: "Medical laboratory",
    description: "ASCP MLS readiness checks.",
    imageType: "lab",
    seoTitle: "Free ASCP MLS Practice Tests",
  },
  {
    id: "nutrition",
    label: "Nutrition & dietetics",
    description: "Registered Dietitian exam readiness checks.",
    imageType: "nutrition",
    seoTitle: "Free RD Exam Practice Tests",
  },
  {
    id: "social-work",
    label: "Social work licensure",
    description: "ASWB Masters readiness checks.",
    imageType: "social-work",
    seoTitle: "Free ASWB Practice Tests",
  },
  {
    id: "education",
    label: "Early childhood education",
    description: "CDA childcare readiness checks.",
    imageType: "education",
    seoTitle: "Free CDA Practice Tests",
  },
  {
    id: "trades",
    label: "Trades & applicator licenses",
    description: "Pest control applicator and related trade licenses.",
    imageType: "trades",
    seoTitle: "Free Trade License Practice Tests",
  },
  {
    id: "veterinary",
    label: "Veterinary technician",
    description: "VTNE readiness checks.",
    imageType: "veterinary",
    seoTitle: "Free VTNE Practice Tests",
  },
  {
    id: "licensing",
    label: "US licensing & insurance",
    description: "FINRA securities, insurance, ServSafe, and US citizenship practice tests.",
    imageType: "licensing",
    seoTitle: "Free US Licensing Practice Tests",
  },
  {
    id: "finance",
    label: "Finance credentials",
    description: "CFA, FRM, GMAT, GRE, and SAT readiness checks.",
    imageType: "finance",
    seoTitle: "Free Finance Credential Practice Tests",
  },
  {
    id: "building",
    label: "Building & sustainability",
    description: "EPA 608, LEED, WELL, PMP, MRICS, and related building certs.",
    imageType: "building",
    seoTitle: "Free Building Certification Practice Tests",
  },
];

export const MOCK_FAMILY_LABELS: Record<string, string> = {
  cdl: "CDL general knowledge",
  "cdl-endorsements": "CDL endorsements",
  nha: "NHA certifications",
  aama: "AAMA CMA",
  dialysis: "Dialysis (CCHT)",
  respiratory: "Respiratory therapy",
  pharmacy: "Pharmacy technician",
  nremt: "NREMT",
  aha: "AHA BLS",
  "nurse-aide": "Nurse aide (CNA)",
  "practical-nursing": "Practical nursing (PN)",
  "state-re": "State real estate",
  coding: "Medical coding",
  mblex: "MBLEx",
  cosmetology: "Cosmetology",
  esthetics: "Esthetics",
  cpt: "Personal training (CPT)",
  danb: "DANB",
  hygiene: "Dental hygiene",
  sterile: "Sterile processing",
  "surgical-tech": "Surgical technology",
  ultrasound: "Ultrasound physics",
  ascp: "ASCP laboratory",
  rd: "Registered dietitian",
  aswb: "ASWB",
  cda: "CDA childcare",
  pest: "Pest control",
  vtne: "VTNE",
  finra: "FINRA securities",
  insurance: "Insurance licensing",
  "food-safety": "Food safety",
  citizenship: "US citizenship",
  cfa: "CFA",
  frm: "FRM",
  admissions: "Admissions tests",
  hvac: "HVAC & refrigerants",
  leed: "LEED",
  well: "WELL",
  energy: "Energy management",
  ashrae: "ASHRAE",
  datacenter: "Data center",
  safety: "Safety & fire",
  rics: "RICS / MRICS",
  pmp: "Project management",
  bms: "Building automation",
  "rn-licensure": "RN licensure (NCLEX-RN)",
  "med-aide": "Medication aide",
  hha: "Home health aide",
  aba: "ABA / RBT",
  scribe: "Medical scribe",
  "rehab-aide": "Rehab aide",
  optician: "Optician (ABO)",
  "nutrition-coach": "Nutrition coaching",
  cscs: "Strength & conditioning (CSCS)",
  nails: "Nail technology",
  barber: "Barbering",
  hr: "Human resources",
  "six-sigma": "Six Sigma",
  tax: "Tax (Enrolled Agent)",
  praxis: "Praxis",
  parapro: "ParaPro",
  security: "Security officer",
  notary: "Notary public",
  osha: "OSHA / workplace safety",
  mlo: "Mortgage loan originator",
  water: "Water / wastewater",
  appraisal: "Real estate appraisal",
  funeral: "Funeral service",
  solar: "Solar (NABCEP)",
  "vet-assistant": "Veterinary assistant",
};

type TaxonomyEntry = MockExamTaxonomy;

const TAXONOMY_BY_SLUG: Record<string, TaxonomyEntry> = {
  "cdl-general-knowledge-readiness-check": {
    verticalId: "transport",
    familyId: "cdl",
    searchAliases: ["CDL", "CDL GK", "CLP", "commercial driver"],
  },
  "cdl-hazmat-readiness-check": {
    verticalId: "transport",
    familyId: "cdl-endorsements",
    searchAliases: ["CDL HazMat", "H endorsement"],
  },
  "cdl-passenger-readiness-check": {
    verticalId: "transport",
    familyId: "cdl-endorsements",
    searchAliases: ["CDL passenger", "P endorsement"],
  },
  "cdl-school-bus-readiness-check": {
    verticalId: "transport",
    familyId: "cdl-endorsements",
    searchAliases: ["CDL school bus", "S endorsement"],
  },
  "nha-ccma-readiness-check": {
    verticalId: "allied-health",
    familyId: "nha",
    searchAliases: ["CCMA", "clinical medical assistant"],
  },
  "nha-cpt-phlebotomy-readiness-check": {
    verticalId: "allied-health",
    familyId: "nha",
    searchAliases: ["NHA CPT", "phlebotomy"],
  },
  "nha-cpct-readiness-check": {
    verticalId: "allied-health",
    familyId: "nha",
    searchAliases: ["CPCT", "patient care technician"],
  },
  "nha-excpt-readiness-check": {
    verticalId: "allied-health",
    familyId: "nha",
    searchAliases: ["ExCPT", "NHA pharmacy"],
  },
  "nha-cmaa-readiness-check": {
    verticalId: "allied-health",
    familyId: "nha",
    searchAliases: ["CMAA", "medical administrative assistant"],
  },
  "nha-cbcs-readiness-check": {
    verticalId: "allied-health",
    familyId: "nha",
    searchAliases: ["CBCS", "billing and coding"],
  },
  "ccht-dialysis-readiness-check": {
    verticalId: "allied-health",
    familyId: "dialysis",
    searchAliases: ["CCHT", "dialysis"],
  },
  "aama-cma-readiness-check": {
    verticalId: "allied-health",
    familyId: "aama",
    searchAliases: ["AAMA CMA", "certified medical assistant"],
  },
  "nbrc-tmc-readiness-check": {
    verticalId: "allied-health",
    familyId: "respiratory",
    searchAliases: ["TMC", "NBRC", "respiratory therapy"],
  },
  "ptcb-pharmacy-technician-mock": {
    verticalId: "allied-health",
    familyId: "pharmacy",
    searchAliases: ["PTCB", "PTCE", "pharmacy tech"],
  },
  "nremt-emt-readiness-check": {
    verticalId: "ems",
    familyId: "nremt",
    searchAliases: ["EMT", "NREMT EMT"],
  },
  "nremt-paramedic-readiness-check": {
    verticalId: "ems",
    familyId: "nremt",
    searchAliases: ["paramedic", "NREMT paramedic"],
  },
  "aha-bls-provider-readiness-check": {
    verticalId: "cpr",
    familyId: "aha",
    searchAliases: ["BLS", "CPR", "AHA"],
  },
  "nnaap-cna-readiness-check": {
    verticalId: "nursing",
    familyId: "nurse-aide",
    searchAliases: ["CNA", "NNAAP", "nurse aide"],
  },
  "nclex-pn-readiness-check": {
    verticalId: "nursing",
    familyId: "practical-nursing",
    searchAliases: ["NCLEX-PN", "LPN", "LVN"],
  },
  "fl-real-estate-readiness-check": {
    verticalId: "real-estate",
    familyId: "state-re",
    searchAliases: ["Florida real estate", "FL RE"],
  },
  "tx-real-estate-readiness-check": {
    verticalId: "real-estate",
    familyId: "state-re",
    searchAliases: ["Texas real estate", "TX RE"],
  },
  "ny-real-estate-readiness-check": {
    verticalId: "real-estate",
    familyId: "state-re",
    searchAliases: ["New York real estate", "NY RE"],
  },
  "california-real-estate-readiness-check": {
    verticalId: "real-estate",
    familyId: "state-re",
    searchAliases: ["California real estate", "CA RE"],
  },
  "aapc-cpc-readiness-check": {
    verticalId: "health-admin",
    familyId: "coding",
    searchAliases: ["CPC", "AAPC", "medical coding"],
  },
  "mblex-readiness-check": {
    verticalId: "bodywork",
    familyId: "mblex",
    searchAliases: ["MBLEx", "massage therapy"],
  },
  "cosmetology-state-readiness-check": {
    verticalId: "beauty",
    familyId: "cosmetology",
    searchAliases: ["cosmetology", "cosmetologist"],
  },
  "esthetician-state-readiness-check": {
    verticalId: "beauty",
    familyId: "esthetics",
    searchAliases: ["esthetician", "esthetics"],
  },
  "nasm-cpt-readiness-check": {
    verticalId: "fitness",
    familyId: "cpt",
    searchAliases: ["NASM", "NASM CPT"],
  },
  "issa-cpt-readiness-check": {
    verticalId: "fitness",
    familyId: "cpt",
    searchAliases: ["ISSA", "ISSA CPT"],
  },
  "ace-cpt-readiness-check": {
    verticalId: "fitness",
    familyId: "cpt",
    searchAliases: ["ACE", "ACE CPT"],
  },
  "danb-ice-readiness-check": {
    verticalId: "dental",
    familyId: "danb",
    searchAliases: ["DANB ICE", "infection control"],
  },
  "danb-gc-readiness-check": {
    verticalId: "dental",
    familyId: "danb",
    searchAliases: ["DANB GC", "general chairside"],
  },
  "nbdhe-readiness-check": {
    verticalId: "dental",
    familyId: "hygiene",
    searchAliases: ["NBDHE", "dental hygiene"],
  },
  "crcst-readiness-check": {
    verticalId: "surgical",
    familyId: "sterile",
    searchAliases: ["CRCST", "sterile processing"],
  },
  "nbstsa-cst-readiness-check": {
    verticalId: "surgical",
    familyId: "surgical-tech",
    searchAliases: ["CST", "NBSTSA", "surgical tech"],
  },
  "ardms-spi-readiness-check": {
    verticalId: "imaging",
    familyId: "ultrasound",
    searchAliases: ["SPI", "ARDMS", "ultrasound physics"],
  },
  "ascp-mls-readiness-check": {
    verticalId: "lab",
    familyId: "ascp",
    searchAliases: ["MLS", "ASCP", "medical laboratory"],
  },
  "rd-exam-readiness-check": {
    verticalId: "nutrition",
    familyId: "rd",
    searchAliases: ["RD", "RDN", "dietitian"],
  },
  "aswb-masters-readiness-check": {
    verticalId: "social-work",
    familyId: "aswb",
    searchAliases: ["ASWB", "LMSW", "social work"],
  },
  "cda-childcare-readiness-check": {
    verticalId: "education",
    familyId: "cda",
    searchAliases: ["CDA", "childcare", "early childhood"],
  },
  "pest-control-applicator-readiness-check": {
    verticalId: "trades",
    familyId: "pest",
    searchAliases: ["pest control", "applicator"],
  },
  "vtne-readiness-check": {
    verticalId: "veterinary",
    familyId: "vtne",
    searchAliases: ["VTNE", "vet tech"],
  },
  "sie-full-mock": {
    verticalId: "licensing",
    familyId: "finra",
    searchAliases: ["SIE", "FINRA SIE"],
  },
  "series-7-readiness-check": {
    verticalId: "licensing",
    familyId: "finra",
    searchAliases: ["Series 7", "General Securities"],
  },
  "series-63-readiness-check": {
    verticalId: "licensing",
    familyId: "finra",
    searchAliases: ["Series 63"],
  },
  "life-and-health-insurance-readiness-check": {
    verticalId: "licensing",
    familyId: "insurance",
    searchAliases: ["life and health", "L&H insurance"],
  },
  "property-casualty-insurance-readiness-check": {
    verticalId: "licensing",
    familyId: "insurance",
    searchAliases: ["P&C", "property casualty"],
  },
  "servsafe-manager-mock": {
    verticalId: "licensing",
    familyId: "food-safety",
    searchAliases: ["ServSafe", "food manager"],
  },
  "us-citizenship-readiness-check": {
    verticalId: "licensing",
    familyId: "citizenship",
    searchAliases: ["USCIS", "civics", "naturalization"],
  },
  "cfa-level-1-readiness-check": {
    verticalId: "finance",
    familyId: "cfa",
    searchAliases: ["CFA L1", "CFA Level 1"],
  },
  "cfa-level-2-readiness-check": {
    verticalId: "finance",
    familyId: "cfa",
    searchAliases: ["CFA L2", "CFA Level 2"],
  },
  "frm-part-1-readiness-check": {
    verticalId: "finance",
    familyId: "frm",
    searchAliases: ["FRM", "FRM Part 1"],
  },
  "gmat-focus-readiness-check": {
    verticalId: "finance",
    familyId: "admissions",
    searchAliases: ["GMAT", "GMAT Focus"],
  },
  "gre-readiness-check": {
    verticalId: "finance",
    familyId: "admissions",
    searchAliases: ["GRE"],
  },
  "sat-readiness-check": {
    verticalId: "finance",
    familyId: "admissions",
    searchAliases: ["SAT", "Digital SAT"],
  },
  "epa-608-readiness-check": {
    verticalId: "building",
    familyId: "hvac",
    searchAliases: ["EPA 608", "refrigerant"],
  },
  "bms-bas-readiness-check": {
    verticalId: "building",
    familyId: "bms",
    searchAliases: ["BMS", "BAS", "building automation"],
  },
  "leed-green-associate-readiness-check": {
    verticalId: "building",
    familyId: "leed",
    searchAliases: ["LEED GA", "Green Associate"],
  },
  "leed-ap-bd-c-readiness-check": {
    verticalId: "building",
    familyId: "leed",
    searchAliases: ["LEED AP BD+C", "BD+C"],
  },
  "leed-ap-om-readiness-check": {
    verticalId: "building",
    familyId: "leed",
    searchAliases: ["LEED AP O+M", "O+M"],
  },
  "well-ap-readiness-check": {
    verticalId: "building",
    familyId: "well",
    searchAliases: ["WELL AP"],
  },
  "cem-readiness-check": {
    verticalId: "building",
    familyId: "energy",
    searchAliases: ["CEM", "energy manager"],
  },
  "ashrae-certifications-readiness-check": {
    verticalId: "building",
    familyId: "ashrae",
    searchAliases: ["ASHRAE", "BCxP", "BEMP"],
  },
  "cdcp-readiness-check": {
    verticalId: "building",
    familyId: "datacenter",
    searchAliases: ["CDCP", "data center"],
  },
  "nebosh-readiness-check": {
    verticalId: "building",
    familyId: "safety",
    searchAliases: ["NEBOSH"],
  },
  "cfps-readiness-check": {
    verticalId: "building",
    familyId: "safety",
    searchAliases: ["CFPS", "fire protection"],
  },
  "mrics-readiness-check": {
    verticalId: "building",
    familyId: "rics",
    searchAliases: ["MRICS", "RICS APC"],
  },
  "mrics-quantity-surveying-readiness-check": {
    verticalId: "building",
    familyId: "rics",
    searchAliases: ["MRICS QS", "quantity surveying"],
  },
  "pmp-readiness-check": {
    verticalId: "building",
    familyId: "pmp",
    searchAliases: ["PMP", "PMI"],
  },
};

export function getVerticalDefinition(id: MockVerticalId) {
  return MOCK_VERTICALS.find((vertical) => vertical.id === id);
}

export function getFamilyLabel(familyId: string) {
  return MOCK_FAMILY_LABELS[familyId] ?? familyId.replace(/-/g, " ");
}

const TAXONOMY_LOOKUP: Record<string, TaxonomyEntry> = {
  ...TAXONOMY_BY_SLUG,
  ...wave3TaxonomyEntries,
};

export function getTaxonomyForSlug(slug: string): MockExamTaxonomy {
  const entry = TAXONOMY_LOOKUP[slug];
  if (!entry) {
    throw new Error(`Missing mock taxonomy for slug: ${slug}`);
  }
  return entry;
}

export function finalizeMockExamConfig(draft: MockExamConfigDraft): MockExamConfig {
  const tax = getTaxonomyForSlug(draft.slug);
  return {
    ...draft,
    verticalId: draft.verticalId ?? tax.verticalId,
    familyId: draft.familyId ?? tax.familyId,
    searchAliases: draft.searchAliases ?? tax.searchAliases,
  };
}

export function finalizeMockExamConfigs(drafts: MockExamConfigDraft[]): MockExamConfig[] {
  return drafts.map(finalizeMockExamConfig);
}

export { TAXONOMY_BY_SLUG };
