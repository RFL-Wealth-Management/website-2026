import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/primitives/Container";
import { FALLBACK_SETTINGS } from "@/lib/content/settings";
import type {
  FooterColumn,
  FooterLink,
  SiteSettingsData,
} from "@/sanity/lib/types";

export function SiteFooter({ settings }: { settings?: SiteSettingsData }) {
  // Whole-object fallback — see FALLBACK_SETTINGS. Anything the editor clears
  // in the Studio stays cleared instead of reverting to repo copy.
  const s = settings ?? FALLBACK_SETTINGS;

  const blurb = s.footerBlurb;
  const newsletter = s.newsletter;
  const copyright = s.copyright;
  const disclaimer = s.disclaimer;
  const columns: readonly FooterColumn[] = s.footerColumns ?? [];
  const legal: readonly FooterLink[] = s.legalLinks ?? [];

  return (
    <footer data-theme="dark" className="bg-[#16243D] py-14 md:py-16">
      <Container>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div>
            <Image
              src="/brand/rfl-logo.png"
              alt="RFL Wealth Management"
              width={480}
              height={217}
              className="h-11 w-auto"
            />
            <p className="mt-5 max-w-[32em] text-[14px] text-dark-micro">
              {blurb}
            </p>
          </div>

          {columns.map((col, i) => (
            <div key={col.title ?? i}>
              <h2 className="font-sans text-[13px] font-semibold tracking-[0.12em] text-white uppercase">
                {col.title}
              </h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links?.map((link, j) => (
                  <li key={link.label ?? j}>
                    <Link
                      href={link.href ?? "#"}
                      className="text-[14.5px] text-dark-nav hover:text-seafoam"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h2 className="font-sans text-[13px] font-semibold tracking-[0.12em] text-white uppercase">
              {newsletter?.title}
            </h2>
            <p className="mt-4 text-[13.5px] text-dark-micro">
              {newsletter?.body}
            </p>
            {/* Wired to Zoho Flow in Phase 4. */}
            <form className="mt-4 flex flex-col gap-2 sm:flex-row">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                placeholder={newsletter?.placeholder}
                className="min-w-0 flex-1 rounded-lg border border-white/15 bg-white/[0.06] px-3.5 py-2.5 text-[14.5px] text-white placeholder:text-[#7C8CA8]"
              />
              <button
                type="button"
                className="rounded-lg bg-seafoam px-4 py-2.5 text-[14.5px] font-semibold text-navy hover:bg-seafoam-lift"
              >
                {newsletter?.button}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
          <span className="text-[13px] text-dark-micro">{copyright}</span>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legal.map((item, i) => (
              <li key={item.label ?? i}>
                <Link
                  href={item.href ?? "#"}
                  className="text-[13px] text-dark-nav hover:text-seafoam"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-6 text-[12px] text-[#6E7E9A]">{disclaimer}</p>
      </Container>
    </footer>
  );
}
