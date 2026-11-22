import { describe, expect, it } from "vitest";
import { CHECKOUT_MIN_ACTION_MS, isCheckoutTooSoon, shouldSendCheckoutEvent } from "./checkout-guard";
import { isHetznerIp } from "./datacenter-asn";

describe("checkout phantom guards", () => {
  it("does not send a headless or instant checkout", () => {
    expect(
      shouldSendCheckoutEvent({
        name: "checkout_intent",
        webdriver: true,
        millisSinceFirstView: 60_000,
      }),
    ).toBe(false);
    expect(
      shouldSendCheckoutEvent({
        name: "checkout_click",
        webdriver: false,
        millisSinceFirstView: CHECKOUT_MIN_ACTION_MS - 1,
      }),
    ).toBe(false);
    expect(
      shouldSendCheckoutEvent({
        name: "checkout_intent",
        webdriver: false,
        millisSinceFirstView: CHECKOUT_MIN_ACTION_MS,
      }),
    ).toBe(true);
    expect(
      shouldSendCheckoutEvent({
        name: "page_view",
        webdriver: true,
        millisSinceFirstView: 0,
      }),
    ).toBe(true);
  });

  it("rejects a checkout that beats the first page view", () => {
    const occurredAt = "2026-11-19T21:00:08.000Z";
    expect(
      isCheckoutTooSoon({
        name: "checkout_intent",
        occurredAt,
        visitorId: "vis_1",
        firstViewAt: "2026-11-19T21:00:01.000Z",
        firstViewKnown: true,
      }),
    ).toBe(true);
    expect(
      isCheckoutTooSoon({
        name: "checkout_intent",
        occurredAt,
        visitorId: "vis_1",
        firstViewAt: null,
        firstViewKnown: true,
      }),
    ).toBe(true);
    expect(
      isCheckoutTooSoon({
        name: "checkout_intent",
        occurredAt,
        visitorId: "vis_1",
        firstViewAt: "2026-11-19T21:00:00.000Z",
        firstViewKnown: true,
      }),
    ).toBe(false);
    expect(
      isCheckoutTooSoon({
        name: "checkout_intent",
        occurredAt,
        visitorId: "vis_1",
        firstViewAt: null,
        firstViewKnown: false,
      }),
    ).toBe(false);
    expect(
      isCheckoutTooSoon({
        name: "page_view",
        occurredAt,
        visitorId: "vis_1",
        firstViewAt: null,
        firstViewKnown: true,
      }),
    ).toBe(false);
  });

  it("matches Hetzner AS24940 and leaves residential addresses alone", () => {
    expect(isHetznerIp("95.217.10.10")).toBe(true);
    expect(isHetznerIp("5.75.128.1")).toBe(true);
    expect(isHetznerIp("5.75.127.1")).toBe(false);
    expect(isHetznerIp("2a01:4f8:1::1")).toBe(true);
    expect(isHetznerIp("151.200.1.2")).toBe(false);
    expect(isHetznerIp("8.8.8.8")).toBe(false);
    expect(isHetznerIp("2001:4860:4860::8888")).toBe(false);
    expect(isHetznerIp(undefined)).toBe(false);
  });
});
