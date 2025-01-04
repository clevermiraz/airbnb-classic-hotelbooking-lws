import { z } from "zod";

export const userSchema = z.object({
    fullName: z
        .string()
        .min(1, { message: "Full name is required." })
        .max(50, { message: "Full name cannot exceed 50 characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters long." })
        .max(100, { message: "Password cannot exceed 100 characters." }),
});
