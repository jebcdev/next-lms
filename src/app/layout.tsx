import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import {generateAsyncTitle,generateAsyncDescription} from "@/lib/seo"
import { Toaster } from "sonner";
import { MainHeader } from "@/features/shared/components/ui";
import { getSessionDetails } from "@/lib/auth/session-details";

const jetbrainsMono = JetBrains_Mono({subsets:['latin'],variable:'--font-mono'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  return {
    title:await generateAsyncTitle(),
    description:await generateAsyncDescription() ,
  };
}

export default async function RootLayout({
  
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated, isSuperAdmin, isAdmin, isInstructor, isStudent, currentUser } = await getSessionDetails();

  return (
    <html
      lang="sn"
      className={cn("h-full dark", "antialiased", geistSans.variable, geistMono.variable, "font-mono", jetbrainsMono.variable)}
    >
      <body className="min-h-full flex flex-col">
        
         <Toaster
                        duration={2000}
                        position="top-right"
                        richColors
                        closeButton
                        theme="dark"
                    />
                    <MainHeader 
                        isAuthenticated={isAuthenticated} 
                        isSuperAdmin={isSuperAdmin}
                        isAdmin={isAdmin}
                        isInstructor={isInstructor}
                        isStudent={isStudent}
                        currentUser={currentUser} 
                    />
        {children}</body>
    </html>
  );
}
