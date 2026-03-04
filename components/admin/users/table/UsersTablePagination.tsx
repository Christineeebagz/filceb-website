// components/admin/users/UsersTablePagination.tsx
"use client";

import { Button } from "@/components/ui/button";

interface UsersTablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function UsersTablePagination({
  currentPage,
  totalPages,
  onPageChange,
}: UsersTablePaginationProps) {
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
    <div className="bg-[#F8EF26] p-4 flex items-center justify-center gap-2">
      <Button
        variant="ghost"
        className="text-[#1E1E1E] hover:bg-yellow-200"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>

      {getPageNumbers().map((pageNum) => (
        <Button
          key={pageNum}
          variant="ghost"
          className={`h-8 w-8 p-0 ${
            currentPage === pageNum
              ? "bg-[#1E1E1E] text-white hover:bg-[#2E2E2E]"
              : "text-[#1E1E1E] hover:bg-yellow-200"
          }`}
          onClick={() => onPageChange(pageNum)}
        >
          {pageNum}
        </Button>
      ))}

      <Button
        variant="ghost"
        className="text-[#1E1E1E] hover:bg-yellow-200"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
}
