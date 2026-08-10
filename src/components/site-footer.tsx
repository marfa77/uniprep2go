import Link from "next/link";
import { FooterCredit } from "@/components/footer-credit";
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
              . Authors with a strong exam deck can also{" "}
              <Link
                className="font-medium text-[#4f493e] underline decoration-[#18140f]/20 underline-offset-4 transition hover:text-[#18140f]"
                href="/sell-anki-deck"
              >
                partner with us
              </Link>{" "}
              — QC, free mock, monthly bank-to-bank payout.
            </p>
          </div>

          <nav aria-label="Legal, contact, and machine-readable links" className="flex flex-col gap-4 text-sm">
            <div className="flex flex-col gap-2">
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
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#7a6e5a]">
                For AI assistants
              </p>
              <ul className="mt-2 space-y-1.5 text-xs leading-6 text-[#6d6252]">
                <li>
                  <Link className="font-medium text-[#4f493e] hover:text-[#18140f] hover:underline" href="/llms.txt">
                    /llms.txt
                  </Link>
                  {" — curated catalog entrypoint"}
                </li>
                <li>
                  <Link className="font-medium text-[#4f493e] hover:text-[#18140f] hover:underline" href="/llms-full.txt">
                    /llms-full.txt
                  </Link>
                  {" — full product bundle"}
                </li>
                <li>
                  <Link className="font-medium text-[#4f493e] hover:text-[#18140f] hover:underline" href="/api/facts">
                    /api/facts
                  </Link>
                  {" · "}
                  <Link className="font-medium text-[#4f493e] hover:text-[#18140f] hover:underline" href="/api/mock-exams">
                    /api/mock-exams
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <nav
          aria-label="Sister PixID products"
          className="mt-8 border-t border-[#18140f]/08 pt-4 text-[11px] leading-5 text-[#8a7f6e]"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#9a8f7c]">
            Sister products
          </p>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
            <a
              className="underline decoration-[#18140f]/15 underline-offset-2 transition hover:text-[#4f493e]"
              href="https://www.prep2go.study/ciple-a2"
              rel="noopener"
              target="_blank"
            >
              Prep2Go languages
            </a>
            <span aria-hidden>·</span>
            <Link
              className="underline decoration-[#18140f]/15 underline-offset-2 transition hover:text-[#4f493e]"
              href="/comics/gaivota-em-portugal"
            >
              Gaivota comics
            </Link>
            <span aria-hidden>·</span>
            <a
              className="underline decoration-[#18140f]/15 underline-offset-2 transition hover:text-[#4f493e]"
              href="https://www.emigro.online/ru/portugal"
              rel="noopener"
              target="_blank"
            >
              Emigro
            </a>
            <span aria-hidden>·</span>
            <a
              className="underline decoration-[#18140f]/15 underline-offset-2 transition hover:text-[#4f493e]"
              href="https://www.barakhlo.online/"
              rel="noopener"
              target="_blank"
            >
              Barakhlo
            </a>
            <span aria-hidden>·</span>
            <a
              className="underline decoration-[#18140f]/15 underline-offset-2 transition hover:text-[#4f493e]"
              href="https://www.emigro.online/ru/role-radar?utm_source=uniprep2go&utm_medium=footer&utm_campaign=role_radar"
              rel="noopener"
              target="_blank"
            >
              Role Radar — senior job digests
            </a>
          </div>
        </nav>

        <p className="mt-6 text-xs text-[#6d6252]">
          Last updated {siteConfig.legalLastUpdated}. &copy; {new Date().getFullYear()}{" "}
          {siteConfig.name}
        </p>
        <FooterCredit className="footer-credit mt-3 text-xs text-[#6d6252]" />
      </div>
    </footer>
  );
}
