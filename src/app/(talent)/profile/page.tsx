import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ExperienceList } from "@/components/talent/experience-list";
import { LanguagesList } from "@/components/talent/languages-list";
import { PhysicalDataTable } from "@/components/talent/physical-data-table";
import { ProfileActionBar } from "@/components/talent/profile-action-bar";
import { ProfileGallery } from "@/components/talent/profile-gallery";
import { ProfileHero } from "@/components/talent/profile-hero";
import type { ProfileStatItem } from "@/components/talent/profile-stats";
import { getCurrentTalent } from "@/lib/auth/current-user";
import { getApplications } from "@/lib/data/applications";

export const metadata: Metadata = {
  title: "Mi perfil — TalentHub",
};

/** % de campos completados sobre los esperados para un perfil maduro. */
function computeProfileCompleteness(talent: Awaited<ReturnType<typeof getCurrentTalent>>): number {
  if (!talent) return 0;
  const checks = [
    !!talent.bio,
    talent.gallery.length >= 4,
    !!talent.physicalData.measurements,
    talent.languages.length >= 1,
    talent.experience.length >= 1,
    !!talent.socialLinks.instagram,
    !!talent.portfolio,
  ];
  const completed = checks.filter(Boolean).length;
  return Math.round((completed / checks.length) * 100);
}

export default async function TalentProfilePage() {
  const talent = await getCurrentTalent();
  if (!talent) notFound();

  const applications = await getApplications(talent.id);
  const completeness = computeProfileCompleteness(talent);

  const stats: ProfileStatItem[] = [
    { label: "Aplicaciones enviadas", value: applications.length.toString() },
    { label: "Vistos por agencias", value: (applications.length * 4).toString() },
    {
      label: "Perfil completo",
      value: `${completeness}%`,
      progress: completeness,
      highlight: true,
    },
  ];

  return (
    <>
      <ProfileActionBar />
      <ProfileHero talent={talent} stats={stats} />
      <ProfileGallery photos={talent.gallery} />
      <PhysicalDataTable data={talent.physicalData} />
      <LanguagesList languages={talent.languages} />
      <ExperienceList items={talent.experience} />
    </>
  );
}
