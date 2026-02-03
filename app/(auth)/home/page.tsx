// "use client"; // Add this directive at the top

// import React from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";

// const Home = () => {
//   const router = useRouter();

//   const handleClickSignUp = () => {
//     router.push("/sign-up");
//   };
//   const handleClickSignIn = () => {
//     router.push("/sign-in");
//   };

//   return (
//     <div>
//       Home welcome to Filceb
//       <Button onClick={handleClickSignUp}>Sign-up</Button>
//       <Button onClick={handleClickSignIn}>Sign-in</Button>
//     </div>
//   );
// };

// export default Home;

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AuthHome() {
  const router = useRouter();

  return (
    <div className="text-center space-y-6">
      <h2 className="text-xl font-semibold text-primary">Welcome to FILCEB</h2>
      <p className="text-muted-foreground">
        Sign in to your account or create a new one to get started.
      </p>

      <div className="flex flex-col gap-3 pt-4">
        <Button
          onClick={() => router.push("/sign-in")}
          className="bg-accent text-accent-foreground hover:bg-accent/90"
        >
          Sign In
        </Button>
        <Button
          onClick={() => router.push("/sign-up")}
          variant="outline"
          className="border-accent text-accent hover:bg-accent/10"
        >
          Sign Up
        </Button>
      </div>

      <p className="text-xs text-muted-foreground pt-4">
        Don&apos;t have an account yet? Join our business community today!
      </p>
    </div>
  );
}
