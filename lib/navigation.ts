// lib/navigation.ts
"use client";

import { useRouter } from "next/navigation";

export const useHardNavigation = () => {
  const router = useRouter();

  const navigate = (path: string) => {
    // Check if navigating to admin routes (which have different layout)
    if (path.startsWith("/admin")) {
      window.location.href = path; // Force full reload for admin routes
    } else {
      router.push(path); // Use client-side navigation for same layout
    }
  };

  return navigate;
};
