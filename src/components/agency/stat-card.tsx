import { ArrowDown, ArrowUp } from "lucide-react";

import { cn } from "@/lib/utils";

export interface StatCardProps {
  label: string;
  value: string | number;
  delta?: string;
  deltaTone?: "up" | "down" | "neutral";
  /** Si está presente, muestra un dot coral pulsante arriba a la derecha (call attention). */
  accent?: boolean;
  className?: string;
}

/**
 * Card individual del bloque de stats del dashboard. Layout: label eyebrow
 * + value font-display tabular-nums + delta optional con flecha y tono
 * semántico (success/danger/neutral).
 */
export function StatCard({
  label,
  value,
  delta,
  deltaTone = "neutral",
  accent,
  className,
}: StatCardProps) {
  const deltaClass =
    deltaTone === "up"
      ? "text-success"
      : deltaTone === "down"
        ? "text-danger"
        : "text-ink-muted";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[12px] border border-border bg-bg p-[18px]",
        className,
      )}
    >
      {accent && (
        <span
          aria-hidden
          className="absolute right-3.5 top-3.5 h-1.5 w-1.5 rounded-full bg-coral ring-4 ring-coral/20"
        />
      )}
      <div className="text-[11px] font-medium uppercase tracking-[0.06em] text-ink-muted">
        {label}
      </div>
      <div className="font-display mt-1.5 text-[28px] font-medium leading-[1.05] tracking-[-0.025em] tabular-nums text-ink">
        {value}
      </div>
      {delta && (
        <div className={cn("mt-1.5 inline-flex items-center gap-1 text-[12px]", deltaClass)}>
          {deltaTone === "up" && <ArrowUp size={10} strokeWidth={1.6} aria-hidden />}
          {deltaTone === "down" && <ArrowDown size={10} strokeWidth={1.6} aria-hidden />}
          {delta}
        </div>
      )}
    </div>
  );
}
