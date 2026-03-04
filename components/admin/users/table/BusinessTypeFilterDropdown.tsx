// components/admin/users/BusinessTypeFilterDropdown.tsx
"use client";

import { Button } from "@/components/ui/button";
import { BUSINESS_TYPES } from "@/constants";
import { useEffect, useRef } from "react";

interface BusinessTypeFilterDropdownProps {
  isOpen: boolean;
  position: { top: number; left: number };
  selectedTypes: string[];
  onToggle: (type: string) => void;
  onClear: () => void;
  onClose: () => void;
}

export function BusinessTypeFilterDropdown({
  isOpen,
  position,
  selectedTypes,
  onToggle,
  onClear,
  onClose,
}: BusinessTypeFilterDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="fixed z-50"
      style={{
        top: position.top,
        left: position.left,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-2 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[180px]">
        <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-200">
          <span className="text-xs font-medium text-[#1E1E1E]">
            Filter by type
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onClear();
            }}
            className="h-5 w-5 p-0 hover:bg-gray-200 rounded-full"
          >
            ×
          </Button>
        </div>
        <div className="space-y-1 max-h-48 overflow-y-auto">
          {BUSINESS_TYPES.map((type) => (
            <label
              key={type}
              className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="checkbox"
                checked={selectedTypes.includes(type)}
                onChange={() => onToggle(type)}
                onClick={(e) => e.stopPropagation()}
                className="rounded border-gray-300 text-[#F8EF26] focus:ring-[#F8EF26] cursor-pointer"
              />
              <span
                className="text-sm text-[#1E1E1E] cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle(type);
                }}
              >
                {type}
              </span>
            </label>
          ))}
        </div>
        <div className="mt-2 pt-2 border-t border-gray-200">
          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="w-full bg-[#F8EF26] text-[#1E1E1E] hover:bg-[#F8EF26]/90 text-xs h-7"
          >
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
}
