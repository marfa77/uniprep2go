/** Landscape stock heroes for blog guides (1200×630 WebP) — Pexels offline generate. */
export const BLOG_STOCK_IMAGES_DIR = "public/images/blog";

export type BlogStockImageSlot = {
  /** Filename without extension, e.g. epa-608-practice-test-hero */
  id: string;
  alt: string;
  caption?: string;
  /** Pexels search queries — tried in order */
  queries: string[];
  /**
   * Prefer photos whose Pexels `alt` contains at least one of these tokens.
   * Used to reject lifestyle / wrong-topic first hits.
   */
  mustInclude?: string[];
  /** Reject photos whose `alt` matches any of these (e.g. covid, kitchen interior). */
  mustExclude?: string[];
  /** Pin an exact Pexels photo when search ranking is unreliable. */
  pexelsPhotoId?: number;
}

/** One hero + optional inline shots per post slug. */
export const BLOG_STOCK_IMAGE_CONFIG: Record<
  string,
  { hero: BlogStockImageSlot; inline: BlogStockImageSlot[] }
> = {
  "cdcp-vs-dcdc-data-center-certification-first-step": {
    hero: {
      id: "cdcp-vs-dcdc-hero",
      alt: "Rows of server racks in a modern data center aisle",
      caption: "CDCP is operations foundation; DCDC is design-only and needs 3 years of experience",
      queries: [
        "data center server racks aisle",
        "modern data centre server room corridor",
        "colocation data center cabinets LED lights",
      ],
      mustInclude: ["data center", "server", "rack", "datacenter", "cabinet"],
      mustExclude: ["home office", "laptop desk only"],
    },
    inline: [
      {
        id: "cdcp-vs-dcdc-cooling",
        alt: "Data center cooling and power infrastructure near server cabinets",
        caption: "CDCP teaches why CRAC needs maintenance; DCDC writes the CRAC specification",
        queries: [
          "data center cooling CRAC unit",
          "server room HVAC cooling infrastructure",
          "data center power UPS battery room",
        ],
        mustInclude: ["data center", "server", "cooling", "power", "ups", "hvac"],
        mustExclude: ["residential air conditioner only"],
      },
    ],
  },
  "memorize-epa-608-refrigerant-numbers-method": {
    hero: {
      id: "epa-608-refrigerants-hero",
      alt: "HVAC technician using manifold gauges on an outdoor air conditioner while studying refrigerants",
      caption: "Group refrigerants by CFC / HCFC / HFC family — not as isolated phone numbers",
      queries: [
        "technician manifold gauge outdoor air conditioner repair",
        "hvac technician refrigerant gauges service call",
        "air conditioning repair gauges outdoor unit",
      ],
      mustInclude: ["technician", "gauge", "air condition", "hvac", "repair"],
      mustExclude: ["satellite", "rooftop water tank", "junkyard", "beverage", "soft drink"],
      pexelsPhotoId: 5463575,
    },
    inline: [
      {
        id: "epa-608-refrigerants-gauges",
        alt: "Close-up of HVAC manifold pressure gauges used in refrigerant service",
        caption: "Pressure class + family classification must be automatic under exam timing",
        queries: [
          "hvac manifold gauges close up refrigerant",
          "ac pressure gauges technician hands",
          "refrigerant recovery gauges service",
        ],
        mustInclude: ["gauge", "manifold", "pressure", "hvac", "refrigerant"],
        mustExclude: ["blood pressure", "tire"],
      },
    ],
  },
  "anki-vs-quizlet-professional-exam-prep": {
    hero: {
      id: "anki-vs-quizlet-hero",
      alt: "Person studying flashcards on a phone and laptop for exam prep",
      caption: "Licensing exams need spaced repetition over weeks — not session-reset cramming",
      queries: [
        "studying flashcards phone laptop desk exam",
        "spaced repetition flashcards smartphone studying",
        "student reviewing digital flashcards laptop",
      ],
      mustInclude: ["flashcard", "study", "phone", "laptop", "exam", "student"],
      mustExclude: ["quizlet logo", "party", "gaming"],
    },
    inline: [
      {
        id: "anki-vs-quizlet-recall",
        alt: "Close-up of handwritten study notes and index cards for active recall",
        caption: "Retrieval beats recognition — hide the answer, produce it from memory",
        queries: [
          "index cards handwritten study notes desk",
          "flashcards paper studying active recall",
          "handwritten vocabulary cards notebook desk",
        ],
        mustInclude: ["card", "note", "study", "flashcard", "notebook"],
        mustExclude: ["covid", "vaccine"],
      },
    ],
  },
  "nebosh-igc-vs-international-diploma-employers": {
    hero: {
      id: "nebosh-igc-diploma-hero",
      alt: "Construction workers in hard hats and high-visibility vests on an active building site",
      caption: "IGC opens HSE officer doors; the Diploma targets management and CMIOSH",
      queries: [
        "construction workers hard hats high visibility vest site",
        "building site safety helmets scaffolding workers",
        "construction site inspector hard hat clipboard",
      ],
      mustInclude: ["construction", "hard hat", "helmet", "worker", "scaffold", "building site"],
      mustExclude: ["agreement", "contract", "purchase", "sale", "real estate", "kitchen", "office desk"],
    },
    inline: [
      {
        id: "nebosh-igc-diploma-study",
        alt: "Safety professional reviewing a workplace risk assessment checklist on a clipboard",
        caption: "Command words — outline, explain, describe — decide IGC and Diploma scores",
        queries: [
          "safety inspection clipboard hard hat site",
          "workplace risk assessment checklist clipboard",
          "construction safety officer writing clipboard",
        ],
        mustInclude: ["clipboard", "safety", "hard hat", "helmet", "inspection", "checklist"],
        mustExclude: ["laptop studying", "coffee", "hijab student", "home office"],
      },
    ],
  },
  "mrics-apc-vs-assocrics-pathway-cost": {
    hero: {
      id: "mrics-apc-assocrics-hero",
      alt: "Surveyor measuring a commercial building facade with a laser distance meter",
      caption: "MRICS is the Chartered license; AssocRICS is the associate badge",
      queries: [
        "building surveyor measuring laser distance meter",
        "quantity surveyor construction site hard hat",
        "surveyor inspecting commercial building exterior",
      ],
      mustInclude: ["survey", "measure", "building", "construction", "hard hat", "architect"],
      mustExclude: ["singapore", "skyline night", "marina bay", "bank", "ubS", "stock market"],
    },
    inline: [
      {
        id: "mrics-apc-assocrics-docs",
        alt: "Quantity surveyor reviewing cost plans and floor drawings at a desk",
        caption: "APC is 24 months of structured evidence — not a course you buy and pass",
        queries: [
          "quantity surveyor documents cost plan desk",
          "building survey floor plan measuring tape desk",
          "construction cost estimating documents blueprints",
        ],
        mustInclude: ["plan", "blueprint", "document", "measure", "drawing", "survey"],
        mustExclude: ["colored pencil", "crayon", "art studio", "russian", "маст"],
      },
    ],
  },
  "well-ap-vs-fitwel-certification-2026": {
    hero: {
      id: "well-ap-fitwel-hero",
      alt: "Bright commercial office atrium with plants, daylight, and open seating for occupant wellness",
      caption: "WELL measures performance; Fitwel scores policy and design strategies",
      queries: [
        "corporate office atrium plants natural light",
        "modern office lobby biophilic design greenery",
        "office building interior daylight indoor plants seating",
      ],
      mustInclude: ["office", "plant", "lobby", "atrium", "workspace", "interior"],
      mustExclude: ["home office", "bedroom", "lofi", "pegboard", "ikea desk", "monitor playlist"],
    },
    inline: [
      {
        id: "well-ap-fitwel-air",
        alt: "Commercial HVAC air handling unit and ductwork in a building mechanical room",
        caption: "WELL AP drills thresholds and verification — Fitwel drills the scorecard portal",
        queries: [
          "commercial air handling unit mechanical room",
          "HVAC ductwork supply air building ceiling",
          "building ventilation system air filter technician",
        ],
        mustInclude: ["hvac", "duct", "vent", "air", "mechanical", "filter"],
        mustExclude: ["window ac", "residential kitchen"],
      },
    ],
  },
  "epa-608-practice-test-what-to-expect": {
    hero: {
      id: "epa-608-practice-test-hero",
      alt: "HVAC technician servicing an outdoor air conditioning condenser with tools",
      caption: "EPA 608 covers recovery rules — not just wrench skills",
      queries: [
        "hvac technician outdoor condenser service tools",
        "air conditioning repair technician gauges outdoor unit",
        "refrigeration technician servicing split system",
      ],
      mustInclude: ["technician", "air condition", "hvac", "condenser", "refriger", "repair"],
      mustExclude: ["kitchen", "interior design", "office atrium"],
    },
    inline: [
      {
        id: "epa-608-practice-test-gauges",
        alt: "HVAC manifold gauges connected to a refrigerant line",
        caption: "Recovery targets and PSI numbers dominate missed questions",
        queries: [
          "hvac manifold gauges close up refrigerant",
          "refrigerant pressure gauges air conditioning",
          "ac manifold gauge set technician hands",
        ],
        mustInclude: ["gauge", "manifold", "refrigerant", "pressure", "hvac"],
        mustExclude: ["blood pressure", "tire pressure"],
      },
    ],
  },
  "epa-608-type-1-vs-type-2-which-first": {
    hero: {
      id: "epa-608-type-compare-hero",
      alt: "Residential outdoor split-system AC condenser next to a house (Type II equipment)",
      caption: "Type II is the everyday residential path; Type I is small appliances",
      queries: [
        "residential outdoor air conditioner condenser house",
        "split system outdoor unit backyard home",
        "home hvac condenser technician service",
      ],
      mustInclude: ["conditioner", "condenser", "hvac", "outdoor", "split"],
      mustExclude: ["kitchen", "refrigerator interior", "singapore"],
    },
    inline: [
      {
        id: "epa-608-type-compare-appliance",
        alt: "Glass-door commercial beverage refrigerator — Type I sealed appliance example",
        caption: "Type I: factory-sealed small appliances, not split systems",
        queries: [
          "commercial beverage refrigerator glass door",
          "coca cola refrigerator outdoor",
          "appliance repair refrigerator technician",
        ],
        mustInclude: ["refrigerat", "fridge", "beverage", "vending", "cooler"],
        mustExclude: ["french door kitchen", "luxury kitchen", "cabinetry", "building facade", "apartment facade"],
        pexelsPhotoId: 9370121,
      },
    ],
  },
  "servsafe-manager-exam-study-guide-2026": {
    hero: {
      id: "servsafe-study-guide-hero",
      alt: "Chef using a digital thermometer while preparing food in a kitchen",
      caption: "Temperatures and pathogens carry the most ServSafe Manager weight",
      queries: [
        "chef digital thermometer kitchen chocolate tempering",
        "cook checking temperature probe kitchen",
        "restaurant kitchen food temperature thermometer",
      ],
      mustInclude: ["thermometer", "kitchen", "chef", "cook", "food", "temperature"],
      mustExclude: ["home kitchen luxury", "fridge french door", "medical thermometer pills"],
      pexelsPhotoId: 6035326,
    },
    inline: [
      {
        id: "servsafe-study-guide-sink",
        alt: "Chef washing utensils at a stainless-steel commercial kitchen sink",
        caption: "Wash, rinse, sanitize, air dry — classic exam bait",
        queries: [
          "chef washing dishes stainless steel commercial kitchen sink",
          "restaurant kitchen dishwashing stainless sink",
          "industrial kitchen dishwasher washing dishes",
        ],
        mustInclude: ["sink", "wash", "dish", "kitchen", "chef", "utensil"],
        mustExclude: ["soap water soap", "laboratory", "handwashing trough", "hospital", "water soap water"],
        pexelsPhotoId: 8629124,
      },
    ],
  },
  "servsafe-manager-florida-requirements-2026": {
    hero: {
      id: "servsafe-florida-hero",
      alt: "Florida restaurant patio dining with palm trees",
      caption: "Florida DBPR wants an accredited manager certificate within 30 days",
      queries: [
        "florida restaurant outdoor patio palm trees",
        "miami outdoor dining palm trees restaurant",
        "florida beachside restaurant patio",
      ],
      mustInclude: ["restaurant", "palm", "dining", "florida", "miami", "patio"],
      mustExclude: ["hotel lobby empty", "office"],
    },
    inline: [
      {
        id: "servsafe-florida-kitchen",
        alt: "Chef preparing food in a modern commercial restaurant kitchen",
        caption: "Inspectors ask for the certificate — not which course brand you watched",
        queries: [
          "chef preparing dish modern commercial kitchen",
          "restaurant kitchen chef cooking line",
          "professional kitchen chef plating food",
        ],
        mustInclude: ["chef", "kitchen", "cook", "restaurant", "culinary"],
        mustExclude: ["warehouse", "construction", "hard hat", "covid", "vaccine"],
        pexelsPhotoId: 8629106,
      },
    ],
  },
  "florida-food-manager-certification-dbpr-rules": {
    hero: {
      id: "florida-cfpm-dbpr-hero",
      alt: "Busy commercial restaurant kitchen line during service",
      caption: "CFPM is required — ServSafe is optional branding",
      queries: [
        "busy commercial restaurant kitchen line cooks",
        "restaurant kitchen rush hour cooking line",
        "chefs plating food commercial kitchen",
      ],
      mustInclude: ["kitchen", "chef", "cook", "restaurant", "food"],
      mustExclude: ["home kitchen", "covid"],
    },
    inline: [
      {
        id: "florida-cfpm-dbpr-certificate",
        alt: "Official document with a verification stamp — stand-in for CFPM credential paper",
        caption: "Inspectors check the certificate, not the training bundle logo",
        queries: [
          "certificate of achievement diploma paper desk",
          "training certificate award paper ribbon",
          "rolled diploma certificate wooden desk",
        ],
        mustInclude: ["certificate", "diploma", "achievement", "document"],
        mustExclude: ["covid", "vaccine", "eu digital", "harvard", "syringe", "lady justice"],
        pexelsPhotoId: 9858904,
      },
    ],
  },
  "california-real-estate-exam-psi-vs-pearson-vue": {
    hero: {
      id: "ca-real-estate-hero",
      alt: "California residential neighborhood hillside homes",
      caption: "California DRE runs its own exam centers — not PSI or Pearson VUE",
      queries: [
        "california residential hillside houses neighborhood",
        "los angeles suburban homes street",
        "california real estate houses coastal hills",
      ],
      mustInclude: ["house", "home", "residential", "california", "neighborhood", "suburb"],
      mustExclude: ["singapore", "skyscraper night"],
    },
    inline: [
      {
        id: "ca-real-estate-keys",
        alt: "House keys and real estate closing documents on a table",
        caption: "Study California practice and law — not a third-party vendor login",
        queries: [
          "house keys real estate contract closing table",
          "home buyer keys paperwork signing",
          "real estate keys documents desk",
        ],
        mustInclude: ["key", "house", "contract", "document", "real estate", "closing"],
        mustExclude: ["car key only", "covid"],
      },
    ],
  },
  "california-real-estate-exam-dre-test-centers": {
    hero: {
      id: "ca-dre-centers-hero",
      alt: "Students at computer stations in a testing lab — electronic exam center vibe",
      caption: "Five DRE electronic centers — no PSI, no Pearson, no at-home option",
      queries: [
        "students computers classroom university lab",
        "computer lab students monitors classroom",
        "digital exam computer lab students",
      ],
      mustInclude: ["computer", "student", "lab", "monitor", "classroom"],
      mustExclude: ["hotel lobby", "singapore skyline", "omr", "bubble sheet", "pencil exam paper"],
      pexelsPhotoId: 5530484,
    },
    inline: [
      {
        id: "ca-dre-centers-study",
        alt: "Person studying real estate exam notes and flashcards at a desk",
        caption: "Disclosures are 25% of the salesperson exam — study California law, not national fluff",
        queries: [
          "studying flashcards exam notes desk laptop",
          "real estate exam study books desk",
          "person reviewing legal documents studying desk",
        ],
        mustInclude: ["study", "book", "note", "flashcard", "exam", "laptop"],
        mustExclude: ["covid", "vaccine"],
      },
    ],
  },
  "finra-sie-exam-prep-why-people-fail": {
    hero: {
      id: "finra-sie-hero",
      alt: "Wall Street financial district buildings representing securities careers",
      caption: "SIE is the gatekeeper exam before broker-dealer registration",
      queries: [
        "wall street new york financial district",
        "new york stock exchange exterior building",
        "manhattan financial district skyscrapers day",
      ],
      mustInclude: ["wall street", "new york", "financial", "stock exchange", "manhattan", "nyse"],
      mustExclude: ["singapore", "marina bay"],
    },
    inline: [
      {
        id: "finra-sie-charts",
        alt: "Stock market candlestick charts on a trading monitor",
        caption: "Products and risks are 44% of the exam — options and bonds eat time",
        queries: [
          "stock market candlestick charts monitor",
          "trading desk financial charts computer screen",
          "investment portfolio charts laptop",
        ],
        mustInclude: ["chart", "stock", "trading", "market", "candlestick", "finance"],
        mustExclude: ["weather chart", "medical"],
      },
    ],
  },
  "swiss-citizenship-test-cantonal-format-questions": {
    hero: {
      id: "swiss-citizenship-hero",
      alt: "Swiss Alps village with mountains representing Switzerland",
      caption: "No federal knowledge exam — your canton and commune write the rules",
      queries: [
        "swiss alps village mountains switzerland",
        "bern switzerland federal palace exterior",
        "lucerne switzerland lake mountains",
      ],
      mustInclude: ["swiss", "switzerland", "alps", "bern", "zurich", "lucerne", "geneva"],
      mustExclude: ["german reichstag", "berlin"],
    },
    inline: [
      {
        id: "swiss-citizenship-civics",
        alt: "Swiss flag with white cross on a red field",
        caption: "Study Der Bund kurz erklärt in your canton’s language — not English trivia apps",
        queries: [
          "swiss flag white cross red waving",
          "switzerland flag grindelwald",
          "bern switzerland federal palace swiss flags",
        ],
        mustInclude: ["swiss", "switzerland", "flag"],
        mustExclude: ["covid", "eu digital", "vaccine", "austrian", "portuguese", "bulgarian"],
        pexelsPhotoId: 27289394,
      },
    ],
  },
  "cdl-hazmat-endorsement-state-fingerprinting-background-check": {
    hero: {
      id: "cdl-hazmat-fingerprinting-hero",
      alt: "Semi truck on an American interstate highway",
      caption: "HazMat is federal — fingerprinting location is state-specific",
      queries: [
        "semi truck american highway interstate",
        "commercial freight truck USA highway",
        "truck driver cab semi truck road",
      ],
      mustInclude: ["truck", "semi", "highway", "freight", "trailer"],
      mustExclude: ["toy truck", "pickup only"],
    },
    inline: [
      {
        id: "cdl-hazmat-fingerprinting-docs",
        alt: "Commercial driver license and identity documents for a TSA background check",
        caption: "Wrong fingerprinting site is the #1 wasted trip — TSA center vs DMV",
        queries: [
          "driver license identity documents desk",
          "fingerprint background check biometric scanner",
          "commercial driver license cdl document",
        ],
        mustInclude: ["license", "fingerprint", "document", "id", "passport", "driver"],
        mustExclude: ["covid", "vaccine"],
      },
    ],
  },
  "leben-in-deutschland-test-english-preparation-guide": {
    hero: {
      id: "leben-in-deutschland-hero",
      alt: "Berlin Reichstag building representing German federal government",
      caption: "Civics test in German — English helps concepts, not the exam wording",
      queries: [
        "berlin reichstag building germany daytime",
        "brandenburg gate berlin germany",
        "german bundestag reichstag dome",
      ],
      mustInclude: ["berlin", "reichstag", "brandenburg", "germany", "german"],
      mustExclude: ["swiss", "alps"],
    },
    inline: [
      {
        id: "leben-in-deutschland-study",
        alt: "Adult studying language materials with books and notes at a desk",
        caption: "Bilingual flashcards: German stem on front, German answer + English why on back",
        queries: [
          "adult studying english book office desk",
          "language learning workbook planner desk",
          "adult studying papers library education",
        ],
        mustInclude: ["study", "book", "learn", "english", "language", "workbook"],
        mustExclude: ["calculator", "math", "covid", "children", "teacher students kids", "young students"],
        pexelsPhotoId: 6929165,
      },
    ],
  },
};

export function blogStockImagePublicPath(id: string): string {
  return `/images/blog/${id}.webp`;
}

export function listBlogStockImageSlots(): BlogStockImageSlot[] {
  const slots: BlogStockImageSlot[] = [];
  for (const config of Object.values(BLOG_STOCK_IMAGE_CONFIG)) {
    slots.push(config.hero, ...config.inline);
  }
  return slots;
}
