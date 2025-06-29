"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { Session } from "next-auth";
import Link from "next/link";
import React from "react";

const Header = ({ session }: { session: Session }) => {
  return (
    <div>
      FilCeb Organization
      <Link href="/my-profile">
        <Avatar>
          {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
          <AvatarFallback className="text-black">
            {getInitials(session?.user?.name ?? "N A")}
            {/* {getInitials(session?.user?.email || "NA")} */}
          </AvatarFallback>
        </Avatar>
      </Link>
    </div>
  );
};

export default Header;
