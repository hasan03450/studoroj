import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { siteUrl } from "@/lib/format";
import { fallbackSeoDescription } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: "StuduRoj – Studenten van Roj",
    template: "%s | StuduRoj",
  },
  description: fallbackSeoDescription,
  applicationName: "StuduRoj",
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: "StuduRoj",
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#1F4D3A",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="nl" className={GeistSans.variable}>
      <body>{children}</body>
    </html>
  );
}
