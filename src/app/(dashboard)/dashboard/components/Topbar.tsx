"use client"

import { signOut, useSession } from "next-auth/react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Bell, LogOut, Search } from "lucide-react"

export function Topbar() {
  const { data: session } = useSession()

  return (
    <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 gap-4" style={{ background: "transparent" }}>

      {/* SEARCH */}
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25 h-4 w-4" />
        <Input
          placeholder="Buscar..."
          className="pl-9 bg-white/5 border-white/8 text-white placeholder:text-white/25 focus-visible:ring-[#7F77DD]/40"
        />
      </div>

      {/* ACTIONS */}
      <div className="flex items-center gap-2">

        <Button
          variant="ghost"
          size="icon"
          className="text-white/40 hover:text-white/80 hover:bg-white/5 relative"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#7F77DD]" />
        </Button>

        {/* DIVIDER */}
        <div className="w-px h-6 bg-white/8 mx-1" />

        {/* USER */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#7F77DD]/30 flex items-center justify-center text-[#AFA9EC] text-xs font-medium shrink-0">
            {session?.user?.name?.[0]?.toUpperCase() ?? "U"}
          </div>
          <div className="hidden md:flex flex-col">
            <span className="text-white/80 text-xs font-medium leading-tight">
              {session?.user?.name ?? "Usuario"}
            </span>
            <span className="text-white/30 text-xs leading-tight">
              {session?.user?.role ?? ""}
            </span>
          </div>
        </div>

        {/* SIGN OUT */}
        <Button
          variant="ghost"
          size="icon"
          className="text-white/30 hover:text-white/70 hover:bg-white/5 ml-1"
          onClick={() => signOut({ callbackUrl: "/" })}
          title="Cerrar sesión"
        >
          <LogOut className="h-4 w-4" />
        </Button>

      </div>
    </header>
  )
}