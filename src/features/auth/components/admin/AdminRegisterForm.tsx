"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    AdminRegisterData,
    AdminRegisterSchema,
} from "../../validations/admins";
import {
    SingleFormError,
    Input,
    Label,
    Button,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/features/shared/components";
import { adminRegisterAction } from "../../actions/admins/admin-register.action";
import { toast } from "sonner";
import { consoleLogger } from "@/lib/logger/console-logger";
import { useRouter } from "next/navigation";
import { Plan } from "@/generated/prisma/enums";
import { slugify } from "@/lib/utils/slugify";

export const AdminRegisterForm = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<AdminRegisterData>({
        resolver: zodResolver(AdminRegisterSchema),
        mode: "onBlur",
    });

    const selectedPlan = watch("plan");
    const tenantNameValue = watch("tenantName");

    useEffect(() => {
        if (tenantNameValue) {
            const generatedSlug = slugify(tenantNameValue);
            setValue("tenantSlug", generatedSlug, { shouldValidate: true });
        }
    }, [tenantNameValue, setValue]);

    const onSubmit = async (data: AdminRegisterData) => {
        try {
            const validatedData = AdminRegisterSchema.safeParse(data);
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

            const response = await adminRegisterAction(data);

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

            toast.success("¡Organización creada!", {
                description: `Bienvenido, ${response.data?.name}`,
                action: {
                    label: "Entendido",
                    onClick: () => toast.dismiss(),
                },
            });

            router.push("/dashboard/admins");
        } catch (error) {
            consoleLogger({ "Error en AdminRegisterForm:": error });
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
                    <Label htmlFor="name">Tu nombre</Label>
                    <Input
                        id="name"
                        type="text"
                        placeholder="Juan Pérez"
                        {...register("name")}
                    />
                    <SingleFormError message={errors.name?.message} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="admin@miempresa.com"
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

                <hr className="my-2" />

                <div className="grid gap-2">
                    <Label htmlFor="tenantName">Nombre de la organización</Label>
                    <Input
                        id="tenantName"
                        type="text"
                        placeholder="Mi Empresa"
                        {...register("tenantName")}
                    />
                    <SingleFormError message={errors.tenantName?.message} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="tenantSlug">Subdominio</Label>
                    <Input
                        id="tenantSlug"
                        type="text"
                        placeholder="mi-empresa"
                        disabled
                        {...register("tenantSlug")}
                    />
                    <SingleFormError message={errors.tenantSlug?.message} />
                    <p className="text-xs text-muted-foreground">
                        Tu URL será: mi-empresa.tudominio.com
                    </p>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="plan">Plan</Label>
                    <Select
                        value={selectedPlan}
                        onValueChange={(value) =>
                            setValue("plan", value as Plan, { shouldValidate: true })
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Selecciona un plan" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="FREE">Free</SelectItem>
                            <SelectItem value="STARTER">Starter</SelectItem>
                            <SelectItem value="PRO">Pro</SelectItem>
                            <SelectItem value="ENTERPRISE">Enterprise</SelectItem>
                        </SelectContent>
                    </Select>
                    <SingleFormError message={errors.plan?.message} />
                </div>

                <div>
                    <Button type="submit" disabled={isSubmitting} className="w-full">
                        {isSubmitting
                            ? "Creando organización..."
                            : "Crear organización"}
                    </Button>
                </div>
            </form>
        </>
    );
};