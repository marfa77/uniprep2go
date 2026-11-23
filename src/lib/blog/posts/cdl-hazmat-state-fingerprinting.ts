import type { BlogPostDraft } from "../types";

const CHECKED = "23 Nov 2026";

export const cdlHazmatStateFingerprintingPost: BlogPostDraft = {
  slug: "cdl-hazmat-endorsement-state-fingerprinting-background-check",
  title: "CDL HazMat fingerprinting: TSA HME fee and agent vs DMV states",
  titleTag: "CDL HazMat: TSA $88.25 HME fee & fingerprints",
  metaDescription:
    "New or renewing CDL HazMat HME applicants pay $88.25 to TSA ($41 with a valid TWIC). Fingerprints are required at enrollment and each 5-year renewal — agent states use TSA centers.",
  publishedAt: "2026-07-27",
  contentUpdated: "2026-11-23",
  eyebrow: "CDL HazMat · TSA & DMV fingerprinting",
  clusterId: "cdl-hazmat",
  relatedSlugs: [
    "cdl-general-knowledge-test-50-questions-what-to-expect",
    "epa-608-practice-test-what-to-expect",
    "epa-608-type-1-vs-type-2-which-first",
  ],
  intro:
    "**Before a HazMat endorsement (HME) goes on your CDL, TSA has to clear you through a security threat assessment. New and renewing applicants pay $88.25, or $41 with a qualifying TWIC, and give fingerprints at enrollment and again at each renewal.** Most drivers enroll with TSA's enrollment provider; drivers licensed in eight states go through their state instead. Every figure below is from TSA's HazMat endorsement and disqualifying-offenses pages, checked " +
    CHECKED +
    ". The knowledge test is a separate state exam; practise it with the [CDL HazMat readiness check](/mock-exams/cdl-hazmat-readiness-check).",
  mockSlug: "cdl-hazmat-readiness-check",
  deckSlug: "cdl-hazmat-anki-deck",
  cta: {
    mockLabel: "Take the free CDL HazMat readiness check",
    deckLabel: "View the CDL HazMat Anki deck (notify when live)",
    summary:
      "While TSA processes your threat assessment, prepare for your state's HazMat knowledge test with the free [CDL HazMat readiness check](/mock-exams/cdl-hazmat-readiness-check): placarding, shipping papers and emergency response.",
  },
  sections: [
    {
      heading: "Where do you enroll: TSA center or your state?",
      blocks: [
        {
          type: "p",
          text: "TSA runs the threat assessment for every state, but eight states handle application and fingerprinting themselves. TSA's page says drivers in **Florida, Kentucky, Maryland, New York, Pennsylvania, Texas, Virginia and Wisconsin** should go to their state Department of Motor Vehicles for application and fingerprinting information.",
        },
        {
          type: "p",
          text: "Everywhere else, you pre-enroll online or by phone with TSA's enrollment provider, then finish at an enrollment center with your documents and fingerprints. Appointments can be booked online or by calling (855) 347-8371, weekdays 8 a.m. to 10 p.m. Eastern; walk-ins are accepted, but appointments come first.",
        },
        {
          type: "p",
          text: "**New York changes on 1 Dec 2026:** applicants must visit two enrollment centers and give fingerprints at each, one set for the New York HME and one for the TSA HME.",
        },
      ],
    },
    {
      heading: "How much does the TSA HazMat threat assessment cost?",
      blocks: [
        {
          type: "table",
          caption: "TSA HME fees (tsa.gov/for-industry/hazmat-endorsement, checked " + CHECKED + ")",
          headers: ["Applicant", "Fee"],
          rows: [
            ["New or renewing applicant", "$88.25"],
            ["Reduced fee: valid TWIC, licensed in a state that accepts the TWIC threat assessment", "$41.00"],
          ],
        },
        {
          type: "p",
          text: "The fee is non-refundable and covers a threat assessment valid for five years. TSA lists the states that accept a TWIC for the reduced fee; some need at least one year left on the TWIC threat assessment and others at least four years, so check your state on TSA's page before paying the lower rate. Your state's own CDL and endorsement fees are separate and set by the state.",
        },
      ],
    },
    {
      heading: "Who can apply, and what can disqualify you?",
      blocks: [
        {
          type: "p",
          text: "You may apply if you are a U.S. citizen, lawful permanent resident, naturalized citizen, or a nonimmigrant, asylee or refugee in lawful status, and hold a CDL issued by a U.S. state. States can set stricter citizenship or lawful-presence rules.",
        },
        {
          type: "topics",
          items: [
            {
              title: "Permanent disqualifying offenses (Part A)",
              body: "A conviction, guilty or no-contest plea, or not-guilty-by-reason-of-insanity finding, whenever it occurred, for offenses such as:",
              bullets: [
                "Espionage, sedition or treason, and federal crimes of terrorism",
                "A crime involving a transportation security incident",
                "Improper transportation of hazardous materials",
                "Unlawful possession, use or sale of an explosive; threats involving explosives or lethal devices",
                "Murder; certain RICO violations; attempts or conspiracies to commit these",
              ],
            },
            {
              title: "Interim disqualifying offenses (Part B)",
              body: "Disqualifying if convicted (or similar finding) within 7 years of applying, or released from incarceration within 5 years of applying. Examples:",
              bullets: [
                "Unlawful dealing in firearms; extortion; bribery; smuggling",
                "Fraud and misrepresentation, including identity fraud and money laundering",
                "Immigration violations; controlled-substance distribution",
                "Arson, kidnapping, robbery, rape, assault with intent to kill, voluntary manslaughter",
              ],
            },
          ],
        },
        {
          type: "p",
          text: "Being wanted or under indictment for a Part A or Part B felony also disqualifies you until it is resolved (Part C).",
        },
      ],
    },
    {
      heading: "How long does TSA take, and when should you start?",
      blocks: [
        {
          type: "ul",
          items: [
            "**Recommendation:** enroll at least **60 days** before you need an eligibility decision, including for renewals. TSA says some applicants wait more than 45 days.",
            "**Goal:** TSA aims to give a status within 60 days of receiving your enrollment information; missing data or hard-to-read fingerprints can add time.",
            "**No letter:** TSA notifies your state licensing agency, and the state shows the result when it issues the CDL with the HME.",
            "**Status checks:** online, except in the eight state-run states, where you check with the state or call 1-833-848-4759.",
          ],
        },
      ],
    },
    {
      heading: "Renewals, TWIC holders and moving states",
      blocks: [
        {
          type: "ul",
          items: [
            "**Renewal:** generally every five years, with new fingerprints. Some states review more often because of shorter license cycles, and states may require written tests.",
            "**TWIC holders:** an HME issued on the basis of a TWIC threat assessment carries the same expiration date as that TWIC assessment, and the state must verify the TWIC before issuing.",
            "**Moving states:** you may not need a new threat assessment if your new state can issue an HME that expires within five years of your last completed one.",
          ],
        },
      ],
    },
    {
      heading: "What to do while you wait for TSA",
      blocks: [
        {
          type: "steps",
          items: [
            {
              title: "Confirm your state's order of steps",
              body: "Ask your licensing agency whether you can take the HazMat knowledge test before TSA clears you; states differ.",
            },
            {
              title: "Study for the knowledge test",
              body: "Use the wait to practise placarding, shipping papers, loading and emergency response with the [CDL HazMat readiness check](/mock-exams/cdl-hazmat-readiness-check).",
            },
            {
              title: "Keep your CDL basics current",
              body: "If you are still building general knowledge, the [CDL general knowledge guide](/blog/cdl-general-knowledge-test-50-questions-what-to-expect) covers the core test.",
            },
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      question: "How much does the TSA HazMat endorsement cost?",
      answer:
        "$88.25 for new and renewing applicants, or $41 if you hold a valid TWIC and are licensed in a state that accepts the TWIC threat assessment (TSA, checked 23 Nov 2026). State fees are extra.",
    },
    {
      question: "Which states do HazMat fingerprinting at the DMV instead of a TSA center?",
      answer:
        "TSA lists Florida, Kentucky, Maryland, New York, Pennsylvania, Texas, Virginia and Wisconsin. Drivers in those states go to their state DMV for application and fingerprinting information.",
    },
    {
      question: "How long does the TSA HazMat background check take?",
      answer:
        "TSA aims to give a status within 60 days of enrollment and recommends enrolling at least 60 days before you need the endorsement; some applicants wait more than 45 days.",
    },
    {
      question: "How long is the HazMat threat assessment valid?",
      answer: "Five years. Renewal generally needs new fingerprints, and some states review more often.",
    },
    {
      question: "Will TSA send me an approval letter?",
      answer:
        "No. TSA notifies your state licensing agency, and your state shows the result when it issues your CDL with the HazMat endorsement.",
    },
    {
      question: "Can I get a HazMat endorsement with a criminal record?",
      answer:
        "It depends on the offense. Some offenses disqualify permanently; others disqualify only if the conviction was within 7 years or release from prison within 5 years of applying. TSA's disqualifying-offenses page lists them.",
    },
    {
      question: "Do I need a new background check if I move to another state?",
      answer:
        "Not always. If your new state can issue an HME that expires within five years of your last completed threat assessment, a new one may not be needed.",
    },
  ],
  bottomLine:
    "Pay $88.25 (or $41 with a qualifying TWIC), enroll at least 60 days ahead, and check whether your state is one of the eight that run enrollment themselves. Sources: [TSA HazMat endorsement](https://www.tsa.gov/for-industry/hazmat-endorsement) and [TSA disqualifying offenses](https://www.tsa.gov/Disqualifying-Offenses-Factors), checked " +
    CHECKED +
    ".",
};
