"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { formatDeadline } from "@/lib/utils";

type Props = {
  title: string;
  deadline: string;
  applied: boolean;
  onApply: () => void;
};

export function DetailApplyBar({ title, deadline, applied, onApply }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 320);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed bottom-5 left-0 right-0 flex justify-center px-4 transition-[opacity,transform] duration-200 ease"
      style={{
        zIndex: 25,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
      }}
    >
      <div className="bg-ink text-bg pointer-events-auto flex max-w-[calc(100%-32px)] items-center gap-3.5 rounded-full py-2.5 pl-[22px] pr-2.5 shadow-floating">
        <div className="flex min-w-0 flex-col gap-0.5">
          <span className="text-[11px] font-medium uppercase tracking-[0.08em] opacity-60">
            Cierra {formatDeadline(deadline)}
          </span>
          <span className="font-display max-w-[320px] truncate text-[14px] font-medium">
            {title}
          </span>
        </div>
        <button
          type="button"
          onClick={applied ? undefined : onApply}
          disabled={applied}
          aria-label={applied ? "Aplicación enviada" : "Aplicar a este casting"}
          className={cn(
            "flex shrink-0 items-center gap-1.5 rounded-full px-[22px] py-3 text-[14px] font-semibold transition-colors duration-150",
            applied
              ? "bg-bg text-ink cursor-default"
              : "bg-coral text-white hover:bg-coral-deep",
          )}
        >
          {applied ? (
            <>
              <Check size={14} strokeWidth={2} aria-hidden />
              Aplicado
            </>
          ) : (
            <>
              Aplicar
              <ArrowRight size={13} strokeWidth={1.5} aria-hidden />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
