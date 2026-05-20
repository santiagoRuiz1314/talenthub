import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { AgencySidebar, type AgencyActivePath } from "@/components/shared/agency-sidebar";
import { AgencyTopNav } from "@/components/shared/agency-top-nav";
import { getAgencyStats } from "@/lib/data/agencies";
import { getCurrentAgency } from "@/lib/auth/current-user";

/**
 * Layout del área agencia. Sticky TopNav arriba + grid sidebar/main.
 * Datos pre-fetch para el sidebar (active castings + applicants del mes).
 *
 * NOTA: la marca del item activo en el sidebar la deduce cada página via
 * el slot opcional `activePath` que se reenvía por contexto a Fase 3.
 * En Fase 2 todas las rutas (agency)/* heredan activePath="castings" por
 * defecto — basta para `/dashboard`. `/castings/new` y `/applicants` lo
 * ajustan vía un re-render del Sidebar más adelante si emerge un caso.
 */
export default async function AgencyLayout({ children }: { children: ReactNode }) {
  const agency = await getCurrentAgency();
  if (!agency) {
    redirect("/login?role=agency");
  }

  const stats = await getAgencyStats(agency.id);
  const activePath: AgencyActivePath = "castings";

  return (
    <div className="bg-bg flex min-h-screen flex-col">
      <AgencyTopNav agency={agency} />
      <div className="grid flex-1 lg:grid-cols-[240px_1fr]">
        <AgencySidebar
          active={activePath}
          recentApplicants={stats.applicantsThisMonth}
          activeCastings={stats.activeCount}
          applicantsThisMonth={stats.applicantsThisMonth}
        />
        <main className="px-5 py-8 sm:px-8 lg:px-10 lg:py-9">{children}</main>
      </div>
    </div>
  );
}
