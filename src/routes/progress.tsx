import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Flame, Lock, Sparkles } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Btn, Chip, Panel } from "@/components/ui-kit";
import { BADGES } from "@/lib/mock";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/progress")({
  head: () => ({
    meta: [
      { title: "Progress — Academic Emergency Room" },
      {
        name: "description",
        content: "XP, comeback streak, milestone badges and a post-mortem tool to measure your improvement.",
      },
      { property: "og:title", content: "Your comeback progress — AER" },
      { property: "og:description", content: "XP, streaks, badges and score improvement." },
    ],
  }),
  component: ProgressPage,
});

function ProgressPage() {
  const { xp, missionsDone } = useApp();
  const [oldScore, setOldScore] = useState("41");
  const [newScore, setNewScore] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const compute = () => {
    const a = Number(oldScore);
    const b = Number(newScore);
    if (Number.isNaN(a) || Number.isNaN(b) || newScore === "") return;
    setResult(b - a);
  };

  return (
    <AppShell>
      <div className="animate-rise">
        <Chip tone="success">PROGRESS</Chip>
        <h1 className="mt-4 text-3xl font-bold sm:text-4xl">The comeback, in numbers</h1>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Panel>
            <p className="text-xs font-bold uppercase text-muted-foreground">Total XP</p>
            <p className="mt-2 text-4xl font-bold">{xp.toLocaleString()}</p>
          </Panel>
          <Panel>
            <p className="text-xs font-bold uppercase text-muted-foreground">Comeback streak</p>
            <p className="mt-2 flex items-center gap-2 text-4xl font-bold text-warning">
              <Flame className="size-8" /> 7
            </p>
          </Panel>
          <Panel>
            <p className="text-xs font-bold uppercase text-muted-foreground">Missions completed</p>
            <p className="mt-2 text-4xl font-bold text-success">{missionsDone}</p>
          </Panel>
        </div>

        <h2 className="mt-10 text-lg font-bold">Milestone badges</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {BADGES.map((b) => (
            <Panel
              key={b.name}
              className={cn("text-center", !b.earned && "opacity-45 grayscale")}
            >
              <div className="text-3xl">{b.earned ? b.icon : <Lock className="mx-auto size-7" />}</div>
              <p className="mt-3 text-sm font-bold">{b.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">{b.desc}</p>
            </Panel>
          ))}
        </div>

        <h2 className="mt-10 text-lg font-bold">Post-mortem</h2>
        <Panel className="mt-4 max-w-xl">
          <p className="text-sm text-muted-foreground">
            Compare a past score with your latest one. Numbers beat vibes.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase text-muted-foreground">
                Previous score
              </span>
              <input
                value={oldScore}
                onChange={(e) => setOldScore(e.target.value)}
                inputMode="numeric"
                className="w-full rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm outline-none focus:border-success"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase text-muted-foreground">
                New score
              </span>
              <input
                value={newScore}
                onChange={(e) => setNewScore(e.target.value)}
                inputMode="numeric"
                placeholder="e.g. 68"
                className="w-full rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm outline-none focus:border-success"
              />
            </label>
          </div>
          <Btn tone="success" className="mt-4" onClick={compute} disabled={newScore === ""}>
            <Sparkles className="size-4" /> Calculate improvement
          </Btn>

          {result === null ? (
            <p className="mt-4 text-xs text-muted-foreground">
              Enter both scores to see the difference.
            </p>
          ) : (
            <div className="mt-4 rounded-2xl border border-success/40 bg-success/10 p-4">
              <p className="text-2xl font-bold text-success">
                {result > 0 ? `+${result}` : result} points
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {result > 15
                  ? "That's a full-on comeback. Whatever you changed, keep doing it."
                  : result > 0
                    ? "Up is up. Small climbs compound faster than you think."
                    : result === 0
                      ? "Flat this time — but you showed up. Change one variable next round."
                      : "Rough round. One bad score is data, not a verdict. Run a new triage."}
              </p>
            </div>
          )}
        </Panel>
      </div>
    </AppShell>
  );
}
