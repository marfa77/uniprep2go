import Link from "next/link";
import { legalLinks, siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mx-auto w-full max-w-6xl px-6 pb-10 pt-4 sm:px-10 lg:px-12">
      <div className="border-t border-[#18140f]/10 pt-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl space-y-3 text-xs leading-6 text-[#6d6252]">
            <p>
              CFA Institute does not endorse, promote, or warrant this product. CFA&reg; and
              Chartered Financial Analyst&reg; are trademarks owned by CFA Institute. {siteConfig.name}{" "}
              is an independent study aid publisher.
            </p>
            <p>
              Checkout and payment processing are provided by {siteConfig.checkoutProviders}. Digital
              products are licensed for personal study use only.
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

        <p className="mt-6 text-xs text-[#8a7d68]">
          Last updated {siteConfig.legalLastUpdated}. &copy; {new Date().getFullYear()}{" "}
          {siteConfig.name}
        </p>
      </div>
    </footer>
  );
}
