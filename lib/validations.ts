// validations.ts
import { z } from "zod";

// Export the business types as both array and type
export const BUSINESS_TYPES = [
  "CORPORATION",
  "SOLE PROPRIETORSHIP",
  "PARTNERSHIP",
  "COOPERATIVE",
  "OTHERS",
] as const;

// Create a TypeScript type from the array
export type BusinessType = (typeof BUSINESS_TYPES)[number];

export const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const registerSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().min(1),
  barangayAddress: z.string().min(1),
  province: z.string().min(1),
  city: z.string().min(1),
  businessName: z.string().min(1),
  businesstype: z.enum(BUSINESS_TYPES),
  idUpload: z.string(),
  businessDocuments: z.string(),
});
