/**
 * Página principal del dashboard de NextLMS.
 *
 * Renderiza contenido diferente según el role del usuario:
 * - ADMIN/SUPER_ADMIN: Métricas y estadísticas del tenant
 * - STUDENT: Tarjetas de progreso en cursos
 * - INSTRUCTOR: Solo actividad reciente
 *
 * Uses:
 *     - Server Actions para obtener datos del estudiante
 *     - Suspense para carga diferida de componentes
 *
 * Dependencies:
 *     - @/lib/auth: Función de autenticación
 *     - @/components/ui: Componentes de UI
 *     - ./components/Stats: Métricas del admin
 *     - ./components/RecentActivity: Actividad reciente
 *     - ./components/students/student-stats-card: Stats del estudiante
 *     - ./actions/students/get-student-data: Server action
 *
 * Route: /dashboard
 */

"use server"

import { auth } from "@/lib/auth";
import { Suspense } from "react";
import Stats from "./components/Stats";
import RecentActivity from "./components/RecentActivity";
import { StudentStatsCard } from "./components/students/student-stats-card";
import { getAllStudentData } from "./actions/students/get-student-data";

/**
 * Página principal del dashboard.
 *
 * Obtiene la sesión del usuario y renderiza componentes
 * condicionalmente según el role:
 * - Admin: Stats + RecentActivity
 * - Student: StudentStatsCard + RecentActivity
 * - Instructor: Solo RecentActivity
 *
 * @returns {Promise<JSX.Element>} Página del dashboard
 */
export default async function DashboardPage() {
    // Obtiene la sesión autenticada del usuario
    const session = await auth();

    // Verifica permisos de administrador para mostrar métricas
    const isAdmin =
        session?.user?.role === "ADMIN" ||
        session?.user?.role === "SUPER_ADMIN";

    // Verifica si el usuario es estudiante para mostrar su progreso
    const isStudent = session?.user?.role === "STUDENT";

    // Obtiene todos los datos del estudiante (cursos, progreso, stats)
    // NOTE: Se ejecuta siempre para mantener consistencia, aunque solo se usa para STUDENT
    const allStudentData=await getAllStudentData(session?.user?.id||"");

    // Valida que el usuario tenga un tenant asignado
    // HACK: Error genérico, mejorar para mostrar mensaje más específico
    if (!session?.user?.tenantId) {
        throw new Error("Usuario sin tenant asignado");
    }

    // Extrae el ID del tenant del usuario para las queries
    const tenantId = session.user.tenantId;

    return (
        <div className="space-y-6">
            {/* HEADER */}
            <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground">
                    Resumen general de NextLMS
                </p>
            </div>

            {isAdmin && (
                <>
                    {/* STATS con Suspense */}
                    <Suspense
                        fallback={<div>Cargando métricas...</div>}
                    >
                        <Stats tenantId={tenantId} />
                    </Suspense>
                </>
            )}

            {isStudent && (
                <>
                    <Suspense
                        fallback={<div>Cargando actividad...</div>}
                    >
                      {
                        allStudentData && (

                          <StudentStatsCard data={allStudentData} />
                        )
                      }
                    </Suspense>
                </>
            )}

            {/* ACTIVIDAD con Suspense */}
            <Suspense fallback={<div>Cargando actividad...</div>}>
                <RecentActivity tenantId={tenantId} />
            </Suspense>
        </div>
    );
}
