"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/primitives/Button";
import { Container } from "@/components/primitives/Container";
import type { NavItem, SiteSettings } from "@/sanity/lib/types";

export function SiteHeader({ settings }: { settings: SiteSettings }) {
  const [open, setOpen] = useState(false);

  const s = settings;
  const items: readonly NavItem[] = s.navItems ?? [];
  const cta = s.navCta;

  // Lock scroll behind the mobile panel, and close it on Escape.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <Container>
      <nav
        aria-label="Primary"
        className="relative z-20 flex items-center justify-between gap-7 py-5"
      >
        <Link href="/" aria-label="RFL Wealth Management — home">
          <Image
            src="/brand/rfl-logo.png"
            alt="RFL Wealth Management"
            width={480}
            height={217}
            priority
            className="h-10 w-auto md:h-[46px]"
          />
        </Link>

        <ul className="hidden items-center gap-7 text-[14.5px] font-medium lg:flex">
          {items.map((item, i) => (
            <li key={item.label ?? i}>
              <Link
                href={item.href ?? "#"}
                className="border-b-2 border-transparent py-1.5 text-dark-nav transition-colors hover:border-seafoam hover:text-white"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Visibility lives on the wrapper: `cn` is a plain join, so a `hidden`
            on the Button itself would collide with its own `inline-flex`. */}
        <div className="hidden lg:block">
          <Button
            href={cta?.href ?? "#"}
            arrow={false}
            className="px-5 py-2.5 text-[14.5px]"
          >
            {cta?.label}
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-lg lg:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              aria-hidden="true"
              className={`block h-0.5 w-6 bg-white transition-transform duration-200 ${
                open && i === 0 ? "translate-y-[7px] rotate-45" : ""
              } ${open && i === 1 ? "opacity-0" : ""} ${
                open && i === 2 ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          ))}
        </button>
      </nav>

      {/* On phones the CTA gets its own row beneath the logo/hamburger line. */}
      <div className="relative z-20 pb-5 lg:hidden">
        <Button
          href={cta?.href ?? "#"}
          arrow={false}
          className="w-full justify-center"
        >
          {cta?.label}
        </Button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="relative z-20 border-t border-white/10 pb-4 lg:hidden"
        >
          <ul className="flex flex-col py-2">
            {items.map((item, i) => (
              <li key={item.label ?? i}>
                <Link
                  href={item.href ?? "#"}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-[17px] font-medium text-dark-nav hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Container>
  );
}
