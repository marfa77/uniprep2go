import { describe, expect, it } from "vitest";
import {
  FUNNEL_EXCLUDE_COOKIE,
  hasExcludeCookie,
  parseExcludeIps,
  shouldExcludeFunnelTraffic,
} from "./funnel-exclude";

describe("funnel exclude", () => {
  it("detects the exclude cookie", () => {
    expect(hasExcludeCookie(`${FUNNEL_EXCLUDE_COOKIE}=1; other=value`)).toBe(true);
    expect(hasExcludeCookie("other=value")).toBe(false);
  });

  it("excludes flagged internal events and cookie traffic", () => {
    expect(
      shouldExcludeFunnelTraffic({
        internal: true,
      }),
    ).toBe(true);

    expect(
      shouldExcludeFunnelTraffic({
        cookieHeader: `${FUNNEL_EXCLUDE_COOKIE}=1`,
      }),
    ).toBe(true);

    expect(
      shouldExcludeFunnelTraffic({
        clientIp: "203.0.113.10",
        cookieHeader: "",
      }),
    ).toBe(false);
  });

  it("excludes configured IPs from env", () => {
    const previous = process.env.FUNNEL_EXCLUDE_IPS;
    process.env.FUNNEL_EXCLUDE_IPS = "203.0.113.10, 198.51.100.4";

    expect(parseExcludeIps()).toEqual(["203.0.113.10", "198.51.100.4"]);
    expect(
      shouldExcludeFunnelTraffic({
        clientIp: "203.0.113.10",
      }),
    ).toBe(true);

    process.env.FUNNEL_EXCLUDE_IPS = previous;
  });
});
