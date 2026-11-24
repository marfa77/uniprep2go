import type { BlogPostDraft } from "../types";

export const neboshIgcVsDiplomaPost: BlogPostDraft = {
  slug: "nebosh-igc-vs-international-diploma-employers",
  title: "NEBOSH IGC vs International Diploma: Which One Do Employers Actually Want?",
  titleTag: "NEBOSH IGC vs International Diploma: Employer Preference & Cost 2027",
  metaDescription:
    "The IGC costs $500 and takes 2 weeks. The Diploma costs $2,000+ and takes a year. Here is which credential employers actually filter for, and when the Diploma is worth the money.",
  publishedAt: "2026-07-27",
  contentUpdated: "2026-11-24",
  eyebrow: "NEBOSH · Health & safety",
  clusterId: "nebosh",
  relatedSlugs: [
    "mrics-apc-vs-assocrics-pathway-cost",
    "well-ap-vs-fitwel-certification-2026",
  ],
  intro:
    "**NEBOSH offers two flagship health and safety qualifications: the International General Certificate (IGC) and the International Diploma.** The IGC is a foundation qualification assessed by a 24-hour scenario; the Diploma is an Ofqual RQF Level 6 qualification assessed by an assignment and two case studies. This guide compares them using NEBOSH's own qualification pages.",
  mockSlug: "nebosh-readiness-check",
  deckSlug: "nebosh-anki-deck",
  cta: {
    mockLabel: "Take the free NEBOSH IGC readiness check",
    deckLabel: "Drill IGC command words with Anki",
    summary:
      "Preparing for the NEBOSH IGC? Take the free readiness check (scenario-style questions on IGC syllabus themes), then drill command words and risk assessment with the NEBOSH IGC Anki deck.",
  },
  sections: [
    {
      heading: "How do the IGC and the International Diploma compare?",
      blocks: [
        {
          type: "table",
          caption: "NEBOSH IGC vs International Diploma (nebosh.org.uk, checked 24 Nov 2026)",
          headers: ["", "International General Certificate (IGC)", "Level 6 International Diploma"],
          rows: [
            ["Level", "SCQF Level 6 (11 SCQF credit points), which NEBOSH says is comparable to RQF Level 3", "RQF Level 6, 42 credits (2023 specification), accredited by Ofqual"],
            ["Units", "GIC1 and GIC2", "DI1, DI2 and DI3"],
            ["Assessment", "Digital, scenario-based; 24 hours to access, complete and submit from 11am UK time on the exam date", "DI1 assignment (workplace tasks, simulations, reflective statements, research topic) over 4 weeks; DI2 and DI3 scenario case studies over 2 weeks each"],
            ["Entry requirements", "Set out by NEBOSH on the qualification page", "None mandatory; NEBOSH strongly recommends the General Certificate first"],
            ["Time to complete", "Per exam sitting", "5-year enrolment period for all three units"],
            ["Fees", "Set by each Learning Partner", "Set by each Learning Partner"],
          ],
        },
      ],
    },
    {
      heading: "What does each qualification assess?",
      blocks: [
        {
          type: "p",
          text: "The **IGC** covers the foundations of managing health and safety and controlling common workplace hazards, assessed through a scenario you work on within a 24-hour window. NEBOSH publishes GIC1 exam dates roughly monthly in English, with some sittings in other languages, and results about three months later.",
        },
        {
          type: "p",
          text: "The **International Diploma** goes much deeper. NEBOSH expects around **40 hours** of work on the DI1 assignment (\"Know: workplace health and safety principles\") and around **20 hours** each on the DI2 (\"Do: controlling workplace health issues\") and DI3 (\"Do: controlling workplace safety issues\") case studies. You must be enrolled by a NEBOSH Learning Partner before you can register for a Diploma assessment.",
        },
      ],
    },
    {
      heading: "What professional recognition does each bring?",
      blocks: [
        {
          type: "ul",
          items: [
            "**IOSH:** NEBOSH says the Level 6 National and International Diplomas meet the academic requirements to apply for IOSH membership at the appropriate grade.",
            "**BCSP:** the International Diploma is recognised as a Qualified Equivalent Program, meeting the requirement for the Transitional Safety Practitioner designation leading to CSP certification.",
            "**Saiosh:** members can upgrade from technical to graduate membership using the International Diploma.",
            "**IGC:** NEBOSH reports more than 265,000 holders and offers it in English, Arabic, Russian, Turkish, Portuguese, Spanish and French.",
          ],
        },
        {
          type: "p",
          text: "Which one an employer asks for depends on the role. Check job descriptions in your target market rather than relying on general claims.",
        },
      ],
    },
    {
      heading: "Which should you take first?",
      blocks: [
        {
          type: "topics",
          items: [
            {
              title: "Start with the IGC if…",
              body: "you are new to health and safety or need a recognised foundation qualification. The Diploma syllabus assumes this level of prior learning.",
            },
            {
              title: "Go to the Diploma if…",
              body: "health and safety is your career, you want professional membership routes such as IOSH, and you can commit to an assignment and two case studies within a 5-year enrolment.",
            },
          ],
        },
        {
          type: "p",
          text: "For IGC preparation, check your knowledge with the [NEBOSH practice check](/mock-exams/nebosh-readiness-check) and drill the syllabus with the [NEBOSH deck](/decks/nebosh-anki-deck).",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "What level is the NEBOSH IGC?",
      answer: "SCQF Level 6 with 11 credit points, which NEBOSH says is comparable to RQF Level 3 (nebosh.org.uk, checked 24 Nov 2026).",
    },
    {
      question: "What level is the NEBOSH International Diploma?",
      answer: "RQF Level 6 with 42 credits (2023 specification), accredited by Ofqual.",
    },
    {
      question: "How is the NEBOSH IGC assessed?",
      answer: "Through a digital, scenario-based assessment you access, complete and submit within 24 hours from 11am UK time on the exam date.",
    },
    {
      question: "How is the International Diploma assessed?",
      answer: "Three units: a DI1 assignment over 4 weeks, and DI2 and DI3 scenario case studies over 2 weeks each, within a 5-year enrolment.",
    },
    {
      question: "Can I skip the IGC and go straight to the Diploma?",
      answer: "There are no mandatory entry requirements, but NEBOSH strongly recommends the General Certificate first because the Diploma syllabus assumes that prior learning.",
    },
    {
      question: "Does the International Diploma lead to IOSH membership?",
      answer: "NEBOSH says it meets the academic requirements to apply for IOSH membership at the appropriate grade.",
    },
  ],
  bottomLine:
    "Take the IGC as your foundation, then the International Diploma when health and safety becomes your career. Sources: [NEBOSH IGC](https://www.nebosh.org.uk/qualifications/international-general-certificate/) and [NEBOSH Level 6 International Diploma](https://www.nebosh.org.uk/qualifications/nebosh-level-6-international-diploma-for-occupational-health-and-safety-management-professionals), checked 24 Nov 2026.",
};
