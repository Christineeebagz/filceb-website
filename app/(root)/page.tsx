// import { auth } from "@/auth";
// import Header from "@/components/Header";
// import Register from "@/components/status/register/page";
// import { Button } from "@/components/ui/button";
// import { db } from "@/database/drizzle";
// import { users } from "@/database/schema";
// import Link from "next/link";
// import { redirect } from "next/navigation";

// const Home = async () => {
//   const session = await auth();
//   if (!session) redirect("/sign-in");
//   const result = await db.select().from(users);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen gap-4">
//       <h1 className="text-2xl font-bold">This is the User Home page</h1>
//       <div className="mx-auto max-w-7xl">
//         <Header session={session} />

//         <div className="mt-20 pb-20">{/* Show user info for debugging */}</div>
//       </div>
//     </div>
//   );
// };

// export default Home;
// app/(root)/page.tsx
const Home = async () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Welcome to Your Dashboard!</h1>
      <p className="text-lg">Your application has been approved.</p>
      <p>This is your main application content.</p>
    </div>
  );
};

export default Home;
