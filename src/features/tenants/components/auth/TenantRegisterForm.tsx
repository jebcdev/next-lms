"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    TenantRegisterInput,
    TenantRegisterSchema,
} from "@/features/tenants/validations/auth.schema";
import {
    Input,
    Label,
    Button,
    SingleFormError,
} from "@/features/shared/components/ui";
import { registerTenant } from "@/features/tenants/actions/auth.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
import { slugify } from "@/lib/utils/slugify";

export const TenantRegisterForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<TenantRegisterInput>({
        resolver: zodResolver(TenantRegisterSchema),
        mode: "onBlur",
    });

    const router = useRouter();

    // Genera el slug automáticamente a medida que se escribe el nombre
    const tenantName = watch("tenantName");
    useEffect(() => {
        setValue("tenantSlug", slugify(tenantName ?? ""), {
            shouldValidate: true,
        });
    }, [tenantName, setValue]);

    const onSubmit = async (data: TenantRegisterInput) => {
        const res = await registerTenant(data);

        if (!res.success) {
            toast.error(res.message, {
                description: "Revisa los datos e intenta nuevamente",
                action: {
                    label: "Entendido",
                    onClick: () => toast.dismiss(),
                },
                position: "top-left",
            });
            return;
        }

        toast.success(res.message, {
            description: "Tu organización ha sido creada exitosamente",
            position: "top-left",
        });

        reset();
        router.push("/tenants/auth/login");
    };

    return (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="mb-6 text-center">
                <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
                    Crear Organización
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Registra tu empresa y empieza a crear cursos
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
                {/* ── Datos del administrador ── */}
                <div className="grid gap-1">
                    <p className="text-[11px] font-mono tracking-widest uppercase text-slate-400 dark:text-slate-500">
                        Datos del administrador
                    </p>
                    <div className="grid gap-4 pt-1">
                        <div className="grid gap-2">
                            <Label htmlFor="name" className="text-slate-700 dark:text-slate-300">
                                Nombre completo
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Juan García"
                                {...register("name")}
                            />
                            <SingleFormError message={errors.name?.message} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email" className="text-slate-700 dark:text-slate-300">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="juan@empresa.com"
                                {...register("email")}
                            />
                            <SingleFormError message={errors.email?.message} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password" className="text-slate-700 dark:text-slate-300">
                                Contraseña
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                {...register("password")}
                            />
                            <SingleFormError message={errors.password?.message} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="passwordConfirmation" className="text-slate-700 dark:text-slate-300">
                                Confirmar contraseña
                            </Label>
                            <Input
                                id="passwordConfirmation"
                                type="password"
                                placeholder="••••••••"
                                {...register("passwordConfirmation")}
                            />
                            <SingleFormError message={errors.passwordConfirmation?.message} />
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-200 dark:border-slate-800" />

                {/* ── Datos de la organización ── */}
                <div className="grid gap-1">
                    <p className="text-[11px] font-mono tracking-widest uppercase text-slate-400 dark:text-slate-500">
                        Datos de la organización
                    </p>
                    <div className="grid gap-4 pt-1">
                        <div className="grid gap-2">
                            <Label htmlFor="tenantName" className="text-slate-700 dark:text-slate-300">
                                Nombre de la organización
                            </Label>
                            <Input
                                id="tenantName"
                                type="text"
                                placeholder="Acme Corp"
                                {...register("tenantName")}
                            />
                            <SingleFormError message={errors.tenantName?.message} />
                        </div>

                        {/* Slug — solo lectura, generado automáticamente */}
                        <div className="grid gap-2">
                            <Label htmlFor="tenantSlug" className="text-slate-700 dark:text-slate-300">
                                URL de la organización{" "}
                                <span className="text-slate-400 font-normal">(generada automáticamente)</span>
                            </Label>
                            <div className="flex items-center rounded-md border border-slate-200 dark:border-slate-700 overflow-hidden bg-slate-50 dark:bg-slate-800/50">
                                <span className="px-3 py-2 text-xs font-mono text-slate-400 dark:text-slate-500 border-r border-slate-200 dark:border-slate-700 shrink-0 select-none">
                                    nextlms.com/
                                </span>
                                <Input
                                    id="tenantSlug"
                                    type="text"
                                    readOnly
                                    tabIndex={-1}
                                    className="border-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 font-mono text-sm bg-transparent text-slate-500 dark:text-slate-400 cursor-default"
                                    {...register("tenantSlug")}
                                />
                            </div>
                            <p className="text-[11px] text-slate-400 dark:text-slate-500">
                                Se genera a partir del nombre de tu organización
                            </p>
                            <SingleFormError message={errors.tenantSlug?.message} />
                        </div>
                    </div>
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full mt-1">
                    {isSubmitting ? "Creando organización..." : "Crear organización"}
                </Button>
            </form>

            {/* Link a login */}
            <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-5">
                ¿Ya tienes una cuenta?{" "}
                <Link
                    href="/tenants/auth/login"
                    className="text-blue-500 hover:text-blue-400 font-medium transition-colors"
                >
                    Iniciar sesión
                </Link>
            </p>
        </div>
    );
};