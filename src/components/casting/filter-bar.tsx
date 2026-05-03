"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, X } from "lucide-react";

import { CASTING_CATEGORY_LABELS, CITY_LABELS } from "@/lib/constants";
import type { CastingCategory, City } from "@/lib/types";
import { cn } from "@/lib/utils";

const CATEGORY_ENTRIES = Object.entries(CASTING_CATEGORY_LABELS) as [
  CastingCategory,
  string,
][];
const CITY_ENTRIES = Object.entries(CITY_LABELS) as [City, string][];

type Group = "category" | "city";

const GROUPS: { key: Group; label: string }[] = [
  { key: "category", label: "Tipo" },
  { key: "city", label: "Ciudad" },
];

export function FilterBar() {
  const router = useRouter();
  const params = useSearchParams();
  const [openGroup, setOpenGroup] = useState<Group | null>("category");

  const selectedCategory = params.get("category") as CastingCategory | null;
  const selectedCity = params.get("city") as City | null;
  const totalActive = (selectedCategory ? 1 : 0) + (selectedCity ? 1 : 0);

  const updateParam = (key: string, value: string | null) => {
    const usp = new URLSearchParams(params.toString());
    if (value) usp.set(key, value);
    else usp.delete(key);
    const qs = usp.toString();
    router.push(qs ? `/?${qs}` : "/", { scroll: false });
  };

  const clearAll = () => {
    const usp = new URLSearchParams(params.toString());
    usp.delete("category");
    usp.delete("city");
    const qs = usp.toString();
    router.push(qs ? `/?${qs}` : "/", { scroll: false });
  };

  return (
    <section
      className="border-border sticky top-16 z-20 border-b backdrop-blur-[10px] backdrop-saturate-[180%]"
      style={{ background: "rgba(250, 250, 247, 0.92)" }}
    >
      <div className="mx-auto w-full max-w-[1280px] px-5 py-3.5 sm:px-8">
        <div className="mb-3 flex flex-wrap items-center gap-1.5 lg:flex-nowrap lg:overflow-x-auto">
          {GROUPS.map((g) => {
            const count =
              g.key === "category"
                ? selectedCategory
                  ? 1
                  : 0
                : selectedCity
                  ? 1
                  : 0;
            const isOpen = openGroup === g.key;
            return (
              <button
                key={g.key}
                type="button"
                onClick={() => setOpenGroup(isOpen ? null : g.key)}
                aria-expanded={isOpen}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12.5px] font-medium whitespace-nowrap transition-all",
                  isOpen
                    ? "bg-ink text-bg border-ink"
                    : "border-border text-ink-muted hover:text-ink bg-transparent",
                )}
              >
                {g.label}
                {count > 0 && (
                  <span className="bg-coral inline-flex min-w-[16px] items-center justify-center rounded-full px-[6px] py-px text-[10px] font-semibold text-white tabular-nums">
                    {count}
                  </span>
                )}
              </button>
            );
          })}
          {totalActive > 0 && (
            <button
              type="button"
              onClick={clearAll}
              className="text-ink-muted hover:text-ink ml-1 inline-flex items-center gap-1.5 px-2 py-1.5 text-[12.5px] underline underline-offset-[3px] transition-colors"
            >
              <X size={11} strokeWidth={1.5} /> Limpiar ({totalActive})
            </button>
          )}
        </div>
        {openGroup === "category" && (
          <div className="flex flex-wrap gap-1.5">
            {CATEGORY_ENTRIES.map(([value, label]) => {
              const active = value === selectedCategory;
              return (
                <FilterPill
                  key={value}
                  label={label}
                  active={active}
                  onClick={() =>
                    updateParam("category", active ? null : value)
                  }
                />
              );
            })}
          </div>
        )}
        {openGroup === "city" && (
          <div className="flex flex-wrap gap-1.5">
            {CITY_ENTRIES.map(([value, label]) => {
              const active = value === selectedCity;
              return (
                <FilterPill
                  key={value}
                  label={label}
                  active={active}
                  onClick={() => updateParam("city", active ? null : value)}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

type PillProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

function FilterPill({ label, active, onClick }: PillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12.5px] transition-all",
        active
          ? "bg-ink text-bg border-ink font-medium"
          : "border-border text-ink bg-bg hover:bg-beige-soft font-normal",
      )}
    >
      {active && <Check size={11} strokeWidth={2} />}
      {label}
    </button>
  );
}
