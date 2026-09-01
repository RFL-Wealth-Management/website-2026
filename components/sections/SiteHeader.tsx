"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useState } from "react";

import { Button } from "@/components/primitives/Button";
import { Container } from "@/components/primitives/Container";
import type { NavItem, SiteSettings } from "@/sanity/lib/types";

const topLinkClass =
  "border-b-2 py-1.5 transition-colors hover:border-seafoam hover:text-white";

/** Stable identity for an item, so the header can track which panel is open. */
function keyOf(item: NavItem, i: number) {
  return item._key ?? item.label ?? String(i);
}

function Chevron({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 12 8"
      aria-hidden="true"
      className={`h-2 w-3 transition-transform duration-200 ${className ?? ""}`}
    >
      <path
        d="M1 1.5 6 6.5l5-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * The trailing arrow on every mega-panel link.
 *
 * A glyph rather than an SVG, matching the Button primitive — the two sit close
 * enough on screen that a second arrow shape would read as a mistake.
 *
 * Inline, not a flex sibling: these labels are long enough to wrap, and a flex
 * row would park the arrow at the far right of the column, stranded a line
 * below the text it belongs to. Inline flow keeps it after the last word.
 */
function Arrow() {
  return (
    <span
      aria-hidden="true"
      className="ml-1.5 inline-block transition-transform duration-200 group-hover:translate-x-1"
    >
      →
    </span>
  );
}

/**
 * True once we know the device has a real pointer that can hover.
 *
 * Starts false so the server render and the first client render agree, then
 * resolves after hydration — hover is a post-hydration concern anyway.
 */
function useCanHover() {
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setCanHover(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return canHover;
}

/**
 * A top-level desktop item, with an optional full-bleed mega panel.
 *
 * The panel is a DOM child of this `<li>` but is positioned against the header
 * root — the only positioned ancestor between them. That split is deliberate:
 * rendering it here keeps Tab order natural (trigger, then its own links, then
 * the next item), while positioning it there lets it span the viewport rather
 * than the 1180px container.
 *
 * Open state lives in the header, not here. Only one panel may be open, and the
 * pointer has to cross the nav's bottom padding — which belongs to no item — on
 * the way down into the panel, so the close has to be owned by an ancestor that
 * spans both.
 *
 * The parent stays a real link — it points at its own section — so the
 * disclosure sits on a separate button beside it rather than hijacking the
 * link's click. That keeps the panel reachable three ways: hover, the button
 * (also the touch affordance on tablets, where `lg:` is already the desktop
 * layout), and Tab.
 *
 * Hover is bound only on hover-capable pointers. A touchscreen synthesises
 * `mouseenter` immediately before `click`, so leaving it on would open the panel
 * and then have the button's own toggle close it again — a tap that looks like
 * it did nothing.
 */
function DesktopNavItem({
  item,
  open,
  onOpen,
  onClose,
  canHover,
}: {
  item: NavItem;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  canHover: boolean;
}) {
  const children = item.children ?? [];
  const panelId = useId();

  if (children.length === 0) {
    return (
      <li>
        <Link
          href={item.href ?? "#"}
          className={`${topLinkClass} border-transparent text-dark-nav`}
        >
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li onMouseEnter={canHover ? onOpen : undefined}>
      <div className="flex items-center gap-1.5">
        {/* Open-on-focus is bound here rather than on the <li>, so it cannot
            see the chevron's own focus. Bubbled to the item it would fight the
            toggle below: a click focuses the button first, React re-renders
            with the panel open, and the click handler that then runs is the
            one that closes it — a chevron that visibly does nothing. */}
        <Link
          href={item.href ?? "#"}
          onFocus={onOpen}
          className={`${topLinkClass} ${
            open
              ? "border-seafoam text-white"
              : "border-transparent text-dark-nav"
          }`}
        >
          {item.label}
        </Link>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={open ? onClose : onOpen}
          className={`flex h-6 w-5 items-center justify-center transition-colors hover:text-white ${
            open ? "text-white" : "text-dark-nav"
          }`}
        >
          <span className="sr-only">{item.label} submenu</span>
          <Chevron className={open ? "rotate-180" : ""} />
        </button>
      </div>

      {open && (
        <div
          id={panelId}
          className="absolute inset-x-0 top-full z-30 border-t border-hairline bg-cream text-ink shadow-[0_28px_56px_-28px_rgba(10,20,40,0.55)]"
        >
          <Container>
            <div className="grid gap-x-16 gap-y-7 py-10 lg:grid-cols-[15rem_1fr]">
              <Link
                href={item.href ?? "#"}
                onClick={onClose}
                className="group self-start font-serif text-[21px] leading-snug font-medium text-ink transition-colors hover:text-teal"
              >
                {item.label}
                <Arrow />
              </Link>

              {/* CSS columns, not a grid: the child count comes from Sanity, so
                  the browser balances the split instead of us hardcoding a row
                  count that breaks the moment an editor adds an eighth link. */}
              <ul className="columns-2 gap-x-14">
                {children.map((child, i) => (
                  <li key={keyOf(child, i)} className="break-inside-avoid pb-4">
                    <Link
                      href={child.href ?? "#"}
                      onClick={onClose}
                      className="group text-[15px] leading-snug text-ink-soft transition-colors hover:text-teal"
                    >
                      {child.label}
                      <Arrow />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </div>
      )}
    </li>
  );
}

/** The same item in the phone panel, where the submenu is an accordion. */
function MobileNavItem({
  item,
  onNavigate,
}: {
  item: NavItem;
  onNavigate: () => void;
}) {
  const children = item.children ?? [];
  const [open, setOpen] = useState(false);
  const panelId = useId();

  if (children.length === 0) {
    return (
      <li>
        <Link
          href={item.href ?? "#"}
          onClick={onNavigate}
          className="block py-3 text-[17px] font-medium text-dark-nav hover:text-white"
        >
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <div className="flex items-center justify-between gap-3">
        <Link
          href={item.href ?? "#"}
          onClick={onNavigate}
          className="block py-3 text-[17px] font-medium text-dark-nav hover:text-white"
        >
          {item.label}
        </Link>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center text-dark-nav hover:text-white"
        >
          <span className="sr-only">{item.label} submenu</span>
          <Chevron className={open ? "rotate-180" : ""} />
        </button>
      </div>

      {open && (
        <ul
          id={panelId}
          className="mb-2 ml-1 flex flex-col border-l border-dark-rule/50 pl-4"
        >
          {children.map((child, i) => (
            <li key={keyOf(child, i)}>
              <Link
                href={child.href ?? "#"}
                onClick={onNavigate}
                className="block py-2.5 text-[15px] leading-snug text-dark-micro hover:text-white"
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export function SiteHeader({ settings }: { settings: SiteSettings }) {
  const [open, setOpen] = useState(false);
  const [openPanel, setOpenPanel] = useState<string | null>(null);
  const canHover = useCanHover();

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
    // The header root is both the mega panel's positioning ancestor and the
    // owner of its close events — two jobs that need an element spanning the
    // nav *and* the panel, which is why `relative z-20` moved here off <nav>.
    <div
      className="relative z-20"
      onMouseLeave={canHover ? () => setOpenPanel(null) : undefined}
      // Close only when focus leaves the header entirely: moving between a
      // trigger and its own panel links fires blur too, and must not close it.
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpenPanel(null);
      }}
      onKeyDown={(e) => e.key === "Escape" && setOpenPanel(null)}
    >
      <Container>
        <nav
          aria-label="Primary"
          className="flex items-center justify-between gap-7 py-5"
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
            {items.map((item, i) => {
              const key = keyOf(item, i);
              return (
                <DesktopNavItem
                  key={key}
                  item={item}
                  canHover={canHover}
                  open={openPanel === key}
                  onOpen={() => setOpenPanel(key)}
                  onClose={() => setOpenPanel(null)}
                />
              );
            })}
          </ul>

          {/* Visibility lives on the wrapper: a `hidden` on the Button itself
              would be merged away against its own `inline-flex`. */}
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
        <div className="pb-5 lg:hidden">
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
            className="border-t border-white/10 pb-4 lg:hidden"
          >
            <ul className="flex flex-col py-2">
              {items.map((item, i) => (
                <MobileNavItem
                  key={keyOf(item, i)}
                  item={item}
                  onNavigate={() => setOpen(false)}
                />
              ))}
            </ul>
          </div>
        )}
      </Container>
    </div>
  );
}
