// app/(root)/layout.tsx
import { auth, signOut } from "@/auth";
import Header from "@/components/Header";
import Approved from "@/components/status/approved/page";
import Pending from "@/components/status/pending/page";
import Preapproved from "@/components/status/preapproved/page";
import Register from "@/components/status/register/page";
import Rejected from "@/components/status/rejected/page";
import { Button } from "@/components/ui/button";
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
      <div className="mx-auto max-w-7xl">
        <Header session={session} />
        <div className="mt-20 pb-20">
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
            className="mb-10"
          >
            <Button>Logout</Button>
          </form>

          {/* Debug info */}
          <div className="p-4 mb-4 bg-blue-50 border border-blue-200 rounded-md">
            <h3 className="font-semibold text-blue-800">
              Current Session Status: {session.user.status}
            </h3>
            <p> email: {session.user.email}</p>
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

// // app/(root)/layout.tsx
// import { auth, signOut } from "@/auth";
// import Header from "@/components/Header";
// import Pending from "@/components/status/pending/page";
// import Register from "@/components/status/register/page";
// import { Button } from "@/components/ui/button";
// import { redirect } from "next/navigation";
// import { ReactNode } from "react";

// // Add this to prevent caching
// export const dynamic = "force-dynamic";
// export const revalidate = 0;

// export default async function Layout({ children }: { children: ReactNode }) {
//   const session = await auth();

//   // Simple redirect if no session
//   if (!session) {
//     redirect("/sign-in");
//   }

//   return (
//     <main>
//       <div className="mx-auto max-w-7xl">
//         <Header session={session} />
//         <div className="mt-20 pb-20">
//           {/* Simple user info display */}
//           <form
//             action={async () => {
//               "use server";
//               await signOut();
//             }}
//             className="mb-10"
//           >
//             <Button>Logout</Button>
//           </form>
//           <div className="p-4 mb-4 bg-gray-50 border border-gray-200 rounded-md">
//             <h3 className="font-semibold">User Information:</h3>
//             <ul className="text-sm mt-2 space-y-1">
//               <li>
//                 <strong>Email:</strong> {session.user.email}
//               </li>
//               <li>
//                 <strong>First Name:</strong>{" "}
//                 {session.user.firstName || "Not provided"}
//               </li>
//               <li>
//                 <strong>Last Name:</strong>{" "}
//                 {session.user.lastName || "Not provide edd"}
//               </li>
//               <li>
//                 <strong>Status:</strong> {session.user.status}
//               </li>
//               <li>
//                 <strong>Role:</strong> {session.user.role}
//               </li>
//             </ul>
//           </div>

//           {/* Simple conditional rendering */}
//           {session.user.status === "UNSUBMITTED" && <Register />}
//           {session.user.status === "PENDING" && <Pending />}
//           {/* Show main content for approved users */}
//           {session.user.status === "APPROVED" && children}
//         </div>
//       </div>
//     </main>
//   );
// }
