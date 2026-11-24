import type { MockExamConfig } from "./types";
import { getNicheExamExplainer } from "./niche-exam-explainers";
import { getMockOfficialResources } from "./official-resources";
import { mockFreeAccessNotice, mockFunnelNoticeForLinkedDeck } from "./pricing";
import {
  FREE_DIAGNOSTIC_QUESTIONS,
  freeAccessClause,
  freeDiagnosticMinutes,
  hasShortFreeDiagnostic,
} from "./free-diagnostic";
import {
  MOCK_ACCESS_RULE,
  MOCK_PASS_NAME,
  MOCK_PASS_OFFER,
  MOCK_PASS_PRICE_USD,
} from "./mock-pass";
import { withMockAccessDisclosure } from "./mock-access-faq";
import { withCatalogProductPrices } from "../catalog-price";
import { getDeckBySlug } from "../decks";
import { headTermFaqForSchema } from "./head-term-program";
import { questionCountFaqForSchema } from "./mock-question-count-aeo";
import { fitMetaDescription, fitSeoTitle, SEO_META_DESCRIPTION_MAX, SEO_TITLE_MAX } from "../seo";
import { absoluteUrl, siteConfig } from "../site";
import {
  getMockEditorialDropFaqQuestions,
  getMockEditorialFaqs,
  getMockEditorialMetaDescriptionOverride,
} from "./editorial";

function normalizeFaqQuestionKey(question: string): string {
  return question.trim().toLowerCase().replace(/[^a-z0-9]+/g, " ");
}

type MockSeoProfile = {
  title: string;
  description: string;
  keywords: string[];
  headline: string;
  intro: string;
  audience: string;
  practiceTestLabel: string;
  /** Visible “what is this certification/exam?” copy for SEO */
  whatIsExam: string;
  administeredBy?: string;
  officialFormat?: string;
  examFaqs?: Array<{ question: string; answer: string }>;
};

/** Hand-authored overrides — exam context can come from niche explainers. */
type MockSeoProfileOverride = Omit<
  MockSeoProfile,
  "whatIsExam" | "administeredBy" | "officialFormat" | "examFaqs"
> &
  Partial<Pick<MockSeoProfile, "whatIsExam" | "administeredBy" | "officialFormat" | "examFaqs">> & {
    localeMeta?: Record<string, { title?: string; description?: string; intro?: string }>;
  };

function defaultProfile(config: MockExamConfig): MockSeoProfile {
  const niche = getNicheExamExplainer(config.slug);
  const examLabel = config.examBody;
  const practiceName = niche?.practiceTestName ?? `${config.shortTitle} Practice Test`;
  const waitlist = config.status === "coming_soon";
  const type = config.status === "live" ? "practice test" : "readiness check";
  const aliasKeywords = (config.searchAliases ?? []).flatMap((alias) => [
    `${alias.toLowerCase()} practice test`,
    `${alias.toLowerCase()} practice exam`,
  ]);

  if (waitlist) {
    return {
      title: `Free ${practiceName} 2027 | Coming Soon`,
      description: niche
        ? `${practiceName} coming soon on UniPrep2Go: planned ${config.questionCount}-question timed diagnostic (${config.durationMinutes} min, ${config.passRule.passPercent}% target) with topic scoring. Notify when it launches. ${niche.administeredBy.replace(/\.+$/, "")}. Independent prep — not official exam material.`
        : `${config.shortTitle} free practice test coming soon: planned ${config.questionCount} timed questions, notify when live. Independent prep — not official exam material.`,
      keywords: [
        ...(niche?.keywords ?? []),
        `free ${config.shortTitle.toLowerCase()} practice test`,
        `${config.shortTitle.toLowerCase()} practice exam`,
        `${examLabel.toLowerCase()} practice questions`,
        ...aliasKeywords,
      ].slice(0, 12),
      headline: `Free ${practiceName} (Coming Soon)`,
      intro: `${config.description} The timed question bank is on the waitlist — use Notify me when this launches, and study the exam guide on this page meanwhile.`,
      audience:
        niche?.whoFor ??
        (niche
          ? `Candidates preparing for ${niche.practiceTestName.replace(/ Practice Test$/i, "")} who want a timed diagnostic with topic-level feedback when it launches.`
          : `Candidates preparing for ${examLabel} licensing or certification exams who want a timed diagnostic with topic-level feedback.`),
      practiceTestLabel: practiceName.replace(/^Free\s+/i, ""),
      whatIsExam:
        niche?.whatIsExam ??
        `${config.shortTitle} is an exam pathway administered under ${examLabel}. ${config.officialSourceNote} This UniPrep2Go page is an independent exam guide and waitlist for a free timed practice test — not official exam material.`,
      administeredBy: niche?.administeredBy ?? examLabel,
      officialFormat: niche?.officialFormat,
      examFaqs: niche?.examFaqs,
    };
  }

  const fullMockClause = hasShortFreeDiagnostic(config)
    ? `Full mock: ${config.questionCount} timed questions, ${config.durationMinutes} minutes, ${config.passRule.passPercent}% target (${MOCK_PASS_OFFER}).`
    : `${config.questionCount} timed questions, ${config.durationMinutes} minutes, ${config.passRule.passPercent}% target.`;

  return {
    title: `Free ${practiceName} 2027 | ${config.questionCount} Questions Online`,
    description: niche
      ? `${practiceName.replace(/^Free\s+/i, "")}: ${freeAccessClause(config)}, no signup, full topic report and answer review. ${fullMockClause} ${niche.administeredBy.replace(/\.+$/, "")}. Independent prep — not official exam material.`
      : `${examLabel} ${type}: ${freeAccessClause(config)}, no signup, full topic report and answer review. ${fullMockClause} Independent prep — not official exam material.`,
    keywords: [
      ...(niche?.keywords ?? []),
      `free ${config.shortTitle.toLowerCase()} practice test`,
      `${config.shortTitle.toLowerCase()} mock exam`,
      `${examLabel.toLowerCase()} practice questions`,
      ...aliasKeywords,
    ].slice(0, 12),
    headline: `Free ${practiceName}`,
    intro: `${config.description} Use this timed ${type} as a baseline before exam day or before drilling the linked Anki deck — ${hasShortFreeDiagnostic(config) ? `start with the ${freeAccessClause(config)}` : "your first mock is free"}.`,
    audience:
      niche?.whoFor ??
      (niche
        ? `Candidates preparing for ${niche.practiceTestName.replace(/ Practice Test$/i, "")} who want a timed diagnostic with topic-level feedback.`
        : `Candidates preparing for ${examLabel} licensing or certification exams who want a timed diagnostic with topic-level feedback.`),
    practiceTestLabel: practiceName.replace(/^Free\s+/i, ""),
    whatIsExam:
      niche?.whatIsExam ??
      `${config.shortTitle} is an exam pathway administered under ${examLabel}. ${config.officialSourceNote} This UniPrep2Go page is an independent timed practice test — not official exam material.`,
    administeredBy: niche?.administeredBy ?? examLabel,
    officialFormat: niche?.officialFormat,
    examFaqs: niche?.examFaqs,
  };
}

const mockSeoProfiles: Partial<Record<string, MockSeoProfileOverride>> = {
  "sie-full-mock": {
    // CTR pattern: Prep2Go (exam + concrete need + year) + PixID (specific offer in blue link)
    title: "SIE Practice Test Free 2027 | 25Q Free, 75Q Timed",
    description:
      "SIE practice test online — free 25-question diagnostic, no signup; full mock: 75 timed questions, 105 minutes, 70% pass target, instant pass/no-pass report and full answer review. FINRA-topic-weighted. Then repair weak domains with the $9.99 / 300-card SIE Anki deck. Independent — not official FINRA material.",
    keywords: [
      "free sie practice test",
      "sie practice test",
      "sie mock exam",
      "finra sie practice exam",
      "sie exam questions",
      "sie anki deck",
      "sie readiness check",
    ],
    headline: "SIE Practice Test — 75 Questions, Timed (Free 25-Question Version)",
    intro:
      "An SIE practice test on UniPrep2Go runs **75 timed questions in 105 minutes** (25-question free diagnostic available first) across FINRA’s four sections: knowledge of capital markets, products and risks, trading/customer accounts, and regulatory framework. FINRA’s official SIE is **80 items (75 scored + 5 pretest) in 105 minutes** with passing score **70 on an equated scale** (finra.org, checked 19 Nov 2026). Start with the [25-question SIE quick diagnostic](/mock-exams/sie-quick-diagnostic) if you need a shorter first pass, then drill the [$9.99 SIE Anki deck](/decks/sie-exam-anki-deck) and graduate to [Series 7](/mock-exams/series-7-readiness-check) after firm sponsorship.",
    examFaqs: [
      {
        question: "What is the SIE passing score?",
        answer:
          "FINRA lists a passing score of 70 on an equated scale for the 75 scored questions. This mock uses a 70% UniPrep readiness target for diagnosis only.",
      },
      {
        question: "SIE vs Series 7 — which practice test first?",
        answer:
          "Pass the SIE first unless your firm instructs otherwise, then use Series 7 Top-Off prep. Both mocks live on UniPrep2Go.",
      },
    ],
    audience:
      "SIE candidates, finance students, and career changers entering brokerage and securities roles who need a timed baseline before paying for a prep course.",
    practiceTestLabel: "FINRA SIE practice test",
  },
  "servsafe-manager-mock": {
    title: "Free ServSafe Manager Practice Test 2027 | 90-Question Mock Exam",
    description:
      "ServSafe Manager practice test — free 25-question diagnostic, no signup; full mock: 90 timed questions, 120 minutes, official pass 70% (56/80 scored) · 75% UniPrep2Go readiness target, food-safety topic scoring — then repair with the linked 300-card Anki deck. Official form is 90Q (80 scored + 10 pilot) / 2 hours. Independent — not NRA/ServSafe material.",
    keywords: [
      "servsafe manager practice test",
      "servsafe manager mock exam",
      "free servsafe practice test",
      "certified food protection manager practice test",
      "servsafe manager exam questions",
      "servsafe anki",
    ],
    headline: "Free ServSafe Manager Practice Test",
    intro:
      "A full-length ServSafe Manager / CFPM-style mock: 90 questions drawn from a 270-question original bank (retakes see new questions), 120 minutes, official pass 70% (56/80 scored) · 75% UniPrep2Go readiness target with topic scoring — then drill weak domains in the linked 300-card Anki deck (PDF study guide sold separately). Official exam is 90 multiple-choice (80 scored + 10 unscored pilot) in 2 hours. Topics: foodborne illness, time/temperature, hygiene, cleaning/sanitizing, receiving/storage, HACCP, and manager duties.",
    audience:
      "Restaurant managers, kitchen supervisors, hospitality students, and CFPM candidates who need a timed food safety baseline before exam day.",
    practiceTestLabel: "ServSafe Manager practice test",
  },
  "ptcb-pharmacy-technician-mock": {
    title: "Free PTCB Practice Test 2026 | 90-Question PTCE Mock (80 Scored)",
    description:
      "PTCB / PTCE mock: free 25-question diagnostic, full mock 90 timed questions, 110 minutes, January 2026 domain weights (Medications 35%, Federal 18.75%, Safety 23.75%, Order Entry 22.5%). Official PTCE is 80 scored + 10 pretest / scaled 1,400 — this page uses a 70% diagnostic. Full explanations, then $9.99 / 300-card Anki. Independent — not PTCB material.",
    keywords: [
      "ptcb practice test",
      "ptcb mock exam",
      "free ptcb practice test",
      "ptce practice exam",
      "pharmacy technician practice test",
      "ptcb exam questions",
      "ptce content outline",
      "ptcb outline 2026",
    ],
    headline: "Free PTCB Pharmacy Technician Practice Test (2026 Outline)",
    intro:
      "A full-length PTCB / PTCE mock on the January 2026 outline: 90 questions in 110 minutes with domain-weighted scoring across medications, federal requirements (including DSCSA), patient safety, and order entry. For the printable PTCE content outline / blueprint chapters, use the [PTCB Outline 2026 Study Guide](/decks/ptcb-study-guide-2026). Official PTCE pass is a scaled 1,400 on 80 scored items (10 pretest). Compounding/alligation are off the 2026 outline. After the report, drill only weak domains in the $9.99 / 300-card Anki deck.",
    audience:
      "Pharmacy technician candidates, pharmacy tech students, and career changers preparing for the PTCE who want a timed readiness baseline before buying prep courses or drilling flashcards.",
    practiceTestLabel: "PTCB / PTCE practice test",
  },
  "pharmacy-technician-excpt-readiness-check": {
    title: "NHA ExCPT Practice Test | 60Q Mock, 25Q Free",
    description:
      "NHA ExCPT pharmacy technician practice test: free 25-question diagnostic, no signup; full mock 60 timed questions, 75 minutes, topic scoring for orders & dispensing, inventory & storage, safety & quality, and law & ethics — full answer review, then $19 for unlimited attempts. Distinct from PTCB PTCE. Independent prep — not NHA exam material.",
    keywords: [
      "free nha excpt practice test",
      "nha excpt practice test",
      "excpt practice exam",
      "excpt vs ptcb",
      "nha pharmacy tech practice test",
      "pharmacy technician practice test free",
    ],
    headline: "NHA ExCPT Pharmacy Technician Practice Test — 60 Questions (Free 25-Question Version)",
    intro:
      "A timed ExCPT-pathway diagnostic with topic scoring — orders and dispensing, inventory and storage, safety and quality, and pharmacy law and ethics — built for candidates who chose NHA rather than PTCB. Each full attempt draws 60 of 120 original items; the free first run is a 25-question diagnostic, no signup, with full answer review. Independent prep — not retired NHA items.",
    audience:
      "Pharmacy technician candidates targeting NHA ExCPT (not PTCB PTCE) who want a timed baseline with topic scoring before paying for a question bank.",
    practiceTestLabel: "NHA ExCPT practice test",
  },
  "cfa-level-1-readiness-check": {
    title: "CFA Level 1 Practice Test | 25Q Free, 60Q Timed",
    description:
      "Free CFA Level 1 practice test: 25 questions, no signup, then 60 in 90 minutes with topic scores. Official exam: 180 questions, two 135-minute sessions.",
    keywords: [
      "cfa level 1 practice test",
      "cfa practice test",
      "cfa level 1 practice exam",
      "cfa level 1 practice questions",
      "free cfa practice questions",
    ],
    headline: "CFA Level 1 Practice Test",
    intro:
      "This CFA Level 1 practice test starts free: 25 questions, no signup, then 60 questions in 90 minutes across all 10 topics, with topic scores and full answer review. The official Level I exam is 180 questions in two 135-minute sessions, three choices, and CFA Institute sets the minimum passing score after each sitting rather than publishing a fixed percentage. CFA Institute’s public sample is 10 questions on the page plus 20 after a form, not a timed mock. This page is that shorter diagnostic. Close weak topics with the linked Anki deck ($19, 348 cards), the formula PDF, or the CFA Level 1 Pass Pack ($29) that includes both files. Not CFA Institute material.",
    audience: "CFA Level 1 candidates who want a free topic-scored practice test before a full-length mock.",
    practiceTestLabel: "CFA Level 1 practice test",
    examFaqs: [
      {
        question: "Is this the full CFA Level 1 exam?",
        answer:
          "No. The official Level I exam is 180 multiple-choice questions in two 135-minute sessions, with three answer choices, and CFA Institute sets the minimum passing score after each sitting. This CFA Level 1 practice test is 60 questions in 90 minutes; the free start is 25 questions, no signup, with topic scores.",
      },
    ],
  },
  "series-7-readiness-check": {
    title: "Series 7 Practice Test Free 2027 | 60Q, 25Q Free",
    description:
      "Series 7 practice test — free 25-question diagnostic, no signup; full mock: 60 timed questions across FINRA job-function weights, 90 minutes, 72% UniPrep2Go readiness target, topic scoring — then repair with Series 7 flashcards ($19 / 300-card Anki). Official Top-Off is 130 questions (125 scored + 5 pretest) / 3h45 / passing score 72 / FINRA fee $395; this check is shorter. Independent — not FINRA material.",
    keywords: [
      "series 7 practice test",
      "free series 7 practice test",
      "series 7 mock exam",
      "free series 7 questions",
      "finra series 7 readiness check",
      "series 7 anki",
    ],
    headline: "Series 7 Practice Test — 60 Questions (Free 25-Question Version)",
    intro:
      "A Series 7 practice test starts with 25 FINRA-style questions free, no signup, then 60 timed questions across seeking business, opening accounts, recommendations and suitability, and obtaining customer instructions. Official FINRA Series 7 Top-Off is 130 questions (125 scored + 5 pretest) in 3 hours 45 minutes with passing score 72 (verify on finra.org). Repair weak job functions with [Series 7 flashcards](/decks/series-7-anki-deck), then stack [Series 63](/mock-exams/series-63-readiness-check) for state law or [SIE](/mock-exams/sie-full-mock) if you have not passed it yet.",
    examFaqs: [
      {
        question: "Is there a free Series 7 practice test?",
        answer:
          "Yes. Start with 25 questions free, no signup, on this page. The full timed mock is 60 questions in 90 minutes with topic scoring; unlimited full mocks are $19 Mock Pass.",
      },
      {
        question: "How many questions are on the real Series 7 exam?",
        answer:
          "FINRA lists the Series 7 Top-Off as 130 multiple-choice questions (125 scored + 5 pretest) in 3 hours 45 minutes. Passing score is 72 — confirm on FINRA before you schedule.",
      },
      {
        question: "Do I need SIE before Series 7?",
        answer:
          "Most candidates pass the SIE first, then sit the Series 7 Top-Off with firm sponsorship. Use the [SIE practice test](/mock-exams/sie-full-mock) if SIE topics are still weak.",
      },
    ],
    audience: "Series 7 Top-Off candidates who want a timed diagnostic before drilling suitability and product questions.",
    practiceTestLabel: "Series 7 practice test",
  },
  "california-real-estate-readiness-check": {
    title: "Free California Real Estate Salesperson Practice Test | 60Q Mock",
    description:
      "California real estate practice: free 25-question diagnostic, then 60 timed questions / 90 minutes from a 120-item bank, 70% readiness target, and the 250-card CA DRE Anki deck. Official DRE salesperson exam is 150 questions / 3 hours / 70%. Independent — not DRE material.",
    keywords: [
      "california real estate practice test",
      "ca real estate exam questions",
      "california salesperson practice exam",
      "california real estate anki",
      "free real estate mock exam california",
    ],
    headline: "Free California Real Estate Salesperson Readiness Check",
    intro:
      "A California salesperson readiness check: 25 questions free, then 60 timed questions in 90 minutes drawn from a 120-item bank, with topic scores. The official DRE exam is 150 questions in 3 hours, and 70% is the pass line. This page is the shorter diagnostic. The linked deck is 250 California cards.",
    audience: "California DRE salesperson exam candidates who want a timed baseline before licensing prep.",
    practiceTestLabel: "California real estate practice test",
  },
  "fl-real-estate-readiness-check": {
    title: "Free Florida Real Estate Practice Test | 60Q Diagnostic",
    description:
      "Florida real estate practice test: free 25-question diagnostic, full mock 60 timed questions, 75 minutes, 70% readiness target, FREC topic scoring. Official DBPR exam is 100Q / 3.5h / 75% — this mock is shorter. Independent — not DBPR/FREC material.",
    keywords: [
      "florida real estate practice test",
      "florida real estate exam questions",
      "fl sales associate practice exam",
      "free florida real estate practice test",
      "frec practice test",
    ],
    headline: "Free Florida Real Estate Practice Test",
    intro:
      "A Florida DBPR/FREC sales associate diagnostic covering license law, contracts/titles, finance/appraisal math, and brokerage practice — with topic scoring. Official exam is 100 questions in 3.5 hours at 75%; use this 60-question timed mock to find weak domains before you schedule Pearson VUE.",
    audience:
      "Florida sales associate candidates after the 63-hour pre-license course who want a free timed baseline before the official 100-question DBPR exam.",
    practiceTestLabel: "Florida real estate practice test",
  },
  "tx-real-estate-readiness-check": {
    title: "Free Texas Real Estate Practice Test | 60Q Diagnostic",
    description:
      "Texas real estate practice test: free 25-question diagnostic, full mock 60 timed questions, 75 minutes, 70% readiness target, TREC topic scoring. Official TREC exam is dual national+state (~70% each) — this mock is shorter. Independent — not TREC material.",
    keywords: [
      "texas real estate practice test",
      "texas real estate exam questions",
      "trec practice exam",
      "free texas real estate practice test",
      "texas sales agent practice test",
    ],
    headline: "Free Texas Real Estate Practice Test",
    intro:
      "A Texas TREC sales agent diagnostic covering TRELA/TREC license law, contracts & agency, finance/closing math, and property practice. Official Pearson VUE sitting is dual national + Texas-law portions; use this 60-question timed mock to prioritize Anki repair before exam day.",
    audience:
      "Texas sales agent candidates who finished TREC qualifying education and want a free timed baseline before the official dual-portion exam.",
    practiceTestLabel: "Texas real estate practice test",
  },
  "ny-real-estate-readiness-check": {
    title: "Free NY Real Estate Practice Test | 60Q Diagnostic",
    description:
      "New York real estate practice test: free 25-question diagnostic, full mock 60 timed questions, 90 minutes, 70% readiness target, DOS topic scoring. The DOS exam is multiple choice and 90 minutes, reported pass or fail only. Independent — not DOS material.",
    keywords: [
      "new york real estate practice test",
      "ny real estate exam questions",
      "ny dos salesperson practice exam",
      "free ny real estate practice test",
    ],
    headline: "Free New York Real Estate Practice Test",
    intro:
      "A New York DOS salesperson diagnostic covering license law, contracts/agency/fair housing, finance/valuation/closing, and property practice. Official exam is 75 questions in 90 minutes at 70%; use this 60-question timed mock to find weak domains before eAccessNY.",
    audience:
      "New York salesperson candidates after qualifying education who want a free timed baseline before the official 75-question DOS exam.",
    practiceTestLabel: "New York real estate practice test",
  },
  "series-65-readiness-check": {
    title: "Series 65 Practice Test Free 2027 | 25Q + 120Q",
    description:
      "Series 65 practice test: free 25-question diagnostic, full mock 120 timed questions drawn from a 240-item bank, 120 minutes, topic scoring for NASAA IAR themes. Official Series 65 is 130 scored (+10 pretest) / 180 min / 92 correct — this mock is shorter. Independent — not NASAA/FINRA material.",
    keywords: [
      "series 65 practice test",
      "series 65 practice exam",
      "free series 65 questions",
      "nasaa series 65 mock",
      "investment adviser exam practice",
    ],
    headline: "Free Series 65 Practice Test",
    intro:
      "A Series 65 practice test begins with **25 questions free, no signup**, then up to **120 timed questions in 120 minutes** across economics, products, recommendations, and laws & ethics (drawn from a 240-item bank). NASAA’s official exam is **130 scored questions (plus pretest) in 180 minutes — candidates need 92 correct on the scored portion** (verify on nasaa.org). Repair gaps in the [Series 65 Anki deck](/decks/series-65-anki-deck); if you still need broker-dealer registration, compare [Series 63](/mock-exams/series-63-readiness-check).",
    audience:
      "Investment adviser representative candidates preparing for the NASAA Series 65 who want a free timed baseline before a full-length Q-bank.",
    practiceTestLabel: "Series 65 practice test",
    examFaqs: [
      {
        question: "What score do I need on Series 65?",
        answer:
          "NASAA historically requires 92 correct answers on the 130 scored questions. Confirm the current form on NASAA before exam day.",
      },
      {
        question: "Is there a free Series 65 practice test?",
        answer:
          "Yes — 25 questions free on this page, then optional 120-question timed mocks with topic scoring.",
      },
      {
        question: "Series 65 vs CFP — which exam first?",
        answer:
          "Series 65 licenses IAR registration; CFP is a separate comprehensive planning exam after education/experience. Use [CFP practice](/mock-exams/cfp-certification-readiness-check) only if CFP is your target.",
      },
    ],
  },
  "cfp-certification-readiness-check": {
    title: "CFP Exam Practice Test Free 2027 | 25Q Free, 120Q",
    description:
      "CFP exam practice test: 25 questions free, then 120 timed questions in 120 minutes across planning, tax, retirement, investments, and ethics. Verify official format on cfp.net. Not CFP Board material.",
    keywords: [
      "cfp exam practice test",
      "cfp practice test free",
      "certified financial planner practice exam",
      "cfp board exam prep",
      "cfp mock exam",
    ],
    headline: "CFP Certification Practice Test — 120 Questions (Free 25-Question Version)",
    intro:
      "A CFP exam practice test here means **25 scenario-style questions free, no signup**, then **120 timed questions in 120 minutes** spanning Principal Knowledge Topics (planning process, investments, tax, retirement, estate, insurance, ethics), drawn from a 240-item bank. CFP Board administers the comprehensive CFP Certification Examination after education, experience, and ethics requirements — **confirm the current item count, time limit, and registration fees on cfp.net** before you book (checked 19 Nov 2026; this page does not list CFP exam fees because they vary by window). Stack [Series 65](/mock-exams/series-65-readiness-check) if you still need IAR registration, or [Series 7](/mock-exams/series-7-readiness-check) for broker-dealer roles.",
    audience:
      "Financial planning candidates finishing CFP Board-registered education who want a timed MCQ baseline before the full certification exam.",
    practiceTestLabel: "CFP Certification practice test",
    examFaqs: [
      {
        question: "Is there a free CFP practice test?",
        answer:
          "Yes — start with 25 questions free on this page. Full 120-question timed mocks unlock via Mock Pass ($19 unlimited).",
      },
      {
        question: "What does the CFP exam cover?",
        answer:
          "CFP Board tests integrated financial planning across investments, tax, retirement, estate, risk management, and ethics. Use the live Principal Knowledge Topic outline on cfp.net for weights.",
      },
      {
        question: "CFP exam vs Series 65 — do I need both?",
        answer:
          "Many planners hold both, but they serve different gates (comprehensive certification vs NASAA IAR registration). Run the mock that matches your next scheduled exam.",
      },
    ],
  },
  "life-and-health-insurance-readiness-check": {
    title: "Life & Health Insurance Practice Test | 60Q, 25Q Free",
    description:
      "Life & Health insurance practice test — free 25-question diagnostic, no signup; full mock: 60 timed questions, 90 minutes, 70% target, topic scoring, and full answer review. Pairs with 250-card Anki deck. Independent prep — not official state exam material.",
    keywords: [
      "life and health insurance practice test",
      "free life and health insurance practice test",
      "insurance license practice exam",
      "life health insurance mock exam",
      "free insurance exam questions",
      "life and health insurance exam prep",
    ],
    headline: "Life & Health Insurance Practice Test — 60 Questions (Free 25-Question Version)",
    intro:
      "A Life & Health insurance licensing practice test — health insurance, life basics, provisions, annuities, disability, LTC, and regulation. Timed 60-question diagnostic drawn from a 250-item original bank so retakes differ, with topic scoring — free 25-question diagnostic, no signup. Drill weak areas in the 250-card Life & Health Anki deck between sittings.",
    audience: "Insurance producer candidates preparing for state Life & Health licensing exams.",
    practiceTestLabel: "Life & Health insurance practice test",
  },
  "frm-part-1-readiness-check": {
    title: "FRM Part 1 Practice Test Free 2027 | 25Q + 50Q",
    description:
      "FRM Part 1 practice test: free 25 questions, no signup; full mock 50 questions in 120 minutes across GARP’s four topics. Official Part 1 is 100 MCQs in 4 hours (garp.org). Then $19 Mock Pass.",
    keywords: [
      "frm level 1 mock test",
      "frm part 1 mock test",
      "frm part 1 practice test",
      "frm mock exam",
      "free frm practice questions",
      "frm part 1 anki",
      "garp frm readiness check",
      "frm part 1 exam prep",
    ],
    headline: "FRM Part 1 Practice Questions — 25 Free, 50Q Full Mock",
    intro:
      "An FRM Part 1 practice test on this page answers “how ready am I before GARP?” with 25 questions free, no signup, then 50 timed questions across foundations, quant, markets/products, and valuation/risk models. GARP’s official Part 1 is **100 equally weighted multiple-choice questions in 4 hours**; GARP does not publish a fixed percent pass (verify at garp.org/frm/program-exams, checked 19 Nov 2026). Repair weak topics in the [$9.99 FRM Part 1 Anki deck](/decks/frm-part-1-anki-deck), compare pathways in [CFA vs FRM](/blog/cfa-level-1-vs-frm-part-1-which-to-choose), or cross-train [CFA Level 1](/mock-exams/cfa-level-1-readiness-check) ethics and quant if you are deciding between exams.",
    officialFormat:
      "Official (GARP, verify at garp.org): 100 MCQ / 4 hours / four topics at 20%–30% weights. UniPrep: 25Q free diagnostic, 50Q / 120 min / 70% readiness target.",
    audience: "FRM Part 1 candidates who want a timed baseline before committing to a full mock provider.",
    practiceTestLabel: "FRM Part 1 practice test",
    examFaqs: [
      {
        question: "Is there an official GARP FRM Part 1 mock?",
        answer:
          "Yes — GARP gives registered Part I candidates practice exams and GARP Learning at no extra cost, until the last day of their exam window (garp.org/frm/study-materials, checked 23 Nov 2026). This free 25-question FRM Part 1 mock test is independent: use it before you register or between GARP practice exams to find weak topics.",
      },
      {
        question: "How many questions are on FRM Part 1?",
        answer:
          "GARP administers 100 equally weighted multiple-choice questions in 4 hours. This UniPrep2Go mock is a 50-question diagnostic (25-question free start) — not a full 100-question sitting.",
      },
      {
        question: "What is the FRM Part 1 pass rate or passing score?",
        answer:
          "GARP does not publish a fixed passing percentage; it sets the cutoff after each exam cycle. Treat official results from GARP as the only pass/fail source.",
      },
      {
        question: "Is there a free FRM Part 1 practice test?",
        answer:
          "Yes — start with 25 questions free on this page, then optionally unlock the 50-question timed mock via Mock Pass ($19 unlimited full mocks).",
      },
      {
        question: "FRM Part 1 vs CFA Level 1 — which mock first?",
        answer:
          "If you are undecided, read the [CFA vs FRM guide](/blog/cfa-level-1-vs-frm-part-1-which-to-choose) and run whichever timed diagnostic matches your registered exam.",
      },
    ],
  },
  "nbrc-tmc-readiness-check": {
    title: "Free NBRC TMC & 2027 RT Exam Practice Test | 25Q Free",
    description:
      "Free NBRC TMC practice test: 60 timed scenario questions from a 120-question bank (ABGs, ventilators, equipment, neonatal and emergency care) with a weak-topic report. TMC ends Dec 31, 2026; the content carries into the 2027 RT Exam. Not NBRC material.",
    keywords: [
      "nbrc tmc practice test",
      "free tmc practice exam",
      "tmc exam practice questions",
      "nbrc rt exam 2027 practice",
      "respiratory therapy practice test",
    ],
    headline: "Free NBRC TMC & 2027 RT Exam Readiness Check",
    intro:
      "A timed 60-question respiratory therapy diagnostic drawn from a 120-question scenario bank: blood gases, ventilator graphics and settings, oxygen and aerosol devices, infection control, NIV and medications, neonatal resuscitation, and emergencies. The real TMC is 160 items in 3 hours and runs through December 31, 2026; from January 4, 2027 NBRC replaces TMC and CSE with one 185-item RT Examination. The clinical content here is shared by both exams.",
    audience: "Respiratory therapy students and graduates sitting the NBRC TMC before the end of 2026, or the new RT Examination from 2027.",
    practiceTestLabel: "NBRC TMC practice test",
  },
  "series-63-readiness-check": {
    title: "Series 63 Practice Test Free 2027 | 60Q, 25Q Free",
    description:
      "Series 63 practice test — free 25-question diagnostic, no signup; full mock: 60 timed questions on NASAA state law topics, 90 minutes, 72% target, topic readiness scoring — then fix weak law rows before the state sit. Independent — not official NASAA material.",
    keywords: [
      "series 63 practice test",
      "free series 63 practice test",
      "series 63 mock exam",
      "series 63 anki",
      "nasaa series 63 questions",
      "uniform securities act practice test",
      "free series 63 exam prep",
    ],
    headline: "Series 63 Practice Test — 60 Questions (Free 25-Question Version)",
    intro:
      "A Series 63 practice test starts with **25 NASAA state-law questions free, no signup**, then 60 timed questions in 90 minutes across broker-dealer regulation, agent registration, ethics, communications, and investment adviser basics. NASAA’s official Series 63 is **60 scored questions (plus pretest items) in 75 minutes with passing score 72** — confirm on nasaa.org before you schedule (checked 19 Nov 2026). Drill weak Uniform Securities Act rows in the [Series 63 Anki deck](/decks/series-63-anki-deck) after [Series 7](/mock-exams/series-7-readiness-check) suitability prep.",
    audience: "Series 63 candidates who need a timed diagnostic after SIE and Series 7 prep.",
    practiceTestLabel: "Series 63 practice test",
    examFaqs: [
      {
        question: "Is the Series 63 exam free to practice here?",
        answer:
          "Your first diagnostic is 25 questions free, no signup. Full 60-question timed mocks require Mock Pass ($19 unlimited).",
      },
      {
        question: "How many questions are on the Series 63?",
        answer:
          "NASAA lists 60 scored multiple-choice questions in 75 minutes. Passing score is 72 — verify with NASAA for your exam form.",
      },
      {
        question: "Series 63 vs Series 65 — which practice test?",
        answer:
          "Series 63 is for broker-dealer agents after SIE/7; Series 65 is for investment adviser representatives. Use [Series 65](/mock-exams/series-65-readiness-check) if you are on the IAR path.",
      },
    ],
  },
  "property-casualty-insurance-readiness-check": {
    title: "Free Property & Casualty Insurance Practice Test | 60 Questions",
    description:
      "Property and Casualty insurance licensing practice online: free 25-question diagnostic, full mock 60 timed questions, 90 minutes, 70% target, topic scoring, and answer review. Independent P&C prep — not official state exam material.",
    keywords: [
      "property casualty insurance practice test",
      "p&c insurance license exam",
      "homeowners insurance exam questions",
      "casualty insurance mock exam",
      "insurance producer practice test",
    ],
    headline: "Free Property & Casualty Insurance Readiness Check",
    intro:
      "A timed 60-question P&C licensing diagnostic drawn from a 250-item bank: homeowners and dwelling, personal and commercial auto, commercial property, liability, and regulation. State exams set their own length and pass score.",
    audience: "Property & Casualty insurance producer candidates preparing for state licensing exams.",
    practiceTestLabel: "Property & Casualty insurance practice test",
  },
  "gmat-focus-readiness-check": {
    title: "Free GMAT Practice Test 2027 | 45-Question Mock",
    description:
      "Current-GMAT practice: free 25-question diagnostic, full mock 45 timed questions across Quant, Verbal, and Data Insights. Official exam is 64Q / 2h15 / 205–805. SuperScore live since Aug 2026. UniPrep bank rewritten October 2026 (no SC, no Quant geometry). Independent — not GMAC material.",
    keywords: [
      "gmat practice test",
      "gmat focus practice test",
      "gmat mock exam",
      "free gmat practice questions",
      "gmat 2026 practice test",
    ],
    headline: "Free GMAT Readiness Check (2027 exam)",
    intro:
      "A timed diagnostic on the current GMAT: Quantitative Reasoning, Verbal Reasoning, and Data Insights with equal section weights. Official sitting is 64 questions / 2 hours 15 minutes / 205–805. This 45-question check uses a bank rewritten October 2026 — not Sentence Correction or Quant geometry leftovers.",
    audience:
      "MBA and business master's applicants who want a baseline timed diagnostic before official GMAC prep or tutoring.",
    practiceTestLabel: "GMAT practice test",
  },
  "sat-readiness-check": {
    title: "Free Digital SAT Practice Test | 49-Question Mock",
    description:
      "Digital SAT practice: free 25-question diagnostic, full mock 49 timed questions across Reading and Writing and Math, 70 minutes, both section axes required. Live $9.99 / 160 unique Anki .apkg on Gumroad — not waitlist. Independent SAT prep — not College Board material.",
    keywords: [
      "digital sat practice test",
      "sat mock exam",
      "free sat practice questions",
      "sat readiness check",
      "sat reading and writing practice",
      "sat math practice test",
    ],
    headline: "Free Digital SAT Readiness Check",
    intro:
      "A timed Digital SAT readiness diagnostic scored on the two official College Board axes — Reading and Writing and Math — with a 400–1600 style prep target. Both sections must clear the readiness bar for a pass.",
    audience:
      "High school students and parents who want a baseline timed diagnostic before Bluebook practice or tutoring.",
    practiceTestLabel: "Digital SAT practice test",
  },
  "pmp-readiness-check": {
    title: "Free PMP Practice Test 2027 | 51Q People / Process / BE",
    description:
      "PMP domain diagnostic: free 25-question diagnostic, full mock 51 questions, 70 minutes, 17 People / 21 Process / 13 Business Environment (2026 ECO 33/41/26). All three domains must clear 70%. Official PMI exam is 180Q (170 scored) / 240 min with no published % cut. Then $9.99 / 346 Anki. Independent — not PMI material.",
    keywords: [
      "pmp practice test",
      "pmp mock exam",
      "free pmp practice questions",
      "pmp readiness check",
      "pmp anki deck",
      "pmp exam prep",
      "project management professional practice test",
    ],
    headline: "PMP Domain Readiness Check (51 Questions; Free 25-Question Version)",
    intro:
      "A timed 51-question PMP diagnostic scored on the three 2026 PMI Exam Content Outline domains — People 33% (17Q), Process 41% (21Q), Business Environment 26% (13Q). All three must clear 70% for a readiness pass. Official PMP is 180 questions (170 scored + 10 pretest) in 240 minutes with ~40% predictive and ~60% agile/hybrid items and no published percentage cut. After the report, drill the weak domain in the $9.99 / 346-card Anki deck before a full-length simulator.",
    audience:
      "Project managers and aspirants preparing for the PMI PMP certification who want a domain-weighted baseline before a full-length mock or paid study course.",
    practiceTestLabel: "PMP practice test",
  },
  "gre-readiness-check": {
    title: "Free GRE Practice Test | 30-Question Mock",
    description:
      "GRE General practice — free 25-question diagnostic, no signup; full mock: 30 timed questions (15 Verbal + 15 Quant), 45 minutes, both sections must clear 70% readiness — then drill weak rows with the live 350-card GRE Anki deck. Official shorter GRE is ~1h58 with 27V+27Q; this check is a diagnostic, not PowerPrep. Independent — not ETS material.",
    keywords: [
      "gre practice test",
      "gre mock exam",
      "free gre practice questions",
      "gre readiness check",
      "gre verbal practice",
      "gre quant practice test",
      "gre anki",
    ],
    headline: "Free GRE General Readiness Check",
    intro:
      "A timed GRE General diagnostic scored on the two official ETS MCQ axes — Verbal Reasoning and Quantitative Reasoning (130–170 each). Both sections must clear the readiness bar for a pass. Official shorter GRE (~1 hour 58 minutes) is 27 Verbal + 27 Quant plus Analytical Writing; this check is a 30-question baseline (free 25-question version; Writing not included), not an adaptive PowerPrep form. Live 350-card Anki (175V/175Q) for daily repair after the report.",
    audience:
      "Graduate and business school applicants who want a baseline timed diagnostic before official ETS PowerPrep or tutoring.",
    practiceTestLabel: "GRE practice test",
  },
  "epa-608-readiness-check": {
    title: "Free EPA 608 Practice Test | 40-Question Mock",
    description:
      "EPA Section 608 practice questions online: free 25-question diagnostic, full mock 40 timed questions across Core, Type I, Type II, and Type III, 75 minutes, 70% readiness target, section diagnosis, and full answer review. Independent HVAC prep — not U.S. EPA exam material.",
    keywords: [
      "epa 608 practice test",
      "hvac certification practice test",
      "epa 608 study guide",
      "free epa 608 practice questions",
      "hvac technician exam",
      "epa 608 core type 1 2 3",
    ],
    headline: "Free EPA Section 608 HVAC Readiness Check",
    intro:
      "A timed EPA 608 readiness diagnostic modeled on the Universal certification format: Core plus Types I, II, and III with the official 18-of-25 (72%) pass threshold per section as your prep target.",
    audience:
      "HVAC technicians, apprentices, and trade-school students preparing for EPA Section 608 refrigerant certification before scheduling an approved proctored exam.",
    practiceTestLabel: "EPA 608 practice test",
  },
  "bms-bas-readiness-check": {
    title: "Free BMS Practice Test | 60-Question BAS Mock",
    description:
      "BMS / BAS practice: free 25-question diagnostic, full mock 60 timed questions across BACnet, HVAC sequences, alarms/trends, and commissioning — then repair with the $9.99 / 120-card BMS Anki deck. No single federal BMS license. Independent — not Tridium material.",
    keywords: [
      "bms practice test",
      "building automation practice exam",
      "bas technician test",
      "bacnet practice questions",
      "bms anki",
      "niagara 4 study guide",
      "building management system exam",
    ],
    headline: "Free BMS / BAS Building Automation Readiness Check",
    intro:
      "A timed 60-question building automation diagnostic drawn from a 120-item bank, covering BACnet networking, HVAC control sequences, operator platform workflows, and commissioning — then drill weak domains in the linked $9.99 / 120-card Anki deck. There is no single U.S. federal BMS license — Niagara 4 TCP is a vendor course with a practical assessment, not this MCQ. Independent prep, not Tridium or BACnet International material.",
    audience:
      "BMS engineers, controls technicians, facility automation staff, and integrator apprentices preparing for BAS roles or vendor certification training.",
    practiceTestLabel: "BMS practice test",
  },
  "nha-cpct-readiness-check": {
    title: "Free NHA CPCT/A Practice Test | 120-Question PCT Mock",
    description:
      "NHA CPCT/A practice: free 25-question diagnostic, full mock 120 timed questions / 120 minutes with topic scoring from a 240-item bank — then repair with the $9.99 / 240-card Anki deck. Official exam is 100+20 / 2h / scaled 390. Not CCMA / NHA CPT / ASPT. Independent — not NHA material.",
    keywords: [
      "free nha cpct practice test",
      "nha cpct practice test",
      "patient care technician practice test",
      "cpct/a practice exam",
      "nha cpct anki",
      "nha pct mock exam",
    ],
    headline: "Free NHA CPCT/A Patient Care Technician Readiness Check",
    intro:
      "A timed 120-question / 120-minute text diagnostic for NHA CPCT/A drawn from a 240-item bank — then drill weak domains in the linked $9.99 / 240-card Anki deck. Official 2025 test plan is 100 scored + 20 pretest items in 2 hours (scaled pass 390). Four topic buckets here — all items scored; official forms include 20 pretest items and a skills lab. CPCT/A is not CCMA, not NHA CPT phlebotomy, and not ASPT.",
    audience:
      "Patient care technician students and working aides preparing for NHA CPCT/A at a school site, PSI, or live remote proctoring — not CCMA or phlebotomy-only candidates.",
    practiceTestLabel: "NHA CPCT practice test",
  },
  "aha-bls-provider-readiness-check": {
    title: "Free AHA BLS Practice Test 2027 | 60Q Cognitive Mock",
    description:
      "AHA BLS practice test — free 25-question diagnostic, no signup; full mock: 60 timed questions, 45 minutes, 84% readiness target. Official HeartCode BLS cognitive is ~25Q / 84% plus skills. 2025 infant + FBAO science. Independent — not an AHA card.",
    keywords: [
      "aha bls practice test",
      "free bls practice test",
      "bls cpr practice test",
      "basic life support practice exam",
      "aha bls 2025",
      "bls anki",
    ],
    headline: "AHA BLS Provider Cognitive Practice Test — 60 Questions (Free 25-Question Version)",
    intro:
      "A timed 60-question / 45-minute cognitive diagnostic for AHA BLS Provider — adult CPR/AED, child & infant CPR, choking & opioid emergency, and team dynamics. Official HeartCode BLS cognitive is about 25 open-resource questions with an 84% pass plus in-person skills; this check is longer and cognitive-only. 2025 science: infant compressions are heel of 1 hand or 2 thumbs, not two fingers; severe adult/child FBAO uses 5 back blows then 5 abdominal thrusts. Planned 120-card Anki waitlist. Not Heartsaver and not an AHA course card.",
    audience:
      "Healthcare students and clinicians booking BLS Provider who want a 2025-aligned cognitive baseline before skills — not lay Heartsaver CPR and not ACLS.",
    practiceTestLabel: "AHA BLS practice test",
  },
  "ardms-spi-readiness-check": {
    title: "Free ARDMS SPI Practice Test 2027 | 60Q Ultrasound Physics",
    description:
      "ARDMS SPI practice test — free 25-question diagnostic, no signup; full mock: 60 timed questions, 75 minutes, 70% readiness target. Official SPI is ~110Q / 2h / scaled 555. Text/physics only. Independent — not ARDMS material.",
    keywords: [
      "ardms spi practice test",
      "free spi practice test",
      "ultrasound physics practice test",
      "spi exam practice",
      "sonography principles instrumentation",
      "ardms spi anki",
    ],
    headline: "ARDMS SPI Practice Test — 60 Ultrasound Physics Questions (Free 25-Question Version)",
    intro:
      "SPI is the physics gate most ARDMS specialties require before ABD or OB/GYN. This 60-question / 75-minute text check (free 25-question start) scores acoustic variables, transducers and beam formation, Doppler and hemodynamics, and artifacts and bioeffects — including c = fλ, acoustic impedance Z = ρc, and axial resolution about SPL/2. Official SPI is about 110 questions in 2 hours, scaled pass 555. There are no image-interpretation items here. The matching deck is a live $9.99 / 120-card Anki file. Not an ABD/OB specialty exam and not ARDMS material.",
    audience:
      "Sonography students and working sonographers sitting SPI as the physics gate — not ABD/OB image interpretation and not ARRT sonography.",
    practiceTestLabel: "ARDMS SPI practice test",
  },
  "ascp-mls-readiness-check": {
    title: "Free ASCP MLS Practice Test 2027 | 60Q Lab Mock",
    description:
      "ASCP MLS practice test — free 25-question diagnostic, no signup; full mock: 60 timed questions, 90 minutes, 70% readiness target. Official BOC MLS is 100Q CAT / 2h30 / scaled 400. Independent — not ASCP material. Not MLT.",
    keywords: [
      "ascp mls practice test",
      "free mls practice test",
      "mls ascp practice exam",
      "medical laboratory scientist practice test",
      "ascp mls mock",
      "mls anki",
    ],
    headline: "ASCP MLS Practice Test — 60 Lab Questions (Free 25-Question Version)",
    intro:
      "A timed 60-question / 90-minute diagnostic for ASCP BOC MLS — blood bank, chemistry, hematology, and microbiology/immunology. Official MLS(ASCP) is 100 computer-adaptive questions in 2 hours 30 minutes with a scaled pass of 400. This check is shorter and linear (not CAT). Urinalysis, immunology, and lab operations appear inside those four benches. Planned 120-card Anki waitlist. Not MLT technician.",
    audience:
      "MLS students and working scientists booking national MLS(ASCP) — not MLT technician candidates and not phlebotomy-only PBT.",
    practiceTestLabel: "ASCP MLS practice test",
  },
  "ascp-mlt-readiness-check": {
    title: "Free ASCP MLT Practice Test 2027 | 60Q Lab Mock",
    description:
      "ASCP MLT practice test — free 25-question diagnostic, no signup; full mock: 60 timed questions, 75 minutes, 70% readiness target. Official BOC MLT is 100Q CAT / 2h30 / scaled 400. Independent — not ASCP material. Not MLS.",
    keywords: [
      "ascp mlt practice test",
      "free mlt practice test",
      "mlt ascp practice exam",
      "medical lab technician practice test",
      "ascp mlt mock",
      "mlt anki",
    ],
    headline: "ASCP MLT Practice Test — 60 Lab Questions (Free 25-Question Version)",
    intro:
      "Medical laboratory technicians run the bench: ABO/Rh and antibody screen, a chemistry panel, a CBC differential, and culture setup, under a technologist or pathologist. This 60-question / 75-minute linear check (free 25-question start) scores those four benches from a 120-item bank. Official MLT(ASCP) is 100 adaptive questions in 2 hours 30 minutes, scaled pass 400. California’s separate 80-question / 2-hour form is a different sitting. This page is the technician exam — not MLS method validation, not phlebotomy-only PBT.",
    audience:
      "MLT students and working technicians booking national MLT(ASCP) — not MLS scientist candidates and not phlebotomy-only PBT.",
    practiceTestLabel: "ASCP MLT practice test",
  },
  "aswb-bachelors-readiness-check": {
    title: "Free ASWB Bachelors Practice Test 2026 | 60Q LSW Mock",
    description:
      "ASWB Bachelors practice test — free 25-question diagnostic, no signup; full mock: 60 timed questions, 75 minutes, 70% readiness. Official from 3 Aug 2026 is 122Q / 4h. Independent — not ASWB. Not LCSW Clinical.",
    keywords: [
      "aswb bachelors practice test",
      "free lsw practice test",
      "lbsw practice exam",
      "aswb bachelors mock",
      "aswb bachelors anki",
    ],
    headline: "ASWB Bachelors Practice Test — 60 Generalist Questions (Free 25-Question Version)",
    intro:
      "A timed 60-question / 75-minute diagnostic for ASWB Bachelors (LSW/LBSW-style) — human development, assessment, intervention, and ethics. Official sitting from 3 August 2026 is 122 questions (110 scored) in 4 hours. This check is shorter. Planned 60-card Anki waitlist. Not Clinical/LCSW and not Masters.",
    audience:
      "BSW graduates sitting LSW/LBSW-style licensure — not LCSW Clinical candidates.",
    practiceTestLabel: "ASWB Bachelors practice test",
  },
  "aswb-clinical-readiness-check": {
    title: "Free ASWB Clinical Practice Test 2026 | 60Q LCSW Mock",
    description:
      "ASWB Clinical practice test — free 25-question diagnostic, no signup; full mock: 60 timed questions, 75 minutes, 70% readiness. Official from 3 Aug 2026 is 122Q / 4h. Independent — not ASWB. Not Bachelors/LSW.",
    keywords: [
      "aswb clinical practice test",
      "free lcsw practice test",
      "aswb clinical mock",
      "lcsw practice exam",
      "aswb clinical anki",
    ],
    headline: "ASWB Clinical Practice Test — 60 LCSW Questions (Free 25-Question Version)",
    intro:
      "A timed 60-question / 75-minute diagnostic for ASWB Clinical (LCSW) — clinical assessment, diagnosis concepts, psychotherapy, and ethics. Official sitting from 3 August 2026 is 122 questions (110 scored) in 4 hours. This check is shorter. Planned 60-card Anki waitlist. Not Bachelors/LSW.",
    audience:
      "MSW graduates with required clinical hours sitting LCSW — not Bachelors/LSW candidates.",
    practiceTestLabel: "ASWB Clinical practice test",
  },
  "barber-state-readiness-check": {
    title: "Free Barber Practice Test 2027 | 60Q NIC Theory Mock",
    description:
      "Barber theory practice test — free 25-question diagnostic, no signup; full mock: 60 timed questions, 75 minutes, 70% readiness. Official NIC Barber theory is 60 items (50 scored) / 90 min. Independent — not NIC. Practical separate.",
    keywords: [
      "barber practice test",
      "free barber exam practice",
      "nic barber theory practice test",
      "barber license mock",
      "barber anki",
    ],
    headline: "Barber Practice Test — 60 Theory Questions (Free 25-Question Version)",
    intro:
      "A timed 60-question / 75-minute theory diagnostic for NIC-style barber licensing — infection control, cutting/shaving, chemical services, and board-law themes. Official NIC National Barber Theory is 60 items (50 scored) in 90 minutes. This check is 15 minutes shorter and is not the practical. Planned 120-card Anki waitlist. Not NIC Cosmetology Theory.",
    audience:
      "Barber students sitting a NIC-style written exam — not cosmetology theory and not the skills sitting.",
    practiceTestLabel: "Barber practice test",
  },
  "medication-aide-readiness-check": {
    title: "Free Medication Aide Practice Test 2027 | 60Q MACE Mock",
    description:
      "Medication aide practice test — free 25-question diagnostic, no signup; full mock: 60 timed questions, 75 minutes, 70% readiness. Typical MACE is 60Q / 2h. Independent — not NCSBN. Not CNA/NNAAP.",
    keywords: [
      "medication aide practice test",
      "mace practice test free",
      "cma med aide practice exam",
      "medication aide mock",
      "medication aide anki",
    ],
    headline: "Medication Aide Practice Test — 60 Questions (Free 25-Question Version)",
    intro:
      "A timed 60-question / 75-minute diagnostic for state medication-aide / MACE themes — six rights, routes, safety, and documentation. Typical NCSBN MACE is 60 questions in 2 hours where a state uses it. This check uses the same item count on a shorter clock. Planned 120-card Anki waitlist. Not RN/LPN and not NNAAP CNA.",
    audience:
      "CNAs completing medication-aide training for long-term care — not LPNs/RNs and not CNA-only candidates.",
    practiceTestLabel: "Medication Aide practice test",
  },
  "home-health-aide-readiness-check": {
    title: "Free Home Health Aide Practice Test 2027 | 60Q Timed HHA Mock",
    description:
      "HHA practice test: free 25-question diagnostic, full mock 60 timed questions (75 min) from a 120-item bank, scored by topic, with a teaching note on every wrong answer. Written to the 42 CFR 484.80 competency subjects. Independent — not a state or agency exam.",
    keywords: [
      "home health aide practice test",
      "hha practice test free",
      "hha competency test",
      "home health aide exam questions",
      "hha exam 42 cfr 484.80",
      "home health aide anki",
    ],
    headline: "Home Health Aide (HHA) Practice Test — 60 Questions (Free 25-Question Version)",
    intro:
      "A timed 60-question / 75-minute HHA diagnostic — 15 questions each on personal care, home safety and infection control, observation and reporting, and ethics, drawn from a 120-item bank so retakes differ. Questions follow the subjects a registered nurse must evaluate under 42 CFR 484.80 (75-hour training, at least 16 hours supervised practical). There is no national question count or pass score; your agency or training program sets them, and the hands-on skills are checked in person. Planned Home Health Aide Anki deck on the waitlist.",
    audience:
      "Home health aide trainees and new aides at Medicare-certified home health agencies preparing for the competency evaluation — not the CNA nurse aide exam and not a medication aide test.",
    practiceTestLabel: "Home Health Aide practice test",
  },
  "nail-technician-state-readiness-check": {
    title: "Free Nail Technician Practice Test 2027 | 60Q NIC Mock",
    description:
      "Nail technician practice test — free 25-question diagnostic, no signup; full mock: 60 timed questions, 75 minutes, 70% readiness. Official NIC Nail Theory is 110 (100 scored) / 90 min. Independent — not NIC. Not Cosmetology or Barber Theory.",
    keywords: [
      "nail technician practice test",
      "manicurist practice test free",
      "nic nail theory practice exam",
      "nail tech mock",
      "nail technician anki",
    ],
    headline: "Nail Technician Practice Test — 60 Questions (Free 25-Question Version)",
    intro:
      "A timed 60-question / 75-minute theory diagnostic for NIC-style nail technician / manicurist licensing — infection control, anatomy, services, and chemistry. Official NIC Nail Technology Theory is 110 items (100 scored) in 90 minutes. This check is shorter. Practical is separate. Planned 60-card Anki waitlist. Not Cosmetology Theory and not Barber Theory.",
    audience:
      "Nail-tech students sitting a NIC-style written exam — not Cosmetology Theory and not the practical sitting.",
    practiceTestLabel: "Nail Technician practice test",
  },
  "nsca-cpt-readiness-check": {
    title: "Free NSCA-CPT Practice Test 2027 | 60-Question Mock",
    description:
      "NSCA-CPT practice test — free 25-question diagnostic, no signup; full mock: 60 timed questions, 75 minutes, drawn from a 120-item bank, 70% readiness. Official NSCA-CPT is 155Q / 3h / scaled 70. Independent — not NSCA. Not CSCS.",
    keywords: [
      "nsca-cpt practice test",
      "nsca personal trainer practice test",
      "nsca cpt mock",
      "nsca-cpt anki",
    ],
    headline: "NSCA-CPT Practice Test — 60 Questions (Free 25-Question Version)",
    intro:
      "A timed 60-question / 75-minute text diagnostic for NSCA-CPT, drawn from a 120-item bank — assessment, program design, technique, and safety. Official NSCA-CPT is 155 questions (140 scored + 15 pretest) in 3 hours with a scaled pass of 70, including 25–35 video/image items. This check has no video. Planned 120-card Anki, not a live download. Not CSCS and not NASM/ACE/ACSM CPT.",
    audience:
      "Personal-trainer candidates sitting NSCA-CPT — not CSCS strength coaches and not NASM/ACE/ACSM CPT candidates.",
    practiceTestLabel: "NSCA-CPT practice test",
  },
  "phr-hrci-readiness-check": {
    title: "Free PHR Practice Test 2026 | 60-Question HRCI Mock",
    description:
      "PHR practice test — free 25-question diagnostic, no signup; full mock: 60 timed questions, 75 minutes, 70% readiness. Official HRCI PHR is 90 scored + 25 pretest / 2h / scaled 500. Independent — not HRCI. Not SPHR or SHRM-CP.",
    keywords: [
      "phr practice test",
      "hrci phr practice test free",
      "phr mock exam",
      "phr anki",
    ],
    headline: "PHR Practice Test — 60 Questions (Free 25-Question Version)",
    intro:
      "A timed 60-question / 75-minute diagnostic for HRCI PHR — talent, employee relations, compensation/benefits, and compliance. Official PHR is 90 scored + 25 pretest in 2 hours with a scaled pass of 500. This check is shorter. Planned 60-card Anki waitlist. Not SPHR and not SHRM-CP.",
    audience:
      "HR generalists sitting PHR — not SPHR strategy candidates and not SHRM-CP candidates.",
    practiceTestLabel: "PHR practice test",
  },
  "physical-therapy-aide-readiness-check": {
    title: "Free Physical Therapy Aide Practice Test 2027 | 60Q Mock",
    description:
      "PT aide practice test — free 25-question diagnostic, no signup; full mock: 60 timed questions, 75 minutes, 70% readiness. No national PT aide exam. Independent. Not NPTE or PTA.",
    keywords: [
      "physical therapy aide practice test",
      "pt aide practice test free",
      "pt tech practice exam",
      "physical therapy aide anki",
    ],
    headline: "Physical Therapy Aide Practice Test — 60 Questions (Free 25-Question Version)",
    intro:
      "A timed 60-question / 75-minute knowledge diagnostic for physical therapy aide / PT tech scope — modalities assist, transfers, anatomy, and ethics. There is no single national PT aide exam. Aides work under a PT or PTA. Planned 60-card Anki waitlist. Not the NPTE and not a PTA exam.",
    audience:
      "Clinic aides and rehab techs learning aide-scope safety — not PT/PTA licensure candidates.",
    practiceTestLabel: "Physical Therapy Aide practice test",
  },
  "praxis-core-readiness-check": {
    title: "Free Praxis Core Practice Test 2026 | 60Q Combined Mock",
    description:
      "Praxis Core practice test — free 25-question diagnostic, no signup; full mock: 60 timed questions, 75 minutes, 70% readiness. Official Core is three ETS tests (5713/5723/5733). Independent — not ETS. Not SpEd 5355.",
    keywords: [
      "praxis core practice test",
      "praxis 5713 practice test",
      "praxis core mock",
      "praxis core anki",
    ],
    headline: "Praxis Core Practice Test — 60 Questions (Free 25-Question Version)",
    intro:
      "A timed 60-question / 75-minute selected-response diagnostic across Praxis Core reading, writing, math, and strategy. Official Core is three separate ETS tests (Reading 5713 56Q/85 min, Writing 5723 40 SR + 2 essays/100 min, Math 5733 56Q/90 min). This check is combined SR only — no essays. Planned 60-card Anki waitlist. Not Special Education 5355.",
    audience:
      "Teacher-prep candidates sitting Praxis Core — not Special Education 5355 and not Elementary 5001.",
    practiceTestLabel: "Praxis Core practice test",
  },
  "praxis-special-education-readiness-check": {
    title: "Free Praxis Special Education Practice Test 2026 | 60Q Mock",
    description:
      "Praxis Special Education practice test — free 25-question diagnostic, no signup; full mock: 60 timed questions, 75 minutes, 70% readiness. Typical 5355 is 120Q / 2h. Independent — not ETS. Not Praxis Core.",
    keywords: [
      "praxis special education practice test",
      "sped praxis practice test",
      "praxis 5355 mock",
      "praxis special education anki",
    ],
    headline: "Praxis Special Education Practice Test — 60 Questions (Free 25-Question Version)",
    intro:
      "A timed 60-question / 75-minute diagnostic for Praxis Special Education themes — development, IEP planning, assessment, and IDEA/504 foundations. Typical Core Knowledge and Applications (5355) is 120 selected-response questions in 2 hours. Confirm your state code. Planned 60-card Anki waitlist. Not Praxis Core.",
    audience:
      "Special-education teacher candidates — not Praxis Core academic-skills candidates.",
    practiceTestLabel: "Praxis Special Education practice test",
  },
  "precision-nutrition-l1-readiness-check": {
    title: "Free Precision Nutrition L1 Practice Test 2027 | 60Q Mock",
    description:
      "PN Level 1 practice test — free 25-question diagnostic, no signup; full mock: 60 timed questions, 75 minutes, 70% readiness. Coaching cert — not RDN, not CPT. Independent — not Precision Nutrition.",
    keywords: [
      "precision nutrition practice test",
      "pn level 1 practice test",
      "precision nutrition l1 mock",
      "precision nutrition anki",
    ],
    headline: "Precision Nutrition L1 Practice Test — 60 Questions (Free 25-Question Version)",
    intro:
      "A timed 60-question / 75-minute diagnostic for Precision Nutrition Level 1 coaching — client-centered change, nutrition science, habits, and scope. PN L1 is not an RDN license and not a CPT exam. Planned 60-card Anki waitlist.",
    audience:
      "Coaches in the PN L1 pathway — not RDNs and not personal-trainer CPT candidates.",
    practiceTestLabel: "Precision Nutrition L1 practice test",
  },
  "unarmed-security-officer-readiness-check": {
    title: "Free Unarmed Security Officer Practice Test 2026 | 60Q Mock",
    description:
      "Unarmed security practice test — free 25-question diagnostic, no signup; full mock: 60 timed questions, 75 minutes, 70% readiness. State-specific. Independent. Not an armed card.",
    keywords: [
      "unarmed security officer practice test",
      "guard card practice test",
      "unarmed security mock",
      "unarmed security anki",
    ],
    headline: "Unarmed Security Officer Practice Test — 60 Questions (Free 25-Question Version)",
    intro:
      "A timed 60-question / 75-minute unarmed knowledge diagnostic — law/liability, patrol, emergencies, and report writing. Licensing is state-specific. Planned 60-card Anki waitlist. Not an armed/firearms qualification.",
    audience:
      "Unarmed guard-card candidates — not armed/range qualification candidates.",
    practiceTestLabel: "Unarmed Security Officer practice test",
  },
  "nha-cbcs-readiness-check": {
    title: "Free NHA CBCS Practice Test 2026 | 60-Question Billing & Coding Mock",
    description:
      "NHA CBCS practice test — free 25-question diagnostic, no signup; full mock: 60 timed questions, 75 minutes, 70% readiness target, topic scoring — then waitlist for the planned 120-card Anki. Official CBCS is 100 scored + 25 pretest / 3 hours / scaled 390. Independent — not NHA material. Not AAPC CPC.",
    keywords: [
      "nha cbcs practice test",
      "free nha cbcs practice test",
      "billing and coding practice test",
      "cbcs practice exam",
      "nha billing coding mock",
      "nha cbcs anki",
    ],
    headline: "NHA CBCS Practice Test — 60 Questions (Free 25-Question Version)",
    intro:
      "A timed NHA Certified Billing and Coding Specialist diagnostic across coding guidelines, claims/reimbursement, compliance/HIPAA, and revenue-cycle themes — then join the planned 120-card Anki waitlist for spaced repair. Official CBCS test plan: 100 scored + 25 pretest (125 total) / 3 hours / scaled pass 390. This check is a shorter 60Q / 75 min diagnostic (free 25-question version) — not a full-length NHA form and not AAPC CPC.",
    audience:
      "Medical billing and coding students and revenue-cycle staff preparing for NHA CBCS who want a timed baseline before NHA’s paid practice tests or official study guide.",
    practiceTestLabel: "NHA CBCS practice test",
  },
  "cosmetology-state-readiness-check": {
    title: "Free Cosmetology Practice Test 2027 | 60Q NIC Theory Mock",
    description:
      "Cosmetology state-board practice test — free 25-question diagnostic, no signup; full mock: 60 timed questions, 75 minutes, 70% readiness target — then waitlist for the planned 60-card Anki. NIC Cosmetology Theory is typically 110 items (100 scored) / 90 minutes; state CIBs vary. Independent — not NIC/PSI material.",
    keywords: [
      "cosmetology practice test",
      "free cosmetology practice test",
      "cosmetology state board practice exam",
      "nic cosmetology practice test",
      "cosmetology theory practice test",
      "cosmetology anki",
    ],
    headline: "Cosmetology Theory Practice Test — 60 Questions (Free 25-Question Version)",
    intro:
      "A timed NIC-style cosmetology theory diagnostic across scientific concepts & safety, hair care & services, skin & nails, and salon/infection-control themes — then join the planned 60-card Anki waitlist. Official NIC Cosmetology Theory CIB: 110 items (100 scored + 10 pretest) / 90 minutes (some states 120 minutes); pass cuts are state-specific (~70–75% common). This free check is a shorter diagnostic — not a full 110Q form and not the practical exam.",
    audience:
      "Cosmetology students and recent graduates preparing for the written state-board / NIC theory exam who want a timed baseline before a full-length Q-bank.",
    practiceTestLabel: "Cosmetology practice test",
  },
  "cdl-general-knowledge-readiness-check": {
    title: "Free CDL General Knowledge Practice Test 2027 | 60Q Mock",
    description:
      "CDL General Knowledge practice test — free 25-question diagnostic, no signup; full mock: 60 timed questions, 75 minutes, drawn from a 120-item bank, 70% readiness target, topic scoring — then waitlist for the planned 120-card Anki. Most state GK forms are ~50Q / 80%; this is a longer diagnostic. Independent — not a DMV/FMCSA exam.",
    keywords: [
      "cdl general knowledge practice test",
      "free cdl practice test",
      "cdl general knowledge exam",
      "clp practice test",
      "commercial drivers license practice test",
      "cdl anki",
    ],
    headline: "CDL General Knowledge Practice Test — 60 Questions (Free 25-Question Version)",
    intro:
      "A timed FMCSA-handbook-topic diagnostic across vehicle systems & inspection, safe driving & space management, cargo securement & weight, and emergencies/hours/rules — 60 questions in 75 minutes drawn from a 120-item bank, then the planned 120-card Anki waitlist. Typical state General Knowledge sittings are ~50 questions / 80% (40 correct); this check is a longer diagnostic (free 25-question version) — not a DMV form, not the skills/road test, and not endorsement knowledge tests (Air Brakes, Combination, HazMat, etc.). The Anki deck is planned, not a live download.",
    audience:
      "CLP / Class A–B applicants who want a free timed General Knowledge baseline before studying their state CDL manual and booking the DMV knowledge test.",
    practiceTestLabel: "CDL General Knowledge practice test",
  },
  "armed-security-officer-readiness-check": {
    title: "Free Armed Security Practice Test 2027 | 60Q Written Mock",
    description:
      "Armed security officer practice test — free 25-question diagnostic, no signup; full mock: 60 timed questions, 75 minutes, 70% readiness target — then waitlist for the planned 120-card Anki. State-specific (≠ unarmed card; range qualification separate). Independent — not a state board exam.",
    keywords: [
      "armed security practice test",
      "free armed security guard exam",
      "armed guard card practice test",
      "armed security officer practice exam",
      "armed security anki",
    ],
    headline: "Armed Security Officer Practice Test — 60 Questions (Free 25-Question Version)",
    intro:
      "A timed written diagnostic across use of force & law, weapons safety, patrol & emergencies, and ethics — then join the planned 120-card Anki waitlist. Armed licensing is state-specific (e.g. FL Class G, TX Level III); most pathways need unarmed credentials first plus separate firearms training and range qualification. This free check is a shorter written diagnostic only — not a live-fire test and not OpenExamPrep’s multi-state volume banks.",
    audience:
      "Security professionals upgrading to armed posts who want a free timed written baseline before state-required firearms training and board exams.",
    practiceTestLabel: "Armed security practice test",
  },
  "veterinary-assistant-readiness-check": {
    title: "Free Veterinary Assistant Practice Test 2027 | 60Q AVA Mock",
    description:
      "Veterinary assistant / AVA-style practice test — free 25-question diagnostic, no signup; full mock: 60 timed questions, 75 minutes, 70% readiness target — then waitlist for the planned 120-card Anki. Official NAVTA AVA is typically 100Q / 150 min / 75%. Independent — not NAVTA material. Not VTNE.",
    keywords: [
      "veterinary assistant practice test",
      "navta ava practice test",
      "free ava practice exam",
      "veterinary assistant anki",
      "ava exam practice questions",
    ],
    headline: "Veterinary Assistant Practice Test — 60 Questions (Free 25-Question Version)",
    intro:
      "A timed AVA-style diagnostic across animal restraint, nursing assist, hospital procedures, and safety/zoonosis — then join the planned 120-card Anki waitlist. Official NAVTA AVA via VetMedTeam is typically 100 questions / 150 minutes / 75% (confirm current fee on VetMedTeam) for graduates of a NAVTA-approved program. This free check is a shorter diagnostic — not a full-length AVA form and not the VTNE technician exam.",
    audience:
      "Veterinary assistant students and graduates preparing for NAVTA AVA-style themes who want a free timed baseline before VetMedTeam’s official exam.",
    practiceTestLabel: "Veterinary assistant practice test",
  },
  "medical-scribe-readiness-check": {
    title: "Free Medical Scribe Practice Test 2027 | 60Q Timed Mock",
    description:
      "Medical scribe practice test — free 25-question diagnostic, no signup; full mock: 60 timed questions from a 120 unique bank, 75 minutes, 70% readiness target across documentation, terminology, EHR workflow, and HIPAA — then drill weak topics in the $9.99 / 120-card Anki. AHDPG MSCE is 100Q / 75 min / 80%. Independent — not AHDPG or ACMSS material. Not CCMA or CMA.",
    keywords: [
      "medical scribe practice test",
      "free medical scribe practice test",
      "msce practice test",
      "medical scribe exam questions",
      "medical scribe anki",
    ],
    headline: "Medical Scribe Practice Test — 60 Questions (Free 25-Question Version)",
    intro:
      "A timed scribe diagnostic across clinical documentation (SOAP, HPI, ROS, scribe scope), medical terminology and chart abbreviations, EHR workflow (problem list, allergies, medication reconciliation, templates), and HIPAA privacy — then drill weak topics in the linked $9.99 / 120-card Anki. AHDPG’s Medical Scribe Certification Exam (MSCE) is 100 questions / 1 hour 15 minutes / 80% (confirm current fee on AHDPG) and mixes fill-in-the-blank items. This free check is a shorter multiple-choice diagnostic from a 120 unique bank — not an MSCE form, and not the NHA CCMA or CMA (AAMA) clinical-assistant exam.",
    audience:
      "New and aspiring medical scribes — including employer-trained hires and candidates heading for AHDPG AMSP/CMSP or ACMSS-style certification — who want a free timed baseline on documentation and HIPAA.",
    practiceTestLabel: "Medical scribe practice test",
  },
  "leed-green-associate-readiness-check": {
    title: "Free LEED Green Associate Practice Test | 60-Question v5 Readiness Check",
    description:
      "Free LEED GA (v5) practice: 60 timed questions / 75 minutes from a 210-item bank, weighted to the GBCI blueprint, 70% diagnostic — then repair with the $9.99 / 210-card LEED GA Anki deck. Official GBCI exam is 100Q / 2h / scaled 170. Independent — not USGBC material.",
    keywords: [
      "leed green associate practice test",
      "leed ga exam questions",
      "free leed practice test",
      "leed green associate study guide",
      "leed ga anki",
      "gbci leed exam prep",
    ],
    headline: "Free LEED Green Associate Readiness Check",
    intro:
      "A timed 60-question LEED GA diagnostic (75 minutes, 70% readiness target) drawn from a 210-item bank written to the LEED v5 test specifications and weighted like the GBCI blueprint — then drill weak domains in the linked $9.99 / 210-card Anki deck. Official LEED GA is 100 questions / 2 hours / scaled 170 (125–200), based on LEED v5 since 2026. Not a free 700-question lead-gen bank.",
    audience:
      "Architects, engineers, sustainability consultants, and students entering green building who want a baseline before USGBC exam registration.",
    practiceTestLabel: "LEED Green Associate practice test",
  },
  "leed-ap-bd-c-readiness-check": {
    title: "Free LEED AP BD+C Practice Test | 60-Question v5 Readiness Check",
    description:
      "Free LEED AP Building Design + Construction (v5) practice questions: 60 timed questions, 75 minutes, from a 120-item bank weighted to the GBCI blueprint, 70% readiness target, credit-category diagnosis, and full answer review. Independent LEED AP prep — not USGBC material.",
    keywords: [
      "leed ap bd+c practice test",
      "leed ap exam questions",
      "leed ap building design and construction",
      "free leed ap practice test",
      "gbci leed ap prep",
    ],
    headline: "Free LEED AP BD+C Readiness Check",
    intro:
      "A timed 60-question / 75-minute LEED AP BD+C diagnostic written to the LEED v5 specialty specifications — process and integrative assessments, location, sites and water, energy and commissioning, embodied carbon and materials, and IEQ — drawn from a 120-item bank so retakes differ. The official exam moved to LEED v5. Requires LEED Green Associate for the official AP credential.",
    audience:
      "Design professionals, sustainability consultants, and LEED GA holders preparing for the LEED AP BD+C specialty exam.",
    practiceTestLabel: "LEED AP BD+C practice test",
  },
  "leed-ap-om-readiness-check": {
    title: "Free LEED AP O+M Practice Test | 60-Question v5 Mock",
    description:
      "Free LEED AP Operations + Maintenance (v5) practice questions online: 60 timed questions across process, sites, water, energy, and IEQ for existing buildings, 75 minutes, from a 120-item bank weighted to the GBCI blueprint, 70% readiness target, and full answer review. Independent LEED prep — not USGBC/GBCI material.",
    keywords: [
      "leed ap o+m practice test",
      "leed operations and maintenance exam",
      "leed om practice questions",
      "leed ap om readiness check",
      "existing building leed exam prep",
    ],
    headline: "Free LEED AP O+M Readiness Check",
    intro:
      "A timed 60-question / 75-minute LEED AP Operations + Maintenance diagnostic written to the LEED v5 O+M specifications — assessments and O+M plans, transportation performance, water metering, energy, GHG and refrigerant performance, waste, and IEQ operations — drawn from a 120-item bank so retakes differ. The official specialty exam moved to LEED v5.",
    audience:
      "Facility managers, sustainability leads, and LEED Green Associates preparing for the LEED AP O+M specialty exam on existing buildings.",
    practiceTestLabel: "LEED AP O+M practice test",
  },
  "well-ap-readiness-check": {
    title: "WELL AP Practice Test Free 2027 | 25Q + 50Q Mock",
    description:
      "WELL AP practice test: 25 questions free, then 50 timed questions / 100 minutes with topic scores. Official exam: 115 MCQ (100 scored) in 2h30, pass 170 scaled (IWBI/GBCI). Not IWBI material.",
    keywords: [
      "well ap practice test",
      "well ap free mock exam",
      "well accredited professional exam",
      "well v2 exam prep",
      "well ap anki",
      "iwbi well ap study guide",
      "free well ap practice questions",
      "well building standard exam",
      "gbci well ap prep",
      "well ap practice exam 2026",
    ],
    headline: "Free WELL Accredited Professional (WELL AP) Readiness Check",
    intro:
      "A WELL AP practice test starts here with **25 questions free, no signup**, then 50 timed questions across WELL v2 concept domains (Air, Water, Nourishment, Light, Movement, and the rest of the IWBI knowledge areas). GBCI delivers the official exam for IWBI: **115 multiple-choice questions (100 scored + 15 unscored), 2 hours 30 minutes, scaled pass 170 on a 125–200 scale** — verify the current handbook at support.wellcertified.com (checked 19 Nov 2026). Drill misses in the [$9.99 WELL AP Anki deck](/decks/well-ap-anki-deck), cross-train [LEED Green Associate](/mock-exams/leed-green-associate-readiness-check) if you are stacking green-building credentials, or open the [building certification mock hub](/mock-exams/v/building).",
    officialFormat:
      "Official (IWBI/GBCI): 115 MCQ / 2h30 / scaled pass 170. UniPrep: 25Q free, 50Q / 100 min / 70% diagnostic.",
    audience:
      "Architects, designers, building operators, HR/wellness professionals, and sustainability consultants preparing for the WELL Accredited Professional credential.",
    practiceTestLabel: "WELL AP practice test",
    examFaqs: [
      {
        question: "How many questions are on the WELL AP exam?",
        answer:
          "IWBI’s overview lists 115 multiple-choice questions (100 scored + 15 unscored pilot) in 2 hours 30 minutes with a scaled passing score of 170.",
      },
      {
        question: "Is there a free WELL AP practice test?",
        answer:
          "Yes — 25 questions free on this page, with a 50-question timed mock available after your first diagnostic (Mock Pass $19 for unlimited full mocks).",
      },
      {
        question: "WELL AP vs LEED — which practice test first?",
        answer:
          "LEED Green Associate is the usual first green-building credential; WELL AP stresses human health in buildings. Try [LEED Green Associate](/mock-exams/leed-green-associate-readiness-check) or WELL based on the job description you are targeting.",
      },
      {
        question: "Does this mock include IWBI reference PDFs?",
        answer:
          "No. The live exam embeds scenario PDFs. This timed text-only diagnostic is for topic scoring — pair it with the official WELL AP candidate handbook.",
      },
    ],
  },
  "cem-readiness-check": {
    title: "Free CEM Practice Test | 50-Question Certified Energy Manager Readiness Check",
    description:
      "Free Certified Energy Manager practice — free 25-question diagnostic, no signup; full mock: 50 timed questions, 50 minutes, 70% readiness target, five BoK-group scores — then repair with the $9.99 / 250-card Anki deck. Official AEE CEM is 130Q / 4h / open book / scaled 700. Not AEE’s paid 65Q self-eval. Independent — not AEE material.",
    keywords: [
      "cem practice test",
      "certified energy manager exam",
      "aee cem study guide",
      "free cem practice questions",
      "energy manager certification test",
      "cem anki",
    ],
    headline: "Free Certified Energy Manager (CEM) Readiness Check",
    intro:
      "A timed 50-question / 50-minute CEM diagnostic across five grouped AEE Body of Knowledge domains — then drill weak groups in the linked $9.99 / 250-card Anki deck. Official CEM exam (verify on AEE): 130 questions (120 scored + 10 pretest), 4 hours, open book, scaled pass 700 on a 0–1,040 scale. AEE’s optional paid self-evaluation is 65 questions / 2 hours with section pass/fail only and no answer key — this page is not that product.",
    audience:
      "Energy managers, facility engineers, sustainability professionals, and HVAC/electrical engineers preparing for AEE CEM certification.",
    practiceTestLabel: "CEM practice test",
  },
  "ashrae-certifications-readiness-check": {
    title: "Free ASHRAE Certification Practice Test | 50-Question Readiness Check",
    description:
      "ASHRAE certification practice: free 25-question diagnostic, full mock 50 timed questions across BEMP/BEAP/BCxP/CHD–HBDP–HFDP/OPMP — then repair with the $9.99 / 250-card Anki deck. Official forms mostly 115Q / 2.5h. Independent — not ASHRAE material.",
    keywords: [
      "ashrae certification practice test",
      "bemp exam prep",
      "bcxp practice questions",
      "beap study guide",
      "ashrae anki",
      "chd ashrae exam",
      "opmp certification",
      "ashrae hbdp practice test",
    ],
    headline: "Free ASHRAE Certifications Readiness Check",
    intro:
      "A timed readiness diagnostic sampled across ASHRAE's ANSI-accredited personnel certifications — energy modeling, assessment, commissioning, HVAC design, healthcare facility design, and operations management. Prefer this free timed mock + $9.99 ownable Anki over mega free Q-banks when you need topic scoring; keep ASHRAE's official paid 30-question practice exam and credential-specific pass points (e.g. BEMP 69/100, BCxP 83/120) as the source of truth.",
    audience:
      "HVAC engineers, energy modelers, commissioning providers, facility managers, and designers preparing for ASHRAE BCxP, BEMP, BEAP, CHD, HBDP, HFDP, or OPMP exams.",
    practiceTestLabel: "ASHRAE certification practice test",
  },
  "cdcp-readiness-check": {
    title: "Free CDCP Practice Test | 40-Question Certified Data Centre Professional Readiness Check",
    description:
      "CDCP practice questions online: free 25-question diagnostic, full mock 40 timed questions across data centre facilities and operations domains, 60 minutes, 68% readiness target (matches official pass mark), topic diagnosis, and full answer review. Pairs with a $9.99 / 250-card Anki deck from the same bank. Independent prep — not EXIN or EPI exam material.",
    keywords: [
      "cdcp practice test",
      "certified data centre professional exam",
      "exin cdcp study guide",
      "epi cdcp prep",
      "free cdcp practice questions",
      "data centre certification test",
      "tia-942 exam prep",
    ],
    headline: "Free Certified Data Centre Professional (CDCP) Readiness Check",
    intro:
      "A timed CDCP readiness diagnostic matching the official EXIN EPI exam length — 40 closed-book multiple-choice questions in 60 minutes with a 68% pass target (27/40), drawn from a 250-question bank shared with the live CDCP Anki deck. Compare free options in the table below.",
    audience:
      "Data centre operators, facility engineers, IT infrastructure staff, and technicians preparing for the EXIN EPI Certified Data Centre Professional credential after accredited EPI training.",
    practiceTestLabel: "CDCP practice test",
  },
  "rd-exam-readiness-check": {
    title: "Free RD Exam Practice Test 2027 | 120 Questions Online",
    description:
      "Free RD / RDN practice test — free 25-question diagnostic, no signup; full mock: 120 timed questions, 120 minutes, 70% readiness target, four CDR domain scores. Official exam is CAT 125–145 items / 3 hours / scaled 25. Then repair with the $9.99 / 240-card Anki deck. Independent — not CDR material.",
    keywords: [
      "rd exam practice test",
      "rdn practice exam",
      "free registered dietitian practice test",
      "cdr rd practice test",
      "dietitian registration exam practice",
      "rd exam anki",
    ],
    headline: "Free RD Exam Practice Test",
    intro:
      "A timed 120-question / 120-minute linear diagnostic across CDR’s 2022–2026 domains (Principles 21%, Nutrition Care 45%, Management 21%, Foodservice 13%) — then drill weak rows in the linked $9.99 / 240-card Anki deck. Official Registration Examination for Dietitians is computer-adaptive 125–145 items in 3 hours with scaled pass 25/50. This check is not CAT and is not Pearson VUE. From January 1, 2027 CDR regroups domains; this bank still uses 2022–2026 labels.",
    audience:
      "Dietetic interns and RDN candidates after ACEND-accredited education and supervised practice who want a timed domain report before Pearson VUE — not DTR/NDTR and not a nursing or CPT bank.",
    practiceTestLabel: "RD Exam practice test",
  },
  "acsm-cpt-readiness-check": {
    title: "Free ACSM CPT Practice Test 2027 | 60Q Timed Mock",
    description:
      "ACSM CPT practice test: free 25-question diagnostic, full mock 60 timed questions / 75 min from a 120-item bank, topic scores, answer review — then the $9.99 / 120-card Anki deck. Official ACSM-CPT: 135 items / 150 min / scaled 550. Not ACSM material.",
    keywords: [
      "acsm cpt practice test",
      "acsm personal trainer practice exam",
      "free acsm cpt questions",
      "acsm cpt anki",
      "acsm certification practice test",
    ],
    headline: "ACSM CPT Practice Test — 60 Questions (Free 25-Question Version)",
    intro:
      "ACSM-CPT is the health-fitness trainer exam: preparticipation screening and risk, then the exercise prescription, then how you lead the session, then behavior change and emergency scope. Each full attempt draws 15 questions from each of those four domains (60 timed questions, 75 minutes). The free start is 25 questions. Official ACSM-CPT is 135 items in 150 minutes, scaled pass 550. This is not NSCA-CPT (155 questions, including video items) and not a NASM OPT-model bank. The linked deck is $9.99 / 120 cards.",
    audience:
      "Personal trainer candidates preparing for the ACSM Certified Personal Trainer exam who want a timed baseline before paid Q-banks.",
    practiceTestLabel: "ACSM CPT practice test",
  },
  "cda-childcare-readiness-check": {
    title: "Free CDA Practice Test 2027 | Child Development Associate",
    description:
      "Free CDA practice test: 60 timed childcare scenarios from a 120-question bank with topic scores — free 25-question diagnostic, no signup. Official CDA Exam: 65 questions, 1 hr 45 min, pass/fail. Not Council material.",
    keywords: [
      "cda practice test",
      "cda exam practice test",
      "child development associate practice test",
      "free cda practice test",
      "cda exam questions",
    ],
    headline: "Free Child Development Associate (CDA) Practice Test",
    intro:
      "A 60-question / 75-minute CDA practice test (free 25-question version) drawn from a 120-question bank of classroom scenarios — safe sleep, positive guidance, family conferences, observation records — with a score for each of four CDA competency groups. The official Council for Professional Recognition CDA Exam is 65 questions (60 + 5 photo scenarios) in 1 hour 45 minutes at Pearson VUE, scored pass/fail; this mock is text-only.",
    audience:
      "Early childhood teachers, family child care providers, and home visitors preparing for the CDA Exam who want a timed check of the CDA Functional Areas before booking Pearson VUE.",
    practiceTestLabel: "CDA practice test",
  },
  "nebosh-readiness-check": {
    title: "NEBOSH IGC Practice Test Free 2027 | 50Q Diagnostic",
    description:
      "NEBOSH IGC practice test: 25 questions free, then 50 MCQs in 100 minutes with topic scores. Official GIC1 is open-book (5h in 24h / 45% pass); GIC2 is 4h practical — not MCQ. Not NEBOSH material.",
    keywords: [
      "nebosh practice test",
      "nebosh igc exam",
      "nebosh gic1 prep",
      "nebosh gic2 risk assessment",
      "free nebosh practice questions",
      "nebosh international general certificate",
      "nebosh anki",
      "health and safety exam prep",
    ],
    headline: "Free NEBOSH IGC Practice Test (Knowledge Diagnostic)",
    intro:
      "A NEBOSH IGC practice test on UniPrep2Go is a **knowledge-only MCQ diagnostic**: 25 questions free, no signup, then 50 timed questions across management systems, workplace hazards, and risk-assessment themes from the IGC syllabus. The real IGC is **not** this format — GIC1 is an open-book scenario exam (**5 hours of assessment within a 24-hour window, 45% provisional pass**) and GIC2 is a **4-hour practical risk assessment** (verify in your Learning Partner materials and nebosh.org). Use this mock to find weak domains, then drill the [$9.99 NEBOSH Anki deck](/decks/nebosh-anki-deck), compare [NEBOSH IGC vs Diploma](/blog/nebosh-igc-vs-international-diploma-employers), or pair with [CFPS](/mock-exams/cfps-readiness-check) if fire protection is your adjacent path.",
    officialFormat:
      "Official IGC: GIC1 open-book scenario (5h / 24h window / 45% provisional) + GIC2 practical (4h). UniPrep: 25Q free, 50Q / 100 min MCQ diagnostic only.",
    audience:
      "Health and safety officers, supervisors, managers, and career changers preparing for the NEBOSH International General Certificate (IGC) through an accredited Learning Partner.",
    practiceTestLabel: "NEBOSH practice test",
    examFaqs: [
      {
        question: "Is there a free NEBOSH practice test?",
        answer:
          "Yes — 25 multiple-choice questions free on this page, then optional 50-question timed sessions. This is MCQ prep, not a copy of GIC1 open-book scenarios.",
      },
      {
        question: "How is the real NEBOSH IGC assessed?",
        answer:
          "Unit GIC1 is an open-book scenario exam with 5 hours of assessment time in a 24-hour window (45% provisional pass). Unit GIC2 is a practical risk assessment over 4 hours.",
      },
      {
        question: "Can I pass NEBOSH with multiple-choice only?",
        answer:
          "No. You need GIC1 scenario writing and a GIC2 practical submission. Use this mock to prioritize reading, then practice risk-assessment narratives with your Learning Partner.",
      },
    ],
  },
  "cfps-readiness-check": {
    title: "Free CFPS Practice Test | 50-Question Certified Fire Protection Specialist Readiness Check",
    description:
      "CFPS practice questions online: free 25-question diagnostic, full mock 50 timed questions across NFPA's eight fire protection domains, 90 minutes, 70% readiness target, topic diagnosis, and full answer review. Independent prep — not NFPA exam material.",
    keywords: [
      "cfps practice test",
      "certified fire protection specialist exam",
      "nfpa cfps prep",
      "fire protection handbook exam",
      "free cfps practice questions",
      "fire suppression certification",
      "prometric cfps exam",
    ],
    headline: "Free Certified Fire Protection Specialist (CFPS) Readiness Check",
    intro:
      "A timed CFPS readiness diagnostic weighted to NFPA's exam blueprint. Official CFPS: 100 multiple-choice questions in 3 hours, open book with the NFPA Fire Protection Handbook (21st Edition).",
    audience:
      "Fire protection engineers, fire marshals, AHJ staff, consultants, and safety professionals preparing for NFPA's Certified Fire Protection Specialist credential.",
    practiceTestLabel: "CFPS practice test",
  },
  "mrics-readiness-check": {
    title: "Free MRICS Practice Questions | 50-Question APC Readiness Check",
    description:
      "MRICS/APC practice: free 25-question diagnostic, full mock 50 timed questions / 100 minutes / 70% diagnostic across mandatory competencies, ethics, and interview themes — then repair with the $9.99 / 250+ MRICS Anki .apkg. Official APC is written submission + 60-min interview (not MCQ). Prefer ownable Anki over Brainscape subscription packs. Independent — not RICS material.",
    keywords: [
      "mrics practice questions",
      "rics apc exam prep",
      "assessment of professional competence",
      "chartered surveyor interview prep",
      "free mrics apc questions",
      "mrics anki deck",
      "rics ethics rules of conduct",
      "mrics case study prep",
    ],
    headline: "Free MRICS (Chartered Member) APC Readiness Check",
    intro:
      "A timed 50-question APC knowledge diagnostic (100 minutes, 70% target) for mandatory competencies, ethics/Rules of Conduct, technical pathway themes, and interview prep — then drill weak rows in the linked $9.99 / 250 Anki deck. Official MRICS route: written submission plus a 60-minute final assessment interview (not a multiple-choice licensure exam). Cross-pathway prep — for QS-specific NRM/JCT/NEC use the separate MRICS QS mock and deck. Compare grades and live UK join fees in [AssocRICS vs MRICS](/blog/mrics-apc-vs-assocrics-pathway-cost).",
    audience:
      "Quantity surveyors, building surveyors, commercial property professionals, project managers, and valuers preparing for RICS APC and MRICS chartered membership.",
    practiceTestLabel: "MRICS APC practice questions",
  },
  "mrics-quantity-surveying-readiness-check": {
    title: "Free MRICS QS Practice Test | 50 APC Questions Online",
    description:
      "MRICS Quantity Surveying APC practice test: free 25-question diagnostic, full mock 50 timed questions on cost planning, NRM measurement, JCT/NEC contracts, procurement, and project finance — 100 minutes, 70% target, competency scoring, full answer review, linked Anki deck. Better than untimed Brainscape cards alone. Independent — not RICS material.",
    keywords: [
      "free mrics qs practice test",
      "mrics quantity surveying practice questions",
      "rics qs apc prep",
      "quantity surveyor apc interview",
      "commercial management competency",
      "design economics cost planning",
      "rics contract practice jct nec",
      "free quantity surveying apc questions",
    ],
    headline: "Free MRICS Quantity Surveying APC Practice Test",
    intro:
      "A timed QS-pathway diagnostic with competency scoring — six core Level 3 topics, ethics, and interview prep — then drill weak rows in the linked MRICS QS Anki deck. Official RICS route remains written submission plus a 60-minute assessment interview. For AssocRICS vs MRICS and UK APC joining fees, see [AssocRICS vs MRICS](/blog/mrics-apc-vs-assocrics-pathway-cost).",
    audience:
      "Assistant quantity surveyors, cost consultants, commercial managers, and QS graduates preparing for MRICS on the Quantity Surveying and Construction pathway.",
    practiceTestLabel: "MRICS Quantity Surveying practice test",
  },
  "cfa-level-2-readiness-check": {
    title: "CFA Level 2 Practice Exam | 25Q Free, 60Q Timed",
    description:
      "Free CFA Level 2 practice exam: 25 questions, no signup, then 60 vignettes in 120 minutes with topic scores. Official exam: 88 items, 22 vignettes, 4h24.",
    keywords: [
      "cfa level 2 practice exam",
      "cfa level 2 practice test",
      "cfa level 2 mock exam",
      "free cfa level 2 questions",
      "cfa level 2 item set prep",
    ],
    headline: "CFA Level 2 Practice Exam",
    intro:
      "This CFA Level 2 practice exam starts free: 25 vignette questions, no signup, then 60 vignette questions in 120 minutes across all 10 topics, with topic scores. The official Level II exam is **88 item-set questions in 22 vignettes** across two 132-minute sessions (**4 hours 24 minutes total**; CFA Institute sets MPS after each sitting — cfainstitute.org). Repair weak item sets with the [Level 2 Anki deck](/decks/cfa-level-2-anki-deck) and the printable [CFA Level 2 formula sheet](/decks/cfa-level-2-formula-reference-2026). After Level 1, confirm you passed before booking — [Level 1 practice test](/mock-exams/cfa-level-1-readiness-check). Not CFA Institute material.",
    examFaqs: [
      {
        question: "Is there a free CFA Level 2 practice exam?",
        answer:
          "Yes — 25 vignette questions free, no signup, on this page. The timed mock is 60 vignettes in 120 minutes.",
      },
      {
        question: "How many questions are on CFA Level 2?",
        answer:
          "CFA Institute administers 88 item-set questions grouped into 22 vignettes. This diagnostic is shorter by design.",
      },
      {
        question: "CFA Level 2 practice test vs item-set books?",
        answer:
          "Use this mock for pacing and topic scores; use the formula PDF and Anki deck for equation recall between attempts.",
      },
    ],
    audience: "CFA Level 2 candidates who passed Level 1 and want a free vignette practice exam before a full item-set mock.",
    practiceTestLabel: "CFA Level 2 practice exam",
  },
  "us-citizenship-readiness-check": {
    title: "Free U.S. Citizenship Practice Test 2026 | 30 Civics Questions",
    description:
      "Free USCIS-style civics practice: 30 timed MCQs. Official 2025 naturalization civics is oral (up to 20 from 128, pass at 12) — this page is a timed MCQ diagnostic, not the interview format. Citizenship Anki Bundle. Independent prep.",
    keywords: [
      "us citizenship practice test 2026",
      "uscis civics test free",
      "naturalization test practice",
      "n-400 civics questions",
      "citizenship test questions 2026",
    ],
    headline: "Free U.S. Citizenship Practice Test (2026 Civics)",
    intro:
      "Timed MCQ civics diagnostic for N-400 prep. Format note: the USCIS 2025 test asks up to 20 oral questions from the 128-question list (pass at 12; 2008 test for N-400 filed before Oct 20, 2025: 6 of 10); this check is 30 multiple-choice questions / 30 minutes / 80% for drilling — then practice aloud.",
    audience:
      "Green card holders preparing U.S. naturalization civics (oral interview format differs from this MCQ drill).",
    practiceTestLabel: "U.S. citizenship practice test",
  },
  "leben-in-deutschland-readiness-check": {
    title: "Free Leben in Deutschland Practice Test | 60 Questions",
    description:
      "Einbürgerungstest / Leben in Deutschland practice: free 25-question diagnostic, full mock 60 timed questions (60 min, 55%). Official BAMF exam is 33Q/60min/17 correct — this page is a longer diagnostic. Citizenship Anki Bundle. Independent — not BAMF material.",
    keywords: ["Leben in Deutschland test", "Einbürgerungstest üben", "German citizenship practice test"],
    headline: "Free Leben in Deutschland Readiness Check",
    intro:
      "Timed German civics diagnostic for Einbürgerungstest / Leben in Deutschland. Format note: official BAMF test is 33 questions / 60 minutes / 17 correct; this check is 60 / 60 / 55% to surface weak topics. Language B1 is separate.",
    audience:
      "Residents preparing BAMF Einbürgerungstest / Leben in Deutschland — not a substitute for the official 33-question sitting.",
    practiceTestLabel: "Leben in Deutschland practice test",
  },
  "naturalisation-francaise-readiness-check": {
    title: "Free Naturalisation française Practice Test | 60 Questions",
    description:
      "Free French Examen civique practice (2026): 60 timed questions. Official civic exam is 40Q/45min/80%; B2 language is separate. Citizenship Anki Bundle. Independent — not préfecture material.",
    keywords: [
      "naturalisation française test",
      "examen civique naturalisation",
      "examen civique 2026",
      "French citizenship practice",
    ],
    headline: "Free Naturalisation française Readiness Check",
    intro:
      "Timed civics diagnostic for the French Examen civique (live from Jan 2026). Official format is 40 questions / 45 minutes / 32/40; this check is 60 / 60 / 70%. B2 French is a separate exam — this is not only an interview quiz.",
    audience:
      "Applicants preparing the 2026 French naturalisation civic exam (plus B2 language).",
    practiceTestLabel: "Naturalisation française practice test",
  },
  "life-in-the-uk-readiness-check": {
    title: "Free Life in the UK Practice Test | 60 Questions",
    description:
      "Life in the UK practice: free 25-question diagnostic, full mock 60 timed questions (45 min, 75%). Official Home Office test is 24Q/45min/75% (£50) — this page is longer diagnostic practice. Pair with the Citizenship Anki Bundle for spaced civics recall. Independent prep.",
    keywords: ["Life in the UK practice test", "LITUK free test", "British citizenship test practice", "life in the uk anki"],
    headline: "Free Life in the UK Readiness Check",
    intro:
      "Timed Life in the UK diagnostic — then repair weak handbook topics with the Citizenship Anki Bundle. Format note: official test is 24 questions / 45 minutes / 18/24; this check is 60 / 45 / 75% to find weak handbook topics.",
    audience:
      "Applicants preparing settlement or British citizenship via the Life in the UK test.",
    practiceTestLabel: "Life in the UK practice test",
  },
  "canadian-citizenship-readiness-check": {
    title: "Free Canadian Citizenship Practice Test | 60 Questions",
    description:
      "Canadian citizenship practice: free 25-question diagnostic, full mock 60 timed questions (45 min, 75%). Official IRCC test is 20 questions, 45 minutes, 15 of 20, with up to 3 attempts in the 30-day window. This diagnostic uses one 75% mark. Citizenship Anki deck $9.99.",
    keywords: ["Canadian citizenship practice test", "Discover Canada quiz", "IRCC citizenship test"],
    headline: "Free Canadian Citizenship Readiness Check",
    intro:
      "Timed Discover Canada diagnostic. Official test: 20 questions, 45 minutes, 15 of 20, and up to 3 attempts in the 30-day window on the invitation. This check is 60 questions in 45 minutes with one 75% mark.",
    audience:
      "Permanent residents preparing for the Canadian citizenship test.",
    practiceTestLabel: "Canadian citizenship practice test",
  },
  "australian-citizenship-readiness-check": {
    title: "Free Australian Citizenship Practice Test | 60 Questions",
    description:
      "Australian citizenship practice: free 25-question diagnostic, full mock 60 timed questions (45 min, 75%). Official test is 20 questions, 45 minutes, 15 of 20, and all 5 values questions correct. This diagnostic uses one 75% mark. Citizenship Anki deck $9.99.",
    keywords: ["Australian citizenship practice test", "Aussie citizenship quiz", "citizenship test Australia"],
    headline: "Free Australian Citizenship Readiness Check",
    intro:
      "Timed Our Common Bond diagnostic. Official test: 20 questions, 45 minutes, 15 of 20, and all 5 values questions correct. This check is 60 questions in 45 minutes with one 75% mark.",
    audience:
      "Permanent residents preparing for the Australian citizenship test.",
    practiceTestLabel: "Australian citizenship practice test",
  },
  "ccse-espana-readiness-check": {
    title: "Free CCSE Practice Test (España) | 60 Questions",
    description:
      "CCSE España practice: free 25-question diagnostic, full mock 60 timed questions (45 min, 60%). Official Cervantes CCSE is 25 items / 45 min / 15/25 — this page is longer. Then repair with the 343-card CCSE Anki deck (or the DELE A2 + CCSE bundle).",
    keywords: [
      "CCSE practice test",
      "prueba CCSE gratis",
      "CCSE España test",
      "nacionalidad española práctica",
      "CCSE anki",
      "Instituto Cervantes CCSE",
    ],
    headline: "Free CCSE (España) Readiness Check",
    intro:
      "Timed CCSE diagnostic for Spanish nationality civics — then drill weak themes in the linked 343-card CCSE España Anki deck. Official Cervantes exam: 25 questions in 5 tasks, 45 minutes, 15 of 25, wrong answers not subtracted. This check is 60 questions in 45 minutes at the same 60% mark. DELE A2 is a different exam.",
    audience:
      "Applicants preparing CCSE for nacionalidad española (DELE A2 separate).",
    practiceTestLabel: "CCSE practice test",
  },
  "swiss-citizenship-readiness-check": {
    title: "Einbürgerung Schweiz Practice Test: 60Q, 25Q Free",
    description:
      "German Swiss Staatskunde diagnostic: free 25-question start, full mock 60 timed questions drawn from a 120-item bank. No single federal MCQ — canton/commune tests vary. Live $9.99 Einbürgerung Schweiz Anki (207). Independent — not SEM material.",
    keywords: [
      "Einbürgerung Schweiz üben",
      "Staatskunde Schweiz Test",
      "Swiss citizenship practice German",
      "Einbürgerungstest Schweiz",
    ],
    headline: "Einbürgerung Schweiz Readiness Check (60 Questions; Free 25-Question Version)",
    intro:
      "Timed German federal Staatskunde diagnostic for ordinary naturalisation. Switzerland has no nationwide knowledge MCQ; your canton/commune sets the real paper — this page covers federal themes only. Drill misses with the $9.99 German Anki deck (207 cards).",
    audience:
      "German-speaking applicants preparing Swiss ordinary naturalisation federal civics.",
    practiceTestLabel: "Einbürgerung Schweiz practice test",
  },
  "naturalisation-suisse-readiness-check": {
    title: "Naturalisation Suisse Practice Test: 60Q, 25Q Free",
    description:
      "French Swiss naturalisation diagnostic: free 25-question start, full mock 60 timed questions drawn from a 120-item bank. No single federal MCQ — canton/commune vary. Live $9.99 Naturalisation suisse Anki (207). Independent prep.",
    keywords: [
      "naturalisation suisse test",
      "examen naturalisation suisse",
      "connaissances fédérales Suisse",
      "citoyenneté suisse pratique",
    ],
    headline: "Naturalisation Suisse Readiness Check (60 Questions; Free 25-Question Version)",
    intro:
      "Timed French federal civics diagnostic. No nationwide French MCQ — confirm your canton’s format; this page covers federal themes only. Drill misses with the $9.99 French Anki deck (207 cards).",
    audience:
      "French-speaking applicants preparing Swiss ordinary naturalisation federal civics.",
    practiceTestLabel: "Naturalisation Suisse practice test",
  },
  "naturalizzazione-svizzera-readiness-check": {
    title: "Naturalizzazione Svizzera Practice Test: 60Q, 25Q Free",
    description:
      "Italian Swiss naturalisation diagnostic: free 25-question start, full mock 60 timed questions drawn from a 120-item bank. No single federal MCQ — canton/commune vary. Live $9.99 Naturalizzazione svizzera Anki (207). Independent prep.",
    keywords: [
      "naturalizzazione svizzera test",
      "esame cittadinanza svizzera",
      "conoscenze federali Svizzera",
      "cittadinanza svizzera pratica",
    ],
    headline: "Naturalizzazione Svizzera Readiness Check (60 Questions; Free 25-Question Version)",
    intro:
      "Timed Italian federal civics diagnostic. No nationwide Italian MCQ — confirm your canton’s format; this page covers federal themes only. Drill misses with the $9.99 Italian Anki deck (207 cards).",
    audience:
      "Italian-speaking applicants preparing Swiss ordinary naturalisation federal civics.",
    practiceTestLabel: "Naturalizzazione Svizzera practice test",
  },
  "czech-citizenship-readiness-check": {
    title: "Free Czech Reálie Practice Test | 60-Question Diagnostic",
    description:
      "Czech citizenship / zkouška z reálií practice: free 25-question diagnostic, full mock 60 timed questions (45 min, 70% diagnostic), then drill weak topics with the live Czech Citizenship Anki deck. Official exam is 30Q/30min/60% from the NPI ~300-item pool — drill that model test for format. Independent — not MV ČR material.",
    keywords: [
      "Czech citizenship practice test",
      "občanství ČR test",
      "zkouška z českých reálií",
      "zkouska z realii practice",
      "czech reálie anki",
      "Czech naturalisation quiz",
      "npi reálie practice test",
    ],
    headline: "Free Czech Citizenship / Reálie Readiness Check",
    intro:
      "Timed Czech-language diagnostic for citizenship reálie themes — then repair weak topics with the linked live Anki deck. Format note: official zkouška z reálií is 30 questions / 30 minutes / 60% from the published NPI databank; this check is 60 / 45 / 70% to surface weak topics. Prefer this free timed diagnostic + official model test over third-party “100+ AI” banks that skip the NPI format. Permanent residence usually needs language (A2), not reálie.",
    audience:
      "Citizenship applicants preparing zkouška z českých reálií (plus B1 language) — not a substitute for the official NPI 30-question sitting.",
    practiceTestLabel: "Czech reálie / citizenship practice test",
  },
  "polish-citizenship-readiness-check": {
    title: "Free Polish Citizenship Practice Test | Proposed Civics",
    description:
      "Poland has no official citizenship civics exam yet. 60-question Polish readiness check (free 25-question version) on proposed wiedza o Polsce / test obywatelski themes — state, history, EU, society. PaF B1 is today’s language hurdle. Independent prep — not government material.",
    keywords: [
      "Polish citizenship practice test",
      "obywatelstwo polskie test",
      "wiedza o Polsce",
      "test obywatelski",
      "Polish naturalisation quiz",
    ],
    headline: "Free Polish Citizenship Readiness Check",
    intro:
      "Poland does not require a citizenship knowledge MCQ today. This timed Polish-language check drills proposed civics themes while PaF B1 remains the live exam bottleneck.",
    audience:
      "Applicants under current PaF B1 rules who want civic literacy — or future-proofing if a test obywatelski is enacted.",
    practiceTestLabel: "Polish citizenship (proposed civics) practice test",
  },
  "denmark-indfoedsretsproeven-readiness-check": {
    title: "Free Denmark Indfødsretsprøven Practice Test | 60 Questions",
    description:
      "Indfødsretsprøven practice: free 25-question diagnostic, full mock 60 timed questions. Official exam is 45Q/45min with 36/45 plus values dual-gate — this diagnostic is longer theme practice. Live Anki deck. Independent prep.",
    keywords: ["Indfødsretsprøven", "Danish citizenship test", "Denmark citizenship practice"],
    headline: "Free Denmark Indfødsretsprøven Readiness Check",
    intro:
      "Timed Danish civics diagnostic for Indfødsretsprøven. Format note: official test is 45 questions / 45 minutes / 80% plus ≥4/5 values; this check is 60 / 45 / 70% without that dual-gate. Language (Prøve i Dansk) is separate.",
    audience:
      "Applicants preparing the Danish Indfødsretsprøven civics exam.",
    practiceTestLabel: "Indfødsretsprøven practice test",
  },
  "portugal-nacionalidade-readiness-check": {
    title: "Free Portugal Nacionalidade Practice Test | 60 Questions",
    description:
      "Portugal nationality civic practice: free 25-question diagnostic, full mock 60 timed questions on the five legal themes. Official Q/time/pass still pending regulation — independent diagnostic, not IRN. Live Anki deck.",
    keywords: ["nacionalidade portuguesa", "conhecimento cívico", "Portugal citizenship test"],
    headline: "Free Portugal Nacionalidade Readiness Check",
    intro:
      "Timed Portuguese civic diagnostic for the 2026 nationality knowledge requirement. Official exam format was still pending implementing rules — treat this as theme practice, not an official IRN paper. A2 language is separate (CPLP language exemption does not waive civics).",
    audience:
      "Applicants preparing Portuguese nationality civic knowledge under the 2026 law.",
    practiceTestLabel: "Portugal nacionalidade practice test",
  },
  "norway-statsborgerproven-readiness-check": {
    title: "Free Norway Statsborgerprøven Practice Test | 60 Questions",
    description:
      "Statsborgerprøven practice: free 25-question diagnostic, full mock 60 timed questions. Official HK-dir exam is 36Q (32 scored) / 60 min / 75% — this page is a different-length diagnostic. Live Anki deck. Independent prep.",
    keywords: ["Statsborgerprøven", "Norwegian citizenship test", "statsborgerskap"],
    headline: "Free Norway Statsborgerprøven Readiness Check",
    intro:
      "Timed Norwegian samfunnskunnskap diagnostic. Format note: official Statsborgerprøven is 36 questions / 60 minutes / 24/32; this check is 60 / 45 / 70%. B1 Norwegian is a separate requirement.",
    audience:
      "Applicants preparing the Norwegian Statsborgerprøven.",
    practiceTestLabel: "Statsborgerprøven practice test",
  },
  "sweden-medborgarskapsprov-readiness-check": {
    title: "Free Sweden Medborgarskapsprov Practice Test | 60 Questions",
    description:
      "Medborgarskapsprov society-knowledge practice: free 25-question diagnostic, full mock 60 timed questions. Official format may still be settling (new 2026 test) — independent Samhällskunskap diagnostic + live Anki deck.",
    keywords: ["Medborgarskapsprov", "Swedish citizenship test", "medborgarskap"],
    headline: "Free Sweden Medborgarskapsprov Readiness Check",
    intro:
      "Timed Swedish society-knowledge diagnostic for the new Medborgarskapsprov path. Confirm current UHR/Migrationsverket format before exam day — this page is independent theme practice, not an official sample.",
    audience:
      "Applicants preparing Sweden’s new citizenship society-knowledge requirement.",
    practiceTestLabel: "Medborgarskapsprov practice test",
  },
  "belgium-flanders-mo-readiness-check": {
    title: "Flanders MO Practice Test: 60Q, 25Q Free",
    description:
      "Flanders MO Dutch diagnostic: free 25-question start, full mock 60 timed questions from a 220-question bank, topic scores. Official AgII standaardtest is 41 MCQ / 120 min after the MO course — this page is independent. Live 220-card Anki ($19) on Gumroad.",
    keywords: ["maatschappelijke oriëntatie", "Flanders MO", "inburgering Vlaanderen"],
    headline: "Belgium Flanders MO Readiness Check (60 Questions; Free 25-Question Version)",
    intro:
      "Timed Dutch-language Flanders maatschappelijke oriëntatie diagnostic drawn from 220 unique items across institutions, history/EU, rights, and daily life. Honesty: no nationwide Belgian citizenship MCQ like BAMF/LITUK — official AgII standaardtest is 41 digital MCQ / 120 minutes after the ~60-hour course (test 60% + process 40%). Use this page for MO themes; confirm AgII/commune rules for your file.",
    audience:
      "Applicants preparing Flanders social orientation / integration civics themes.",
    practiceTestLabel: "Flanders MO practice test",
    localeMeta: {
      "nl-BE": {
        title: "MO-oefentest Vlaanderen: 60 vragen, 25 gratis",
        description:
          "MO-oefentest Vlaanderen: gratis 25 vragen, volledige mock 60 getimede vragen uit 220. Officiële AgII-standaardtest = 41 MCQ / 120 min na de cursus — deze pagina is onafhankelijk. Live 220-card Anki ($19) op Gumroad.",
        intro:
          "Nederstalige oefentest voor maatschappelijke oriëntatie in Vlaanderen (220 unieke vragen). Officieel traject = ~60u MO-cursus + standaardtest van 41 vragen / 120 minuten (60% test / 40% proces) via Agentschap Integratie & Inburgering — deze pagina is extra oefening, geen AgII-materiaal.",
      },
    },
  },
  "belgium-wallonie-citoyennete-readiness-check": {
    title: "Free Belgium Wallonie Citoyenneté Practice Test | 60 Questions",
    description:
      "Wallonie citoyenneté theme practice: free 25-question diagnostic, full mock 60 timed questions from a 120-question bank. No official Walloon civics QCM. The free parcours includes 60 hours of citizenship training and French classes unless a placement test shows A2. Live 165-card Anki deck. Independent prep.",
    keywords: ["citoyenneté Wallonie", "parcours d'intégration", "Belgium Wallonia citizenship"],
    headline: "Free Belgium Wallonie Citoyenneté Readiness Check",
    intro:
      "Timed French-language Wallonia citoyenneté diagnostic: 60 questions drawn from a 120-question bank. Honesty note: Wallonia has no civics MCQ. The free parcours (pages read 22 Nov 2026) includes at least 60 hours of citizenship training and at least 400 hours of French unless a placement test shows A2. wallonie.be, updated 23 July 2026, says 18 months from the residence-permit order, extendable. The CRI site also shows 36 months on its diagram, so confirm the deadline with the CRI.",
    audience:
      "Applicants preparing Wallonia integration / citoyenneté themes (not a substitute for DELF/TCF A2).",
    practiceTestLabel: "Wallonie citoyenneté practice test",
  },
  "luxembourg-vivre-ensemble-readiness-check": {
    title: "Luxembourg Vivre ensemble Practice Test: 40Q, 25Q Free",
    description:
      "Luxembourg Vivre ensemble exam simulation: free 25-question diagnostic, full mock 40 questions in 60 minutes, official 10 rights / 20 institutions / 10 history & EU split, score per module and an explanation for every answer. Then fix weak modules with the $9.99 FR + EN Anki pair (239 cards each). Independent prep.",
    keywords: ["Vivre ensemble Luxembourg", "Luxembourg citizenship test", "nationalité luxembourgeoise"],
    headline: "Luxembourg Vivre ensemble Exam Simulation (40 Questions, 60 Minutes; Free 25-Question Version)",
    intro:
      "Same format as the official exam: 40 French multiple-choice questions in 60 minutes — 10 on fundamental rights, 20 on state and communal institutions, 10 on history and European integration — drawn from a 168-question bank checked against the 2023 Constitution. You get a score per module and an explanation for every wrong option. Target 28/40 (the figure prep sites cite; the regulation publishes none). Sproochentest is separate.",
    audience:
      "Applicants preparing Luxembourg Vivre ensemble / nationality civics.",
    practiceTestLabel: "Vivre ensemble practice test",
  },
  "finland-kansalaisuuskoe-readiness-check": {
    title: "Free Finland Kansalaisuuskoe Practice Test | 60 Questions (Finnish)",
    description:
      "Finnish kansalaisuuskoe practice: free 25-question diagnostic, full mock 60 timed questions from a 120-question bank, scored by theme. Pairs with a 120-card Anki deck. For applications from 1 Mar 2027 (ages 18–64); official bank not published yet.",
    keywords: ["kansalaisuuskoe", "Finnish citizenship test", "kansalaisuustesti", "Suomen kansalaisuuskoe"],
    headline: "Free Finland Kansalaisuuskoe Readiness Check",
    intro:
      "Timed Finnish-language diagnostic for Finland’s new kansalaisuuskoe (applications from 1 March 2027, applicants aged 18–64). Each attempt draws 60 of 120 unique questions across state and democracy, history and the EU, rights, and everyday services, then shows your weak themes — longer than most free Finnish drills (often 15–20 questions) so retakes score full themes. Pairs with a 120-card Anki deck built from the same bank on the linked deck page. Compare free options in the table below. Confirm the final Migri format when the University of Helsinki learning material publishes — independent practice, not official Maahanmuuttovirasto material.",
    audience:
      "Applicants preparing Finland’s 2027 citizenship knowledge test in Finnish or comparing Nordic civics pathways.",
    practiceTestLabel: "Kansalaisuuskoe harjoitustesti",
    localeMeta: {
      "fi-FI": {
        title: "Ilmainen kansalaisuuskoe-harjoitustesti | 60 kysymystä suomeksi",
        description:
          "Ilmainen ajoitettu kansalaisuuskoe-harjoitustesti: 60 monivalintaa 120 kysymyksen pankista, tulos teemoittain (2027-polku). Virallinen pankki ei ole vielä julkaistu — itsenäinen harjoitus, ei Maahanmuuttoviraston materiaalia.",
        intro:
          "Suomenkielinen harjoitustesti tulevaan kansalaisuuskokeeseen (hakemukset 1.3.2027 alkaen, 18–64-vuotiaat hakijat). Jokainen kierros arpoo 60 kysymystä 120:n pankista: valtio ja demokratia, historia ja EU, oikeudet sekä palvelut ja arki. Tarkista lopullinen muoto migri.fi-sivuilta, kun Helsingin yliopiston oppimateriaali julkaistaan.",
      },
    },
  },
};

export function getMockSeoProfile(config: MockExamConfig): MockSeoProfile {
  const defaults = defaultProfile(config);
  const override = mockSeoProfiles[config.slug];
  const niche = getNicheExamExplainer(config.slug);
  const merged = { ...defaults, ...override };
  const priceSlug = config.linkedDeckSlug;
  const fill = (text: string) => withCatalogProductPrices(text, priceSlug);
  const examFaqs = (override?.examFaqs ?? niche?.examFaqs ?? defaults.examFaqs)?.map((faq) => ({
    question: fill(faq.question),
    answer: fill(faq.answer),
  }));

  return {
    ...merged,
    title: fill(merged.title),
    description: fill(merged.description),
    headline: fill(merged.headline),
    intro: fill(merged.intro),
    audience: fill(merged.audience),
    whatIsExam: fill(
      override?.whatIsExam ?? niche?.whatIsExam ?? defaults.whatIsExam,
    ),
    administeredBy: override?.administeredBy ?? niche?.administeredBy ?? defaults.administeredBy,
    officialFormat: override?.officialFormat ?? niche?.officialFormat ?? defaults.officialFormat,
    examFaqs,
    keywords: [...new Set([...(niche?.keywords ?? []), ...merged.keywords])].slice(0, 12),
  };
}

/** FINRA mock titles stay frozen while `sie-full-mock` is unknown to Google (SEO dual-track rule). */
const MOCK_TITLE_FROZEN = new Set([
  "sie-full-mock",
  "sie-quick-diagnostic",
  "series-7-readiness-check",
  "series-63-readiness-check",
]);

/** 2026-11-05 freeze: do not rewrite title/H1/meta templates for these slugs. */
const MOCK_META_DESCRIPTION_FROZEN = new Set([
  "life-in-the-uk-readiness-check",
  "unarmed-security-officer-readiness-check",
]);

function mockSnippetExamLabel(config: MockExamConfig): string {
  const profile = getMockSeoProfile(config);
  return profile.practiceTestLabel
    .replace(/\s+practice\s+(?:test|tests|questions|exam)$/i, "")
    .replace(/\s+(?:mock test|mock exam|mock)$/i, "")
    .trim();
}

function mockSnippetLead(config: MockExamConfig): string {
  return `Free ${mockSnippetExamLabel(config)} practice test 2026: 25 questions free, no signup`;
}

/**
 * Removes the part of a hand-written mock description that repeats the snippet lead
 * ("{Exam} practice test — free 25-question diagnostic, no signup; full mock: …").
 * Returns the remaining specifics, starting with a capital letter.
 */
function stripRepeatedLead(description: string): string {
  let body = description.trim();
  const intro = body.match(/^([^:;—.]{3,80}?)\s*(?::|—|–)\s+/);
  if (intro && /(practice|mock|diagnostic|questions|test|simulation|exam|prep)/i.test(intro[1])) {
    body = body.slice(intro[0].length);
  }
  body = body
    .replace(/^(?:a\s+)?free\s+25[- ]question(?:s)?(?:\s+(?:diagnostic|start))?(?:,?\s*no signup)?\s*[;,.]?\s*/i, "")
    .replace(/^free\s+25\s+questions?(?:,?\s*no signup)?\s*[;,.]?\s*/i, "")
    .replace(/^(?:first mock free|no signup)\s*[;,.]?\s*/i, "")
    .replace(/^then\s+/i, "")
    .replace(/^full mock\s*:?\s*/i, "Full mock: ");
  return body ? body.charAt(0).toUpperCase() + body.slice(1) : body;
}

function ensureMockMetaLead(config: MockExamConfig, description: string): string {
  const lead = mockSnippetLead(config);
  const head = description.slice(0, 120).toLowerCase();
  if (head.includes("practice test") && head.includes("25") && head.includes("no signup")) {
    return description;
  }
  if (description.toLowerCase().startsWith(lead.slice(0, 30).toLowerCase())) {
    return description;
  }
  // Hand-written lead for this exam already in place (e.g. "Free CFA Level 2 practice exam: …").
  if (description.toLowerCase().startsWith(`free ${mockSnippetExamLabel(config)}`.toLowerCase())) {
    return description;
  }
  const body = stripRepeatedLead(description);
  if (!body) return `${lead}.`;
  const combined = `${lead}. ${body}`;
  if (combined.length <= SEO_META_DESCRIPTION_MAX) return combined;
  // Keep the specifics after the lead: a sentence-only trim would drop everything but the lead.
  const sentenceFit = fitMetaDescription(combined);
  if (sentenceFit.length >= lead.length + 40 && /[.!?]$/.test(sentenceFit)) return sentenceFit;
  return `${lead}. ${fitMockMetaBody(body, SEO_META_DESCRIPTION_MAX - lead.length - 2)}`;
}

/** Whole clauses only, no unbalanced "(" — ends with a full stop. */
function fitMockMetaBody(body: string, max: number): string {
  const clauses = body.split(/(?<=[.;,])\s+|\s+(?=[—–]\s)/);
  let out = "";
  for (const clause of clauses) {
    const next = out ? `${out} ${clause}` : clause;
    if (next.length > max - 1) break;
    out = next;
  }
  if (!out) {
    const window = body.slice(0, max - 1);
    let cut = -1;
    for (const match of window.matchAll(/\s(?:\/|across|with|on|for|from|in)\s/g)) {
      if ((match.index ?? 0) >= Math.floor(max * 0.4)) cut = match.index ?? -1;
    }
    out = cut > 0 ? window.slice(0, cut) : fitSeoTitle(body, max - 1);
  }
  const open = out.lastIndexOf("(");
  if (open !== -1 && out.indexOf(")", open) === -1) out = out.slice(0, open);
  out = out.replace(/(?:\s*[|,:;(—–&+/-]+|\s+(?:and|or|to|for|the|a|an|of|with|in|on|at|by|from|across|then|is|are))+$/i, "").trim();
  out = out.replace(/[.;,]+$/, "");
  return `${out}.`;
}

/** Drops a half-cut trailing " | " segment instead of leaving "| 60" or "(80" in the SERP title. */
function fitMockTitle(title: string) {
  const trimmed = title.trim();
  if (trimmed.length <= SEO_TITLE_MAX) return trimmed;
  const parts = trimmed.split(" | ");
  while (parts.length > 1) {
    parts.pop();
    const candidate = parts.join(" | ");
    if (candidate.length <= SEO_TITLE_MAX) return candidate;
  }
  return fitSeoTitle(trimmed, SEO_TITLE_MAX).replace(/[\s|,:;(—–-]+$/, "");
}

/** "{head} | 25Q Free, 60Q Timed" — the free diagnostic is the SERP promise, not the full-mock length. */
function mockOfferTitle(head: string, config: MockExamConfig) {
  const tails = hasShortFreeDiagnostic(config)
    ? [
        `${FREE_DIAGNOSTIC_QUESTIONS}Q Free, ${config.questionCount}Q Timed`,
        `${FREE_DIAGNOSTIC_QUESTIONS}Q Free`,
      ]
    : [`${config.questionCount}Q Free, Timed`];
  const withoutYear = head.replace(/\s+20(?:26|27)\b/, "");
  const heads = [...new Set([head, withoutYear, withoutYear.replace(/^Free\s+/i, "")])];
  for (const candidateHead of heads) {
    for (const tail of tails) {
      const candidate = `${candidateHead} | ${tail}`;
      if (candidate.length <= SEO_TITLE_MAX) return candidate;
    }
  }
  return fitMockTitle(head);
}

export function buildMockSeoTitle(config: MockExamConfig) {
  const title = getMockSeoProfile(config).title;
  if (
    config.status === "coming_soon" ||
    MOCK_TITLE_FROZEN.has(config.slug) ||
    /\b\d+Q Free\b/i.test(title)
  ) {
    return fitMockTitle(title);
  }
  return mockOfferTitle(title.split(" | ")[0], config);
}

export function buildMockSeoDescription(config: MockExamConfig) {
  const editorialMeta = getMockEditorialMetaDescriptionOverride(config.slug);
  if (editorialMeta) {
    return fitMetaDescription(editorialMeta);
  }
  const raw = getMockSeoProfile(config).description;
  const body = MOCK_META_DESCRIPTION_FROZEN.has(config.slug)
    ? raw
    : ensureMockMetaLead(config, raw);
  return body;
}

export function buildMockSeoKeywords(config: MockExamConfig) {
  return getMockSeoProfile(config).keywords;
}

export function getMockLocaleMeta(config: MockExamConfig, locale: string) {
  const override = mockSeoProfiles[config.slug]?.localeMeta?.[locale];
  return override ?? null;
}

export function buildMockSearchFaqs(config: MockExamConfig) {
  const profile = getMockSeoProfile(config);
  const examFaqs = profile.examFaqs ?? [];
  const waitlist = config.status === "coming_soon";

  return [
    ...withMockAccessDisclosure(examFaqs),
    {
      question: `Is there a free ${profile.practiceTestLabel}?`,
      answer: waitlist
        ? `A free ${profile.practiceTestLabel} is coming soon on ${siteConfig.name}: planned ${config.questionCount} timed questions, ${config.durationMinutes} minutes, ${config.passRule.passPercent}% pass target, and topic scoring. Use Notify me when this launches on this page.`
        : hasShortFreeDiagnostic(config)
          ? `Yes — your first ${siteConfig.name} attempt is free, and it can be this one: a ${FREE_DIAGNOSTIC_QUESTIONS}-question / ${freeDiagnosticMinutes(config)}-minute timed diagnostic drawn by the same topic weights, a ${config.passRule.passPercent}% readiness target, topic scoring, and a full answer review report. No signup, Exam or Learn mode. The full ${config.questionCount}-question / ${config.durationMinutes}-minute mock runs on the $${MOCK_PASS_PRICE_USD} ${MOCK_PASS_NAME} (unlimited attempts on any mock).`
          : `Yes — your first ${siteConfig.name} mock is free, and it can be this one: ${config.questionCount} timed questions, ${config.durationMinutes} minutes, a ${config.passRule.passPercent}% pass target, topic scoring, and a full answer review report. The free attempt covers any one mock in Exam or Learn mode, with no signup; after that, the $${MOCK_PASS_PRICE_USD} ${MOCK_PASS_NAME} unlocks unlimited attempts on any mock.`,
    },
    ...(waitlist
      ? []
      : [
          {
            question: `How many free attempts do I get on this ${profile.practiceTestLabel}?`,
            answer: `One. ${MOCK_ACCESS_RULE} Every attempt ends with the full topic report and answer review — the report itself is never paywalled.`,
          },
        ]),
    {
      question: `How many questions are on this free ${profile.practiceTestLabel}?`,
      answer: waitlist
        ? `The planned UniPrep2Go readiness check will have ${config.questionCount} multiple-choice questions timed against a ${config.durationMinutes}-minute target. ${config.officialSourceNote}`
        : `This UniPrep2Go ${config.status === "live" ? "practice test" : "readiness check"} has ${config.questionCount} multiple-choice questions timed against a ${config.durationMinutes}-minute target.${hasShortFreeDiagnostic(config) ? ` The free first attempt is a ${FREE_DIAGNOSTIC_QUESTIONS}-question / ${freeDiagnosticMinutes(config)}-minute diagnostic with the same topic weights; the full session runs on Mock Pass.` : ""} ${config.officialSourceNote}`,
    },
    ...(waitlist || !hasShortFreeDiagnostic(config)
      ? []
      : [
          {
            question: `Why is the free ${profile.practiceTestLabel} ${FREE_DIAGNOSTIC_QUESTIONS} questions?`,
            answer: `It is a diagnostic: ${FREE_DIAGNOSTIC_QUESTIONS} questions drawn by the same topic weights as the full ${config.questionCount}-question mock — enough to rank your weakest topics, short enough to finish in ${freeDiagnosticMinutes(config)} minutes in one sitting. With 1–6 questions per topic it is a quick read, not a verdict; for a full-length timed score, run the ${config.questionCount}-question / ${config.durationMinutes}-minute mock.`,
          },
          {
            question: `What do I get for $${MOCK_PASS_PRICE_USD}?`,
            answer: `The ${MOCK_PASS_NAME}: unlimited full timed attempts on any ${siteConfig.name} mock, including the ${config.questionCount}-question ${config.shortTitle} session, in Exam or Learn mode. It is a one-time $${MOCK_PASS_PRICE_USD} Gumroad license key that works on any device — no subscription, no attempt counter. Every attempt ends with the full topic report and answer review.`,
          },
        ]),
    {
      question: `What score do you need on this ${profile.practiceTestLabel}?`,
      answer: `The pass target on this practice test is ${config.passRule.passPercent}%. ${waitlist ? "When the bank launches, " : ""}Your report also breaks down performance by topic so you can see weak areas before the real exam.`,
    },
    {
      question: `Who should take this ${profile.practiceTestLabel}?`,
      answer: profile.audience,
    },
  ];
}

export function buildMockExamFaqs(config: MockExamConfig) {
  const profile = getMockSeoProfile(config);
  const pageUrl = absoluteUrl(`/mock-exams/${config.slug}`);
  const linkedDeck = getDeckBySlug(config.linkedDeckSlug);
  const deckIsBuyable =
    linkedDeck?.status === "available" && Boolean(linkedDeck.checkoutUrl);
  const bankNote = config.questionSourceNote
    ? config.questionSourceNote
    : "Questions are original UniPrep2Go practice items aligned to published topic outlines — not leaked official exam questions.";
  const headTermFaq = headTermFaqForSchema(config);
  const qCountFaq = questionCountFaqForSchema(config);
  const editorialFaqs = getMockEditorialFaqs(config.slug);
  const editorialDropKeys = new Set(
    getMockEditorialDropFaqQuestions(config.slug).map(normalizeFaqQuestionKey),
  );

  const faqs = [
    ...(headTermFaq ? [headTermFaq] : []),
    ...(qCountFaq ? [qCountFaq] : []),
    ...editorialFaqs,
    ...buildMockSearchFaqs(config),
    {
      question: `Where can I take a ${profile.practiceTestLabel} online?`,
      answer: `${siteConfig.name} hosts the ${profile.headline} at ${pageUrl} with a timed runner and full readiness report.`,
    },
    {
      question: "Is this official exam material?",
      answer: `No. ${config.disclaimer}`,
    },
    {
      question: "What does the report show after the mock?",
      answer: deckIsBuyable
        ? "Your report shows a pass/no-pass verdict with explanation, topic diagnosis, pacing notes, full question review with explanations, and a repair plan that links to the paid Anki deck on Gumroad for weak-topic drilling."
        : "Your report shows a pass/no-pass verdict with explanation, topic diagnosis, pacing notes, full question review with explanations, and a repair plan that links to the Anki deck waitlist for spaced-repetition practice when the .apkg ships.",
    },
    {
      question: "Where do the questions come from?",
      answer: bankNote,
    },
  ];
  const seen = new Set<string>();
  return faqs.filter((faq) => {
    const key = normalizeFaqQuestionKey(faq.question);
    if (editorialDropKeys.has(key)) return false;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/** First extractable sentence on the landing: what the free run is, what the full mock costs. */
export function buildMockAnswerBlock(config: MockExamConfig) {
  if (config.status === "coming_soon") return null;
  const label = getMockSeoProfile(config).practiceTestLabel;
  if (!hasShortFreeDiagnostic(config)) {
    return `${siteConfig.name}'s free ${label} is a ${config.questionCount}-question, ${config.durationMinutes}-minute timed mock with a free topic report and answer review — no email, no account.`;
  }
  return `${siteConfig.name}'s free ${label} is a ${FREE_DIAGNOSTIC_QUESTIONS}-question, ${freeDiagnosticMinutes(config)}-minute timed diagnostic with a free topic report and answer review — no email, no account. The full mock is ${config.questionCount} questions / ${config.durationMinutes} minutes on the $${MOCK_PASS_PRICE_USD} ${MOCK_PASS_NAME} (unlimited attempts on any mock).`;
}

export function buildMockSeoPageCopy(config: MockExamConfig) {
  const profile = getMockSeoProfile(config);
  const niche = getNicheExamExplainer(config.slug);
  const official = getMockOfficialResources(config);
  const waitlist = config.status === "coming_soon";
  const defaultHowToPrepare = waitlist
    ? `Review the official ${official.certifier} outline for ${config.shortTitle}, study each topic on this page${official.verifyAtUrl ? ` (verify details at the official site)` : ""}, and use Notify me when this launches so you can take the free timed diagnostic when the bank ships.`
    : `Start with this free timed diagnostic to see which ${config.shortTitle} domains are weak, then review the published ${official.certifier} outline${official.verifyAtUrl ? ` on the official site` : ""} and drill missed topics with the linked Anki deck before exam day.`;

  return {
    headline: profile.headline,
    intro: profile.intro,
    audience: profile.audience,
    whoFor: niche?.whoFor ?? profile.audience,
    howToPrepare: niche?.howToPrepare ?? defaultHowToPrepare,
    topicSummary: config.topics.map((topic) => topic.label).join(", "),
    topicBlurbs: niche?.topicBlurbs ?? [],
    practiceTestLabel: profile.practiceTestLabel,
    whatIsExam: profile.whatIsExam,
    administeredBy: profile.administeredBy ?? official.certifier,
    officialFormat: profile.officialFormat,
    verifyAtUrl: official.verifyAtUrl,
    officialSources: official.sources,
    isWaitlist: waitlist,
    whatIsHeading: niche
      ? `What is the ${niche.practiceTestName.replace(/ Practice (Test|Exam)$/i, "")} exam?`
      : `What is the ${config.shortTitle} exam?`,
  };
}

export function buildMockExamHubFaqs(indexedCount: number, totalCount: number) {
  const previewCount = Math.max(0, totalCount - indexedCount);

  return [
    {
      question: "How many practice tests does UniPrep2Go offer?",
      answer: `${indexedCount} indexed timed practice tests are promoted in search (FINRA SIE, Series 7, CFA, FRM, ServSafe, PTCB, EPA 608, LEED, MRICS, GMAT Focus, and other pathways). ${previewCount > 0 ? `${previewCount} additional pages are not yet indexed. ` : ""}${mockFreeAccessNotice}`,
    },
    {
      question: "Are the mocks free? Do I need to sign up?",
      answer: `No signup. ${MOCK_ACCESS_RULE} Start directly from any mock page; the readiness report with topic scoring and answer review appears right after submit on every attempt.`,
    },
    {
      question: "What happens after the mock report?",
      answer:
        "Your report flags weak topics and links to the matching Anki deck or PDF for spaced-repetition repair. Buy the deck only when you want daily drilling on gaps the mock surfaced.",
    },
    {
      question: "Are these official exam materials?",
      answer:
        "No — we do not redistribute official exam questions. UniPrep2Go mocks are independent study aids. Topic weights, timing, and pass targets are modeled on published official outlines and blueprints; question text is original practice content. Not endorsed by FINRA, CFA Institute, PTCB, ServSafe, or any exam body.",
    },
    {
      question: "Where do topic weights and exam structure come from?",
      answer:
        "From official public sources only — published content outlines, blueprints, and candidate handbooks from the relevant exam body. We use those documents for domain weights and readiness thresholds. Practice questions are authored by UniPrep2Go and are not leaked official items.",
    },
  ] as const;
}
