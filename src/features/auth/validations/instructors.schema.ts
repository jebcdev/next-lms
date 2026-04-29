import z from "zod";
import { Role } from "@/generated/prisma/enums";

export const InstructorLoginSchema = z.object({
    role: z.nativeEnum(Role, {
        error: "Rol inválido",
    })      .refine((val) => val === Role.INSTRUCTOR, {
            error: "El rol debe ser INSTRUCTOR",
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

export type InstructorLoginData = z.infer<typeof InstructorLoginSchema>;