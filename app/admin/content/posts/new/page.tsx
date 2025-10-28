import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PostForm } from "../../PostForm";

export default async function NewPostPage() {
  const session = await auth();

  // Check if user is authenticated and is admin
  if (!session?.user) {
    redirect("/");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create New Post</h1>
      <PostForm mode="create" />
    </div>
  );
}
