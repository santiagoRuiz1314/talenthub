import { ProfileHeroSkeleton } from "@/components/talent/profile-hero-skeleton";

export default function TalentProfileLoading() {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3 pt-6">
        <div className="h-4 w-32 rounded-[4px] bg-beige-soft" />
        <div className="flex gap-2">
          <div className="h-9 w-40 rounded-[10px] bg-beige-soft" />
          <div className="h-9 w-32 rounded-[10px] bg-beige-soft" />
        </div>
      </div>
      <ProfileHeroSkeleton />
    </>
  );
}
