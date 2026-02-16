// app/(root)/layout.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <main>
      <div className="mx-auto max-w-7xl pt-16">
        <div className="mt-4 pb-20 px-4">
          {/* Only render children if user is approved */}
          {session.user.status === "APPROVED" ? (
            children
          ) : (
            // Show status messages for other statuses
            <div className="text-center py-12">
              {session.user.status === "UNSUBMITTED" && (
                <p>Please complete your registration.</p>
              )}
              {session.user.status === "PENDING" && (
                <p>Your application is under review.</p>
              )}
              {session.user.status === "PRE-APPROVED" && (
                <p>
                  Your application is pre-approved. Awaiting final approval.
                </p>
              )}
              {session.user.status === "REJECTED" && (
                <p>
                  Your application has been rejected. Please contact support.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
