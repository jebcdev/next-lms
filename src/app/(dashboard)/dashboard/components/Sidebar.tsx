"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Settings,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const isAdmin =
    session?.user?.role === "ADMIN" ||
    session?.user?.role === "SUPER_ADMIN";

  const links = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Overview" },
    { href: "/dashboard/courses", icon: BookOpen, label: "Cursos" },
    ...(isAdmin
      ? [
          { href: "/dashboard/students", icon: Users, label: "Estudiantes" },
          { href: "/dashboard/settings", icon: Settings, label: "Ajustes" },
        ]
      : []),
  ];

  return (
    <aside className="w-64 border-r border-white/5 hidden md:flex flex-col" style={{ background: "transparent" }}>

      {/* LOGO */}
      <div className="h-16 flex items-center px-6 border-b border-white/5">
        <span className="font-bold text-lg text-white">
            <Link href="/" className="flex items-center gap-1">
          Next<span className="text-[#7F77DD]">LMS</span>
        </Link>
        </span>
      </div>

      {/* NAV */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map(({ href, icon: Icon, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                active
                  ? "bg-[#7F77DD]/15 text-[#AFA9EC] font-medium"
                  : "text-white/40 hover:text-white/80 hover:bg-white/5"
              )}
            >
              <Icon size={17} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* USER PILL */}
      <div className="p-3 border-t border-white/5">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/3">
          <div className="w-7 h-7 rounded-full bg-[#7F77DD]/30 flex items-center justify-center text-[#AFA9EC] text-xs font-medium shrink-0">
            {session?.user?.name?.[0]?.toUpperCase() ?? "U"}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-white/80 text-xs font-medium truncate">
              {session?.user?.name ?? "Usuario"}
            </span>
            <span className="text-white/30 text-xs truncate">
              {session?.user?.role ?? ""}
            </span>
          </div>
        </div>
      </div>

    </aside>
  );
}