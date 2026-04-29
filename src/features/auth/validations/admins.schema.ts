import z from "zod";
import { Role } from "@/generated/prisma/enums";

export const AdminLoginSchema = z.object({
    role: z
        .nativeEnum(Role, {
            error: "Rol inválido",
        })
        .refine((val) => val === Role.ADMIN, {
            error: "El rol debe ser ADMIN",
        }),

    email: z
        .string({ error: "El email es requerido" })
        .trim()
        .email("Email no válido"),

    password: z
        .string({ error: "La contraseña es requerida" })
        .trim()
        .min(8, { error: "Mínimo 8 caracteres" }),
});

export type AdminLoginData = z.infer<typeof AdminLoginSchema>;
