"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { Session } from "next-auth";
import Link from "next/link";
import React from "react";

const Header = ({ session }: { session: Session }) => {
  return (
    <header className="my-10 flex justify-between gap-5">
      <div>
        FilCeb Organization
        <Link href="/my-profile">
          {/* <Avatar> */}
          {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
          {/* <AvatarFallback className="text-black"> */}
          {/* {getInitials(session?.user?.firstName, session?.user?.lastName)} */}
          {/* {getInitials(session?.user?.name ?? "N A")} */}
          {/* </AvatarFallback> */}
          {/* </Avatar> */}
        </Link>
      </div>
    </header>
  );
};

export default Header;
