"use client";

import { useMemo } from "react";
import {
    Mail,
    Calendar,
    Shield,
    GraduationCap,
    BookOpen,
    BadgeCheck,
    Clock,
} from "lucide-react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/features/shared/components/ui/card";
import {
    Avatar,
    AvatarImage,
    AvatarFallback,
} from "@/features/shared/components/ui/avatar";
import { Badge } from "@/features/shared/components/ui/badge";

import { cn } from "@/lib/utils";
import { Role } from "@/generated/prisma/enums";

type UserRole = "SUPER_ADMIN" | "ADMIN" | "INSTRUCTOR" | "STUDENT";

interface ProfileCardProps {
    user: {
        id: string;
        name: string;
        email: string;
        emailVerified: boolean;
        image?: string | null;
        role: UserRole;
        isActive: boolean;
        banned: boolean | null;
        banReason: string | null;
        createdAt: Date;
        updatedAt: Date;
        tenant?: {
            name: string;
            slug: string;
        } | null;
        courses?: {
            id: string;
            title: string;
        }[];
        enrollments?: {
            id: string;
        }[];
    };
    className?: string;
}

export const ProfileCard = ({
    user,
    className,
}: ProfileCardProps) => {
    const initials = useMemo(() => {
        if (!user.name) return "U";
        return user.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    }, [user.name]);

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
        }).format(new Date(date));
    };

    const getRoleBadge = () => {
        const roleConfig: Record<
            UserRole,
            {
                label: string;
                className: string;
                icon: React.ReactNode;
            }
        > = {
            [Role.SUPER_ADMIN]: {
                label: "SUPER ADMIN",
                className:
                    "bg-purple-500/10 text-purple-500 border-purple-500/30",
                icon: <Shield className="size-3" />,
            },
            [Role.ADMIN]: {
                label: "ADMIN",
                className:
                    "bg-blue-500/10 text-blue-500 border-blue-500/30",
                icon: <Shield className="size-3" />,
            },
            [Role.INSTRUCTOR]: {
                label: "INSTRUCTOR",
                className:
                    "bg-green-500/10 text-green-500 border-green-500/30",
                icon: <GraduationCap className="size-3" />,
            },
            [Role.STUDENT]: {
                label: "ESTUDIANTE",
                className:
                    "bg-amber-500/10 text-amber-500 border-amber-500/30",
                icon: <BookOpen className="size-3" />,
            },
        };

        const config = roleConfig[user.role];
        if (!config) return null;

        return (
            <Badge
                variant="outline"
                className={cn(
                    config.className,
                    "gap-1 rounded-md font-mono text-[10px] tracking-wider uppercase",
                )}
            >
                {config.icon}
                {config.label}
            </Badge>
        );
    };

    return (
        <Card
            className={cn(
                "group relative overflow-hidden bg-linear-to-br from-card via-card to-card/80",
                className,
            )}
        >
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <CardHeader className="relative pb-2">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Avatar
                                size="lg"
                                className="size-20 ring-2 ring-background shadow-lg"
                            >
                                <AvatarImage
                                    src={user.image || undefined}
                                    alt={user.name}
                                    className="object-cover"
                                />
                                <AvatarFallback className="text-xl font-medium">
                                    {initials}
                                </AvatarFallback>
                            </Avatar>
                            {user.emailVerified && (
                                <span className="absolute bottom-0 right-0 flex size-5 items-center justify-center rounded-full bg-green-500 text-background ring-2 ring-background">
                                    <BadgeCheck className="size-3" />
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col gap-1">
                            <CardTitle className="text-xl font-semibold tracking-tight">
                                {user.name}
                            </CardTitle>
                            <CardDescription className="flex items-center gap-1.5 text-sm">
                                <Mail className="size-3.5 text-muted-foreground" />
                                {user.email}
                            </CardDescription>
                            <div className="mt-1">
                                {getRoleBadge()}
                            </div>
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="relative grid gap-4 pt-2 sm:grid-cols-2">
                <div className="group/item grid grid-cols-[auto_1fr] items-center gap-3 rounded-md p-3 transition-colors hover:bg-muted/50">
                    <div className="flex size-9 items-center justify-center rounded-md bg-primary/5 text-primary/70">
                        <Calendar className="size-4" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <span className="text-xs font-medium text-muted-foreground">
                            Miembro desde
                        </span>
                        <span className="text-sm font-medium">
                            {formatDate(user.createdAt)}
                        </span>
                    </div>
                </div>

                {user.tenant && (
                    <div className="group/item grid grid-cols-[auto_1fr] items-center gap-3 rounded-md p-3 transition-colors hover:bg-muted/50">
                        <div className="flex size-9 items-center justify-center rounded-md bg-primary/5 text-primary/70">
                            <Shield className="size-4" />
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <span className="text-xs font-medium text-muted-foreground">
                                Organización
                            </span>
                            <span className="text-sm font-medium">
                                {user.tenant.name}
                            </span>
                        </div>
                    </div>
                )}

                {(user.courses?.length ?? 0) > 0 && (
                    <div className="group/item grid grid-cols-[auto_1fr] items-center gap-3 rounded-md p-3 transition-colors hover:bg-muted/50">
                        <div className="flex size-9 items-center justify-center rounded-md bg-primary/5 text-primary/70">
                            <BookOpen className="size-4" />
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <span className="text-xs font-medium text-muted-foreground">
                                Cursos creados
                            </span>
                            <span className="text-sm font-medium">
                                {user.courses?.length ?? 0}
                            </span>
                        </div>
                    </div>
                )}

                {(user.enrollments?.length ?? 0) > 0 && (
                    <div className="group/item grid grid-cols-[auto_1fr] items-center gap-3 rounded-md p-3 transition-colors hover:bg-muted/50">
                        <div className="flex size-9 items-center justify-center rounded-md bg-primary/5 text-primary/70">
                            <GraduationCap className="size-4" />
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <span className="text-xs font-medium text-muted-foreground">
                                Cursos inscritos
                            </span>
                            <span className="text-sm font-medium">
                                {user.enrollments?.length ?? 0}
                            </span>
                        </div>
                    </div>
                )}

                <div className="group/item grid grid-cols-[auto_1fr] items-center gap-3 rounded-md p-3 transition-colors hover:bg-muted/50">
                    <div
                        className={cn(
                            "flex size-9 items-center justify-center rounded-md",
                            user.isActive
                                ? "bg-green-500/10 text-green-600"
                                : "bg-red-500/10 text-red-600",
                        )}
                    >
                        {user.isActive ? (
                            <BadgeCheck className="size-4" />
                        ) : (
                            <Clock className="size-4" />
                        )}
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <span className="text-xs font-medium text-muted-foreground">
                            Estado
                        </span>
                        <span
                            className={cn(
                                "text-sm font-medium",
                                user.isActive
                                    ? "text-green-600"
                                    : "text-red-600",
                            )}
                        >
                            {user.isActive ? "Activo" : "Inactivo"}
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
