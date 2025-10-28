import { getPostById } from "@/lib/actions/posts";
import { notFound } from "next/navigation";
import { PostForm } from "../../../PostForm";

interface EditPostPageProps {
  params: {
    id: string;
  };
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const postResult = await getPostById(params.id);

  if (!postResult.success || !postResult.data) {
    notFound();
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
      <PostForm post={postResult.data} mode="edit" />
    </div>
  );
}
