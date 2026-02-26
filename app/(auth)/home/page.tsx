// app/(auth)/home/page.tsx
"use client";

import React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { WhatIsFilcebSection } from "@/components/home/WhatIsFilcebSection";
import { WhyJoinSection } from "@/components/home/WhyJoinSection";
import { MemberCompaniesClient } from "@/components/home/MemberCompaniesClient";
import { CTASection } from "@/components/home/CTASection";
import {
  whyJoinBenefits,
  whatIsFilcebImages,
  heroImages,
  ctaData,
} from "@/constants/home-data";

export default function HomeUnauthenticated() {
  return (
    <main style={{ backgroundColor: "#FFFFFF" }}>
      <section className="px-4 pt-0 pb-4">
        <div className="mx-auto max-w-[calc(100%-200px)] md:max-w-[calc(100%-200px)]">
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
          <MemberCompaniesClient />
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <CTASection
            title={ctaData.title}
            description={ctaData.description}
            ctaText={ctaData.ctaText}
          />
        </div>
      </section>
    </main>
  );
}
