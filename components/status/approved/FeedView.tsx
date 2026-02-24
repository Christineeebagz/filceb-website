// FeedView.tsx
"use client";

import { Post } from "@/types/content";
import { PostCard } from "./PostCard";

interface PaginationInfo {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface FeedViewProps {
  posts: Post[];
  userEmail: string;
  pagination: PaginationInfo;
}

export function FeedView({ posts, userEmail, pagination }: FeedViewProps) {
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
          Showing {posts.length} of {pagination.totalCount} posts
        </span>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Page indicator */}
      <div className="text-center text-sm text-gray-500">
        Page {pagination.currentPage} of {pagination.totalPages}
      </div>
    </div>
  );
}
