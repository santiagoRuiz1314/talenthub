import type { ApplicationStatus } from "@/lib/types/application";
import { cn } from "@/lib/utils";

const TONE: Record<ApplicationStatus, { wrapper: string; dot: string; label: string }> = {
  pending: {
    wrapper: "bg-white/95 text-coral-deep",
    dot: "bg-coral",
    label: "Nuevo",
  },
  viewed: {
    wrapper: "bg-white/90 text-ink",
    dot: "bg-info-dot",
    label: "Visto",
  },
  pre_selected: {
    wrapper: "bg-white/95 text-success",
    dot: "bg-success-dot",
    label: "Pre-seleccionado",
  },
  rejected: {
    wrapper: "bg-white/85 text-ink-muted",
    dot: "bg-neutral-dot",
    label: "Descartado",
  },
};

export interface ApplicantStatusBadgeProps {
  status: ApplicationStatus;
  className?: string;
}

/**
 * Variante overlay del status badge — fondo blanco translúcido + backdrop blur
 * para usarse sobre la foto del aplicante en la grid de pantalla 10.
 * Diferente del ApplicationStatusBadge (talent side) que usa paleta semántica
 * con backgrounds saturados.
 */
export function ApplicantStatusBadge({ status, className }: ApplicantStatusBadgeProps) {
  const tone = TONE[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[11px] font-medium backdrop-blur",
        tone.wrapper,
        className,
      )}
    >
      <span aria-hidden className={cn("h-1 w-1 rounded-full", tone.dot)} />
      {tone.label}
    </span>
  );
}
