import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ message: "Passed identifier not seems to be string." })
    .trim(),
  password: z
    .string({ message: "Passed password not seems to be string." })
    .trim(),
});

export type loginType = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  email: z
    .string({ message: "Passed identifier not seems to be string." }) // ? Is string checked for alphanumeric characters
    .trim()
    .min(3, { message: "Identifier needs to be at least 3 characters long." })
    .max(345, { message: "Identifier needs to be at most 345 characters long." }),
  password: z
    .string({ message: "Passed password not seems to be string." }) // ? Is string checked for alphanumeric characters
    .trim()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{,}$/, { message: "Password must contain at least one letter, one number and one special character." })
    .min(8, { message: "Password needs to be at least 8 characters long." })
    .max(128, { message: "Password needs to be at most 128 characters long." }),
  name: z
    .string({ message: "Passed username not seems to be string." }) // ? Is string checked for alphanumeric characters
    .trim()
    .min(3, { message: "Username needs to be at least 3 characters long." })
    .max(32, { message: "Username needs to be at most 32 characters long." })
    .optional(),
});

export type registerType = z.infer<typeof registerSchema>;