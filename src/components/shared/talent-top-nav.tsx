import Link from "next/link";

import { UserMenu, type UserMenuItem } from "@/components/shared/user-menu";
import { Logo } from "@/components/shared/logo";
import { cn } from "@/lib/utils";

export interface TalentTopNavProps {
  user: {
    shortName: string;
    fullName: string;
    email: string;
    initials: string;
  };
  /** Pathname actual para marcar el item activo en el menú. */
  activePath?: "profile" | "applications" | "saved" | "settings";
}

const NAV_LINKS = [
  { href: "/", label: "Castings" },
  { href: "#", label: "Agencias" },
  { href: "#", label: "Recursos" },
];

/**
 * Top nav del talento logueado. Sticky, blur backdrop. Replica el TopNav public
 * pero reemplaza los CTAs (Soy agencia / Entrar) por el UserMenu.
 */
export function TalentTopNav({ user, activePath = "profile" }: TalentTopNavProps) {
  const menuItems: UserMenuItem[] = [
    { label: "Mi perfil", href: "/profile", active: activePath === "profile" },
    { label: "Mis aplicaciones", href: "/applications", active: activePath === "applications" },
    { label: "Guardados", href: "#", active: activePath === "saved" },
    { label: "Configuración", href: "#", active: activePath === "settings" },
  ];

  return (
    <header
      className="sticky top-0 z-30 border-b border-border backdrop-blur-[12px] backdrop-saturate-[180%]"
      style={{ background: "rgba(250, 250, 247, 0.85)" }}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between gap-4 px-5 sm:px-8">
        <div className="flex items-center gap-5">
          <Logo />
          <span aria-hidden className="hidden h-[22px] w-px bg-border lg:block" />
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className={cn(
                  "rounded-md px-2.5 py-1.5 text-[13.5px] text-ink-muted transition-colors",
                  "hover:text-ink",
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <UserMenu
          shortName={user.shortName}
          fullName={user.fullName}
          email={user.email}
          initials={user.initials}
          items={menuItems}
        />
      </div>
    </header>
  );
}
