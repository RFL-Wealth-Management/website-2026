import { cn } from "@/lib/cn";

/** Small uppercase label with the mockup's 26px leading rule. */
export function Eyebrow({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 text-[12.5px] font-semibold tracking-[0.16em] uppercase",
        "before:h-0.5 before:w-[26px] before:rounded-sm before:bg-current before:opacity-55",
        className,
      )}
    >
      {children}
    </span>
  );
}
