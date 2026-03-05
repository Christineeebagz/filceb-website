// app/admin/content/page.tsx
import { getPosts } from "@/lib/actions/posts";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PostsView } from "../../../components/admin/content/PostsView";
import { Plus } from "lucide-react";

export default async function AdminPostsPage() {
  const postsResult = await getPosts();

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-start mb-6">
        {/* Left side - Title and Subtitle stacked */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Manage Content</h1>
          <h2
            className="font-bold text-[12px] text-[#455E74] mt-1"
            style={{ fontFamily: "Times New Roman, serif" }}
          >
            Create, view, and manage all posts for the community page.
          </h2>
        </div>

        {/* Right side - Yellow Button with Plus Icon */}
        <Button
          asChild
          className="bg-[#F8EF30] text-[#1E1E1E] hover:bg-[#F8EF30]/90 font-bold"
        >
          <Link
            href="/admin/content/posts/new"
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Create New Post
          </Link>
        </Button>
      </div>

      {postsResult.success && postsResult.data ? (
        <PostsView posts={postsResult.data} />
      ) : (
        <div className="text-red-600">
          {postsResult.error || "Error loading posts"}
        </div>
      )}
    </div>
  );
}
