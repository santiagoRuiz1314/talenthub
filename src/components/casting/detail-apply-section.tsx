"use client";

import { useState } from "react";
import { toast } from "sonner";

import { CASTING_DETAIL_COPY } from "@/lib/constants";
import type { CastingWithAgency } from "@/lib/types";

import { DetailApplyBar } from "./detail-apply-bar";
import { DetailInlineCta } from "./detail-inline-cta";

type Props = {
  casting: CastingWithAgency;
};

/** Propietario del estado `applied` compartido entre el CTA inline y el ApplyBar flotante. */
export function DetailApplySection({ casting }: Props) {
  const [applied, setApplied] = useState(false);

  function handleApply() {
    setApplied(true);
    toast.success(CASTING_DETAIL_COPY.applicationSent);
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
