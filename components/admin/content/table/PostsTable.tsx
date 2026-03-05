// components/admin/content/table/PostsTable.tsx
"use client";

import { PostWithAuthor } from "@/types/content";
import { PostsTableHeader } from "./PostsTableHeader";
import { PostsTableRow } from "./PostsTableRow";
import { SortField, SortDirection } from "./types";

interface PostsTableProps {
  posts: PostWithAuthor[];
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
  onEdit: (postId: string) => void;
  onDelete: (postId: string) => void;
}

export function PostsTable({
  posts,
  sortField,
  sortDirection,
  onSort,
  onEdit,
  onDelete,
}: PostsTableProps) {
  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <div className="min-w-[1100px]">
          <table className="w-full border-collapse">
            <PostsTableHeader
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={onSort}
            />
            <tbody>
              {posts.map((post, index) => (
                <PostsTableRow
                  key={post.id}
                  post={post}
                  index={index}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12 text-gray-500 bg-white">
          No posts found
        </div>
      )}
    </div>
  );
}
