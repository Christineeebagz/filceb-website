interface UserProfileProps {
  user:
    | {
        name?: string | null;
        email?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        status?: string | null;
      }
    | null
    | undefined;
}

export function UserProfile({ user }: UserProfileProps) {
  if (!user) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Profile</h3>

      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium text-gray-500">Name</label>
          <p className="text-gray-900">
            {user.firstName && user.lastName
              ? `${user.firstName} ${user.lastName}`
              : user.name || "Not provided"}
          </p>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-500">Email</label>
          <p className="text-gray-900">{user.email}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-500">Status</label>
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {user.status || "APPROVED"}
          </div>
        </div>
      </div> */}

      {/* Quick Actions */}
      {/* <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-3">
          Quick Actions
        </h4>
        <div className="space-y-2">
          <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
            📧 Contact Support
          </button>
          <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
            📋 Update Profile
          </button>
          <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
            🔔 Notification Settings
          </button>
        </div>
      </div> */}
    </div>
  );
}
