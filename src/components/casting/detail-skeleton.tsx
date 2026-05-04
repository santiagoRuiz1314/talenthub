import { cn } from "@/lib/utils";

const S =
  "animate-th-shimmer bg-[linear-gradient(90deg,var(--beige-soft)_0%,var(--bg)_50%,var(--beige-soft)_100%)] bg-[length:200%_100%]";

export function CastingDetailSkeleton() {
  return (
    <div
      aria-hidden
      aria-label="Cargando casting..."
      className="mx-auto w-full max-w-[1280px] px-5 pb-24 sm:px-8"
    >
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 pt-5">
        <div className={cn("h-3 w-12 rounded", S)} />
        <div className={cn("h-3 w-3 rounded", S)} />
        <div className={cn("h-3 w-20 rounded", S)} />
        <div className={cn("h-3 w-3 rounded", S)} />
        <div className={cn("h-3 w-40 rounded", S)} />
      </div>

      {/* Header */}
      <div className="grid grid-cols-1 gap-10 pb-8 pt-5 detail:grid-cols-[1.1fr_1fr]">
        <div className="flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-5">
            {/* Badges */}
            <div className="flex gap-2">
              <div className={cn("h-6 w-24 rounded-full", S)} />
            </div>
            {/* Title */}
            <div className="flex flex-col gap-2">
              <div className={cn("h-10 w-4/5 rounded-lg", S)} />
              <div className={cn("h-10 w-3/5 rounded-lg", S)} />
            </div>
            {/* Agency */}
            <div className="flex items-center gap-3">
              <div className={cn("h-9 w-9 shrink-0 rounded-lg", S)} />
              <div className="flex flex-col gap-2">
                <div className={cn("h-4 w-32 rounded", S)} />
                <div className={cn("h-3 w-24 rounded", S)} />
              </div>
            </div>
          </div>
          {/* Meta grid */}
          <div className={cn("h-[88px] rounded-xl", S)} />
        </div>
        {/* Photo */}
        <div className={cn("aspect-[4/5] w-full rounded-2xl", S)} />
      </div>

      {/* Sections */}
      {[0, 1, 2].map((i) => (
        <div key={i} className="border-border border-t py-9">
          <div className={cn("mb-2 h-3 w-20 rounded", S)} />
          <div className={cn("mb-5 h-6 w-36 rounded", S)} />
          <div className="flex flex-col gap-3">
            <div className={cn("h-4 w-full rounded", S)} />
            <div className={cn("h-4 w-5/6 rounded", S)} />
            <div className={cn("h-4 w-4/6 rounded", S)} />
          </div>
        </div>
      ))}
    </div>
  );
}
