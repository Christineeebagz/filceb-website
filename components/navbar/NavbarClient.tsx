"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { handleSignOut } from "@/app/actions/auth";
import { aileron } from "@/lib/fonts";

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

interface NavLinkProps {
  href: string;
  label: string;
}

/* ---------------------------------- */
/* Main Navbar Client */
/* ---------------------------------- */
export const NavbarClient = ({ user }: NavbarClientProps) => {
  return (
    <div className="flex items-center h-[48px] mr-[40px]">
      <NavLink href="/" label="Home" />

      {user?.status === "APPROVED" && (
        <NavLink href="/community" label="Community" />
      )}

      <NavLink href="/about" label="About Us" />

      {user?.role === "ADMIN" && <NavLink href="/admin" label="Admin" />}

      <ProfileMenu />
    </div>
  );
};

/* ---------------------------------- */
/* Navigation Link - FIXED ALIGNMENT */
/* ---------------------------------- */
const NavLink = ({ href, label }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  const underlineWidth = Math.max(label.length * 12, 60);

  return (
    <div className="relative h-[48px] flex items-center px-[22px]">
      <Link
        href={href}
        className={`${aileron.className} font-[950] text-[20px] leading-none
                    no-underline hover:no-underline
                    flex items-center h-full`}
        style={{ color: isActive ? "#F8EF30" : "#FFFFFF" }}
      >
        {label}
      </Link>

      {/* ACTIVE underline ONLY, positioned to navbar bottom */}
      {isActive && (
        <div
          className="absolute left-1/2 -translate-x-1/2
                     h-[6px] rounded-full"
          style={{
            width: underlineWidth,
            backgroundColor: "#F8EF30",
            bottom: "-20px", // 👈 pushes underline to navbar bottom
          }}
        />
      )}
    </div>
  );
};

/* ---------------------------------- */
/* Profile Menu - Fixed Dropdown with 2px padding */
/* ---------------------------------- */
const ProfileMenu = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      {/* Dropdown */}
      {open && (
        <div
          className="absolute top-full mt-[2px] z-50 shadow-md
               rounded-[10px] py-1
               bg-white
               min-w-[140px] max-w-[220px] sm:max-w-[250px] md:max-w-[300px]
               right-0"
          style={{
            margin: "5px",
            right: "-39px",
            left: "auto", // keeps dropdown expanding to the left if needed
          }}
        >
          <form action={handleSignOut}>
            <button
              type="submit"
              className={`${aileron.className} font-[700] text-[14px]
                   text-left px-4 py-3 rounded-[10px]
                   transition-colors no-border
                   hover:bg-gray-200 hover:text-[#F8EF30]`}
              style={{ color: "#1E1E1E", padding: "8px" }}
            >
              Sign Out
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
