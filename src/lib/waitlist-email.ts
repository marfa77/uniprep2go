/** Normalize and validate an opt-in waitlist / interest email. */
export function normalizeWaitlistEmail(value: unknown): string | null {
  if (typeof value !== "string") return null;

  const email = value.trim().toLowerCase();
  if (email.length < 5 || email.length > 254) return null;

  // Practical address shape — enough to reject empty/garbage without a full RFC parser.
  if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(email)) return null;

  return email;
}
