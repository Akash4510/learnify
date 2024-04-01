import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Not a valid email address",
  }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be atlease 6 characters",
    }),
});

export type LoginSchema = z.infer<typeof LoginSchema>;

export const RegisterSchema = z
  .object({
    name: z.string().min(1, {
      message: "Name is required",
    }),
    email: z.string().email({
      message: "Not a valid email address",
    }),
    password: z.string().min(6, {
      message: "Password must be atlease 6 characters",
    }),
    confirmPassword: z.string().min(1, {
      message: "Password confirmation is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof RegisterSchema>;

export const ResetPasswordSchema = z.object({
  email: z.string().email({
    message: "Not a valid email address",
  }),
});

export type ResetPasswordSchema = z.infer<typeof ResetPasswordSchema>;

export const NewPasswordSchema = z
  .object({
    password: z.string().min(6, {
      message: "Password must be atlease 6 characters",
    }),
    confirmPassword: z.string().min(6, {
      message: "Password must be atlease 6 characters",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type NewPasswordSchema = z.infer<typeof NewPasswordSchema>;

export const UpdateAccountSchema = z.object({
  name: z.string().optional(),
});

export type UpdateAccountSchema = z.infer<typeof UpdateAccountSchema>;
