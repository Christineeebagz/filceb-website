// components/admin/users/UsersTableHeader.tsx
"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";
import { SortField, SortDirection } from "./types";
import { BUSINESS_TYPES } from "@/constants";

interface UsersTableHeaderProps {
  sortField: SortField;
  sortDirection: SortDirection;
  selectedStatuses: string[];
  selectedBusinessTypes: string[];
  showBusinessTypeFilter: boolean;
  showStatusFilter: boolean;
  businessTypeButtonRef: React.RefObject<HTMLButtonElement | null>;
  statusButtonRef: React.RefObject<HTMLButtonElement | null>;
  onSort: (field: SortField) => void;
  onBusinessTypeFilterClick: () => void;
  onStatusFilterClick: () => void;
  onToggleBusinessType: (type: string) => void;
  onToggleStatus: (status: string) => void;
}

export function UsersTableHeader({
  sortField,
  sortDirection,
  selectedStatuses,
  selectedBusinessTypes,
  businessTypeButtonRef,
  statusButtonRef,
  onSort,
  onBusinessTypeFilterClick,
  onStatusFilterClick,
}: UsersTableHeaderProps) {
  const SortableHeader = ({
    field,
    children,
  }: {
    field: SortField;
    children: React.ReactNode;
  }) => (
    <button
      onClick={() => onSort(field)}
      className="flex items-center gap-1 font-medium text-left text-[#1E1E1E] hover:opacity-80 transition-colors"
    >
      {children}
      {sortField === field &&
        (sortDirection === "asc" ? (
          <ChevronUp className="h-4 w-4 text-[#1E1E1E]" />
        ) : (
          <ChevronDown className="h-4 w-4 text-[#1E1E1E]" />
        ))}
    </button>
  );

  return (
    <thead className="sticky top-0 z-10">
      <tr className="bg-white border-b border-gray-200">
        <th className="text-left p-4 min-w-[150px] text-[#1E1E1E] font-bold">
          <SortableHeader field="email">Email</SortableHeader>
        </th>
        <th className="text-left p-4 min-w-[120px] text-[#1E1E1E] font-bold">
          <SortableHeader field="firstName">First Name</SortableHeader>
        </th>
        <th className="text-left p-4 min-w-[120px] text-[#1E1E1E] font-bold">
          <SortableHeader field="lastName">Last Name</SortableHeader>
        </th>
        <th className="text-left p-4 min-w-[180px] text-[#1E1E1E] font-bold">
          <SortableHeader field="businessName">Business Name</SortableHeader>
        </th>
        <th className="text-left p-4 min-w-[140px] text-[#1E1E1E] font-bold">
          <div className="flex items-center gap-1">
            <span>Business Type</span>
            <div className="relative inline-block">
              <Button
                ref={businessTypeButtonRef}
                variant="ghost"
                size="sm"
                onClick={onBusinessTypeFilterClick}
                className="h-6 w-6 p-0 hover:bg-gray-200 rounded-full"
              >
                <Filter className="h-3 w-3 text-[#1E1E1E]" />
              </Button>
              {selectedBusinessTypes.length > 0 && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#F8EF26] rounded-full" />
              )}
            </div>
          </div>
        </th>
        <th className="text-left p-4 min-w-[140px] text-[#1E1E1E] font-bold">
          <div className="flex items-center gap-1">
            <span>Status</span>
            <div className="relative inline-block">
              <Button
                ref={statusButtonRef}
                variant="ghost"
                size="sm"
                onClick={onStatusFilterClick}
                className="h-6 w-6 p-0 hover:bg-gray-200 rounded-full"
              >
                <Filter className="h-3 w-3 text-[#1E1E1E]" />
              </Button>
              {selectedStatuses.length > 0 && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#F8EF26] rounded-full" />
              )}
            </div>
          </div>
        </th>
        <th className="text-left p-4 w-[40px] text-[#1E1E1E] font-bold">
          Actions
        </th>
      </tr>
    </thead>
  );
}
