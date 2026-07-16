"use client";

import Link from "next/link";
import { getCatalogDeckBySlug } from "@/lib/decks";
import type { MockAccessState, MockExamConfig, MockQuestion, MockReport } from "@/lib/mock-exams/types";
import { getMockCta } from "@/lib/mock-exams/access";
import {
  buildMockReport,
  createAttemptSeed,
  selectSessionQuestions,
  shuffleQuestions,
} from "@/lib/mock-exams/scoring";
import { MockInterestCta } from "./mock-interest-cta";
import { MockReportPanel } from "./mock-report";
import type { LinkedDeckCheckout } from "./mock-report-handoff";
import { MockRunner } from "./mock-runner";
import { trackMockEvent } from "./mock-analytics";
import { useEffect, useMemo, useState } from "react";

type Screen = "landing" | "instructions" | "exam" | "results";

type MockExamClientProps = {
  config: MockExamConfig;
  questions: MockQuestion[];
  accessState: MockAccessState;
  linkedCheckout: LinkedDeckCheckout | null;
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

export function MockExamClient({ config, questions, accessState, linkedCheckout, runnable }: MockExamClientProps) {
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

    const sessionQuestions = selectSessionQuestions(questions, config, attemptSeed);
    return shuffleQuestions(sessionQuestions, attemptSeed);
  }, [attemptSeed, config, questions]);

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
    const linkedDeck = getCatalogDeckBySlug(config.linkedDeckSlug);
    const hideInterestCta = Boolean(linkedCheckout?.checkoutUrl);

    return (
      <div className="space-y-8">
        <MockReportPanel config={config} linkedCheckout={linkedCheckout} report={report} />
        {cta?.interestCaptureEnabled && !hideInterestCta ? (
          <MockInterestCta config={config} cta={cta} report={report} />
        ) : null}
        <div className="flex flex-wrap gap-3">
          <button
            className="rounded-lg bg-[#18140f] px-6 py-3 text-sm font-semibold text-[#fffaf0] transition hover:bg-[#1f3a5f]"
            onClick={startMock}
            type="button"
          >
            Retake mock
          </button>
          <Link
            className="inline-flex items-center rounded-lg border border-[#18140f]/20 px-6 py-3 text-sm font-semibold transition hover:border-[#18140f]"
            href={`/decks/${config.linkedDeckSlug}`}
            onClick={() =>
              trackMockEvent({
                name: "mock_deck_cta_click",
                deckSlug: config.linkedDeckSlug,
                mockSlug: config.slug,
              })
            }
          >
            {linkedDeck?.checkoutUrl ? "View deck page" : "Open linked Anki deck"}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-6">
      {config.status === "preview" ? (
        <p className="rounded-2xl border border-[#1f3a5f]/15 bg-[#fffaf0] px-4 py-3 text-sm text-[#4f493e]">
          Preview readiness check — question bank may still be loading.
        </p>
      ) : null}

      <section className="rounded-3xl border border-[#18140f]/10 bg-[#fffaf0] p-5 sm:p-6">
        <dl className="grid gap-4 sm:grid-cols-3">
          <div>
            <dt className="font-mono text-xs uppercase tracking-[0.2em] text-[#1f3a5f]">Questions</dt>
            <dd className="mt-1 text-lg font-semibold">{config.questionCount}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-[0.2em] text-[#1f3a5f]">Timing</dt>
            <dd className="mt-1 text-lg font-semibold">{formatDuration(config.durationMinutes)}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-[0.2em] text-[#1f3a5f]">Pass threshold</dt>
            <dd className="mt-1 text-lg font-semibold">{config.passRule.passPercent}%</dd>
          </div>
        </dl>

        {screen === "instructions" ? (
          <div className="mt-5 border-t border-[#18140f]/10 pt-5">
            <p className="text-sm leading-7 text-[#4f493e]">
              Timed session from the linked deck bank. Review answers before submit; report shows topic gaps and repair plan.
            </p>
            <button
              className="mt-4 rounded-full bg-[#18140f] px-6 py-3 text-sm font-semibold text-[#fffaf0] transition hover:bg-[#1f3a5f]"
              onClick={beginExam}
              type="button"
            >
              Begin timed mock
            </button>
          </div>
        ) : (
          <div className="mt-5 border-t border-[#18140f]/10 pt-5">
            {runnable ? (
              <button
                className="inline-flex h-11 items-center rounded-full bg-[#18140f] px-5 text-sm font-semibold text-[#fffaf0] transition hover:bg-[#1f3a5f]"
                onClick={startMock}
                type="button"
              >
                {startButtonLabel(config)}
              </button>
            ) : (
              <p className="text-sm font-medium text-[#5f5749]">
                Question bank loading — check back soon
              </p>
            )}
          </div>
        )}

        <details className="group mt-4">
          <summary className="cursor-pointer list-none text-sm font-medium text-[#1f3a5f] [&::-webkit-details-marker]:hidden">
            Topic breakdown ▾
          </summary>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-[#4f493e]">
            {config.topics.map((topic) => (
              <li key={topic.id}>
                <span className="font-medium text-[#18140f]">{topic.label}</span>
                {typeof topic.questionCount === "number"
                  ? ` — ${topic.questionCount} questions`
                  : typeof topic.weightPercent === "number"
                    ? ` — ${topic.weightPercent}%`
                    : ""}
              </li>
            ))}
          </ul>
        </details>
      </section>

      <p className="text-xs leading-6 text-[#7a6e5a]">{config.disclaimer}</p>
    </div>
  );
}
