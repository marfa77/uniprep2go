import { freeMockStatLine } from "./free-diagnostic";

type MockStatInput = {
  questionCount: number;
  durationMinutes: number;
  passPercent: number;
};

/** Our mock threshold — never the official exam's pass rule (MPS, scaled, equated…). */
export function mockReadinessTargetLabel(passPercent: number): string {
  return `UniPrep2Go readiness target: ${passPercent}%`;
}

/** Card line for a live mock: what the free first attempt is, and the full Mock Pass length. */
export function formatMockStatLine({ questionCount, durationMinutes }: MockStatInput): string {
  return freeMockStatLine({ questionCount, durationMinutes });
}
