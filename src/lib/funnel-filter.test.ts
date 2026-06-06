import { describe, expect, it } from "vitest";
import {
  detectInternalClientContext,
  filterReportingSources,
  shouldRecordFunnelEvent,
} from "./funnel-filter";
import { FUNNEL_EXCLUDE_COOKIE } from "./funnel-exclude";

describe("funnel filter", () => {
  it("skips internal events", () => {
    expect(shouldRecordFunnelEvent({ internal: true })).toBe(false);
    expect(shouldRecordFunnelEvent({ internal: false })).toBe(true);
  });

  it("skips excluded cookies on the server", () => {
    const request = {
      headers: new Headers({
        cookie: `${FUNNEL_EXCLUDE_COOKIE}=1`,
      }),
    } as Request;

    expect(shouldRecordFunnelEvent({ internal: false }, request)).toBe(false);
  });

  it("hides legacy section_view noise from top sources", () => {
    expect(
      filterReportingSources({
        section_view: 95,
        home: 18,
        deck_page: 17,
      }),
    ).toEqual({
      home: 18,
      deck_page: 17,
    });
  });

  it("detects local and opt-out test traffic", () => {
    expect(
      detectInternalClientContext({
        hostname: "localhost",
      }),
    ).toBe(true);

    expect(
      detectInternalClientContext({
        hostname: "www.uniprep2go.study",
        search: "?funnel=exclude",
      }),
    ).toBe(true);
  });
});
