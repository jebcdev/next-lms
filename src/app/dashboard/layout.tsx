import { generateAsyncDescription, generateAsyncTitle } from "@/lib/seo";
import type { Metadata } from "next";
import { getSessionDetails } from "@/lib/auth/session-details";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: await generateAsyncTitle("Dashboard"),
        description: await generateAsyncDescription("Dashboard"),
    };
}

export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { isAuthenticated, isStudent, isInstructor, isAdmin, isSuperAdmin } =
        await getSessionDetails();

    if (!isAuthenticated) {
        redirect("/login");
    }

    // Leer el pathname actual para evitar bucle infinito
    const headersList = await headers();
    const pathname = headersList.get("x-pathname") ?? "";
    const isRootDashboard = pathname === "/dashboard" || pathname === "/dashboard/";

    // Solo redirigir si estamos exactamente en /dashboard
    if (isRootDashboard) {
        if (isSuperAdmin) redirect("/dashboard/super-admins");
        if (isAdmin) redirect("/dashboard/admins");
        if (isInstructor) redirect("/dashboard/instructor");
        if (isStudent) redirect("/dashboard/students");
    }

    return <main className="p-0.5 antialiased">{children}</main>;
}