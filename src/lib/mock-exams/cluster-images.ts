/** Landscape heroes for mock-exam hub clusters (1200×630 WebP) — Pexels offline generate. */
export const MOCK_CLUSTER_IMAGES_DIR = "public/images/mock-clusters";

export type MockClusterImageType =
  | "transport"
  | "allied-health"
  | "ems"
  | "real-estate"
  | "health-admin"
  | "bodywork"
  | "dental"
  | "surgical"
  | "imaging"
  | "veterinary"
  | "licensing"
  | "finance"
  | "building"
  | "cpr"
  | "nursing"
  | "beauty"
  | "fitness"
  | "social-work"
  | "education"
  | "trades"
  | "lab"
  | "nutrition";

export type MockClusterImageConfig = {
  label: string;
  queries: string[];
};

export const MOCK_CLUSTER_IMAGE_TYPES: MockClusterImageType[] = [
  "transport",
  "allied-health",
  "ems",
  "real-estate",
  "health-admin",
  "bodywork",
  "dental",
  "surgical",
  "imaging",
  "veterinary",
  "licensing",
  "finance",
  "building",
  "cpr",
  "nursing",
  "beauty",
  "fitness",
  "social-work",
  "education",
  "trades",
  "lab",
  "nutrition",
];

export const MOCK_CLUSTER_IMAGE_CONFIG: Record<MockClusterImageType, MockClusterImageConfig> = {
  transport: {
    label: "CDL & commercial driving",
    queries: [
      "semi truck highway USA dawn",
      "commercial truck driver cab",
      "freight truck american highway",
    ],
  },
  "allied-health": {
    label: "Allied health certifications",
    queries: [
      "medical assistant clinic patient care",
      "healthcare technician hospital hallway",
      "phlebotomy clinical laboratory",
    ],
  },
  ems: {
    label: "EMS & emergency care",
    queries: [
      "ambulance emergency medical technicians",
      "paramedic ambulance stretcher",
      "EMS responders emergency scene",
    ],
  },
  "real-estate": {
    label: "State real estate licensing",
    queries: [
      "suburban house for sale USA",
      "real estate agent house keys",
      "american home neighborhood street",
    ],
  },
  "health-admin": {
    label: "Medical coding & admin",
    queries: [
      "medical billing coding office computer",
      "healthcare administrator desk paperwork",
      "hospital administration office",
    ],
  },
  bodywork: {
    label: "Massage therapy",
    queries: [
      "massage therapy treatment room",
      "massage therapist clinic calm",
      "spa massage therapy professional",
    ],
  },
  dental: {
    label: "Dental assisting",
    queries: [
      "dental assistant clinic instruments",
      "dentistry office modern chair",
      "dental hygienist clinic",
    ],
  },
  surgical: {
    label: "Surgical & sterile processing",
    queries: [
      "operating room surgical instruments",
      "sterile processing hospital trays",
      "surgery team operating room",
    ],
  },
  imaging: {
    label: "Diagnostic imaging physics",
    queries: [
      "ultrasound machine medical imaging",
      "diagnostic imaging radiology equipment",
      "sonography medical ultrasound",
    ],
  },
  veterinary: {
    label: "Veterinary technician",
    queries: [
      "veterinary clinic animal care",
      "vet tech examining dog clinic",
      "veterinary hospital examination",
    ],
  },
  licensing: {
    label: "US licensing & insurance",
    queries: [
      "professional license exam study desk",
      "insurance office professional documents",
      "business license paperwork desk",
    ],
  },
  finance: {
    label: "Finance credentials",
    queries: [
      "financial analyst desk charts",
      "stock market trading screens",
      "finance professional calculator laptop",
    ],
  },
  building: {
    label: "Building & sustainability",
    queries: [
      "green building modern architecture",
      "HVAC technician mechanical room",
      "sustainable building construction site",
    ],
  },
  cpr: {
    label: "CPR & BLS",
    queries: [
      "CPR training mannequin class",
      "AED defibrillator first aid training",
      "BLS healthcare training session",
    ],
  },
  nursing: {
    label: "Nursing & nurse aide",
    queries: [
      "nurse aide patient care hospital",
      "nursing student clinical training",
      "CNA helping patient bedside",
    ],
  },
  beauty: {
    label: "Cosmetology & esthetics",
    queries: [
      "hair salon stylist cutting hair",
      "esthetician facial spa treatment",
      "beauty school cosmetology classroom",
    ],
  },
  fitness: {
    label: "Personal training",
    queries: [
      "personal trainer gym client",
      "fitness trainer coaching weights",
      "gym personal training session",
    ],
  },
  "social-work": {
    label: "Social work licensure",
    queries: [
      "social worker counseling office",
      "community social services meeting",
      "therapist notepad counseling session",
    ],
  },
  education: {
    label: "Early childhood education",
    queries: [
      "preschool teacher children classroom",
      "childcare daycare learning activity",
      "early childhood education classroom",
    ],
  },
  trades: {
    label: "Trades & applicator licenses",
    queries: [
      "pest control technician exterior home",
      "licensed applicator spraying carefully",
      "trades worker safety equipment outdoors",
    ],
  },
  lab: {
    label: "Medical laboratory",
    queries: [
      "medical laboratory scientist microscope",
      "clinical lab technician blood samples",
      "hospital laboratory analyzer equipment",
    ],
  },
  nutrition: {
    label: "Nutrition & dietetics",
    queries: [
      "dietitian nutrition counseling healthy food",
      "registered dietitian meal planning",
      "nutritionist kitchen healthy ingredients",
    ],
  },
};

export function mockClusterImagePublicPath(type: MockClusterImageType) {
  return `/images/mock-clusters/${type}.webp`;
}

export function getMockClusterImage(type: MockClusterImageType) {
  return mockClusterImagePublicPath(type);
}
