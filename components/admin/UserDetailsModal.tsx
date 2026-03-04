"use client";

import { X, ChevronDown } from "lucide-react";
import { UserWithDocuments } from "./users/components/types";
import { InfoSection } from "./users/components/InfoSection";
import { PaymentSection } from "./users/components/PaymentSection";
import { FileViewer } from "./users/components/FileViewer";
import { AccountInfo } from "./users/components/AccountInfo";
import { Legend } from "./users/components/Legend";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface UserDetailsModalProps {
  user: UserWithDocuments;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange?: (userId: string, newStatus: string) => Promise<void>;
}

const STATUS_COLORS: Record<string, { text: string; bg: string }> = {
  UNSUBMITTED: { text: "#8C52FF", bg: "rgba(140, 82, 255, 0.2)" },
  PENDING: { text: "#FF751F", bg: "rgba(255, 117, 31, 0.2)" },
  "PRE-APPROVED": { text: "#D7AC00", bg: "rgba(215, 172, 0, 0.2)" },
  APPROVED: { text: "#1F9254", bg: "rgba(31, 146, 84, 0.2)" },
  REJECTED: { text: "#FF3130", bg: "rgba(255, 49, 48, 0.2)" },
};

const STATUS_OPTIONS = [
  "UNSUBMITTED",
  "PENDING",
  "PRE-APPROVED",
  "APPROVED",
  "REJECTED",
] as const;

export function UserDetailsModal({
  user,
  isOpen,
  onClose,
  onStatusChange,
}: UserDetailsModalProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectKey, setSelectKey] = useState(0);

  if (!isOpen) return null;

  const handleStatusSelect = (value: string) => {
    if (value === user.status) return; // no-op if same
    setSelectedStatus(value);
    setShowConfirm(true);
  };

  const handleConfirmStatusChange = async () => {
    if (!selectedStatus || !onStatusChange) return;
    setIsUpdating(true);
    try {
      await onStatusChange(user.id, selectedStatus);
      setShowConfirm(false);
      setSelectedStatus("");
      setSelectKey((k) => k + 1); // reset Select display value
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    setShowConfirm(false);
    setSelectedStatus("");
    setSelectKey((k) => k + 1);
  };

  const currentColor = STATUS_COLORS[user.status ?? ""] ?? {
    text: "#1E1E1E",
    bg: "rgba(0,0,0,0.08)",
  };

  // Format name and business name for display
  const displayName =
    [user.firstName, user.lastName].filter(Boolean).join(" ") || "";
  const displayBusiness = user.businessName || "";

  // ── section data (unchanged) ─────────────────────────────────────────
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
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-50 w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-lg border-2 border-black">
        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className="bg-[#1E1E1E] p-6 border-b border-white/10 sticky top-0 z-10">
          <div className="flex flex-col items-center text-center">
            {/* Status pill on the RIGHT, label on the LEFT - both centered */}
            <div className="flex items-center justify-center gap-3 mb-3">
              <h2
                className="text-2xl font-semibold text-white"
                style={{ fontFamily: "Times New Roman, serif" }}
              >
                Account Status
              </h2>

              {onStatusChange ? (
                <Select
                  key={selectKey}
                  onValueChange={handleStatusSelect}
                  disabled={isUpdating}
                >
                  <SelectTrigger
                    className={[
                      "h-auto px-4 py-2 rounded-lg font-semibold text-sm gap-1.5",
                      "border-transparent ring-0 focus:ring-0 focus:ring-offset-0",
                      "shadow-none cursor-pointer",
                      "transition-opacity hover:opacity-80",
                      isUpdating ? "opacity-50 cursor-not-allowed" : "",
                    ].join(" ")}
                    style={{
                      backgroundColor: currentColor.bg,
                      color: currentColor.text,
                    }}
                  >
                    {/* Always display the live user.status */}
                    <span>
                      {isUpdating ? "Updating…" : (user.status ?? "UNKNOWN")}
                    </span>
                    {/* <ChevronDown
                      className="h-3.5 w-3.5 opacity-70 shrink-0"
                      style={{ color: currentColor.text }}
                    /> */}
                    {/* Hide Radix's own SelectValue */}
                    <SelectValue className="hidden" />
                  </SelectTrigger>

                  <SelectContent className="bg-white border border-gray-200 shadow-lg z-100">
                    {STATUS_OPTIONS.map((status) => {
                      const color = STATUS_COLORS[status];
                      const isCurrent = status === user.status;
                      return (
                        <SelectItem
                          key={status}
                          value={status}
                          disabled={isCurrent}
                          className="cursor-pointer focus:bg-gray-50"
                        >
                          <span
                            className={[
                              "inline-flex items-center gap-2 font-medium",
                              isCurrent ? "opacity-40" : "",
                            ].join(" ")}
                            style={{ color: color?.text }}
                          >
                            {/* small coloured dot for quick recognition */}
                            <span
                              className="w-2 h-2 rounded-full shrink-0"
                              style={{ backgroundColor: color?.text }}
                            />
                            {status}
                            {isCurrent && (
                              <span className="text-xs text-gray-400 font-normal">
                                (current)
                              </span>
                            )}
                          </span>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              ) : (
                /* Read-only pill when no onStatusChange is provided */
                <div
                  className="px-4 py-2 rounded-lg font-semibold text-sm"
                  style={{
                    backgroundColor: currentColor.bg,
                    color: currentColor.text,
                  }}
                >
                  {user.status ?? "UNKNOWN"}
                </div>
              )}
            </div>

            {/* Name and Business Name - No email */}
            <div className="text-sm text-gray-300 space-y-0.5">
              {displayName && <p>{displayName}</p>}
              {displayBusiness && <p>{displayBusiness}</p>}
            </div>
          </div>

          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm p-2 opacity-70 hover:opacity-100 transition-opacity bg-white/10 hover:bg-white/20"
          >
            <X className="h-4 w-4 text-white" />
            <span className="sr-only">Close</span>
          </button>
        </div>

        {/* ── Content ────────────────────────────────────────────────── */}
        <div className="p-6 space-y-6">
          <InfoSection title="Personal Information" items={personalInfoItems} />
          <InfoSection title="Location" items={locationItems} />
          <InfoSection title="Business Details" items={businessItems} />
          <PaymentSection user={user} />
          <AccountInfo user={user} />
          <Legend />
        </div>
      </div>

      {/* ── Inline confirmation overlay ─────────────────────────────── */}
      {showConfirm && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={handleCancel}
          />
          <div className="relative bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl z-[70]">
            <h3 className="text-lg font-bold text-[#1E1E1E] mb-4">
              Confirm Status Change
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to change the status from{" "}
              <span
                className="font-semibold"
                style={{ color: STATUS_COLORS[user.status ?? ""]?.text }}
              >
                {user.status}
              </span>{" "}
              to{" "}
              <span
                className="font-semibold"
                style={{ color: STATUS_COLORS[selectedStatus]?.text }}
              >
                {selectedStatus}
              </span>
              ?
            </p>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="border-gray-300"
                disabled={isUpdating}
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmStatusChange}
                className="bg-[#F8EF30] text-[#1E1E1E] hover:bg-[#F8EF30]/90"
                disabled={isUpdating}
              >
                {isUpdating ? "Updating…" : "Confirm"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
