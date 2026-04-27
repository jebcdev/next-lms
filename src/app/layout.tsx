import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import {generateAsyncTitle,generateAsyncDescription} from "@/lib/seo"
import { Toaster } from "sonner";


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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        {children}</body>
    </html>
  );
}
