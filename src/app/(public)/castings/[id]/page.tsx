import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { DetailAdditionalInfo } from "@/components/casting/detail-additional-info";
import { DetailApplySection } from "@/components/casting/detail-apply-section";
import { DetailDescription } from "@/components/casting/detail-description";
import { DetailHeader } from "@/components/casting/detail-header";
import { DetailRequirements } from "@/components/casting/detail-requirements";
import { DetailSimilares } from "@/components/casting/detail-similares";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { Footer } from "@/components/shared/footer";
import { getCastingWithAgency, getCastingsWithAgency } from "@/lib/data/castings";
import { parseCastingIdParam } from "@/lib/utils";

type Params = Promise<{ id: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  // TODO(fase-3): deduplicar con cache() o helper memoizado
  const { id } = await params;
  const castingId = parseCastingIdParam(id);
  if (!castingId) return {};
  const casting = await getCastingWithAgency(castingId);
  if (!casting) return {};
  return {
    title: `${casting.title} | TalentHub`,
    description: casting.description.slice(0, 160),
  };
}

export default async function CastingDetailPage({ params }: { params: Params }) {
  const { id } = await params;
  const castingId = parseCastingIdParam(id);
  if (!castingId) notFound();

  const casting = await getCastingWithAgency(castingId);
  if (!casting || casting.status !== "active") notFound();

  // Similares: misma categoría, activos, excluye el actual, máximo 3
  const allSimilar = await getCastingsWithAgency({
    category: casting.category,
    status: "active",
  });
  const similares = allSimilar.filter((c) => c.id !== castingId).slice(0, 3);

  return (
    <>
      <div className="mx-auto w-full max-w-[1280px] px-5 pb-24 sm:px-8">
        <Breadcrumb
          items={[
            { label: "Inicio", href: "/" },
            { label: "Castings", href: "/" },
            { label: casting.title },
          ]}
        />

        <DetailHeader casting={casting} />
        <DetailDescription description={casting.description} />
        <DetailRequirements requirements={casting.requirements} />
        <DetailAdditionalInfo casting={casting} />
        <DetailApplySection casting={casting} />
        {similares.length > 0 && <DetailSimilares castings={similares} />}
      </div>
      <Footer variant="full" />
    </>
  );
}
