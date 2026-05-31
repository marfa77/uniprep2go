"use client";

import { useEffect } from "react";
import { useSyncExternalStore } from "react";
import {
  hasAnalyticsConsent,
  readCookieConsent,
  subscribeToCookieConsent,
} from "@/lib/cookie-consent";
import { siteConfig } from "@/lib/site";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function loadGoogleAnalytics() {
  if (document.getElementById("google-analytics-loader")) {
    return;
  }

  const loader = document.createElement("script");
  loader.id = "google-analytics-loader";
  loader.async = true;
  loader.src = `https://www.googletagmanager.com/gtag/js?id=${siteConfig.googleAnalyticsId}`;
  document.head.appendChild(loader);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", siteConfig.googleAnalyticsId);
}

function loadAhrefsAnalytics() {
  if (document.getElementById("ahrefs-analytics-loader")) {
    return;
  }

  const loader = document.createElement("script");
  loader.id = "ahrefs-analytics-loader";
  loader.async = true;
  loader.src = "https://analytics.ahrefs.com/analytics.js";
  loader.setAttribute("data-key", siteConfig.ahrefsAnalyticsKey);
  document.head.appendChild(loader);
}

function loadConsentAnalytics() {
  loadGoogleAnalytics();
  loadAhrefsAnalytics();
}

export function GoogleAnalytics() {
  const consent = useSyncExternalStore(
    subscribeToCookieConsent,
    readCookieConsent,
    () => null,
  );

  useEffect(() => {
    if (hasAnalyticsConsent(consent)) {
      loadConsentAnalytics();
    }
  }, [consent]);

  return null;
}
