import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

import { PhotoPlaceholder } from "@/components/shared/photo-placeholder";
import { ApplicationStatusBadge } from "@/components/talent/application-status-badge";
import { CASTING_CATEGORY_LABELS, CITY_LABELS } from "@/lib/constants";
import type { ApplicationFull } from "@/lib/data/applications";
import { cn, formatRelativeDate } from "@/lib/utils";

export interface AppCardProps {
  application: ApplicationFull;
}

/**
 * Tarjeta de aplicación en la vista del talento. Link a /castings/[id].
 * Layout grid 100px / 1fr / auto en >=sm, colapsa a 88px / 1fr en <sm
 * (ocultando la meta secundaria). Hover sube 1px y border-color → ink.
 */
export function AppCard({ application }: AppCardProps) {
  const { casting, status } = application;
  const updateLabel = application.statusUpdatedAt
    ? `Actualizada ${formatRelativeDate(application.statusUpdatedAt)}`
    : status === "pending"
      ? "Esperando respuesta"
      : "Sin novedades";

  return (
    <Link
      href={`/castings/${casting.id}`}
      className={cn(
        "group grid items-center gap-5 rounded-[14px] border border-border bg-bg p-3.5",
        "transition-[border-color,transform] duration-150",
        "hover:-translate-y-px hover:border-ink",
        "focus-visible:outline-none focus-visible:border-ink focus-visible:ring-2 focus-visible:ring-ink",
        "grid-cols-[88px_1fr] sm:grid-cols-[100px_1fr_auto]",
      )}
    >
      <PhotoPlaceholder
        seed={`casting-${casting.id}`}
        className="aspect-square w-full rounded-[10px]"
      />

      <div className="flex min-w-0 flex-col gap-1.5">
        <div className="flex flex-wrap items-center gap-2 text-[11.5px] font-medium uppercase tracking-[0.06em] text-ink-muted">
          <span>{casting.agency.name}</span>
          <span aria-hidden className="h-[2px] w-[2px] rounded-full bg-ink-muted opacity-50" />
          <span className="normal-case font-normal tracking-normal">
            {CITY_LABELS[casting.city]}
          </span>
        </div>
        <h3 className="font-display m-0 text-balance text-[17px] font-medium leading-[1.25] tracking-[-0.02em] text-ink">
          {casting.title}
        </h3>
        <div className="mt-0.5 flex flex-wrap items-center gap-2 text-[12.5px] text-ink-muted">
          <span className="inline-flex items-center gap-1.5">
            <Calendar size={11} strokeWidth={1.4} aria-hidden />
            Aplicaste {formatRelativeDate(application.createdAt)}
          </span>
          <span aria-hidden className="hidden h-[2px] w-[2px] rounded-full bg-ink-muted opacity-50 sm:inline-block" />
          <span className="hidden sm:inline">
            {CASTING_CATEGORY_LABELS[casting.category]}
          </span>
        </div>
      </div>

      <div className="col-span-2 flex items-center justify-between gap-2 pr-1 sm:col-span-1 sm:flex-col sm:items-end">
        <ApplicationStatusBadge status={status} />
        <div className="inline-flex items-center gap-1 text-[12px] text-ink-muted">
          {updateLabel}
          <ArrowRight
            size={13}
            strokeWidth={1.5}
            aria-hidden
            className="text-ink-muted transition-colors group-hover:text-coral"
          />
        </div>
      </div>
    </Link>
  );
}
