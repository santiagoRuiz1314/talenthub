import { cn } from "@/lib/utils";

const shimmer = "animate-th-shimmer bg-[length:200%_100%]";
const shimmerStyle = {
  backgroundImage:
    "linear-gradient(90deg, var(--beige-soft) 0%, var(--bg) 50%, var(--beige-soft) 100%)",
};

/**
 * Skeleton del ProfileHero. Refleja la grid 380px/1fr del hero real.
 * Background animado con th-shimmer (token).
 */
export function ProfileHeroSkeleton() {
  return (
    <section
      aria-hidden
      className="grid items-stretch gap-6 py-10 lg:grid-cols-[380px_1fr] lg:gap-10"
    >
      <div
        className={cn("aspect-[3/4] w-full rounded-[16px]", shimmer)}
        style={shimmerStyle}
      />
      <div className="flex flex-col gap-6 pt-3">
        <div className="space-y-4">
          <div
            className={cn("h-3 w-40 rounded-[4px]", shimmer)}
            style={shimmerStyle}
          />
          <div
            className={cn("h-12 w-3/4 rounded-[6px]", shimmer)}
            style={shimmerStyle}
          />
          <div
            className={cn("h-4 w-2/3 rounded-[4px]", shimmer)}
            style={shimmerStyle}
          />
          <div className="flex gap-1.5">
            <div
              className={cn("h-7 w-24 rounded-full", shimmer)}
              style={shimmerStyle}
            />
            <div
              className={cn("h-7 w-20 rounded-full", shimmer)}
              style={shimmerStyle}
            />
            <div
              className={cn("h-7 w-28 rounded-full", shimmer)}
              style={shimmerStyle}
            />
          </div>
        </div>
        <div
          className={cn("h-20 w-full rounded-[12px]", shimmer)}
          style={shimmerStyle}
        />
      </div>
    </section>
  );
}
