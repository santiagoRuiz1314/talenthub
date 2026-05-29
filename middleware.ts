import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "talenthub-session";

type Role = "talent" | "agency" | "admin";

type SessionShape = {
  userId?: string;
  role?: Role;
};

function readSession(req: NextRequest): SessionShape | null {
  const raw = req.cookies.get(COOKIE_NAME)?.value;
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as SessionShape;
    if (!parsed.userId || !parsed.role) return null;
    return parsed;
  } catch {
    return null;
  }
}

function redirectToLogin(req: NextRequest, expectedRole?: Role): NextResponse {
  const url = req.nextUrl.clone();
  url.pathname = "/login";
  url.search = "";
  if (expectedRole && expectedRole !== "admin") url.searchParams.set("role", expectedRole);
  url.searchParams.set("next", req.nextUrl.pathname);
  return NextResponse.redirect(url);
}

/**
 * Guard de rutas protegidas:
 *   - /profile, /applications → role=talent
 *   - /agency/** → role=agency
 *
 * No toca mocks (edge runtime). La capa de layouts hace la segunda barrera
 * (busca el `Talent`/`Agency` real con `getCurrentTalent` / `getCurrentAgency`).
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = readSession(req);

  const isTalentArea = pathname === "/profile" || pathname === "/applications";
  const isAgencyArea = pathname.startsWith("/agency");

  if (isTalentArea) {
    if (!session) return redirectToLogin(req, "talent");
    if (session.role !== "talent") return redirectToLogin(req, "talent");
  }

  if (isAgencyArea) {
    if (!session) return redirectToLogin(req, "agency");
    if (session.role !== "agency") return redirectToLogin(req, "agency");
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/applications", "/agency/:path*"],
};
