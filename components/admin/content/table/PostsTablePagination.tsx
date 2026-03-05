// components/admin/content/table/PostsTablePagination.tsx
"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PostsTablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PostsTablePagination({
  currentPage,
  totalPages,
  onPageChange,
}: PostsTablePaginationProps) {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else if (currentPage <= 3) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i);
      }
    } else if (currentPage >= totalPages - 2) {
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        pages.push(i);
      }
    }
    return pages;
  };

  return (
    <div className="bg-[#2C2C2C] p-4 rounded-b-lg border-x border-b border-gray-700 flex items-center justify-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="text-gray-400 hover:text-white hover:bg-gray-700 disabled:opacity-50"
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>

      {getPageNumbers().map((pageNum) => (
        <Button
          key={pageNum}
          variant="ghost"
          size="sm"
          className={`h-8 w-8 p-0 ${
            currentPage === pageNum
              ? "bg-[#F8EF30] text-[#1E1E1E] hover:bg-[#F8EF30]/90"
              : "text-gray-400 hover:text-white hover:bg-gray-700"
          }`}
          onClick={() => onPageChange(pageNum)}
        >
          {pageNum}
        </Button>
      ))}

      <Button
        variant="ghost"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="text-gray-400 hover:text-white hover:bg-gray-700 disabled:opacity-50"
      >
        Next
        <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  );
}
