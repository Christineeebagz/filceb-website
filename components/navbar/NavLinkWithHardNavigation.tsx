// components/navbar/NavLinkWithHardNavigation.tsx
"use client";

import { useHardNavigation } from "@/lib/navigation";
import { usePathname } from "next/navigation";
import { aileron } from "@/lib/fonts";

interface NavLinkWithHardNavigationProps {
  href: string;
  label: string;
}

export const NavLinkWithHardNavigation = ({
  href,
  label,
}: NavLinkWithHardNavigationProps) => {
  const pathname = usePathname();
  const navigate = useHardNavigation();
  const isActive = pathname === href;
  const underlineWidth = Math.max(label.length * 12, 60);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(href);
  };

  return (
    <div className="relative h-[48px] flex items-center px-[22px]">
      <a
        href={href}
        onClick={handleClick}
        className={`${aileron.className} font-[950] text-[20px] leading-none
                    no-underline hover:no-underline
                    flex items-center h-full cursor-pointer`}
        style={{ color: isActive ? "#F8EF30" : "#FFFFFF" }}
      >
        {label}
      </a>

      {/* ACTIVE underline */}
      {isActive && (
        <div
          className="absolute left-1/2 -translate-x-1/2
                     h-[6px] rounded-full"
          style={{
            width: underlineWidth,
            backgroundColor: "#F8EF30",
            bottom: "-25px",
          }}
        />
      )}
    </div>
  );
};
