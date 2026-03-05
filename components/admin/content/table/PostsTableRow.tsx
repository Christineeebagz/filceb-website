// components/admin/content/table/PostsTableRow.tsx
"use client";

import { PostWithAuthor } from "@/types/content";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import { STATUS_COLORS, POST_TYPE_COLORS } from "./types";

interface PostsTableRowProps {
  post: PostWithAuthor;
  index: number;
  onEdit: (postId: string) => void;
  onDelete: (postId: string) => void;
}

export function PostsTableRow({
  post,
  index,
  onEdit,
  onDelete,
}: PostsTableRowProps) {
  const formatDate = (date: Date | null) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getAuthorName = () => {
    if (!post.author) return "Unknown";
    const { firstName, lastName, email } = post.author;
    if (firstName && lastName) return `${firstName} ${lastName}`;
    if (firstName) return firstName;
    if (lastName) return lastName;
    return email;
  };

  const statusColor = STATUS_COLORS[post.status] || {
    text: "#6B7280",
    bg: "#F3F4F6",
  };
  const typeColor = POST_TYPE_COLORS[post.type] || {
    text: "#6B7280",
    bg: "#F3F4F6",
  };

  // Alternate between EAEAEA and FFFFFF
  const rowBgColor = index % 2 === 0 ? "bg-[#EAEAEA]" : "bg-white";

  return (
    <tr
      className={`border-b border-gray-300 hover:bg-gray-100 transition-colors ${rowBgColor}`}
    >
      <td className="p-4">
        <div className="text-sm font-bold text-gray-900">{post.title}</div>
        {post.content && (
          <div className="text-xs text-gray-500 line-clamp-1 mt-1">
            {post.content}
          </div>
        )}
      </td>
      <td className="p-4">
        <span
          className="px-2 py-1 text-xs rounded-full font-medium inline-block"
          style={{
            backgroundColor: typeColor.bg,
            color: typeColor.text,
          }}
        >
          {post.type}
        </span>
      </td>
      <td className="p-4 text-sm text-gray-700">
        {formatDate(post.createdAt)}
      </td>
      <td className="p-4 text-sm text-gray-700">{getAuthorName()}</td>
      <td className="p-4 text-sm text-gray-700">
        {formatDate(post.updatedAt)}
      </td>
      <td className="p-4">
        <span
          className="px-2 py-1 text-xs rounded-full font-medium inline-block"
          style={{
            backgroundColor: statusColor.bg,
            color: statusColor.text,
          }}
        >
          {post.status}
        </span>
      </td>
      <td className="p-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(post.id)}
            className="h-8 w-8 p-0 text-gray-600 hover:text-gray-900 hover:bg-gray-200"
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(post.id)}
            className="h-8 w-8 p-0 text-gray-600 hover:text-red-600 hover:bg-gray-200"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
}
