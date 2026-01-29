import { auth } from "@/auth";
import { Navbar } from "@/components/navbar/Navbar";

import Approved from "@/components/status/approved/page";
import Pending from "@/components/status/pending/page";
import Preapproved from "@/components/status/preapproved/page";
import Register from "@/components/status/register/page";
import Rejected from "@/components/status/rejected/page";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await auth();

  if (!session) {
    redirect("/home");
  }

  return (
    <main>
      <Navbar />
      <div className="mx-auto max-w-7xl pt-16">
        <div className="mt-4 pb-20 px-4">
          {/* Debug info - You can remove this in production */}
          <div className="p-4 mb-4 bg-blue-50 border border-blue-200 rounded-md">
            <h3 className="font-semibold text-blue-800">
              Current Session Status:{" "}
              <span className="font-bold">{session.user.status}</span>
            </h3>
            <p>email: {session.user.email}</p>

            {/* FONT TESTING SECTION */}
            <div className="mt-4 pt-4 border-t border-blue-200">
              <h4 className="font-bold text-blue-900 mb-2">Font Testing:</h4>

              {/* Test 1: Default font (should be Aileron if applied to body) */}
              <div className="mb-3">
                <p className="text-sm text-blue-700 mb-1">
                  Default font (body):
                </p>
                <p className="text-lg">
                  This is default text - should be Aileron
                </p>
              </div>

              {/* Test 2: Explicit Aileron classes */}
              <div className="mb-3">
                <p className="text-sm text-blue-700 mb-1">
                  Explicit font-aileron class:
                </p>
                <p className="font-aileron text-lg">
                  This should be Aileron font FILCEB BUSINESS CLUB
                </p>
              </div>

              {/* Test 3: Aileron with different weights */}
              <div className="mb-3">
                <p className="text-sm text-blue-700 mb-1">Aileron weights:</p>
                <div className="space-y-1 pl-2">
                  <p className="font-aileron font-thin">Thin (100)</p>
                  <p className="font-aileron font-light">Light (300)</p>
                  <p className="font-aileron font-normal">Regular (400)</p>
                  <p className="font-aileron font-medium">Medium (500)</p>
                  <p className="font-aileron font-semibold">Semi-bold (600)</p>
                  <p className="font-aileron font-bold">Bold (700)</p>
                  <p className="font-aileron font-extrabold">
                    Extra-bold (800)
                  </p>
                  <p className="font-aileron font-black">Black (900)</p>
                </div>
              </div>

              {/* Test 4: Other font classes */}
              <div className="mb-3">
                <p className="text-sm text-blue-700 mb-1">Other fonts:</p>
                <div className="space-y-1 pl-2">
                  <p className="font-geist">Geist Sans</p>
                  <p className="font-geist-mono">Geist Mono</p>
                  <p className="font-times">Times New Roman</p>
                </div>
              </div>

              {/* Test 5: Compare with standard Tailwind classes */}
              <div className="mb-3">
                <p className="text-sm text-blue-700 mb-1">
                  Standard Tailwind font classes:
                </p>
                <div className="space-y-1 pl-2">
                  <p className="font-sans">font-sans (default Tailwind)</p>
                  <p className="font-serif">font-serif (serif fallback)</p>
                  <p className="font-mono">font-mono (monospace)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Conditional content based on status */}
          {session.user.status === "UNSUBMITTED" && <Register />}
          {session.user.status === "PENDING" && <Pending />}
          {session.user.status === "PRE-APPROVED" && <Preapproved />}
          {session.user.status === "APPROVED" && <Approved />}
          {session.user.status === "REJECTED" && <Rejected />}
        </div>
      </div>
    </main>
  );
}
// import { auth } from "@/auth";
// import { Navbar } from "@/components/Navbar";
// import Approved from "@/components/status/approved/page";
// import Pending from "@/components/status/pending/page";
// import Preapproved from "@/components/status/preapproved/page";
// import Register from "@/components/status/register/page";
// import Rejected from "@/components/status/rejected/page";
// import { redirect } from "next/navigation";
// import { ReactNode } from "react";

// export const dynamic = "force-dynamic";
// export const revalidate = 0;

// export default async function Layout({ children }: { children: ReactNode }) {
//   const session = await auth();

//   if (!session) {
//     redirect("/home");
//   }

//   return (
//     <main>
//       <Navbar />
//       <div className="mx-auto max-w-7xl pt-16">
//         <div className="mt-4 pb-20 px-4">
//           {/* Debug info - You can remove this in production */}
//           <div className="p-4 mb-4 bg-blue-50 border border-blue-200 rounded-md">
//             <h3 className="font-semibold text-blue-800">
//               Current Session Status:{" "}
//               <span className="font-bold">{session.user.status}</span>
//             </h3>
//             <p>email: {session.user.email}</p>
//           </div>

//           {/* Conditional content based on status */}
//           {session.user.status === "UNSUBMITTED" && <Register />}
//           {session.user.status === "PENDING" && <Pending />}
//           {session.user.status === "PRE-APPROVED" && <Preapproved />}
//           {session.user.status === "APPROVED" && <Approved />}
//           {session.user.status === "REJECTED" && <Rejected />}
//         </div>
//       </div>
//     </main>
//   );
// }
