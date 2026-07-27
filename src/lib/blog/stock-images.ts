/** Landscape stock heroes for blog guides (1200×630 WebP) — Pexels offline generate. */
export const BLOG_STOCK_IMAGES_DIR = "public/images/blog";

export type BlogStockImageSlot = {
  /** Filename without extension, e.g. epa-608-practice-test-hero */
  id: string;
  alt: string;
  caption?: string;
  queries: string[];
};

/** One hero + optional inline shots per post slug. */
export const BLOG_STOCK_IMAGE_CONFIG: Record<
  string,
  { hero: BlogStockImageSlot; inline: BlogStockImageSlot[] }
> = {
  "epa-608-practice-test-what-to-expect": {
    hero: {
      id: "epa-608-practice-test-hero",
      alt: "HVAC technician servicing an outdoor air conditioning unit",
      caption: "EPA 608 covers recovery rules — not just wrench skills",
      queries: [
        "hvac technician outdoor air conditioner",
        "air conditioning repair technician tools",
        "refrigeration technician service call",
      ],
    },
    inline: [
      {
        id: "epa-608-practice-test-gauges",
        alt: "HVAC manifold gauges connected to a refrigerant system",
        caption: "Recovery targets and PSI numbers dominate missed questions",
        queries: [
          "hvac manifold gauges close up",
          "refrigerant gauges air conditioning",
          "hvac pressure gauges technician",
        ],
      },
    ],
  },
  "epa-608-type-1-vs-type-2-which-first": {
    hero: {
      id: "epa-608-type-compare-hero",
      alt: "Residential HVAC outdoor condenser next to a house",
      caption: "Type II is the everyday residential path; Type I is small appliances",
      queries: [
        "residential air conditioner condenser unit",
        "home hvac outdoor unit technician",
        "split system air conditioner outside house",
      ],
    },
    inline: [
      {
        id: "epa-608-type-compare-appliance",
        alt: "Kitchen refrigerator as an example of a small appliance",
        caption: "Type I: factory-sealed small appliances, not split systems",
        queries: [
          "kitchen refrigerator modern appliance",
          "window air conditioner unit",
          "domestic refrigerator appliance kitchen",
        ],
      },
    ],
  },
  "servsafe-manager-exam-study-guide-2026": {
    hero: {
      id: "servsafe-study-guide-hero",
      alt: "Restaurant kitchen chef plating food with thermometer nearby",
      caption: "Temperatures and pathogens carry the most ServSafe Manager weight",
      queries: [
        "restaurant kitchen chef food thermometer",
        "commercial kitchen food preparation",
        "chef checking food temperature kitchen",
      ],
    },
    inline: [
      {
        id: "servsafe-study-guide-sink",
        alt: "Three-compartment sink in a commercial kitchen",
        caption: "Wash, rinse, sanitize, air dry — classic exam bait",
        queries: [
          "commercial kitchen three compartment sink",
          "restaurant kitchen dishwashing station",
          "food service sanitizing sink",
        ],
      },
    ],
  },
  "servsafe-manager-florida-requirements-2026": {
    hero: {
      id: "servsafe-florida-hero",
      alt: "Florida restaurant patio dining with palm trees",
      caption: "Florida DBPR wants an accredited manager certificate within 30 days",
      queries: [
        "florida restaurant outdoor dining palm trees",
        "miami restaurant patio palm",
        "florida beach restaurant food service",
      ],
    },
    inline: [
      {
        id: "servsafe-florida-kitchen",
        alt: "Food service manager reviewing a checklist in a kitchen",
        caption: "Inspectors ask for the certificate — not which course brand you watched",
        queries: [
          "restaurant manager kitchen checklist",
          "food service manager clipboard kitchen",
          "chef manager commercial kitchen inspection",
        ],
      },
    ],
  },
  "florida-food-manager-certification-dbpr-rules": {
    hero: {
      id: "florida-cfpm-dbpr-hero",
      alt: "Busy Florida restaurant kitchen during service",
      caption: "CFPM is required — ServSafe is optional branding",
      queries: [
        "busy restaurant kitchen florida service",
        "commercial kitchen line cooks restaurant",
        "restaurant kitchen rush hour cooking",
      ],
    },
    inline: [
      {
        id: "florida-cfpm-dbpr-certificate",
        alt: "Food safety certificate document on a clipboard",
        caption: "Inspectors check the certificate, not the training bundle logo",
        queries: [
          "food safety certificate clipboard document",
          "restaurant inspection checklist clipboard",
          "certificate of completion document desk",
        ],
      },
    ],
  },
  "california-real-estate-exam-psi-vs-pearson-vue": {
    hero: {
      id: "ca-real-estate-hero",
      alt: "California hillside homes overlooking the coast",
      caption: "California DRE runs its own exam centers — not PSI or Pearson VUE",
      queries: [
        "california coastline houses hillside",
        "los angeles residential neighborhood houses",
        "california real estate homes street",
      ],
    },
    inline: [
      {
        id: "ca-real-estate-keys",
        alt: "House keys and documents on a table for a real estate closing",
        caption: "Study California practice and law — not a third-party vendor login",
        queries: [
          "house keys real estate documents closing",
          "real estate contract signing keys",
          "home buyer keys paperwork table",
        ],
      },
    ],
  },
  "california-real-estate-exam-dre-test-centers": {
    hero: {
      id: "ca-dre-centers-hero",
      alt: "Modern office building lobby representing a California state exam center visit",
      caption: "Five DRE electronic centers — no PSI, no Pearson, no at-home option",
      queries: [
        "government office building lobby california",
        "modern office building entrance downtown",
        "exam testing center computer room",
      ],
    },
    inline: [
      {
        id: "ca-dre-centers-study",
        alt: "Person studying real estate flashcards and notes at a desk",
        caption: "Disclosures are 25% of the salesperson exam — study California law, not national fluff",
        queries: [
          "student studying flashcards desk laptop",
          "professional studying notes exam preparation",
          "person reviewing documents paperwork desk",
        ],
      },
    ],
  },
  "finra-sie-exam-prep-why-people-fail": {
    hero: {
      id: "finra-sie-hero",
      alt: "Financial district skyline representing securities industry careers",
      caption: "SIE is the gatekeeper exam before broker-dealer registration",
      queries: [
        "wall street financial district skyline",
        "new york stock exchange area buildings",
        "finance professional laptop charts office",
      ],
    },
    inline: [
      {
        id: "finra-sie-charts",
        alt: "Stock market charts on a laptop screen",
        caption: "Products and risks are 44% of the exam — options and bonds eat time",
        queries: [
          "stock market charts laptop screen",
          "trading desk financial charts monitor",
          "investment portfolio charts computer",
        ],
      },
    ],
  },
  "swiss-citizenship-test-cantonal-format-questions": {
    hero: {
      id: "swiss-citizenship-hero",
      alt: "Swiss Alps village and mountains representing Switzerland",
      caption: "No federal knowledge exam — your canton and commune write the rules",
      queries: [
        "swiss alps village mountains switzerland",
        "bern switzerland federal palace exterior",
        "zurich switzerland old town river",
      ],
    },
    inline: [
      {
        id: "swiss-citizenship-civics",
        alt: "Swiss flag and passport documents on a table",
        caption: "Study Der Bund kurz erklärt in your canton’s language — not English trivia apps",
        queries: [
          "swiss flag passport documents table",
          "switzerland passport application papers",
          "swiss cross flag alpine background",
        ],
      },
    ],
  },
  "cdl-hazmat-endorsement-state-fingerprinting-background-check": {
    hero: {
      id: "cdl-hazmat-fingerprinting-hero",
      alt: "Semi truck on an American highway at dawn",
      caption: "HazMat is federal — fingerprinting location is state-specific",
      queries: [
        "semi truck highway USA dawn",
        "commercial truck driver cab highway",
        "freight truck american interstate",
      ],
    },
    inline: [
      {
        id: "cdl-hazmat-fingerprinting-docs",
        alt: "Driver license and identification documents for a background check",
        caption: "Wrong fingerprinting site is the #1 wasted trip — TSA center vs DMV",
        queries: [
          "driver license passport identity documents desk",
          "fingerprint background check government office",
          "commercial driver license documents paperwork",
        ],
      },
    ],
  },
  "leben-in-deutschland-test-english-preparation-guide": {
    hero: {
      id: "leben-in-deutschland-hero",
      alt: "Berlin Reichstag building representing German federal government",
      caption: "Civics test in German — English helps concepts, not the exam wording",
      queries: [
        "berlin reichstag building germany",
        "brandenburg gate berlin daytime",
        "german parliament building berlin",
      ],
    },
    inline: [
      {
        id: "leben-in-deutschland-study",
        alt: "Person studying German flashcards and notes",
        caption: "Bilingual flashcards: German stem on front, German answer + English why on back",
        queries: [
          "student studying german flashcards notebook",
          "language learning flashcards desk coffee",
          "person reading textbook studying languages",
        ],
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
