// app/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import HomeUnauthenticated from "./(auth)/home/page";

export default async function Home() {
  const session = await auth();

  // If user is logged in, redirect to dashboard
  if (session) {
    redirect("/dashboard");
  }

  // If user is not logged in, show unauthenticated home page
  return <HomeUnauthenticated />;
}
