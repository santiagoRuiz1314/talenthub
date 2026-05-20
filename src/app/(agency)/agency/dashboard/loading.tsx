import { StateCard } from "@/components/shared/state-card";

export default function AgencyDashboardLoading() {
  return (
    <>
      <div className="mb-8 space-y-2">
        <div className="h-3 w-44 rounded-[4px] bg-beige-soft" />
        <div className="h-10 w-56 rounded-[6px] bg-beige-soft" />
      </div>
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-[88px] rounded-[12px] border border-border bg-beige-soft" />
        ))}
      </div>
      <div className="mt-10">
        <StateCard variant="loading" />
      </div>
    </>
  );
}
