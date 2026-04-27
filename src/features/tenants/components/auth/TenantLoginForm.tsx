"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    TenantLoginInput,
    TenantLoginSchema,
} from "@/features/tenants/validations/auth.schema";
import {
    Input,
    Label,
    Button,
    SingleFormError,
} from "@/features/shared/components/ui";
import { loginTenant } from "@/features/tenants/actions/auth.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const TenantLoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<TenantLoginInput>({
        resolver: zodResolver(TenantLoginSchema),
        mode: "onBlur",
    });

    const router = useRouter();

    const onSubmit = async (data: TenantLoginInput) => {
        const res = await loginTenant(data);

        if (!res.success) {
            toast.error(res.message, {
                description: "Intenta con otro email o revisa tu conexión",
                action: {
                    label: "Entendido",
                    onClick: () => toast.dismiss(),
                },
                position: "top-left",
            });
            return;
        }

        toast.success(res.message, {
            description: "Bienvenido de nuevo!",
            position: "top-left",
        });

        router.push(process.env.NEXT_PUBLIC_APP_URL || "/");
    };

    return (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="mb-6 text-center">
                <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
                    Iniciar Sesión
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Accede al panel de tu organización
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
                <div className="grid gap-2">
                    <Label htmlFor="email" className="text-slate-700 dark:text-slate-300">
                        Email
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="juan@ejemplo.com"
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

                <Button type="submit" disabled={isSubmitting} className="w-full mt-2">
                    {isSubmitting ? "Iniciando sesión..." : "Iniciar Sesión"}
                </Button>
            </form>

            {/* Link a register */}
            <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-5">
                ¿No tienes una organización?{" "}
                <Link
                    href="/tenants/auth/register"
                    className="text-blue-500 hover:text-blue-400 font-medium transition-colors"
                >
                    Crear una
                </Link>
            </p>
        </div>
    );
};