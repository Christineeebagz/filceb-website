// app/(auth)/home/page.tsx
"use client";

import React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { WhatIsFilcebSection } from "@/components/home/WhatIsFilcebSection";
import { WhyJoinSection } from "@/components/home/WhyJoinSection";
import { MemberCompaniesClient } from "@/components/home/MemberCompaniesClient";
import { CTASection } from "@/components/home/CTASection";

// Mock data - replace with actual data from your database
const whyJoinBenefits = [
  {
    title: "Expert Mentorship",
    description:
      "Get personalized guidance from industry leaders and experienced entrepreneurs.",
    image: "/images/home/why-join-us/wju_1.jpg",
  },
  {
    title: "Collaborative Opportunities",
    description:
      "Network with peers and discover collaboration possibilities that drive growth.",
    image: "/images/home/why-join-us/wju_2.jpg",
  },
  {
    title: "Powerful Connections",
    description:
      "Build meaningful relationships with business professionals and innovators.",
    image: "/images/home/why-join-us/wju_3.png",
  },
  {
    title: "Immersive Experiences",
    description:
      "Participate in workshops, seminars, and events that expand your horizons.",
    image: "/images/home/why-join-us/wju_4.jpg",
  },
];

// Actual images from your file structure
const whatIsFilcebImages = [
  "/images/home/what-is-filceb/wif_1.jpg",
  "/images/home/what-is-filceb/wif_2.jpg",
  "/images/home/what-is-filceb/wif_3.jpg",
  "/images/home/what-is-filceb/wif_4.jpg",
  "/images/home/what-is-filceb/wif_5.jpg",
];

export default function HomeUnauthenticated() {
  return (
    <main style={{ backgroundColor: "#FFFFFF" }}>
      <section className="px-4 pt-0 pb-4">
        <div className="mx-auto max-w-[calc(100%-200px)] md:max-w-[calc(100%-200px)]">
          <HeroSection
            title="FILCEB BUSINESS CLUB"
            subtitle="Cebu, Philippines"
            images={{
              main: "/images/home-group-image.png",
              logo: "/logos/filceblogo.svg",
            }}
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
            title="Ready to ignite growth for your business?"
            description="Join a community of like-minded entrepreneurs and business professionals."
            ctaText="Join Us"
          />
        </div>
      </section>
    </main>
  );
}
