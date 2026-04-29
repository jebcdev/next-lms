"use server";

import { auth, User } from "@/lib/auth/auth";
import { headers } from "next/headers";
import {
    AdminRegisterSchema,
    AdminRegisterData,
} from "@/features/auth/validations/admins";
import { Role } from "@/generated/prisma/enums";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { consoleLogger } from "@/lib/logger/console-logger";
import { IGeneralResponse } from "@/features/shared/types/general-response";
import { slugify } from "@/lib/utils/slugify";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prismaDB = new PrismaClient({ adapter });

const generateUniqueSlug = async (baseSlug: string): Promise<string> => {
    let slug = baseSlug;
    let counter = 0;

    while (await prismaDB.tenant.findUnique({ where: { slug } })) {
        counter++;
        slug = `${baseSlug}-${counter}`;
    }

    return slug;
};

export const adminRegisterAction = async (
    data: AdminRegisterData,
): Promise<IGeneralResponse<User & { tenantId: string }>> => {
    try {
        const validatedData = AdminRegisterSchema.safeParse(data);

        if (!validatedData.success) {
            return {
                success: false,
                error: true,
                message: "La información proporcionada no es válida",
            };
        }

        const existingEmail = await prismaDB.user.findUnique({
            where: { email: validatedData.data.email },
        });

        if (existingEmail) {
            return {
                success: false,
                error: true,
                message: "El email ya está en uso",
            };
        }

        const baseSlug = validatedData.data.tenantSlug
            ? slugify(validatedData.data.tenantSlug)
            : slugify(validatedData.data.tenantName);

        const tenantSlug = await generateUniqueSlug(baseSlug);

        const newUser = await auth.api.signUpEmail({
            body: {
                name: validatedData.data.name,
                email: validatedData.data.email,
                password: validatedData.data.password,
            },
        });

        const tenant = await prismaDB.tenant.create({
            data: {
                name: validatedData.data.tenantName,
                slug: tenantSlug,
                plan: validatedData.data.plan,
                isActive: true,
            },
        });

        await prismaDB.user.update({
            where: { id: newUser.user.id },
            data: {
                role: Role.ADMIN,
                isActive: true,
                tenantId: tenant.id,
            },
        });

        return {
            success: true,
            error: false,
            message: "Organización creada exitosamente",
            data: {
                ...newUser.user,
                tenantId: tenant.id,
            } as User & { tenantId: string },
        };
    } catch (error) {
        consoleLogger({ error });
        return {
            success: false,
            error: true,
            message: "Error al registrar organización",
        };
    }
};