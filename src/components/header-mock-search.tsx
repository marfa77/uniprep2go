"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

type HeaderMockSearchProps = {
  compact?: boolean;
  onSubmitted?: () => void;
};

export function HeaderMockSearch({ compact = false, onSubmitted }: HeaderMockSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = query.trim();
    router.push(next ? `/mock-exams?q=${encodeURIComponent(next)}` : "/mock-exams#search");
    onSubmitted?.();
  }

  return (
    <form
      aria-label="Search practice tests"
      className={compact ? "w-full" : "hidden md:block"}
      onSubmit={handleSubmit}
    >
      <label className="sr-only" htmlFor={compact ? "mobile-mock-search" : "header-mock-search"}>
        Search practice tests
      </label>
      <input
        className={
          compact
            ? "min-h-12 w-full rounded-xl border border-[#18140f]/15 bg-[#f7f3ea] px-3 py-2.5 text-sm text-[#18140f] outline-none placeholder:text-[#8a7d68] focus:border-[#1f3a5f] focus:ring-2 focus:ring-[#1f3a5f]/25"
            : "min-h-12 w-44 rounded-lg border border-[#18140f]/15 bg-transparent px-3 py-2 text-sm text-[#18140f] outline-none transition placeholder:text-[#8a7d68] focus:w-56 focus:border-[#1f3a5f] focus:ring-2 focus:ring-[#1f3a5f]/25 xl:w-52"
        }
        id={compact ? "mobile-mock-search" : "header-mock-search"}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search exams…"
        type="search"
        value={query}
      />
    </form>
  );
}
