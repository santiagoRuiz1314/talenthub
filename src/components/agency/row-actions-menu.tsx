"use client";

import Link from "next/link";
import { Copy, Eye, Pencil, X } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface RowActionsMenuProps {
  castingId: string;
}

/**
 * Menu de acciones por fila en la tabla del dashboard agencia.
 * Trigger es el clásico ⋯ (3-dots). Items: Ver aplicantes / Editar / Duplicar / Cerrar casting.
 *
 * Ver aplicantes navega a /agency/castings/[id]/applicants. Editar y Duplicar
 * son placeholders Fase 2 (no implementados aún). "Cerrar casting" tiñe coral
 * para diferenciarlo de las acciones neutras.
 */
export function RowActionsMenu({ castingId }: RowActionsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Acciones del casting"
        onClick={(e) => e.preventDefault()}
        className="inline-flex h-7 w-7 items-center justify-center rounded-[7px]
                   border border-transparent bg-transparent text-ink-muted transition-colors
                   data-[popup-open]:border-border data-[popup-open]:bg-beige
                   hover:bg-beige-soft focus-visible:outline-none focus-visible:ring-2
                   focus-visible:ring-ink"
      >
        <svg width={14} height={14} viewBox="0 0 16 16" fill="currentColor" aria-hidden>
          <circle cx={3.5} cy={8} r={1.3} />
          <circle cx={8} cy={8} r={1.3} />
          <circle cx={12.5} cy={8} r={1.3} />
        </svg>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={4}
        className="min-w-[180px] rounded-[10px] border border-border bg-bg p-1 shadow-popover"
      >
        <DropdownMenuItem
          render={
            <Link
              href={`/agency/castings/${castingId}/applicants`}
              className="flex items-center gap-2 rounded-md px-2.5 py-2 text-[13px] text-ink
                         transition-colors data-highlighted:bg-beige-soft"
            />
          }
        >
          <Eye size={13} strokeWidth={1.5} aria-hidden />
          Ver aplicantes
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 rounded-md px-2.5 py-2 text-[13px] text-ink transition-colors data-highlighted:bg-beige-soft">
          <Pencil size={13} strokeWidth={1.5} aria-hidden />
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 rounded-md px-2.5 py-2 text-[13px] text-ink transition-colors data-highlighted:bg-beige-soft">
          <Copy size={13} strokeWidth={1.5} aria-hidden />
          Duplicar
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-1" />
        <DropdownMenuItem className="flex items-center gap-2 rounded-md px-2.5 py-2 text-[13px] text-coral-deep transition-colors data-highlighted:bg-coral-soft">
          <X size={13} strokeWidth={1.5} aria-hidden />
          Cerrar casting
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
