import { Sparkles } from "lucide-react";

import type { ApplicationStatus } from "@/lib/types/application";

export interface SummaryCounts {
  total: number;
  /** Map de status → cantidad. */
  byStatus: Record<ApplicationStatus, number>;
}

export interface SummarySidebarProps {
  counts: SummaryCounts;
  /** "Cierra hoy" CTA si el deadline es próximo (Fase 4: real signal). */
  showClosingToday?: boolean;
  /** Sugerencia IA placeholder (Fase 4). */
  aiSuggestion?: { matchingCount: number; href: string };
}

const ROWS: { status: ApplicationStatus; label: string; dotClass: string; accent?: boolean }[] = [
  { status: "pending", label: "Nuevos", dotClass: "bg-coral", accent: true },
  { status: "viewed", label: "Vistos", dotClass: "bg-info-dot" },
  { status: "pre_selected", label: "Pre-seleccionados", dotClass: "bg-success-dot" },
  { status: "rejected", label: "Descartados", dotClass: "bg-neutral-dot" },
];

/**
 * Right-rail sticky de pantalla 10 con 3 cards:
 * - Resumen de counts por status + Total
 * - "Cierra hoy" (dark) con CTA Extender plazo — solo si showClosingToday
 * - "IA sugiere" (coral-soft) con N aplicantes recomendados — Fase 4
 *
 * En `<2xl` (1200px) el sidebar se oculta (responsive del layout padre).
 */
export function SummarySidebar({
  counts,
  showClosingToday,
  aiSuggestion,
}: SummarySidebarProps) {
  return (
    <aside className="sticky top-24 flex flex-col gap-3 self-start">
      <div className="rounded-[14px] border border-border bg-bg p-[18px]">
        <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.08em] text-ink-muted">
          Resumen
        </div>
        <div className="flex flex-col gap-3">
          {ROWS.map((r) => (
            <div key={r.status} className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 text-[13px] text-ink">
                <span aria-hidden className={`h-[7px] w-[7px] rounded-full ${r.dotClass}`} />
                {r.label}
              </span>
              <span
                className={`font-display text-[18px] font-medium tracking-[-0.02em] tabular-nums ${
                  r.accent ? "text-coral" : "text-ink"
                }`}
              >
                {counts.byStatus[r.status] ?? 0}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-3.5 flex items-center justify-between border-t border-border pt-3 text-[12.5px] text-ink-muted">
          <span>Total</span>
          <span className="font-medium text-ink tabular-nums">{counts.total}</span>
        </div>
      </div>

      {showClosingToday && (
        <div className="rounded-[14px] bg-ink p-4 text-bg">
          <div className="font-display mb-1 text-[15px] font-medium tracking-[-0.015em]">
            Cierra hoy
          </div>
          <div className="mb-3 text-[12.5px] leading-[1.5] text-bg/70">
            Después de hoy no se aceptan más aplicantes.
          </div>
          <button
            type="button"
            className="w-full rounded-[8px] bg-coral px-3 py-2 text-[12.5px] font-medium text-white
                       transition-colors hover:bg-coral-deep"
          >
            Extender plazo
          </button>
        </div>
      )}

      {aiSuggestion && aiSuggestion.matchingCount > 0 && (
        <div className="rounded-[14px] border border-coral/20 bg-coral-soft p-4">
          <div className="mb-1.5 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-coral-deep">
            <Sparkles size={11} strokeWidth={1.4} aria-hidden />
            IA sugiere
          </div>
          <div className="text-[13px] leading-[1.5] text-ink">
            <span className="tabular-nums">{aiSuggestion.matchingCount}</span> aplicantes encajan
            con tu brief.{" "}
            <a href={aiSuggestion.href} className="font-medium text-coral-deep">
              Verlos primero →
            </a>
          </div>
        </div>
      )}
    </aside>
  );
}
