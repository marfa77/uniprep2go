import type { MockClusterImageType } from "./cluster-images";

export type MockHubCluster = {
  id: string;
  label: string;
  imageType: MockClusterImageType;
  slugs: string[];
};

export const mockHubClusters: MockHubCluster[] = [
  {
    id: "transport",
    label: "CDL & commercial driving",
    imageType: "transport",
    slugs: [
      "cdl-general-knowledge-readiness-check",
      "cdl-hazmat-readiness-check",
      "cdl-passenger-readiness-check",
      "cdl-school-bus-readiness-check",
    ],
  },
  {
    id: "allied-health",
    label: "Allied health certifications",
    imageType: "allied-health",
    slugs: [
      "nha-ccma-readiness-check",
      "nha-cpt-phlebotomy-readiness-check",
      "nha-cpct-readiness-check",
      "nha-excpt-readiness-check",
      "nha-cmaa-readiness-check",
      "nha-cbcs-readiness-check",
      "ccht-dialysis-readiness-check",
      "aama-cma-readiness-check",
      "nbrc-tmc-readiness-check",
      "ptcb-pharmacy-technician-mock",
    ],
  },
  {
    id: "ems",
    label: "EMS & emergency care",
    imageType: "ems",
    slugs: ["nremt-emt-readiness-check", "nremt-paramedic-readiness-check"],
  },
  {
    id: "cpr",
    label: "CPR & BLS",
    imageType: "cpr",
    slugs: ["aha-bls-provider-readiness-check"],
  },
  {
    id: "nursing",
    label: "Nursing & nurse aide",
    imageType: "nursing",
    slugs: ["nnaap-cna-readiness-check", "nclex-pn-readiness-check"],
  },
  {
    id: "real-estate",
    label: "State real estate licensing",
    imageType: "real-estate",
    slugs: [
      "fl-real-estate-readiness-check",
      "tx-real-estate-readiness-check",
      "ny-real-estate-readiness-check",
      "california-real-estate-readiness-check",
    ],
  },
  {
    id: "health-admin",
    label: "Medical coding & admin",
    imageType: "health-admin",
    slugs: ["aapc-cpc-readiness-check", "nha-cbcs-readiness-check"],
  },
  {
    id: "bodywork",
    label: "Massage therapy",
    imageType: "bodywork",
    slugs: ["mblex-readiness-check"],
  },
  {
    id: "beauty",
    label: "Cosmetology & esthetics",
    imageType: "beauty",
    slugs: ["cosmetology-state-readiness-check", "esthetician-state-readiness-check"],
  },
  {
    id: "fitness",
    label: "Personal training",
    imageType: "fitness",
    slugs: [
      "nasm-cpt-readiness-check",
      "issa-cpt-readiness-check",
      "ace-cpt-readiness-check",
    ],
  },
  {
    id: "dental",
    label: "Dental assisting & hygiene",
    imageType: "dental",
    slugs: ["danb-ice-readiness-check", "danb-gc-readiness-check", "nbdhe-readiness-check"],
  },
  {
    id: "surgical",
    label: "Surgical & sterile processing",
    imageType: "surgical",
    slugs: ["crcst-readiness-check", "nbstsa-cst-readiness-check"],
  },
  {
    id: "imaging",
    label: "Diagnostic imaging physics",
    imageType: "imaging",
    slugs: ["ardms-spi-readiness-check"],
  },
  {
    id: "lab",
    label: "Medical laboratory",
    imageType: "lab",
    slugs: ["ascp-mls-readiness-check"],
  },
  {
    id: "nutrition",
    label: "Nutrition & dietetics",
    imageType: "nutrition",
    slugs: ["rd-exam-readiness-check"],
  },
  {
    id: "social-work",
    label: "Social work licensure",
    imageType: "social-work",
    slugs: ["aswb-masters-readiness-check"],
  },
  {
    id: "education",
    label: "Early childhood education",
    imageType: "education",
    slugs: ["cda-childcare-readiness-check"],
  },
  {
    id: "trades",
    label: "Trades & applicator licenses",
    imageType: "trades",
    slugs: ["pest-control-applicator-readiness-check"],
  },
  {
    id: "veterinary",
    label: "Veterinary technician",
    imageType: "veterinary",
    slugs: ["vtne-readiness-check"],
  },
  {
    id: "licensing",
    label: "US licensing & insurance",
    imageType: "licensing",
    slugs: [
      "sie-full-mock",
      "series-7-readiness-check",
      "series-63-readiness-check",
      "life-and-health-insurance-readiness-check",
      "property-casualty-insurance-readiness-check",
      "servsafe-manager-mock",
    ],
  },
  {
    id: "finance",
    label: "Finance credentials",
    imageType: "finance",
    slugs: [
      "cfa-level-1-readiness-check",
      "cfa-level-2-readiness-check",
      "frm-part-1-readiness-check",
      "gmat-focus-readiness-check",
      "gre-readiness-check",
      "sat-readiness-check",
    ],
  },
  {
    id: "building",
    label: "Building & sustainability",
    imageType: "building",
    slugs: [
      "epa-608-readiness-check",
      "leed-green-associate-readiness-check",
      "leed-ap-om-readiness-check",
      "well-ap-readiness-check",
      "mrics-readiness-check",
      "pmp-readiness-check",
    ],
  },
];

export const featuredMockHubSlugs = [
  "sie-full-mock",
  "cdl-general-knowledge-readiness-check",
  "nha-ccma-readiness-check",
  "nremt-emt-readiness-check",
  "servsafe-manager-mock",
  "ptcb-pharmacy-technician-mock",
  "fl-real-estate-readiness-check",
  "aapc-cpc-readiness-check",
] as const;
