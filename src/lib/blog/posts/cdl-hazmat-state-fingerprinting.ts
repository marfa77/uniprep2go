import type { BlogPostDraft } from "../types";

export const cdlHazmatStateFingerprintingPost: BlogPostDraft = {
  slug: "cdl-hazmat-endorsement-state-fingerprinting-background-check",
  title: "CDL HazMat Endorsement: The State-by-State Fingerprinting Guide",
  titleTag:
    "CDL HazMat Endorsement: State-by-State Fingerprinting & Background Check 2026",
  metaDescription:
    "Not every state fingerprints you at a TSA center. Some use the DMV. Others add training. Here is the exact process for your state, the fee breakdown, and why your HazMat application gets rejected.",
  publishedAt: "2026-07-27",
  eyebrow: "CDL HazMat · TSA & DMV fingerprinting",
  clusterId: "cdl-hazmat",
  relatedSlugs: [],
  intro:
    "Most guides tell you to \"go to a TSA enrollment center and get fingerprinted.\" That is wrong for seventeen states. If you live in Texas, Florida, or New York, you do not go to TSA. You go to your DMV. If you live in Washington, you need a state-approved training course before you can even sit for the knowledge test. If you show up at the wrong place with the wrong documents, you lose a day and the appointment fee. This guide maps the two systems, the extra-step states, and the exact documents you need so you do not get sent home.",
  mockSlug: "cdl-hazmat-readiness-check",
  deckSlug: "cdl-hazmat-anki-deck",
  cta: {
    mockLabel: "Take the free CDL HazMat readiness check",
    deckLabel: "View the CDL HazMat Anki deck (notify when live)",
    summary:
      "Take the free CDL HazMat readiness check — placarding, shipping papers, and emergency response — then join the Anki deck waitlist / drill weak topics before you pay for fingerprinting and state fees.",
  },
  sections: [
    {
      heading: "There Are Two Types of States. Know Which One You Live In.",
      blocks: [
        {
          type: "p",
          text: "The TSA runs the HazMat background check federally, but states choose how you submit your fingerprints. There are two categories:",
        },
        {
          type: "topics",
          items: [
            {
              title: "TSA Agent States (34 states + DC)",
              body: "You pre-enroll online at the TSA Universal Enrollment Services (UES) website or by phone, then visit a TSA-approved enrollment center for fingerprinting and identity verification. The TSA agent collects your prints, your documents, and your fee. The TSA processes everything.",
            },
            {
              title: "Non-TSA Agent States (17 states)",
              body: "Your state DMV collects your fingerprints and application data itself, then forwards everything to TSA. You do not visit a TSA enrollment center. You visit a DMV office. The states are:",
              bullets: [
                "Florida, Illinois, Indiana, Iowa, Kansas, Kentucky, Maryland",
                "Mississippi, New Mexico, New York, Pennsylvania, South Carolina, Tennessee",
                "Texas, Vermont, Virginia, Wisconsin",
              ],
            },
          ],
        },
        {
          type: "p",
          text: "If you are in a Non-TSA Agent state and walk into a TSA center, they will turn you away. If you are in a TSA Agent state and go to the DMV for fingerprints, the DMV will turn you away. Check your category before you schedule anything. Confirm current lists with FMCSA/TSA — state participation can change.",
        },
      ],
    },
    {
      heading: "TSA Agent States: The Exact Process",
      blocks: [
        {
          type: "steps",
          items: [
            {
              title: "Step 1: Complete ELDT HazMat theory (if required)",
              body: "Complete FMCSA-approved Entry-Level Driver Training (ELDT) HazMat theory if you are a first-time applicant. The provider reports your completion to the FMCSA Training Provider Registry. Drivers who held HazMat before February 7, 2022 are typically exempt.",
            },
            {
              title: "Step 2: Pass your state’s HazMat knowledge test",
              body: "Some states let you take this before TSA clearance; others require TSA pre-enrollment first. Check locally.",
            },
            {
              title: "Step 3: Pre-enroll for the TSA Security Threat Assessment",
              body: "Pre-enroll online at the UES website or call 855-347-8371.",
            },
            {
              title: "Step 4: Visit a TSA enrollment center",
              body: "Bring a valid CDL or commercial learner permit (CLP), proof of citizenship or lawful permanent resident status (passport, birth certificate, or green card), identity document (driver's license), and the federal fee. Fee amounts change — verify current TSA pricing before you go (TWIC holders may get a reduced assessment fee).",
            },
            {
              title: "Step 5: Wait for TSA processing",
              body: "Timeline: 30–45 days, sometimes 60+ during busy periods. TSA notifies your state directly. You do not get a letter.",
            },
            {
              title: "Step 6: Return to the DMV for the endorsement",
              body: "Pay the state endorsement fee ($5–$20 typically) and receive your updated CDL.",
            },
          ],
        },
        {
          type: "table",
          caption: "Typical federal fee components (TSA Agent states — verify current amounts)",
          headers: ["Component", "What it covers"],
          rows: [
            ["Information collection and transmission", "Enrollment / fingerprint capture"],
            ["Threat assessment", "TSA Security Threat Assessment"],
            ["FBI criminal history check", "Fingerprint-based FBI check"],
            ["Total", "Often quoted near $85–$94 before state endorsement fees"],
          ],
        },
      ],
    },
    {
      heading: "Non-TSA Agent States: The DMV Runs the Show",
      blocks: [
        {
          type: "p",
          text: "In these 17 states, the process looks similar but the entry point is different:",
        },
        {
          type: "steps",
          items: [
            {
              title: "Step 1: Complete ELDT HazMat theory",
              body: "Same federal ELDT rule as above when it applies.",
            },
            {
              title: "Step 2: Start at your state DMV or BMV",
              body: "You do not use the TSA UES website or visit a TSA center for fingerprinting.",
            },
            {
              title: "Step 3: Submit fingerprints, identity documents, and fees at the DMV",
              body: "The state collects a processing fee on top of the federal charges. The exact amount varies by state because each state sets its own collection and transmission fee.",
            },
            {
              title: "Step 4: State forwards data to TSA",
              body: "TSA still runs the threat assessment and FBI check.",
            },
            {
              title: "Step 5: Get cleared, then finish at the DMV",
              body: "TSA notifies the state of your clearance. You return to the DMV for the knowledge test (if you have not taken it yet) and endorsement issuance.",
            },
          ],
        },
        {
          type: "p",
          text: "**Critical document warning:** Non-TSA Agent states enforce strict identity matching. The name on your application must match your documents exactly unless you have a court-ordered name change document. The combination of driver’s license + Social Security card is no longer accepted as a valid document pair for HazMat enrollment in many Non-TSA Agent states. Bring a passport or birth certificate.",
        },
      ],
    },
    {
      heading: "The States That Add Extra Steps",
      blocks: [
        {
          type: "topics",
          items: [
            {
              title: "Washington State",
              body: "You must complete a **Washington-approved HazMat training course** before you take the knowledge test. Not just any FMCSA-approved ELDT course — a Washington-approved one. If your training provider is not on Washington’s approved list, the DMV will not let you test.",
            },
            {
              title: "California",
              body: "You must start the TSA background check **after** you apply for your CDL and pass the appropriate knowledge tests. The DMV may issue a CLP or temporary license that says «Not valid for carrying hazardous materials.» You then begin TSA pre-enrollment. You also need a valid CLP or CDL in hand before you can start fingerprinting at a TSA center.",
            },
            {
              title: "New York, Florida, Texas, Pennsylvania, Virginia, Wisconsin, Kentucky, Maryland",
              body: "These Non-TSA Agent states require you to start the process at the DMV, not online. Do not pre-enroll through the TSA UES website if you live here.",
            },
            {
              title: "States requiring TSA clearance before the knowledge test",
              body: "Some jurisdictions will not let you sit for the HazMat knowledge test until the TSA threat assessment is already on file. Others let you test first and wait for TSA clearance before issuing the endorsement. Call your DMV and ask: «Do I need TSA clearance before I test, or can I test first?» The answer determines your scheduling order.",
            },
          ],
        },
      ],
    },
    {
      heading: "What the TSA Background Check Actually Looks For",
      blocks: [
        {
          type: "p",
          text: "The TSA runs your fingerprints through FBI criminal history databases and checks immigration status, terrorist watchlists, and outstanding warrants.",
        },
        {
          type: "topics",
          items: [
            {
              title: "Permanent disqualifications (examples)",
              body: "",
              bullets: [
                "Espionage, sedition, treason",
                "Terrorism or transportation security incidents",
                "Improper transportation of hazardous materials",
                "Murder",
                "Threats involving explosives or lethal devices",
                "Certain RICO violations where the predicate act is a permanent disqualifier",
              ],
            },
            {
              title: "Temporary disqualifications (typical lookback windows)",
              body: "Often framed as about 7 years from conviction or 5 years from prison release — confirm current TSA rules for your case:",
              bullets: [
                "Unlawful firearms possession, use, or sale",
                "Extortion, fraud, bribery, smuggling",
                "Immigration violations",
                "Drug distribution or intent to distribute",
                "Arson, kidnapping, rape, aggravated sexual abuse",
                "Assault with intent to murder, robbery",
                "Fraudulent entry into a seaport",
                "Certain non-permanent RICO violations",
              ],
            },
          ],
        },
        {
          type: "p",
          text: "If TSA finds potentially disqualifying information, they send a Preliminary Determination of Ineligibility (PDI). You can appeal or request a waiver in writing to the TSA HazMat Processing Center. The DMV does not handle appeals.",
        },
      ],
    },
    {
      heading: "Moving States: Do You Need New Fingerprints?",
      blocks: [
        {
          type: "p",
          text: "If you transfer your HazMat endorsement to a new state, you generally **do not** need a new TSA background check or fingerprinting — provided your new state can issue an endorsement that expires within five years of your last assessment.",
        },
        {
          type: "ul",
          items: [
            "You must retake the HazMat knowledge test in the new state.",
            "If your new state is a Non-TSA Agent state and your old state was a TSA Agent state, the new state may still require you to appear in person at the DMV to verify identity and pay state fees.",
            "If your last TSA assessment was more than five years ago, you must complete a new full background check with fingerprinting.",
          ],
        },
      ],
    },
    {
      heading: "Timeline and Cost Summary",
      blocks: [
        {
          type: "table",
          caption: "TSA Agent vs Non-TSA Agent path (approximate)",
          headers: ["Step", "TSA Agent State", "Non-TSA Agent State"],
          rows: [
            ["ELDT training", "$50–$100", "$50–$100"],
            ["DMV knowledge test", "$10–$50", "$10–$50"],
            ["Fingerprinting location", "TSA enrollment center", "DMV office"],
            [
              "Background check fee",
              "Federal package (~$85–$94 typical)",
              "Federal portion + state collection fee",
            ],
            [
              "TWIC discount",
              "Often available for TSA enrollment portion",
              "Usually not available the same way",
            ],
            ["TSA processing time", "30–45 days", "30–45 days (state forwards prints)"],
            ["State endorsement fee", "$5–$20", "$5–$20"],
            ["Total first-time cost", "$150–$275", "$120–$250+"],
            ["Total timeline", "30–60 days", "30–60 days"],
          ],
        },
      ],
    },
    {
      heading: "The Most Common Rejection Reasons",
      blocks: [
        {
          type: "ol",
          items: [
            "**Wrong fingerprinting location.** Showing up at a TSA center in Texas or at a DMV office in a TSA Agent state.",
            "**Document mismatch.** Names do not match across ID, Social Security card, and CDL. Bring a passport or court order.",
            "**Expired TWIC.** You claim a reduced fee but your TWIC expired. TSA charges the full assessment fee.",
            "**Starting TSA too late.** You need the endorsement for a job starting Monday. TSA takes 30–45 days. Start 60 days before your deadline.",
            "**Not checking if your state requires TSA clearance before the knowledge test.** You study, show up at the DMV, and they tell you to come back after TSA clears you.",
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Do all states use TSA enrollment centers for HazMat fingerprinting?",
      answer:
        "No. Seventeen states are Non-TSA Agent states where fingerprinting is done at the DMV or BMV: Florida, Illinois, Indiana, Iowa, Kansas, Kentucky, Maryland, Mississippi, New Mexico, New York, Pennsylvania, South Carolina, Tennessee, Texas, Vermont, Virginia, and Wisconsin.",
    },
    {
      question: "How much does the HazMat background check cost?",
      answer:
        "In TSA Agent states, the federal enrollment package is often quoted near $85–$94 before state endorsement fees. In Non-TSA Agent states, you pay the TSA threat assessment and FBI portions plus whatever the state charges for collection. Total first-time cost including training, testing, and endorsement fees commonly ranges from about $150 to $275.",
    },
    {
      question: "Can I get a discount on the HazMat background check?",
      answer:
        "Yes, if you hold a valid Transportation Worker Identification Credential (TWIC). TSA Agent states often reduce the enrollment fee for TWIC holders. This discount generally does not apply the same way in Non-TSA Agent states.",
    },
    {
      question: "How long does the TSA HazMat background check take?",
      answer:
        "Typically 30 to 45 days. During busy periods it can stretch to 60+ days. Start the process at least 60 days before you need the endorsement.",
    },
    {
      question: "Do I need to retake the HazMat knowledge test if I move to another state?",
      answer:
        "Yes. Each state requires you to pass its own HazMat knowledge test. However, you usually do not need a new TSA background check if your last assessment was within five years.",
    },
    {
      question: "What documents do I need for HazMat fingerprinting?",
      answer:
        "A valid CDL or CLP, proof of citizenship or lawful permanent residence (passport, birth certificate, or green card), and a government-issued photo ID. In Non-TSA Agent states, a driver’s license plus Social Security card is often no longer sufficient — bring a passport or birth certificate.",
    },
    {
      question: "How often do I need to get fingerprinted for HazMat?",
      answer:
        "Every five years, or whenever your CDL and endorsement expire, whichever comes first. Renewal requires a new TSA security threat assessment and fingerprinting.",
    },
    {
      question: "Can I get HazMat endorsement with a felony?",
      answer:
        "It depends. Permanent disqualifiers include terrorism, murder, espionage, and improper transport of hazardous materials. Temporary disqualifiers include certain firearms offenses, drug distribution, arson, kidnapping, and robbery, typically with multi-year lookbacks. You can appeal or request a waiver from TSA.",
    },
    {
      question: "Does Washington State require extra training for HazMat?",
      answer:
        "Yes. Washington requires completion of a state-approved HazMat training course before you can take the knowledge test. Not all FMCSA-approved ELDT providers qualify — check Washington’s approved list.",
    },
    {
      question: "Can I take the HazMat knowledge test before my TSA background check clears?",
      answer:
        "It depends on the state. Some states require TSA clearance on file before testing; others let you test first and hold the endorsement until TSA clears you. Call your DMV before scheduling.",
    },
  ],
  bottomLine:
    "The HazMat endorsement process is federal in name only. Where you get fingerprinted, how much you pay, and whether you need extra training depends entirely on your state. TSA Agent states send you to a TSA center. Non-TSA Agent states send you to the DMV and add their own fee. Washington adds a training gate. California makes you get a CLP first. Check your state’s category before you spend money on the wrong appointment.",
};
