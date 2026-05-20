import Link from "next/link";

import { PhotoPlaceholder } from "@/components/shared/photo-placeholder";
import { CastingStatusPill } from "@/components/agency/casting-status-pill";
import { RowActionsMenu } from "@/components/agency/row-actions-menu";
import { CASTING_CATEGORY_LABELS, CITY_LABELS } from "@/lib/constants";
import type { Casting } from "@/lib/types/casting";
import { cn, formatDeadline, formatRelativeDate } from "@/lib/utils";

export interface CastingRowProps {
  casting: Casting;
  applicantsCount: number;
  unreadCount: number;
}

/** Cuenta como "urgente" si quedan ≤ 2 días al deadline. */
function isUrgent(deadline: string) {
  const ms = new Date(deadline).getTime() - Date.now();
  if (Number.isNaN(ms)) return false;
  const days = ms / (1000 * 60 * 60 * 24);
  return days >= 0 && days <= 2;
}

/**
 * Fila de la tabla del dashboard agencia. Grid responsive que colapsa columnas
 * (Cierre/Publicado) en `<xl` (1100px) y oculta Ciudad en `<sm` (600px).
 * Hover bg beige-soft. Link envuelve la fila completa excepto el menú de acciones.
 */
export function CastingRow({ casting, applicantsCount, unreadCount }: CastingRowProps) {
  const urgent = casting.status === "active" && isUrgent(casting.deadline);
  const deadlineLabel =
    casting.status === "draft"
      ? "—"
      : casting.status === "closed"
        ? "Cerrado"
        : urgent
          ? "Cierra hoy"
          : formatDeadline(casting.deadline);
  const publishedLabel =
    casting.status === "draft"
      ? "Borrador"
      : casting.publishedAt
        ? formatRelativeDate(casting.publishedAt)
        : formatRelativeDate(casting.createdAt);

  return (
    <div className="group relative border-b border-border transition-colors hover:bg-beige-soft">
      <Link
        href={`/agency/castings/${casting.id}/applicants`}
        className="grid items-center gap-3 px-4 py-3.5 sm:gap-4 sm:px-5
                   sm:grid-cols-[44px_minmax(0,2fr)_110px_100px_110px_36px]
                   xl:grid-cols-[56px_minmax(0,2.4fr)_110px_130px_110px_90px_36px]
                   focus-visible:outline-none focus-visible:bg-beige-soft"
      >
        <PhotoPlaceholder
          seed={`casting-row-${casting.id}`}
          className="aspect-square w-11 rounded-[8px] xl:w-14"
        />

        <div className="flex min-w-0 flex-col gap-1">
          <div className="font-display truncate text-[14px] font-medium tracking-[-0.015em] text-ink">
            {casting.title}
          </div>
          <div className="flex items-center gap-2">
            <CastingStatusPill status={casting.status} urgent={urgent} />
            <span className="text-[11.5px] text-ink-muted">
              {CASTING_CATEGORY_LABELS[casting.category]}
            </span>
          </div>
        </div>

        <span className="hidden truncate text-[13px] text-ink-muted sm:inline">
          {CITY_LABELS[casting.city]}
        </span>

        <span
          className={cn(
            "hidden text-[13px] tabular-nums xl:inline",
            urgent ? "font-medium text-coral-deep" : "text-ink-muted",
          )}
        >
          {deadlineLabel}
        </span>

        <div className="flex items-center gap-2">
          <span
            className={cn(
              "inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-[12px]",
              "font-semibold tabular-nums tracking-[-0.02em]",
              applicantsCount > 0
                ? "bg-coral-soft text-coral-deep"
                : "bg-beige-soft text-ink-muted",
            )}
          >
            {applicantsCount}
          </span>
          {unreadCount > 0 && (
            <span className="text-[11px] font-medium text-coral">+{unreadCount} nuevos</span>
          )}
        </div>

        <span className="hidden text-[12.5px] tabular-nums text-ink-muted xl:inline">
          {publishedLabel}
        </span>

        <span aria-hidden className="hidden sm:block" />
      </Link>

      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <RowActionsMenu castingId={casting.id} />
      </div>
    </div>
  );
}
