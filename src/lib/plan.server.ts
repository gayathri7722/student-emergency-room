import type { PlanInput, StudyPlan } from "./plan-types";
import { EXPLAIN_STYLES, MIRACLE_STEPS, PHASES, TOPICS } from "./mock";

const PHASE_COLORS = ["primary", "warning", "ai", "success", "success"];
const TIERS = ["must", "should", "maybe", "ignore"] as const;

export function buildPrompt(input: PlanInput) {
  return `A student is behind and needs an emergency study plan.

Subject: ${input.subject || "unspecified"}
Exam / assessment: ${input.examName || "unspecified"}
Deadline: ${input.deadline || "unspecified"}
Time available: ${input.time || "unknown"} (${input.hours || "?"} usable hours)
Topics they listed: ${input.topics || "none listed — infer the standard syllabus for this subject"}
Perceived difficulty: ${input.difficulty || "unknown"}
Target outcome: ${input.targetGrade || "pass"}
Self-reported progress: ${input.progress}% of material covered
Current situation tags: ${input.situations.join(", ") || "none"}
What went wrong: ${input.mistakes.join(", ") || "not stated"}

Return JSON only, matching exactly this shape:
{
  "headline": "short blunt one-line diagnosis mentioning the subject",
  "summary": "2 sentences, direct, no fluff",
  "missionFocus": "the single first thing to study, one short phrase",
  "missionMinutes": 30,
  "topics": [ { "name": "...", "tier": "must|should|maybe|ignore", "why": "one short sentence" } ],
  "phases": [ { "name": "...", "duration": "e.g. 30 min", "items": ["3 concrete actions"] } ],
  "miracleSteps": [ { "time": "00:00 – 03:00", "title": "...", "detail": "one sentence" } ],
  "explanations": [ { "label": "Like a smart friend", "text": "explain the missionFocus topic in that style, 2-4 sentences" } ]
}

Rules: 8-10 topics real to THIS subject (use the student's listed topics first, then standard ones),
covering all four tiers. Exactly 5 phases named Stabilize, Priority Surgery, Practice, Simulation,
Final Check, with durations that add up to roughly the available hours. Exactly 5 miracleSteps
covering 15 minutes. Exactly 7 explanations with labels in this order: "Like a smart friend",
"Like I'm 10", "Meme language", "Real-world example", "Exam answer", "Professor mode",
"Visual explanation". Tone: honest, calm, Gen Z friendly, never patronising.`;
}

export function fallbackPlan(input: PlanInput): StudyPlan {
  return {
    subject: input.subject || "Your subject",
    headline: `${input.subject || "This subject"}: severe, but survivable`,
    summary:
      "We couldn't reach the planner, so here's a generic emergency structure. Swap the topic names for your own and the order still works.",
    missionFocus: input.topics.split(",")[0]?.trim() || "your highest-value topic",
    missionMinutes: 30,
    topics: TOPICS,
    phases: PHASES,
    miracleSteps: MIRACLE_STEPS,
    explanations: EXPLAIN_STYLES,
  };
}

type RawPlan = Partial<StudyPlan> & { phases?: { name?: string; duration?: string; items?: string[] }[] };

export function normalizePlan(raw: unknown, input: PlanInput): StudyPlan {
  const base = fallbackPlan(input);
  const p = (raw ?? {}) as RawPlan;

  const topics = Array.isArray(p.topics)
    ? p.topics
        .filter((t) => t && typeof t.name === "string")
        .map((t) => ({
          name: String(t.name),
          tier: (TIERS as readonly string[]).includes(String(t.tier)) ? t.tier : "should",
          why: String(t.why ?? ""),
        }))
    : [];

  const phases = Array.isArray(p.phases)
    ? p.phases.slice(0, 5).map((ph, i) => ({
        name: String(ph?.name ?? base.phases[i]?.name ?? `Phase ${i + 1}`),
        duration: String(ph?.duration ?? "30 min"),
        color: PHASE_COLORS[i] ?? "primary",
        items: Array.isArray(ph?.items) ? ph.items.map(String).slice(0, 5) : [],
      }))
    : [];

  const miracleSteps = Array.isArray(p.miracleSteps)
    ? p.miracleSteps.slice(0, 5).map((s, i) => ({
        time: String(s?.time ?? base.miracleSteps[i]?.time ?? ""),
        title: String(s?.title ?? ""),
        detail: String(s?.detail ?? ""),
      }))
    : [];

  const explanations = Array.isArray(p.explanations)
    ? p.explanations
        .filter((e) => e && typeof e.text === "string")
        .map((e, i) => ({
          id: String(e.id ?? `style-${i}`),
          label: String(e.label ?? base.explanations[i]?.label ?? `Style ${i + 1}`),
          text: String(e.text),
        }))
    : [];

  return {
    subject: input.subject || base.subject,
    headline: String(p.headline ?? base.headline),
    summary: String(p.summary ?? base.summary),
    missionFocus: String(p.missionFocus ?? base.missionFocus),
    missionMinutes: Number(p.missionMinutes) > 0 ? Math.round(Number(p.missionMinutes)) : 30,
    topics: topics.length >= 4 ? topics : base.topics,
    phases: phases.length === 5 ? phases : base.phases,
    miracleSteps: miracleSteps.length === 5 ? miracleSteps : base.miracleSteps,
    explanations: explanations.length >= 3 ? explanations : base.explanations,
  };
}

export async function requestPlan(input: PlanInput): Promise<StudyPlan> {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) return fallbackPlan(input);

  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Lovable-API-Key": apiKey,
      "X-Lovable-AIG-SDK": "fetch",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [
        {
          role: "system",
          content:
            "You are a triage tutor who builds brutally practical emergency study plans. Reply with JSON only.",
        },
        { role: "user", content: buildPrompt(input) },
      ],
      response_format: { type: "json_object" },
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error(`AI plan request failed: ${res.status} ${body}`);
    if (res.status === 429 || res.status >= 500) throw new Error("The planner is busy. Try again in a moment.");
    if (res.status === 402) throw new Error("AI credits are exhausted for this workspace.");
    throw new Error("The planner could not build your plan right now.");
  }

  const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  const content = json.choices?.[0]?.message?.content ?? "";
  let parsed: unknown;
  try {
    parsed = JSON.parse(content);
  } catch {
    const match = content.match(/\{[\s\S]*\}/);
    parsed = match ? JSON.parse(match[0]) : {};
  }
  return normalizePlan(parsed, input);
}
