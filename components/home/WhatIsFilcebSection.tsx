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
    <section className="bg-primary text-primary-foreground py-16 px-4 rounded-lg">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-balance">
          What is Filceb?
        </h2>
        <p className="text-center text-primary-foreground/90 mb-12 max-w-2xl mx-auto text-balance">
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
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Read More About Us
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
