import type { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "",
    description: "",
  };
}

export default function RegisterPage() {
  return (
    <>
            <section>
                {/* <AuthLoginGrid /> */}
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