"use client";

import React from "react";
import { BenefitCard } from "./BenefitCard";

interface BenefitItem {
  title: string;
  description: string;
  image: string;
  icon?: React.ReactNode;
}

interface WhyJoinSectionProps {
  benefits: BenefitItem[];
}

export const WhyJoinSection: React.FC<WhyJoinSectionProps> = ({ benefits }) => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-[#1E1E1E]">
          Why Join Us?
        </h2>
        <p className="text-center mb-12 text-balance text-[#666666]">
          Discover the benefits of becoming part of our community
        </p>

        {/* Benefit Cards - 4 in a row on desktop, 1 column on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={index}
              title={benefit.title}
              description={benefit.description}
              image={benefit.image}
              icon={benefit.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
