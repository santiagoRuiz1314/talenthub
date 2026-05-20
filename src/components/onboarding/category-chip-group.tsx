"use client";

import { ChipMultiSelect, type ChipOption } from "@/components/onboarding/chip-multi-select";
import { CASTING_CATEGORY_LABELS } from "@/lib/constants";
import type { CastingCategory } from "@/lib/types/casting";

const CATEGORY_ORDER: CastingCategory[] = [
  "audiovisual",
  "editorial",
  "runway",
  "digital_content",
  "commercial",
];

const OPTIONS: ChipOption<CastingCategory>[] = CATEGORY_ORDER.map((v) => ({
  value: v,
  label: CASTING_CATEGORY_LABELS[v],
}));

export interface CategoryChipGroupProps {
  value: CastingCategory[];
  onChange: (value: CastingCategory[]) => void;
  disabled?: boolean;
}

export function CategoryChipGroup({ value, onChange, disabled }: CategoryChipGroupProps) {
  return (
    <ChipMultiSelect
      options={OPTIONS}
      value={value}
      onChange={onChange}
      ariaLabel="Categorías de interés"
      disabled={disabled}
    />
  );
}
