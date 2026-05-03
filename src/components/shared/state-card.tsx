import type { ReactNode } from "react";
import { AlertTriangle, CircleCheck, Inbox } from "lucide-react";

import { cn } from "@/lib/utils";

type Variant = "empty" | "error" | "loading" | "success";

type Props = {
  variant: Variant;
  title?: string;
  body?: string;
  icon?: ReactNode;
  cta?: ReactNode;
  className?: string;
};

const VARIANT_BORDER: Record<Variant, string> = {
  empty: "border-border border-dashed",
  error: "border-danger-border",
  loading: "border-border",
  success: "border-success-border",
};

const VARIANT_CHIP: Record<Variant, string> = {
  empty: "bg-beige-soft text-coral",
  error: "bg-danger-bg text-danger",
  loading: "bg-beige-soft text-ink-muted",
  success: "bg-success-bg text-success",
};

const VARIANT_DEFAULTS: Record<Variant, { title: string; body: string }> = {
  empty: {
    title: "Sin resultados",
    body: "Probá ajustar los filtros para ver más oportunidades.",
  },
  error: {
    title: "Algo salió mal",
    body: "No pudimos cargar el contenido. Reintentá en un momento.",
  },
  loading: {
    title: "Cargando",
    body: "",
  },
  success: {
    title: "Listo",
    body: "",
  },
};

const VARIANT_ICON: Record<Variant, ReactNode> = {
  empty: <Inbox size={22} strokeWidth={1.5} />,
  error: <AlertTriangle size={22} strokeWidth={1.5} />,
  loading: null,
  success: <CircleCheck size={22} strokeWidth={1.5} />,
};

export function StateCard({
  variant,
  title,
  body,
  icon,
  cta,
  className,
}: Props) {
  const resolvedTitle = title ?? VARIANT_DEFAULTS[variant].title;
  const resolvedBody = body ?? VARIANT_DEFAULTS[variant].body;
  const iconNode = icon ?? VARIANT_ICON[variant];
  return (
    <div
      role={variant === "error" ? "alert" : undefined}
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-xl border px-8 py-20 text-center",
        VARIANT_BORDER[variant],
        variant === "success" && "animate-th-fade-up",
        className,
      )}
    >
      {iconNode && (
        <div
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-2xl",
            VARIANT_CHIP[variant],
          )}
        >
          {iconNode}
        </div>
      )}
      <div className="max-w-md space-y-1.5">
        <h3 className="font-display text-ink text-[22px] font-medium tracking-[-0.02em]">
          {resolvedTitle}
        </h3>
        {resolvedBody && (
          <p className="text-ink-muted text-[14.5px] leading-relaxed text-pretty">
            {resolvedBody}
          </p>
        )}
      </div>
      {cta && <div className="pt-2">{cta}</div>}
    </div>
  );
}
