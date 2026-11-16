import { getMockQuestionCountAeo } from "@/lib/mock-exams/mock-question-count-aeo";
import type { MockExamConfig } from "@/lib/mock-exams/types";

export function MockQuestionCountBlock({ config }: { config: MockExamConfig }) {
  const block = getMockQuestionCountAeo(config);
  if (!block) return null;

  return (
    <section className="mt-10" id="exam-question-count" aria-labelledby="exam-qcount-heading">
      <h2 id="exam-qcount-heading" className="text-2xl font-semibold tracking-tight">
        {block.h2}
      </h2>
      <div className="mt-4 text-base leading-8 text-[#4f493e]">
        <p>
          <span className="font-semibold text-[#18140f]">{block.faq.question}</span> {block.faq.answer}
        </p>
      </div>
    </section>
  );
}