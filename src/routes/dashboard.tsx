import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Brain,
  Clock,
  Flame,
  FileUp,
  HeartPulse,
  LifeBuoy,
  Siren,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Bar, Btn, Chip, Panel, StatusDot } from "@/components/ui-kit";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Academic Emergency Room" },
      {
        name: "description",
        content: "Your active academic emergencies, vitals and quick recovery actions in one place.",
      },
      { property: "og:title", content: "AER Dashboard" },
      { property: "og:description", content: "Active emergencies, academic vitals and quick actions." },
    ],
  }),
  component: Dashboard,
});

const VITALS = [
  { label: "Academic Health", value: 46, tone: "primary" as const },
  { label: "Knowledge", value: 58, tone: "warning" as const },
  { label: "Focus", value: 72, tone: "ai" as const },
  { label: "Recovery Progress", value: 38, tone: "success" as const },
];

function Dashboard() {
  const { name, emergencies, setStuckOpen, missionsDone } = useApp();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <AppShell>
      <div className="animate-rise">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold sm:text-4xl">
              {greeting}, {name}
            </h1>
            <p className="mt-1 text-muted-foreground">
              You have {emergencies.length} active emergencies. One of them is loud.
            </p>
          </div>
          <Chip tone="primary">
            <StatusDot /> CONDITION: CRITICAL
          </Chip>
        </div>

        <div className="mt-6 flex items-center gap-3 rounded-2xl border border-warning/30 bg-warning/10 px-4 py-3">
          <Flame className="size-5 shrink-0 text-warning" />
          <p className="text-sm">
            <span className="font-bold text-warning">7-day comeback streak.</span>{" "}
            <span className="text-muted-foreground">
              {missionsDone} missions completed. Don't break it tonight.
            </span>
          </p>
        </div>

        <h2 className="mt-10 text-lg font-bold">Active emergencies</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {emergencies.map((e) => (
            <Panel key={e.id}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold">{e.subject}</h3>
                  <p className="text-sm text-muted-foreground">{e.title}</p>
                </div>
                <Chip
                  tone={e.severity === "critical" ? "primary" : e.severity === "high" ? "warning" : "success"}
                >
                  {e.severity.toUpperCase()}
                </Chip>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="size-4" /> {e.timeLeft} left
              </div>
              <div className="mt-3">
                <div className="mb-1.5 flex justify-between text-xs text-muted-foreground">
                  <span>Recovery</span>
                  <span className="font-semibold text-foreground">{e.recovery}%</span>
                </div>
                <Bar
                  value={e.recovery}
                  tone={e.recovery > 55 ? "success" : e.recovery > 30 ? "warning" : "primary"}
                />
              </div>
              <Link to="/plan" className="mt-4 block">
                <Btn tone="outline" size="sm" className="w-full">
                  Open recovery plan
                </Btn>
              </Link>
            </Panel>
          ))}
        </div>

        <h2 className="mt-10 text-lg font-bold">Quick actions</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <QuickAction to="/emergency" icon={Siren} label="New Emergency" tone="primary" />
          <QuickAction to="/miracle" icon={Zap} label="15-Min Mission" tone="warning" />
          <button
            onClick={() => setStuckOpen(true)}
            className="card-surface flex flex-col items-start gap-3 p-4 text-left transition-colors hover:bg-surface-2"
          >
            <LifeBuoy className="size-5 text-ai" />
            <span className="text-sm font-semibold">Explain Something</span>
          </button>
          <QuickAction to="/emergency" icon={FileUp} label="Upload Syllabus" tone="ai" />
          <QuickAction to="/damage-control" icon={Target} label="Damage Control" tone="success" />
          <QuickAction to="/progress" icon={TrendingUp} label="My Progress" tone="success" />
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          <Panel className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <HeartPulse className="size-5 text-primary" />
              <h2 className="text-lg font-bold">Academic vitals</h2>
            </div>
            <div className="mt-5 space-y-4">
              {VITALS.map((v) => (
                <div key={v.label}>
                  <div className="mb-1.5 flex justify-between text-sm">
                    <span className="text-muted-foreground">{v.label}</span>
                    <span className="font-semibold">{v.value}%</span>
                  </div>
                  <Bar value={v.value} tone={v.tone} />
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Demo estimates based on your assessment answers, not medical or academic advice.
            </p>
          </Panel>

          <Panel className="flex flex-col justify-between">
            <div>
              <Brain className="size-5 text-ai" />
              <h2 className="mt-3 text-lg font-bold">Next best move</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Phase 1 — Stabilize. 30 minutes. Just get the Must Know list into your head.
              </p>
            </div>
            <Link to="/mission" className="mt-6 block">
              <Btn className="w-full">Start Survival Mode</Btn>
            </Link>
          </Panel>
        </div>
      </div>
    </AppShell>
  );
}

function QuickAction({
  to,
  icon: Icon,
  label,
  tone,
}: {
  to: string;
  icon: React.ElementType;
  label: string;
  tone: "primary" | "warning" | "ai" | "success";
}) {
  const color = {
    primary: "text-primary",
    warning: "text-warning",
    ai: "text-ai",
    success: "text-success",
  }[tone];
  return (
    <Link
      to={to}
      className="card-surface flex flex-col items-start gap-3 p-4 transition-colors hover:bg-surface-2"
    >
      <Icon className={`size-5 ${color}`} />
      <span className="text-sm font-semibold">{label}</span>
    </Link>
  );
}
