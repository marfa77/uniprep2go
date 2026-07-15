import { describe, expect, it } from "vitest";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  evaluateCertification,
  findCert,
  loadRegistry,
} from "../../scripts/lib/certification-pipeline.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");

describe("certification pipeline", () => {
  const registry = loadRegistry(root);

  it("loads registry with building certifications", () => {
    expect(registry.certifications.length).toBeGreaterThanOrEqual(13);
    expect(findCert(registry, { id: "epa-608" })?.mockSlug).toBe("epa-608-readiness-check");
  });

  it("evaluates EPA 608 with bank and cover passing blocking gates", () => {
    const cert = findCert(registry, { id: "epa-608" });
    expect(cert).toBeDefined();

    const result = evaluateCertification(root, cert!);
    expect(result.gates.find((g) => g.id === "mock-bank")?.status).toBe("pass");
    expect(result.gates.find((g) => g.id === "cover-image")?.status).toBe("pass");
    expect(result.gates.find((g) => g.id === "mock-config")?.status).toBe("pass");
  });

  it("flags empty banks as blocking failures", () => {
    const cert = findCert(registry, { id: "leed-ga" });
    expect(cert).toBeDefined();

    const result = evaluateCertification(root, cert!);
    const bankGate = result.gates.find((g) => g.id === "mock-bank");
    expect(bankGate?.status).toBe("fail");
    expect(result.ready).toBe(false);
  });
});
