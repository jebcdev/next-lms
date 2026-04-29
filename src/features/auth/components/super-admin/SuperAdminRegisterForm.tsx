"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    SuperAdminRegisterData,
    SuperAdminRegisterSchema,
} from "../../validations/super-admins";
import {
    SingleFormError,
    Input,
    Label,
    Button,
} from "@/features/shared/components";
import { superAdminRegisterAction } from "../../actions/super-admins/super-admin-register.action";
import { toast } from "sonner";
import { consoleLogger } from "@/lib/logger/console-logger";
import { useRouter } from "next/navigation";

export const SuperAdminRegisterForm = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SuperAdminRegisterData>({
        resolver: zodResolver(SuperAdminRegisterSchema),
        mode: "onBlur",
    });

    const onSubmit = async (data: SuperAdminRegisterData) => {
        try {
            const validatedData = SuperAdminRegisterSchema.safeParse(data);
            if (!validatedData.success) {
                return toast.error(
                    "La información proporcionada no es válida",
                    {
                        position: "top-left",
                        action: {
                            label: "Entendido",
                            onClick: () => toast.dismiss(),
                        },
                    },
                );
            }

            const response = await superAdminRegisterAction(data);

            if (!response.success || !response.data || response.error) {
                toast.error(response.message || "Error en el registro", {
                    position: "top-left",
                    action: {
                        label: "Entendido",
                        onClick: () => toast.dismiss(),
                    },
                });
                return;
            }

            toast.success("¡Registro exitoso!", {
                description: `Bienvenido, ${response.data?.name}`,
                action: {
                    label: "Entendido",
                    onClick: () => toast.dismiss(),
                },
            });

            router.push("/dashboard/super-admin");
        } catch (error) {
            consoleLogger({ "Error en SuperAdminRegisterForm:": error });
            toast.error("Error inesperado", {
                position: "top-left",
                action: {
                    label: "Entendido",
                    onClick: () => toast.dismiss(),
                },
            });
        }
    };

    return (
        <>
            <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input
                        id="name"
                        type="text"
                        placeholder="Super Admin"
                        {...register("name")}
                    />
                    <SingleFormError message={errors.name?.message} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="superadmin@ejemplo.com"
                        {...register("email")}
                    />
                    <SingleFormError message={errors.email?.message} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        {...register("password")}
                    />
                    <SingleFormError message={errors.password?.message} />
                </div>

                <div>
                    <Button type="submit" disabled={isSubmitting} className="w-full">
                        {isSubmitting ? "Registrando..." : "Registrarse"}
                    </Button>
                </div>
            </form>
        </>
    );
};