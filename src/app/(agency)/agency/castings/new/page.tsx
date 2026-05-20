import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Sparkle } from "lucide-react";

import { CastingForm } from "@/components/agency/casting-form";
import { getCurrentAgency } from "@/lib/auth/current-user";

export const metadata: Metadata = {
  title: "Publicar casting — TalentHub",
};

export default async function NewCastingPage() {
  const agency = await getCurrentAgency();
  if (!agency) notFound();

  return (
    <>
      <div className="mb-9 max-w-[640px]">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-coral-soft px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.04em] text-coral-deep">
          <Sparkle size={9} strokeWidth={1.4} aria-hidden />2 campos · ~1 minuto
        </div>
        <h1 className="font-display m-0 mb-3 text-[clamp(32px,4vw,44px)] font-medium leading-[1.05] tracking-[-0.03em] text-ink">
          Publica tu casting<span className="text-coral">.</span>
        </h1>
        <p className="m-0 max-w-[52ch] text-[16px] leading-[1.55] text-ink-muted">
          Solo necesitamos título y descripción para empezar. El resto puedes
          agregarlo después o dejar que la IA lo deduzca de tu copy.
        </p>
      </div>

      <CastingForm agencyId={agency.id} />
    </>
  );
}
