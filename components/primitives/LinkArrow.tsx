import Link from "next/link";

import { cn } from "@/lib/cn";

export function LinkArrow({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2 border-b-2 border-transparent pb-0.5 text-[15.5px] font-semibold",
        "text-teal transition-colors hover:border-teal",
        "on-dark:text-seafoam on-dark:hover:border-seafoam",
        className,
      )}
    >
      {children}
      <span aria-hidden="true">→</span>
    </Link>
  );
}
