import { describe, expect, it } from "vitest";
import {
  hasAnalyticsConsent,
  parseCookieConsent,
} from "./cookie-consent";

describe("cookie consent", () => {
  it("parses stored consent values", () => {
    expect(parseCookieConsent("accepted")).toBe("accepted");
    expect(parseCookieConsent("rejected")).toBe("rejected");
    expect(parseCookieConsent("unknown")).toBeNull();
    expect(parseCookieConsent(null)).toBeNull();
  });

  it("allows analytics only after acceptance", () => {
    expect(hasAnalyticsConsent("accepted")).toBe(true);
    expect(hasAnalyticsConsent("rejected")).toBe(false);
    expect(hasAnalyticsConsent(null)).toBe(false);
  });
});
