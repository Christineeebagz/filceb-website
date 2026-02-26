// components/admin/users/InfoSection.tsx
"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface InfoItem {
  label: string;
  value: string | null | undefined;
  render?: (value: string | null | undefined) => ReactNode;
}

interface InfoSectionProps {
  title: string;
  items: InfoItem[];
  className?: string;
}

export function InfoSection({ title, items, className }: InfoSectionProps) {
  // Check if all values in this section are present
  const isComplete = items.every(
    (item) =>
      item.value !== null && item.value !== undefined && item.value !== ""
  );

  // Helper function to check if a single item has a value
  const hasValue = (value: string | null | undefined) => {
    return value !== null && value !== undefined && value !== "";
  };

  return (
    <div
      className={cn(
        "space-y-3 rounded-lg p-4 transition-colors",
        isComplete
          ? "bg-[#F8EF30]/10 border border-[#F8EF30]"
          : "bg-gray-100 border border-gray-300",
        className
      )}
    >
      <h3 className="text-sm font-semibold text-[#1E1E1E] mb-3">{title}</h3>
      <div className="space-y-2">
        {items.map((item, index) => {
          const itemHasValue = hasValue(item.value);

          return (
            <div
              key={index}
              className={cn(
                "flex justify-between items-start text-sm rounded px-3 py-2 transition-colors",
                itemHasValue ? "bg-[#F8EF30]/20" : "bg-gray-300/40"
              )}
            >
              <span
                className={cn(
                  "font-medium",
                  itemHasValue ? "text-[#1E1E1E]" : "text-gray-600"
                )}
              >
                {item.label}:
              </span>
              <div
                className={cn(
                  "text-right max-w-[60%] break-words",
                  itemHasValue
                    ? "text-[#1E1E1E] font-medium"
                    : "text-gray-600 italic"
                )}
              >
                {item.render
                  ? item.render(item.value)
                  : itemHasValue
                    ? item.value
                    : "No Input"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
