import React from "react";
import Image from "next/image";

interface BenefitCardProps {
  title: string;
  description: string;
  image: string;
  icon?: React.ReactNode;
}

export const BenefitCard: React.FC<BenefitCardProps> = ({
  title,
  description,
  image,
  icon,
}) => {
  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-primary text-primary-foreground rounded-lg border border-accent/20 hover:border-accent transition-colors">
      {/* Card Header with Icon */}
      <div className="flex flex-col items-center gap-2 w-full">
        {icon && <div className="text-accent text-3xl">{icon}</div>}
        <h3 className="text-lg font-semibold text-center text-balance">
          {title}
        </h3>
      </div>

      {/* Image */}
      <div className="relative w-full h-40 rounded overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {/* Description */}
      <p className="text-sm text-center text-balance text-primary-foreground/90">
        {description}
      </p>
    </div>
  );
};
