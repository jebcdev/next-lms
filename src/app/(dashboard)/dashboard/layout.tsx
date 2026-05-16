import type { Metadata } from "next"
import type { ReactNode } from "react"
import { Sidebar } from "./components/Sidebar"
import { Topbar } from "./components/Topbar"
import { DashboardParticles } from "./components/dashboard-particles"

export const metadata: Metadata = {
  title: "NextLMS - Plataforma de Cursos Online",
  description: "Crea, gestiona y escala tus cursos online con NextLMS.",
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardParticles>
      <div className="flex flex-1">

        {/* SIDEBAR */}
        <Sidebar />

        {/* MAIN */}
        <div className="flex-1 flex flex-col">
          <Topbar />
          <main className="p-6 flex-1">{children}</main>
        </div>

      </div>
    </DashboardParticles>
  )
}