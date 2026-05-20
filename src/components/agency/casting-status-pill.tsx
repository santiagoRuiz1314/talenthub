import { CASTING_STATUS_LABELS } from "@/lib/constants";
import type { CastingStatus } from "@/lib/types/casting";
import { cn } from "@/lib/utils";

type Visual = "active" | "draft" | "closed" | "closing";

const TONE: Record<Visual, { wrapper: string; dot: string; label: string }> = {
  active: {
    wrapper: "bg-success-bg border-success-border text-success",
    dot: "bg-success-dot",
    label: CASTING_STATUS_LABELS.active,
  },
  closing: {
    wrapper: "bg-coral-soft border-transparent text-coral-deep",
    dot: "bg-coral",
    label: "Cierra pronto",
  },
  draft: {
    wrapper: "bg-beige-soft border-border text-ink-muted",
    dot: "bg-neutral-dot",
    label: CASTING_STATUS_LABELS.draft,
  },
  closed: {
    wrapper: "bg-danger-bg border-danger-border text-danger",
    dot: "bg-danger-dot",
    label: CASTING_STATUS_LABELS.closed,
  },
};

export interface CastingStatusPillProps {
  status: CastingStatus;
  /**
   * Si `true` y `status="active"`, renderiza la variante "Cierra pronto" en coral.
   * El padre decide qué es "urgente" (típico: deadline a ≤ 2 días).
   */
  urgent?: boolean;
  className?: string;
}

/**
 * Pill de estado de un casting para el dashboard agencia.
 * `active` + `urgent=true` se renderiza como "Cierra pronto" (coral) — la
 * urgencia es una vista del status, no un estado real persistido.
 */
export function CastingStatusPill({ status, urgent, className }: CastingStatusPillProps) {
  const visual: Visual = status === "active" && urgent ? "closing" : status;
  const tone = TONE[visual];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium",
        tone.wrapper,
        className,
      )}
    >
      <span aria-hidden className={cn("h-1 w-1 rounded-full", tone.dot)} />
      {tone.label}
    </span>
  );
}
