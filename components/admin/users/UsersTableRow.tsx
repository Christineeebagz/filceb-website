// components/admin/users/UsersTableRow.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye } from "lucide-react";
import { User, STATUS_COLORS } from "./types";

interface UsersTableRowProps {
  user: User;
  index: number;
  updatingStatus: Record<string, boolean>;
  onStatusChange: (userId: string, newStatus: string) => void;
  onViewDetails: (user: User) => void;
}

export function UsersTableRow({
  user,
  index,
  updatingStatus,
  onStatusChange,
  onViewDetails,
}: UsersTableRowProps) {
  const statusColor = STATUS_COLORS[user.status] || {
    text: "#1E1E1E",
    bg: "transparent",
  };

  return (
    <tr
      className={`border-b border-gray-200 hover:bg-yellow-50 transition-colors ${
        index % 2 === 0 ? "bg-[#FFFDD3]" : "bg-white"
      }`}
    >
      <td className="p-4 font-medium text-[#1E1E1E] text-sm break-all">
        {user.email}
      </td>
      <td className="p-4 text-[#1E1E1E] text-sm">{user.firstName || "N/A"}</td>
      <td className="p-4 text-[#1E1E1E] text-sm">{user.lastName || "N/A"}</td>
      <td className="p-4 text-[#1E1E1E] text-sm">
        {user.businessName || "N/A"}
      </td>
      <td className="p-4 text-[#1E1E1E] text-sm">
        {user.businesstype || "N/A"}
      </td>
      <td className="p-4">
        <Select
          value={user.status}
          onValueChange={(value: string) => onStatusChange(user.id, value)}
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
            <SelectItem value="UNSUBMITTED" className="text-[#8C52FF]">
              UNSUBMITTED
            </SelectItem>
            <SelectItem value="PENDING" className="text-[#FF751F]">
              PENDING
            </SelectItem>
            <SelectItem value="PRE-APPROVED" className="text-[#D7AC00]">
              PRE-APPROVED
            </SelectItem>
            <SelectItem value="APPROVED" className="text-[#1F9254]">
              APPROVED
            </SelectItem>
            <SelectItem value="REJECTED" className="text-[#FF3130]">
              REJECTED
            </SelectItem>
          </SelectContent>
        </Select>
        {updatingStatus[user.id] && (
          <span className="text-xs text-gray-500 ml-2">Updating...</span>
        )}
      </td>
      <td className="p-4">
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 hover:bg-gray-200"
          onClick={() => onViewDetails(user)}
        >
          <Eye className="h-4 w-4 text-[#1E1E1E]" />
        </Button>
      </td>
    </tr>
  );
}
