"use client";

import Link from "next/link";
import type { MockAccessState, MockExamConfig, MockQuestion, MockReport } from "@/lib/mock-exams/types";
import { getMockCta } from "@/lib/mock-exams/access";
import { buildMockReport, createAttemptSeed, shuffleQuestions } from "@/lib/mock-exams/scoring";
import { MockInterestCta } from "./mock-interest-cta";
import { MockReportPanel } from "./mock-report";
import { MockRunner } from "./mock-runner";
import { trackMockEvent } from "./mock-analytics";
import { useEffect, useMemo, useState } from "react";

type Screen = "landing" | "instructions" | "exam" | "results";

type MockExamClientProps = {
  config: MockExamConfig;
  questions: MockQuestion[];
  accessState: MockAccessState;
  runnable: boolean;
};

function formatDuration(minutes: number) {
  return `${minutes} minutes`;
}

function startButtonLabel(config: MockExamConfig) {
  return config.status === "live" ? "Start free mock" : "Start free readiness check";
}

function scrollToTop() {
  window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
}

export function MockExamClient({ config, questions, accessState, runnable }: MockExamClientProps) {
  const [screen, setScreen] = useState<Screen>("landing");
  const [attemptSeed, setAttemptSeed] = useState<string>("");
  const [report, setReport] = useState<MockReport | null>(null);
  const cta = getMockCta(accessState);

  useEffect(() => {
    trackMockEvent({
      name: "mock_landing_view",
      deckSlug: config.linkedDeckSlug,
      mockSlug: config.slug,
      source: `mock:${config.slug}:landing`,
    });
  }, [config.linkedDeckSlug, config.slug]);

  const shuffledQuestions = useMemo(() => {
    if (!attemptSeed) {
      return questions;
    }

    return shuffleQuestions(questions, attemptSeed);
  }, [attemptSeed, questions]);

  function startMock() {
    const seed = createAttemptSeed();
    setAttemptSeed(seed);
    setReport(null);
    setScreen("instructions");
    scrollToTop();
    trackMockEvent({
      name: "mock_started",
      deckSlug: config.linkedDeckSlug,
      mockSlug: config.slug,
      source: `mock:${config.slug}:start`,
    });
  }

  function beginExam() {
    setScreen("exam");
    scrollToTop();
  }

  function exitExam() {
    setScreen("landing");
    scrollToTop();
  }

  function completeExam(input: {
    answers: Record<string, string>;
    elapsedSeconds: number;
    startedAt: string;
  }) {
    const completedAt = new Date().toISOString();
    const nextReport = buildMockReport(
      {
        examSlug: config.slug,
        attemptSeed,
        answers: input.answers,
        elapsedSeconds: input.elapsedSeconds,
        startedAt: input.startedAt,
        completedAt,
      },
      shuffledQuestions,
    );

    setReport(nextReport);
    setScreen("results");
    scrollToTop();

    trackMockEvent({
      name: "mock_completed",
      deckSlug: config.linkedDeckSlug,
      mockSlug: config.slug,
      source: `mock:${config.slug}:complete`,
    });
    trackMockEvent({
      name: "mock_result_view",
      deckSlug: config.linkedDeckSlug,
      mockSlug: config.slug,
      source: `mock:${config.slug}:verdict:${nextReport.verdict.replace(/\s+/g, "_").toLowerCase()}`,
    });

    if (nextReport.verdict === "PASS" || nextReport.verdict === "READINESS PASS") {
      trackMockEvent({
        name: "mock_pass_verdict",
        deckSlug: config.linkedDeckSlug,
        mockSlug: config.slug,
        source: `mock:${config.slug}:pass`,
      });
    } else {
      trackMockEvent({
        name: "mock_no_pass_verdict",
        deckSlug: config.linkedDeckSlug,
        mockSlug: config.slug,
        source: `mock:${config.slug}:no_pass`,
      });
    }
  }

  if (screen === "exam" && attemptSeed) {
    return (
      <MockRunner
        config={config}
        questions={shuffledQuestions}
        onComplete={completeExam}
        onExit={exitExam}
      />
    );
  }

  if (screen === "results" && report) {
    return (
      <div className="space-y-8">
        <MockReportPanel config={config} report={report} />
        {cta?.interestCaptureEnabled ? (
          <MockInterestCta config={config} cta={cta} report={report} />
        ) : null}
        <div className="flex flex-wrap gap-3">
          <button
            className="rounded-full bg-[#18140f] px-6 py-3 text-sm font-semibold text-[#fffaf0] transition hover:bg-[#1f3a5f]"
            onClick={startMock}
            type="button"
          >
            Retake mock
          </button>
          <Link
            className="inline-flex items-center rounded-full border border-[#18140f]/20 px-6 py-3 text-sm font-semibold transition hover:border-[#18140f]"
            href={`/decks/${config.linkedDeckSlug}`}
            onClick={() =>
              trackMockEvent({
                name: "mock_deck_cta_click",
                deckSlug: config.linkedDeckSlug,
                mockSlug: config.slug,
              })
            }
          >
            Open linked Anki deck
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {config.status === "preview" ? (
        <div className="rounded-3xl border border-[#1f3a5f]/20 bg-[#fffaf0] p-5 text-sm leading-7 text-[#4f493e]">
          Preview readiness check built from the linked deck content. Full mock coverage is still expanding.
        </div>
      ) : null}

      <section className="rounded-3xl border border-[#18140f]/10 bg-[#fffaf0] p-6 sm:p-8">
        <h2 className="text-2xl font-semibold tracking-tight">Exam structure</h2>
        <dl className="mt-6 grid gap-4 sm:grid-cols-3">
          <div>
            <dt className="font-mono text-xs uppercase tracking-[0.2em] text-[#1f3a5f]">Questions</dt>
            <dd className="mt-2 text-lg font-semibold">{config.questionCount}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-[0.2em] text-[#1f3a5f]">Timing</dt>
            <dd className="mt-2 text-lg font-semibold">{formatDuration(config.durationMinutes)}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-[0.2em] text-[#1f3a5f]">Pass threshold</dt>
            <dd className="mt-2 text-lg font-semibold">{config.passRule.passPercent}%</dd>
          </div>
        </dl>
        <p className="mt-6 text-sm leading-7 text-[#5f5749]">{config.officialSourceNote}</p>
        <ul className="mt-6 space-y-3 text-sm leading-7 text-[#4f493e]">
          {config.topics.map((topic) => (
            <li key={topic.id}>
              <span className="font-medium text-[#18140f]">{topic.label}</span>
              {typeof topic.questionCount === "number"
                ? ` — ${topic.questionCount} questions`
                : typeof topic.weightPercent === "number"
                  ? ` — ${topic.weightPercent}% weight`
                  : ""}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-3xl border border-[#18140f]/10 bg-[#fffaf0]/70 p-6 sm:p-8">
        <h2 className="text-2xl font-semibold tracking-tight">What the report includes</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-[#4f493e]">
          <li>Pass / no-pass verdict with a plain-English explanation of why</li>
          <li>Weighted topic diagnosis with missed-question pointers</li>
          <li>Full question review with deck-backed explanations</li>
          <li>Repair plan linking back to the Anki deck</li>
        </ul>
        <p className="mt-6 rounded-2xl border border-[#1f3a5f]/15 bg-[#f7f3ea] p-4 text-sm leading-7 text-[#4f493e]">
          Full reports are free during launch month. We may introduce Gumroad report packs later; your
          feedback determines what ships.
        </p>
      </section>

      {screen === "instructions" ? (
        <section className="rounded-3xl border border-[#18140f]/10 bg-[#fffaf0] p-6 sm:p-8">
          <h2 className="text-2xl font-semibold tracking-tight">Before you start</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-[#4f493e]">
            <li>Questions come from the linked UniPrep2Go deck content, reshuffled into exam-style MCQ.</li>
            <li>You can review answers before submitting.</li>
            <li>The timer tracks pacing against the official timing target.</li>
          </ul>
          <button
            className="mt-6 rounded-full bg-[#18140f] px-6 py-3 text-sm font-semibold text-[#fffaf0] transition hover:bg-[#1f3a5f]"
            onClick={beginExam}
            type="button"
          >
            Begin timed mock
          </button>
        </section>
      ) : (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
          {runnable ? (
            <button
              className="inline-flex h-11 items-center rounded-full bg-[#18140f] px-5 text-sm font-semibold text-[#fffaf0] transition hover:bg-[#1f3a5f]"
              onClick={startMock}
              type="button"
            >
              {startButtonLabel(config)}
            </button>
          ) : (
            <p className="inline-flex h-11 items-center rounded-full border border-[#18140f]/20 px-5 text-sm font-semibold text-[#5f5749]">
              Question bank loading — check back soon
            </p>
          )}
          {cta?.interestCaptureEnabled ? (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <MockInterestCta compact config={config} cta={cta} />
              <p className="max-w-sm text-xs leading-5 text-[#7a6e5a]">
                Free during launch month. This tells us whether paid report packs are worth building.
              </p>
            </div>
          ) : null}
          </div>
        </div>
      )}

      <p className="text-sm leading-7 text-[#7a6e5a]">{config.disclaimer}</p>
    </div>
  );
}
