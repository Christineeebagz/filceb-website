"use client";

import React from "react";
import Image from "next/image";
import { ServiceCard } from "@/components/about/ServiceCard";

const services = [
  {
    letter: "W",
    title: "Welfare",
    description: "program for mutual aid and protection.",
  },
  {
    letter: "E",
    title: "Education",
    description: "and training",
  },
  {
    letter: "A",
    title: "Advertisement",
    description: "via multi-media system",
  },
  {
    letter: "L",
    title: "Loan",
    description: "facilitation",
  },
  {
    letter: "T",
    title: "Transformation",
    description:
      "of business by way of “business incubation” and serves as center for entrepreneurial development",
  },
  {
    letter: "H",
    title: "Growth",
    description: "organizational capacity and promote issues through advocacy",
  },
];

export default function AboutPage() {
  // Drop shadow style
  const titleShadow = {
    textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  };

  return (
    <main>
      {/* Add top margin for fixed navbar */}
      <div className="mt-[30px] mb-[50px]">
        {/* Hero Section - Updated with centered content */}
        <section className="bg-card px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col items-center text-center">
              {/* Logo & Title - Centered */}
              <div className="flex flex-col items-center gap-4">
                <div className="relative w-24 h-24 md:w-32 md:h-32">
                  <Image
                    src="/logos/filceblogo.svg"
                    alt="FILCEB Logo"
                    width={128}
                    height={128}
                    className="object-contain"
                    priority
                  />
                </div>
                <div>
                  <h1
                    className="text-4xl md:text-5xl font-black text-[#1E1E1E]"
                    style={titleShadow}
                  >
                    FILCEB BUSINESS CLUB
                  </h1>
                  <p
                    className="font-serif text-[20px] mt-1 text-[#1E1E1E] font-bold"
                    style={{ fontFamily: "Times New Roman, serif" }}
                  >
                    Cebu, Philippines
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[50px] items-center">
              {/* Vision Content */}
              <div className="flex flex-col gap-4 text-right">
                <h2
                  className="text-4xl font-black text-[#1E1E1E]"
                  style={titleShadow}
                >
                  Vision
                </h2>
                <p className="text-foreground text-balance leading-relaxed font-light">
                  Filceb Business Club Inc. (Filceb) envisions as one of the
                  very credible and effective Micro, Small, Medium Enterprise
                  (MSMEs) organizations that will catalyze Cebu&apos;s business
                  growth for a stronge Philippine economy.
                </p>
              </div>
              {/* Vision Image */}
              <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
                <Image
                  src="/images/about-us/vision.jpg"
                  alt="Vision Detail"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="px-4 py-12 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[50px] items-center">
              {/* Mission Images - Now on the left with two images stacked vertically */}
              <div className="flex flex-col gap-4">
                <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
                  <Image
                    src="/images/about-us/mission_1.jpg"
                    alt="Mission 1"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
                  <Image
                    src="/images/about-us/mission_2.jpg"
                    alt="Mission 2"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Mission Content - Now on the right */}
              <div className="flex flex-col gap-4">
                <h2
                  className="text-4xl font-black text-[#1E1E1E]"
                  style={titleShadow}
                >
                  Mission
                </h2>
                <p className="text-foreground text-balance leading-relaxed font-light">
                  Our missions are multifaceted and converge on the singular
                  goal of fostering a thriving entrepreneurial ecosystem in Cebu
                  and beyond:
                </p>

                {/* Mission Bullets */}
                <ul className="space-y-3 text-foreground font-light">
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">›</span>
                    <span className="font-light">
                      To <strong className="font-bold">help</strong> one another
                      in promoting business opportunities among Micro, Small,
                      Medium Entrepreneurs (MSMEs).
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">›</span>
                    <span className="font-light">
                      To <strong className="font-bold">encourage</strong> a new
                      breed of entrepreneurs who understand that the sole
                      purpose of wealth is not only for wealth&apos;s sake but
                      to help other people.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">›</span>
                    <span className="font-light">
                      To <strong className="font-bold">provide</strong> every
                      Cebuano entrepreneur a venue to develop, enhance and
                      strengthen its potential and capabilities in helping the
                      Philippine economy.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">›</span>
                    <span className="font-light">
                      To <strong className="font-bold">provide</strong>{" "}
                      appropriate assistance to Filceb members with reliable
                      support and make exposure to local and international
                      market.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">›</span>
                    <span className="font-light">
                      To <strong className="font-bold">foster</strong> strategic
                      alliances with national and local government
                      units/agencies to advance the cause of the MSMEs.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* History Section */}
        <section className="px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <h2
              className="text-4xl font-black text-[#1E1E1E] mb-6 text-center"
              style={titleShadow}
            >
              History
            </h2>

            <p className="text-foreground text-balance leading-relaxed mb-6 font-light text-center">
              On March 6, 2008, a group of Cebu based young entrepreneurs bonded
              together to form an organization, the FILCEB Business Club Inc.,
              with the aim of establishing a strong MSME (Micro, Small, and
              Medium Enterprise) in the business sector. The Club would tap or
              establish linkages with private, government and non government
              organization for whatever assistance it may avail in order to
              strengthen and broaden its operation.
            </p>

            {/* History Images Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
                <Image
                  src="/images/about-us/history_1.jpg"
                  alt="History 1"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
                <Image
                  src="/images/about-us/history_2.png"
                  alt="History 2"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Programs and Services Section */}
        <section className="px-4 py-12 eZ">
          <div className="max-w-6xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-black text-center mb-2 text-[#1E1E1E]"
              style={titleShadow}
            >
              Programs and Services
            </h2>
            <p className="text-center text-[#666666] mb-12 text-balance font-light">
              Our programs here in FilCeb can be summarized by the acronym{" "}
              <span className="font-bold">WEALTH</span>:
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
