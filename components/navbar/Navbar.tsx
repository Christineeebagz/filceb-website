import { auth } from "@/auth";
import Link from "next/link";
import Image from "next/image";

import { aileron } from "@/lib/fonts";
import { NavbarClient } from "./NavbarClient";

export async function Navbar() {
  const session = await auth();

  return (
    <nav
      className="mt-11 md:mt-[25px] w-full z-50 rounded-[30px] px-4 md:px-10 py-1 md:py-2 mx-auto max-w-[calc(100%-200px)] md:max-w-[calc(100%-200px)]"
      style={{ backgroundColor: "#1E1E1E" }}
    >
      <div className="w-full mx-[20px]">
        <div className="flex justify-between items-center h-full py-[15px]">
          {/* LEFT SIDE: Logo & Brand */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center gap-[8px]  no-underline hover:no-underline"
            >
              {/* Logo with exact spacing */}
              <div className="relative w-12 h-12 shrink-0 ml-[10px]">
                <Image
                  src="/logos/filceblogo.svg"
                  alt="Filceb Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                  priority
                />
              </div>

              {/* Brand Text with pixel-perfect alignment */}
              <div className="flex flex-col justify-center items-center h-12 text-center mr-[10px]">
                <span
                  className={`${aileron.className} font-[950] text-[16px] tracking-[-0.02em] uppercase`}
                  style={{ color: "#F8EF30" }}
                >
                  Filceb Business Club
                </span>

                <span
                  className="font-times text-[11px] mt-[1px] tracking-wide"
                  style={{ color: "#F8EF30" }}
                >
                  Cebu, Philippines
                </span>
              </div>
            </Link>
          </div>

          {/* RIGHT SIDE: Interactive part */}
          <NavbarClient user={session?.user || null} />
        </div>
      </div>
    </nav>
  );
}
