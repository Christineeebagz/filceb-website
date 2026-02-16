import React from "react";
import { HorizontalScroll } from "@/components/shared/HorizontalScroll";
import { CompanyLogoItem } from "./CompanyLogoItem";

interface MemberCompaniesSectionProps {
  logos: string[]; // Now accepts an array of logo paths only
}

export const MemberCompaniesSection: React.FC<MemberCompaniesSectionProps> = ({
  logos,
}) => {
  return (
    <section className="py-16 px-4 rounded-lg bg-[#1E1E1E]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-white">
          Our Member Companies
        </h2>
        <p className="text-center mb-12 text-balance text-[#D0D0D0]">
          Join these thriving businesses in Cebu
        </p>

        {/* Horizontal Scrolling Logos */}
        <HorizontalScroll showControls={true}>
          {logos.map((logo, index) => (
            <CompanyLogoItem
              key={index}
              logo={logo}
              companyName={`Member ${index + 1}`} // Generic name for accessibility/alt text
            />
          ))}
        </HorizontalScroll>
      </div>
    </section>
  );
};
