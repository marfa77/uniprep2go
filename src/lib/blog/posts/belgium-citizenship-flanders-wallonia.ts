import type { BlogPostDraft } from "../types";

export const belgiumCitizenshipFlandersWalloniaPost: BlogPostDraft = {
  slug: "belgium-citizenship-test-flanders-vs-wallonia",
  title: "Belgium Citizenship: Flanders Makes You Take a Test. Wallonia Does Not (Yet)",
  titleTag: "Belgium Citizenship Test: Flanders MO vs Wallonie — What You Actually Face",
  metaDescription:
    "Flanders has a social orientation test. Wallonia does not. Brussels is a mix. Here is the exact integration requirement by region, the language level hike to B1, and why Belgium has three citizenship systems in one country.",
  publishedAt: "2026-07-28",
  eyebrow: "Belgium · Flanders vs Wallonia",
  clusterId: "belgium-citizenship",
  relatedSlugs: [
    "luxembourg-vivre-ensemble-test-format-pass",
    "sweden-medborgarskapsprov-2026-new-test",
    "portugal-nationality-test-2026-new-civic-exam",
  ],
  intro:
    "**Belgium is not one country when it comes to citizenship — it is three.** The federal government writes nationality law; the regions run integration, and they disagree on what “integration” means. Flanders: social orientation course + Dutch test. Wallonia: French certificate, no standardised civic exam. Brussels: you choose. And as of 2026 the federal government is pushing tighter rules: B1 language, a possible national civic test, and a €1,030 fee. This guide maps the regional maze today, what is coming, and what you need to file in your commune.",
  mockSlug: "belgium-flanders-mo-readiness-check",
  deckSlug: "dutch-a2-inburgering-anki-deck",
  cta: {
    mockLabel: "Take the free Belgium Flanders MO readiness check",
    deckLabel: "Get the Dutch A2 Inburgering Anki deck",
    summary:
      "Flanders track? Drill civic themes with the free Flanders MO readiness check, then lock Dutch with the Inburgering Anki deck. Wallonia track? Use the Wallonie Citoyenneté readiness check. Join the civics Anki waitlists before you pay the €1,030 fee.",
    extraLinks: [
      {
        href: "/mock-exams/belgium-wallonie-citoyennete-readiness-check",
        label: "Belgium Wallonie Citoyenneté readiness check",
      },
      {
        href: "/decks/belgium-flanders-mo-anki-deck",
        label: "Flanders MO Anki waitlist",
      },
      {
        href: "/decks/belgium-wallonie-citoyennete-anki-deck",
        label: "Wallonie Citoyenneté Anki waitlist",
      },
      {
        href: "https://www.prep2go.study",
        label: "Prep2Go.study — language & immigration decks",
      },
    ],
  },
  sections: [
    {
      heading: "The Federal Baseline (What Every Applicant Needs)",
      blocks: [
        {
          type: "p",
          text: "Regardless of region, Belgian nationality through declaration (Article 12bis) currently requires:",
        },
        {
          type: "table",
          caption: "Federal baseline vs proposed changes",
          headers: ["Requirement", "Current rule", "Change coming"],
          rows: [
            ["Residence", "5 years uninterrupted legal residence", "Likely unchanged"],
            [
              "Language",
              "A2 in the region’s language",
              "B1 (proposed 2025–2029 government)",
            ],
            [
              "Economic participation",
              "468 days of salaried work or self-employment in last 5 years",
              "Unchanged",
            ],
            [
              "Social integration",
              "Varies by region (see below)",
              "Proposed national civic test",
            ],
            ["Application fee", "€1,030 (indexed 2026)", "Already enacted"],
            ["Criminal record", "Clean", "Expanded exclusions proposed"],
          ],
        },
        {
          type: "p",
          text: "Language is the big shift. The “Arizona” federal coalition has proposed raising A2 → B1 and making a civic test mandatory nationwide. As of mid-2026 no bill is before Parliament, but the coalition agreement commits to these changes in the 2025–2029 term.",
        },
      ],
    },
    {
      heading: "Flanders: The Strictest Path",
      blocks: [
        {
          type: "p",
          text: "Flanders treats integration as a moral obligation, not a checkbox — via Agentschap Integratie en Inburgering (AGII) and city agencies such as Atlas (Antwerp) and Amal (Ghent).",
        },
        {
          type: "ol",
          items: [
            "**Social orientation (Maatschappelijke Oriëntatie / MO)** — life, work, norms, values. Attend at least ~80% of classes.",
            "**Dutch language course** — up to A2 (1.1 + 1.2). Pass the certifying test.",
            "**Civic integration certificate** — only after MO + Dutch.",
          ],
        },
        {
          type: "p",
          text: "**Catch for nationality:** a certificate obtained **without** the MO course (language-only path) **does not count** for citizenship. MO is mandatory for nationality purposes.",
        },
        {
          type: "p",
          text: "**Alternative:** a separate social orientation test + certifying Dutch test. Fail the orientation test and you must enrol in the full programme. Flanders’ *inburgering* model emphasises language and cultural norms — language is the primary gatekeeper.",
        },
      ],
    },
    {
      heading: "Wallonia: The Lighter Touch",
      blocks: [
        {
          type: "p",
          text: "Wallonia leans toward a French republican model: access to rights and services more than cultural assimilation. No standardised Walloon citizenship MCQ.",
        },
        {
          type: "ol",
          items: [
            "**French at A2** — DELF A2, TCF A2, or approved adult education (EPS, CRI, CRIPEL, etc.).",
            "**Social integration proof** — CRI integration course, recognised Belgian diploma, 5 years legal work, or 400+ hours vocational training.",
          ],
        },
        {
          type: "p",
          text: "The integration course is optional for many; language proof is the hard requirement. **Brussels** runs BAPA — closer to Wallonia in philosophy, with Dutch and French course options.",
        },
      ],
    },
    {
      heading: "The Language Trap: Region Determines Language",
      blocks: [
        {
          type: "table",
          caption: "Language by region",
          headers: ["Region", "Language test", "Accepted certificates"],
          rows: [
            ["Flanders", "Dutch", "Certifying A2 (moving toward B1)"],
            ["Wallonia", "French", "DELF A2, TCF A2, EPS, CRI"],
            ["Brussels", "Dutch or French", "Either, depending on your course"],
            ["German-speaking Community", "German", "Local certificates"],
          ],
        },
        {
          type: "p",
          text: "**Critical:** you cannot pick the language for convenience. Under current practice some applicants near Brussels have used French while living near Dutch municipalities. Proposed 2025–2029 reforms would end shopping: test in the language of the region where you reside.",
        },
      ],
    },
    {
      heading: "The Coming National Civic Test",
      blocks: [
        {
          type: "p",
          text: "The 2025–2029 coalition agreement proposes a nationality exam with (1) a citizenship knowledge test and (2) language raised to B1 — on top of regional integration. Content must be agreed across linguistic communities (historically slow).",
        },
        {
          type: "ul",
          items: [
            "Eligible now → file soon; current rules are softer",
            "Not yet eligible → plan for B1 and a possible civic exam in 2027–2028",
            "€1,030 fee already in effect (up from €150 in July 2025)",
          ],
        },
      ],
    },
    {
      heading: "Timeline and Cost by Region",
      blocks: [
        {
          type: "table",
          caption: "Regional comparison",
          headers: ["Step", "Flanders", "Wallonia", "Brussels"],
          rows: [
            [
              "Integration / civic",
              "Mandatory MO + Dutch",
              "Optional CRI course",
              "BAPA course (optional)",
            ],
            [
              "Language test",
              "Certifying Dutch A2 (B1 soon)",
              "DELF A2 / TCF A2 / EPS",
              "Dutch or French A2",
            ],
            ["Work requirement", "468 days in 5 years", "468 days in 5 years", "468 days in 5 years"],
            ["Application fee", "€1,030", "€1,030", "€1,030"],
            ["Processing time", "4–8 months", "4–8 months", "4–8 months"],
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Does Belgium have a citizenship test?",
      answer:
        "Not at the federal level yet. Flanders has MO as part of integration. Wallonia and Brussels lack a comparable standardised civic MCQ. A federal civic exam is proposed for 2025–2029 but not enacted.",
    },
    {
      question: "What language level do I need for Belgian citizenship?",
      answer:
        "Currently A2 in your region’s language (Dutch in Flanders, French in Wallonia, either in Brussels). Federal proposals would raise this to B1.",
    },
    {
      question: "Can I take the French test if I live in Flanders?",
      answer:
        "Some near-Brussels applicants have done so under current practice. Proposed reforms would require the language of your region of residence — Flanders means Dutch.",
    },
    {
      question: "How much does Belgian citizenship cost?",
      answer:
        "Application fee €1,030 as of 2026, plus language tests (~€90–€130), translations, and certified copies.",
    },
    {
      question: "Is the Flanders integration certificate valid for citizenship?",
      answer:
        "Only if it includes the social orientation (MO) course. Language-only certificates without MO do not satisfy the nationality requirement.",
    },
    {
      question: "How long does Belgian citizenship take?",
      answer:
        "About 4–8 months for a clean file after submission. The Procureur du Roi typically has ~4 months for an opinion; the commune finalises in 1–2 months.",
    },
    {
      question: "What is the difference between Flemish and Walloon integration policy?",
      answer:
        "Flanders emphasises language, norms, and mandatory civic integration (cultural-nationalism model). Wallonia emphasises rights, services access, and language proof without a mandatory civic exam (republican model).",
    },
    {
      question: "Will Belgium introduce a national citizenship test?",
      answer:
        "The 2025–2029 coalition agreement proposes one, but no bill is before Parliament yet. Expect citizenship knowledge plus B1 language if enacted.",
    },
  ],
  bottomLine:
    "Belgium runs three citizenship systems. Flanders makes you earn it through language and civic orientation. Wallonia asks for language and participation proof. Brussels lets you choose. The federal government is pushing a higher bar. Flanders: start MO now. Wallonia: secure DELF A2 before B1 hits. Eligible today: file this month — tomorrow’s rules get harder.",
};
