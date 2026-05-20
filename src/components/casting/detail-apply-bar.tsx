"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Check } from "lucide-react";

import { CASTING_DETAIL_COPY } from "@/lib/constants";
import { cn, formatDeadline } from "@/lib/utils";

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
      className="ease pointer-events-none fixed right-0 bottom-5 left-0 flex justify-center px-4 transition-[opacity,transform] duration-200"
      style={{
        zIndex: 25,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
      }}
    >
      <div className="bg-ink text-bg shadow-floating pointer-events-auto flex max-w-[calc(100%-32px)] items-center gap-3.5 rounded-full py-2.5 pr-2.5 pl-[22px]">
        <div className="flex min-w-0 flex-col gap-0.5">
          <span className="text-[11px] font-medium tracking-[0.08em] uppercase opacity-60">
            {CASTING_DETAIL_COPY.deadlinePrefix} {formatDeadline(deadline)}
          </span>
          <span className="font-display max-w-[320px] truncate text-[14px] font-medium">
            {title}
          </span>
        </div>
        <button
          type="button"
          onClick={applied ? undefined : onApply}
          disabled={applied}
          aria-label={applied ? CASTING_DETAIL_COPY.applicationSent : CASTING_DETAIL_COPY.applyNow}
          className={cn(
            "flex shrink-0 items-center gap-1.5 rounded-full px-[22px] py-3 text-[14px] font-semibold transition-colors duration-150",
            applied ? "bg-bg text-ink cursor-default" : "bg-coral hover:bg-coral-deep text-white",
          )}
        >
          {applied ? (
            <>
              <Check size={14} strokeWidth={1.5} aria-hidden />
              {CASTING_DETAIL_COPY.applied}
            </>
          ) : (
            <>
              {CASTING_DETAIL_COPY.applyShort}
              <ArrowRight size={13} strokeWidth={1.5} aria-hidden />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
