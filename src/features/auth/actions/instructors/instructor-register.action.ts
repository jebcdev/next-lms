"use server";

import { auth, User } from "@/lib/auth/auth";
// import { headers } from "next/headers";
import {
    InstructorRegisterSchema,
    InstructorRegisterData,
} from "@/features/auth/validations/instructors";
import { Role } from "@/generated/prisma/enums";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { consoleLogger } from "@/lib/logger/console-logger";
import { IGeneralResponse } from "@/features/shared/types/general-response";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prismaDB = new PrismaClient({ adapter });

export const instructorRegisterAction = async (
    data: InstructorRegisterData,
): Promise<IGeneralResponse<User>> => {
    try {
        const validatedData = InstructorRegisterSchema.safeParse(data);

        if (!validatedData.success) {
            return {
                success: false,
                error: true,
                message: "La información proporcionada no es válida",
            };
        }

        const tenant = await prismaDB.tenant.findUnique({
            where: { id: validatedData.data.tenantId },
        });

        if (!tenant) {
            return {
                success: false,
                error: true,
                message: "La organización no existe",
            };
        }

        if (!tenant.isActive) {
            return {
                success: false,
                error: true,
                message: "La organización no está activa",
            };
        }

        const existingUser = await prismaDB.user.findUnique({
            where: { email: validatedData.data.email },
        });

        if (existingUser) {
            return {
                success: false,
                error: true,
                message: "El email ya está en uso",
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
                role: Role.INSTRUCTOR,
                isActive: true,
                tenantId: validatedData.data.tenantId,
            },
        });

        return {
            success: true,
            error: false,
            message: "Instructor registrado exitosamente",
            data: newUser.user,
        };
    } catch (error) {
        consoleLogger({ error });
        return {
            success: false,
            error: true,
            message: "Error al registrar instructor",
        };
    }
};