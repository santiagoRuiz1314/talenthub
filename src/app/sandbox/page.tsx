"use client";

import {
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  ChevronDown,
  Clock,
  Inbox,
  MapPin,
  Search,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { Toaster, toast } from "sonner";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// ─────────────────────────────────────────────────────────────
// Photo placeholder — patrón omnipresente del diseño
// ─────────────────────────────────────────────────────────────
function PhotoPlaceholder({
  seed = 0,
  ratio = "3/4",
  label,
}: {
  seed?: number;
  ratio?: string;
  label?: string;
}) {
  const hues = [22, 18, 32, 8, 28, 14, 38, 24, 12, 42];
  const h = hues[seed % hues.length];
  return (
    <div
      className="relative w-full overflow-hidden rounded-lg"
      style={{
        aspectRatio: ratio,
        background: `linear-gradient(135deg, oklch(0.78 0.04 ${h}) 0%, oklch(0.86 0.03 ${h + 8}) 100%)`,
      }}
    >
      <div
        className="absolute inset-0 mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent 0 14px, rgba(255,255,255,0.18) 14px 15px)",
        }}
      />
      <div
        className="absolute -top-10 -right-10 h-[140px] w-[140px] rounded-full opacity-[0.32]"
        style={{ background: `oklch(0.62 0.09 ${h})` }}
      />
      <div className="absolute -bottom-8 -left-8 h-[90px] w-[90px] rotate-[18deg] rounded-[18px] bg-white/25" />
      {label && (
        <div className="absolute bottom-3 left-3 rounded bg-white/55 px-2 py-1 font-mono text-[10px] tracking-wider text-black/65 backdrop-blur-sm">
          {label}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Status badge — derivado del diseño (Mis Aplicaciones)
// ─────────────────────────────────────────────────────────────
type StatusKind = "review" | "viewed" | "preselected" | "closed";

function StatusBadge({ kind, label }: { kind: StatusKind; label: string }) {
  const tone: Record<StatusKind, string> = {
    review: "bg-beige-soft border-border text-ink-muted",
    viewed: "bg-info-bg border-info-border text-info",
    preselected: "bg-success-bg border-success-border text-success",
    closed: "bg-danger-bg border-danger-border text-danger",
  };
  const dot: Record<StatusKind, string> = {
    review: "bg-neutral-dot",
    viewed: "bg-info-dot",
    preselected: "bg-success-dot",
    closed: "bg-danger-dot",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${tone[kind]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot[kind]}`} />
      {label}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────
// State card — empty / error / loading / success
// ─────────────────────────────────────────────────────────────
type StateVariant = "empty" | "error" | "loading" | "success";

function StateCard({
  variant,
  title,
  body,
  cta,
}: {
  variant: StateVariant;
  title: string;
  body: string;
  cta?: string;
}) {
  const styles: Record<
    StateVariant,
    {
      border: string;
      chipBg: string;
      chipText: string;
      icon: React.ReactNode;
    }
  > = {
    empty: {
      border: "border-dashed border-border",
      chipBg: "bg-beige-soft",
      chipText: "text-coral",
      icon: <Inbox className="h-6 w-6" strokeWidth={1.5} />,
    },
    error: {
      border: "border border-danger-border",
      chipBg: "bg-danger-bg",
      chipText: "text-danger",
      icon: <AlertTriangle className="h-6 w-6" strokeWidth={1.5} />,
    },
    loading: {
      border: "border border-border",
      chipBg: "bg-beige-soft",
      chipText: "text-ink-muted",
      icon: null,
    },
    success: {
      border: "border border-success-border",
      chipBg: "bg-success-bg",
      chipText: "text-success",
      icon: <CheckCircle className="h-6 w-6" strokeWidth={1.5} />,
    },
  };
  const s = styles[variant];

  if (variant === "loading") {
    return (
      <div className={`rounded-2xl ${s.border} p-10`}>
        <div className="space-y-3">
          <div className="animate-th-shimmer from-beige-soft via-bg to-beige-soft h-5 w-1/3 rounded bg-gradient-to-r bg-[length:200%_100%]" />
          <div className="animate-th-shimmer from-beige-soft via-bg to-beige-soft h-4 w-2/3 rounded bg-gradient-to-r bg-[length:200%_100%]" />
          <div className="animate-th-shimmer from-beige-soft via-bg to-beige-soft h-4 w-1/2 rounded bg-gradient-to-r bg-[length:200%_100%]" />
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center gap-4 rounded-2xl ${s.border} p-10 text-center`}>
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-xl ${s.chipBg} ${s.chipText}`}
      >
        {s.icon}
      </div>
      <div>
        <h3 className="font-display text-xl font-medium tracking-tight">{title}</h3>
        <p className="text-ink-muted mt-1.5 max-w-md text-sm">{body}</p>
      </div>
      {cta && <Button>{cta}</Button>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Section wrapper
// ─────────────────────────────────────────────────────────────
function Section({
  title,
  kicker,
  children,
}: {
  title: string;
  kicker?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-border border-t py-10">
      {kicker && (
        <div className="text-ink-muted mb-1 text-[11px] font-medium tracking-[0.08em] uppercase">
          {kicker}
        </div>
      )}
      <h2 className="font-display mb-6 text-2xl font-medium tracking-tight">{title}</h2>
      {children}
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────
export default function SandboxPage() {
  const [collapsibleOpen, setCollapsibleOpen] = useState(false);

  const swatches = [
    { name: "bg", hex: "#FAFAF7", className: "bg-bg" },
    { name: "beige-soft", hex: "#F1EEE7", className: "bg-beige-soft" },
    { name: "beige", hex: "#E8E4DC", className: "bg-beige" },
    { name: "border", hex: "#E5E5E0", className: "bg-border" },
    { name: "ink-muted", hex: "#6B6B66", className: "bg-ink-muted text-bg" },
    { name: "ink", hex: "#0A0A0A", className: "bg-ink text-bg" },
    { name: "coral-soft", hex: "#FCE7E4", className: "bg-coral-soft" },
    { name: "coral", hex: "#E85A4F", className: "bg-coral text-white" },
    {
      name: "coral-deep",
      hex: "#D14A40",
      className: "bg-coral-deep text-white",
    },
  ];

  return (
    <TooltipProvider>
      <main className="mx-auto w-full max-w-5xl px-5 py-12 md:px-8 md:py-16">
        {/* Header */}
        <header className="mb-10">
          <div className="text-ink-muted mb-2 text-[11px] font-medium tracking-[0.08em] uppercase">
            Sandbox · Fase 1 · QA visual
          </div>
          <h1 className="font-display text-4xl leading-[1.05] font-medium tracking-[-0.03em] text-balance md:text-5xl">
            Sistema de diseño TalentHub
            <span className="text-coral">.</span>
          </h1>
          <p className="text-ink-muted mt-4 max-w-prose text-base leading-relaxed">
            Esta página renderiza los tokens de{" "}
            <code className="bg-beige-soft rounded px-1.5 py-0.5 font-mono text-[12.5px]">
              docs/design-system.md
            </code>{" "}
            y todas las primitivas de shadcn instaladas en Fase 1.
          </p>
        </header>

        {/* Paleta */}
        <Section title="Paleta" kicker="Color tokens (raw)">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {swatches.map((s) => (
              <div
                key={s.name}
                className={`border-border flex h-24 flex-col justify-end rounded-lg border p-2.5 ${s.className}`}
              >
                <span className="text-xs font-medium">{s.name}</span>
                <span className="font-mono text-[10px] opacity-70">{s.hex}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Paleta semántica */}
        <Section title="Paleta semántica" kicker="info / success / danger / neutral">
          <div className="flex flex-wrap gap-2">
            <StatusBadge kind="review" label="En revisión" />
            <StatusBadge kind="viewed" label="Vista por agencia" />
            <StatusBadge kind="preselected" label="Pre-seleccionado" />
            <StatusBadge kind="closed" label="Cerrada" />
          </div>
        </Section>

        {/* Tipografía */}
        <Section title="Tipografía" kicker="Inter Tight (display) + Inter (body)">
          <div className="space-y-5">
            <div>
              <div className="text-ink-muted mb-1 text-[11px] tracking-[0.08em] uppercase">
                Display XL — clamp(36, 5.4vw, 64)
              </div>
              <p className="font-display text-[clamp(36px,5.4vw,64px)] leading-[1.02] font-medium tracking-[-0.035em]">
                Encuentra tu próximo casting
                <span className="text-coral">.</span>
              </p>
            </div>
            <div>
              <div className="text-ink-muted mb-1 text-[11px] tracking-[0.08em] uppercase">
                H2 — 24px
              </div>
              <h2 className="font-display text-2xl font-medium tracking-[-0.025em]">
                Recomendados para ti
              </h2>
            </div>
            <div>
              <div className="text-ink-muted mb-1 text-[11px] tracking-[0.08em] uppercase">
                Body — 14px base · text-ink-muted
              </div>
              <p className="text-ink-muted text-sm leading-[1.55]">
                La plataforma donde modelos, actores y creadores encuentran trabajo — publicados por
                agencias y productoras verificadas en Colombia. Tabular nums:{" "}
                <span className="text-ink font-medium tabular-nums">1,234 · 47 aplicantes</span>.
              </p>
            </div>
          </div>
        </Section>

        {/* Buttons */}
        <Section title="Botones" kicker="shadcn Button + variantes TalentHub">
          <div className="flex flex-wrap items-center gap-3">
            <Button>Primary (Aplicar)</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="destructive">Destructive</Button>
            <Button disabled>Disabled</Button>
          </div>
          <Separator className="my-5" />
          <div className="flex flex-wrap items-center gap-3">
            <Button size="xs">XS</Button>
            <Button size="sm">SM</Button>
            <Button>Default</Button>
            <Button size="lg">LG</Button>
            <Button size="icon">
              <Search />
            </Button>
          </div>
        </Section>

        {/* Inputs / Form primitives */}
        <Section title="Inputs y forms" kicker="Input · Label · Textarea · Select · Toggle">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="tu@email.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">Ciudad</Label>
              <Select>
                <SelectTrigger id="city">
                  <SelectValue placeholder="Selecciona una ciudad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bog">Bogotá</SelectItem>
                  <SelectItem value="med">Medellín</SelectItem>
                  <SelectItem value="cal">Cali</SelectItem>
                  <SelectItem value="bar">Barranquilla</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="desc">Descripción</Label>
              <Textarea
                id="desc"
                placeholder="Describe el proyecto: qué buscas, contexto creativo, modalidad…"
                rows={4}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Categorías de interés</Label>
              <ToggleGroup type="multiple" variant="outline">
                <ToggleGroupItem value="tv">TV/comerciales</ToggleGroupItem>
                <ToggleGroupItem value="foto">Fotografía</ToggleGroupItem>
                <ToggleGroupItem value="pasarela">Pasarela</ToggleGroupItem>
                <ToggleGroupItem value="digital">Digital</ToggleGroupItem>
                <ToggleGroupItem value="cine">Cine</ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        </Section>

        {/* Cards & Badges */}
        <Section title="Cards y badges" kicker="Card · Badge · Avatar">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="font-display tracking-tight">Comercial nacional</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Avatar className="h-7 w-7">
                    <AvatarFallback className="text-[10px]">SB</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">Sancho BBDO</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">TV/comerciales</Badge>
                  <Badge>Bogotá</Badge>
                </div>
                <div className="text-ink-muted flex items-center gap-2 text-xs">
                  <Clock className="h-3 w-3" />
                  Cierra en 3 días
                </div>
              </CardContent>
            </Card>
            <PhotoPlaceholder seed={0} ratio="4/5" label="FOTO / 4:5" />
            <PhotoPlaceholder seed={4} ratio="4/5" label="DIGITAL / 4:5" />
          </div>
        </Section>

        {/* Photo placeholders — seeds 0..9 */}
        <Section
          title="Photo placeholder · 10 seeds"
          kicker="Patrón warm gradient + striped overlay"
        >
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 md:grid-cols-10">
            {Array.from({ length: 10 }).map((_, i) => (
              <PhotoPlaceholder key={i} seed={i} ratio="3/4" />
            ))}
          </div>
        </Section>

        {/* Overlays */}
        <Section title="Overlays" kicker="Dialog · Popover · DropdownMenu · Tooltip">
          <div className="flex flex-wrap items-center gap-3">
            <Dialog>
              <DialogTrigger render={<Button />}>Abrir Dialog</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="font-display tracking-tight">
                    Aplica en segundos<span className="text-coral">.</span>
                  </DialogTitle>
                  <DialogDescription>
                    Solo necesitas tu portafolio. Crea tu perfil y aplica al casting.
                  </DialogDescription>
                </DialogHeader>
                <Input placeholder="tu@email.com" type="email" />
                <Button className="w-full">Continuar con email</Button>
              </DialogContent>
            </Dialog>

            <Popover>
              <PopoverTrigger render={<Button variant="outline" />}>
                <MapPin className="size-4" /> Ciudad
                <ChevronDown className="size-3.5" />
              </PopoverTrigger>
              <PopoverContent className="w-56">
                <div className="text-ink-muted text-xs">Aquí va el contenido del popover.</div>
              </PopoverContent>
            </Popover>

            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="ghost" />}>
                Menú <ChevronDown className="size-3.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Mi perfil</DropdownMenuItem>
                <DropdownMenuItem>Mis aplicaciones</DropdownMenuItem>
                <DropdownMenuItem>Configuración</DropdownMenuItem>
                <DropdownMenuItem>Cerrar sesión</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Tooltip>
              <TooltipTrigger render={<Button variant="outline" />}>Hover me</TooltipTrigger>
              <TooltipContent>Tooltip de prueba</TooltipContent>
            </Tooltip>

            <Button
              variant="outline"
              onClick={() =>
                toast.success("Aplicación enviada", {
                  description: "La agencia recibirá tu portafolio.",
                })
              }
            >
              Toast (sonner)
            </Button>
          </div>
        </Section>

        {/* Tabs */}
        <Section title="Tabs" kicker="Tabs · TabsList · TabsTrigger">
          <Tabs defaultValue="all" className="w-full max-w-xl">
            <TabsList>
              <TabsTrigger value="all">Todas</TabsTrigger>
              <TabsTrigger value="review">En revisión</TabsTrigger>
              <TabsTrigger value="viewed">Vistas</TabsTrigger>
              <TabsTrigger value="preselected">Pre-seleccionadas</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="text-ink-muted pt-4 text-sm">
              Todas las aplicaciones aparecerán aquí.
            </TabsContent>
            <TabsContent value="review" className="text-ink-muted pt-4 text-sm">
              En revisión.
            </TabsContent>
            <TabsContent value="viewed" className="text-ink-muted pt-4 text-sm">
              Vistas.
            </TabsContent>
            <TabsContent value="preselected" className="text-ink-muted pt-4 text-sm">
              Pre-seleccionadas.
            </TabsContent>
          </Tabs>
        </Section>

        {/* Collapsible */}
        <Section title="Collapsible" kicker="Patrón 'Detalles opcionales' del form de publicar">
          <Collapsible
            open={collapsibleOpen}
            onOpenChange={setCollapsibleOpen}
            className="border-border bg-card max-w-xl rounded-xl border p-4"
          >
            <CollapsibleTrigger
              render={<Button variant="ghost" />}
              className="w-full justify-between"
            >
              Detalles opcionales
              <ChevronDown
                className={`size-4 transition-transform ${collapsibleOpen ? "rotate-180" : ""}`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="text-ink-muted pt-3 text-sm">
              Aquí irían los campos colapsables: ciudad, fechas, requisitos, pago.
            </CollapsibleContent>
          </Collapsible>
        </Section>

        {/* ScrollArea */}
        <Section title="ScrollArea" kicker="Scroll horizontal con scroll-snap (Recomendados)">
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex gap-3 pb-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="w-44 shrink-0">
                  <PhotoPlaceholder seed={i} ratio="3/4" label={`#${i + 1}`} />
                </div>
              ))}
            </div>
          </ScrollArea>
        </Section>

        {/* State cards */}
        <Section title="State cards" kicker="empty · loading · error · success">
          <div className="grid gap-4 md:grid-cols-2">
            <StateCard
              variant="empty"
              title="Aún no has aplicado a ningún casting"
              body="Cuando apliques, aparecerán aquí con su estado en tiempo real."
              cta="Explorar castings"
            />
            <StateCard variant="loading" title="" body="" />
            <StateCard
              variant="error"
              title="No pudimos cargar los castings"
              body="Reintenta en unos segundos. Si persiste, escríbenos."
              cta="Reintentar"
            />
            <StateCard
              variant="success"
              title="Aplicación enviada"
              body="La agencia recibirá tu portafolio y te contactará si encajas."
            />
          </div>
        </Section>

        {/* Animations preview */}
        <Section title="Animations" kicker="th-fade-up · th-pulse-soft · th-shimmer · th-orbit">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="border-border bg-card rounded-xl border p-5 text-center">
              <Sparkles
                className="animate-th-pulse-soft text-coral mx-auto size-8"
                strokeWidth={1.5}
              />
              <div className="text-ink-muted mt-3 text-xs">th-pulse-soft</div>
            </div>
            <div className="border-border bg-card rounded-xl border p-5 text-center">
              <ArrowRight
                className="animate-th-orbit text-coral mx-auto size-8"
                strokeWidth={1.5}
              />
              <div className="text-ink-muted mt-3 text-xs">th-orbit</div>
            </div>
            <div className="border-border bg-card rounded-xl border p-5 text-center">
              <div className="animate-th-shimmer from-beige-soft via-bg to-beige-soft mx-auto h-8 w-full rounded bg-gradient-to-r bg-[length:200%_100%]" />
              <div className="text-ink-muted mt-3 text-xs">th-shimmer</div>
            </div>
            <div className="border-border bg-card rounded-xl border p-5 text-center">
              <div className="animate-th-fade-up bg-coral mx-auto size-8 rounded-full" />
              <div className="text-ink-muted mt-3 text-xs">th-fade-up</div>
            </div>
          </div>
        </Section>

        {/* Shadows */}
        <Section title="Shadows" kicker="popover · modal · floating · coral-glow">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { name: "popover", className: "shadow-popover" },
              { name: "modal", className: "shadow-modal" },
              { name: "floating", className: "shadow-floating" },
              { name: "coral-glow", className: "shadow-coral-glow bg-coral text-white" },
            ].map((s) => (
              <div
                key={s.name}
                className={`bg-card text-ink-muted flex h-24 items-center justify-center rounded-xl text-xs ${s.className}`}
              >
                <span className={s.className.includes("coral") ? "text-white" : ""}>{s.name}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Footer */}
        <footer className="border-border text-ink-muted mt-12 border-t pt-6 text-xs">
          Sandbox de TalentHub · Sistema de diseño v1.1 ·{" "}
          <code className="font-mono">docs/design-system.md</code>
        </footer>
      </main>
      <Toaster />
    </TooltipProvider>
  );
}
