"use client";

import React from "react";
import Image from "next/image";
import { ServiceCard } from "@/components/about/ServiceCard";

const services = [
  {
    letter: "W",
    title: "Wisdom",
    description:
      "Share knowledge and insights from industry experts and experienced entrepreneurs.",
  },
  {
    letter: "E",
    title: "Education",
    description:
      "Provide continuous learning opportunities through workshops and seminars.",
  },
  {
    letter: "A",
    title: "Advancement",
    description:
      "Help members grow their businesses and advance their professional careers.",
  },
  {
    letter: "L",
    title: "Leadership",
    description:
      "Foster strong leadership skills and business acumen in our community.",
  },
  {
    letter: "T",
    title: "Together",
    description:
      "Build a collaborative environment where businesses can flourish together.",
  },
  {
    letter: "H",
    title: "Growth",
    description:
      "Accelerate growth through networking, partnerships, and shared opportunities.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-background">
      {/* Add top margin for fixed navbar */}
      <div className="pt-16">
        {/* Hero Section */}
        <section className="bg-card px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Logo & Title */}
              <div className="flex flex-col gap-4 order-2 md:order-1">
                <div className="flex items-center gap-3">
                  <div className="relative w-16 h-16">
                    <Image
                      src="/images/placeholder-logo.jpg"
                      alt="FILCEB Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-primary">
                      FILCEB BUSINESS CLUB
                    </h1>
                    <p className="text-muted-foreground">Cebu, Philippines</p>
                  </div>
                </div>
              </div>

              {/* Vision Image */}
              <div className="relative h-64 md:h-80 rounded-lg overflow-hidden order-1 md:order-2">
                <Image
                  src="/images/placeholder-vision.jpg"
                  alt="Vision"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Vision Image */}
              <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
                <Image
                  src="/images/placeholder-vision-detail.jpg"
                  alt="Vision Detail"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Vision Content */}
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold text-primary">Vision</h2>
                <p className="text-foreground text-balance leading-relaxed">
                  FILCEB embodies an aim as one of the key capable and effective
                  MSEs, Small, Medium Enterprises (MSMEs) organizations that
                  will catalyze CSOs&apos; economic opportunity. Our vision is
                  to create a thriving ecosystem where businesses of all sizes
                  can collaborate, grow, and succeed together.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="px-4 py-12 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Mission Content */}
              <div className="flex flex-col gap-4 order-2 md:order-1">
                <h2 className="text-2xl font-bold text-primary">Mission</h2>
                <p className="text-foreground text-balance leading-relaxed">
                  Our mission is to educate and encourage on the adoption of
                  incorporation in Cebu and beyond. We:
                </p>

                {/* Mission Bullets */}
                <ul className="space-y-3 text-foreground">
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">›</span>
                    <span>
                      <strong>encourage</strong> a new breed of entrepreneurs
                      who understand that the sole purpose of wealth is not
                      material benefit
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">›</span>
                    <span>
                      <strong>provide</strong> every CSE and entrepreneur a
                      venue to develop, enhance and strengthen its potential and
                      capabilities
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">›</span>
                    <span>
                      <strong>provide</strong> appropriate assistance to CSE
                      members with reliable support and foster collaboration
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">›</span>
                    <span>
                      <strong>foster</strong> strategic alliances with national
                      and local government agencies to advance the cause of the
                      MSMEs
                    </span>
                  </li>
                </ul>
              </div>

              {/* Mission Image */}
              <div className="relative h-64 md:h-80 rounded-lg overflow-hidden order-1 md:order-2">
                <Image
                  src="/images/placeholder-mission.jpg"
                  alt="Mission"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* History Section */}
        <section className="px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-primary mb-6">History</h2>

            <p className="text-foreground text-balance leading-relaxed mb-6">
              On March 21, 2008, a group of Cebu-based young entrepreneurs
              bonded together to form an organization. the FILCEB Business Club
              Inc., with the primary concern on the business sector. The Club
              should establish linkages with private, government and NGO
              government organizations for enhanced assistance in support to
              ascertain and broadened its operation.
            </p>

            {/* History Images Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative h-48 md:h-56 rounded-lg overflow-hidden">
                <Image
                  src="/images/placeholder-history-1.jpg"
                  alt="History 1"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-48 md:h-56 rounded-lg overflow-hidden">
                <Image
                  src="/images/placeholder-history-2.jpg"
                  alt="History 2"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Programs and Services Section */}
        <section className="px-4 py-12 bg-primary text-primary-foreground">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Programs and Services
            </h2>
            <p className="text-center text-primary-foreground/90 mb-12 text-balance">
              Our commitment to member success through strategic initiatives
            </p>

            {/* Service Cards Grid - WEALTH */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {services.map((service, index) => (
                <ServiceCard
                  key={index}
                  letter={service.letter}
                  title={service.title}
                  description={service.description}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
