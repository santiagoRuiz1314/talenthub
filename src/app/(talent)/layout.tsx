import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { TalentTopNav } from "@/components/shared/talent-top-nav";
import { getCurrentTalent, getCurrentUser } from "@/lib/auth/current-user";
import { nameInitials } from "@/lib/utils";

/**
 * Layout del área talento. Sticky TopNav con UserMenu + main + footer minimal.
 * Si el usuario no está autenticado o no es talent, redirige a /login.
 */
export default async function TalentLayout({ children }: { children: ReactNode }) {
  const [user, talent] = await Promise.all([getCurrentUser(), getCurrentTalent()]);

  if (!user || !talent) {
    redirect("/login");
  }

  return (
    <div className="bg-bg flex min-h-screen flex-col">
      <TalentTopNav
        user={{
          shortName: talent.firstName,
          fullName: `${talent.firstName} ${talent.lastName}`,
          email: user.email,
          initials: nameInitials(talent.firstName, talent.lastName),
        }}
      />
      <main className="mx-auto w-full max-w-[1280px] flex-1 px-5 sm:px-8">{children}</main>
      <footer className="border-t border-border py-8 text-center text-[12px] text-ink-muted">
        © {new Date().getFullYear()} TalentHub Colombia
      </footer>
    </div>
  );
}
