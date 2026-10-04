import type { ExamFactsProfile } from "@/lib/exam-facts";
import type { Deck } from "@/lib/decks";
import type { MockExamConfig } from "@/lib/mock-exams/types";

const DOES_NOT_REPLACE_BY_EXAM: Record<string, string> = {
  "cfa-level-1":
    "CFA Institute curriculum, practice questions, and mock exams in the Learning Ecosystem",
  "cfa-level-2":
    "CFA Institute curriculum, practice questions, and mock exams in the Learning Ecosystem",
  "frm-part-1": "GARP Learning curriculum, practice questions, and practice exams",
  sie: "FINRA content outlines and your firm's qualification training",
  "series-7": "FINRA content outlines and your firm's qualification training",
  "series-63": "NASAA exam specifications and your firm's qualification training",
  nebosh:
    "GIC1 scenario-writing practice, the closing interview, or the GIC2 workplace risk assessment with your Learning Partner",
  "life-health-insurance":
    "Your state's insurance-law material and any required pre-licensing education",
  "ashrae-certifications":
    "Your credential's candidate guidebook and ASHRAE's official practice exam",
  pmp: "PMI's Exam Content Outline and the 35 contact hours of project management education PMI requires",
  ptce: "PTCB's official practice exam and your pharmacy technician training program",
  servsafe: "An accredited ServSafe course and proctored exam",
  "california-real-estate":
    "DRE-approved pre-licensing courses (135 hours) and the DRE exam itself",
};

const REVIEW_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export type DeckExamVersionModel = {
  examName: string;
  version: string;
  sourceLabel: string;
  sourceUrl: string;
  lastReviewed: string;
  covers: string;
  passRule?: string;
  doesNotReplace: string;
};

export function formatLastReviewed(isoDate: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate.trim());
  if (!match) return isoDate;
  const year = match[1];
  const month = Number.parseInt(match[2], 10);
  const day = Number.parseInt(match[3], 10);
  if (month < 1 || month > 12 || day < 1 || day > 31) return isoDate;
  return `${REVIEW_MONTHS[month - 1]} ${day}, ${year}`;
}

function isNumericCardCount(cards: string): boolean {
  const trimmed = cards.trim();
  if (!trimmed || /^planned/i.test(trimmed)) return false;
  return /^[\d,]+\+?$/.test(trimmed);
}

function buildCovers(deck: Deck): string {
  const { cards, topics } = deck.facts;
  if (!isNumericCardCount(cards)) {
    return topics.trim().replace(/\s+/g, " ");
  }
  const cardsSegment =
    deck.format === "PDF" ? `${cards.trim()} —` : `${cards.trim()} cards —`;
  return `${cardsSegment} ${topics.trim()}`.replace(/\s+/g, " ").trim();
}

function resolveOfficialSource(profile: ExamFactsProfile): { label: string; url: string } {
  const first = profile.official_sources?.[0];
  if (first?.url) {
    return { label: first.label || profile.exam_facts.administered_by, url: first.url };
  }
  return {
    label: profile.exam_facts.administered_by,
    url: profile.exam_facts.verify_at_url,
  };
}

function buildDoesNotReplace(profile: ExamFactsProfile): string {
  const key = profile.examKey;
  const administeredBy = profile.exam_facts.administered_by;
  const tail =
    DOES_NOT_REPLACE_BY_EXAM[key] ??
    `official ${administeredBy} materials, practice exams, or required training`;
  return `Independent study aid — it does not replace ${tail}.`;
}

export function buildDeckExamVersionModel(
  deck: Deck,
  profile: ExamFactsProfile | null,
): DeckExamVersionModel | null {
  if (!profile) return null;

  const { exam_facts: facts } = profile;
  const source = resolveOfficialSource(profile);

  return {
    examName: facts.exam_name,
    version: facts.outline_effective_date ?? deck.facts.examYear ?? "Current official outline",
    sourceLabel: source.label,
    sourceUrl: source.url,
    lastReviewed: formatLastReviewed(deck.lastUpdated),
    covers: buildCovers(deck),
    doesNotReplace: buildDoesNotReplace(profile),
  };
}

export function buildMockExamVersionModel(
  config: MockExamConfig,
  profile: ExamFactsProfile | null,
): DeckExamVersionModel | null {
  if (!profile) return null;

  const { exam_facts: facts } = profile;
  const source = resolveOfficialSource(profile);
  const officialPass = facts.passing_score?.trim();

  return {
    examName: facts.exam_name,
    version: facts.outline_effective_date ?? "Current official outline",
    sourceLabel: source.label,
    sourceUrl: source.url,
    lastReviewed: formatLastReviewed(config.lastUpdated),
    covers: `${config.questionCount}-question timed diagnostic (${config.durationMinutes} min) across ${config.topics.length} topic areas, with topic scoring and answer review. Official form: ${facts.question_count ?? "verify current bulletin"}.`,
    passRule: `${officialPass ? `Official exam: ${officialPass}. ` : ""}UniPrep2Go mock: ${config.passRule.passPercent}% readiness target (not an official pass score).`,
    doesNotReplace: buildDoesNotReplace(profile),
  };
}
