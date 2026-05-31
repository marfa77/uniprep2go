import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function SiteHeader() {
  return (
    <nav className="mx-auto flex w-full max-w-6xl items-center justify-between border-b border-[#18140f]/15 px-6 pb-5 pt-10 text-sm sm:px-10 lg:px-12">
      <Link
        className="font-semibold tracking-tight focus:outline-none focus:ring-2 focus:ring-[#1f3a5f]"
        href="/"
        aria-label={`${siteConfig.name} home`}
      >
        {siteConfig.name}
      </Link>
      <Link
        className="font-medium text-[#4f493e] transition hover:text-[#18140f] focus:outline-none focus:ring-2 focus:ring-[#1f3a5f]"
        href="/contact"
      >
        Contact
      </Link>
    </nav>
  );
}
