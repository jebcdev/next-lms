/**
 * Componente de tarjetas de estadísticas para estudiantes.
 *
 * Muestra el progreso del estudiante en el dashboard:
 * - Cursos Inscritos
 * - Cursos Completados
 * - Cursos En Progreso
 * - Lecciones Completadas
 * - Tasa de Completado (%)
 *
 * @component
 * @example
 * <StudentStatsCard data={studentData} />
 *
 * Dependencies:
 *     - @/components/ui/card: Componentes de tarjeta
 *     - ../../types/all-student-data.interface: Tipo de datos
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AllStudentData } from "../../types/all-student-data.interface"

/**
 * Props del componente de estadísticas del estudiante.
 *
 * @interface
 * @property {AllStudentData} data - Datos consolidados del estudiante
 */
interface StudentStatsCardProps {
    data: AllStudentData
}

/**
 * Componente que renderiza las estadísticas del estudiante.
 *
 * Muestra 5 métricas importantes sobre el progreso académico
 * del estudiante en formato de tarjetas.
 *
 * @param {StudentStatsCardProps} props - Propiedades del componente
 * @returns {JSX.Element} Grid de tarjetas con estadísticas
 */
export function StudentStatsCard({ data }: StudentStatsCardProps) {
    const { stats } = data

    const statItems = [
        {
            title: "Cursos Inscritos",
            value: stats.totalEnrolledCourses,
        },
        {
            title: "Cursos Completados",
            value: stats.completedCourses,
        },
        {
            title: "En Progreso",
            value: stats.inProgressCourses,
        },
        {
            title: "Lecciones Completadas",
            value: stats.totalLessonsCompleted,
        },
        {
            title: "Tasa de Completado",
            value: `${stats.completionRate}%`,
        },
    ]

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {statItems.map((item) => (
                <Card key={item.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {item.title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{item.value}</div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}