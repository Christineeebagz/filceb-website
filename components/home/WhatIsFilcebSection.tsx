"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ImageCarousel } from "./ImageCarousel";

interface WhatIsFilcebSectionProps {
  description: string;
  images: string[];
}

export const WhatIsFilcebSection: React.FC<WhatIsFilcebSectionProps> = ({
  description,
  images,
}) => {
  return (
    <section className="py-16 px-4 rounded-lg bg-[#1E1E1E]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-balance text-white">
          What is Filceb?
        </h2>
        <p
          className="text-center mb-6 max-w-2xl mx-auto text-balance text-[#D0D0D0] font-bold"
          style={{ fontFamily: "Times New Roman, serif", fontSize: "24px" }}
        >
          About Us
        </p>
        <p className="text-center mb-12 max-w-2xl mx-auto text-balance text-[#D0D0D0]">
          {description}
        </p>

        {/* Image Carousel - Now horizontal scroll */}
        <div className="mb-8">
          <ImageCarousel images={images} />
        </div>

        {/* Read More Button - Links to About page */}
        <div className="flex justify-center">
          <Link href="/about" passHref>
            <Button className="font-bold text-sm hover:opacity-90 transition-opacity bg-[#F8EF30] text-[#1E1E1E]">
              Read More About Us
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
