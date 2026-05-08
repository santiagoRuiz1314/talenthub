import { cn } from "@/lib/utils";

const SHIMMER =
  "animate-th-shimmer bg-[linear-gradient(90deg,var(--beige-soft)_0%,var(--bg)_50%,var(--beige-soft)_100%)] bg-[length:200%_100%]";

export function CastingCardSkeleton() {
  return (
    <div aria-hidden className="border-border flex flex-col overflow-hidden rounded-xl border">
      <div className="p-2.5">
        <div className={cn("aspect-[4/5] w-full rounded-lg", SHIMMER)} />
      </div>
      <div className="flex flex-col gap-2 px-4 pt-2 pb-4">
        <div className="flex items-center justify-between">
          <div className={cn("h-2.5 w-24 rounded", SHIMMER)} />
          <div className={cn("h-2.5 w-16 rounded", SHIMMER)} />
        </div>
        <div className={cn("h-4 w-3/4 rounded", SHIMMER)} />
        <div className={cn("mt-2 h-3 w-1/2 rounded", SHIMMER)} />
      </div>
    </div>
  );
}
