import { Suspense } from "react";
import Link from "next/link";

import { UserMenu, type UserMenuItem } from "@/components/shared/user-menu";
import {
  getCurrentAgency,
  getCurrentTalent,
  getCurrentUser,
} from "@/lib/auth/current-user";
import { CITY_LABELS } from "@/lib/constants";
import { cn, nameInitials } from "@/lib/utils";

import { CitySelector, CitySelectorFallback } from "./city-selector";
import { Logo } from "./logo";

type Variant = "public";

type Props = {
  variant: Variant;
};

const NAV_LINKS: { href: string; label: string; active?: boolean }[] = [
  { href: "/", label: "Castings", active: true },
  { href: "#", label: "Agencias" },
  { href: "#", label: "Recursos" },
];

export async function TopNav({ variant }: Props) {
  if (variant !== "public") return null;
  const user = await getCurrentUser();
  const isTalent = user?.role === "talent";
  const isAgency = user?.role === "agency";
  const talent = isTalent ? await getCurrentTalent() : null;
  const agency = isAgency ? await getCurrentAgency() : null;

  return (
    <header
      className="border-border sticky top-0 z-30 border-b backdrop-blur-[12px] backdrop-saturate-[180%]"
      style={{ background: "rgba(250, 250, 247, 0.85)" }}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between gap-4 px-5 sm:px-8">
        <div className="flex items-center gap-5">
          <Logo />
          <span aria-hidden className="bg-border hidden h-[22px] w-px lg:block" />
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className={cn(
                  "rounded-md px-2.5 py-1.5 text-[13.5px] transition-colors",
                  l.active ? "text-ink font-medium" : "text-ink-muted hover:text-ink",
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <Suspense fallback={<CitySelectorFallback />}>
              <CitySelector />
            </Suspense>
          </div>
          {talent ? (
            <UserMenu
              shortName={talent.firstName}
              fullName={`${talent.firstName} ${talent.lastName}`}
              email={user?.email ?? ""}
              initials={nameInitials(talent.firstName, talent.lastName)}
              items={
                [
                  { label: "Mi perfil", href: "/profile" },
                  { label: "Mis aplicaciones", href: "/applications" },
                ] satisfies UserMenuItem[]
              }
            />
          ) : agency ? (
            <>
              <Link
                href="/agency/dashboard"
                className="text-ink hover:bg-beige-soft hidden rounded-md px-3 py-2 text-[13.5px] font-medium transition-colors sm:inline-flex"
              >
                Ir al dashboard
              </Link>
              <UserMenu
                shortName={agency.name}
                fullName={agency.name}
                email={user?.email ?? `Agencia · ${CITY_LABELS[agency.city]}`}
                initials={agency.name
                  .split(/\s+/)
                  .slice(0, 2)
                  .map((w) => w[0])
                  .filter(Boolean)
                  .join("")
                  .toUpperCase()
                  .slice(0, 2) || "—"}
                items={[{ label: "Dashboard", href: "/agency/dashboard" }]}
              />
            </>
          ) : (
            <>
              <Link
                href="/login?role=agency"
                className="text-ink-muted hover:text-ink hidden rounded-md px-3 py-2 text-[13.5px] transition-colors sm:inline-flex"
              >
                Soy agencia
              </Link>
              <Link
                href="/login"
                className="text-ink hover:bg-beige-soft inline-flex rounded-md px-3 py-2 text-[13.5px] font-medium transition-colors"
              >
                Entrar
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
