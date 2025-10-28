"use client";

import { Post } from "@/types/content";
import { PostCard } from "./PostCard";
import { useState } from "react";

interface PostsViewProps {
  posts: Post[];
}

export function PostsView({ posts }: PostsViewProps) {
  const [filter, setFilter] = useState<
    "ALL" | "DRAFT" | "PUBLISHED" | "ARCHIVED"
  >("ALL");

  const filteredPosts = posts.filter(
    (post) => filter === "ALL" || post.status === filter
  );

  return (
    <div className="space-y-4">
      {/* Filter Controls */}
      <div className="flex gap-2 mb-4">
        {(["ALL", "DRAFT", "PUBLISHED", "ARCHIVED"] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              filter === status
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {status.charAt(0) + status.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {/* Posts List */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No posts found
          {filter !== "ALL" ? ` with status ${filter.toLowerCase()}` : ""}.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
