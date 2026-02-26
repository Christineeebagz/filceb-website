"use client";

import { Session } from "next-auth";
import Link from "next/link";
import React from "react";

const Header = ({ session }: { session: Session }) => {
  return (
    <header className="my-10 flex justify-between gap-5">
      <div>
        FilCeb Organization
        <Link href="/my-profile"></Link>
      </div>
    </header>
  );
};

export default Header;
