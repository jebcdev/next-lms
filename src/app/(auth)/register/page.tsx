import type { Metadata } from "next";
import {
    generateAsyncTitle,
    generateAsyncDescription,
} from "@/lib/seo";
import { AuthRegisterGrid } from "@/features/auth/components/auth-grids";

import Link from "next/link";
import {getActiveTenants} from "@/features/shared/actions/tenants/getActiveTenants"
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: await generateAsyncTitle("Registrarse"),
        description: await generateAsyncDescription(
            "Crea una cuenta para acceder a tu formación online y disfrutar de todas las funcionalidades de nuestro LMS.",
        ),
    };
}

export default async function RegisterPage() {
    
const activeTenantsResponse = await getActiveTenants();
const tenants = activeTenantsResponse.data?.map(t => ({ id: t.id, name: t.name })) ?? [];

    return (
        <>
            <section>
                <AuthRegisterGrid tenants={tenants} />
            </section>
            <section className="mt-10">
                <p className="text-center text-sm">
                    ¿Ya tienes una cuenta?{" "}
                    <Link
                        href="/login"
                        className="font-medium text-primary hover:underline"
                    >
                        Inicia sesión
                    </Link>
                </p>
            </section>
        </>
    );
}