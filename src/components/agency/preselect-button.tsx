"use client";

import { useState, useTransition } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";

import { setApplicationStatusAction } from "@/lib/actions/applications";
import type { ApplicationStatus } from "@/lib/types/application";
import type { UUID } from "@/lib/types/shared";
import { cn } from "@/lib/utils";

type Props = {
  applicationId: UUID;
  initialStatus: ApplicationStatus;
};

/**
 * Botón ⭐ que toggleea entre `pending` ↔ `pre_selected` invocando la server
 * action. Optimistic UI: el icono cambia instante; en error revertimos.
 */
export function PreselectButton({ applicationId, initialStatus }: Props) {
  const [status, setStatus] = useState(initialStatus);
  const [isPending, startTransition] = useTransition();
  const isPreselected = status === "pre_selected";

  function handleClick() {
    if (isPending) return;
    const next: ApplicationStatus = isPreselected ? "pending" : "pre_selected";
    const prev = status;
    setStatus(next);
    startTransition(async () => {
      const result = await setApplicationStatusAction(applicationId, next);
      if (!result.ok) {
        setStatus(prev);
        toast.error("No se pudo actualizar", { description: result.message });
        return;
      }
      toast.success(next === "pre_selected" ? "Pre-seleccionado" : "Pre-selección quitada");
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      aria-label={isPreselected ? "Quitar pre-selección" : "Pre-seleccionar"}
      aria-pressed={isPreselected}
      className={cn(
        "inline-flex h-auto w-[38px] shrink-0 items-center justify-center rounded-[9px] border transition-colors",
        isPreselected
          ? "border-transparent bg-coral-soft text-coral-deep"
          : "border-border bg-bg text-ink hover:bg-beige-soft",
        isPending && "cursor-not-allowed opacity-60",
      )}
    >
      <Star
        size={14}
        strokeWidth={1.5}
        fill={isPreselected ? "currentColor" : "none"}
        aria-hidden
      />
    </button>
  );
}
