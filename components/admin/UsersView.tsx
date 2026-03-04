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
import { StatusFilterModal } from "./users/StatusFilterModal";
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

  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  const businessTypeButtonRef = useRef<HTMLButtonElement>(null);

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
  const [showBusinessTypeFilter, setShowBusinessTypeFilter] = useState(false);
  const [businessTypePosition, setBusinessTypePosition] = useState({
    top: 0,
    left: 0,
  });

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
  // STATUS FILTER TOGGLE
  // ==============================
  const toggleStatus = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
    setCurrentPage(1);
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
  // This is the handler passed to UserDetailsModal.
  // It calls the API directly and updates both the users list
  // and the selectedUser so the badge in the modal reflects
  // the new status immediately after confirmation.
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

    // Update the users list so the table reflects the change
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status: newStatus } : u))
    );

    // Update selectedUser so the modal header badge updates immediately
    setSelectedUser((prev) =>
      prev && prev.id === userId ? { ...prev, status: newStatus } : prev
    );
  };

  if (loading) return <div className="p-6">Loading users...</div>;

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-gray-200 bg-white">
      {error && (
        <div className="bg-red-50 text-red-600 px-6 py-4 text-sm">{error}</div>
      )}

      <UsersTableFilters
        itemsPerPage={itemsPerPage}
        mainSearch={mainSearch}
        showAdvancedFilters={false}
        filters={{ email: "", firstName: "", lastName: "", businessName: "" }}
        hasActiveFilters={selectedStatuses.length > 0}
        onItemsPerPageChange={(value) => {
          setItemsPerPage(parseInt(value));
          setCurrentPage(1);
        }}
        onSearchChange={(value) => {
          setMainSearch(value);
          setCurrentPage(1);
        }}
        onToggleAdvancedFilters={() => {}}
        onFilterChange={() => {}}
        onClearFilters={() => {
          setSelectedStatuses([]);
          setMainSearch("");
        }}
        selectedStatuses={selectedStatuses}
        onOpenStatusFilter={() => setIsStatusModalOpen(true)}
      />

      <UsersTable
        users={paginatedUsers}
        sortField={sortField}
        sortDirection={sortDirection}
        selectedStatuses={selectedStatuses}
        selectedBusinessTypes={selectedBusinessTypes}
        showBusinessTypeFilter={false}
        showStatusFilter={false}
        businessTypeButtonRef={businessTypeButtonRef}
        statusButtonRef={{ current: null }}
        updatingStatus={updatingStatus}
        onSort={(field) => {
          setSortField(field);
          setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        }}
        onBusinessTypeFilterClick={() => {}}
        onStatusFilterClick={() => {}}
        onStatusChange={handleStatusChangeConfirm}
        onViewDetails={(user) => {
          setSelectedUser(user as UserWithDocuments);
          setIsModalOpen(true);
        }}
        onToggleBusinessType={() => {}}
        onToggleStatus={toggleStatus}
      />

      <UsersTablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
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
          // ✅ Now wired up — enables the dropdown in the modal
          onStatusChange={handleModalStatusChange}
        />
      )}

      <StatusFilterModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        selectedStatuses={selectedStatuses}
        onToggle={toggleStatus}
        onClear={() => setSelectedStatuses([])}
      />
    </div>
  );
}
