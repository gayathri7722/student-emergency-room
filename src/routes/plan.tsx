import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Btn, Chip, Panel } from "@/components/ui-kit";
import { PHASES, TIER_META, TOPICS, type Tier } from "@/lib/mock";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/plan")({
  head: () => ({
    meta: [
      { title: "Recovery Plan — Academic Emergency Room" },
      {
        name: "description",
        content:
          "A five-phase recovery plan plus a Don't Study Everything topic triage: must know, should know, ignore.",
      },
      { property: "og:title", content: "Your five-phase recovery plan" },
      { property: "og:description", content: "Stabilize, Priority Surgery, Practice, Simulation, Final Check." },
    ],
  }),
  component: PlanPage,
});

const TIERS: Tier[] = ["must", "should", "maybe", "ignore"];

function PlanPage() {
  const { assessment } = useApp();
  return (
    <AppShell>
      <div className="animate-rise">
        <Chip tone="success">RECOVERY PLAN</Chip>
        <h1 className="mt-4 text-3xl font-bold sm:text-4xl">
          {assessment.subject} — five phases, no filler
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Work top to bottom. If you run out of time, everything after your current phase was
          optional anyway.
        </p>

        <div className="mt-8 space-y-4">
          {PHASES.map((p, i) => (
            <Panel key={p.name}>
              <div className="flex flex-wrap items-center gap-3">
                <span className="grid size-9 place-items-center rounded-xl bg-surface-2 font-display font-bold">
                  {i + 1}
                </span>
                <h2 className="text-xl font-bold">{p.name}</h2>
                <Chip
                  tone={
                    p.color === "primary"
                      ? "primary"
                      : p.color === "warning"
                        ? "warning"
                        : p.color === "ai"
                          ? "ai"
                          : "success"
                  }
                >
                  {p.duration}
                </Chip>
              </div>
              <ul className="mt-4 space-y-2">
                {p.items.map((it) => (
                  <li key={it} className="flex gap-3 text-sm">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                    <span className="text-foreground/85">{it}</span>
                  </li>
                ))}
              </ul>
            </Panel>
          ))}
        </div>

        <h2 className="mt-12 text-2xl font-bold">Don't Study Everything</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Nine topics, sorted by what actually earns marks in the time you have.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {TIERS.map((tier) => (
            <Panel key={tier} className={cn("border", TIER_META[tier].klass)}>
              <div className="flex items-center gap-2">
                <span className={cn("size-2.5 rounded-full", TIER_META[tier].dot)} />
                <h3 className="font-bold">{TIER_META[tier].label}</h3>
              </div>
              <ul className="mt-4 space-y-3">
                {TOPICS.filter((t) => t.tier === tier).map((t) => (
                  <li key={t.name}>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.why}</p>
                  </li>
                ))}
              </ul>
            </Panel>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link to="/mission">
            <Btn size="lg">
              Start First Mission <ArrowRight className="size-5" />
            </Btn>
          </Link>
          <Link to="/miracle">
            <Btn tone="outline" size="lg">
              Only have 15 minutes?
            </Btn>
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
