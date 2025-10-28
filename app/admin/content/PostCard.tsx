"use client";
import { Post } from "@/types/content";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { deletePost, updatePost } from "@/lib/actions/posts";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const handleStatusChange = async (
    newStatus: "DRAFT" | "PUBLISHED" | "ARCHIVED"
  ) => {
    try {
      await updatePost(post.id, { status: newStatus });
    } catch (error) {
      console.error("Error updating post status:", error);
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(post.id);
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "Not published";
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold">{post.title}</h3>
        <div className="flex gap-2">
          <span
            className={`px-2 py-1 text-xs rounded-full ${
              post.status === "PUBLISHED"
                ? "bg-green-100 text-green-800"
                : post.status === "DRAFT"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-gray-100 text-gray-800"
            }`}
          >
            {post.status}
          </span>
          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
            {post.type}
          </span>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {post.content || "No content"}
      </p>

      <div className="flex justify-between items-center">
        <div className="text-xs text-gray-500">
          Created: {formatDate(post.createdAt)}
          {post.publishedAt && ` • Published: ${formatDate(post.publishedAt)}`}
        </div>

        <div className="flex gap-2">
          {/* Status Actions */}
          {post.status !== "PUBLISHED" && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleStatusChange("PUBLISHED")}
            >
              Publish
            </Button>
          )}
          {post.status !== "DRAFT" && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleStatusChange("DRAFT")}
            >
              Draft
            </Button>
          )}
          {post.status !== "ARCHIVED" && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleStatusChange("ARCHIVED")}
            >
              Archive
            </Button>
          )}

          {/* Edit & Delete */}
          <Button size="sm" asChild>
            <Link href={`/admin/content/posts/edit/${post.id}`}>Edit</Link>
          </Button>
          <Button size="sm" variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
