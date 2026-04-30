"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState, useRef, useEffect } from "react";
import {
    User,
    LayoutGrid,
    Menu,
    X,
    GraduationCap,
    BookOpen,
    Users,
    Settings,
    Shield,
    LogOut,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage, Badge, Button } from "@/features/shared/components/ui";

import { authClient } from "@/lib/auth/auth-client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface MainHeaderUser {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    role?: string | null;
}

interface Props {
    isAuthenticated: boolean;
    isSuperAdmin: boolean;
    isAdmin: boolean;
    isInstructor: boolean;
    isStudent: boolean;
    currentUser: MainHeaderUser | null;
}

export const MainHeader = ({
    isAuthenticated,
    isSuperAdmin,
    isAdmin,
    isInstructor,
    isStudent,
    currentUser,
}: Props) => {
    const router = useRouter();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const initials = useMemo(() => {
        if (!currentUser?.name) return "U";
        return currentUser.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    }, [currentUser]);

    const getRoleBadge = () => {
        if (isSuperAdmin) {
            return (
                <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/30 rounded-sm font-mono text-[9px] tracking-widest">
                    SUPER ADMIN
                </Badge>
            );
        }
        if (isAdmin) {
            return (
                <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/30 rounded-sm font-mono text-[9px] tracking-widest">
                    ADMIN
                </Badge>
            );
        }
        if (isInstructor) {
            return (
                <Badge className="bg-green-500/10 text-green-400 border-green-500/30 rounded-sm font-mono text-[9px] tracking-widest">
                    INSTRUCTOR
                </Badge>
            );
        }
        if (isStudent) {
            return (
                <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/30 rounded-sm font-mono text-[9px] tracking-widest">
                    STUDENT
                </Badge>
            );
        }
        return null;
    };

    const getDashboardLink = () => {
        if (isSuperAdmin) return "/dashboard/super-admin";
        if (isAdmin) return "/dashboard/admins";
        if (isInstructor) return "/dashboard/instructors";
        if (isStudent) return "/dashboard/students";
        return "/dashboard";
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setDropdownOpen(false);
            }
        };

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") setDropdownOpen(false);
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    toast.info("Sesión cerrada", {
                        description: "Has cerrado sesión correctamente.",
                        action: {
                            label: "Entendido",
                            onClick: () => toast.dismiss(),
                        },
                    });
                    setMobileOpen(false);
                    setDropdownOpen(false);
                    router.push("/");
                    router.refresh();
                },
                onError: () => {
                    toast.error("Error al cerrar sesión", {
                        description: "Intenta nuevamente.",
                        action: {
                            label: "Entendido",
                            onClick: () => toast.dismiss(),
                        },
                    });
                },
            },
        });
    };

    return (
        <>
            <header className="sticky top-0 z-998 w-full border-b border-zinc-800 bg-black/90 backdrop-blur-sm">
                <div className="w-full px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
                    {/* Logo - redondeado a la izquierda */}
                    <Link href="/" className="flex items-center shrink-0">
                        <div className="relative w-9 h-9 rounded-full overflow-hidden bg-zinc-800">
                            <Image
                                src="/logo.png"
                                alt="Logo"
                                fill
                                className="object-cover"
                                loading="eager"
                            />
                        </div>
                    </Link>

                    {/* Centro - Inicio */}
                    <nav className="hidden md:flex items-center">
                        <Link
                            href="/"
                            className="px-3 py-1.5 text-xs font-mono text-zinc-500 hover:text-zinc-100 tracking-widest uppercase transition-colors rounded-sm hover:bg-zinc-900"
                        >
                            Inicio
                        </Link>
                    </nav>

                    {/* Right side */}
                    <div className="flex items-center gap-2 shrink-0">
                        {/* Dashboard link for authenticated users */}
                        {isAuthenticated && (
                            <Link href={getDashboardLink()}>
                                <Badge className="hidden md:inline-flex rounded-sm font-mono text-[9px] tracking-widest px-1.5 py-0 border bg-zinc-800 text-zinc-400 border-zinc-700 hover:bg-zinc-700 transition-colors">
                                    <LayoutGrid className="w-3 h-3 mr-1" />
                                    Dashboard
                                </Badge>
                            </Link>
                        )}

                        <div className="hidden md:flex items-center gap-2">
                            {!isAuthenticated ? (
                                <>
                                    <Link href="/login">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 font-mono text-xs text-zinc-400 hover:text-white hover:bg-zinc-900 tracking-widest uppercase rounded-sm"
                                        >
                                            Iniciar sesión
                                        </Button>
                                    </Link>
                                    <Link href="/register">
                                        <Button
                                            size="sm"
                                            className="h-8 bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold tracking-widest uppercase rounded-sm"
                                        >
                                            Registro
                                        </Button>
                                    </Link>
                                </>
                            ) : (
                                <div ref={dropdownRef} className="relative">
                                    <button
                                        onClick={() => setDropdownOpen((prev) => !prev)}
                                        className="outline-none group"
                                    >
                                        <Avatar className="w-8 h-8 rounded-full border border-zinc-700 group-hover:border-blue-500/50 transition-colors cursor-pointer">
                                            <AvatarImage
                                                src={currentUser?.image ?? undefined}
                                                alt={currentUser?.name ?? "Usuario"}
                                            />
                                            <AvatarFallback className="bg-zinc-900 text-blue-400 text-xs font-mono font-bold rounded-full">
                                                {currentUser?.image ? (
                                                    initials
                                                ) : (
                                                    <User className="w-4 h-4 text-zinc-400" />
                                                )}
                                            </AvatarFallback>
                                        </Avatar>
                                    </button>

                                    {dropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-56 bg-zinc-900 border border-zinc-800 rounded-sm shadow-xl z-999 p-1">
                                            <div className="px-3 py-2">
                                                <p className="text-xs font-mono font-bold text-white truncate">
                                                    {currentUser?.name}
                                                </p>
                                                <p className="text-[10px] font-mono text-zinc-500 truncate mt-0.5">
                                                    {currentUser?.email}
                                                </p>
                                                <div className="mt-2">
                                                    {getRoleBadge()}
                                                </div>
                                            </div>

                                            <div className="bg-zinc-800 h-px my-1" />

                                            <Link
                                                href="/profile"
                                                onClick={() => setDropdownOpen(false)}
                                                className="font-mono text-xs text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-sm cursor-pointer px-3 py-2 flex items-center gap-2 transition-colors"
                                            >
                                                <User className="w-3.5 h-3.5 text-zinc-500" />
                                                Perfil
                                            </Link>

                                            <Link
                                                href={getDashboardLink()}
                                                onClick={() => setDropdownOpen(false)}
                                                className="font-mono text-xs text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-sm cursor-pointer px-3 py-2 flex items-center gap-2 transition-colors"
                                            >
                                                <LayoutGrid className="w-3.5 h-3.5 text-zinc-500" />
                                                Dashboard
                                            </Link>

                                            {(isSuperAdmin || isAdmin) && (
                                                <Link
                                                    href="/settings"
                                                    onClick={() => setDropdownOpen(false)}
                                                    className="font-mono text-xs text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-sm cursor-pointer px-3 py-2 flex items-center gap-2 transition-colors"
                                                >
                                                    <Settings className="w-3.5 h-3.5 text-zinc-500" />
                                                    Configuración
                                                </Link>
                                            )}

                                            <div className="bg-zinc-800 h-px my-1" />

                                            <button
                                                onClick={handleSignOut}
                                                className="w-full font-mono text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-sm cursor-pointer px-3 py-2 flex items-center gap-2 transition-colors"
                                            >
                                                <LogOut className="w-3.5 h-3.5" />
                                                Cerrar sesión
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 rounded-sm transition-colors"
                        >
                            {mobileOpen ? (
                                <X className="w-4 h-4" />
                            ) : (
                                <Menu className="w-4 h-4" />
                            )}
                        </button>
                    </div>
                </div>
            </header>

            {mobileOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/60 md:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            <div
                className={cn(
                    "fixed top-14 left-0 right-0 z-40 bg-zinc-950 border-b border-zinc-800 md:hidden transition-all duration-200 overflow-y-auto max-h-[calc(100vh-3.5rem)]",
                    mobileOpen
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-2 pointer-events-none",
                )}
            >
                <div className="flex flex-col p-4 gap-1">
                    <Link
                        href="/"
                        onClick={() => setMobileOpen(false)}
                        className="px-3 py-2.5 text-xs font-mono text-zinc-400 hover:text-white tracking-widest uppercase rounded-sm hover:bg-zinc-900 transition-colors"
                    >
                        Inicio
                    </Link>

                    {isAuthenticated && (
                        <Link
                            href={getDashboardLink()}
                            onClick={() => setMobileOpen(false)}
                            className="px-3 py-2.5 text-xs font-mono text-zinc-400 hover:text-white tracking-widest uppercase rounded-sm hover:bg-zinc-900 transition-colors"
                        >
                            Dashboard
                        </Link>
                    )}

                    <div className="border-t border-zinc-800 my-2" />

                    {!isAuthenticated ? (
                        <div className="flex flex-col gap-2">
                            <Link href="/login" onClick={() => setMobileOpen(false)}>
                                <Button
                                    variant="ghost"
                                    className="w-full h-10 font-mono text-xs text-zinc-400 hover:text-white hover:bg-zinc-900 tracking-widest uppercase rounded-sm"
                                >
                                    Iniciar sesión
                                </Button>
                            </Link>
                            <Link href="/register" onClick={() => setMobileOpen(false)}>
                                <Button className="w-full h-10 bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold tracking-widest uppercase rounded-sm">
                                    Registro
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-3 px-3 py-3 bg-zinc-900 rounded-sm">
                                <Avatar className="w-8 h-8 rounded-full border border-zinc-700 shrink-0">
                                    <AvatarImage
                                        src={currentUser?.image ?? undefined}
                                    />
                                    <AvatarFallback className="bg-zinc-800 text-blue-400 text-xs font-mono font-bold rounded-full">
                                        {initials}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col min-w-0">
                                    <p className="text-xs font-mono font-bold text-white truncate">
                                        {currentUser?.name}
                                    </p>
                                    <p className="text-[10px] font-mono text-zinc-500 truncate">
                                        {currentUser?.email}
                                    </p>
                                </div>
                            </div>

                            <Link
                                href="/profile"
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-2 px-3 py-2.5 text-xs font-mono text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-sm transition-colors"
                            >
                                <User className="w-3.5 h-3.5" />
                                Perfil
                            </Link>

                            <Link
                                href={getDashboardLink()}
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-2 px-3 py-2.5 text-xs font-mono text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-sm transition-colors"
                            >
                                <LayoutGrid className="w-3.5 h-3.5" />
                                Dashboard
                            </Link>

                            {(isSuperAdmin || isAdmin) && (
                                <Link
                                    href="/settings"
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center gap-2 px-3 py-2.5 text-xs font-mono text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-sm transition-colors"
                                >
                                    <Settings className="w-3.5 h-3.5" />
                                    Configuración
                                </Link>
                            )}

                            <button
                                onClick={handleSignOut}
                                className="flex items-center gap-2 px-3 py-2.5 text-xs font-mono text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-sm transition-colors"
                            >
                                <LogOut className="w-3.5 h-3.5" />
                                Cerrar sesión
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};