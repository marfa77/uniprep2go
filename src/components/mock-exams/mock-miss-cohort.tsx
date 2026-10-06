import Link from "next/link";
import type { MockExamConfig } from "@/lib/mock-exams/types";
import type { PublicMissCohort } from "@/lib/mock-exams/miss-cohort";
import { MISS_COHORT_PUBLISH_MIN } from "@/lib/mock-exams/miss-cohort";

export function MockMissCohortPanel({
  config,
  cohort,
}: {
  config: MockExamConfig;
  cohort: PublicMissCohort | null;
}) {
  if (!cohort) {
    return null;
  }

  const deckHref = `/decks/${config.linkedDeckSlug}?topics=${encodeURIComponent(cohort.mostMissed.topicId)}#repair`;

  return (
    <section
      className="mt-8 rounded-3xl border border-[#18140f]/10 bg-[#fffaf0] p-5 sm:p-6"
      id="what-people-miss"
    >
      <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#1f3a5f]">
        What people miss on this check
      </p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#18140f]">
        {cohort.attempts.toLocaleString("en-US")} first exam-mode attempts
      </h2>
      <p className="mt-3 text-base leading-7 text-[#4f493e]">
        Average first-attempt accuracy {cohort.overallAccuracyPercent}%. Most missed topic:{" "}
        <strong>{cohort.mostMissed.label}</strong> ({cohort.mostMissed.accuracyPercent}%
        correct). This is UniPrep2Go session data — not the official exam pass rate.
      </p>
      <p className="mt-4">
        <Link
          className="font-medium text-[#1f3a5f] underline-offset-4 hover:underline"
          href={deckHref}
        >
          Practice {cohort.mostMissed.label} in the linked deck
        </Link>
      </p>
      <p className="mt-3 text-xs leading-5 text-[#7a6e5a]">
        Shown only after {MISS_COHORT_PUBLISH_MIN} first timed exam-mode completes. Learn mode
        and retakes are excluded.
      </p>
    </section>
  );
}
