import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Chip, Panel } from "@/components/ui-kit";
import { POSTS, POST_CATEGORIES } from "@/lib/mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Triage Room — Academic Emergency Room" },
      {
        name: "description",
        content: "Anonymous posts from students mid-crisis: exam panic, study strategies, deadline survival.",
      },
      { property: "og:title", content: "The Triage Room" },
      { property: "og:description", content: "Anonymous student posts from the middle of the crisis." },
    ],
  }),
  component: Community,
});

function Community() {
  const [cat, setCat] = useState("All");
  const [reacted, setReacted] = useState<Record<string, boolean>>({});
  const posts = cat === "All" ? POSTS : POSTS.filter((p) => p.category === cat);

  return (
    <AppShell>
      <div className="animate-rise">
        <Chip tone="ai">
          <Users className="size-3" /> TRIAGE ROOM
        </Chip>
        <h1 className="mt-4 text-3xl font-bold sm:text-4xl">Everyone here is also behind</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Anonymous demo posts. No accounts, no names, no judgement.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {POST_CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              aria-pressed={cat === c}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                cat === c
                  ? "border-ai bg-ai/20 text-ai"
                  : "border-border bg-surface text-muted-foreground hover:text-foreground",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        {posts.length === 0 ? (
          <Panel className="mt-6 text-center text-muted-foreground">
            Nothing in this category yet — quiet is a good sign.
          </Panel>
        ) : (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {posts.map((p) => (
              <Panel key={p.id}>
                <div className="flex items-center justify-between gap-2">
                  <Chip>{p.category}</Chip>
                  <span className="text-xs text-muted-foreground">{p.time}</span>
                </div>
                <p className="mt-4 text-foreground/90">{p.body}</p>
                <div className="mt-4 flex gap-2">
                  {Object.entries(p.reactions).map(([emoji, count]) => {
                    const key = `${p.id}-${emoji}`;
                    const on = reacted[key];
                    return (
                      <button
                        key={emoji}
                        onClick={() => setReacted((r) => ({ ...r, [key]: !r[key] }))}
                        aria-pressed={!!on}
                        className={cn(
                          "rounded-full border px-3 py-1 text-xs font-semibold transition-colors",
                          on
                            ? "border-ai bg-ai/15 text-ai"
                            : "border-border bg-surface-2 text-muted-foreground hover:text-foreground",
                        )}
                      >
                        {emoji} {count + (on ? 1 : 0)}
                      </button>
                    );
                  })}
                </div>
              </Panel>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
