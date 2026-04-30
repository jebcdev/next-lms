"use client";

import { TenantWithCounts } from "@/features/super-admin/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/features/shared/components/ui/card";
import { Badge } from "@/features/shared/components/ui/badge";
import { Button } from "@/features/shared/components/ui/button";
import { MoreHorizontal, Pencil, ExternalLink, Users, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  tenant: TenantWithCounts;
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
};

const planColors = {
  FREE: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  STARTER: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  PRO: "bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300",
  ENTERPRISE: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
};

const planLabels = {
  FREE: "Gratis",
  STARTER: "Starter",
  PRO: "Pro",
  ENTERPRISE: "Enterprise",
};

export const TenantCard = ({ tenant }: Props) => {
  const tenantInitials = tenant.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 dark:hover:shadow-primary/10">
      <div className="absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-violet-500 via-purple-500 to-fuchsia-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <CardHeader className="relative flex flex-row items-start justify-between pb-2">
        <div className="flex items-center gap-3">
          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 border-violet-100 bg-linear-to-br from-violet-50 to-fuchsia-50 dark:border-violet-900 dark:from-violet-950 dark:to-fuchsia-950">
            {tenant.logo ? (
              <Image
                src={tenant.logo}
                alt={tenant.name}
                fill
                className="object-cover"
              />
            ) : (
              <span className="text-lg font-bold text-violet-600 dark:text-violet-400">
                {tenantInitials}
              </span>
            )}
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-lg font-semibold text-foreground">
              {tenant.name}
            </h3>
            <p className="truncate text-sm text-muted-foreground">
              {tenant.slug}.nextlms.com
            </p>
          </div>
        </div>

        <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`flex h-2.5 w-2.5 rounded-full ${
                tenant.isActive
                  ? "animate-pulse bg-emerald-500"
                  : "bg-rose-500"
              }`}
            />
            <span className="text-sm font-medium">
              {tenant.isActive ? "Activo" : "Inactivo"}
            </span>
          </div>
          <Badge className={`${planColors[tenant.plan]} border-0 font-medium`}>
            {planLabels[tenant.plan]}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-3 rounded-lg bg-muted/50 p-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900">
              <Users className="h-4 w-4 text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Usuarios</p>
              <p className="text-sm font-semibold">{tenant._count?.users || 0}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-fuchsia-100 dark:bg-fuchsia-900">
              <BookOpen className="h-4 w-4 text-fuchsia-600 dark:text-fuchsia-400" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Cursos</p>
              <p className="text-sm font-semibold">{tenant._count?.courses || 0}</p>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t bg-muted/30 pt-3">
        <div className="flex w-full items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Creado {formatDate(tenant.createdAt)}
          </span>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <Pencil className="mr-1 h-3.5 w-3.5" />
              Editar
            </Button>
            <Button variant="ghost" size="sm" className="h-8 px-2" asChild>
              <Link href={`/dashboard/super-admin/tenants/${tenant.id}`}>
                <ExternalLink className="mr-1 h-3.5 w-3.5" />
                Ver
              </Link>
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};