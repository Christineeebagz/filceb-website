import { auth } from "@/auth";
import { getPublishedPosts } from "@/lib/actions/posts";
import { FeedView } from "./FeedView";
import { UserProfile } from "./UserProfile";

export default async function Approved() {
  const session = await auth();
  const postsResult = await getPublishedPosts();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Member Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back! Here's the latest updates from our community.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Feed - 3/4 width on desktop */}
          <div className="lg:col-span-3">
            {postsResult.success ? (
              <FeedView
                posts={postsResult.data}
                userEmail={session?.user?.email || ""}
              />
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800">
                  Error loading feed: {postsResult.error}
                </p>
              </div>
            )}
          </div>

          {/* Sidebar - 1/4 width on desktop */}
          <div className="lg:col-span-1">
            <UserProfile user={session?.user} />
          </div>
        </div>
      </div>
    </div>
  );
}
