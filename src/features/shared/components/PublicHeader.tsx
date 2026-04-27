"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState, useRef, useEffect } from "react";
import { User, LayoutGrid, Menu, X, ChevronDown, Shield, BookOpen, Building2 } from "lucide-react";
import {
    Button,
    Avatar,
    AvatarFallback,
    AvatarImage,
    Badge,
} from "@/features/shared/components/ui";

import { authClient } from "@/lib/auth/auth-client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface IUser {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    role?: string | null;
}

interface IProps {
    isAuthenticated: boolean;
    isAdmin: boolean;
    currentUser: IUser | null;
}

const LOGIN_OPTIONS = [
    {
        label: "Estudiantes",
        description: "Accede a tus cursos",
        href: "/login",
        icon: BookOpen,
        accent: "text-emerald-400",
        border: "border-emerald-500/20",
        bg: "hover:bg-emerald-500/5",
    },
    {
        label: "Instructores",
        description: "Gestiona tu contenido",
        href: "/instructors/auth/login",
        icon: User,
        accent: "text-violet-400",
        border: "border-violet-500/20",
        bg: "hover:bg-violet-500/5",
    },
    {
        label: "Organizaciones",
        description: "Panel de administración",
        href: "/tenants/auth/login",
        icon: Building2,
        accent: "text-blue-400",
        border: "border-blue-500/20",
        bg: "hover:bg-blue-500/5",
    },
    {
        label: "Super Admin",
        description: "Plataforma completa",
        href: "/tenants/auth/login",
        icon: Shield,
        accent: "text-amber-400",
        border: "border-amber-500/20",
        bg: "hover:bg-amber-500/5",
    },
] as const;

export const PublicHeader = ({
    isAuthenticated,
    isAdmin,
    currentUser,
}: IProps) => {
    const router = useRouter();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [loginMenuOpen, setLoginMenuOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const loginMenuRef = useRef<HTMLDivElement>(null);

    const initials = useMemo(() => {
        if (!currentUser?.name) return "U";
        return currentUser.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    }, [currentUser]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setDropdownOpen(false);
            }
            if (
                loginMenuRef.current &&
                !loginMenuRef.current.contains(e.target as Node)
            ) {
                setLoginMenuOpen(false);
            }
        };

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setDropdownOpen(false);
                setLoginMenuOpen(false);
            }
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
                    router.push("/login");
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
                <div className="w-full px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center shrink-0">
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            width={40}
                            height={40}
                            loading="eager"
                            className="h-10 w-auto"
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        <Link
                            href="/"
                            className="px-3 py-1.5 text-xs font-mono text-zinc-500 hover:text-zinc-100 tracking-widest uppercase transition-colors rounded-sm hover:bg-zinc-900"
                        >
                            Inicio
                        </Link>
                    </nav>

                    {/* Right side */}
                    <div className="flex items-center gap-2">
                        {isAuthenticated && isAdmin && (
                            <Link href="/dashboard">
                                <Badge className="hidden md:inline-flex rounded-sm font-mono text-[9px] tracking-widest px-1.5 py-0 border bg-blue-500/10 text-blue-400 border-blue-500/30">
                                    ADMIN
                                </Badge>
                            </Link>
                        )}

                        {/* Desktop auth */}
                        <div className="hidden md:flex items-center gap-2">
                            {!isAuthenticated ? (
                                <>
                                    {/* Login dropdown */}
                                    <div ref={loginMenuRef} className="relative">
                                        <button
                                            onClick={() => setLoginMenuOpen((p) => !p)}
                                            className={cn(
                                                "flex items-center gap-1.5 h-8 px-3 font-mono text-xs tracking-widest uppercase rounded-sm transition-colors",
                                                loginMenuOpen
                                                    ? "text-white bg-zinc-900"
                                                    : "text-zinc-400 hover:text-white hover:bg-zinc-900",
                                            )}
                                        >
                                            Iniciar sesión
                                            <ChevronDown
                                                className={cn(
                                                    "w-3 h-3 transition-transform duration-200",
                                                    loginMenuOpen && "rotate-180",
                                                )}
                                            />
                                        </button>

                                        {loginMenuOpen && (
                                            <div className="absolute right-0 mt-2 w-64 bg-zinc-900 border border-zinc-800 rounded-sm shadow-xl z-999 p-1.5 flex flex-col gap-0.5">
                                                <p className="px-2 pt-1 pb-2 text-[9px] font-mono text-zinc-600 tracking-widest uppercase">
                                                    Acceder como
                                                </p>
                                                {LOGIN_OPTIONS.map((opt) => {
                                                    const Icon = opt.icon;
                                                    return (
                                                        <Link
                                                            key={opt.href + opt.label}
                                                            href={opt.href}
                                                            onClick={() => setLoginMenuOpen(false)}
                                                            className={cn(
                                                                "flex items-center gap-3 px-2.5 py-2 rounded-sm border transition-colors",
                                                                opt.border,
                                                                opt.bg,
                                                                "border-transparent hover:border-opacity-100",
                                                            )}
                                                        >
                                                            <Icon className={cn("w-3.5 h-3.5 shrink-0", opt.accent)} />
                                                            <div className="flex flex-col min-w-0">
                                                                <span className={cn("text-xs font-mono font-bold tracking-wide", opt.accent)}>
                                                                    {opt.label}
                                                                </span>
                                                                <span className="text-[10px] font-mono text-zinc-500">
                                                                    {opt.description}
                                                                </span>
                                                            </div>
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>

                                    {/* Register — solo estudiantes */}
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
                                        <Avatar className="w-8 h-8 rounded-sm border border-zinc-700 group-hover:border-blue-500/50 transition-colors cursor-pointer">
                                            <AvatarImage
                                                src={currentUser?.image ?? undefined}
                                                alt={currentUser?.name ?? "Usuario"}
                                            />
                                            <AvatarFallback className="bg-zinc-900 text-blue-400 text-xs font-mono font-bold rounded-sm">
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
                                                <Badge
                                                    className={cn(
                                                        "mt-2 rounded-sm font-mono text-[9px] tracking-widest px-1.5 py-0 border",
                                                        isAdmin
                                                            ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                                                            : "bg-zinc-800 text-zinc-400 border-zinc-700",
                                                    )}
                                                >
                                                    {currentUser?.role ?? "USER"}
                                                </Badge>
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

                                            {isAdmin && (
                                                <Link
                                                    href="/dashboard"
                                                    onClick={() => setDropdownOpen(false)}
                                                    className="font-mono text-xs text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-sm cursor-pointer px-3 py-2 flex items-center gap-2 transition-colors"
                                                >
                                                    <LayoutGrid className="w-3.5 h-3.5 text-zinc-500" />
                                                    Dashboard
                                                </Link>
                                            )}

                                            <div className="bg-zinc-800 h-px my-1" />

                                            <button
                                                onClick={handleSignOut}
                                                className="w-full font-mono text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-sm cursor-pointer px-3 py-2 flex items-center gap-2 transition-colors"
                                            >
                                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                                </svg>
                                                Cerrar sesión
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Hamburger — mobile */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 rounded-sm transition-colors"
                        >
                            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/60 md:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Mobile drawer */}
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

                    <div className="border-t border-zinc-800 my-2" />

                    {!isAuthenticated ? (
                        <div className="flex flex-col gap-3">
                            {/* Login options mobile */}
                            <div className="flex flex-col gap-1">
                                <p className="px-3 text-[9px] font-mono text-zinc-600 tracking-widest uppercase mb-1">
                                    Iniciar sesión como
                                </p>
                                {LOGIN_OPTIONS.map((opt) => {
                                    const Icon = opt.icon;
                                    return (
                                        <Link
                                            key={opt.href + opt.label}
                                            href={opt.href}
                                            onClick={() => setMobileOpen(false)}
                                            className={cn(
                                                "flex items-center gap-3 px-3 py-2.5 rounded-sm border transition-colors",
                                                opt.border,
                                                opt.bg,
                                                "border-transparent",
                                            )}
                                        >
                                            <Icon className={cn("w-3.5 h-3.5 shrink-0", opt.accent)} />
                                            <div className="flex flex-col">
                                                <span className={cn("text-xs font-mono font-bold", opt.accent)}>
                                                    {opt.label}
                                                </span>
                                                <span className="text-[10px] font-mono text-zinc-500">
                                                    {opt.description}
                                                </span>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>

                            <div className="border-t border-zinc-800" />

                            {/* Register */}
                            <Link href="/register" onClick={() => setMobileOpen(false)}>
                                <Button className="w-full h-10 bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold tracking-widest uppercase rounded-sm">
                                    Registro de estudiante
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-3 px-3 py-3 bg-zinc-900 rounded-sm">
                                <Avatar className="w-8 h-8 rounded-sm border border-zinc-700 shrink-0">
                                    <AvatarImage src={currentUser?.image ?? undefined} />
                                    <AvatarFallback className="bg-zinc-800 text-blue-400 text-xs font-mono font-bold rounded-sm">
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
                                <Badge
                                    className={cn(
                                        "shrink-0 rounded-sm font-mono text-[9px] tracking-widest px-1.5 py-0 border",
                                        isAdmin
                                            ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                                            : "bg-zinc-800 text-zinc-400 border-zinc-700",
                                    )}
                                >
                                    {currentUser?.role ?? "USER"}
                                </Badge>
                            </div>

                            <Link
                                href="/profile"
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-2 px-3 py-2.5 text-xs font-mono text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-sm transition-colors"
                            >
                                <User className="w-3.5 h-3.5" />
                                Perfil
                            </Link>

                            {isAdmin && (
                                <Link
                                    href="/dashboard"
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center gap-2 px-3 py-2.5 text-xs font-mono text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-sm transition-colors"
                                >
                                    <LayoutGrid className="w-3.5 h-3.5" />
                                    Dashboard
                                </Link>
                            )}

                            <button
                                onClick={handleSignOut}
                                className="flex items-center gap-2 px-3 py-2.5 text-xs font-mono text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-sm transition-colors"
                            >
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                </svg>
                                Cerrar sesión
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};