// components/home/MemberCompaniesClient.tsx
"use client";

import React, { useEffect, useState } from "react";
import { MemberCompaniesSection } from "./MemberCompaniesSection";

export const MemberCompaniesClient = () => {
  const [logos, setLogos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMemberImages = async () => {
      try {
        const response = await fetch("/api/members/images");
        const data = await response.json();
        setLogos(data.images);
      } catch (error) {
        console.error("Error fetching member images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMemberImages();
  }, []);

  if (loading) {
    return (
      <section className="py-16 px-4 rounded-lg bg-[#1E1E1E]">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-white">Loading member companies...</p>
        </div>
      </section>
    );
  }

  return <MemberCompaniesSection logos={logos} />;
};
