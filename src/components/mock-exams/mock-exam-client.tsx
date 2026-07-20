"use client";

import Link from "next/link";
import { getCatalogDeckBySlug } from "@/lib/decks";
import type { MockAccessState, MockExamConfig, MockQuestion, MockReport } from "@/lib/mock-exams/types";
import { getMockCta } from "@/lib/mock-exams/access";
import { LEARN_PASS_PRICE_USD } from "@/lib/mock-exams/learn-pass";
import type { MockSessionMode } from "@/lib/mock-exams/session-mode";
import {
  buildMockReport,
  createAttemptSeed,
  selectSessionQuestions,
  shuffleQuestions,
} from "@/lib/mock-exams/scoring";
import { LearnPassPaywall } from "./learn-pass-paywall";
import { MockInterestCta } from "./mock-interest-cta";
import { MockReportPanel } from "./mock-report";
import type { LinkedDeckCheckout } from "./mock-report-handoff";
import { MockRunner } from "./mock-runner";
import { trackMockEvent } from "./mock-analytics";
import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";

type Screen = "landing" | "exam" | "results";

function MockFocusShell({ children }: { children: ReactNode }) {
  return (
    <div className="fixed inset-0 z-40 overflow-y-auto overscroll-contain bg-[#f7f3ea]">
      <div className="mx-auto min-h-full w-full max-w-4xl">{children}</div>
    </div>
  );
}

type MockExamClientProps = {
  config: MockExamConfig;
  questions: MockQuestion[];
  accessState: MockAccessState;
  linkedCheckout: LinkedDeckCheckout | null;
  runnable: boolean;
  /** From `?mode=learn`; default exam. */
  initialMode?: MockSessionMode;
  /** Server-only kill switch — when false, Learn is free and paywall is never shown. */
  learnPassEnabled?: boolean;
};

function formatDuration(minutes: number) {
  return `${minutes} minutes`;
}

function scrollToTop() {
  window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
}

const examBrief = [
  "Timed diagnostic — match real exam pacing",
  "No answers shown until you submit",
  "Full topic report + repair plan at the end",
] as const;

const learnBriefFree = [
  "Untimed — focus on understanding each item",
  "Instant correct/incorrect + explanations",
  "Same full topic report when you finish",
] as const;

const learnBriefPaid = [
  `$${LEARN_PASS_PRICE_USD} / pass · untimed with instant explanations`,
  "Correct/incorrect + why after each answer",
  "Same full topic report when you finish",
] as const;

export function MockExamClient({
  config,
  questions,
  accessState,
  linkedCheckout,
  runnable,
  initialMode = "exam",
  learnPassEnabled = false,
}: MockExamClientProps) {
  const [screen, setScreen] = useState<Screen>("landing");
  const [selectedMode, setSelectedMode] = useState<MockSessionMode>(
    initialMode === "learn" ? "learn" : "exam",
  );
  const [sessionMode, setSessionMode] = useState<MockSessionMode>(initialMode);
  const [attemptSeed, setAttemptSeed] = useState<string>("");
  const [report, setReport] = useState<MockReport | null>(null);
  const [deepLinkConsumed, setDeepLinkConsumed] = useState(false);
  const [learnRemaining, setLearnRemaining] = useState(0);
  const [learnStatusLoaded, setLearnStatusLoaded] = useState(!learnPassEnabled);
  const [learnBusy, setLearnBusy] = useState(false);
  const [learnError, setLearnError] = useState<string | null>(null);
  const cta = getMockCta(accessState);

  const refreshLearnStatus = useCallback(async () => {
    if (!learnPassEnabled) {
      setLearnStatusLoaded(true);
      return;
    }
    try {
      const res = await fetch("/api/mock-exams/learn/status", { cache: "no-store" });
      const data = (await res.json().catch(() => ({}))) as { remaining?: number };
      setLearnRemaining(typeof data.remaining === "number" ? data.remaining : 0);
    } catch {
      setLearnRemaining(0);
    } finally {
      setLearnStatusLoaded(true);
    }
  }, [learnPassEnabled]);

  useEffect(() => {
    trackMockEvent({
      name: "mock_landing_view",
      deckSlug: config.linkedDeckSlug,
      mockSlug: config.slug,
      source: `mock:${config.slug}:landing`,
    });
  }, [config.linkedDeckSlug, config.slug]);

  useEffect(() => {
    void refreshLearnStatus();
  }, [refreshLearnStatus]);

  // Focus shell covers the SEO page — lock background scroll while in session/results.
  useEffect(() => {
    if (screen === "landing") {
      return;
    }
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [screen]);

  const enterSession = useCallback(
    (mode: MockSessionMode, source: string) => {
      const seed = createAttemptSeed();
      setSessionMode(mode);
      setSelectedMode(mode);
      setAttemptSeed(seed);
      setReport(null);
      setScreen("exam");
      trackMockEvent({
        name: "mock_started",
        deckSlug: config.linkedDeckSlug,
        mockSlug: config.slug,
        source,
      });
    },
    [config.linkedDeckSlug, config.slug],
  );

  const consumeAndStartLearn = useCallback(
    async (source: string) => {
      setLearnBusy(true);
      setLearnError(null);
      try {
        const res = await fetch("/api/mock-exams/learn/start", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mockSlug: config.slug }),
        });
        const data = (await res.json().catch(() => ({}))) as {
          ok?: boolean;
          message?: string;
          remaining?: number;
        };
        if (!res.ok || !data.ok) {
          setLearnRemaining(typeof data.remaining === "number" ? data.remaining : 0);
          setLearnError(data.message || "Buy or redeem a Learn Pass to continue.");
          setSelectedMode("learn");
          setScreen("landing");
          return false;
        }
        const remaining = typeof data.remaining === "number" ? data.remaining : 0;
        setLearnRemaining(remaining);
        trackMockEvent({
          name: "learn_credit_consumed",
          deckSlug: config.linkedDeckSlug,
          mockSlug: config.slug,
          source: `mock:${config.slug}:learn:consumed:left:${remaining}`,
        });
        enterSession("learn", source);
        return true;
      } catch {
        setLearnError("Could not start Learn mode. Try again.");
        return false;
      } finally {
        setLearnBusy(false);
      }
    },
    [config.linkedDeckSlug, config.slug, enterSession],
  );

  useEffect(() => {
    if (!runnable || deepLinkConsumed || initialMode !== "learn" || !learnStatusLoaded) {
      return;
    }
    setDeepLinkConsumed(true);
    setSelectedMode("learn");
    if (!learnPassEnabled) {
      enterSession("learn", `mock:${config.slug}:start:learn:deeplink`);
      return;
    }
    if (learnRemaining > 0) {
      void consumeAndStartLearn(`mock:${config.slug}:start:learn:deeplink`);
    }
  }, [
    consumeAndStartLearn,
    config.slug,
    deepLinkConsumed,
    enterSession,
    initialMode,
    learnPassEnabled,
    learnRemaining,
    learnStatusLoaded,
    runnable,
  ]);

  const shuffledQuestions = useMemo(() => {
    if (!attemptSeed) {
      return questions;
    }

    const sessionQuestions = selectSessionQuestions(questions, config, attemptSeed);
    return shuffleQuestions(sessionQuestions, attemptSeed);
  }, [attemptSeed, config, questions]);

  async function startMock(mode: MockSessionMode) {
    if (mode === "exam" || !learnPassEnabled) {
      enterSession(mode, `mock:${config.slug}:start:${mode}`);
      return;
    }
    if (learnRemaining <= 0) {
      setSelectedMode("learn");
      setLearnError("Buy or redeem a Learn Pass to start Learn mode.");
      return;
    }
    await consumeAndStartLearn(`mock:${config.slug}:start:learn`);
  }

  function exitExam() {
    setScreen("landing");
    void refreshLearnStatus();
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
    void refreshLearnStatus();

    trackMockEvent({
      name: "mock_completed",
      deckSlug: config.linkedDeckSlug,
      mockSlug: config.slug,
      source: `mock:${config.slug}:complete:${sessionMode}`,
    });
    trackMockEvent({
      name: "mock_result_view",
      deckSlug: config.linkedDeckSlug,
      mockSlug: config.slug,
      source: `mock:${config.slug}:${sessionMode}:verdict:${nextReport.verdict.replace(/\s+/g, "_").toLowerCase()}`,
    });

    if (nextReport.verdict === "PASS" || nextReport.verdict === "READINESS PASS") {
      trackMockEvent({
        name: "mock_pass_verdict",
        deckSlug: config.linkedDeckSlug,
        mockSlug: config.slug,
        source: `mock:${config.slug}:${sessionMode}:pass`,
      });
    } else {
      trackMockEvent({
        name: "mock_no_pass_verdict",
        deckSlug: config.linkedDeckSlug,
        mockSlug: config.slug,
        source: `mock:${config.slug}:${sessionMode}:no_pass`,
      });
    }
  }

  if (screen === "exam" && attemptSeed) {
    return (
      <MockFocusShell>
        <MockRunner
          config={config}
          mode={sessionMode}
          questions={shuffledQuestions}
          onComplete={completeExam}
          onExit={exitExam}
        />
      </MockFocusShell>
    );
  }

  if (screen === "results" && report) {
    const linkedDeck = getCatalogDeckBySlug(config.linkedDeckSlug);
    const hideInterestCta = Boolean(linkedCheckout?.checkoutUrl);

    return (
      <MockFocusShell>
        <div className="space-y-6 px-4 py-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:space-y-8 sm:px-6 sm:py-6">
          <MockReportPanel
            config={config}
            linkedCheckout={linkedCheckout}
            report={report}
            sessionMode={sessionMode}
          />
          {cta?.interestCaptureEnabled && !hideInterestCta ? (
            <MockInterestCta config={config} cta={cta} report={report} />
          ) : null}
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {linkedCheckout?.checkoutUrl ? (
              <a
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#18140f] px-6 text-sm font-semibold text-[#fffaf0] transition hover:bg-[#1f3a5f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f3a5f]"
                href={linkedCheckout.checkoutUrl}
                onClick={() =>
                  trackMockEvent({
                    name: "mock_deck_cta_click",
                    deckSlug: config.linkedDeckSlug,
                    mockSlug: config.slug,
                  })
                }
                rel="noopener noreferrer"
                target="_blank"
              >
                Buy Anki deck on Gumroad
              </a>
            ) : null}
            <button
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#18140f]/20 px-6 text-sm font-semibold transition hover:border-[#18140f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f3a5f] disabled:opacity-50"
              disabled={learnBusy}
              onClick={() => void startMock(sessionMode)}
              type="button"
            >
              Retake {sessionMode === "learn" ? "learn mode" : "exam"}
            </button>
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#18140f]/20 px-6 text-sm font-semibold transition hover:border-[#18140f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f3a5f]"
              href={`/decks/${config.linkedDeckSlug}`}
              onClick={() =>
                trackMockEvent({
                  name: "mock_deck_cta_click",
                  deckSlug: config.linkedDeckSlug,
                  mockSlug: config.slug,
                })
              }
            >
              {linkedDeck?.checkoutUrl ? "Deck details" : "Join Anki deck waitlist"}
            </Link>
          </div>
          {learnPassEnabled && sessionMode === "learn" && learnRemaining <= 0 ? (
            <LearnPassPaywall
              deckSlug={config.linkedDeckSlug}
              mockSlug={config.slug}
              remaining={learnRemaining}
              onRedeemed={(remaining) => {
                setLearnRemaining(remaining);
                setLearnError(null);
              }}
            />
          ) : null}
        </div>
      </MockFocusShell>
    );
  }

  const brief = selectedMode === "learn" ? (learnPassEnabled ? learnBriefPaid : learnBriefFree) : examBrief;
  const timingLabel =
    selectedMode === "learn" ? "Untimed · instant feedback" : formatDuration(config.durationMinutes);
  const showLearnPaywall = learnPassEnabled && selectedMode === "learn" && learnRemaining <= 0;

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
            <dt className="font-mono text-xs uppercase tracking-[0.2em] text-[#1f3a5f]">
              {selectedMode === "learn" ? "Learn mode" : "Timing"}
            </dt>
            <dd className="mt-1 text-lg font-semibold">{timingLabel}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-[0.2em] text-[#1f3a5f]">Pass threshold</dt>
            <dd className="mt-1 text-lg font-semibold">{config.passRule.passPercent}%</dd>
          </div>
        </dl>

        <div className="mt-5 border-t border-[#18140f]/10 pt-5">
          {runnable ? (
            <div className="space-y-4">
              <div
                aria-label="Practice mode"
                className="grid gap-2 rounded-2xl border border-[#18140f]/10 bg-[#f7f3ea] p-1.5 sm:grid-cols-2"
                role="radiogroup"
              >
                <button
                  aria-checked={selectedMode === "exam"}
                  className={`min-h-14 rounded-xl px-4 py-3 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f3a5f] ${
                    selectedMode === "exam"
                      ? "bg-[#18140f] text-[#fffaf0]"
                      : "text-[#18140f] hover:bg-[#fffaf0]"
                  }`}
                  onClick={() => {
                    setSelectedMode("exam");
                    setLearnError(null);
                  }}
                  role="radio"
                  type="button"
                >
                  <span className="block text-sm font-semibold">Exam mode</span>
                  <span
                    className={`mt-1 block text-xs leading-5 ${
                      selectedMode === "exam" ? "text-[#fffaf0]/80" : "text-[#5f5749]"
                    }`}
                  >
                    Timed diagnostic, feedback after submit
                  </span>
                </button>
                <button
                  aria-checked={selectedMode === "learn"}
                  className={`min-h-14 rounded-xl px-4 py-3 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f3a5f] ${
                    selectedMode === "learn"
                      ? "bg-[#18140f] text-[#fffaf0]"
                      : "text-[#18140f] hover:bg-[#fffaf0]"
                  }`}
                  onClick={() => setSelectedMode("learn")}
                  role="radio"
                  type="button"
                >
                  <span className="block text-sm font-semibold">Learn mode</span>
                  <span
                    className={`mt-1 block text-xs leading-5 ${
                      selectedMode === "learn" ? "text-[#fffaf0]/80" : "text-[#5f5749]"
                    }`}
                  >
                    Instant explanations after each answer
                  </span>
                </button>
              </div>

              <ul className="space-y-1.5 text-sm leading-6 text-[#5f5749]">
                {brief.map((item) => (
                  <li key={item}>· {item}</li>
                ))}
              </ul>

              {learnPassEnabled && selectedMode === "learn" && learnRemaining > 0 ? (
                <p className="text-sm font-medium text-[#1f3d28]" aria-live="polite">
                  {learnRemaining} Learn pass{learnRemaining === 1 ? "" : "es"} left
                </p>
              ) : null}

              {showLearnPaywall ? (
                <LearnPassPaywall
                  deckSlug={config.linkedDeckSlug}
                  mockSlug={config.slug}
                  remaining={learnRemaining}
                  onRedeemed={(remaining) => {
                    setLearnRemaining(remaining);
                    setLearnError(null);
                  }}
                />
              ) : (
                <button
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#18140f] px-6 text-sm font-semibold text-[#fffaf0] transition hover:bg-[#1f3a5f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f3a5f] disabled:opacity-50 sm:w-auto"
                  disabled={learnBusy}
                  onClick={() => void startMock(selectedMode)}
                  type="button"
                >
                  {learnBusy
                    ? "Starting…"
                    : selectedMode === "learn"
                      ? "Start learn mode"
                      : "Start timed exam"}
                </button>
              )}

              {learnError ? (
                <p className="text-sm text-[#7a2e2e]" role="alert">
                  {learnError}
                </p>
              ) : null}
            </div>
          ) : cta?.interestCaptureEnabled ? (
            <MockInterestCta compact config={config} cta={cta} />
          ) : (
            <p className="text-sm font-medium text-[#5f5749]">
              Question bank loading — check back soon
            </p>
          )}
        </div>

        <details className="group mt-4">
          <summary className="cursor-pointer list-none text-sm font-medium text-[#1f3a5f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f3a5f] [&::-webkit-details-marker]:hidden">
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
