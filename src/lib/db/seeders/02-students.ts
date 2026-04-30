import { auth } from "@/lib/auth/auth";
import { prismaDB } from "@/lib/db/prismaDB";

export const seedStudents = async () => {
    try {
        // Limpiar solo datos de estudiantes — sin tocar admins ni instructors
        await prismaDB.lessonProgress.deleteMany({
            where: { enrollment: { user: { role: "STUDENT" } } },
        });
        await prismaDB.enrollment.deleteMany({
            where: { user: { role: "STUDENT" } },
        });
        await prismaDB.session.deleteMany({
            where: { user: { role: "STUDENT" } },
        });
        await prismaDB.account.deleteMany({
            where: { user: { role: "STUDENT" } },
        });
        await prismaDB.user.deleteMany({
            where: { role: "STUDENT" },
        });

        console.log("🗑️  Cleaned existing students data...");
        console.log("👨‍🎓 Seeding 10 students...");

        // Tomar el primer tenant activo para vincular los estudiantes
        const tenant = await prismaDB.tenant.findFirst({
            where: { isActive: true },
        });

        if (!tenant) {
            throw new Error(
                "❌ No hay tenants disponibles. Corre 01-users-tenant.ts primero.",
            );
        }

        const students = [];

        for (let i = 1; i <= 10; i++) {
            // signUpEmail crea User + Account (con password hasheada) en Better Auth
            const student = await auth.api.signUpEmail({
                body: {
                    name: `Student ${i}`,
                    email: `student${i}@test.com`,
                    password: "123456789",
                },
            });

            // Actualizar campos extra que Better Auth no maneja
            await prismaDB.user.update({
                where: { id: student.user.id },
                data: {
                    role: "STUDENT",
                    isActive: true,
                    tenantId: tenant.id,
                },
            });

            students.push(student);
            console.log(`✅ Created student${i}@test.com → tenant: ${tenant.slug}`);
        }

        console.log("✅ 10 students seeded successfully!");
        console.log(`   Tenant: ${tenant.slug}`);
        console.log(`   Password: 123456789 (todos)`);

        return { students, tenant };
    } catch (error) {
        console.error("❌ Error seeding students:", error);
        throw error;
    }
};