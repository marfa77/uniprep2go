import Link from "next/link";
import { MobileSiteNav } from "@/components/mobile-site-nav";
import { btnFocus, btnLinkNav, btnPrimarySm, cx } from "@/lib/ui-button-classes";
import { siteConfig } from "@/lib/site";

const headerLinks = [
  { href: "/mock-exams", label: "Practice tests" },
  { href: "/decks", label: "Decks" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "Questions" },
] as const;

export function SiteHeader() {
  return (
    <header className="border-b border-line bg-paper">
      <div className="h-1 bg-navy" />
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5 text-sm">
        <Link
          className={cx("font-serif text-2xl font-normal tracking-tight text-ink", btnFocus)}
          href="/"
          aria-label={`${siteConfig.name} home`}
        >
          {siteConfig.name}
        </Link>
        <div className="hidden items-center gap-6 sm:flex">
          {headerLinks.map((link) => (
            <Link className={btnLinkNav} href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
          <Link className={btnPrimarySm} href="/decks/cfa-level-1-anki-deck">
            Get Deck — $19
          </Link>
        </div>
        <MobileSiteNav />
      </nav>
    </header>
  );
}
