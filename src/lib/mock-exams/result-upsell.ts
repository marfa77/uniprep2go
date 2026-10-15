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

export type ResultUpsellInput = {
  report: Pick<MockReport, "verdict" | "scorePercent" | "passThresholdPercent" | "topicResults" | "totalCount">;
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

function missLine(topics: ResultUpsellInput["report"]["topicResults"], fullQuestionCount: number) {
  const missed = topics
    .map((topic) => ({ label: topic.label, misses: topic.missedQuestionIds.length, gap: topic.targetPercent - topic.scorePercent }))
    .filter((topic) => topic.misses > 0)
    .sort((a, b) => b.misses - a.misses || b.gap - a.gap)
    .slice(0, 2);
  if (missed.length === 0) {
    return `You missed nothing on this sample — confirm it holds on the full ${fullQuestionCount}-question mock.`;
  }
  const part = (topic: (typeof missed)[number], first: boolean) =>
    `${topic.misses}${first ? ` question${topic.misses === 1 ? "" : "s"}` : ""} in ${topic.label}`;
  return missed.length === 1
    ? `You missed ${part(missed[0]!, true)}.`
    : `You missed ${part(missed[0]!, true)} and ${part(missed[1]!, false)}.`;
}

/** Result-screen copy: never reassuring, always points at the weak topics and the next paid step. */
export function buildResultUpsell(input: ResultUpsellInput): ResultUpsell {
  const { report, isFreeDiagnostic, fullQuestionCount, officialPass, deck } = input;
  const pass = isPassVerdict(report.verdict);
  const sample = isFreeDiagnostic ? `the ${report.totalCount}-question diagnostic` : "this mock";

  const headline = pass
    ? `You scored ${report.scorePercent}% — PASS on ${sample}.`
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
    ? `Don't leave exam day to chance — drill these exact topics with ${cards}${price}.`
    : `Don't leave exam day to chance — rerun the full ${fullQuestionCount}-question mock after a focused review of these topics.`;

  const deckCtaLabel = deck?.available
    ? `Drill weak topics: ${deck.cardCount ? `${deck.cardCount} cards` : "Anki deck"}${deck.priceLabel ? ` — ${deck.priceLabel}` : ""}`
    : null;
  const mockCtaLabel = !input.paywallEnabled
    ? `Retake the ${fullQuestionCount}-question mock`
    : input.passRemaining > 0
      ? `Take the full ${fullQuestionCount}-question mock · ${input.passRemaining} attempt${input.passRemaining === 1 ? "" : "s"} left`
      : `Take the full ${fullQuestionCount}-question mock · $${MOCK_PASS_PRICE_USD} for ${MOCK_PASS_ATTEMPTS} attempts`;

  return {
    tone: pass ? "pass" : report.verdict === "BORDERLINE RISK" ? "risk" : "fail",
    headline,
    reality,
    misses: missLine(report.topicResults, fullQuestionCount),
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
