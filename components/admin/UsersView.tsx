"use client";

import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, ChevronUp, ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { UserDetailsModal } from "./UserDetailsModal";

// Mock user data structure based on your sample script
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

export default function UsersView() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    email: "",
    firstName: "",
    lastName: "",
    businessName: "",
    businesstype: "",
    status: "",
  });
  const [sortField, setSortField] = useState<SortField>("email");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [updatingStatus, setUpdatingStatus] = useState<Record<string, boolean>>(
    {}
  );

  // Function to handle status change
  const handleStatusChange = async (userId: string, newStatus: string) => {
    setUpdatingStatus((prev) => ({ ...prev, [userId]: true }));

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
    const filtered = users.filter((user) => {
      const getValue = (value: string | null | undefined) =>
        value?.toString().toLowerCase() || "n/a";

      return (
        getValue(user.email).includes(filters.email.toLowerCase()) &&
        getValue(user.firstName).includes(filters.firstName.toLowerCase()) &&
        getValue(user.lastName).includes(filters.lastName.toLowerCase()) &&
        getValue(user.businessName).includes(
          filters.businessName.toLowerCase()
        ) &&
        getValue(user.businesstype).includes(
          filters.businesstype.toLowerCase()
        ) &&
        getValue(user.status).includes(filters.status.toLowerCase())
      );
    });

    return filtered.sort((a, b) => {
      const getSortValue = (value: string | null | undefined) =>
        value?.toString().toLowerCase() || "";

      const aValue = getSortValue(a[sortField]);
      const bValue = getSortValue(b[sortField]);

      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
  }, [users, filters, sortField, sortDirection]);

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "default";
      case "PENDING":
      case "PRE-APPROVED":
        return "secondary";
      case "REJECTED":
        return "destructive";
      case "UNSUBMITTED":
        return "outline";
      default:
        return "outline";
    }
  };

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
      className="flex items-center gap-1 font-medium text-left hover:text-primary transition-colors"
    >
      {children}
      {sortField === field &&
        (sortDirection === "asc" ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        ))}
    </button>
  );

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
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Filter inputs */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Input
              placeholder="Filter by email..."
              value={filters.email}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, email: e.target.value }))
              }
            />
            <Input
              placeholder="Filter by first name..."
              value={filters.firstName}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, firstName: e.target.value }))
              }
            />
            <Input
              placeholder="Filter by last name..."
              value={filters.lastName}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, lastName: e.target.value }))
              }
            />
            <Input
              placeholder="Filter by business..."
              value={filters.businessName}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  businessName: e.target.value,
                }))
              }
            />
            <Input
              placeholder="Filter by type..."
              value={filters.businesstype}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  businesstype: e.target.value,
                }))
              }
            />
            <Input
              placeholder="Filter by status..."
              value={filters.status}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, status: e.target.value }))
              }
            />
          </div>

          {/* Scrollable table container */}
          <div className="border rounded-lg">
            <div className="max-h-96 ">
              <table className="w-full">
                <thead className="bg-muted/50 sticky top-0">
                  <tr className="border-b">
                    <th className="text-left p-4 min-w-[200px]">
                      <SortableHeader field="email">Email</SortableHeader>
                    </th>
                    <th className="text-left p-4 min-w-[120px]">
                      <SortableHeader field="firstName">
                        First Name
                      </SortableHeader>
                    </th>
                    <th className="text-left p-4 min-w-[120px]">
                      <SortableHeader field="lastName">
                        Last Name
                      </SortableHeader>
                    </th>
                    <th className="text-left p-4 min-w-[180px]">
                      <SortableHeader field="businessName">
                        Business Name
                      </SortableHeader>
                    </th>
                    <th className="text-left p-4 min-w-[140px]">
                      <SortableHeader field="businesstype">
                        Business Type
                      </SortableHeader>
                    </th>

                    <th className="text-left p-4 min-w-[100px]">
                      <SortableHeader field="status">Status</SortableHeader>
                    </th>
                    {/* Column for status change */}
                    <th className="text-left p-4 min-w-[150px]">
                      Change Status
                    </th>
                    <th className="text-left p-4 w-[60px]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b hover:bg-muted/25 transition-colors"
                    >
                      <td className="p-4 font-medium">{user.email}</td>
                      <td className="p-4">{user.firstName || "N/A"}</td>
                      <td className="p-4">{user.lastName || "N/A"}</td>
                      <td className="p-4">{user.businessName || "N/A"}</td>
                      <td className="p-4">{user.businesstype || "N/A"}</td>
                      <td className="p-4">
                        <Badge variant={getStatusBadgeVariant(user.status)}>
                          {user.status}
                        </Badge>
                      </td>
                      {/* Select dropdown for status change */}
                      <td className="p-4">
                        <Select
                          value={user.status}
                          onValueChange={(value: string) =>
                            handleStatusChange(user.id, value)
                          }
                          disabled={updatingStatus[user.id]}
                        >
                          <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent style={{ backgroundColor: "#D3D3D3" }}>
                            <SelectItem
                              value="UNSUBMITTED"
                              className="bg-[#D3D3D3]"
                            >
                              UNSUBMITTED
                            </SelectItem>
                            <SelectItem
                              value="PENDING"
                              className="bg-[#D3D3D3]"
                            >
                              PENDING
                            </SelectItem>
                            <SelectItem value="PRE-APPROVED">
                              PRE-APPROVED
                            </SelectItem>
                            <SelectItem value="APPROVED">APPROVED</SelectItem>
                            <SelectItem value="REJECTED">REJECTED</SelectItem>
                          </SelectContent>
                        </Select>
                        {updatingStatus[user.id] && (
                          <span className="text-xs text-muted-foreground ml-2">
                            Updating...
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => {
                            setSelectedUser(user);
                            setIsModalOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Modal - THIS WAS WORKING */}
          {selectedUser && (
            <UserDetailsModal
              user={selectedUser}
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          )}

          {filteredAndSortedUsers.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No users found matching the current filters.
            </div>
          )}

          <div className="text-sm text-muted-foreground">
            Showing {filteredAndSortedUsers.length} of {users.length} users
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
