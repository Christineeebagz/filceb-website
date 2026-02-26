import { Session } from "next-auth";
import React from "react";

const Header = ({ session }: { session: Session }) => {
  return (
    <header>
      <h2>Monitor all users</h2>
      <p>Search</p>
    </header>
  );
};

export default Header;
