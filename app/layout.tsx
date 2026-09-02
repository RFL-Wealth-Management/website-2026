import type { Metadata } from "next";
import { Lora, Inter } from "next/font/google";

import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

import "./globals.css";

/**
 * Self-hosted via next/font — the mockup loaded these from Google's CDN, which
 * costs a render-blocking round trip and causes a layout shift on first paint.
 */
const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-CA"
      className={`${lora.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
