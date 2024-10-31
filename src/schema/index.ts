
import { z } from 'zod';

export const signupSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    username: z.string().min(2, { message: "Username must be at least 2 characters" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});