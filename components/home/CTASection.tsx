import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  title: string;
  description: string;
  ctaText?: string;
  ctaLink?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
  title,
  description,
  ctaText = "Join Us",
  ctaLink = "/sign-up",
}) => {
  return (
    <section className="py-16 px-4 rounded-lg text-center bg-white">
      <div className="max-w-3xl mx-auto flex flex-col gap-6">
        <h2 className="text-3xl md:text-4xl font-bold text-balance text-[#1E1E1E]">
          {title}
        </h2>
        <p className="text-lg text-balance text-[#666666]">{description}</p>

        <Link href={ctaLink}>
          <Button
            size="lg"
            className="font-bold text-base hover:opacity-90 transition-opacity bg-[#F8EF30] text-[#1E1E1E]"
          >
            {ctaText}
          </Button>
        </Link>
      </div>
    </section>
  );
};
