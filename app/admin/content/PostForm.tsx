"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Post, NewPost, PostType } from "@/types/content";
import { createPost, updatePost } from "@/lib/actions/posts";
import { Button } from "@/components/ui/button";

interface PostFormProps {
  post?: Post;
  mode: "create" | "edit";
}

export function PostForm({ post, mode }: PostFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Omit<NewPost, "id" | "authorId">>({
    title: post?.title || "",
    content: post?.content || "",
    type: post?.type || "TEXT",
    mediaUrl: post?.mediaUrl || "",
    embedCode: post?.embedCode || "",
    status: post?.status || "DRAFT",
    orderIndex: post?.orderIndex || 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === "create") {
        const result = await createPost(formData);
        if (result.success) {
          router.push("/admin/content");
        } else {
          alert(`Error: ${result.error}`);
        }
      } else if (post) {
        const result = await updatePost(post.id, formData);
        if (result.success) {
          router.push("/admin/content");
        } else {
          alert(`Error: ${result.error}`);
        }
      }
    } catch (error) {
      console.error("Error saving post:", error);
      alert("An error occurred while saving the post");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    field: keyof typeof formData,
    value: string | number | PostType
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-2">
          Title *
        </label>
        <input
          id="title"
          type="text"
          required
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          className="w-full p-2 border rounded-md"
          placeholder="Enter post title"
        />
      </div>

      {/* Post Type */}
      <div>
        <label htmlFor="type" className="block text-sm font-medium mb-2">
          Post Type *
        </label>
        <select
          id="type"
          value={formData.type}
          onChange={(e) => handleChange("type", e.target.value as PostType)}
          className="w-full p-2 border rounded-md"
        >
          <option value="TEXT">Text</option>
          <option value="IMAGE">Image</option>
          <option value="LINK">Link</option>
          <option value="EMBED">Embed</option>
        </select>
      </div>

      {/* Content - shown for TEXT type */}
      {formData.type === "TEXT" && (
        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-2">
            Content
          </label>
          <textarea
            id="content"
            rows={6}
            value={formData.content || ""}
            onChange={(e) => handleChange("content", e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Enter post content"
          />
        </div>
      )}

      {/* Media URL - shown for IMAGE and LINK types */}
      {(formData.type === "IMAGE" || formData.type === "LINK") && (
        <div>
          <label htmlFor="mediaUrl" className="block text-sm font-medium mb-2">
            {formData.type === "IMAGE" ? "Image URL" : "Link URL"}
          </label>
          <input
            id="mediaUrl"
            type="url"
            value={formData.mediaUrl || ""}
            onChange={(e) => handleChange("mediaUrl", e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder={
              formData.type === "IMAGE"
                ? "https://example.com/image.jpg"
                : "https://example.com"
            }
          />
        </div>
      )}

      {/* Embed Code - shown for EMBED type */}
      {formData.type === "EMBED" && (
        <div>
          <label htmlFor="embedCode" className="block text-sm font-medium mb-2">
            Embed Code
          </label>
          <textarea
            id="embedCode"
            rows={4}
            value={formData.embedCode || ""}
            onChange={(e) => handleChange("embedCode", e.target.value)}
            className="w-full p-2 border rounded-md font-mono text-sm"
            placeholder='<iframe src="..." width="600" height="400"></iframe>'
          />
        </div>
      )}

      {/* Status */}
      <div>
        <label htmlFor="status" className="block text-sm font-medium mb-2">
          Status
        </label>
        <select
          id="status"
          value={formData.status}
          onChange={(e) =>
            handleChange(
              "status",
              e.target.value as "DRAFT" | "PUBLISHED" | "ARCHIVED"
            )
          }
          className="w-full p-2 border rounded-md"
        >
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
          <option value="ARCHIVED">Archived</option>
        </select>
      </div>

      {/* Order Index */}
      <div>
        <label htmlFor="orderIndex" className="block text-sm font-medium mb-2">
          Order Index
        </label>
        <input
          id="orderIndex"
          type="number"
          value={formData.orderIndex || 0}
          onChange={(e) =>
            handleChange("orderIndex", parseInt(e.target.value) || 0)
          }
          className="w-full p-2 border rounded-md"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isLoading
            ? "Saving..."
            : mode === "create"
              ? "Create Post"
              : "Update Post"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/content")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
