import type { Gender, Language } from "@/lib/types/shared";
import type {
  ExperienceItem,
  GalleryPhoto,
  PhysicalData,
  Portfolio,
  SocialLinks,
  Talent,
} from "@/lib/types/talent";

import { daysAgo, pad3, photoUrl, pick, yearsAgoDate } from "./_helpers";
import { TALENT_SEEDS, emailSlug } from "./_seeds";

// Constantes para los generadores deterministas
const FEMALE_MEASUREMENTS = [
  { bustCm: 86, waistCm: 64, hipsCm: 92 },
  { bustCm: 88, waistCm: 66, hipsCm: 94 },
  { bustCm: 84, waistCm: 62, hipsCm: 90 },
  { bustCm: 90, waistCm: 68, hipsCm: 96 },
  { bustCm: 87, waistCm: 65, hipsCm: 93 },
];

const EYE_COLORS = ["brown", "hazel", "green", "blue", "black"] as const;
const HAIR_COLORS = ["brown", "black", "blonde", "red"] as const;

const BRAND_PROJECTS: ReadonlyArray<{
  title: string;
  role: string;
  year: number;
}> = [
  { title: "Comercial Bavaria — campaña Águila Light", role: "Modelo principal", year: 2025 },
  { title: "Editorial Vogue Latam — moda sostenible", role: "Modelo editorial", year: 2024 },
  { title: "Pasarela Colombiamoda — denim editorial", role: "Modelo runway", year: 2025 },
  { title: "Comercial Bancolombia — banca digital", role: "Talento principal", year: 2024 },
  { title: "Spot televisivo Postobón — Hit Original", role: "Modelo principal", year: 2023 },
  { title: "Fashion film Leonisa — colección verano", role: "Modelo principal", year: 2025 },
  { title: "Campaña Grupo Éxito — temporada escolar", role: "Talento secundario", year: 2024 },
  { title: "Reels Crepes & Waffles — campaña helados", role: "Creador de contenido", year: 2025 },
  { title: "Comercial Avianca — vuelos LATAM", role: "Modelo principal", year: 2023 },
  { title: "Editorial Elle Colombia", role: "Modelo editorial", year: 2024 },
  { title: "Spot EPM — energía sostenible", role: "Talento secundario", year: 2024 },
  { title: "Pasarela BCapital — colección urbana", role: "Modelo runway", year: 2024 },
  { title: "Fashion film Studio F — esenciales", role: "Modelo principal", year: 2023 },
  { title: "Comercial Juan Valdez — campaña global", role: "Modelo principal", year: 2025 },
  { title: "Serie Caracol TV — papel recurrente", role: "Actor secundario", year: 2024 },
  { title: "Comercial Movistar — fútbol", role: "Talento secundario", year: 2023 },
  { title: "Editorial Harper's Bazaar Colombia", role: "Modelo editorial", year: 2025 },
  { title: "Cortometraje Idartes — 'El día siguiente'", role: "Protagonista", year: 2024 },
  { title: "Campaña Mario Hernández — accesorios", role: "Modelo principal", year: 2024 },
  { title: "Spot Falabella — temporada navidad", role: "Talento principal", year: 2024 },
  { title: "Pasarela Cali Exposhow — beachwear", role: "Modelo runway", year: 2025 },
  { title: "Fashion film Arturo Calle — masculino", role: "Modelo principal", year: 2024 },
  { title: "Reels Alpina — desayunos", role: "Creador de contenido", year: 2025 },
  { title: "Comercial Claro — 5G", role: "Modelo principal", year: 2024 },
];

const BIO_TEMPLATES_BY_CITY: Record<string, readonly string[]> = {
  bogota: [
    "Modelo y creadora de contenido en Bogotá. Foco en moda urbana y campañas de marca.",
    "Actor independiente con experiencia en comerciales y series para canales nacionales.",
    "Talento bogotano disponible para producciones publicitarias y editoriales.",
  ],
  medellin: [
    "Modelo paisa con experiencia en pasarela y editorial. Disponible para Colombiamoda y BCapital.",
    "Creador de contenido en Medellín. Trabajo con marcas de moda, lifestyle y consumo masivo.",
    "Talento de Medellín especializado en fashion film y campañas de moda femenina.",
  ],
  cali: [
    "Modelo caleño con base en el Valle. Experiencia en comerciales para mercado del Pacífico.",
    "Creador de contenido caleño. Enfoque en moda swimwear y resort.",
    "Talento del Valle con disponibilidad para cine, comercial y editorial.",
  ],
  barranquilla: [
    "Modelo costeño con experiencia en producciones audiovisuales del Caribe.",
    "Talento barranquillero disponible para campañas de marcas regionales y nacionales.",
  ],
  cartagena: [
    "Modelo cartagenero con experiencia en producciones con locaciones del Caribe.",
    "Creadora caribeña con experiencia en swimwear, lifestyle y editorial.",
  ],
  bucaramanga: [
    "Modelo santandereano con disponibilidad para campañas comerciales nacionales.",
    "Talento de Bucaramanga enfocado en publicidad y comercial regional.",
  ],
  pereira: [
    "Talento pereirano disponible para producciones audiovisuales y campañas regionales.",
  ],
  manizales: [
    "Modelo manizaleño con experiencia en comerciales y editoriales.",
  ],
  santa_marta: [
    "Talento samario con experiencia en producciones costeras del Caribe colombiano.",
  ],
  cucuta: [
    "Modelo cucuteño disponible para campañas regionales y nacionales.",
  ],
  ibague: [
    "Talento tolimense disponible para producciones audiovisuales y publicitarias.",
  ],
  pasto: [
    "Modelo nariñense con experiencia en producciones del sur del país.",
  ],
};

function buildLanguages(i: number): Language[] {
  const langs: Language[] = [{ code: "es", level: "native" }];
  if (i % 2 === 0) langs.push({ code: "en", level: i % 4 === 0 ? "advanced" : "intermediate" });
  if (i % 5 === 0) langs.push({ code: "pt", level: "basic" });
  if (i % 11 === 0) langs.push({ code: "fr", level: "intermediate" });
  if (i % 17 === 0) langs.push({ code: "it", level: "basic" });
  return langs;
}

function buildPhysicalData(
  i: number,
  seed: { gender: Gender; heightCm: number },
): PhysicalData {
  const eyeColor = pick(EYE_COLORS, i + 2);
  const hairColor = pick(HAIR_COLORS, i + 1);
  const shoeSizeEu = seed.gender === "female" ? 36 + (i % 6) : 41 + (i % 5);
  const physical: PhysicalData = {
    heightCm: seed.heightCm,
    shoeSizeEu,
    eyeColor,
    hairColor,
  };
  if (seed.gender === "female") {
    physical.measurements = pick(FEMALE_MEASUREMENTS, i);
  }
  return physical;
}

function buildExperience(i: number, talentIdx: string): ExperienceItem[] {
  const count = 1 + (i % 4); // 1..4 items
  return Array.from({ length: count }, (_, j) => {
    const project = pick(BRAND_PROJECTS, i * 3 + j);
    return {
      id: `exp_${talentIdx}_${j + 1}`,
      title: project.title,
      role: project.role,
      year: project.year - (j > 1 ? 1 : 0),
    };
  });
}

function buildGallery(i: number, talentIdx: string): GalleryPhoto[] {
  const count = 3 + (i % 3); // 3..5 photos
  return Array.from({ length: count }, (_, j) => ({
    id: `g_${talentIdx}_${j + 1}`,
    url: photoUrl(`t-${talentIdx}-${j + 1}`, 600, 800),
    alt: `Foto ${j + 1}`,
    order: j,
  }));
}

function buildPortfolio(
  i: number,
  talentIdx: string,
  slug: string,
): Portfolio | undefined {
  // ~33% sin portfolio aún (son perfiles que no terminaron onboarding paso PDF).
  if (i % 3 === 2) return undefined;
  const handle = slug.replace(/\./g, "_");
  return {
    id: `pf_${talentIdx}`,
    talentId: `t_${talentIdx}`,
    fileName: `${handle}_2026.pdf`,
    fileUrl: `https://storage.talenthub.co/portfolios/t_${talentIdx}/${handle}_2026.pdf`,
    uploadedAt: daysAgo(60 + ((i * 3) % 200)),
  };
}

function buildSocialLinks(i: number, slug: string): SocialLinks {
  const handle = slug.replace(/\./g, "");
  const links: SocialLinks = { instagram: handle };
  if (i % 2 === 0) links.tiktok = handle;
  if (i % 5 === 0) links.youtube = `https://youtube.com/@${handle}`;
  if (i % 7 === 0) links.website = `https://${handle}.co`;
  return links;
}

// Featured: t_001 — usuario de prueba (mockCurrentUserId = u_t_001)
const FEATURED: Talent = {
  id: "t_001",
  userId: "u_t_001",
  firstName: "Valentina",
  lastName: "Restrepo",
  birthDate: yearsAgoDate(24, -3, 5),
  gender: "female",
  city: "medellin",
  bio: "Modelo y creadora de contenido en Medellín, con 6 años de experiencia en pasarela, editorial y campañas de marca. Trilingüe (español, inglés, portugués). Disponible para producciones nacionales e internacionales.",
  languages: [
    { code: "es", level: "native" },
    { code: "en", level: "advanced" },
    { code: "pt", level: "intermediate" },
  ],
  physicalData: {
    heightCm: 175,
    measurements: { bustCm: 86, waistCm: 64, hipsCm: 92 },
    shoeSizeEu: 38,
    eyeColor: "brown",
    hairColor: "brown",
  },
  socialLinks: {
    instagram: "valenrestrepo",
    tiktok: "valenrestrepo",
    youtube: "https://youtube.com/@valenrestrepo",
    website: "https://valentinarestrepo.co",
  },
  experience: [
    {
      id: "exp_001_1",
      title: "Comercial Bavaria — campaña Águila Light verano",
      role: "Modelo principal",
      year: 2025,
      description:
        "Protagonista del spot de TV de 30 segundos para temporada de verano. Producción de Estudio Polígono.",
    },
    {
      id: "exp_001_2",
      title: "Editorial Vogue Latam — moda sostenible",
      role: "Modelo editorial",
      year: 2024,
      description: "Sesión de 8 looks para edición especial de moda sostenible latinoamericana.",
    },
    {
      id: "exp_001_3",
      title: "Pasarela Colombiamoda 2025 — denim editorial",
      role: "Modelo runway",
      year: 2025,
    },
    {
      id: "exp_001_4",
      title: "Spot Bancolombia — banca digital",
      role: "Talento principal",
      year: 2024,
    },
  ],
  gallery: [
    { id: "g_001_1", url: photoUrl("t-001-1", 600, 800), alt: "Foto editorial", order: 0 },
    { id: "g_001_2", url: photoUrl("t-001-2", 600, 800), alt: "Foto de pasarela", order: 1 },
    { id: "g_001_3", url: photoUrl("t-001-3", 600, 800), alt: "Foto comercial", order: 2 },
    { id: "g_001_4", url: photoUrl("t-001-4", 600, 800), alt: "Foto de campaña", order: 3 },
    { id: "g_001_5", url: photoUrl("t-001-5", 600, 800), alt: "Foto editorial", order: 4 },
  ],
  portfolio: {
    id: "pf_001",
    talentId: "t_001",
    fileName: "valentina_restrepo_2026.pdf",
    fileUrl: "https://storage.talenthub.co/portfolios/t_001/valentina_restrepo_2026.pdf",
    uploadedAt: daysAgo(45),
  },
  createdAt: daysAgo(216),
  updatedAt: daysAgo(7),
};

const generated: Talent[] = TALENT_SEEDS.slice(1).map((seed, j) => {
  const i = j + 1;
  const talentIdx = pad3(i + 1); // t_002, t_003, ...
  const slug = emailSlug(seed.firstName, seed.lastName);
  const cityBios = BIO_TEMPLATES_BY_CITY[seed.city] ?? [
    "Talento colombiano disponible para producciones nacionales.",
  ];
  const monthOffset = ((i * 7) % 12) - 6;
  const dayOffset = ((i * 11) % 28) - 14;
  return {
    id: `t_${talentIdx}`,
    userId: `u_t_${talentIdx}`,
    firstName: seed.firstName,
    lastName: seed.lastName,
    birthDate: yearsAgoDate(seed.age, monthOffset, dayOffset),
    gender: seed.gender,
    city: seed.city,
    bio: pick(cityBios, i),
    languages: buildLanguages(i),
    physicalData: buildPhysicalData(i, seed),
    socialLinks: buildSocialLinks(i, slug),
    experience: buildExperience(i, talentIdx),
    gallery: buildGallery(i, talentIdx),
    portfolio: buildPortfolio(i, talentIdx, slug),
    createdAt: daysAgo(220 - i * 4),
    updatedAt: daysAgo(((i * 7) % 80) + 1),
  };
});

export const mockTalents: Talent[] = [FEATURED, ...generated];
