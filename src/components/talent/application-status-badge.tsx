import { APPLICATION_STATUS_LABELS } from "@/lib/constants";
import type { ApplicationStatus } from "@/lib/types/application";
import { cn } from "@/lib/utils";

const TONE_BY_STATUS: Record<
  ApplicationStatus,
  { wrapper: string; dot: string }
> = {
  pending: {
    wrapper: "bg-beige-soft border-border text-ink-muted",
    dot: "bg-neutral-dot",
  },
  viewed: {
    wrapper: "bg-info-bg border-info-border text-info",
    dot: "bg-info-dot",
  },
  pre_selected: {
    wrapper: "bg-success-bg border-success-border text-success",
    dot: "bg-success-dot",
  },
  rejected: {
    wrapper: "bg-danger-bg border-danger-border text-danger",
    dot: "bg-danger-dot",
  },
};

export interface ApplicationStatusBadgeProps {
  status: ApplicationStatus;
  className?: string;
}

/**
 * Pill 4-estado para aplicaciones (talent side). Usa la paleta semántica
 * tokenizada (info/success/danger/neutral) — todos los colores vienen de
 * globals.css, no hex inline.
 */
export function ApplicationStatusBadge({ status, className }: ApplicationStatusBadgeProps) {
  const tone = TONE_BY_STATUS[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[12px] font-medium",
        tone.wrapper,
        className,
      )}
    >
      <span aria-hidden className={cn("h-1.5 w-1.5 rounded-full", tone.dot)} />
      {APPLICATION_STATUS_LABELS[status]}
    </span>
  );
}
