import Link from "next/link";
import { Pencil, Upload } from "lucide-react";

/**
 * Barra de acciones del perfil: breadcrumb (Inicio / Mi perfil) a la izquierda,
 * "Re-subir portafolio" + "Editar perfil" a la derecha.
 */
export function ProfileActionBar() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 pt-6">
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2 text-[12.5px] text-ink-muted"
      >
        <Link href="/" className="text-ink-muted hover:text-ink">
          Inicio
        </Link>
        <span aria-hidden className="opacity-50">
          /
        </span>
        <span className="font-medium text-ink">Mi perfil</span>
      </nav>
      <div className="flex flex-wrap gap-2">
        <Link
          href="/onboarding"
          className="inline-flex items-center gap-1.5 rounded-[10px] border border-border bg-transparent
                     px-3.5 py-2 text-[13px] font-medium text-ink transition-colors
                     hover:bg-beige-soft focus-visible:outline-none focus-visible:ring-2
                     focus-visible:ring-ink"
        >
          <Upload size={13} strokeWidth={1.5} aria-hidden />
          Re-subir portafolio
        </Link>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-[10px] bg-ink px-4 py-2
                     text-[13px] font-medium text-bg transition-colors hover:bg-ink/90
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink
                     focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          <Pencil size={13} strokeWidth={1.5} aria-hidden />
          Editar perfil
        </button>
      </div>
    </div>
  );
}
