"use server";
import { getSessionDetails } from "@/lib/auth/session-details";


export default async function SuperAdminsIndexPage() {
      const { fullUserDetails } = await getSessionDetails();

  return (
    <>
      <main>
        <h1>
            Página de superadministradores - Próximamente
        </h1>
                        <pre>
                    <code>
                        {JSON.stringify(fullUserDetails, null, 2)}
                    </code>
                </pre>
      </main>
    </>
  );
}