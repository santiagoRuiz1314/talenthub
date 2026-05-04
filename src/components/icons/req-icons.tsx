import type { LucideProps } from "lucide-react";

/** Iconos custom para los requisitos de un casting. API lucide-compatible. */

export function ReqAge({
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
      <circle cx="8" cy="6" r="2.5" />
      <path d="M3.5 13c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5" />
    </svg>
  );
}

export function ReqGender({
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
      <circle cx="6.5" cy="9" r="3" />
      <path d="M9 7l3-3M12 4h-2.5M12 4v2.5" />
    </svg>
  );
}

export function ReqHeight({
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
      <path d="M4 2v12M4 2l-1.5 1.5M4 2l1.5 1.5M4 14l-1.5-1.5M4 14l1.5-1.5M9 5h4M9 9h4M9 13h4" />
    </svg>
  );
}

export function ReqFeatures({
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
      <path d="M8 2l1.8 4.2L14 7l-3 2.8.8 4.2L8 12l-3.8 2 .8-4.2L2 7l4.2-.8L8 2z" />
    </svg>
  );
}

export function ReqLanguage({
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
      <circle cx="8" cy="8" r="5.5" />
      <path d="M2.5 8h11M8 2.5c1.8 2 1.8 9 0 11M8 2.5c-1.8 2-1.8 9 0 11" />
    </svg>
  );
}

export function ReqExp({
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
      <rect x="2.5" y="5" width="11" height="8" rx="1.5" />
      <path d="M5.5 5V3.5h5V5" />
    </svg>
  );
}
