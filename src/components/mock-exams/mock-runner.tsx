"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { MockExamConfig, MockQuestion } from "@/lib/mock-exams/types";
import {
  canChangeLearnAnswer,
  learnOptionFeedback,
  type MockSessionMode,
} from "@/lib/mock-exams/session-mode";
import { formulaBelongsOnFront } from "@/lib/mock-exams/formula-placement";
import { FormulaBlock } from "./formula-block";
import { MathContent } from "./math-content";
import { QuestionContent } from "./question-content";
import { trackMockEvent } from "./mock-analytics";
import {
  formatMockClock,
  MockSessionChrome,
  MockStickyToolbar,
} from "./mock-session-chrome";

type MockRunnerProps = {
  config: MockExamConfig;
  questions: MockQuestion[];
  mode?: MockSessionMode;
  onComplete: (input: {
    answers: Record<string, string>;
    elapsedSeconds: number;
    startedAt: string;
  }) => void;
  onExit: () => void;
};

function learnOptionClass(tone: ReturnType<typeof learnOptionFeedback>, selected: boolean) {
  switch (tone) {
    case "correct":
      return "border-[#2f5d3a] bg-[#e7f3ea] text-[#1f3d28]";
    case "incorrect":
      return "border-[#7a2e2e] bg-[#fff0f0] text-[#5c2222]";
    default:
      return selected
        ? "border-[#1f3a5f] bg-[#1f3a5f]/5 text-[#18140f]"
        : "border-[#18140f]/10 bg-[#f7f3ea] hover:border-[#18140f]/25";
  }
}

function learnOptionPrefix(tone: ReturnType<typeof learnOptionFeedback>) {
  if (tone === "correct") return "Correct · ";
  if (tone === "incorrect") return "Your answer · ";
  return "";
}

export function MockRunner({
  config,
  questions,
  mode = "exam",
  onComplete,
  onExit,
}: MockRunnerProps) {
  const isLearn = mode === "learn";
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [revealedByQuestion, setRevealedByQuestion] = useState<Record<string, boolean>>({});
  const [reviewMode, setReviewMode] = useState(false);
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const [startedAt] = useState(() => new Date().toISOString());
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const submittedRef = useRef(false);
  const sessionAnchorRef = useRef<HTMLDivElement>(null);

  const durationSeconds = config.durationMinutes * 60;
  const currentQuestion = questions[currentIndex];
  const topicLabel =
    config.topics.find((topic) => topic.id === currentQuestion?.topicId)?.label ?? "Topic";
  const currentRevealed = currentQuestion
    ? Boolean(revealedByQuestion[currentQuestion.id])
    : false;
  const selectedOptionId = currentQuestion ? (answers[currentQuestion.id] ?? null) : null;

  function scrollSessionIntoView() {
    const node = sessionAnchorRef.current;
    if (!node) {
      return;
    }
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    node.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  }

  // Keep the question card in view — never jump to the page hero above the runner.
  useEffect(() => {
    scrollSessionIntoView();
  }, [currentIndex, reviewMode]);

  useEffect(() => {
    if (isLearn) {
      const timer = window.setInterval(() => {
        setElapsedSeconds((value) => value + 1);
      }, 1000);
      return () => window.clearInterval(timer);
    }

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
  }, [answers, durationSeconds, isLearn, onComplete, startedAt]);

  const answeredCount = useMemo(
    () => questions.filter((question) => answers[question.id]).length,
    [answers, questions],
  );

  function selectAnswer(optionId: string) {
    if (!currentQuestion || reviewMode) {
      return;
    }

    if (isLearn && !canChangeLearnAnswer(currentRevealed)) {
      return;
    }

    setAnswers((previous) => ({
      ...previous,
      [currentQuestion.id]: optionId,
    }));

    if (isLearn) {
      setRevealedByQuestion((previous) => ({
        ...previous,
        [currentQuestion.id]: true,
      }));
    }

    trackMockEvent({
      name: "mock_question_answered",
      deckSlug: config.linkedDeckSlug,
      mockSlug: config.slug,
      source: `mock:${config.slug}:${mode}:q:${currentQuestion.id}`,
    });
  }

  function submitExam() {
    if (submittedRef.current) {
      return;
    }
    submittedRef.current = true;
    onComplete({ answers, elapsedSeconds, startedAt });
  }

  function goNextOrFinish() {
    if (currentIndex >= questions.length - 1) {
      submitExam();
      return;
    }
    setCurrentIndex((value) => Math.min(questions.length - 1, value + 1));
  }

  if (reviewMode && !isLearn) {
    return (
      <div ref={sessionAnchorRef} className="mx-auto max-w-4xl px-6 py-8 sm:px-10">
        <div className="rounded-3xl border border-[#18140f]/10 bg-[#fffaf0] p-6 sm:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#1f3a5f]">Exam · review</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">Review before submit</h2>
          <p className="mt-3 text-sm leading-7 text-[#4f493e]">
            {answeredCount} of {questions.length} answered · elapsed {formatMockClock(elapsedSeconds)} · target{" "}
            {formatMockClock(durationSeconds)}
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
                  className="flex min-h-14 w-full items-start justify-between gap-4 px-4 py-4 text-left transition hover:bg-[#f7f3ea] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#1f3a5f]"
                  onClick={() => {
                    setCurrentIndex(index);
                    setReviewMode(false);
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
              className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-[#18140f] px-6 text-sm font-semibold text-[#fffaf0] transition hover:bg-[#1f3a5f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f3a5f] sm:flex-none"
              onClick={() => setConfirmSubmit(true)}
              type="button"
            >
              Submit mock
            </button>
            <button
              className="inline-flex min-h-12 items-center rounded-full border border-[#18140f]/20 px-6 text-sm font-semibold transition hover:border-[#18140f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f3a5f]"
              onClick={() => setReviewMode(false)}
              type="button"
            >
              Back to exam
            </button>
          </div>
        </div>

        {confirmSubmit ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#18140f]/40 p-6">
            <div
              aria-modal="true"
              className="w-full max-w-md rounded-3xl border border-[#18140f]/10 bg-[#fffaf0] p-6 shadow-xl"
              role="dialog"
            >
              <h3 className="text-xl font-semibold">Submit this attempt?</h3>
              <p className="mt-3 text-sm leading-7 text-[#4f493e]">
                You answered {answeredCount} of {questions.length}. The readiness report will score all
                questions, including blanks.
              </p>
              <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                <button
                  className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-[#18140f] px-5 text-sm font-semibold text-[#fffaf0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f3a5f]"
                  onClick={submitExam}
                  type="button"
                >
                  Confirm submit
                </button>
                <button
                  className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full border border-[#18140f]/20 px-5 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f3a5f]"
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

  const distractorExplanation =
    isLearn && currentRevealed && selectedOptionId && selectedOptionId !== currentQuestion.correctOptionId
      ? (currentQuestion.distractorExplanations[selectedOptionId] ?? null)
      : null;
  const isCorrect =
    isLearn && currentRevealed && selectedOptionId === currentQuestion.correctOptionId;
  const correctOption =
    isLearn && currentRevealed
      ? currentQuestion.options.find((option) => option.id === currentQuestion.correctOptionId)
      : null;

  return (
    <div ref={sessionAnchorRef} className="mx-auto max-w-4xl scroll-mt-4 px-6 pb-4 pt-2 sm:px-10">
      <MockSessionChrome
        answeredCount={answeredCount}
        durationSeconds={durationSeconds}
        elapsedSeconds={elapsedSeconds}
        mode={mode}
        questionCount={questions.length}
        questionIndex={currentIndex}
        shortTitle={config.shortTitle}
        topicLabel={topicLabel}
      />

      <div className="mt-6 rounded-3xl border border-[#18140f]/10 bg-[#fffaf0] p-6 sm:p-8">
        <div className="text-xl font-semibold leading-8 text-[#18140f]">
          <QuestionContent text={currentQuestion.prompt} />
        </div>
        {formulaBelongsOnFront(currentQuestion) ? (
          <div className="mt-4 overflow-x-auto rounded-2xl border border-[#18140f]/10 bg-[#f7f3ea] p-4 text-base">
            <FormulaBlock text={currentQuestion.formula!} />
          </div>
        ) : null}
        <div
          aria-label="Answer choices"
          className="mt-6 space-y-3"
          role="radiogroup"
        >
          {currentQuestion.options.map((option) => {
            const selected = selectedOptionId === option.id;
            const tone = isLearn
              ? learnOptionFeedback({
                  optionId: option.id,
                  correctOptionId: currentQuestion.correctOptionId,
                  selectedOptionId,
                  revealed: currentRevealed,
                })
              : "neutral";
            const prefix = isLearn && currentRevealed ? learnOptionPrefix(tone) : "";

            return (
              <button
                key={option.id}
                aria-checked={selected}
                className={`flex min-h-12 w-full items-start rounded-2xl border px-4 py-4 text-left text-sm leading-7 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f3a5f] ${
                  isLearn
                    ? learnOptionClass(tone, selected)
                    : selected
                      ? "border-[#1f3a5f] bg-[#1f3a5f]/5 text-[#18140f]"
                      : "border-[#18140f]/10 bg-[#f7f3ea] hover:border-[#18140f]/25"
                } ${isLearn && currentRevealed ? "cursor-default" : ""}`}
                disabled={isLearn && currentRevealed}
                onClick={() => selectAnswer(option.id)}
                role="radio"
                type="button"
              >
                <span className="mr-3 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-current/20 text-xs font-bold uppercase">
                  {option.id}
                </span>
                <span>
                  {prefix ? <span className="font-semibold">{prefix}</span> : null}
                  <MathContent text={option.text} />
                </span>
              </button>
            );
          })}
        </div>

        {isLearn && currentRevealed ? (
          <div
            aria-live="polite"
            className={`mt-6 space-y-4 rounded-2xl border p-5 text-sm leading-7 ${
              isCorrect
                ? "border-[#2f5d3a]/30 bg-[#e7f3ea] text-[#1f3d28]"
                : "border-[#7a2e2e]/25 bg-[#fff0f0] text-[#5c2222]"
            }`}
            role="status"
          >
            <p className="text-base font-semibold">{isCorrect ? "Correct" : "Incorrect"}</p>
            {!isCorrect && correctOption ? (
              <p className="text-[#4f493e]">
                <span className="font-medium text-[#18140f]">Correct answer:</span>{" "}
                <span className="font-semibold uppercase">{correctOption.id}.</span>{" "}
                <MathContent text={correctOption.text} />
              </p>
            ) : null}
            <div>
              <p className="font-medium text-[#18140f]">Why this is correct</p>
              <p className="mt-1.5 text-[#4f493e]">
                <MathContent text={currentQuestion.explanation} />
              </p>
            </div>
            {distractorExplanation ? (
              <div>
                <p className="font-medium text-[#18140f]">Why your answer was wrong</p>
                <p className="mt-1.5 text-[#5f5749]">
                  <MathContent text={distractorExplanation} />
                </p>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      <MockStickyToolbar
        onExit={onExit}
        onNext={
          isLearn
            ? undefined
            : () => setCurrentIndex((value) => Math.min(questions.length - 1, value + 1))
        }
        nextDisabled={!isLearn && currentIndex >= questions.length - 1}
        onPrevious={() => setCurrentIndex((value) => Math.max(0, value - 1))}
        previousDisabled={currentIndex === 0}
        primaryDisabled={isLearn ? !currentRevealed : false}
        primaryLabel={
          isLearn
            ? currentIndex >= questions.length - 1
              ? "See report"
              : "Next"
            : "Review & submit"
        }
        onPrimary={isLearn ? goNextOrFinish : () => setReviewMode(true)}
      />
    </div>
  );
}
