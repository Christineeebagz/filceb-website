"use server";

import { db } from "@/database/drizzle";
import { posts } from "@/database/schema";
import { eq, desc, and, sql, count } from "drizzle-orm";
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

/// Get published posts for user feed with pagination
export async function getPublishedPosts(
  page: number = 1,
  pageSize: number = 10
) {
  try {
    // Ensure page is at least 1
    const currentPage = Math.max(1, page);

    // Calculate offset
    const offset = (currentPage - 1) * pageSize;

    // Get total count for pagination
    const totalCountResult = await db
      .select({ count: count() })
      .from(posts)
      .where(eq(posts.status, "PUBLISHED"));

    const totalCount = Number(totalCountResult[0]?.count) || 0;
    const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

    console.log(
      `Fetching page ${currentPage} with offset ${offset}, total pages: ${totalPages}, total posts: ${totalCount}`
    );

    // If current page exceeds total pages, return empty array
    if (currentPage > totalPages) {
      return {
        success: true,
        data: [],
        pagination: {
          currentPage,
          pageSize,
          totalPages,
          totalCount,
          hasNextPage: false,
          hasPrevPage: currentPage > 1,
        },
      };
    }

    // Get paginated posts - ORDER BY publishedAt DESC (most recent first)
    const publishedPosts = await db
      .select()
      .from(posts)
      .where(eq(posts.status, "PUBLISHED"))
      .orderBy(desc(posts.publishedAt))
      .limit(pageSize)
      .offset(offset);

    console.log(`Found ${publishedPosts.length} posts for page ${currentPage}`);

    return {
      success: true,
      data: publishedPosts,
      pagination: {
        currentPage,
        pageSize,
        totalPages,
        totalCount,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1,
      },
    };
  } catch (error) {
    console.error("Error fetching published posts:", error);
    return {
      success: false,
      error: "Failed to fetch posts",
      pagination: {
        currentPage: page,
        pageSize,
        totalPages: 0,
        totalCount: 0,
        hasNextPage: false,
        hasPrevPage: false,
      },
    };
  }
}
