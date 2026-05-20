import { ProfileSection } from "@/components/talent/profile-section";
import type { PhysicalData } from "@/lib/types/talent";
import { cn } from "@/lib/utils";

const EYE_COLOR_LABELS = {
  brown: "Café",
  black: "Negro",
  hazel: "Avellana",
  green: "Verde",
  blue: "Azul",
  gray: "Gris",
} as const;

const HAIR_COLOR_LABELS = {
  brown: "Castaño",
  black: "Negro",
  blonde: "Rubio",
  red: "Rojo",
  gray: "Gris",
  white: "Blanco",
  other: "Otro",
} as const;

export interface PhysicalDataTableProps {
  data: PhysicalData;
}

/**
 * Tabla 3×3 con los datos físicos del talento. Salta campos no definidos
 * en lugar de mostrar "—" — preferimos vacío informado a placeholders ruido.
 * En `<lg` colapsa a 1 columna.
 */
export function PhysicalDataTable({ data }: PhysicalDataTableProps) {
  const measurements = data.measurements;
  const measurementsValue =
    measurements?.bustCm && measurements.waistCm && measurements.hipsCm
      ? `${measurements.bustCm} · ${measurements.waistCm} · ${measurements.hipsCm}`
      : undefined;

  const items: { label: string; value: string }[] = [
    { label: "Estatura", value: `${(data.heightCm / 100).toFixed(2)} m` },
    ...(measurementsValue ? [{ label: "Medidas", value: measurementsValue }] : []),
    ...(data.shoeSizeEu
      ? [{ label: "Calzado", value: `${data.shoeSizeEu} EU` }]
      : []),
    ...(data.hairColor
      ? [{ label: "Color de cabello", value: HAIR_COLOR_LABELS[data.hairColor] }]
      : []),
    ...(data.eyeColor
      ? [{ label: "Color de ojos", value: EYE_COLOR_LABELS[data.eyeColor] }]
      : []),
  ];

  return (
    <ProfileSection title="Datos físicos" kicker="Características">
      <div className="grid grid-cols-1 overflow-hidden rounded-[12px] border border-border bg-bg lg:grid-cols-3">
        {items.map((it, i) => (
          <div
            key={it.label}
            className={cn(
              "flex flex-col gap-1 px-[18px] py-3.5",
              i >= 3 && "lg:border-t lg:border-border",
              i % 3 !== 0 && "lg:border-l lg:border-border",
              i > 0 && "border-t border-border lg:border-t-0",
            )}
          >
            <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-ink-muted">
              {it.label}
            </span>
            <span className="font-display text-[17px] font-medium tracking-[-0.015em] text-ink">
              {it.value}
            </span>
          </div>
        ))}
      </div>
    </ProfileSection>
  );
}
