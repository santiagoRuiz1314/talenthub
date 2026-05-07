import { Bookmark, Calendar, Clock, MapPin } from "lucide-react";

import { PhotoPlaceholder } from "@/components/shared/photo-placeholder";
import { VerifiedBadge } from "@/components/shared/verified-badge";
import {
  CASTING_CATEGORY_LABELS,
  CASTING_DETAIL_COPY,
  CITY_LABELS,
} from "@/lib/constants";
import type { CastingWithAgency } from "@/lib/types";
import { cn } from "@/lib/utils";

const MONTHS_ES = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

function formatFull(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return `${d.getDate()} ${MONTHS_ES[d.getMonth()]}`;
}

function isUrgent(deadline: string): boolean {
  const d = new Date(deadline);
  const diffDays = (d.getTime() - Date.now()) / (1000 * 60 * 60 * 24);
  return diffDays >= 0 && diffDays <= 7;
}

function agencyInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const CATEGORY_DOT: Record<CastingWithAgency["category"], string> = {
  commercial: "var(--coral)",
  editorial: "var(--info-dot)",
  runway: "var(--success-dot)",
  audiovisual: "var(--coral-deep)",
  digital_content: "var(--info-text)",
};

type MetaCellProps = {
  label: string;
  value: string;
  icon: React.ReactNode;
  divider?: boolean;
  highlight?: boolean;
};

function MetaCell({ label, value, icon, divider, highlight }: MetaCellProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1.5 px-5 py-4",
        divider && "border-border border-l",
      )}
    >
      <div className="text-ink-muted flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.08em]">
        {icon}
        {label}
      </div>
      <div
        className={cn(
          "font-display text-[17px] font-medium tracking-[-0.015em]",
          highlight ? "text-coral" : "text-ink",
        )}
      >
        {value}
      </div>
    </div>
  );
}

type Props = {
  casting: CastingWithAgency;
};

export function DetailHeader({ casting }: Props) {
  const urgent = isUrgent(casting.deadline);
  const isVerified = casting.agency.verificationStatus === "verified";
  const firstPhoto = casting.photos?.[0];

  return (
    <section className="pb-8 pt-5">
      {/* 2-col layout — colapsa a 1-col bajo breakpoint `detail` (960px) */}
      <div className="grid grid-cols-1 items-start gap-10 detail:grid-cols-[1.1fr_1fr]">
        {/* Left: texto */}
        <div className="flex flex-col justify-between gap-6">
          <div>
            {/* Badges */}
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="text-ink border-border inline-flex items-center gap-1.5 rounded-full border bg-white/90 px-[9px] py-[3px] text-[11.5px] font-medium">
                <span
                  aria-hidden
                  className="h-[5px] w-[5px] shrink-0 rounded-full"
                  style={{ background: CATEGORY_DOT[casting.category] }}
                />
                {CASTING_CATEGORY_LABELS[casting.category]}
              </span>
              {urgent && (
                <span className="bg-coral-soft text-coral-deep rounded-full px-[9px] py-[3px] text-[11.5px] font-semibold tracking-[0.02em]">
                  {CASTING_DETAIL_COPY.urgentLabel}
                </span>
              )}
            </div>

            {/* Título h1 */}
            <h1
              className="font-display text-ink mb-6 font-[500] text-balance"
              style={{
                fontSize: "clamp(32px, 4.2vw, 48px)",
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
              }}
            >
              {casting.title}
            </h1>

            {/* Agencia */}
            <div className="mb-7 flex items-center gap-3">
              {casting.agency.logoUrl ? (
                <img
                  src={casting.agency.logoUrl}
                  alt={`Logo de ${casting.agency.name}`}
                  className="border-border h-9 w-9 shrink-0 rounded-lg border object-cover"
                />
              ) : (
                <div
                  className="border-border font-display text-ink flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border text-[13px] font-semibold"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.78 0.04 32), oklch(0.86 0.03 22))",
                  }}
                  aria-hidden
                >
                  {agencyInitials(casting.agency.name)}
                </div>
              )}
              <div className="flex flex-col gap-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-ink text-[14px] font-medium">
                    {casting.agency.name}
                  </span>
                  {isVerified && <VerifiedBadge />}
                </div>
                <span className="text-ink-muted text-[12.5px]">
                  {casting.publishedAt
                    ? `${CASTING_DETAIL_COPY.publishedOn} ${formatFull(casting.publishedAt)}`
                    : CASTING_DETAIL_COPY.publishedRecently}
                </span>
              </div>
            </div>
          </div>

          {/* Meta grid: Ciudad · Fecha shoot · Cierre */}
          <div className="border-border overflow-hidden rounded-xl border">
            <div className="grid grid-cols-3">
              <MetaCell
                label={CASTING_DETAIL_COPY.metaCity}
                value={CITY_LABELS[casting.city]}
                icon={<MapPin size={11} strokeWidth={1.5} aria-hidden />}
              />
              <MetaCell
                label={CASTING_DETAIL_COPY.shootDateLabel}
                value={
                  casting.shootDate
                    ? formatFull(casting.shootDate)
                    : CASTING_DETAIL_COPY.shootDateTbd
                }
                icon={<Calendar size={11} strokeWidth={1.5} aria-hidden />}
                divider
              />
              <MetaCell
                label={CASTING_DETAIL_COPY.metaDeadlineLabel}
                value={formatFull(casting.deadline)}
                icon={<Clock size={11} strokeWidth={1.5} aria-hidden />}
                divider
                highlight={urgent}
              />
            </div>
          </div>
        </div>

        {/* Right: foto */}
        <div className="relative">
          {firstPhoto ? (
            <img
              src={firstPhoto.url}
              alt={firstPhoto.alt ?? casting.title}
              className="aspect-[4/5] w-full rounded-2xl object-cover"
            />
          ) : (
            <PhotoPlaceholder
              seed={casting.id}
              className="aspect-[4/5] w-full rounded-2xl"
            />
          )}
          <button
            type="button"
            aria-label={CASTING_DETAIL_COPY.saveCastingAriaLabel}
            className="border-border text-ink absolute top-4 right-4 flex items-center gap-1.5 rounded-[10px] border bg-white/95 px-3 py-2 text-[12.5px] font-medium backdrop-blur-[8px] transition-colors hover:bg-white"
          >
            <Bookmark size={13} strokeWidth={1.5} aria-hidden />
            {CASTING_DETAIL_COPY.save}
          </button>
        </div>
      </div>
    </section>
  );
}
