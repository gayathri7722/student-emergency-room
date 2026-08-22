import { useState } from "react";
import { X, LifeBuoy, ArrowLeft } from "lucide-react";
import { useApp } from "@/lib/store";
import { EXPLAIN_STYLES, STUCK_REASONS } from "@/lib/mock";
import { useEnsurePlan } from "@/lib/use-plan";
import { Btn, Chip } from "./ui-kit";
import { cn } from "@/lib/utils";

export function StuckButton() {
  const { setStuckOpen } = useApp();
  return (
    <button
      onClick={() => setStuckOpen(true)}
      aria-label="I'm stuck — get help"
      className="fixed bottom-24 right-4 z-40 inline-flex items-center gap-2 rounded-full bg-ai px-4 py-3 text-sm font-bold text-ai-foreground shadow-lg shadow-ai/25 transition-transform hover:scale-105 md:bottom-6 md:right-6"
    >
      <LifeBuoy className="size-4" />
      I'm Stuck
    </button>
  );
}

export function StuckDrawer() {
  const { stuckOpen, setStuckOpen } = useApp();
  const { plan } = useEnsurePlan();
  const styles = plan?.explanations?.length ? plan.explanations : EXPLAIN_STYLES;
  const [reason, setReason] = useState<string | null>(null);
  const [styleIdx, setStyleIdx] = useState(0);

  if (!stuckOpen) return null;
  const active = styles[Math.min(styleIdx, styles.length - 1)]!;

  const close = () => {
    setStuckOpen(false);
    setReason(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-background/80 p-0 backdrop-blur-sm sm:items-center sm:p-6">
      <div className="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-border bg-surface p-6 sm:rounded-3xl">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <Chip tone="ai">
              <LifeBuoy className="size-3" /> RESCUE MODE
            </Chip>
            <h2 className="mt-3 text-2xl font-bold">
              {reason ? "Pick how you want it explained" : "Where exactly are you stuck?"}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {reason
                ? `Same concept, ${styles.length} ways. Topic: ${plan?.missionFocus ?? "your current focus"}.`
                : "Be specific. Vague panic gets vague help."}
            </p>
          </div>
          <button
            onClick={close}
            aria-label="Close"
            className="rounded-lg p-2 text-muted-foreground hover:bg-surface-2 hover:text-foreground"
          >
            <X className="size-5" />
          </button>
        </div>

        {!reason ? (
          <div className="grid gap-3">
            {STUCK_REASONS.map((r) => (
              <button
                key={r}
                onClick={() => setReason(r)}
                className="rounded-xl border border-border bg-surface-2 px-4 py-4 text-left text-sm font-medium transition-colors hover:border-ai/60 hover:bg-ai/10"
              >
                {r}
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <button
              onClick={() => setReason(null)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-3.5" /> {reason}
            </button>
            <div className="flex flex-wrap gap-2">
              {styles.map((s, i) => (
                <button
                  key={s.label + i}
                  onClick={() => setStyleIdx(i)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                    styleIdx === i
                      ? "border-ai bg-ai/20 text-ai"
                      : "border-border bg-surface-2 text-muted-foreground hover:text-foreground",
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <div className="rounded-2xl border border-ai/30 bg-ai/5 p-5 text-sm leading-relaxed text-foreground/90">
              {active.text}
            </div>
            <p className="text-xs text-muted-foreground">
              Explanations generated for your subject. Double-check anything you'll write in an exam.
            </p>
            <Btn tone="ai" className="w-full" onClick={close}>
              Got it, back to work
            </Btn>
          </div>
        )}
      </div>
    </div>
  );
}
