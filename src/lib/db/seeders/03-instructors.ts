import { auth } from "@/lib/auth/auth";
import { prismaDB } from "@/lib/db/prismaDB";

export const seedInstructors = async () => {
    try {
        // Limpiar en orden por dependencias
        await prismaDB.lessonProgress.deleteMany({});
        await prismaDB.enrollment.deleteMany({});
        await prismaDB.lesson.deleteMany({});
        await prismaDB.module.deleteMany({});
        await prismaDB.categoriesOnCourses.deleteMany({});
        await prismaDB.course.deleteMany({});
        await prismaDB.session.deleteMany({});
        await prismaDB.account.deleteMany({});
        await prismaDB.verification.deleteMany({});
        await prismaDB.user.deleteMany({
            where: { role: "INSTRUCTOR" },
        });

        console.log("🗑️  Cleaned existing instructors data...");
        console.log("👨‍🏫 Seeding 10 instructors...");

        const instructors = [];

        for (let i = 1; i <= 10; i++) {
            const instructor = await auth.api.signUpEmail({
                body: {
                    name: `Instructor ${i}`,
                    email: `instructor${i}@test.com`,
                    password: "123456789",
                },
            });

            await prismaDB.user.update({
                where: { id: instructor.user.id },
                data: {
                    role: "INSTRUCTOR",
                    isActive: true,
                },
            });

            instructors.push(instructor);
            console.log(`✅ Created instructor${i}@test.com`);
        }

        console.log("✅ 10 instructors seeded successfully!");
        console.log(`   Password: 123456789 (same for all)`);

        return { instructors };
    } catch (error) {
        console.error("❌ Error seeding instructors:", error);
        throw error;
    }
};