import type { Agency } from "@/lib/types/agency";
import type { UUID } from "@/lib/types/shared";
import { mockAgencies } from "@/mocks/agencies";
import { mockApplications } from "@/mocks/applications";
import { mockCastings } from "@/mocks/castings";

import { simulateLatency } from "./_latency";

/** Métricas agregadas mostradas en el dashboard de agencia. */
export type AgencyStats = {
  activeCount: number;
  draftCount: number;
  closedCount: number;
  totalApplicants: number;
  applicantsThisMonth: number;
  /** Decorativo en Fase 2 (no se trackea vistas reales aún). */
  viewsThisWeek: number;
};

/**
 * Agency por id, o `null` si no existe.
 * Spread shallow defensivo: mutar el objeto retornado no toca el mock.
 */
export async function getAgency(id: UUID): Promise<Agency | null> {
  await simulateLatency();
  const found = mockAgencies.find((a) => a.id === id);
  return found ? { ...found } : null;
}

/**
 * Estadísticas agregadas para el dashboard de agencia. Derivado de mocks.
 * Fase 3 lo reemplaza por una query agregada en DB (counts + sums por status).
 */
export async function getAgencyStats(agencyId: UUID): Promise<AgencyStats> {
  await simulateLatency();
  const castings = mockCastings.filter((c) => c.agencyId === agencyId);
  const activeIds = new Set(castings.filter((c) => c.status === "active").map((c) => c.id));
  const allApplicantsCount = mockApplications.filter((a) =>
    castings.some((c) => c.id === a.castingId),
  ).length;
  const thisMonthApplicants = mockApplications.filter((a) => {
    if (!activeIds.has(a.castingId)) return false;
    const created = new Date(a.createdAt);
    const now = new Date();
    return (
      created.getFullYear() === now.getFullYear() && created.getMonth() === now.getMonth()
    );
  }).length;
  return {
    activeCount: castings.filter((c) => c.status === "active").length,
    draftCount: castings.filter((c) => c.status === "draft").length,
    closedCount: castings.filter((c) => c.status === "closed").length,
    totalApplicants: allApplicantsCount,
    applicantsThisMonth: thisMonthApplicants,
    viewsThisWeek: 4700, // placeholder Fase 2; Fase 4 conectará a analytics.
  };
}

/**
 * Castings de una agencia hidratados con su counter de aplicantes.
 * Lo consume el dashboard agencia (`/agency/dashboard`).
 */
export type AgencyCastingRow = {
  casting: (typeof mockCastings)[number];
  applicantsCount: number;
  unreadCount: number;
};

export async function getAgencyCastingsWithCounts(
  agencyId: UUID,
): Promise<AgencyCastingRow[]> {
  await simulateLatency();
  const castings = mockCastings.filter((c) => c.agencyId === agencyId);
  return castings.map((casting) => {
    const apps = mockApplications.filter((a) => a.castingId === casting.id);
    const unread = apps.filter((a) => a.status === "pending").length;
    return { casting, applicantsCount: apps.length, unreadCount: unread };
  });
}

/**
 * Marca una agencia como `verified`.
 * V1: verificación manual del admin (no hay flujo automatizado).
 * Lanza si la agencia no existe.
 */
export async function verifyAgency(id: UUID): Promise<Agency> {
  await simulateLatency();
  const idx = mockAgencies.findIndex((a) => a.id === id);
  if (idx === -1) {
    throw new Error(`Agency ${id} no encontrada`);
  }
  const updated: Agency = {
    ...mockAgencies[idx],
    verificationStatus: "verified",
    updatedAt: new Date().toISOString(),
  };
  mockAgencies[idx] = updated;
  return updated;
}
