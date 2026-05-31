"use client";

import { useEffect } from "react";
import type { FunnelEventName } from "@/lib/analytics";

type FunnelTrackerProps = {
  deckSlug: string;
  sectionEvents: Array<{
    selector: string;
    name: FunnelEventName;
  }>;
};

type TrackEventInput = {
  name: FunnelEventName;
  deckSlug: string;
  source?: string;
};

export function trackFunnelEvent(input: TrackEventInput) {
  const payload = {
    ...input,
    path: window.location.pathname,
    referrer: document.referrer,
  };

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

export function FunnelTracker({ deckSlug, sectionEvents }: FunnelTrackerProps) {
  useEffect(() => {
    trackFunnelEvent({ name: "page_view", deckSlug, source: "landing_page" });

    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const eventName = (entry.target as HTMLElement).dataset.funnelEvent as
            | FunnelEventName
            | undefined;

          if (eventName && entry.isIntersecting && !seen.has(eventName)) {
            seen.add(eventName);
            trackFunnelEvent({ name: eventName, deckSlug, source: "section_view" });
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
  }, [deckSlug, sectionEvents]);

  return null;
}

export function TrackedGumroadLink({
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
        trackFunnelEvent({ name: "gumroad_click", deckSlug, source });
      }}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </a>
  );
}
