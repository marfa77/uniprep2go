import Link from "next/link";
import Image from "next/image";
import { HeaderMockSearch } from "@/components/header-mock-search";
import { MobileSiteNav } from "@/components/mobile-site-nav";
import { btnFocus, btnLinkNav, cx } from "@/lib/ui-button-classes";
import { siteConfig } from "@/lib/site";

export function SiteHeader() {
  return (
    <nav className="mx-auto flex w-full max-w-6xl items-center justify-between border-b border-[#18140f]/15 px-6 pb-5 pt-10 text-sm sm:px-10 lg:px-12">
      <Link
        className={cx("inline-flex items-center gap-2.5 font-semibold tracking-tight", btnFocus)}
        href="/"
        aria-label={`${siteConfig.name} home`}
      >
        <Image
          alt=""
          aria-hidden
          className="h-7 w-auto"
          height={28}
          priority
          src="/brand/uniprep2go-mark.svg"
          width={168}
        />
      </Link>
      <div className="hidden items-center gap-4 sm:flex">
        <Link className={btnLinkNav} href="/mock-exams">
          Free mocks
        </Link>
        <HeaderMockSearch />
        <Link className={btnLinkNav} href="/#catalog">
          Anki decks
        </Link>
        <Link className={btnLinkNav} href="/building-certification-anki-decks">
          Building certs
        </Link>
        <Link className={btnLinkNav} href="/contact">
          Contact
        </Link>
      </div>
      <MobileSiteNav />
    </nav>
  );
}
