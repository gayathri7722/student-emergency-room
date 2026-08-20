import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  Clock,
  Flame,
  HeartPulse,
  ListChecks,
  Stethoscope,
  Timer,
} from "lucide-react";
import { Bar, Btn, Chip, Panel, Section, StatusDot } from "@/components/ui-kit";
import { DEADLINES, MIRACLE_STEPS } from "@/lib/mock";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Academic Emergency Room — Recovery plans for behind students" },
      {
        name: "description",
        content:
          "Behind on an exam, assignment or deadline? AER triages your academic crisis and gives you a realistic, prioritized recovery plan in minutes.",
      },
      { property: "og:title", content: "Academic Emergency Room — You're not finished" },
      {
        property: "og:description",
        content:
          "Describe your academic crisis, get a prioritized recovery plan instead of generic study-harder advice.",
      },
    ],
  }),
  component: Landing,
});

const STEPS = [
  { name: "Assess", desc: "Tell us what's actually on fire.", icon: Stethoscope },
  { name: "Triage", desc: "We rank what matters and what doesn't.", icon: ListChecks },
  { name: "Recover", desc: "Timed missions, not vague advice.", icon: Timer },
  { name: "Come Back", desc: "Track the climb out of the hole.", icon: HeartPulse },
];

const TESTIMONIALS = [
  {
    quote: "I had 11 hours and no notes. The Must Know list was 4 topics. I passed with a 71.",
    name: "Priya R. (fictional)",
    detail: "2nd year, Engineering",
  },
  {
    quote: "The 15-Minute Miracle is the only reason I opened my laptop that week.",
    name: "Dan K. (fictional)",
    detail: "1st year, Economics",
  },
  {
    quote: "Damage Control told me to ask for an extension. It wrote the email. It worked.",
    name: "Sofia M. (fictional)",
    detail: "3rd year, Law",
  },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <span className="font-display text-lg font-bold">
            <span className="text-primary">AER</span> Academic ER
          </span>
          <Link to="/dashboard">
            <Btn tone="outline" size="sm">
              Open demo
            </Btn>
          </Link>
        </div>
      </header>

      <Section className="pt-14 text-center">
        <div className="animate-rise">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
            <StatusDot />
            System status: academic crisis detected
          </div>
          <h1 className="mx-auto max-w-4xl text-5xl font-bold leading-[0.95] sm:text-7xl">
            YOU'RE COOKED.
            <br />
            <span className="text-gradient-emergency">But we're not dead yet.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            AER triages your exam, assignment or deadline disaster and hands you a realistic,
            prioritized recovery plan — what to study, in what order, in the time you actually have.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/emergency">
              <Btn size="lg" className="w-full sm:w-auto">
                <Flame className="size-5" /> Enter Emergency Mode
              </Btn>
            </Link>
            <Link to="/dashboard">
              <Btn tone="outline" size="lg" className="w-full sm:w-auto">
                I'm Actually Doing Fine
              </Btn>
            </Link>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Demo mode · no sign-up, no uploads, everything pre-filled
          </p>
        </div>
      </Section>

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          <Panel>
            <Chip tone="primary">THE PROBLEM</Chip>
            <h2 className="mt-4 text-2xl font-bold">
              Students don't fail because they're lazy. They fail because they don't know what to do
              next.
            </h2>
            <p className="mt-3 text-muted-foreground">
              When you're three weeks behind, "just study" is useless. Everything looks equally
              urgent, so you freeze, scroll, and lose another night.
            </p>
          </Panel>
          <Panel className="bg-surface-2/40">
            <Chip>WHAT AER DOES INSTEAD</Chip>
            <ul className="mt-4 space-y-3 text-sm">
              {[
                "Ranks topics into Must Know / Should Know / Ignore",
                "Fits the plan into the hours you actually have left",
                "Breaks it into timed missions you can start right now",
                "Tells you when to stop and ask for an extension",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
                  <span className="text-foreground/85">{t}</span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </Section>

      <Section>
        <h2 className="text-center text-3xl font-bold">How it works</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Panel key={s.name}>
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-xl bg-primary/15 text-primary">
                  <s.icon className="size-5" />
                </div>
                <span className="text-xs font-bold text-muted-foreground">STEP {i + 1}</span>
              </div>
              <h3 className="mt-4 text-lg font-bold">{s.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
            </Panel>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          <Panel>
            <Chip tone="warning">
              <Clock className="size-3" /> 15-MINUTE MIRACLE
            </Chip>
            <h3 className="mt-4 text-2xl font-bold">Got 15 minutes? That's enough for something.</h3>
            <div className="mt-5 space-y-2">
              {MIRACLE_STEPS.slice(0, 3).map((s) => (
                <div
                  key={s.time}
                  className="flex items-center gap-3 rounded-xl border border-border bg-surface-2 px-3 py-2.5 text-sm"
                >
                  <span className="font-mono text-xs text-warning">{s.time}</span>
                  <span className="text-foreground/85">{s.title}</span>
                </div>
              ))}
            </div>
            <Link to="/miracle" className="mt-5 inline-block">
              <Btn tone="warning" size="sm">
                See the full 15 minutes <ArrowRight className="size-4" />
              </Btn>
            </Link>
          </Panel>

          <Panel>
            <Chip tone="success">
              <Activity className="size-3" /> DAMAGE CONTROL
            </Chip>
            <h3 className="mt-4 text-2xl font-bold">Five deadlines, one honest verdict each.</h3>
            <div className="mt-5 space-y-3">
              {DEADLINES.slice(0, 3).map((d) => (
                <div key={d.id} className="rounded-xl border border-border bg-surface-2 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold">{d.task}</span>
                    <span
                      className={
                        d.priority === "high"
                          ? "text-xs font-bold text-primary"
                          : d.priority === "medium"
                            ? "text-xs font-bold text-warning"
                            : "text-xs font-bold text-success"
                      }
                    >
                      {d.rec}
                    </span>
                  </div>
                  <Bar
                    className="mt-2"
                    value={d.priority === "high" ? 90 : d.priority === "medium" ? 55 : 25}
                    tone={d.priority === "high" ? "primary" : d.priority === "medium" ? "warning" : "success"}
                  />
                </div>
              ))}
            </div>
            <Link to="/damage-control" className="mt-5 inline-block">
              <Btn tone="success" size="sm">
                Open Damage Control <ArrowRight className="size-4" />
              </Btn>
            </Link>
          </Panel>
        </div>
      </Section>

      <Section>
        <h2 className="text-center text-3xl font-bold">Survivor stories</h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Illustrative examples — these are fictional demo testimonials.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <Panel key={t.name}>
              <p className="text-foreground/90">"{t.quote}"</p>
              <div className="mt-4 text-sm font-semibold">{t.name}</div>
              <div className="text-xs text-muted-foreground">{t.detail}</div>
            </Panel>
          ))}
        </div>
      </Section>

      <Section className="pb-24">
        <div className="card-surface relative overflow-hidden p-10 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-ai/10" />
          <div className="relative">
            <h2 className="text-3xl font-bold sm:text-4xl">
              You're not finished. You're just in academic emergency mode.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Two minutes of triage beats another night of doom-scrolling with the textbook open.
            </p>
            <Link to="/emergency" className="mt-7 inline-block">
              <Btn size="lg">
                Start triage now <ArrowRight className="size-5" />
              </Btn>
            </Link>
          </div>
        </div>
      </Section>

      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        Academic Emergency Room · demo build with mock data
      </footer>
    </div>
  );
}
