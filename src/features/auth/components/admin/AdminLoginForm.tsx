"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    AdminLoginData,
    AdminLoginSchema,
} from "../../validations/admins.schema";
import {
    SingleFormError,
    Input,
    Label,
    Button,
} from "@/features/shared/components";
import { adminLoginAction } from "../../actions/admin-login.action";
import { toast } from "sonner";
import { consoleLogger } from "@/lib/logger/console-logger";
import { useRouter } from "next/navigation";

export const AdminLoginForm = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<AdminLoginData>({
        resolver: zodResolver(AdminLoginSchema),
        mode: "onBlur",
        defaultValues: {
            role: "ADMIN",
        },
    });

    const onSubmit = async (data: AdminLoginData) => {
        try {
            const validatedData = AdminLoginSchema.safeParse(data);
            if (!validatedData.success) {
                return toast.error(
                    "La información proporcionada no es válida. Por favor, revisa los campos e inténtalo de nuevo.",
                    {
                        description:
                            "Asegúrate de que el email tenga un formato correcto y que la contraseña cumpla con los requisitos.",
                        position: "top-left",
                        action: {
                            label: "Entendido",
                            onClick: () => toast.dismiss(),
                        },
                    },
                );
            }

            const response = await adminLoginAction(data);

            if (!response.success || !response.data || response.error) {
                toast.error(
                    response.message || "Error en el inicio de sesión. Por favor, inténtalo de nuevo.",
                    {
                        description:
                            "Si el problema persiste, contacta al soporte.",
                        position: "top-left",
                        action: {
                            label: "Entendido",
                            onClick: () => toast.dismiss(),
                        },
                    },
                );
                return;
            }

            toast.success("¡Inicio de sesión exitoso!", {
                description: `Bienvenido de nuevo, ${response.data?.name || "admin"}!`,
                action: {
                    label: "Entendido",
                    onClick: () => toast.dismiss(),
                },
            });

            router.push("/dashboard/admins");
        } catch (error) {
            consoleLogger({ "Error en AdminLoginForm:": error });
            toast.error(
                "Error inesperado. Por favor, inténtalo de nuevo.",
                {
                    description: "Si el problema persiste, contacta al soporte.",
                    position: "top-left",
                    action: {
                        label: "Entendido",
                        onClick: () => toast.dismiss(),
                    },
                },
            );
        }
    };

    return (
        <>
            <form
                className="grid gap-4"
                onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="admin@ejemplo.com"
                        {...register("email")}
                    />
                    <SingleFormError
                        message={errors.email?.message}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        {...register("password")}
                    />
                    <SingleFormError
                        message={errors.password?.message}
                    />
                </div>

                <div>
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full"
                    >
                        {isSubmitting
                            ? "Iniciando sesión..."
                            : "Iniciar sesión"}
                    </Button>
                </div>
            </form>
        </>
    );
};