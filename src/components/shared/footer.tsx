import Link from "next/link";

import { Logo } from "./logo";

type Variant = "full" | "minimal";

type Props = {
  variant?: Variant;
};

const NAV_COLS = [
  {
    label: "Talentos",
    links: [
      { href: "/login", label: "Registrarse" },
      { href: "/login", label: "Explorar castings" },
      { href: "/onboarding", label: "Subir portafolio" },
    ],
  },
  {
    label: "Agencias",
    links: [
      { href: "/login", label: "Publicar casting" },
      { href: "/agency/dashboard", label: "Mi panel" },
    ],
  },
  {
    label: "TalentHub",
    links: [
      { href: "#", label: "Sobre nosotros" },
      { href: "#", label: "Privacidad" },
      { href: "#", label: "Términos" },
    ],
  },
];

export function Footer({ variant = "full" }: Props) {
  if (variant === "minimal") {
    return (
      <footer className="border-border border-t py-6">
        <div className="mx-auto flex w-full max-w-[1280px] flex-wrap items-center justify-between gap-3 px-5 sm:px-8">
          <Logo />
          <p className="text-ink-muted text-[12.5px]">
            © {new Date().getFullYear()} TalentHub · Colombia
          </p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="border-border border-t">
      <div className="mx-auto w-full max-w-[1280px] px-5 py-12 sm:px-8">
        <div className="mb-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="text-ink-muted max-w-[200px] text-[13px] leading-relaxed">
              Conectamos talento colombiano con las mejores agencias de casting.
            </p>
          </div>
          {/* Nav cols */}
          {NAV_COLS.map((col) => (
            <div key={col.label} className="flex flex-col gap-3">
              <span className="text-ink text-[12px] font-semibold tracking-[0.06em] uppercase">
                {col.label}
              </span>
              <ul className="flex flex-col gap-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-ink-muted hover:text-ink text-[13.5px] transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-border border-t pt-6">
          <p className="text-ink-muted text-[12px]">
            © {new Date().getFullYear()} TalentHub · Bogotá, Colombia · Todos los derechos
            reservados
          </p>
        </div>
      </div>
    </footer>
  );
}
