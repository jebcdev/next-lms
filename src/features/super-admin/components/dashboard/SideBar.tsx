"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    LayoutDashboard,
    Building2,
    Users,
    BookOpen,
    Settings,
    LucideIcon,
} from "lucide-react";

type SidebarItem = {
    title: string;
    href: string;
    icon: LucideIcon;
};

type SidebarGroup = {
    label: string;
    items: SidebarItem[];
};

const sidebarGroups: SidebarGroup[] = [
    {
        label: "Gestión",
        items: [
            {
                title: "Dashboard",
                href: "/dashboard/super-admin",
                icon: LayoutDashboard,
            },
            {
                title: "Tenants",
                href: "/dashboard/super-admin/tenants",
                icon: Building2,
            },
            {
                title: "Usuarios",
                href: "/dashboard/super-admin/users",
                icon: Users,
            },
            {
                title: "Cursos",
                href: "/dashboard/super-admin/courses",
                icon: BookOpen,
            },
        ],
    },
    {
        label: "Sistema",
        items: [
            {
                title: "Configuración",
                href: "/dashboard/super-admin/settings",
                icon: Settings,
            },
        ],
    },
];

export const SuperAdminDashboardSideBar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [closedGroups, setClosedGroups] = useState<Record<string, boolean>>({});
    const pathname = usePathname();

    const toggleGroup = (label: string) => {
        setClosedGroups((prev) => ({
            ...prev,
            [label]: !prev[label],
        }));
    };

    return (
        <aside
            className={cn(
                "relative border-r bg-background flex flex-col h-screen shrink-0 transition-all duration-300 ease-in-out",
                isCollapsed ? "w-14" : "w-56",
            )}
        >
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-5 z-10 rounded-full border bg-background p-0.5 shadow-sm hover:bg-accent transition-colors"
            >
                {isCollapsed ? (
                    <ChevronRight size={13} />
                ) : (
                    <ChevronLeft size={13} />
                )}
            </button>

            <Link
                href="/dashboard/super-admin"
                className="flex h-12 items-center px-3 border-b shrink-0"
            >
                <Building2 size={17} className="shrink-0 text-orange-600" />
                {!isCollapsed && (
                    <span className="ml-2 font-semibold text-sm">
                        Super Admin
                    </span>
                )}
            </Link>

            <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-3">
                {sidebarGroups.map((group) => {
                    const isClosed = closedGroups[group.label];

                    return (
                        <div key={group.label}>
                            {!isCollapsed ? (
                                <button
                                    onClick={() => toggleGroup(group.label)}
                                    className="flex items-center justify-between w-full px-2 mb-0.5 group"
                                >
                                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                                        {group.label}
                                    </span>
                                    <ChevronDown
                                        size={11}
                                        className={cn(
                                            "text-muted-foreground transition-transform duration-200",
                                            isClosed && "-rotate-90",
                                        )}
                                    />
                                </button>
                            ) : (
                                <div className="h-px bg-border mx-1 mb-1" />
                            )}

                            {!isClosed && (
                                <div className="space-y-0.5">
                                    {group.items.map((item) => {
                                        const Icon = item.icon;
                                        const isActive = pathname === item.href;

                                        return (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                title={
                                                    isCollapsed
                                                        ? item.title
                                                        : undefined
                                                }
                                                className={cn(
                                                    "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
                                                    isActive
                                                        ? "bg-orange-500 text-white"
                                                        : "text-muted-foreground hover:bg-accent hover:text-foreground",
                                                    isCollapsed &&
                                                        "justify-center px-0",
                                                )}
                                            >
                                                <Icon
                                                    size={15}
                                                    className="shrink-0"
                                                />
                                                {!isCollapsed && (
                                                    <span className="truncate text-xs">
                                                        {item.title}
                                                    </span>
                                                )}
                                            </Link>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </nav>
        </aside>
    );
};