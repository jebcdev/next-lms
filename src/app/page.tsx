import type { Metadata } from "next";
import { generateAsyncTitle,generateAsyncDescription } from "@/lib/seo";
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await generateAsyncTitle("Under Construction"),
    description: await generateAsyncDescription("LMS Coming Soon"),
  };
}

export default function HomePage() {
  return (
    <>
      <main className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-orange-50 via-amber-50 to-yellow-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 dark:opacity-20">
          <div className="absolute top-20 left-20 w-32 h-32 bg-orange-300 dark:bg-orange-600 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-yellow-400 dark:bg-yellow-500 rounded-full blur-3xl animate-pulse delay-700"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-amber-300 dark:bg-amber-500 rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <div className="mb-8">
            <span className="inline-block px-6 py-2 bg-orange-500 text-white font-bold text-lg rounded-full shadow-lg animate-bounce">
              🚧 UNDER CONSTRUCTION
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-linear-to-r from-orange-600 via-amber-600 to-yellow-600 dark:from-orange-400 dark:via-amber-400 dark:to-yellow-400 mb-6 drop-shadow-sm">
            LMS
          </h1>

          <div className="space-y-4 mb-8">
            <p className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">
              Coming Soon
            </p>
            <p className="text-3xl md:text-4xl font-bold text-orange-600 dark:text-orange-400">
              Próximamente
            </p>
          </div>

          <div className="inline-block p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border-4 border-orange-400 dark:border-orange-600">
            <div className="text-6xl mb-4 animate-spin-slow">⚙️</div>
            <p className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-200">
              We are building something amazing!
            </p>
            <p className="text-xl md:text-2xl font-semibold text-yellow-600 dark:text-yellow-400 mt-2">
              ¡Estamos construyendo algo increíble!
            </p>
          </div>

          <div className="mt-12 mb-4 flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/50 rounded-full">
              <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-gray-700 dark:text-gray-200 font-medium">System Online</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-yellow-100 dark:bg-yellow-900/50 rounded-full">
              <span className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></span>
              <span className="text-gray-700 dark:text-gray-200 font-medium">UI Development</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/50 rounded-full">
              <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
              <span className="text-gray-700 dark:text-gray-200 font-medium">Content Loading</span>
            </div>
          </div>
        </div>

        <footer className="absolute bottom-6 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>© 2026 LMS Platform • Stay tuned / Mantente atento</p>
        </footer>
      </main>
    </>
  );
}