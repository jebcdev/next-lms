"use server";

import { auth, User } from "@/lib/auth/auth";
import { headers } from "next/headers";
import {
    SuperAdminRegisterSchema,
    SuperAdminRegisterData,
} from "@/features/auth/validations/super-admins";
import { Role } from "@/generated/prisma/enums";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { consoleLogger } from "@/lib/logger/console-logger";
import { IGeneralResponse } from "@/features/shared/types/general-response";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prismaDB = new PrismaClient({ adapter });

export const superAdminRegisterAction = async (
    data: SuperAdminRegisterData,
): Promise<IGeneralResponse<User>> => {
    try {
        const validatedData =
            SuperAdminRegisterSchema.safeParse(data);

        if (!validatedData.success) {
            return {
                success: false,
                error: true,
                message: "La información proporcionada no es válida",
            };
        }

        const existingUser = await prismaDB.user.findUnique({
            where: { email: validatedData.data.email },
        });

        if (existingUser) {
            return {
                success: false,
                error: true,
                message: "El email ya está registered",
            };
        }

        const newUser = await auth.api.signUpEmail({
            body: {
                name: validatedData.data.name,
                email: validatedData.data.email,
                password: validatedData.data.password,
            },
        });

        await prismaDB.user.update({
            where: { id: newUser.user.id },
            data: {
                role: Role.SUPER_ADMIN,
                isActive: true,
            },
        });

        return {
            success: true,
            error: false,
            message: "Super admin registrado exitosamente",
            data: newUser.user,
        };
    } catch (error) {
        consoleLogger({ error });
        return {
            success: false,
            error: true,
            message: "Error al registrar usuario",
        };
    }
};
