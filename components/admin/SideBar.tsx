"use client";
import { adminSideBarLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SideBar = () => {
  const pathname = usePathname();
  return (
    <div className="sticky left-0 top-0 flex h-dvh flex-col  bg-white px-5 pb-5 pt-10;">
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
    </div>
  );
};

export default SideBar;
