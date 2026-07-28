import type { BlogPostDraft } from "../types";

export const epa608PracticeTestPost: BlogPostDraft = {
  slug: "epa-608-practice-test-what-to-expect",
  title: "EPA 608 Practice Test: What to Expect and How to Pass on Your First Try",
  titleTag: "EPA 608 Practice Test: What to Expect and How to Pass First Time",
  metaDescription:
    "Taking an EPA 608 practice test? Here is exactly what shows up on the real exam, how the scoring works, and the mistakes that make people fail twice.",
  publishedAt: "2026-07-27",
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
    deckLabel: "Drill weak topics with the Anki deck",
    summary:
      "Take the free 25-question EPA 608 mock → get your pass/no-pass report → drill weak topics with the Anki deck.",
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
          text: "EPA does not publish exact passing scores, but industry consensus puts it at **72%** based on field reports from Pearson VUE and PSI testing centers. You get 25 questions on Core and 25 per type section. That means you can miss roughly 7 questions per section and still pass.",
        },
        {
          type: "p",
          text: "The exam is closed-book. No calculators with memory functions. No phones. You get scratch paper and a basic calculator if needed.",
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
                "Commercial refrigeration: repair within 30 days if charge is 50+ lbs and leak rate exceeds 35%",
                "Comfort cooling: 30 days, leak rate threshold is 10%",
                "Industrial process refrigeration: 30 days, but up to 120 days with a retrofit plan",
              ],
            },
            {
              title: "2. Recovery requirements",
              body: "",
              bullets: [
                "Type I (small appliances): recover to 0 psi before disposal",
                "Type II (high-pressure): recover to 15 inches of vacuum (or 0 psi if leaking)",
                "Type III (low-pressure): recover to 25 inches of vacuum",
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
              body: "",
              bullets: [
                "1993: Ban on venting CFCs and HCFCs",
                "2010: Ban on production of R-22 for new equipment",
                "2015: 90% reduction in HCFC production baseline",
                "2020: Total phase-out of R-22 production",
              ],
            },
          ],
        },
        {
          type: "table",
          caption: "EPA 608 recovery targets by type",
          headers: ["Section", "Appliance type", "Recovery target"],
          rows: [
            ["Type I", "Small appliances", "0 psi before disposal"],
            ["Type II", "High-pressure", "15 in. vacuum (or 0 psi if leaking)"],
            ["Type III", "Low-pressure", "25 in. vacuum"],
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
              body: "EPA 608 has too many numbers to hold in working memory. Put the thresholds, dates, and PSI levels into spaced-repetition cards. Review them daily for a week before the exam.",
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
            "**Ignoring the test-center rules.** PSI centers enforce a strict no-phone policy. If your Apple Watch buzzes, they can invalidate your score.",
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
      answer: "25 multiple-choice questions. You need roughly 18 correct to pass.",
    },
    {
      question: "Can I take the EPA 608 exam online?",
      answer:
        "Yes, through approved online proctoring services. You still need a webcam and a clean workspace.",
    },
    {
      question: "What is the difference between Type II and Type III?",
      answer:
        "Type II covers high-pressure appliances like residential AC and supermarket refrigeration. Type III covers low-pressure appliances like chillers. The evacuation requirements differ: 15 inches of vacuum for Type II, 25 inches for Type III.",
    },
    {
      question: "How much does the EPA 608 exam cost?",
      answer:
        "Between $25 and $150 depending on the proctor and whether you bundle sections. Retakes usually cost the same as the original.",
    },
    {
      question: "How long is EPA 608 certification good for?",
      answer:
        "There is no expiration date on the certification itself. However, if the EPA updates regulations significantly, you may need continuing education to stay compliant.",
    },
  ],
  bottomLine:
    "Passing the EPA 608 on the first try is about knowing the regulations cold, not being the best technician in the shop. Take a practice test early, find your gaps, and drill the numbers until they are automatic. The exam does not test your hands. It tests whether you read the rulebook.",
};
