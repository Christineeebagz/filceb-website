// components/admin/content/table/types.ts
import { Post, PostWithAuthor } from "@/types/content";

export type { Post, PostWithAuthor };

export type SortField = keyof Pick<
  Post,
  "title" | "type" | "status" | "createdAt" | "updatedAt" | "publishedAt"
>;

export type SortDirection = "asc" | "desc";

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

export interface FilterConfig {
  title: string;
  type: string;
  status: string;
  author: string;
}

export const STATUS_COLORS: Record<string, { text: string; bg: string }> = {
  DRAFT: { text: "#92400E", bg: "#FEF3C7" }, // Amber
  PUBLISHED: { text: "#065F46", bg: "#D1FAE5" }, // Green
  ARCHIVED: { text: "#6B7280", bg: "#F3F4F6" }, // Gray
};

export const POST_TYPE_COLORS: Record<string, { text: string; bg: string }> = {
  TEXT: { text: "#1E40AF", bg: "#DBEAFE" }, // Blue
  IMAGE: { text: "#7E22CE", bg: "#F3E8FF" }, // Purple
  LINK: { text: "#B45309", bg: "#FEF3C7" }, // Amber
  EMBED: { text: "#0F766E", bg: "#D1FAE5" }, // Teal
};
