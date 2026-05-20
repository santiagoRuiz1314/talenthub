"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export interface UserMenuItem {
  label: string;
  href?: string;
  /** Si está presente, el item se renderiza con bg-beige (activo). */
  active?: boolean;
}

export interface UserMenuProps {
  /** Nombre corto a mostrar en el trigger (e.g. "María"). */
  shortName: string;
  /** Nombre completo a mostrar en el header del dropdown. */
  fullName: string;
  email: string;
  /** Iniciales para el avatar (máx 2 letras). */
  initials: string;
  items: UserMenuItem[];
  /** Acción de logout (último item, estilo muted). */
  onLogout?: () => void;
}

/**
 * Menú de usuario para el TopNav variant=talent / agency.
 * Avatar circular con iniciales + nombre corto + chevron + dropdown con items.
 * Visual: pill rounded-full + border, hover bg beige.
 */
export function UserMenu({
  shortName,
  fullName,
  email,
  initials,
  items,
  onLogout,
}: UserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="group inline-flex items-center gap-2 rounded-full border border-border
                   bg-transparent py-1 pl-1 pr-2.5 transition-colors
                   data-[popup-open]:bg-beige hover:bg-beige-soft
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
      >
        <span
          aria-hidden
          className="flex h-7 w-7 items-center justify-center rounded-full font-display
                     text-[12px] font-semibold text-ink"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.78 0.04 22), oklch(0.86 0.03 32))",
          }}
        >
          {initials}
        </span>
        <span className="text-[13px] font-medium text-ink">{shortName}</span>
        <ChevronDown
          size={12}
          strokeWidth={1.5}
          aria-hidden
          className="text-ink-muted transition-transform group-data-[popup-open]:rotate-180"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="min-w-[220px] rounded-[12px] border border-border bg-bg p-1.5 shadow-popover"
      >
        <div className="border-b border-border px-2 pb-3 pt-2">
          <div className="text-[13px] font-medium text-ink">{fullName}</div>
          <div className="text-[12px] text-ink-muted">{email}</div>
        </div>
        <div className="pt-1.5">
          {items.map((it) => {
            const className = cn(
              "block w-full rounded-md px-2.5 py-2 text-left text-[13px] text-ink",
              "transition-colors data-highlighted:bg-beige-soft",
              it.active && "bg-beige font-medium",
            );
            return it.href ? (
              <DropdownMenuItem key={it.label} render={<Link href={it.href} className={className} />}>
                {it.label}
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem key={it.label} className={className}>
                {it.label}
              </DropdownMenuItem>
            );
          })}
        </div>
        {onLogout && (
          <>
            <DropdownMenuSeparator className="my-1.5" />
            <DropdownMenuItem
              onClick={onLogout}
              className="block w-full rounded-md px-2.5 py-2 text-left text-[13px] text-ink-muted
                         transition-colors data-highlighted:bg-beige-soft data-highlighted:text-ink"
            >
              Cerrar sesión
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
