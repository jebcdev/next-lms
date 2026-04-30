"use server";

import { PrismaClient, Tenant } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { consoleLogger } from "@/lib/logger/console-logger";
import { IGeneralResponse } from "@/features/shared/types/general-response";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prismaDB = new PrismaClient({ adapter });

export const getAllTenantsSuperAdmin = async (): Promise<
    IGeneralResponse<Tenant[]>
> => {
    try {
        const tenants = await prismaDB.tenant.findMany({
            orderBy: {
                createdAt: "desc",
            },
            include: {
                _count: {
                    select: {
                        users: true,
                        courses: true,
                    },
                },
            },
        });

        return {
            success: true,
            error: false,
            message: "Tenants obtenidos exitosamente",
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
