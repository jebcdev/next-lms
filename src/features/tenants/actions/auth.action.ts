"use server";

import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { prismaDB } from "@/lib/db/prismaDB";
import { consoleLogger } from "@/lib/logger/console-logger";
import {
    TenantLoginInput,
    TenantLoginSchema,
    TenantRegisterInput,
    TenantRegisterSchema,
} from "@/features/tenants/validations/auth.schema";
import { IGeneralResponse } from "@/features/shared/types";
import { User } from "@/generated/prisma/client";

// ─── Login ────────────────────────────────────────────────────────────────────

const loginTenant = async (
    body: TenantLoginInput,
): Promise<IGeneralResponse<User>> => {
    try {
        const validatedData = TenantLoginSchema.safeParse(body);

        if (!validatedData.success)
            return {
                success: false,
                error: true,
                message: "La información proporcionada no es válida",
            };

        const userExists = await prismaDB.user.findUnique({
            where: { email: validatedData.data.email },
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

        // SUPER_ADMIN: no necesita tenant, tiene acceso directo
        if (userExists.role === "SUPER_ADMIN") {
            const loggedInUser = await auth.api.signInEmail({
                body: {
                    email: validatedData.data.email,
                    password: validatedData.data.password,
                    callbackURL: process.env.NEXT_PUBLIC_APP_URL!,
                },
                headers: await headers(),
            });

            if (!loggedInUser)
                return {
                    success: false,
                    error: true,
                    message: "Error al iniciar sesión, intenta nuevamente",
                };

            return {
                success: true,
                message: "Bienvenido, Super Admin",
                data: userExists,
            };
        }

        // ADMIN: debe tener tenant activo
        if (userExists.role === "ADMIN") {
            if (!userExists.tenantId)
                return {
                    success: false,
                    error: true,
                    message: "Tu cuenta no está asociada a ninguna organización",
                };

            const tenant = await prismaDB.tenant.findUnique({
                where: { id: userExists.tenantId },
            });

            if (!tenant || !tenant.isActive)
                return {
                    success: false,
                    error: true,
                    message: "La organización no está activa o no existe",
                };

            const loggedInUser = await auth.api.signInEmail({
                body: {
                    email: validatedData.data.email,
                    password: validatedData.data.password,
                    callbackURL: process.env.NEXT_PUBLIC_APP_URL!,
                },
                headers: await headers(),
            });

            if (!loggedInUser)
                return {
                    success: false,
                    error: true,
                    message: "Error al iniciar sesión, intenta nuevamente",
                };

            return {
                success: true,
                message: "Sesión iniciada exitosamente",
                data: userExists,
            };
        }

        // Cualquier otro rol (INSTRUCTOR, STUDENT) no tiene acceso
        return {
            success: false,
            error: true,
            message: "No tienes permisos para acceder a este panel",
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

// ─── Register ─────────────────────────────────────────────────────────────────

const registerTenant = async (
    body: TenantRegisterInput,
): Promise<IGeneralResponse<{ tenantSlug: string }>> => {
    try {
        const validatedData = TenantRegisterSchema.safeParse(body);

        if (!validatedData.success)
            return {
                success: false,
                error: true,
                message: "La información proporcionada no es válida",
            };

        const { name, email, password, tenantName, tenantSlug } =
            validatedData.data;

        const emailExists = await prismaDB.user.findUnique({
            where: { email },
        });

        if (emailExists)
            return {
                success: false,
                error: true,
                message: "Ya existe una cuenta con este email",
            };

        const slugExists = await prismaDB.tenant.findUnique({
            where: { slug: tenantSlug },
        });

        if (slugExists)
            return {
                success: false,
                error: true,
                message: "El slug de la organización ya está en uso, elige otro",
            };

        const tenant = await prismaDB.tenant.create({
            data: {
                name: tenantName,
                slug: tenantSlug,
                plan: "FREE",
                isActive: true,
            },
        });

        const newUser = await auth.api.signUpEmail({
            body: { name, email, password },
        });

        if (!newUser)
            return {
                success: false,
                error: true,
                message: "Error al crear el usuario, intenta nuevamente",
            };

        await prismaDB.user.update({
            where: { id: newUser.user.id },
            data: {
                role: "ADMIN",
                isActive: true,
                tenantId: tenant.id,
            },
        });

        return {
            success: true,
            message: "Organización creada exitosamente",
            data: { tenantSlug: tenant.slug },
        };
    } catch (error) {
        consoleLogger({ error });
        return {
            success: false,
            error: true,
            message: "Error al crear la organización, intenta nuevamente",
        };
    }
};

// ─── Exports ──────────────────────────────────────────────────────────────────

export { loginTenant, registerTenant };