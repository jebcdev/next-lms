"use server";

import { headers } from "next/headers";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { consoleLogger } from "@/lib/logger/console-logger";
import { IGeneralResponse } from "@/features/shared/types/general-response";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prismaDB = new PrismaClient({ adapter });

export const getTenantBySubdomain = async (): Promise<IGeneralResponse<{
    id: string;
    name: string;
    slug: string;
} | null>> => {
    try {
        const headersList = await headers();
        const host = headersList.get("host") || "";
        const hostname = host.replace(/^www\./, "");

        const subdomain = hostname.split(".")[0];

        if (!subdomain || subdomain === hostname) {
            return {
                success: true,
                error: false,
                message: "No se detectó subdominio",
                data: null,
            };
        }

        const tenant = await prismaDB.tenant.findUnique({
            where: { slug: subdomain },
            select: {
                id: true,
                name: true,
                slug: true,
            },
        });

        if (!tenant) {
            return {
                success: true,
                error: false,
                message: "Tenant no encontrado",
                data: null,
            };
        }

        return {
            success: true,
            error: false,
            message: "Tenant encontrado",
            data: tenant,
        };
    } catch (error) {
        consoleLogger({ error });
        return {
            success: false,
            error: true,
            message: "Error al obtener el tenant",
        };
    }
};