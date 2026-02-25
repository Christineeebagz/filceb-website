"use client";
import { adminSideBarLinks } from "@/constants";
import { Session } from "next-auth";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import React from "react";
import { handleSignOut } from "@/app/actions/auth";
import { aileron } from "@/lib/fonts";

const SideBar = ({ session }: { session: Session }) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleSwitchToMemberView = () => {
    // Force a hard navigation to member view
    window.location.href = "/approved";
  };

  const handleLogoClick = () => {
    window.location.href = "/admin";
  };

  return (
    <div className="sticky left-0 top-0 flex h-dvh flex-col bg-[#1E1E1E] w-[clamp(240px,20vw,320px)] text-white">
      {/* Logo and Brand Section - Top */}
      <button
        onClick={handleLogoClick}
        className="flex flex-col items-center gap-4 py-6 px-4 w-full hover:bg-white/5 transition-colors cursor-pointer"
      >
        <div className="relative w-[clamp(60px,8vw,96px)] h-[clamp(60px,8vw,96px)]">
          <Image
            src="/logos/filceblogo.svg"
            alt="FILCEB Logo"
            width={96}
            height={96}
            className="object-contain w-full h-full"
            priority
          />
        </div>
        <div className="text-center">
          <h1
            className={`${aileron.className} font-black text-[clamp(1rem,2vw,1.25rem)] text-white`}
            style={{
              textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              letterSpacing: "-0.02em",
            }}
          >
            FILCEB BUSINESS CLUB
          </h1>
          <p
            className="font-serif text-[clamp(0.75rem,1.5vw,0.875rem)] text-white/80 mt-1"
            style={{ fontFamily: "Times New Roman, serif" }}
          >
            Cebu, Philippines
          </p>
        </div>
      </button>

      {/* Navigation Links - Below Logo */}
      <nav className="flex-1 px-3 py-2">
        {adminSideBarLinks.map((link, index) => {
          const isSelected = pathname === link.route;
          const isFirstItem = index === 0;

          return (
            <button
              key={link.route}
              onClick={() => (window.location.href = link.route)}
              className={`w-full mb-2 px-4 py-3 rounded-lg flex items-center gap-3 transition-all ${
                isSelected
                  ? "bg-white text-[#1E1E1E] font-bold pr-0 mr-0"
                  : "text-[#F8EF30] hover:bg-white/10"
              }`}
            >
              {/* Two different icons based on index */}
              {isFirstItem ? (
                <svg
                  width="24"
                  height="24"
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
              ) : (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flex-shrink-0"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              )}
              <span
                className={`${aileron.className} text-[clamp(0.875rem,1.5vw,1.125rem)] font-medium`}
              >
                {link.text}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Logout Section - Bottom */}
      <div className="border-t border-white/20 pt-6 pb-8 px-4 space-y-3">
        {/* Switch to Member View Button */}
        <button
          onClick={handleSwitchToMemberView}
          className="w-full px-4 py-3 rounded-lg bg-white text-[#1E1E1E] hover:bg-white/90 transition-all duration-200 group cursor-pointer font-bold flex items-center gap-3 justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
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
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span
            className={`${aileron.className} text-[clamp(0.75rem,1.2vw,0.875rem)]`}
          >
            Switch to Member View
          </span>
        </button>

        {/* Sign Out Button */}
        <form action={handleSignOut} className="w-full">
          <button
            type="submit"
            className="w-full px-4 py-3 rounded-lg bg-[#F8EF30] text-[#1E1E1E] hover:bg-[#F0E820] transition-all duration-200 flex items-center gap-3 justify-center font-bold group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
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
            <span
              className={`${aileron.className} text-[clamp(0.875rem,1.5vw,1rem)]`}
            >
              Logout
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SideBar;
