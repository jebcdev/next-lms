import { getSessionDetails } from "@/lib/auth/session-details";
import { notFound } from "next/navigation";
import { SuperAdminDashboardSideBar } from "@/features/super-admin/components/dashboard";
import Link from "next/link";
import { Button } from "@/features/shared/components/ui";
import { Home } from "lucide-react";

export default async function DashboardSuperAdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { isSuperAdmin, currentUser } = await getSessionDetails();
    if (!isSuperAdmin || !currentUser) notFound();

    return (
        <div className="flex h-screen overflow-hidden">
            <SuperAdminDashboardSideBar />

            <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
                <header className="h-12 border-b bg-background flex items-center justify-between px-4 shrink-0">
                    <div>
                        <Link href="/dashboard/super-admin">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="px-2 py-1 text-xs"
                            >
                                <Home size={14} className="mr-1" />
                                Super Admin
                            </Button>
                        </Link>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-[10px] font-semibold text-orange-600 uppercase">
                                {currentUser.name?.charAt(0) ?? "U"}
                            </div>
                            <span className="text-xs text-muted-foreground hidden sm:block">
                                {currentUser.name}
                            </span>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-5">
                    {children}
                </main>
            </div>
        </div>
    );
}