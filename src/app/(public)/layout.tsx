import type { Metadata } from "next";
import { generateAsyncTitle,generateAsyncDescription } from "@/lib/seo";
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: await generateAsyncTitle("Inicio"),
        description: await generateAsyncDescription("Bienvenido a nuestro sitio web, donde ofrecemos una amplia gama de servicios y productos de alta calidad. Explora nuestras ofertas y descubre cómo podemos ayudarte a alcanzar tus objetivos. ¡Gracias por visitarnos!"),
    };
}

export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
            <main className={`p-0.5 antialiased`}>
                {children}
            </main>
    );
}