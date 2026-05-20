import Link from "next/link";
import { SearchX } from "lucide-react";

import { StateCard } from "@/components/shared/state-card";

export default function CastingNotFound() {
  return (
    <div className="mx-auto w-full max-w-[1280px] px-5 py-20 sm:px-8">
      <StateCard
        variant="empty"
        icon={<SearchX size={22} strokeWidth={1.5} />}
        title="Casting no encontrado"
        body="Este casting no existe, fue eliminado o el enlace es incorrecto."
        cta={
          <Link
            href="/"
            className="bg-coral hover:bg-coral-deep inline-flex items-center gap-2 rounded-[10px] px-5 py-2.5 text-[14px] font-semibold text-white transition-colors"
          >
            Ver todos los castings
          </Link>
        }
      />
    </div>
  );
}
