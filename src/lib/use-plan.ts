import { useEffect } from "react";

import { useApp } from "./store";

/** Ensures a personalized plan exists for the current assessment. */
export function useEnsurePlan() {
  const { plan, planStatus, planError, buildPlan, assessment } = useApp();

  useEffect(() => {
    if (planStatus === "idle") void buildPlan(assessment);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planStatus]);

  return { plan, planStatus, planError, retry: () => buildPlan(assessment) };
}
