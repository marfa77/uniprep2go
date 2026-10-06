import { describe, expect, it } from "vitest";
import { mockStartCountCopy, publicMockStartCount } from "./mock-start-count";
import { parseMockSlugFromSource } from "./session-mode";

describe("mock start count", () => {
  it("hides counts below the unique-starter floor", () => {
    expect(publicMockStartCount(0)).toBeNull();
    expect(publicMockStartCount(2)).toBeNull();
    expect(publicMockStartCount(3)).toBe(3);
    expect(mockStartCountCopy(3)).toBe("3 people have started this timed check");
  });

  it("parses the mock slug from start sources", () => {
    expect(parseMockSlugFromSource("mock:rd-exam-readiness-check:start:exam:free")).toBe(
      "rd-exam-readiness-check",
    );
  });
});
