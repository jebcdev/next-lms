"use server";


import prisma from "@/lib/prisma";

export const allSeed = async () => {
    try {

        const defaultTenant =await prisma.tenant.create({
            data: {
                name: "Default Tenant",
                slug: "default-tenant",
                logo: null,
                plan: "FREE",
                isActive: true
            },
        })

        if (!defaultTenant) {
            console.error("Failed to create default tenant")
            return;
        }

        return console.log("Default tenant created successfully:", defaultTenant);
        
    } catch (error) {
        console.error("=== SEED TENANTS ERROR DETAILS ===")
        console.error("Error:", error)
        console.error("Error message:", error instanceof Error ? error.message : String(error))
        console.error("Error stack:", error instanceof Error ? error.stack : "No stack trace")
        console.error("===========================")
        throw error; // Re-throw the error after logging
    }
}