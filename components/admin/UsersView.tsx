"use client";

import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, ChevronUp, ChevronDown, Filter } from "lucide-react";
import { UserDetailsModal } from "./UserDetailsModal";
import { BUSINESS_TYPES } from "@/constants";

interface User {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  businessName: string | null;
  businesstype: string | null;
  status: string;
  role: string;
  phone: string | null;
  barangayAddress: string | null;
  province: string | null;
  city: string | null;
  createdAt: string;
  lastActivityDate: string;
  referenceNum: string | null;
}

type SortField = keyof User;
type SortDirection = "asc" | "desc";

// Status color mapping
const STATUS_COLORS: Record<string, { text: string; bg: string }> = {
  UNSUBMITTED: { text: "#8C52FF", bg: "rgba(140, 82, 255, 0.2)" },
  PENDING: { text: "#FF751F", bg: "rgba(255, 117, 31, 0.2)" },
  "PRE-APPROVED": { text: "#D7AC00", bg: "rgba(215, 172, 0, 0.2)" },
  APPROVED: { text: "#1F9254", bg: "rgba(31, 146, 84, 0.2)" },
  REJECTED: { text: "#FF3130", bg: "rgba(255, 49, 48, 0.2)" },
};

export default function UsersView() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Confirmation modal state
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

  // Main search - searches across all fields
  const [mainSearch, setMainSearch] = useState("");

  // Advanced filters - specific field filters
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

  // Function to handle status change confirmation
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

  // Function to execute status change after confirmation
  const executeStatusChange = async () => {
    const { userId, newStatus } = confirmModal;

    setUpdatingStatus((prev) => ({ ...prev, [userId]: true }));
    setConfirmModal((prev) => ({ ...prev, isOpen: false }));

    try {
      const response = await fetch("/api/users/status", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user status");
      }

      // Update local state to reflect the change
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
    // First apply main search (across all fields)
    let filtered = users;

    if (mainSearch.trim() !== "") {
      const searchLower = mainSearch.toLowerCase();
      filtered = users.filter((user) => {
        // Combine all searchable fields into one string
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

    // Apply status filter if statuses are selected
    if (selectedStatuses.length > 0) {
      filtered = filtered.filter((user) =>
        selectedStatuses.includes(user.status)
      );
    }

    // Apply business type filter if types are selected
    if (selectedBusinessTypes.length > 0) {
      filtered = filtered.filter(
        (user) =>
          user.businesstype && selectedBusinessTypes.includes(user.businesstype)
      );
    }

    // Then apply advanced filters if they have values
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

    // Then sort
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

  // Pagination logic
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
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
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

  const SortableHeader = ({
    field,
    children,
  }: {
    field: SortField;
    children: React.ReactNode;
  }) => (
    <button
      onClick={() => handleSort(field)}
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

  const clearFilters = () => {
    setMainSearch("");
    setFilters({
      email: "",
      firstName: "",
      lastName: "",
      businessName: "",
    });
    setSelectedStatuses([]);
    setSelectedBusinessTypes([]);
    setCurrentPage(1);
  };

  const toggleStatus = (status: string) => {
    setSelectedStatuses((prev) => {
      if (prev.includes(status)) {
        return prev.filter((s) => s !== status);
      } else {
        return [...prev, status];
      }
    });
    setCurrentPage(1);
  };

  const toggleBusinessType = (type: string) => {
    setSelectedBusinessTypes((prev) => {
      if (prev.includes(type)) {
        return prev.filter((t) => t !== type);
      } else {
        return [...prev, type];
      }
    });
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        Loading users...
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center py-8">Error: {error}</div>;
  }

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-gray-200 bg-white">
      {/* Yellow Filter Bar */}
      <div className="bg-[#F8EF26] p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-[#1E1E1E]">Show</span>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(value) => {
                setItemsPerPage(parseInt(value));
                setCurrentPage(1);
              }}
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

          {/* Main Search - Searches across all fields */}
          <div className="flex-1 min-w-[300px] max-w-xl flex gap-2">
            <Input
              placeholder="Search across all fields..."
              value={mainSearch}
              onChange={(e) => {
                setMainSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="flex-1 bg-white border-gray-400 text-[#1E1E1E] placeholder:text-gray-500"
            />
          </div>

          {(mainSearch ||
            Object.values(filters).some((v) => v !== "") ||
            selectedStatuses.length > 0 ||
            selectedBusinessTypes.length > 0) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
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
              onClick={() => setShowAdvancedFilters(false)}
              className="h-6 w-6 p-0"
            >
              ×
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            <Input
              placeholder="Filter by email..."
              value={filters.email}
              onChange={(e) => {
                setFilters((prev) => ({ ...prev, email: e.target.value }));
                setCurrentPage(1);
              }}
              className="border-gray-300 focus:border-[#F8EF26] focus:ring-[#F8EF26]/20"
            />
            <Input
              placeholder="Filter by first name..."
              value={filters.firstName}
              onChange={(e) => {
                setFilters((prev) => ({ ...prev, firstName: e.target.value }));
                setCurrentPage(1);
              }}
              className="border-gray-300 focus:border-[#F8EF26] focus:ring-[#F8EF26]/20"
            />
            <Input
              placeholder="Filter by last name..."
              value={filters.lastName}
              onChange={(e) => {
                setFilters((prev) => ({ ...prev, lastName: e.target.value }));
                setCurrentPage(1);
              }}
              className="border-gray-300 focus:border-[#F8EF26] focus:ring-[#F8EF26]/20"
            />
            <Input
              placeholder="Filter by business name..."
              value={filters.businessName}
              onChange={(e) => {
                setFilters((prev) => ({
                  ...prev,
                  businessName: e.target.value,
                }));
                setCurrentPage(1);
              }}
              className="border-gray-300 focus:border-[#F8EF26] focus:ring-[#F8EF26]/20"
            />
          </div>
        </div>
      )}

      {/* Scrollable table container */}
      <div className="border-y border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            {/* Table Header - White */}
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
                  <SortableHeader field="businessName">
                    Business Name
                  </SortableHeader>
                </th>
                <th className="text-left p-4 min-w-[140px] text-[#1E1E1E] font-bold">
                  <div className="flex items-center gap-2">
                    <span>Business Type</span>
                    <div className="relative">
                      <Select
                        value={
                          selectedBusinessTypes.length === 1
                            ? selectedBusinessTypes[0]
                            : "multiple"
                        }
                        onValueChange={(value) => {
                          if (value === "all") {
                            setSelectedBusinessTypes([]);
                          } else {
                            toggleBusinessType(value);
                          }
                        }}
                      >
                        <SelectTrigger className="w-[150px] h-8 bg-white border-gray-300 text-[#1E1E1E] font-normal">
                          <SelectValue placeholder="Filter by type">
                            {selectedBusinessTypes.length === 0
                              ? "All Types"
                              : `${selectedBusinessTypes.length} selected`}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          {BUSINESS_TYPES.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {selectedBusinessTypes.length > 0 && (
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#F8EF26] rounded-full" />
                      )}
                    </div>
                  </div>
                </th>
                <th className="text-left p-4 min-w-[220px] text-[#1E1E1E] font-bold">
                  <div className="flex items-center gap-2">
                    <span>Status</span>
                    <div className="relative">
                      <Select
                        value={
                          selectedStatuses.length === 1
                            ? selectedStatuses[0]
                            : "multiple"
                        }
                        onValueChange={(value) => {
                          if (value === "all") {
                            setSelectedStatuses([]);
                          } else {
                            toggleStatus(value);
                          }
                        }}
                      >
                        <SelectTrigger className="w-[150px] h-8 bg-white border-gray-300 text-[#1E1E1E] font-normal">
                          <SelectValue placeholder="Filter by status">
                            {selectedStatuses.length === 0
                              ? "All Statuses"
                              : `${selectedStatuses.length} selected`}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Statuses</SelectItem>
                          <SelectItem value="UNSUBMITTED">
                            UNSUBMITTED
                          </SelectItem>
                          <SelectItem value="PENDING">PENDING</SelectItem>
                          <SelectItem value="PRE-APPROVED">
                            PRE-APPROVED
                          </SelectItem>
                          <SelectItem value="APPROVED">APPROVED</SelectItem>
                          <SelectItem value="REJECTED">REJECTED</SelectItem>
                        </SelectContent>
                      </Select>
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
            <tbody>
              {paginatedUsers.map((user, index) => {
                const statusColor = STATUS_COLORS[user.status] || {
                  text: "#1E1E1E",
                  bg: "transparent",
                };

                return (
                  <tr
                    key={user.id}
                    className={`border-b border-gray-200 hover:bg-yellow-50 transition-colors ${
                      index % 2 === 0 ? "bg-[#FFFDD3]" : "bg-white"
                    }`}
                  >
                    <td className="p-4 font-medium text-[#1E1E1E] text-sm break-all">
                      {user.email}
                    </td>
                    <td className="p-4 text-[#1E1E1E] text-sm">
                      {user.firstName || "N/A"}
                    </td>
                    <td className="p-4 text-[#1E1E1E] text-sm">
                      {user.lastName || "N/A"}
                    </td>
                    <td className="p-4 text-[#1E1E1E] text-sm">
                      {user.businessName || "N/A"}
                    </td>
                    <td className="p-4 text-[#1E1E1E] text-sm">
                      {user.businesstype || "N/A"}
                    </td>
                    <td className="p-4">
                      <Select
                        value={user.status}
                        onValueChange={(value: string) =>
                          handleStatusChangeConfirm(user.id, value)
                        }
                        disabled={updatingStatus[user.id]}
                      >
                        <SelectTrigger
                          className="w-[140px] h-8 border-gray-300"
                          style={{
                            backgroundColor: statusColor.bg,
                            color: statusColor.text,
                          }}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem
                            value="UNSUBMITTED"
                            className="text-[#8C52FF]"
                          >
                            UNSUBMITTED
                          </SelectItem>
                          <SelectItem
                            value="PENDING"
                            className="text-[#FF751F]"
                          >
                            PENDING
                          </SelectItem>
                          <SelectItem
                            value="PRE-APPROVED"
                            className="text-[#D7AC00]"
                          >
                            PRE-APPROVED
                          </SelectItem>
                          <SelectItem
                            value="APPROVED"
                            className="text-[#1F9254]"
                          >
                            APPROVED
                          </SelectItem>
                          <SelectItem
                            value="REJECTED"
                            className="text-[#FF3130]"
                          >
                            REJECTED
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      {updatingStatus[user.id] && (
                        <span className="text-xs text-gray-500 ml-2">
                          Updating...
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 hover:bg-gray-200"
                        onClick={() => {
                          setSelectedUser(user);
                          setIsModalOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4 text-[#1E1E1E]" />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredAndSortedUsers.length === 0 && (
          <div className="text-center py-8 text-gray-500 bg-white">
            No users found matching the current filters.
          </div>
        )}
      </div>

      {/* Table Footer - Yellow with Pagination */}
      <div className="bg-[#F8EF26] p-4 flex items-center justify-center gap-2">
        <Button
          variant="ghost"
          className="text-[#1E1E1E] hover:bg-yellow-200"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>

        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
          let pageNum;
          if (totalPages <= 5) {
            pageNum = i + 1;
          } else if (currentPage <= 3) {
            pageNum = i + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNum = totalPages - 4 + i;
          } else {
            pageNum = currentPage - 2 + i;
          }

          return (
            <Button
              key={pageNum}
              variant="ghost"
              className={`h-8 w-8 p-0 ${
                currentPage === pageNum
                  ? "bg-[#1E1E1E] text-white hover:bg-[#2E2E2E]"
                  : "text-[#1E1E1E] hover:bg-yellow-200"
              }`}
              onClick={() => setCurrentPage(pageNum)}
            >
              {pageNum}
            </Button>
          );
        })}

        <Button
          variant="ghost"
          className="text-[#1E1E1E] hover:bg-yellow-200"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>

      <div className="bg-white p-4 text-sm text-gray-500 border-t border-gray-200">
        Showing {paginatedUsers.length} of {filteredAndSortedUsers.length} users
        (Total: {users.length})
      </div>

      {/* Status Change Confirmation Modal */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-[#1E1E1E] mb-4">
              Confirm Status Change
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to change the status of{" "}
              <span className="font-semibold">{confirmModal.userName}</span>{" "}
              from{" "}
              <span
                className="font-semibold"
                style={{
                  color:
                    STATUS_COLORS[confirmModal.currentStatus]?.text ||
                    "#1E1E1E",
                }}
              >
                {confirmModal.currentStatus}
              </span>{" "}
              to{" "}
              <span
                className="font-semibold"
                style={{
                  color:
                    STATUS_COLORS[confirmModal.newStatus]?.text || "#1E1E1E",
                }}
              >
                {confirmModal.newStatus}
              </span>
              ?
            </p>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() =>
                  setConfirmModal((prev) => ({ ...prev, isOpen: false }))
                }
                className="border-gray-300"
              >
                Cancel
              </Button>
              <Button
                onClick={executeStatusChange}
                className="bg-[#F8EF26] text-[#1E1E1E] hover:bg-[#F8EF26]/90"
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* User Details Modal */}
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
