"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#07070f]/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-6">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="NextLMS"
            width={32}
            height={32}
            className="rounded-md"
          />
          <span className="font-bold text-lg tracking-tight text-white">
            Next<span className="text-[#7F77DD]">LMS</span>
          </span>
        </Link>

        {/* NAV LINKS */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-white/40">
          <Link href="#features" className="hover:text-[#AFA9EC] transition-colors">
            Features
          </Link>
          <Link href="#pricing" className="hover:text-[#AFA9EC] transition-colors">
            Precios
          </Link>
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            asChild
            className="text-white/50 hover:text-white hover:bg-white/5"
          >
            <Link href="/signin">Iniciar sesión</Link>
          </Button>

          <Button
            asChild
            className="bg-[#7F77DD] hover:bg-[#534AB7] text-white border-0"
          >
            <Link href="/signup">Empezar gratis</Link>
          </Button>
        </div>

      </div>
    </header>
  )
}