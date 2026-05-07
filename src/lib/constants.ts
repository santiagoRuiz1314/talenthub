import type {
  AgencyType,
  AgencyVerificationStatus,
  ApplicationStatus,
  CastingCategory,
  CastingStatus,
  City,
  ExperienceLevel,
  Gender,
  GenderRequirement,
  LanguageCode,
  LanguageLevel,
} from "@/lib/types";

/** Las 12 ciudades de V1 con su nombre legible en español-CO. */
export const CITY_LABELS: Record<City, string> = {
  bogota: "Bogotá",
  medellin: "Medellín",
  cali: "Cali",
  barranquilla: "Barranquilla",
  cartagena: "Cartagena",
  bucaramanga: "Bucaramanga",
  pereira: "Pereira",
  manizales: "Manizales",
  santa_marta: "Santa Marta",
  cucuta: "Cúcuta",
  ibague: "Ibagué",
  pasto: "Pasto",
};

export const CASTING_CATEGORY_LABELS: Record<CastingCategory, string> = {
  commercial: "Comercial",
  editorial: "Editorial",
  runway: "Pasarela",
  audiovisual: "Audiovisual",
  digital_content: "Contenido digital",
};

export const CASTING_STATUS_LABELS: Record<CastingStatus, string> = {
  draft: "Borrador",
  active: "Activo",
  closed: "Cerrado",
};

export const APPLICATION_STATUS_LABELS: Record<ApplicationStatus, string> = {
  pending: "En revisión",
  viewed: "Vista por agencia",
  pre_selected: "Pre-seleccionado",
  rejected: "Descartado",
};

export const GENDER_LABELS: Record<Gender, string> = {
  female: "Femenino",
  male: "Masculino",
  non_binary: "No binario",
  other: "Otro",
};

export const GENDER_REQUIREMENT_LABELS: Record<GenderRequirement, string> = {
  female: "Femenino",
  male: "Masculino",
  non_binary: "No binario",
  other: "Otro",
  any: "Cualquiera",
};

export const EXPERIENCE_LEVEL_LABELS: Record<ExperienceLevel, string> = {
  none: "Sin experiencia",
  some: "Con experiencia",
  professional: "Profesional",
};

export const AGENCY_TYPE_LABELS: Record<AgencyType, string> = {
  production: "Productora",
  fashion_house: "Casa de moda",
  advertising: "Agencia de publicidad",
  brand: "Marca",
  other: "Otro",
};

export const AGENCY_VERIFICATION_STATUS_LABELS: Record<
  AgencyVerificationStatus,
  string
> = {
  pending: "Pendiente",
  verified: "Verificada",
  rejected: "Rechazada",
};

export const LANGUAGE_LEVEL_LABELS: Record<LanguageLevel, string> = {
  basic: "Básico",
  intermediate: "Intermedio",
  advanced: "Avanzado",
  native: "Nativo",
};

export const LANGUAGE_CODE_LABELS: Record<LanguageCode, string> = {
  es: "Español",
  en: "Inglés",
  pt: "Portugués",
  fr: "Francés",
  it: "Italiano",
  de: "Alemán",
};

export const CASTING_DETAIL_COPY = {
  // Header / urgencia
  urgentLabel: "Cierra pronto",
  // Meta grid
  metaCity: "Ciudad",
  shootDateLabel: "Fecha de shoot",
  metaDeadlineLabel: "Cierra aplicación",
  // Info de agencia
  publishedOn: "Publicado el",
  publishedRecently: "Publicado recientemente",
  // Fecha fallback
  shootDateTbd: "Por confirmar",
  // Acción guardar
  save: "Guardar",
  saveCastingAriaLabel: "Guardar casting",
  // Flujo de aplicación
  deadlinePrefix: "Cierra",
  applyNow: "Aplicar a este casting",
  applyShort: "Aplicar",
  applied: "Aplicado",
  applicationSent: "Aplicación enviada",
  // Bloque CTA
  ctaHeading: "¿Te encaja este casting?",
  ctaBody: "Aplica gratis y la agencia recibirá tu portafolio.",
  // Títulos y kickers de sección
  descriptionTitle: "Descripción",
  descriptionKicker: "Sobre el proyecto",
  requirementsTitle: "Requisitos",
  requirementsKicker: "Perfil buscado",
  additionalInfoTitle: "Información adicional",
  additionalInfoKicker: "Detalles",
  similaresTitle: "Castings similares",
  similaresKicker: "También te pueden interesar",
  // Labels de requisitos
  reqAge: "Edad",
  reqGender: "Género",
  reqHeight: "Altura",
  reqLanguages: "Idiomas",
  reqFeatures: "Características",
  reqExperience: "Experiencia",
  // Labels de info adicional
  additionalLocation: "Lugar",
  additionalModality: "Modalidad",
  additionalModalityValue: "Presencial",
} as const;
