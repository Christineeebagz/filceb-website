import React, { ReactNode } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

import "@/styles/admin.css";
import SideBar from "@/components/admin/SideBar";

const Layout = async ({ children }: { children: ReactNode }) => {
  // const session = await auth(*);

  // if(!session?.user?id) redirect("/sign-in")

  return (
    <main className="flex min-h-screen w-full flex-row">
      <SideBar />
      <div>
        <p>Header</p>
        {children}
      </div>
    </main>
  );
};

export default Layout;
