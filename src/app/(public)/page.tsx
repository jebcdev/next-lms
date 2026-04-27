import type { Metadata } from "next";
import { generateAsyncTitle, generateAsyncDescription } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await generateAsyncTitle("En Construcción"),
    description: await generateAsyncDescription(),
  };
}

export default function PublicHomePage() {
  return (
    <main className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-800 mb-6">
            <svg
              className="w-12 h-12 text-emerald-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          En Construcción
        </h1>

        <p className="text-lg text-gray-400 mb-8">
          Estamos construyendo algo increíble para ti. Nuestro sistema de gestión de aprendizaje
          estará disponible pronto con las mejores herramientas para tu desarrollo académico.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <div className="bg-gray-900 rounded-lg p-4 text-left">
            <h3 className="text-emerald-400 font-semibold mb-2">Próximamente</h3>
            <ul className="text-gray-400 text-sm space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Cursos interactivos
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Seguimiento de progreso
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Certificaciones
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-gray-500 text-sm">
            ¿Tienes preguntas? Contáctanos en{" "}
            <a
              href="mailto:info@example.com"
              className="text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              info@example.com
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}