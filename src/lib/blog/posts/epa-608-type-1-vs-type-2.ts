import type { BlogPostDraft } from "../types";

export const epa608Type1VsType2Post: BlogPostDraft = {
  slug: "epa-608-type-1-vs-type-2-which-first",
  title: "EPA 608 Type I vs Type II: Which Should You Take First?",
  titleTag: "EPA 608 Type I vs Type II: Which to Take First",
  metaDescription:
    "Type I covers small appliances; Type II covers high-pressure systems. Here is which to take first, when Universal is cheaper long-term, and the open-book Core trap.",
  publishedAt: "2026-07-27",
  eyebrow: "EPA 608 · HVAC certification",
  clusterId: "epa-608",
  relatedSlugs: ["epa-608-practice-test-what-to-expect"],
  intro:
    "**If you work residential or light commercial HVAC, take Type II (with a proctored Core) — or go Universal in one sitting.** Type I alone only covers small appliances (roughly 5 lbs or less of refrigerant as manufactured). The expensive mistake is passing an **open-book Core for Type I**, then discovering that Core **does not count** toward Type II, Type III, or Universal later.",
  mockSlug: "epa-608-readiness-check",
  deckSlug: "hvac-epa-608-anki-deck",
  cta: {
    mockLabel: "Take the free EPA 608 mock",
    deckLabel: "Drill recovery numbers with Anki",
    summary:
      "Take the free EPA 608 mock → see Core vs type weak spots → drill recovery targets and dates before you pick Type I, Type II, or Universal.",
  },
  sections: [
    {
      heading: "Type I vs Type II in One Minute",
      blocks: [
        {
          type: "table",
          caption: "What each type authorizes",
          headers: ["Certification", "Equipment", "Typical jobs"],
          rows: [
            [
              "Type I",
              "Small appliances (≤5 lbs manufactured charge, hermetic)",
              "Window AC, domestic fridge/freezer, PTAC, vending, water coolers",
            ],
            [
              "Type II",
              "High / very-high pressure (not small appliances or MVAC)",
              "Split systems, heat pumps, rooftop units, supermarket racks",
            ],
            [
              "Type III",
              "Low-pressure appliances",
              "Centrifugal chillers, large building cooling",
            ],
            ["Universal", "Core + I + II + III", "Any Section 608 appliance type"],
          ],
        },
        {
          type: "p",
          text: "You must pass **Core** plus the type sections you need. Universal is Core + Type I + Type II + Type III.",
        },
      ],
    },
    {
      heading: "Decision Tree: What Should You Book?",
      blocks: [
        {
          type: "topics",
          items: [
            {
              title: "Only service small appliances (appliances / vending / PTACs)",
              body: "Type I can be enough. Some providers offer Type I with an open-book path. That is fine **only if you will never need Type II/III/Universal** — because an open-book Core generally cannot be reused for those credentials.",
            },
            {
              title: "Install or service residential / light commercial AC and heat pumps",
              body: "You need **Type II**. Book a **proctored Core + Type II**. Skip open-book Type I shortcuts unless you also need small-appliance work soon.",
            },
            {
              title: "Chillers / low-pressure equipment",
              body: "You need **Type III** (plus Core). Most field techs who touch chillers eventually want Universal anyway.",
            },
            {
              title: "Apprentice or early-career HVAC tech unsure of the next five years",
              body: "Book **Universal in one proctored session** (Core + I + II + III). One fee cycle, one day of testing, lifetime credential under current EPA rules.",
            },
          ],
        },
      ],
    },
    {
      heading: "The Open-Book Core Trap",
      blocks: [
        {
          type: "p",
          text: "EPA’s own technician certification page states that **Core tests taken as an open-book exam cannot be used to get Universal certification**. The Core must be proctored for Universal. Providers warn the same for stacking into Type II or Type III after an open-book Type I path.",
        },
        {
          type: "ul",
          items: [
            "Open-book Type I can look cheaper and easier today",
            "Later you pay again for a proctored Core when you need Type II or Universal",
            "Passing scores and rules vary by certifying organization — read your provider’s exam rules before you click “open book”",
          ],
        },
        {
          type: "p",
          text: "If Universal is even a maybe, start with a proctored Core.",
        },
      ],
    },
    {
      heading: "Which Numbers Differ Between Type I and Type II?",
      blocks: [
        {
          type: "p",
          text: "Core shared topics (ozone, venting bans, reclaim vs recycle) appear on every path. Type sections hammer equipment-specific recovery and evacuation targets:",
        },
        {
          type: "ul",
          items: [
            "**Type I:** recover to **0 psi** before disposal of small appliances (know the small-appliance definition cold)",
            "**Type II:** high-pressure recovery to the vacuum level your exam form requires (commonly drilled as **15 inches of vacuum**, or **0 psi** if the system is leaking — memorize your provider’s wording)",
            "**Leak repair thresholds and timelines** show up heavily once you leave pure Type I work",
          ],
        },
        {
          type: "p",
          text: "Use a practice test to see whether your misses are Core regulations or type-specific recovery — that tells you whether to add Type II study or just clean up Core flashcards.",
        },
      ],
    },
    {
      heading: "Recommended Booking Order",
      blocks: [
        {
          type: "steps",
          items: [
            {
              title: "1. Decide the credential end-state",
              body: "Type I only, Type II only, or Universal. Do not “see how Type I goes” if you already know you need split-system work.",
            },
            {
              title: "2. Prefer one proctored sitting",
              body: "Core + needed types on the same appointment reduces re-fees and duplicate Core attempts.",
            },
            {
              title: "3. Study Core first, then the type you will sit",
              body: "Fail Core and nothing else counts. Treat Core as mandatory, not a warm-up.",
            },
            {
              title: "4. Run a timed mock before you pay",
              body: "If Core is below ~70% on a cold mock, delay the booking. Numbers and dates do not improve under fluorescent lights.",
            },
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Should I take EPA 608 Type I or Type II first?",
      answer:
        "Take Type II first (with a proctored Core) if you service residential or light commercial high-pressure systems. Take Type I first only if your work is limited to small appliances and you do not plan to stack toward Universal soon.",
    },
    {
      question: "Can I get Universal without Type I?",
      answer:
        "No. Universal requires Core plus Type I, Type II, and Type III. Most techs schedule all sections together.",
    },
    {
      question: "Does an open-book Type I Core count toward Universal?",
      answer:
        "No. EPA states that Core tests taken as an open-book exam cannot be used for Universal. Plan a proctored Core if Universal is your goal.",
    },
    {
      question: "Is Type II enough for residential AC work?",
      answer:
        "Type II covers high-pressure appliances such as residential split systems and many commercial refrigeration systems, excluding small appliances and MVAC. Confirm the equipment you service against EPA’s type definitions.",
    },
    {
      question: "Do EPA 608 certifications expire?",
      answer:
        "Section 608 technician certifications do not expire under current EPA rules. You may still need to learn new regulations as the agency updates them.",
    },
    {
      question: "What is the difference between Type II and Type III?",
      answer:
        "Type II is high-pressure and very-high-pressure appliances. Type III is low-pressure appliances such as many chillers. Evacuation and recovery requirements differ by type.",
    },
  ],
  bottomLine:
    "Book the certification that matches the equipment on your truck — but default to a proctored Core and, for most HVAC careers, Universal once. Type I open-book is a dead-end stack for anyone who will later touch split systems or chillers.",
};
