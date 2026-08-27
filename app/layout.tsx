import type { Metadata } from "next";
import { Lora, Inter } from "next/font/google";
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
    default: "RFL Wealth Management",
    template: "%s · RFL Wealth Management",
  },
  description:
    "Integrated financial planning built for Canadian physicians — tax, corporation, investments, insurance, estate and retirement, coordinated around one plan.",
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
