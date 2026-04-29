import z from "zod";
import { Role } from "@/generated/prisma/enums";

export const StudentRegisterSchema = z.object({
    tenantId: z
        .string({ error: "El ID de la organización es requerido" })
        .min(1, { error: "El ID de la organización es requerido" }),

    name: z
        .string({ error: "El nombre es requerido" })
        .trim()
        .min(2, { error: "Mínimo 2 caracteres" })
        .max(100, { error: "Máximo 100 caracteres" }),

    email: z
        .string({ error: "El email es requerido" })
        .trim()
        .email("Email no válido"),

    password: z
        .string({ error: "La contraseña es requerida" })
        .trim()
        .min(8, { error: "Mínimo 8 caracteres" }),
});

export type StudentRegisterData = z.infer<typeof StudentRegisterSchema>;