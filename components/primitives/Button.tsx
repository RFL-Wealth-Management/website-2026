import Link from "next/link";

import { cn } from "@/lib/cn";

export type Variant = "seafoam" | "navy" | "white";

const VARIANTS: Record<Variant, string> = {
  seafoam: "bg-seafoam text-navy hover:bg-seafoam-lift",
  navy: "bg-navy text-white hover:bg-navy-lift",
  white: "bg-white text-teal",
};

/**
 * Sanity hands back a plain `string` for the variant dropdown, so narrow it
 * here rather than casting at each call site — a value removed from the schema
 * later degrades to the default instead of rendering an unstyled button.
 */
export function asVariant(value?: string): Variant {
  return value && value in VARIANTS ? (value as Variant) : "seafoam";
}

export function Button({
  href,
  variant = "seafoam",
  arrow = true,
  className,
  children,
}: {
  href: string;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-[15.5px] font-semibold",
        "transition-[transform,box-shadow,background] duration-200 hover:shadow-[0_10px_24px_rgba(0,0,0,0.18)]",
        VARIANTS[variant],
        className,
      )}
    >
      {children}
      {arrow && (
        <span
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:translate-x-1"
        >
          →
        </span>
      )}
    </Link>
  );
}
