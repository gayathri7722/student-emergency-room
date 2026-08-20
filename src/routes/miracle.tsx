import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Zap } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Bar, Btn, Chip, Panel } from "@/components/ui-kit";
import { MIRACLE_STEPS } from "@/lib/mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/miracle")({
  head: () => ({
    meta: [
      { title: "15-Minute Miracle — Academic Emergency Room" },
      {
        name: "description",
        content: "Exactly 15 minutes? Here's a minute-by-minute breakdown that still moves the needle.",
      },
      { property: "og:title", content: "The 15-Minute Miracle" },
      { property: "og:description", content: "A minute-by-minute plan for when you only have 15 minutes." },
    ],
  }),
  component: Miracle,
});

const TOTAL = 15 * 60;

function Miracle() {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const i = setInterval(() => setElapsed((e) => (e >= TOTAL ? TOTAL : e + 1)), 1000);
    return () => clearInterval(i);
  }, [running]);

  const activeIdx = Math.min(MIRACLE_STEPS.length - 1, Math.floor(elapsed / 180));
  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl animate-rise">
        <Chip tone="warning">
          <Zap className="size-3" /> 15-MINUTE MIRACLE
        </Chip>
        <h1 className="mt-4 text-3xl font-bold sm:text-4xl">Fifteen minutes is not nothing.</h1>
        <p className="mt-2 text-muted-foreground">
          One concept, one example, one attempt. Follow the clock and don't improvise.
        </p>

        <Panel className="mt-7 text-center">
          <p className="font-display text-5xl font-bold tabular-nums">
            {mm}:{ss}
          </p>
          <Bar className="mt-4" value={(elapsed / TOTAL) * 100} tone="warning" />
          <div className="mt-5 flex justify-center gap-3">
            <Btn tone="warning" onClick={() => setRunning((r) => !r)}>
              {running ? "Pause" : "Start the 15"}
            </Btn>
            <Btn
              tone="outline"
              onClick={() => {
                setElapsed(0);
                setRunning(false);
              }}
            >
              Reset
            </Btn>
          </div>
        </Panel>

        <div className="mt-6 space-y-3">
          {MIRACLE_STEPS.map((s, i) => (
            <div
              key={s.time}
              className={cn(
                "rounded-2xl border p-4 transition-colors",
                running && i === activeIdx
                  ? "border-warning bg-warning/10"
                  : "border-border bg-surface",
              )}
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-warning">{s.time}</span>
                <span className="font-semibold">{s.title}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{s.detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/mission">
            <Btn>Need longer? Survival Mode</Btn>
          </Link>
          <Link to="/dashboard">
            <Btn tone="outline">Back to dashboard</Btn>
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
