import type { Metadata } from "next";
import { generateAsyncTitle, generateAsyncDescription } from "@/lib/seo";
import Image from "next/image";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await generateAsyncTitle("MultiTenant LMS - Plataforma de Aprendizaje"),
    description: await generateAsyncDescription("Gestión de cursos online multiempresa. La plataforma de aprendizaje todo-en-uno para tu organización."),
  };
}

export default function HomePage() {
  return (
    <>
      <main className="min-h-screen">
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/main-hero.png"
              alt="MultiTenant LMS Platform"
              fill
              className="object-cover object-center"
              priority
              quality={90}
            />
            <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-black/40 z-10" />
          </div>

          <div className="relative z-20 px-6 md:px-12 lg:px-20 max-w-6xl mx-auto w-full">
            <div className="max-w-3xl space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/90 backdrop-blur-sm rounded-full">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                <span className="text-white font-semibold text-sm tracking-wide">MULTITENANT LMS</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
                Gestión de Cursos{' '}
                <span className="text-orange-400">Online</span>
              </h1>

              <p className="text-xl md:text-2xl lg:text-3xl text-gray-200 font-light">
                Tu plataforma de aprendizaje <strong className="text-white font-bold">todo-en-uno</strong>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Comenzar Ahora
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a
                  href="/demo"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-lg rounded-xl border-2 border-white/30 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
                >
                  Solicitar Demo
                </a>
              </div>

              <div className="flex flex-wrap gap-6 pt-6 text-gray-300">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">MultiEmpresa</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">Escalable</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">100% Online</span>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 animate-bounce">
            <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        <section className="py-20 px-6 bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-4">
              ¿Por qué elegir nuestro LMS?
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-16 max-w-2xl mx-auto">
              Una plataforma diseñada para gestionar múltiples empresas desde una sola instalación
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/50 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">MultiEmpresa</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Gestiona múltiples organizaciones, equipos y cursos desde una única plataforma contenant孤立.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 bg-amber-100 dark:bg-amber-900/50 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Cursos Interactivos</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Crea contenido engageante con videos, quizzes, evaluaciones y seguimiento de progreso en tiempo real.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 bg-yellow-100 dark:bg-yellow-900/50 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Analíticas Avanzadas</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Reports detallados por empresa, curso y usuario. Toma decisiones basadas en datos reales.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-6 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">
              ¿Listo para transformar tu capacitación?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">
              Únete a las organizaciones que ya usan nuestra plataforma
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Crear Cuenta Gratis
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-white font-bold text-lg rounded-xl transition-all duration-300"
              >
                Contactar Ventas
              </a>
            </div>
          </div>
        </section>

        <footer className="py-8 px-6 bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <span className="font-bold text-orange-600">MultiTenant LMS</span>
              <span className="text-gray-400">+</span>
              <span className="font-medium">SchulVox</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.200 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.771v20.451C0 23.227.792 24 1.771 24h20.451C23.227 24 24 23.227 24 22.235V1.771C24 .774 23.227 0 22.225 0h.003z"/></svg>
              </a>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              © 2026 MultiTenant LMS. Todos los derechos reservados.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}