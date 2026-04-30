"use server";
import { getSessionDetails } from "@/lib/auth/session-details";
import { ProfileCard } from "@/features/profile/ProfileCard";
import { redirect } from "next/navigation";
export default async function ProfilePage() {
  const { fullUserDetails } = await getSessionDetails();

  if (!fullUserDetails) {
    return redirect("/login");
  }

  return (
    <main className="container mx-auto min-h-screen p-4 md:p-8 lg:p-12">
      <div className="mx-auto max-w-3xl">
        <ProfileCard user={fullUserDetails as any} />
      </div>
    </main>
  );
}
