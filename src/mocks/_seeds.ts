import type { City, Gender } from "@/lib/types/shared";

/**
 * Datos base de los 50 talentos. Cada entrada genera 1 User (`u_t_${pad3}`)
 * y 1 Talent (`t_${pad3}`). Mantener orden estable para no romper aplicaciones.
 */
export type TalentSeed = {
  firstName: string;
  lastName: string;
  gender: Gender;
  city: City;
  /** Edad para derivar `birthDate` con `yearsAgoDate(age, ...)`. */
  age: number;
  heightCm: number;
};

export const TALENT_SEEDS: readonly TalentSeed[] = [
  {
    firstName: "Valentina",
    lastName: "Restrepo",
    gender: "female",
    city: "medellin",
    age: 24,
    heightCm: 175,
  },
  {
    firstName: "Santiago",
    lastName: "Vargas",
    gender: "male",
    city: "bogota",
    age: 28,
    heightCm: 184,
  },
  {
    firstName: "Camila",
    lastName: "Ospina",
    gender: "female",
    city: "cali",
    age: 22,
    heightCm: 172,
  },
  {
    firstName: "Mateo",
    lastName: "Gutiérrez",
    gender: "male",
    city: "bogota",
    age: 30,
    heightCm: 182,
  },
  {
    firstName: "Isabella",
    lastName: "Sánchez",
    gender: "female",
    city: "cartagena",
    age: 26,
    heightCm: 170,
  },
  {
    firstName: "Sebastián",
    lastName: "Pardo",
    gender: "male",
    city: "medellin",
    age: 25,
    heightCm: 180,
  },
  {
    firstName: "Daniela",
    lastName: "Suárez",
    gender: "female",
    city: "bogota",
    age: 23,
    heightCm: 174,
  },
  {
    firstName: "Andrés",
    lastName: "Mejía",
    gender: "male",
    city: "bucaramanga",
    age: 32,
    heightCm: 178,
  },
  {
    firstName: "Sofía",
    lastName: "Quintero",
    gender: "female",
    city: "barranquilla",
    age: 27,
    heightCm: 173,
  },
  {
    firstName: "Daniel",
    lastName: "Forero",
    gender: "male",
    city: "bogota",
    age: 29,
    heightCm: 185,
  },
  {
    firstName: "Mariana",
    lastName: "Rojas",
    gender: "female",
    city: "pereira",
    age: 21,
    heightCm: 168,
  },
  {
    firstName: "Juan David",
    lastName: "Acosta",
    gender: "male",
    city: "cali",
    age: 26,
    heightCm: 181,
  },
  {
    firstName: "Laura",
    lastName: "Rincón",
    gender: "female",
    city: "medellin",
    age: 30,
    heightCm: 177,
  },
  {
    firstName: "Tomás",
    lastName: "Cárdenas",
    gender: "male",
    city: "manizales",
    age: 24,
    heightCm: 179,
  },
  {
    firstName: "Catalina",
    lastName: "Ruiz",
    gender: "female",
    city: "bogota",
    age: 28,
    heightCm: 175,
  },
  {
    firstName: "Nicolás",
    lastName: "Beltrán",
    gender: "male",
    city: "ibague",
    age: 31,
    heightCm: 183,
  },
  {
    firstName: "Andrea",
    lastName: "Cortés",
    gender: "female",
    city: "santa_marta",
    age: 25,
    heightCm: 171,
  },
  {
    firstName: "Samuel",
    lastName: "Pinzón",
    gender: "male",
    city: "bogota",
    age: 33,
    heightCm: 187,
  },
  {
    firstName: "Paula",
    lastName: "Vélez",
    gender: "female",
    city: "medellin",
    age: 22,
    heightCm: 169,
  },
  { firstName: "Diego", lastName: "Gómez", gender: "male", city: "cucuta", age: 27, heightCm: 180 },
  {
    firstName: "Juliana",
    lastName: "Salazar",
    gender: "female",
    city: "bogota",
    age: 26,
    heightCm: 174,
  },
  {
    firstName: "Miguel Ángel",
    lastName: "Cruz",
    gender: "male",
    city: "cali",
    age: 29,
    heightCm: 184,
  },
  {
    firstName: "Natalia",
    lastName: "Cardona",
    gender: "female",
    city: "manizales",
    age: 24,
    heightCm: 172,
  },
  {
    firstName: "Felipe",
    lastName: "Mora",
    gender: "male",
    city: "medellin",
    age: 35,
    heightCm: 181,
  },
  {
    firstName: "Carolina",
    lastName: "Guerrero",
    gender: "female",
    city: "pasto",
    age: 30,
    heightCm: 173,
  },
  {
    firstName: "Camilo",
    lastName: "Hernández",
    gender: "male",
    city: "bogota",
    age: 28,
    heightCm: 182,
  },
  {
    firstName: "Manuela",
    lastName: "Estupiñán",
    gender: "female",
    city: "cartagena",
    age: 23,
    heightCm: 170,
  },
  {
    firstName: "Esteban",
    lastName: "Ramírez",
    gender: "male",
    city: "barranquilla",
    age: 26,
    heightCm: 178,
  },
  {
    firstName: "Ana María",
    lastName: "Bedoya",
    gender: "female",
    city: "bogota",
    age: 32,
    heightCm: 176,
  },
  {
    firstName: "Joaquín",
    lastName: "Solano",
    gender: "male",
    city: "bogota",
    age: 31,
    heightCm: 185,
  },
  {
    firstName: "Luisa",
    lastName: "Rendón",
    gender: "female",
    city: "medellin",
    age: 29,
    heightCm: 174,
  },
  {
    firstName: "Emiliano",
    lastName: "Toro",
    gender: "male",
    city: "bucaramanga",
    age: 27,
    heightCm: 180,
  },
  { firstName: "Sara", lastName: "Ochoa", gender: "female", city: "cali", age: 21, heightCm: 167 },
  {
    firstName: "Alejandro",
    lastName: "Bohórquez",
    gender: "male",
    city: "bogota",
    age: 34,
    heightCm: 183,
  },
  {
    firstName: "Gabriela",
    lastName: "Mendoza",
    gender: "female",
    city: "medellin",
    age: 25,
    heightCm: 175,
  },
  {
    firstName: "Simón",
    lastName: "Castro",
    gender: "male",
    city: "manizales",
    age: 28,
    heightCm: 179,
  },
  {
    firstName: "Sasha",
    lastName: "Caicedo",
    gender: "non_binary",
    city: "bogota",
    age: 26,
    heightCm: 173,
  },
  {
    firstName: "Pablo",
    lastName: "Jaramillo",
    gender: "male",
    city: "pereira",
    age: 30,
    heightCm: 184,
  },
  {
    firstName: "Camila",
    lastName: "Lozano",
    gender: "female",
    city: "ibague",
    age: 24,
    heightCm: 171,
  },
  {
    firstName: "Andrés Felipe",
    lastName: "Niño",
    gender: "male",
    city: "bogota",
    age: 29,
    heightCm: 186,
  },
  {
    firstName: "María José",
    lastName: "Acuña",
    gender: "female",
    city: "cali",
    age: 23,
    heightCm: 172,
  },
  {
    firstName: "Sebastián",
    lastName: "Rivas",
    gender: "male",
    city: "santa_marta",
    age: 31,
    heightCm: 181,
  },
  {
    firstName: "Daniela",
    lastName: "Macías",
    gender: "female",
    city: "cucuta",
    age: 27,
    heightCm: 173,
  },
  {
    firstName: "Mateo",
    lastName: "Borrero",
    gender: "male",
    city: "medellin",
    age: 26,
    heightCm: 182,
  },
  {
    firstName: "Sofía",
    lastName: "Ariza",
    gender: "female",
    city: "pasto",
    age: 22,
    heightCm: 169,
  },
  {
    firstName: "Río",
    lastName: "Henao",
    gender: "non_binary",
    city: "medellin",
    age: 28,
    heightCm: 176,
  },
  {
    firstName: "Tomás",
    lastName: "Echeverri",
    gender: "male",
    city: "bogota",
    age: 33,
    heightCm: 188,
  },
  {
    firstName: "Valeria",
    lastName: "Patiño",
    gender: "female",
    city: "cartagena",
    age: 25,
    heightCm: 170,
  },
  {
    firstName: "Joaquín",
    lastName: "Sandoval",
    gender: "male",
    city: "cali",
    age: 27,
    heightCm: 180,
  },
  {
    firstName: "Natalia",
    lastName: "Buitrago",
    gender: "female",
    city: "bogota",
    age: 30,
    heightCm: 174,
  },
];

/** Owners de las 9 agencias (en el orden de `mockAgencies`). */
export type AgencyOwnerSeed = {
  firstName: string;
  lastName: string;
};

export const AGENCY_OWNER_SEEDS: readonly AgencyOwnerSeed[] = [
  { firstName: "Santiago", lastName: "Buitrago" }, // a_001 Estudio Polígono
  { firstName: "Mariana", lastName: "Restrepo" }, // a_002 Casa Reverso
  { firstName: "Verónica", lastName: "Ortiz" }, // a_003 Atelier Sur
  { firstName: "Tomás", lastName: "Aguilar" }, // a_004 Brújula BBDO
  { firstName: "Camilo", lastName: "Linero" }, // a_005 Manglar Films
  { firstName: "Andrea", lastName: "Polo" }, // a_006 Norte Producciones
  { firstName: "Felipe", lastName: "Naranjo" }, // a_007 Salvia Studios
  { firstName: "Luna", lastName: "Caicedo" }, // a_008 Bahía Casting
  { firstName: "Diego", lastName: "Quiroga" }, // a_009 Loop & Co
];

/** Dominios de email por agencia (alineado con `mockAgencies[i]`). */
export const AGENCY_EMAIL_DOMAINS: readonly string[] = [
  "estudiopoligono.co",
  "casareverso.co",
  "ateliersur.co",
  "brujulabbdo.com",
  "manglarfilms.co",
  "norteproducciones.co",
  "salviastudios.co",
  "bahiacasting.co",
  "loopandco.co",
];

/** Slugify para emails — quita acentos y normaliza a `nombre.apellido`. */
export function emailSlug(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, ".")
    .replace(/^\.|\.$/g, "");
}
