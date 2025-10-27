"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { adminSideBarLinks } from "@/constants";
import { getInitials, cn } from "@/lib/utils";
import { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SideBar = ({ session }: { session: Session }) => {
  const pathname = usePathname();
  console.log("Session object:", session);
  return (
    <div className="sticky bg-blue left-0 top-0 flex h-dvh flex-col justify-between bg-white px-5 pb-5 pt-10">
      {/* sticky left-0 top-0 flex h-dvh flex-col  bg-amber-200 px-5 pb-5 pt-10 gap-6"> */}
      SideBar
      {adminSideBarLinks.map((link) => {
        const isSelected =
          (link.route != "/admin" &&
            pathname.includes(link.route) &&
            link.route.length > 1) ||
          pathname === link.route;
        return (
          <Link href={link.route} key={link.route}>
            <div>
              <p>{link.text}</p>
            </div>
          </Link>
        );
      })}
      <div>
        <p>{session?.user?.email}</p>
      </div>
    </div>
  );
};

export default SideBar;
