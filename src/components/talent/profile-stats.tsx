import { cn } from "@/lib/utils";

export interface ProfileStatItem {
  label: string;
  value: string;
  /** Si está presente, renderiza una barra de progreso bajo el valor (0-100). */
  progress?: number;
  /** Pinta el valor en coral (uso típico: "Perfil completo"). */
  highlight?: boolean;
}

export interface ProfileStatsProps {
  items: ProfileStatItem[];
  className?: string;
}

/**
 * Bloque de stats inline para el ProfileHero. Renderiza N stats con dividers
 * verticales entre ellos. El valor usa tabular-nums.
 */
export function ProfileStats({ items, className }: ProfileStatsProps) {
  return (
    <div
      className={cn(
        "grid overflow-hidden rounded-[12px] border border-border bg-bg",
        className,
      )}
      style={{ gridTemplateColumns: `repeat(${items.length}, 1fr)` }}
    >
      {items.map((it, i) => (
        <Stat key={it.label} item={it} divider={i > 0} />
      ))}
    </div>
  );
}

function Stat({ item, divider }: { item: ProfileStatItem; divider: boolean }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1.5 px-5 py-4",
        divider && "border-l border-border",
      )}
    >
      <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-ink-muted">
        {item.label}
      </span>
      <span
        className={cn(
          "font-display text-[26px] font-medium leading-[1.1] tracking-[-0.025em] tabular-nums",
          item.highlight ? "text-coral" : "text-ink",
        )}
      >
        {item.value}
      </span>
      {item.progress != null && (
        <div className="mt-0.5 h-1 w-full overflow-hidden rounded-[2px] bg-beige">
          <div
            className="h-full bg-coral transition-[width] duration-[400ms]"
            style={{ width: `${Math.min(100, Math.max(0, item.progress))}%` }}
          />
        </div>
      )}
    </div>
  );
}
