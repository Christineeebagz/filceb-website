import { posts } from "@/database/schema";

export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
export type PostType = "TEXT" | "IMAGE" | "LINK" | "EMBED";
export type PostStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export interface PostWithAuthor extends Post {
  author: {
    firstName: string | null;
    lastName: string | null;
    email: string;
  };
}
