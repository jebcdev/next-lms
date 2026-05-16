/**
 * Módulo de seed para populate de la base de datos de NextLMS.
 *
 * Este script inicializa la base de datos con datos de demostración:
 * - Tenant por defecto (Instituto Digital)
 * - Categorías de cursos
 * - Usuarios de prueba (instructor y estudiantes)
 * - Cursos con módulos y lecciones
 * - Inscripciones y progreso de lecciones
 *
 * Usage:
 *     npm run seed
 *
 * Dependencies:
 *     - @prisma/client
 *     - @prisma/adapter-pg
 *     - bcryptjs
 *
 * Author: Sistema NextLMS
 * Created: 2024-01-01
 * Last Modified: 2024-01-15
 */

import {
    PrismaClient,
    Role,
    Plan,
    LessonType,
    EnrollmentStatus,
} from "../src/lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { hash } from "bcryptjs";

/**
 * Adaptador de Prisma para PostgreSQL.
 * Necesario para conexión con neon.tech (serverless Postgres).
 */
const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

/**
 * Instancia global del cliente de Prisma.
 * Se reutiliza para evitar múltiples conexiones durante el seed.
 */
const prisma = new PrismaClient({
    adapter,
});

/**
 * Función principal que ejecuta el populate de datos.
 *
 * Proceso:
 * 1. Limpia todas las tablas existentes (orden inverse a FKs)
 * 2. Crea tenant por defecto
 * 3. Crea categorías de cursos
 * 4. Crea usuarios (instructor + estudiantes)
 * 5. Crea cursos con módulos y lecciones
 * 6. Crea inscripciones
 * 7. Registra progreso de lecciones
 *
 * @throws Error si falla la conexión o algún create
 */
async function main() {
    console.log("🌱 Iniciando seed...");

    await prisma.lessonProgress.deleteMany();
    await prisma.enrollment.deleteMany();
    await prisma.lesson.deleteMany();
    await prisma.module.deleteMany();
    await prisma.categoriesOnCourses.deleteMany();
    await prisma.course.deleteMany();
    await prisma.category.deleteMany();
    await prisma.session.deleteMany();
    await prisma.account.deleteMany();
    await prisma.verificationToken.deleteMany();
    await prisma.user.deleteMany();
    await prisma.tenant.deleteMany();

    const hashedPassword = await hash("password123", 12);

    const tenant = await prisma.tenant.create({
        data: {
            name: "Instituto Digital",
            slug: "instituto-digital",
            plan: Plan.PRO,
            isActive: true,
        },
    });

    const categories = await Promise.all([
        prisma.category.create({ data: { name: "Programación", slug: "programacion" } }),
        prisma.category.create({ data: { name: "Bases de Datos", slug: "bases-de-datos" } }),
        prisma.category.create({ data: { name: "DevOps", slug: "devops" } }),
    ]);

    const instructor = await prisma.user.create({
        data: {
            email: "instructor@instituto.com",
            name: "Carlos Mendoza",
            password: hashedPassword,
            role: Role.INSTRUCTOR,
            tenantId: tenant.id,
            emailVerified: new Date(),
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=carlos",
        },
    });

    const student1 = await prisma.user.create({
        data: {
            email: "ana@estudiante.com",
            name: "Ana López",
            password: hashedPassword,
            role: Role.STUDENT,
            tenantId: tenant.id,
            emailVerified: new Date(),
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=ana",
        },
    });

    const student2 = await prisma.user.create({
        data: {
            email: "luis@estudiante.com",
            name: "Luis Martínez",
            password: hashedPassword,
            role: Role.STUDENT,
            tenantId: tenant.id,
            emailVerified: new Date(),
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=luis",
        },
    });

    await prisma.user.create({
        data: {
            email: "admin@instituto.com",
            name: "Admin Instituto",
            password: hashedPassword,
            role: Role.ADMIN,
            tenantId: tenant.id,
            emailVerified: new Date(),
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
        },
    });

    await prisma.user.create({
        data: {
            email: "superadmin@nextlms.com",
            name: "Super Admin",
            password: hashedPassword,
            role: Role.SUPER_ADMIN,
            emailVerified: new Date(),
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=superadmin",
        },
    });

    const courseJs = await prisma.course.create({
        data: {
            title: "JavaScript Moderno",
            slug: "javascript-moderno",
            description: "Domina JavaScript ES6+ y características modernas",
            thumbnail: "/courses/js.jpg",
            price: 39.99,
            isPublished: true,
            isFree: false,
            tenantId: tenant.id,
            ownerId: instructor.id,
            categories: { create: [{ categoryId: categories[0].id }] },
            modules: {
                create: [
                    {
                        title: "Fundamentos",
                        position: 1,
                        lessons: {
                            create: [
                                { title: "Variables y Tipos", content: "var, let, const...", position: 1, type: LessonType.TEXT, isFree: true, isPublished: true },
                                { title: "Operadores", content: "Aritméticos, lógicos...", position: 2, type: LessonType.TEXT, isPublished: true },
                                { title: "Funciones", content: "Arrow functions, callbacks...", position: 3, type: LessonType.TEXT, isPublished: true },
                                { title: "Quiz Fundamentos", content: "{}", position: 4, type: LessonType.QUIZ, isPublished: true },
                            ],
                        },
                    },
                    {
                        title: "Arrays y Objetos",
                        position: 2,
                        lessons: {
                            create: [
                                { title: "Métodos de Arrays", content: "map, filter, reduce...", position: 1, type: LessonType.TEXT, isPublished: true },
                                { title: "Destructuring", content: "Desestructuración...", position: 2, type: LessonType.TEXT, isPublished: true },
                                { title: "Spread Operator", content: "...spread", position: 3, type: LessonType.TEXT, isPublished: true },
                            ],
                        },
                    },
                    {
                        title: "Async JavaScript",
                        position: 3,
                        lessons: {
                            create: [
                                { title: "Promises", content: "Promesas...", position: 1, type: LessonType.TEXT, isPublished: true },
                                { title: "Async/Await", content: "async await...", position: 2, type: LessonType.VIDEO, videoUrl: "https://youtube.com/watch?v=ex", isPublished: true },
                                { title: "Fetch API", content: "Consumo de APIs...", position: 3, type: LessonType.TEXT, isPublished: true },
                            ],
                        },
                    },
                ],
            },
        },
    });

    const courseReact = await prisma.course.create({
        data: {
            title: "React desde Cero",
            slug: "react-desde-cero",
            description: "Aprende React hooks y componentes",
            thumbnail: "/courses/react.jpg",
            isPublished: true,
            isFree: true,
            tenantId: tenant.id,
            ownerId: instructor.id,
            categories: { create: [{ categoryId: categories[0].id }] },
            modules: {
                create: [
                    {
                        title: "Introducción",
                        position: 1,
                        lessons: {
                            create: [
                                { title: "Qué es React", content: "Introducción...", position: 1, type: LessonType.TEXT, isFree: true, isPublished: true },
                                { title: "JSX", content: "JSX syntax...", position: 2, type: LessonType.TEXT, isFree: true, isPublished: true },
                            ],
                        },
                    },
                    {
                        title: "Hooks",
                        position: 2,
                        lessons: {
                            create: [
                                { title: "useState", content: "Estado con useState...", position: 1, type: LessonType.TEXT, isPublished: true },
                                { title: "useEffect", content: "Efectos...", position: 2, type: LessonType.TEXT, isPublished: true },
                                { title: "useContext", content: "Contexto...", position: 3, type: LessonType.TEXT, isPublished: true },
                            ],
                        },
                    },
                ],
            },
        },
    });

    const coursePostgres = await prisma.course.create({
        data: {
            title: "PostgreSQL Avanzado",
            slug: "postgresql-avanzado",
            description: "Consultas avanzadas y optimización",
            thumbnail: "/courses/postgres.jpg",
            price: 49.99,
            isPublished: true,
            isFree: false,
            tenantId: tenant.id,
            ownerId: instructor.id,
            categories: { create: [{ categoryId: categories[1].id }] },
            modules: {
                create: [
                    {
                        title: "Consultas Avanzadas",
                        position: 1,
                        lessons: {
                            create: [
                                { title: "JOINs", content: "Inner, left, right joins...", position: 1, type: LessonType.TEXT, isFree: true, isPublished: true },
                                { title: "Subqueries", content: "Subconsultas...", position: 2, type: LessonType.TEXT, isPublished: true },
                                { title: "CTEs", content: "Common Table Expressions...", position: 3, type: LessonType.TEXT, isPublished: true },
                            ],
                        },
                    },
                    {
                        title: "Rendimiento",
                        position: 2,
                        lessons: {
                            create: [
                                { title: "Índices", content: "B-tree, GIN...", position: 1, type: LessonType.TEXT, isPublished: true },
                                { title: "EXPLAIN", content: "Análisis de consultas...", position: 2, type: LessonType.TEXT, isPublished: true },
                            ],
                        },
                    },
                ],
            },
        },
    });

    const courseDocker = await prisma.course.create({
        data: {
            title: "Docker para Desarrolladores",
            slug: "docker-desarrolladores",
            description: "Contenedores desde cero",
            thumbnail: "/courses/docker.jpg",
            price: 29.99,
            isPublished: true,
            isFree: false,
            tenantId: tenant.id,
            ownerId: instructor.id,
            categories: { create: [{ categoryId: categories[2].id }] },
            modules: {
                create: [
                    {
                        title: "Conceptos",
                        position: 1,
                        lessons: {
                            create: [
                                { title: "Qué es Docker", content: "Introducción...", position: 1, type: LessonType.TEXT, isFree: true, isPublished: true },
                                { title: "Imágenes y Contenedores", content: "Imágenes...", position: 2, type: LessonType.TEXT, isPublished: true },
                            ],
                        },
                    },
                ],
            },
        },
    });

    const enrollment1 = await prisma.enrollment.create({
        data: { userId: student1.id, courseId: courseJs.id, status: EnrollmentStatus.ACTIVE },
    });
    const enrollment2 = await prisma.enrollment.create({
        data: { userId: student1.id, courseId: courseReact.id, status: EnrollmentStatus.ACTIVE },
    });
    const enrollment3 = await prisma.enrollment.create({
        data: { userId: student2.id, courseId: courseJs.id, status: EnrollmentStatus.ACTIVE },
    });
    const enrollment4 = await prisma.enrollment.create({
        data: { userId: student2.id, courseId: coursePostgres.id, status: EnrollmentStatus.ACTIVE },
    });

    const jsLessons = await prisma.lesson.findMany({
        where: { module: { courseId: courseJs.id } },
        orderBy: { position: "asc" },
    });
    const reactLessons = await prisma.lesson.findMany({
        where: { module: { courseId: courseReact.id } },
        orderBy: { position: "asc" },
    });
    const postgresLessons = await prisma.lesson.findMany({
        where: { module: { courseId: coursePostgres.id } },
        orderBy: { position: "asc" },
    });

    for (let i = 0; i < 3; i++) {
        await prisma.lessonProgress.create({
            data: { enrollmentId: enrollment1.id, lessonId: jsLessons[i].id, isCompleted: true, completedAt: new Date() },
        });
    }
    for (let i = 0; i < 1; i++) {
        await prisma.lessonProgress.create({
            data: { enrollmentId: enrollment1.id, lessonId: reactLessons[i].id, isCompleted: true, completedAt: new Date() },
        });
    }

    await prisma.lessonProgress.create({
        data: { enrollmentId: enrollment3.id, lessonId: jsLessons[0].id, isCompleted: true, completedAt: new Date() },
    });
    for (let i = 0; i < 2; i++) {
        await prisma.lessonProgress.create({
            data: { enrollmentId: enrollment4.id, lessonId: postgresLessons[i].id, isCompleted: true, completedAt: new Date() },
        });
    }

    console.log("✅ Seed completado");
    console.log("   Super Admin: superadmin@nextlms.com");
    console.log("   Admin: admin@instituto.com");
    console.log("   Instructor: instructor@instituto.com");
    console.log("   Estudiante 1: ana@estudiante.com");
    console.log("   - JavaScript: 3/10 lecciones completadas");
    console.log("   - React: 1/5 lecciones completadas");
    console.log("   Estudiante 2: luis@estudiante.com");
    console.log("   - JavaScript: 1/10 lecciones completadas");
    console.log("   - PostgreSQL: 2/5 lecciones completadas");
    console.log("   Password: password123");
}

main()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(async () => { await prisma.$disconnect(); });