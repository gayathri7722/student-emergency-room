import type { Tier } from "./mock";

export type PlanTopic = { name: string; tier: Tier; why: string };
export type PlanPhase = { name: string; duration: string; color: string; items: string[] };
export type PlanMiracleStep = { time: string; title: string; detail: string };
export type PlanExplanation = { id: string; label: string; text: string };

export type StudyPlan = {
  subject: string;
  headline: string;
  summary: string;
  missionFocus: string;
  missionMinutes: number;
  topics: PlanTopic[];
  phases: PlanPhase[];
  miracleSteps: PlanMiracleStep[];
  explanations: PlanExplanation[];
};

export type PlanInput = {
  subject: string;
  examName: string;
  deadline: string;
  time: string;
  topics: string;
  difficulty: string;
  hours: string;
  targetGrade: string;
  progress: number;
  situations: string[];
  mistakes: string[];
};
