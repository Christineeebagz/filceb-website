// components/admin/UsersView.tsx
"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import {
  User,
  UserWithDocuments,
  SortField,
  SortDirection,
} from "./users/components/types";
import { UsersTableFilters } from "./users/table/UsersTableFilters";
import { UsersTable } from "./users/table/UsersTable";
import { UsersTablePagination } from "./users/table/UsersTablePagination";
import { BusinessTypeFilterDropdown } from "./users/table/BusinessTypeFilterDropdown";
import { StatusFilterDropdown } from "./users/table/StatusFilterDropdown";
import { StatusChangeModal } from "./users/table/StatusChangeModal";
import { UserDetailsModal } from "./UserDetailsModal";

export default function UsersView() {
  const [selectedUser, setSelectedUser] = useState<UserWithDocuments | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const businessTypeButtonRef = useRef<HTMLButtonElement>(null);
  const statusButtonRef = useRef<HTMLButtonElement>(null);

  const [confirmModal, setConfirmModal] = useState({
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
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showBusinessTypeFilter, setShowBusinessTypeFilter] = useState(false);
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [businessTypePosition, setBusinessTypePosition] = useState({
    top: 0,
    left: 0,
  });
  const [statusPosition, setStatusPosition] = useState({ top: 0, left: 0 });

  // ==============================
  // FETCH USERS
  // ==============================
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // ==============================
  // FILTER + SORT
  // ==============================
  const filteredAndSortedUsers = useMemo(() => {
    let filtered = users;

    if (mainSearch.trim() !== "") {
      const searchLower = mainSearch.toLowerCase();
      filtered = filtered.filter((user) =>
        Object.values(user).join(" ").toLowerCase().includes(searchLower)
      );
    }

    // Apply advanced filters if any
    if (filters.email) {
      filtered = filtered.filter((user) =>
        user.email?.toLowerCase().includes(filters.email.toLowerCase())
      );
    }
    if (filters.firstName) {
      filtered = filtered.filter((user) =>
        user.firstName?.toLowerCase().includes(filters.firstName.toLowerCase())
      );
    }
    if (filters.lastName) {
      filtered = filtered.filter((user) =>
        user.lastName?.toLowerCase().includes(filters.lastName.toLowerCase())
      );
    }
    if (filters.businessName) {
      filtered = filtered.filter((user) =>
        user.businessName
          ?.toLowerCase()
          .includes(filters.businessName.toLowerCase())
      );
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

    return filtered.sort((a, b) => {
      const aValue = (a[sortField] ?? "").toString().toLowerCase();
      const bValue = (b[sortField] ?? "").toString().toLowerCase();

      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
  }, [
    users,
    mainSearch,
    filters,
    selectedStatuses,
    selectedBusinessTypes,
    sortField,
    sortDirection,
  ]);

  const totalPages = Math.ceil(filteredAndSortedUsers.length / itemsPerPage);

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedUsers.slice(start, start + itemsPerPage);
  }, [filteredAndSortedUsers, currentPage, itemsPerPage]);

  // ==============================
  // UPDATE POSITIONS
  // ==============================
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

  // ==============================
  // FILTER TOGGLES
  // ==============================
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

  // ==============================
  // STATUS CHANGE CONFIRM (table rows)
  // ==============================
  const handleStatusChangeConfirm = (userId: string, newStatus: string) => {
    const user = users.find((u) => u.id === userId);
    if (!user) return;

    setConfirmModal({
      isOpen: true,
      userId,
      currentStatus: user.status,
      newStatus,
      userName: user.email,
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

      if (!response.ok) throw new Error("Failed to update status");

      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, status: newStatus } : u))
      );
    } finally {
      setUpdatingStatus((prev) => ({ ...prev, [userId]: false }));
    }
  };

  // ==============================
  // STATUS CHANGE FROM MODAL
  // ==============================
  const handleModalStatusChange = async (
    userId: string,
    newStatus: string
  ): Promise<void> => {
    const response = await fetch("/api/users/status", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, status: newStatus }),
    });

    if (!response.ok) throw new Error("Failed to update status");

    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status: newStatus } : u))
    );

    setSelectedUser((prev) =>
      prev && prev.id === userId ? { ...prev, status: newStatus } : prev
    );
  };

  const clearFilters = () => {
    setSelectedStatuses([]);
    setSelectedBusinessTypes([]);
    setMainSearch("");
    setFilters({
      email: "",
      firstName: "",
      lastName: "",
      businessName: "",
    });
    setCurrentPage(1);
  };

  const handleOpenStatusFilter = () => {
    setShowStatusFilter(true);
  };

  if (loading) return <div className="p-6">Loading users...</div>;

  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white overflow-visible">
      {error && (
        <div className="bg-red-50 text-red-600 px-6 py-4 text-sm">{error}</div>
      )}

      <UsersTableFilters
        itemsPerPage={itemsPerPage}
        mainSearch={mainSearch}
        showAdvancedFilters={showAdvancedFilters}
        filters={filters}
        hasActiveFilters={
          selectedStatuses.length > 0 ||
          selectedBusinessTypes.length > 0 ||
          Object.values(filters).some((v) => v !== "") ||
          mainSearch !== ""
        }
        selectedStatuses={selectedStatuses}
        onOpenStatusFilter={handleOpenStatusFilter}
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

      <div className="overflow-x-auto">
        <div className="min-w-[1200px]">
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
            onSort={(field) => {
              if (sortField === field) {
                setSortDirection(sortDirection === "asc" ? "desc" : "asc");
              } else {
                setSortField(field);
                setSortDirection("asc");
              }
            }}
            onBusinessTypeFilterClick={handleBusinessTypeFilterClick}
            onStatusFilterClick={handleStatusFilterClick}
            onStatusChange={handleStatusChangeConfirm}
            onViewDetails={(user) => {
              setSelectedUser(user as UserWithDocuments);
              setIsModalOpen(true);
            }}
            onToggleBusinessType={toggleBusinessType}
            onToggleStatus={toggleStatus}
          />
        </div>
      </div>

      <div className="px-4 py-3 border-t border-gray-200">
        <UsersTablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      <BusinessTypeFilterDropdown
        isOpen={showBusinessTypeFilter}
        position={businessTypePosition}
        selectedTypes={selectedBusinessTypes}
        onToggle={toggleBusinessType}
        onClear={() => {
          setSelectedBusinessTypes([]);
          setShowBusinessTypeFilter(false);
          setCurrentPage(1);
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
          setCurrentPage(1);
        }}
        onClose={() => setShowStatusFilter(false)}
      />

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
          onStatusChange={handleModalStatusChange}
        />
      )}
    </div>
  );
}
