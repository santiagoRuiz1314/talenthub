import { CASTING_DETAIL_COPY, CITY_LABELS } from "@/lib/constants";
import type { CastingWithAgency } from "@/lib/types";
import { cn } from "@/lib/utils";

import { DetailSection } from "./detail-section";

type Props = {
  casting: CastingWithAgency;
};

type InfoItem = {
  label: string;
  value: string;
  note?: string;
  tbd?: boolean;
  featured?: boolean;
};

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

function formatVerbose(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return `${d.getDate()} de ${MONTHS_ES[d.getMonth()]}`;
}

export function DetailAdditionalInfo({ casting }: Props) {
  if (!casting.location && !casting.shootDate) return null;

  const items: InfoItem[] = [];

  if (casting.location) {
    items.push({
      label: CASTING_DETAIL_COPY.additionalLocation,
      value: casting.location,
      featured: true,
    });
  }

  items.push({
    label: CASTING_DETAIL_COPY.shootDateLabel,
    value: casting.shootDate ? formatVerbose(casting.shootDate) : CASTING_DETAIL_COPY.shootDateTbd,
    tbd: !casting.shootDate,
  });

  if (casting.location) {
    items.push({
      label: CASTING_DETAIL_COPY.additionalModality,
      value: CASTING_DETAIL_COPY.additionalModalityValue,
      note: CITY_LABELS[casting.city],
    });
  }

  return (
    <DetailSection
      title={CASTING_DETAIL_COPY.additionalInfoTitle}
      kicker={CASTING_DETAIL_COPY.additionalInfoKicker}
    >
      <div
        className={cn(
          "grid max-w-[760px] gap-4",
          items.length === 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2",
        )}
      >
        {items.map((item) => (
          <div
            key={item.label}
            className={cn(
              "border-border flex flex-col gap-2 rounded-xl border px-[22px] py-5",
              item.featured ? "bg-beige-soft" : "bg-bg",
            )}
          >
            <span className="text-ink-muted text-[11px] font-medium tracking-[0.08em] uppercase">
              {item.label}
            </span>
            <span
              className={cn(
                "font-display text-[22px] leading-[1.15] font-medium tracking-[-0.02em]",
                item.tbd ? "text-ink-muted italic" : "text-ink",
              )}
            >
              {item.value}
            </span>
            {item.note && <span className="text-ink-muted text-[12.5px]">{item.note}</span>}
          </div>
        ))}
      </div>
    </DetailSection>
  );
}
