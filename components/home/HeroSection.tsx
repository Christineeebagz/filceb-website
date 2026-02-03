import React from "react";
import Image from "next/image";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  images: { main: string; logo: string };
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  images,
}) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-12">
      {/* Hero Image */}
      <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
        <Image
          src={images.main || "/placeholder.svg"}
          alt="Team"
          fill
          className="object-cover"
        />
      </div>

      {/* Hero Content */}
      <div className="flex flex-col gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="relative w-12 h-12">
            <Image
              src={images.logo || "/placeholder.svg"}
              alt="FILCEB Logo"
              fill
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-primary">{title}</h1>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
        </div>

        {/* Mission/Vision Tags */}
        <div className="flex flex-wrap gap-2">
          <div className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-semibold">
            Mission
          </div>
          <div className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-semibold">
            Vision
          </div>
        </div>
      </div>
    </section>
  );
};
