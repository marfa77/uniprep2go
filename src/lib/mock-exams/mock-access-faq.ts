import { MOCK_PASS_ATTEMPTS, MOCK_PASS_NAME, MOCK_PASS_PRICE_USD } from "./mock-pass";

const MOCK_ACCESS_TAIL =
  `is free (any exam, Exam or Learn mode, no signup); ` +
  `after that, the $${MOCK_PASS_PRICE_USD} ${MOCK_PASS_NAME} unlocks ${MOCK_PASS_ATTEMPTS} more attempts on any mock.`;

export const MOCK_ACCESS_FAQ_SUFFIX = `Your first UniPrep2Go mock ${MOCK_ACCESS_TAIL}`;

/** Names the exam so the disclosure is not one identical sentence across every deck page. */
export function mockAccessSuffixFor(exam?: string): string {
  const name = exam?.trim();
  return name ? `Your first UniPrep2Go mock, including this ${name} one, ${MOCK_ACCESS_TAIL}` : MOCK_ACCESS_FAQ_SUFFIX;
}

const FREE_PRACTICE_QUESTION =
  /^(is there|are there|where is|where can i (take|find)|which .+ have|do you have)\b[^?]*\bfree\b([^?]*)\b(practice tests?|mocks?|readiness checks?|diagnostics?)\b/i;

const ALREADY_DISCLOSED = /first (UniPrep2Go )?(timed )?mock\b[^.;]{0,60}\bfree|first mock free/i;

function examFromQuestion(match: RegExpMatchArray): string | undefined {
  const name = match[3]
    ?.replace(/\b(online|timed|full|official|an?|the|uniprep2go)\b/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  return name && name.length <= 60 ? name : undefined;
}

/** "Is there a free X practice test?" answers must carry the one-free-mock rule. */
export function withMockAccessDisclosure<T extends { question: string; answer: string }>(faqs: T[]): T[] {
  return faqs.map((faq) => {
    const match = faq.question.trim().match(FREE_PRACTICE_QUESTION);
    if (!match || ALREADY_DISCLOSED.test(faq.answer)) {
      return faq;
    }
    const answer = faq.answer.trimEnd();
    const joiner = /[.!?)]$/.test(answer) ? " " : ". ";
    return { ...faq, answer: `${answer}${joiner}${mockAccessSuffixFor(examFromQuestion(match))}` };
  });
}
