"use server";

import { Role } from "@/generated/prisma/client";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { prismaDB } from "@/lib/db/prismaDB";

export async function getSessionDetails() {
    const session = await auth.api.getSession({ headers: await headers() });

    const isAuthenticated = !!session;
    const userRole = session?.user.role as Role | undefined;
    const userId = session?.user?.id;

    const isSuperAdmin = userRole === Role.SUPER_ADMIN;
    const isAdmin = userRole === Role.ADMIN;
    const isInstructor = userRole === Role.INSTRUCTOR;
    const isStudent = userRole === Role.STUDENT;

    const hasAdminAccess = isSuperAdmin || isAdmin;
    const hasInstructorAccess = isSuperAdmin || isAdmin || isInstructor;

    const currentUser = session?.user ?? null;
    const currentSession = session?.session ?? null;

    const fullUserDetails = userId
        ? await prismaDB.user.findUnique({
            where: { id: userId },
            include: {
                tenant: true,
                sessions: true,
                accounts: true,
                courses: { include: { modules: { include: { lessons: true } }, enrollments: true } },
                enrollments: { include: { course: { include: { modules: { include: { lessons: true } } } }, progress: true } },
            },
        })
        : null;

    return {
        isAuthenticated,
        isSuperAdmin,
        isAdmin,
        isInstructor,
        isStudent,
        hasAdminAccess,
        hasInstructorAccess,
        currentUser,
        currentSession,
        fullUserDetails,
    };
}