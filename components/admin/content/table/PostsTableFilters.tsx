// components/admin/content/table/PostsTableFilters.tsx
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

interface PostsTableFiltersProps {
  itemsPerPage: number;
  search: string;
  typeFilter: string;
  statusFilter: string;
  hasActiveFilters: boolean;
  onItemsPerPageChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  onTypeFilterChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
  onClearFilters: () => void;
}

export function PostsTableFilters({
  itemsPerPage,
  search,
  typeFilter,
  statusFilter,
  hasActiveFilters,
  onItemsPerPageChange,
  onSearchChange,
  onTypeFilterChange,
  onStatusFilterChange,
  onClearFilters,
}: PostsTableFiltersProps) {
  return (
    <div className="bg-[#2C2C2C] p-4 rounded-t-lg border border-gray-700">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-300">Show</span>
          <Select
            value={itemsPerPage.toString()}
            onValueChange={onItemsPerPageChange}
          >
            <SelectTrigger className="w-20 bg-[#1E1E1E] border-gray-700 text-gray-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#1E1E1E] border-gray-700">
              <SelectItem value="5" className="text-gray-300 hover:bg-gray-700">
                5
              </SelectItem>
              <SelectItem
                value="10"
                className="text-gray-300 hover:bg-gray-700"
              >
                10
              </SelectItem>
              <SelectItem
                value="25"
                className="text-gray-300 hover:bg-gray-700"
              >
                25
              </SelectItem>
              <SelectItem
                value="50"
                className="text-gray-300 hover:bg-gray-700"
              >
                50
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 min-w-[300px] max-w-xl flex gap-2">
          <Input
            placeholder="Search posts..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="flex-1 bg-[#1E1E1E] border-gray-700 text-gray-300 placeholder:text-gray-500"
          />
        </div>

        <Select value={typeFilter} onValueChange={onTypeFilterChange}>
          <SelectTrigger className="w-[130px] bg-[#1E1E1E] border-gray-700 text-gray-300">
            <SelectValue placeholder="Post Type" />
          </SelectTrigger>
          <SelectContent className="bg-[#1E1E1E] border-gray-700">
            <SelectItem value="ALL" className="text-gray-300 hover:bg-gray-700">
              All Types
            </SelectItem>
            <SelectItem
              value="TEXT"
              className="text-gray-300 hover:bg-gray-700"
            >
              Text
            </SelectItem>
            <SelectItem
              value="IMAGE"
              className="text-gray-300 hover:bg-gray-700"
            >
              Image
            </SelectItem>
            <SelectItem
              value="LINK"
              className="text-gray-300 hover:bg-gray-700"
            >
              Link
            </SelectItem>
            <SelectItem
              value="EMBED"
              className="text-gray-300 hover:bg-gray-700"
            >
              Embed
            </SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={onStatusFilterChange}>
          <SelectTrigger className="w-[130px] bg-[#1E1E1E] border-gray-700 text-gray-300">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-[#1E1E1E] border-gray-700">
            <SelectItem value="ALL" className="text-gray-300 hover:bg-gray-700">
              All Status
            </SelectItem>
            <SelectItem
              value="DRAFT"
              className="text-gray-300 hover:bg-gray-700"
            >
              Draft
            </SelectItem>
            <SelectItem
              value="PUBLISHED"
              className="text-gray-300 hover:bg-gray-700"
            >
              Published
            </SelectItem>
            <SelectItem
              value="ARCHIVED"
              className="text-gray-300 hover:bg-gray-700"
            >
              Archived
            </SelectItem>
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-gray-300 hover:text-white hover:bg-gray-700"
          >
            Clear
          </Button>
        )}
      </div>
    </div>
  );
}
