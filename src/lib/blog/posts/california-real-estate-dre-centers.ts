import type { BlogPostDraft } from "../types";

export const californiaRealEstateDreCentersPost: BlogPostDraft = {
  slug: "california-real-estate-exam-dre-test-centers",
  title: "California Real Estate Exam: What the DRE Test Centers Actually Look Like",
  titleTag: "California Real Estate Exam: DRE Test Centers, Format & Pass Rate 2026",
  metaDescription:
    "The California real estate exam has a 51% first-time pass rate. Here is exactly what happens at DRE test centers, what to bring, and the California-specific laws that kill most scores.",
  publishedAt: "2026-07-27",
  eyebrow: "California DRE · Real estate licensing",
  clusterId: "california-real-estate",
  relatedSlugs: ["california-real-estate-exam-psi-vs-pearson-vue"],
  intro:
    'Most real estate exam prep sites tell you to "just study hard." They do not tell you that the California Department of Real Estate runs its own exam centers — not PSI, not Pearson VUE — and that the fail rate is nearly **50%**. This guide covers what actually happens on test day, where you go, and the California-specific rules that show up on a quarter of your exam.',
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
          text: "You schedule through the DRE eLicensing portal after your application and 135 hours of pre-license education are approved. There is no online proctoring option. If you live in Redding or Eureka, you are driving to Sacramento or Oakland. Confirm current addresses on dre.ca.gov before you travel — centers can move.",
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
            ["Time limit", "3 hours (180 minutes)", "5 hours"],
            ["Passing score", "70% (105 correct)", "75% (150 correct)"],
            ["Results", "Immediate on screen", "Immediate on screen"],
            ["Exam fee", "$100", "$150"],
          ],
        },
        {
          type: "p",
          text: "The fee went up on July 1, 2024 — the first increase since 1997. If you see old guides quoting $60, they are outdated.",
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
            "**Practice of Real Estate & Disclosures — 25%**",
            "**Property Ownership & Land Use Controls — 17%**",
            "**Laws of Agency & Fiduciary Duties — 14%**",
            "**Property Valuation & Financial Analysis — 14%**",
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
            "**Waiting period:** You must wait approximately 2.5 weeks (18 calendar days) after a failed attempt before you can reschedule.",
            "**Cost:** $100 per retake.",
            "**Limit:** Unlimited retakes within two years of your original application date. After two years, your application lapses and you must reapply from scratch.",
            "**Critical rule:** Do NOT submit a new application or try to reschedule before you receive your official failure notice. If you do, DRE flags your record, withholds your results, and assesses additional fees.",
          ],
        },
      ],
    },
    {
      heading: "Why the Pass Rate Is Only 51%",
      blocks: [
        {
          type: "p",
          text: "California has one of the lowest first-time pass rates in the country. The reasons are specific:",
        },
        {
          type: "ul",
          items: [
            "**150 questions** — more than most states, which run 100–120.",
            "**No online option** — you cannot take a familiar at-home test. You sit in a state building.",
            "**Heavy state law load** — generic prep courses do not cover Mello-Roos, Prop 13, or California disclosure timelines in enough depth.",
            "**Time pressure** — 3 hours sounds generous until you hit a 5-part scenario question on agency disclosure with four similar answer choices.",
          ],
        },
        {
          type: "p",
          text: "Candidates who pass typically complete 3–5 full-length timed practice exams and score above 80% before sitting for the real thing.",
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
              body: "39% of the exam combined. Do not touch financing yet.",
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
          text: 'If more than 30% of your misses are "forgot the California rule," you need state-specific flashcards, not a national prep book.',
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Can I take the California real estate exam online?",
      answer:
        "No. The DRE does not offer online or remote proctoring. All exams are in-person at the five state exam centers.",
    },
    {
      question: "How many times can I retake the California real estate exam?",
      answer:
        "Unlimited times within two years of your application. Each retake costs $100. You must wait about 18 calendar days between attempts.",
    },
    {
      question: "What score do I need to pass the California real estate salesperson exam?",
      answer:
        "70%. That is 105 correct answers out of 150. You do not get a numeric score if you pass — only a PASS notification.",
    },
    {
      question: "How long does it take to get California real estate exam results?",
      answer:
        "Immediate for electronic exams. You see PASS or FAIL on screen before you leave the center.",
    },
    {
      question: "What should I bring to the California real estate exam?",
      answer:
        "A valid government-issued photo ID and your examination schedule notice. Leave phones, calculators, and notes at home or in the provided locker.",
    },
    {
      question: "Is the California real estate exam harder than other states?",
      answer:
        "Yes — objectively. The 51% first-time pass rate is lower than the national average, the exam has more questions than most states, and the California-specific content requires extra study.",
    },
    {
      question: "What is the hardest part of the California real estate exam?",
      answer:
        "Disclosures and California-specific law. The national concepts (contracts, agency basics) are standard. The California layers — TDS timing, NHD requirements, Mello-Roos, Prop 13 — are where most first-timers lose points.",
    },
  ],
  bottomLine:
    "The California real estate exam is not a memorization test. It is a reading comprehension test about California law with a timer. The people who pass do not necessarily know more real estate — they know more *California* real estate. Drill the disclosures, take timed mocks, and respect the 18-day retake rule. The license is worth the work.",
};
