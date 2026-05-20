import type { LucideProps } from "lucide-react";

/**
 * Sparkle de marca TalentHub (4 rays + diamond central).
 * API compatible con lucide: acepta `size`, `strokeWidth`, `color`, `className`.
 */
export function Sparkle({
  size = 16,
  strokeWidth = 1.5,
  className,
  color = "currentColor",
  ...rest
}: LucideProps) {
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
      className={className}
      {...rest}
    >
      <path d="M8 2v4M8 10v4M2 8h4M10 8h4" />
      <path d="M8 6.5l1.2 1.2L8 9l-1.2-1.2L8 6.5z" fill={color} stroke="none" />
    </svg>
  );
}
