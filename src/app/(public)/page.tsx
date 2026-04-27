import type { Metadata } from "next";
import { generateAsyncTitle, generateAsyncDescription } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title:await generateAsyncTitle("Inicio"),
    description:await generateAsyncDescription() ,
  };
}

export default function HomePage() {
  return (
    <>
      <main>
        <h1></h1>
        
      </main>
    </>
  );
}