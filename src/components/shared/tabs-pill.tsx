import Link from "next/link";

import { cn } from "@/lib/utils";

export interface TabPillItem {
  id: string;
  label: string;
  count: number;
  href: string;
}

export interface TabsPillProps {
  items: TabPillItem[];
  activeId: string;
  ariaLabel: string;
  className?: string;
}

/**
 * Tabs estilo "pill" para navegación filtrada por URL (server-component friendly).
 * Cada tab tiene un counter con `tabular-nums`. Underline divider abajo.
 * Para pantalla 7 (`/applications`) y pantalla 10 (`/applicants`).
 */
export function TabsPill({ items, activeId, ariaLabel, className }: TabsPillProps) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        "flex items-center gap-1 overflow-x-auto border-b border-border pb-3.5",
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
              "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2",
              "whitespace-nowrap text-[13px] font-medium transition-colors duration-[120ms]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink",
              active
                ? "border-ink bg-ink text-bg"
                : "border-transparent bg-transparent text-ink-muted hover:text-ink",
            )}
          >
            {t.label}
            <span
              className={cn(
                "rounded-full px-1.5 py-0.5 text-[11px] font-semibold tabular-nums",
                active ? "bg-white/20 text-bg" : "bg-beige text-ink-muted",
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
