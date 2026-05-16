import prisma from "@/lib/prisma"
import { getTenantId } from "@/lib/getTenant"
import ModulesList from "./components/ModulesList"


export default async function CourseDetailPage({
  params,
}: {
  params: { courseId: string }
}) {

  const tenantId = await getTenantId()

  const course = await prisma.course.findFirst({
    where: {
      id: params.courseId,
      tenantId,
    },
    include: {
      modules: {
        orderBy: { position: "asc" },
        include: {
          lessons: {
            orderBy: { position: "asc" },
          },
        },
      },
    },
  })

  if (!course) {
    return <div>Curso no encontrado</div>
  }

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">{course.title}</h1>
        <p className="text-muted-foreground">
          Administra módulos y lecciones
        </p>
      </div>

      <ModulesList course={course} />

    </div>
  )
}