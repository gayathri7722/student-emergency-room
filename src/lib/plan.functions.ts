import { createServerFn } from "@tanstack/react-start";
import type { PlanInput } from "./plan-types";

export const generateStudyPlan = createServerFn({ method: "POST" })
  .inputValidator((data: PlanInput) => data)
  .handler(async ({ data }) => {
    const { requestPlan } = await import("./plan.server");
    return requestPlan(data);
  });
