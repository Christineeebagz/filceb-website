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
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(1, "Phone is required"),
  barangayAddress: z.string().min(1, "Barangay address is required"),
  province: z.string().min(1, "Province is required"),
  city: z.string().min(1, "City is required"),
  businessName: z.string().min(1, "Business name is required"),
  businesstype: z.enum(BUSINESS_TYPES),
  idUpload: z.string().min(1, "ID Upload is required"),
  businessDocuments: z.string().min(1, "Business document is required"),
});
