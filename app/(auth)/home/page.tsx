"use client"; // Add this directive at the top

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const Home = () => {
  const router = useRouter();

  const handleClickSignUp = () => {
    router.push("/sign-up");
  };
  const handleClickSignIn = () => {
    router.push("/sign-in");
  };

  return (
    <div>
      Home welcome to Filceb
      <Button onClick={handleClickSignUp}>Sign-up</Button>
      <Button onClick={handleClickSignIn}>Sign-in</Button>
    </div>
  );
};

export default Home;
