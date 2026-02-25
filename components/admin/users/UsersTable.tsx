// components/admin/users/UsersTable.tsx
"use client";

import { User } from "./types";
import { UsersTableHeader } from "./UsersTableHeader";
import { UsersTableRow } from "./UsersTableRow";

interface UsersTableProps {
  users: User[];
  sortField: string;
  sortDirection: "asc" | "desc";
  selectedStatuses: string[];
  selectedBusinessTypes: string[];
  showBusinessTypeFilter: boolean;
  showStatusFilter: boolean;
  businessTypeButtonRef: React.RefObject<HTMLButtonElement | null>;
  statusButtonRef: React.RefObject<HTMLButtonElement | null>;
  updatingStatus: Record<string, boolean>;
  onSort: (field: any) => void;
  onBusinessTypeFilterClick: () => void;
  onStatusFilterClick: () => void;
  onStatusChange: (userId: string, newStatus: string) => void;
  onViewDetails: (user: User) => void;
  onToggleBusinessType: (type: string) => void;
  onToggleStatus: (status: string) => void;
}

export function UsersTable({
  users,
  sortField,
  sortDirection,
  selectedStatuses,
  selectedBusinessTypes,
  showBusinessTypeFilter,
  showStatusFilter,
  businessTypeButtonRef,
  statusButtonRef,
  updatingStatus,
  onSort,
  onBusinessTypeFilterClick,
  onStatusFilterClick,
  onStatusChange,
  onViewDetails,
  onToggleBusinessType,
  onToggleStatus,
}: UsersTableProps) {
  return (
    <div className="border-y border-gray-200">
      <div className="overflow-visible">
        <table className="w-full border-collapse">
          <UsersTableHeader
            sortField={sortField}
            sortDirection={sortDirection}
            selectedStatuses={selectedStatuses}
            selectedBusinessTypes={selectedBusinessTypes}
            showBusinessTypeFilter={showBusinessTypeFilter}
            showStatusFilter={showStatusFilter}
            businessTypeButtonRef={businessTypeButtonRef}
            statusButtonRef={statusButtonRef}
            onSort={onSort}
            onBusinessTypeFilterClick={onBusinessTypeFilterClick}
            onStatusFilterClick={onStatusFilterClick}
            onToggleBusinessType={onToggleBusinessType}
            onToggleStatus={onToggleStatus}
          />
          <tbody>
            {users.map((user, index) => (
              <UsersTableRow
                key={user.id}
                user={user}
                index={index}
                updatingStatus={updatingStatus}
                onStatusChange={onStatusChange}
                onViewDetails={onViewDetails}
              />
            ))}
          </tbody>
        </table>
      </div>

      {users.length === 0 && (
        <div className="text-center py-8 text-gray-500 bg-white">
          No users found matching the current filters.
        </div>
      )}
    </div>
  );
}
