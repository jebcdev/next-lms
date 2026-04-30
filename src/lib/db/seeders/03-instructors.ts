import { auth } from "@/lib/auth/auth";
import { prismaDB } from "@/lib/db/prismaDB";

export const seedInstructors = async () => {
    try {
        // Limpiar solo datos de instructors — sin tocar admins ni students
        await prismaDB.lessonProgress.deleteMany({
            where: { enrollment: { user: { role: "INSTRUCTOR" } } },
        });
        await prismaDB.enrollment.deleteMany({
            where: { user: { role: "INSTRUCTOR" } },
        });
        await prismaDB.lesson.deleteMany({
            where: { module: { course: { user: { role: "INSTRUCTOR" } } } },
        });
        await prismaDB.module.deleteMany({
            where: { course: { user: { role: "INSTRUCTOR" } } },
        });
        await prismaDB.categoriesOnCourses.deleteMany({
            where: { course: { user: { role: "INSTRUCTOR" } } },
        });
        await prismaDB.course.deleteMany({
            where: { user: { role: "INSTRUCTOR" } },
        });
        await prismaDB.session.deleteMany({
            where: { user: { role: "INSTRUCTOR" } },
        });
        await prismaDB.account.deleteMany({
            where: { user: { role: "INSTRUCTOR" } },
        });
        await prismaDB.user.deleteMany({
            where: { role: "INSTRUCTOR" },
        });

        console.log("🗑️  Cleaned existing instructors data...");
        console.log("👨‍🏫 Seeding 10 instructors...");

        // Tomar el primer tenant activo para vincular los instructors
        const tenant = await prismaDB.tenant.findFirst({
            where: { isActive: true },
        });

        if (!tenant) {
            throw new Error(
                "❌ No hay tenants disponibles. Corre 01-users-tenant.ts primero.",
            );
        }

        const instructors = [];

        for (let i = 1; i <= 10; i++) {
            // signUpEmail crea User + Account (con password hasheada) en Better Auth
            const instructor = await auth.api.signUpEmail({
                body: {
                    name: `Instructor ${i}`,
                    email: `instructor${i}@test.com`,
                    password: "123456789",
                },
            });

            // Actualizar campos extra que Better Auth no maneja
            await prismaDB.user.update({
                where: { id: instructor.user.id },
                data: {
                    role: "INSTRUCTOR",
                    isActive: true,
                    tenantId: tenant.id,
                },
            });

            instructors.push(instructor);
            console.log(
                `✅ Created instructor${i}@test.com → tenant: ${tenant.slug}`,
            );
        }

        console.log("✅ 10 instructors seeded successfully!");
        console.log(`   Tenant: ${tenant.slug}`);
        console.log(`   Password: 123456789 (todos)`);

        return { instructors, tenant };
    } catch (error) {
        console.error("❌ Error seeding instructors:", error);
        throw error;
    }
};