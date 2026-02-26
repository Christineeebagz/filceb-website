// components/home/HomePageContent.tsx
"use client";

import React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { WhatIsFilcebSection } from "@/components/home/WhatIsFilcebSection";
import { WhyJoinSection } from "@/components/home/WhyJoinSection";
import { MemberCompaniesSection } from "@/components/home/MemberCompaniesSection";
import { CTASection } from "@/components/home/CTASection";
import {
  whyJoinBenefits,
  whatIsFilcebImages,
  heroImages,
} from "@/constants/home-data";

interface HomePageContentProps {
  onReadMore?: () => void;
}

export const HomePageContent: React.FC<HomePageContentProps> = ({
  onReadMore,
}) => {
  return (
    <main className="bg-white">
      <section className="px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <HeroSection
            title="FILCEB BUSINESS CLUB"
            subtitle="Cebu, Philippines"
            images={heroImages}
          />
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <WhatIsFilcebSection
            description="FILCEB Business Club Inc. is a non-government, non-profit organization for the purpose of networking, learning, business development and collaborating on projects."
            images={whatIsFilcebImages}
          />
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <WhyJoinSection benefits={whyJoinBenefits} />
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <MemberCompaniesSection />
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <CTASection
            title="Ready to ignite growth for your business?"
            description="Join a community of like-minded entrepreneurs and business professionals."
            ctaText="Join Us"
          />
        </div>
      </section>
    </main>
  );
};
