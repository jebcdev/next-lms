import z from "zod";
import { Plan } from "@/generated/prisma/enums";

export const AdminRegisterSchema = z.object({
    // Datos del usuario
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

    // Datos de la organización (tenant)
    tenantName: z
        .string({ error: "El nombre de la organización es requerido" })
        .trim()
        .min(2, { error: "Mínimo 2 caracteres" })
        .max(100, { error: "Máximo 100 caracteres" }),

    tenantSlug: z
        .string({ error: "El subdominio es requerido" })
        .trim()
        .toLowerCase()
        .min(3, { error: "Mínimo 3 caracteres" })
        .max(50, { error: "Máximo 50 caracteres" })
        .regex(/^[a-z0-9-]+$/, {
            error: "Solo letras minúsculas, números y guiones",
        })
        .optional()
        .or(z.literal("")),

    plan: z.nativeEnum(Plan, {
        error: "Plan inválido",
    }),
});

export type AdminRegisterData = z.infer<typeof AdminRegisterSchema>;