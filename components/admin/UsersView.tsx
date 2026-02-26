// components/admin/UsersView.tsx
"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import {
  User,
  UserWithDocuments,
  SortField,
  SortDirection,
} from "./users/types";
import { UsersTableFilters } from "./users/UsersTableFilters";
import { UsersTable } from "./users/UsersTable";
import { UsersTablePagination } from "./users/UsersTablePagination";
import { StatusFilterDropdown } from "./users/StatusFilterDropdown";
import { BusinessTypeFilterDropdown } from "./users/BusinessTypeFilterDropdown";
import { StatusChangeModal } from "./users/StatusChangeModal";
import { UserDetailsModal } from "./UserDetailsModal";

export default function UsersView() {
  const [selectedUser, setSelectedUser] = useState<UserWithDocuments | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const businessTypeButtonRef = useRef<HTMLButtonElement>(null);
  const statusButtonRef = useRef<HTMLButtonElement>(null);

  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    userId: string;
    currentStatus: string;
    newStatus: string;
    userName: string;
  }>({
    isOpen: false,
    userId: "",
    currentStatus: "",
    newStatus: "",
    userName: "",
  });

  const [mainSearch, setMainSearch] = useState("");
  const [filters, setFilters] = useState({
    email: "",
    firstName: "",
    lastName: "",
    businessName: "",
  });

  const [sortField, setSortField] = useState<SortField>("email");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [updatingStatus, setUpdatingStatus] = useState<Record<string, boolean>>(
    {}
  );
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedBusinessTypes, setSelectedBusinessTypes] = useState<string[]>(
    []
  );
  const [showBusinessTypeFilter, setShowBusinessTypeFilter] = useState(false);
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [businessTypePosition, setBusinessTypePosition] = useState({
    top: 0,
    left: 0,
  });
  const [statusPosition, setStatusPosition] = useState({ top: 0, left: 0 });

  const handleStatusChangeConfirm = (userId: string, newStatus: string) => {
    const user = users.find((u) => u.id === userId);
    if (!user) return;

    setConfirmModal({
      isOpen: true,
      userId,
      currentStatus: user.status,
      newStatus,
      userName:
        `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.email,
    });
  };

  const executeStatusChange = async () => {
    const { userId, newStatus } = confirmModal;

    setUpdatingStatus((prev) => ({ ...prev, [userId]: true }));
    setConfirmModal((prev) => ({ ...prev, isOpen: false }));

    try {
      const response = await fetch("/api/users/status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, status: newStatus }),
      });

      if (!response.ok) throw new Error("Failed to update user status");

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, status: newStatus } : user
        )
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update user status"
      );
    } finally {
      setUpdatingStatus((prev) => ({ ...prev, [userId]: false }));
    }
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredAndSortedUsers = useMemo(() => {
    let filtered = users;

    if (mainSearch.trim() !== "") {
      const searchLower = mainSearch.toLowerCase();
      filtered = users.filter((user) => {
        const searchableFields = [
          user.email,
          user.firstName,
          user.lastName,
          user.businessName,
          user.businesstype,
          user.status,
          user.phone,
          user.barangayAddress,
          user.province,
          user.city,
          user.referenceNum,
        ]
          .map((val) => val?.toString().toLowerCase() || "")
          .join(" ");

        return searchableFields.includes(searchLower);
      });
    }

    if (selectedStatuses.length > 0) {
      filtered = filtered.filter((user) =>
        selectedStatuses.includes(user.status)
      );
    }

    if (selectedBusinessTypes.length > 0) {
      filtered = filtered.filter(
        (user) =>
          user.businesstype && selectedBusinessTypes.includes(user.businesstype)
      );
    }

    if (showAdvancedFilters) {
      filtered = filtered.filter((user) => {
        const getValue = (value: string | null | undefined) =>
          value?.toString().toLowerCase() || "";

        return (
          (filters.email === "" ||
            getValue(user.email).includes(filters.email.toLowerCase())) &&
          (filters.firstName === "" ||
            getValue(user.firstName).includes(
              filters.firstName.toLowerCase()
            )) &&
          (filters.lastName === "" ||
            getValue(user.lastName).includes(filters.lastName.toLowerCase())) &&
          (filters.businessName === "" ||
            getValue(user.businessName).includes(
              filters.businessName.toLowerCase()
            ))
        );
      });
    }

    return filtered.sort((a, b) => {
      const getSortValue = (value: string | null | undefined) =>
        value?.toString().toLowerCase() || "";

      const aValue = getSortValue(a[sortField]);
      const bValue = getSortValue(b[sortField]);

      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
  }, [
    users,
    mainSearch,
    filters,
    sortField,
    sortDirection,
    showAdvancedFilters,
    selectedStatuses,
    selectedBusinessTypes,
  ]);

  const totalPages = Math.ceil(filteredAndSortedUsers.length / itemsPerPage);
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredAndSortedUsers.slice(start, end);
  }, [filteredAndSortedUsers, currentPage, itemsPerPage]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Update positions when filters are opened
  useEffect(() => {
    if (showBusinessTypeFilter && businessTypeButtonRef.current) {
      const rect = businessTypeButtonRef.current.getBoundingClientRect();
      setBusinessTypePosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  }, [showBusinessTypeFilter]);

  useEffect(() => {
    if (showStatusFilter && statusButtonRef.current) {
      const rect = statusButtonRef.current.getBoundingClientRect();
      setStatusPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  }, [showStatusFilter]);

  // Handle window scroll to update positions
  useEffect(() => {
    const handleScroll = () => {
      if (showBusinessTypeFilter && businessTypeButtonRef.current) {
        const rect = businessTypeButtonRef.current.getBoundingClientRect();
        setBusinessTypePosition({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
        });
      }
      if (showStatusFilter && statusButtonRef.current) {
        const rect = statusButtonRef.current.getBoundingClientRect();
        setStatusPosition({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showBusinessTypeFilter, showStatusFilter]);

  const clearFilters = () => {
    setMainSearch("");
    setFilters({ email: "", firstName: "", lastName: "", businessName: "" });
    setSelectedStatuses([]);
    setSelectedBusinessTypes([]);
    setCurrentPage(1);
  };

  const toggleStatus = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
    setCurrentPage(1);
  };

  const toggleBusinessType = (type: string) => {
    setSelectedBusinessTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
    setCurrentPage(1);
  };

  const handleBusinessTypeFilterClick = () => {
    setShowBusinessTypeFilter(!showBusinessTypeFilter);
    setShowStatusFilter(false);
  };

  const handleStatusFilterClick = () => {
    setShowStatusFilter(!showStatusFilter);
    setShowBusinessTypeFilter(false);
  };

  const hasActiveFilters =
    mainSearch !== "" ||
    Object.values(filters).some((v) => v !== "") ||
    selectedStatuses.length > 0 ||
    selectedBusinessTypes.length > 0;

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        Loading users...
      </div>
    );
  if (error)
    return <div className="text-red-500 text-center py-8">Error: {error}</div>;

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-gray-200 bg-white">
      <UsersTableFilters
        itemsPerPage={itemsPerPage}
        mainSearch={mainSearch}
        showAdvancedFilters={showAdvancedFilters}
        filters={filters}
        hasActiveFilters={hasActiveFilters}
        onItemsPerPageChange={(value) => {
          setItemsPerPage(parseInt(value));
          setCurrentPage(1);
        }}
        onSearchChange={(value) => {
          setMainSearch(value);
          setCurrentPage(1);
        }}
        onToggleAdvancedFilters={() =>
          setShowAdvancedFilters(!showAdvancedFilters)
        }
        onFilterChange={(key, value) => {
          setFilters((prev) => ({ ...prev, [key]: value }));
          setCurrentPage(1);
        }}
        onClearFilters={clearFilters}
      />

      <UsersTable
        users={paginatedUsers}
        sortField={sortField}
        sortDirection={sortDirection}
        selectedStatuses={selectedStatuses}
        selectedBusinessTypes={selectedBusinessTypes}
        showBusinessTypeFilter={showBusinessTypeFilter}
        showStatusFilter={showStatusFilter}
        businessTypeButtonRef={businessTypeButtonRef}
        statusButtonRef={statusButtonRef}
        updatingStatus={updatingStatus}
        onSort={handleSort}
        onBusinessTypeFilterClick={handleBusinessTypeFilterClick}
        onStatusFilterClick={handleStatusFilterClick}
        onStatusChange={handleStatusChangeConfirm}
        onViewDetails={(user) => {
          // Cast the user to UserWithDocuments since the API response includes document fields
          setSelectedUser(user as UserWithDocuments);
          setIsModalOpen(true);
        }}
        onToggleBusinessType={toggleBusinessType}
        onToggleStatus={toggleStatus}
      />

      <BusinessTypeFilterDropdown
        isOpen={showBusinessTypeFilter}
        position={businessTypePosition}
        selectedTypes={selectedBusinessTypes}
        onToggle={toggleBusinessType}
        onClear={() => {
          setSelectedBusinessTypes([]);
          setShowBusinessTypeFilter(false);
        }}
        onClose={() => setShowBusinessTypeFilter(false)}
      />

      <StatusFilterDropdown
        isOpen={showStatusFilter}
        position={statusPosition}
        selectedStatuses={selectedStatuses}
        onToggle={toggleStatus}
        onClear={() => {
          setSelectedStatuses([]);
          setShowStatusFilter(false);
        }}
        onClose={() => setShowStatusFilter(false)}
      />

      <UsersTablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <div className="bg-white p-4 text-sm text-gray-500 border-t border-gray-200">
        Showing {paginatedUsers.length} of {filteredAndSortedUsers.length} users
        (Total: {users.length})
      </div>

      <StatusChangeModal
        isOpen={confirmModal.isOpen}
        userName={confirmModal.userName}
        currentStatus={confirmModal.currentStatus}
        newStatus={confirmModal.newStatus}
        onConfirm={executeStatusChange}
        onCancel={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
      />

      {selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
