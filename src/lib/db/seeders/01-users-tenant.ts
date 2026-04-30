import { prismaDB } from "@/lib/db/prismaDB";
import { auth } from "@/lib/auth/auth";

export const seedTenants = async () => {
    try {
        // Limpiar en orden respetando dependencias y cascadas
        await prismaDB.lessonProgress.deleteMany({});
        await prismaDB.enrollment.deleteMany({});
        await prismaDB.lesson.deleteMany({});
        await prismaDB.module.deleteMany({});
        await prismaDB.categoriesOnCourses.deleteMany({});
        await prismaDB.course.deleteMany({});
        await prismaDB.session.deleteMany({});
        await prismaDB.account.deleteMany({});
        await prismaDB.verification.deleteMany({});
        await prismaDB.user.deleteMany({});
        await prismaDB.tenant.deleteMany({});

        console.log("🗑️  Cleaned existing data...");

        // 0. Super admin global — sin tenantId (gestiona toda la plataforma)
        const superAdmin = await auth.api.signUpEmail({
            body: {
                name: "Super Admin",
                email: "super@admin.com",
                password: "123456789",
            },
        });

        await prismaDB.user.update({
            where: { id: superAdmin.user.id },
            data: {
                role: "SUPER_ADMIN",
                isActive: true,
                // Sin tenantId — es global
            },
        });

        console.log("✅ Super admin created → super@admin.com");

        // 1. Crear tenants por plan
        const [freeTenant, starterTenant, proTenant, enterpriseTenant] =
            await Promise.all([
                prismaDB.tenant.create({
                    data: {
                        name: "Free Org",
                        slug: "free-org",
                        plan: "FREE",
                        isActive: true,
                    },
                }),
                prismaDB.tenant.create({
                    data: {
                        name: "Starter Org",
                        slug: "starter-org",
                        plan: "STARTER",
                        isActive: true,
                    },
                }),
                prismaDB.tenant.create({
                    data: {
                        name: "Pro Org",
                        slug: "pro-org",
                        plan: "PRO",
                        isActive: true,
                    },
                }),
                prismaDB.tenant.create({
                    data: {
                        name: "Enterprise Org",
                        slug: "enterprise-org",
                        plan: "ENTERPRISE",
                        isActive: true,
                    },
                }),
            ]);

        console.log("✅ Tenants created...");

        // 2. Crear admins via auth (esto crea User + Account en Better Auth)
        const [freeAdmin, starterAdmin, proAdmin, enterpriseAdmin] =
            await Promise.all([
                auth.api.signUpEmail({
                    body: {
                        name: "Admin Free",
                        email: "admin@free.com",
                        password: "123456789",
                    },
                }),
                auth.api.signUpEmail({
                    body: {
                        name: "Admin Starter",
                        email: "admin@starter.com",
                        password: "123456789",
                    },
                }),
                auth.api.signUpEmail({
                    body: {
                        name: "Admin Pro",
                        email: "admin@pro.com",
                        password: "123456789",
                    },
                }),
                auth.api.signUpEmail({
                    body: {
                        name: "Admin Enterprise",
                        email: "admin@enterprise.com",
                        password: "123456789",
                    },
                }),
            ]);

        console.log("✅ Admin users created, assigning roles and tenants...");

        // 3. Asignar rol ADMIN + vincular al tenant correspondiente
        await Promise.all([
            prismaDB.user.update({
                where: { id: freeAdmin.user.id },
                data: { role: "ADMIN", isActive: true, tenantId: freeTenant.id },
            }),
            prismaDB.user.update({
                where: { id: starterAdmin.user.id },
                data: { role: "ADMIN", isActive: true, tenantId: starterTenant.id },
            }),
            prismaDB.user.update({
                where: { id: proAdmin.user.id },
                data: { role: "ADMIN", isActive: true, tenantId: proTenant.id },
            }),
            prismaDB.user.update({
                where: { id: enterpriseAdmin.user.id },
                data: { role: "ADMIN", isActive: true, tenantId: enterpriseTenant.id },
            }),
        ]);

        console.log("✅ Tenants seeded successfully!");
        console.log(`   SUPER ADMIN → super@admin.com`);
        console.log(`   FREE        → ${freeTenant.slug} | admin@free.com`);
        console.log(`   STARTER     → ${starterTenant.slug} | admin@starter.com`);
        console.log(`   PRO         → ${proTenant.slug} | admin@pro.com`);
        console.log(`   ENTERPRISE  → ${enterpriseTenant.slug} | admin@enterprise.com`);
        console.log(`   Password: 123456789 (todos)`);

        return {
            tenants: [freeTenant, starterTenant, proTenant, enterpriseTenant],
            admins: [freeAdmin, starterAdmin, proAdmin, enterpriseAdmin],
            superAdmin,
        };
    } catch (error) {
        console.error("❌ Error seeding tenants:", error);
        throw error;
    }
};