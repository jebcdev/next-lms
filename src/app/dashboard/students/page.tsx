"use server";
import { getSessionDetails } from "@/lib/auth/session-details";


export default async function StudentsIndexPage() {
  const { fullUserDetails } = await getSessionDetails();
  return (
    <>
      <main>
        <h1>
            Página de estudiantes - Próximamente
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