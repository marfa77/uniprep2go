import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { contactSections } from "@/lib/legal-content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${siteConfig.name} for support, privacy requests, and product questions.`,
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#f7f3ea] text-[#18140f]">
      <SiteHeader />

      <article className="mx-auto w-full max-w-3xl px-6 py-10 sm:px-10 lg:px-12">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#1f3a5f]">Contact</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">Get in touch</h1>
        <p className="mt-4 text-base leading-7 text-[#4f493e]">
          Use the channels below for product questions, website issues, privacy requests, or legal
          notices.
        </p>

        <div className="mt-8 rounded-3xl border border-[#18140f]/15 bg-[#fffaf0]/70 p-6">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#7a6e5a]">Email</p>
          <a
            className="mt-3 inline-block text-2xl font-semibold tracking-tight underline decoration-[#18140f]/20 underline-offset-4"
            href={`mailto:${siteConfig.contactEmail}`}
          >
            {siteConfig.contactEmail}
          </a>
          <p className="mt-4 text-sm leading-6 text-[#5f5749]">
            Purchases are completed on {siteConfig.checkoutProvider}. For download access, receipts,
            or refund requests, start with your {siteConfig.checkoutProvider} order email.
          </p>
        </div>

        <div className="mt-10 space-y-10">
          {contactSections.map((section) => (
            <section key={section.id} id={section.id}>
              <h2 className="text-2xl font-semibold tracking-tight">{section.title}</h2>
              <div className="mt-4 space-y-4 text-base leading-7 text-[#4f493e]">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-4 text-sm font-medium">
          <Link className="underline decoration-[#18140f]/20 underline-offset-4" href="/privacy">
            Privacy Policy
          </Link>
          <Link className="underline decoration-[#18140f]/20 underline-offset-4" href="/terms">
            Terms of Service
          </Link>
          <Link className="underline decoration-[#18140f]/20 underline-offset-4" href="/cookies">
            Cookie Policy
          </Link>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
