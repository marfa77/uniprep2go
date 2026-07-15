import { describe, expect, it } from "vitest";
import { getAllMockExams } from "./mock-exams/configs";
import { isMockExamRunnable } from "./mock-exams/question-bank";
import {
  finalize,
  mockExamRobots,
  shouldIndexMockExam,
  thinContentRobots,
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

  it("noindexes mocks with empty or incomplete banks", () => {
    expect(shouldIndexMockExam("epa-608-readiness-check")).toBe(true);
    expect(shouldIndexMockExam("bms-bas-readiness-check")).toBe(true);
    expect(mockExamRobots("bms-bas-readiness-check")).toBeUndefined();
    expect(mockExamRobots("sie-full-mock")).toBeUndefined();
  });

  it("aligns indexability with runnable mock state", () => {
    for (const mock of getAllMockExams()) {
      expect(shouldIndexMockExam(mock.slug)).toBe(isMockExamRunnable(mock.slug));
    }
  });
});
