"use server";

import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { consoleLogger } from "@/lib/logger/console-logger";
import { IGeneralResponse } from "@/features/shared/types/general-response";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prismaDB = new PrismaClient({ adapter });

export const getActiveTenants = async (): Promise<IGeneralResponse<{
    id: string;
    name: string;
    slug: string;
    plan: "FREE" | "STARTER" | "PRO" | "ENTERPRISE";
}[]>> => {
    try {
        const tenants = await prismaDB.tenant.findMany({
            where: {
                isActive: true,
            },
            select: {
                id: true,
                name: true,
                slug: true,
                plan: true,
            },
            orderBy: {
                name: "asc",
            },
        });

        return {
            success: true,
            error: false,
            message: "Tenants activos obtenidos exitosamente",
            data: tenants,
        };
    } catch (error) {
        consoleLogger({ error });
        return {
            success: false,
            error: true,
            message: "Error al obtener los tenants",
        };
    }
};