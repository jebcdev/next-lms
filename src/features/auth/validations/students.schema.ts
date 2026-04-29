import z from "zod";
import { Role } from "@/generated/prisma/enums";

export const StudentLoginSchema = z.object({
    role: z
        .nativeEnum(Role, {
            error: "Rol inválido",
        })
        .refine((val) => val === Role.STUDENT, {
            error: "El rol debe ser STUDENT",
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

export type StudentLoginData = z.infer<typeof StudentLoginSchema>;
