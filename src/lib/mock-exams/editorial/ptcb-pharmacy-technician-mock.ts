import type { MockEditorialBundle } from "./types";
import { MOCK_PASS_PRICE_USD } from "../mock-pass";

const CHECKED = "23 Nov 2026";

export const ptcbPharmacyEditorial: MockEditorialBundle = {
  slug: "ptcb-pharmacy-technician-mock",
  howToPrepare:
    "Take the free 25-question diagnostic, then study the January 2026 PTCE outline domain by domain. Use the PTCB Anki deck for drug names and federal rules; finish with PTCB’s official Practice Bank or Pre-PTCE after your weakest domains clear on full timed mocks.",
  metaDescriptionOverride:
    "Free PTCB practice test on the January 2026 PTCE outline: 25 questions, no signup. Full 90Q mock in 110 min, plus eligibility, $129 fee and retake rules.",
  sections: [
    {
      heading: "Who can take the PTCE (eligibility)",
      paragraphs: [
        "**Pathway 1:** Complete a PTCB-Recognized Education/Training Program (or complete within 60 days of applying). A pharmacy degree counts in lieu of a technician program.",
        "**Pathway 2:** At least **500 hours** of pharmacy technician work experience, completed at application. You must reside in the U.S. or its territories, disclose criminal and State Board actions, and follow PTCB policies.",
      ],
    },
    {
      heading: "Fee, registration and exam day",
      paragraphs: [
        "Application and exam fee: **$129**. Flow: create a PTCB Account → apply → authorization email → schedule with Pearson VUE. Testing is **in person** at 1,400+ centers (including 100+ military bases).",
        "Plan **2 hours**: 5-minute tutorial, **1 hour 50 minutes** for the exam, 5-minute survey. Arrive **30 minutes early** with ID matching your PTCB Account name. Request testing accommodations during the application if needed.",
      ],
    },
    {
      heading: "Scoring, results and retakes",
      paragraphs: [
        "Scaled score range **1,000–1,600**; pass **1,400**. Unofficial result on screen after the survey; **official score in your PTCB Account within about three weeks**.",
        "Retakes: wait for the official score report; **no waiting period for attempts 2 and 3**; **six months** before attempt 4; after four attempts, PTCB-approved preparation evidence is required (review course, ASHP/ACPE program, associate degree, or 6+ months pharmacist/CPhT tutoring with attestation). Certification renews every **2 years**.",
      ],
    },
    {
      heading: "What the January 2026 outline removed and added",
      paragraphs: [
        "**Removed:** nonsterile compounding (former areas 1.9 and 4.1), **alligations**, and NTI as a standalone knowledge area (NTI drugs may still appear inside other topics).",
        "**Added:** DSCSA serialization, tracking, tracing, and quarantine (outline 2.6). Weights shifted toward Federal Requirements and Order Entry; four domains and test length are unchanged. **Skip old alligation-only drill banks** — they no longer match the outline.",
        "For printable chapter notes, see the [PTCB outline 2026 study guide](/decks/ptcb-study-guide-2026); for timed domain scoring, use this [timed PTCB practice test](/mock-exams/ptcb-pharmacy-technician-mock).",
      ],
    },
    {
      heading: "Which calculations the PTCE tests",
      paragraphs: [
        "The PTCE content outline marks calculation statements with an asterisk: **1.4, 1.7, 2.2, 2.4, 3.3, 3.5, 4.1, 4.2, 4.3**. Area 4.1 includes formulas, ratios and proportions, conversions, Sig codes, Roman numerals, and abbreviations for days supply, quantity, dose, concentration, and dilutions.",
      ],
    },
    {
      heading: "A 6-week PTCB plan with this mock",
      paragraphs: [
        `**Week 0:** Free 25-question diagnostic. **Weeks 1–4:** Weekly blocks by exam weight — Medications 35%, Patient Safety 23.75%, Order Entry 22.5%, Federal Requirements 18.75% — plus the [PTCB Anki deck](/decks/ptcb-pharmacy-technician-anki-deck). **Weeks 5–6:** Full **90-question timed runs** on Mock Pass ($${MOCK_PASS_PRICE_USD}); finish with PTCB Practice Bank or Pre-PTCE.`,
      ],
    },
  ],
  faqs: [
    {
      question: "How much does the PTCB exam cost?",
      answer: "$129 to apply and take the PTCE (ptcb.org CPhT page, checked 23 Nov 2026).",
    },
    {
      question: "Can I take the PTCB exam without a training program?",
      answer:
        "Yes — Pathway 2 requires at least 500 hours of technician work experience completed at application (ptcb.org, checked 23 Nov 2026).",
    },
    {
      question: "What is the PTCB passing score?",
      answer: "1,400 on a 1,000–1,600 scaled score (ptcb.org, checked 23 Nov 2026).",
    },
    {
      question: "How soon can I retake the PTCE?",
      answer:
        "After the official score report; no wait for attempts 2–3; six months before the 4th attempt (PTCB Help Center, checked 23 Nov 2026).",
    },
    {
      question: "Are alligations still on the PTCE?",
      answer: "No — removed with the January 2026 content outline (ptcb.org job analysis, checked 23 Nov 2026).",
    },
  ],
  sources: [
    {
      label: "PTCB — Certified Pharmacy Technician (CPhT)",
      url: "https://www.ptcb.org/credentials/certified-pharmacy-technician",
      checked: CHECKED,
    },
    {
      label: "PTCE content outline (v1.4)",
      url: "https://www.ptcb.org/wp-content/uploads/2025/07/PTCE-Content-Outline.pdf",
      checked: CHECKED,
    },
    {
      label: "PTCB — PTCE job analysis / January 2026 changes",
      url: "https://ptcb.org/news/ptce-job-analysis-study/",
      checked: CHECKED,
    },
    {
      label: "PTCB Help Center — retakes",
      url: "https://ptcb.zendesk.com/hc/en-us/articles/206191428",
      checked: CHECKED,
    },
  ],
  ctaAfterWeights:
    `Take **25 free PTCE-style questions** on the January 2026 outline (no signup). Unlimited full **90-question mocks** are $${MOCK_PASS_PRICE_USD}.`,
};