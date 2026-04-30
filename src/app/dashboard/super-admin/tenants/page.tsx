"use server";
import { getSessionDetails } from "@/lib/auth/session-details";
import { getAllTenantsSuperAdmin } from "@/features/super-admin/actions";
import { SuperAdminTenantsClient } from "@/features/super-admin/components/tenants/";

export default async function SuperAdminsTenantsPage() {
    await getSessionDetails();
    const tenantsResponse = await getAllTenantsSuperAdmin();

    return (
        <SuperAdminTenantsClient
            tenants={tenantsResponse.data ?? []}
        />
    );
}
