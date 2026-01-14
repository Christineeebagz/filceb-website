import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { aileron } from "@/lib/fonts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FilCeb",
  description:
    "Based in Cebu, our organization is more than a business club—it's a vibrant platform for collaboration and growth. We unite small to medium enterprises (SMEs), fueling a powerful force for economic development. Our mission is to empower these local businesses by providing resources and fostering an environment where experiences are shared, and learning is mutual.",
  icons: {
    icon: "/filceblogo.svg",
  },
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  return (
    <html
      lang="en"
      className={`${aileron.variable} ${geistSans.variable} ${geistMono.variable}`}
    >
      <SessionProvider session={session}>
        <body className="font-aileron antialiased">
          {" "}
          {/* ADDED font-aileron HERE! */}
          {children}
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  );
};

export default RootLayout;
