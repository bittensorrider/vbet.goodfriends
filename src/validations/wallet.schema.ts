import { z } from "zod";

export const depositCryptoSchema = z.object({
    network: z.string().min(1, "Network is required"),
    currency: z.string().min(1, "Currency is required"),
});

export const depositFiatSchema = z.object({
    method: z.string().min(1, "Choose method"),
    depositor_name: z.string().min(1, "Depositor name is required"),
    amount: z
        .string()
        .min(1, "Amount is required")
        .regex(/^(?!0\.00)\d+(\.\d{1,8})?$/, "Enter a valid amount"),
});

export const withdrawalCryptoSchema = z.object({
    network: z.string().min(1, "Network is required"),
    currency: z.string().min(1, "Currency is required"),
    address: z.string().min(1, "Address is required"),
    amount: z
        .string()
        .min(1, "Amount is required")
        .regex(/^(?!0\.00)\d+(\.\d{1,8})?$/, "Enter a valid amount"),
});

export const withdrawalFiatSchema = z.object({
    currency: z.string().min(1, "Currency is required"),
    bank: z.string().min(1, "Bank name is required!"),
    account_number: z.string().min(1, "Account number is required!"),
    withdrawal_name: z.string().min(1, "Withdrawal name is required!"),
    withdrawal_password: z.string().min(1, "Withdrawal passwors is required!"),
    amount: z
        .number()
        .min(0, "Amount is required")
});

export type DepositCryptoSchema = z.infer<typeof depositCryptoSchema>
export type DepositFiatSchema = z.infer<typeof depositFiatSchema>
export type WithdrawalCryptoSchema = z.infer<typeof withdrawalCryptoSchema>
export type WithdrawalFiatSchema = z.infer<typeof withdrawalFiatSchema>
