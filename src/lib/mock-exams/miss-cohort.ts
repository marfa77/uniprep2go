import type { MockTopicResult } from "./types";

/** Public cohort copy stays hidden until this many first exam-mode completes. */
export const MISS_COHORT_PUBLISH_MIN = 50;

export type MissCohortTopicRow = {
  topicId: string;
  label: string;
  correct: number;
  total: number;
};

export type MissCohortStore = {
  firstExamCompletes: number;
  topics: MissCohortTopicRow[];
};

export type PublicMissCohort = {
  attempts: number;
  overallAccuracyPercent: number;
  mostMissed: {
    topicId: string;
    label: string;
    accuracyPercent: number;
  };
};

export function isAgentUserAgent(userAgent: string | null | undefined) {
  const ua = userAgent ?? "";
  return /Cursor\//i.test(ua);
}

export function accuracyPercent(correct: number, total: number) {
  if (total <= 0) return 0;
  return Math.round((correct / total) * 100);
}

export function buildMissCohortStore(
  config: { topics: Array<{ id: string; label: string }> },
  topicResults: Array<Pick<MockTopicResult, "topicId" | "correct" | "total">>,
  previous: MissCohortStore | null,
): MissCohortStore {
  const allowed = new Map(config.topics.map((topic) => [topic.id, topic.label]));
  const nextTopics = new Map(
    (previous?.topics ?? []).map((row) => [row.topicId, { ...row }]),
  );

  for (const topic of config.topics) {
    if (!nextTopics.has(topic.id)) {
      nextTopics.set(topic.id, {
        topicId: topic.id,
        label: topic.label,
        correct: 0,
        total: 0,
      });
    }
  }

  for (const row of topicResults) {
    const label = allowed.get(row.topicId);
    if (!label) continue;
    const total = Math.max(0, Math.floor(row.total));
    const correct = Math.min(total, Math.max(0, Math.floor(row.correct)));
    const existing = nextTopics.get(row.topicId) ?? {
      topicId: row.topicId,
      label,
      correct: 0,
      total: 0,
    };
    existing.label = label;
    existing.correct += correct;
    existing.total += total;
    nextTopics.set(row.topicId, existing);
  }

  return {
    firstExamCompletes: (previous?.firstExamCompletes ?? 0) + 1,
    topics: [...nextTopics.values()].filter((row) => allowed.has(row.topicId)),
  };
}

export function toPublicMissCohort(store: MissCohortStore): PublicMissCohort | null {
  if (store.firstExamCompletes < MISS_COHORT_PUBLISH_MIN) {
    return null;
  }

  const scored = store.topics.filter((row) => row.total > 0);
  if (scored.length === 0) {
    return null;
  }

  const overallCorrect = scored.reduce((sum, row) => sum + row.correct, 0);
  const overallTotal = scored.reduce((sum, row) => sum + row.total, 0);
  const ranked = [...scored].sort((left, right) => {
    const leftAcc = accuracyPercent(left.correct, left.total);
    const rightAcc = accuracyPercent(right.correct, right.total);
    return leftAcc - rightAcc || right.total - left.total;
  });
  const mostMissed = ranked[0];
  if (!mostMissed) {
    return null;
  }

  return {
    attempts: store.firstExamCompletes,
    overallAccuracyPercent: accuracyPercent(overallCorrect, overallTotal),
    mostMissed: {
      topicId: mostMissed.topicId,
      label: mostMissed.label,
      accuracyPercent: accuracyPercent(mostMissed.correct, mostMissed.total),
    },
  };
}
