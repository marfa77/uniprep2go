"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { MockExamConfig, MockQuestion } from "@/lib/mock-exams/types";
import { MathContent } from "./math-content";
import { QuestionContent } from "./question-content";
import { trackMockEvent } from "./mock-analytics";

type MockRunnerProps = {
  config: MockExamConfig;
  questions: MockQuestion[];
  onComplete: (input: {
    answers: Record<string, string>;
    elapsedSeconds: number;
    startedAt: string;
  }) => void;
  onExit: () => void;
};

function formatClock(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function MockRunner({ config, questions, onComplete, onExit }: MockRunnerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [reviewMode, setReviewMode] = useState(false);
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const [startedAt] = useState(() => new Date().toISOString());
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const submittedRef = useRef(false);

  const durationSeconds = config.durationMinutes * 60;
  const currentQuestion = questions[currentIndex];
  const topicLabel =
    config.topics.find((topic) => topic.id === currentQuestion?.topicId)?.label ?? "Topic";

  useEffect(() => {
    const timer = window.setInterval(() => {
      setElapsedSeconds((value) => {
        const nextValue = Math.min(durationSeconds, value + 1);
        if (nextValue >= durationSeconds && !submittedRef.current) {
          submittedRef.current = true;
          onComplete({ answers, elapsedSeconds: durationSeconds, startedAt });
        }
        return nextValue;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [answers, durationSeconds, onComplete, startedAt]);

  const answeredCount = useMemo(
    () => questions.filter((question) => answers[question.id]).length,
    [answers, questions],
  );

  function selectAnswer(optionId: string) {
    if (!currentQuestion || reviewMode) {
      return;
    }

    setAnswers((previous) => ({
      ...previous,
      [currentQuestion.id]: optionId,
    }));

    trackMockEvent({
      name: "mock_question_answered",
      deckSlug: config.linkedDeckSlug,
      mockSlug: config.slug,
      source: `mock:${config.slug}:q:${currentQuestion.id}`,
    });
  }

  function submitExam() {
    if (submittedRef.current) {
      return;
    }
    submittedRef.current = true;
    onComplete({ answers, elapsedSeconds, startedAt });
  }

  if (reviewMode) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-8 sm:px-10">
        <div className="rounded-3xl border border-[#18140f]/10 bg-[#fffaf0] p-6 sm:p-8">
          <h2 className="text-2xl font-semibold tracking-tight">Review before submit</h2>
          <p className="mt-3 text-sm leading-7 text-[#4f493e]">
            {answeredCount} of {questions.length} answered · elapsed {formatClock(elapsedSeconds)} · target{" "}
            {formatClock(durationSeconds)}
          </p>
          {elapsedSeconds >= durationSeconds ? (
            <p className="mt-3 rounded-2xl border border-[#7a2e2e]/20 bg-[#fff0f0] p-3 text-sm leading-7 text-[#7a2e2e]">
              Time is up. Submit now to see your readiness report.
            </p>
          ) : null}
          <div className="mt-6 divide-y divide-[#18140f]/10 rounded-2xl border border-[#18140f]/10">
            {questions.map((question, index) => {
              const selected = answers[question.id];
              const topic =
                config.topics.find((item) => item.id === question.topicId)?.label ?? question.topicId;

              return (
                <button
                  key={question.id}
                  className="flex w-full items-start justify-between gap-4 px-4 py-4 text-left transition hover:bg-[#f7f3ea]"
                  onClick={() => {
                    setCurrentIndex(index);
                    setReviewMode(false);
                    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
                  }}
                  type="button"
                >
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#1f3a5f]">
                      Q{index + 1} · {topic}
                    </p>
                    <div className="mt-2 text-sm leading-7 text-[#18140f]">
                      <QuestionContent text={question.prompt} />
                    </div>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                      selected
                        ? "bg-[#1f3a5f]/10 text-[#1f3a5f]"
                        : "bg-[#18140f]/5 text-[#7a6e5a]"
                    }`}
                  >
                    {selected ? "Answered" : "Blank"}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              className="rounded-full bg-[#18140f] px-6 py-3 text-sm font-semibold text-[#fffaf0] transition hover:bg-[#1f3a5f]"
              onClick={() => setConfirmSubmit(true)}
              type="button"
            >
              Submit mock
            </button>
            <button
              className="rounded-full border border-[#18140f]/20 px-6 py-3 text-sm font-semibold transition hover:border-[#18140f]"
              onClick={() => setReviewMode(false)}
              type="button"
            >
              Back to exam
            </button>
          </div>
        </div>

        {confirmSubmit ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#18140f]/40 p-6">
            <div className="max-w-md rounded-3xl border border-[#18140f]/10 bg-[#fffaf0] p-6 shadow-xl">
              <h3 className="text-xl font-semibold">Submit this attempt?</h3>
              <p className="mt-3 text-sm leading-7 text-[#4f493e]">
                You answered {answeredCount} of {questions.length}. The readiness report will score all
                questions, including blanks.
              </p>
              <div className="mt-6 flex gap-3">
                <button
                  className="rounded-full bg-[#18140f] px-5 py-2.5 text-sm font-semibold text-[#fffaf0]"
                  onClick={submitExam}
                  type="button"
                >
                  Confirm submit
                </button>
                <button
                  className="rounded-full border border-[#18140f]/20 px-5 py-2.5 text-sm font-semibold"
                  onClick={() => setConfirmSubmit(false)}
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  if (!currentQuestion) {
    return null;
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-8 sm:px-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#1f3a5f]">{config.shortTitle}</p>
          <p className="mt-2 text-sm text-[#5f5749]">
            Question {currentIndex + 1} of {questions.length} · {topicLabel}
          </p>
        </div>
        <div className="rounded-full border border-[#18140f]/15 bg-[#fffaf0] px-4 py-2 font-mono text-sm">
          {formatClock(elapsedSeconds)} / {formatClock(durationSeconds)}
        </div>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-[#18140f]/10">
        <div
          className="h-full bg-[#1f3a5f] transition-all"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="mt-8 rounded-3xl border border-[#18140f]/10 bg-[#fffaf0] p-6 sm:p-8">
        <div className="text-xl font-semibold leading-8 text-[#18140f]">
          <QuestionContent text={currentQuestion.prompt} />
        </div>
        {currentQuestion.formula ? (
          <div className="mt-4 overflow-x-auto rounded-2xl border border-[#18140f]/10 bg-[#f7f3ea] p-4 text-base">
            <MathContent text={currentQuestion.formula} />
          </div>
        ) : null}
        <div className="mt-6 space-y-3">
          {currentQuestion.options.map((option) => {
            const selected = answers[currentQuestion.id] === option.id;

            return (
              <button
                key={option.id}
                className={`w-full rounded-2xl border px-4 py-4 text-left text-sm leading-7 transition ${
                  selected
                    ? "border-[#1f3a5f] bg-[#1f3a5f]/5 text-[#18140f]"
                    : "border-[#18140f]/10 bg-[#f7f3ea] hover:border-[#18140f]/25"
                }`}
                onClick={() => selectAnswer(option.id)}
                type="button"
              >
                <span className="mr-3 font-semibold uppercase">{option.id}.</span>
                <MathContent text={option.text} />
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-3">
          <button
            className="rounded-full border border-[#18140f]/20 px-5 py-2.5 text-sm font-semibold disabled:opacity-40"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((value) => Math.max(0, value - 1))}
            type="button"
          >
            Previous
          </button>
          <button
            className="rounded-full border border-[#18140f]/20 px-5 py-2.5 text-sm font-semibold disabled:opacity-40"
            disabled={currentIndex >= questions.length - 1}
            onClick={() => setCurrentIndex((value) => Math.min(questions.length - 1, value + 1))}
            type="button"
          >
            Next
          </button>
        </div>
        <div className="flex gap-3">
          <button
            className="rounded-full border border-[#18140f]/20 px-5 py-2.5 text-sm font-semibold"
            onClick={onExit}
            type="button"
          >
            Exit
          </button>
          <button
            className="rounded-full bg-[#18140f] px-5 py-2.5 text-sm font-semibold text-[#fffaf0] transition hover:bg-[#1f3a5f]"
            onClick={() => setReviewMode(true)}
            type="button"
          >
            Review & submit
          </button>
        </div>
      </div>
    </div>
  );
}
