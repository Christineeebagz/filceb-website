// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { aileron } from "@/lib/fonts";
import { AuthModal } from "@/components/AuthModal";
import { ModalProvider } from "@/contexts/ModalContext";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/shared/Footer";
import { headers } from "next/headers";

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
    "Based in Cebu, our organization is more than a business club—it's a vibrant platform for collaboration and growth.",
  icons: {
    icon: "/logos/filceblogo.svg", // Changed from "/filceblogo.svg" to "/logos/filceblogo.svg"
    // You can also add additional icon sizes if needed
    apple: "/logos/filceblogo.svg",
  },
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  // Get the current pathname from headers
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";

  // Check if the current route is an admin route
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <html
      lang="en"
      className={`${aileron.variable} ${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="font-aileron antialiased">
        <SessionProvider session={session}>
          <ModalProvider>
            {/* Only render navbar if NOT on admin routes */}
            {!isAdminRoute && <Navbar />}
            {children}
            {!isAdminRoute && <Footer />}
            {/* <Footer /> */}
            <AuthModal />
            <Toaster />
          </ModalProvider>
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
