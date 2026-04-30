"use server";

interface Props {
    params: Promise<{ tenantSlug: string }>;
}

export default async function TenantBySlugPage({
    params,
}: Props) {
    const { tenantSlug } = await params;
    return (
        <>
            <main>
                <h1>{tenantSlug}</h1>
            </main>
        </>
    );
}
