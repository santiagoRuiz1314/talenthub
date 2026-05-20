import type { ReactNode } from "react";

import {
  ReqAge,
  ReqExp,
  ReqFeatures,
  ReqGender,
  ReqHeight,
  ReqLanguage,
} from "@/components/icons/req-icons";
import {
  CASTING_DETAIL_COPY,
  EXPERIENCE_LEVEL_LABELS,
  GENDER_REQUIREMENT_LABELS,
  LANGUAGE_CODE_LABELS,
} from "@/lib/constants";
import type { CastingRequirements } from "@/lib/types";

import { DetailSection } from "./detail-section";

type Props = {
  requirements: CastingRequirements;
};

type ReqItem = {
  icon: ReactNode;
  label: string;
  value: string;
};

function buildItems(req: CastingRequirements): ReqItem[] {
  const items: ReqItem[] = [];

  if (req.ageRange) {
    items.push({
      icon: <ReqAge size={16} strokeWidth={1.5} />,
      label: CASTING_DETAIL_COPY.reqAge,
      value: `${req.ageRange.min}–${req.ageRange.max} años`,
    });
  }
  if (req.gender) {
    items.push({
      icon: <ReqGender size={16} strokeWidth={1.5} />,
      label: CASTING_DETAIL_COPY.reqGender,
      value: GENDER_REQUIREMENT_LABELS[req.gender],
    });
  }
  if (req.heightRange) {
    items.push({
      icon: <ReqHeight size={16} strokeWidth={1.5} />,
      label: CASTING_DETAIL_COPY.reqHeight,
      value: `${req.heightRange.minCm}–${req.heightRange.maxCm} cm`,
    });
  }
  if (req.languages?.length) {
    items.push({
      icon: <ReqLanguage size={16} strokeWidth={1.5} />,
      label: CASTING_DETAIL_COPY.reqLanguages,
      value: req.languages.map((l) => LANGUAGE_CODE_LABELS[l]).join(", "),
    });
  }
  if (req.features?.length) {
    items.push({
      icon: <ReqFeatures size={16} strokeWidth={1.5} />,
      label: CASTING_DETAIL_COPY.reqFeatures,
      value: req.features.join(", "),
    });
  }
  if (req.experience) {
    items.push({
      icon: <ReqExp size={16} strokeWidth={1.5} />,
      label: CASTING_DETAIL_COPY.reqExperience,
      value: EXPERIENCE_LEVEL_LABELS[req.experience],
    });
  }

  return items;
}

export function DetailRequirements({ requirements }: Props) {
  const items = buildItems(requirements);
  if (items.length === 0) return null;

  return (
    <DetailSection
      title={CASTING_DETAIL_COPY.requirementsTitle}
      kicker={CASTING_DETAIL_COPY.requirementsKicker}
    >
      <div className="grid max-w-[760px] grid-cols-1 gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.label}
            className="border-border bg-bg flex items-center gap-3 rounded-[10px] border px-4 py-3.5"
          >
            <div className="bg-beige text-ink flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
              {item.icon}
            </div>
            <div className="flex min-w-0 flex-col gap-0.5">
              <span className="text-ink-muted text-[11px] font-medium tracking-[0.06em] uppercase">
                {item.label}
              </span>
              <span className="font-display text-ink truncate text-[14.5px] font-medium tracking-[-0.01em]">
                {item.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </DetailSection>
  );
}
