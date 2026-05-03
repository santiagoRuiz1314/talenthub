import type { Agency } from "@/lib/types/agency";

import { daysAgo, photoUrl } from "./_helpers";

/**
 * 9 agencias hand-crafted con mix de tipos y verificación.
 * Owners viven en `users.ts` con ids `u_a_001`..`u_a_009`.
 */
export const mockAgencies: Agency[] = [
  {
    id: "a_001",
    ownerUserId: "u_a_001",
    name: "Estudio Polígono",
    type: "production",
    city: "bogota",
    website: "https://estudiopoligono.co",
    logoUrl: photoUrl("logo-poligono", 200, 200),
    description:
      "Productora boutique de comerciales y contenido audiovisual para marcas regionales. 12 años en el mercado bogotano, oficinas en Chapinero.",
    verificationStatus: "verified",
    createdAt: daysAgo(420),
    updatedAt: daysAgo(35),
  },
  {
    id: "a_002",
    ownerUserId: "u_a_002",
    name: "Casa Reverso",
    type: "fashion_house",
    city: "medellin",
    website: "https://casareverso.co",
    logoUrl: photoUrl("logo-reverso", 200, 200),
    description:
      "Casa de moda independiente con foco en pasarela y editorial. Co-organizadora de Colombiamoda desde 2020.",
    verificationStatus: "verified",
    createdAt: daysAgo(380),
    updatedAt: daysAgo(22),
  },
  {
    id: "a_003",
    ownerUserId: "u_a_003",
    name: "Atelier Sur",
    type: "fashion_house",
    city: "cali",
    website: "https://ateliersur.co",
    logoUrl: photoUrl("logo-ateliersur", 200, 200),
    description:
      "Atelier especializado en swimwear y resort. Producción de campañas para marcas del Pacífico colombiano y Caribe.",
    verificationStatus: "verified",
    createdAt: daysAgo(310),
    updatedAt: daysAgo(48),
  },
  {
    id: "a_004",
    ownerUserId: "u_a_004",
    name: "Brújula BBDO",
    type: "advertising",
    city: "bogota",
    website: "https://brujulabbdo.com",
    logoUrl: photoUrl("logo-brujula", 200, 200),
    description:
      "Agencia de publicidad con clientes de banca, telecomunicaciones y consumo masivo. Contrata talento para comerciales nacionales y regionales.",
    verificationStatus: "verified",
    createdAt: daysAgo(540),
    updatedAt: daysAgo(12),
  },
  {
    id: "a_005",
    ownerUserId: "u_a_005",
    name: "Manglar Films",
    type: "production",
    city: "cartagena",
    website: "https://manglarfilms.co",
    logoUrl: photoUrl("logo-manglar", 200, 200),
    description:
      "Productora costera especializada en cine y series con locaciones del Caribe. Coproducciones con plataformas streaming.",
    verificationStatus: "verified",
    createdAt: daysAgo(290),
    updatedAt: daysAgo(60),
  },
  {
    id: "a_006",
    ownerUserId: "u_a_006",
    name: "Norte Producciones",
    type: "production",
    city: "barranquilla",
    website: "https://norteproducciones.co",
    logoUrl: photoUrl("logo-norte", 200, 200),
    description:
      "Productora con base en Barranquilla. Comerciales, fashion film y contenido publicitario para mercado costeño y nacional.",
    verificationStatus: "verified",
    createdAt: daysAgo(220),
    updatedAt: daysAgo(18),
  },
  {
    id: "a_007",
    ownerUserId: "u_a_007",
    name: "Salvia Studios",
    type: "advertising",
    city: "medellin",
    website: "https://salviastudios.co",
    logoUrl: photoUrl("logo-salvia", 200, 200),
    description:
      "Estudio creativo enfocado en marcas de bienestar, moda sostenible y nuevas categorías de consumo.",
    verificationStatus: "pending",
    createdAt: daysAgo(45),
    updatedAt: daysAgo(5),
  },
  {
    id: "a_008",
    ownerUserId: "u_a_008",
    name: "Bahía Casting",
    type: "other",
    city: "santa_marta",
    description:
      "Casting independiente con talento del Caribe colombiano. Foco en producciones audiovisuales con escenarios naturales.",
    verificationStatus: "pending",
    createdAt: daysAgo(28),
    updatedAt: daysAgo(2),
  },
  {
    id: "a_009",
    ownerUserId: "u_a_009",
    name: "Loop & Co",
    type: "brand",
    city: "bogota",
    website: "https://loopandco.co",
    description:
      "Marca de moda urbana. Su solicitud de verificación fue rechazada por documentación incompleta — pendiente de re-envío.",
    verificationStatus: "rejected",
    createdAt: daysAgo(95),
    updatedAt: daysAgo(70),
  },
];
