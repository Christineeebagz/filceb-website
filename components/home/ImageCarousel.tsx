"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageCarouselProps {
  images: string[];
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);

  // Duplicate images for infinite scroll effect
  const duplicatedImages = [...images, ...images, ...images];

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = 300 + 16; // image width (300px) + gap (16px)

      let newScrollLeft;
      if (direction === "left") {
        newScrollLeft = container.scrollLeft - scrollAmount;
      } else {
        newScrollLeft = container.scrollLeft + scrollAmount;
      }

      container.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });

      // Check if we need to jump to the middle set for infinite effect
      setTimeout(() => checkAndResetPosition(), 300);
    }
  };

  const checkAndResetPosition = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const totalWidth = (300 + 16) * images.length; // width of one set
      const middleSetStart = totalWidth;
      const middleSetEnd = totalWidth * 2;

      // If scrolled too far left, jump to the middle set
      if (container.scrollLeft < totalWidth - 100) {
        container.scrollTo({
          left: middleSetStart + (container.scrollLeft % totalWidth),
          behavior: "auto",
        });
      }
      // If scrolled too far right, jump to the middle set
      else if (container.scrollLeft > middleSetEnd + 100) {
        container.scrollTo({
          left: middleSetStart + (container.scrollLeft % totalWidth),
          behavior: "auto",
        });
      }
    }
  };

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoScrolling) return;

    autoScrollRef.current = setInterval(() => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const scrollAmount = 300 + 16; // image width + gap

        container.scrollTo({
          left: container.scrollLeft + scrollAmount,
          behavior: "smooth",
        });

        // Check and reset position after scroll
        setTimeout(checkAndResetPosition, 300);
      }
    }, 3000); // Scroll every 3 seconds

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [isAutoScrolling, images.length]);

  // Initialize scroll position to the middle set
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const totalWidth = (300 + 16) * images.length;
      container.scrollLeft = totalWidth; // Start at the beginning of the middle set
    }
  }, [images.length]);

  // Pause auto-scroll on hover
  const handleMouseEnter = () => setIsAutoScrolling(false);
  const handleMouseLeave = () => setIsAutoScrolling(true);

  return (
    <div
      className="relative w-full group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Scroll Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        onScroll={() => checkAndResetPosition()}
      >
        {duplicatedImages.map((image, index) => (
          <div
            key={`${image}-${index}`}
            className="relative flex-shrink-0 w-72 h-48 rounded-lg overflow-hidden bg-[#F0F0F0]"
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`Filceb image ${(index % images.length) + 1}`}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:opacity-100 bg-black/80 text-white -ml-4"
        aria-label="Scroll left"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:opacity-100 bg-black/80 text-white -mr-4"
        aria-label="Scroll right"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};
