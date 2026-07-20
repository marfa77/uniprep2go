"use client";

import type { MockSessionMode } from "@/lib/mock-exams/session-mode";

export function formatMockClock(totalSeconds: number) {
  const safe = Math.max(0, totalSeconds);
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

type MockProgressBarProps = {
  current: number;
  total: number;
  label: string;
};

export function MockProgressBar({ current, total, label }: MockProgressBarProps) {
  const percent = total > 0 ? Math.min(100, Math.round((current / total) * 100)) : 0;

  return (
    <div
      aria-label={label}
      aria-valuemax={total}
      aria-valuemin={0}
      aria-valuenow={current}
      className="h-2 overflow-hidden rounded-full bg-[#18140f]/10 sm:h-2.5"
      role="progressbar"
    >
      <div
        className="h-full bg-[#1f3a5f] motion-safe:transition-[width] motion-safe:duration-200 motion-safe:ease-out"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

type MockSessionChromeProps = {
  mode: MockSessionMode;
  shortTitle: string;
  questionIndex: number;
  questionCount: number;
  topicLabel: string;
  answeredCount: number;
  elapsedSeconds: number;
  durationSeconds: number;
};

export function MockSessionChrome({
  mode,
  shortTitle,
  questionIndex,
  questionCount,
  topicLabel,
  answeredCount,
  elapsedSeconds,
  durationSeconds,
}: MockSessionChromeProps) {
  const isLearn = mode === "learn";
  const remaining = Math.max(0, durationSeconds - elapsedSeconds);
  const urgent = !isLearn && durationSeconds > 0 && remaining / durationSeconds <= 0.1;

  return (
    <div className="sticky top-0 z-20 -mx-6 border-b border-[#18140f]/10 bg-[#f7f3ea]/95 px-6 py-4 backdrop-blur-sm sm:-mx-10 sm:px-10">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-[#1f3a5f]/10 px-3 py-1 text-xs font-semibold text-[#1f3a5f]">
              {isLearn ? "Learn · feedback" : "Exam · timed"}
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#5f5749]">
              {shortTitle}
            </span>
          </div>
          <p className="mt-2 text-sm font-medium text-[#18140f]">
            Question {questionIndex + 1} of {questionCount}
            <span className="font-normal text-[#5f5749]"> · {topicLabel}</span>
          </p>
        </div>
        <div
          className={`rounded-full border px-4 py-2 font-mono text-sm tabular-nums ${
            urgent
              ? "border-[#7a2e2e]/40 bg-[#fff0f0] text-[#7a2e2e]"
              : "border-[#18140f]/15 bg-[#fffaf0] text-[#18140f]"
          }`}
        >
          {isLearn
            ? `Untimed · ${answeredCount}/${questionCount} answered`
            : `${formatMockClock(remaining)} left`}
        </div>
      </div>
      <div className="mt-3">
        <MockProgressBar
          current={questionIndex + 1}
          label={`Question ${questionIndex + 1} of ${questionCount}`}
          total={questionCount}
        />
      </div>
    </div>
  );
}

type MockStickyToolbarProps = {
  onExit: () => void;
  onPrevious: () => void;
  previousDisabled: boolean;
  /** Exam mode: jump to next question without submitting. */
  onNext?: () => void;
  nextDisabled?: boolean;
  primaryLabel: string;
  primaryDisabled?: boolean;
  onPrimary: () => void;
};

export function MockStickyToolbar({
  onExit,
  onPrevious,
  previousDisabled,
  onNext,
  nextDisabled,
  primaryLabel,
  primaryDisabled,
  onPrimary,
}: MockStickyToolbarProps) {
  return (
    <div className="sticky bottom-0 z-20 -mx-6 mt-6 border-t border-[#18140f]/10 bg-[#f7f3ea]/95 px-6 py-4 backdrop-blur-sm sm:-mx-10 sm:px-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          className="min-h-12 rounded-full px-4 text-sm font-medium text-[#5f5749] underline-offset-4 transition hover:text-[#18140f] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f3a5f]"
          onClick={onExit}
          type="button"
        >
          Exit
        </button>
        <div className="flex flex-wrap items-center gap-2">
          <button
            className="inline-flex min-h-12 items-center rounded-full border border-[#18140f]/20 px-5 text-sm font-semibold transition hover:border-[#18140f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f3a5f] disabled:opacity-40"
            disabled={previousDisabled}
            onClick={onPrevious}
            type="button"
          >
            Previous
          </button>
          {onNext ? (
            <button
              className="inline-flex min-h-12 items-center rounded-full border border-[#18140f]/20 px-5 text-sm font-semibold transition hover:border-[#18140f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f3a5f] disabled:opacity-40"
              disabled={nextDisabled}
              onClick={onNext}
              type="button"
            >
              Next
            </button>
          ) : null}
          <button
            className="inline-flex min-h-12 items-center rounded-full bg-[#18140f] px-6 text-sm font-semibold text-[#fffaf0] transition hover:bg-[#1f3a5f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f3a5f] disabled:opacity-40"
            disabled={primaryDisabled}
            onClick={onPrimary}
            type="button"
          >
            {primaryLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
