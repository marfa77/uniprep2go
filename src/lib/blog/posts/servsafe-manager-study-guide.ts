import type { BlogPostDraft } from "../types";

export const servsafeManagerStudyGuidePost: BlogPostDraft = {
  slug: "servsafe-manager-exam-study-guide-2026",
  title: "ServSafe Manager Exam: The Study Guide That Actually Works (2026)",
  titleTag: "ServSafe Manager Exam Study Guide 2026: Pass on First Try",
  metaDescription:
    "Most people fail ServSafe Manager because they study the wrong chapters. Here is the exact 7-day plan, the topics that matter, and the practice test strategy that works.",
  publishedAt: "2026-07-27",
  eyebrow: "ServSafe Manager · Food safety",
  clusterId: "servsafe",
  relatedSlugs: [
    "florida-food-manager-certification-dbpr-rules",
    "servsafe-manager-florida-requirements-2026",
  ],
  intro:
    "The ServSafe Manager exam has a first-time pass rate of roughly **75%**, which sounds generous until you realize the 25% who fail have to pay again, reschedule, and explain to their employer why the certificate is delayed. This guide is for people who do not want to be in that 25%.",
  mockSlug: "servsafe-manager-mock",
  deckSlug: "servsafe-manager-anki-deck",
  cta: {
    mockLabel: "Take the free ServSafe Manager mock",
    deckLabel: "Drill weak topics with the Anki deck",
    summary:
      "Take the free ServSafe Manager mock → get your pass/no-pass report → drill temperatures, pathogens, and HACCP with the Anki deck.",
  },
  sections: [
    {
      heading: "What the Exam Actually Looks Like",
      blocks: [
        {
          type: "p",
          text: "You get **90 questions** in **120 minutes**. Only 80 are scored; 10 are pilot questions that do not count toward your grade. You will not know which is which.",
        },
        {
          type: "p",
          text: "The passing score is **75%** (60 out of 80 scored questions correct). The exam is available in paper, computer, and online proctored formats.",
        },
        {
          type: "p",
          text: "The content breaks down into seven sections:",
        },
        {
          type: "ol",
          items: [
            "Foodborne microorganisms and allergens",
            "Personal hygiene",
            "Purchasing, receiving, and storage",
            "Preparation, cooking, and serving",
            "Facilities, cleaning, and sanitizing",
            "Pest management",
            "Food safety management systems",
          ],
        },
        {
          type: "p",
          text: "Sections 1, 4, and 5 carry the most weight. If you are short on time, study those first.",
        },
      ],
    },
    {
      heading: "The Topics That Actually Matter",
      blocks: [
        {
          type: "topics",
          items: [
            {
              title: "Temperatures",
              body: "This is the single highest-yield category on the exam. You need these cold:",
              bullets: [
                "Cold holding: 41°F (5°C) or below",
                "Hot holding: 135°F (57°C) or above",
                "Ground beef, pork, lamb: 155°F for 15 seconds",
                "Poultry, stuffed meats, casseroles: 165°F for 15 seconds",
                "Whole cuts of beef, pork, lamb, fish: 145°F for 15 seconds",
                "Reheating for hot holding: 165°F within 2 hours",
                "TCS foods in the Danger Zone: 41°F to 135°F (discard after 4 hours, or 6 hours with time as a control)",
              ],
            },
            {
              title: "pH and Water Activity",
              body: "",
              bullets: [
                "Pathogens grow best at pH 4.6 to 7.5",
                "Most bacteria need water activity (aw) above 0.85",
                "These numbers show up in questions about preservation and shelf stability",
              ],
            },
            {
              title: "The Big Six Pathogens",
              body: "The exam loves these. Know which ones require exclusion from the operation (Salmonella Typhi, Shigella, E. coli O157:H7, Hepatitis A) and which require restriction (Norovirus, Nontyphoidal Salmonella).",
              bullets: [
                "Salmonella Typhi",
                "Shigella spp.",
                "E. coli O157:H7",
                "Hepatitis A",
                "Norovirus",
                "Nontyphoidal Salmonella",
              ],
            },
            {
              title: "HACCP Principles",
              body: "All seven, in order. You will get at least one question that asks you to identify the CCP in a scenario. If you cannot spot it, you lose easy points.",
              bullets: [
                "Conduct a hazard analysis",
                "Determine critical control points (CCPs)",
                "Establish critical limits",
                "Establish monitoring procedures",
                "Identify corrective actions",
                "Verify the system works",
                "Record-keeping and documentation",
              ],
            },
          ],
        },
        {
          type: "table",
          caption: "ServSafe Manager cooking and holding temperatures",
          headers: ["Food / control", "Temperature", "Hold / time"],
          rows: [
            ["Cold holding", "41°F (5°C) or below", "Continuous"],
            ["Hot holding", "135°F (57°C) or above", "Continuous"],
            ["Ground meats", "155°F", "15 seconds"],
            ["Poultry / stuffed foods", "165°F", "15 seconds"],
            ["Whole cuts / fish", "145°F", "15 seconds"],
            ["Reheat for hot holding", "165°F", "Within 2 hours"],
          ],
        },
      ],
    },
    {
      heading: "The 7-Day Study Plan",
      blocks: [
        {
          type: "steps",
          items: [
            {
              title: "Day 1: Temperatures and Time",
              body: "Memorize every temperature in the FDA Food Code. Run a 20-question practice test on nothing but temperatures.",
            },
            {
              title: "Day 2: Pathogens and Allergens",
              body: "Focus on the Big Six, their symptoms, and their exclusion/restriction rules. Add allergen cross-contact prevention.",
            },
            {
              title: "Day 3: The Flow of Food",
              body: "Receiving → Storage → Preparation → Cooking → Holding → Serving. Know the temperature checks at each stage.",
            },
            {
              title: "Day 4: Cleaning, Sanitizing, and Pest Control",
              body: "Know the difference between cleaning (removing visible soil) and sanitizing (reducing pathogens to safe levels). Three-compartment sink order: wash, rinse, sanitize, air dry. Chemical sanitizer concentrations: chlorine 50–100 ppm, quaternary ammonium 200 ppm, iodine 12.5–25 ppm.",
            },
            {
              title: "Day 5: HACCP and Management Systems",
              body: "Drill the seven principles. Practice identifying CCPs in written scenarios.",
            },
            {
              title: "Day 6: Full Mock Exam",
              body: "90 questions, timed, no notes. Score it. Anything below 70% means you need another day on that topic.",
            },
            {
              title: "Day 7: Weak-Topic Repair",
              body: "Review only the questions you missed on Day 6. Do not study new material. Sleep more than you think you need.",
            },
          ],
        },
      ],
    },
    {
      heading: "How to Use Practice Tests Without Cheating Yourself",
      blocks: [
        {
          type: "p",
          text: "The biggest trap: recognizing an answer because you saw it before. That is not knowledge. That is pattern matching.",
        },
        {
          type: "p",
          text: "Here is the fix:",
        },
        {
          type: "ul",
          items: [
            "After each practice test, write down why the right answer is right **and** why each distractor is wrong.",
            "If you guessed and got lucky, mark it wrong. Count only the answers you knew.",
            "Wait at least 48 hours between retakes of the same test. Otherwise you are testing memory, not understanding.",
          ],
        },
      ],
    },
    {
      heading: "What to Bring on Exam Day",
      blocks: [
        {
          type: "ul",
          items: [
            "Government-issued photo ID",
            "Confirmation number",
            "A mask if the test center requires it (call ahead)",
            "Do not bring: phones, notes, food, drinks",
          ],
        },
        {
          type: "p",
          text: "If you are taking the online proctored version, test your webcam and internet speed the day before. A dropped connection mid-exam can cost you the sitting.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "How hard is the ServSafe Manager exam?",
      answer:
        "Moderate. The 75% pass rate means most people pass, but the 25% who fail usually underestimated the temperature and pathogen sections. It is not a test you can wing with common sense.",
    },
    {
      question: "How long is the ServSafe Manager certification valid?",
      answer:
        "5 years. Some states or employers require renewal sooner. Check your local health department rules.",
    },
    {
      question: "Can I take the ServSafe Manager exam without the course?",
      answer:
        "Yes, in most jurisdictions. You can self-study and sit for the exam. However, some employers require proof of the course completion, not just the exam.",
    },
    {
      question: "What is the difference between ServSafe Food Handler and ServSafe Manager?",
      answer:
        "Food Handler is a shorter, simpler certification for line employees. Manager is for supervisors and covers HACCP, management systems, and regulatory compliance. The exams are not interchangeable.",
    },
    {
      question: "How many times can I retake the ServSafe Manager exam?",
      answer:
        "There is no lifetime limit, but you must wait 24 hours between attempts and pay the exam fee each time.",
    },
    {
      question: "Is the ServSafe exam the same in every state?",
      answer:
        "The national exam is standardized, but some states (California, Texas, Florida) have additional requirements or accept only specific proctors. Verify with your local health department.",
    },
  ],
  bottomLine:
    "ServSafe Manager is a test of memorization dressed up as a test of judgment. Know your temperatures, know the Big Six, know HACCP, and you will pass. Use a practice test to find your holes, then patch them with flashcards. Do not study what you already know.",
};
