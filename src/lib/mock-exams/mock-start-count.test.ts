import { describe, expect, it } from "vitest";
import { mockStartCountCopy, publicMockStartCount } from "./mock-start-count";
import {
  countMockStartsForSlug,
  formatMockStartOrdinal,
  parseMockSlugFromSource,
} from "./session-mode";

describe("mock start count", () => {
  it("formats copy and applies marketing floors when a slug is provided", () => {
    expect(publicMockStartCount(0)).toBeNull();
    expect(publicMockStartCount(2)).toBeNull();
    expect(publicMockStartCount(3)).toBe(3);
    expect(publicMockStartCount(0, "ptcb-pharmacy-technician-mock")).toBeGreaterThanOrEqual(260);
    expect(mockStartCountCopy(3)).toBe("3 people have started this timed check");
  });

  it("parses the mock slug from start sources", () => {
    expect(parseMockSlugFromSource("mock:rd-exam-readiness-check:start:exam:free")).toBe(
      "rd-exam-readiness-check",
    );
  });

  it("counts all start variants for one slug and formats ordinals", () => {
    expect(
      countMockStartsForSlug(
        {
          "mock:a:start:exam": 2,
          "mock:a:start:exam:free": 1,
          "mock:a:start:learn": 1,
          "mock:b:start:exam": 9,
          "mock:a:complete:exam": 4,
        },
        "a",
      ),
    ).toBe(4);
    expect(formatMockStartOrdinal(1)).toBe("1st");
    expect(formatMockStartOrdinal(2)).toBe("2nd");
    expect(formatMockStartOrdinal(3)).toBe("3rd");
    expect(formatMockStartOrdinal(11)).toBe("11th");
    expect(formatMockStartOrdinal(22)).toBe("22nd");
  });
});
