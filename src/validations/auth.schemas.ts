import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required")
});
export type LoginSchema = z.infer<typeof loginSchema>


export const registerSchema = z
    .object({
        email: z.string().email("Invalid email address"),

        email_code: z
            .string()
            .length(6, "Email code must be 6 char"),

        password: z
            .string()
            .min(8, "Password must be at least 8 characters"),

        nickname: z
            .string()
            .min(3, "Nickname must be at least 3 characters")
            .max(20, "Nickname must be at most 20 characters")
            .regex(
                /^[a-zA-Z0-9_]+$/,
                "Nickname can only contain letters, numbers, and underscores"
            )
    })

export type RegisterSchema = z.infer<typeof registerSchema>;


export const verifyEmailSchema = z.object({
    code: z
        .string()
        .length(6, "Verification code must be exactly 6 digits")
        .regex(/^\d{6}$/, "Verification code must be 6 digits"),
});

export type VerifyEmailSchema = z.infer<typeof verifyEmailSchema>;


export const resetPasswordSchema = z
    .object({
        email: z.string().email("Invalid email address"),

        email_code: z
            .string()
            .length(6, "Email code must be 6 digits")
            .regex(/^\d{6}$/, "Email code must contain only digits"),

        new_password: z.string().min(8, "Password must be at least 8 characters"),
        password_confirmation: z.string().min(8, "Password confirmation must be at least 8 characters"),
    })
    .superRefine(({ new_password, password_confirmation }, ctx) => {
        if (new_password !== password_confirmation) {
            ctx.addIssue({
                path: ["password_confirmation"],
                code: "custom",
                message: "Passwords do not match",
            });
        }
    });

export const updatePasswordSchema = z
    .object({
        email: z.string().email("Invalid email address"),

        email_code: z.string().length(6, "Email code must be 6 char"),


        new_password: z.string().min(8, "Password must be at least 8 characters"),
        password_confirmation: z.string().min(8, "Password confirmation must be at least 8 characters"),
    })
    .superRefine(({ new_password, password_confirmation }, ctx) => {
        if (new_password !== password_confirmation) {
            ctx.addIssue({
                path: ["password_confirmation"],
                code: "custom",
                message: "Passwords do not match",
            });
        }
    });

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
export type UpdatePasswordSchema = z.infer<typeof updatePasswordSchema>;