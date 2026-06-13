import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CookieConsentBanner } from "@/components/cookie-consent-banner";
import { GoogleAnalytics } from "@/components/google-analytics";
import { PixidOrganizationSchema } from "@/components/pixid-organization-schema";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "UniPrep2Go | US Exam Prep — Free Practice Tests & Flashcards",
  description:
    "Free practice tests and flashcard decks for FINRA SIE, PTCB, insurance licensing, ServSafe, California real estate, CFA, and FRM. Independent study aids for US candidates.",
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <PixidOrganizationSchema />
        {children}
        <GoogleAnalytics />
        <CookieConsentBanner />
      </body>
    </html>
  );
}
