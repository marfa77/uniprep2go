export const COOKIE_CONSENT_KEY = "uniprep2go_cookie_consent";
export const COOKIE_CONSENT_EVENT = "uniprep2go:cookie-consent";

export type CookieConsentValue = "accepted" | "rejected";

export function parseCookieConsent(value: string | null): CookieConsentValue | null {
  if (value === "accepted" || value === "rejected") {
    return value;
  }

  return null;
}

export function hasAnalyticsConsent(consent: CookieConsentValue | null) {
  return consent === "accepted";
}

export function readCookieConsent(): CookieConsentValue | null {
  if (typeof window === "undefined") {
    return null;
  }

  return parseCookieConsent(window.localStorage.getItem(COOKIE_CONSENT_KEY));
}

export function writeCookieConsent(value: CookieConsentValue) {
  window.localStorage.setItem(COOKIE_CONSENT_KEY, value);
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: value }));
}

export function subscribeToCookieConsent(onStoreChange: () => void) {
  window.addEventListener(COOKIE_CONSENT_EVENT, onStoreChange);
  return () => window.removeEventListener(COOKIE_CONSENT_EVENT, onStoreChange);
}
