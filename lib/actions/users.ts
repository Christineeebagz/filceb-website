"use server";

import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { User, UserStatus } from "@/types";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
// import type { User, UserStatus } from "types.d.ts";

// Server action to get user by ID
export async function getUserById(userId: string) {
  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (user.length === 0) {
      return { success: false, error: "User not found" };
    }

    return { success: true, data: user[0] as User };
  } catch (error) {
    console.error("Error fetching user:", error);
    return { success: false, error: "Failed to fetch user data" };
  }
}

// Server action to update user status
export async function updateUserStatus(userId: string, status: UserStatus) {
  try {
    await db.update(users).set({ status }).where(eq(users.id, userId));

    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    console.error("Error updating user status:", error);
    return { success: false, error: "Failed to update user status" };
  }
}

// Server action to get all users
export async function getAllUsers() {
  try {
    const allUsers = await db.select().from(users);
    return { success: true, data: allUsers as User[] };
  } catch (error) {
    console.error("Error fetching users:", error);
    return { success: false, error: "Failed to fetch users" };
  }
}
