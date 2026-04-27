"use server";

import { seedTenants } from "./01-users-tenant";

const main = async () => {
    console.log("🌱 Starting seed...");

    await seedTenants();

    console.log("✅ Seed completed!");
};

main().catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
});
