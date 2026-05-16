import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HeroParticles } from "./components/hero-particles"
import {
  BookOpen,
  BarChart3,
  Zap,
  Users,
  ShieldCheck,
  Layers,
  ArrowRight,
  CheckCircle2,
} from "lucide-react"

export default function LandingPage() {
  return (
    <HeroParticles>
      <div className="flex flex-col">

        {/* HERO */}
        <section className="min-h-[90vh] flex flex-col items-center justify-center py-24 px-6 text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#7F77DD]/40 bg-[#7F77DD]/10 text-[#AFA9EC] text-sm font-medium mb-8">
            <Zap size={14} />
            Plataforma LMS de nueva generación
          </div>

          <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-white max-w-4xl leading-tight">
            Escala tu escuela{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#AFA9EC] to-[#7F77DD]">
              sin límites
            </span>
          </h1>

          <p className="mt-6 text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
            Crea, gestiona y monetiza cursos online con una plataforma diseñada para instructores serios y equipos que escalan.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-[#7F77DD] hover:bg-[#534AB7] text-white border-0 h-12 px-8 text-base">
              <Link href="/signup">
                Empezar Gratis
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-white/15 text-white hover:bg-white/8 h-12 px-8 text-base bg-transparent"
            >
              <Link href="/signin">Ver Demo</Link>
            </Button>
          </div>

          {/* Social proof */}
          <div className="mt-16 flex flex-col sm:flex-row items-center gap-8 text-white/40 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#7F77DD]" />
              Sin tarjeta de crédito
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#7F77DD]" />
              Setup en menos de 5 minutos
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#7F77DD]" />
              Cancela cuando quieras
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="py-16 px-6 border-y border-white/5">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "12K+", label: "Estudiantes activos" },
              { value: "98%", label: "Tasa de satisfacción" },
              { value: "500+", label: "Cursos publicados" },
              { value: "40+", label: "Países" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-4xl font-bold text-white">{s.value}</p>
                <p className="text-white/40 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-[#AFA9EC] text-sm font-medium uppercase tracking-widest mb-3">Características</p>
              <h2 className="text-4xl font-bold text-white">Todo lo que necesitas, nada que no</h2>
              <p className="text-white/40 mt-4 max-w-xl mx-auto">
                Herramientas pensadas para instructores que quieren resultados reales.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: BookOpen,
                  title: "Gestión de Cursos",
                  desc: "Módulos, lecciones, videos y recursos en un solo lugar. Estructura tu contenido como quieras.",
                },
                {
                  icon: BarChart3,
                  title: "Analítica en Tiempo Real",
                  desc: "Monitorea el progreso de cada estudiante y optimiza tu contenido con datos reales.",
                },
                {
                  icon: Zap,
                  title: "Rendimiento Brutal",
                  desc: "Infraestructura diseñada para escalar. De 10 a 10,000 usuarios sin que notes la diferencia.",
                },
                {
                  icon: Users,
                  title: "Multi-tenant",
                  desc: "Crea organizaciones independientes con su propia marca, usuarios y configuración.",
                },
                {
                  icon: ShieldCheck,
                  title: "Seguridad Primero",
                  desc: "Autenticación robusta, roles granulares y datos protegidos en todo momento.",
                },
                {
                  icon: Layers,
                  title: "Totalmente Extensible",
                  desc: "API abierta e integraciones que se adaptan a tu stack sin fricciones.",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <Card key={title} className="bg-white/3 border-white/8 hover:border-[#7F77DD]/40 transition-colors group">
                  <CardHeader className="pb-3">
                    <div className="w-10 h-10 rounded-lg bg-[#7F77DD]/15 flex items-center justify-center mb-3 group-hover:bg-[#7F77DD]/25 transition-colors">
                      <Icon size={20} className="text-[#AFA9EC]" />
                    </div>
                    <CardTitle className="text-white text-lg">{title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-white/45 text-sm leading-relaxed">
                    {desc}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-[#AFA9EC] text-sm font-medium uppercase tracking-widest mb-3">Precios</p>
              <h2 className="text-4xl font-bold text-white">Planes que crecen contigo</h2>
              <p className="text-white/40 mt-4">Sin sorpresas. Sin letra pequeña.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 items-center">

              <Card className="bg-white/3 border-white/8">
                <CardHeader>
                  <p className="text-white/40 text-sm">Starter</p>
                  <CardTitle className="text-white text-4xl font-bold mt-1">$0<span className="text-lg font-normal text-white/30">/mes</span></CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <ul className="space-y-3 text-sm text-white/50">
                    {["Hasta 50 estudiantes", "5 cursos", "Analítica básica", "Soporte por email"].map(f => (
                      <li key={f} className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-[#7F77DD] shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full border-white/15 text-white hover:bg-white/8 bg-transparent" asChild>
                    <Link href="/signup">Comenzar gratis</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* PRO — destacado */}
              <Card className="bg-[#7F77DD]/10 border-[#7F77DD]/50 scale-105 shadow-xl shadow-[#7F77DD]/10 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-[#7F77DD] text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Más popular
                  </span>
                </div>
                <CardHeader>
                  <p className="text-[#AFA9EC] text-sm">Pro</p>
                  <CardTitle className="text-white text-4xl font-bold mt-1">$29<span className="text-lg font-normal text-white/30">/mes</span></CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <ul className="space-y-3 text-sm text-white/70">
                    {["Usuarios ilimitados", "Cursos ilimitados", "Analítica avanzada", "Soporte prioritario", "Multi-tenant"].map(f => (
                      <li key={f} className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-[#AFA9EC] shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-[#7F77DD] hover:bg-[#534AB7] text-white border-0" asChild>
                    <Link href="/signup">Elegir Pro</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/3 border-white/8">
                <CardHeader>
                  <p className="text-white/40 text-sm">Enterprise</p>
                  <CardTitle className="text-white text-4xl font-bold mt-1">Custom</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <ul className="space-y-3 text-sm text-white/50">
                    {["Infraestructura dedicada", "Integraciones custom", "SLA garantizado", "Soporte dedicado 24/7"].map(f => (
                      <li key={f} className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-[#7F77DD] shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full border-white/15 text-white hover:bg-white/8 bg-transparent" asChild>
                    <Link href="/contact">Hablar con ventas</Link>
                  </Button>
                </CardContent>
              </Card>

            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="py-24 px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-5xl font-bold text-white leading-tight">
              Listo para{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#AFA9EC] to-[#7F77DD]">
                despegar?
              </span>
            </h2>
            <p className="text-white/40 mt-4 text-lg">
              Únete a miles de instructores que ya escalan con NextLMS.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="bg-[#7F77DD] hover:bg-[#534AB7] text-white border-0 h-12 px-8 text-base">
                <Link href="/signup">
                  Crear cuenta gratis
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

      </div>
    </HeroParticles>
  )
}