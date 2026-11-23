import type { MockEditorialBundle } from "./types";
import {
  FREE_DIAGNOSTIC_QUESTIONS,
  MOCK_PASS_PRICE_USD,
  mockAccessLine,
  requireMockConfig,
  topicLabel,
} from "./config-copy";

const CHECKED = "23 Nov 2026";
const SLUG = "cem-readiness-check";
const config = requireMockConfig(SLUG);

export const cemEditorial: MockEditorialBundle = {
  slug: SLUG,
  howToPrepare: `Check that you meet one of AEE's education-and-experience routes before you pay. Take the free ${FREE_DIAGNOSTIC_QUESTIONS}-question start, then build your printed reference binder alongside the Body of Knowledge and drill formulas in the [CEM Anki deck](/decks/cem-anki-deck).`,
  sections: [
    {
      heading: "CEM exam facts: format, score and rules",
      paragraphs: [
        "The Association of Energy Engineers (AEE) awards the Certified Energy Manager (CEM). These facts come from the CEM Candidate Handbook, version 2.15 (effective July 2026).",
      ],
      bullets: [
        "**Format:** multiple choice across **14 mandatory subject sections** drawn from the CEM Body of Knowledge.",
        "**Time:** **4 hours** of testing; expect about 4.5 hours at the venue including instructions. There are no scheduled breaks.",
        "**Open book and open notes:** printed reference material organised in a binder may be allowed. A calculator is required: stand-alone scientific, business or graphing models are allowed; internet-capable calculators, phones, laptops and tablets are not.",
        "**Passing score:** a minimum of **700**.",
        "**Delivery:** after an approved training program, either at the live session or online with a remote proctor.",
        "**Results:** by email within 30 days; failing candidates get a diagnostic report.",
      ],
    },
    {
      heading: "Who is eligible, and what it costs",
      paragraphs: [
        "AEE requires one combination of education and related experience in energy engineering or energy management, for example a 4-year engineering or architecture degree (or PE/RA) with 3 years, a 4-year business degree with 5 years, a 2-year associate degree with 8 years, or 10 years with no degree. Candidates who don't yet qualify can become an Energy Manager In-Training (EMIT). All candidates must attend an approved training program.",
        "**Fees (US):** $500 for the application and first exam; $250 for each re-examination. Renewal costs $300 every three years. Fees are not refundable.",
      ],
    },
    {
      heading: "What the CEM exam covers",
      paragraphs: [
        "AEE says the question count per subject follows the content percentages in the Body of Knowledge. This check groups its questions into five equal areas:",
      ],
      bullets: [
        `**${topicLabel(config, "policy-audits-economics")}:** codes and standards, rates and tariffs, audits and instrumentation, and energy accounting and economics.`,
        `**${topicLabel(config, "electrical-lighting")}:** electrical power systems, motors and lighting.`,
        `**${topicLabel(config, "hvac-envelope-bas")}:** HVAC systems, the building envelope and building automation and controls.`,
        `**${topicLabel(config, "industrial-boiler-renewables")}:** industrial systems, boilers and steam, distributed generation, renewables and storage.`,
        `**${topicLabel(config, "commissioning-espc")}:** operations, maintenance and commissioning, and performance contracting with measurement and verification.`,
      ],
    },
    {
      heading: "Retakes and keeping the certification",
      paragraphs: [
        "If you fail, AEE requires **at least 60 days** before your second attempt and before every later attempt, with a retesting form and the re-examination fee. Once certified, you keep the CEM by earning **10 professional credits every three years** and filing a renewal form; credits come from continued work in energy management, professional society membership, continuing education, papers and awards.",
      ],
    },
    {
      heading: "A study plan around the CEM training",
      paragraphs: [
        `**Before training:** take the free ${FREE_DIAGNOSTIC_QUESTIONS}-question start, learn the core economics formulas (payback, net present value, life-cycle cost) and unit conversions, and start your binder.`,
        "**During training:** add worked examples for each subject section to the binder, tabbed by section so you can find them in seconds. Drill formulas in the [Anki deck](/decks/cem-anki-deck).",
        `**Before the exam:** sit the full ${config.questionCount}-question / ${config.durationMinutes}-minute check, practise looking things up quickly in your binder, and review every explanation. Access: ${mockAccessLine(config)}.`,
      ],
    },
  ],
  faqs: [
    {
      question: "Is the CEM exam open book?",
      answer:
        "Yes. AEE says it is open book and open notes, with printed material in a binder; a non-internet calculator is required (CEM Candidate Handbook v2.15, checked 23 Nov 2026).",
    },
    {
      question: "How long is the CEM exam and what score do I need?",
      answer: "4 hours of testing, and a minimum score of 700 to pass.",
    },
    {
      question: "How much does the CEM cost?",
      answer: "$500 for the application and first exam, $250 for each retest, and $300 to renew every three years (US fees).",
    },
    {
      question: "How long do I wait to retake the CEM exam?",
      answer: "At least 60 days between attempts, with a retesting form and the re-examination fee.",
    },
    {
      question: "Can I take the CEM exam online?",
      answer: "Yes, by remote proctor, or at the live session after an approved training program.",
    },
    {
      question: "How long is the UniPrep2Go CEM practice test?",
      answer: `The free start is ${FREE_DIAGNOSTIC_QUESTIONS} questions. The full check is ${config.questionCount} questions in ${config.durationMinutes} minutes across five areas, much shorter than the official exam. Unlimited retakes are on UniPrep Mock Pass ($${MOCK_PASS_PRICE_USD}, unlimited mocks).`,
    },
  ],
  sources: [
    {
      label: "AEE — CEM Candidate Handbook v2.15 (PDF)",
      url: "https://www.aeecenter.org/wp-content/uploads/2024/03/CEMHandbook-2.15.pdf",
      checked: CHECKED,
    },
    {
      label: "AEE — Becoming a CEM (eligibility and fees)",
      url: "https://www.aeecenter.org/becoming-a-cem",
      checked: CHECKED,
    },
    {
      label: "AEE — Certified Energy Manager (Body of Knowledge)",
      url: "https://www.aeecenter.org/certifications/certifications/certified-energy-manager",
      checked: CHECKED,
    },
  ],
};
