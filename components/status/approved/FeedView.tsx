"use client";

import { Post } from "@/types/content";
import { PostCard } from "./PostCard";

interface FeedViewProps {
  posts: Post[];
  userEmail: string;
}

export function FeedView({ posts, userEmail }: FeedViewProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No posts yet
          </h3>
          <p className="text-gray-600">
            Check back later for updates from the admin team.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Latest Updates</h2>
        <span className="text-sm text-gray-500">
          {posts.length} post{posts.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
