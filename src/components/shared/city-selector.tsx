"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, MapPin } from "lucide-react";

import { CITY_LABELS } from "@/lib/constants";
import type { City } from "@/lib/types";
import { cn } from "@/lib/utils";

const CITY_ENTRIES = Object.entries(CITY_LABELS) as [City, string][];

export function CitySelector() {
  const router = useRouter();
  const params = useSearchParams();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = params.get("city") as City | null;
  const currentLabel = current ? CITY_LABELS[current] : "Todas las ciudades";

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const select = (next: City | null) => {
    const usp = new URLSearchParams(params.toString());
    if (next) usp.set("city", next);
    else usp.delete("city");
    const qs = usp.toString();
    router.push(qs ? `/?${qs}` : "/", { scroll: false });
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          "border-border text-ink inline-flex items-center gap-2 rounded-md border px-3 py-2 text-[13.5px] font-medium transition-colors",
          open ? "bg-beige" : "bg-transparent hover:bg-beige-soft",
        )}
      >
        <MapPin size={14} strokeWidth={1.5} />
        <span>{currentLabel}</span>
        <ChevronDown
          size={14}
          strokeWidth={1.5}
          className={cn("transition-transform", open && "rotate-180")}
        />
      </button>
      {open && (
        <ul
          role="listbox"
          className="border-border bg-bg shadow-popover animate-th-pop-in absolute top-[calc(100%+6px)] right-0 z-40 min-w-[220px] rounded-xl border p-1.5"
        >
          <li>
            <button
              type="button"
              onClick={() => select(null)}
              className={cn(
                "flex w-full items-center rounded-md px-2.5 py-2 text-left text-[13.5px] transition-colors",
                current === null
                  ? "bg-beige text-ink font-medium"
                  : "text-ink hover:bg-beige-soft",
              )}
            >
              Todas las ciudades
            </button>
          </li>
          {CITY_ENTRIES.map(([value, label]) => (
            <li key={value}>
              <button
                type="button"
                onClick={() => select(value)}
                className={cn(
                  "flex w-full items-center rounded-md px-2.5 py-2 text-left text-[13.5px] transition-colors",
                  current === value
                    ? "bg-beige text-ink font-medium"
                    : "text-ink hover:bg-beige-soft",
                )}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/**
 * Skeleton estructural para mantener el layout del nav durante prerender
 * y mientras se hidrata el cliente. Sin contenido de Búsqueda → no rompe SSR.
 */
export function CitySelectorFallback() {
  return (
    <div className="border-border text-ink-muted inline-flex items-center gap-2 rounded-md border px-3 py-2 text-[13.5px] font-medium">
      <MapPin size={14} strokeWidth={1.5} />
      <span>Todas las ciudades</span>
      <ChevronDown size={14} strokeWidth={1.5} />
    </div>
  );
}
