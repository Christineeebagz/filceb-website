"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ImageCarousel } from "./ImageCarousel";

interface WhatIsFilcebSectionProps {
  description: string;
  images: string[];
  onReadMore?: () => void;
}

export const WhatIsFilcebSection: React.FC<WhatIsFilcebSectionProps> = ({
  description,
  images,
  onReadMore,
}) => {
  return (
    <section className="py-16 px-4 rounded-lg bg-[#1E1E1E]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-balance text-white">
          What is Filceb?
        </h2>
        <p className="text-center mb-12 max-w-2xl mx-auto text-balance text-[#D0D0D0]">
          {description}
        </p>

        {/* Image Carousel */}
        <div className="mb-8">
          <ImageCarousel
            images={images}
            autoplay={true}
            autoplayInterval={5000}
          />
        </div>

        {/* Read More Button */}
        {onReadMore && (
          <div className="flex justify-center">
            <Button
              onClick={onReadMore}
              className="font-bold text-sm hover:opacity-90 transition-opacity bg-[#F8EF30] text-[#1E1E1E]"
            >
              Read More About Us
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
