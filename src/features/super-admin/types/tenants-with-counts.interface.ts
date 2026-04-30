import { Tenant } from "@/generated/prisma/client";

export interface TenantWithCounts extends Tenant {
    _count: {
        users: number;
        courses: number;
    };
}