import Link from "next/link";

import { cn } from "@/lib/utils";

export interface TabUnderlineItem {
  id: string;
  label: string;
  count: number;
  href: string;
}

export interface TabsUnderlineProps {
  items: TabUnderlineItem[];
  activeId: string;
  ariaLabel: string;
  className?: string;
}

/**
 * Tabs estilo "underline" (vs pill) — el active item tiene un border-bottom
 * de 2px en ink. Counter pill a la derecha del label con tabular-nums.
 * Border-bottom global debajo de la barra para ancla visual.
 */
export function TabsUnderline({ items, activeId, ariaLabel, className }: TabsUnderlineProps) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        "flex items-center gap-1 border-b border-border",
        "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      {items.map((t) => {
        const active = t.id === activeId;
        return (
          <Link
            key={t.id}
            href={t.href}
            role="tab"
            aria-selected={active}
            className={cn(
              "-mb-px inline-flex shrink-0 items-center gap-1.5 border-b-2 px-3.5 py-2.5",
              "text-[13.5px] transition-colors duration-[120ms]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink",
              active
                ? "border-ink font-medium text-ink"
                : "border-transparent text-ink-muted hover:text-ink",
            )}
          >
            {t.label}
            <span
              className={cn(
                "rounded-full px-1.5 py-0.5 text-[11px] font-semibold tabular-nums",
                active ? "bg-ink text-bg" : "bg-beige text-ink-muted",
              )}
            >
              {t.count}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
