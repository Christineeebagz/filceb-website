import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  title: string;
  description: string;
  ctaText?: string;
  ctaLink?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
  title,
  description,
  ctaText = "Join Us",
  ctaLink = "/sign-up",
}) => {
  return (
    <section className="bg-secondary text-secondary-foreground py-16 px-4 rounded-lg text-center">
      <div className="max-w-3xl mx-auto flex flex-col gap-6">
        <h2 className="text-3xl md:text-4xl font-bold text-balance">{title}</h2>
        <p className="text-lg text-secondary-foreground/90 text-balance">
          {description}
        </p>

        <Link href={ctaLink}>
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {ctaText}
          </Button>
        </Link>
      </div>
    </section>
  );
};
