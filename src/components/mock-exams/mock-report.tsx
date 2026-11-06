import type { MockExamConfig, MockReport } from "@/lib/mock-exams/types";
import type { MockSessionMode } from "@/lib/mock-exams/session-mode";
import { FormulaBlock } from "./formula-block";
import { MathContent } from "./math-content";
import { QuestionContent } from "./question-content";
import { MockReportHandoff, type LinkedDeckCheckout } from "./mock-report-handoff";
import { MockCompanionDecksPanel, type MockCompanionCheckout } from "./mock-companion-decks-panel";
import {
  DIAGNOSTIC_TOPIC_LABEL_TEXT,
  diagnosticSampleNote,
  diagnosticTopicLabel,
} from "@/lib/mock-exams/result-upsell";

function verdictStyles(verdict: MockReport["verdict"]) {
  switch (verdict) {
    case "PASS":
    case "READINESS PASS":
      return "border-[#1f3a5f]/25 bg-[#1f3a5f]/5 text-[#1f3a5f]";
    case "BORDERLINE RISK":
      return "border-[#8a6a1f]/25 bg-[#fff4d6] text-[#6b5418]";
    default:
      return "border-[#7a2e2e]/20 bg-[#fff0f0] text-[#7a2e2e]";
  }
}

function topicStatusLabel(status: MockReport["topicResults"][number]["status"]) {
  switch (status) {
    case "strong":
      return "Strong";
    case "on_track":
      return "On track";
    case "weak":
      return "Weak";
    case "critical":
      return "Critical";
  }
}

type MockReportPanelProps = {
  config: MockExamConfig;
  /** Free 25-question run: soft verdict and per-topic labels that respect tiny samples. */
  isFreeDiagnostic?: boolean;
  /** Full Mock Pass session length (config is the 25-question session on a free run). */
  fullQuestionCount?: number;
  /** Price shown on the "Fix …" checkout; fullPriceLabel is struck through when an offer applies. */
  checkoutPrice?: { priceLabel: string; fullPriceLabel?: string };
  linkedCheckout: LinkedDeckCheckout | null;
  linkedDeckShortName?: string;
  companionCheckouts?: MockCompanionCheckout[];
  report: MockReport;
  sessionMode?: MockSessionMode;
  onRetake?: () => void;
};

export function MockReportPanel({
  config,
  isFreeDiagnostic = false,
  fullQuestionCount = config.questionCount,
  checkoutPrice,
  linkedCheckout,
  linkedDeckShortName,
  companionCheckouts = [],
  report,
  sessionMode = "exam",
  onRetake,
}: MockReportPanelProps) {
  const deckShortName =
    linkedDeckShortName ?? config.linkedDeckSlug.replace(/-anki-deck$/, "").replace(/-/g, " ");
  const shouldRecommendDeck =
    report.verdict === "NO PASS" || report.verdict === "BORDERLINE RISK";
  const showExamPacing = sessionMode === "exam";
  const weakTopicLabels = report.repairPlan.map((item) => item.topicLabel);
  const repairPlanSection = (
    <section
      className="rounded-3xl border border-[#18140f]/10 bg-[#fffaf0] p-6 sm:p-8"
      id="repair"
    >
      <h3 className="text-2xl font-semibold tracking-tight">Repair plan</h3>
      <ol className="mt-5 space-y-4">
        {report.repairPlan.map((item, index) => (
          <li key={item.topicId} className="rounded-2xl border border-[#18140f]/10 bg-[#f7f3ea] p-4">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#1f3a5f]">
              Priority {index + 1}
            </p>
            <p className="mt-2 font-semibold text-[#18140f]">{item.topicLabel}</p>
            <p className="mt-2 text-sm leading-7 text-[#4f493e]">
              {item.scorePercent}% vs {item.targetPercent}% target · {item.action}
            </p>
          </li>
        ))}
      </ol>
      <p className="mt-6 text-sm leading-7 text-[#4f493e]">
        Biggest gap first: close the weak topics above with targeted review in the linked{" "}
        <a className="font-medium underline decoration-[#18140f]/20 underline-offset-4" href={report.linkedDeckUrl}>
          {deckShortName}
        </a>{" "}
        prep, then retake this mock in 3–7 days.
      </p>
    </section>
  );
  const pacingSection = showExamPacing ? (
    <section className="rounded-3xl border border-[#18140f]/10 bg-[#fffaf0] p-6 sm:p-8">
      <h3 className="text-2xl font-semibold tracking-tight">Pacing</h3>
      <p className="mt-4 text-sm leading-7 text-[#4f493e]">
        Average {report.pacing.averageSecondsPerQuestion}s per question vs recommended{" "}
        {report.pacing.recommendedSecondsPerQuestion}s · status: {report.pacing.pacingStatus.replace("_", " ")}
      </p>
      <p className="mt-3 text-sm leading-7 text-[#4f493e]">{report.pacing.pacingNote}</p>
    </section>
  ) : (
    <section className="rounded-3xl border border-[#18140f]/10 bg-[#fffaf0] p-6 sm:p-8">
      <h3 className="text-2xl font-semibold tracking-tight">Session mode</h3>
      <p className="mt-4 text-sm leading-7 text-[#4f493e]">
        Learn mode was untimed with instant feedback after each answer. Exam pacing is not scored for this
        attempt — use Exam mode when you want a timed diagnostic.
      </p>
    </section>
  );

  const isPass = report.verdict === "PASS" || report.verdict === "READINESS PASS";
  const verdictLabel = isFreeDiagnostic
    ? isPass
      ? `At or above ${report.passThresholdPercent}% target`
      : `Below ${report.passThresholdPercent}% target`
    : report.verdict;
  const verdictClass = isFreeDiagnostic
    ? isPass
      ? verdictStyles("PASS")
      : verdictStyles("BORDERLINE RISK")
    : verdictStyles(report.verdict);

  return (
    <div className="space-y-8">
      <section className={`rounded-2xl border p-4 sm:rounded-3xl sm:p-8 ${verdictClass}`}>
        <p className="font-mono text-xs uppercase tracking-[0.28em]">
          {isFreeDiagnostic
            ? "Free diagnostic · quick read"
            : `${sessionMode === "learn" ? "Learn report" : "Exam report"} · readiness verdict`}
        </p>
        <h2 className="mt-3 text-4xl font-semibold tracking-tight">{verdictLabel}</h2>
        <p className="mt-4 text-lg font-semibold">
          {report.correctCount}/{report.totalCount} correct · {report.scorePercent}% · threshold{" "}
          {report.passThresholdPercent}%
        </p>
        {isFreeDiagnostic ? (
          <p className="mt-2 max-w-3xl text-sm leading-6">
            {diagnosticSampleNote(report.topicResults, report.totalCount, fullQuestionCount)}
          </p>
        ) : null}
        <p className="mt-4 max-w-3xl text-sm leading-7">{report.verdictExplanation}</p>
      </section>

      <section className="border border-line bg-white">
        <h3 className="border-b border-line px-5 py-4 text-xl">Topic scores</h3>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-[0.14em] text-muted">
                <th className="px-5 py-3 font-medium">Topic</th>
                <th className="px-5 py-3 font-medium">Questions</th>
                <th className="px-5 py-3 font-medium">Accuracy</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {report.topicResults.map((topic) => {
                const diagnosticLabel = isFreeDiagnostic ? diagnosticTopicLabel(topic) : null;
                const statusText = diagnosticLabel
                  ? DIAGNOSTIC_TOPIC_LABEL_TEXT[diagnosticLabel]
                  : topicStatusLabel(topic.status);
                return (
                  <tr className="border-b border-line last:border-b-0" key={topic.topicId}>
                    <td className="px-5 py-3 text-ink">{topic.label}</td>
                    <td className="px-5 py-3 text-muted">
                      {topic.correct} / {topic.total}
                    </td>
                    <td className="px-5 py-3 text-ink">{topic.scorePercent}%</td>
                    <td className="px-5 py-3 text-muted">{statusText}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {shouldRecommendDeck ? repairPlanSection : pacingSection}
      {shouldRecommendDeck ? pacingSection : repairPlanSection}

      <section className="rounded-3xl border border-[#18140f]/10 bg-[#fffaf0] p-6 sm:p-8">
        <h3 className="text-2xl font-semibold tracking-tight">Question review</h3>
        <div className="mt-6 space-y-4">
          {report.questionReview.map((item, index) => (
            <details
              key={item.questionId}
              className="rounded-2xl border border-[#18140f]/10 bg-[#f7f3ea] p-4"
            >
              <summary className="cursor-pointer text-sm font-semibold text-[#18140f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f3a5f]">
                Q{index + 1} · {item.topicLabel} · {item.isCorrect ? "Correct" : "Incorrect"}
              </summary>
              <p className="mt-3 text-sm leading-7 text-[#4f493e]">
                <QuestionContent text={item.prompt} />
              </p>
              {item.formula ? (
                <div className="mt-3 overflow-x-auto rounded-xl border border-[#18140f]/10 bg-[#fffaf0] p-3 text-sm">
                  <FormulaBlock text={item.formula} />
                </div>
              ) : null}
              <p className="mt-3 text-sm leading-7">
                <span className="font-medium">Correct answer:</span>{" "}
                <span className="font-semibold uppercase">{item.correctOptionId}.</span>{" "}
                <MathContent text={item.options.find((option) => option.id === item.correctOptionId)?.text ?? ""} />
              </p>
              {!item.isCorrect ? (
                <p className="mt-2 text-sm leading-7">
                  <span className="font-medium">Your answer:</span>{" "}
                  {item.userOptionId ? (
                    <>
                      <span className="font-semibold uppercase">{item.userOptionId}.</span>{" "}
                      <MathContent
                        text={item.options.find((option) => option.id === item.userOptionId)?.text ?? ""}
                      />
                    </>
                  ) : (
                    "No answer selected"
                  )}
                </p>
              ) : null}
              <div className="mt-4 space-y-3 border-t border-[#18140f]/10 pt-4">
                <div>
                  <p className="text-sm font-medium text-[#18140f]">Why this is correct</p>
                  <p className="mt-1.5 text-sm leading-7 text-[#4f493e]">
                    <MathContent text={item.explanation} />
                  </p>
                </div>
                {item.distractorExplanation ? (
                  <div>
                    <p className="text-sm font-medium text-[#18140f]">Why your answer was wrong</p>
                    <p className="mt-1.5 text-sm leading-7 text-[#5f5749]">
                      <MathContent text={item.distractorExplanation} />
                    </p>
                  </div>
                ) : null}
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-[#1f3a5f]/20 bg-[#fffaf0] p-6 sm:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#1f3a5f]">Full study system</p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight">
          {shouldRecommendDeck
            ? `Close your gaps on ${deckShortName}`
            : `Keep momentum on ${deckShortName}`}
        </h3>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-[#4f493e]">
          {shouldRecommendDeck
            ? "Your mock score shows gaps this report cannot fix alone. Targeted daily review on the same topic map — then retake this mock in 3–7 days."
            : "A practice pass fades in days without review. Keep daily spaced recall on the topics you missed so the score holds on exam day."}
        </p>
        <MockReportHandoff
          deckPageUrl={report.linkedDeckUrl}
          deckShortName={deckShortName}
          deckSlug={config.linkedDeckSlug}
          linkedCheckout={linkedCheckout}
          mockSlug={config.slug}
          checkoutPrice={checkoutPrice}
          recommendDeck={shouldRecommendDeck}
          onRetake={onRetake}
              retakeHref={`/mock-exams/${config.slug}`}
          weakTopicLabels={weakTopicLabels}
        />
      </section>

      <MockCompanionDecksPanel companions={companionCheckouts} config={config} />

      <p className="text-sm leading-7 text-[#7a6e5a]">{report.disclaimer}</p>
    </div>
  );
}
