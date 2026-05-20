import { cn } from "@/lib/utils";

interface StepProgressProps {
  step: number;
  total: number;
}

/**
 * Indicador de progreso por pasos para el flujo de onboarding.
 * Renderiza "Paso N de M" seguido de N barras: completadas/activas en --ink,
 * pendientes en --border.
 * Server Component — sin estado ni efectos.
 *
 * @example
 * <StepProgress step={1} total={2} />
 */
export function StepProgress({ step, total }: StepProgressProps) {
  return (
    <div
      role="progressbar"
      aria-valuenow={step}
      aria-valuemin={1}
      aria-valuemax={total}
      aria-label={`Paso ${step} de ${total}`}
      className="flex items-center gap-2.5"
    >
      {/* fontSize 12px viene del diseño fuente — divergencia menor con docs/design-system.md que documenta 12.5px */}
      <span aria-hidden className="tabular-nums text-[12px] tracking-[0.04em] text-ink-muted">
        Paso{" "}
        <span className="font-medium text-ink">{step}</span>
        {" "}de {total}
      </span>

      <div aria-hidden className="flex gap-1">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-[3px] w-[18px] rounded-[2px] bg-border",
              i < step && "w-7 bg-ink",
            )}
          />
        ))}
      </div>
    </div>
  );
}
