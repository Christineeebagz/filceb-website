// components/navbar/ProfileMenu.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { handleSignOut } from "@/app/actions/auth";
import { aileron } from "@/lib/fonts";
import { useAuthModal } from "@/hooks/useAuthModal";

interface User {
  firstName?: string;
  name?: string;
  email?: string;
  status?: string;
  role?: string;
}

interface ProfileMenuProps {
  user: User | null;
}

export const ProfileMenu = ({ user }: ProfileMenuProps) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { openSignIn, openSignUp } = useAuthModal();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get status display text
  const getStatusText = (status?: string) => {
    switch (status) {
      case "UNSUBMITTED":
        return "Registration Incomplete";
      case "PENDING":
        return "Application Pending";
      case "PRE-APPROVED":
        return "Pre-Approved";
      case "REJECTED":
        return "Application Rejected";
      case "APPROVED":
        return "Approved Member";
      default:
        return "";
    }
  };

  const handleAdminClick = () => {
    // Force hard navigation to admin page
    window.location.href = "/admin";
    setOpen(false);
  };

  const handleSignInClick = () => {
    openSignIn();
    setOpen(false);
  };

  const handleSignUpClick = () => {
    openSignUp();
    setOpen(false);
  };

  return (
    <div
      ref={menuRef}
      className="relative h-[48px] flex items-center px-[22px]"
    >
      {/* Profile Button */}
      <button
        type="button"
        aria-label="Open profile menu"
        onClick={() => setOpen((prev) => !prev)}
        className="w-10 h-10 rounded-full
                   flex items-center justify-center
                   bg-white hover:scale-105 transition-transform"
      >
        <Image
          src="/icons/profile.svg"
          alt="Profile"
          width={32}
          height={36}
          className="text-[#1E1E1E]"
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute top-full mt-[2px] z-50 shadow-md
               rounded-[10px] py-2
               bg-white
               min-w-[200px] max-w-[250px] sm:max-w-[280px] md:max-w-[320px]
               right-0"
          style={{
            margin: "5px",
            right: "-39px",
            left: "auto",
          }}
        >
          {user ? (
            // Authenticated users
            <>
              {/* User info - only name and status, no email */}
              <div className="px-4 py-3 border-b border-gray-200">
                <p className="font-semibold text-[#1E1E1E] text-sm">
                  {user.firstName || user.name || "User"}
                </p>
                {user.status && user.status !== "APPROVED" && (
                  <p className="text-xs text-gray-500 mt-1">
                    Status: {getStatusText(user.status)}
                  </p>
                )}
              </div>

              {/* Admin option - only shown for admin users */}
              {user?.role === "ADMIN" && (
                <button
                  onClick={handleAdminClick}
                  className={`${aileron.className} font-[700] text-[14px]
                    w-full px-4 py-3
                    transition-colors no-border
                    hover:bg-[#F8EF30] hover:text-[#1E1E1E] flex items-center gap-3`}
                  style={{ color: "#1E1E1E" }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="flex-shrink-0"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span>Admin Dashboard</span>
                </button>
              )}

              {/* Sign out - with icon */}
              <form action={handleSignOut} className="px-2 py-1">
                <button
                  type="submit"
                  className={`${aileron.className} font-[700] text-[14px]
                    w-full px-4 py-3 rounded-[8px]
                    transition-colors no-border
                    hover:bg-[#F8EF30] hover:text-[#1E1E1E] flex items-center gap-3`}
                  style={{ color: "#1E1E1E" }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="flex-shrink-0"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  <span>Sign Out</span>
                </button>
              </form>
            </>
          ) : (
            // Unauthenticated users - with separate Log In and Sign Up buttons
            <>
              {/* Sign In option */}
              <button
                onClick={handleSignInClick}
                className={`${aileron.className} font-[700] text-[14px]
                  w-full px-4 py-3
                  transition-colors no-border
                  hover:bg-[#F8EF30] hover:text-[#1E1E1E] flex items-center gap-3`}
                style={{ color: "#1E1E1E" }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flex-shrink-0"
                >
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1="15" y1="12" x2="3" y2="12" />
                </svg>
                <span>Log In</span>
              </button>

              {/* Sign Up option */}
              <button
                onClick={handleSignUpClick}
                className={`${aileron.className} font-[700] text-[14px]
                  w-full px-4 py-3
                  transition-colors no-border
                  hover:bg-[#F8EF30] hover:text-[#1E1E1E] flex items-center gap-3`}
                style={{ color: "#1E1E1E" }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flex-shrink-0"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <line x1="19" y1="8" x2="19" y2="14" />
                  <line x1="22" y1="11" x2="16" y2="11" />
                </svg>
                <span>Sign Up</span>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};
