// components/navbar/NavbarClient.tsx
"use client";
import { usePathname } from "next/navigation";
import { NavLinkWithHardNavigation } from "./NavLinkWithHardNavigation";
import { ProfileMenu } from "./ProfileMenu";

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
  const isApproved = user?.status === "APPROVED";

  // Determine which home page to show in the nav links
  const showHomeInNav = isApproved; // Only show Home tab for approved users

  return (
    <div className="flex items-center h-[48px] mr-[40px]">
      {/* Home tab - only shown for approved users */}
      {showHomeInNav && <NavLinkWithHardNavigation href="/" label="Home" />}

      {/* About Us - shown for everyone */}
      <NavLinkWithHardNavigation href="/about" label="About Us" />

      {/* Profile Menu - now imported from separate component */}
      <ProfileMenu user={user} />
    </div>
  );
};
