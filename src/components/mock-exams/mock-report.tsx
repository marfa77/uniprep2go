import type { MockExamConfig, MockReport } from "@/lib/mock-exams/types";
import type { MockSessionMode } from "@/lib/mock-exams/session-mode";
import { getCatalogDeckBySlug } from "@/lib/decks";
import { FormulaBlock } from "./formula-block";
import { MathContent } from "./math-content";
import { QuestionContent } from "./question-content";
import { MockReportHandoff, type LinkedDeckCheckout } from "./mock-report-handoff";

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

function topicBarTone(status: MockReport["topicResults"][number]["status"]) {
  switch (status) {
    case "strong":
    case "on_track":
      return "bg-[#1f3a5f]";
    case "weak":
      return "bg-[#8a6a1f]";
    case "critical":
      return "bg-[#7a2e2e]";
  }
}

type MockReportPanelProps = {
  config: MockExamConfig;
  linkedCheckout: LinkedDeckCheckout | null;
  report: MockReport;
  sessionMode?: MockSessionMode;
};

export function MockReportPanel({
  config,
  linkedCheckout,
  report,
  sessionMode = "exam",
}: MockReportPanelProps) {
  const linkedDeck = getCatalogDeckBySlug(config.linkedDeckSlug);
  const deckShortName = linkedDeck?.shortName ?? config.linkedDeckSlug.replace(/-/g, " ");
  const shouldRecommendDeck =
    report.verdict === "NO PASS" || report.verdict === "BORDERLINE RISK";
  const showExamPacing = sessionMode === "exam";
  const repairPlanSection = (
    <section className="rounded-3xl border border-[#18140f]/10 bg-[#fffaf0] p-6 sm:p-8">
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
        Retake recommendation: drill the weak topics above in the linked{" "}
        <a className="font-medium underline decoration-[#18140f]/20 underline-offset-4" href={report.linkedDeckUrl}>
          {deckShortName}
        </a>{" "}
        deck, then run this mock again in 3–7 days.
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

  return (
    <div className="space-y-8">
      <section className={`rounded-3xl border p-6 sm:p-8 ${verdictStyles(report.verdict)}`}>
        <p className="font-mono text-xs uppercase tracking-[0.28em]">
          {sessionMode === "learn" ? "Learn report" : "Exam report"} · readiness verdict
        </p>
        <h2 className="mt-3 text-4xl font-semibold tracking-tight">{report.verdict}</h2>
        <p className="mt-4 text-lg font-semibold">
          {report.correctCount}/{report.totalCount} correct · {report.scorePercent}% · threshold{" "}
          {report.passThresholdPercent}%
        </p>
        <p className="mt-4 max-w-3xl text-sm leading-7">{report.verdictExplanation}</p>
        {shouldRecommendDeck ? (
          <div className="mt-6 rounded-2xl border border-[#18140f]/10 bg-[#fffaf0] p-5 text-[#18140f]">
            <p className="font-semibold">Recommended next step: drill the linked Anki deck before retaking.</p>
            <p className="mt-2 text-sm leading-7 text-[#4f493e]">
              Your score is not yet safely above target. Use the deck to rebuild the weak topics below,
              then retake this mock after a focused review cycle.
            </p>
            <MockReportHandoff
              deckPageUrl={report.linkedDeckUrl}
              deckShortName={deckShortName}
              deckSlug={config.linkedDeckSlug}
              linkedCheckout={linkedCheckout}
              mockSlug={config.slug}
              recommendDeck={false}
              retakeHref={`/mock-exams/${config.slug}`}
            />
          </div>
        ) : null}
      </section>

      <section className="rounded-3xl border border-[#18140f]/10 bg-[#fffaf0] p-6 sm:p-8">
        <h3 className="text-2xl font-semibold tracking-tight">Topic diagnosis</h3>
        <ul className="mt-6 space-y-5">
          {report.topicResults.map((topic) => {
            const scoreWidth = Math.min(100, Math.max(0, topic.scorePercent));
            const targetWidth = Math.min(100, Math.max(0, topic.targetPercent));

            return (
              <li key={topic.topicId} className="rounded-2xl border border-[#18140f]/10 bg-[#f7f3ea] p-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-semibold text-[#18140f]">{topic.label}</p>
                  <p className="text-sm font-medium text-[#4f493e]">
                    {topic.correct}/{topic.total} ({topic.scorePercent}%) · {topicStatusLabel(topic.status)}
                  </p>
                </div>
                <div className="relative mt-3 h-2.5 overflow-hidden rounded-full bg-[#18140f]/10">
                  <div
                    aria-hidden
                    className="absolute inset-y-0 w-px bg-[#18140f]/35"
                    style={{ left: `${targetWidth}%` }}
                    title={`${topic.targetPercent}% target`}
                  />
                  <div
                    className={`h-full motion-safe:transition-[width] motion-safe:duration-200 ${topicBarTone(topic.status)}`}
                    style={{ width: `${scoreWidth}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-[#5f5749]">
                  Target {topic.targetPercent}% · weight {topic.weightPercent}%
                </p>
              </li>
            );
          })}
        </ul>
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
          Ready for daily drilling on {deckShortName}?
        </h3>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-[#4f493e]">
          {shouldRecommendDeck
            ? "Your mock score shows gaps this report cannot fix alone. The linked Anki deck covers the same topic map with spaced repetition — drill weak areas, then retake this mock in 3–7 days."
            : "Strong mock result — keep momentum with the linked Anki deck for daily active recall on the same topics you just tested."}
        </p>
        <MockReportHandoff
          deckPageUrl={report.linkedDeckUrl}
          deckShortName={deckShortName}
          deckSlug={config.linkedDeckSlug}
          linkedCheckout={linkedCheckout}
          mockSlug={config.slug}
          recommendDeck={shouldRecommendDeck}
          retakeHref={`/mock-exams/${config.slug}`}
        />
      </section>

      <p className="text-sm leading-7 text-[#7a6e5a]">{report.disclaimer}</p>
    </div>
  );
}
