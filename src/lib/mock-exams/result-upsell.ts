import type { ExamFactsFields } from "../exam-facts";
import { MOCK_PASS_ATTEMPTS, MOCK_PASS_PRICE_USD } from "./mock-pass";
import type { MockReport } from "./types";

/** Official pass line shown on the result screen; only concrete published thresholds qualify. */
export type OfficialPassLine = {
  examName: string;
  passingScore: string;
  questionCount?: number;
};

const VAGUE_PASS_RE = /^(no |not |varies|set by|cut scores|competency|form-equated)/i;

export function officialPassLineFromFacts(facts: ExamFactsFields | undefined | null): OfficialPassLine | undefined {
  const passing = facts?.passing_score?.trim();
  if (!facts || !passing || passing.length > 100 || VAGUE_PASS_RE.test(passing)) return undefined;
  const count = facts.question_count?.match(/^\d[\d,]*/)?.[0];
  return {
    examName: facts.exam_name,
    passingScore: passing.replace(/\.$/, ""),
    questionCount: count ? Number(count.replace(/,/g, "")) : undefined,
  };
}

/** Free 25-question run: per-topic samples are tiny, so labels stay descriptive, never "Critical". */
export type DiagnosticTopicLabel = "too_few" | "needs_work" | "borderline" | "on_track";

export const DIAGNOSTIC_MIN_TOPIC_QUESTIONS = 3;

export function diagnosticTopicLabel(topic: { total: number; scorePercent: number }): DiagnosticTopicLabel {
  if (topic.total < DIAGNOSTIC_MIN_TOPIC_QUESTIONS) return "too_few";
  if (topic.scorePercent < 50) return "needs_work";
  if (topic.scorePercent < 70) return "borderline";
  return "on_track";
}

export const DIAGNOSTIC_TOPIC_LABEL_TEXT: Record<DiagnosticTopicLabel, string> = {
  too_few: "Too few questions to judge",
  needs_work: "Needs work",
  borderline: "Borderline",
  on_track: "On track",
};

export function diagnosticSampleNote(
  topics: Array<{ total: number }>,
  totalCount: number,
  fullQuestionCount: number,
): string {
  const sizes = topics.map((topic) => topic.total).filter((total) => total > 0);
  const min = sizes.length > 0 ? Math.min(...sizes) : 0;
  const max = sizes.length > 0 ? Math.max(...sizes) : 0;
  const perTopic = min === max ? `${min} per topic` : `${min}–${max} per topic`;
  return `Based on ${totalCount} questions (${perTopic}) — a quick read, not a verdict. Run the full ${fullQuestionCount}-question mock for a reliable topic score.`;
}

export type ResultUpsellInput = {
  report: Pick<
    MockReport,
    "verdict" | "scorePercent" | "passThresholdPercent" | "topicResults" | "totalCount" | "repairPlan"
  >;
  isFreeDiagnostic: boolean;
  /** Full Mock Pass session length for this exam. */
  fullQuestionCount: number;
  examBody: string;
  officialPass?: OfficialPassLine;
  /** priceLabel is what the buyer pays; fullPriceLabel + percentOff only when a result-screen offer code applies. */
  deck?: { cardCount?: number; priceLabel?: string; fullPriceLabel?: string; percentOff?: number; available: boolean };
  /** Paid attempts left on this browser's Mock Pass (0 when none). */
  passRemaining: number;
  paywallEnabled: boolean;
};

export type ResultUpsell = {
  tone: "pass" | "risk" | "fail";
  headline: string;
  /** Free diagnostic only: how much weight 25 questions can carry. */
  sampleNote: string | null;
  reality: string;
  misses: string;
  close: string;
  deckCtaLabel: string | null;
  /** Struck-through list price next to the discounted deck CTA. */
  deckCtaFullPrice: string | null;
  deckOfferNote: string | null;
  mockCtaLabel: string;
};

function isPassVerdict(verdict: MockReport["verdict"]) {
  return verdict === "PASS" || verdict === "READINESS PASS";
}

/** Same ranked list as the Repair plan, the Fix CTA and the deck `?topics=` link. */
export function biggestGapLabels(repairPlan: ResultUpsellInput["report"]["repairPlan"]): string[] {
  return repairPlan.filter((item) => item.scorePercent < item.targetPercent).map((item) => item.topicLabel);
}

function gapLine(repairPlan: ResultUpsellInput["report"]["repairPlan"], fullQuestionCount: number) {
  const gaps = biggestGapLabels(repairPlan);
  if (gaps.length === 0) {
    return `No topic fell below target on this sample — confirm it holds on the full ${fullQuestionCount}-question mock.`;
  }
  return `Your biggest gap${gaps.length === 1 ? "" : "s"}: ${gaps.join(", ")}.`;
}

/** Result-screen copy: never reassuring, always points at the weak topics and the next paid step. */
export function buildResultUpsell(input: ResultUpsellInput): ResultUpsell {
  const { report, isFreeDiagnostic, fullQuestionCount, officialPass, deck } = input;
  const pass = isPassVerdict(report.verdict);
  const sample = isFreeDiagnostic ? `the ${report.totalCount}-question diagnostic` : "this mock";

  const headline = pass
    ? isFreeDiagnostic
      ? `You scored ${report.scorePercent}% — at or above the ${report.passThresholdPercent}% target on ${sample}.`
      : `You scored ${report.scorePercent}% — PASS on ${sample}.`
    : report.verdict === "BORDERLINE RISK"
      ? `You scored ${report.scorePercent}% — borderline on ${sample}, not yet safe.`
      : `You scored ${report.scorePercent}% — below the ${report.passThresholdPercent}% readiness target.`;

  const official = officialPass
    ? `Official ${officialPass.examName} pass mark: ${officialPass.passingScore}${
        officialPass.questionCount ? ` on ${officialPass.questionCount} questions` : ""
      }.`
    : `The real cut score is set by ${input.examBody.replace(/\.+$/, "")}, not by this practice target.`;
  const reality = pass
    ? isFreeDiagnostic
      ? `But ${report.totalCount} questions are a sample, not your exam. ${official}`
      : `But a practice pass is not the exam. ${official}`
    : `${official} Close these gaps before you book or sit it.`;

  const cards = deck?.cardCount ? `${deck.cardCount} spaced-repetition flashcards` : "the spaced-repetition flashcards";
  const discounted = Boolean(deck?.priceLabel && deck.fullPriceLabel && deck.percentOff);
  const price = deck?.priceLabel
    ? ` for ${deck.priceLabel}${discounted ? ` (${deck.percentOff}% off after your diagnostic)` : ""}`
    : "";
  const close = deck?.available
    ? pass
      ? `Next step: keep these topics fresh with ${cards}${price} so the score holds on exam day.`
      : `Next step: drill these exact topics with ${cards}${price}.`
    : `Next step: rerun the full ${fullQuestionCount}-question mock after a focused review of these topics.`;

  const deckCtaLabel = deck?.available
    ? `${pass ? "Lock it in" : "Drill weak topics"}: ${deck.cardCount ? `${deck.cardCount} cards` : "Anki deck"}${deck.priceLabel ? ` — ${deck.priceLabel}` : ""}`
    : null;
  const fullMockVerb = pass && isFreeDiagnostic ? "Confirm on" : "Take";
  const mockCtaLabel = !input.paywallEnabled
    ? `Retake the ${fullQuestionCount}-question mock`
    : input.passRemaining > 0
      ? `${fullMockVerb} the full ${fullQuestionCount}-question mock · ${input.passRemaining} attempt${input.passRemaining === 1 ? "" : "s"} left`
      : `${fullMockVerb} the full ${fullQuestionCount}-question mock · $${MOCK_PASS_PRICE_USD} for ${MOCK_PASS_ATTEMPTS} attempts`;

  return {
    tone: pass ? "pass" : isFreeDiagnostic || report.verdict === "BORDERLINE RISK" ? "risk" : "fail",
    headline,
    sampleNote: isFreeDiagnostic
      ? diagnosticSampleNote(report.topicResults, report.totalCount, fullQuestionCount)
      : null,
    reality,
    misses: gapLine(report.repairPlan, fullQuestionCount),
    close,
    deckCtaLabel,
    deckCtaFullPrice: deckCtaLabel && discounted ? deck!.fullPriceLabel! : null,
    deckOfferNote:
      deckCtaLabel && discounted
        ? `${deck!.percentOff}% off is applied automatically at Gumroad checkout — one-time payment, no subscription.`
        : null,
    mockCtaLabel,
  };
}
