/**
 * Componente de tabla de cursos del estudiante.
 *
 * Muestra los cursos en los que el estudiante está inscrito,
 * incluyendo:
 * - Título del curso e instructor
 * - Barra de progreso visual
 * - Número de módulos y estado de inscripción
 * - Enlace para ver detalles del curso
 *
 * @component
 * @example
 * <CoursesTable />
 *
 * Dependencies:
 *     - @/components/ui/card: Componentes de tarjeta
 *     - next/link: Navegación a detalles del curso
 *     - @/lib/auth: Autenticación
 *     - @/lib/generated/prisma/client: Tipos de Prisma
 *     - ../../actions/students/get-student-data: Server action
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { auth } from "@/lib/auth"
import { getAllStudentData } from "../../actions/students/get-student-data"
import { EnrollmentStatus } from "@/lib/generated/prisma/client"

/**
 * Componente de tabla de cursos del estudiante.
 *
 * Página que muestra todos los cursos en los que el estudiante
 * está inscrito, con su progreso y estado.
 *
 * @returns {Promise<JSX.Element>} Tarjeta con lista de cursos
 */
export default async function CoursesTable() {
    // Obtiene la sesión del usuario para verificar autenticación
    const session = await auth()
    const userId = session?.user?.id

    // Si no hay usuario autenticado, muestra mensaje
    // NOTE: En producción, esto debería redirigir al login
    if (!userId) {
        return (
            <Card>
                <CardContent className="pt-6">
                    <p className="text-muted-foreground">No autenticado</p>
                </CardContent>
            </Card>
        )
    }

    // Obtiene datos del estudiante para acceder a sus inscripciones
    const allStudentData = await getAllStudentData(userId)
    const enrollments = allStudentData?.student?.enrollments || []

    /**
     * Calcula el progreso de un curso específico.
     *
     * Itera sobre todos los módulos y lecciones para contar
     * el total de lecciones, y compara con las completadas.
     *
     * @param enrollment - Inscripción del estudiante
     * @returns Objeto con total, completadas y porcentaje
     */
    const getCourseProgress = (enrollment: typeof enrollments[0]) => {
        // Suma todas las lecciones de todos los módulos
        const totalLessons = enrollment.course.modules.reduce(
            (acc, mod) => acc + mod.lessons.length,
            0
        )
        // Filtra las lecciones que tienen progreso completado
        const completedLessons = enrollment.progress.filter(
            (p) => p.isCompleted
        ).length

        return {
            total: totalLessons,
            completed: completedLessons,
            // Evita división por cero con operador ternario
            percentage:
                totalLessons > 0
                    ? Math.round((completedLessons / totalLessons) * 100)
                    : 0,
        }
    }

    /**
     * Convierte el estado de enumeración a texto legible.
     *
     * @param status - Estado de la inscripción
     * @returns Etiqueta en español del estado
     */
    const getStatusLabel = (status: EnrollmentStatus) => {
        switch (status) {
            case "COMPLETED":
                return "Completado"
            case "ACTIVE":
                return "En progreso"
            case "CANCELLED":
                return "Cancelado"
            default:
                return status
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Mis Cursos</CardTitle>
            </CardHeader>

            <CardContent>
                <div className="space-y-4">
                    {enrollments.length === 0 && (
                        <p className="text-muted-foreground">
                            No estás inscrito en ningún curso aún
                        </p>
                    )}

                    {enrollments.map((enrollment) => {
                        const progress = getCourseProgress(enrollment)
                        const course = enrollment.course

                        return (
                            <div
                                key={enrollment.id}
                                className="flex items-center justify-between border rounded-md p-4"
                            >
                                <div className="flex-1">
                                    <h3 className="font-semibold">
                                        {course.title}
                                    </h3>

                                    <p className="text-sm text-muted-foreground">
                                        Instructor: {course.owner.name}
                                    </p>

                                    <div className="flex items-center gap-2 mt-2">
                                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-green-500 transition-all"
                                                style={{
                                                    width: `${progress.percentage}%`,
                                                }}
                                            />
                                        </div>
                                        <span className="text-xs text-muted-foreground">
                                            {progress.completed}/{progress.total} (
                                            {progress.percentage}%)
                                        </span>
                                    </div>

                                    <Link
                                        href={`/dashboard/courses/${course.id}`}
                                        className="inline-block mt-2"
                                    >
                                        <Button variant="outline" size="sm">
                                            Ver
                                        </Button>
                                    </Link>
                                </div>

                                <div className="text-sm text-right ml-4">
                                    <p>{course.modules.length} módulos</p>
                                    <p
                                        className={
                                            enrollment.status === "COMPLETED"
                                                ? "text-green-600"
                                                : "text-muted-foreground"
                                        }
                                    >
                                        {getStatusLabel(enrollment.status)}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
}