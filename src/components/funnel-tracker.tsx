"use client";

import { useEffect } from "react";
import type { FunnelEventName } from "@/lib/analytics";
import {
  FUNNEL_EXCLUDE_QUERY,
  FUNNEL_EXCLUDE_STORAGE_KEY,
  FUNNEL_INCLUDE_QUERY,
} from "@/lib/funnel-exclude";

type FunnelTrackerProps = {
  deckSlug: string;
  sectionEvents: Array<{
    selector: string;
    name: FunnelEventName;
  }>;
  source?: string;
};

type TrackEventInput = {
  name: FunnelEventName;
  deckSlug: string;
  source?: string;
  destinationUrl?: string;
};

function isFunnelExcluded() {
  if (typeof window === "undefined") {
    return false;
  }

  if (window.location.search.includes(FUNNEL_INCLUDE_QUERY)) {
    window.localStorage.removeItem(FUNNEL_EXCLUDE_STORAGE_KEY);
    return false;
  }

  if (window.location.search.includes(FUNNEL_EXCLUDE_QUERY)) {
    window.localStorage.setItem(FUNNEL_EXCLUDE_STORAGE_KEY, "1");
    return true;
  }

  if (window.localStorage.getItem(FUNNEL_EXCLUDE_STORAGE_KEY) === "1") {
    return true;
  }

  const hostname = window.location.hostname.toLowerCase();

  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname.endsWith(".local")
  );
}

function sendCheckoutClickEvent(payload: Record<string, unknown>) {
  void fetch("/api/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    keepalive: true,
  });
}

export function trackFunnelEvent(input: TrackEventInput) {
  const excluded = isFunnelExcluded();
  const payload = {
    ...input,
    path: window.location.pathname,
    referrer: document.referrer,
    browserLanguage: navigator.language,
    browserLanguages: Array.from(navigator.languages ?? []),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    screen: `${window.screen.width}x${window.screen.height}`,
    internal: false,
  };

  if (input.name === "checkout_click") {
    sendCheckoutClickEvent(payload);
    return;
  }

  if (excluded) {
    return;
  }

  const body = JSON.stringify(payload);

  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: "application/json" });
    navigator.sendBeacon("/api/events", blob);
    return;
  }

  void fetch("/api/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
    keepalive: true,
  });
}

export function FunnelTracker({
  deckSlug,
  sectionEvents,
  source = "landing_page",
}: FunnelTrackerProps) {
  useEffect(() => {
    trackFunnelEvent({ name: "page_view", deckSlug, source });

    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const eventName = (entry.target as HTMLElement).dataset.funnelEvent as
            | FunnelEventName
            | undefined;

          if (eventName && entry.isIntersecting && !seen.has(eventName)) {
            seen.add(eventName);
            trackFunnelEvent({ name: eventName, deckSlug, source });
          }
        });
      },
      { threshold: 0.35 },
    );

    sectionEvents.forEach(({ selector, name }) => {
      const element = document.querySelector<HTMLElement>(selector);

      if (element) {
        element.dataset.funnelEvent = name;
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [deckSlug, sectionEvents, source]);

  return null;
}

export function TrackedCheckoutLink({
  children,
  className,
  deckSlug,
  href,
  source,
}: Readonly<{
  children: React.ReactNode;
  className: string;
  deckSlug: string;
  href: string;
  source: string;
}>) {
  return (
    <a
      className={className}
      href={href}
      onClick={() => {
        trackFunnelEvent({ name: "checkout_intent", deckSlug, source });
        trackFunnelEvent({ name: "checkout_click", deckSlug, source, destinationUrl: href });
      }}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </a>
  );
}
