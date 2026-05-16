import CreateModuleForm from "./CreateModuleForm"
import LessonsList from "./LessonsList"

export default function ModulesList({ course }: any) {
  return (
    <div className="space-y-6">

      {/* <CreateModuleForm courseId={course.id} /> */}

      {course.modules.map((module: any) => (
        <div key={module.id} className="border rounded-md p-4">

          <h2 className="font-semibold mb-2">
            {module.title}
          </h2>

          <LessonsList module={module} />

        </div>
      ))}

    </div>
  )
}