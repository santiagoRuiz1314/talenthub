import { Suspense } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

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

export function TopNav({ variant }: Props) {
  if (variant !== "public") return null;
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
        </div>
      </div>
    </header>
  );
}
