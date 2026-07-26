import type { MockExamConfig, MockQuestion } from "@/lib/mock-exams/types";

const SAMPLE_COUNT = 5;

type MockSampleQuestionsSectionProps = {
  config: MockExamConfig;
  questions: MockQuestion[];
  /** Optional niche-specific lead shown above the samples. */
  lead?: string;
};

function sampleScore(question: MockQuestion): number {
  const prompt = question.prompt.trim();
  let score = Math.min(prompt.length, 180);
  // Prefer applied / scenario stems over thin definition drills.
  if (/^(what is|what are|who is|define)\b/i.test(prompt)) score -= 40;
  if (/\(drill\b/i.test(prompt)) score -= 50;
  if (prompt.length >= 70) score += 25;
  if (/\b(which|when|if|candidate|client|customer|broker|agent)\b/i.test(prompt)) {
    score += 15;
  }
  // Slight topic diversity bonus handled by picker.
  score += question.options.filter((o) => o.text.trim().length >= 24).length * 2;
  return score;
}

/** Pick the strongest SSR sample stems for Google/LLM extraction. */
export function pickMockSampleQuestions(
  questions: MockQuestion[],
  count = SAMPLE_COUNT,
): MockQuestion[] {
  if (questions.length <= count) {
    return questions;
  }

  const ranked = [...questions].sort((a, b) => sampleScore(b) - sampleScore(a));
  const picked: MockQuestion[] = [];
  const usedTopics = new Set<string>();

  for (const question of ranked) {
    if (picked.length >= count) break;
    if (usedTopics.has(question.topicId) && picked.length < count - 1) {
      continue;
    }
    picked.push(question);
    usedTopics.add(question.topicId);
  }

  // Fill remaining if topic diversity skipped too many.
  for (const question of ranked) {
    if (picked.length >= count) break;
    if (picked.some((q) => q.id === question.id)) continue;
    picked.push(question);
  }

  return picked;
}

/**
 * Server-rendered sample MCQs for Google/LLM extraction — not the interactive runner.
 * Shows prompt + options; correct answers stay in the timed session.
 */
export function MockSampleQuestionsSection({
  config,
  questions,
  lead,
}: MockSampleQuestionsSectionProps) {
  const samples = pickMockSampleQuestions(questions, SAMPLE_COUNT);
  if (samples.length === 0) {
    return null;
  }

  return (
    <section className="mt-10" id="sample-questions" aria-labelledby="sample-questions-heading">
      <h2 id="sample-questions-heading" className="text-2xl font-semibold tracking-tight">
        Sample {config.shortTitle} practice questions
      </h2>
      <p className="mt-4 max-w-3xl text-base leading-8 text-[#4f493e]">
        {lead ??
          `Preview ${samples.length} original practice items from this free ${config.shortTitle} mock. Start the timed session above for the full ${config.questionCount}-question bank, scoring, and explanations.`}
      </p>
      <ol className="mt-6 space-y-6">
        {samples.map((question, index) => (
          <li
            key={question.id}
            className="border-t border-[#18140f]/10 pt-6 first:border-t-0 first:pt-0"
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#1f3a5f]">
              Sample {index + 1}
            </p>
            <p className="mt-2 text-base font-medium leading-7 text-[#18140f]">{question.prompt}</p>
            {question.formula ? (
              <p className="mt-2 font-mono text-sm text-[#4f493e]">{question.formula}</p>
            ) : null}
            <ul className="mt-3 space-y-1.5 text-sm leading-6 text-[#4f493e]">
              {question.options.map((option) => (
                <li key={option.id}>
                  <span className="font-medium text-[#18140f]">{option.id.toUpperCase()}.</span>{" "}
                  {option.text}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
