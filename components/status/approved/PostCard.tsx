import { Post } from "@/types/content";
import { PostEmbed } from "./PostEmbed";
import Image from "next/image";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Post Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {post.type}
          </span>
        </div>

        <div className="flex items-center text-sm text-gray-500">
          <span>Posted on {formatDate(post.publishedAt)}</span>
        </div>
      </div>

      {/* Post Content */}
      <div className="p-6">
        {post.type === "TEXT" && post.content && (
          <div className="prose max-w-none">
            <p className="text-gray-700 whitespace-pre-line">{post.content}</p>
          </div>
        )}

        {post.type === "IMAGE" && post.mediaUrl && (
          <div className="space-y-4">
            {post.content && <p className="text-gray-700">{post.content}</p>}
            <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={post.mediaUrl}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}

        {post.type === "LINK" && post.mediaUrl && (
          <div className="space-y-4">
            {post.content && <p className="text-gray-700">{post.content}</p>}
            <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
              <a
                href={post.mediaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                🔗 {post.mediaUrl}
              </a>
            </div>
          </div>
        )}

        {post.type === "EMBED" && post.embedCode && (
          <div className="space-y-4">
            {post.content && <p className="text-gray-700">{post.content}</p>}
            <PostEmbed embedCode={post.embedCode} />
          </div>
        )}
      </div>
    </article>
  );
}
