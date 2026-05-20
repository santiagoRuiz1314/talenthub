import { ChevronDown } from "lucide-react";

import { Logo } from "@/components/shared/logo";
import { CITY_LABELS } from "@/lib/constants";
import type { Agency } from "@/lib/types/agency";

export interface AgencyTopNavProps {
  agency: Agency;
}

/**
 * Top nav del área agencia. Logo (variant=agency con pill "Agencias") +
 * dropdown trigger con avatar agencia + nombre + tipo · ciudad. Sticky con
 * backdrop blur.
 *
 * NOTA: el dropdown de cambio de agencia es Fase 3+; en Fase 2 el trigger
 * es decorativo (no abre menu).
 */
export function AgencyTopNav({ agency }: AgencyTopNavProps) {
  const initials = agency.name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .filter(Boolean)
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <header
      className="sticky top-0 z-30 border-b border-border backdrop-blur-[12px] backdrop-saturate-[180%]"
      style={{ background: "rgba(250, 250, 247, 0.85)" }}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between gap-4 px-5 sm:px-8">
        <Logo variant="agency" />
        <button
          type="button"
          className="inline-flex items-center gap-2.5 rounded-full border border-border bg-transparent
                     py-1 pl-1 pr-3 transition-colors hover:bg-beige-soft
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
        >
          <span
            aria-hidden
            className="flex h-7 w-7 items-center justify-center rounded-[7px] bg-ink font-display
                       text-[11px] font-semibold tracking-[0.04em] text-bg"
          >
            {initials || "—"}
          </span>
          <span className="flex flex-col text-left leading-[1.15]">
            <span className="text-[13px] font-medium text-ink">{agency.name}</span>
            <span className="text-[11px] text-ink-muted">
              Agencia · {CITY_LABELS[agency.city]}
            </span>
          </span>
          <ChevronDown size={12} strokeWidth={1.5} aria-hidden className="text-ink-muted" />
        </button>
      </div>
    </header>
  );
}
