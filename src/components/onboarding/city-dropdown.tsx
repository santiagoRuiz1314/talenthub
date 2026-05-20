"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CITY_LABELS } from "@/lib/constants";
import type { City } from "@/lib/types/shared";

const CITY_ORDER: City[] = [
  "bogota",
  "medellin",
  "cali",
  "barranquilla",
  "cartagena",
  "bucaramanga",
  "pereira",
  "manizales",
  "santa_marta",
  "cucuta",
  "ibague",
  "pasto",
];

export interface CityDropdownProps {
  value: City | "";
  onChange: (value: City) => void;
  id?: string;
  placeholder?: string;
  disabled?: boolean;
}

/**
 * Selector de ciudad para el form de paso 2. Wrapper sobre shadcn Select
 * que muestra las 12 ciudades de V1 con sus labels en español-CO.
 */
export function CityDropdown({
  value,
  onChange,
  id,
  placeholder = "Selecciona una ciudad",
  disabled,
}: CityDropdownProps) {
  return (
    <Select
      value={value || undefined}
      onValueChange={(v) => onChange(v as City)}
      disabled={disabled}
    >
      <SelectTrigger
        id={id}
        className="h-auto w-full justify-between rounded-[10px] border border-border bg-bg
                   px-3.5 py-3 text-[14px] text-ink shadow-none transition-colors
                   data-[popup-open]:border-ink hover:border-ink/40
                   data-placeholder:text-ink-muted"
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="rounded-[12px] border border-border bg-bg p-1.5 shadow-popover">
        {CITY_ORDER.map((c) => (
          <SelectItem
            key={c}
            value={c}
            className="rounded-md px-2.5 py-2 text-[14px] text-ink data-highlighted:bg-beige-soft
                       data-[selected=true]:bg-beige"
          >
            {CITY_LABELS[c]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
