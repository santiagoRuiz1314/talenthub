"use client";

import { ArrowRight, Check } from "lucide-react";

import { CASTING_DETAIL_COPY } from "@/lib/constants";
import { cn } from "@/lib/utils";

type Props = {
  applied: boolean;
  onApply: () => void;
};

export function DetailInlineCta({ applied, onApply }: Props) {
  return (
    <div className="bg-ink text-bg flex flex-wrap items-center gap-4 rounded-2xl px-6 py-5">
      <div className="flex-1" style={{ minWidth: "200px" }}>
        <div className="font-display mb-1 text-[18px] font-medium tracking-[-0.015em]">
          {CASTING_DETAIL_COPY.ctaHeading}
        </div>
        <div className="text-[13px] opacity-65">{CASTING_DETAIL_COPY.ctaBody}</div>
      </div>
      <button
        type="button"
        onClick={applied ? undefined : onApply}
        disabled={applied}
        aria-label={applied ? CASTING_DETAIL_COPY.applicationSent : CASTING_DETAIL_COPY.applyNow}
        className={cn(
          "flex shrink-0 items-center gap-1.5 rounded-[10px] px-[26px] py-3.5 text-[14px] font-semibold text-white transition-colors duration-150",
          applied ? "cursor-default bg-white/15" : "bg-coral hover:bg-coral-deep",
        )}
      >
        {applied ? (
          <>
            <Check size={14} strokeWidth={1.5} aria-hidden />
            {CASTING_DETAIL_COPY.applicationSent}
          </>
        ) : (
          <>
            {CASTING_DETAIL_COPY.applyNow}
            <ArrowRight size={13} strokeWidth={1.5} aria-hidden />
          </>
        )}
      </button>
    </div>
  );
}
