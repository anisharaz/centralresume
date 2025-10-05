import { z } from "zod";

export const createOauthClientSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().optional(),
  redirectUri: z.string().url("Please enter a valid URL"),
  icon: z.string().optional(),
  website: z.string().url("Please enter a valid URL").optional(),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(8, { message: "Minimum 8 character" }),
  })
  .refine((data) => data.newPassword !== "", {
    message: "New password is required",
    path: ["newPassword"],
  });

export const signupSchema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Minimum 8 character" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
