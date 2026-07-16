import { describe, expect, it } from "vitest";
import { getAllMockExams } from "./mock-exams/configs";
import { isMockExamRunnable } from "./mock-exams/question-bank";
import {
  finalize,
  mockExamRobots,
  shouldIndexMockExam,
  truncateSeoTitle,
} from "./seo";
import { absoluteUrl } from "./site";

describe("seo utilities (Barakhlo patterns)", () => {
  it("truncates long titles for Ahrefs-safe length without ellipsis", () => {
    const long =
      "Free MRICS Quantity Surveying APC Readiness Check Practice Test Online";
    const truncated = truncateSeoTitle(long);
    expect(truncated.length).toBeLessThanOrEqual(57);
    expect(truncated.endsWith("…")).toBe(false);
  });

  it("enriches Open Graph with absolute URLs and site defaults", () => {
    const meta = finalize({
      title: "Test page",
      openGraph: {
        title: "Test page",
        description: "Desc",
        url: "/mock-exams/sie-full-mock",
      },
    });

    expect(meta.openGraph?.siteName).toBe("UniPrep2Go");
    expect(meta.openGraph?.locale).toBe("en_US");
    expect(meta.openGraph?.url).toBe(absoluteUrl("/mock-exams/sie-full-mock"));
  });

  it("indexes live runnable mocks linked to monetized decks", () => {
    expect(shouldIndexMockExam("epa-608-readiness-check")).toBe(true);
    expect(mockExamRobots("epa-608-readiness-check")).toBeUndefined();
    expect(shouldIndexMockExam("sie-full-mock")).toBe(true);
    expect(mockExamRobots("sie-full-mock")).toBeUndefined();
  });

  it("indexes only live mocks with runnable banks", () => {
    for (const mock of getAllMockExams()) {
      const expected = mock.status === "live" && isMockExamRunnable(mock.slug);
      expect(shouldIndexMockExam(mock.slug)).toBe(expected);
    }
  });
});
