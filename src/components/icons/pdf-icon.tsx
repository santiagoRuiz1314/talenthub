import type { LucideProps } from "lucide-react";

/**
 * Ícono de archivo PDF con gradient coral suave → coral pleno y corner fold.
 * `size` controla ancho; el alto es proporcional (24×28 viewBox, ratio 6:7).
 * Gradient ID `th-pdf-gradient` asume ≤1 instancia por página — suficiente en Fase 2.
 */
export function PdfIcon({
  size = 40,
  strokeWidth = 1.5,
  className,
  color: _color,
  ...rest
}: LucideProps) {
  return (
    <svg
      width={size}
      height={Math.round((size * 28) / 24)}
      viewBox="0 0 24 28"
      fill="none"
      aria-hidden
      className={className}
      {...rest}
    >
      <defs>
        <linearGradient id="th-pdf-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--coral)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--coral)" />
        </linearGradient>
      </defs>

      {/* Cuerpo del documento con fold en esquina superior derecha */}
      <path
        d="M4 1h10l6 6v18a2 2 0 01-2 2H4a2 2 0 01-2-2V3a2 2 0 012-2z"
        fill="url(#th-pdf-gradient)"
      />

      {/* Triángulo del fold */}
      <path d="M14 1l6 6h-6V1z" fill="var(--coral-deep)" fillOpacity="0.35" />

      {/* Línea de pliegue */}
      <path
        d="M14 1l6 6"
        stroke="white"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeOpacity="0.55"
      />

      {/* Label PDF */}
      <text
        x="11"
        y="19"
        dy="0.05em"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="white"
        fontSize="6"
        fontWeight="700"
        fontFamily="system-ui, -apple-system, sans-serif"
        letterSpacing="1"
      >
        PDF
      </text>
    </svg>
  );
}
