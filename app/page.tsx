// app/page.tsx (at root level)
import { auth } from "@/auth";
import HomeAuthenticated from "./(root)/page";
import HomeUnauthenticated from "./(auth)/home/page";

export default async function Home() {
  const session = await auth();

  // If user is logged in, show authenticated home page
  if (session) {
    return <HomeAuthenticated />;
  }

  // If user is not logged in, show unauthenticated home page
  return <HomeUnauthenticated />;
}
