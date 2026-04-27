"use server";

import { Role } from "@/generated/prisma/client";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

export async function getSessionDetails() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const isAuthenticated = !!session;
    const userRole = session?.user.role as Role | undefined;

    const isSuperAdmin = userRole === Role.SUPER_ADMIN;
    const isAdmin = userRole === Role.ADMIN;
    const isInstructor = userRole === Role.INSTRUCTOR;
    const isStudent = userRole === Role.STUDENT;

    // Helpers de acceso
    const hasAdminAccess = isSuperAdmin || isAdmin;
    const hasInstructorAccess = isSuperAdmin || isAdmin || isInstructor;

    const currentUser = session?.user ?? null;
    const currentSession = session?.session ?? null;

    return {
        isAuthenticated,
        isSuperAdmin,
        isAdmin,
        isInstructor,
        isStudent,
        hasAdminAccess,      // Para proteger rutas /admin
        hasInstructorAccess, // Para proteger rutas /dashboard de instructores
        currentUser,
        currentSession,
    };
}