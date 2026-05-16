/**
 * Server action para obtener datos consolidados de un estudiante.
 *
 * Recupera toda la información del estudiante incluyendo:
 * - Datos básicos del usuario y tenant
 * - Cursos inscritos con progreso detallado
 * - Estadísticas de inscripción y completación
 *
 * Uses:
 *     - Prisma ORM para consultas a la base de datos
 *     - Promise.all para ejecutar queries en paralelo
 *
 * Dependencies:
 *     - @/lib/prisma: Cliente de Prisma
 *     - ../../types/all-student-data.interface: Tipo de retorno
 *
 * Returns:
 *     Objeto con student (datos completos) y stats (estadísticas calculadas)
 *
 * Note:
 *     La query es compleja debido a la profundidad de las relaciones.
 *     Considerar caché o paginación si el estudiante tiene muchos cursos.
 */

"use server";

import prisma from "@/lib/prisma";
import { AllStudentData } from "../../types/all-student-data.interface";

/**
 * Obtiene todos los datos de un estudiante para el dashboard.
 *
 * Realiza múltiples consultas:
 * 1. Datos del usuario con enrollments, cursos, módulos, lecciones y progreso
 * 2. Conteo de cursos inscritos
 *     3. Conteo de cursos completados
 *     4. Conteo de cursos en progreso
 *     5. Conteo de lecciones completadas
 *     6. Conteo total de lecciones intentadas
 *
 * @param studentId - ID del estudiante a consultar
 * @returns {Promise<AllStudentData>} Datos completos del estudiante
 * @throws {Error} Si falla la consulta a la base de datos
 *
 * @example
 * const data = await getAllStudentData("user-123");
 * console.log(data.stats.completionRate); // 75
 */
export const getAllStudentData = async (
    studentId: string,
): Promise<AllStudentData> => {
    try {
        const student = await prisma.user.findUnique({
            where: { id: studentId },
            include: {
                tenant: true,
                enrollments: {
                    include: {
                        course: {
                            include: {
                                owner: {
                                    select: {
                                        id: true,
                                        name: true,
                                        email: true,
                                        image: true,
                                    },
                                },
                                categories: {
                                    include: {
                                        category: true,
                                    },
                                },
                                modules: {
                                    orderBy: { position: "asc" },
                                    include: {
                                        lessons: {
                                            orderBy: {
                                                position: "asc",
                                            },
                                            include: {
                                                progress: {
                                                    where: {
                                                        enrollment: {
                                                            userId: studentId,
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        progress: true,
                    },
                },
            },
        });

        const [
            totalEnrolledCourses,
            completedCourses,
            inProgressCourses,
            totalLessonsCompleted,
            totalLessonsAttempted,
        ] = await Promise.all([
            prisma.enrollment.count({
                where: { userId: studentId },
            }),
            prisma.enrollment.count({
                where: { userId: studentId, status: "COMPLETED" },
            }),
            prisma.enrollment.count({
                where: { userId: studentId, status: "ACTIVE" },
            }),
            prisma.lessonProgress.count({
                where: {
                    enrollment: { userId: studentId },
                    isCompleted: true,
                },
            }),
            prisma.lessonProgress.count({
                where: {
                    enrollment: { userId: studentId },
                },
            }),
        ]);

        return {
            student,
            stats: {
                totalEnrolledCourses,
                completedCourses,
                inProgressCourses,
                totalLessonsCompleted,
                totalLessonsAttempted,
                completionRate:
                    totalLessonsAttempted > 0
                        ? Math.round(
                              (totalLessonsCompleted /
                                  totalLessonsAttempted) *
                                  100,
                          )
                        : 0,
            },
        };
    } catch (error) {
        console.error("Error fetching student data:", error);
        throw new Error("Failed to fetch student data");
    }
};
