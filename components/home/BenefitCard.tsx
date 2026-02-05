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
    <div className="flex flex-col items-center gap-4 p-6 rounded-lg border-2 transition-all hover:shadow-lg bg-[#1E1E1E] border-[#F8EF30]">
      {/* Card Header with Icon */}
      <div className="flex flex-col items-center gap-2 w-full">
        {icon && <div className="text-3xl text-[#F8EF30]">{icon}</div>}
        <h3 className="text-lg font-semibold text-center text-balance text-white">
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
      <p className="text-sm text-center text-balance text-[#D0D0D0]">
        {description}
      </p>
    </div>
  );
};
