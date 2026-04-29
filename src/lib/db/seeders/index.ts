"use server";

import { seedTenants } from "./01-users-tenant";
import { seedStudents } from "./02-students";
import { seedInstructors } from "./03-instructors";

const main = async () => {
    console.log("🌱 Starting seed...");

    await seedTenants();
    await seedStudents();
    await seedInstructors();

    console.log("✅ Seed completed!");
};

main().catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
});
