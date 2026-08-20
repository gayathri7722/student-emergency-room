import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 md:py-16", className)}>
      {children}
    </section>
  );
}

export function Panel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("card-surface p-5 sm:p-6", className)}>{children}</div>;
}

type Tone = "primary" | "ghost" | "outline" | "success" | "ai" | "warning";

const toneClasses: Record<Tone, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  success: "bg-success text-success-foreground hover:bg-success/90",
  ai: "bg-ai text-ai-foreground hover:bg-ai/90",
  warning: "bg-warning text-warning-foreground hover:bg-warning/90",
  outline: "border border-border bg-surface text-foreground hover:bg-surface-2",
  ghost: "text-muted-foreground hover:text-foreground hover:bg-surface-2",
};

export function Btn({
  tone = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { tone?: Tone; size?: "sm" | "md" | "lg" }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
        size === "sm" && "px-3 py-2 text-sm",
        size === "md" && "px-4 py-2.5 text-sm",
        size === "lg" && "px-6 py-3.5 text-base",
        toneClasses[tone],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function Bar({
  value,
  tone = "primary",
  className,
}: {
  value: number;
  tone?: "primary" | "warning" | "success" | "ai";
  className?: string;
}) {
  const bg = {
    primary: "bg-primary",
    warning: "bg-warning",
    success: "bg-success",
    ai: "bg-ai",
  }[tone];
  return (
    <div
      className={cn("h-2 w-full overflow-hidden rounded-full bg-surface-2", className)}
      role="progressbar"
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={cn("h-full rounded-full transition-[width] duration-1000 ease-out", bg)}
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}

export function Chip({
  children,
  tone = "muted",
  className,
}: {
  children: ReactNode;
  tone?: "muted" | "primary" | "warning" | "success" | "ai";
  className?: string;
}) {
  const map = {
    muted: "border-border bg-surface-2 text-muted-foreground",
    primary: "border-primary/40 bg-primary/15 text-primary",
    warning: "border-warning/40 bg-warning/15 text-warning",
    success: "border-success/40 bg-success/15 text-success",
    ai: "border-ai/40 bg-ai/15 text-ai",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide",
        map[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function StatusDot({ tone = "primary" }: { tone?: "primary" | "success" }) {
  return (
    <span
      className={cn(
        "inline-block size-2.5 rounded-full pulse-dot",
        tone === "primary" ? "bg-primary" : "bg-success",
      )}
    />
  );
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-8 animate-rise">
      {eyebrow && (
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
      )}
      <h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>
      {subtitle && <p className="mt-2 max-w-2xl text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
