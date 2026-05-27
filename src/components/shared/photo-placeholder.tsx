import Image from "next/image";

import { cn } from "@/lib/utils";

const HUES = [8, 12, 14, 18, 22, 24, 28, 30, 32, 38, 42] as const;

function hashSeed(seed: string): number {
  let h = 5381;
  for (let i = 0; i < seed.length; i++) {
    h = ((h << 5) + h + seed.charCodeAt(i)) >>> 0;
  }
  return h;
}

type Props = {
  seed: string;
  className?: string;
  /** Si se pasa una URL local/remota, se muestra la foto real en vez del gradient. */
  src?: string;
  alt?: string;
};

/**
 * Placeholder cálido determinístico por seed. Reemplaza Lorem Picsum / Unsplash
 * mientras no haya fotos reales — al cambiar a fotos no se siente roto.
 * Si recibe `src`, renderiza la foto real (object-cover) en vez del gradient.
 * Spec visual: docs/design-system.md §9 "Photo placeholder".
 */
export function PhotoPlaceholder({ seed, className, src, alt }: Props) {
  if (src) {
    const isLocal = src.startsWith("/");
    return (
      <div className={cn("relative overflow-hidden rounded-lg bg-beige-soft", className)}>
        {isLocal ? (
          <Image
            src={src}
            alt={alt ?? ""}
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt ?? ""} className="absolute inset-0 h-full w-full object-cover" />
        )}
      </div>
    );
  }

  const h = HUES[hashSeed(seed) % HUES.length];
  const bgA = `hsl(${h}, 35%, 72%)`;
  const bgB = `hsl(${h + 8}, 28%, 58%)`;
  const accent = `hsl(${h}, 45%, 55%)`;
  return (
    <div
      aria-hidden
      className={cn("relative overflow-hidden rounded-lg", className)}
      style={{ background: `linear-gradient(135deg, ${bgA} 0%, ${bgB} 100%)` }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent 0 14px, rgba(255,255,255,0.18) 14px 15px)",
          mixBlendMode: "overlay",
        }}
      />
      <div
        className="pointer-events-none absolute -top-10 -right-10 h-36 w-36 rounded-full"
        style={{ background: accent, opacity: 0.32 }}
      />
      <div
        className="pointer-events-none absolute -bottom-8 -left-8 h-24 w-24 rounded-2xl"
        style={{ background: "rgba(255,255,255,0.25)", transform: "rotate(18deg)" }}
      />
    </div>
  );
}
