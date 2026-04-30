"use client";
import {
    GeneralGrid,
} from "@/features/shared/components/ui";
import { SuperAdminTenantCard } from "@/features/super-admin/components/tenants";
import { TenantWithCounts } from "@/features/super-admin/types";
import { Plus } from "lucide-react";

interface Props {
    tenants: TenantWithCounts[];
}

export function SuperAdminTenantsClient({ tenants }: Props) {
    return (
        <GeneralGrid<TenantWithCounts>
            items={tenants}
            searchFields={["name", "slug","plan"]}
            searchPlaceholder="Buscar tenants..."
            title="Tenants"
            subtitle="Gestiona todos los tenants de la plataforma"
            loadingMessage="Cargando tenants..."
            headerAction={{
                icon: <Plus className="h-4 w-4" />,
                text: "Nuevo Tenant",
                link: "/super-admin/tenants/new",
            }}
            gridCols="sm:grid-cols-2 lg:grid-cols-3"
            renderCard={(tenant) => (
                <SuperAdminTenantCard tenant={tenant} />
            )}
            emptyTitle="No se encontraron tenants"
            emptyDescription="Intenta con otros términos de búsqueda"
        />
    );
}
