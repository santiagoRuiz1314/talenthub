"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { X, ArrowRight } from "lucide-react";
import { toast } from "sonner";

import { Logo } from "@/components/shared/logo";
import { GoogleIcon } from "@/components/icons/google-icon";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { emailAuthSchema, type EmailAuthInput } from "@/lib/schemas/auth";

type Role = "talent" | "agency";

export type AuthModalProps = {
  mode: "modal" | "page";
  initialRole?: Role;
  onClose?: () => void;
};

const ROLE_COPY = {
  talent: {
    heading: "Aplica en segundos",
    sub: "Crea tu perfil y empieza a aplicar a castings reales.",
  },
  agency: {
    heading: "Publica tu casting",
    sub: "Encuentra el talento que necesitas en minutos.",
  },
} as const;

const ROLE_OPTIONS: { id: Role; label: string; sub: string }[] = [
  { id: "talent", label: "Soy talento", sub: "Modelo, actor, creador" },
  { id: "agency", label: "Soy agencia", sub: "Publico castings" },
];

export function AuthModal({
  mode,
  initialRole = "talent",
  onClose,
}: AuthModalProps) {
  const [activeRole, setActiveRole] = useState<Role>(initialRole);

  const copy = ROLE_COPY[activeRole];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<EmailAuthInput>({
    resolver: standardSchemaResolver(emailAuthSchema),
    mode: "onBlur",
    defaultValues: { email: "" },
  });

  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mode !== "modal" || !onClose) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [mode, onClose]);

  async function onSubmit(data: EmailAuthInput) {
    await new Promise<void>((resolve) => setTimeout(resolve, 800));
    toast.success("Revisa tu email para continuar", {
      description: data.email,
    });
    reset();
  }

  function handleGoogleClick() {
    toast.info("Google auth próximamente");
  }

  const box = (
    <div
      ref={boxRef}
      role={mode === "modal" ? "dialog" : undefined}
      aria-modal={mode === "modal" ? true : undefined}
      aria-labelledby="auth-heading"
      onClick={(e) => e.stopPropagation()}
      className={cn(
        "relative w-full",
        "border-border bg-bg shadow-modal rounded-2xl border",
        "animate-th-pop-in",
      )}
      style={{ maxWidth: 420, padding: "36px 32px 28px" }}
    >
      {/* Botón cerrar — solo en mode=modal */}
      {mode === "modal" && onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="text-ink-muted hover:bg-beige-soft absolute top-3.5 right-3.5 flex h-[30px] w-[30px] items-center justify-center rounded-lg transition-colors"
        >
          <X size={14} strokeWidth={1.5} />
        </button>
      )}

      {/* Logo */}
      <div className="mb-6">
        <Logo variant="default" />
      </div>

      {/* Heading + subtítulo */}
      <h2
        id="auth-heading"
        className="font-display mb-2 text-[28px] font-medium leading-[1.1] tracking-[-0.025em]"
      >
        {copy.heading}
        <span className="text-coral">.</span>
      </h2>
      <p className="text-ink-muted mb-6 text-[14px] leading-[1.5]">{copy.sub}</p>

      {/* Toggle talento / agencia */}
      <div className="bg-beige-soft mb-5 grid grid-cols-2 gap-1 rounded-[10px] p-1">
        {ROLE_OPTIONS.map((opt) => {
          const active = activeRole === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => setActiveRole(opt.id)}
              className={cn(
                "flex flex-col gap-0.5 rounded-lg px-3 py-2.5 text-left transition-all duration-150",
                active
                  ? "bg-bg border-border shadow-[0_1px_2px_rgba(10,10,10,0.04)] border"
                  : "border border-transparent",
              )}
            >
              <span
                className={cn(
                  "text-[13px] font-medium leading-none",
                  active ? "text-ink" : "text-ink-muted",
                )}
              >
                {opt.label}
              </span>
              <span className="text-ink-muted text-[11px] leading-none mt-0.5">
                {opt.sub}
              </span>
            </button>
          );
        })}
      </div>

      {/* Botón Google */}
      <button
        type="button"
        onClick={handleGoogleClick}
        className="bg-ink text-bg hover:bg-[#222] mb-4 flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-[10px] py-3 text-[14px] font-medium transition-colors duration-150"
      >
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] bg-white">
          <GoogleIcon size={14} />
        </span>
        Continuar con Google
      </button>

      {/* Divider */}
      <div className="mb-4 flex items-center gap-3">
        <div className="bg-border h-px flex-1" />
        <span className="text-ink-muted text-[12px] font-medium tracking-[0.1em] uppercase">
          o
        </span>
        <div className="bg-border h-px flex-1" />
      </div>

      {/* Formulario email */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-2.5">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="auth-email"
            className="text-ink-muted text-[11.5px] font-medium tracking-[0.06em] uppercase"
          >
            Email
          </label>
          <Input
            id="auth-email"
            type="email"
            placeholder="tu@email.com"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "auth-email-error" : undefined}
            className={cn(
              "h-auto rounded-[10px] px-3.5 py-3 text-[14px] transition-colors duration-150",
              "border-border focus-visible:border-ink focus-visible:ring-0",
              errors.email && "border-danger-border",
            )}
            {...register("email")}
          />
          {errors.email && (
            <p id="auth-email-error" className="text-danger mt-0.5 text-xs">
              {errors.email.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className={cn(
            "flex w-full items-center justify-center gap-1.5 rounded-[10px] py-3 text-[14px] font-medium transition-colors duration-150",
            isValid && !isSubmitting
              ? "bg-coral text-white hover:bg-coral-deep cursor-pointer"
              : "bg-beige text-ink-muted cursor-not-allowed",
          )}
        >
          {isSubmitting ? "Enviando…" : "Continuar con email"}
          {isValid && !isSubmitting && <ArrowRight size={13} strokeWidth={1.5} />}
        </button>
      </form>

      {/* Footer — ya tienes cuenta */}
      <div className="border-border mt-6 border-t pt-4 text-center text-[13px]">
        <span className="text-ink-muted">¿Ya tienes cuenta? </span>
        <a
          href="/login"
          className="text-coral hover:text-coral-deep font-medium underline-offset-2 transition-colors hover:underline"
        >
          Inicia sesión
        </a>
      </div>

      {/* Microcopy */}
      <p className="text-ink-muted mt-3.5 text-center text-[11px] leading-[1.5]">
        Al continuar aceptas los{" "}
        <a href="#" className="text-ink underline underline-offset-2">
          términos
        </a>{" "}
        y la{" "}
        <a href="#" className="text-ink underline underline-offset-2">
          política de privacidad
        </a>
        .
      </p>
    </div>
  );

  if (mode === "modal") {
    return (
      <div
        onClick={onClose}
        className="animate-th-fade-in fixed inset-0 z-50 flex items-center justify-center px-5"
        style={{
          background: "rgba(10, 10, 10, 0.45)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        } as React.CSSProperties}
      >
        {box}
      </div>
    );
  }

  return box;
}
