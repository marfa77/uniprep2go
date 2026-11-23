import type { BlogPostDraft } from "../types";

export const epa608PracticeTestPost: BlogPostDraft = {
  slug: "epa-608-practice-test-what-to-expect",
  title: "EPA 608 Practice Test: What to Expect and How to Pass on Your First Try",
  titleTag: "EPA 608 Practice Test: What to Expect and How to Pass First Time",
  metaDescription:
    "Taking an EPA 608 practice test? Here is exactly what shows up on the real exam, how the scoring works, and the mistakes that make people fail twice.",
  publishedAt: "2026-07-27",
  contentUpdated: "2026-11-23",
  eyebrow: "EPA 608 · HVAC certification",
  clusterId: "epa-608",
  relatedSlugs: [
    "epa-608-type-1-vs-type-2-which-first",
    "memorize-epa-608-refrigerant-numbers-method",
  ],
  intro:
    "The EPA 608 exam is not hard, but it is specific. You can know HVAC systems inside out and still fail because you missed the fine print on recovery requirements or mixed up the dates for the Montreal Protocol. This guide breaks down what actually appears on the test, how the scoring works, and how to use a practice test without wasting your time.",
  mockSlug: "epa-608-readiness-check",
  deckSlug: "hvac-epa-608-anki-deck",
  cta: {
    mockLabel: "Take the free EPA 608 mock",
    deckLabel: "EPA 608 Anki deck",
    summary:
      "Take the free 25-question EPA 608 mock → get your pass/no-pass report → drill weak topics with the [EPA 608 Anki deck](/decks/hvac-epa-608-anki-deck).",
  },

  sections: [
    {
      heading: "What the EPA 608 Exam Actually Tests",
      blocks: [
        {
          type: "p",
          text: "The EPA divides the certification into four sections:",
        },
        {
          type: "ul",
          items: [
            "**Core** (mandatory for all)",
            "**Type I** (small appliances)",
            "**Type II** (high-pressure appliances)",
            "**Type III** (low-pressure appliances)",
            "**Universal** (all of the above)",
          ],
        },
        {
          type: "p",
          text: "Most technicians sit for Core + Type I + Type II to get Universal. You cannot get any type certification without passing Core first.",
        },
        {
          type: "p",
          text: "The Core section covers:",
        },
        {
          type: "ul",
          items: [
            "Ozone depletion science (CFCs, HCFCs, HFCs)",
            "Section 608 regulations and penalties",
            "Recovery techniques and requirements",
            "Safety (PSI levels, toxicity, PPE)",
            "Leak repair timelines and thresholds",
            "Refrigerant identification and disposal",
          ],
        },
        {
          type: "p",
          text: "Type-specific sections go deeper into recovery rates, evacuation levels, and equipment restrictions.",
        },
      ],
    },
    {
      heading: "How the Scoring Works",
      blocks: [
        {
          type: "p",
          text: "The passing score is set in federal rules, not by consensus. Appendix D to 40 CFR part 82, subpart F says closed-book Type I, Type II, Type III and Universal tests pass at **70%**, and Type I tests in the mail-in format at **84%**. Each test has 25 questions from the Core group and 25 from each technical group you take, so 70% means 18 of 25 in every group. A Universal test has 100 questions.",
        },
        {
          type: "p",
          text: "Type II, Type III and Universal tests must be closed-book and proctored in a secure environment, and proctors must make sure you use no notes or training materials. Type I-only programs may use an on-site or mail-in format, but a mail-in Type I test does not count toward Universal, and neither does an open-book Core test. Tests are given by EPA-approved certifying organizations, which issue a wallet card within 30 days.",
        },
      ],
    },
    {
      heading: "The Topics That Trip People Up",
      blocks: [
        {
          type: "p",
          text: "Here is where first-time test-takers bleed points:",
        },
        {
          type: "topics",
          items: [
            {
              title: "1. Leak repair deadlines",
              body: "",
              bullets: [
                "Applies to appliances with a full charge of 50 lb or more (40 CFR 82.157)",
                "Leak-rate thresholds: 20% commercial refrigeration, 30% industrial process refrigeration, 10% comfort cooling and other appliances",
                "Repair within 30 days of adding refrigerant to an appliance over its threshold, or 120 days if an industrial process shutdown is required",
              ],
            },
            {
              title: "2. Recovery requirements",
              body: "",
              bullets: [
                "Small appliances (Type I): recover 90% of the refrigerant (80% if the compressor is not working or the recovery equipment predates 15 Nov 1993), or evacuate to 4 in Hg vacuum",
                "High- and medium-pressure appliances (Type II): evacuate to the Table 1 level for the pressure class and charge size before opening (see the table below)",
                "Low-pressure appliances (Type III): 25 mm Hg absolute",
              ],
            },
            {
              title: "3. Reclaimed vs. Recycled vs. Reused",
              body: "These three words show up on nearly every exam form. Get them wrong and you will see that word again on your retake.",
              bullets: [
                "**Recycled**: cleaned on-site, reused on-site",
                "**Reclaimed**: cleaned to ARI-700 standard, can be sold",
                "**Reused**: put back into the same system without processing",
              ],
            },
            {
              title: "4. The dates",
              body: "EPA's Core test topics include Clean Air Act and Montreal Protocol phaseout dates and the venting prohibition. Learn them from EPA's Section 608 pages rather than from memory aids, and drill them in cards.",
            },
          ],
        },
        {
          type: "table",
          caption: "Required evacuation levels, 40 CFR 82.156 Table 1 (recovery equipment made on or after 15 Nov 1993)",
          headers: ["Appliance", "Evacuation level"],
          rows: [
            ["Very high-pressure", "0 in Hg"],
            ["High-pressure, full charge under 200 lb", "0 in Hg"],
            ["High-pressure, 200 lb or more", "10 in Hg"],
            ["Medium-pressure, under 200 lb", "10 in Hg"],
            ["Medium-pressure, 200 lb or more", "15 in Hg"],
            ["Low-pressure", "25 mm Hg absolute"],
            ["Small appliance", "90% / 80% recovery, or 4 in Hg"],
          ],
        },
      ],
    },
    {
      heading: "How to Use an EPA 608 Practice Test the Right Way",
      blocks: [
        {
          type: "p",
          text: "A practice test is not a study guide. It is a diagnostic tool. Here is the workflow that works:",
        },
        {
          type: "steps",
          items: [
            {
              title: "Step 1: Take a timed mock cold",
              body: "Do not study first. 25 questions, 30 minutes. See where you land. If you score below 60%, you have content gaps, not test anxiety.",
            },
            {
              title: "Step 2: Tag your misses",
              body: "Do not just read the correct answer. Categorize the mistake: Did not know the regulation? → Flashcard. Knew it but forgot the number? → Drill the number. Misread the question? → Slow down on the next mock.",
            },
            {
              title: "Step 3: Run a second mock 48 hours later",
              body: "Spaced repetition beats cramming. If your score jumps 10+ points, you are learning. If it stays flat, you are memorizing answers, not concepts.",
            },
            {
              title: "Step 4: Hit the weak spots with flashcards",
              body: "EPA 608 has too many numbers to hold in working memory. Put the thresholds, dates, and PSI levels into spaced-repetition cards — the [EPA 608 Anki deck](/decks/hvac-epa-608-anki-deck) is built for Core and Types I–III. Review them daily for a week before the exam.",
            },
          ],
        },
      ],
    },
    {
      heading: "Common Mistakes on Exam Day",

      blocks: [
        {
          type: "ul",
          items: [
            "**Rushing through Core.** It is only 25 questions, but it is mandatory. Fail Core and you fail everything. Do not treat it as a warm-up.",
            "**Ignoring the proctor's rules.** Closed-book tests mean no notes or training materials at your desk; follow your certifying program's rules on phones and devices.",
            "**Guessing on leak-rate math.** If a question asks whether 15% annual leak rate triggers repair on a 100-pound comfort cooling system, work it out. The threshold is 10%. 15% is over. The answer is yes.",
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Is the EPA 608 exam open book?",
      answer:
        "No. It is closed-book and proctored. You cannot bring notes, phones, or smartwatches.",
    },
    {
      question: "How many questions are on the EPA 608 Core exam?",
      answer: "25 questions from the Core group on every test. At the 70% passing score, that is 18 of 25 (40 CFR part 82, subpart F, appendix D).",
    },
    {
      question: "Can I take the EPA 608 exam online?",
      answer:
        "It depends on the certifying program. Type I-only tests may be mail-in or on-site; Type II, Type III and Universal must be closed-book and proctored in a secure environment. Check what your EPA-approved program offers.",
    },
    {
      question: "What is the difference between Type II and Type III?",
      answer:
        "Type II covers medium-, high- and very-high-pressure appliances; Type III covers low-pressure appliances. Evacuation levels differ: Type II levels range from 0 to 15 in Hg by pressure class and charge size, while low-pressure appliances go to 25 mm Hg absolute (40 CFR 82.156).",
    },
    {
      question: "How much does the EPA 608 exam cost?",
      answer:
        "Each EPA-approved certifying organization sets its own fee; EPA does not set a price. Compare programs on EPA's list of certifying organizations.",
    },
    {
      question: "How long is EPA 608 certification good for?",
      answer:
        "EPA states that Section 608 technician certifications do not expire. Keep a copy of your certificate at your place of business.",
    },
  ],
  bottomLine:
    "Passing the EPA 608 on the first try is about knowing the regulations cold, not being the best technician in the shop. Take a practice test early, find your gaps, then drill the numbers in the [EPA 608 Anki deck](/decks/hvac-epa-608-anki-deck) until they are automatic. Sources: [40 CFR 82.156](https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-82/subpart-F/section-82.156), [40 CFR 82.157](https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-82/subpart-F/section-82.157), [appendix D](https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-82/subpart-F/appendix-Appendix%20D%20to%20Subpart%20F%20of%20Part%2082) and [EPA Section 608 requirements](https://www.epa.gov/section608/section-608-technician-certification-requirements), checked 23 Nov 2026.",
};
