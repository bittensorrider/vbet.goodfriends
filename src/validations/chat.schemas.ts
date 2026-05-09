import { z } from "zod";

export const sendMessageSchema = z.object({
    message: z
        .string({ required_error: "Message content is required" })
        .trim()
        .min(1, "Message can't be empty")
        .max(1000, "Message can't exceed 1000 characters"),
});

export type sendMessageForm = z.infer<typeof sendMessageSchema>