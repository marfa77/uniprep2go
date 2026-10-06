"use client";

import { useEffect, useState } from "react";
import { mockStartCountCopy } from "@/lib/mock-exams/mock-start-count";

export function MockStartCountNote({ slug }: { slug: string }) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    void fetch(`/api/mock-exams/start-count?slug=${encodeURIComponent(slug)}`, {
      cache: "no-store",
    })
      .then((res) => (res.ok ? res.json() : { count: null }))
      .then((body: { count?: number | null }) => {
        if (!cancelled && typeof body.count === "number") {
          setCount(body.count);
        }
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (count == null) {
    return null;
  }

  return (
    <p className="mt-4 text-sm leading-6 text-[#5f5749]" id="mock-start-count">
      {mockStartCountCopy(count)}. Unique first starts — bots and our own test browsers are
      excluded. Not an official exam volume.
    </p>
  );
}
