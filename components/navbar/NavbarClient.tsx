"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { handleSignOut } from "@/app/actions/auth";
import { aileron } from "@/lib/fonts";
import { NavLinkWithHardNavigation } from "./NavLinkWithHardNavigation";

/* ---------------------------------- */
/* Types */
/* ---------------------------------- */
interface User {
  firstName?: string;
  name?: string;
  email?: string;
  status?: string;
  role?: string;
}

interface NavbarClientProps {
  user: User | null;
}

/* ---------------------------------- */
/* Main Navbar Client */
/* ---------------------------------- */
export const NavbarClient = ({ user }: NavbarClientProps) => {
  const pathname = usePathname();
  const isAuthenticated = !!user;
  const isApproved = user?.status === "APPROVED";

  // Determine which home page to show in the nav links
  const showHomeInNav = isApproved; // Only show Home tab for approved users

  return (
    <div className="flex items-center h-[48px] mr-[40px]">
      {/* Home tab - only shown for approved users */}
      {showHomeInNav && <NavLinkWithHardNavigation href="/" label="Home" />}

      {/* About Us - shown for everyone */}
      <NavLinkWithHardNavigation href="/about" label="About Us" />

      {/* Admin - only for admins */}
      {user?.role === "ADMIN" && (
        <NavLinkWithHardNavigation href="/admin" label="Admin" />
      )}

      {/* Profile Menu */}
      <ProfileMenu user={user} />
    </div>
  );
};

/* ---------------------------------- */
/* Profile Menu */
/* ---------------------------------- */
const ProfileMenu = ({ user }: { user: User | null }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
               rounded-[10px] py-1
               bg-white
               min-w-[180px] max-w-[220px] sm:max-w-[250px] md:max-w-[300px]
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
              {/* User info */}
              <div className="px-4 py-3 border-b border-gray-200">
                <p className="font-semibold text-[#1E1E1E]">
                  {user.firstName || user.name || "User"}
                </p>
                {user.status && user.status !== "APPROVED" && (
                  <p className="text-xs text-gray-500 mt-1">
                    Status: {getStatusText(user.status)}
                  </p>
                )}
              </div>

              {/* Sign out */}
              <form action={handleSignOut}>
                <button
                  type="submit"
                  className={`${aileron.className} font-[700] text-[14px]
                 text-left px-4 py-3 rounded-[10px] w-full
                 transition-colors no-border
                 hover:bg-gray-800 hover:text-white`}
                  style={{ color: "#1E1E1E", padding: "8px" }}
                >
                  Sign Out
                </button>
              </form>
            </>
          ) : (
            // Unauthenticated users
            <Link
              href="/"
              className={`${aileron.className} font-[700] text-[14px]
             text-left px-4 py-3 rounded-[10px] block w-full
             transition-colors no-border
             hover:bg-gray-800 hover:text-white`}
              style={{ color: "#1E1E1E", padding: "8px" }}
              onClick={() => setOpen(false)}
            >
              Sign In / Sign Up
            </Link>
          )}
        </div>
      )}
    </div>
  );
};
