// components/admin/users/UsersTableFilters.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UsersTableFiltersProps {
  itemsPerPage: number;
  mainSearch: string;
  showAdvancedFilters: boolean;
  filters: {
    email: string;
    firstName: string;
    lastName: string;
    businessName: string;
  };
  hasActiveFilters: boolean;
  onItemsPerPageChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  onToggleAdvancedFilters: () => void;
  onFilterChange: (key: string, value: string) => void;
  onClearFilters: () => void;
}

export function UsersTableFilters({
  itemsPerPage,
  mainSearch,
  showAdvancedFilters,
  filters,
  hasActiveFilters,
  onItemsPerPageChange,
  onSearchChange,
  onToggleAdvancedFilters,
  onFilterChange,
  onClearFilters,
}: UsersTableFiltersProps) {
  return (
    <>
      {/* Yellow Filter Bar */}
      <div className="bg-[#F8EF26] p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-[#1E1E1E]">Show</span>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={onItemsPerPageChange}
            >
              <SelectTrigger className="w-20 bg-white border-gray-300 text-[#1E1E1E]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="ghost"
            className="text-[#1E1E1E] hover:bg-yellow-200 font-medium"
          >
            Profiles
          </Button>

          {/* Main Search */}
          <div className="flex-1 min-w-[300px] max-w-xl flex gap-2">
            <Input
              placeholder="Search across all fields..."
              value={mainSearch}
              onChange={(e) => onSearchChange(e.target.value)}
              className="flex-1 bg-white border-gray-400 text-[#1E1E1E] placeholder:text-gray-500"
            />
          </div>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-[#1E1E1E] hover:bg-yellow-200"
            >
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Advanced Filters - Collapsible */}
      {showAdvancedFilters && (
        <div className="bg-gray-50 p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-[#1E1E1E]">
              Advanced Filters
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleAdvancedFilters}
              className="h-6 w-6 p-0"
            >
              ×
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            <Input
              placeholder="Filter by email..."
              value={filters.email}
              onChange={(e) => onFilterChange("email", e.target.value)}
              className="border-gray-300 focus:border-[#F8EF26] focus:ring-[#F8EF26]/20"
            />
            <Input
              placeholder="Filter by first name..."
              value={filters.firstName}
              onChange={(e) => onFilterChange("firstName", e.target.value)}
              className="border-gray-300 focus:border-[#F8EF26] focus:ring-[#F8EF26]/20"
            />
            <Input
              placeholder="Filter by last name..."
              value={filters.lastName}
              onChange={(e) => onFilterChange("lastName", e.target.value)}
              className="border-gray-300 focus:border-[#F8EF26] focus:ring-[#F8EF26]/20"
            />
            <Input
              placeholder="Filter by business name..."
              value={filters.businessName}
              onChange={(e) => onFilterChange("businessName", e.target.value)}
              className="border-gray-300 focus:border-[#F8EF26] focus:ring-[#F8EF26]/20"
            />
          </div>
        </div>
      )}
    </>
  );
}
