// app/(root)/layout.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { Navbar } from "@/components/navbar/Navbar";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
