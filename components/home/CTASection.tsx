"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useAuthModal } from "@/hooks/useAuthModal";

interface CTASectionProps {
  title: string;
  description: string;
  ctaText?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
  title,
  description,
  ctaText = "Join Us",
}) => {
  const { openSignUp } = useAuthModal();

  return (
    <section className="py-16 px-4 rounded-lg text-center bg-white">
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
        <h2 className="text-3xl md:text-4xl font-bold text-balance text-[#1E1E1E]">
          {title}
        </h2>
        <p className="text-lg text-balance text-[#666666]">{description}</p>

        <div className="flex justify-center">
          <Button
            onClick={openSignUp}
            size="lg"
            className="font-bold text-base hover:opacity-90 transition-opacity bg-[#F8EF30] text-[#1E1E1E] px-8 py-2 h-auto w-auto min-w-[150px]"
          >
            {ctaText}
          </Button>
        </div>
      </div>
    </section>
  );
};
