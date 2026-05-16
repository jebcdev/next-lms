import { Plan, EnrollmentStatus, LessonType, Prisma } from "@/lib/generated/prisma/client";

export interface AllStudentData {
  student: {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
    role: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    tenant: {
      id: string;
      name: string;
      slug: string;
      logo: string | null;
      plan: Plan;
      isActive: boolean;
      createdAt: Date;
      updatedAt: Date;
    } | null;
    enrollments: {
      id: string;
      userId: string;
      courseId: string;
      status: EnrollmentStatus;
      createdAt: Date;
      updatedAt: Date;
      progress: {
        id: string;
        isCompleted: boolean;
        completedAt: Date | null;
        enrollmentId: string;
        lessonId: string;
        createdAt: Date;
        updatedAt: Date;
      }[];
      course: {
        id: string;
        title: string;
        slug: string;
        description: string | null;
        thumbnail: string | null;  // ← era image, es thumbnail
        price: Prisma.Decimal | null;
        isFree: boolean;
        isPublished: boolean;
        tenantId: string;
        ownerId: string;
        createdAt: Date;
        updatedAt: Date;
        owner: {
          id: string;
          name: string | null;
          email: string | null;
          image: string | null;
        };
        modules: {
          id: string;
          title: string;
          position: number;
          courseId: string;
          createdAt: Date;
          updatedAt: Date;
          lessons: {
            id: string;
            title: string;
            position: number;
            content: string | null;
            videoUrl: string | null;
            type: LessonType;
            isFree: boolean;
            isPublished: boolean;
            moduleId: string;
            createdAt: Date;
            updatedAt: Date;
            progress: {
              id: string;
              isCompleted: boolean;
              completedAt: Date | null;
              enrollmentId: string;
              lessonId: string;
              createdAt: Date;
              updatedAt: Date;
            }[];
          }[];
        }[];
        categories: {
          courseId: string;
          categoryId: string;
          category: {
            id: string;
            name: string;
            slug: string;
          };
        }[];
      };
    }[];
  } | null;
  stats: {
    totalEnrolledCourses: number;
    completedCourses: number;
    inProgressCourses: number;
    totalLessonsCompleted: number;
    totalLessonsAttempted: number;
    completionRate: number;
  };
}