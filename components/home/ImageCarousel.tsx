"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageCarouselProps {
  images: string[];
  autoplay?: boolean;
  autoplayInterval?: number;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  autoplay = true,
  autoplayInterval = 5000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoplayInterval);
    return () => clearInterval(interval);
  }, [autoplay, autoplayInterval, images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative w-full h-80 bg-muted rounded-lg overflow-hidden group">
      {/* Images */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`Slide ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-primary/80 text-primary-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-primary/80 text-primary-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? "bg-accent w-8"
                : "bg-primary-foreground/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
