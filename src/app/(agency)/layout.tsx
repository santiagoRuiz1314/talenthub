import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { AgencySidebar } from "@/components/shared/agency-sidebar";
import { AgencyTopNav } from "@/components/shared/agency-top-nav";
import { getAgencyStats } from "@/lib/data/agencies";
import { getCurrentAgency } from "@/lib/auth/current-user";

/**
 * Layout del área agencia. Sticky TopNav arriba + grid sidebar/main.
 * Datos pre-fetch para el sidebar (active castings + applicants del mes).
 * El sidebar deduce el item activo via `usePathname()`.
 */
export default async function AgencyLayout({ children }: { children: ReactNode }) {
  const agency = await getCurrentAgency();
  if (!agency) {
    redirect("/login?role=agency");
  }

  const stats = await getAgencyStats(agency.id);

  return (
    <div className="bg-bg flex min-h-screen flex-col">
      <AgencyTopNav agency={agency} />
      <div className="grid flex-1 lg:grid-cols-[240px_1fr]">
        <AgencySidebar
          recentApplicants={stats.applicantsThisMonth}
          activeCastings={stats.activeCount}
          applicantsThisMonth={stats.applicantsThisMonth}
        />
        <main className="px-5 py-8 sm:px-8 lg:px-10 lg:py-9">{children}</main>
      </div>
    </div>
  );
}
