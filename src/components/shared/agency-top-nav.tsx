import { Logo } from "@/components/shared/logo";
import { UserMenu, type UserMenuItem } from "@/components/shared/user-menu";
import { CITY_LABELS } from "@/lib/constants";
import type { Agency } from "@/lib/types/agency";

export interface AgencyTopNavProps {
  agency: Agency;
  /** Email del owner para mostrar en el dropdown. */
  ownerEmail?: string;
}

/**
 * Top nav del área agencia. Logo (variant=agency con pill "Agencias") +
 * UserMenu con el nombre de la agencia, items decorativos (cambio de agencia
 * llega en Fase 3) y "Cerrar sesión" cableado a la server action `logout`.
 */
export function AgencyTopNav({ agency, ownerEmail }: AgencyTopNavProps) {
  const initials = agency.name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .filter(Boolean)
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const menuItems: UserMenuItem[] = [
    { label: `Agencia · ${CITY_LABELS[agency.city]}` },
    { label: "Cambiar de agencia" },
    { label: "Configuración" },
  ];

  return (
    <header
      className="sticky top-0 z-30 border-b border-border backdrop-blur-[12px] backdrop-saturate-[180%]"
      style={{ background: "rgba(250, 250, 247, 0.85)" }}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between gap-4 px-5 sm:px-8">
        <Logo variant="agency" />
        <UserMenu
          shortName={agency.name}
          fullName={agency.name}
          email={ownerEmail ?? `Agencia · ${CITY_LABELS[agency.city]}`}
          initials={initials || "—"}
          items={menuItems}
        />
      </div>
    </header>
  );
}
