import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Plus } from "lucide-react";

import { CastingRow } from "@/components/agency/casting-row";
import { StatCard } from "@/components/agency/stat-card";
import { StateCard } from "@/components/shared/state-card";
import { TabsUnderline, type TabUnderlineItem } from "@/components/shared/tabs-underline";
import { getCurrentAgency } from "@/lib/auth/current-user";
import { getAgencyCastingsWithCounts, getAgencyStats } from "@/lib/data/agencies";
import type { CastingStatus } from "@/lib/types/casting";

export const metadata: Metadata = {
  title: "Mis castings — TalentHub",
};

const TAB_FILTERS: { id: CastingStatus; label: string }[] = [
  { id: "active", label: "Activos" },
  { id: "draft", label: "Borradores" },
  { id: "closed", label: "Cerrados" },
];

function parseTabParam(value: string | string[] | undefined): CastingStatus {
  const v = Array.isArray(value) ? value[0] : value;
  if (v === "draft" || v === "closed") return v;
  return "active";
}

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function formatViews(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(".0", "")}k`;
  return n.toString();
}

export default async function AgencyDashboardPage({ searchParams }: Props) {
  const params = await searchParams;
  const activeTab = parseTabParam(params.status);

  const agency = await getCurrentAgency();
  if (!agency) notFound();

  const [stats, rows] = await Promise.all([
    getAgencyStats(agency.id),
    getAgencyCastingsWithCounts(agency.id),
  ]);

  const filteredRows = rows.filter((r) => r.casting.status === activeTab);

  const counts: Record<CastingStatus, number> = {
    active: stats.activeCount,
    draft: stats.draftCount,
    closed: stats.closedCount,
  };

  const tabItems: TabUnderlineItem[] = TAB_FILTERS.map((f) => ({
    id: f.id,
    label: f.label,
    count: counts[f.id],
    href: f.id === "active" ? "/agency/dashboard" : `/agency/dashboard?status=${f.id}`,
  }));

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="mb-1.5 text-[11.5px] font-medium uppercase tracking-[0.08em] text-ink-muted">
            Dashboard agencia
          </div>
          <h1 className="font-display m-0 text-[clamp(30px,3.6vw,40px)] font-medium leading-[1.05] tracking-[-0.03em] text-ink">
            Mis castings
          </h1>
        </div>
        <Link
          href="/agency/castings/new"
          className="inline-flex items-center gap-1.5 rounded-[10px] bg-coral px-4 py-2.5 text-[13.5px]
                     font-semibold text-white transition-colors hover:bg-coral-deep shadow-coral-glow
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink
                     focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          <Plus size={13} strokeWidth={1.8} aria-hidden />
          Publicar nuevo
        </Link>
      </div>

      <div className="mt-7 grid grid-cols-2 gap-3 xl:grid-cols-4">
        <StatCard
          label="Castings activos"
          value={stats.activeCount}
          delta={`+${Math.min(stats.activeCount, 2)} esta semana`}
          deltaTone="up"
        />
        <StatCard
          label="Total aplicantes"
          value={stats.totalApplicants}
          delta={`+${stats.applicantsThisMonth} este mes`}
          deltaTone="up"
          accent={stats.applicantsThisMonth > 0}
        />
        <StatCard
          label="Vistas esta semana"
          value={formatViews(stats.viewsThisWeek)}
          delta="+18% vs anterior"
          deltaTone="up"
        />
        <StatCard
          label="Castings cerrados"
          value={stats.closedCount}
          delta="Total este año"
        />
      </div>

      <div className="mt-8">
        <TabsUnderline items={tabItems} activeId={activeTab} ariaLabel="Filtro por estado del casting" />
      </div>

      <div className="mt-1">
        <div className="grid border-b border-border px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.06em] text-ink-muted sm:px-5 sm:grid-cols-[44px_minmax(0,2fr)_110px_100px_110px_36px] xl:grid-cols-[56px_minmax(0,2.4fr)_110px_130px_110px_90px_36px] gap-4">
          <span aria-hidden />
          <span>Casting</span>
          <span className="hidden sm:inline">Ciudad</span>
          <span className="hidden xl:inline">Cierre</span>
          <span>Aplicantes</span>
          <span className="hidden xl:inline">Publicado</span>
          <span aria-hidden className="hidden sm:inline" />
        </div>

        {filteredRows.length === 0 ? (
          <div className="py-6">
            <StateCard
              variant="empty"
              title={
                activeTab === "active"
                  ? "No tienes castings activos"
                  : activeTab === "draft"
                    ? "No hay borradores"
                    : "No hay castings cerrados"
              }
              body={
                activeTab === "active"
                  ? "Publica tu primer casting y comienza a recibir aplicantes en minutos."
                  : "Los castings aparecerán aquí cuando los pongas en este estado."
              }
              cta={
                activeTab === "active" ? (
                  <Link
                    href="/agency/castings/new"
                    className="inline-flex items-center gap-1.5 rounded-[10px] bg-coral px-4 py-2.5 text-[13.5px]
                               font-semibold text-white transition-colors hover:bg-coral-deep"
                  >
                    <Plus size={13} strokeWidth={1.8} aria-hidden />
                    Publicar primer casting
                  </Link>
                ) : null
              }
            />
          </div>
        ) : (
          filteredRows.map((r) => (
            <CastingRow
              key={r.casting.id}
              casting={r.casting}
              applicantsCount={r.applicantsCount}
              unreadCount={r.unreadCount}
            />
          ))
        )}

        {filteredRows.length > 0 && (
          <div className="flex items-center justify-between pt-5 text-[12.5px] text-ink-muted">
            <span>
              Mostrando <span className="tabular-nums">{filteredRows.length}</span> de{" "}
              <span className="tabular-nums">{filteredRows.length}</span>
            </span>
          </div>
        )}
      </div>
    </>
  );
}
