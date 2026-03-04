// components/admin/users/AccountInfo.tsx
"use client";

import { UserWithDocuments } from "./types";

interface AccountInfoProps {
  user: UserWithDocuments;
}

export function AccountInfo({ user }: AccountInfoProps) {
  const formatDate = (date: Date | string | null) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-3 rounded-lg p-5 bg-gray-50 border border-gray-200">
      <h3 className="text-sm font-semibold text-[#1E1E1E]">
        Account Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Last Activity:</span>
            <span className="font-medium">
              {user.lastActivityDate
                ? formatDate(user.lastActivityDate)
                : "N/A"}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Role:</span>
            <span className="font-medium capitalize">
              {user.role?.toLowerCase() || "N/A"}
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Created At:</span>
            <span className="font-medium">
              {user.createdAt ? formatDate(user.createdAt) : "N/A"}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Reference No:</span>
            <span className="font-medium">{user.referenceNum || "N/A"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
