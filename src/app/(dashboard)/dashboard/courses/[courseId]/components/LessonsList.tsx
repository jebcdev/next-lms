import CreateLessonForm from "./CreateLessonForm"

export default function LessonsList({ module }: any) {
  return (
    <div className="space-y-3 ml-4">

      {/* <CreateLessonForm moduleId={module.id} /> */}

      {module.lessons.map((lesson: any) => (
        <div
          key={lesson.id}
          className="text-sm border p-2 rounded-md"
        >
          {lesson.title}
        </div>
      ))}

    </div>
  )
}