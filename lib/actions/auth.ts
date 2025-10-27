"use server";
import { eq } from "drizzle-orm";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { hash } from "bcryptjs";
import { signIn, signOut } from "@/auth";
import { revalidatePath } from "next/cache";
import { AuthCredentials } from "@/types";
import { compare } from "bcryptjs";

export const register = async (params: {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  barangayAddress: string;
  province: string;
  city: string;
  businessName: string;
  businesstype: string;
  idUpload: string | null;
  businessDocuments: string | null;
}) => {
  const {
    email,
    firstName,
    lastName,
    phone,
    barangayAddress,
    province,
    city,
    businessName,
    businesstype,
    idUpload,
    businessDocuments,
  } = params;

  console.log("Registration attempt for:", email);

  try {
    // Find the existing user by email
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length === 0) {
      return { success: false, error: "User not found. Please sign up first." };
    }

    // Update the user
    const updateData: any = {
      firstName,
      lastName,
      phone,
      barangayAddress,
      province,
      city,
      businessName,
      idUpload,
      businessDocuments,
      status: "PENDING",
    };

    if (businesstype) {
      updateData.businesstype = businesstype;
    }

    await db.update(users).set(updateData).where(eq(users.email, email));

    console.log("Registration successful for:", email);

    // Debug logging
    console.log("Database update completed. New status should be: PENDING");

    // Verify the update worked by fetching the user again
    const updatedUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    console.log("Verified user status after update:", updatedUser[0]?.status);

    // Clear all caches
    revalidatePath("/", "layout");
    revalidatePath("/(root)", "layout");

    return { success: true };
  } catch (error: any) {
    console.error("Registration error details:", error);
    return {
      success: false,
      error: error.message || "Failed to complete registration",
    };
  }
};

// Add this new function to handle registration with session refresh
export const registerAndRefresh = async (params: {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  barangayAddress: string;
  province: string;
  city: string;
  businessName: string;
  businesstype: string;
  idUpload: string | null;
  businessDocuments: string | null;
  password: string; // We need the password to sign back in
}) => {
  const {
    email,
    firstName,
    lastName,
    phone,
    barangayAddress,
    province,
    city,
    businessName,
    businesstype,
    idUpload,
    businessDocuments,
    password,
  } = params;

  try {
    // First, update the user data
    const updateResult = await register({
      email,
      firstName,
      lastName,
      phone,
      barangayAddress,
      province,
      city,
      businessName,
      businesstype,
      idUpload,
      businessDocuments,
    });

    if (!updateResult.success) {
      return updateResult;
    }

    // Force sign out and sign back in to refresh session
    await signOut({ redirect: false });

    // Sign back in with the same credentials to get fresh session
    const signInResult = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (signInResult?.error) {
      return {
        success: false,
        error:
          "Registration completed but session refresh failed. Please sign in again.",
      };
    }

    return { success: true };
  } catch (error: any) {
    console.error("Register and refresh error:", error);
    return {
      success: false,
      error: error.message || "Failed to complete registration",
    };
  }
};

export const signInWithCredentials = async (
  params: Pick<AuthCredentials, "email" | "password">
) => {
  const { email, password } = params;

  try {
    // First, check if user exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length === 0) {
      return {
        success: false,
        error: "No account found with this email. Please sign up first.",
      };
    }

    // Check if password is correct
    const isPasswordValid = await compare(password, existingUser[0].password);
    if (!isPasswordValid) {
      return { success: false, error: "Invalid password. Please try again." };
    }

    // If we get here, credentials are valid, try to sign in
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      // Map NextAuth errors to user-friendly messages
      const errorMessages: { [key: string]: string } = {
        CredentialsSignin: "Invalid email or password.",
        Default: "An error occurred during sign in. Please try again.",
      };

      return {
        success: false,
        error: errorMessages[result.error] || errorMessages["Default"],
      };
    }

    return { success: true };
  } catch (error) {
    console.log("Signin error:", error);

    // Handle specific error types
    if (error instanceof Error) {
      if (
        error.message.includes("bcrypt") ||
        error.message.includes("password")
      ) {
        return { success: false, error: "Invalid password. Please try again." };
      }
    }

    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }
};

export const signUp = async (params: AuthCredentials) => {
  const { email, password } = params;

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    return {
      success: false,
      error:
        "An account with this email already exists. Please sign in instead.",
    };
  }

  const hashedPassword = await hash(password, 10);
  try {
    await db.insert(users).values({
      email,
      password: hashedPassword,
    });

    // Sign in the user after successful sign up
    const signInResult = await signInWithCredentials({ email, password });
    return signInResult;
  } catch (error) {
    console.log("Signup error:", error);
    return {
      success: false,
      error: "Failed to create account. Please try again.",
    };
  }
};
