import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, ArrowRight, Clock, Gauge, Layers, TrendingDown } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Bar, Btn, Chip, Panel, StatusDot } from "@/components/ui-kit";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/diagnosis")({
  head: () => ({
    meta: [
      { title: "Diagnosis — Academic Emergency Room" },
      {
        name: "description",
        content: "Severity, workload, time deficit and recovery probability for your academic emergency.",
      },
      { property: "og:title", content: "Your AER diagnosis" },
      { property: "og:description", content: "Severity, workload and recovery probability estimates." },
    ],
  }),
  component: Diagnosis,
});

const MESSAGES = [
  "Reading your panic...",
  "Cross-referencing past papers...",
  "Ranking topics by mark value...",
  "Calculating time deficit...",
  "Building your recovery plan...",
];

function Diagnosis() {
  const { assessment } = useApp();
  const { plan, planStatus, planError, retry } = useEnsurePlan();
  const [minDone, setMinDone] = useState(false);
  const [msg, setMsg] = useState(0);

  useEffect(() => {
    const i = setInterval(() => setMsg((m) => (m + 1) % MESSAGES.length), 900);
    const t = setTimeout(() => setMinDone(true), 2400);
    return () => {
      clearInterval(i);
      clearTimeout(t);
    };
  }, []);

  const severity = Math.min(96, 100 - assessment.progress + assessment.situations.length * 4);
  const workload = Math.max(4, Number(assessment.hours) || 6) + 4;
  const available = Math.max(2, Number(assessment.hours) || 6);
  const deficit = Math.max(0, workload - available);
  const recovery = Math.max(28, 92 - severity / 2 - deficit * 3);
  const mustCount = plan?.topics.filter((t) => t.tier === "must").length ?? 0;

  const loading = !minDone || planStatus === "loading" || planStatus === "idle";

  if (loading) {
    return (
      <AppShell>
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
          <div className="grid size-20 place-items-center rounded-full border border-primary/40 bg-primary/10">
            <Activity className="size-8 animate-pulse text-primary" />
          </div>
          <h1 className="mt-8 text-2xl font-bold">Running triage</h1>
          <p className="mt-2 h-6 text-muted-foreground transition-all">{MESSAGES[msg]}</p>
          <div className="mt-6 w-64">
            <Bar value={(msg + 1) * 20} />
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="animate-rise">
        <Chip tone="primary">
          <StatusDot /> DIAGNOSIS COMPLETE
        </Chip>
        <h1 className="mt-4 text-3xl font-bold sm:text-4xl">
          {plan?.headline ?? `${assessment.subject}: severe, but survivable`}
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          {assessment.examName} · {assessment.deadline}.{" "}
          {plan?.summary ?? "You're behind, not beyond saving. Here's the honest read."}
        </p>

        {planStatus === "error" && (
          <Panel className="mt-6 border-warning/40 bg-warning/10">
            <p className="text-sm font-semibold text-warning">{planError}</p>
            <Btn className="mt-3" tone="outline" onClick={() => void retry()}>
              Try again
            </Btn>
          </Panel>
        )}



        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/plan">
            <Btn size="lg">
              See my recovery plan <ArrowRight className="size-5" />
            </Btn>
          </Link>
          <Link to="/emergency">
            <Btn tone="outline" size="lg">
              Redo assessment
            </Btn>
          </Link>
        </div>
      </div>
    </AppShell>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  tone: string;
}) {
  return (
    <Panel>
      <Icon className={`size-5 ${tone}`} />
      <p className="mt-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 text-xl font-bold">{value}</p>
    </Panel>
  );
}
