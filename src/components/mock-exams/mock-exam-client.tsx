"use client";

import Link from "next/link";
import type { MockAccessState, MockExamConfig, MockQuestion, MockReport } from "@/lib/mock-exams/types";
import { getMockCta } from "@/lib/mock-exams/mock-cta";
import {
  MOCK_PASS_ATTEMPTS,
  MOCK_PASS_PRICE_USD,
  decideMockStart,
} from "@/lib/mock-exams/mock-pass";
import {
  browserStorage,
  markFreeAttemptUsed,
  readFreeAttempt,
  type FreeAttemptRecord,
} from "@/lib/mock-exams/free-attempt";
import type { MockSessionMode } from "@/lib/mock-exams/session-mode";
import {
  buildMockReport,
  createAttemptSeed,
  selectSessionQuestions,
  shuffleQuestions,
} from "@/lib/mock-exams/scoring";
import { TrackedCheckoutLink } from "@/components/funnel-tracker";
import { getMockRepairCheckoutCtaLabel } from "@/lib/checkout-pricing";
import { MockPassPaywall } from "./mock-pass-paywall";
import { MockInterestCta } from "./mock-interest-cta";
import { MockReportPanel } from "./mock-report";
import type { LinkedDeckCheckout } from "./mock-report-handoff";
import type { MockCompanionCheckout } from "./mock-companion-decks-panel";
import { MockRunner } from "./mock-runner";
import { trackMockEvent } from "./mock-analytics";
import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { parseMockSessionMode } from "@/lib/mock-exams/session-mode";

type Screen = "landing" | "exam" | "results";

function MockFocusShell({ children }: { children: ReactNode }) {
  return (
    <div className="fixed inset-0 z-40 overflow-y-auto overscroll-contain bg-[#f7f3ea]">
      <div className="mx-auto min-h-full w-full max-w-4xl">{children}</div>
    </div>
  );
}

export type MockExamClientProps = {
  config: MockExamConfig;
  questions: MockQuestion[];
  accessState: MockAccessState;
  linkedCheckout: LinkedDeckCheckout | null;
  companionCheckouts?: MockCompanionCheckout[];
  /** Resolved on the server — avoids pulling the full deck catalog into the client bundle. */
  linkedDeckShortName?: string;
  runnable: boolean;
  /** From `?mode=learn`; default exam. */
  initialMode?: MockSessionMode;
  /** Server kill switch (MOCK_PAYWALL=off) — when false every attempt is free. */
  paywallEnabled?: boolean;
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

const learnBrief = [
  "Untimed — focus on understanding each item",
  "Instant correct/incorrect + explanations",
  "Same full topic report when you finish",
] as const;

type PassStatus = { loaded: boolean; hasPass: boolean; remaining: number };

/** Sibling length options for the SIE pair (full vs quick). */
const mockLengthAlternates: Partial<
  Record<string, { href: string; label: string }>
> = {
  "sie-full-mock": {
    href: "/mock-exams/sie-quick-diagnostic",
    label: "Prefer 25 questions? Start the 35-minute quick diagnostic →",
  },
  "sie-quick-diagnostic": {
    href: "/mock-exams/sie-full-mock",
    label: "Want the full exam feel? Take the 75-question / 105-minute mock →",
  },
};

export function MockExamClient({
  config,
  questions,
  accessState,
  linkedCheckout,
  companionCheckouts = [],
  linkedDeckShortName,
  runnable,
  initialMode = "exam",
  paywallEnabled = false,
}: MockExamClientProps) {
  const searchParams = useSearchParams();
  const modeFromUrl = parseMockSessionMode(searchParams.get("mode"));
  const resolvedInitialMode = initialMode === "learn" || modeFromUrl === "learn" ? "learn" : "exam";
  const [screen, setScreen] = useState<Screen>("landing");
  const [selectedMode, setSelectedMode] = useState<MockSessionMode>(resolvedInitialMode);
  const [sessionMode, setSessionMode] = useState<MockSessionMode>(resolvedInitialMode);
  const [attemptSeed, setAttemptSeed] = useState<string>("");
  const [report, setReport] = useState<MockReport | null>(null);
  const [freeAttempt, setFreeAttempt] = useState<FreeAttemptRecord | null>(null);
  const [accessHydrated, setAccessHydrated] = useState(false);
  const [pass, setPass] = useState<PassStatus>({ loaded: !paywallEnabled, hasPass: false, remaining: 0 });
  const [startBusy, setStartBusy] = useState(false);
  const [startError, setStartError] = useState<string | null>(null);
  const [retakePaywallOpen, setRetakePaywallOpen] = useState(false);
  const cta = getMockCta(accessState);

  const refreshPassStatus = useCallback(async () => {
    if (!paywallEnabled) {
      return;
    }
    try {
      const res = await fetch("/api/mock-exams/pass/status", { cache: "no-store" });
      const data = (await res.json().catch(() => ({}))) as { hasPass?: boolean; remaining?: number };
      setPass({
        loaded: true,
        hasPass: Boolean(data.hasPass),
        remaining: typeof data.remaining === "number" ? data.remaining : 0,
      });
    } catch {
      setPass((current) => ({ ...current, loaded: true }));
    }
  }, [paywallEnabled]);

  useEffect(() => {
    trackMockEvent({
      name: "mock_landing_view",
      deckSlug: config.linkedDeckSlug,
      mockSlug: config.slug,
      source: `mock:${config.slug}:landing`,
    });
  }, [config.linkedDeckSlug, config.slug]);

  useEffect(() => {
    setFreeAttempt(readFreeAttempt(browserStorage()));
    setAccessHydrated(true);
    void refreshPassStatus();
  }, [refreshPassStatus]);

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
      setRetakePaywallOpen(false);
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

  const shuffledQuestions = useMemo(() => {
    if (!attemptSeed) {
      return questions;
    }

    const sessionQuestions = selectSessionQuestions(questions, config, attemptSeed);
    return shuffleQuestions(sessionQuestions, attemptSeed);
  }, [attemptSeed, config, questions]);

  const startDecision = decideMockStart({
    paywallEnabled,
    freeAttemptUsed: Boolean(freeAttempt),
    remaining: pass.remaining,
  });
  const needsPaywall = accessHydrated && pass.loaded && startDecision === "paywall";

  function openPaywall(placement: "landing" | "retake") {
    if (placement === "retake") {
      setRetakePaywallOpen(true);
      window.requestAnimationFrame(() =>
        document.getElementById("mock-pass")?.scrollIntoView({ behavior: "smooth", block: "start" }),
      );
    }
  }

  async function startMock(mode: MockSessionMode, placement: "landing" | "retake") {
    setStartError(null);
    const storage = browserStorage();
    const recorded = readFreeAttempt(storage);
    const decision = decideMockStart({
      paywallEnabled,
      freeAttemptUsed: Boolean(recorded),
      remaining: pass.remaining,
    });

    if (decision === "open") {
      enterSession(mode, `mock:${config.slug}:start:${mode}`);
      return;
    }

    if (decision === "free") {
      const record: FreeAttemptRecord = { slug: config.slug, mode, at: new Date().toISOString() };
      markFreeAttemptUsed(storage, record);
      setFreeAttempt(record);
      enterSession(mode, `mock:${config.slug}:start:${mode}:free`);
      return;
    }

    setFreeAttempt(recorded);
    if (decision === "paywall" && pass.loaded) {
      openPaywall(placement);
      return;
    }

    setStartBusy(true);
    try {
      const res = await fetch("/api/mock-exams/pass/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mockSlug: config.slug, mode }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        code?: string;
        message?: string;
        remaining?: number;
      };
      if (res.ok && data.ok) {
        const remaining = typeof data.remaining === "number" ? data.remaining : 0;
        setPass({ loaded: true, hasPass: true, remaining });
        trackMockEvent({
          name: "mock_pass_attempt_used",
          deckSlug: config.linkedDeckSlug,
          mockSlug: config.slug,
          source: `mock:${config.slug}:pass:attempt:${mode}:left:${remaining}`,
        });
        enterSession(mode, `mock:${config.slug}:start:${mode}:paid`);
        return;
      }
      if (res.status === 402) {
        setPass((current) => ({ loaded: true, hasPass: current.hasPass || data.code === "no_attempts", remaining: 0 }));
        openPaywall(placement);
        return;
      }
      setStartError(data.message || "Could not start the mock. Try again.");
    } catch {
      setStartError("Network error — could not start the mock. Try again.");
    } finally {
      setStartBusy(false);
    }
  }

  function handleRedeemed(remaining: number) {
    setPass({ loaded: true, hasPass: true, remaining });
    setStartError(null);
    setRetakePaywallOpen(false);
  }

  function exitExam() {
    setScreen("landing");
    void refreshPassStatus();
    scrollToTop();
  }

  function completeExam(input: {
    answers: Record<string, string>;
    elapsedSeconds: number;
    startedAt: string;
  }) {
    const completedAt = new Date().toISOString();
    const nextReport = buildMockReport(
      config,
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
    void refreshPassStatus();

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
          linkedCheckout={linkedCheckout}
          mode={sessionMode}
          questions={shuffledQuestions}
          onComplete={completeExam}
          onExit={exitExam}
        />
      </MockFocusShell>
    );
  }

  if (screen === "results" && report) {
    const hideInterestCta = Boolean(linkedCheckout?.checkoutUrl);
    const retakeSuffix =
      startDecision === "paid"
        ? ` · 1 of ${pass.remaining} attempts`
        : startDecision === "paywall"
          ? ` · $${MOCK_PASS_PRICE_USD} for ${MOCK_PASS_ATTEMPTS} attempts`
          : "";

    return (
      <MockFocusShell>
        <div className="space-y-6 px-4 py-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:space-y-8 sm:px-6 sm:py-6">
          <MockReportPanel
            companionCheckouts={companionCheckouts}
            config={config}
            linkedCheckout={linkedCheckout}
            linkedDeckShortName={linkedDeckShortName}
            onRetake={() => void startMock(sessionMode, "retake")}
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
                {getMockRepairCheckoutCtaLabel({
                  weakTopicLabels: report.repairPlan.map((item) => item.topicLabel),
                  existingCtaLabel: linkedCheckout.ctaLabel,
                })}
              </a>
            ) : null}
            <button
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#18140f]/20 px-6 text-sm font-semibold transition hover:border-[#18140f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f3a5f] disabled:opacity-50"
              disabled={startBusy}
              onClick={() => void startMock(sessionMode, "retake")}
              type="button"
            >
              {startBusy
                ? "Starting…"
                : `Retake ${sessionMode === "learn" ? "learn mode" : "exam"}${retakeSuffix}`}
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
              {linkedCheckout?.checkoutUrl ? "Deck details" : "Join exam prep waitlist"}
            </Link>
          </div>
          {paywallEnabled && startDecision !== "open" ? (
            <p className="text-sm leading-6 text-[#5f5749]">
              {startDecision === "paid"
                ? `Mock Pass: ${pass.remaining} attempt${pass.remaining === 1 ? "" : "s"} left — any mock, either mode.`
                : `Your free mock is done. Retakes and other mocks: $${MOCK_PASS_PRICE_USD} for ${MOCK_PASS_ATTEMPTS} attempts.`}
            </p>
          ) : null}
          {startError ? (
            <p className="text-sm text-[#7a2e2e]" role="alert">
              {startError}
            </p>
          ) : null}
          {retakePaywallOpen && needsPaywall ? (
            <MockPassPaywall
              deckSlug={config.linkedDeckSlug}
              freeAttempt={freeAttempt}
              mockSlug={config.slug}
              onRedeemed={handleRedeemed}
              passExhausted={pass.hasPass}
              placement="retake"
            />
          ) : null}
        </div>
      </MockFocusShell>
    );
  }

  const brief = selectedMode === "learn" ? learnBrief : examBrief;
  const timingLabel =
    selectedMode === "learn" ? "Untimed · instant feedback" : formatDuration(config.durationMinutes);
  const lengthAlternate = mockLengthAlternates[config.slug];
  const sellDeckFirst =
    Boolean(linkedCheckout?.checkoutUrl) &&
    (config.slug === "sie-full-mock" || config.slug === "sie-quick-diagnostic");
  const startBase =
    selectedMode === "learn"
      ? "Start learn mode"
      : config.questionCount <= 30
        ? `Start diagnostic · ${config.questionCount} questions`
        : "Start timed exam";
  const startSuffix = !accessHydrated
    ? ""
    : startDecision === "free"
      ? " · first mock free"
      : startDecision === "paid"
        ? ` · 1 of ${pass.remaining} attempts`
        : "";
  const startCtaLabel = `${startBase}${startSuffix}`;
  const accessNote =
    !paywallEnabled
      ? null
      : startDecision === "paid"
        ? `Mock Pass active: ${pass.remaining} attempt${pass.remaining === 1 ? "" : "s"} left — any mock, Exam or Learn mode.`
        : `First mock free — any exam, Exam or Learn mode, no signup. After that: $${MOCK_PASS_PRICE_USD} for ${MOCK_PASS_ATTEMPTS} attempts.`;
  const startButtonClass = (primary: boolean) =>
    primary
      ? "inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#18140f] px-6 text-sm font-semibold text-[#fffaf0] transition hover:bg-[#1f3a5f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f3a5f] disabled:opacity-50 sm:w-auto"
      : "inline-flex min-h-12 w-full items-center justify-center rounded-full border border-[#18140f]/20 px-6 text-sm font-semibold text-[#18140f] transition hover:border-[#18140f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f3a5f] disabled:opacity-50 sm:w-auto";
  const deckButtonClass = (primary: boolean) =>
    primary
      ? "inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#18140f] px-6 text-sm font-semibold text-[#fffaf0] transition hover:bg-[#1f3a5f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f3a5f] sm:w-auto"
      : "inline-flex min-h-12 w-full items-center justify-center rounded-full border border-[#18140f]/20 px-6 text-sm font-semibold text-[#18140f] transition hover:border-[#18140f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f3a5f] sm:w-auto";

  return (
    <div className="mt-6 space-y-6" id="start-mock">
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
            <dt className="font-mono text-xs uppercase tracking-[0.2em] text-[#1f3a5f]">Readiness target</dt>
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
                  onClick={() => setSelectedMode("exam")}
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

              {accessNote ? (
                <p
                  aria-live="polite"
                  className="rounded-xl border border-[#1f3d28]/15 bg-[#1f3d28]/[0.05] px-3 py-2 text-sm leading-6 text-[#1f3d28]"
                >
                  {accessNote}
                </p>
              ) : null}

              {needsPaywall ? (
                <MockPassPaywall
                  deckSlug={config.linkedDeckSlug}
                  freeAttempt={freeAttempt}
                  mockSlug={config.slug}
                  onRedeemed={handleRedeemed}
                  passExhausted={pass.hasPass}
                  placement="landing"
                />
              ) : null}

              {sellDeckFirst ? (
                <div className="flex gap-3 rounded-2xl border border-[#1f3a5f]/15 bg-[#1f3a5f]/[0.04] p-3">
                  <img
                    alt="SIE Anki flashcard sample"
                    className="h-[4.5rem] w-[4.5rem] shrink-0 rounded-xl object-cover"
                    height={72}
                    src="/samples/sie-exam-anki-deck-sample-1.webp"
                    width={72}
                  />
                  <p className="text-sm leading-6 text-[#4f493e]">
                    {config.slug === "sie-full-mock"
                      ? "Skip the 105-minute sitting if you want — 300 SIE Anki cards cover the same FINRA topics for daily recall."
                      : "Use the 25-question check if you have 35 minutes. Repair the same topics daily with the 300-card Anki deck."}
                  </p>
                </div>
              ) : null}

              <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                {linkedCheckout?.checkoutUrl && sellDeckFirst ? (
                  <TrackedCheckoutLink
                    className={deckButtonClass(true)}
                    deckSlug={linkedCheckout.deckSlug}
                    href={linkedCheckout.checkoutUrl}
                    source={`mock:${config.slug}:landing:checkout`}
                  >
                    {linkedCheckout.ctaLabel}
                  </TrackedCheckoutLink>
                ) : null}
                {!needsPaywall ? (
                  <button
                    className={startButtonClass(!sellDeckFirst)}
                    disabled={startBusy}
                    onClick={() => void startMock(selectedMode, "landing")}
                    type="button"
                  >
                    {startBusy ? "Starting…" : startCtaLabel}
                  </button>
                ) : null}
                {linkedCheckout?.checkoutUrl && !sellDeckFirst ? (
                  <TrackedCheckoutLink
                    className={deckButtonClass(false)}
                    deckSlug={linkedCheckout.deckSlug}
                    href={linkedCheckout.checkoutUrl}
                    source={`mock:${config.slug}:landing:checkout`}
                  >
                    {linkedCheckout.ctaLabel}
                  </TrackedCheckoutLink>
                ) : null}
              </div>

              {lengthAlternate ? (
                <p className="text-sm leading-6 text-[#5f5749]">
                  <Link
                    className="font-medium text-[#1f3a5f] underline decoration-[#1f3a5f]/30 underline-offset-4 transition hover:decoration-[#1f3a5f]"
                    href={lengthAlternate.href}
                  >
                    {lengthAlternate.label}
                  </Link>
                </p>
              ) : null}

              {startError ? (
                <p className="text-sm text-[#7a2e2e]" role="alert">
                  {startError}
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
