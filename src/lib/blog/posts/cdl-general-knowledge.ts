import type { BlogPostDraft } from "../types";

export const cdlGeneralKnowledgePost: BlogPostDraft = {
  slug: "cdl-general-knowledge-test-50-questions-what-to-expect",
  title: "CDL General Knowledge: The 50-Question Exam Every Trucker Fails at Least Once",
  titleTag: "CDL General Knowledge Test 2026: 50 Questions, 80% Pass & What to Expect",
  metaDescription:
    "50 questions. 60 minutes. 80% to pass. Every CDL applicant takes it, but half fail on the first try. Exact topic split — and why air brakes are not on this test.",
  publishedAt: "2026-07-28",
  eyebrow: "CDL · General Knowledge",
  clusterId: "cdl-general-knowledge",
  relatedSlugs: [
    "cdl-hazmat-endorsement-state-fingerprinting-background-check",
    "epa-608-practice-test-what-to-expect",
    "florida-food-manager-certification-dbpr-rules",
  ],
  intro:
    "**Before you can add HazMat, drive a school bus, or pull a tanker, you must pass the CDL General Knowledge test.** It is the gatekeeper for every commercial driver in America — Class A, B, and C. The format sounds simple: 50 multiple-choice questions, 60 minutes, 80% to pass. Roughly half of first-timers fail because they confuse this exam with endorsements, study the wrong manual chapters, or walk in thinking “I have driven for 20 years — how hard can it be?” This guide covers topics, state wrinkles, and the hard line between General Knowledge and the endorsement tests that come after.",
  mockSlug: "cdl-general-knowledge-readiness-check",
  deckSlug: "cdl-general-knowledge-anki-deck",
  cta: {
    mockLabel: "Take the free CDL General Knowledge readiness check",
    deckLabel: "Join the CDL General Knowledge Anki waitlist",
    summary:
      "Clear the gate with the free CDL General Knowledge readiness check — timed practice on inspection, space management, and emergencies. Then join the Anki waitlist to drill weak spots before you pay the DMV fee.",
  },
  sections: [
    {
      heading: "The Format (Federal Baseline, State Variation)",
      blocks: [
        {
          type: "p",
          text: "FMCSA sets the minimum standard; each state DMV adds its own layer. Federal baseline:",
        },
        {
          type: "table",
          caption: "Federal baseline",
          headers: ["Detail", "Specification"],
          rows: [
            ["Questions", "50 multiple-choice"],
            ["Time limit", "60 minutes (most states)"],
            ["Passing score", "40 correct (80%)"],
            ["Delivery", "Computer-based at DMV or third-party centre"],
            [
              "Languages",
              "English and Spanish in most states; some add Russian, Serbian-Croatian",
            ],
            ["Open book?", "No — no notes, phones, or alpha-keypad calculators"],
          ],
        },
        {
          type: "ul",
          items: [
            "**Texas:** pass a separate 25-question Texas Commercial Rules test before the 50-question General Knowledge — scored separately",
            "**New Jersey:** ~$125 Examination Test Receipt covers knowledge tests; fail → wait 7 days and pay again",
            "**Washington:** knowledge tests valid ~180 days; CLP renewal windows can extend another 180 days",
          ],
        },
      ],
    },
    {
      heading: "What Is Actually on the Test",
      blocks: [
        {
          type: "p",
          text: "General Knowledge covers the first ~6–7 chapters of your **state** CDL manual. It does **not** include endorsements. Studying air brakes, combination vehicles, or HazMat for this sitting wastes time — those are separate exams.",
        },
        {
          type: "table",
          caption: "Core topics",
          headers: ["Topic", "What the test asks"],
          rows: [
            ["Vehicle inspection", "Pre-trip items, brake check, defect reporting"],
            ["Basic vehicle control", "Shifting, backing, turning radius, clearances"],
            ["Space management", "Following distance, stopping distance, overhead clearance"],
            ["Speed management", "Curves, grades, weather, cargo shift"],
            ["Night driving", "Glare, fatigue, lighting"],
            ["Extreme weather", "Hydroplaning, high winds, fog, ice"],
            ["Emergency procedures", "Brake failure, tire blowout, fires, accidents"],
            ["Hazard perception", "Road conditions, other drivers, animals"],
            ["Railroad crossings", "Stopping distance, passive vs active crossings"],
            ["Cargo securement", "Weight distribution, tie-downs, inspection"],
            ["Alcohol and drugs", "BAC limits, disqualification, random testing"],
            ["Fatigue / HOS", "Basic hours-of-service concepts"],
          ],
        },
        {
          type: "p",
          text: "**Air brakes trap:** not on General Knowledge — separate ~25-question endorsement. Skip it and your CDL gets an **L** restriction (no air brakes). Most modern CMV fleets use air brakes, so most applicants take both — separate fees, separate passes.",
        },
      ],
    },
    {
      heading: "The Math You Actually Need",
      blocks: [
        {
          type: "ul",
          items: [
            "**Stopping distance** = perception + reaction + braking distance",
            "**Following distance:** ~1 second per 10 feet of vehicle length under 40 mph; add 1 second per extra 10 mph",
            "**Bridge formulas:** gross weight limits by axle spacing",
            "**Cargo weight:** total − empty = cargo",
          ],
        },
        {
          type: "p",
          text: "Example: 60-foot truck at 50 mph → 6 seconds (length) + 1 second (extra 10 mph over 40) = **7 seconds** minimum following time. No calculus — formulas cold, then apply.",
        },
      ],
    },
    {
      heading: "The Difference Between General Knowledge and Endorsements",
      blocks: [
        {
          type: "table",
          caption: "Knowledge tests at a glance",
          headers: ["Test", "Questions", "Who needs it", "Separate fee?"],
          rows: [
            ["General Knowledge", "50", "Everyone", "Yes"],
            ["Air Brakes", "25", "Most drivers (avoid L restriction)", "Yes"],
            ["Combination Vehicles", "20", "Class A only", "Yes"],
            ["HazMat", "30", "HazMat haulers", "Yes + TSA background"],
            ["Tank Vehicles", "20", "Tanker drivers", "Yes"],
            ["Doubles/Triples", "20", "Doubles/triples", "Yes"],
            ["Passenger", "20", "Bus drivers", "Yes"],
            ["School Bus", "20", "School bus drivers", "Yes"],
          ],
        },
        {
          type: "p",
          text: "**Class A combo:** General Knowledge + Air Brakes + Combination = 50 + 25 + 20 = **95** questions. Some states allow one sitting; others split appointments. Confirm with your DMV.",
        },
      ],
    },
    {
      heading: "Study Strategy: The Two-Step Method",
      blocks: [
        {
          type: "ol",
          items: [
            "Read your **official state CDL manual** once — exam wording comes from it, not random prep books",
            "Full **50-question timed** mocks until bored — not 10-question snack quizzes",
          ],
        },
        {
          type: "ul",
          items: [
            "First mock (diagnostic): ~60–70% is normal",
            "After review: ~75–80%",
            "Confidence check: **85%+** before you book",
          ],
        },
        {
          type: "p",
          text: "Do not schedule the DMV until you hit 85% on a timed mock with questions you have not memorised by rote.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "How many questions are on the CDL General Knowledge test?",
      answer: "50 multiple-choice questions. You need 40 correct (80%) to pass.",
    },
    {
      question: "What score do I need to pass the CDL General Knowledge exam?",
      answer: "80% — 40 out of 50 correct answers.",
    },
    {
      question: "How long is the CDL General Knowledge test?",
      answer:
        "Most states allow about 60 minutes. Some have no hard clock — still plan for an hour.",
    },
    {
      question: "Is the CDL General Knowledge test the same in every state?",
      answer:
        "Federal content is standardised, but states add local items. Texas requires a separate Commercial Rules test first. Always use your state’s CDL manual.",
    },
    {
      question: "Are air brakes on the General Knowledge test?",
      answer:
        "No. Air brakes have a separate ~25-question endorsement. Skip it and you get an L restriction — no air-brake vehicles.",
    },
    {
      question: "How much does the CDL General Knowledge test cost?",
      answer:
        "Varies by state (CLP, knowledge receipt, skills fees differ). Check your DMV fee schedule.",
    },
    {
      question: "Can I retake the CDL General Knowledge test if I fail?",
      answer:
        "Yes. Most states require a wait of 24 hours to 7 days. You usually pay again unless retakes are bundled.",
    },
    {
      question: "What languages is the CDL General Knowledge test available in?",
      answer:
        "English and Spanish in most states; some offer additional languages. Federal rules still require enough English to read signs and talk with officials.",
    },
    {
      question: "Do I need to pass General Knowledge before endorsement tests?",
      answer:
        "Yes. General Knowledge is the prerequisite for endorsements and the skills test.",
    },
    {
      question: "How long is a CDL permit valid after passing the knowledge tests?",
      answer:
        "About 180 days in most states. Some allow a one-time renewal for another 180 days if you renew in time.",
    },
  ],
  bottomLine:
    "CDL General Knowledge is reading comprehension about commercial safety with a timer — not an IQ test. Failures skip the manual and trust “common sense.” Trucks are not cars: longer stops, bigger blinds, worse consequences. Read the state manual, take full 50-question timed mocks, clear 80%. Endorsements come later — only after this gate.",
};
