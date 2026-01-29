// import React, { ReactNode } from "react";

// const Layout = ({ children }: { children: ReactNode }) => {
//   return (
//     <main>
//       <section>{/* auth form (feel ko style lang ni) */}</section>
//       <div>
//         {/* kani ang auth box */}
//         <h1>Filceb</h1>
//         <div>{children}</div>
//       </div>
//     </main>
//   );
// };

// export default Layout;

import { auth } from "@/auth";
import { Navbar } from "@/components/navbar/Navbar";

import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (session) redirect("/");
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <Navbar />
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Filceb</h1>
        {children}
      </div>
    </main>
  );
};

export default Layout;
