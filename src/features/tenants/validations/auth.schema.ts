// src/features/tenant/validations/auth.schema.ts
import z from "zod";

// ─── Login ───────────────────────────────────────────────────────────────────

export const TenantLoginSchema = z.object({
  email: z
    .string({ error: "El email es requerido" })
    .trim()
    .email("Email no válido"),
  password: z
    .string({ error: "La contraseña es requerida" })
    .trim()
    .min(8, { error: "Mínimo 8 caracteres" }),
});

// ─── Register ─────────────────────────────────────────────────────────────────

export const TenantRegisterSchema = z
  .object({
    // Datos del admin
    name: z
      .string({ error: "El nombre es requerido" })
      .trim()
      .min(3, { error: "Mínimo 3 caracteres" }),
    email: z
      .string({ error: "El email es requerido" })
      .trim()
      .email("Email no válido"),
    password: z
      .string({ error: "La contraseña es requerida" })
      .trim()
      .min(8, { error: "Mínimo 8 caracteres" }),
    passwordConfirmation: z
      .string({ error: "Confirma tu contraseña" })
      .trim()
      .min(8, { error: "Mínimo 8 caracteres" }),

    // Datos de la organización
    tenantName: z
      .string({ error: "El nombre de la organización es requerido" })
      .trim()
      .min(3, { error: "Mínimo 3 caracteres" }),
    tenantSlug: z
      .string({ error: "El slug es requerido" })
      .trim()
      .min(3, { error: "Mínimo 3 caracteres" })
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message: "Solo letras minúsculas, números y guiones (ej: mi-empresa)",
      }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Las contraseñas no coinciden",
    path: ["passwordConfirmation"],
  });

// ─── Types ────────────────────────────────────────────────────────────────────

export type TenantLoginInput = z.infer<typeof TenantLoginSchema>;
export type TenantRegisterInput = z.infer<typeof TenantRegisterSchema>;