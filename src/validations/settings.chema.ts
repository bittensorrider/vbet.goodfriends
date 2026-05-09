import { z } from "zod";

export const accountInformationSchema = z
    .object({
        name: z.string().min(1, "Name is required"),

        password: z
            .string()
            .min(8, "Password must be at least 8 characters"),


        bank: z
            .string()
            .min(1, "Bank cannot be empty"),


        account_number: z
            .string()
            .min(1, "Account number cannot be empty")
            .regex(/^\d+$/, "Account number must contain only digits"),

        withdrawal_password: z
            .string()
            .min(8, "Withdrawal password must be at least 8 characters"),
    })

export type AccountInformationData = z.infer<typeof accountInformationSchema>;
