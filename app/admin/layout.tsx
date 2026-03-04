// app/admin/layout.tsx
import React, { ReactNode } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";
import SideBar from "@/components/admin/SideBar";
import Header from "@/components/admin/Header";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  // Redirect if no session
  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  // Redirect if user is not an ADMIN
  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <main className="flex min-h-screen w-full flex-row">
      <SideBar session={session} />
      <div className="flex-1 flex flex-col relative overflow-hidden">
        <Header session={session} />
        <div className="flex-1 overflow-auto p-6">
          <div className="min-w-0 max-w-full">{children}</div>
        </div>
        <Toaster />
      </div>
    </main>
  );
};

export default Layout;
