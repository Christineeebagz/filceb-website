"use client";

import React, { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HorizontalScrollProps {
  children: React.ReactNode;
  showControls?: boolean;
  showDots?: boolean;
  itemWidth?: number; // Approximate width of each item in pixels
}

export const HorizontalScroll: React.FC<HorizontalScrollProps> = ({
  children,
  showControls = true,
  showDots = true,
  itemWidth = 160, // Default item width (w-40 = 160px)
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const childrenArray = React.Children.toArray(children);
  const totalItems = childrenArray.length;

  // Create infinite loop by duplicating items
  const infiniteChildren = [
    ...childrenArray,
    ...childrenArray,
    ...childrenArray,
  ];

  // Calculate items per view and max index
  useEffect(() => {
    const calculateItemsPerView = () => {
      if (scrollContainerRef.current) {
        const containerWidth = scrollContainerRef.current.clientWidth;
        const itemsPerView = Math.floor(containerWidth / itemWidth);
        setItemsPerView(Math.max(1, itemsPerView));
        setMaxIndex(Math.max(0, totalItems - itemsPerView));
      }
    };

    calculateItemsPerView();
    window.addEventListener("resize", calculateItemsPerView);

    return () => {
      window.removeEventListener("resize", calculateItemsPerView);
    };
  }, [itemWidth, totalItems]);

  // Handle scroll to update current index
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollPosition = container.scrollLeft;
    const newIndex = Math.round(scrollPosition / itemWidth);

    // Handle infinite scroll reset
    if (newIndex >= totalItems * 2) {
      // Jump back to the middle set
      container.scrollLeft = itemWidth * totalItems;
      setCurrentIndex(0);
    } else if (newIndex < totalItems) {
      // Jump forward to the middle set
      container.scrollLeft = itemWidth * totalItems;
      setCurrentIndex(totalItems);
    } else {
      setCurrentIndex(newIndex - totalItems);
    }
  };

  // Initialize scroll position to middle set
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = itemWidth * totalItems;
    }
  }, [itemWidth, totalItems]);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const newIndex = direction === "left" ? currentIndex - 1 : currentIndex + 1;

    // Handle infinite scroll
    if (newIndex < 0) {
      // Jump to the end of the middle set
      container.scrollLeft = itemWidth * (totalItems * 2 - 1);
      setCurrentIndex(totalItems - 1);
    } else if (newIndex >= totalItems) {
      // Jump to the start of the middle set
      container.scrollLeft = itemWidth * (totalItems + 1);
      setCurrentIndex(0);
    } else {
      container.scrollBy({
        left: direction === "left" ? -itemWidth : itemWidth,
        behavior: "smooth",
      });
      setCurrentIndex(newIndex);
    }
  };

  return (
    <div className="relative">
      {/* Scroll Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
        style={{ scrollBehavior: "smooth" }}
        onScroll={handleScroll}
      >
        {infiniteChildren.map((child, index) => (
          <div key={index} className="flex-shrink-0">
            {child}
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      {showControls && (
        <>
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full shadow-lg transition-colors z-10 bg-black/80 text-white hover:bg-black"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full shadow-lg transition-colors z-10 bg-black/80 text-white hover:bg-black"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {showDots && totalItems > 0 && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalItems }).map((_, index) => {
            // Calculate if this dot should be active based on visible range
            const isActive =
              index >= currentIndex && index < currentIndex + itemsPerView;

            return (
              <button
                key={index}
                onClick={() => {
                  if (scrollContainerRef.current) {
                    scrollContainerRef.current.scrollLeft =
                      itemWidth * (index + totalItems);
                    setCurrentIndex(index);
                  }
                }}
                className={`h-2 rounded-full transition-all ${
                  isActive
                    ? "w-6 bg-[#F8EF30]"
                    : "w-2 bg-gray-400 hover:bg-gray-300"
                }`}
                aria-label={`Go to item ${index + 1}`}
              />
            );
          })}
        </div>
      )}

      {/* Hide scrollbar with CSS */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};
