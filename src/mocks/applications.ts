import type { Application, ApplicationStatus } from "@/lib/types/application";

import { daysAgo, pad3 } from "./_helpers";

/** Castings en draft no aceptan aplicaciones — se excluyen del generador. */
const DRAFT_CASTING_IDS = new Set(["c_014", "c_019", "c_022", "c_027"]);

/** Aplicaciones del current user (`t_001`) — cubren los 4 estados para QA visual. */
const featured: Application[] = [
  {
    id: "app_t001_c002",
    castingId: "c_002",
    talentId: "t_001",
    status: "pre_selected",
    message:
      "Tengo experiencia editorial reciente en Vogue Latam y disponibilidad full-time esa semana.",
    createdAt: daysAgo(5),
    updatedAt: daysAgo(2),
    statusUpdatedAt: daysAgo(2),
  },
  {
    id: "app_t001_c001",
    castingId: "c_001",
    talentId: "t_001",
    status: "viewed",
    message: "Disponible para casting presencial y rodaje. Trilingüe.",
    createdAt: daysAgo(6),
    updatedAt: daysAgo(4),
    statusUpdatedAt: daysAgo(4),
  },
  {
    id: "app_t001_c003",
    castingId: "c_003",
    talentId: "t_001",
    status: "viewed",
    createdAt: daysAgo(8),
    updatedAt: daysAgo(5),
    statusUpdatedAt: daysAgo(5),
  },
  {
    id: "app_t001_c005",
    castingId: "c_005",
    talentId: "t_001",
    status: "pending",
    message: "Experiencia previa con Leonisa en colección 2024.",
    createdAt: daysAgo(4),
    updatedAt: daysAgo(4),
  },
  {
    id: "app_t001_c012",
    castingId: "c_012",
    talentId: "t_001",
    status: "pending",
    createdAt: daysAgo(1),
    updatedAt: daysAgo(1),
  },
  {
    id: "app_t001_c016",
    castingId: "c_016",
    talentId: "t_001",
    status: "pending",
    message: "Disponible para ensayo y show de pasarela.",
    createdAt: daysAgo(2),
    updatedAt: daysAgo(2),
  },
  {
    id: "app_t001_c032",
    castingId: "c_032",
    talentId: "t_001",
    status: "rejected",
    createdAt: daysAgo(12),
    updatedAt: daysAgo(7),
    statusUpdatedAt: daysAgo(7),
  },
];

const STATUSES: readonly ApplicationStatus[] = [
  "pending",
  "viewed",
  "pre_selected",
  "rejected",
] as const;

const TOTAL_CASTINGS = 34;

const messageVariants: readonly string[] = [
  "Disponible para el rodaje. Adjunto portafolio actualizado.",
  "Tengo experiencia previa con la marca, encantada de aplicar.",
  "Cuento con disponibilidad full para las fechas indicadas.",
  "Vivo en la ciudad del casting, sin necesidad de viáticos.",
  "Me encantaría ser parte. Mi portafolio refleja el tono buscado.",
];

const seen = new Set<string>(featured.map((a) => `${a.talentId}|${a.castingId}`));

const generated: Application[] = [];

// Genera 1–3 aplicaciones por talent (t_002..t_050) evitando duplicados y drafts.
for (let i = 1; i < 50; i++) {
  const talentIdx = pad3(i + 1);
  const talentId = `t_${talentIdx}`;
  const numApps = 1 + (i % 3); // 1..3
  for (let j = 0; j < numApps; j++) {
    let castingNum = ((i * 7 + j * 11) % TOTAL_CASTINGS) + 1;
    let castingId = `c_${pad3(castingNum)}`;
    let attempts = 0;
    while (
      (DRAFT_CASTING_IDS.has(castingId) || seen.has(`${talentId}|${castingId}`)) &&
      attempts < TOTAL_CASTINGS
    ) {
      castingNum = (castingNum % TOTAL_CASTINGS) + 1;
      castingId = `c_${pad3(castingNum)}`;
      attempts++;
    }
    if (attempts >= TOTAL_CASTINGS) continue;
    seen.add(`${talentId}|${castingId}`);

    const status = STATUSES[(i + j) % STATUSES.length];
    const createdDaysAgo = 1 + ((i * 3 + j * 7) % 30);
    const updatedDaysAgo = Math.max(0, createdDaysAgo - 2);
    const statusChangedDaysAgo = Math.max(0, createdDaysAgo - 1);
    const message =
      (i + j) % 2 === 0 ? messageVariants[(i + j) % messageVariants.length] : undefined;

    generated.push({
      id: `app_${talentIdx}_${j + 1}`,
      castingId,
      talentId,
      status,
      message,
      createdAt: daysAgo(createdDaysAgo),
      updatedAt: daysAgo(updatedDaysAgo),
      statusUpdatedAt: status !== "pending" ? daysAgo(statusChangedDaysAgo) : undefined,
    });
  }
}

export const mockApplications: Application[] = [...featured, ...generated];
