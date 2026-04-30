"use server"
import {getSessionDetails} from "@/lib/auth/session-details"

export default async function InstructorsIndexPage() {
  const {fullUserDetails}=await getSessionDetails()
  return (
    <>
      <main>
        <h1>
            Página de instructores - Próximamente
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