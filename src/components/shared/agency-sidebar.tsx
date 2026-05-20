"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutList, Plus, Settings, Users } from "lucide-react";

import { cn } from "@/lib/utils";

export interface AgencySidebarProps {
  /** Cantidad de aplicantes recientes para mostrar como badge en el item. */
  recentApplicants?: number;
  /** Total castings activos para el contador "Este mes". */
  activeCastings: number;
  /** Total aplicantes este mes (footer). */
  applicantsThisMonth: number;
}

const NAV: {
  label: string;
  href: string;
  /** Routes that should mark this item as active. */
  matches: (path: string) => boolean;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
}[] = [
  {
    label: "Mis castings",
    href: "/agency/dashboard",
    matches: (p) => p === "/agency/dashboard",
    icon: LayoutList,
  },
  {
    label: "Publicar nuevo",
    href: "/agency/castings/new",
    matches: (p) => p.startsWith("/agency/castings/new"),
    icon: Plus,
  },
  {
    label: "Aplicantes recientes",
    href: "#",
    matches: (p) => p.startsWith("/agency/castings/") && p.endsWith("/applicants"),
    icon: Users,
  },
  {
    label: "Configuración",
    href: "#",
    matches: () => false,
    icon: Settings,
  },
];

/**
 * Sidebar de 240px del área agencia. Sticky bajo el TopNav (top-16 = 64px),
 * scroll interno. Oculto en `<lg` (900px). Footer card "Este mes" con
 * counter de aplicantes.
 */
export function AgencySidebar({
  recentApplicants,
  activeCastings,
  applicantsThisMonth,
}: AgencySidebarProps) {
  const pathname = usePathname() ?? "";
  return (
    <aside
      className="hidden border-r border-border lg:sticky lg:top-16 lg:block lg:h-[calc(100vh-64px)] lg:overflow-y-auto lg:px-4 lg:py-7"
    >
      <div className="px-3 pb-2.5 text-[11px] font-medium uppercase tracking-[0.08em] text-ink-muted">
        Agencia
      </div>
      <nav className="flex flex-col gap-0.5">
        {NAV.map((item) => {
          const isActive = item.matches(pathname);
          const Icon = item.icon;
          const badge =
            item.label === "Aplicantes recientes" && recentApplicants !== undefined
              ? recentApplicants
              : item.label === "Mis castings"
                ? activeCastings
                : undefined;
          const badgeAccent =
            item.label === "Aplicantes recientes" && (recentApplicants ?? 0) > 0;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 rounded-[10px] px-3 py-2.5 text-[13.5px]",
                "transition-colors",
                isActive
                  ? "bg-ink text-bg font-medium"
                  : "text-ink hover:bg-beige-soft",
              )}
            >
              <Icon size={16} strokeWidth={1.5} />
              <span className="flex-1">{item.label}</span>
              {badge !== undefined && (
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-[11px] font-semibold tabular-nums",
                    isActive
                      ? "bg-white/20 text-bg"
                      : badgeAccent
                        ? "bg-coral-soft text-coral-deep"
                        : "bg-beige text-ink-muted",
                  )}
                >
                  {badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
      <div className="mt-7 rounded-[12px] bg-beige-soft p-3.5">
        <div className="mb-1.5 text-[11px] font-medium uppercase tracking-[0.08em] text-ink-muted">
          Este mes
        </div>
        <div className="font-display mb-0.5 text-[22px] font-medium tracking-[-0.02em] tabular-nums text-ink">
          {applicantsThisMonth} aplicantes
        </div>
        <div className="text-[12px] text-ink-muted">
          en{" "}
          <span className="tabular-nums">{activeCastings}</span> casting
          {activeCastings === 1 ? "" : "s"} activo{activeCastings === 1 ? "" : "s"}
        </div>
      </div>
    </aside>
  );
}
