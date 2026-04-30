import { Tenant, Plan } from "@/generated/prisma/client";

export interface TenantWithCounts extends Tenant {
  _count?: {
    users: number;
    courses: number;
  };
}

export type PlanType = keyof typeof Plan;