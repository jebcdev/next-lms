"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    StudentRegisterData,
    StudentRegisterSchema,
} from "../../validations/students";
import {
    SingleFormError,
    Input,
    Label,
    Button,
} from "@/features/shared/components";
import { studentRegisterAction } from "../../actions/students/student-register.action";
import { toast } from "sonner";
import { consoleLogger } from "@/lib/logger/console-logger";
import { useRouter } from "next/navigation";

interface Props {
    tenants: {
        id: string;
        name: string;
    }[];
}

export const StudentRegisterForm = ({ tenants }: Props) => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<StudentRegisterData>({
        resolver: zodResolver(StudentRegisterSchema),
        mode: "onBlur",
        defaultValues: {
            
        },
    });

    const onSubmit = async (data: StudentRegisterData) => {
        try {
            const validatedData = StudentRegisterSchema.safeParse(data);
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

            const response = await studentRegisterAction(data);

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

            router.push("/dashboard/students");
        } catch (error) {
            consoleLogger({ "Error en StudentRegisterForm:": error });
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
                    <Label htmlFor="tenantId">Institución</Label>
                    <select
                        id="tenantId"
                        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        {...register("tenantId")}
                    >
                        <option value="">Selecciona una institución</option>
                        {tenants.map((tenant) => (
                            <option key={tenant.id} value={tenant.id}>
                                {tenant.name}
                            </option>
                        ))}
                    </select>
                    <SingleFormError message={errors.tenantId?.message} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input
                        id="name"
                        type="text"
                        placeholder="Juan Estudiante"
                        {...register("name")}
                    />
                    <SingleFormError message={errors.name?.message} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="estudiante@ejemplo.com"
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