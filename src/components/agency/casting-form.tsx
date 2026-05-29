"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { ChevronDown, ArrowRight, Settings2, Sparkles } from "lucide-react";
import { toast } from "sonner";

import {
  ChipMultiSelect,
  type ChipOption,
} from "@/components/onboarding/chip-multi-select";
import { PhotoUpload, type PhotoUploadFile } from "@/components/agency/photo-upload";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CASTING_CATEGORY_LABELS,
  CITY_LABELS,
  GENDER_REQUIREMENT_LABELS,
} from "@/lib/constants";
import {
  castingFormSchema,
  type CastingFormInput,
} from "@/lib/schemas/casting";
import type { CastingCategory } from "@/lib/types/casting";
import type { City, GenderRequirement } from "@/lib/types/shared";
import { cn } from "@/lib/utils";

const CITY_ORDER: City[] = [
  "bogota",
  "medellin",
  "cali",
  "barranquilla",
  "cartagena",
  "bucaramanga",
  "pereira",
  "manizales",
  "santa_marta",
  "cucuta",
  "ibague",
  "pasto",
];

const CATEGORY_OPTIONS: ChipOption<CastingCategory>[] = (
  ["audiovisual", "editorial", "runway", "digital_content", "commercial"] as const
).map((v) => ({ value: v, label: CASTING_CATEGORY_LABELS[v] }));

const GENDER_OPTIONS: { id: GenderRequirement; label: string }[] = (
  ["any", "female", "male", "non_binary"] as const
).map((v) => ({ id: v, label: GENDER_REQUIREMENT_LABELS[v] }));

const DESCRIPTION_MAX = 600;

export interface CastingFormProps {
  agencyId: string;
}

/**
 * Form de Publicar Casting. Solo título + descripción son requeridos
 * (resto opcional). Submit crea el casting con defaults (status="active",
 * deadline = +30 días si no se especifica). Tras éxito redirige a
 * /agency/dashboard con un toast.
 */
export function CastingForm({ agencyId }: CastingFormProps) {
  const router = useRouter();
  const [photo, setPhoto] = useState<PhotoUploadFile | null>(null);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<CastingFormInput>({
    resolver: standardSchemaResolver(castingFormSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const description = watch("description") ?? "";

  const onSubmit = async (data: CastingFormInput) => {
    // TODO(fase-3): subir foto a storage real y guardar URL en photos[].
    // En Fase 2 ignoramos `photo` para no inventar URLs falsas en el mock.
    const { createCastingAction } = await import("@/lib/actions/castings");
    const today = new Date();
    const defaultDeadline = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
    const result = await createCastingAction({
      agencyId,
      title: data.title,
      description: data.description,
      category: data.category ?? "commercial",
      status: "active",
      city: data.city ?? "bogota",
      location: data.location,
      requirements: {
        ageRange:
          data.ageMin && data.ageMax ? { min: data.ageMin, max: data.ageMax } : undefined,
        gender: data.gender,
      },
      photos: [],
      deadline: data.deadline ?? defaultDeadline.toISOString().slice(0, 10),
      shootDate: data.shootDate,
    });
    if (!result.ok) {
      toast.error("No pudimos publicar el casting", { description: result.message });
      return;
    }
    toast.success("Casting publicado", {
      description: "Ya está visible para los talentos.",
    });
    router.push("/agency/dashboard");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex max-w-[600px] flex-col gap-7"
    >
      <Field label="Título del casting" required hint="Lo primero que verá el talento" error={errors.title?.message}>
        <input
          {...register("title")}
          placeholder="Ej: Comercial nacional para marca de bebidas"
          aria-invalid={!!errors.title}
          className="block w-full rounded-[12px] border border-border bg-bg px-4 py-4
                     font-display text-[18px] font-medium tracking-[-0.015em] text-ink
                     outline-none transition-colors duration-150 placeholder:text-ink-muted/60
                     focus:border-ink aria-invalid:border-danger"
        />
      </Field>

      <Field label="Descripción" required error={errors.description?.message}>
        <div
          className={cn(
            "rounded-[12px] border border-border bg-bg px-4 py-3.5",
            "transition-colors duration-150 focus-within:border-ink",
            errors.description && "border-danger",
          )}
        >
          <textarea
            {...register("description")}
            placeholder="Describe el proyecto: qué buscas, contexto creativo, modalidad de trabajo. La IA luego refina la redacción y propone tags automáticos."
            rows={6}
            aria-invalid={!!errors.description}
            className="block min-h-[130px] w-full resize-y bg-transparent text-[14.5px]
                       leading-[1.55] text-ink outline-none placeholder:text-ink-muted/60"
          />
          <div className="mt-1.5 flex items-center justify-between text-[11.5px] text-ink-muted">
            <span className="inline-flex items-center gap-1.5">
              <Sparkles size={11} strokeWidth={1.4} className="text-coral" aria-hidden />
              La IA mejorará la redacción al publicar
            </span>
            <span className="tabular-nums">
              {description.length}/{DESCRIPTION_MAX}
            </span>
          </div>
        </div>
      </Field>

      <Field label="Foto del casting" optional>
        <PhotoUpload file={photo} onFile={setPhoto} disabled={isSubmitting} />
      </Field>

      <OptionalDetails control={control} errors={errors} disabled={isSubmitting} />

      <div className="flex flex-wrap items-center justify-between gap-4 pt-3">
        <button
          type="button"
          className="text-[13.5px] text-ink-muted underline decoration-dashed underline-offset-[3px]
                     transition-colors hover:text-ink"
        >
          Guardar como borrador
        </button>
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          aria-busy={isSubmitting}
          className={cn(
            "inline-flex items-center gap-2 rounded-[12px] px-7 py-3.5",
            "text-[15px] font-semibold transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink",
            "focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
            isValid && !isSubmitting
              ? "bg-coral text-white shadow-coral-glow hover:bg-coral-deep"
              : "bg-beige text-ink-muted cursor-not-allowed",
          )}
        >
          Publicar casting
          <ArrowRight size={14} strokeWidth={1.6} aria-hidden />
        </button>
      </div>

      <p className="pt-1 text-[12px] leading-[1.5] text-ink-muted">
        Al publicar aceptas nuestras{" "}
        <a href="#" className="text-ink-muted underline">
          políticas de uso para agencias
        </a>
        . Tu casting será visible para talentos verificados de inmediato.
      </p>
    </form>
  );
}

function Field({
  label,
  required,
  optional,
  hint,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  hint?: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-3">
        <label className="font-display text-[14px] font-medium tracking-[-0.01em] text-ink">
          {label}
          {required && <span className="ml-1 text-coral">*</span>}
          {optional && (
            <span className="ml-1.5 text-[12px] font-normal text-ink-muted">opcional</span>
          )}
        </label>
        {hint && (
          <span className="truncate text-[12px] text-ink-muted">{hint}</span>
        )}
      </div>
      {children}
      {error && (
        <p role="alert" className="text-[12.5px] text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

function OptionalDetails({
  control,
  errors,
  disabled,
}: {
  control: ReturnType<typeof useForm<CastingFormInput>>["control"];
  errors: ReturnType<typeof useForm<CastingFormInput>>["formState"]["errors"];
  disabled?: boolean;
}) {
  return (
    <Collapsible>
      <div className="overflow-hidden rounded-[14px] border border-border bg-bg">
        <CollapsibleTrigger className="group flex w-full items-center justify-between bg-transparent px-[18px] py-4 text-left transition-colors hover:bg-beige-soft">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-beige-soft text-ink-muted">
              <Settings2 size={14} strokeWidth={1.5} aria-hidden />
            </div>
            <div>
              <div className="text-[14px] font-medium text-ink">Detalles opcionales</div>
              <div className="mt-0.5 text-[12px] text-ink-muted">
                Ciudad, fechas, requisitos, pago — agregar ayuda a filtrar mejor
              </div>
            </div>
          </div>
          <ChevronDown
            size={16}
            strokeWidth={1.5}
            aria-hidden
            className="text-ink-muted transition-transform duration-200 group-data-[panel-open]:rotate-180"
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="border-t border-border px-[18px] pb-[22px] pt-[18px]">
          <div className="flex flex-col gap-[18px]">
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Field label="Categoría" optional>
                  <ChipMultiSelect
                    options={CATEGORY_OPTIONS}
                    value={field.value ? [field.value] : []}
                    onChange={(arr) => field.onChange(arr.at(-1))}
                    ariaLabel="Categoría del casting"
                    disabled={disabled}
                  />
                </Field>
              )}
            />

            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <Field label="Ciudad" optional>
                    <Select
                      value={field.value ?? undefined}
                      onValueChange={(v) => field.onChange(v as City)}
                      disabled={disabled}
                    >
                      <SelectTrigger
                        className="h-auto w-full justify-between rounded-[10px] border border-border bg-bg
                                   px-3.5 py-3 text-[14px] text-ink shadow-none transition-colors
                                   data-[popup-open]:border-ink hover:border-ink/40
                                   data-placeholder:text-ink-muted"
                      >
                        <SelectValue placeholder="Selecciona una ciudad" />
                      </SelectTrigger>
                      <SelectContent className="rounded-[12px] border border-border bg-bg p-1.5 shadow-popover">
                        {CITY_ORDER.map((c) => (
                          <SelectItem
                            key={c}
                            value={c}
                            className="rounded-md px-2.5 py-2 text-[14px] text-ink data-highlighted:bg-beige-soft"
                          >
                            {CITY_LABELS[c]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />

              <Controller
                name="shootDate"
                control={control}
                render={({ field }) => (
                  <Field label="Fecha del casting" optional>
                    <input
                      type="date"
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.value || undefined)}
                      disabled={disabled}
                      className="block w-full rounded-[10px] border border-border bg-bg px-3.5 py-3
                                 text-[14px] text-ink outline-none transition-colors focus:border-ink"
                    />
                  </Field>
                )}
              />
            </div>

            <Controller
              name="deadline"
              control={control}
              render={({ field }) => (
                <Field label="Cierre de aplicaciones" optional error={errors.deadline?.message}>
                  <input
                    type="date"
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(e.target.value || undefined)}
                    disabled={disabled}
                    className="block w-full rounded-[10px] border border-border bg-bg px-3.5 py-3
                               text-[14px] text-ink outline-none transition-colors focus:border-ink"
                  />
                </Field>
              )}
            />

            <div className="border-t border-border pt-3.5">
              <div className="mb-3 text-[11.5px] font-medium uppercase tracking-[0.08em] text-ink-muted">
                Requisitos
              </div>
              <div className="flex flex-col gap-3.5">
                <div className="grid grid-cols-2 gap-3.5">
                  <Controller
                    name="ageMin"
                    control={control}
                    render={({ field }) => (
                      <Field label="Edad mínima" optional error={errors.ageMin?.message}>
                        <input
                          type="number"
                          inputMode="numeric"
                          min={14}
                          max={99}
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(e.target.value === "" ? undefined : Number(e.target.value))
                          }
                          placeholder="18"
                          disabled={disabled}
                          className="block w-full rounded-[10px] border border-border bg-bg px-3.5 py-3
                                     text-[14px] text-ink outline-none transition-colors focus:border-ink
                                     placeholder:text-ink-muted/60 tabular-nums"
                        />
                      </Field>
                    )}
                  />
                  <Controller
                    name="ageMax"
                    control={control}
                    render={({ field }) => (
                      <Field label="Edad máxima" optional error={errors.ageMax?.message}>
                        <input
                          type="number"
                          inputMode="numeric"
                          min={14}
                          max={99}
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(e.target.value === "" ? undefined : Number(e.target.value))
                          }
                          placeholder="35"
                          disabled={disabled}
                          className="block w-full rounded-[10px] border border-border bg-bg px-3.5 py-3
                                     text-[14px] text-ink outline-none transition-colors focus:border-ink
                                     placeholder:text-ink-muted/60 tabular-nums"
                        />
                      </Field>
                    )}
                  />
                </div>

                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <Field label="Género" optional>
                      <div role="radiogroup" className="flex flex-wrap gap-1.5">
                        {GENDER_OPTIONS.map((g) => {
                          const active = field.value === g.id;
                          return (
                            <button
                              key={g.id}
                              type="button"
                              role="radio"
                              aria-checked={active}
                              onClick={() => field.onChange(active ? undefined : g.id)}
                              disabled={disabled}
                              className={cn(
                                "rounded-full border px-3.5 py-2 text-[13px] transition-colors",
                                active
                                  ? "border-ink bg-ink text-bg font-medium"
                                  : "border-border bg-bg text-ink hover:border-ink/40",
                                disabled && "cursor-not-allowed opacity-50",
                              )}
                            >
                              {g.label}
                            </button>
                          );
                        })}
                      </div>
                    </Field>
                  )}
                />

                <Controller
                  name="heightHint"
                  control={control}
                  render={({ field }) => (
                    <Field label="Estatura" optional hint="Rango sugerido en metros">
                      <input
                        type="text"
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(e.target.value || undefined)}
                        placeholder="Ej: 1.65 — 1.80"
                        disabled={disabled}
                        className="block w-full rounded-[10px] border border-border bg-bg px-3.5 py-3
                                   text-[14px] text-ink outline-none transition-colors focus:border-ink
                                   placeholder:text-ink-muted/60"
                      />
                    </Field>
                  )}
                />
              </div>
            </div>

            <Controller
              name="pay"
              control={control}
              render={({ field }) => (
                <Field label="Pago" optional hint="Los talentos prefieren ofertas con pago claro">
                  <input
                    type="text"
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(e.target.value || undefined)}
                    placeholder="Ej: $1.200.000 COP por jornada"
                    disabled={disabled}
                    className="block w-full rounded-[10px] border border-border bg-bg px-3.5 py-3
                               text-[14px] text-ink outline-none transition-colors focus:border-ink
                               placeholder:text-ink-muted/60"
                  />
                </Field>
              )}
            />
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
