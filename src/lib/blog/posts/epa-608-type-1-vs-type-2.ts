import type { BlogPostDraft } from "../types";

export const epa608Type1VsType2Post: BlogPostDraft = {
  slug: "epa-608-type-1-vs-type-2-which-first",
  title: "EPA 608 Type I vs Type II: Which One Should You Take First",
  titleTag: "EPA 608 Type I vs Type II: Order, Difficulty & Universal First?",
  metaDescription:
    "Type I is open-book. Type II is not. But if you take Type I open-book first, you cannot use it toward Universal. Here is the exact order that saves you time and money.",
  publishedAt: "2026-07-27",
  eyebrow: "EPA 608 · HVAC certification",
  clusterId: "epa-608",
  relatedSlugs: ["epa-608-practice-test-what-to-expect"],
  intro:
    "**The EPA 608 exam is not one test. It is four: Core (mandatory), Type I (small appliances), Type II (high-pressure), and Type III (low-pressure).** Most HVAC technicians know they need “EPA certification.” Fewer know that the order in which you take the sections determines whether you end up with a limited credential or a career-ready one. This guide covers Type I vs Type II, the open-book trap that locks you out of Universal, and why most technicians should go straight for Universal.",
  mockSlug: "epa-608-readiness-check",
  deckSlug: "hvac-epa-608-anki-deck",
  cta: {
    mockLabel: "Take the free EPA 608 readiness check",
    deckLabel: "Drill Universal numbers with Anki",
    summary:
      "Not sure if you are ready for Universal? Take the free EPA 608 readiness check covering Core, Type I, and Type II material, then drill weak areas with the EPA 608 Anki deck before you sit.",
  },
  sections: [
    {
      heading: "What Each Type Actually Covers",
      blocks: [
        {
          type: "table",
          caption: "EPA 608 section coverage",
          headers: ["Type", "Equipment", "Examples", "Exam questions"],
          rows: [
            [
              "Type I",
              "Small appliances with ≤5 lbs of refrigerant",
              "Household refrigerators, window ACs, dehumidifiers, vending machines",
              "25 (Core) + 25 (Type I)",
            ],
            [
              "Type II",
              "High- and very-high-pressure appliances",
              "Residential split systems, rooftop units, supermarket refrigeration",
              "25 (Core) + 25 (Type II)",
            ],
            [
              "Type III",
              "Low-pressure appliances",
              "Large commercial chillers, industrial cooling",
              "25 (Core) + 25 (Type III)",
            ],
            [
              "Universal",
              "All of the above",
              "Everything regulated under Section 608",
              "25 Core + 25 I + 25 II + 25 III",
            ],
          ],
        },
        {
          type: "p",
          text: "Core is mandatory for every type. You cannot get Type I, II, or III without passing Core first.",
        },
      ],
    },
    {
      heading: "The Open-Book Trap That Wastes Your Time",
      blocks: [
        {
          type: "p",
          text: "Type I has a unique rule: if you take **only** the Type I exam, it can be administered as an open-book test. This sounds like an easy win. The problem is that if you later decide you want Universal — which most employers require — the EPA does **not** accept an open-book Core test toward Universal.",
        },
        {
          type: "steps",
          items: [
            {
              title: "1. Open-book Type I",
              body: "You take Type I open-book and pass.",
            },
            {
              title: "2. Job needs more",
              body: "You get hired and realize the job requires Type II or Universal.",
            },
            {
              title: "3. Retake Core proctored",
              body: "You go back to retake Core — this time closed-book and proctored.",
            },
            {
              title: "4. Retake Type I too",
              body: "You also retake Type I closed-book, because the open-book Type I does not count toward Universal. You pay twice and waste a sitting.",
            },
          ],
        },
        {
          type: "p",
          text: "If there is any chance you will work on residential AC, heat pumps, or commercial refrigeration, skip the open-book Type I. Take the full proctored exam and get Universal on the first try.",
        },
      ],
    },
    {
      heading: "Type I vs Type II: The Real Difficulty Gap",
      blocks: [
        {
          type: "p",
          text: "**Type I** is the easiest section because the equipment is simple. You are dealing with factory-sealed systems that hold 5 pounds or less of refrigerant. The recovery requirement is straightforward: recover to 0 psi before disposal. Leak repair rules are minimal because small appliances are exempt from the leak rate thresholds that apply to larger systems.",
        },
        {
          type: "p",
          text: "**Type II** is where most technicians struggle. The material adds leak detection and repair requirements (30-day repair timeline for comfort cooling, 120 days for industrial process refrigeration), evacuation levels (15 inches of vacuum for high-pressure systems, or 0 psi if leaking), recovery techniques that minimize loss and cross-contamination, and charging/servicing protocols for systems opened during repair.",
        },
        {
          type: "p",
          text: "The Type II exam also assumes refrigerant blends, temperature glide, and retrofit rules — concepts that do not appear on Type I.",
        },
      ],
    },
    {
      heading: "Who Should Take Type I Only?",
      blocks: [
        {
          type: "ul",
          items: [
            "You work exclusively on appliances (refrigerators, freezers, window units) and will never touch residential or commercial HVAC",
            "Your employer specifically requires only Type I and will not pay for additional certification",
            "You are an appliance repair apprentice testing the waters before committing to HVAC",
          ],
        },
        {
          type: "p",
          text: "Even then, the cost difference between Type I and Universal is usually $20–$40 at most testing centers. For that price, you buy the option to work on any system later without retesting.",
        },
      ],
    },
    {
      heading: "Who Should Skip Straight to Universal?",
      blocks: [
        {
          type: "ul",
          items: [
            "You are entering HVAC as a career, not a side job",
            "You plan to work on residential AC or heat pumps (Type II territory)",
            "Your state or employer requires Universal for apprenticeship programs",
            "You want to avoid the retake trap described above",
          ],
        },
        {
          type: "p",
          text: "The Universal exam is Core + Type I + Type II + Type III in one sitting — about 100 questions instead of 50. The pass rate is roughly 70% for prepared candidates.",
        },
        {
          type: "p",
          text: "**The only reason to delay Universal:** if you are brand new and have never touched refrigerant, Type III chiller material may be foreign. Some training programs sit Type I + II first, then add Type III later. That is a training choice, not an EPA requirement — the EPA does not care about section order as long as you pass them.",
        },
      ],
    },
    {
      heading: "Exam Strategy by Goal",
      blocks: [
        {
          type: "table",
          caption: "Best path by career goal",
          headers: ["Your goal", "Best path", "Why"],
          rows: [
            [
              "Appliance repair only",
              "Type I (proctored, not open-book)",
              "Keeps the door open for Universal later",
            ],
            [
              "Residential HVAC service",
              "Core + Type II, or Universal",
              "Type II covers split systems and heat pumps",
            ],
            [
              "Commercial HVAC + chillers",
              "Universal",
              "Type III is required for chillers",
            ],
            [
              "“I do not know yet”",
              "Universal",
              "Costs marginally more, eliminates retakes",
            ],
          ],
        },
      ],
    },
    {
      heading: "The Numbers That Matter on Each Exam",
      blocks: [
        {
          type: "topics",
          items: [
            {
              title: "Type I-specific",
              body: "Recovery: 0 psi before disposal. Equipment: factory-sealed, ≤5 lbs refrigerant. No leak repair thresholds (small appliances are exempt).",
            },
            {
              title: "Type II-specific",
              body: "Recovery: 15 inches of vacuum (or 0 psi if leaking). Leak repair: 30 days for comfort cooling (10% leak rate threshold), 120 days for industrial process refrigeration. High-pressure = above 170 psig (R-410A, R-22); very-high-pressure = above 355 psig. Cannot work on motor vehicle AC (that is EPA 609).",
            },
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Can I take EPA 608 Type I open book and still get Universal later?",
      answer:
        "No. The EPA explicitly states that Core tests taken as open-book exams cannot be used toward Universal certification. If you take Type I open-book and later want Universal, you must retake Core and Type I closed-book under proctored conditions.",
    },
    {
      question: "Is Type I easier than Type II?",
      answer:
        "Yes. Type I covers small, sealed appliances with simpler recovery requirements. Type II adds leak detection protocols, evacuation levels, pressure classifications, and charging procedures for larger systems.",
    },
    {
      question: "Should I take Type I before Type II?",
      answer:
        "Only if you are certain you will never work on residential or commercial HVAC. Otherwise, go straight for Universal. The incremental cost is minimal and you avoid retaking sections later.",
    },
    {
      question: "How many questions are on the EPA 608 Universal exam?",
      answer:
        "Approximately 100 multiple-choice questions: 25 Core + 25 Type I + 25 Type II + 25 Type III. Each section is scored separately. You must pass Core plus each Type section to earn Universal.",
    },
    {
      question: "What is the passing score for EPA 608?",
      answer:
        "Most testing organizations require approximately 70% per section. For Type I, that is roughly 18 out of 25 correct. For Universal, you need ~18 correct in each of the four sections.",
    },
    {
      question: "Can I take the EPA 608 exam online?",
      answer:
        "Type I can be taken online in an open-book format through some providers. Type II, Type III, and Universal must be taken in a proctored environment — either in-person or via remote proctoring.",
    },
    {
      question: "Does EPA 608 certification expire?",
      answer:
        "No. EPA 608 certification does not expire. However, technicians should stay current with regulatory updates, especially HFC phase-down rules and the A2L refrigerant transition.",
    },
    {
      question: "What is the difference between EPA 608 and EPA 609?",
      answer:
        "EPA 608 covers stationary refrigeration and air conditioning systems (Types I, II, III, Universal). EPA 609 covers motor vehicle air conditioning (MVAC). They are separate certifications. A Type II holder cannot legally service car AC.",
    },
  ],
  bottomLine:
    "Type I is a beginner credential for appliance techs. Type II is the standard for HVAC service. Universal is the standard for employability. The only reason to take Type I first is if you are 100% certain you will never touch an air conditioner. Otherwise, pay the extra $20, sit for the full proctored Universal exam, and never think about retaking it again.",
};
