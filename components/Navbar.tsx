import { auth } from "@/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";
import Image from "next/image";

export async function Navbar() {
  const session = await auth();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              {/* Replace with your actual logo */}
              <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <span className="font-bold text-xl text-gray-900">Filceb</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {/* Always show Home */}
            <NavLink href="/">Home</NavLink>

            {/* Show About Us to everyone */}
            <NavLink href="/about">About Us</NavLink>

            {/* Show Community only to logged-in users */}
            {session && (
              <>
                {session.user.status === "APPROVED" && (
                  <NavLink href="/community">Community</NavLink>
                )}

                {/* Show Admin link only for admin users */}
                {session.user.role === "ADMIN" && (
                  <NavLink href="/admin">Admin</NavLink>
                )}
              </>
            )}
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {session ? (
              <div className="flex items-center space-x-4">
                {/* User Profile Dropdown */}
                <div className="relative group">
                  <button className="flex items-center space-x-2 focus:outline-none">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-medium text-sm">
                        {session.user.firstName?.charAt(0) ||
                          session.user.name?.charAt(0) ||
                          session.user.email?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="hidden md:inline text-sm font-medium text-gray-700">
                      {session.user.firstName ||
                        session.user.name?.split(" ")[0]}
                    </span>
                    <svg
                      className="w-4 h-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-200 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {session.user.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {session.user.email}
                      </p>
                    </div>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      👤 Your Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      ⚙️ Settings
                    </Link>
                    <div className="border-t border-gray-100"></div>
                    <form
                      action={async () => {
                        "use server";
                        await signOut();
                      }}
                    >
                      <button
                        type="submit"
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        🚪 Sign Out
                      </button>
                    </form>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="hidden md:block">
                  <StatusBadge status={session.user.status} />
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" asChild size="sm">
                  <Link href="/sign-in">Sign In</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/sign-up">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden border-t border-gray-200 px-4 py-2 bg-white">
        <div className="flex flex-col space-y-2">
          <MobileNavLink href="/">Home</MobileNavLink>
          <MobileNavLink href="/about">About Us</MobileNavLink>
          {session && session.user.status === "APPROVED" && (
            <MobileNavLink href="/community">Community</MobileNavLink>
          )}
          {session && session.user.role === "ADMIN" && (
            <MobileNavLink href="/admin">Admin</MobileNavLink>
          )}
        </div>
      </div>
    </nav>
  );
}

// Status Badge Component
function StatusBadge({ status }: { status?: string | null }) {
  const getStatusConfig = (status: string | null | undefined) => {
    switch (status) {
      case "APPROVED":
        return { color: "bg-green-100 text-green-800", label: "Approved" };
      case "PENDING":
        return { color: "bg-yellow-100 text-yellow-800", label: "Pending" };
      case "PRE-APPROVED":
        return { color: "bg-blue-100 text-blue-800", label: "Pre-Approved" };
      case "REJECTED":
        return { color: "bg-red-100 text-red-800", label: "Rejected" };
      default:
        return { color: "bg-gray-100 text-gray-800", label: "Unsubmitted" };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}
    >
      {config.label}
    </span>
  );
}

// Desktop NavLink Component
function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
    >
      {children}
    </Link>
  );
}

// Mobile NavLink Component
function MobileNavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
    >
      {children}
    </Link>
  );
}
