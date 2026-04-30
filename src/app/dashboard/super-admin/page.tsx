"use server";
import { getSessionDetails } from "@/lib/auth/session-details";
import { getAllTenantsSuperAdmin } from "@/features/super-admin/actions";
import { TenantsGrid } from "@/features/super-admin/components/tenants/";
export default async function SuperAdminsIndexPage() {
    const { fullUserDetails } = await getSessionDetails();
    const tenantsResponse = await getAllTenantsSuperAdmin();

    return (
        <>
            <section>
                <TenantsGrid tenants={tenantsResponse.data || []} />
            </section>
        </>
    );
}
