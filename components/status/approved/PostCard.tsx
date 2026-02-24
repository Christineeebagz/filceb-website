import { Post } from "@/types/content";
import { PostEmbed } from "./PostEmbed";
import Image from "next/image";
import { useState } from "react";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const formatDate = (date: Date | string | null) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isGoogleShareUrl = (url: string) => {
    return url.includes("share.google.com");
  };

  const getGoogleShareEmbedUrl = (url: string) => {
    // Extract file ID from Google share URL if possible
    const fileId = url.split("/").pop();
    return `https://drive.google.com/file/d/${fileId}/preview`;
  };

  // Check if post has been edited (createdAt different from updatedAt)
  const hasBeenEdited = () => {
    if (!post.createdAt || !post.updatedAt) return false;
    const created = new Date(post.createdAt).getTime();
    const updated = new Date(post.updatedAt).getTime();
    // Allow for a few seconds difference (e.g., 5 seconds threshold)
    return Math.abs(updated - created) > 5000;
  };

  // Handle image load to get dimensions
  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setImageDimensions({
      width: img.naturalWidth,
      height: img.naturalHeight,
    });
  };

  return (
    <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Post Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-start ">
          <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {post.type}
          </span>
        </div>
        <div className="flex items-center text-sm text-gray-900"></div>
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

            {isGoogleShareUrl(post.mediaUrl) ? (
              // For Google shared images, use an iframe
              <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <iframe
                  src={getGoogleShareEmbedUrl(post.mediaUrl)}
                  className="w-full h-full"
                  allow="autoplay"
                />
              </div>
            ) : !imageError ? (
              <div className="flex justify-center bg-gray-50 rounded-lg p-4">
                <div className="relative max-w-full overflow-hidden">
                  <Image
                    src={post.mediaUrl}
                    alt={post.title}
                    width={imageDimensions?.width || 1200}
                    height={imageDimensions?.height || 800}
                    className="w-auto h-auto max-w-full object-contain rounded-lg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    onError={() => setImageError(true)}
                    onLoad={handleImageLoad}
                    unoptimized={true} // Optional: Use this if you want to bypass Next.js optimization
                  />
                </div>
              </div>
            ) : (
              <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                <p className="text-gray-500">Image failed to load</p>
              </div>
            )}
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
                className="text-blue-600 hover:text-blue-800 font-medium break-all"
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

      {/* Gray Line Separator */}
      <div className="border-t border-gray-200"></div>

      {/* Timestamps Footer */}
      <div className="px-6 py-3 bg-gray-50/50">
        <div className="flex flex-col items-end text-xs text-gray-500 space-y-1">
          {/* Posted At */}
          <div className="flex items-center gap-2">
            <span className="font-medium">Posted:</span>
            <span>{formatDate(post.publishedAt || post.createdAt)}</span>
          </div>

          {/* Edited At - Only show if edited */}
          {hasBeenEdited() && (
            <div className="flex items-center gap-2">
              <span className="font-medium">Last edited:</span>
              <span>{formatDate(post.updatedAt)}</span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
