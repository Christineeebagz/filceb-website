"use client";

import React, { useState } from "react";
import Image from "next/image";
import { aileron } from "@/lib/fonts";
import { useAuthModal } from "@/hooks/useAuthModal"; // Import the auth modal hook

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  images?: { main?: string; logo?: string };
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title = "FILCEB BUSINESS CLUB",
  subtitle = "Cebu, Philippines",
  images = {
    main: "/images/home-group-image.png",
    logo: "/logos/filceblogo.svg",
  },
}) => {
  const [isImageHovered, setIsImageHovered] = useState(false);
  const { openSignIn, openSignUp } = useAuthModal(); // Get modal functions

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-12 md:py-20 px-6 md:px-12 bg-white">
      {/* Left: Hero Image with Hover Text Overlay */}
      <div
        className="relative h-72 md:h-96 rounded-3xl overflow-hidden shadow-lg group cursor-pointer"
        onMouseEnter={() => setIsImageHovered(true)}
        onMouseLeave={() => setIsImageHovered(false)}
      >
        <Image
          src={images.main || "/images/home-group-image.png"}
          alt="FILCEB Members"
          fill
          className="object-cover transition-all duration-300"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Dark Overlay on Hover */}
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-300 flex flex-col items-center justify-center ${
            isImageHovered ? "opacity-60" : "opacity-0"
          }`}
        >
          {/* Hover Text */}
          <div className="text-center">
            <p className="font-serif text-[#F8EF30] text-xl md:text-2xl mb-2">
              Leaders Building Leaders:
            </p>
            <h2
              className={`${aileron.className} font-black text-[#F8EF30] text-4xl md:text-5xl leading-tight`}
            >
              The Home for Cebu's
            </h2>
            <h3
              className={`${aileron.className} font-black text-[#F8EF30] text-6xl md:text-7xl`}
            >
              mSMEs
            </h3>
          </div>
        </div>
      </div>

      {/* Right: Branding and CTA - Centered */}
      <div className="flex flex-col items-center gap-8">
        {/* Logo and Text - Centered */}
        <div className="flex flex-col items-center gap-4">
          {/* Logo Circle */}
          <div className="relative w-20 h-20">
            <Image
              src={images.logo || "/logos/filceblogo.svg"}
              alt="FILCEB Logo"
              width={80}
              height={80}
              className="object-contain"
              priority
            />
          </div>

          {/* Branding Text - Centered with shadow on title */}
          <div className="text-center">
            <h1
              className={`${aileron.className} font-black text-3xl md:text-5xl text-[#1E1E1E] leading-tight`}
              style={{
                textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                letterSpacing: "-0.02em",
              }}
            >
              {title}
            </h1>
            <p
              className="font-serif text-[#1E1E1E] mt-2"
              style={{
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              {subtitle}
            </p>
          </div>
        </div>

        {/* CTA Buttons - Fixed width independent of text */}
        <div className="flex flex-col gap-3 w-full items-center">
          <button
            onClick={openSignIn}
            className="w-[180px] px-6 py-1 bg-[#F8EF30] text-[#1E1E1E] font-bold text-sm uppercase tracking-wide hover:opacity-90 transition-opacity rounded-sm"
          >
            Log-In
          </button>
          <button
            onClick={openSignUp}
            className="w-[180px] px-6 py-1 bg-[#F8EF30] text-[#1E1E1E] font-bold text-sm uppercase tracking-wide hover:opacity-90 transition-opacity rounded-sm"
          >
            Sign Up
          </button>
        </div>
      </div>
    </section>
  );
};
