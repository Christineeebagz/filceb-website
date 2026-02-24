// app/(root)/approved/page.tsx
import { auth } from "@/auth";
import { getPublishedPosts } from "@/lib/actions/posts";
import { FeedView } from "../../../components/status/approved/FeedView";
import { Pagination } from "@/components/Pagination";

export const dynamic = "force-dynamic";

interface ApprovedPageProps {
  searchParams?: {
    page?: string;
  };
}

export default async function Approved({ searchParams }: ApprovedPageProps) {
  const session = await auth();

  const rawPage = Number(searchParams?.page ?? "1");
  const currentPage = isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;

  const pageSize = 10;

  const postsResult = await getPublishedPosts(currentPage, pageSize);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Member Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back! Here's the latest updates from our community.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-3xl">
            {postsResult.success ? (
              <>
                <FeedView
                  posts={postsResult.data}
                  userEmail={session?.user?.email || ""}
                  pagination={postsResult.pagination}
                />

                {postsResult.pagination.totalPages > 1 && (
                  <Pagination
                    currentPage={postsResult.pagination.currentPage}
                    totalPages={postsResult.pagination.totalPages}
                    hasNextPage={postsResult.pagination.hasNextPage}
                    hasPrevPage={postsResult.pagination.hasPrevPage}
                  />
                )}
              </>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800">
                  Error loading feed: {postsResult.error}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
