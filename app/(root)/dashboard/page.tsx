// app/(root)/dashboard/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import UnsubmittedStatus from "@/components/status/unsubmitted/page";
import PendingStatus from "@/components/status/pending/page";
import PreApprovedStatus from "@/components/status/preapproved/page";
import RejectedStatus from "@/components/status/rejected/page";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  const { status } = session.user;

  switch (status) {
    case "UNSUBMITTED":
      return <UnsubmittedStatus />;
    case "PENDING":
      return <PendingStatus />;
    case "PRE-APPROVED":
      return <PreApprovedStatus />;
    case "REJECTED":
      return <RejectedStatus />;
    case "APPROVED":
      redirect("/approved");
    default:
      return <UnsubmittedStatus />;
  }
}
