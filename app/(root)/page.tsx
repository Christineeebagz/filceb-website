// app/(root)/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import UnsubmittedStatus from "@/components/status/unsubmitted/page";
import PendingStatus from "@/components/status/pending/page";
import PreApprovedStatus from "@/components/status/preapproved/page";
import RejectedStatus from "@/components/status/rejected/page";
import Approved from "@/components/status/approved/page";

export default async function HomeAuthenticated() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  const { status } = session.user;

  // Render different status pages based on user status
  switch (status) {
    case "UNSUBMITTED":
      return <UnsubmittedStatus />;

    case "PENDING":
      return <PendingStatus />;

    case "PRE-APPROVED":
      return <PreApprovedStatus />;

    case "REJECTED":
      return <RejectedStatus />;

    // For APPROVED status, you'll add the member page later
    case "APPROVED":
      return <Approved />;
    //  (
    //   <div className="min-h-screen bg-[#1E1E1E] flex items-center justify-center">
    //     <p className="text-white">Member page coming soon...</p>
    //   </div>
    // );

    default:
      return <UnsubmittedStatus />;
  }
}
