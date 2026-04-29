import { auth } from "@/lib/auth/auth";
import { prismaDB } from "@/lib/db/prismaDB";

export const seedStudents = async () => {
    try {
        // Limpiar en orden por dependencias
        await prismaDB.lessonProgress.deleteMany({});
        await prismaDB.enrollment.deleteMany({});
        await prismaDB.session.deleteMany({});
        await prismaDB.account.deleteMany({});
        await prismaDB.verification.deleteMany({});
        await prismaDB.user.deleteMany({
            where: { role: "STUDENT" },
        });

        console.log("🗑️  Cleaned existing students data...");
        console.log("👨‍🎓 Seeding 10 students...");

        const students = [];

        for (let i = 1; i <= 10; i++) {
            const student = await auth.api.signUpEmail({
                body: {
                    name: `Student ${i}`,
                    email: `student${i}@test.com`,
                    password: "123456789",
                },
            });

            await prismaDB.user.update({
                where: { id: student.user.id },
                data: {
                    role: "STUDENT",
                    isActive: true,
                },
            });

            students.push(student);
            console.log(`✅ Created student${i}@test.com`);
        }

        console.log("✅ 10 students seeded successfully!");
        console.log(`   Password: 123456789 (same for all)`);

        return { students };
    } catch (error) {
        console.error("❌ Error seeding students:", error);
        throw error;
    }
};