import Link from "next/link";

import { cn } from "@/lib/utils";

type Variant = "default" | "centered" | "agency";

type Props = {
  variant?: Variant;
  className?: string;
  href?: string;
};

export function Logo({ variant = "default", className, href = "/" }: Props) {
  const mark = (
    <span
      aria-hidden
      className="bg-ink relative inline-flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-md"
    >
      <span className="bg-coral absolute top-[5px] left-[5px] h-[10px] w-[10px] rounded-full" />
      <span className="bg-bg absolute right-[5px] bottom-[5px] h-[6px] w-[6px] rounded-full" />
    </span>
  );

  return (
    <Link
      href={href}
      aria-label="TalentHub — inicio"
      className={cn(
        "text-ink inline-flex items-center gap-2 no-underline",
        variant === "centered" && "flex-col gap-3",
        className,
      )}
    >
      {mark}
      <span className="font-display text-[17px] font-semibold tracking-[-0.02em]">
        TalentHub
      </span>
      {variant === "agency" && (
        <span className="bg-coral-soft text-coral-deep ml-1 rounded-full px-2 py-0.5 text-[10.5px] font-semibold tracking-[0.04em] uppercase">
          Agencias
        </span>
      )}
    </Link>
  );
}
