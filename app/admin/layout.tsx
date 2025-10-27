import React, { ReactNode } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";

import "@/styles/admin.css";
import SideBar from "@/components/admin/SideBar";
import Header from "@/components/admin/Header";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session?.user?.id) redirect("/sign-in");
  // Temporary debug code in your component
  console.log("Full session object:", session);
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
