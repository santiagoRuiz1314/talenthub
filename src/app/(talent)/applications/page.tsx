import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Bookmark, Plus } from "lucide-react";

import { StateCard } from "@/components/shared/state-card";
import { TabsPill, type TabPillItem } from "@/components/shared/tabs-pill";
import { AppCard } from "@/components/talent/app-card";
import { getCurrentTalent } from "@/lib/auth/current-user";
import { getApplicationsFull } from "@/lib/data/applications";
import type { ApplicationStatus } from "@/lib/types/application";

export const metadata: Metadata = {
  title: "Mis aplicaciones — TalentHub",
};

type TabId = "all" | ApplicationStatus;

const STATUS_FILTERS: { id: TabId; label: string }[] = [
  { id: "all", label: "Todas" },
  { id: "pending", label: "En revisión" },
  { id: "viewed", label: "Vistas" },
  { id: "pre_selected", label: "Pre-seleccionadas" },
  { id: "rejected", label: "Descartadas" },
];

function parseStatusParam(value: string | string[] | undefined): TabId {
  const v = Array.isArray(value) ? value[0] : value;
  if (!v) return "all";
  return STATUS_FILTERS.some((f) => f.id === v) ? (v as TabId) : "all";
}

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function TalentApplicationsPage({ searchParams }: Props) {
  const params = await searchParams;
  const activeId = parseStatusParam(params.status);

  const talent = await getCurrentTalent();
  if (!talent) notFound();

  const applications = await getApplicationsFull(talent.id);

  const countByStatus: Record<TabId, number> = {
    all: applications.length,
    pending: applications.filter((a) => a.status === "pending").length,
    viewed: applications.filter((a) => a.status === "viewed").length,
    pre_selected: applications.filter((a) => a.status === "pre_selected").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
  };

  const filtered =
    activeId === "all" ? applications : applications.filter((a) => a.status === activeId);

  const withResponse = applications.filter((a) => a.status !== "pending").length;

  const tabItems: TabPillItem[] = STATUS_FILTERS.map((f) => ({
    id: f.id,
    label: f.label,
    count: countByStatus[f.id],
    href: f.id === "all" ? "/applications" : `/applications?status=${f.id}`,
  }));

  const hasApplicationsAtAll = applications.length > 0;

  return (
    <div className="mx-auto w-full max-w-[1100px]">
      <div className="flex flex-wrap items-end justify-between gap-4 pt-10">
        <div>
          <div className="mb-1.5 text-[11.5px] font-medium uppercase tracking-[0.08em] text-ink-muted">
            <span className="tabular-nums">{applications.length}</span> aplicacion
            {applications.length === 1 ? "" : "es"}
            {hasApplicationsAtAll && (
              <>
                {" · "}
                <span className="tabular-nums">{withResponse}</span> con respuesta
              </>
            )}
          </div>
          <h1 className="font-display m-0 text-[clamp(32px,4vw,44px)] font-medium leading-[1.05] tracking-[-0.03em] text-ink">
            Mis aplicaciones
          </h1>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-[10px] bg-ink px-4 py-2.5 text-[13.5px]
                     font-medium text-bg transition-colors hover:bg-ink/90
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink
                     focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          <Plus size={13} strokeWidth={1.6} aria-hidden />
          Aplicar a más castings
        </Link>
      </div>

      <div className="mt-8">
        <TabsPill items={tabItems} activeId={activeId} ariaLabel="Filtros de estado" />
      </div>

      <div className="mt-6 pb-16">
        {filtered.length === 0 ? (
          hasApplicationsAtAll ? (
            <StateCard
              variant="empty"
              title="No hay aplicaciones con este estado"
              body="Cambia de filtro para ver el resto de tus aplicaciones."
              cta={
                <Link
                  href="/applications"
                  className="inline-flex items-center gap-1.5 rounded-[10px] border border-border bg-bg
                             px-4 py-2.5 text-[13.5px] font-medium text-ink transition-colors
                             hover:bg-beige-soft"
                >
                  Ver todas
                </Link>
              }
            />
          ) : (
            <StateCard
              variant="empty"
              icon={<Bookmark size={22} strokeWidth={1.5} />}
              title="Aún no has aplicado a ningún casting"
              body="Cuando apliques, aparecerán aquí con su estado en tiempo real. Empieza por explorar los castings activos."
              cta={
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-[12px] bg-coral px-6 py-3 text-[14px]
                             font-semibold text-white transition-colors hover:bg-coral-deep"
                >
                  Explorar castings
                  <ArrowRight size={13} strokeWidth={1.6} aria-hidden />
                </Link>
              }
            />
          )
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((a) => (
              <AppCard key={a.id} application={a} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
