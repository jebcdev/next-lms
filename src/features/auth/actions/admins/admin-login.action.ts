"use server";

import { auth, User } from "@/lib/auth/auth";
import { headers } from "next/headers";
import {
    AdminLoginSchema,
    AdminLoginData,
} from "@/features/auth/validations/admins";
import { Role } from "@/generated/prisma/enums";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { consoleLogger } from "@/lib/logger/console-logger";
import { IGeneralResponse } from "@/features/shared/types/general-response";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prismaDB = new PrismaClient({ adapter });

export const adminLoginAction = async (
    currentUser: AdminLoginData,
): Promise<IGeneralResponse<User>> => {
    try {
        const validatedData = AdminLoginSchema.safeParse(currentUser);

        if (!validatedData.success)
            return {
                success: false,
                error: true,
                message: "La información proporcionada no es válida",
            };

        if (validatedData.data.role !== Role.ADMIN)
            return {
                success: false,
                error: true,
                message: "No tienes permiso para acceder como admin",
            };

        const userExists = await prismaDB.user.findUnique({
            where: {
                email: validatedData.data.email,
            },
        });

        if (!userExists)
            return {
                success: false,
                error: true,
                message: "El email o la contraseña son incorrectos",
            };

        if (!userExists.isActive)
            return {
                success: false,
                error: true,
                message: "La cuenta de usuario no está activa",
            };

        if (userExists.role !== Role.ADMIN)
            return {
                success: false,
                error: true,
                message: "No tienes permiso para acceder como admin",
            };

        const loggedInUser = await auth.api.signInEmail({
            body: {
                email: validatedData.data.email,
                password: validatedData.data.password,
                callbackURL: process.env.NEXT_PUBLIC_APP_URL!,
            },
            headers: await headers(),
        });

        return {
            success: true,
            error: false,
            message: "Usuario iniciado sesión exitosamente",
            data: loggedInUser.user,
        };
    } catch (error) {
        consoleLogger({ error });
        return {
            success: false,
            error: true,
            message: "Error al iniciar sesión, intenta nuevamente",
        };
    }
};