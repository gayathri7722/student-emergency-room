import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Copy, Mail, X } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Bar, Btn, Chip, Panel } from "@/components/ui-kit";
import { DEADLINES } from "@/lib/mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/damage-control")({
  head: () => ({
    meta: [
      { title: "Damage Control — Academic Emergency Room" },
      {
        name: "description",
        content:
          "See every deadline at once with effort, priority and a clear verdict: do it first, squeeze it in, or ask for an extension.",
      },
      { property: "og:title", content: "Damage Control — AER" },
      { property: "og:description", content: "All your deadlines, ranked, with one honest verdict each." },
    ],
  }),
  component: DamageControl,
});

const toneFor = (p: "high" | "medium" | "low") =>
  p === "high" ? "primary" : p === "medium" ? "warning" : "success";

function DamageControl() {
  const [modal, setModal] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const task = DEADLINES.find((d) => d.task === modal);
  const message = task
    ? `Dear Professor,\n\nI'm writing about the ${task.task}, due ${task.deadline.toLowerCase()}. I've been managing several overlapping deadlines this week and, while I've made progress, I don't want to submit work below the standard I'm capable of.\n\nWould it be possible to have a short extension of 48 hours? I'm happy to share my current draft or progress so far so you can see this isn't a late start.\n\nThank you for considering it.\n\nBest regards,\nMaya`
    : "";

  return (
    <AppShell>
      <div className="animate-rise">
        <Chip tone="warning">DAMAGE CONTROL</Chip>
        <h1 className="mt-4 text-3xl font-bold sm:text-4xl">Everything at once, ranked honestly</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          You cannot do all of this well. That's fine — here's what to protect and what to negotiate.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {DEADLINES.map((d) => {
            const tone = toneFor(d.priority);
            return (
              <Panel
                key={d.id}
                className={cn(
                  "border-l-4",
                  tone === "primary"
                    ? "border-l-primary"
                    : tone === "warning"
                      ? "border-l-warning"
                      : "border-l-success",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-bold">{d.task}</h2>
                    <p className="text-sm text-muted-foreground">
                      {d.deadline} · {d.effort} of work
                    </p>
                  </div>
                  <Chip tone={tone}>{d.priority.toUpperCase()}</Chip>
                </div>
                <div className="mt-4">
                  <p className="mb-1.5 text-xs text-muted-foreground">Urgency vs. time available</p>
                  <Bar
                    value={d.priority === "high" ? 90 : d.priority === "medium" ? 55 : 25}
                    tone={tone}
                  />
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <span
                    className={cn(
                      "text-sm font-bold",
                      tone === "primary"
                        ? "text-primary"
                        : tone === "warning"
                          ? "text-warning"
                          : "text-success",
                    )}
                  >
                    {d.rec}
                  </span>
                  {d.rec === "Ask for an extension" && (
                    <Btn tone="outline" size="sm" onClick={() => setModal(d.task)}>
                      <Mail className="size-4" /> Write the email
                    </Btn>
                  )}
                </div>
              </Panel>
            );
          })}
        </div>
      </div>

      {task && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-border bg-surface p-6">
            <div className="flex items-start justify-between">
              <h2 className="text-xl font-bold">Extension request</h2>
              <button
                onClick={() => {
                  setModal(null);
                  setCopied(false);
                }}
                aria-label="Close"
                className="rounded-lg p-2 text-muted-foreground hover:bg-surface-2 hover:text-foreground"
              >
                <X className="size-5" />
              </button>
            </div>
            <pre className="mt-4 max-h-72 overflow-y-auto whitespace-pre-wrap rounded-2xl border border-border bg-surface-2 p-4 font-sans text-sm text-foreground/90">
              {message}
            </pre>
            <Btn
              className="mt-4 w-full"
              onClick={() => {
                navigator.clipboard?.writeText(message);
                setCopied(true);
              }}
            >
              <Copy className="size-4" /> {copied ? "Copied to clipboard" : "Copy message"}
            </Btn>
          </div>
        </div>
      )}
    </AppShell>
  );
}
