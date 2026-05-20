"use client";

import { ChipMultiSelect, type ChipOption } from "@/components/onboarding/chip-multi-select";
import { LANGUAGE_CODE_LABELS } from "@/lib/constants";
import type { LanguageCode } from "@/lib/types/shared";

const LANGUAGE_ORDER: LanguageCode[] = ["es", "en", "pt", "fr", "it", "de"];

const OPTIONS: ChipOption<LanguageCode>[] = LANGUAGE_ORDER.map((v) => ({
  value: v,
  label: LANGUAGE_CODE_LABELS[v],
}));

export interface LanguageChipGroupProps {
  value: LanguageCode[];
  onChange: (value: LanguageCode[]) => void;
  disabled?: boolean;
}

export function LanguageChipGroup({ value, onChange, disabled }: LanguageChipGroupProps) {
  return (
    <ChipMultiSelect
      options={OPTIONS}
      value={value}
      onChange={onChange}
      ariaLabel="Idiomas que hablas"
      disabled={disabled}
    />
  );
}
