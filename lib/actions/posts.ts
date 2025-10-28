"use server";

import { db } from "@/database/drizzle";
import { posts } from "@/database/schema";
import { eq, desc, and, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import type { NewPost, PostType, PostStatus } from "@/types/content";
import { auth } from "@/auth";

export async function updatePost(postId: string, postData: Partial<NewPost>) {
  try {
    const [updatedPost] = await db
      .update(posts)
      .set({
        ...postData,
        updatedAt: new Date(),
      })
      .where(eq(posts.id, postId))
      .returning();

    revalidatePath("/admin/content/posts");
    revalidatePath("/feed");
    return { success: true, data: updatedPost };
  } catch (error) {
    console.error("Error updating post:", error);
    return { success: false, error: "Failed to update post" };
  }
}

export async function deletePost(postId: string) {
  try {
    await db.delete(posts).where(eq(posts.id, postId));

    revalidatePath("/admin/content/posts");
    revalidatePath("/feed");
    return { success: true };
  } catch (error) {
    console.error("Error deleting post:", error);
    return { success: false, error: "Failed to delete post" };
  }
}

export async function getPosts(filters?: {
  status?: PostStatus;
  type?: PostType;
  limit?: number;
}) {
  try {
    const postsData = await db
      .select()
      .from(posts)
      .where(filters?.status ? eq(posts.status, filters.status) : undefined)
      .orderBy(desc(posts.createdAt))
      .limit(filters?.limit || 50);

    return { success: true, data: postsData };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { success: false, error: "Failed to fetch posts" };
  }
}

export async function getPostById(postId: string) {
  try {
    const [post] = await db
      .select()
      .from(posts)
      .where(eq(posts.id, postId))
      .limit(1);

    if (!post) {
      return { success: false, error: "Post not found" };
    }

    return { success: true, data: post };
  } catch (error) {
    console.error("Error fetching post:", error);
    return { success: false, error: "Failed to fetch post" };
  }
}

// Get published posts for user feed
export async function getPublishedPosts() {
  try {
    const publishedPosts = await db
      .select()
      .from(posts)
      .where(eq(posts.status, "PUBLISHED"))
      .orderBy(desc(posts.createdAt));

    return { success: true, data: publishedPosts };
  } catch (error) {
    console.error("Error fetching published posts:", error);
    return { success: false, error: "Failed to fetch posts" };
  }
}

export async function createPost(postData: Omit<NewPost, "id" | "authorId">) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { success: false, error: "Not authenticated" };
    }

    const [newPost] = await db
      .insert(posts)
      .values({
        ...postData,
        authorId: session.user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    revalidatePath("/admin/content/posts");
    revalidatePath("/feed");
    return { success: true, data: newPost };
  } catch (error) {
    console.error("Error creating post:", error);
    return { success: false, error: "Failed to create post" };
  }
}
