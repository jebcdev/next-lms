"use server";
import 'dotenv/config'  // ← primera línea, antes de todo
import { allSeed } from './all-seed';






const main = async () => {
    console.log("🌱 Starting seed...");

    await allSeed();

    console.log("✅ Seed completed!");
};

main().catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
});
