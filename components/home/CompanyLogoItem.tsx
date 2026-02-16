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
    <div className="flex-shrink-0 flex items-center justify-center bg-primary rounded-lg   transition-colors">
      <Image
        src={logo || "/placeholder.svg"}
        alt={companyName}
        width={120}
        height={120}
        className="object-contain max-h-32 max-w-32"
      />
    </div>
  );
};
