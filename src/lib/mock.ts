export type Tier = "must" | "should" | "maybe" | "ignore";

export const SITUATIONS = [
  { id: "exam-tomorrow", label: "Exam tomorrow", emoji: "🔥" },
  { id: "behind-syllabus", label: "Behind on syllabus", emoji: "📚" },
  { id: "assignment-due", label: "Assignment due soon", emoji: "⏰" },
  { id: "too-many", label: "Too many deadlines", emoji: "🌀" },
  { id: "understand-nothing", label: "I understand nothing", emoji: "🫠" },
  { id: "failed-exam", label: "Failed an exam", emoji: "💀" },
  { id: "on-fire", label: "Everything is on fire", emoji: "🚨" },
  { id: "no-start", label: "Don't know where to start", emoji: "🧭" },
];

export const TIME_OPTIONS = [
  "15 min",
  "30 min",
  "1 hour",
  "2 hours",
  "4 hours",
  "Tonight",
  "This week",
  "No idea",
];

export const MISTAKES = [
  { id: "procrastinated", label: "I procrastinated" },
  { id: "basics", label: "Didn't understand the basics" },
  { id: "wrong-things", label: "Studied the wrong things" },
  { id: "missed-classes", label: "Missed classes" },
  { id: "forgot", label: "Forgot everything I learned" },
  { id: "underestimated", label: "Underestimated the exam" },
  { id: "overwhelmed", label: "Got overwhelmed and froze" },
  { id: "didnt-start", label: "Never actually started" },
];

export const PHASES = [
  {
    name: "Stabilize",
    duration: "30 min",
    color: "primary",
    items: [
      "Close every tab that isn't this plan",
      "Skim the syllabus and mark the 5 biggest topics",
      "Write down what the exam actually tests (format, marks, timing)",
    ],
  },
  {
    name: "Priority Surgery",
    duration: "2 hrs",
    color: "warning",
    items: [
      "Learn only the Must Know tier — nothing else exists right now",
      "One worked example per topic, out loud, no notes at the end",
      "Screenshot formulas into a single one-page cheat sheet",
    ],
  },
  {
    name: "Practice",
    duration: "1.5 hrs",
    color: "ai",
    items: [
      "Do 6 past-paper questions with the sheet open",
      "Redo the 2 you got wrong with the sheet closed",
      "Log every mistake in one line: what and why",
    ],
  },
  {
    name: "Simulation",
    duration: "1 hr",
    color: "success",
    items: [
      "Timed mini-mock: half the real exam length",
      "Mark it brutally, no self-forgiveness",
      "Rank your top 3 weak spots",
    ],
  },
  {
    name: "Final Check",
    duration: "30 min",
    color: "success",
    items: [
      "Re-read only the one-page sheet",
      "Explain the 3 hardest ideas to your phone's voice memo",
      "Sleep. Seriously. Sleep is a study technique.",
    ],
  },
];

export const TOPICS: { name: string; tier: Tier; why: string }[] = [
  { name: "Integration by parts", tier: "must", why: "Showed up in 4 of the last 5 papers." },
  { name: "Definite integrals", tier: "must", why: "Every long-form question builds on it." },
  { name: "U-substitution", tier: "must", why: "Prerequisite for half the Must Know set." },
  { name: "Partial fractions", tier: "should", why: "Common, but only worth ~10 marks." },
  { name: "Improper integrals", tier: "should", why: "Appears as a short question most years." },
  { name: "Arc length", tier: "maybe", why: "Nice bonus marks if the core is solid." },
  { name: "Surface of revolution", tier: "maybe", why: "Low frequency, high effort." },
  { name: "Numerical methods proofs", tier: "ignore", why: "Rarely examined. Not worth it tonight." },
  { name: "History of calculus", tier: "ignore", why: "Zero marks. Truly zero." },
];

export const TIER_META: Record<Tier, { label: string; klass: string; dot: string }> = {
  must: {
    label: "Must Know",
    klass: "border-primary/40 bg-primary/10",
    dot: "bg-primary",
  },
  should: {
    label: "Should Know",
    klass: "border-warning/40 bg-warning/10",
    dot: "bg-warning",
  },
  maybe: {
    label: "If You Have Time",
    klass: "border-success/40 bg-success/10",
    dot: "bg-success",
  },
  ignore: {
    label: "Ignore For Now",
    klass: "border-border bg-surface-2",
    dot: "bg-muted-foreground",
  },
};

export const DEADLINES = [
  {
    id: "1",
    task: "Calculus II Midterm",
    deadline: "Tomorrow, 9:00 AM",
    effort: "6 hrs",
    priority: "high" as const,
    rec: "Do this first",
  },
  {
    id: "2",
    task: "Data Structures Lab Report",
    deadline: "In 2 days",
    effort: "3 hrs",
    priority: "medium" as const,
    rec: "Squeeze in later",
  },
  {
    id: "3",
    task: "Econ Essay (2000 words)",
    deadline: "In 3 days",
    effort: "8 hrs",
    priority: "high" as const,
    rec: "Ask for an extension",
  },
  {
    id: "4",
    task: "Physics Problem Set 7",
    deadline: "In 5 days",
    effort: "2 hrs",
    priority: "low" as const,
    rec: "Squeeze in later",
  },
];

export const MIRACLE_STEPS = [
  { time: "00:00 – 03:00", title: "Understand the core concept", detail: "Read one definition. Say it back in your own words." },
  { time: "03:00 – 08:00", title: "Study the best worked example", detail: "Copy it line by line and annotate why each step happens." },
  { time: "08:00 – 12:00", title: "Do one question yourself", detail: "Notes closed. Struggling here is the point." },
  { time: "12:00 – 14:00", title: "Fix the one thing you got wrong", detail: "Only the mistake. Ignore everything else." },
  { time: "14:00 – 15:00", title: "Write your one-line takeaway", detail: "Future you reads this before the exam." },
];

export const EXPLAIN_STYLES = [
  {
    id: "friend",
    label: "Like a smart friend",
    text: "Ok so integration by parts is just the product rule running backwards. You've got two things multiplied together, you pick one to differentiate and one to integrate, and you swap the hard half for an easier half. That's it. ∫u dv = uv − ∫v du.",
  },
  {
    id: "ten",
    label: "Like I'm 10",
    text: "Imagine a chore that's too big. You do the easy part now, and trade the hard part for a smaller chore. Integration by parts trades one hard problem for one easier problem. You keep trading until it's tiny.",
  },
  {
    id: "meme",
    label: "Meme language",
    text: "Integral looks scary fr 💀 → split it into u and dv → uv − ∫v du → the new integral is way less toxic → solve → touch grass. No cap, LIATE picks your u for you.",
  },
  {
    id: "real",
    label: "Real-world example",
    text: "You're tracking total fuel used when both speed and efficiency change over time. Two changing quantities multiplied together — that's the exact shape integration by parts is built for.",
  },
  {
    id: "exam",
    label: "Exam answer",
    text: "Let u = x, dv = eˣ dx. Then du = dx and v = eˣ. Applying ∫u dv = uv − ∫v du gives xeˣ − ∫eˣ dx = xeˣ − eˣ + C. State the formula, define u and dv, substitute, integrate, add C.",
  },
  {
    id: "prof",
    label: "Professor mode",
    text: "Integration by parts follows from the product rule: d(uv) = u dv + v du. Integrating both sides and rearranging yields ∫u dv = uv − ∫v du. Selection of u should reduce the complexity of the resulting integrand.",
  },
  {
    id: "visual",
    label: "Visual explanation",
    text: "Picture a rectangle of area uv. The curve inside splits it into two regions: one is ∫u dv, the other is ∫v du. Together they fill the rectangle — so one region equals the rectangle minus the other.",
  },
];

export const STUCK_REASONS = [
  "I don't understand the concept",
  "I don't know how to solve it",
  "I keep making the same mistake",
  "I can't remember it",
  "The explanation doesn't make sense",
];

export const BADGES = [
  { name: "First Triage", desc: "Ran your first assessment", earned: true, icon: "🚑" },
  { name: "15-Min Miracle", desc: "Completed a micro mission", earned: true, icon: "⚡" },
  { name: "Night Shift", desc: "Studied after midnight", earned: true, icon: "🌙" },
  { name: "Comeback Kid", desc: "Improved a score by 20+", earned: true, icon: "📈" },
  { name: "Deadline Dodger", desc: "Cleared 5 deadlines on time", earned: false, icon: "🛡️" },
  { name: "Full Recovery", desc: "Finished a 5-phase plan", earned: false, icon: "🏆" },
  { name: "Iron Streak", desc: "14-day comeback streak", earned: false, icon: "🔥" },
  { name: "No Panic", desc: "Zero emergencies for a week", earned: false, icon: "🧘" },
];

export const POSTS = [
  {
    id: 1,
    category: "Exam panic",
    body: "Exam in 9 hours, opened the textbook for the first time today. Made the Must Know list and I'm weirdly calm now.",
    reactions: { "🫂": 42, "🔥": 12, "💀": 88 },
    time: "12 min ago",
  },
  {
    id: 2,
    category: "Study strategies",
    body: "Past papers > rereading notes. It's not close. I wasted two semesters highlighting things.",
    reactions: { "💯": 156, "🧠": 34, "🫂": 5 },
    time: "1 hr ago",
  },
  {
    id: 3,
    category: "Deadline survival",
    body: "Sent the extension request template. Professor said yes in 20 minutes. Just ask, seriously.",
    reactions: { "🔥": 210, "💯": 61, "🫂": 18 },
    time: "3 hrs ago",
  },
  {
    id: 4,
    category: "Motivation",
    body: "Failed midterm with 41%. Finished the semester at 78%. You are not your worst week.",
    reactions: { "🫂": 402, "📈": 190, "🔥": 77 },
    time: "5 hrs ago",
  },
  {
    id: 5,
    category: "Exam panic",
    body: "Anyone else freeze completely when there's too much to do? The 15-min timer is the only thing that unsticks me.",
    reactions: { "🫂": 128, "💀": 44, "💯": 31 },
    time: "8 hrs ago",
  },
  {
    id: 6,
    category: "Study strategies",
    body: "Rule I stole from here: if a topic hasn't appeared in 3 years of papers, it doesn't exist tonight.",
    reactions: { "💯": 98, "🧠": 52, "🔥": 20 },
    time: "1 day ago",
  },
];

export const POST_CATEGORIES = [
  "All",
  "Exam panic",
  "Study strategies",
  "Deadline survival",
  "Motivation",
];
