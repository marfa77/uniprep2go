import type { BlogPostDraft } from "../types";

export const servsafeManagerStudyGuidePost: BlogPostDraft = {
  slug: "servsafe-manager-exam-study-guide-2026",
  title: "ServSafe Manager Exam: The Study Guide That Actually Works (2027)",
  titleTag: "ServSafe Manager Exam Study Guide 2027: Pass on First Try",
  metaDescription:
    "Most people fail ServSafe Manager because they study the wrong chapters. Here is the exact 7-day plan, the topics that matter, and the practice test strategy that works.",
  publishedAt: "2026-07-27",
  contentUpdated: "2026-11-24",
  eyebrow: "ServSafe Manager · Food safety",
  clusterId: "servsafe",
  relatedSlugs: [
    "how-many-practice-tests-before-servsafe-manager-exam",
    "florida-food-manager-certification-dbpr-rules",
    "servsafe-manager-florida-requirements-2026",
  ],
  intro:
    "Failing the ServSafe Manager exam means paying again, rescheduling, and explaining to your employer why the certificate is delayed — usually because temperature rules and pathogens were underestimated. This guide is for people who want to pass the first time.",
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
          text: "You get **90 multiple-choice questions**. Only 80 are scored; 10 are pilot questions that do not count toward your grade. You will not know which is which.",
        },
        {
          type: "p",
          text: "The ServSafe FAQ sets the passing score at **70%** (56 of 80 scored questions correct). You take it on paper or online, always with a Registered ServSafe Proctor; online exams go through ProctorU. Online languages are English, Spanish and Chinese.",
        },
        {
          type: "p",
          text: "ServSafe's Manager Exam Blueprint (linked from its FAQ) sets out the content areas. They cover topics such as:",
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
          text: "Check the current blueprint for how the areas are weighted before you plan your time.",
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
                "Ground (comminuted) meats: 155°F for 17 seconds",
                "Poultry, stuffed meats, casseroles: 165°F for less than 1 second (instantaneous)",
                "Fish and intact meats: 145°F for 15 seconds",
                "Reheating for hot holding: 165°F for 15 seconds, reached within 2 hours",
                "Time as a public health control: up to 4 hours, or up to 6 hours for cold food that stays at 70°F or below (FDA Food Code 3-501.19)",
              ],
            },
            {
              title: "pH and Water Activity",
              body: "",
              bullets: [
                "The FDA Food Code decides whether a food needs time/temperature control from its pH and water activity together (the tables in its TCS food definition)",
                "pH 4.6 is a key cut-off in those tables",
                "Expect questions about preservation and shelf stability",
              ],
            },
            {
              title: "The Big Six Pathogens",
              body: "Know when the FDA Food Code (§ 2-201.12) requires excluding a sick employee versus restricting them. It depends on the symptoms, the diagnosis and whether you serve a highly susceptible population.",
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
            ["Ground meats", "155°F", "17 seconds"],
            ["Poultry / stuffed foods", "165°F", "< 1 second"],
            ["Fish / intact meats", "145°F", "15 seconds"],
            ["Reheat for hot holding", "165°F for 15 seconds", "Within 2 hours"],
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
              body: "Know the difference between cleaning (removing visible soil) and sanitizing (reducing pathogens to safe levels). Three-compartment sink order: wash, rinse, sanitize, air dry. Use sanitizer at the concentration on the label and check it with test strips; the correct range depends on the chemical, the water temperature and the pH.",
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
        "Moderate. People who fail usually underestimated the temperature and pathogen sections. It is not a test you can wing with common sense.",
    },
    {
      question: "How long is the ServSafe Manager certification valid?",
      answer:
        "Check the date on your certificate and your state or local rules; ServSafe lets you retest when your certification is expiring.",
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
        "You can take it twice within 30 days. After a second fail you must wait 60 days, and no more than 4 attempts are allowed in 12 months. Each retake needs a new exam purchase (ServSafe FAQ, checked 24 Nov 2026).",
    },
    {
      question: "Is the ServSafe exam the same in every state?",
      answer:
        "The exam is the same, but requirements differ by state. ServSafe points you to its regulatory requirements map; for Florida, see the Florida requirements guide.",
    },
  ],
  bottomLine:
    "ServSafe Manager is a test of memorization dressed up as a test of judgment. Know your temperatures, know the Big Six, know HACCP, and you will pass. Use a practice test to find your holes, then patch them with flashcards. Do not study what you already know. Sources: [ServSafe Manager FAQs](https://www.servsafe.com/ServSafe-Manager/FAQs) and [FDA Food Code 2022](https://www.fda.gov/food/fda-food-code/food-code-2022), checked 24 Nov 2026.",
};
