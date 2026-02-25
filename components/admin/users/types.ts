// components/admin/users/types.ts
export interface User {
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

export type SortField = keyof User;
export type SortDirection = "asc" | "desc";

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

export interface FilterConfig {
  email: string;
  firstName: string;
  lastName: string;
  businessName: string;
}

export interface PaginationConfig {
  itemsPerPage: number;
  currentPage: number;
}

export const STATUS_COLORS: Record<string, { text: string; bg: string }> = {
  UNSUBMITTED: { text: "#8C52FF", bg: "rgba(140, 82, 255, 0.2)" },
  PENDING: { text: "#FF751F", bg: "rgba(255, 117, 31, 0.2)" },
  "PRE-APPROVED": { text: "#D7AC00", bg: "rgba(215, 172, 0, 0.2)" },
  APPROVED: { text: "#1F9254", bg: "rgba(31, 146, 84, 0.2)" },
  REJECTED: { text: "#FF3130", bg: "rgba(255, 49, 48, 0.2)" },
};

export const STATUS_OPTIONS = [
  "UNSUBMITTED",
  "PENDING",
  "PRE-APPROVED",
  "APPROVED",
  "REJECTED",
] as const;
