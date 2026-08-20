import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type Assessment = {
  situations: string[];
  time: string;
  subject: string;
  examName: string;
  deadline: string;
  progress: number;
  targetGrade: string;
  topics: string;
  difficulty: string;
  hours: string;
  fileName: string;
  mistakes: string[];
};

export type Emergency = {
  id: string;
  subject: string;
  title: string;
  timeLeft: string;
  recovery: number;
  severity: "critical" | "high" | "medium";
};

const defaultAssessment: Assessment = {
  situations: ["exam-tomorrow", "behind-syllabus"],
  time: "4 hours",
  subject: "Calculus II",
  examName: "Midterm 2 — Integration",
  deadline: "Tomorrow, 9:00 AM",
  progress: 25,
  targetGrade: "Pass comfortably (65%+)",
  topics: "Integration by parts, definite integrals, u-substitution, partial fractions",
  difficulty: "Hard",
  hours: "6",
  fileName: "",
  mistakes: ["procrastinated", "underestimated"],
};

type Ctx = {
  name: string;
  setName: (n: string) => void;
  assessment: Assessment;
  setAssessment: (a: Assessment) => void;
  emergencies: Emergency[];
  stuckOpen: boolean;
  setStuckOpen: (v: boolean) => void;
  missionsDone: number;
  completeMission: () => void;
  xp: number;
};

const AppCtx = createContext<Ctx | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [name, setName] = useState("Maya");
  const [assessment, setAssessment] = useState<Assessment>(defaultAssessment);
  const [stuckOpen, setStuckOpen] = useState(false);
  const [missionsDone, setMissionsDone] = useState(3);

  const emergencies = useMemo<Emergency[]>(
    () => [
      {
        id: "1",
        subject: assessment.subject || "Calculus II",
        title: assessment.examName || "Midterm 2",
        timeLeft: "14h 20m",
        recovery: 38,
        severity: "critical",
      },
      {
        id: "2",
        subject: "Data Structures",
        title: "Lab Report 4",
        timeLeft: "2d 6h",
        recovery: 61,
        severity: "medium",
      },
      {
        id: "3",
        subject: "Economics",
        title: "Essay — Market Failure",
        timeLeft: "3d 1h",
        recovery: 12,
        severity: "high",
      },
    ],
    [assessment.subject, assessment.examName],
  );

  const value: Ctx = {
    name,
    setName,
    assessment,
    setAssessment,
    emergencies,
    stuckOpen,
    setStuckOpen,
    missionsDone,
    completeMission: () => setMissionsDone((m) => m + 1),
    xp: 2480 + missionsDone * 120,
  };

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export function useApp() {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
