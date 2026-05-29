"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { applyToCastingAction } from "@/lib/actions/applications";
import { CASTING_DETAIL_COPY } from "@/lib/constants";
import type { CastingWithAgency } from "@/lib/types";

import { DetailApplyBar } from "./detail-apply-bar";
import { DetailInlineCta } from "./detail-inline-cta";

type Props = {
  casting: CastingWithAgency;
  /** `true` si el talento actual ya aplicó. Calculado en el server component padre. */
  initiallyApplied: boolean;
  /** `false` si no hay sesión de talento — el botón redirige a /login. */
  canApply: boolean;
};

/**
 * Propietario del estado `applied` compartido entre el CTA inline y el ApplyBar
 * flotante. Para usuarios sin sesión de talento, el click manda a /login.
 */
export function DetailApplySection({ casting, initiallyApplied, canApply }: Props) {
  const router = useRouter();
  const [applied, setApplied] = useState(initiallyApplied);
  const [isPending, startTransition] = useTransition();

  function handleApply() {
    if (applied || isPending) return;

    if (!canApply) {
      router.push(`/login?role=talent&next=/castings/${casting.id}`);
      return;
    }

    // Optimistic: marcamos aplicado de inmediato. Si la action falla, revertimos.
    setApplied(true);
    startTransition(async () => {
      const result = await applyToCastingAction(casting.id);
      if (result.ok) {
        toast.success(CASTING_DETAIL_COPY.applicationSent);
      } else {
        setApplied(false);
        if (result.error === "unauthenticated") {
          router.push(`/login?role=talent&next=/castings/${casting.id}`);
          return;
        }
        toast.error("No se pudo enviar la aplicación", {
          description: result.message,
        });
      }
    });
  }

  return (
    <>
      <section className="border-border border-t py-9">
        <DetailInlineCta applied={applied} onApply={handleApply} />
      </section>
      <DetailApplyBar
        title={casting.title}
        deadline={casting.deadline}
        applied={applied}
        onApply={handleApply}
      />
    </>
  );
}
