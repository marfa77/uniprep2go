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
    <div className="sticky top-0 z-20 border-b border-[#18140f]/10 bg-[#f7f3ea]/95 px-4 py-3 backdrop-blur-sm pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6 sm:py-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-[#1f3a5f]/10 px-2.5 py-1 text-[11px] font-semibold text-[#1f3a5f] sm:px-3 sm:text-xs">
              {isLearn ? "Learn" : "Exam"}
            </span>
            <span className="truncate font-mono text-[11px] uppercase tracking-[0.18em] text-[#5f5749] sm:text-xs sm:tracking-[0.2em]">
              {shortTitle}
            </span>
          </div>
          <p className="mt-1.5 text-sm font-medium leading-5 text-[#18140f] sm:mt-2 sm:leading-6">
            Q{questionIndex + 1}/{questionCount}
            <span className="font-normal text-[#5f5749]">
              {" · "}
              <span className="line-clamp-1 sm:inline">{topicLabel}</span>
            </span>
          </p>
        </div>
        <div
          className={`shrink-0 rounded-full border px-3 py-1.5 font-mono text-xs tabular-nums sm:px-4 sm:py-2 sm:text-sm ${
            urgent
              ? "border-[#7a2e2e]/40 bg-[#fff0f0] text-[#7a2e2e]"
              : "border-[#18140f]/15 bg-[#fffaf0] text-[#18140f]"
          }`}
        >
          {isLearn
            ? `${answeredCount}/${questionCount}`
            : formatMockClock(remaining)}
        </div>
      </div>
      <div className="mt-2.5 sm:mt-3">
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
  const navButtonClass =
    "inline-flex min-h-12 items-center justify-center rounded-full border border-[#18140f]/20 px-3 text-sm font-semibold transition hover:border-[#18140f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f3a5f] disabled:opacity-40 sm:px-5";
  const primaryButtonClass =
    "inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#18140f] px-4 text-sm font-semibold text-[#fffaf0] transition hover:bg-[#1f3a5f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f3a5f] disabled:opacity-40 sm:w-auto sm:px-6";

  return (
    <div className="sticky bottom-0 z-20 border-t border-[#18140f]/10 bg-[#f7f3ea]/95 px-4 py-3 backdrop-blur-sm pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-6 sm:py-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <button
          className="min-h-10 self-start rounded-full px-1 text-sm font-medium text-[#5f5749] underline-offset-4 transition hover:text-[#18140f] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f3a5f] sm:min-h-12 sm:px-4"
          onClick={onExit}
          type="button"
        >
          Exit
        </button>

        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:justify-end">
          <button
            className={navButtonClass}
            disabled={previousDisabled}
            onClick={onPrevious}
            type="button"
          >
            Previous
          </button>
          {onNext ? (
            <button
              className={navButtonClass}
              disabled={nextDisabled}
              onClick={onNext}
              type="button"
            >
              Next
            </button>
          ) : null}
          <button
            className={`${primaryButtonClass} ${onNext ? "col-span-2" : ""}`}
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
