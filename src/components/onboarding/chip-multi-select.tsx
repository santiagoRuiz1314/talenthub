"use client";

import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

export interface ChipOption<T extends string> {
  value: T;
  label: string;
}

export interface ChipMultiSelectProps<T extends string> {
  options: ChipOption<T>[];
  value: T[];
  onChange: (value: T[]) => void;
  ariaLabel: string;
  disabled?: boolean;
}

/**
 * Multi-select estilo "chips" reutilizable. Cada opción es un pill toggleable:
 * estado activo = bg-ink + text-bg + check; inactivo = bg-bg + border.
 *
 * Genérico sobre el tipo de value (string union) para evitar repetir el visual
 * en CategoryChipGroup, LanguageChipGroup, etc.
 */
export function ChipMultiSelect<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
  disabled,
}: ChipMultiSelectProps<T>) {
  const toggle = (v: T) => {
    if (disabled) return;
    onChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v]);
  };

  return (
    <div role="group" aria-label={ariaLabel} className="flex flex-wrap gap-1.5">
      {options.map((opt) => {
        const active = value.includes(opt.value);
        return (
          <button
            key={opt.value}
            type="button"
            aria-pressed={active}
            onClick={() => toggle(opt.value)}
            disabled={disabled}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2",
              "text-[13px] transition-colors duration-[120ms]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink",
              active
                ? "border-ink bg-ink text-bg font-medium"
                : "border-border bg-bg text-ink hover:border-ink/40",
              disabled && "cursor-not-allowed opacity-50",
            )}
          >
            {active && <Check size={11} strokeWidth={2} />}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
