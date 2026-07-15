import { getMockExamConfig } from "./configs";
import type {
  MockAttemptInput,
  MockExamConfig,
  MockPacingAnalysis,
  MockQuestion,
  MockRepairPlanItem,
  MockReport,
  MockTopicResult,
  MockVerdict,
} from "./types";

function hashSeed(seed: string) {
  let hash = 2166136261;

  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function shuffleQuestions(questions: MockQuestion[], attemptSeed: string) {
  const random = mulberry32(hashSeed(attemptSeed));
  const copy = [...questions];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }

  return copy;
}

function sampleWithoutReplacement<T>(items: T[], count: number, random: () => number) {
  if (count >= items.length) {
    return [...items];
  }

  const pool = [...items];
  const selected: T[] = [];

  for (let index = 0; index < count; index += 1) {
    const pickIndex = Math.floor(random() * pool.length);
    selected.push(pool[pickIndex]!);
    pool.splice(pickIndex, 1);
  }

  return selected;
}

/** Pick the session question set from a larger bank using topic quotas from config. */
export function selectSessionQuestions(
  questions: MockQuestion[],
  config: MockExamConfig,
  attemptSeed: string,
) {
  const topicsWithCounts = config.topics.filter(
    (topic): topic is typeof topic & { questionCount: number } =>
      typeof topic.questionCount === "number",
  );

  if (topicsWithCounts.length === 0) {
    if (questions.length <= config.questionCount) {
      return questions;
    }

    const random = mulberry32(hashSeed(`${attemptSeed}:session`));
    return sampleWithoutReplacement(questions, config.questionCount, random);
  }

  const random = mulberry32(hashSeed(`${attemptSeed}:session`));
  const selected: MockQuestion[] = [];

  for (const topic of topicsWithCounts) {
    const topicPool = questions.filter((question) => question.topicId === topic.id);
    selected.push(...sampleWithoutReplacement(topicPool, topic.questionCount, random));
  }

  return selected;
}

function getTopicWeightPercent(config: MockExamConfig, topicId: string) {
  const topic = config.topics.find((item) => item.id === topicId);

  if (!topic) {
    return 0;
  }

  if (typeof topic.weightPercent === "number") {
    return topic.weightPercent;
  }

  if (typeof topic.questionCount === "number" && config.questionCount > 0) {
    return Math.round((topic.questionCount / config.questionCount) * 100);
  }

  return 0;
}

function getTopicStatus(scorePercent: number, targetPercent: number): MockTopicResult["status"] {
  if (scorePercent >= targetPercent + 10) {
    return "strong";
  }

  if (scorePercent >= targetPercent) {
    return "on_track";
  }

  if (scorePercent >= targetPercent - 10) {
    return "weak";
  }

  return "critical";
}

function buildPacingAnalysis(config: MockExamConfig, elapsedSeconds: number): MockPacingAnalysis {
  const durationSeconds = config.durationMinutes * 60;
  const averageSecondsPerQuestion =
    config.questionCount > 0 ? elapsedSeconds / config.questionCount : elapsedSeconds;
  const recommendedSecondsPerQuestion = durationSeconds / Math.max(config.questionCount, 1);

  let pacingStatus: MockPacingAnalysis["pacingStatus"] = "on_pace";
  let pacingNote = "Your pacing was close to the recommended exam rhythm.";

  if (averageSecondsPerQuestion <= recommendedSecondsPerQuestion * 0.75) {
    pacingStatus = "ahead";
    pacingNote =
      "You moved faster than the recommended pace. That can help on exam day, but verify you did not rush through nuanced product-risk questions.";
  } else if (averageSecondsPerQuestion <= recommendedSecondsPerQuestion * 1.15) {
    pacingStatus = "on_pace";
  } else if (averageSecondsPerQuestion <= recommendedSecondsPerQuestion * 1.35) {
    pacingStatus = "behind";
    pacingNote =
      "You were slightly slower than the recommended pace. Drill timed sets so you can finish with review time left.";
  } else {
    pacingStatus = "very_slow";
    pacingNote =
      "Your pace was materially slower than the official timing. Even with strong knowledge, unfinished questions will cap your score.";
  }

  return {
    durationMinutes: config.durationMinutes,
    elapsedSeconds,
    averageSecondsPerQuestion: Number(averageSecondsPerQuestion.toFixed(1)),
    recommendedSecondsPerQuestion: Number(recommendedSecondsPerQuestion.toFixed(1)),
    pacingStatus,
    pacingNote,
  };
}

function buildTopicResults(
  config: MockExamConfig,
  questions: MockQuestion[],
  answers: MockAttemptInput["answers"],
): MockTopicResult[] {
  return config.topics
    .map((topic) => {
      const topicQuestions = questions.filter((question) => question.topicId === topic.id);
      const missedQuestionIds: string[] = [];
      let correct = 0;

      for (const question of topicQuestions) {
        const userAnswer = answers[question.id];

        if (userAnswer === question.correctOptionId) {
          correct += 1;
        } else {
          missedQuestionIds.push(question.id);
        }
      }

      const total = topicQuestions.length;
      const scorePercent = total > 0 ? Math.round((correct / total) * 100) : 0;

      return {
        topicId: topic.id,
        label: topic.label,
        weightPercent: getTopicWeightPercent(config, topic.id),
        targetPercent: topic.targetPercent,
        correct,
        total,
        scorePercent,
        status: getTopicStatus(scorePercent, topic.targetPercent),
        missedQuestionIds,
      };
    })
    .filter((topic) => topic.total > 0);
}

function buildRepairPlan(topicResults: MockTopicResult[]): MockRepairPlanItem[] {
  return [...topicResults]
    .filter((topic) => topic.total > 0)
    .sort((left, right) => {
      const leftGap = left.targetPercent - left.scorePercent;
      const rightGap = right.targetPercent - right.scorePercent;
      return rightGap - leftGap || right.weightPercent - left.weightPercent;
    })
    .slice(0, 3)
    .map((topic) => ({
      topicId: topic.topicId,
      topicLabel: topic.label,
      scorePercent: topic.scorePercent,
      targetPercent: topic.targetPercent,
      action:
        topic.status === "critical"
          ? `Rebuild fundamentals in ${topic.label} before your next mock. Misses here had high exam weight.`
          : `Review missed ${topic.label} questions and retake a focused drill set before the next full mock.`,
    }));
}

function determineVerdict(
  config: MockExamConfig,
  scorePercent: number,
  topicResults: MockTopicResult[],
): { verdict: MockVerdict; explanation: string } {
  const { passRule } = config;
  const labels = passRule.verdictLabels;
  const criticalTopics = topicResults.filter((topic) => topic.status === "critical");
  const weakTopics = topicResults.filter((topic) => topic.status === "weak" || topic.status === "critical");
  const weightedWeakTopics = weakTopics
    .filter((topic) => topic.weightPercent >= 15)
    .map((topic) => topic.label);

  if (scorePercent >= passRule.passPercent && criticalTopics.length === 0) {
    return {
      verdict: labels.pass,
      explanation: `Overall score ${scorePercent}% cleared the ${passRule.passPercent}% threshold with no critically weak weighted topics. You are exam-ready on this mock's evidence, but keep drilling weak spots before test day.`,
    };
  }

  if (
    passRule.borderlinePercent &&
    scorePercent >= passRule.borderlinePercent &&
    scorePercent < passRule.passPercent
  ) {
    return {
      verdict: labels.borderline ?? "BORDERLINE RISK",
      explanation: `Overall score ${scorePercent}% is inside the borderline band (${passRule.borderlinePercent}%–${passRule.passPercent - 1}%). ${
        weightedWeakTopics.length > 0
          ? `Weighted weak areas: ${weightedWeakTopics.join(", ")}.`
          : "Topic gaps are narrow but real."
      } One more focused review cycle is recommended before sitting the real exam.`,
    };
  }

  const driverTopics = weakTopics
    .sort((left, right) => right.weightPercent - left.weightPercent)
    .slice(0, 3)
    .map((topic) => `${topic.label} (${topic.scorePercent}% vs ${topic.targetPercent}% target)`);

  return {
    verdict: labels.noPass,
    explanation: `Overall score ${scorePercent}% is below the ${passRule.passPercent}% threshold. Primary drivers: ${
      driverTopics.length > 0 ? driverTopics.join("; ") : "broad accuracy gaps across multiple topics"
    }. Fix these before attempting another full mock.`,
  };
}

export function scoreMockAttempt(
  config: MockExamConfig,
  questions: MockQuestion[],
  attempt: MockAttemptInput,
): MockReport {
  let correctCount = 0;

  for (const question of questions) {
    if (attempt.answers[question.id] === question.correctOptionId) {
      correctCount += 1;
    }
  }

  const totalCount = questions.length;
  const scorePercent = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
  const topicResults = buildTopicResults(config, questions, attempt.answers);
  const { verdict, explanation } = determineVerdict(config, scorePercent, topicResults);
  const pacing = buildPacingAnalysis(config, attempt.elapsedSeconds);
  const repairPlan = buildRepairPlan(topicResults);

  const questionReview = questions.map((question) => {
    const userOptionId = attempt.answers[question.id] ?? null;
    const topic = config.topics.find((item) => item.id === question.topicId);

    return {
      questionId: question.id,
      topicId: question.topicId,
      topicLabel: topic?.label ?? question.topicId,
      prompt: question.prompt,
      formula: question.formula,
      options: question.options,
      correctOptionId: question.correctOptionId,
      userOptionId,
      isCorrect: userOptionId === question.correctOptionId,
      explanation: question.explanation,
      distractorExplanation:
        userOptionId && userOptionId !== question.correctOptionId
          ? (question.distractorExplanations[userOptionId] ?? null)
          : null,
    };
  });

  return {
    examSlug: config.slug,
    examTitle: config.title,
    verdict,
    verdictExplanation: explanation,
    scorePercent,
    correctCount,
    totalCount,
    passThresholdPercent: config.passRule.passPercent,
    topicResults,
    questionReview,
    pacing,
    repairPlan,
    disclaimer: config.disclaimer,
    linkedDeckSlug: config.linkedDeckSlug,
    linkedDeckUrl: `/decks/${config.linkedDeckSlug}`,
  };
}

export function buildMockReport(attempt: MockAttemptInput, questions: MockQuestion[]) {
  const config = getMockExamConfig(attempt.examSlug);

  if (!config) {
    throw new Error(`Unknown mock exam: ${attempt.examSlug}`);
  }

  return scoreMockAttempt(config, questions, attempt);
}

export function createAttemptSeed() {
  return `attempt_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}
