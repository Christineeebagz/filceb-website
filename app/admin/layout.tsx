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

  // Temporary debug code in your component
  console.log("Admin session object:", session);

  return (
    <main className="flex min-h-screen w-full flex-row">
      <SideBar session={session} />
      <div className="flex-1 flex flex-col relative">
        <Header session={session} />
        <div className="flex-1">{children}</div>
        <Toaster />
      </div>
    </main>
  );
};

export default Layout;
