"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    SuperAdminLoginData,
    SuperAdminLoginSchema,
} from "../../validations/super-admins.schema";
import {
    SingleFormError,
    Input,
    Label,
    Button,
} from "@/features/shared/components";
import { superAdminLoginAction } from "../../actions/super-admin-login.action";
import { toast } from "sonner";
import { consoleLogger } from "@/lib/logger/console-logger";
import { useRouter } from "next/navigation";

export const SuperAdminLoginForm = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SuperAdminLoginData>({
        resolver: zodResolver(SuperAdminLoginSchema),
        mode: "onBlur",
        defaultValues: {
            role: "SUPER_ADMIN",
        },
    });

    const onSubmit = async (data: SuperAdminLoginData) => {
        try {
            const validatedData = SuperAdminLoginSchema.safeParse(data);
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

            const response = await superAdminLoginAction(data);

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
                description: `Bienvenido de nuevo, ${response.data?.name || "super admin"}!`,
                action: {
                    label: "Entendido",
                    onClick: () => toast.dismiss(),
                },
            });

            router.push("/dashboard/super-admin");
        } catch (error) {
            consoleLogger({ "Error en SuperAdminLoginForm:": error });
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
                        placeholder="superadmin@ejemplo.com"
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