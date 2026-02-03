import React from "react";
import Image from "next/image";

interface CompanyLogoItemProps {
  logo: string;
  companyName: string;
}

export const CompanyLogoItem: React.FC<CompanyLogoItemProps> = ({
  logo,
  companyName,
}) => {
  return (
    <div className="flex-shrink-0 flex items-center justify-center bg-primary rounded-lg p-4 min-w-24 h-24 border border-accent/20 hover:border-accent transition-colors">
      <Image
        src={logo || "/placeholder.svg"}
        alt={companyName}
        width={80}
        height={80}
        className="object-contain max-h-16 max-w-16"
      />
    </div>
  );
};
