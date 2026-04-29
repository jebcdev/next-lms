import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
    generateAsyncTitle,
    generateAsyncDescription,
} from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: await generateAsyncTitle("Autenticación"),
        description: await generateAsyncDescription(
            "Por favor, inicia sesión o regístrate para acceder a tu cuenta y disfrutar de todas las funcionalidades de nuestro LMS.",
        ),
    };
}

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="min-h-screen w-full flex flex-col items-center pt-12 sm:pt-16 px-4">
            <Link href="/" className="mb-8 sm:mb-10 hover:opacity-80 transition-opacity">
                <Image
                    src="/logo.png"
                    alt="Logo"
                    width={280}
                    height={100}
                    className="object-contain h-20 sm:h-24 w-auto"
                    priority
                />
            </Link>
            <div className="w-full max-w-md">
                {children}
            </div>
        </main>
    );
}