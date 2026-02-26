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

  const handleSubmit = async (status: "DRAFT" | "PUBLISHED" | "ARCHIVED") => {
    setIsLoading(true);

    // Prepare the updated form data
    const updatedFormData: any = {
      ...formData,
      status: status,
    };

    // Handle published_at based on status
    const now = new Date();

    // If publishing now (status changing to PUBLISHED)
    if (status === "PUBLISHED") {
      // Only set publishedAt if it's being published for the first time
      // (no existing publishedAt value)
      if (!post?.publishedAt) {
        updatedFormData.publishedAt = now;
      } else {
        // If it was already published, keep the original publishedAt
        updatedFormData.publishedAt = post.publishedAt;
      }
    }

    // If archiving (only option to remove from publication)
    else if (status === "ARCHIVED") {
      // When archiving, publishedAt becomes null
      updatedFormData.publishedAt = null;
    }

    // For drafts (and any other status), publishedAt should be null
    else {
      updatedFormData.publishedAt = null;
    }

    try {
      if (mode === "create") {
        const result = await createPost(updatedFormData);
        if (result.success) {
          router.push("/admin/content");
        } else {
          alert(`Error: ${result.error}`);
        }
      } else if (post) {
        const result = await updatePost(post.id, updatedFormData);
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

  // Determine if post is published
  const isPublished = post?.status === "PUBLISHED";

  // Safe access to formData.type with default value
  const currentType = formData.type || "TEXT";

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-6 max-w-2xl">
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
          value={currentType}
          onChange={(e) => handleChange("type", e.target.value as PostType)}
          className="w-full p-2 border rounded-md"
        >
          <option value="TEXT">Text</option>
          <option value="IMAGE">Image</option>
          <option value="LINK">Link</option>
          <option value="EMBED">Embed</option>
        </select>
      </div>

      {/* Content - shown for ALL types (TEXT, IMAGE, LINK, EMBED) */}
      <div>
        <label htmlFor="content" className="block text-sm font-medium mb-2">
          Content{" "}
          {currentType !== "TEXT" && "(Optional - Add text with your media)"}
        </label>
        <textarea
          id="content"
          rows={6}
          value={formData.content || ""}
          onChange={(e) => handleChange("content", e.target.value)}
          className="w-full p-2 border rounded-md"
          placeholder={
            currentType === "TEXT"
              ? "Enter post content"
              : "Enter accompanying text for your media (optional)"
          }
        />
        {currentType !== "TEXT" && (
          <p className="text-sm text-gray-500 mt-1">
            This text will appear alongside your {currentType.toLowerCase()}
          </p>
        )}
      </div>

      {/* Media URL - shown for IMAGE and LINK types */}
      {(currentType === "IMAGE" || currentType === "LINK") && (
        <div>
          <label htmlFor="mediaUrl" className="block text-sm font-medium mb-2">
            {currentType === "IMAGE" ? "Image URL" : "Link URL"}
          </label>
          <input
            id="mediaUrl"
            type="url"
            value={formData.mediaUrl || ""}
            onChange={(e) => handleChange("mediaUrl", e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder={
              currentType === "IMAGE"
                ? "https://example.com/image.jpg"
                : "https://example.com"
            }
          />
        </div>
      )}

      {/* Embed Code - shown for EMBED type */}
      {currentType === "EMBED" && (
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

      {/* Published Info - Show for existing published posts */}
      {mode === "edit" && post?.publishedAt && (
        <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
          <p className="text-sm text-blue-800">
            <span className="font-medium">Originally published:</span>{" "}
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex gap-2">
          <Button
            type="button"
            onClick={() => handleSubmit("DRAFT")}
            disabled={isLoading}
            variant="outline"
            className="border-gray-300"
          >
            {isLoading ? "Saving..." : "Save as Draft"}
          </Button>

          <Button
            type="button"
            onClick={() => handleSubmit("PUBLISHED")}
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {isLoading ? "Publishing..." : "Publish Post"}
          </Button>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/content")}
          className="ml-auto"
        >
          Cancel
        </Button>
      </div>

      {/* Archive option - ONLY shown for existing published posts */}
      {mode === "edit" && isPublished && (
        <div className="border-t pt-4 mt-4">
          <Button
            type="button"
            onClick={() => handleSubmit("ARCHIVED")}
            disabled={isLoading}
            variant="outline"
            className="border-red-300 text-red-600 hover:bg-red-50"
          >
            Archive Post (Remove from publication)
          </Button>
        </div>
      )}
    </form>
  );
}
