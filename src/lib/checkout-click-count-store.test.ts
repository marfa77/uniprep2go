import { describe, expect, it } from "vitest";
import { recordCheckoutClickObservation } from "./checkout-click-count-store";

describe("checkout click observation", () => {
  it("counts each recorded click for one deck", async () => {
    const slug = "checkout-obs-test-deck";
    const first = await recordCheckoutClickObservation(slug);
    const second = await recordCheckoutClickObservation(slug);
    const other = await recordCheckoutClickObservation("checkout-obs-other-deck");

    expect(first?.n).toBe(1);
    expect(second?.n).toBe(2);
    expect(second?.since).toBe(first?.since);
    expect(other?.n).toBe(1);
    expect(await recordCheckoutClickObservation("")).toBeNull();
  });
});
