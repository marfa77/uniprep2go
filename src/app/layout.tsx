import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CookieConsentBanner } from "@/components/cookie-consent-banner";
import { GoogleAnalytics } from "@/components/google-analytics";
import { PixidOrganizationSchema } from "@/components/pixid-organization-schema";
import { SkipToContent } from "@/components/skip-to-content";
import { defaultMetadata } from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = defaultMetadata;

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
        <SkipToContent />
        <PixidOrganizationSchema />
        {children}
        <GoogleAnalytics />
        <CookieConsentBanner />
      </body>
    </html>
  );
}
