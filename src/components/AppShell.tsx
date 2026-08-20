import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Home, Siren, Target, TrendingUp, User, Users } from "lucide-react";
import { StuckButton, StuckDrawer } from "./StuckDrawer";

const NAV = [
  { to: "/dashboard", label: "Home", icon: Home },
  { to: "/emergency", label: "Emergency", icon: Siren },
  { to: "/plan", label: "Missions", icon: Target },
  { to: "/progress", label: "Progress", icon: TrendingUp },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      <header className="sticky top-0 z-30 hidden border-b border-border bg-background/85 backdrop-blur md:block">
        <div className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-3">
          <Link to="/" className="font-display text-lg font-bold tracking-tight">
            <span className="text-primary">AER</span> Academic ER
          </Link>
          <nav className="ml-auto flex items-center gap-1">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeProps={{ className: "bg-surface-2 text-foreground" }}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/community"
              activeProps={{ className: "bg-surface-2 text-foreground" }}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              Triage Room
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">{children}</main>

      <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-surface/95 backdrop-blur md:hidden">
        <div className="grid grid-cols-5">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeProps={{ className: "text-primary" }}
              className="flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold text-muted-foreground"
            >
              <n.icon className="size-5" />
              {n.label}
            </Link>
          ))}
        </div>
      </nav>

      <Link
        to="/community"
        className="fixed bottom-24 left-4 z-40 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-3 text-sm font-bold text-muted-foreground shadow-lg transition-colors hover:text-foreground md:hidden"
      >
        <Users className="size-4" />
        Triage
      </Link>

      <StuckButton />
      <StuckDrawer />
    </div>
  );
}
