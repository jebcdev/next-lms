import type { Metadata } from "next";
import {
    generateAsyncTitle,
    generateAsyncDescription,
} from "@/lib/seo";
import { AuthLoginGrid } from "@/features/auth/components/auth-grids";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: await generateAsyncTitle("Login"),
        description: await generateAsyncDescription(
            "Por favor, inicia sesión para acceder a tu cuenta y disfrutar de todas las funcionalidades de nuestro LMS.",
        ),
    };
}

export default function LoginPage() {
    return (
        <>
            <section>
                <AuthLoginGrid />
            </section>
            <section className="mt-10">
                <p className="text-center text-sm">
                    ¿No tienes una cuenta?{" "}
                    <Link
                        href="/register"
                        className="font-medium text-primary hover:underline"
                    >
                        Regístrate
                    </Link>
                </p>
            </section>
        </>
    );
}
