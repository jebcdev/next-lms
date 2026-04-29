import type { Metadata } from "next";
import {
    generateAsyncTitle,
    generateAsyncDescription,
} from "@/lib/seo";
import { AuthRegisterGrid } from "@/features/auth/components/auth-grids";
import { getTenantBySubdomain } from "@/features/shared/actions/tenants/getTenantBySubdomain";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: await generateAsyncTitle("Registrarse"),
        description: await generateAsyncDescription(
            "Crea una cuenta para acceder a tu formación online y disfrutar de todas las funcionalidades de nuestro LMS.",
        ),
    };
}

export default async function RegisterPage() {
    const tenantResponse = await getTenantBySubdomain();
    const tenantId = tenantResponse.data?.id || "";

    return (
        <>
            <section>
                <AuthRegisterGrid tenantId={tenantId} />
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