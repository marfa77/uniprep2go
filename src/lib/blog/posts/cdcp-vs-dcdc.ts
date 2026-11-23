import type { BlogPostDraft } from "../types";

const CHECKED = "23 Nov 2026";

export const cdcpVsDcdcPost: BlogPostDraft = {
  slug: "cdcp-vs-dcdc-data-center-certification-first-step",
  title: "CDCP vs DCDC: Which Data Center Certification Should You Get First?",
  titleTag: "CDCP vs DCDC: Data Center Certification Comparison & First Step",
  metaDescription:
    "CDCP is a 2-day course with no prerequisites. DCDC requires 3 years of experience and costs $725. Here is which one opens doors, and which one closes them if you pick it too early.",
  publishedAt: "2026-07-28",
  contentUpdated: "2026-11-23",
  eyebrow: "CDCP · Data center infrastructure",
  clusterId: "cdcp",
  relatedSlugs: [
    "well-ap-vs-fitwel-certification-2026",
    "nebosh-igc-vs-international-diploma-employers",
  ],
  intro:
    "**CDCP (Certified Data Centre Professional) and DCDC (Data Center Design Consultant) both cover data center infrastructure, but they sit at different points in a career.** CDCP is EPI's foundation credential: a 2-day course followed by a short exam, with no prerequisites. DCDC is BICSI's design credential: an exam you can only apply for once you meet one of three experience or credential options. The figures below come from EPI, EXIN and the BICSI DCDC Certification Handbook (version 4), checked " +
    CHECKED +
    ". To test your foundation knowledge first, try the [CDCP readiness check](/mock-exams/cdcp-readiness-check).",
  mockSlug: "cdcp-readiness-check",
  deckSlug: "cdcp-anki-deck",
  cta: {
    mockLabel: "Take the free CDCP readiness check",
    deckLabel: "Drill CDCP fundamentals with Anki",
    summary:
      "New to data center infrastructure? Take the free [CDCP readiness check](/mock-exams/cdcp-readiness-check) on power, cooling, security and standards, then build your foundation with the [CDCP Anki deck](/decks/cdcp-anki-deck) before you book the course.",
  },
  sections: [
    {
      heading: "How do CDCP and DCDC compare?",
      blocks: [
        {
          type: "table",
          caption: "CDCP vs DCDC (EPI / EXIN and BICSI, checked " + CHECKED + ")",
          headers: ["", "CDCP", "DCDC"],
          rows: [
            ["Issued by", "EPI, accredited by EXIN", "BICSI"],
            ["Prerequisites", "None; EPI suggests 1–2 years in a data centre or facilities role suits the course best", "One of three eligibility options (see below)"],
            ["Training", "Mandatory 2-day course (instructor-led, virtual or on demand)", "Not required; the handbook suggests 125+ hours of independent study"],
            ["Exam", "40 multiple-choice questions, 1 hour, closed book", "100 questions, 2 hours, including enhanced item types, at a Pearson test center"],
            ["Pass mark", "27 of 40 (EXIN lists 68%)", "Set through a standard-setting study"],
            ["Exam fee", "Not published on the EPI or EXIN pages; check with the training provider", "$510 BICSI member / $725 nonmember; retest $230 / $355"],
            ["Validity", "3 years, then recertification", "3-year certification cycle with continuing education credits, including a BICSI ethics course"],
          ],
        },
      ],
    },
    {
      heading: "Who is eligible for the DCDC?",
      blocks: [
        {
          type: "p",
          text: "BICSI checks eligibility when you apply. You qualify under one of three options:",
        },
        {
          type: "ol",
          items: [
            "**Hold a current RCDD** (Registered Communications Distribution Designer) certification.",
            "**Two years** of verifiable full-time-equivalent work in data center design, construction and/or operations, plus a current BICSI TECH, RTPM or OSP certification, or a degree in architecture, engineering or construction management.",
            "**Three years** of verifiable full-time-equivalent work in data center design, construction and/or operations within the past seven years.",
          ],
        },
        {
          type: "p",
          text: "Your application must include a résumé covering the last 10 years of work history. Application fees are non-refundable, including for applicants found ineligible, and an approved application is valid for one year.",
        },
      ],
    },
    {
      heading: "What does each certification cover?",
      blocks: [
        {
          type: "p",
          text: "**CDCP** tests understanding of the key components of a data centre: power, cooling, racks and cabling, fire safety, physical security and operational practice. It is broad rather than deep, suited to operations, facilities and support roles that work alongside designers.",
        },
        {
          type: "p",
          text: "**DCDC** validates design knowledge across the data center lifecycle, from concept planning and analysis through design, construction, commissioning and operations, including coordination with engineers and architects. Its content comes from a job task analysis BICSI repeats every three to five years.",
        },
      ],
    },
    {
      heading: "What happens if you fail?",
      blocks: [
        {
          type: "ul",
          items: [
            "**DCDC:** within your one-year eligibility period there is a 30-day wait between unsuccessful attempts, and a 90-day wait after a third unsuccessful attempt. Each retest costs $230 (member) or $355 (nonmember), paid to Pearson when you schedule.",
            "**CDCP:** retake arrangements run through the training provider; EPI's public pages do not set a waiting period.",
          ],
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
              title: "Start with CDCP if…",
              body: "you are new to data centres or work in operations, facilities, IT support or technical sales, and you don't yet meet a DCDC eligibility option.",
            },
            {
              title: "Go to DCDC if…",
              body: "you design, build or run data centers, already meet one of BICSI's three options (for example an RCDD, or three years of relevant work in the last seven), and want a design credential.",
            },
          ],
        },
        {
          type: "p",
          text: "Within EPI's own framework, CDCP is the foundation for later EPI credentials. Whichever you choose, start by finding gaps with the [CDCP readiness check](/mock-exams/cdcp-readiness-check) and the [CDCP deck](/decks/cdcp-anki-deck).",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Is CDCP or DCDC better for beginners?",
      answer:
        "CDCP. It has no prerequisites and includes a mandatory 2-day course. DCDC requires you to meet one of BICSI's three eligibility options before you can sit the exam.",
    },
    {
      question: "Can I take DCDC without experience?",
      answer:
        "Not without an alternative. You need a current RCDD, or two years of relevant work plus a TECH, RTPM or OSP certification or a relevant degree, or three years of relevant work within the past seven years (BICSI DCDC Handbook v4).",
    },
    {
      question: "How much does the DCDC exam cost?",
      answer: "$510 for BICSI members and $725 for nonmembers, including the first attempt. Retests are $230 or $355.",
    },
    {
      question: "What is the passing score for CDCP?",
      answer: "27 out of 40 on a 40-question, 1-hour, closed-book exam. EXIN lists the pass mark as 68%.",
    },
    {
      question: "How long are CDCP and DCDC valid?",
      answer:
        "CDCP is valid for 3 years before recertification. DCDC runs on a 3-year certification cycle maintained with continuing education credits, including a BICSI ethics course.",
    },
    {
      question: "How long is the DCDC exam?",
      answer: "100 questions in two hours, taken at a Pearson test center.",
    },
    {
      question: "Is CDCP training mandatory?",
      answer: "Yes. EXIN lists training as mandatory, and EPI's CDCP course runs for 2 days, instructor-led, virtual or on demand.",
    },
  ],
  bottomLine:
    "Start with CDCP if you are new to data centres; move to DCDC once you meet one of BICSI's eligibility options. Sources: [EXIN EPI CDCP](https://www.exin.com/data-protection-security/certified-data-centre-professional/), [EPI](https://www.epi-ap.com/) (CDCP course page),[BICSI DCDC](https://www.bicsi.org/education-certification/certification/dcdc) and the BICSI DCDC Certification Handbook v4, checked " +
    CHECKED +
    ".",
};
