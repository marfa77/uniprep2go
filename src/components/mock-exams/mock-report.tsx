import type { MockExamConfig, MockReport } from "@/lib/mock-exams/types";
import { MathContent } from "./math-content";
import { QuestionContent } from "./question-content";

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
  report: MockReport;
};

export function MockReportPanel({ config, report }: MockReportPanelProps) {
  const shouldRecommendDeck =
    report.verdict === "NO PASS" || report.verdict === "BORDERLINE RISK";
  const repairPlanSection = (
    <section className="rounded-3xl border border-[#18140f]/10 bg-[#fffaf0] p-6 sm:p-8">
      <h3 className="text-2xl font-semibold tracking-tight">Repair plan</h3>
      <ol className="mt-4 space-y-4">
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
          {config.linkedDeckSlug.replace(/-/g, " ")}
        </a>{" "}
        deck, then run this mock again in 3–7 days.
      </p>
    </section>
  );
  const pacingSection = (
    <section className="rounded-3xl border border-[#18140f]/10 bg-[#fffaf0] p-6 sm:p-8">
      <h3 className="text-2xl font-semibold tracking-tight">Pacing</h3>
      <p className="mt-4 text-sm leading-7 text-[#4f493e]">
        Average {report.pacing.averageSecondsPerQuestion}s per question vs recommended{" "}
        {report.pacing.recommendedSecondsPerQuestion}s · status: {report.pacing.pacingStatus.replace("_", " ")}
      </p>
      <p className="mt-3 text-sm leading-7 text-[#4f493e]">{report.pacing.pacingNote}</p>
    </section>
  );

  return (
    <div className="space-y-8">
      <section className={`rounded-3xl border p-6 sm:p-8 ${verdictStyles(report.verdict)}`}>
        <p className="font-mono text-xs uppercase tracking-[0.28em]">Readiness verdict</p>
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
            <a
              className="mt-4 inline-flex rounded-full bg-[#18140f] px-5 py-2.5 text-sm font-semibold text-[#fffaf0] transition hover:bg-[#1f3a5f]"
              href={report.linkedDeckUrl}
            >
              Open linked Anki deck
            </a>
          </div>
        ) : null}
      </section>

      <section className="rounded-3xl border border-[#18140f]/10 bg-[#fffaf0] p-6 sm:p-8">
        <h3 className="text-2xl font-semibold tracking-tight">Topic diagnosis</h3>
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#18140f]/10 text-[#5f5749]">
                <th className="py-3 pr-4 font-medium">Topic</th>
                <th className="py-3 pr-4 font-medium">Score</th>
                <th className="py-3 pr-4 font-medium">Target</th>
                <th className="py-3 pr-4 font-medium">Weight</th>
                <th className="py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {report.topicResults.map((topic) => (
                <tr key={topic.topicId} className="border-b border-[#18140f]/10">
                  <td className="py-4 pr-4 align-top text-[#18140f]">{topic.label}</td>
                  <td className="py-4 pr-4 align-top">
                    {topic.correct}/{topic.total} ({topic.scorePercent}%)
                  </td>
                  <td className="py-4 pr-4 align-top">{topic.targetPercent}%</td>
                  <td className="py-4 pr-4 align-top">{topic.weightPercent}%</td>
                  <td className="py-4 align-top font-medium">{topicStatusLabel(topic.status)}</td>
                </tr>
              ))}
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
              <summary className="cursor-pointer text-sm font-semibold text-[#18140f]">
                Q{index + 1} · {item.topicLabel} · {item.isCorrect ? "Correct" : "Incorrect"}
              </summary>
              <p className="mt-3 text-sm leading-7 text-[#4f493e]">
                <QuestionContent text={item.prompt} />
              </p>
              {item.formula ? (
                <div className="mt-3 overflow-x-auto rounded-xl border border-[#18140f]/10 bg-[#fffaf0] p-3 text-sm">
                  <MathContent text={item.formula} />
                </div>
              ) : null}
              <p className="mt-3 text-sm leading-7">
                <span className="font-medium">Correct:</span>{" "}
                <MathContent text={item.options.find((option) => option.id === item.correctOptionId)?.text ?? ""} />
              </p>
              {!item.isCorrect ? (
                <p className="mt-2 text-sm leading-7">
                  <span className="font-medium">Your answer:</span>{" "}
                  {item.userOptionId
                    ? <MathContent text={item.options.find((option) => option.id === item.userOptionId)?.text ?? ""} />
                    : "No answer selected"}
                </p>
              ) : null}
              <p className="mt-3 text-sm leading-7 text-[#4f493e]">
                <MathContent text={item.explanation} />
              </p>
              {item.distractorExplanation ? (
                <p className="mt-2 text-sm leading-7 text-[#5f5749]">
                  Why your choice was wrong: {item.distractorExplanation}
                </p>
              ) : null}
            </details>
          ))}
        </div>
      </section>

      <p className="text-sm leading-7 text-[#7a6e5a]">{report.disclaimer}</p>
    </div>
  );
}
