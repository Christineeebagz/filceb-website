// components/admin/users/StatusFilterDropdown.tsx
"use client";

import { Button } from "@/components/ui/button";
import { STATUS_COLORS, STATUS_OPTIONS } from "./types";
import { useEffect, useRef } from "react";

interface StatusFilterDropdownProps {
  isOpen: boolean;
  position: { top: number; left: number };
  selectedStatuses: string[];
  onToggle: (status: string) => void;
  onClear: () => void;
  onClose: () => void;
}

export function StatusFilterDropdown({
  isOpen,
  position,
  selectedStatuses,
  onToggle,
  onClear,
  onClose,
}: StatusFilterDropdownProps) {
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
            Filter by status
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
          {STATUS_OPTIONS.map((status) => (
            <label
              key={status}
              className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="checkbox"
                checked={selectedStatuses.includes(status)}
                onChange={() => onToggle(status)}
                onClick={(e) => e.stopPropagation()}
                className="rounded border-gray-300 text-[#F8EF26] focus:ring-[#F8EF26] cursor-pointer"
              />
              <span
                className="text-sm cursor-pointer"
                style={{ color: STATUS_COLORS[status]?.text || "#1E1E1E" }}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle(status);
                }}
              >
                {status}
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
