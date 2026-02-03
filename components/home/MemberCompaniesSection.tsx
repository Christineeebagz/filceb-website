import React from "react";
import { HorizontalScroll } from "@/components/shared/HorizontalScroll";
import { CompanyLogoItem } from "./CompanyLogoItem";

interface Company {
  logo: string;
  name: string;
}

interface MemberCompaniesSectionProps {
  companies: Company[];
}

export const MemberCompaniesSection: React.FC<MemberCompaniesSectionProps> = ({
  companies,
}) => {
  return (
    <section className="bg-primary text-primary-foreground py-16 px-4 rounded-lg">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
          Our Member Companies
        </h2>
        <p className="text-center text-primary-foreground/90 mb-12 text-balance">
          Partner businesses driving innovation and growth
        </p>

        {/* Horizontal Scrolling Logos */}
        <HorizontalScroll showControls={true}>
          {companies.map((company, index) => (
            <CompanyLogoItem
              key={index}
              logo={company.logo}
              companyName={company.name}
            />
          ))}
        </HorizontalScroll>
      </div>
    </section>
  );
};
