// app/(root)/page.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { HeroSection } from "@/components/home/HeroSection";
import { WhatIsFilcebSection } from "@/components/home/WhatIsFilcebSection";
import { WhyJoinSection } from "@/components/home/WhyJoinSection";
import { MemberCompaniesSection } from "@/components/home/MemberCompaniesSection";
import { CTASection } from "@/components/home/CTASection";

// Mock data - replace with actual data from your database
const mockBenefits = [
  {
    title: "Expert Mentorship",
    description:
      "Get personalized guidance from industry leaders and experienced entrepreneurs.",
    image: "/images/placeholder-benefit-1.jpg",
  },
  {
    title: "Collaborative Opportunities",
    description:
      "Network with peers and discover collaboration possibilities that drive growth.",
    image: "/images/placeholder-benefit-2.jpg",
  },
  {
    title: "Powerful Connections",
    description:
      "Build meaningful relationships with business professionals and innovators.",
    image: "/images/placeholder-benefit-3.jpg",
  },
  {
    title: "Immersive Experiences",
    description:
      "Participate in workshops, seminars, and events that expand your horizons.",
    image: "/images/placeholder-benefit-4.jpg",
  },
];

const mockCompanies = [
  { name: "Company 1", logo: "/images/placeholder-logo-1.jpg" },
  { name: "Company 2", logo: "/images/placeholder-logo-2.jpg" },
  { name: "Company 3", logo: "/images/placeholder-logo-3.jpg" },
  { name: "Company 4", logo: "/images/placeholder-logo-4.jpg" },
  { name: "Company 5", logo: "/images/placeholder-logo-5.jpg" },
  { name: "Company 6", logo: "/images/placeholder-logo-6.jpg" },
  { name: "Company 7", logo: "/images/placeholder-logo-7.jpg" },
  { name: "Company 8", logo: "/images/placeholder-logo-8.jpg" },
];

const mockCarouselImages = [
  "/images/placeholder-carousel-1.jpg",
  "/images/placeholder-carousel-2.jpg",
  "/images/placeholder-carousel-3.jpg",
];

export default function HomeAuthenticated() {
  const router = useRouter();

  const handleReadMore = () => {
    router.push("/about");
  };

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <HeroSection
            title="FILCEB BUSINESS CLUB"
            subtitle="Cebu, Philippines"
            images={{
              main: "/images/placeholder-hero.jpg",
              logo: "/images/placeholder-logo.jpg",
            }}
          />
        </div>
      </section>

      {/* What is Filceb Section */}
      <section className="px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <WhatIsFilcebSection
            description="FILCEB Business Club Inc. is a non-government, non-profit organization for the purpose of networking, learning, business development and collaborating on projects."
            images={mockCarouselImages}
            onReadMore={handleReadMore}
          />
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <WhyJoinSection benefits={mockBenefits} />
        </div>
      </section>

      {/* Member Companies Section */}
      <section className="px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <MemberCompaniesSection companies={mockCompanies} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <CTASection
            title="Ready to ignite growth for your business?"
            description="Join a community of like-minded entrepreneurs and business professionals."
            ctaText="Join Us"
            ctaLink="/sign-up"
          />
        </div>
      </section>
    </main>
  );
}
