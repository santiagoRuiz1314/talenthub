"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";

import { Sparkle } from "@/components/icons";
import { CategoryChipGroup } from "@/components/onboarding/category-chip-group";
import { CityDropdown } from "@/components/onboarding/city-dropdown";
import { Field } from "@/components/onboarding/field";
import { LanguageChipGroup } from "@/components/onboarding/language-chip-group";
import { PhoneInput } from "@/components/onboarding/phone-input";
import {
  clearOnboardingDraft,
  getOnboardingDraft,
  saveOnboardingDraft,
} from "@/lib/data/onboarding";
import {
  onboardingStep2Schema,
  type OnboardingStep2Input,
} from "@/lib/schemas/onboarding";
import type { City } from "@/lib/types/shared";
import { cn } from "@/lib/utils";

const DEFAULT_VALUES: OnboardingStep2Input = {
  city: "" as unknown as City,
  languages: [],
  categoriesOfInterest: [],
  phone: "",
};

/**
 * Form del paso 2 de onboarding. Hidrata defaults desde el draft de localStorage
 * (city/categories si el usuario ya tocó algo) y persiste el resultado al continuar.
 *
 * Submit: clearOnboardingDraft + toast success + redirect a `/profile`. Fase 3
 * reemplazará el redirect placeholder por la creación real del Talent en DB.
 */
export function OnboardingStep2Client() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm<OnboardingStep2Input>({
    resolver: standardSchemaResolver(onboardingStep2Schema),
    mode: "onChange",
    defaultValues: DEFAULT_VALUES,
  });

  // Hidratar desde draft (no bloquea el render — solo agrega defaults si existen)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const draft = await getOnboardingDraft();
      if (cancelled || !draft) return;
      if (draft.city) setValue("city", draft.city, { shouldValidate: true });
      if (draft.categoriesOfInterest)
        setValue("categoriesOfInterest", draft.categoriesOfInterest, { shouldValidate: true });
    })();
    return () => {
      cancelled = true;
    };
  }, [setValue]);

  const onSubmit = async (data: OnboardingStep2Input) => {
    await saveOnboardingDraft({
      city: data.city,
      categoriesOfInterest: data.categoriesOfInterest,
    });
    await clearOnboardingDraft();
    toast.success("Perfil completo", {
      description: "Ya puedes explorar castings.",
    });
    // TODO(fase-3): crear Talent real en DB + redirect a /profile autenticado
    router.push("/");
  };

  const handleSkipForLater = () => {
    toast.info("Puedes completar tu perfil después desde tu cuenta");
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="mb-10">
        <div
          className="bg-coral-soft text-coral-deep mb-[18px] inline-flex items-center gap-2
                     rounded-full px-3 py-1 text-[11.5px] font-semibold uppercase tracking-[0.06em]"
        >
          <span aria-hidden className="inline-flex text-coral">
            <Sparkle size={11} />
          </span>
          Análisis completado
        </div>

        <h1
          className="font-display m-0 mb-3.5 text-balance text-[clamp(32px,4.4vw,48px)]
                     font-medium leading-[1.05] tracking-[-0.03em] text-ink"
        >
          Casi listo. Completa
          <br />
          estos datos<span className="text-coral">.</span>
        </h1>

        <p className="m-0 max-w-[44ch] text-[16px] leading-[1.55] text-ink-muted">
          Ya extrajimos el resto de tu portafolio. Solo necesitamos{" "}
          <span className="rounded bg-coral-soft px-1.5 py-px font-medium text-ink">
            4 campos más
          </span>{" "}
          para completar tu perfil.
        </p>
      </div>

      <div className="flex max-w-[520px] flex-col gap-7">
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <Field label="Ciudad de residencia" error={errors.city?.message} htmlFor="onboarding-city">
              <CityDropdown
                id="onboarding-city"
                value={(field.value as City | "") ?? ""}
                onChange={field.onChange}
                disabled={isSubmitting}
              />
            </Field>
          )}
        />

        <Controller
          name="languages"
          control={control}
          render={({ field }) => (
            <Field
              label="Idiomas que hablas"
              hint={`${field.value.length} seleccionado${field.value.length === 1 ? "" : "s"}`}
            >
              <LanguageChipGroup
                value={field.value}
                onChange={field.onChange}
                disabled={isSubmitting}
              />
            </Field>
          )}
        />

        <Controller
          name="categoriesOfInterest"
          control={control}
          render={({ field }) => (
            <Field
              label="Categorías de interés"
              hint="Selecciona al menos 1"
              error={errors.categoriesOfInterest?.message}
            >
              <CategoryChipGroup
                value={field.value}
                onChange={field.onChange}
                disabled={isSubmitting}
              />
            </Field>
          )}
        />

        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <Field
              label="WhatsApp"
              optional
              hint="Para que las agencias te contacten"
              error={errors.phone?.message}
              htmlFor="onboarding-phone"
            >
              <PhoneInput
                id="onboarding-phone"
                value={field.value ?? ""}
                onChange={field.onChange}
                disabled={isSubmitting}
              />
            </Field>
          )}
        />
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          aria-busy={isSubmitting}
          className={cn(
            "inline-flex items-center gap-2 rounded-[12px] px-6 py-3.5",
            "text-[14.5px] font-semibold transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink",
            "focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
            isValid && !isSubmitting
              ? "bg-coral text-white hover:bg-coral-deep"
              : "bg-beige text-ink-muted cursor-not-allowed",
          )}
        >
          Guardar y explorar castings
          <ArrowRight size={14} strokeWidth={1.6} />
        </button>
        <button
          type="button"
          onClick={handleSkipForLater}
          disabled={isSubmitting}
          className="rounded-md px-3.5 py-3.5 text-[13.5px] font-medium text-ink-muted
                     transition-colors hover:text-ink disabled:opacity-50"
        >
          Completar después
        </button>
      </div>
    </form>
  );
}
