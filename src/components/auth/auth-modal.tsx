"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
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
  /** Solo en mode=page: controla el cross-link inferior (login ↔ registro). */
  pageVariant?: "login" | "register";
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

export function AuthModal({ mode, initialRole = "talent", pageVariant, onClose }: AuthModalProps) {
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

  // TODO(fase-3): preservar searchParams.next y redirigir post-auth real
  // TODO(fase-3): reemplazar simulación toast por auth real (Google + magic link)
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

  // Contenido compartido entre mode=modal y mode=page.
  // El botón cerrar NO va aquí — en modal lo maneja DialogPrimitive.Close.
  const sharedContent = (
    <>
      {/* Logo */}
      <div className="mb-6">
        <Logo variant="default" />
      </div>

      {/* Heading + subtítulo */}
      <h2
        id="auth-heading"
        className="font-display mb-2 text-[28px] leading-[1.1] font-medium tracking-[-0.025em]"
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
              disabled={isSubmitting}
              aria-pressed={active}
              onClick={() => setActiveRole(opt.id)}
              className={cn(
                "flex flex-col gap-0.5 rounded-lg px-3 py-2.5 text-left transition-all duration-150",
                "focus-visible:ring-ink focus-visible:ring-2 focus-visible:outline-none",
                active
                  ? "bg-bg border-border border shadow-[0_1px_2px_rgba(10,10,10,0.04)]"
                  : "border border-transparent",
                isSubmitting && "cursor-not-allowed opacity-50",
              )}
            >
              <span
                className={cn(
                  "text-[13px] leading-none font-medium",
                  active ? "text-ink" : "text-ink-muted",
                )}
              >
                {opt.label}
              </span>
              <span className="text-ink-muted mt-0.5 text-[11px] leading-none">{opt.sub}</span>
            </button>
          );
        })}
      </div>

      {/* Botón Google */}
      <button
        type="button"
        disabled={isSubmitting}
        onClick={handleGoogleClick}
        className="bg-ink text-bg hover:bg-ink/90 mb-4 flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-[10px] py-3 text-[14px] font-medium transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] bg-white">
          <GoogleIcon size={14} />
        </span>
        Continuar con Google
      </button>

      {/* Divider */}
      <div className="mb-4 flex items-center gap-3">
        <div className="bg-border h-px flex-1" />
        <span className="text-ink-muted text-[12px] font-medium tracking-[0.1em] uppercase">o</span>
        <div className="bg-border h-px flex-1" />
      </div>

      {/* Formulario email */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-2.5"
        aria-busy={isSubmitting}
      >
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
            disabled={isSubmitting}
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
              ? "bg-coral hover:bg-coral-deep cursor-pointer text-white"
              : "bg-beige text-ink-muted cursor-not-allowed",
          )}
        >
          {isSubmitting ? "Enviando…" : "Continuar con email"}
          {isValid && !isSubmitting && <ArrowRight size={13} strokeWidth={1.5} />}
        </button>
      </form>

      {/* Footer — cross-link contextual: modal siempre, page solo con pageVariant */}
      {(mode === "modal" || pageVariant) && (
        <div className="border-border mt-6 border-t pt-4 text-center text-[13px]">
          {mode === "modal" || pageVariant === "register" ? (
            <>
              <span className="text-ink-muted">¿Ya tienes cuenta? </span>
              <a
                href="/login"
                className="text-coral hover:text-coral-deep font-medium underline-offset-2 transition-colors hover:underline"
              >
                Inicia sesión
              </a>
            </>
          ) : (
            <>
              <span className="text-ink-muted">¿No tienes cuenta? </span>
              <a
                href="/register/talent"
                className="text-coral hover:text-coral-deep font-medium underline-offset-2 transition-colors hover:underline"
              >
                Regístrate
              </a>
            </>
          )}
        </div>
      )}

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
    </>
  );

  // mode=modal: Dialog de base-nova gestiona ESC, click-outside,
  // focus trap, restore focus y body scroll lock de fábrica.
  if (mode === "modal") {
    return (
      <DialogPrimitive.Root
        open
        onOpenChange={(open) => {
          if (!open) onClose?.();
        }}
      >
        <DialogPrimitive.Portal>
          <DialogPrimitive.Backdrop
            className="animate-th-fade-in fixed inset-0 z-50"
            style={
              {
                background: "rgba(10, 10, 10, 0.45)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              } as React.CSSProperties
            }
          />
          <DialogPrimitive.Popup
            aria-labelledby="auth-heading"
            className="animate-th-pop-in fixed top-1/2 left-1/2 z-50 w-[calc(100%-2.5rem)] max-w-[420px] -translate-x-1/2 -translate-y-1/2 outline-none"
          >
            <div
              className="border-border bg-bg shadow-modal relative w-full rounded-[16px] border"
              style={{ padding: "36px 32px 28px" }}
            >
              <DialogPrimitive.Close
                render={
                  <button
                    type="button"
                    aria-label="Cerrar"
                    className="text-ink-muted hover:bg-beige-soft absolute top-3.5 right-3.5 flex h-[30px] w-[30px] items-center justify-center rounded-lg transition-colors"
                  />
                }
              >
                <X size={14} strokeWidth={1.5} />
              </DialogPrimitive.Close>
              {sharedContent}
            </div>
          </DialogPrimitive.Popup>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    );
  }

  // mode=page: sin Dialog, centrado por el layout de (auth).
  return (
    <div
      aria-labelledby="auth-heading"
      className="border-border bg-bg shadow-modal relative w-full rounded-[16px] border"
      style={{ maxWidth: 420, padding: "36px 32px 28px" }}
    >
      {sharedContent}
    </div>
  );
}
