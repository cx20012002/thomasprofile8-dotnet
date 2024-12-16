import { z } from "zod";

export const subscriptionSchema = z.object({
  email: z.string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
});

export type SubscriptionSchema = z.infer<typeof subscriptionSchema>;