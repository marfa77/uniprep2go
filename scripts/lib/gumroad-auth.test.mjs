import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { ensureGumroadAccessToken, resolveGumroadAccessToken } from "./gumroad-auth.mjs";

describe("gumroad auth resolution", () => {
  it("resolves a non-empty token from env, .env.local, or gumroad CLI", () => {
    const { token, source } = resolveGumroadAccessToken();
    expect(token.length).toBeGreaterThan(10);
    expect(["env", "env.local", "env.file", "cli-config", "cli-command"]).toContain(source);
  });

  it("persists CLI tokens into .env.local when missing", () => {
    const { token } = ensureGumroadAccessToken({ persist: true });
    expect(token.length).toBeGreaterThan(10);

    const envLocal = join(process.cwd(), ".env.local");
    expect(existsSync(envLocal)).toBe(true);
    expect(readFileSync(envLocal, "utf8")).toMatch(/^GUMROAD_ACCESS_TOKEN=.+/m);
  });
});
