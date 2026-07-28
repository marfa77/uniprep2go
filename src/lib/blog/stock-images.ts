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
  "canada-citizenship-test-20-questions-630-dollars": {
    hero: {
      id: "canada-citizenship-test-hero",
      alt: "Canadian Parliament Buildings on Parliament Hill in Ottawa",
      caption: "20 questions, 75% to pass — geography capitals are where scores die",
      queries: [
        "Ottawa Parliament Hill Canadian Parliament Buildings",
        "Toronto CN Tower skyline Canada",
        "Montreal old port Canada skyline",
      ],
      mustInclude: ["canada", "ottawa", "parliament", "canadian"],
      mustExclude: ["usa washington", "uk london"],
    },
    inline: [
      {
        id: "canada-citizenship-test-study",
        alt: "Adult studying Discover Canada citizenship guide with flashcards",
        caption: "Do not sit until timed mocks hit about 18/20",
        queries: [
          "adult studying Canadian textbook laptop desk",
          "person taking citizenship practice test laptop notebook",
          "flashcards geography capitals study desk",
        ],
        mustInclude: ["study", "laptop", "desk", "book"],
        mustExclude: ["covid", "vaccine"],
      },
    ],
  },
  "us-naturalization-civics-test-100-questions-only-10": {
    hero: {
      id: "us-naturalization-civics-hero",
      alt: "United States Capitol dome in Washington DC",
      caption: "100 published questions — the interview asks up to 10 and stops at 6 correct",
      queries: [
        "United States Capitol Washington DC dome",
        "Lincoln Memorial Washington DC USA",
        "US flag Capitol Hill Washington",
      ],
      mustInclude: ["capitol", "washington", "usa", "america"],
      mustExclude: ["canada ottawa", "uk london"],
    },
    inline: [
      {
        id: "us-naturalization-civics-study",
        alt: "Person practicing USCIS civics questions aloud with flashcards",
        caption: "Train oral answers — the real interview is not multiple choice",
        queries: [
          "adult studying US government textbook flashcards desk",
          "person practicing interview questions aloud notebook",
          "citizenship test flashcards laptop study desk",
        ],
        mustInclude: ["study", "desk", "book", "flashcard", "laptop"],
        mustExclude: ["covid", "vaccine"],
      },
    ],
  },
  "life-in-the-uk-test-why-one-in-three-fail": {
    hero: {
      id: "life-in-the-uk-fail-pass-hero",
      alt: "Big Ben and Houses of Parliament along the Thames in London",
      caption: "24 questions, 45 minutes, £50 — Chapter 3 history is where most scores die",
      queries: [
        "London Big Ben Houses of Parliament Thames",
        "UK Union Jack flag Westminster London Europe",
        "Tower Bridge London England skyline",
      ],
      mustInclude: ["london", "britain", "england", "parliament", "uk"],
      mustExclude: ["france paris", "netherlands amsterdam"],
    },
    inline: [
      {
        id: "life-in-the-uk-fail-pass-study",
        alt: "Adult studying the Life in the UK handbook with flashcards at a desk",
        caption: "Do not book until timed mocks hit about 20/24",
        queries: [
          "adult studying British history textbook laptop desk",
          "person taking citizenship practice test laptop notebook",
          "flashcards dates history study desk coffee",
        ],
        mustInclude: ["study", "laptop", "desk", "book"],
        mustExclude: ["covid", "vaccine"],
      },
    ],
  },
  "netherlands-inburgeringsexamen-five-exams-pass-guide": {
    hero: {
      id: "netherlands-inburgeringsexamen-hero",
      alt: "Amsterdam canals with traditional Dutch canal houses",
      caption: "Five DUO modules — speaking and KNM catch most candidates",
      queries: [
        "Amsterdam canal houses Netherlands Europe",
        "Amsterdam Dam Square Royal Palace Netherlands",
        "Rotterdam Erasmus Bridge Netherlands skyline",
      ],
      mustInclude: ["amsterdam", "netherlands", "canal", "dutch", "europe"],
      mustExclude: ["belgium brussels", "germany berlin"],
    },
    inline: [
      {
        id: "netherlands-inburgeringsexamen-study",
        alt: "Person practicing Dutch speaking and inburgering modules on a laptop",
        caption: "Practice timed Spreken recordings before you pay €50 per module",
        queries: [
          "adult studying Dutch language textbook laptop desk",
          "person language exam practice headphones laptop desk",
          "flashcards Dutch vocabulary notebook study desk",
        ],
        mustInclude: ["study", "laptop", "desk", "language", "dutch"],
        mustExclude: ["covid", "vaccine"],
      },
    ],
  },
  "france-naturalization-2026-civic-exam-b2-language-test": {
    hero: {
      id: "france-naturalization-2026-hero",
      alt: "Paris skyline with Eiffel Tower and Seine River at dusk",
      caption: "Two exams since 2026 — civic MCQ at 80% plus B2 French",
      queries: [
        "Paris Eiffel Tower Seine River France skyline",
        "Paris Haussmann boulevard architecture France",
        "Lyon old town Saone river France Europe",
      ],
      mustInclude: ["paris", "france", "eiffel", "tower", "europe"],
      mustExclude: ["germany berlin", "spain madrid"],
    },
    inline: [
      {
        id: "france-naturalization-2026-study",
        alt: "Adult studying French civic exam materials and B2 vocabulary at a desk",
        caption: "Book language first — TCF IRN results can take 4–6 weeks",
        queries: [
          "adult studying French textbook laptop desk",
          "person taking language exam practice laptop notebook",
          "French vocabulary flashcards coffee desk study",
        ],
        mustInclude: ["study", "laptop", "desk", "book", "french"],
        mustExclude: ["covid", "vaccine"],
      },
    ],
  },
  "germany-einbuergerungstest-vs-leben-in-deutschland-difference": {
    hero: {
      id: "germany-einbuergerungstest-vs-lid-hero",
      alt: "Berlin Reichstag and Spree River under clear sky",
      caption: "Same 33 BAMF questions — different certificate titles for citizenship vs PR",
      queries: [
        "Berlin Reichstag dome Spree River Germany",
        "Brandenburg Gate Berlin Germany Europe",
        "Cologne Cathedral Rhine Germany skyline",
      ],
      mustInclude: ["berlin", "germany", "reichstag", "europe", "gate"],
      mustExclude: ["france paris", "austria vienna"],
    },
    inline: [
      {
        id: "germany-einbuergerungstest-vs-lid-study",
        alt: "Person drilling German citizenship BAMF flashcards at a desk with laptop",
        caption: "Register as Einbürgerungstest for naturalisation — avoid paperwork friction",
        queries: [
          "adult studying German textbook laptop desk citizenship",
          "person taking computer based exam practice desk",
          "flashcards German vocabulary notebook study desk",
        ],
        mustInclude: ["study", "laptop", "desk", "book", "german"],
        mustExclude: ["covid", "vaccine"],
      },
    ],
  },
  "spain-citizenship-ccse-dele-a2-two-exams": {
    hero: {
      id: "spain-citizenship-ccse-dele-hero",
      alt: "Madrid Royal Palace and Plaza de Oriente under clear sky",
      caption: "Two Cervantes exams — CCSE civics plus DELE A2 language",
      queries: [
        "Madrid Royal Palace Plaza Oriente Spain",
        "Barcelona Gothic Quarter street Spain Europe",
        "Seville cathedral Giralda tower Spain",
      ],
      mustInclude: ["spain", "madrid", "palace", "europe", "city"],
      mustExclude: ["italy rome", "portugal lisbon"],
    },
    inline: [
      {
        id: "spain-citizenship-ccse-dele-study",
        alt: "Adult studying Spanish citizenship exam materials with laptop and notebook",
        caption: "Book DELE first — higher retake cost and longer score wait than CCSE",
        queries: [
          "studying Spanish textbook laptop desk adult",
          "person taking language exam practice test laptop",
          "flashcards Spanish vocabulary notebook desk",
        ],
        mustInclude: ["study", "laptop", "desk", "book", "exam", "spanish"],
        mustExclude: ["covid", "vaccine"],
      },
    ],
  },
  "italy-citizenship-b1-test-cils-celi-not-civics": {
    hero: {
      id: "italy-citizenship-b1-hero",
      alt: "Rome Colosseum and historic streets in afternoon light",
      caption: "No civics quiz — Italy requires B1 Italian (CILS or CELI Cittadinanza)",
      queries: [
        "Rome Colosseum Italy historic architecture",
        "Florence Duomo cathedral Italy skyline",
        "Venice canal gondola Italy Europe",
      ],
      mustInclude: ["italy", "rome", "colosseum", "europe", "historic"],
      mustExclude: ["spain madrid", "greece athens"],
    },
    inline: [
      {
        id: "italy-citizenship-b1-study",
        alt: "Person practicing Italian conversation and B1 exam speaking at a desk",
        caption: "Speaking is the usual fail point — spontaneous production, not a memorised script",
        queries: [
          "adult studying Italian language textbook laptop desk",
          "person speaking language tutor online video call desk",
          "Italian vocabulary flashcards notebook study desk",
        ],
        mustInclude: ["study", "laptop", "desk", "language", "book", "italian"],
        mustExclude: ["covid", "vaccine"],
      },
    ],
  },
  "luxembourg-vivre-ensemble-test-format-pass": {
    hero: {
      id: "luxembourg-vivre-ensemble-hero",
      alt: "Luxembourg City skyline with Adolphe Bridge and fortifications",
      caption: "40 questions or 24 hours — most applicants never hear about the exam path",
      queries: [
        "Luxembourg City Adolphe Bridge skyline fortifications",
        "Luxembourg old town Grund valley Europe",
        "Luxembourg City European quarter modern buildings",
      ],
      mustInclude: ["luxembourg", "city", "bridge", "europe", "skyline"],
      mustExclude: ["belgium brussels", "france paris"],
    },
    inline: [
      {
        id: "luxembourg-vivre-ensemble-study",
        alt: "Person taking a computer-based citizenship practice test at a desk",
        caption: "Target 32/40 before Esch-Belval — Sproochentest is the harder half",
        queries: [
          "person computer based exam laptop desk timed test",
          "studying European citizenship flashcards laptop desk",
          "adult taking online quiz notebook desk",
        ],
        mustInclude: ["laptop", "exam", "desk", "study", "computer", "test"],
        mustExclude: ["covid", "vaccine"],
      },
    ],
  },
  "belgium-citizenship-test-flanders-vs-wallonia": {
    hero: {
      id: "belgium-citizenship-hero",
      alt: "Brussels Grand Place ornate guildhalls under daylight",
      caption: "Three systems in one country — Flanders MO, Wallonia language, Brussels choice",
      queries: [
        "Brussels Grand Place guildhalls Belgium",
        "Antwerp cathedral square Belgium Flanders",
        "Brussels Atomium park Belgium landmark",
      ],
      mustInclude: ["brussels", "belgium", "belgian", "square", "building"],
      mustExclude: ["netherlands amsterdam", "france paris"],
    },
    inline: [
      {
        id: "belgium-citizenship-integration",
        alt: "Multilingual classroom for civic integration and language learning",
        caption: "Flanders: MO + Dutch. Wallonia: French A2. Fee already €1,030.",
        queries: [
          "adult language classroom integration course Europe",
          "civic education classroom adults learning languages",
          "teacher adult students language class Belgium",
        ],
        mustInclude: ["classroom", "language", "adult", "learning", "teacher", "student"],
        mustExclude: ["covid", "vaccine", "children only"],
      },
    ],
  },
  "sweden-medborgarskapsprov-2026-new-test": {
    hero: {
      id: "sweden-medborgarskapsprov-hero",
      alt: "Stockholm waterfront with historic buildings and Swedish skyline",
      caption: "Society test launches August 2026 — Samhällskunskap is your bridge until then",
      queries: [
        "Stockholm Gamla Stan waterfront Sweden skyline",
        "Stockholm city hall Riddarfjärden Sweden",
        "Swedish parliament Riksdag Stockholm exterior",
      ],
      mustInclude: ["stockholm", "sweden", "swedish", "water", "city", "building"],
      mustExclude: ["norway oslo", "denmark copenhagen"],
    },
    inline: [
      {
        id: "sweden-medborgarskapsprov-study",
        alt: "Person studying Swedish society textbook and notes at a desk",
        caption: "Study SFI Samhällskunskap now — add UHR samples when they appear",
        queries: [
          "studying Swedish textbook notebook desk laptop",
          "person reading civics book flashcards European desk",
          "adult education social studies notes desk",
        ],
        mustInclude: ["study", "book", "desk", "notebook", "exam", "reading"],
        mustExclude: ["covid", "vaccine"],
      },
    ],
  },
  "norway-statsborgerproven-format-questions-pass": {
    hero: {
      id: "norway-statsborgerproven-hero",
      alt: "Oslo fjord and city skyline with Norwegian coastal light",
      caption: "36 questions in Norwegian — HK-dir runs the filter, not UDI",
      queries: [
        "Oslo fjord skyline Norway harbor",
        "Oslo opera house waterfront Norway",
        "Bergen colorful houses Norwegian harbor",
      ],
      mustInclude: ["norway", "oslo", "fjord", "harbor", "norwegian", "city"],
      mustExclude: ["sweden stockholm", "denmark copenhagen"],
    },
    inline: [
      {
        id: "norway-statsborgerproven-study",
        alt: "Person studying Norwegian samfunnskunnskap materials on a laptop",
        caption: "Read the curriculum in Norwegian — translation alone will not pass",
        queries: [
          "studying Norwegian textbook laptop desk flashcards",
          "person reading language book notes Nordic desk",
          "citizenship exam prep notebook laptop desk",
        ],
        mustInclude: ["study", "book", "laptop", "desk", "notebook", "exam"],
        mustExclude: ["covid", "vaccine"],
      },
    ],
  },
  "denmark-indfoedsretsproeven-47-percent-pass-rate": {
    hero: {
      id: "denmark-indfoedsretsproeven-hero",
      alt: "Copenhagen cityscape with Danish flag colors and historic buildings",
      caption: "47% pass — because Denmark grades facts and values",
      queries: [
        "Copenhagen skyline Danish flag harbor historic buildings",
        "Denmark parliament Christiansborg exterior",
        "Copenhagen Nyhavn colorful houses canal",
      ],
      mustInclude: ["copenhagen", "denmark", "danish", "harbor", "building", "city"],
      mustExclude: ["sweden stockholm", "norway oslo"],
    },
    inline: [
      {
        id: "denmark-indfoedsretsproeven-study",
        alt: "Person studying Danish citizenship booklet and flashcards at a desk",
        caption: "Official booklet + values scenarios — not common-sense guessing",
        queries: [
          "studying citizenship test booklet flashcards desk laptop",
          "person reading Danish textbook notes desk",
          "exam preparation flashcards notebook European desk",
        ],
        mustInclude: ["study", "book", "desk", "flashcard", "notebook", "exam"],
        mustExclude: ["covid", "vaccine"],
      },
    ],
  },
  "portugal-nationality-test-2026-new-civic-exam": {
    hero: {
      id: "portugal-nationality-test-hero",
      alt: "Lisbon Belém tower and Tagus river under blue sky",
      caption: "Civic test is law — format still catching up to the syllabus",
      queries: [
        "Lisbon Belem tower Tagus river Portugal",
        "Lisbon Alfama rooftops Portuguese tiles",
        "Portugal Lisbon historic plaza flag",
      ],
      mustInclude: ["lisbon", "portugal", "tower", "portuguese", "city"],
      mustExclude: ["brazil rio", "spain madrid"],
    },
    inline: [
      {
        id: "portugal-nationality-test-civics",
        alt: "Portuguese constitution and civic study notes on a desk with laptop",
        caption: "Five legal topics — history, symbols, institutions, rights, society",
        queries: [
          "studying constitution law books desk laptop Europe",
          "civic education notes Portuguese flag desk",
          "person reading history textbook European politics desk",
        ],
        mustInclude: ["study", "book", "desk", "law", "notebook", "constitution"],
        mustExclude: ["covid", "vaccine"],
      },
    ],
  },
  "how-many-practice-tests-before-servsafe-manager-exam": {
    hero: {
      id: "servsafe-practice-tests-hero",
      alt: "Restaurant kitchen manager checking food temperatures with a digital probe thermometer",
      caption: "Two to three full timed mocks beat one short quiz repeated five times",
      queries: [
        "chef checking food temperature digital thermometer kitchen",
        "restaurant kitchen manager probe thermometer steam table",
        "food safety temperature check commercial kitchen",
      ],
      mustInclude: ["thermometer", "kitchen", "food", "temperature", "chef", "restaurant"],
      mustExclude: ["home kitchen only", "birthday cake"],
    },
    inline: [
      {
        id: "servsafe-practice-tests-timer",
        alt: "Person taking a timed online practice exam on a laptop at a desk",
        caption: "Simulate 90 questions in 2 hours — no notes, no pause, mixed domains",
        queries: [
          "person taking online exam laptop timer desk",
          "timed practice test laptop studying kitchen manager",
          "student timed quiz laptop concentration desk",
        ],
        mustInclude: ["laptop", "exam", "study", "desk", "test", "computer"],
        mustExclude: ["covid", "vaccine"],
      },
    ],
  },
  "cfa-level-1-vs-frm-part-1-which-to-choose": {
    hero: {
      id: "cfa-vs-frm-hero",
      alt: "Finance professional reviewing charts and risk analytics on dual monitors",
      caption: "CFA and FRM look similar on paper — they open different career doors",
      queries: [
        "finance professional trading desk dual monitors charts",
        "investment analyst reviewing financial charts laptop office",
        "risk analyst desk market data screens office",
      ],
      mustInclude: ["finance", "chart", "monitor", "office", "analyst", "desk"],
      mustExclude: ["crypto casino", "bitcoin only"],
    },
    inline: [
      {
        id: "cfa-vs-frm-study",
        alt: "Person studying finance textbooks and calculator for professional exam",
        caption: "300 hours vs 200 hours — pick the path that matches your next job",
        queries: [
          "studying finance textbooks calculator notebook desk",
          "CFA exam study books laptop desk",
          "person calculating formulas notebook financial exam prep",
        ],
        mustInclude: ["study", "book", "calculator", "desk", "notebook", "finance"],
        mustExclude: ["covid", "vaccine"],
      },
    ],
  },
  "can-you-pass-leed-ga-free-resources-only": {
    hero: {
      id: "leed-ga-free-resources-hero",
      alt: "Modern green building with plants and glass facade for LEED certification",
      caption: "Free USGBC PDFs get you started — volume and v5 depth are where free hits a wall",
      queries: [
        "modern green building glass facade plants sustainable architecture",
        "LEED certified office building exterior greenery",
        "sustainable architecture green roof modern building",
      ],
      mustInclude: ["building", "green", "architecture", "glass", "plant", "sustainable"],
      mustExclude: ["construction hard hat only", "demolition"],
    },
    inline: [
      {
        id: "leed-ga-free-resources-study",
        alt: "Student reading a green building handbook and taking notes at a desk",
        caption: "Start with the Candidate Handbook — then decide if free banks are enough volume",
        queries: [
          "student reading architecture handbook notes desk laptop",
          "studying sustainability textbook notebook desk",
          "person reading green building guide taking notes",
        ],
        mustInclude: ["study", "book", "note", "desk", "student", "reading"],
        mustExclude: ["covid", "vaccine"],
      },
    ],
  },
  "how-long-anki-decks-stay-current-exam-shelf-life": {
    hero: {
      id: "anki-shelf-life-hero",
      alt: "Calendar and study books on a desk for tracking exam syllabus updates",
      caption: "Decks expire when the syllabus moves — check the version before you import",
      queries: [
        "calendar planner study books desk exam prep",
        "desk calendar textbooks studying professional exam",
        "planner notebook books laptop exam schedule desk",
      ],
      mustInclude: ["calendar", "book", "study", "desk", "planner", "exam"],
      mustExclude: ["wedding", "party", "birthday cake"],
    },
    inline: [
      {
        id: "anki-shelf-life-audit",
        alt: "Person comparing official exam outline PDF with flashcards on a laptop",
        caption: "Three-minute audit: outline vs deck TOC, then spot-check ten cards",
        queries: [
          "laptop comparing documents checklist studying desk",
          "person reviewing PDF document laptop notebook desk",
          "checklist notebook laptop exam preparation desk",
        ],
        mustInclude: ["laptop", "document", "study", "desk", "notebook", "checklist"],
        mustExclude: ["covid", "vaccine"],
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
  "finra-options-questions-read-without-getting-tricked": {
    hero: {
      id: "finra-options-questions-hero",
      alt: "Trader reviewing options charts and market data on multiple monitors",
      caption: "Options questions are reading traps first — formulas second",
      queries: [
        "stock options trading charts multiple monitors",
        "trader desk options market screens",
        "financial trading desk candlestick charts",
      ],
      mustInclude: ["trading", "chart", "stock", "market", "monitor", "finance"],
      mustExclude: ["crypto only", "casino"],
    },
    inline: [
      {
        id: "finra-options-questions-formulas",
        alt: "Notebook with handwritten finance formulas and calculator for exam prep",
        caption: "Know long/short and call/put before you calculate breakeven",
        queries: [
          "handwritten finance formulas notebook calculator desk",
          "studying options formulas notebook exam prep",
          "calculator notebook stock market studying desk",
        ],
        mustInclude: ["notebook", "formula", "calculator", "study", "exam"],
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
  "cdl-general-knowledge-test-50-questions-what-to-expect": {
    hero: {
      id: "cdl-general-knowledge-hero",
      alt: "Semi truck on an open American highway at dusk",
      caption: "General Knowledge is the gatekeeper — endorsements come after",
      queries: [
        "semi truck american highway interstate dusk",
        "commercial freight truck USA highway road",
        "truck driver cab semi trailer highway",
      ],
      mustInclude: ["truck", "semi", "highway", "freight", "trailer"],
      mustExclude: ["toy truck", "pickup only", "hazmat placard closeup"],
    },
    inline: [
      {
        id: "cdl-general-knowledge-study",
        alt: "Adult studying a commercial driver handbook with notes",
        caption: "Study the official state CDL manual — then full 50-question timed mocks",
        queries: [
          "adult studying handbook notebook desk",
          "driver studying test prep book notes",
          "adult reading manual checklist clipboard desk",
        ],
        mustInclude: ["study", "book", "manual", "desk", "notes", "handbook"],
        mustExclude: ["children", "covid", "vaccine", "laptop only coding"],
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
