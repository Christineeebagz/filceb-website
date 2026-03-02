"use client";

import { ReactNode } from "react";

interface FormSectionProps {
  title: string;
  children: ReactNode;
}

export function FormSection({ title, children }: FormSectionProps) {
  return (
    <div className="space-y-4 p-4 rounded-lg">
      <div className="border-b pb-2 border-[#F8EF30]/30">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
