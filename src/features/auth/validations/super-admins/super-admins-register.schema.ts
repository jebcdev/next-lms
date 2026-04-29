import z from "zod";
import { Role } from "@/generated/prisma/enums";

export const SuperAdminRegisterSchema = z.object({
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

export type SuperAdminRegisterData = z.infer<typeof SuperAdminRegisterSchema>;