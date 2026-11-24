import type { BlogPostDraft } from "../types";

export const californiaRealEstateDreCentersPost: BlogPostDraft = {
  slug: "california-real-estate-exam-dre-test-centers",
  title: "California Real Estate Exam: What the DRE Test Centers Actually Look Like",
  titleTag: "California Real Estate Exam: DRE Test Centers & Format 2027",
  metaDescription:
    "The California real estate exam has a 51% first-time pass rate. Here is exactly what happens at DRE test centers, what to bring, and the California-specific laws that kill most scores.",
  publishedAt: "2026-07-27",
  contentUpdated: "2026-11-24",
  eyebrow: "California DRE · Real estate licensing",
  clusterId: "california-real-estate",
  relatedSlugs: ["california-real-estate-exam-psi-vs-pearson-vue"],
  intro:
    'Most real estate exam prep sites tell you to "just study hard." They do not tell you that the California Department of Real Estate runs its own exam centers — not PSI, not Pearson VUE. All figures below are from dre.ca.gov, checked 24 Nov 2026. This guide covers what actually happens on test day, where you go, and the California-specific rules that show up on a quarter of your exam.',
  mockSlug: "california-real-estate-readiness-check",
  deckSlug: "california-real-estate-exam-anki-deck",
  cta: {
    mockLabel: "Take the free CA real estate readiness check",
    deckLabel: "Drill weak topics with the Anki deck",
    summary:
      "Take the free California Real Estate Readiness Check — timed, with a pass/no-pass breakdown by topic — then drill weak areas with the Anki deck before you pay $100 to sit at a DRE center.",
  },
  sections: [
    {
      heading: "The First Thing to Know: DRE Runs This, Not PSI or Pearson VUE",
      blocks: [
        {
          type: "p",
          text: "In most states, you take your real estate exam through PSI or Pearson VUE at a third-party testing center. California does not work like that. The California Department of Real Estate (DRE) administers the exam directly at five state-run electronic exam centers:",
        },
        {
          type: "ul",
          items: [
            "**La Palma** (Orange County) — 1 Centerpointe Drive, Suite 370",
            "**Oakland** — 1515 Clay Street, Room 703",
            "**Sacramento** — 651 Bannon Street (North Entrance)",
            "**Fresno** — 2550 Mariposa Mall, Room 3004",
            "**San Diego** — 8620 Spectrum Center Blvd, Suite 301B",
          ],
        },
        {
          type: "p",
          text: "You schedule through DRE eLicensing once your application is accepted. DRE says exams at all five centers are currently electronic, locations within an area may vary, and requests for a specific site cannot be granted. Arrive 30 minutes early; sessions start on time. Confirm addresses on dre.ca.gov before you travel.",
        },
      ],
    },
    {
      heading: "Exam Format and Passing Score",
      blocks: [
        {
          type: "table",
          caption: "California DRE salesperson vs broker exam",
          headers: ["Detail", "Salesperson", "Broker"],
          rows: [
            ["Questions", "150 multiple-choice", "200 multiple-choice"],
            ["Time limit", "3 hours (180 minutes)", "4 hours"],
            ["Passing score", "70% of the questions", "75% of the questions"],
            ["Exam fee", "$100", "$150"],
          ],
        },
        {
          type: "p",
          text: "A re-examination costs the same as the first exam ($100 / $150); rescheduling costs $40 (salesperson) or $45 (broker). DRE fees are non-refundable under Business and Professions Code § 10207.",
        },
      ],
    },
    {
      heading: "The Seven Topics and Where to Spend Your Time",
      blocks: [
        {
          type: "p",
          text: "The DRE publishes content weights. Here is where your 150 salesperson questions come from:",
        },
        {
          type: "ol",
          items: [
            "**Practice of Real Estate and Disclosures (including specialty areas) — 25%**",
            "**Laws of Agency and Fiduciary Duties — 17%**",
            "**Property Ownership and Land Use Controls and Regulations — 15%**",
            "**Property Valuation and Financial Analysis — 14%**",
            "**Contracts — 12%**",
            "**Financing — 9%**",
            "**Transfer of Property — 8%**",
          ],
        },
        {
          type: "p",
          text: "One topic — Practice of Real Estate & Disclosures — is worth more than Financing and Transfer of Property combined. If you are short on study time, spend it on disclosures.",
        },
      ],
    },
    {
      heading: "The California-Specific Landmines",
      blocks: [
        {
          type: "p",
          text: "Generic real estate courses teach national principles. The DRE exam buries you in California law. Here are the items that show up repeatedly and do not exist on other state exams:",
        },
        {
          type: "topics",
          items: [
            {
              title: "Transfer Disclosure Statement (TDS)",
              body: "Required on nearly every residential sale. Know who fills it out (seller and agent), when it must be delivered, and what happens if it is late.",
            },
            {
              title: "Natural Hazard Disclosure (NHD)",
              body: "Mandatory for properties in mapped hazard zones. You need to know the six natural hazards and who can prepare the report.",
            },
            {
              title: "Mello-Roos",
              body: "Special tax district for community facilities. Not a regular property tax. Know how it affects buyer disclosure and escrow prorations.",
            },
            {
              title: "Proposition 13",
              body: "Limits annual property tax increases to 2% plus the assessed value at purchase. Appears in valuation and tax questions constantly.",
            },
            {
              title: "California Fair Housing",
              body: "The Unruh Civil Rights Act adds protected classes beyond federal law. Know the difference between federal Fair Housing Act protections and California-specific additions.",
            },
            {
              title: "Trust Fund Handling",
              body: "Broker supervision requirements for handling client funds. Separate from general agency law.",
            },
          ],
        },
      ],
    },
    {
      heading: "What Happens at the DRE Test Center",
      blocks: [
        {
          type: "topics",
          items: [
            {
              title: "What to bring",
              body: "",
              bullets: [
                "Government-issued photo ID (driver's license or passport)",
                "Your Examination Schedule Notice (printed or on phone — check current DRE rules)",
              ],
            },
            {
              title: "What not to bring",
              body: "",
              bullets: [
                "Phones, smartwatches, calculators, notes, food, drinks",
                "Scratch paper is provided. Pencils are provided.",
              ],
            },
          ],
        },
        {
          type: "p",
          text: "The process:",
        },
        {
          type: "ol",
          items: [
            "Check in at the desk. Fingerprint scan or ID verification.",
            "Lock your belongings in a provided locker.",
            "You sit at a computer in a monitored room.",
            "The exam is electronic. You click through 150 questions.",
            "When you finish, you raise your hand. A proctor ends your session.",
            "Your result appears on screen immediately: PASS or FAIL.",
          ],
        },
        {
          type: "p",
          text: "If you pass, you do not get a numeric score. If you fail, you get a diagnostic breakdown by topic area so you know what to study next.",
        },
      ],
    },
    {
      heading: "Retake Rules (Read This Before You Schedule)",
      blocks: [
        {
          type: "ul",
          items: [
            "**When:** you can apply to retake after you are notified that you failed; DRE states no other waiting period.",
            "**Cost:** $100 per retake.",
            "**Limit:** Unlimited retakes within two years of your original application date. After two years, your application lapses and you must reapply from scratch.",
            "**Critical rule:** do not submit a new application, fee or exam-change form before your results are released, or the fee is forfeited.",
          ],
        },
      ],
    },
    {
      heading: "Why does the California exam feel hard?",
      blocks: [
        {
          type: "ul",
          items: [
            "**Length:** 150 questions in 3 hours for salespersons, 200 in 4 hours for brokers.",
            "**In person only:** exams run at DRE's five centers, not online.",
            "**State law:** a quarter of the exam is practice and disclosures, much of it California-specific.",
          ],
        },
        {
          type: "p",
          text: "DRE publishes monthly counts of exams administered, not pass rates, so this guide does not quote one. Practise with the [California real estate practice test](/mock-exams/california-real-estate-readiness-check) until you score comfortably above 70% on every topic.",
        },
      ],
    },
    {
      heading: "Study Strategy That Beats the Odds",
      blocks: [
        {
          type: "steps",
          items: [
            {
              title: "Week 1: Disclosures and agency law",
              body: "Together 42% of the exam (25% + 17%). Leave financing for later.",
            },
            {
              title: "Week 2: Property ownership, land use, contracts, valuation",
              body: "Read California Civil Code sections on tenancy, not just generic definitions.",
            },
            {
              title: "Week 3: Financing and transfer of property",
              body: "These are smaller sections. Focus on California-specific rules (escrow process, title insurance in California, deed types used in the state).",
            },
            {
              title: "Week 4: Timed practice exams",
              body: "Take one every 48 hours. Review every wrong answer and tag whether the mistake was: did not know the concept, knew the concept but forgot the California rule, or misread the question.",
            },
          ],
        },
        {
          type: "p",
          text: 'If many of your misses are "forgot the California rule," drill state rules with the [California real estate deck](/decks/california-real-estate-exam-anki-deck) rather than a national prep book.',
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Can I take the California real estate exam online?",
      answer:
        "No. DRE administers the exams at its five exam centers (Fresno, La Palma, Oakland, Sacramento and San Diego), in an electronic format.",
    },
    {
      question: "How many times can I retake the California real estate exam?",
      answer:
        "There is no limit within two years of filing your original application. Each re-examination costs $100 (salesperson) or $150 (broker), and you apply after you receive your failing result (DRE, checked 24 Nov 2026).",
    },
    {
      question: "What score do I need to pass the California real estate salesperson exam?",
      answer:
        "70% of the 150 questions. If you pass you are not told your score; if you fail you get your score and per-subject percentages.",
    },
    {
      question: "How long does it take to get California real estate exam results?",
      answer:
        "DRE sends a result notice; check DRE's Taking the Exam page and your eLicensing account for how results are released.",
    },
    {
      question: "What should I bring to the California real estate exam?",
      answer:
        "A valid government-issued photo ID and your examination schedule notice. Leave phones, calculators, and notes at home or in the provided locker.",
    },
    {
      question: "Is the California real estate exam harder than other states?",
      answer:
        "It is long (150 questions in 3 hours) and heavy on California practice and disclosure rules. DRE does not publish pass rates on its statistics pages, only counts of exams given.",
    },
    {
      question: "What is the hardest part of the California real estate exam?",
      answer:
        "Disclosures and California-specific law. The national concepts (contracts, agency basics) are standard. The California layers — TDS timing, NHD requirements, Mello-Roos, Prop 13 — are where most first-timers lose points.",
    },
  ],
  bottomLine:
    "The California real estate exam is not a memorization test. It is a reading comprehension test about California law with a timer. The people who pass do not necessarily know more real estate — they know more *California* real estate. Drill the disclosures and take timed mocks. Sources: [DRE — taking the exam](https://www.dre.ca.gov/Examinees/TakingExam.html), [exam sites](https://www.dre.ca.gov/examinees/ExamSites.html), [salesperson exam content](https://www.dre.ca.gov/examinees/SalesExamContent.html), [fees](https://www.dre.ca.gov/Licensees/Fees.html) and [statistics](https://www.dre.ca.gov/Stats), checked 24 Nov 2026.",
};
