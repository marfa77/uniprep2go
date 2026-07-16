"use client";

import Link from "next/link";
import { useState } from "react";
import { HeaderMockSearch } from "@/components/header-mock-search";

const navLinks = [
  { href: "/mock-exams", label: "Free mocks" },
  { href: "/#catalog", label: "Anki decks" },
  { href: "/building-certification-anki-decks", label: "Building certs" },
  { href: "/contact", label: "Contact" },
] as const;

export function MobileSiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative sm:hidden">
      <button
        aria-controls="mobile-site-menu"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg border border-[#18140f]/15 px-3 text-sm font-semibold text-[#18140f] transition hover:border-[#18140f]/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1f3a5f]"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        Menu
      </button>
      {open ? (
        <nav
          aria-label="Mobile"
          className="absolute right-0 top-[calc(100%+0.5rem)] z-50 min-w-[16rem] rounded-2xl border border-[#18140f]/10 bg-[#fffaf0] p-2 shadow-lg"
          id="mobile-site-menu"
        >
          <div className="px-2 pb-2 pt-1">
            <HeaderMockSearch compact onSubmitted={() => setOpen(false)} />
          </div>
          {navLinks.map((link) => (
            <Link
              className="block rounded-xl px-4 py-3 text-sm font-medium text-[#18140f] transition hover:bg-[#f7f3ea] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1f3a5f]"
              href={link.href}
              key={link.href}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </div>
  );
}
