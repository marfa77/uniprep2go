import { describe, expect, it } from "vitest";
import { normalizeWaitlistEmail } from "./waitlist-email";

describe("normalizeWaitlistEmail", () => {
  it("accepts and normalizes valid emails", () => {
    expect(normalizeWaitlistEmail(" Learner@Example.COM ")).toBe("learner@example.com");
  });

  it("rejects missing or invalid values", () => {
    expect(normalizeWaitlistEmail(undefined)).toBeNull();
    expect(normalizeWaitlistEmail("")).toBeNull();
    expect(normalizeWaitlistEmail("not-an-email")).toBeNull();
    expect(normalizeWaitlistEmail("a@b")).toBeNull();
  });
});
