import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().min(1),
  barangayAddress: z.string().min(1),
  province: z.string().min(1),
  city: z.string().min(1),
  businessName: z.string().min(1),
  businessType: z.string().min(1),
  idUpload: z.instanceof(File).or(z.null()),
  businessDocuments: z.instanceof(File).or(z.null()),
});
// unya na kung oks na ang set-up huhu
