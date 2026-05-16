import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-white/8 bg-[#07070f]">
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10 text-sm">

        {/* BRAND */}
        <div className="md:col-span-2">
          <h3 className="font-semibold text-lg text-white">NextLMS</h3>
          <p className="text-white/40 mt-3 leading-relaxed max-w-xs">
            Plataforma moderna para crear, gestionar y escalar educación online sin complicaciones.
          </p>
          <p className="text-white/25 text-xs mt-6">
            Diseñado y desarrollado por{" "}
            <span className="text-[#AFA9EC] font-medium">María Elena Rodríguez</span>
          </p>
        </div>

        {/* PRODUCTO */}
        <div className="flex flex-col gap-3">
          <span className="text-white/60 text-xs uppercase tracking-widest font-medium">Producto</span>
          <Link href="#features" className="text-white/40 hover:text-[#AFA9EC] transition-colors">
            Features
          </Link>
          <Link href="#pricing" className="text-white/40 hover:text-[#AFA9EC] transition-colors">
            Precios
          </Link>
          <Link href="/signup" className="text-white/40 hover:text-[#AFA9EC] transition-colors">
            Registrarse
          </Link>
          <Link href="/signin" className="text-white/40 hover:text-[#AFA9EC] transition-colors">
            Iniciar sesión
          </Link>
        </div>

        {/* LEGAL */}
        <div className="flex flex-col gap-3">
          <span className="text-white/60 text-xs uppercase tracking-widest font-medium">Legal</span>
          <Link href="/terms" className="text-white/40 hover:text-[#AFA9EC] transition-colors">
            Términos de uso
          </Link>
          <Link href="/privacy" className="text-white/40 hover:text-[#AFA9EC] transition-colors">
            Privacidad
          </Link>
        </div>

      </div>

      <div className="border-t border-white/5 py-6 px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/25 max-w-6xl mx-auto w-full">
        <span>© {new Date().getFullYear()} NextLMS. Todos los derechos reservados.</span>
        <span>Hecho con 🖤 por <span className="text-[#AFA9EC]">María Elena Rodríguez</span></span>
      </div>
    </footer>
  )
}