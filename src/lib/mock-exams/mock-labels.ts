type MockStatInput = {
  questionCount: number;
  durationMinutes: number;
  passPercent: number;
};

/** Our mock threshold — never the official exam's pass rule (MPS, scaled, equated…). */
export function mockReadinessTargetLabel(passPercent: number): string {
  return `UniPrep2Go readiness target: ${passPercent}%`;
}

export function formatMockStatLine({ questionCount, durationMinutes, passPercent }: MockStatInput): string {
  return `${questionCount}-question diagnostic · ${durationMinutes} min · ${passPercent}% readiness target`;
}
