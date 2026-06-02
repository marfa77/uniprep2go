import Link from "next/link";
import { legalLinks, siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mx-auto w-full max-w-6xl px-6 pb-10 pt-4 sm:px-10 lg:px-12">
      <div className="border-t border-[#18140f]/10 pt-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl space-y-3 text-xs leading-6 text-[#6d6252]">
            <p>{siteConfig.footerDisclaimer.independence}</p>
            <p>{siteConfig.footerDisclaimer.trademarks}</p>
            <p>
              Checkout and payment processing are provided by {siteConfig.checkoutProviders}. Digital
              products are licensed for personal study use only.
            </p>
            <p>
              Need something not in the catalog?{" "}
              <Link
                className="font-medium text-[#4f493e] underline decoration-[#18140f]/20 underline-offset-4 transition hover:text-[#18140f]"
                href="/contact#custom-decks"
              >
                We build custom Anki decks on request
              </Link>
              .
            </p>
          </div>

          <nav aria-label="Legal and contact links" className="flex flex-col gap-2 text-sm">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                className="font-medium text-[#4f493e] transition hover:text-[#18140f] focus:outline-none focus:ring-2 focus:ring-[#1f3a5f]"
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
            <a
              className="font-medium text-[#4f493e] transition hover:text-[#18140f] focus:outline-none focus:ring-2 focus:ring-[#1f3a5f]"
              href={`mailto:${siteConfig.contactEmail}`}
            >
              {siteConfig.contactEmail}
            </a>
          </nav>
        </div>

        <p className="mt-6 text-xs text-[#6d6252]">
          Last updated {siteConfig.legalLastUpdated}. &copy; {new Date().getFullYear()}{" "}
          {siteConfig.name}
        </p>
      </div>
    </footer>
  );
}
