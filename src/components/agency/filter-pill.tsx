"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface FilterPillOption {
  /** Valor que se pone en la URL. Para "todos", usa `""`. */
  value: string;
  label: string;
  /** Href pre-construido por el server component padre (preservando otros searchParams). */
  href: string;
}

export interface FilterPillProps {
  label: string;
  /** Valor actual seleccionado (de los options). String vacío = todos. */
  value: string;
  options: FilterPillOption[];
  /** Label a mostrar cuando no hay valor seleccionado (e.g. "Todas las ciudades"). */
  defaultLabel: string;
  /** Href que limpia este filtro preservando otros searchParams. */
  defaultHref: string;
}

/**
 * Pill de filtro con dropdown (Popover). Cuando hay valor seleccionado distinto
 * del default, el trigger se pinta en bg-ink + text-bg para indicar filtro
 * activo. Los items son <Link> a URLs con searchParams pre-construidos por el
 * padre — server-component friendly (sin functions cruzando boundary).
 */
export function FilterPill({
  label,
  value,
  options,
  defaultLabel,
  defaultHref,
}: FilterPillProps) {
  const active = !!value;
  const selectedOption = options.find((o) => o.value === value);
  const visibleLabel = selectedOption?.label ?? defaultLabel;

  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5",
          "text-[12.5px] font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink",
          active
            ? "border-ink bg-ink text-bg"
            : "border-border bg-bg text-ink hover:border-ink/40",
        )}
      >
        <span
          className={cn(
            "font-normal",
            active ? "text-white/60" : "text-ink-muted",
          )}
        >
          {label}
        </span>
        <span>{visibleLabel}</span>
        <ChevronDown
          size={11}
          strokeWidth={1.6}
          aria-hidden
          className="opacity-70 transition-transform data-[popup-open]:rotate-180"
        />
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={6}
        className="min-w-[180px] rounded-[10px] border border-border bg-bg p-1 shadow-popover"
      >
        <Link
          href={defaultHref}
          className={cn(
            "block w-full rounded-md px-2.5 py-1.5 text-left text-[13px] text-ink transition-colors",
            "hover:bg-beige-soft",
            value === "" && "bg-beige font-medium",
          )}
        >
          {defaultLabel}
        </Link>
        {options.map((opt) => (
          <Link
            key={opt.value}
            href={opt.href}
            className={cn(
              "block w-full rounded-md px-2.5 py-1.5 text-left text-[13px] text-ink transition-colors",
              "hover:bg-beige-soft",
              opt.value === value && "bg-beige font-medium",
            )}
          >
            {opt.label}
          </Link>
        ))}
      </PopoverContent>
    </Popover>
  );
}
