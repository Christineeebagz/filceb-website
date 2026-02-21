import { auth } from "@/auth";

import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (session) redirect("/");

  return (
    <main className="min-h-screen flex flex-col ">
      {/* Main content area - vertically centered */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        {children}
        {/* </div> */}
      </div>
    </main>
  );
};

export default Layout;
