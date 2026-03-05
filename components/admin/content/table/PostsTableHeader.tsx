// components/admin/content/table/PostsTableHeader.tsx
"use client";

import { SortField, SortDirection } from "./types";

interface PostsTableHeaderProps {
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}

export function PostsTableHeader({
  sortField,
  sortDirection,
  onSort,
}: PostsTableHeaderProps) {
  const SortableHeader = ({
    field,
    children,
    className = "",
  }: {
    field: SortField;
    children: React.ReactNode;
    className?: string;
  }) => (
    <button
      onClick={() => onSort(field)}
      className={`flex items-center font-bold text-left text-gray-900 hover:text-gray-600 transition-colors ${className}`}
    >
      {children}
    </button>
  );

  return (
    <thead className="sticky top-0 z-10">
      <tr className="bg-white border-b border-gray-300">
        <th className="text-left p-4 min-w-50 text-gray-900 font-bold">
          <SortableHeader field="title">Title</SortableHeader>
        </th>
        <th className="text-left p-4 min-w-25 text-gray-900 font-bold">
          <SortableHeader field="type">Type</SortableHeader>
        </th>
        <th className="text-left p-4 min-w-30 text-gray-900 font-bold">
          <SortableHeader field="createdAt">Created</SortableHeader>
        </th>
        <th className="text-left p-4 min-w-30 text-gray-900 font-bold">
          Created By
        </th>
        <th className="text-left p-4 min-w-30 text-gray-900 font-bold">
          <SortableHeader field="updatedAt">Last Edited</SortableHeader>
        </th>
        <th className="text-left p-4 min-w-25 text-gray-900 font-bold">
          <SortableHeader field="status">Status</SortableHeader>
        </th>
        <th className="text-left p-4 w-25 text-gray-900 font-bold">Actions</th>
      </tr>
    </thead>
  );
}
