import type { LucideProps } from "lucide-react";

import { cn } from "@/lib/utils";

type AISparkleProps = LucideProps & { animated?: boolean };

/**
 * Sparkle de 8 rayos para contextos de IA.
 * `animated` añade animate-th-pulse-soft (eyebrow pill).
 * El padre puede añadir animate-th-orbit vía className (FileCard).
 * API compatible con lucide: acepta size, strokeWidth, color, className.
 */
export function AISparkle({
  size = 16,
  strokeWidth = 1.5,
  color = "currentColor",
  className,
  animated,
  ...rest
}: AISparkleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn(animated && "animate-th-pulse-soft", className)}
      {...rest}
    >
      {/* 4 rayos principales */}
      <path d="M8 2.5v3M8 10.5v3M2.5 8h3M10.5 8h3" />
      {/* 4 rayos diagonales cortos */}
      <path d="M10 5l1.5-1.5M6 5l-1.5-1.5M10 11l1.5 1.5M6 11l-1.5 1.5" />
      {/* Diamante central */}
      <path d="M8 6.5l1.2 1.5L8 9.5l-1.2-1.5L8 6.5z" fill={color} stroke="none" />
    </svg>
  );
}
