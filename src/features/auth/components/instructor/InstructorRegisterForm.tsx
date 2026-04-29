"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    InstructorRegisterData,
    InstructorRegisterSchema,
} from "../../validations/instructors";
import {
    SingleFormError,
    Input,
    Label,
    Button,
} from "@/features/shared/components";
import { instructorRegisterAction } from "../../actions/instructors/instructor-register.action";
import { toast } from "sonner";
import { consoleLogger } from "@/lib/logger/console-logger";
import { useRouter } from "next/navigation";

interface InstructorRegisterFormProps {
    tenantId: string;
}

export const InstructorRegisterForm = ({
    tenantId,
}: InstructorRegisterFormProps) => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<InstructorRegisterData>({
        resolver: zodResolver(InstructorRegisterSchema),
        mode: "onBlur",
        defaultValues: {
            tenantId,
        },
    });

    const onSubmit = async (data: InstructorRegisterData) => {
        try {
            const validatedData = InstructorRegisterSchema.safeParse(data);
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

            const response = await instructorRegisterAction(data);

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

            router.push("/dashboard/instructors");
        } catch (error) {
            consoleLogger({ "Error en InstructorRegisterForm:": error });
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
                        placeholder="Juan Instructor"
                        {...register("name")}
                    />
                    <SingleFormError message={errors.name?.message} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="instructor@ejemplo.com"
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