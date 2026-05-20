import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type Props = {
  title: string;
  kicker?: string;
  children: ReactNode;
  className?: string;
  noBorder?: boolean;
};

export function DetailSection({ title, kicker, children, className, noBorder }: Props) {
  return (
    <section className={cn("py-9", !noBorder && "border-border border-t", className)}>
      {kicker && (
        <div className="text-ink-muted mb-1.5 text-[11px] font-medium tracking-[0.08em] uppercase">
          {kicker}
        </div>
      )}
      <h2 className="font-display text-ink mb-5 text-[22px] leading-tight font-medium tracking-[-0.02em]">
        {title}
      </h2>
      {children}
    </section>
  );
}
