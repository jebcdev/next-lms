"use server";
import { getSessionDetails } from "@/lib/auth/session-details";

export default async function AdminsIndexPage() {
    const { fullUserDetails } = await getSessionDetails();
    return (
        <>
            <main>
                <h1>Página de administradores - Próximamente</h1>
                <pre>
                    <code>
                        {JSON.stringify(fullUserDetails, null, 2)}
                    </code>
                </pre>
            </main>
        </>
    );
}
