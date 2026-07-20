"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { HeaderMockSearch } from "@/components/header-mock-search";
import { btnFocus, cx } from "@/lib/ui-button-classes";

const navLinks = [
  { href: "/mock-exams", label: "Free mocks" },
  { href: "/#catalog", label: "Anki decks" },
  { href: "/building-certification-anki-decks", label: "Building certs" },
  { href: "/comics/gaivota-em-portugal", label: "Comics" },
  { href: "/contact", label: "Contact" },
] as const;

export function MobileSiteNav() {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const panelRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const panel = panelRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;

    const focusable = panel?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    focusable?.[0]?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !focusable || focusable.length === 0) {
        return;
      }

      const items = Array.from(focusable);
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) {
        return;
      }

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [open]);

  return (
    <div className="relative sm:hidden">
      <button
        ref={buttonRef}
        aria-controls={menuId}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        className={cx(
          "inline-flex min-h-12 min-w-12 items-center justify-center rounded-lg border border-[#18140f]/15 px-3 text-sm font-semibold text-[#18140f] transition hover:border-[#18140f]/30",
          btnFocus,
        )}
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        Menu
      </button>
      {open ? (
        <>
          <button
            aria-label="Close menu"
            className="fixed inset-0 z-40 bg-[#18140f]/25"
            onClick={() => setOpen(false)}
            type="button"
          />
          <nav
            ref={panelRef}
            aria-label="Mobile"
            className="absolute right-0 top-[calc(100%+0.5rem)] z-50 min-w-[16rem] rounded-2xl border border-[#18140f]/10 bg-[#fffaf0] p-2 shadow-lg"
            id={menuId}
          >
            <div className="px-2 pb-2 pt-1">
              <HeaderMockSearch compact onSubmitted={() => setOpen(false)} />
            </div>
            {navLinks.map((link) => (
              <Link
                className={cx(
                  "block rounded-xl px-4 py-3 text-sm font-medium text-[#18140f] transition hover:bg-[#f7f3ea]",
                  btnFocus,
                )}
                href={link.href}
                key={link.href}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </>
      ) : null}
    </div>
  );
}
