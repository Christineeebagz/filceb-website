// types/content.ts
import { posts, users } from "@/database/schema";

export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
export type PostType = "TEXT" | "IMAGE" | "LINK" | "EMBED";
export type PostStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export interface PostWithAuthor extends Post {
  author: {
    id: string;
    firstName: string | null;
    lastName: string | null;
    email: string;
  };
}

// Helper type for session user
export interface SessionUser {
  id: string;
  email: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  status?: string;
}
