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
      {/* Letter Circle */}
      <div className="w-16 h-16 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-2xl font-bold">
        {letter}
      </div>

      {/* Title */}
      <h3 className="font-semibold text-lg text-foreground">{title}</h3>

      {/* Description */}
      <p className="text-sm text-muted-foreground text-balance line-clamp-3">
        {description}
      </p>
    </div>
  );
};
