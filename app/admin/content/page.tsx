import { getPosts } from "@/lib/actions/posts";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PostsView } from "./PostsView";

export default async function AdminPostsPage() {
  const postsResult = await getPosts();

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Posts</h1>
        <Button asChild>
          <Link href="/admin/content/posts/new">Create New Post</Link>
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
