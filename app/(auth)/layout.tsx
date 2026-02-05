import { auth } from "@/auth";

import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (session) redirect("/");

  return (
    <main className="min-h-screen flex flex-col bg-gray-100">
      {/* Main content area - vertically centered */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        {/* <div className="bg-white p-8 rounded shadow-md w-full mx-auto"> */}
        {/* <h1 className="text-2xl font-bold text-center mb-6">Filceb</h1> */}
        {children}
        {/* </div> */}
      </div>
    </main>
  );
};

export default Layout;

// import { auth } from "@/auth";
// import { Navbar } from "@/components/navbar/Navbar";
// import { Footer } from "@/components/shared/Footer";

// import { redirect } from "next/navigation";
// import React, { ReactNode } from "react";

// const Layout = async ({ children }: { children: ReactNode }) => {
//   const session = await auth();
//   if (session) redirect("/");
//   return (
//     <main className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded shadow-md w-full ">
//         <Navbar />
//         <h1 className="text-2xl font-bold text-center mb-6">Filceb</h1>
//         {children}
//       </div>
//       <Footer />
//     </main>
//   );
// };

// export default Layout;
