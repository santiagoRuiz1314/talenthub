import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ListFilter, Share2 } from "lucide-react";

import { ApplicantCard } from "@/components/agency/applicant-card";
import { FilterPill } from "@/components/agency/filter-pill";
import { SummarySidebar, type SummaryCounts } from "@/components/agency/summary-sidebar";
import { StateCard } from "@/components/shared/state-card";
import {
  CASTING_CATEGORY_LABELS,
  CITY_LABELS,
} from "@/lib/constants";
import { getApplicationsByCasting } from "@/lib/data/applications";
import { getCasting } from "@/lib/data/castings";
import type { ApplicationStatus } from "@/lib/types/application";
import type { City, Gender } from "@/lib/types/shared";
import { computeAge, parseCastingIdParam } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const casting = await getCasting(id);
  if (!casting) return { title: "Aplicantes — TalentHub" };
  return { title: `${casting.title} · Aplicantes — TalentHub` };
}

type SearchParams = Record<string, string | string[] | undefined>;

type Filters = {
  city: City | "";
  gender: Gender | "";
  age: "" | "18-24" | "25-34" | "35";
};

function parseString<T extends string>(value: SearchParams[string], allowed: readonly T[]): T | "" {
  const v = Array.isArray(value) ? value[0] : value;
  return v && (allowed as readonly string[]).includes(v) ? (v as T) : "";
}

const CITY_VALUES: City[] = [
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
const GENDER_VALUES: Gender[] = ["female", "male", "non_binary", "other"];
const AGE_VALUES = ["18-24", "25-34", "35"] as const;

const GENDER_LABELS_LOCAL: Record<Gender, string> = {
  female: "Femenino",
  male: "Masculino",
  non_binary: "No binario",
  other: "Otro",
};

const AGE_LABELS: Record<(typeof AGE_VALUES)[number], string> = {
  "18-24": "18–24",
  "25-34": "25–34",
  "35": "35+",
};

function inAgeRange(age: number, bucket: (typeof AGE_VALUES)[number]): boolean {
  if (bucket === "18-24") return age >= 18 && age <= 24;
  if (bucket === "25-34") return age >= 25 && age <= 34;
  return age >= 35;
}

export default async function ApplicantsPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const [{ id: rawId }, sp] = await Promise.all([params, searchParams]);
  const castingId = parseCastingIdParam(rawId);
  if (!castingId) notFound();

  const [casting, applications] = await Promise.all([
    getCasting(castingId),
    getApplicationsByCasting(castingId),
  ]);
  if (!casting) notFound();

  const filters: Filters = {
    city: parseString<City>(sp.city, CITY_VALUES),
    gender: parseString<Gender>(sp.gender, GENDER_VALUES),
    age: parseString(sp.age, AGE_VALUES) as Filters["age"],
  };

  const filtered = applications.filter((a) => {
    if (filters.city && a.talent.city !== filters.city) return false;
    if (filters.gender && a.talent.gender !== filters.gender) return false;
    if (filters.age && !inAgeRange(computeAge(a.talent.birthDate), filters.age)) return false;
    return true;
  });

  const counts: SummaryCounts = {
    total: applications.length,
    byStatus: {
      pending: applications.filter((a) => a.status === "pending").length,
      viewed: applications.filter((a) => a.status === "viewed").length,
      pre_selected: applications.filter((a) => a.status === "pre_selected").length,
      rejected: applications.filter((a) => a.status === "rejected").length,
    } as Record<ApplicationStatus, number>,
  };

  const basePath = `/agency/castings/${castingId}/applicants`;
  const buildHref = (key: keyof Filters, newValue: string) => {
    const params = new URLSearchParams();
    if (key !== "city" && filters.city) params.set("city", filters.city);
    if (key !== "gender" && filters.gender) params.set("gender", filters.gender);
    if (key !== "age" && filters.age) params.set("age", filters.age);
    if (newValue) params.set(key, newValue);
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  const daysToDeadline = Math.ceil(
    (new Date(casting.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
  );
  const closingToday = casting.status === "active" && daysToDeadline === 0;
  const closesSoon = casting.status === "active" && daysToDeadline > 0 && daysToDeadline <= 2;

  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className="mb-3.5 flex items-center gap-2 text-[12.5px] text-ink-muted"
      >
        <Link href="/agency/dashboard" className="text-ink-muted hover:text-ink">
          Mis castings
        </Link>
        <span aria-hidden className="opacity-50">
          /
        </span>
        <span className="font-medium text-ink">Aplicantes</span>
      </nav>

      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Link
            href="/agency/dashboard"
            className="mb-2 inline-flex items-center gap-1.5 text-[11.5px] font-medium uppercase tracking-[0.08em] text-ink-muted transition-colors hover:text-ink"
          >
            <ArrowLeft size={11} strokeWidth={1.6} aria-hidden />
            Volver al casting
          </Link>
          <h1 className="font-display m-0 max-w-[26ch] text-balance text-[clamp(28px,3.4vw,38px)] font-medium leading-[1.1] tracking-[-0.03em] text-ink">
            {casting.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-3.5 gap-y-1.5 text-[13.5px] text-ink-muted">
            <span className="inline-flex items-center gap-1.5">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-coral" />
              <strong className="font-semibold text-ink tabular-nums">
                {applications.length}
              </strong>{" "}
              aplicante{applications.length === 1 ? "" : "s"}
            </span>
            {(closingToday || closesSoon) && (
              <>
                <span aria-hidden className="h-[2px] w-[2px] rounded-full bg-ink-muted opacity-50" />
                <span className="font-semibold text-coral-deep">
                  {closingToday
                    ? "Cierra hoy"
                    : `Cierra en ${daysToDeadline} día${daysToDeadline === 1 ? "" : "s"}`}
                </span>
              </>
            )}
            <span aria-hidden className="h-[2px] w-[2px] rounded-full bg-ink-muted opacity-50" />
            <span>
              {CITY_LABELS[casting.city]} · {CASTING_CATEGORY_LABELS[casting.category]}
            </span>
          </div>
        </div>

        <div className="flex gap-1.5">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-[10px] border border-border bg-transparent px-3.5 py-2 text-[13px] font-medium text-ink transition-colors hover:bg-beige-soft"
          >
            <ListFilter size={13} strokeWidth={1.5} aria-hidden />
            Exportar
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-[10px] bg-ink px-3.5 py-2 text-[13px] font-medium text-bg transition-colors hover:bg-ink/90"
          >
            <Share2 size={13} strokeWidth={1.5} aria-hidden />
            Compartir shortlist
          </button>
        </div>
      </div>

      <div className="grid gap-8 2xl:grid-cols-[1fr_280px]">
        <div>
          <div className="mb-4 flex flex-wrap items-center gap-2 border-b border-border pb-4">
            <FilterPill
              label="Ciudad"
              value={filters.city}
              defaultLabel="Todas"
              defaultHref={buildHref("city", "")}
              options={CITY_VALUES.map((c) => ({
                value: c,
                label: CITY_LABELS[c],
                href: buildHref("city", c),
              }))}
            />
            <FilterPill
              label="Edad"
              value={filters.age}
              defaultLabel="Todas las edades"
              defaultHref={buildHref("age", "")}
              options={AGE_VALUES.map((a) => ({
                value: a,
                label: AGE_LABELS[a],
                href: buildHref("age", a),
              }))}
            />
            <FilterPill
              label="Género"
              value={filters.gender}
              defaultLabel="Todos"
              defaultHref={buildHref("gender", "")}
              options={GENDER_VALUES.map((g) => ({
                value: g,
                label: GENDER_LABELS_LOCAL[g],
                href: buildHref("gender", g),
              }))}
            />
          </div>

          {filtered.length === 0 ? (
            applications.length === 0 ? (
              <StateCard
                variant="empty"
                title="Aún no hay aplicantes"
                body="Cuando los talentos apliquen aparecerán aquí. Puedes invitar a perfiles desde el feed."
              />
            ) : (
              <StateCard
                variant="empty"
                title="No hay aplicantes con estos filtros"
                body="Probá cambiando o limpiando los filtros para ver más perfiles."
                cta={
                  <Link
                    href={`/agency/castings/${castingId}/applicants`}
                    className="inline-flex items-center gap-1.5 rounded-[10px] border border-border bg-bg px-4 py-2.5 text-[13.5px] font-medium text-ink transition-colors hover:bg-beige-soft"
                  >
                    Limpiar filtros
                  </Link>
                }
              />
            )
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((app) => (
                <ApplicantCard key={app.id} application={app} />
              ))}
            </div>
          )}
        </div>

        <div className="hidden 2xl:block">
          <SummarySidebar
            counts={counts}
            showClosingToday={closingToday || closesSoon}
            aiSuggestion={{
              matchingCount: Math.min(counts.byStatus.pending, 12),
              href: "#",
            }}
          />
        </div>
      </div>
    </>
  );
}
