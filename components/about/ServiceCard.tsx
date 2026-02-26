import React from "react";

interface ServiceCardProps {
  letter: string;
  title: string;
  description: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  letter,
  title,
  description,
}) => {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      {/* Letter Circle - Increased size further */}
      <div className="w-24 h-24 bg-[#1E1E1E] text-[#F8EF30] rounded-full flex items-center justify-center text-3xl md:text-4xl font-black">
        {letter}
      </div>

      {/* Title - First letter yellow, rest dark */}
      <h3 className="font-black text-lg text-[#1E1E1E]">
        <span className="text-[#F8EF30]">{letter}</span>
        {title.slice(1)}
      </h3>

      {/* Description - Aileron light */}
      <p className="text-sm text-[#666666] text-balance line-clamp-3 font-light">
        {description}
      </p>
    </div>
  );
};
