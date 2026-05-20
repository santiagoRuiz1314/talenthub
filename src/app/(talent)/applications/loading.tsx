import { StateCard } from "@/components/shared/state-card";

export default function TalentApplicationsLoading() {
  return (
    <div className="mx-auto w-full max-w-[1100px] pt-10">
      <div className="mb-8 space-y-3">
        <div className="h-3 w-40 rounded-[4px] bg-beige-soft" />
        <div className="h-10 w-60 rounded-[6px] bg-beige-soft" />
      </div>
      <div className="flex flex-col gap-3">
        <StateCard variant="loading" />
        <StateCard variant="loading" />
        <StateCard variant="loading" />
      </div>
    </div>
  );
}
