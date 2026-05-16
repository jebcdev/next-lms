
/**
 * Página de inicio de sesión (Sign In) de NextLMS.
 *
 * Formulario de autenticación con credenciales (email/password).
 * Solo autenticación por credenciales; social login eliminado por seguridad.
 *
 * Route: /signin
 *
 * Dependencies:
 *     - next-auth/react: signIn
 *     - next/link: Navegación
 *     - @/components/ui: Componentes de UI
 *
 * Note:
 *     Social login (Google, GitHub) fue eliminado.
 *     Solo autenticación con credenciales disponible.
 */

"use client"

import Link from "next/link"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

/**
 * Página de inicio de sesión.
 *
 * Renderiza un formulario de login con email y contraseña.
 * Utiliza NextAuth para autenticar credenciales.
 *
 * @returns {JSX.Element} Página de login
 */
export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">

      {/* LEFT - FORM */}
      <div className="flex items-center justify-center px-6">
        <Card className="w-full max-w-md border-none shadow-none">

          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Bienvenido a NextLMS
            </CardTitle>
            <CardDescription>
              Inicia sesión para continuar
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">

            <div className="space-y-2">
              <Input
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                placeholder="Contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              className="w-full"
              onClick={() =>
                signIn("credentials", {
                  email,
                  password,
                  callbackUrl: "/dashboard",
                })
              }
            >
              Iniciar sesión
            </Button>


            <div className="text-center text-sm text-muted-foreground pt-2">
              ¿No tienes cuenta?{" "}
              <Link href="/signup" className="text-primary hover:underline">
                Regístrate
              </Link>
            </div>

          </CardContent>
        </Card>
      </div>

      {/* RIGHT - VISUAL */}
      <div className="hidden md:flex items-center justify-center bg-black text-white relative overflow-hidden">

        {/* Gradient / abstract visual */}
        <div className="absolute inset-0 bg-linear-to-br from-zinc-900 via-black to-zinc-950" />

        <div className="relative text-center px-10">
          <h2 className="text-3xl font-bold">
            Aprende. Enseña. Escala.
          </h2>
          <p className="text-white/60 mt-4">
            NextLMS es la forma moderna de gestionar educación digital.
          </p>
        </div>

      </div>

    </div>
  )
}