import { z } from "zod";

export const signUpFormSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .refine(
      (password) => {
        return password.length > 6;
      },
      { message: "Password must be at least 6 characters long" },
    ),
});

export const signInFormSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(1, { message: "Password is required" }),
});
