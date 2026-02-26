// components/admin/UserDetailsModal.tsx
"use client";

import { X } from "lucide-react";
import { UserWithDocuments } from "./users/types";
import { InfoSection } from "./users/InfoSection";
import { PaymentSection } from "./users/PaymentSection";
import { StatusSelector } from "./users/StatusSelector";
import { FileViewer } from "./users/FileViewer";
import { AccountInfo } from "./users/AccountInfo";
import { Legend } from "./users/Legend";

interface UserDetailsModalProps {
  user: UserWithDocuments;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange?: (userId: string, newStatus: string) => Promise<void>;
}

// Status color mapping for display
const STATUS_COLORS: Record<string, { text: string; bg: string }> = {
  UNSUBMITTED: { text: "#8C52FF", bg: "rgba(140, 82, 255, 0.2)" },
  PENDING: { text: "#FF751F", bg: "rgba(255, 117, 31, 0.2)" },
  "PRE-APPROVED": { text: "#D7AC00", bg: "rgba(215, 172, 0, 0.2)" },
  APPROVED: { text: "#1F9254", bg: "rgba(31, 146, 84, 0.2)" },
  REJECTED: { text: "#FF3130", bg: "rgba(255, 49, 48, 0.2)" },
};

export function UserDetailsModal({
  user,
  isOpen,
  onClose,
  onStatusChange,
}: UserDetailsModalProps) {
  if (!isOpen) return null;

  const handleStatusChange = async (newStatus: string) => {
    if (onStatusChange) {
      await onStatusChange(user.id, newStatus);
    }
  };

  const statusColor = STATUS_COLORS[user.status || ""] || {
    text: "#1E1E1E",
    bg: "transparent",
  };

  // Prepare section data
  const personalInfoItems = [
    { label: "First Name", value: user.firstName },
    { label: "Last Name", value: user.lastName },
    { label: "Email", value: user.email },
    { label: "Phone Number", value: user.phone },
  ];

  const locationItems = [
    { label: "Barangay Address", value: user.barangayAddress },
    { label: "Province", value: user.province },
    { label: "City", value: user.city },
  ];

  const businessItems = [
    { label: "Business Name", value: user.businessName },
    { label: "Business Type", value: user.businesstype },
    {
      label: "ID Upload",
      value: user.idUpload,
      render: (value: string | null | undefined) => (
        <FileViewer filePath={value} label="ID" />
      ),
    },
    {
      label: "Business Document",
      value: user.businessDocuments,
      render: (value: string | null | undefined) => (
        <FileViewer filePath={value} label="Document" />
      ),
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-50 w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-lg border-2 border-black">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-black sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-lg font-semibold leading-6 text-gray-900">
              User Details
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {user.firstName || ""} {user.lastName || ""} • {user.email}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-sm p-2 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </div>

        {/* Content - Vertical Layout */}
        <div className="p-6 space-y-6">
          {/* Status Section - Top */}

          <div className="space-y-3 rounded-lg p-5 bg-gray-50 border border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[#1E1E1E]">
                Account Status
              </h3>
              {onStatusChange && (
                <StatusSelector
                  currentStatus={user.status || "UNKNOWN"}
                  onStatusChange={handleStatusChange}
                />
              )}
            </div>
            <div
              className="inline-block px-4 py-2 rounded-lg font-medium"
              style={{
                backgroundColor: statusColor.bg,
                color: statusColor.text,
              }}
            >
              Current: {user.status || "UNKNOWN"}
            </div>
          </div>
          {/* Personal Information */}
          <InfoSection title="Personal Information" items={personalInfoItems} />
          {/* Location */}
          <InfoSection title="Location" items={locationItems} />
          {/* Business Details */}
          <InfoSection title="Business Details" items={businessItems} />
          {/* Payment Information */}
          <PaymentSection user={user} />
          {/* Account Information */}
          <AccountInfo user={user} />
          {/* Legend */}
          <Legend />
        </div>
      </div>
    </div>
  );
}
