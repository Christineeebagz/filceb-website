// app/admin/page.tsx
import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

const Page = async () => {
  const session = await auth();

  // Double protection - also check role in page
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p>Welcome to the admin panel, {session.user.name}!</p>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold">User Management</h3>
          <p className="text-sm text-gray-600">
            Manage users and their permissions
          </p>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold">Application Review</h3>
          <p className="text-sm text-gray-600">Review pending registrations</p>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold">System Settings</h3>
          <p className="text-sm text-gray-600">Configure system preferences</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
